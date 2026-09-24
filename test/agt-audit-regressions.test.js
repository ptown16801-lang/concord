import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createFixture } from '../examples/agt-local/fixture.js';
import { verifyPolicyEvidence } from '../src/governance/policy-evidence.js';
import { LocalAuditCollector } from '../src/governance/sandbox/runtime.js';

async function fixture(t, options) {
  const dir = await mkdtemp(join(tmpdir(), 'concord-audit-regression-'));
  const f = await createFixture(dir, options);
  t.after(async () => { f.close(); await rm(dir, { recursive: true, force: true }); });
  return f;
}

for (const boundary of ['identity', 'policy']) {
  for (const offset of [-1, 0, 1]) {
    test(`approval timestamp respects ${boundary} expiry with offset ${offset}`, async t => {
      let tick;
      const f = await fixture(t, { evaluators: [() => {
        // Advance time across the final synchronous approval checks.
        f.runtime.clock = () => tick++;
        return 'allow';
      }] });
      const deadline = boundary === 'identity'
        ? f.options.clock() + 10_000 : f.runtime.bundle.manifest.expiresAt;
      if (boundary === 'policy') {
        f.runtime.db.prepare('UPDATE actors SET expires=?').run(deadline + 10_000);
      }
      const envelope = f.signed(f.request());
      tick = deadline + offset - 2;
      if (offset < 0) {
        await f.runtime.admit(envelope);
        assert.ok(f.runtime.operation('operation-1').evidence.approvedAt < deadline);
        f.advance(deadline - f.options.clock() + 1);
        f.runtime.clock = f.options.clock;
        f.runtime.revoke('agent-1');
        assert.equal(f.runtime.resume('operation-1').status, 'committed');
        assert.equal(f.runtime.record('sample/one').version, 1);
      } else {
        await assert.rejects(f.runtime.admit(envelope), {
          code: boundary === 'identity' ? 'IDENTITY_DENIED' : 'POLICY_EXPIRED',
        });
        assert.equal(f.runtime.operation('operation-1'), null);
        assert.equal(f.runtime.db.prepare('SELECT count(*) AS n FROM reservations').get().n, 0);
        assert.equal(f.runtime.db.prepare('SELECT used FROM challenges WHERE id=?').get(envelope.nonce).used, 0);
        assert.equal(f.runtime.record('sample/one').version, 0);
        const audit = f.runtime.auditEntries();
        assert.equal(audit.length, 1);
        assert.equal(audit[0].type, 'denied');
        assert.equal(audit[0].stage, 'approval');
      }
    });
  }
}

test('primitive and hostile evaluator rejections retain a sanitized denial and no approval', async t => {
  for (const reason of [null, undefined, 'private evaluator error', { get code() { throw new Error('private getter'); } }]) {
    const f = await fixture(t, { evaluators: [() => Promise.reject(reason)] });
    const envelope = f.signed(f.request());
    await assert.rejects(f.runtime.admit(envelope), error => error === reason);
    assert.equal(f.runtime.operation('operation-1'), null);
    assert.equal(f.runtime.db.prepare('SELECT count(*) AS n FROM reservations').get().n, 0);
    assert.equal(f.runtime.record('sample/one').version, 0);
    const [entry] = f.runtime.auditEntries();
    assert.equal(f.runtime.auditEntries().length, 1);
    assert.equal(entry.type, 'denied');
    assert.equal(entry.code, 'ADMISSION_DENIED');
    assert.equal(entry.stage, 'external-policy');
    assert.equal(entry.actorVerified, true);
    assert.equal(JSON.stringify(entry).includes('private'), false);
  }
});

test('committed result cannot diverge from the record or audit receipt, including after restart', async t => {
  const f = await fixture(t);
  await f.runtime.admit(f.signed(f.request()));
  assert.throws(() => f.runtime.db.exec("UPDATE operations SET result='{}'"), /immutable result/);
  assert.throws(() => f.runtime.db.exec("UPDATE operations SET status='committed'"), /committed result required/);
  assert.equal(f.runtime.operation('operation-1').status, 'pending');
  const committed = f.runtime.resume('operation-1');
  const receipt = f.collector.entries().find(e => e.payload.type === 'committed');
  for (const pragma of [0, 1]) {
    f.runtime.db.exec(`PRAGMA recursive_triggers=${pragma}`);
    assert.throws(() => f.runtime.db.exec("UPDATE operations SET result='{}'"), /immutable result/);
    assert.throws(() => f.runtime.db.exec('UPDATE operations SET result=NULL'), /immutable result/);
  }
  await f.restart();
  assert.throws(() => f.runtime.db.exec("UPDATE operations SET result='{}'"), /immutable result/);
  assert.deepEqual(f.runtime.resume('operation-1').result, committed.result);
  assert.deepEqual(f.runtime.record('sample/one'), committed.result);
  assert.deepEqual(f.collector.entries().find(e => e.payload.type === 'committed'), receipt);
});

