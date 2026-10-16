import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createFixture } from '../examples/agt-local/fixture.js';
import { GovernanceSandbox } from '../src/governance/sandbox/runtime.js';

async function fixture(t, options) {
  const dir = await mkdtemp(join(tmpdir(), 'concord-governance-test-'));
  const f = await createFixture(dir, options);
  t.after(async () => { f.close(); await rm(dir, { recursive: true, force: true }); });
  return f;
}

test('approved write pauses for collector outage and resumes once across revocation, expiry and restart', async t => {
  const f = await fixture(t);
  await f.runtime.admit(f.signed(f.request()));
  f.collector.setAvailable(false);
  assert.equal(f.runtime.resume('operation-1').status, 'pending');
  assert.equal(f.runtime.record('sample/one').value, 'before');
  f.runtime.revoke('agent-1'); f.advance(120_000);
  assert.equal((await f.restart()).decision, 'deny'); // expired policy is irrelevant to pending approval
  assert.equal(f.runtime.resume('operation-1').status, 'pending');
  f.collector.setAvailable(true);
  assert.equal(f.runtime.resume('operation-1').status, 'committed');
  assert.equal(f.runtime.resume('operation-1').status, 'committed');
  assert.deepEqual(f.runtime.record('sample/one'), { value: 'after', version: 1 });
  assert.equal(f.collector.entries().length, 3);
});

test('new actions denied after revocation or expiry, including pre-signed requests', async t => {
  const f = await fixture(t), envelope = f.signed(f.request());
  f.runtime.revoke('agent-1');
  await assert.rejects(f.runtime.admit(envelope), /IDENTITY_DENIED/);
  const g = await fixture(t); const expired = g.signed(g.request()); g.advance(10_000);
  await assert.rejects(g.runtime.admit(expired), /IDENTITY_DENIED/);
});

test('proof of possession rejects wrong signature, modified arguments and cross-domain audience', async t => {
  const f = await fixture(t), original = f.signed(f.request());
  for (const modify of [e => e.signature = Buffer.alloc(64).toString('base64'), e => e.request.arguments.value = 'forged', e => e.request.domain = 'other']) {
    const e = structuredClone(original); modify(e); await assert.rejects(f.runtime.admit(e));
  }
  assert.equal(f.runtime.record('sample/one').version, 0);
});

test('authoritative capability grants restrict an otherwise policy-allowed action', async t => {
  const f = await fixture(t), e = f.signed(f.request());
  // Administrative fixture narrows the registry; caller never controls this value.
  f.runtime.db.prepare('UPDATE actors SET grants=? WHERE id=?').run(JSON.stringify([{action:'sample.read',resource:'sample/one',purpose:'test'}]),'agent-1');
  await assert.rejects(f.runtime.admit(e), /CAPABILITY_DENIED/);
});

test('all configured external policy checks execute and explicit denial prevents approval', async t => {
  let first=0, second=0;
  const f = await fixture(t, { evaluators: [() => { first++; return 'allow'; }, () => { second++; return 'deny'; }] });
  await assert.rejects(f.runtime.admit(f.signed(f.request())), /EXTERNAL_POLICY_DENIED/);
  assert.equal(first,1); assert.equal(second,1); assert.equal(f.runtime.operation('operation-1'),null);
});

test('external policy exceptions and deadline do not approve actions', async t => {
  const f = await fixture(t, { evaluators: [() => { throw new Error('offline'); }] });
  await assert.rejects(f.runtime.admit(f.signed(f.request())), /offline/);
  const g = await fixture(t, { evaluators: [() => new Promise(() => {})] });
  await assert.rejects(g.runtime.admit(g.signed(g.request())), /EVALUATOR_TIMEOUT/);
  assert.equal(g.runtime.operation('operation-1'),null);
});

test('revocation while asynchronous policy check is running prevents new approval', async t => {
  let started, release;
  const waiting = new Promise(r=>{started=r;});
  const f = await fixture(t,{evaluators:[()=>{started();return new Promise(r=>{release=r;});}]});
  const admission = f.runtime.admit(f.signed(f.request())); await waiting;
  f.runtime.revoke('agent-1'); release('allow');
  await assert.rejects(admission,/IDENTITY_DENIED/);
});

