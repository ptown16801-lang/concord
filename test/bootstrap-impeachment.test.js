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
import { BootstrapImpeachmentService, ImpeachmentStore, createCommandAuthenticator, DurableEligibility,
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
function plan(s, stage = 'ACCUSATION', extra = {}) { return planBootstrapStage({ snapshot: s, caseId: 'case', accusedId: 'accused', stage, seed: 'fixed-seed', validateAssignment: valid, ...extra }); }
function office(s, id, institution = 'HOUSE', extra = {}) { s.office.offices.push({ officeId: `${institution}:${id}`, holderIdentityId: id, institution, serving: true, permanentSeat: true, recused: false, ...extra }); }
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
  s.eligibility.roleEligibility.find(r => r.identityId === 'p2').accusation = false;
  assert.equal(plan(s).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
});
test('S13-S14 fresh trial eligibility, known investigator/conflict exclusion', () => {
  const s = snapshot(8), acc = plan(s);
  s.conflicts.knownInvestigators = [s.population.identities.find(p => p.identityId !== 'accused' && !acc.roster.includes(p.identityId)).identityId];
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
  f.sources.capture = (state, db) => ({ ...structuredClone(f.s), ...captureRegistryInputs(db, durable.projection(), { roleMetadata: metadata, rulesetVersion: 'r1', eligibilityVersion: 1 }) });
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
  candidate.willing = false; bump(f.s, 'population'); bump(f.s, 'eligibility'); f.s.eligibility.populationVersion = f.s.population.version;
  assert.equal((await f.empanel('trial')).status, 'WAITING_FOR_INDEPENDENT_PARTICIPANTS');
  candidate.willing = true; bump(f.s, 'population'); bump(f.s, 'eligibility'); f.s.eligibility.populationVersion = f.s.population.version;
  assert.equal((await f.empanel('retry')).status, 'TRIAL_EMPANELED');
});