test('historical policy verifies offline after upgrade, expiry and loss of current policy', async t => {
  const f = await fixture(t);
  await f.runtime.admit(f.signed(f.request()));
  const op = f.runtime.operation('operation-1');
  const archived = f.runtime.archivedPolicy(op.evidence.policyArchiveDigest);
  assert.equal(archived.yaml, f.policy().yaml);
  assert.equal(await f.runtime.installPolicy(f.policy(2)).then(r => r.decision), 'installed');
  f.runtime.db.exec("DELETE FROM meta WHERE key='policy'");
  f.advance(120_000);
  assert.equal((await f.restart()).code, 'POLICY_UNAVAILABLE');
  const retained = f.runtime.archivedPolicy(op.evidence.policyArchiveDigest);
  assert.deepEqual(retained, archived);
  assert.equal(verifyPolicyEvidence(op, retained, f.options.trustRoots), true);
  assert.equal(verifyPolicyEvidence(op, retained, []), false);
  assert.equal(verifyPolicyEvidence(op, { ...retained, yaml: retained.yaml + '\n' }, f.options.trustRoots), false);
  assert.equal(verifyPolicyEvidence(op, { ...retained, signature: Buffer.alloc(64).toString('base64') }, f.options.trustRoots), false);
  for (const pragma of [0, 1]) {
    f.runtime.db.exec(`PRAGMA recursive_triggers=${pragma}`);
    assert.throws(() => f.runtime.db.prepare('INSERT OR REPLACE INTO policy_archive VALUES (?,?)').run(op.evidence.policyArchiveDigest, '{}'), /immutable policy/);
    assert.throws(() => f.runtime.db.exec("UPDATE policy_archive SET bundle='{}'"), /immutable policy/);
    assert.throws(() => f.runtime.db.exec('DELETE FROM policy_archive'), /immutable policy/);
  }
  assert.equal(f.runtime.resume('operation-1').status, 'committed');
});

test('denials correlate attempts without asserting unverified identities or exposing credentials', async t => {
  const f = await fixture(t);
  const envelope = f.signed(f.request());
  const forged = { ...envelope, signature: Buffer.alloc(64).toString('base64') };
  await assert.rejects(f.runtime.admit(forged), /INVALID_SIGNATURE/);
  await assert.rejects(f.runtime.admit(forged), /INVALID_SIGNATURE/);
  f.runtime.db.exec("UPDATE actors SET grants='[]'");
  await assert.rejects(f.runtime.admit(envelope), /CAPABILITY_DENIED/);
  f.runtime.revoke('agent-1');
  await assert.rejects(f.runtime.admit(envelope), /IDENTITY_DENIED/);
  await assert.rejects(f.runtime.admit({ malformed: true }));
  const entries = f.runtime.auditEntries();
  assert.equal(entries.length, 5);
  assert.equal(new Set(entries.map(e => e.correlationId)).size, 5);
  for (const entry of entries) {
    assert.equal(entry.timestamp, f.options.clock());
    assert.equal(entry.type, 'denied');
    assert.ok(['identity', 'capability', 'request'].includes(entry.stage));
    assert.equal(Object.hasOwn(entry, 'signature'), false);
  }
  assert.equal(entries[0].requestDigest, entries[1].requestDigest);
  assert.equal(entries[0].actorVerified, false);
  assert.equal(Object.hasOwn(entries[0], 'actorId'), false);
  assert.equal(entries[2].actorVerified, true);
  assert.equal(entries[2].actorId, 'agent-1');
  assert.equal(entries[3].actorVerified, false);
  assert.equal(Object.hasOwn(entries[3], 'actorId'), false);
  assert.equal(JSON.stringify(entries).includes(envelope.signature), false);
});

