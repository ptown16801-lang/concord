import { verify } from 'node:crypto';
import { ALGORITHM_VERSION, SOURCE_NAMES, canonical, digest, fail, requireId, seedCommitment, planBootstrapStage } from './bootstrap-impeachment.js';

/** Keys and permissions come from trusted configuration, never from the command. */
export function createCommandAuthenticator(principals) {
  const trusted = new Map(Object.entries(principals).map(([id, p]) => [id, { publicKey: p.publicKey, permissions: new Set(p.permissions) }]));
  return (command, credential) => {
    const authority = trusted.get(credential?.principalId);
    if (!authority || !authority.permissions.has(command.type) || typeof credential.signature !== 'string') fail('UNAUTHORIZED');
    let valid = false;
    try { valid = verify(null, Buffer.from(canonical(command)), authority.publicKey, Buffer.from(credential.signature, 'base64')); } catch { /* Reject invalid keys/signatures. */ }
    if (!valid) fail('UNAUTHORIZED');
    return { id: credential.principalId };
  };
}

export function replayImpeachment(events) {
  if (!events.length) fail('CASE_NOT_FOUND');
  const state = { caseId: events[0].caseId, accusedId: events[0].accusedId, status: 'REPORTED', stage: 'ACCUSATION',
    panels: {}, commitments: {}, accusationParticipants: [], version: events.length, decisions: [] };
  for (const event of events) {
    switch (event.type) {
      case 'SEED_COMMITTED': state.commitments[event.stage] = event; break;
      case 'STAGE_PLANNED':
        state.lastAttempt = event;
        state.status = event.plan.status;
        if (event.plan.status === `${event.stage}_EMPANELED`) {
          state.panels[event.stage] = event.plan;
          if (event.stage === 'ACCUSATION') state.accusationParticipants = [...new Set([...state.accusationParticipants, ...event.plan.roster])];
        }
        break;
      case 'INPUT_DISCREPANCY': state.status = `${event.stage}_INPUT_DISCREPANCY_REVIEW`; state.discrepancy = event.reason; break;
      case 'STAGE_DECIDED':
        state.decisions.push(event); state.status = event.outcome;
        if (event.outcome === 'CHARGED') state.stage = 'TRIAL';
        break;
      case 'POST_FREEZE_WAIT': state.status = 'POST_FREEZE_REVIEW'; state.review = event.sourceEventId; break;
      case 'REVIEW_RESOLVED': state.status = `${state.stage}_EMPANELED`; break;
      default: if (event.type !== 'CASE_OPENED') fail('UNKNOWN_EVENT');
    }
  }
  return state;
}

/** Providers are trusted synchronous adapters inside the shared SQLite transaction.
 * No provider defaults authorize, attest evidence, invent ordinary rules, or grant office powers.
 */