test('concurrent duplicate requests consume nonce and approve only once', async t => {
  const f = await fixture(t), e = f.signed(f.request());
  const results = await Promise.allSettled([f.runtime.admit(e),f.runtime.admit(e)]);
  assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
  assert.equal(f.runtime.auditEntries().filter(e=>e.type==='approved').length,1);
  await assert.rejects(f.runtime.admit(e),/REPLAY/);
});

test('fresh nonce cannot reuse operation ID; reservation prevents conflicting approvals', async t => {
  const f = await fixture(t); await f.runtime.admit(f.signed(f.request()));
  await assert.rejects(f.runtime.admit(f.signed(f.request())),/OPERATION_REPLAY/);
  await assert.rejects(f.runtime.admit(f.signed(f.request('operation-2'))),/RESOURCE_RESERVED/);
});

test('stale versions fail before approval; later read sees committed result', async t => {
  const f = await fixture(t);
  await assert.rejects(f.runtime.admit(f.signed(f.request('stale','sample.write','x',3))),/STALE_VERSION/);
  await f.runtime.admit(f.signed(f.request())); f.runtime.resume('operation-1');
  await f.runtime.admit(f.signed(f.request('read','sample.read',null,1)));
  assert.deepEqual(f.runtime.resume('read').result,{value:'after',version:1});
});

test('audit failure before execution has no record effect', async t => {
  const f = await fixture(t); await f.runtime.admit(f.signed(f.request()));
  const record = f.collector.record.bind(f.collector); f.collector.record = () => {throw new Error('disk full');};
  assert.equal(f.runtime.resume('operation-1').status,'pending');
  assert.equal(f.runtime.record('sample/one').version,0);
  f.collector.record=record; assert.equal(f.runtime.resume('operation-1').status,'committed');
});

test('lost outcome delivery after commit recovers without repeating effect', async t => {
  const f = await fixture(t); await f.runtime.admit(f.signed(f.request()));
  const record = f.collector.record.bind(f.collector);
  f.collector.record=(id,payload)=>{if(payload.type==='committed')throw new Error('collector failed after commit');record(id,payload);};
  assert.equal(f.runtime.resume('operation-1').status,'committed');
  assert.equal(f.runtime.record('sample/one').version,1);
  await f.restart(); f.collector.record=record;
  assert.equal(f.runtime.resume('operation-1').status,'committed');
  assert.equal(f.runtime.record('sample/one').version,1); assert.equal(f.collector.entries().length,3);
});

test('audit metadata returned to consumers is independent; audit rows reject updates/deletes', async t => {
  const f=await fixture(t);await f.runtime.admit(f.signed(f.request()));
  f.runtime.auditEntries()[0].evidence.actorId='forged';
  assert.equal(f.runtime.auditEntries()[0].evidence.actorId,'agent-1');
  assert.throws(()=>f.runtime.db.exec("UPDATE audit SET payload='{}'"),/immutable audit/);
  assert.throws(()=>f.runtime.db.exec('DELETE FROM audit'),/immutable audit/);
});

test('record corruption preserves approval with explicit waiting reason rather than cancellation',async t=>{
  const f=await fixture(t);await f.runtime.admit(f.signed(f.request()));
  f.runtime.db.exec('UPDATE records SET version=9');
  const state=f.runtime.resume('operation-1');assert.equal(state.status,'pending');assert.equal(state.waitingReason,'RECORD_CORRUPTED');
});

test('policy downgrade is denied across restart and failed update remains sealed',async t=>{
  const f=await fixture(t);assert.equal((await f.runtime.installPolicy(f.policy(2))).decision,'installed');
  await f.restart();assert.equal((await f.runtime.installPolicy(f.policy(1))).decision,'deny');
  assert.equal((await f.restart()).code,'POLICY_SEALED');
  assert.equal((await f.runtime.installPolicy(f.policy(3))).decision,'installed');
});

test('same database cannot silently be reopened as another domain',async t=>{
  const f=await fixture(t);assert.throws(()=>new GovernanceSandbox({...f.options,domain:'other'}),/DATABASE_DOMAIN_MISMATCH/);
});

