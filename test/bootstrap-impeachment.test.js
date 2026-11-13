import assert from 'node:assert/strict';
import test from 'node:test';
import { fork } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateKeyPairSync, sign } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { PopulationRegistry } from '../src/population/index.js';
import { BootstrapImpeachmentService, ImpeachmentStore, createCommandAuthenticator, DurableEligibility, replayImpeachment,
  captureRegistryInputs, planBootstrapStage, seedCommitment, accusationThreshold, trialThreshold, bootstrapPanelSizes } from '../src/governance/index.js';
import { canonical, digest } from '../src/governance/bootstrap-impeachment.js';

function snapshot(n = 17) {
  const people = Array.from({ length: n + 1 }, (_, i) => ({ identityId: i ? `p${i}` : 'accused',
    alive: true, citizen: true, willing: true, jailed: false, disenfranchised: false, divisionId: `d${i % 4}` }));
  return {
    population: { snapshotId: 'population:1', version: 1, identities: people },
    office: { snapshotId: 'office:1', version: 1, offices: [] },
    eligibility: { snapshotId: 'eligibility:1', version: 1, populationVersion: 1, rulesetVersion: 'r1',
      roleEligibility: people.map(p => ({ identityId: p.identityId, accusation: true, trial: true, reasonCodes: [] })) },
    conflicts: { snapshotId: 'conflicts:1', version: 1, caseId: 'case', knownInvestigators: [], independentlyDisqualified: [], sourceEventIds: ['conflict-check:1'] },
    participation: { snapshotId: 'participation:1', version: 1, caseId: 'case', events: [] },
    rules: { snapshotId: 'rules:1', version: 1, HOUSE: { quorum: 3, threshold: 3, denominator: 5 }, SENATE: { quorum: 3, threshold: 3, denominator: 4 } },
  };
}
const valid = id => ({ valid: true, sourceEventId: `validation:${id}` });
function plan(s, stage = 'ACCUSATION', extra = {}) { return planBootstrapStage({ snapshot: s, caseId: 'case', accusedId: 'accused', stage, seed: 'fixed-seed', validateAssignment: valid,
  accusedSourceEventId: 'impeachment-event:case:case:1', accusationPanelSourceEventId: 'impeachment-event:case:case:3', ...extra }); }
function office(s, id, institution = 'HOUSE', extra = {}) { s.office.offices.push({ officeId: `${institution}:${id}`, holderIdentityId: id, institution, serving: true, permanentSeat: true, recused: false,
  sourceEventIds: { serving: `office-event:${institution}:${id}` }, ...extra }); }
function bump(s, name) { s[name].version++; s[name].snapshotId = `${name}:${s[name].version}`; }

