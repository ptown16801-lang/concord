import { createHash } from 'node:crypto';
import { attributable, denseArray, assertDenseArrays } from '../validation.js';
export { attributable } from '../validation.js';

export const ALGORITHM_VERSION = 'bootstrap-stratified-v1';
export const ImpeachmentStage = Object.freeze({ WAITING: 'WAITING_FOR_INDEPENDENT_PARTICIPANTS', ACCUSATION: 'ACCUSATION_EMPANELED', TRIAL: 'TRIAL_EMPANELED', ACQUITTED: 'ACQUITTED', CONVICTED: 'CONVICTED' });
export class BootstrapImpeachmentError extends Error {
  constructor(code, message = code) { super(message); this.name = 'BootstrapImpeachmentError'; this.code = code; }
}
export function fail(code, message) { throw new BootstrapImpeachmentError(code, message); }
export function requireId(value) {
  if (!attributable(value)) fail('INVALID_IDENTIFIER');
  return value;
}
export function canonical(value) {
  try { assertDenseArrays(value); } catch { fail('INVALID_JSON'); }
  const ancestors = new WeakSet();
  const encode = item => {
    if (item === null || ['string', 'boolean'].includes(typeof item) || (typeof item === 'number' && Number.isFinite(item))) return JSON.stringify(item);
    if (!item || typeof item !== 'object' || ancestors.has(item)) fail('INVALID_JSON');
    const array = Array.isArray(item);
    if (array ? !denseArray(item) : ![Object.prototype, null].includes(Object.getPrototypeOf(item))) fail('INVALID_JSON');
    ancestors.add(item);
    const text = array ? `[${item.map(encode).join(',')}]`
      : `{${Object.keys(item).sort().map(k => `${JSON.stringify(k)}:${encode(item[k])}`).join(',')}}`;
    ancestors.delete(item);
    return text;
  };
  return encode(value);
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
// The sole list of versioned composition sources: capture, storage, commitments, panels and retries use it.
export const SOURCE_NAMES = Object.freeze(['population', 'office', 'eligibility', 'conflicts', 'rules', 'participation', 'assignmentValidation']);
const JUDICIARY = new Set(['DISTRICT', 'CIRCUIT', 'SUPREME_BOARD']);
const INSTITUTIONS = new Set(['HOUSE', 'SENATE', ...JUDICIARY]);
const bool = value => typeof value === 'boolean';

// Never copy a malformed ID or source payload into the public composition journal.
export function sourceReference(authority, source) {
  let id;
  try { id = source?.snapshotId; } catch { /* The source did not supply a readable identifier. */ }
  return attributable(id) ? { authority, snapshotId: id }
    : { authority, snapshotId: null, snapshotIdStatus: id === undefined ? 'MISSING' : 'INVALID' };
}
export function inputDiscrepancy(reason, references) {
  const error = new BootstrapImpeachmentError('INPUT_DISCREPANCY', reason);
  error.discrepancySources = references;
  throw error;
}
export function sourceData(authority, source, read) {
  try { return read(); }
  catch (error) {
    // Preserve narrower attribution from a composed adapter, but retain only reference fields.
    const refs = error?.discrepancySources;
    const safe = denseArray(refs) && refs.length > 0 && refs.every(r => r && attributable(r.authority)
      && (attributable(r.snapshotId) || (r.snapshotId === null && ['MISSING', 'INVALID'].includes(r.snapshotIdStatus))));
    const reason = error?.code === 'INPUT_DISCREPANCY' && /^[A-Z][A-Z0-9_]{0,63}$/.test(error.message)
      ? error.message : 'MALFORMED_SOURCE_SNAPSHOT';
    inputDiscrepancy(reason, safe ? refs.map(r => r.snapshotId === null
      ? { authority: r.authority, snapshotId: null, snapshotIdStatus: r.snapshotIdStatus }
      : { authority: r.authority, snapshotId: r.snapshotId }) : [sourceReference(authority, source)]);
  }
}
export function copySource(authority, raw) {
  return sourceData(authority, raw, () => {
    const contributors = raw?.authoritySources;
    if (contributors !== undefined && contributors !== null) {
      if (typeof contributors !== 'object' || Array.isArray(contributors)) {
        inputDiscrepancy('INVALID_AUTHORITY_SOURCES', [sourceReference(authority, raw)]);
      }
      for (const [name, own] of Object.entries(contributors)) {
        if (!attributable(name)) inputDiscrepancy('INVALID_AUTHORITY_NAME', [sourceReference(authority, raw)]);
        sourceData(name, own, () => canonical(own));
      }
    }
    if (raw !== undefined) canonical(raw);
    return structuredClone(raw);
  });
}
function checksFor(snapshot, additional = {}) {
  return (condition, reason, ...authorities) => {
    if (!condition) inputDiscrepancy(reason, (authorities.length ? authorities : SOURCE_NAMES)
      .map(name => sourceReference(name, Object.hasOwn(additional, name) ? additional[name] : snapshot?.[name])));
  };
}
// A stable reason code (spec 5.3): capitals, digits and underscores, never free text (5.5).
const reasonCode = value => typeof value === 'string' && /^[A-Z][A-Z0-9_]{0,63}$/.test(value);
// Codes the planner derives itself under the spec. An authority may not list them: it cannot assert, say,
// SERVING_JUDICIARY for someone the office source does not show as a serving judge.
const CONCORD_CODES = new Set(['ACCUSED', 'SERVING_JUDICIARY', 'NOT_LIVING', 'UNWILLING', 'JAILED', 'DISENFRANCHISED', 'RECUSED',
  'ROLE_INELIGIBLE', 'NOT_CIVILIAN_OR_MEMBER', 'ACCUSATION_PARTICIPANT', 'KNOWN_TRIAL_CONFLICT']);
// Reason codes from an authority must be listed by that authority in the same snapshot; Concord does not
// hard-code them. A missing or malformed list is a defective source, not an empty one.
function codeList(list, check) {
  check(Array.isArray(list) && list.every(reasonCode) && new Set(list).size === list.length, 'INVALID_REASON_CODE_LIST');
  check(!list.some(code => CONCORD_CODES.has(code)), 'REASON_CODE_COLLISION');
  return new Set(list);
}
function unique(rows, key, check) {
  check(Array.isArray(rows), 'MISSING_ROWS');
  const map = new Map();
  for (const row of rows) {
    check(row && attributable(row[key]), 'INVALID_IDENTITY_ROW');
    if (map.has(row[key])) check(canonical(map.get(row[key])) === canonical(row), 'CONTRADICTORY_DUPLICATE');
    map.set(row[key], row);
  }
  return map;
}
function validateSnapshot(snapshot, caseId, accusationParticipants, accusationPanelSourceEventId, caseSnapshot) {
  const check = checksFor(snapshot, { caseJournal: caseSnapshot });
  for (const source of SOURCE_NAMES) {
    const s = snapshot?.[source];
    check(s && attributable(s.snapshotId), 'MISSING_SNAPSHOT', source);
    check(Number.isSafeInteger(s.version) && s.version >= 0, 'INVALID_SOURCE_VERSION', source);
    copySource(source, s);
  }
  sourceData('compositionCapture', snapshot, () => canonical(snapshot));
  check(snapshot.eligibility.populationVersion === snapshot.population.version, 'POPULATION_ELIGIBILITY_VERSION_MISMATCH', 'population', 'eligibility');
  check(attributable(snapshot.eligibility.rulesetVersion), 'MISSING_RULESET', 'eligibility');
  for (const name of ['conflicts', 'participation']) check(snapshot[name].caseId === caseId, 'WRONG_CASE', name);
  const eligibilityCheck = (condition, reason) => check(condition, reason, 'eligibility');
  const assignmentCheck = (condition, reason) => check(condition, reason, 'assignmentValidation');
  const eligibilityCodes = codeList(snapshot.eligibility.validReasonCodes, eligibilityCheck);
  const replacementCodes = codeList(snapshot.assignmentValidation.validReasonCodes, assignmentCheck);
  const people = unique(snapshot.population.identities, 'identityId', (c, r) => check(c, r, 'population'));
  const offices = unique(snapshot.office.offices, 'officeId', (c, r) => check(c, r, 'office'));
  const roles = unique(snapshot.eligibility.roleEligibility, 'identityId', eligibilityCheck);
  for (const p of [...people.values()].sort((a, b) => a.identityId < b.identityId ? -1 : a.identityId > b.identityId ? 1 : 0)) {
    check([p.alive, p.citizen, p.willing, p.jailed, p.disenfranchised].every(bool), 'INCOMPLETE_POPULATION', 'population');
    check(p.divisionId === null || attributable(p.divisionId), 'INVALID_DIVISION', 'population');
    const role = roles.get(p.identityId);
    eligibilityCheck(role && [role.accusation, role.trial].every(bool) && Array.isArray(role.reasonCodes), 'MISSING_ROLE_ELIGIBILITY');
    // Reason codes are frozen into panel records; anything but a plain code is defective eligibility metadata.
    eligibilityCheck(role.reasonCodes.every(code => eligibilityCodes.has(code)) && new Set(role.reasonCodes).size === role.reasonCodes.length, 'INVALID_ELIGIBILITY_REASON');
  }
  for (const id of roles.keys()) eligibilityCheck(people.has(id), 'UNKNOWN_ELIGIBILITY_IDENTITY');
  for (const o of offices.values()) {
    check(INSTITUTIONS.has(o.institution) && [o.serving, o.permanentSeat, o.recused].every(bool), 'INVALID_OFFICE', 'office');
    check(attributable(o.holderIdentityId) && people.has(o.holderIdentityId), 'UNKNOWN_OFFICE_HOLDER', 'office');
  }
  for (const key of ['knownInvestigators', 'independentlyDisqualified']) {
    check(Array.isArray(snapshot.conflicts[key]) && snapshot.conflicts[key].every(x => attributable(x) && people.has(x)), 'INVALID_CONFLICTS', 'conflicts');
  }
  check(Array.isArray(snapshot.conflicts.sourceEventIds) && snapshot.conflicts.sourceEventIds.length > 0
    && snapshot.conflicts.sourceEventIds.every(attributable), 'MISSING_CONFLICT_PROVENANCE', 'conflicts');
  check(Array.isArray(snapshot.participation.events), 'MISSING_PARTICIPATION_LEDGER', 'participation');
  sourceData('caseJournal', caseSnapshot, () => canonical(accusationParticipants ?? []));
  check(Array.isArray(accusationParticipants ?? []) && (accusationParticipants ?? []).every(attributable), 'INVALID_PARTICIPATION', 'caseJournal');
  // identityId -> source event: the ledger's own event (smallest when several), else the case's frozen accusation panel event.
  const historical = new Map([...(accusationParticipants ?? [])].map(id => [id, accusationPanelSourceEventId])), ledger = new Map();
  const historicalAuthorities = new Map([...historical.keys()].map(id => [id, 'caseJournal']));
  for (const e of snapshot.participation.events) {
    check(e && attributable(e.identityId) && people.has(e.identityId)
      && attributable(e.sourceEventId) && ['ACCUSATION', 'TRIAL'].includes(e.stage)
      && ['SERVED', 'DELIBERATED', 'BALLOT'].includes(e.eventType), 'INVALID_PARTICIPATION', 'participation');
    if (e.stage === 'ACCUSATION' && !(ledger.get(e.identityId) <= e.sourceEventId)) ledger.set(e.identityId, e.sourceEventId);
  }
  for (const [id, sourceEventId] of ledger) { historical.set(id, sourceEventId); historicalAuthorities.set(id, 'participation'); }
  for (const institution of ['HOUSE', 'SENATE']) {
    const r = snapshot.rules[institution];
    check(r && [r.quorum, r.threshold, r.denominator].every(x => Number.isSafeInteger(x) && x > 0)
      && r.quorum <= r.denominator && r.threshold <= r.denominator, 'INVALID_ORDINARY_RULES', 'rules');
  }
  return { people, offices, roles, historical, historicalAuthorities, replacementCodes };
}

/** Plan one stage. The provisional trial capacity is never an assigned roster. */
export function planBootstrapStage({ snapshot, caseId, accusedId, stage, seed,
  accusationParticipants = [], accusedSourceEventId, accusationPanelSourceEventId, caseSnapshot, validateAssignment }) {
  requireId(caseId); requireId(accusedId); requireId(seed);
  if (!['ACCUSATION', 'TRIAL'].includes(stage)) fail('INVALID_STAGE');
  if (typeof validateAssignment !== 'function') fail('ASSIGNMENT_VALIDATOR_REQUIRED');
  const exclusions = [], drawAudit = [];
  const check = checksFor(snapshot, { caseJournal: caseSnapshot });
  try {
    const { people, offices, roles, historical, historicalAuthorities, replacementCodes } = validateSnapshot(snapshot, caseId, accusationParticipants, accusationPanelSourceEventId, caseSnapshot);
    check(people.has(accusedId), 'UNKNOWN_ACCUSED', 'population', 'caseJournal');
    const institution = stage === 'ACCUSATION' ? 'HOUSE' : 'SENATE';
    const candidates = [], trialIds = new Set();
    for (const p of [...people.values()].sort((a, b) => a.identityId < b.identityId ? -1 : a.identityId > b.identityId ? 1 : 0)) {
      const held = [...offices.values()].filter(o => o.holderIdentityId === p.identityId && o.serving).sort((a, b) => a.officeId < b.officeId ? -1 : 1);
      const judge = held.some(o => JUDICIARY.has(o.institution));
      if ('servingJudge' in p) check(p.servingJudge === judge, 'JUDICIAL_SOURCE_CONFLICT', 'population', 'office');
      const reasons = [], reasonSources = [];
      // One attributable source event per recorded reason; a missing one is a discrepancy, never invented.
      const exclude = (reasonCode, sourceEventId, missing, authority) => {
        check(attributable(sourceEventId), missing, authority);
        reasons.push(reasonCode); reasonSources.push({ reasonCode, sourceEventId });
      };
      if (p.identityId === accusedId) exclude('ACCUSED', accusedSourceEventId, 'MISSING_CASE_PROVENANCE', 'caseJournal');
      if (judge) exclude('SERVING_JUDICIARY', held.find(o => JUDICIARY.has(o.institution)).sourceEventIds?.serving, 'MISSING_OFFICE_PROVENANCE', 'office');
      if (!p.alive) exclude('NOT_LIVING', p.sourceEventIds?.alive, 'MISSING_POPULATION_PROVENANCE', 'population');
      if (!p.willing) exclude('UNWILLING', p.sourceEventIds?.willing, 'MISSING_POPULATION_PROVENANCE', 'population');
      if (p.jailed) exclude('JAILED', p.sourceEventIds?.jailed, 'MISSING_POPULATION_PROVENANCE', 'population');
      if (p.disenfranchised) exclude('DISENFRANCHISED', p.sourceEventIds?.disenfranchised, 'MISSING_POPULATION_PROVENANCE', 'population');
      if (held.some(o => o.recused)) exclude('RECUSED', held.find(o => o.recused).sourceEventIds?.recused, 'MISSING_OFFICE_PROVENANCE', 'office');
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
        const flag = stage === 'ACCUSATION' ? 'accusation' : 'trial';
        if (!r[flag]) {
          exclude('ROLE_INELIGIBLE', r.sourceEventIds?.[flag], 'MISSING_ELIGIBILITY_PROVENANCE', 'eligibility');
          for (const code of r.reasonCodes) exclude(code, r.reasonSourceEventIds?.[code], 'MISSING_ELIGIBILITY_PROVENANCE', 'eligibility');
        }
        if (!p.citizen && !(stage === 'ACCUSATION' ? accPermanent : trialPermanent)) exclude('NOT_CIVILIAN_OR_MEMBER', p.sourceEventIds?.citizen, 'MISSING_POPULATION_PROVENANCE', 'population');
        if (stage === 'TRIAL' && trialConflict) {
          const conflictEvent = snapshot.conflicts.identitySourceEventIds?.[p.identityId];
          if (historical.has(p.identityId)) exclude('ACCUSATION_PARTICIPANT', historical.get(p.identityId), 'MISSING_CASE_PROVENANCE', historicalAuthorities.get(p.identityId));
          else exclude('KNOWN_TRIAL_CONFLICT', snapshot.conflicts.sourceEventIds.includes(conflictEvent) ? conflictEvent : undefined, 'MISSING_CONFLICT_PROVENANCE', 'conflicts');
        }
        exclusions.push({ identityId: p.identityId, reasonCodes: reasons, reasonSources, sourceIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId) });
      }
      if (eligible) candidates.push({ identityId: p.identityId, divisionId: p.divisionId,
        permanent: stage === 'ACCUSATION' ? accPermanent : trialPermanent });
    }
    const permanent = candidates.filter(p => p.permanent);
    const ordinary = snapshot.rules[institution];
    check(permanent.length <= ordinary.denominator, 'OFFICE_SEAT_OVERFLOW', 'office', 'rules');
    const mature = permanent.length >= ordinary.quorum && permanent.length >= ordinary.threshold;
    const mode = `${institution}_${mature ? 'MATURE' : 'BOOTSTRAP'}`;
    const capacity = stage === 'ACCUSATION' ? new Set([...candidates.map(p => p.identityId), ...trialIds]).size
      : historical.size + candidates.length;
    const size = mature ? permanent.length : stage === 'ACCUSATION' ? bootstrapPanelSizes(capacity).accusation : Math.min(12, candidates.length);
    const threshold = mature ? ordinary.threshold : stage === 'ACCUSATION' ? accusationThreshold(size) : size >= 6 ? trialThreshold(size) : null;
    const common = { mode, targetSize: size, affirmativeThreshold: threshold, denominator: mature ? ordinary.denominator : size,
      capacity, snapshotIds: SOURCE_NAMES.map(k => snapshot[k].snapshotId), sourceVersions: Object.fromEntries(SOURCE_NAMES.map(k => [k, snapshot[k].version])),
      rulesetVersion: snapshot.eligibility.rulesetVersion, reasonCodeSnapshotId: snapshot.assignmentValidation.snapshotId, revealedSeed: seed, seedCommitment: seedCommitment(seed),
      algorithmVersion: ALGORITHM_VERSION, exclusions, drawAudit };
    const waiting = reason => ({ ...common, status: ImpeachmentStage.WAITING, reason, roster: [], alternates: [] });
    if (!mature && (stage === 'ACCUSATION' ? trialIds.size < 6 || capacity - size < 6 || candidates.length < size : size < 6)) return waiting('INSUFFICIENT_DISJOINT_POOL');
    const selected = [], alternates = [];
    const tiers = mature ? [permanent] : [permanent, candidates.filter(p => !p.permanent)];
    let drawIndex = 0;
    for (const tier of tiers) {
      const remaining = [...tier], counts = new Map(), drawn = new Map();
      // Only recorded divisions contribute to balance; null candidates stay in the tier.
      for (const p of tier) if (p.divisionId !== null) counts.set(p.divisionId, (counts.get(p.divisionId) ?? 0) + 1);
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
        const validation = sourceData('assignmentValidation', snapshot.assignmentValidation, () => {
          const result = validateAssignment(candidate.p.identityId, stage);
          if (result && !result.then) canonical(result);
          return result;
        });
        check(validation && !validation.then && bool(validation.valid) && attributable(validation.sourceEventId), 'INVALID_ASSIGNMENT_VALIDATION', 'assignmentValidation');
        if (!validation.valid) {
          check(replacementCodes.has(validation.reasonCode), 'MISSING_REPLACEMENT_REASON', 'assignmentValidation');
          drawAudit.push({ ...record, result: 'REJECTED', reasonCode: validation.reasonCode, sourceEventId: validation.sourceEventId }); continue;
        }
        selected.push(candidate.p.identityId); accepted++;
        if (candidate.p.divisionId !== null) drawn.set(candidate.p.divisionId, (drawn.get(candidate.p.divisionId) ?? 0) + 1);
        drawAudit.push({ ...record, result: 'ASSIGNED', sourceEventId: validation.sourceEventId });
      }
    }
    if (selected.length !== size) return waiting('DRAW_EXHAUSTED');
    return { ...common, status: `${stage}_EMPANELED`, roster: selected, alternates };
  } catch (error) {
    if (error.code !== 'INPUT_DISCREPANCY') throw error;
    return { status: `${stage}_INPUT_DISCREPANCY_REVIEW`, reason: error.message, discrepancySources: error.discrepancySources, roster: [], exclusions, drawAudit };
  }
}
