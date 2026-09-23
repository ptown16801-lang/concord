import { createHash } from 'node:crypto';

export const ALGORITHM_VERSION = 'bootstrap-stratified-v1';
export const ImpeachmentStage = Object.freeze({ WAITING: 'WAITING_FOR_INDEPENDENT_PARTICIPANTS', ACCUSATION: 'ACCUSATION_EMPANELED', TRIAL: 'TRIAL_EMPANELED', ACQUITTED: 'ACQUITTED', CONVICTED: 'CONVICTED' });
export class BootstrapImpeachmentError extends Error {
  constructor(code, message = code) { super(message); this.name = 'BootstrapImpeachmentError'; this.code = code; }
}
export function fail(code, message) { throw new BootstrapImpeachmentError(code, message); }
export function requireId(value) {
  if (typeof value !== 'string' || !value.trim() || value !== value.trim()) fail('INVALID_IDENTIFIER');
  return value;
}
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  if (value === undefined || (typeof value === 'number' && !Number.isFinite(value))) fail('INVALID_JSON');
  return JSON.stringify(value);
}
export function digest(value) { return createHash('sha256').update(canonical(value)).digest('hex'); }
export function seedCommitment(seed) { requireId(seed); return digest([ALGORITHM_VERSION, seed]); }
function integer(value, minimum = 0) { if (!Number.isSafeInteger(value) || value < minimum) fail('INVALID_NUMBER'); }
export function bootstrapPanelSizes(capacity) {
  integer(capacity);
  const accusation = Math.min(5, Math.max(2, Math.floor(capacity / 3)));
  return { accusation, trial: Math.min(12, Math.max(0, capacity - accusation)) };
}
export function accusationThreshold(size) {
  integer(size, 2); if (size > 5) fail('INVALID_BOOTSTRAP_SIZE');
  return size === 2 ? 2 : size <= 4 ? Math.ceil(2 * size / 3) : 3;
}
export function trialThreshold(size) {
  integer(size, 6); if (size > 12) fail('INVALID_BOOTSTRAP_SIZE');
  return size <= 8 ? Math.ceil(3 * size / 4) : Math.ceil(2 * size / 3);
}
export const SOURCE_NAMES = ['population', 'office', 'eligibility', 'conflicts', 'rules', 'participation'];
const JUDICIARY = new Set(['DISTRICT', 'CIRCUIT', 'SUPREME_BOARD']);
const INSTITUTIONS = new Set(['HOUSE', 'SENATE', ...JUDICIARY]);
function check(condition, code) { if (!condition) fail('INPUT_DISCREPANCY', code); }
const bool = value => typeof value === 'boolean';
function unique(rows, key) {
  check(Array.isArray(rows), 'MISSING_ROWS');
  const map = new Map();
  for (const row of rows) {
    check(row && typeof row[key] === 'string' && row[key].length > 0, 'INVALID_IDENTITY_ROW');
    if (map.has(row[key])) check(canonical(map.get(row[key])) === canonical(row), 'CONTRADICTORY_DUPLICATE');
    map.set(row[key], row);
  }
  return map;
}
function validateSnapshot(snapshot, caseId, accusationParticipants) {
  for (const source of SOURCE_NAMES) {
    const s = snapshot?.[source];
    check(s && typeof s.snapshotId === 'string' && s.snapshotId.length > 0, 'MISSING_SNAPSHOT');
    check(Number.isSafeInteger(s.version) && s.version >= 0, 'INVALID_SOURCE_VERSION');
  }
  check(snapshot.eligibility.populationVersion === snapshot.population.version, 'POPULATION_ELIGIBILITY_VERSION_MISMATCH');
  check(typeof snapshot.eligibility.rulesetVersion === 'string' && snapshot.eligibility.rulesetVersion.length > 0, 'MISSING_RULESET');
  check(snapshot.conflicts.caseId === caseId && snapshot.participation.caseId === caseId, 'WRONG_CASE');
  const people = unique(snapshot.population.identities, 'identityId');
  const offices = unique(snapshot.office.offices, 'officeId');
  const roles = unique(snapshot.eligibility.roleEligibility, 'identityId');
  for (const p of [...people.values()].sort((a, b) => a.identityId < b.identityId ? -1 : a.identityId > b.identityId ? 1 : 0)) {
    check([p.alive, p.citizen, p.willing, p.jailed, p.disenfranchised].every(bool), 'INCOMPLETE_POPULATION');
    check(p.divisionId === null || typeof p.divisionId === 'string', 'INVALID_DIVISION');
    const role = roles.get(p.identityId);
    check(role && [role.accusation, role.trial].every(bool) && Array.isArray(role.reasonCodes), 'MISSING_ROLE_ELIGIBILITY');
  }
  for (const id of roles.keys()) check(people.has(id), 'UNKNOWN_ELIGIBILITY_IDENTITY');
  for (const o of offices.values()) {
    check(INSTITUTIONS.has(o.institution) && [o.serving, o.permanentSeat, o.recused].every(bool), 'INVALID_OFFICE');
    check(people.has(o.holderIdentityId), 'UNKNOWN_OFFICE_HOLDER');
  }
  for (const key of ['knownInvestigators', 'independentlyDisqualified']) {
    check(Array.isArray(snapshot.conflicts[key]) && snapshot.conflicts[key].every(x => typeof x === 'string' && people.has(x)), 'INVALID_CONFLICTS');
  }
  check(Array.isArray(snapshot.conflicts.sourceEventIds) && snapshot.conflicts.sourceEventIds.length > 0
    && snapshot.conflicts.sourceEventIds.every(x => typeof x === 'string' && x.length > 0), 'MISSING_CONFLICT_PROVENANCE');
  check(Array.isArray(snapshot.participation.events), 'MISSING_PARTICIPATION_LEDGER');
  const historical = new Set(accusationParticipants);
  for (const e of snapshot.participation.events) {
    check(typeof e.identityId === 'string' && e.sourceEventId && ['ACCUSATION', 'TRIAL'].includes(e.stage)
      && ['SERVED', 'DELIBERATED', 'BALLOT'].includes(e.eventType), 'INVALID_PARTICIPATION');
    if (e.stage === 'ACCUSATION') historical.add(e.identityId);
  }
  for (const institution of ['HOUSE', 'SENATE']) {
    const r = snapshot.rules[institution];
    check(r && [r.quorum, r.threshold, r.denominator].every(x => Number.isSafeInteger(x) && x > 0)
      && r.quorum <= r.denominator && r.threshold <= r.denominator, 'INVALID_ORDINARY_RULES');
  }
  return { people, offices, roles, historical };
}

