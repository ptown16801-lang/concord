import { EligibilityRegistry, EligibilityEventType } from './eligibility.js';
import { digest, fail, requireId } from './bootstrap-impeachment.js';

/** Durable command log around the unchanged JON-79 reducer. */
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
    const principal = await this.#authenticate(structuredClone(command), credential);
    if (!principal?.id) fail('UNAUTHORIZED');
    return this.#store.transact({ ...command, stream: 'eligibility' }, principal, (history, db) => {
      if (!Array.isArray(command.commands) || !command.commands.length) fail('EMPTY_BATCH');
      const normalized = command.commands.map(c => {
        if (!Object.values(EligibilityEventType).includes(c.type)) fail('UNKNOWN_TRANSITION');
        if (typeof c.effectiveAt !== 'string' || !Number.isFinite(Date.parse(c.effectiveAt))) fail('INVALID_TIME');
        const time = new Date(c.effectiveAt).toISOString();
        if (Date.parse(time) > Date.now()) fail('FUTURE_TRANSITION');
        const ids = c.type === EligibilityEventType.C4_CREATION_EVENT_OPEN ? c.affectedIdentityIds : [c.identityId];
        if (!Array.isArray(ids) || !ids.length) fail('MISSING_IDENTITIES');
        for (const id of ids) {
          requireId(id);
          if (!db.prepare('SELECT id FROM population_identities WHERE id=?').get(id)) fail('UNKNOWN_POPULATION_IDENTITY');
        }
        if (['FORMAL_PROCEEDING_OPENED', 'FORMAL_PROCEEDING_CLOSED', 'C4_CREATION_EVENT_OPEN', 'C4_RESTRICTION_CLOSED'].includes(c.type)) requireId(c.proceedingId);
        // Never persist caller authentication assertions or arbitrary substantive evidence.
        const result = { type: c.type, effectiveAt: time };
        for (const key of ['identityId', 'affectedIdentityIds', 'proceedingId', 'allegationId', 'convictionId']) if (c[key] !== undefined) result[key] = c[key];
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
  // Every authority that contributes content contributes to the snapshot ID and version.
  if (!Number.isSafeInteger(roleMetadataVersion) || roleMetadataVersion < 0) fail('INPUT_DISCREPANCY', 'MISSING_ROLE_METADATA_VERSION');
  if (!Number.isSafeInteger(eligibility.version) || eligibility.version < 0) fail('INPUT_DISCREPANCY', 'INVALID_SOURCE_VERSION');
  const authorityVersions = { population: db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM population_events').get().n,
    eligibility: eligibility.version, roleMetadata: roleMetadataVersion };
  const version = authorityVersions.population + authorityVersions.eligibility + authorityVersions.roleMetadata;
  const tag = `p${authorityVersions.population}.e${authorityVersions.eligibility}.r${authorityVersions.roleMetadata}`;
  const terminal = new Map(db.prepare("SELECT identity_id, sequence FROM population_events WHERE event_type='terminal'").all().map(e => [e.identity_id, `population-event:${e.sequence}`]));
  const log = eligibility.auditLog();
  const byId = new Map();
  for (const row of roleMetadata) {
    if (byId.has(row.identityId)) fail('INPUT_DISCREPANCY', 'DUPLICATE_ROLE_METADATA');
    byId.set(row.identityId, row);
  }
  if (byId.size !== rows.length) fail('INPUT_DISCREPANCY', 'INCOMPLETE_ROLE_METADATA');
  const roleEligibility = [], identities = [], asserted = { population: [], eligibility: [] };
  for (const row of rows) {
    const role = byId.get(row.id), franchise = eligibility.stateAt(row.id);
    if (!role || !franchise) fail('INPUT_DISCREPANCY', 'MISSING_ELIGIBILITY_IDENTITY');
    const alive = row.terminal_at === null;
    if (franchise.living !== alive) fail('INPUT_DISCREPANCY', 'POPULATION_ELIGIBILITY_LIFECYCLE_MISMATCH');
    if (![role.citizen, role.willing, role.jailed, role.accusation, role.trial].every(x => typeof x === 'boolean')) fail('INPUT_DISCREPANCY', 'INCOMPLETE_ROLE_METADATA');
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
  const own = name => ({ snapshotId: `${name}:${authorityVersions[name]}`, version: authorityVersions[name] });
  const authoritySources = roleFacts => ({ population: own('population'), eligibility: own('eligibility'), roleMetadata: { ...own('roleMetadata'), digest: digest(roleFacts) } });
  return {
    population: { snapshotId: `population:${tag}`, version, authorityVersions, authoritySources: authoritySources(asserted.population), identities },
    eligibility: { snapshotId: `eligibility:${tag}`, version, authorityVersions, authoritySources: authoritySources([rulesetVersion, asserted.eligibility]),
      populationVersion: version, rulesetVersion, roleEligibility },
  };
}
