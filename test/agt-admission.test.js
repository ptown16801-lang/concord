import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { generateKeyPairSync, sign } from 'node:crypto';
import { createAdmissionKernel } from '../src/governance/agt-adapter.js';
import { VERSION, canonical, digest, textDigest } from '../contracts/admission.js';
import { FIXTURE_TIME, requestFixture, participantsFixture, contextFixture } from '../contracts/fixtures/admission.js';

const yaml = await readFile(new URL('../policies/test/admission.yaml', import.meta.url), 'utf8');
const { publicKey, privateKey } = generateKeyPairSync('ed25519');
const root = { issuer: 'test-owner', keyId: 'test-key', publicKey: publicKey.export({ type: 'spki', format: 'pem' }) };
function bundle(generation = 1, policy = yaml, changes = {}) {
  const manifest = {
    schema: VERSION, domain: 'synthetic', audience: 'synthetic-reader', generation,
    compatibilityId: `set-${generation}`, issuer: root.issuer, keyId: root.keyId,
    notBefore: FIXTURE_TIME - 1000, expiresAt: FIXTURE_TIME + 60_000,
    policyDigest: textDigest(policy), participants: participantsFixture(generation), ...changes,
  };
  return { manifest, yaml: policy, signature: sign(null, Buffer.from(canonical(manifest)), privateKey).toString('base64') };
}
function kernel(options = {}) {
  return createAdmissionKernel({
    domain: 'synthetic', audience: 'synthetic-reader', actions: ['sample.read', 'sample.write'],
    trustRoots: [root], clock: () => FIXTURE_TIME,
    // contextFixture's optional second parameter is not the provider options.
    ...options, resolveContext: options.resolveContext ?? ((request) => contextFixture(request)),
  });
}
async function ready(options) {
  const instance = kernel(options);
  assert.equal((await instance.installPolicy(bundle())).decision, 'installed');
  return instance;
}

// A downstream dispatch sentinel: denial must never open the invocation gate.
async function denied(instance, request, code) {
  let invocations = 0;
  const result = await instance.evaluate(request);
  if (result.decision === 'allow') invocations++;
  assert.equal(invocations, 0);
  assert.equal(result.decision, 'deny');
  if (code) assert.equal(result.code, code);
  return result;
}

test('real SDK YAML allow, explicit deny, and unmatched default deny; kernel has no execution API', async () => {
  const instance = await ready();
  const request = requestFixture();
  const allowed = await instance.evaluate(request);
  assert.equal(allowed.decision, 'allow');
  assert.equal(allowed.requestDigest, digest(request));
  assert.equal(allowed.authoritySnapshotId, 'snapshot-1');
  assert.deepEqual(await instance.evaluate(request), allowed);
  assert.deepEqual(Object.keys(instance).sort(), ['evaluate', 'installPolicy']);
  await denied(instance, { ...request, action: 'sample.write' }, 'POLICY_DENIED');
  await denied(instance, { ...request, resource: 'sample/two' }, 'POLICY_DENIED');
});

test('malformed, unknown and caller-authority fields deny before context lookup', async () => {
  let lookups = 0;
  const instance = await ready({ resolveContext() { lookups++; throw new Error(); } });
  const request = requestFixture();
  const cases = [null, {}, { ...request, schema: 'v0' }, { ...request, canonicalVersion: 'unknown' },
    { ...request, operationId: '' }, { ...request, roles: ['owner'] }, { ...request, actorId: 'forged' },
    { ...request, authority: { permitted: true } }, { ...request, arguments: { selector: 'two' } },
    { ...request, expectedVersions: {} }, { ...request, expectedVersions: { sample: -1 } },
    { ...request, action: 'unknown' }, { ...request, domain: 'other' }, { ...request, audience: 'other' }];
  for (const candidate of cases) await denied(instance, candidate);
  assert.equal(lookups, 0);
});

test('canonical profile is ordered, versioned and rejects ambiguous/non-JSON values', () => {
  assert.equal(digest({ b: 1, a: ['x'] }), digest({ a: ['x'], b: 1 }));
  const cyclic = {}; cyclic.self = cyclic;
  for (const value of [undefined, NaN, Infinity, -0, 1.5, 2n, new Date(), cyclic, [, 1],
    { a: undefined }, JSON.parse('{"__proto__":true}'), { get a() { return 1; } }]) {
    assert.throws(() => canonical(value));
  }
});

test('missing, forged, expired, incompatible and insufficient trusted context deny', async () => {
  let transform = (context) => context;
  const instance = await ready({ resolveContext: (request) => transform(contextFixture(request)) });
  const changes = [
    () => undefined, () => ({}),
    (c) => ({ ...c, requestDigest: 'wrong' }), (c) => ({ ...c, domain: 'other' }),
    (c) => ({ ...c, audience: 'other' }), (c) => ({ ...c, serviceId: 'wrong' }),
    (c) => ({ ...c, actorId: 'forged' }), (c) => ({ ...c, expiresAt: FIXTURE_TIME }),
    (c) => ({ ...c, authenticatedAt: FIXTURE_TIME + 1 }), (c) => ({ ...c, participants: {} }),
    (c) => ({ ...c, participants: participantsFixture(2) }),
    ...['actorId', 'domain', 'action', 'resource', 'purpose', 'argumentDigest'].map((field) =>
      (c) => ({ ...c, authority: { ...c.authority, [field]: 'wrong' } })),
    (c) => ({ ...c, authority: { ...c.authority, permitted: false } }),
    (c) => ({ ...c, authority: { ...c.authority, expectedVersions: { sample: 2 } } }),
    (c) => ({ ...c, authority: { ...c.authority, expiresAt: FIXTURE_TIME } }),
    (c) => ({ ...c, authority: { ...c.authority, notBefore: FIXTURE_TIME + 1 } }),
  ];
  for (const change of changes) {
    transform = change;
    await denied(instance, requestFixture(), 'CONTEXT_DENIED');
  }
});

