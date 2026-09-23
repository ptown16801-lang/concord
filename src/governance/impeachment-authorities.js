import { EligibilityRegistry, EligibilityEventType } from './eligibility.js';
import { fail, requireId } from './bootstrap-impeachment.js';

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

/** Read the accepted JON-78 tables and JON-79 projection in the journal transaction.
 * Membership/office/conflict authorities must supply explicit role metadata;
 * identityClass never silently becomes citizenship or role eligibility.
 */
export function captureRegistryInputs(db, eligibility, { roleMetadata, rulesetVersion, eligibilityVersion }) {
  const rows = db.prepare('SELECT id, division, terminal_at FROM population_identities ORDER BY id').all();
  const populationVersion = db.prepare('SELECT COALESCE(MAX(sequence),0) AS n FROM population_events').get().n;
  const byId = new Map();
  for (const row of roleMetadata) {
    if (byId.has(row.identityId)) fail('INPUT_DISCREPANCY', 'DUPLICATE_ROLE_METADATA');
    byId.set(row.identityId, row);
  }
  if (byId.size !== rows.length) fail('INPUT_DISCREPANCY', 'INCOMPLETE_ROLE_METADATA');
  const roleEligibility = [], identities = [];
  for (const row of rows) {
    const role = byId.get(row.id), franchise = eligibility.stateAt(row.id);
    if (!role || !franchise) fail('INPUT_DISCREPANCY', 'MISSING_ELIGIBILITY_IDENTITY');
    const alive = row.terminal_at === null;
    if (franchise.living !== alive) fail('INPUT_DISCREPANCY', 'POPULATION_ELIGIBILITY_LIFECYCLE_MISMATCH');
    if (![role.citizen, role.willing, role.jailed, role.accusation, role.trial].every(x => typeof x === 'boolean')) fail('INPUT_DISCREPANCY', 'INCOMPLETE_ROLE_METADATA');
    identities.push({ identityId: row.id, alive, divisionId: row.division,
      citizen: role.citizen, willing: role.willing, jailed: role.jailed, disenfranchised: franchise.permanentlyDisenfranchised });
    roleEligibility.push({ identityId: row.id,
      accusation: role.accusation && franchise.eligible, trial: role.trial && franchise.eligible,
      reasonCodes: franchise.reason ? [franchise.reason] : [] });
  }
  return {
    population: { snapshotId: `population:${populationVersion}`, version: populationVersion, identities },
    eligibility: { snapshotId: `eligibility:${eligibilityVersion}`, version: eligibilityVersion,
      populationVersion, rulesetVersion, roleEligibility },
  };
}