test('S1-S4 exact independent capacity sizes and all threshold cutovers', () => {
  for (const [r, a, t] of [[7, 2, 5], [8, 2, 6], [9, 3, 6], [12, 4, 8], [15, 5, 10], [17, 5, 12], [300, 5, 12]]) {
    assert.deepEqual(bootstrapPanelSizes(r), { accusation: a, trial: t });
    const result = plan(snapshot(r));
    assert.equal(result.targetSize, a);
    assert.equal(result.status, r === 7 ? 'WAITING_FOR_INDEPENDENT_PARTICIPANTS' : 'ACCUSATION_EMPANELED');
  }
  assert.deepEqual([2, 3, 4, 5].map(accusationThreshold), [2, 2, 3, 3]);
  assert.deepEqual([6, 7, 8, 9, 10, 11, 12].map(trialThreshold), [5, 6, 6, 6, 7, 8, 8]);
  assert.throws(() => accusationThreshold(6)); assert.throws(() => trialThreshold(5));
});
test('S5 all three serving judicial tiers excluded before sizing; former judges may qualify', () => {
  const s = snapshot(8);
  for (let i = 1; i <= 8; i++) office(s, `p${i}`, ['DISTRICT', 'CIRCUIT', 'SUPREME_BOARD'][i % 3]);
  const result = plan(s); assert.equal(result.capacity, 0); assert.equal(result.roster.length, 0);
  assert.equal(result.exclusions.filter(e => e.reasonCodes.includes('SERVING_JUDICIARY')).length, 8);
  for (const o of s.office.offices) o.serving = false;
  assert.equal(plan(s).roster.length, 2);
});
test('S6 joins deduplicate identities and offices; contradictory duplicates fail closed', () => {
  const s = snapshot(8); s.population.identities.push(structuredClone(s.population.identities[1]));
  office(s, 'p1'); office(s, 'p1'); assert.equal(plan(s).capacity, 8);
  s.population.identities.at(-1).alive = false;
  assert.equal(plan(s).status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW');
});
test('S7 separation includes every served/deliberated/voting accusation identity', () => {
  const s = snapshot(17);
  s.participation.events = ['SERVED', 'DELIBERATED', 'BALLOT'].map((eventType, i) => ({ identityId: `p${i + 1}`, stage: 'ACCUSATION', eventType, sourceEventId: `event:${i}` }));
  const p = plan(s, 'TRIAL', { accusationParticipants: ['p4'] });
  assert.ok(p.roster.every(id => !['p1', 'p2', 'p3', 'p4'].includes(id))); assert.equal(p.targetSize, 12);
  // An explicit null from a direct caller is an empty accusation roster, not a crash.
  const none = plan(snapshot(17), 'TRIAL', { accusationParticipants: null });
  assert.equal(none.status, 'TRIAL_EMPANELED'); assert.equal(none.capacity, 17);
});
test('S8 stratification uses population proportions rather than equal division rotation', () => {
  const s = snapshot(17);
  for (const p of s.population.identities) p.divisionId = p.identityId === 'p17' ? 'minority' : 'majority';
  const p = plan(s); assert.equal(p.roster.length, 5);
  assert.equal(p.roster.filter(id => id === 'p17').length, 0);
  for (const p of s.population.identities) p.divisionId = null;
  assert.equal(plan(s, 'TRIAL').roster.length, 12);
});
test('S9 lawful replacement during empanelment records reason and source without changing target', () => {
  const s = snapshot(17), first = plan(s).roster[0];
  const result = plan(s, 'ACCUSATION', { validateAssignment: id => id === first ? { valid: false, reasonCode: 'NEW_VACANCY', sourceEventId: 'vacancy:1' } : valid(id) });
  assert.equal(result.roster.length, 5); assert.equal(result.affirmativeThreshold, 3); assert.ok(!result.roster.includes(first));
  assert.ok(result.drawAudit.some(e => e.reasonCode === 'NEW_VACANCY' && e.sourceEventId === 'vacancy:1'));
});
test('S10 exhausted validation draws wait, never publish partial panel or reduce threshold', () => {
  const result = plan(snapshot(8), 'TRIAL', { validateAssignment: id => ['p1', 'p2', 'p3'].includes(id) ? { valid: false, reasonCode: 'UNAVAILABLE', sourceEventId: `event:${id}` } : valid(id) });
  assert.equal(result.status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS'); assert.equal(result.targetSize, 8);
  assert.equal(result.affirmativeThreshold, 6); assert.deepEqual(result.roster, []);
});
test('S11-S12 independent ordinary quorum/threshold maturity, including Senate below six', () => {
  const s = snapshot(12); for (const id of ['p1', 'p2', 'p3']) office(s, id);
  const house = plan(s); assert.equal(house.mode, 'HOUSE_MATURE'); assert.equal(house.denominator, 5);
  assert.equal(plan(s, 'TRIAL', { accusationParticipants: house.roster }).mode, 'SENATE_BOOTSTRAP');
  for (const id of ['p4', 'p5', 'p6']) office(s, id, 'SENATE');
  const senate = plan(s, 'TRIAL', { accusationParticipants: house.roster });
  assert.equal(senate.mode, 'SENATE_MATURE'); assert.equal(senate.targetSize, 3); assert.equal(senate.affirmativeThreshold, 3);
});
test('permanent members have priority during bootstrap and role-specific trial capacity is reserved', () => {
  const s = snapshot(8); office(s, 'p1');
  assert.equal(plan(s).roster[0], 'p1');
  for (const r of s.eligibility.roleEligibility) { r.trial = !['p1', 'p2'].includes(r.identityId); }
  const result = plan(s); assert.deepEqual(new Set(result.roster), new Set(['p1', 'p2']));
  Object.assign(s.eligibility.roleEligibility.find(r => r.identityId === 'p2'), { accusation: false, sourceEventIds: { accusation: 'role-decision:p2' } });
  assert.equal(plan(s).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
});
test('S13-S14 fresh trial eligibility, known investigator/conflict exclusion', () => {
  const s = snapshot(8), acc = plan(s);
  s.conflicts.knownInvestigators = [s.population.identities.find(p => p.identityId !== 'accused' && !acc.roster.includes(p.identityId)).identityId];
  s.conflicts.identitySourceEventIds = { [s.conflicts.knownInvestigators[0]]: 'conflict-check:1' };
  const trial = plan(s, 'TRIAL', { accusationParticipants: acc.roster });
  assert.equal(trial.targetSize, 5); assert.equal(trial.status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
  assert.deepEqual(acc.roster.length, 2);
});
test('S16 deterministic order is independent of input order and preserves unique disjoint panels for many populations/seeds', () => {
  for (let n = 8; n <= 50; n++) {
    const s = snapshot(n), acc = plan(s, 'ACCUSATION', { seed: `seed${n}` });
    const shuffled = structuredClone(s); shuffled.population.identities.reverse(); shuffled.eligibility.roleEligibility.reverse();
    assert.deepEqual(plan(shuffled, 'ACCUSATION', { seed: `seed${n}` }).roster, acc.roster);
    const trial = plan(s, 'TRIAL', { seed: `seed${n}`, accusationParticipants: acc.roster });
    assert.equal(new Set([...acc.roster, ...trial.roster]).size, acc.roster.length + trial.roster.length);
    assert.ok(trial.roster.length >= 6 && trial.roster.length <= 12);
  }
});
test('S17 contradictory judiciary and missing roles/ordinary rules are discrepancies, not small pools', () => {
  const s = snapshot(); office(s, 'p1', 'DISTRICT'); s.population.identities[1].servingJudge = false;
  assert.equal(plan(s).reason, 'JUDICIAL_SOURCE_CONFLICT');
  delete s.population.identities[1].servingJudge; s.eligibility.roleEligibility.pop();
  assert.equal(plan(s).reason, 'MISSING_ROLE_ELIGIBILITY');
  const other = snapshot(); delete other.rules.SENATE;
  assert.equal(plan(other).reason, 'INVALID_ORDINARY_RULES');
});

const permissions = ['OPEN', 'READ', 'COMMIT_SEED', 'ENTER_STAGE', 'CLOSE_STAGE', 'POST_FREEZE_WAIT', 'RESOLVE_REVIEW', 'ELIGIBILITY'];
function fixture(t, s = snapshot(), options = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'impeachment-')); t.after(() => rmSync(dir, { recursive: true, force: true }));
  const filename = join(dir, 'authority.sqlite'); let store = new ImpeachmentStore(filename);
  const keys = generateKeyPairSync('ed25519');
  const authenticate = createCommandAuthenticator({ clerk: { publicKey: keys.publicKey, permissions } });
  const credential = command => ({ principalId: 'clerk', signature: sign(null, Buffer.from(canonical(command)), keys.privateKey).toString('base64') });
  const sources = options.sources ?? { capture: () => structuredClone(s), validateAssignment: valid };
  const ballots = { close: state => ({ caseId: state.caseId, stage: state.stage, panelDigest: digest(state.panels[state.stage]), closed: true,
    quorumSatisfied: true, sourceEventId: `ballot:${state.stage}`, ballots: state.panels[state.stage].roster.map(identityId => ({ identityId, vote: 'YES' })) }) };
  const evidence = { assess: state => ({ caseId: state.caseId, panelDigest: digest(state.panels.TRIAL), standard: 'CLEAR_AND_CONVINCING', satisfied: true, sourceEventId: 'proof:1' }) };
  const make = () => new BootstrapImpeachmentService({ eventStore: store, authenticate, sources, ballots, evidence, review: options.review });
  let service = make(), sequence = 0;
  const command = (type, extra = {}) => ({ type, caseId: 'case', commandId: `command${++sequence}`, expectedVersion: store.load('case:case').length, ...extra });
  const execute = cmd => service.execute(cmd, credential(cmd));
  const run = (type, extra) => execute(command(type, extra));
  t.after(() => store.close());
  return { filename, s, command, credential, execute, run, authenticate, sources, ballots, evidence,
    get store() { return store; }, get service() { return service; },
    restart() { store.close(); store = new ImpeachmentStore(filename); service = make(); },
    async empanel(seed = 'seed') { await run('COMMIT_SEED', { seedCommitment: seedCommitment(seed) }); return run('ENTER_STAGE', { seed }); } };
}

test('S15/S18 persisted stage stays frozen across staffing/conflict changes and restart; new trial snapshot is used', async t => {
  const f = fixture(t, snapshot(17)); await f.run('OPEN', { accusedId: 'accused' });
  const before = await f.empanel(); f.restart();
  assert.deepEqual((await f.run('READ')).panels.ACCUSATION, before.panels.ACCUSATION);
  for (const id of ['p1', 'p2', 'p3']) office(f.s, id); bump(f.s, 'office');
  f.s.conflicts.knownInvestigators = [before.panels.ACCUSATION.roster[0]]; bump(f.s, 'conflicts');
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'seed' }), { code: 'PANEL_FROZEN' });
  assert.deepEqual((await f.run('READ')).panels.ACCUSATION, before.panels.ACCUSATION);
  await f.run('CLOSE_STAGE');
  const trial = await f.empanel('trial-seed');
  assert.equal(trial.panels.TRIAL.mode, 'SENATE_BOOTSTRAP');
  assert.ok(trial.panels.TRIAL.roster.every(id => !before.panels.ACCUSATION.roster.includes(id)));
  const result = await f.run('CLOSE_STAGE'); assert.equal(result.status, 'CONVICTED');
  f.restart(); assert.equal((await f.run('READ')).status, 'CONVICTED');
  await assert.rejects(f.run('CLOSE_STAGE'), { code: 'CASE_TERMINAL' });
});
test('waiting retries require changed source versions and a new pre-reveal commitment', async t => {
  const f = fixture(t, snapshot(7)); await f.run('OPEN', { accusedId: 'accused' });
  assert.equal((await f.empanel()).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'seed' }), { code: 'SOURCE_VERSION_UNCHANGED' });
  await assert.rejects(f.run('COMMIT_SEED', { seedCommitment: seedCommitment('reroll') }), { code: 'SEED_ALREADY_COMMITTED' });
  const next = snapshot(8); next.population.version = 2; next.population.snapshotId = 'population:2'; next.eligibility.populationVersion = 2; bump(next, 'eligibility');
  Object.assign(f.s, next); const result = await f.empanel('next'); assert.equal(result.status, 'ACCUSATION_EMPANELED');
});
test('seed reveal is bound to a prior commitment and source snapshot; stale capture fails closed', async t => {
  const f = fixture(t, snapshot(), { review: discrepancyReview }); await f.run('OPEN', { accusedId: 'accused' });
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'seed' }), { code: 'SEED_NOT_COMMITTED' });
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'other' }), { code: 'SEED_MISMATCH' });
  bump(f.s, 'office'); const result = await f.run('ENTER_STAGE', { seed: 'seed' });
  assert.equal(result.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(result.discrepancy, 'STALE_COMMITTED_SNAPSHOT');
  await assert.rejects(f.empanel('fresh'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
  await f.run('RESOLVE_REVIEW');
  assert.equal((await f.empanel('fresh')).status, 'ACCUSATION_EMPANELED');
});
test('non-idempotent sources and rollback versions produce attributable discrepancies', async t => {
  const f = fixture(t, snapshot(), { review: discrepancyReview }); await f.run('OPEN', { accusedId: 'accused' });
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
  f.s.population.identities[1].alive = false;
  assert.equal((await f.run('ENTER_STAGE', { seed: 'seed' })).discrepancy, 'NON_IDEMPOTENT_SOURCE');
  f.s.population.identities[1].alive = true; bump(f.s, 'office');
  await f.run('RESOLVE_REVIEW');
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('fresh') });
  f.s.office.version = 1; f.s.office.snapshotId = 'office:1';
  assert.equal((await f.run('ENTER_STAGE', { seed: 'fresh' })).discrepancy, 'STALE_SOURCE');
});
test('authenticated commands bind payload and permission; replay is durable and changed reuse is rejected', async t => {
  const f = fixture(t), cmd = f.command('OPEN', { accusedId: 'accused' });
  await assert.rejects(f.service.execute(cmd, { principalId: 'clerk', authentication: true, signature: 'fake' }), { code: 'UNAUTHORIZED' });
  await assert.rejects(f.service.execute({ ...cmd, accusedId: 'other' }, f.credential(cmd)), { code: 'UNAUTHORIZED' });
  const first = await f.execute(cmd); f.restart(); assert.deepEqual(await f.execute(cmd), first);
  await assert.rejects(f.execute({ ...cmd, accusedId: 'other' }), { code: 'COMMAND_ID_CONFLICT' });
  await assert.rejects(f.run('COMMIT_SEED', { expectedVersion: 0, seedCommitment: seedCommitment('seed') }), { code: 'VERSION_CONFLICT' });
});
test('two database connections cannot commit competing versions; failed reducer is atomic', async t => {
  const f = fixture(t), second = new ImpeachmentStore(f.filename); t.after(() => second.close());
  const command = { stream: 'race', commandId: 'a', expectedVersion: 0 };
  f.store.transact(command, { id: 'clerk' }, () => [{ type: 'A' }]);
  assert.throws(() => second.transact({ ...command, commandId: 'b' }, { id: 'clerk' }, () => [{ type: 'B' }]), { code: 'VERSION_CONFLICT' });
  assert.throws(() => second.transact({ ...command, commandId: 'c', expectedVersion: 1 }, { id: 'clerk' }, () => { throw Error('crash'); }));
  assert.equal(second.load('race').length, 1);
});
test('SQLite history rejects update, delete, key replacement and rowid replacement', async t => {
  const f = fixture(t); await f.run('OPEN', { accusedId: 'accused' });
  const db = new DatabaseSync(f.filename); t.after(() => db.close());
  assert.throws(() => db.exec("UPDATE impeachment_events SET body='{}'"));
  assert.throws(() => db.exec('DELETE FROM impeachment_events'));
  assert.throws(() => db.exec("INSERT OR REPLACE INTO impeachment_events VALUES ('case:case',1,'{}')"));
  assert.throws(() => db.exec("INSERT OR REPLACE INTO impeachment_events(rowid,stream,version,body) VALUES (1,'else',5,'{}')"));
});
test('frozen threshold survives abstentions/absence; conviction separately requires proof', async t => {
  const f = fixture(t, snapshot(8)); await f.run('OPEN', { accusedId: 'accused' }); await f.empanel(); await f.run('CLOSE_STAGE'); await f.empanel('trial');
  f.evidence.assess = state => ({ caseId: state.caseId, panelDigest: digest(state.panels.TRIAL), standard: 'CLEAR_AND_CONVINCING', satisfied: false, sourceEventId: 'proof:negative' });
  assert.equal((await f.run('CLOSE_STAGE')).status, 'ACQUITTED');
  const other = fixture(t, snapshot(8)); await other.run('OPEN', { accusedId: 'accused' }); await other.empanel();
  other.ballots.close = state => ({ caseId: 'case', stage: 'ACCUSATION', panelDigest: digest(state.panels.ACCUSATION), closed: true, quorumSatisfied: true, sourceEventId: 'ballots:2',
    ballots: state.panels.ACCUSATION.roster.map((identityId, i) => ({ identityId, vote: i ? 'ABSTAIN' : 'YES' })) });
  assert.equal((await other.run('CLOSE_STAGE')).status, 'CHARGE_REJECTED');
});
test('missing proof, malformed ballots, and post-freeze replacement cannot invent authority', async t => {
  const f = fixture(t, snapshot(8)); await f.run('OPEN', { accusedId: 'accused' }); await f.empanel();
  await assert.rejects(f.run('REPLACE_PARTICIPANT', { participantId: 'p1' }), { code: 'UNAUTHORIZED' });
  await assert.rejects(f.run('POST_FREEZE_WAIT'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
  f.ballots.close = () => ({ closed: true }); await assert.rejects(f.run('CLOSE_STAGE'), { code: 'INVALID_BALLOT_RECEIPT' });
});
test('registry integration uses actual accepted population and durable eligibility across restart', async t => {
  const f = fixture(t, snapshot(8)), pop = new PopulationRegistry(f.filename); t.after(() => pop.close());
  for (const p of f.s.population.identities) pop.createIdentity({ id: p.identityId, division: p.divisionId, identityClass: 'ordinary', creationRoute: 'founding', createdBy: 'owner', authorityReference: 'founding:1', createdAt: '2026-01-01T00:00:00Z' });
  let durable = new DurableEligibility({ eventStore: f.store, authenticate: f.authenticate });
  const registration = { type: 'ELIGIBILITY', commandId: 'registration', expectedVersion: 0,
    commands: f.s.population.identities.map(p => ({ type: 'IDENTITY_REGISTERED', identityId: p.identityId, effectiveAt: '2026-01-01T00:00:00Z' })) };
  await durable.apply(registration, f.credential(registration)); f.restart();
  durable = new DurableEligibility({ eventStore: f.store, authenticate: f.authenticate });
  assert.equal(durable.projection().version, 9);
  const metadata = f.s.population.identities.map(p => ({ ...p, accusation: true, trial: true }));
  f.sources.capture = (state, db) => ({ ...structuredClone(f.s), ...captureRegistryInputs(db, durable.projection(), { roleMetadata: metadata, rulesetVersion: 'r1', roleMetadataVersion: 1 }) });
  await f.run('OPEN', { accusedId: 'accused' }); assert.equal((await f.empanel()).panels.ACCUSATION.roster.length, 2);
  // A partially observed cross-authority terminal transition must not guess a panel.
  pop.markTerminal({ id: 'p1', reason: 'death', actorId: 'owner', authorityReference: 'death:1', occurredAt: '2026-02-01T00:00:00Z' });
  await f.run('CLOSE_STAGE');
  const result = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('trial') });
  assert.equal(result.discrepancy, 'POPULATION_ELIGIBILITY_LIFECYCLE_MISMATCH');
});