test('signed manifests bind exact policy bytes, target, issuer, freshness and compatibility tuples', async () => {
  const candidates = [
    { ...bundle(), signature: Buffer.alloc(64).toString('base64') },
    { ...bundle(), yaml: yaml + '\n' },
    bundle(1, yaml, { issuer: 'unknown' }), bundle(1, yaml, { keyId: 'unknown' }),
    bundle(1, yaml, { domain: 'other' }), bundle(1, yaml, { audience: 'other' }),
    bundle(1, yaml, { expiresAt: FIXTURE_TIME }), bundle(1, yaml, { notBefore: FIXTURE_TIME + 1 }),
    bundle(1, yaml, { participants: participantsFixture(2) }),
    bundle(1, yaml, { participants: {} }), bundle(1, yaml, { extra: 'unknown' }),
  ];
  for (const candidate of candidates) {
    const instance = kernel();
    assert.equal((await instance.installPolicy(candidate)).decision, 'deny');
    await denied(instance, requestFixture(), 'POLICY_UNAVAILABLE');
  }
});

test('parse failures and permissive/malformed policies seal admission', async () => {
  for (const policy of ['[invalid', 'null', yaml.replace('default_action: deny', 'default_action: allow'),
    yaml.replace('effect: allow', 'effect: warn'), yaml.replace('effect: allow', 'effect: require_approval'),
    yaml.replace('      action: sample.read\n', ''), yaml.replace('effect: allow', 'effect: true')]) {
    const instance = kernel();
    assert.equal((await instance.installPolicy(bundle(1, policy))).decision, 'deny');
    await denied(instance, requestFixture(), 'POLICY_UNAVAILABLE');
  }
});

test('deny overrides an overlapping allow', async () => {
  const instance = kernel();
  const policy = yaml.replace('action: sample.write', 'action: sample.read');
  assert.equal((await instance.installPolicy(bundle(1, policy))).decision, 'installed');
  await denied(instance, requestFixture(), 'POLICY_DENIED');
});

test('failed updates seal; generation high-water survives failure; explicit newer repair succeeds', async () => {
  let generation = 1;
  const instance = await ready({ resolveContext: (r) => contextFixture(r, generation) });
  assert.equal((await instance.installPolicy(bundle(2, '['))).decision, 'deny');
  await denied(instance, requestFixture(), 'POLICY_UNAVAILABLE');
  assert.equal((await instance.installPolicy(bundle(1))).decision, 'deny');
  assert.equal((await instance.installPolicy(bundle(2))).decision, 'installed');
  generation = 2;
  assert.equal((await instance.evaluate(requestFixture())).decision, 'allow');
});

test('concurrent updates are atomic and invalidate an in-flight pre-admission decision', async () => {
  let release;
  let entered;
  const started = new Promise((resolve) => { entered = resolve; });
  const instance = await ready({ resolveContext: (r) => new Promise((resolve) => {
    release = () => resolve(contextFixture(r)); entered();
  }) });
  const evaluation = instance.evaluate(requestFixture());
  await started;
  const first = instance.installPolicy(bundle(2));
  const second = instance.installPolicy(bundle(3));
  release();
  assert.equal((await first).decision, 'deny');
  assert.equal((await second).decision, 'installed');
  assert.equal((await evaluation).code, 'POLICY_CHANGED');
});

test('context exceptions, timeouts and late resolution never permit dispatch', async () => {
  const broken = await ready({ resolveContext() { throw new Error('secret credential'); } });
  const result = await denied(broken, requestFixture(), 'CONTEXT_DENIED');
  assert.ok(!JSON.stringify(result).includes('secret'));
  let release;
  let signal;
  const instance = await ready({ resolveContext: (r, options) => {
    signal = options.signal;
    return new Promise((resolve) => { release = () => resolve(contextFixture(r)); });
  } });
  await denied(instance, requestFixture(), 'TIMEOUT');
  assert.equal(signal.aborted, true);
  release();
});

test('policy worker deadline denies and leaves no active policy', async () => {
  const instance = kernel({ timeoutMs: 1 });
  assert.equal((await instance.installPolicy(bundle())).code, 'TIMEOUT');
  await denied(instance, requestFixture(), 'POLICY_UNAVAILABLE');
});

test('expiry and clock rollback fail closed for new decisions', async () => {
  let time = FIXTURE_TIME;
  const instance = await ready({ clock: () => time });
  time += 60_000;
  await denied(instance, requestFixture(), 'POLICY_UNAVAILABLE');
  time = FIXTURE_TIME;
  await denied(instance, requestFixture(), 'CLOCK_ERROR');
});
