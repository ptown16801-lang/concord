#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const fixtureRoot = join(root, 'fixtures');
const manifest = JSON.parse(await readFile(join(fixtureRoot, 'manifest.json'), 'utf8'));

assert.equal(manifest.fixturePack, 'jon58-adversarial');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(typeof manifest.seed, 'string');
assert.ok(manifest.seed.length > 0);
assert.equal(manifest.integrationStatus, 'ADAPTER_PENDING');
assert.ok(Array.isArray(manifest.files) && manifest.files.length > 0);
assert.equal(new Set(manifest.files).size, manifest.files.length, 'manifest files must be unique');

const actualJson = (await readdir(fixtureRoot))
  .filter((name) => name.endsWith('.json') && name !== 'manifest.json')
  .sort();
assert.deepEqual([...manifest.files].sort(), actualJson, 'manifest must enumerate every fixture JSON file');

const cases = [];
const digest = createHash('sha256');
let thresholdCount = 0;

for (const file of manifest.files) {
  const raw = await readFile(join(fixtureRoot, file), 'utf8');
  const parsed = JSON.parse(raw);
  assert.ok(Array.isArray(parsed) && parsed.length > 0, `${file} must contain a non-empty array`);
  digest.update(file).update('\0').update(raw).update('\0');
  for (const fixture of parsed) cases.push({ file, fixture });
}

const ids = new Set();
for (const { file, fixture } of cases) {
  const label = `${file}:${fixture.id ?? '<missing-id>'}`;
  assert.match(fixture.id, /^[A-Z][A-Z0-9-]+$/, `${label} has an invalid ID`);
  assert.ok(!ids.has(fixture.id), `${label} duplicates a fixture ID`);
  ids.add(fixture.id);
  assert.equal(typeof fixture.sourceRule, 'string', `${label} needs an exact source rule`);
  assert.match(fixture.sourceRule, /JON-58/, `${label} must anchor its rule to JON-58`);
  assert.ok(isPlainObject(fixture.initialState), `${label} needs an initial state object`);
  assert.ok(Array.isArray(fixture.schedule) && fixture.schedule.length > 0, `${label} needs a schedule`);
  assert.ok(isPlainObject(fixture.expected), `${label} needs an expected result`);
  assert.ok(
    fixture.expected.status === 'DEFINED' || fixture.expected.status === 'ADAPTER_PENDING',
    `${label} expected status must be explicit`,
  );
  assert.ok(
    Array.isArray(fixture.adapterObserves) && fixture.adapterObserves.length > 0,
    `${label} needs adapter observations`,
  );

  let previousStep = 0;
  for (const item of fixture.schedule) {
    assert.ok(Number.isSafeInteger(item.step) && item.step > 0, `${label} schedule steps must be positive integers`);
    assert.ok(item.step >= previousStep, `${label} schedule must be ordered`);
    assert.ok(item.mode === 'ordered' || item.mode === 'concurrent', `${label} has an invalid schedule mode`);
    assert.equal(typeof item.operation, 'string', `${label} schedule item needs an operation`);
    if (item.mode === 'concurrent') assert.equal(typeof item.group, 'string', `${label} concurrent item needs a group`);
    previousStep = item.step;
  }

  if (fixture.expected.snapshot) validateSnapshot(fixture, label);
  for (const vector of fixture.expected.thresholdVectors ?? []) {
    validateThreshold(vector, label);
    thresholdCount += 1;
  }
}

assert.equal(cases.length, 19, 'fixture count changed; review coverage and update this assertion intentionally');
assert.equal(thresholdCount, 13, 'threshold vector count changed; review exact arithmetic coverage intentionally');

console.log(`PASS ${manifest.fixturePack}@${manifest.version}`);
console.log(`Validated ${cases.length} fixtures and ${thresholdCount} exact-threshold vectors.`);
console.log(`Seed: ${manifest.seed}`);
console.log(`Fixture SHA-256: ${digest.digest('hex')}`);
console.log('Integration status: ADAPTER_PENDING / PRODUCTION_INTEGRATION_NOT_RUN');

function validateSnapshot(fixture, label) {
  const { B, U, D } = fixture.expected.snapshot;
  assert.ok(Array.isArray(B) && Array.isArray(U), `${label} snapshot B and U must be arrays`);
  assert.equal(new Set(B).size, B.length, `${label} B identities must be unique`);
  assert.equal(new Set(U).size, U.length, `${label} U identities must be unique`);
  assert.deepEqual(B, [...B].sort(), `${label} B must be canonically sorted`);
  assert.deepEqual(U, [...U].sort(), `${label} U must be canonically sorted`);
  assert.ok(B.every((identity) => !U.includes(identity)), `${label} B and U must be disjoint`);
  assert.equal(D, B.length + U.length, `${label} must satisfy D = |B| + |U|`);
  assert.ok([...B, ...U].every((identity) => identity.startsWith('synthetic-')), `${label} must use synthetic identities`);
  if (Array.isArray(fixture.initialState.openingRoll)) {
    const openingRoll = new Set(fixture.initialState.openingRoll);
    assert.ok([...B, ...U].every((identity) => openingRoll.has(identity)), `${label} B and U must come from the opening roll`);
  }
}

function validateThreshold(vector, label) {
  assert.equal(typeof vector.name, 'string', `${label} threshold vector needs a name`);
  assert.ok(Number.isSafeInteger(vector.yesVotes) && vector.yesVotes >= 0, `${label}:${vector.name} invalid YES count`);
  assert.ok(Number.isSafeInteger(vector.D) && vector.D >= 0, `${label}:${vector.name} invalid D`);
  assert.ok(vector.yesVotes <= vector.D, `${label}:${vector.name} YES cannot exceed D`);
  assert.equal(typeof vector.passes, 'boolean', `${label}:${vector.name} needs an expected result`);

  let actual;
  if (vector.D === 0) {
    actual = false;
  } else if (vector.kind === 'fraction') {
    assert.ok(Number.isSafeInteger(vector.numerator) && vector.numerator > 0, `${label}:${vector.name} invalid numerator`);
    assert.ok(Number.isSafeInteger(vector.denominator) && vector.denominator > 0, `${label}:${vector.name} invalid denominator`);
    actual = BigInt(vector.yesVotes) * BigInt(vector.denominator) >= BigInt(vector.D) * BigInt(vector.numerator);
  } else if (vector.kind === 'strict-majority') {
    actual = BigInt(vector.yesVotes) * 2n > BigInt(vector.D);
  } else if (vector.kind === 'unanimity') {
    actual = vector.yesVotes === vector.D;
  } else {
    assert.fail(`${label}:${vector.name} has an unknown threshold kind`);
  }
  assert.equal(actual, vector.passes, `${label}:${vector.name} exact result differs`);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