test('actual competing processes serialize at expectedVersion with exactly one winner', async t => {
  const f = fixture(t);
  const workers = ['a', 'b'].map(id => fork(new URL('../test-support/impeachment-writer.js', import.meta.url), [f.filename, id], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'], execArgv: [] }));
  t.after(() => workers.forEach(w => { if (w.exitCode === null) w.kill(); }));
  await Promise.all(workers.map(w => once(w, 'message')));
  const replies = workers.map(w => once(w, 'message'));
  const exits = workers.map(w => once(w, 'exit'));
  workers.forEach(w => w.send('go'));
  const results = (await Promise.all(replies)).map(x => x[0]).sort();
  assert.deepEqual(results, ['VERSION_CONFLICT', 'committed']);
  assert.equal(f.store.load('competing').length, 1);
  await Promise.all(exits);
});
test('source changes during assignment are caught before freezing a panel', async t => {
  const f = fixture(t); await f.run('OPEN', { accusedId: 'accused' });
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
  let changed = false;
  f.sources.validateAssignment = id => { if (!changed) { bump(f.s, 'office'); changed = true; } return valid(id); };
  const state = await f.run('ENTER_STAGE', { seed: 'seed' });
  assert.equal(state.discrepancy, 'SOURCE_CHANGED_DURING_ASSIGNMENT');
  assert.deepEqual(state.panels, {});
});

test('a valid signature cannot grant an unconfigured permission', () => {
  const keys = generateKeyPairSync('ed25519');
  const authenticate = createCommandAuthenticator({ reader: { publicKey: keys.publicKey, permissions: ['READ'] } });
  const command = { type: 'OPEN', caseId: 'case', commandId: 'open', expectedVersion: 0, accusedId: 'accused' };
  const credential = { principalId: 'reader', signature: sign(null, Buffer.from(canonical(command)), keys.privateKey).toString('base64') };
  assert.throws(() => authenticate(command, credential), { code: 'UNAUTHORIZED' });
});
test('a sufficient vote cannot convict without a valid evidence authority', async t => {
  const f = fixture(t, snapshot(8)); await f.run('OPEN', { accusedId: 'accused' }); await f.empanel(); await f.run('CLOSE_STAGE'); await f.empanel('trial');
  f.evidence.assess = undefined;
  const version = f.store.load('case:case').length;
  await assert.rejects(f.run('CLOSE_STAGE'), { code: 'EVIDENCE_AUTHORITY_REQUIRED' });
  assert.equal(f.store.load('case:case').length, version);
  assert.equal((await f.run('READ')).status, 'TRIAL_EMPANELED');
});
test('independent post-freeze review preserves the panel; conflict discovery alone cannot open review', async t => {
  let alone = true;
  const review = { assess: state => ({ caseId: state.caseId, sourceEventId: 'lawful-review:1', independentlyAuthorized: true, conflictDiscoveryAlone: alone }) };
  const f = fixture(t, snapshot(), { review }); await f.run('OPEN', { accusedId: 'accused' }); const start = await f.empanel();
  await assert.rejects(f.run('POST_FREEZE_WAIT'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
  alone = false;
  assert.equal((await f.run('POST_FREEZE_WAIT')).status, 'POST_FREEZE_REVIEW');
  await assert.rejects(f.run('CLOSE_STAGE'), { code: 'WRONG_STAGE' });
  const resumed = await f.run('RESOLVE_REVIEW'); assert.equal(resumed.status, 'ACCUSATION_EMPANELED');
  assert.deepEqual(resumed.panels, start.panels);
});
test('durable eligibility rejects missing proceeding IDs, retains verified attribution and retries across restart', async t => {
  const f = fixture(t), pop = new PopulationRegistry(f.filename); t.after(() => pop.close());
  pop.createIdentity({ id: 'p1', division: 'd1', identityClass: 'ordinary', creationRoute: 'founding', createdBy: 'owner', authorityReference: 'founding:1', createdAt: '2026-01-01T00:00:00Z' });
  let durable = new DurableEligibility({ eventStore: f.store, authenticate: f.authenticate });
  const reg = { type: 'ELIGIBILITY', commandId: 'reg', expectedVersion: 0, commands: [{ type: 'IDENTITY_REGISTERED', identityId: 'p1', effectiveAt: '2026-01-01T00:00:00Z' }] };
  await durable.apply(reg, f.credential(reg));
  const bad = { type: 'ELIGIBILITY', commandId: 'bad', expectedVersion: 1, commands: [{ type: 'FORMAL_PROCEEDING_OPENED', identityId: 'p1', effectiveAt: '2026-01-02T00:00:00Z' }] };
  await assert.rejects(durable.apply(bad, f.credential(bad)), { code: 'INVALID_IDENTIFIER' });
  assert.equal(durable.projection().version, 1);
  const c4 = { type: 'ELIGIBILITY', commandId: 'c4', expectedVersion: 1, commands: [{ type: 'C4_CREATION_EVENT_OPEN', affectedIdentityIds: ['p1'], proceedingId: 'proceeding', effectiveAt: '2026-01-02T00:00:00Z', authentication: { authorityId: 'forged' } }] };
  const saved = await durable.apply(c4, f.credential(c4));
  assert.equal(saved[1].commands[0].authentication.authorityId, 'clerk');
  f.restart(); durable = new DurableEligibility({ eventStore: f.store, authenticate: f.authenticate });
  assert.deepEqual(await durable.apply(c4, f.credential(c4)), saved);
  assert.equal(durable.projection().canCastNewBallot('p1').reason, 'C4_TEMPORARY_RESTRICTION');
});


test('participation requires valid identity and source provenance while allowing batch source events', () => {
  const s = snapshot(8);
  const event = { identityId: 'p1', stage: 'ACCUSATION', eventType: 'SERVED', sourceEventId: 'participation-event:1' };
  s.participation.events = [event, { ...event }];
  const duplicate = plan(s, 'TRIAL');
  assert.equal(duplicate.status, 'TRIAL_EMPANELED');
  assert.equal(duplicate.capacity, 8);
  assert.equal(duplicate.roster.length, 7);
  // One source event may legitimately assign several people. Do not invent a
  // one-person-per-source-event restriction on the authoritative ledger.
  s.participation.events[1].identityId = 'p2';
  assert.equal(plan(s, 'TRIAL').roster.length, 6);
  for (const change of [{ sourceEventId: 42 }, { sourceEventId: ' ' }, { identityId: '' }, { identityId: ' ' }, { identityId: 'unknown' }]) {
    s.participation.events = [{ ...event, ...change }];
    const invalid = plan(s, 'TRIAL');
    assert.equal(invalid.status, 'TRIAL_INPUT_DISCREPANCY_REVIEW');
    assert.equal(invalid.reason, 'INVALID_PARTICIPATION');
    assert.deepEqual(invalid.roster, []);
  }
  s.participation.events = [null];
  assert.equal(plan(s, 'TRIAL').reason, 'INVALID_PARTICIPATION');
});


function discrepancyReceipt(state) {
  return { caseId: state.caseId, stage: state.stage, discrepancyVersion: state.inputDiscrepancy.version,
    reviewedStateVersion: state.version, resolution: 'RESUME', reviewerId: 'independent-reviewer',
    authorityReference: 'competent-authority:1', sourceEventId: `resolution:${state.version}`,
    independentlyAuthorized: true, competent: true };
}
const discrepancyReview = { assess: discrepancyReceipt };

for (const stage of ['ACCUSATION', 'TRIAL']) {
  for (const origin of ['capture', 'plan']) {
    test(`F1 ${stage} ${origin} discrepancy requires independent resolution across restart`, async t => {
      const review = {};
      const f = fixture(t, snapshot(17), { review });
      await f.run('OPEN', { accusedId: 'accused' });
      if (stage === 'TRIAL') { await f.empanel('accusation'); await f.run('CLOSE_STAGE'); }
      if (origin === 'plan') { f.s.participation.events = [null]; bump(f.s, 'participation'); }
      await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('initial') });
      if (origin === 'capture') f.s.population.identities[1].willing = false;
      const blocked = await f.run('ENTER_STAGE', { seed: 'initial' });
      assert.equal(blocked.status, `${stage}_INPUT_DISCREPANCY_REVIEW`);
      f.s.population.identities[1].willing = true;
      bump(f.s, 'population'); bump(f.s, 'eligibility');
      f.s.eligibility.populationVersion = f.s.population.version;
      f.s.participation.events = []; bump(f.s, 'participation');
      f.restart();
      const history = f.store.load('case:case');
      for (const [type, extra] of [['COMMIT_SEED', { seedCommitment: seedCommitment('fresh') }], ['ENTER_STAGE', { seed: 'initial' }], ['RESOLVE_REVIEW', { receipt: { independentlyAuthorized: true, competent: true } }]]) {
        await assert.rejects(f.run(type, extra), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
        assert.deepEqual(f.store.load('case:case'), history);
      }
      review.assess = discrepancyReceipt;
      const command = f.command('RESOLVE_REVIEW');
      const resolved = await f.execute(command);
      assert.equal(resolved.status, stage === 'ACCUSATION' ? 'REPORTED' : 'CHARGED');
      assert.equal(resolved.panels[stage], undefined);
      assert.equal(resolved.commitments[stage], undefined);
      const receipt = f.store.load('case:case').at(-1);
      assert.equal(receipt.type, 'INPUT_DISCREPANCY_RESOLVED');
      assert.equal(receipt.receipt.reviewerId, 'independent-reviewer');
      assert.equal(receipt.receipt.discrepancyVersion, blocked.version);
      assert.equal(receipt.actorId, 'clerk');
      f.restart(); assert.deepEqual(await f.execute(command), resolved);
      assert.deepEqual(await f.run('READ'), resolved);
      await assert.rejects(f.run('ENTER_STAGE', { seed: 'initial' }), { code: 'SEED_NOT_COMMITTED' });
      assert.equal((await f.empanel('fresh')).status, `${stage}_EMPANELED`);
    });
  }
}

test('F1 resolution rejects unbound, incompetent, unattributable and unauthorized receipts', async t => {
  let alter = r => r;
  const review = { assess: state => alter(discrepancyReceipt(state)) };
  const f = fixture(t, snapshot(), { review }); await f.run('OPEN', { accusedId: 'accused' });
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
  bump(f.s, 'office'); await f.run('ENTER_STAGE', { seed: 'seed' });
  const before = f.store.load('case:case');
  for (const change of [{ caseId: 'other' }, { stage: 'TRIAL' }, { discrepancyVersion: 0 },
    { reviewedStateVersion: 0 }, { resolution: 'DENY' }, { reviewerId: '' }, { reviewerId: 'clerk' },
    { reviewerId: 'accused' }, { authorityReference: ' ' }, { sourceEventId: 42 },
    { independentlyAuthorized: false }, { competent: false }]) {
    alter = r => ({ ...r, ...change });
    await assert.rejects(f.run('RESOLVE_REVIEW'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
    assert.deepEqual(f.store.load('case:case'), before);
  }
  alter = r => Promise.resolve(r);
  await assert.rejects(f.run('RESOLVE_REVIEW'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
  alter = r => r;
  const keys = generateKeyPairSync('ed25519');
  const auth = createCommandAuthenticator({ clerk: { publicKey: keys.publicKey, permissions: ['COMMIT_SEED', 'ENTER_STAGE'] } });
  const service = new BootstrapImpeachmentService({ eventStore: f.store, authenticate: auth, sources: f.sources, review });
  const cmd = f.command('RESOLVE_REVIEW');
  await assert.rejects(service.execute(cmd, { principalId: 'clerk', signature: sign(null, Buffer.from(canonical(cmd)), keys.privateKey).toString('base64') }), { code: 'UNAUTHORIZED' });
  assert.deepEqual(f.store.load('case:case'), before);
  const oldReceipt = discrepancyReceipt(await f.run('READ'));
  await f.run('RESOLVE_REVIEW');
  // A further discrepancy needs its own bound decision; an old receipt cannot clear it.
  await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('fresh') });
  bump(f.s, 'office'); await f.run('ENTER_STAGE', { seed: 'fresh' });
  review.assess = () => oldReceipt;
  await assert.rejects(f.run('RESOLVE_REVIEW'), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
});

test('F1 genuine trial WAITING still retries changed sources without a reviewer', async t => {
  const f = fixture(t, snapshot(8)); await f.run('OPEN', { accusedId: 'accused' });
  const accusation = await f.empanel('accusation'); await f.run('CLOSE_STAGE');
  const candidate = f.s.population.identities.find(p => p.identityId !== 'accused' && !accusation.panels.ACCUSATION.roster.includes(p.identityId));
  candidate.willing = false; candidate.sourceEventIds = { willing: 'membership-event:1' }; bump(f.s, 'population'); bump(f.s, 'eligibility'); f.s.eligibility.populationVersion = f.s.population.version;
  assert.equal((await f.empanel('trial')).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
  candidate.willing = true; bump(f.s, 'population'); bump(f.s, 'eligibility'); f.s.eligibility.populationVersion = f.s.population.version;
  assert.equal((await f.empanel('retry')).status, 'TRIAL_EMPANELED');
});

// Snapshot identity and exclusion provenance. The real population registry, durable
// eligibility projection and captureRegistryInputs sit behind the service.
async function registry(t, n = 17, mutate = () => {}) {
  const f = fixture(t, snapshot(n)), pop = new PopulationRegistry(f.filename); t.after(() => pop.close());
  for (const p of f.s.population.identities) pop.createIdentity({ id: p.identityId, division: p.divisionId, identityClass: 'ordinary', creationRoute: 'founding', createdBy: 'owner', authorityReference: 'founding:1', createdAt: '2026-01-01T00:00:00Z' });
  const durable = new DurableEligibility({ eventStore: f.store, authenticate: f.authenticate });
  let applied = 0;
  const eligibility = async commands => { const c = { type: 'ELIGIBILITY', commandId: `eligibility${applied}`, expectedVersion: applied++, commands }; await durable.apply(c, f.credential(c)); };
  await eligibility(f.s.population.identities.map(p => ({ type: 'IDENTITY_REGISTERED', identityId: p.identityId, effectiveAt: '2026-01-01T00:00:00Z' })));
  const metadata = f.s.population.identities.map(p => ({ ...p, accusation: true, trial: true })); mutate(metadata);
  Object.assign(f, { pop, eligibility, metadata, roleMetadataVersion: 1, rulesetVersion: 'r1', projection: () => durable.projection() });
  f.sources.capture = (state, db) => (f.last = { ...structuredClone(f.s), conflicts: { ...f.s.conflicts, caseId: state.caseId }, participation: { ...f.s.participation, caseId: state.caseId },
    ...captureRegistryInputs(db, f.projection(), { roleMetadata: f.metadata, rulesetVersion: f.rulesetVersion, roleMetadataVersion: f.roleMetadataVersion }) });
  return f;
}
const outsideAccusation = (f, state) => f.metadata.find(p => p.identityId !== 'accused' && !state.panels.ACCUSATION.roster.includes(p.identityId));
const reasonSources = (panel, id) => panel.exclusions.find(e => e.identityId === id).reasonSources;

test('P1 felony conviction between accusation and trial gives fresh attributable snapshots and a trial panel, not discrepancy review', async t => {
  const f = await registry(t); await f.run('OPEN', { accusedId: 'accused' });
  const accusation = await f.empanel('accusation'), before = structuredClone(f.last); await f.run('CLOSE_STAGE');
  const convicted = outsideAccusation(f, accusation).identityId;
  await f.eligibility([{ type: 'FELONY_CONVICTION_ENTERED', identityId: convicted, convictionId: 'conviction:1', effectiveAt: '2026-02-01T00:00:00Z' }]);
  const committed = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('trial') });
  assert.equal(committed.discrepancy, undefined); assert.equal(committed.status, 'CHARGED');
  const trial = await f.run('ENTER_STAGE', { seed: 'trial' });
  assert.equal(trial.status, 'TRIAL_EMPANELED'); assert.equal(trial.panels.TRIAL.roster.length, 11);
  assert.ok(!trial.panels.TRIAL.roster.includes(convicted));
  for (const name of ['population', 'eligibility']) {
    assert.notEqual(f.last[name].snapshotId, before[name].snapshotId); assert.ok(f.last[name].version > before[name].version);
    assert.deepEqual(before[name].authorityVersions, { population: 18, eligibility: 18, roleMetadata: 1 });
    assert.deepEqual(f.last[name].authorityVersions, { population: 18, eligibility: 19, roleMetadata: 1 });
  }
  assert.deepEqual([before.population.snapshotId, before.eligibility.snapshotId, f.last.population.snapshotId, f.last.eligibility.snapshotId],
    ['population:p18.e18.r1', 'eligibility:p18.e18.r1', 'population:p18.e19.r1', 'eligibility:p18.e19.r1']);
  assert.equal(f.last.eligibility.populationVersion, f.last.population.version);
  assert.deepEqual(trial.panels.TRIAL.snapshotIds.slice(0, 3), ['population:p18.e19.r1', 'office:1', 'eligibility:p18.e19.r1']);
  assert.deepEqual(reasonSources(trial.panels.TRIAL, convicted), [{ reasonCode: 'DISENFRANCHISED', sourceEventId: 'eligibility-event:19' },
    { reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'eligibility-event:19' }, { reasonCode: 'PERMANENT_FELONY_BAR', sourceEventId: 'eligibility-event:19' }]);
});
test('P1 willingness change after a shortage wait lets the retry empanel without a reviewer', async t => {
  const f = await registry(t, 8, m => Object.assign(m[1], { willing: false, sourceEventIds: { willing: 'membership-event:1' } }));
  await f.run('OPEN', { accusedId: 'accused' });
  assert.equal((await f.empanel('first')).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
  Object.assign(f.metadata[1], { willing: true, sourceEventIds: { willing: 'membership-event:2' } }); f.roleMetadataVersion = 2;
  const retry = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('retry') });
  assert.equal(retry.discrepancy, undefined);
  assert.equal((await f.run('ENTER_STAGE', { seed: 'retry' })).status, 'ACCUSATION_EMPANELED');
});
test('P1 role-eligibility change between stages gets a new eligibility snapshot and a sourced exclusion', async t => {
  const f = await registry(t); await f.run('OPEN', { accusedId: 'accused' });
  const accusation = await f.empanel('accusation'), before = structuredClone(f.last); await f.run('CLOSE_STAGE');
  const row = outsideAccusation(f, accusation);
  Object.assign(row, { trial: false, sourceEventIds: { trial: 'role-decision:7' } }); f.roleMetadataVersion = 2;
  const committed = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('trial') });
  assert.equal(committed.discrepancy, undefined);
  const trial = await f.run('ENTER_STAGE', { seed: 'trial' });
  assert.equal(trial.status, 'TRIAL_EMPANELED'); assert.equal(trial.panels.TRIAL.roster.length, 11);
  assert.ok(f.last.eligibility.version > before.eligibility.version); assert.equal(f.last.eligibility.snapshotId, 'eligibility:p18.e18.r2');
  assert.deepEqual(reasonSources(trial.panels.TRIAL, row.identityId), [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'role-decision:7' }]);
});
test('P1 a second case after a role-metadata change captures the shared population scope without discrepancy', async t => {
  const f = await registry(t); await f.run('OPEN', { accusedId: 'accused' });
  const first = await f.empanel('first-accusation'); await f.run('CLOSE_STAGE');
  Object.assign(outsideAccusation(f, first), { willing: false, sourceEventIds: { willing: 'membership-event:2' } }); f.roleMetadataVersion = 2;
  const other = (type, extra) => f.run(type, { caseId: 'other-case', expectedVersion: f.store.load('case:other-case').length, ...extra });
  await other('OPEN', { accusedId: 'accused' });
  const committed = await other('COMMIT_SEED', { seedCommitment: seedCommitment('other') });
  assert.equal(committed.discrepancy, undefined);
  assert.equal((await other('ENTER_STAGE', { seed: 'other' })).status, 'ACCUSATION_EMPANELED');
  // The first case then reads the same shared population snapshot for its trial.
  const trial = await f.empanel('first-trial');
  assert.equal(trial.status, 'TRIAL_EMPANELED'); assert.equal(trial.panels.TRIAL.roster.length, 11);
});
test('P1 guard: changed content under unchanged authority versions is still NON_IDEMPOTENT_SOURCE', async t => {
  for (const change of [{ jailed: true, sourceEventIds: { jailed: 'custody-event:1' } }, { trial: false, sourceEventIds: { trial: 'role-decision:1' } }]) {
    const f = await registry(t, 8); await f.run('OPEN', { accusedId: 'accused' });
    await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
    Object.assign(f.metadata[1], change);
    const state = await f.run('ENTER_STAGE', { seed: 'seed' });
    assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(state.discrepancy, 'NON_IDEMPOTENT_SOURCE');
    assert.deepEqual(state.panels, {});
  }
});
test('P1 guard: lowered, masked, provenance-only and missing role-metadata versions fail closed', async t => {
  const committed = async version => { const f = await registry(t, 8); f.roleMetadataVersion = version; await f.run('OPEN', { accusedId: 'accused' });
    return [f, await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') })]; };
  const [lowered] = await committed(5);
  assert.deepEqual([lowered.last.population.snapshotId, lowered.last.eligibility.snapshotId, lowered.last.population.version, lowered.last.eligibility.version, lowered.last.eligibility.populationVersion],
    ['population:p9.e9.r5', 'eligibility:p9.e9.r5', 23, 23, 23]);
  lowered.roleMetadataVersion = 4;
  assert.equal((await lowered.run('ENTER_STAGE', { seed: 'seed' })).discrepancy, 'STALE_SOURCE');
  // An equal sum from a different set of authority versions is not the same snapshot: the role record went back.
  const [masked] = await committed(5);
  await masked.eligibility([{ type: 'ALLEGATION_RECORDED', identityId: 'p1', allegationId: 'allegation:1', effectiveAt: '2026-02-01T00:00:00Z' }]); masked.roleMetadataVersion = 4;
  assert.equal((await masked.run('ENTER_STAGE', { seed: 'seed' })).discrepancy, 'STALE_SOURCE');
  const [provenance] = await committed(1);
  provenance.metadata[1].sourceEventIds = { willing: 'membership-event:9' };
  assert.equal((await provenance.run('ENTER_STAGE', { seed: 'seed' })).discrepancy, 'NON_IDEMPOTENT_SOURCE');
  for (const version of [undefined, null, '1', 1.5, -1]) {
    const [f, state] = await committed(version);
    assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(state.discrepancy, 'MISSING_ROLE_METADATA_VERSION');
    assert.deepEqual(state.commitments, {}); assert.equal(f.last, undefined);
  }
});
test('P1 guard: an advance in one authority cannot hide a rollback or unversioned change in another', async t => {
  const unwilling = { willing: false, sourceEventIds: { willing: 'membership-event:1' } }, willing = { willing: true, sourceEventIds: { willing: 'membership-event:2' } };
  const allegation = (f, n) => f.eligibility([{ type: 'ALLEGATION_RECORDED', identityId: 'p5', allegationId: `allegation:${n}`, effectiveAt: '2026-02-01T00:00:00Z' }]);
  // Every scenario starts from a shortage wait, so the next accepted snapshot would decide a panel.
  const waiting = async (version = 1) => { const f = await registry(t, 8, m => Object.assign(m[1], unwilling)); f.roleMetadataVersion = version; await f.run('OPEN', { accusedId: 'accused' });
    assert.equal((await f.empanel('first')).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS'); return f; };
  const retry = async (f, seed = 'retry') => { const state = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment(seed) });
    if (state.discrepancy) { assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.deepEqual(state.panels, {}); return state.discrepancy; }
    return (await f.run('ENTER_STAGE', { seed })).status; };
  // Control: both authorities advance and the role record carries its new version.
  const versioned = await waiting(); Object.assign(versioned.metadata[1], willing); versioned.roleMetadataVersion = 2; await allegation(versioned, 1);
  assert.equal(await retry(versioned), 'ACCUSATION_EMPANELED');
  assert.deepEqual([versioned.last.population.snapshotId, versioned.last.population.version, versioned.last.population.authorityVersions], ['population:p9.e10.r2', 21, { population: 9, eligibility: 10, roleMetadata: 2 }]);
  // A role fact (population scope), then a role decision (case scope), changed under the old version while an unrelated eligibility event arrived.
  const unversioned = await waiting(); unversioned.metadata[1].willing = true; await allegation(unversioned, 1);
  assert.equal(await retry(unversioned), 'NON_IDEMPOTENT_SOURCE');
  const decision = await waiting(); decision.metadata[2].trial = false; await allegation(decision, 1);
  assert.equal(await retry(decision), 'NON_IDEMPOTENT_SOURCE');
  // The ruleset is caller-supplied under the same counter.
  const ruleset = await waiting(); ruleset.rulesetVersion = 'r2'; await allegation(ruleset, 1);
  assert.equal(await retry(ruleset), 'NON_IDEMPOTENT_SOURCE');
  // An older role record offered after a newer one was used; two eligibility events make the sum larger.
  const rolledBack = await waiting(6); Object.assign(rolledBack.metadata[1], willing); rolledBack.roleMetadataVersion = 5; await allegation(rolledBack, 1); await allegation(rolledBack, 2);
  assert.equal(await retry(rolledBack), 'STALE_SOURCE');
  // A stale eligibility projection offered after a newer one was used, behind a larger role-metadata advance.
  const stale = await waiting(), projection = stale.projection(); await allegation(stale, 1);
  assert.equal(await retry(stale, 'second'), 'WAITING_FOR_INDEPENDENT_PARTICIPANTS'); assert.equal(stale.last.population.snapshotId, 'population:p9.e10.r1');
  stale.projection = () => projection; Object.assign(stale.metadata[1], willing); stale.roleMetadataVersion = 3;
  assert.equal(await retry(stale, 'third'), 'STALE_SOURCE');
});

// One identity per exclusion reason at trial entry; p4 and p13 are on the frozen accusation roster.
function adverse() {
  const s = snapshot(20), person = id => s.population.identities.find(p => p.identityId === id), role = id => s.eligibility.roleEligibility.find(r => r.identityId === id);
  office(s, 'p1', 'DISTRICT', { sourceEventIds: { serving: 'appointment:district' } }); office(s, 'p1', 'CIRCUIT', { sourceEventIds: { serving: 'appointment:circuit' } });
  office(s, 'p2', 'SENATE', { recused: true, sourceEventIds: { serving: 'election:2', recused: 'recusal:2' } });
  s.participation.events = [{ identityId: 'p3', stage: 'ACCUSATION', eventType: 'BALLOT', sourceEventId: 'ballot-event:7' }, { identityId: 'p3', stage: 'ACCUSATION', eventType: 'SERVED', sourceEventId: 'assign-event:2' },
    { identityId: 'p13', stage: 'ACCUSATION', eventType: 'SERVED', sourceEventId: 'assign-event:13' }];
  Object.assign(s.conflicts, { knownInvestigators: ['p5'], independentlyDisqualified: ['p12'], sourceEventIds: ['conflict-check:1', 'investigation:5', 'disqualification:12'],
    identitySourceEventIds: { p5: 'investigation:5', p12: 'disqualification:12' } });
  Object.assign(person('p6'), { alive: false, sourceEventIds: { alive: 'population-event:30' } });
  Object.assign(person('p7'), { willing: false, sourceEventIds: { willing: 'membership-event:7' } });
  Object.assign(person('p8'), { jailed: true, sourceEventIds: { jailed: 'custody-event:8' } });
  Object.assign(person('p9'), { disenfranchised: true, sourceEventIds: { disenfranchised: 'eligibility-event:40' } });
  Object.assign(person('p10'), { citizen: false, sourceEventIds: { citizen: 'membership-event:10' } });
  Object.assign(role('p11'), { trial: false, reasonCodes: ['FORMAL_PROCEEDING'], sourceEventIds: { trial: 'eligibility-event:41' }, reasonSourceEventIds: { FORMAL_PROCEEDING: 'eligibility-event:41' } });
  return { s, person, role, office: id => s.office.offices.find(o => o.officeId === id) };
}
const trialPlan = (s, extra = {}) => plan(s, 'TRIAL', { accusationParticipants: ['p4', 'p13'], ...extra });

test('P2 every exclusion reason in the panel carries exactly one source event, independent of input order', () => {
  const { s, role } = adverse(), result = trialPlan(s);
  assert.equal(result.status, 'TRIAL_EMPANELED'); assert.equal(result.roster.length, 7);
  assert.deepEqual(Object.fromEntries(result.exclusions.map(e => [e.identityId, e.reasonSources])), {
    accused: [{ reasonCode: 'ACCUSED', sourceEventId: 'impeachment-event:case:case:1' }],
    p1: [{ reasonCode: 'SERVING_JUDICIARY', sourceEventId: 'appointment:circuit' }],
    p2: [{ reasonCode: 'RECUSED', sourceEventId: 'recusal:2' }],
    p3: [{ reasonCode: 'ACCUSATION_PARTICIPANT', sourceEventId: 'assign-event:2' }],
    p4: [{ reasonCode: 'ACCUSATION_PARTICIPANT', sourceEventId: 'impeachment-event:case:case:3' }],
    p5: [{ reasonCode: 'KNOWN_TRIAL_CONFLICT', sourceEventId: 'investigation:5' }],
    p6: [{ reasonCode: 'NOT_LIVING', sourceEventId: 'population-event:30' }],
    p7: [{ reasonCode: 'UNWILLING', sourceEventId: 'membership-event:7' }],
    p8: [{ reasonCode: 'JAILED', sourceEventId: 'custody-event:8' }],
    p9: [{ reasonCode: 'DISENFRANCHISED', sourceEventId: 'eligibility-event:40' }],
    p10: [{ reasonCode: 'NOT_CIVILIAN_OR_MEMBER', sourceEventId: 'membership-event:10' }],
    p11: [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'eligibility-event:41' }, { reasonCode: 'FORMAL_PROCEEDING', sourceEventId: 'eligibility-event:41' }],
    p12: [{ reasonCode: 'KNOWN_TRIAL_CONFLICT', sourceEventId: 'disqualification:12' }],
    p13: [{ reasonCode: 'ACCUSATION_PARTICIPANT', sourceEventId: 'assign-event:13' }] });
  for (const e of result.exclusions) {
    assert.deepEqual(e.reasonSources.map(x => x.reasonCode), e.reasonCodes);
    assert.deepEqual(e.sourceIds, ['population:1', 'office:1', 'eligibility:1', 'conflicts:1', 'rules:1', 'participation:1']);
  }
  const reordered = structuredClone(s); reordered.participation.events.reverse(); reordered.office.offices.reverse();
  assert.deepEqual(trialPlan(reordered).exclusions, result.exclusions);
  // The accusation stage reads the accusation role decision's own event.
  Object.assign(role('p14'), { accusation: false, sourceEventIds: { accusation: 'role-decision:14' } });
  assert.deepEqual(plan(s).exclusions.find(e => e.identityId === 'p14').reasonSources, [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'role-decision:14' }]);
});
test('P2 missing or unattributable exclusion provenance fails closed for the affected authority; nothing is invented', () => {
  const cases = [
    ['accused', 'MISSING_CASE_PROVENANCE', (c, extra) => { extra.accusedSourceEventId = undefined; }],
    ['serving judiciary', 'MISSING_OFFICE_PROVENANCE', c => { delete c.office('CIRCUIT:p1').sourceEventIds; }],
    ['recusal', 'MISSING_OFFICE_PROVENANCE', c => { delete c.office('SENATE:p2').sourceEventIds.recused; }],
    ['frozen roster', 'MISSING_CASE_PROVENANCE', (c, extra) => { extra.accusationPanelSourceEventId = ' '; }],
    ['conflict unmapped', 'MISSING_CONFLICT_PROVENANCE', c => { delete c.s.conflicts.identitySourceEventIds; }],
    ['conflict event outside the snapshot list', 'MISSING_CONFLICT_PROVENANCE', c => { c.s.conflicts.identitySourceEventIds.p12 = 'elsewhere:1'; }],
    ['not living', 'MISSING_POPULATION_PROVENANCE', c => { delete c.person('p6').sourceEventIds; }],
    ['unwilling, non-string id', 'MISSING_POPULATION_PROVENANCE', c => { c.person('p7').sourceEventIds.willing = 7; }],
    ['jailed, empty id', 'MISSING_POPULATION_PROVENANCE', c => { c.person('p8').sourceEventIds.jailed = ''; }],
    ['disenfranchised', 'MISSING_POPULATION_PROVENANCE', c => { delete c.person('p9').sourceEventIds.disenfranchised; }],
    ['not citizen, only another fact sourced', 'MISSING_POPULATION_PROVENANCE', c => { c.person('p10').sourceEventIds = { willing: 'membership-event:10' }; }],
    ['not citizen, untrimmed id', 'MISSING_POPULATION_PROVENANCE', c => { c.person('p10').sourceEventIds.citizen = ' membership-event:10 '; }],
    ['role flag', 'MISSING_ELIGIBILITY_PROVENANCE', c => { delete c.role('p11').sourceEventIds.trial; }],
    ['eligibility reason', 'MISSING_ELIGIBILITY_PROVENANCE', c => { delete c.role('p11').reasonSourceEventIds.FORMAL_PROCEEDING; }],
  ];
  for (const [name, code, mutate] of cases) {
    const c = adverse(), extra = {}; mutate(c, extra); const result = trialPlan(c.s, extra);
    assert.equal(result.status, 'TRIAL_INPUT_DISCREPANCY_REVIEW', name); assert.equal(result.reason, code, name); assert.deepEqual(result.roster, [], name);
  }
});
test('P2 the journaled frozen panels attribute ACCUSED and prior participation to the case events', async t => {
  const f = fixture(t, snapshot(17)); await f.run('OPEN', { accusedId: 'accused' });
  const accusation = (await f.empanel('accusation')).panels.ACCUSATION; await f.run('CLOSE_STAGE');
  const trial = (await f.empanel('trial')).panels.TRIAL, journal = f.store.load('case:case');
  assert.deepEqual([journal[0].type, journal[0].version, journal[2].type, journal[2].stage, journal[2].version], ['CASE_OPENED', 1, 'STAGE_PLANNED', 'ACCUSATION', 3]);
  assert.deepEqual(reasonSources(accusation, 'accused'), [{ reasonCode: 'ACCUSED', sourceEventId: 'impeachment-event:case:case:1' }]);
  assert.deepEqual(reasonSources(trial, 'accused'), [{ reasonCode: 'ACCUSED', sourceEventId: 'impeachment-event:case:case:1' }]);
  for (const id of accusation.roster) assert.deepEqual(reasonSources(trial, id), [{ reasonCode: 'ACCUSATION_PARTICIPANT', sourceEventId: 'impeachment-event:case:case:3' }]);
  assert.equal(trial.exclusions.length, 6);
  for (const e of [...accusation.exclusions, ...trial.exclusions]) assert.deepEqual(e.reasonSources.map(x => x.reasonCode), e.reasonCodes);
  assert.deepEqual(journal.at(-1).plan.exclusions, trial.exclusions);
  f.restart(); assert.deepEqual((await f.run('READ')).panels.TRIAL.exclusions, trial.exclusions);
  // An unstamped event has no journal reference to cite.
  assert.equal('accusedSourceEventId' in replayImpeachment([{ type: 'CASE_OPENED', caseId: 'case', accusedId: 'accused' }]), false);
});
test('P2 registry adapter cites real population and eligibility events and passes role-authority events through', async t => {
  const f = await registry(t, 20), row = id => f.metadata.find(p => p.identityId === id); await f.run('OPEN', { accusedId: 'accused' });
  const at = '2026-02-01T00:00:00Z', proceeding = (type, identityId, proceedingId) => ({ type: `FORMAL_PROCEEDING_${type}`, identityId, proceedingId, effectiveAt: at });
  // p1: a later proceeding has closed, so the open one is not the latest opening. p10: the open proceeding was closed once and reopened.
  await f.eligibility([proceeding('OPENED', 'p1', 'proceeding:1'), proceeding('OPENED', 'p1', 'proceeding:0'), proceeding('CLOSED', 'p1', 'proceeding:0')]);
  await f.eligibility([{ type: 'C4_CREATION_EVENT_OPEN', affectedIdentityIds: ['p2', 'p3'], proceedingId: 'c4:1', effectiveAt: at }]);
  await f.eligibility([{ type: 'DEATH_RECORDED', identityId: 'p4', effectiveAt: at }]);
  f.pop.markTerminal({ id: 'p4', reason: 'death', actorId: 'owner', authorityReference: 'death:1', occurredAt: at });
  await f.eligibility([{ type: 'FELONY_CONVICTION_ENTERED', identityId: 'p7', convictionId: 'conviction:7', effectiveAt: at }]);
  // p12: convicted, then deceased; its terminal row is the latest population event, p4's is not.
  await f.eligibility([{ type: 'FELONY_CONVICTION_ENTERED', identityId: 'p12', convictionId: 'conviction:12', effectiveAt: at }, { type: 'DEATH_RECORDED', identityId: 'p12', effectiveAt: at }]);
  f.pop.markTerminal({ id: 'p12', reason: 'death', actorId: 'owner', authorityReference: 'death:2', occurredAt: at });
  await f.eligibility([proceeding('OPENED', 'p10', 'proceeding:10'), proceeding('CLOSED', 'p10', 'proceeding:10'), proceeding('OPENED', 'p10', 'proceeding:10')]);
  assert.deepEqual(f.projection().auditLog({ afterVersion: 21 }).map(e => [e.version, e.type, e.identityId ?? e.affectedIdentityIds, e.proceedingId ?? null]), [
    [22, 'FORMAL_PROCEEDING_OPENED', 'p1', 'proceeding:1'], [23, 'FORMAL_PROCEEDING_OPENED', 'p1', 'proceeding:0'], [24, 'FORMAL_PROCEEDING_CLOSED', 'p1', 'proceeding:0'],
    [25, 'C4_CREATION_EVENT_OPEN', ['p2', 'p3'], 'c4:1'], [26, 'DEATH_RECORDED', 'p4', null], [27, 'FELONY_CONVICTION_ENTERED', 'p7', null],
    [28, 'FELONY_CONVICTION_ENTERED', 'p12', null], [29, 'DEATH_RECORDED', 'p12', null],
    [30, 'FORMAL_PROCEEDING_OPENED', 'p10', 'proceeding:10'], [31, 'FORMAL_PROCEEDING_CLOSED', 'p10', 'proceeding:10'], [32, 'FORMAL_PROCEEDING_OPENED', 'p10', 'proceeding:10']]);
  Object.assign(row('p5'), { jailed: true, sourceEventIds: { jailed: 'custody:5' } });
  Object.assign(row('p6'), { citizen: false, sourceEventIds: { citizen: 'membership:6' } });
  Object.assign(row('p8'), { willing: false, sourceEventIds: { willing: 'membership:8' } });
  Object.assign(row('p9'), { accusation: false, sourceEventIds: { accusation: 'role-decision:9' } });
  Object.assign(row('p10'), { accusation: false, sourceEventIds: { accusation: 'role-decision:10' } });
  const state = await f.empanel('accusation'); assert.equal(state.status, 'ACCUSATION_EMPANELED', state.discrepancy);
  const sources = id => reasonSources(state.panels.ACCUSATION, id), event = n => `eligibility-event:${n}`;
  assert.deepEqual(sources('p1'), [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: event(22) }, { reasonCode: 'FORMAL_PROCEEDING', sourceEventId: event(22) }]);
  for (const id of ['p2', 'p3']) assert.deepEqual(sources(id), [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: event(25) }, { reasonCode: 'C4_TEMPORARY_RESTRICTION', sourceEventId: event(25) }]);
  assert.deepEqual(sources('p4'), [{ reasonCode: 'NOT_LIVING', sourceEventId: 'population-event:22' }, { reasonCode: 'ROLE_INELIGIBLE', sourceEventId: event(26) }, { reasonCode: 'DECEASED', sourceEventId: event(26) }]);
  assert.deepEqual(sources('p5'), [{ reasonCode: 'JAILED', sourceEventId: 'custody:5' }]);
  assert.deepEqual(sources('p6'), [{ reasonCode: 'NOT_CIVILIAN_OR_MEMBER', sourceEventId: 'membership:6' }]);
  assert.deepEqual(sources('p7'), [{ reasonCode: 'DISENFRANCHISED', sourceEventId: event(27) }, { reasonCode: 'ROLE_INELIGIBLE', sourceEventId: event(27) }, { reasonCode: 'PERMANENT_FELONY_BAR', sourceEventId: event(27) }]);
  // The conviction stays the source of disenfranchisement after death becomes the franchise reason.
  assert.deepEqual(sources('p12'), [{ reasonCode: 'NOT_LIVING', sourceEventId: 'population-event:23' }, { reasonCode: 'DISENFRANCHISED', sourceEventId: event(28) },
    { reasonCode: 'ROLE_INELIGIBLE', sourceEventId: event(29) }, { reasonCode: 'DECEASED', sourceEventId: event(29) }]);
  assert.deepEqual(sources('p8'), [{ reasonCode: 'UNWILLING', sourceEventId: 'membership:8' }]);
  assert.deepEqual(sources('p9'), [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'role-decision:9' }]);
  assert.deepEqual(sources('p10'), [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'role-decision:10' }, { reasonCode: 'FORMAL_PROCEEDING', sourceEventId: event(32) }]);
  // The cited events exist in their authorities; an unaffected identity gets no source at all.
  assert.deepEqual(f.pop.getEvents('p4').map(e => [e.sequence, e.eventType]), [[5, 'created'], [22, 'terminal']]);
  assert.deepEqual(f.pop.getEvents('p12').map(e => [e.sequence, e.eventType]), [[13, 'created'], [23, 'terminal']]);
  assert.deepEqual(f.last.population.identities.find(p => p.identityId === 'p4').sourceEventIds, { alive: 'population-event:22' });
  assert.deepEqual(f.last.population.identities.find(p => p.identityId === 'p11').sourceEventIds, {});
  assert.deepEqual(f.last.eligibility.roleEligibility.find(r => r.identityId === 'p11'), { identityId: 'p11', accusation: true, trial: true, reasonCodes: [], sourceEventIds: {}, reasonSourceEventIds: {} });
});
test('P2 a role-authority fact without a source event fails closed through the service', async t => {
  // A value that is not a string, including one canonical JSON cannot carry, is no source event: same review, not a rejected command.
  const unusable = [NaN, Infinity, 10n, 5, null].flatMap(id => [[{ jailed: true, sourceEventIds: { jailed: id } }, 'MISSING_POPULATION_PROVENANCE'],
    [{ accusation: false, sourceEventIds: { accusation: id } }, 'MISSING_ELIGIBILITY_PROVENANCE']]);
  for (const [change, code] of [[{ jailed: true }, 'MISSING_POPULATION_PROVENANCE'], [{ accusation: false }, 'MISSING_ELIGIBILITY_PROVENANCE'], ...unusable]) {
    const f = await registry(t, 17, m => Object.assign(m[1], change)); await f.run('OPEN', { accusedId: 'accused' });
    const state = await f.empanel('accusation');
    assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(state.discrepancy, code); assert.deepEqual(state.panels, {});
  }
  // On a fact that excludes nobody it is left out of the snapshot, never recorded or replaced.
  const f = await registry(t, 17, m => Object.assign(m[1], { sourceEventIds: { willing: NaN, citizen: 10n, trial: Infinity } })); await f.run('OPEN', { accusedId: 'accused' });
  assert.equal((await f.empanel('accusation')).status, 'ACCUSATION_EMPANELED');
  assert.deepEqual(f.last.population.identities.find(p => p.identityId === 'p1').sourceEventIds, {});
  assert.deepEqual(f.last.eligibility.roleEligibility.find(r => r.identityId === 'p1').sourceEventIds, {});
});