export class BootstrapImpeachmentService {
  #store; #authenticate; #sources; #ballots; #evidence; #review;
  constructor({ eventStore, authenticate, sources, ballots, evidence, review }) {
    if (!eventStore?.transact || !eventStore?.rememberSource) fail('DURABLE_STORE_REQUIRED');
    if (typeof authenticate !== 'function') fail('AUTHENTICATOR_REQUIRED');
    if (!sources?.capture || !sources?.validateAssignment) fail('AUTHORITATIVE_SOURCES_REQUIRED');
    this.#store = eventStore; this.#authenticate = authenticate; this.#sources = sources;
    this.#ballots = ballots; this.#evidence = evidence; this.#review = review;
  }
  async execute(input, credential) {
    const command = structuredClone(input);
    requireId(command.caseId); requireId(command.commandId);
    const principal = await this.#authenticate(structuredClone(command), credential);
    if (!principal || typeof principal.id !== 'string' || !principal.id) fail('UNAUTHORIZED');
    if (command.type === 'READ') return replayImpeachment(this.#store.load(`case:${command.caseId}`));
    const history = this.#store.transact({ ...command, stream: `case:${command.caseId}` }, principal, (events, db) => {
      if (command.type === 'OPEN') {
        if (events.length) fail('CASE_EXISTS'); requireId(command.accusedId);
        return [{ type: 'CASE_OPENED', caseId: command.caseId, accusedId: command.accusedId }];
      }
      const state = replayImpeachment(events);
      if (['CHARGE_REJECTED', 'ACQUITTED', 'CONVICTED'].includes(state.status)) fail('CASE_TERMINAL');
      if (command.type === 'COMMIT_SEED' || command.type === 'ENTER_STAGE') {
        if (state.panels[state.stage]) fail('PANEL_FROZEN');
        try { return this.#enter(command, state, db, principal); }
        catch (error) {
          if (error.code !== 'INPUT_DISCREPANCY') throw error;
          return [{ type: 'INPUT_DISCREPANCY', stage: state.stage, reason: error.message }];
        }
      }
      if (command.type === 'CLOSE_STAGE') {
        const panel = state.panels[state.stage];
        if (state.status !== `${state.stage}_EMPANELED` || !panel) fail('WRONG_STAGE');
        if (!this.#ballots?.close) fail('BALLOT_AUTHORITY_REQUIRED');
        const receipt = this.#ballots.close(structuredClone(state), db);
        if (!receipt || receipt.then || receipt.caseId !== state.caseId || receipt.stage !== state.stage
          || receipt.panelDigest !== digest(panel) || receipt.closed !== true || !receipt.sourceEventId
          || !Array.isArray(receipt.ballots)) fail('INVALID_BALLOT_RECEIPT');
        const ids = new Set(); let yes = 0;
        for (const ballot of receipt.ballots) {
          if (!panel.roster.includes(ballot.identityId) || ids.has(ballot.identityId)
            || !['YES', 'NO', 'ABSTAIN'].includes(ballot.vote)) fail('INVALID_BALLOT_RECEIPT');
          ids.add(ballot.identityId); if (ballot.vote === 'YES') yes++;
        }
        if (receipt.quorumSatisfied !== true) fail('QUORUM_NOT_SATISFIED');
        let passed = yes >= panel.affirmativeThreshold;
        let evidenceReference = null;
        if (passed && state.stage === 'TRIAL') {
          if (!this.#evidence?.assess) fail('EVIDENCE_AUTHORITY_REQUIRED');
          const proof = this.#evidence.assess(structuredClone(state), db);
          if (!proof || proof.then || proof.caseId !== state.caseId || proof.panelDigest !== digest(panel)
            || proof.standard !== 'CLEAR_AND_CONVINCING' || typeof proof.satisfied !== 'boolean' || !proof.sourceEventId) fail('INVALID_EVIDENCE_ATTESTATION');
          passed = proof.satisfied; evidenceReference = proof.sourceEventId;
        }
        const outcome = state.stage === 'ACCUSATION' ? (passed ? 'CHARGED' : 'CHARGE_REJECTED') : (passed ? 'CONVICTED' : 'ACQUITTED');
        return [{ type: 'STAGE_DECIDED', stage: state.stage, outcome, yes,
          threshold: panel.affirmativeThreshold, ballotSourceEventId: receipt.sourceEventId, evidenceReference,
          // Explicit handoff, not execution of removal, disqualification or appellate powers.
          consequence: outcome === 'CONVICTED' ? 'REMOVAL_REQUIRED_APPEAL_AVAILABLE' : null }];
      }
      if (command.type === 'POST_FREEZE_WAIT' || command.type === 'RESOLVE_REVIEW') {
        if (command.type === 'POST_FREEZE_WAIT' && state.status !== `${state.stage}_EMPANELED`) fail('WRONG_STAGE');
        if (command.type === 'RESOLVE_REVIEW' && state.status !== 'POST_FREEZE_REVIEW') fail('WRONG_STAGE');
        const receipt = this.#review?.assess(structuredClone(state), command.type, db);
        if (!receipt || receipt.then || receipt.caseId !== state.caseId || !receipt.sourceEventId || receipt.independentlyAuthorized !== true
          || receipt.conflictDiscoveryAlone !== false) fail('INDEPENDENT_REVIEW_REQUIRED');
        return [{ type: command.type === 'POST_FREEZE_WAIT' ? 'POST_FREEZE_WAIT' : 'REVIEW_RESOLVED', sourceEventId: receipt.sourceEventId }];
      }
      fail('UNKNOWN_COMMAND');
    });
    return replayImpeachment(history);
  }
  #capture(state, db) {
    const snapshot = this.#sources.capture(structuredClone(state), db);
    if (!snapshot || snapshot.then) fail('INPUT_DISCREPANCY', 'SYNCHRONOUS_SNAPSHOT_REQUIRED');
    for (const name of SOURCE_NAMES) {
      // Eligibility role decisions, conflicts and participation are case-specific.
      const scope = ['eligibility', 'conflicts', 'participation'].includes(name) ? `${state.caseId}:${name}` : name;
      this.#store.rememberSource(scope, snapshot[name]);
    }
    return structuredClone(snapshot);
  }
  #enter(command, state, db, principal) {
    const snapshot = this.#capture(state, db);
    const versions = Object.fromEntries(SOURCE_NAMES.map(k => [k, snapshot[k].version]));
    const current = state.commitments[state.stage];
    if (command.type === 'COMMIT_SEED') {
      if (typeof command.seedCommitment !== 'string' || !/^[a-f0-9]{64}$/.test(command.seedCommitment)) fail('INVALID_SEED_COMMITMENT');
      if (current && current.snapshotDigest === digest(snapshot)) fail('SEED_ALREADY_COMMITTED');
      if (state.lastAttempt?.stage === state.stage && canonical(versions) === canonical(state.lastAttempt.sourceVersions)) fail('SOURCE_VERSION_UNCHANGED');
      return [{ type: 'SEED_COMMITTED', stage: state.stage, seedCommitment: command.seedCommitment,
        snapshotDigest: digest(snapshot), snapshotIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId), sourceVersions: versions, algorithmVersion: ALGORITHM_VERSION }];
    }
    if (!current) fail('SEED_NOT_COMMITTED');
    if (current.seedCommitment !== seedCommitment(command.seed)) fail('SEED_MISMATCH');
    if (current.snapshotDigest !== digest(snapshot)) fail('INPUT_DISCREPANCY', 'STALE_COMMITTED_SNAPSHOT');
    if (state.lastAttempt?.stage === state.stage && canonical(versions) === canonical(state.lastAttempt.sourceVersions)) fail('SOURCE_VERSION_UNCHANGED');
    const plan = planBootstrapStage({ snapshot, caseId: state.caseId, accusedId: state.accusedId, stage: state.stage, seed: command.seed,
      accusationParticipants: state.accusationParticipants,
      validateAssignment: (identityId, stage) => this.#sources.validateAssignment(identityId, stage, structuredClone(snapshot), db) });
    if (digest(this.#capture(state, db)) !== digest(snapshot)) fail('INPUT_DISCREPANCY', 'SOURCE_CHANGED_DURING_ASSIGNMENT');
    plan.createdBy = principal.id; plan.createdAt = new Date().toISOString();
    return [{ type: 'STAGE_PLANNED', stage: state.stage, sourceVersions: versions, plan }];
  }
}