for (const pragma of [0, 1]) {
  test(`replacement cannot rewrite approval, reservation or audit with recursive_triggers=${pragma}`, async t => {
    const f = await fixture(t);
    await f.runtime.admit(f.signed(f.request()));
    f.runtime.flushAudit();
    f.runtime.db.exec(`PRAGMA recursive_triggers=${pragma}`);
    f.collector.db.exec(`PRAGMA recursive_triggers=${pragma}`);
    const op = f.runtime.operation('operation-1');
    const audit = f.runtime.db.prepare('SELECT * FROM audit').get();
    const reservation = f.runtime.db.prepare('SELECT * FROM reservations').get();
    const receipt = f.collector.entries()[0];
    const raw = f.runtime.db.prepare('SELECT * FROM operations').get();
    assert.throws(() => f.runtime.db.prepare('INSERT OR REPLACE INTO operations VALUES (?,?,?,?,?,?,?)').run(raw.id, raw.request, raw.digest, raw.actor, 'canceled', raw.evidence, null), /immutable approval/);
    // Exercise both unique keys separately, not only replacement by matching both.
    assert.throws(() => f.runtime.db.prepare('INSERT OR REPLACE INTO audit(sequence,id,payload) VALUES (?,?,?)').run(audit.sequence, 'new-id', '{}'), /immutable audit/);
    assert.throws(() => f.runtime.db.prepare('INSERT OR REPLACE INTO audit(id,payload) VALUES (?,?)').run(audit.id, '{}'), /immutable audit/);
    assert.throws(() => f.runtime.db.prepare('INSERT OR REPLACE INTO reservations VALUES (?,?)').run(reservation.resource, reservation.operation), /immutable reservation/);
    assert.throws(() => f.collector.db.prepare('INSERT OR REPLACE INTO receipts VALUES (?,?)').run(receipt.id, '{}'), /immutable receipt/);
    for (const alias of ['rowid', '_rowid_', 'oid']) {
      const rowid = f.runtime.db.prepare('SELECT rowid FROM operations').get().rowid;
      assert.throws(() => f.runtime.db.prepare(`INSERT OR REPLACE INTO operations(${alias},id,request,digest,actor,status,evidence,result) VALUES (?,?,?,?,?,?,?,?)`).run(rowid, 'replacement', raw.request, raw.digest, raw.actor, 'canceled', raw.evidence, null), /immutable approval/);
      const policyRow = f.runtime.db.prepare('SELECT rowid FROM policy_archive LIMIT 1').get().rowid;
      assert.throws(() => f.runtime.db.prepare(`INSERT OR REPLACE INTO policy_archive(${alias},digest,bundle) VALUES (?,?,?)`).run(policyRow, 'replacement', '{}'), /immutable policy/);
      const receiptRow = f.collector.db.prepare('SELECT rowid FROM receipts LIMIT 1').get().rowid;
      assert.throws(() => f.collector.db.prepare(`INSERT OR REPLACE INTO receipts(${alias},id,payload) VALUES (?,?,?)`).run(receiptRow, 'replacement', '{}'), /immutable receipt/);
      const reservationRow = f.runtime.db.prepare('SELECT rowid FROM reservations LIMIT 1').get().rowid;
      assert.throws(() => f.runtime.db.prepare(`INSERT OR REPLACE INTO reservations(${alias},resource,operation) VALUES (?,?,?)`).run(reservationRow, 'replacement', 'missing'), /immutable reservation/);
    }
    assert.deepEqual(f.runtime.operation('operation-1'), op);
    assert.deepEqual(f.runtime.db.prepare('SELECT * FROM audit').get(), audit);
    assert.deepEqual(f.runtime.db.prepare('SELECT * FROM reservations').get(), reservation);
    assert.deepEqual(f.collector.entries()[0], receipt);
    assert.equal(f.runtime.resume('operation-1').status, 'committed');
  });
}

test('collector replacement reconciles approval before execution and retries only one effect', async t => {
  const f = await fixture(t);
  await f.runtime.admit(f.signed(f.request()));
  f.runtime.flushAudit();
  await f.restart();
  const replacement = new LocalAuditCollector(f.options.database + '.replacement');
  t.after(() => replacement.close());
  f.runtime.collector = replacement;
  const record = replacement.record.bind(replacement);
  const types = [];
  replacement.record = (id, payload) => {
    types.push(payload.type);
    if (payload.type === 'execution-intent') {
      assert.equal(replacement.entries().some(e => e.payload.type === 'approved'), true);
      assert.equal(f.runtime.record('sample/one').version, 0);
    }
    record(id, payload);
  };
  replacement.setAvailable(false);
  assert.equal(f.runtime.resume('operation-1').status, 'pending');
  assert.equal(f.runtime.record('sample/one').version, 0);
  replacement.setAvailable(true);
  assert.equal(f.runtime.resume('operation-1').status, 'committed');
  assert.equal(f.runtime.resume('operation-1').status, 'committed');
  assert.equal(f.runtime.record('sample/one').version, 1);
  assert.ok(types.indexOf('approved') < types.indexOf('execution-intent'));
  assert.deepEqual(replacement.entries().map(e => e.payload.type).sort(), ['approved', 'committed', 'execution-intent']);
});

test('conflicting collector history pauses approved work without effects', async t => {
  const f = await fixture(t);
  await f.runtime.admit(f.signed(f.request()));
  f.runtime.flushAudit();
  const replacement = new LocalAuditCollector(f.options.database + '.conflict');
  t.after(() => replacement.close());
  replacement.record('synthetic:operation-1:approved', { type: 'conflicting' });
  f.runtime.collector = replacement;
  const outcome = f.runtime.resume('operation-1');
  assert.equal(outcome.waitingReason, 'AUDIT_CONFLICT');
  assert.equal(outcome.status, 'pending');
  assert.equal(f.runtime.record('sample/one').version, 0);
  assert.equal(f.runtime.db.prepare('SELECT count(*) AS n FROM reservations').get().n, 1);
});