// JON-279 re-check findings (PR #70 review 5866725650).
test('JON-279 P2 a malformed authoritative snapshot is journaled for independent review; its committed seed cannot empanel without it', async t => {
  for (const malformed of [undefined, NaN, 10n]) {
    const review = {};
    const f = fixture(t, snapshot(17), { review }); await f.run('OPEN', { accusedId: 'accused' });
    await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
    f.s.population.identities[1].sourceEventIds = { willing: malformed };
    const blocked = await f.run('ENTER_STAGE', { seed: 'seed' });
    assert.equal(blocked.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(blocked.discrepancy, 'MALFORMED_SOURCE_SNAPSHOT');
    assert.deepEqual(blocked.panels, {});
    const held = f.store.load('case:case');
    assert.deepEqual([held.length, held.at(-1).type, held.at(-1).stage, held.at(-1).actorId, held.at(-1).version], [3, 'INPUT_DISCREPANCY', 'ACCUSATION', 'clerk', 3]);
    // Repairing the source does not release the hold: the same committed seed still needs the review.
    delete f.s.population.identities[1].sourceEventIds;
    f.restart();
    for (const [type, extra] of [['ENTER_STAGE', { seed: 'seed' }], ['COMMIT_SEED', { seedCommitment: seedCommitment('fresh') }]]) {
      await assert.rejects(f.run(type, extra), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
      assert.deepEqual(f.store.load('case:case'), held);
    }
    review.assess = discrepancyReceipt;
    const resolved = await f.run('RESOLVE_REVIEW');
    assert.equal(resolved.status, 'REPORTED'); assert.equal(resolved.commitments.ACCUSATION, undefined);
    assert.equal(f.store.load('case:case').at(-1).receipt.discrepancyVersion, 3);
    await assert.rejects(f.run('ENTER_STAGE', { seed: 'seed' }), { code: 'SEED_NOT_COMMITTED' });
    assert.equal((await f.empanel('fresh')).status, 'ACCUSATION_EMPANELED');
  }
  // The same holds when the malformed snapshot is first seen at seed commitment.
  const f = fixture(t, snapshot(17)); await f.run('OPEN', { accusedId: 'accused' });
  f.s.office.offices = [undefined];
  const blocked = await f.run('COMMIT_SEED', { seedCommitment: seedCommitment('seed') });
  assert.equal(blocked.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(blocked.discrepancy, 'MALFORMED_SOURCE_SNAPSHOT');
  assert.deepEqual(blocked.commitments, {});
});
test('JON-279 P2 an assignment validation with a blank or untrimmed source event goes to discrepancy review, never into the draw audit', async t => {
  const s = snapshot(17), first = plan(s).roster[0];
  for (const sourceEventId of ['   ', '\t', ' vacancy:1 ', '', 7]) {
    for (const accepted of [false, true]) {
      const result = plan(s, 'ACCUSATION', { validateAssignment: id => id === first ? { valid: accepted, reasonCode: 'NEW_VACANCY', sourceEventId } : valid(id) });
      assert.equal(result.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(result.reason, 'INVALID_ASSIGNMENT_VALIDATION');
      assert.deepEqual(result.roster, []); assert.deepEqual(result.drawAudit, []);
    }
  }
  // Through the service the replacement is held for review instead of freezing a whitespace-only ID.
  const sources = { capture: () => structuredClone(s), validateAssignment: id => id === first ? { valid: false, reasonCode: 'NEW_VACANCY', sourceEventId: '   ' } : valid(id) };
  const f = fixture(t, s, { sources }); await f.run('OPEN', { accusedId: 'accused' });
  const state = await f.empanel('fixed-seed');
  assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(state.discrepancy, 'INVALID_ASSIGNMENT_VALIDATION'); assert.deepEqual(state.panels, {});
  assert.ok(f.store.load('case:case').every(e => !canonical(e).includes('"   "')));
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'fixed-seed' }), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
});
test('JON-279 P2 malformed eligibility reason codes go to discrepancy review, never into frozen reasonCodes or reasonSources', async t => {
  const role = (s, id) => s.eligibility.roleEligibility.find(r => r.identityId === id);
  for (const code of [{ protected: 'payload' }, ['FORMAL_PROCEEDING'], 42, null, true, '', '  ', ' FORMAL_PROCEEDING ']) {
    // The reason is rejected on an ineligible role and on one it would not (yet) exclude.
    for (const accusation of [false, true]) {
      const s = snapshot(17);
      Object.assign(role(s, 'p1'), { accusation, reasonCodes: [code], sourceEventIds: { accusation: 'role-decision:p1' }, reasonSourceEventIds: { [code]: 'role-decision:p1' } });
      const result = plan(s);
      assert.equal(result.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(result.reason, 'INVALID_ELIGIBILITY_REASON');
      assert.deepEqual(result.roster, []); assert.deepEqual(result.exclusions, []);
    }
  }
  // A well-formed reason is still recorded with its source.
  const ok = snapshot(17);
  Object.assign(role(ok, 'p1'), { accusation: false, reasonCodes: ['FORMAL_PROCEEDING'], sourceEventIds: { accusation: 'role-decision:p1' }, reasonSourceEventIds: { FORMAL_PROCEEDING: 'proceeding:1' } });
  assert.deepEqual(plan(ok).exclusions.find(e => e.identityId === 'p1').reasonSources,
    [{ reasonCode: 'ROLE_INELIGIBLE', sourceEventId: 'role-decision:p1' }, { reasonCode: 'FORMAL_PROCEEDING', sourceEventId: 'proceeding:1' }]);
  // Through the service nothing of the arbitrary object reaches the journal, and no panel is frozen.
  const s = snapshot(17);
  Object.assign(role(s, 'p1'), { accusation: false, reasonCodes: [{ protected: 'payload' }], sourceEventIds: { accusation: 'role-decision:p1' }, reasonSourceEventIds: { '[object Object]': 'role-decision:p1' } });
  const f = fixture(t, s); await f.run('OPEN', { accusedId: 'accused' });
  const state = await f.empanel();
  assert.equal(state.status, 'ACCUSATION_INPUT_DISCREPANCY_REVIEW'); assert.equal(state.discrepancy, 'INVALID_ELIGIBILITY_REASON'); assert.deepEqual(state.panels, {});
  assert.ok(f.store.load('case:case').every(e => !canonical(e).includes('payload')));
  await assert.rejects(f.run('ENTER_STAGE', { seed: 'seed' }), { code: 'INDEPENDENT_REVIEW_REQUIRED' });
});
