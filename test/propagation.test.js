import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { canonicalize, digest, evaluateThreshold, createRun, replayPrefix, appendEvent, forkScenario } from '../src/propagation/index.js';

const root = (runId = 'P') => createRun({ runId, propositionRevision: 'r1' });
function event(run, kind, payload = {}, eventId = `e${run.events.length + 1}`) {
  return { eventId, sequence: run.events.length + 1, propositionRevision: 'r1', previousEventId: run.events.at(-1)?.eventId ?? null, kind, payload };
}
const add = (run, kind, payload, eventId) => appendEvent(run, event(run, kind, payload, eventId));
function note(run, target, head = null, name = 'C1') {
  return event(run, 'NOTE_CORRECTED', { targetEventId: target.eventId, targetSequence: target.sequence, targetDigest: digest(target), expectedPreviousCorrectionId: head, reason: 'Correct explanation', text: 'Intended synthetic affirmative count was 4' }, name);
}

for (const expected of JSON.parse(readFileSync(new URL('./fixtures/propagation/threshold-demo.json', import.meta.url))).cases) {
  test(`hand-derived threshold D=${expected.D}, affirmative=${expected.affirmative}`, () => {
    assert.deepEqual(evaluateThreshold(expected.D, expected.affirmative), expected);
  });
}
test('128-digit boundary uses integer arithmetic; invalid count representations fail', () => {
  const D = '9'.repeat(128), threshold = '6' + '0'.repeat(127);
  assert.equal(evaluateThreshold(D, threshold).threshold, threshold);
  assert.equal(evaluateThreshold(D, String(BigInt(threshold) - 1n)).outcome, 'not-satisfied');
  for (const value of ['1'.repeat(129), '-1', '+1', '01', '1.0', '', 7, 7n, null]) assert.throws(() => evaluateThreshold(value, '0'));
  assert.throws(() => evaluateThreshold('7', '8'));
});
test('all P/Q prefixes, correction heads and repeat replay preserve original evidence', () => {
  let p = root();
  assert.equal(replayPrefix(p).guardResult, null);
  p = add(p, 'OBSERVE', { D: '7', affirmative: '5' }, 'O');
  assert.equal(replayPrefix(p).guardResult, null);
  p = add(p, 'EVALUATE', {}, 'E');
  const before = canonicalize(p), observation = p.events[0];
  assert.equal(replayPrefix(p).stage, 'completed');
  p = appendEvent(p, note(p, observation));
  assert.equal(canonicalize({ ...p, events: p.events.slice(0, 2) }), before);
  assert.equal(replayPrefix(p, 2).guardResult.basis, 'original-inputs');
  assert.equal(replayPrefix(p, 3).guardResult.basis, 'historical-original-inputs');
  assert.equal(replayPrefix(p, 3).guardResult.outcome, 'satisfied');
  assert.equal(replayPrefix(p, 3).observation.corrected, true);
  const parentBytes = canonicalize(p);
  let q = forkScenario(p, 0, { runId: 'Q', reason: 'Changed assumption', changeEventId: 'O' });
  assert.equal(q.manifest.mode, 'hypothetical');
  assert.equal(q.manifest.parent.run.events.length, 0);
  assert.equal(q.manifest.parent.change.event.eventId, 'O');
  assert.equal(replayPrefix(q).observation, null);
  assert.equal(replayPrefix(q).guardResult, null);
  q = add(q, 'OBSERVE', { D: '7', affirmative: '4' }, 'O2');
  assert.equal(replayPrefix(q).guardResult, null);
  q = add(q, 'EVALUATE', {});
  assert.equal(replayPrefix(q).stage, 'waiting');
  assert.equal(replayPrefix(q).guardResult.outcome, 'not-satisfied');
  assert.equal(canonicalize(p), parentBytes);
  p = appendEvent(p, note(p, observation, 'C1', 'C2'));
  assert.equal(replayPrefix(p, 3).corrections[0].eventId, 'C1');
  assert.equal(replayPrefix(p).corrections[0].eventId, 'C2');
  assert.throws(() => appendEvent(p, note(p, observation, 'C1', 'C3')), /stale/);
  for (const run of [p, q]) for (let i = 0; i <= run.events.length; i++) assert.deepEqual(replayPrefix(run, i), replayPrefix(run, i));
});
test('explicit missing-evidence evaluation differs from never evaluated', () => {
  const r = add(root(), 'EVALUATE', {});
  assert.deepEqual(replayPrefix(r).guardResult, { outcome: 'unresolved' });
  assert.equal(replayPrefix(r).stage, 'active');
});
for (const waiting of [false, true]) test(`hold/release restores ${waiting ? 'waiting' : 'active'} without evaluation`, () => {
  let r = root();
  if (waiting) r = add(add(r, 'OBSERVE', { D: '7', affirmative: '4' }), 'EVALUATE', {});
  const before = replayPrefix(r);
  r = add(r, 'HOLD', { holdId: 'H' });
  const held = canonicalize(r);
  for (const [kind, payload] of [['OBSERVE', { D: '7', affirmative: '5' }], ['EVALUATE', {}], ['HOLD', { holdId: 'H2' }], ['RELEASE', { holdId: 'wrong' }]]) assert.throws(() => add(r, kind, payload));
  assert.equal(canonicalize(r), held);
  const child = forkScenario(r, r.events.length, { runId: 'child', reason: 'Held baseline' });
  assert.equal(replayPrefix(child).holdId, 'H');
  assert.deepEqual(replayPrefix(add(child, 'RELEASE', { holdId: 'H' })), before);
  r = add(r, 'RELEASE', { holdId: 'H' });
  assert.deepEqual(replayPrefix(r), before);
});
test('completion prohibits state changes; notes allowed held or completed', () => {
  let r = add(root(), 'OBSERVE', { D: '7', affirmative: '5' });
  const target = r.events[0];
  r = add(r, 'HOLD', { holdId: 'H' });
  assert.equal(replayPrefix(appendEvent(r, note(r, target))).stage, 'held');
  r = add(add(r, 'RELEASE', { holdId: 'H' }), 'EVALUATE', {});
  for (const [kind, payload] of [['OBSERVE', { D: '7', affirmative: '5' }], ['EVALUATE', {}], ['HOLD', { holdId: 'H' }], ['RELEASE', { holdId: 'H' }]]) assert.throws(() => add(r, kind, payload));
  assert.equal(replayPrefix(appendEvent(r, note(r, target))).stage, 'completed');
});
test('exact old-event retries succeed; conflicts and repeated stored events fail', () => {
  let r = add(root(), 'EVALUATE', {});
  const first = structuredClone(r.events[0]); r = add(r, 'HOLD', { holdId: 'H' });
  assert.deepEqual(appendEvent(r, first), r);
  assert.throws(() => appendEvent(r, { ...first, kind: 'HOLD', payload: { holdId: 'H' } }));
  const bad = structuredClone(r); bad.events.push(first);
  assert.throws(() => replayPrefix(bad, 0));
});
test('invalid attempts preserve sequence, identity, predecessor and original bytes', () => {
  let r = add(root(), 'EVALUATE', {}); const before = canonicalize(r);
  for (const patch of [{ sequence: 3 }, { previousEventId: null }, { propositionRevision: 'r2' }, { kind: 'UNKNOWN' }, { extra: true }]) {
    assert.throws(() => appendEvent(r, { ...event(r, 'EVALUATE'), ...patch })); assert.equal(canonicalize(r), before);
  }
  r = add(r, 'EVALUATE', {}); assert.equal(r.events.at(-1).sequence, 2);
  const reorder = structuredClone(r); reorder.events.reverse(); assert.throws(() => replayPrefix(reorder));
});
test('correction bindings cannot be forged or target notes/inherited events', () => {
  let r = add(root(), 'OBSERVE', { D: '7', affirmative: '5' }); const target = r.events[0];
  for (const patch of [{ targetDigest: '0'.repeat(64) }, { targetSequence: 0 }, { targetEventId: 'missing' }, { expectedPreviousCorrectionId: 'missing' }, { affirmative: '4' }]) {
    const e = note(r, target); Object.assign(e.payload, patch); assert.throws(() => appendEvent(r, e));
  }
  r = appendEvent(r, note(r, target)); assert.throws(() => appendEvent(r, note(r, r.events[1], null, 'C2')));
  const child = forkScenario(r, 1, { runId: 'child', reason: 'Inherited input' });
  assert.throws(() => appendEvent(child, note(child, target)));
  assert.throws(() => add(child, 'OBSERVE', { D: '7', affirmative: '4' }));
});
test('fork integrity, exact prefix, mode, definitions and ancestor identity', () => {
  const p = add(root(), 'OBSERVE', { D: '7', affirmative: '5' }, 'O');
  assert.throws(() => forkScenario(p, 0, { runId: 'P', reason: 'collision' }));
  assert.throws(() => forkScenario(p, 1, { runId: 'Q', reason: 'wrong prefix', changeEventId: 'O' }));
  const q = forkScenario(p, 0, { runId: 'Q', reason: 'changed', changeEventId: 'O' });
  const bad = structuredClone(q); bad.manifest.parent.digest = '0'.repeat(64); assert.throws(() => replayPrefix(bad));
  const changed = structuredClone(q); changed.manifest.parent.change.event.payload.affirmative = '4'; assert.throws(() => replayPrefix(changed));
  assert.throws(() => forkScenario(q, 0, { runId: 'P', reason: 'ancestor collision' }));
  for (const patch of [{ mode: 'authoritative' }, { schema: 'legacy/v2' }, { engine: 'wrong' }, { definitionDigest: '0'.repeat(64) }, { definition: { id: 'other' } }]) {
    const r = root(); Object.assign(r.manifest, patch); assert.throws(() => replayPrefix(r));
  }
});
test('accepted data is owned; caller and result mutation cannot alter prior records', () => {
  const r = root(), e = event(r, 'OBSERVE', { D: '7', affirmative: '5' }); const next = appendEvent(r, e);
  e.payload.affirmative = '0'; assert.equal(next.events[0].payload.affirmative, '5'); assert.equal(r.events.length, 0);
  const state = replayPrefix(next); state.observation.affirmative = '0'; assert.equal(replayPrefix(next).observation.affirmative, '5');
  const child = forkScenario(next, 1, { runId: 'Q', reason: 'copy' }); child.manifest.parent.run.events[0].payload.D = '8'; assert.equal(next.events[0].payload.D, '7');
  const retried = appendEvent(next, next.events[0]); retried.events[0].payload.D = '9'; assert.equal(next.events[0].payload.D, '7');
});
test('canonical encoding sorts keys, preserves arrays and rejects executable or malformed data', () => {
  assert.equal(canonicalize({ z: [2, 1], a: 'é' }), '{"a":"é","z":[2,1]}');
  assert.equal(digest({ a: 1, b: 2 }), digest({ b: 2, a: 1 }));
  let traps = 0; const proxy = new Proxy({}, { ownKeys() { traps++; throw Error('trap'); } });
  const getter = Object.defineProperty({}, 'x', { enumerable: true, get() { traps++; throw Error('getter'); } });
  const cycle = {}; cycle.self = cycle;
  for (const value of [proxy, getter, cycle, undefined, 1n, NaN, Infinity, -0, 1.5, '\ud800', new Date(), [, 1], { [Symbol('x')]: 1 }, Object.create({}), Object.assign([], { extra: 1 })]) assert.throws(() => canonicalize(value));
  assert.equal(traps, 0);
  assert.throws(() => createRun(proxy)); assert.equal(traps, 0);
});
test('depth, value, byte, event and parent bounds reject without truncation', () => {
  let nested = null; for (let i = 0; i < 33; i++) nested = [nested]; assert.throws(() => canonicalize(nested), /structural/);
  assert.throws(() => canonicalize(Array(50001).fill(0)), /limit/);
  assert.throws(() => canonicalize('x'.repeat(1048576)), /byte/);
  const r = root(); for (let i = 0; i < 1000; i++) r.events.push(event(r, 'EVALUATE'));
  assert.equal(replayPrefix(r).guardResult.outcome, 'unresolved');
  assert.throws(() => add(r, 'EVALUATE', {}), /event limit/);
  const over = root(); over.events.push(event(over, 'HOLD', { holdId: 'H' }));
  assert.throws(() => forkScenario(over, -1, { runId: 'Q', reason: 'bad' }));
  let chain = root();
  for (let i = 0; i < 8; i++) chain = forkScenario(chain, 0, { runId: `child${i}`, reason: 'bounded' });
  assert.throws(() => forkScenario(chain, 0, { runId: 'ninth', reason: 'too deep' }));
});
test('aggregate chain event limit and run byte limit include inherited material', () => {
  let r = root();
  for (let level = 0; level < 4; level++) {
    if (level) r = forkScenario(r, r.events.length, { runId: `chain${level}`, reason: 'chain count' });
    for (let i = 0; i < 1000; i++) r.events.push(event(r, 'EVALUATE'));
  }
  assert.equal(replayPrefix(r).stage, 'active');
  const child = forkScenario(r, 1000, { runId: 'fifth', reason: 'limit' });
  assert.throws(() => add(child, 'EVALUATE', {}), /chain event limit/);
  let large = add(root(), 'EVALUATE', {}, 'target');
  let head = null;
  for (let i = 0; i < 270; i++) {
    const e = note(large, large.events[0], head, `note${i}`); e.payload.reason = 'x'.repeat(2048); e.payload.text = 'y'.repeat(2048);
    large.events.push(e); head = e.eventId;
  }
  assert.throws(() => replayPrefix(large), /byte limit/);
});
test('strict text, prefix and payload validation; Unicode bytes stay distinct', () => {
  assert.notEqual(digest('é'), digest('e\u0301'));
  const r = root();
  for (const reason of ['', 'x'.repeat(2049), '😀'.repeat(513), '\ud800']) assert.throws(() => forkScenario(r, 0, { runId: 'Q', reason }));
  for (const prefix of [-1, 1, 0.5, '0', NaN]) assert.throws(() => replayPrefix(r, prefix));
  for (const payload of [{ unknown: true }, { '': 'unexpected' }, { 'D\0affirmative': '7' }, null, [], { D: '7' }]) assert.throws(() => add(r, 'EVALUATE', payload));
});