for (const phase of ['execution-intent','committed']) {
  test(`real process kill before ${phase} preserves approved work and one effect on recovery`,async t=>{
    const { writeFile }=await import('node:fs/promises');
    const { spawnSync }=await import('node:child_process');
    const f=await fixture(t);await f.runtime.admit(f.signed(f.request()));
    const configPath=f.options.database+'.crash.json';
    await writeFile(configPath,JSON.stringify({options:{database:f.options.database,domain:f.options.domain,audience:f.options.audience,trustRoots:f.options.trustRoots},time:f.options.clock(),collector:f.options.database.replace('-domain.sqlite','-collector.sqlite'),crashBeforeType:phase}));
    const { NODE_TEST_CONTEXT: ignored, ...env }=process.env;
    const child=spawnSync(process.execPath,['examples/agt-local/crash-worker.js',configPath],{env,encoding:'utf8',timeout:10_000});
    assert.equal(child.signal,'SIGKILL',child.stderr);
    await f.restart();
    assert.equal(f.runtime.resume('operation-1').status,'committed');
    assert.equal(f.runtime.record('sample/one').version,1);
    assert.equal(f.collector.entries().length,3);
  });
}

test('approval rows cannot be canceled or have their admitted scope rewritten',async t=>{
  const f=await fixture(t);await f.runtime.admit(f.signed(f.request()));
  assert.throws(()=>f.runtime.db.exec("UPDATE operations SET status='canceled'"),/invalid operation transition/);
  assert.throws(()=>f.runtime.db.exec("UPDATE operations SET request='{}'"),/immutable approval/);
  assert.throws(()=>f.runtime.db.exec('DELETE FROM operations'),/cannot be canceled/);
});

test('key rotation invalidates old signatures for new admission, not existing approval',async t=>{
  const {generateKeyPairSync}=await import('node:crypto');
  const f=await fixture(t);await f.runtime.admit(f.signed(f.request()));
  const old=f.signed(f.request('second'));
  const keys=generateKeyPairSync('ed25519');
  f.runtime.rotateActorKey('agent-1',keys.publicKey.export({type:'spki',format:'pem'}));
  await assert.rejects(f.runtime.admit(old),/INVALID_SIGNATURE/);
  assert.equal(f.runtime.resume('operation-1').status,'committed');
});

test('separate domains do not accept each others signed operations or write stores',async t=>{
  const a=await fixture(t,{domain:'house'}), b=await fixture(t,{domain:'senate'});
  await assert.rejects(b.runtime.admit(a.signed(a.request())),/WRONG_DOMAIN/);
  await a.runtime.admit(a.signed(a.request()));a.runtime.resume('operation-1');
  assert.equal(a.runtime.record('sample/one').value,'after');
  assert.equal(b.runtime.record('sample/one').value,'before');
});

test('policy replacement during evaluation prevents stale new admission',async t=>{
  let started,release;const waiting=new Promise(r=>{started=r;});
  const f=await fixture(t,{evaluators:[()=>{started();return new Promise(r=>{release=r;});}]});
  const admission=f.runtime.admit(f.signed(f.request()));await waiting;
  assert.equal((await f.runtime.installPolicy(f.policy(2))).decision,'installed');release('allow');
  await assert.rejects(admission,/POLICY_CHANGED/);
});

test('stored policy generation mismatch seals restart admission',async t=>{
  const f=await fixture(t), old=f.policy(1);
  assert.equal((await f.runtime.installPolicy(f.policy(2))).decision,'installed');
  // Simulate a restored old bundle against the durable high-water mark.
  f.runtime.db.prepare("UPDATE meta SET value=? WHERE key='policy'").run(JSON.stringify(old));
  assert.equal((await f.restart()).code,'POLICY_ROLLBACK');
  await assert.rejects(f.runtime.admit(f.signed(f.request())),/POLICY_UNAVAILABLE/);
});

test('durable approval retains full authority scope and policy snapshot after revocation',async t=>{
  const f=await fixture(t),envelope=f.signed(f.request());await f.runtime.admit(envelope);
  f.runtime.revoke('agent-1');const op=f.runtime.operation('operation-1');
  assert.equal(op.evidence.authority.actorId,'agent-1');
  assert.equal(op.evidence.authority.argumentDigest,envelope.request.argumentDigest);
  assert.equal(op.evidence.authority.permissionExpiresAt,f.options.clock()+10_000);
  assert.equal(op.evidence.policyManifest.generation,1);
  assert.equal(op.evidence.authority.revision,1);
});
