import { EligibilityRegistry, EligibilityEventType } from './eligibility.js';
import { digest, fail, requireId, inputDiscrepancy, sourceReference, sourceData } from './bootstrap-impeachment.js';
import { attributable, denseArray, assertDenseArrays } from '../validation.js';

// The fields each eligibility command type uses. A field outside its type's list is rejected, never journaled.
const T = EligibilityEventType;
const COMMAND_FIELDS = {
  [T.IDENTITY_REGISTERED]: ['identityId'], [T.ALLEGATION_RECORDED]: ['identityId', 'allegationId'],
  [T.FORMAL_PROCEEDING_OPENED]: ['identityId', 'proceedingId'], [T.FORMAL_PROCEEDING_CLOSED]: ['identityId', 'proceedingId'],
  [T.C4_CREATION_EVENT_OPEN]: ['affectedIdentityIds', 'proceedingId'], [T.C4_RESTRICTION_CLOSED]: ['identityId', 'proceedingId'],
  [T.DEATH_RECORDED]: ['identityId'], [T.CAPITAL_TERMINATION_RECORDED]: ['identityId'], [T.FELONY_CONVICTION_ENTERED]: ['identityId', 'convictionId'],
};

/** Durable command log around the JON-79 reducer, using the same identifier policy. */
export class DurableEligibility {
  #store; #authenticate;
  constructor({ eventStore, authenticate }) { this.#store = eventStore; this.#authenticate = authenticate; }
  projection() {
    let replayTime = null;
    const registry = new EligibilityRegistry({ clock: () => replayTime ?? new Date() });
    for (const event of this.#store.load('eligibility')) {
      replayTime = new Date(event.recordedAt);
      registry.applyBatch(event.commands);
    }
    replayTime = null;
    return registry;
  }
  async apply(input, credential) {
    const command = structuredClone(input);
    if (command.type !== 'ELIGIBILITY') fail('UNKNOWN_COMMAND');
    requireId(command.commandId);
    const principal = await this.#authenticate(structuredClone(command), credential);
    if (!attributable(principal?.id)) fail('UNAUTHORIZED');
    return this.#store.transact({ ...command, stream: 'eligibility' }, principal, (history, db) => {
      if (!denseArray(command.commands) || !command.commands.length) fail('EMPTY_BATCH');
      const normalized = command.commands.map(c => {
        if (!Object.values(EligibilityEventType).includes(c.type)) fail('UNKNOWN_TRANSITION');
        const fields = COMMAND_FIELDS[c.type];
        for (const key of ['identityId', 'affectedIdentityIds', 'proceedingId', 'allegationId', 'convictionId']) if (key in c && !fields.includes(key)) fail('UNEXPECTED_FIELD');
        if (typeof c.effectiveAt !== 'string' || !Number.isFinite(Date.parse(c.effectiveAt))) fail('INVALID_TIME');
        const time = new Date(c.effectiveAt).toISOString();
        if (Date.parse(time) > Date.now()) fail('FUTURE_TRANSITION');
        const ids = c.type === EligibilityEventType.C4_CREATION_EVENT_OPEN ? c.affectedIdentityIds : [c.identityId];
        if (!denseArray(ids) || !ids.length) fail('MISSING_IDENTITIES');
        // Every scalar field in the command schema is an ID; none bypasses the shared policy.
        for (const key of fields) if (key !== 'affectedIdentityIds') requireId(c[key]);
        for (const id of ids) {
          requireId(id);
          if (!db.prepare('SELECT id FROM population_identities WHERE id=?').get(id)) fail('UNKNOWN_POPULATION_IDENTITY');
        }
        // Never persist caller authentication assertions or arbitrary substantive evidence.
        const result = { type: c.type, effectiveAt: time };
        for (const key of fields) if (c[key] !== undefined) result[key] = c[key];
        if (c.type === EligibilityEventType.C4_CREATION_EVENT_OPEN) result.authentication = { authorityId: principal.id };
        return result;
      });
      const registry = this.projection(); registry.applyBatch(normalized);
      return [{ type: 'ELIGIBILITY_COMMANDS', commands: normalized }];
    });
  }
}

const FRANCHISE_EVENTS = { DECEASED: 'DEATH_RECORDED', CAPITAL_TERMINATED: 'CAPITAL_TERMINATION_RECORDED', PERMANENT_FELONY_BAR: 'FELONY_CONVICTION_ENTERED',
  FORMAL_PROCEEDING: 'FORMAL_PROCEEDING_OPENED', C4_TEMPORARY_RESTRICTION: 'C4_CREATION_EVENT_OPEN' };
// canonical() rejects undefined and non-JSON values, so a fact without a source event ID (a string) has no key at all.
const sourced = object => Object.fromEntries(Object.entries(object).filter(([, value]) => typeof value === 'string'));
function eligibilityEvent(log, identityId, type, proceedingId) {
  const event = log.findLast(e => e.type === type && (e.identityId === identityId || e.affectedIdentityIds?.includes(identityId))
    && (proceedingId === undefined || e.proceedingId === proceedingId));
  return event && `eligibility-event:${event.version}`;
}

/** Read the accepted JON-78 tables and JON-79 projection in the journal transaction.
 * Membership/office/conflict authorities must supply explicit role metadata;
 * identityClass never silently becomes citizenship or role eligibility.
 * roleMetadataVersion is ONE authority-wide, monotonic counter (the population scope is
 * shared by every case); it must advance on any change to roleMetadata, including its
 * sourceEventIds, or to rulesetVersion. Source events are cited from real records only.
 * authoritySources gives each authority's own record, so the store can also reject a rollback
 * or unversioned change in one authority that an advance in another would otherwise hide.
 */