/** Plan one stage. The provisional trial capacity is never an assigned roster. */
export function planBootstrapStage({ snapshot, caseId, accusedId, stage, seed,
  accusationParticipants = [], validateAssignment }) {
  requireId(caseId); requireId(accusedId); requireId(seed);
  if (!['ACCUSATION', 'TRIAL'].includes(stage)) fail('INVALID_STAGE');
  if (typeof validateAssignment !== 'function') fail('ASSIGNMENT_VALIDATOR_REQUIRED');
  const exclusions = [], drawAudit = [];
  try {
    const { people, offices, roles, historical } = validateSnapshot(snapshot, caseId, accusationParticipants);
    check(people.has(accusedId), 'UNKNOWN_ACCUSED');
    const institution = stage === 'ACCUSATION' ? 'HOUSE' : 'SENATE';
    const candidates = [], trialIds = new Set();
    for (const p of [...people.values()].sort((a, b) => a.identityId < b.identityId ? -1 : a.identityId > b.identityId ? 1 : 0)) {
      const held = [...offices.values()].filter(o => o.holderIdentityId === p.identityId && o.serving);
      const judge = held.some(o => JUDICIARY.has(o.institution));
      if ('servingJudge' in p) check(p.servingJudge === judge, 'JUDICIAL_SOURCE_CONFLICT');
      const reasons = [];
      if (p.identityId === accusedId) reasons.push('ACCUSED');
      if (judge) reasons.push('SERVING_JUDICIARY');
      if (!p.alive) reasons.push('NOT_LIVING');
      if (!p.willing) reasons.push('UNWILLING');
      if (p.jailed) reasons.push('JAILED');
      if (p.disenfranchised) reasons.push('DISENFRANCHISED');
      if (held.some(o => o.recused)) reasons.push('RECUSED');
      const r = roles.get(p.identityId);
      const accPermanent = held.some(o => o.institution === 'HOUSE' && o.permanentSeat && !o.recused);
      const trialPermanent = held.some(o => o.institution === 'SENATE' && o.permanentSeat && !o.recused);
      const trialConflict = historical.has(p.identityId) || snapshot.conflicts.knownInvestigators.includes(p.identityId)
        || snapshot.conflicts.independentlyDisqualified.includes(p.identityId);
      const accEligible = !reasons.length && r.accusation && (accPermanent || p.citizen);
      const trialEligible = !reasons.length && r.trial && !trialConflict && (trialPermanent || p.citizen);
      if (trialEligible) trialIds.add(p.identityId);
      const eligible = stage === 'ACCUSATION' ? accEligible : trialEligible;
      if (!eligible) {
        if (!r[stage === 'ACCUSATION' ? 'accusation' : 'trial']) reasons.push('ROLE_INELIGIBLE', ...r.reasonCodes);
        if (!p.citizen && !(stage === 'ACCUSATION' ? accPermanent : trialPermanent)) reasons.push('NOT_CIVILIAN_OR_MEMBER');
        if (stage === 'TRIAL' && trialConflict) reasons.push(historical.has(p.identityId) ? 'ACCUSATION_PARTICIPANT' : 'KNOWN_TRIAL_CONFLICT');
        exclusions.push({ identityId: p.identityId, reasonCodes: reasons, sourceIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId) });
      }
      if (eligible) candidates.push({ identityId: p.identityId, divisionId: p.divisionId,
        permanent: stage === 'ACCUSATION' ? accPermanent : trialPermanent });
    }
    const permanent = candidates.filter(p => p.permanent);
    const ordinary = snapshot.rules[institution];
    check(permanent.length <= ordinary.denominator, 'OFFICE_SEAT_OVERFLOW');
    const mature = permanent.length >= ordinary.quorum && permanent.length >= ordinary.threshold;
    const mode = `${institution}_${mature ? 'MATURE' : 'BOOTSTRAP'}`;
    const capacity = stage === 'ACCUSATION' ? new Set([...candidates.map(p => p.identityId), ...trialIds]).size
      : historical.size + candidates.length;
    const size = mature ? permanent.length : stage === 'ACCUSATION' ? bootstrapPanelSizes(capacity).accusation : Math.min(12, candidates.length);
    const threshold = mature ? ordinary.threshold : stage === 'ACCUSATION' ? accusationThreshold(size) : size >= 6 ? trialThreshold(size) : null;
    const common = { mode, targetSize: size, affirmativeThreshold: threshold, denominator: mature ? ordinary.denominator : size,
      capacity, snapshotIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId), sourceVersions: Object.fromEntries(SOURCE_NAMES.map(k => [k, snapshot[k].version])),
      rulesetVersion: snapshot.eligibility.rulesetVersion, revealedSeed: seed, seedCommitment: seedCommitment(seed),
      algorithmVersion: ALGORITHM_VERSION, exclusions, drawAudit };
    const waiting = reason => ({ ...common, status: ImpeachmentStage.WAITING, reason, roster: [], alternates: [] });
    if (!mature && (stage === 'ACCUSATION' ? trialIds.size < 6 || capacity - size < 6 || candidates.length < size : size < 6)) return waiting('INSUFFICIENT_DISJOINT_POOL');
    const selected = [], alternates = [];
    const tiers = mature ? [permanent] : [permanent, candidates.filter(p => !p.permanent)];
    let drawIndex = 0;
    for (const tier of tiers) {
      const remaining = [...tier], counts = new Map(), drawn = new Map();
      for (const p of tier) counts.set(p.divisionId, (counts.get(p.divisionId) ?? 0) + 1);
      let accepted = 0;
      while (remaining.length) {
        const ranked = remaining.map(p => ({ p,
          deviation: [...counts].reduce((sum, [division, n]) => sum + Math.abs(
            ((drawn.get(division) ?? 0) + (p.divisionId === division ? 1 : 0)) * tier.length - n * (accepted + 1)), 0),
          hash: digest([seed, caseId, stage, p.identityId, drawIndex, ALGORITHM_VERSION]),
        })).sort((a, b) => a.deviation - b.deviation || (a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : a.p.identityId.localeCompare(b.p.identityId)));
        const candidate = ranked[0];
        remaining.splice(remaining.findIndex(p => p.identityId === candidate.p.identityId), 1);
        const record = { identityId: candidate.p.identityId, tier: candidate.p.permanent ? 'PERMANENT' : 'CIVILIAN', drawIndex: drawIndex++, hash: candidate.hash, deviation: candidate.deviation };
        if (selected.length === size) { alternates.push(candidate.p.identityId); continue; }
        if (!mature && stage === 'ACCUSATION') {
          const used = new Set([...selected, candidate.p.identityId]);
          if ([...trialIds].filter(id => !used.has(id)).length < 6) { drawAudit.push({ ...record, result: 'RESERVED_TRIAL_CAPACITY' }); continue; }
        }
        const validation = validateAssignment(candidate.p.identityId, stage);
        check(validation && !validation.then && bool(validation.valid) && typeof validation.sourceEventId === 'string' && validation.sourceEventId.length > 0, 'INVALID_ASSIGNMENT_VALIDATION');
        if (!validation.valid) {
          check(typeof validation.reasonCode === 'string' && validation.reasonCode.length > 0, 'MISSING_REPLACEMENT_REASON');
          drawAudit.push({ ...record, result: 'REJECTED', reasonCode: validation.reasonCode, sourceEventId: validation.sourceEventId }); continue;
        }
        selected.push(candidate.p.identityId); accepted++;
        drawn.set(candidate.p.divisionId, (drawn.get(candidate.p.divisionId) ?? 0) + 1);
        drawAudit.push({ ...record, result: 'ASSIGNED', sourceEventId: validation.sourceEventId });
      }
    }
    if (selected.length !== size) return waiting('DRAW_EXHAUSTED');
    return { ...common, status: `${stage}_EMPANELED`, roster: selected, alternates };
  } catch (error) {
    if (error.code !== 'INPUT_DISCREPANCY') throw error;
    return { status: `${stage}_INPUT_DISCREPANCY_REVIEW`, reason: error.message, roster: [], exclusions, drawAudit };
  }
}
