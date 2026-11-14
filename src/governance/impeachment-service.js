import { verify } from 'node:crypto';
import { ALGORITHM_VERSION, attributable, SOURCE_NAMES, canonical, digest, fail, requireId, seedCommitment, planBootstrapStage,
  inputDiscrepancy, sourceReference, sourceData, copySource } from './bootstrap-impeachment.js';


// Auxiliary capture data belongs to the capture boundary, not the seven named authorities.
function auxiliaryDigest(snapshot) {
  return digest(Object.fromEntries(Object.entries(snapshot).filter(([name]) => !SOURCE_NAMES.includes(name))));
}
function changedSourceReferences(snapshot, previous, previousCaptureDigest) {
  if (!previous) return [sourceReference('compositionCapture', undefined)];
  const refs = SOURCE_NAMES.filter(name => previous[name] !== digest(snapshot[name])).map(name => sourceReference(name, snapshot[name]));
  if ((previousCaptureDigest !== undefined && previousCaptureDigest !== auxiliaryDigest(snapshot)) || !refs.length) {
    refs.push(sourceReference('compositionCapture', undefined));
  }
  return refs;
}

/** Keys and permissions come from trusted configuration, never from the command. */
export function createCommandAuthenticator(principals) {
  const trusted = new Map(Object.entries(principals).map(([id, p]) => [requireId(id), { publicKey: p.publicKey, permissions: new Set(p.permissions) }]));
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
  // Cite a journal event only when it is stamped; an absent reference makes the planner fail closed.
  const cite = (key, event) => { if (Number.isSafeInteger(event.version)) state[key] = `impeachment-event:case:${state.caseId}:${event.version}`; };
  if (events[0].type === 'CASE_OPENED') cite('accusedSourceEventId', events[0]);
  for (const event of events) {
    switch (event.type) {
      case 'SEED_COMMITTED': state.commitments[event.stage] = event; break;
      case 'STAGE_PLANNED':
        state.lastAttempt = event;
        state.status = event.plan.status;
        if (event.plan.status === `${event.stage}_INPUT_DISCREPANCY_REVIEW`) {
          state.discrepancy = event.plan.reason;
          state.inputDiscrepancy = { stage: event.stage, reason: event.plan.reason, version: event.version, actorId: event.actorId,
            sources: event.plan.discrepancySources ?? [] };
        }
        if (event.plan.status === `${event.stage}_EMPANELED`) {
          state.panels[event.stage] = event.plan;
          if (event.stage === 'ACCUSATION') {
            state.accusationParticipants = [...new Set([...state.accusationParticipants, ...event.plan.roster])];
            cite('accusationPanelSourceEventId', event);
          }
        }
        break;
      case 'INPUT_DISCREPANCY':
        state.status = `${event.stage}_INPUT_DISCREPANCY_REVIEW`; state.discrepancy = event.reason;
        state.inputDiscrepancy = { stage: event.stage, reason: event.reason, version: event.version, actorId: event.actorId,
          sources: event.discrepancySources ?? [] };
        break;
      case 'INPUT_DISCREPANCY_RESOLVED':
        state.status = event.stage === 'ACCUSATION' ? 'REPORTED' : 'CHARGED';
        delete state.inputDiscrepancy; delete state.discrepancy;
        delete state.commitments[event.stage];
        if (state.lastAttempt?.stage === event.stage) delete state.lastAttempt;
        break;
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
    if (!principal || !attributable(principal.id)) fail('UNAUTHORIZED');
    if (command.type === 'READ') return replayImpeachment(this.#store.load(`case:${command.caseId}`));
    const history = this.#store.transact({ ...command, stream: `case:${command.caseId}` }, principal, (events, db) => {
      if (command.type === 'OPEN') {
        if (events.length) fail('CASE_EXISTS'); requireId(command.accusedId);
        return [{ type: 'CASE_OPENED', caseId: command.caseId, accusedId: command.accusedId }];
      }
      const state = replayImpeachment(events);
      if (['CHARGE_REJECTED', 'ACQUITTED', 'CONVICTED'].includes(state.status)) fail('CASE_TERMINAL');
      if (state.inputDiscrepancy && command.type !== 'RESOLVE_REVIEW') fail('INDEPENDENT_REVIEW_REQUIRED');
      try {
        if (command.type === 'COMMIT_SEED' || command.type === 'ENTER_STAGE') {
          // New source versions cannot authorize release of an independent-review hold.
          if (state.panels[state.stage]) fail('PANEL_FROZEN');
          return this.#enter(command, state, db, principal);
        }
        if (command.type === 'CLOSE_STAGE') {
          const panel = state.panels[state.stage];
          if (state.status !== `${state.stage}_EMPANELED` || !panel) fail('WRONG_STAGE');
          if (!this.#ballots?.close) fail('BALLOT_AUTHORITY_REQUIRED');
          const receipt = this.#receipt('ballots', () => this.#ballots.close(structuredClone(state), db));
          if (!receipt || receipt.then || receipt.caseId !== state.caseId || receipt.stage !== state.stage
            || receipt.panelDigest !== digest(panel) || receipt.closed !== true || !attributable(receipt.sourceEventId)
            || !Array.isArray(receipt.ballots)) fail('INVALID_BALLOT_RECEIPT');
          const ids = new Set(); let yes = 0;
          for (const ballot of receipt.ballots) {
            if (!ballot || !attributable(ballot.identityId) || !panel.roster.includes(ballot.identityId) || ids.has(ballot.identityId)
              || !['YES', 'NO', 'ABSTAIN'].includes(ballot.vote)) fail('INVALID_BALLOT_RECEIPT');
            ids.add(ballot.identityId); if (ballot.vote === 'YES') yes++;
          }
          if (receipt.quorumSatisfied !== true) fail('QUORUM_NOT_SATISFIED');
          let passed = yes >= panel.affirmativeThreshold;
          let evidenceReference = null;
          if (passed && state.stage === 'TRIAL') {
            if (!this.#evidence?.assess) fail('EVIDENCE_AUTHORITY_REQUIRED');
            const proof = this.#receipt('evidence', () => this.#evidence.assess(structuredClone(state), db));
            if (!proof || proof.then || proof.caseId !== state.caseId || ('stage' in Object(proof) && proof.stage !== state.stage) || proof.panelDigest !== digest(panel)
              || proof.standard !== 'CLEAR_AND_CONVINCING' || typeof proof.satisfied !== 'boolean' || !attributable(proof.sourceEventId)) fail('INVALID_EVIDENCE_ATTESTATION');
            passed = proof.satisfied; evidenceReference = proof.sourceEventId;
          }
          const outcome = state.stage === 'ACCUSATION' ? (passed ? 'CHARGED' : 'CHARGE_REJECTED') : (passed ? 'CONVICTED' : 'ACQUITTED');
          return [{ type: 'STAGE_DECIDED', stage: state.stage, outcome, yes,
            threshold: panel.affirmativeThreshold, ballotSourceEventId: receipt.sourceEventId, evidenceReference,
            // Explicit handoff, not execution of removal, disqualification or appellate powers.
            consequence: outcome === 'CONVICTED' ? 'REMOVAL_REQUIRED_APPEAL_AVAILABLE' : null }];
        }
        if (command.type === 'RESOLVE_REVIEW' && state.inputDiscrepancy) {
          if (typeof this.#review?.assess !== 'function') fail('INDEPENDENT_REVIEW_REQUIRED');
          const receipt = this.#receipt('review', () => this.#review.assess(structuredClone(state), command.type, db));
          if (!receipt || receipt.then || receipt.caseId !== state.caseId || receipt.stage !== state.stage
            || ('panelDigest' in Object(receipt) && (!state.panels[state.stage] || receipt.panelDigest !== digest(state.panels[state.stage])))
            || receipt.discrepancyVersion !== state.inputDiscrepancy.version || receipt.reviewedStateVersion !== state.version
            || receipt.resolution !== 'RESUME' || receipt.independentlyAuthorized !== true || receipt.competent !== true
            || !attributable(receipt.reviewerId) || !attributable(receipt.authorityReference) || !attributable(receipt.sourceEventId)
            || receipt.reviewerId === state.inputDiscrepancy.actorId || receipt.reviewerId === state.accusedId) fail('INDEPENDENT_REVIEW_REQUIRED');
          // Only the trusted adapter supplies the receipt. Caller payload cannot attest
          // independence or competence. Persist its attribution separately from actorId.
          return [{ type: 'INPUT_DISCREPANCY_RESOLVED', stage: state.stage, receipt: {
            caseId: receipt.caseId, stage: receipt.stage, discrepancyVersion: receipt.discrepancyVersion,
            reviewedStateVersion: receipt.reviewedStateVersion, resolution: receipt.resolution,
            reviewerId: receipt.reviewerId, authorityReference: receipt.authorityReference,
            sourceEventId: receipt.sourceEventId, independentlyAuthorized: true, competent: true } }];
        }
        if (command.type === 'POST_FREEZE_WAIT' || command.type === 'RESOLVE_REVIEW') {
          if (command.type === 'POST_FREEZE_WAIT' && state.status !== `${state.stage}_EMPANELED`) fail('WRONG_STAGE');
          if (command.type === 'RESOLVE_REVIEW' && state.status !== 'POST_FREEZE_REVIEW') fail('WRONG_STAGE');
          if (typeof this.#review?.assess !== 'function') fail('INDEPENDENT_REVIEW_REQUIRED');
          const receipt = this.#receipt('review', () => this.#review.assess(structuredClone(state), command.type, db));
          if (!receipt || receipt.then || receipt.caseId !== state.caseId
            || ('stage' in Object(receipt) && receipt.stage !== state.stage)
            || ('panelDigest' in Object(receipt) && receipt.panelDigest !== digest(state.panels[state.stage]))
            || !attributable(receipt.sourceEventId) || receipt.independentlyAuthorized !== true
            || receipt.conflictDiscoveryAlone !== false) fail('INDEPENDENT_REVIEW_REQUIRED');
          return [{ type: command.type === 'POST_FREEZE_WAIT' ? 'POST_FREEZE_WAIT' : 'REVIEW_RESOLVED', sourceEventId: receipt.sourceEventId }];
        }
        fail('UNKNOWN_COMMAND');
      } catch (error) {
        if (!['COMMIT_SEED', 'ENTER_STAGE'].includes(command.type) || error.code !== 'INPUT_DISCREPANCY') throw error;
        return [{ type: 'INPUT_DISCREPANCY', stage: state.stage, reason: error.message,
          discrepancySources: error.discrepancySources }];
      }
    });
    return replayImpeachment(history);
  }
  #receipt(authority, read) {
    // Receipts authorize a command result, not panel composition. Every failure rolls back.
    try {
      const receipt = read();
      if (receipt && !receipt.then) canonical(receipt);
      return receipt;
    } catch {
      fail({ ballots: 'INVALID_BALLOT_RECEIPT', evidence: 'INVALID_EVIDENCE_ATTESTATION', review: 'INDEPENDENT_REVIEW_REQUIRED' }[authority]);
    }
  }
  #capture(state, db) {
    const captured = sourceData('compositionCapture', undefined, () => this.#sources.capture(structuredClone(state), db));
    if (!captured || captured.then || typeof captured !== 'object' || Array.isArray(captured)) {
      inputDiscrepancy('SYNCHRONOUS_SNAPSHOT_REQUIRED', [sourceReference('compositionCapture', captured)]);
    }
    const snapshot = {};
    for (const name of SOURCE_NAMES) {
      // The assignment adapter owns this source; a similarly named field in capture is not authoritative.
      const raw = name === 'assignmentValidation'
        ? sourceData(name, undefined, () => this.#sources.assignmentReasonCodes?.(structuredClone(state), db)) : captured[name];
      if (name === 'assignmentValidation' && (!raw || raw.then)) {
        inputDiscrepancy('MISSING_ASSIGNMENT_REASON_CODES', [sourceReference(name, raw)]);
      }
      snapshot[name] = copySource(name, raw);
    }
    // Unknown auxiliary fields are not silently exempt from source-data validation.
    for (const name of Object.keys(captured).filter(name => !SOURCE_NAMES.includes(name))) {
      snapshot[name] = sourceData('compositionCapture', captured, () => { const copy = structuredClone(captured[name]); canonical(copy); return copy; });
    }
    for (const name of SOURCE_NAMES) {
      // Eligibility role decisions, conflicts and participation are case-specific.
      const scope = ['eligibility', 'conflicts', 'participation'].includes(name) ? `${state.caseId}:${name}` : name;
      // A source built from several authorities is first remembered per authority: a rollback or
      // unversioned change in one must not pass because another advanced.
      for (const [authority, own] of Object.entries(snapshot[name]?.authoritySources ?? {})) {
        if (!attributable(authority)) inputDiscrepancy('INVALID_AUTHORITY_NAME', [sourceReference(name, snapshot[name])]);
        this.#store.rememberSource(`${scope}/${authority}`, own, authority);
      }
      this.#store.rememberSource(scope, snapshot[name], name);
    }
    return snapshot;
  }
  #enter(command, state, db, principal) {
    const snapshot = this.#capture(state, db);
    const versions = Object.fromEntries(SOURCE_NAMES.map(k => [k, snapshot[k].version]));
    const sourceDigests = Object.fromEntries(SOURCE_NAMES.map(k => [k, digest(snapshot[k])]));
    const captureDigest = auxiliaryDigest(snapshot);
    const current = state.commitments[state.stage];
    if (command.type === 'COMMIT_SEED') {
      if (typeof command.seedCommitment !== 'string' || !/^[a-f0-9]{64}$/.test(command.seedCommitment)) fail('INVALID_SEED_COMMITMENT');
      if (current && current.snapshotDigest === digest(snapshot)) fail('SEED_ALREADY_COMMITTED');
      if (state.lastAttempt?.stage === state.stage && canonical(versions) === canonical(state.lastAttempt.sourceVersions)) fail('SOURCE_VERSION_UNCHANGED');
      return [{ type: 'SEED_COMMITTED', stage: state.stage, seedCommitment: command.seedCommitment,
        snapshotDigest: digest(snapshot), sourceDigests, captureDigest, snapshotIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId), sourceVersions: versions, algorithmVersion: ALGORITHM_VERSION }];
    }
    if (!current) fail('SEED_NOT_COMMITTED');
    if (current.seedCommitment !== seedCommitment(command.seed)) fail('SEED_MISMATCH');
    if (current.snapshotDigest !== digest(snapshot)) inputDiscrepancy('STALE_COMMITTED_SNAPSHOT', changedSourceReferences(snapshot, current.sourceDigests, current.captureDigest));
    if (state.lastAttempt?.stage === state.stage && canonical(versions) === canonical(state.lastAttempt.sourceVersions)) fail('SOURCE_VERSION_UNCHANGED');
    const plan = planBootstrapStage({ snapshot, caseId: state.caseId, accusedId: state.accusedId, stage: state.stage, seed: command.seed,
      accusationParticipants: state.accusationParticipants,
      accusedSourceEventId: state.accusedSourceEventId, accusationPanelSourceEventId: state.accusationPanelSourceEventId,
      caseSnapshot: { snapshotId: `case:${state.caseId}:${state.version}` },
      validateAssignment: (identityId, stage) => this.#sources.validateAssignment(identityId, stage, structuredClone(snapshot), db) });
    const after = this.#capture(state, db);
    if (digest(after) !== digest(snapshot)) {
      inputDiscrepancy('SOURCE_CHANGED_DURING_ASSIGNMENT', changedSourceReferences(after, sourceDigests, captureDigest));
    }
    plan.createdBy = principal.id; plan.createdAt = new Date().toISOString();
    return [{ type: 'STAGE_PLANNED', stage: state.stage, sourceVersions: versions, plan }];
  }
}