export function captureRegistryInputs(db, eligibility, { roleMetadata, roleMetadataVersion, rulesetVersion }) {
  const rows = db.prepare('SELECT id, division, terminal_at FROM population_identities ORDER BY id').all();
  const authorityVersions = { population: db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM population_events').get().n,
    eligibility: eligibility?.version, roleMetadata: roleMetadataVersion };
  const own = name => Number.isSafeInteger(authorityVersions[name]) && authorityVersions[name] >= 0
    ? { snapshotId: `${name}:${authorityVersions[name]}`, version: authorityVersions[name] } : undefined;
  const reject = (reason, ...names) => inputDiscrepancy(reason, names.map(name => sourceReference(name, own(name))));
  // Every contributing authority has its own attributable reference, even when another input is defective.
  if (!own('roleMetadata')) reject('MISSING_ROLE_METADATA_VERSION', 'roleMetadata');
  if (!own('eligibility')) reject('INVALID_SOURCE_VERSION', 'eligibility');
  if (!attributable(rulesetVersion)) reject('MISSING_RULESET', 'roleMetadata');
  sourceData('roleMetadata', own('roleMetadata'), () => assertDenseArrays(roleMetadata));
  if (!Array.isArray(roleMetadata)) reject('INCOMPLETE_ROLE_METADATA', 'roleMetadata');
  const version = authorityVersions.population + authorityVersions.eligibility + authorityVersions.roleMetadata;
  const tag = `p${authorityVersions.population}.e${authorityVersions.eligibility}.r${authorityVersions.roleMetadata}`;
  const terminal = new Map(db.prepare("SELECT identity_id, sequence FROM population_events WHERE event_type='terminal'").all().map(e => [e.identity_id, `population-event:${e.sequence}`]));
  const log = sourceData('eligibility', own('eligibility'), () => { const events = eligibility.auditLog(); assertDenseArrays(events); return events; });
  const byId = new Map();
  for (const row of roleMetadata) {
    if (!row || !attributable(row.identityId)) reject('INVALID_ROLE_METADATA', 'roleMetadata');
    if (byId.has(row.identityId)) reject('DUPLICATE_ROLE_METADATA', 'roleMetadata');
    byId.set(row.identityId, row);
  }
  if (byId.size !== rows.length) reject('INCOMPLETE_ROLE_METADATA', 'roleMetadata');
  const roleEligibility = [], identities = [], asserted = { population: [], eligibility: [] };
  for (const row of rows) {
    const role = byId.get(row.id), franchise = eligibility.stateAt(row.id);
    if (!role) reject('MISSING_ELIGIBILITY_IDENTITY', 'roleMetadata');
    if (!franchise) reject('MISSING_ELIGIBILITY_IDENTITY', 'eligibility');
    const alive = row.terminal_at === null;
    if (franchise.living !== alive) reject('POPULATION_ELIGIBILITY_LIFECYCLE_MISMATCH', 'population', 'eligibility');
    if (![role.citizen, role.willing, role.jailed, role.accusation, role.trial].every(x => typeof x === 'boolean')) reject('INCOMPLETE_ROLE_METADATA', 'roleMetadata');
    const given = role.sourceEventIds ?? {};
    // What the role authority itself asserts in each snapshot, kept under its own version.
    asserted.population.push([row.id, role.citizen, role.willing, role.jailed, sourced({ citizen: given.citizen, willing: given.willing, jailed: given.jailed })]);
    asserted.eligibility.push([row.id, role.accusation, role.trial, sourced({ accusation: given.accusation, trial: given.trial })]);
    // The franchise event behind the projection's reason; a stage flag the role authority set false cites that authority instead.
    const franchiseEvent = franchise.reason ? eligibilityEvent(log, row.id, FRANCHISE_EVENTS[franchise.reason],
      { FORMAL_PROCEEDING: franchise.openFormalProceedingIds[0], C4_TEMPORARY_RESTRICTION: franchise.openC4RestrictionIds[0] }[franchise.reason]) : undefined;
    identities.push({ identityId: row.id, alive, divisionId: row.division,
      citizen: role.citizen, willing: role.willing, jailed: role.jailed, disenfranchised: franchise.permanentlyDisenfranchised,
      sourceEventIds: sourced({ alive: alive ? undefined : terminal.get(row.id), citizen: given.citizen, willing: given.willing, jailed: given.jailed,
        disenfranchised: franchise.permanentlyDisenfranchised ? eligibilityEvent(log, row.id, 'FELONY_CONVICTION_ENTERED') : undefined }) });
    roleEligibility.push({ identityId: row.id,
      accusation: role.accusation && franchise.eligible, trial: role.trial && franchise.eligible,
      reasonCodes: franchise.reason ? [franchise.reason] : [],
      sourceEventIds: sourced({ accusation: role.accusation ? franchiseEvent : given.accusation, trial: role.trial ? franchiseEvent : given.trial }),
      reasonSourceEventIds: sourced(franchise.reason ? { [franchise.reason]: franchiseEvent } : {}) });
  }
  // The population and eligibility logs are fixed by their version; role metadata only by what it asserted.
  const authoritySources = roleFacts => ({ population: own('population'), eligibility: own('eligibility'), roleMetadata: { ...own('roleMetadata'), digest: digest(roleFacts) } });
  return {
    population: { snapshotId: `population:${tag}`, version, authorityVersions, authoritySources: authoritySources(asserted.population), identities },
    eligibility: { snapshotId: `eligibility:${tag}`, version, authorityVersions, authoritySources: authoritySources([rulesetVersion, asserted.eligibility]),
      // The eligibility authority's own reason codes: the franchise reasons its projection can report.
      populationVersion: version, rulesetVersion, validReasonCodes: Object.keys(FRANCHISE_EVENTS), roleEligibility },
  };
}
