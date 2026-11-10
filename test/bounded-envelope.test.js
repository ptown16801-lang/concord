import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BOUNDED_CONTEXT_POLICY_VERSION,
  BOUNDED_ENVELOPE_SCHEMA_VERSION,
  CANONICALIZATION_VERSION,
  assertInvocationReady,
  canonicalSerialize,
  createCandidateArtifactRecord,
  immutableJsonSnapshot,
  reviseEnvelope,
  sealEnvelope,
  sha256,
  validateMissingContextRequest,
} from '../src/ai/bounded-envelope.js';

function artifact(artifact_id, path, content, kind = 'source') {
  return { artifact_id, path, content, content_hash: `sha256:${sha256(content)}`, kind };
}

function base(overrides = {}) {
  return {
    envelope_id: 'env-001',
    schema_version: BOUNDED_ENVELOPE_SCHEMA_VERSION,
    canonicalization_version: CANONICALIZATION_VERSION,
    task_boundary: { deliverable: 'Find one deterministic normalization edge case.' },
    included_context: [
      artifact('src-1', 'examples/normalizer.js', 'export const normalize = x => x;'),
      artifact('test-1', 'examples/normalizer.test.js', 'assert.equal(normalize(1), 1);', 'test'),
    ],
    material_dependencies: [
      { identifier: 'persistent-normalizer-source', status: 'satisfied', why_material: 'defines bounded behavior', evidence_artifact_ids: ['src-1'] },
      { identifier: 'normalizer-test-contract', status: 'satisfied', why_material: 'defines bounded behavior', evidence_artifact_ids: ['test-1'] },
    ],
    constraints: { prohibited_actions: ['repository_write', 'full_repository_access', 'credential_access'] },
    requested_output: { kind: 'candidate_analysis', missing_context_protocol: 'structured-v1' },
    lineage: {
      triggering_issue: 'example-task',
      task_id: 'normalization-example',
      contributions: [{
        provider: 'synthetic-builder',
        model: 'fixture-model',
        session_or_agent_id: 'fixture-builder',
        role: 'Builder',
        permissions_tools: ['local:read'],
      }],
    },
    provider: { name: 'synthetic-provider', model: 'synthetic-test-model', version: 'fixture-v1' },
    initiator: { identity: 'fixture-caller', role: 'Tester' },
    validator: { policy_version: BOUNDED_CONTEXT_POLICY_VERSION },
    created_at: '2026-09-25T20:50:00.000Z',
    data_handling: {
      classification: 'public-synthetic-fixture',
      sanitization_decision: 'source/test slices only; no secrets or authoritative state',
      credential_exclusion: true,
      authoritative_state_exclusion: true,
      retention: { disposition: 'retain as a local test fixture' },
    },
    considered_material_omissions: [],
    ...overrides,
  };
}

test('valid complete bounded envelope passes with derived completeness', () => {
  const sealed = sealEnvelope(base());
  assert.equal(sealed.validation.valid, true);
  assert.equal(sealed.validation.derived_context_complete, true);
  assert.equal(assertInvocationReady(sealed).envelope_hash, sealed.envelope_hash);
});

test('required task, evidence, lineage, policy and security declarations fail closed at construction', () => {
  for (const invalid of [
    base({ task_boundary: {} }),
    base({ included_context: [] }),
    base({ lineage: undefined }),
    base({ validator: {} }),
    base({ data_handling: { classification: 'public', sanitization_decision: 'none' } }),
  ]) {
    assert.throws(() => sealEnvelope(invalid), /bounded envelope construction failed|plain JSON data/);
  }
});

test('unresolved dependency fails and bare completeness assertion is rejected at construction', () => {
  const unresolved = base({ material_dependencies: [{ identifier: 'x', status: 'unresolved' }] });
  assert.throws(() => sealEnvelope(unresolved), /unresolved/);
  assert.throws(() => sealEnvelope(base({ context_complete: true })), /derived/);
});

test('secret-bearing fields are rejected at construction', () => {
  assert.throws(() => sealEnvelope(base({ api_key: 'must-never-be-here' })), /secret-bearing/);
});

test('canonicalization and hash are stable across set-like ordering, semantic changes alter hash', () => {
  const left = sealEnvelope(base());
  const right = sealEnvelope(base({
    included_context: [...base().included_context].reverse(),
    constraints: { prohibited_actions: [...base().constraints.prohibited_actions].reverse() },
  }));
  assert.equal(left.canonical, right.canonical);
  assert.equal(left.envelope_hash, right.envelope_hash);
  assert.notEqual(left.envelope_hash, sealEnvelope(base({ task_boundary: { deliverable: 'Different exact task.' } })).envelope_hash);
});

test('validation result is bound to exact immutable sent envelope', () => {
  const sealed = sealEnvelope(base());
  assert.equal(Object.isFrozen(sealed), true);
  assert.equal(Object.isFrozen(sealed.payload), true);
  assert.throws(() => { sealed.payload.task_boundary.deliverable = 'mutate'; }, TypeError);
  const forged = { ...sealed, canonical: sealed.canonical.replace('edge case', 'other') };
  assert.throws(() => assertInvocationReady(forged), /mutation\/hash mismatch/);
});

test('structured missing-context contract enforces routable fields', () => {
  const valid = {
    kind: 'source', identifier: 'pointerKind', why_material: 'controls type normalization',
    needed_for: 'edge-case proof', minimum_scope: 'function body only', expected_form: 'JavaScript source',
  };
  assert.equal(validateMissingContextRequest(valid).valid, true);
  assert.equal(validateMissingContextRequest({ kind: 'source' }).valid, false);
});

test('bounded revision gets a new hash and fresh validation', () => {
  const original = sealEnvelope(base({ material_dependencies: [] }));
  const revised = reviseEnvelope(original, {
    envelope_id: 'env-002',
    created_at: '2026-09-25T21:00:00.000Z',
    additional_context: [artifact('iface-1', 'examples/interface.js', 'export const interfaceVersion = 1;', 'interface')],
  });
  assert.equal(revised.validation.valid, true);
  assert.notEqual(revised.envelope_hash, original.envelope_hash);
  assert.equal(revised.payload.revision_of, original.envelope_hash);
});

test('guarded local mock consumer accepts only validated envelope snapshots', () => {
  let calls = 0;
  const consume = (sealed) => { const snapshot = assertInvocationReady(sealed); calls += 1; return snapshot; };
  const original = sealEnvelope(base());
  assert.equal(consume(original).envelope_hash, original.envelope_hash);
  assert.equal(calls, 1);
  assert.throws(() => consume(base()), /sealed envelope/);
  assert.equal(calls, 1);
});

test('invalid dependencies cannot reach a guarded local mock consumer', () => {
  let calls = 0;
  const consume = (sealed) => { assertInvocationReady(sealed); calls += 1; };
  assert.throws(() => consume(sealEnvelope(base({ material_dependencies: [{ identifier: 'missing', status: 'unresolved' }] }))), /unresolved/);
  assert.equal(calls, 0);
});

test('missing-context protocol validation rejects incomplete local mock data', () => {
  assert.equal(validateMissingContextRequest({ identifier: 'x' }).valid, false);
  assert.equal(validateMissingContextRequest(false).valid, false);
  assert.equal(validateMissingContextRequest({ kind: 'source', identifier: 'x', why_material: 'needed', needed_for: 'proof', minimum_scope: 'function', expected_form: 'source' }).valid, true);
});

test('core is provider-neutral and candidate artifacts remain non-authoritative', () => {
  const alternative = sealEnvelope(base({ provider: { name: 'synthetic-alternative', model: 'test-model', version: 'test' } }));
  assert.equal(alternative.validation.valid, true);
  const record = createCandidateArtifactRecord({
    artifact_id: 'out-1', output_hash: sha256('candidate'), producer: { provider: 'synthetic-alternative', model: 'test-model', version: 'test', session_or_agent_id: 'fixture-reviewer' },
    input_envelope_hash: alternative.envelope_hash, triggering_issue: 'example-task',
    repo_state: { repository: 'synthetic', branch: 'candidate', commit: 'abc' }, contribution_lineage: base().lineage.contributions, disposition: 'informational',
  });
  assert.equal(record.authority, 'candidate_only');
});

test('canonical serializer is deterministic for ordinary objects', () => {
  assert.equal(canonicalSerialize({ b: 2, a: 1 }), canonicalSerialize({ a: 1, b: 2 }));
});

test('fabricated, missing, duplicate and hash-mismatched evidence fails closed', () => {
  const valid = base();
  for (const invalid of [
    base({ included_context: [{ artifact_id: 'src-1', path: 'missing.js', content_hash: 'false' }] }),
    base({ included_context: valid.included_context.map((entry) => ({ ...entry, content: 'changed bytes' })) }),
    base({ included_context: [...valid.included_context, valid.included_context[0]] }),
    base({ material_dependencies: [{ identifier: 'fake', status: 'satisfied', why_material: 'needed', evidence_artifact_ids: ['NONEXISTENT'] }] }),
    base({ material_dependencies: [{ identifier: 'fake', status: 'satisfied', why_material: 'needed', evidence_artifact_ids: [] }] }),
    base({ material_dependencies: [valid.material_dependencies[0], valid.material_dependencies[0]] }),
    base({ validator: { policy_version: 'unknown' } }),
    base({ lineage: { ...valid.lineage, contributions: [] } }),
    base({ lineage: { ...valid.lineage, contributions: {} } }),
    base({ constraints: { prohibited_actions: [] } }),
    base({ provider: { name: 'synthetic-provider', model: 'qualification-placeholder', version: 'bind-at-invocation' } }),
  ]) assert.throws(() => sealEnvelope(invalid));
});

test('guarded canonical bytes contain the supplied context and bound identity', () => {
  const payload = base();
  const snapshot = assertInvocationReady(sealEnvelope(payload));
  const supplied = JSON.parse(snapshot.canonical);
  for (const entry of supplied.included_context) assert.equal(entry.content_hash, `sha256:${sha256(entry.content)}`);
  assert.equal(supplied.included_context.find((entry) => entry.artifact_id === 'src-1').content, payload.included_context[0].content);
  assert.deepEqual(supplied.provider, payload.provider);
});

test('immutable JSON snapshots preserve candidate bytes and their hash', () => {
  const response = { finding: { text: 'original' }, recommendations: ['one'] };
  const candidate = immutableJsonSnapshot(response);
  const hash = sha256(canonicalSerialize(candidate));
  response.finding.text = 'changed'; response.recommendations.push('two');
  assert.equal(candidate.finding.text, 'original');
  assert.deepEqual(candidate.recommendations, ['one']);
  assert.throws(() => { candidate.finding.text = 'changed'; }, TypeError);
  assert.equal(hash, sha256(canonicalSerialize(candidate)));
});

test('set ordering uses a locale-independent total order and preserves prototype-shaped keys', () => {
  assert.equal(sealEnvelope(base({ constraints: { prohibited_actions: ['é', 'é'] } })).canonical,
    sealEnvelope(base({ constraints: { prohibited_actions: ['é', 'é'] } })).canonical);
  const value = JSON.parse('{"__proto__":{"x":1},"a":2}');
  assert.deepEqual(JSON.parse(canonicalSerialize(value)), value);
});

test('executable or lossy non-JSON input is rejected without running getters', () => {
  let reads = 0;
  const accessor = { get content() { reads += 1; return 'surprise'; } };
  for (const value of [accessor, { x: undefined }, { x: NaN }, { x: Infinity }, { x: () => 1 }, new Date(), [, 1]]) {
    assert.throws(() => canonicalSerialize(value));
    assert.throws(() => sealEnvelope({ ...base(), extra: value }));
  }
  assert.equal(reads, 0);
});

test('revision adds named evidence dependency and receives a distinct binding', () => {
  const original = sealEnvelope(base());
  const revised = reviseEnvelope(original, {
    envelope_id: 'env-002', created_at: '2026-09-30T00:00:00.000Z',
    additional_context: [artifact('iface-1', 'interface.js', 'export const v = 1;')],
    dependency_updates: [{ identifier: 'new-interface', status: 'satisfied', why_material: 'required by model', evidence_artifact_ids: ['iface-1'] }],
  });
  assert.equal(revised.payload.material_dependencies.length, 3);
  assert.notEqual(revised.envelope_hash, original.envelope_hash);
  assert.equal(revised.payload.revision_of, original.envelope_hash);
  assert.equal(assertInvocationReady(revised).envelope_hash, revised.envelope_hash);
  assert.throws(() => assertInvocationReady({ ...revised, validation: original.validation }), /validation result/);
  assert.throws(() => reviseEnvelope(original, { envelope_id: 'env-001', created_at: '2026-09-30T00:00:00.000Z' }), /new envelope_id/);
});

test('candidate artifact provenance cannot omit author or repository lineage', () => {
  const record = {
    artifact_id: 'candidate-1', output_hash: sha256('output'), input_envelope_hash: sealEnvelope(base()).envelope_hash,
    producer: { provider: 'synthetic-provider', model: 'test', version: 'v1', session_or_agent_id: 'fixture-session' },
    triggering_issue: 'example-task', repo_state: { repository: 'synthetic', commit: 'test-revision' },
    contribution_lineage: base().lineage.contributions,
  };
  for (const field of ['producer', 'triggering_issue', 'repo_state', 'contribution_lineage']) {
    const invalid = { ...record };
    delete invalid[field];
    assert.throws(() => createCandidateArtifactRecord(invalid));
  }
  assert.equal(createCandidateArtifactRecord(record).authority, 'candidate_only');
});

test('Git blob evidence validates UTF-8 byte length and rejects changed source', () => {
  const payload = base();
  // Independently obtained with: printf 'café\n' | git hash-object --stdin
  payload.included_context[0].content = 'café\n';
  payload.included_context[0].content_hash = 'git-blob:572eb43fe8e34fb87d01c69e01151ff696022924';
  assert.equal(sealEnvelope(payload).validation.valid, true);
  payload.included_context[0].content += 'x';
  assert.throws(() => sealEnvelope(payload), /content_hash/);
});

test('validated snapshot cannot be swapped through later caller mutation', () => {
  const original = sealEnvelope(base());
  const callerCopy = JSON.parse(JSON.stringify(original));
  const snapshot = assertInvocationReady(callerCopy);
  callerCopy.payload.included_context[0].content = 'injected content';
  assert.ok(Object.isFrozen(snapshot));
  assert.equal(snapshot.canonical, original.canonical);
  assert.equal(snapshot.payload.included_context[0].content, original.payload.included_context[0].content);
  assert.throws(() => assertInvocationReady(callerCopy), /mutation\/hash mismatch/);
});

test('guard rejects incomplete, absent, malformed or mismatched validation records', () => {
  for (const update of [
    { valid: 'false' }, { valid: false }, { derived_context_complete: false }, { derived_context_complete: null },
    { schema_version: 'unknown' }, { canonicalization_version: 'unknown' }, { policy_version: 'unknown' },
    { errors: ['unresolved'] }, { errors: {} },
  ]) {
    const sealed = JSON.parse(JSON.stringify(sealEnvelope(base())));
    Object.assign(sealed.validation, update);
    assert.throws(() => assertInvocationReady(sealed), /validation result/);
  }
  for (const field of ['valid', 'derived_context_complete', 'errors', 'schema_version', 'canonicalization_version', 'policy_version', 'envelope_hash']) {
    const sealed = JSON.parse(JSON.stringify(sealEnvelope(base())));
    delete sealed.validation[field];
    assert.throws(() => assertInvocationReady(sealed), /validation result/);
  }
});

test('generic candidate and non-schema arrays retain order in their hashes', () => {
  const values = [{ steps: { required_actions: ['first', 'second'] } }, { steps: { required_actions: ['second', 'first'] } }];
  assert.notEqual(sha256(canonicalSerialize(immutableJsonSnapshot(values[0]))), sha256(canonicalSerialize(immutableJsonSnapshot(values[1]))));
  assert.notEqual(sealEnvelope(base({ metadata: values[0] })).envelope_hash, sealEnvelope(base({ metadata: values[1] })).envelope_hash);
  assert.notEqual(sealEnvelope(base({ 'constraints.required_actions': ['first', 'second'] })).envelope_hash,
    sealEnvelope(base({ 'constraints.required_actions': ['second', 'first'] })).envelope_hash);
});

test('malformed revisions cannot silently discard declared missing context', () => {
  const original = sealEnvelope(base());
  const revision = { envelope_id: 'env-002', created_at: '2026-09-30T00:00:00.000Z' };
  for (const invalid of [
    { additional_context: { artifact_id: 'needed' } },
    { dependency_updates: { identifier: 'needed', status: 'unresolved' } },
    { additional_context: null }, { dependency_updates: 'unresolved' }, { provider: null },
    { dependencies: [{ identifier: 'needed', status: 'unresolved' }] },
    { dependency_updates: [{ identifier: 'needed', status: 'unresolved', why_material: 'needed', evidence_artifact_ids: ['src-1'] }] },
  ]) assert.throws(() => reviseEnvelope(original, { ...revision, ...invalid }));
});

test('omission records are optional but must identify and justify omitted context', () => {
  const absent = base();
  delete absent.considered_material_omissions;
  assert.equal(sealEnvelope(absent).validation.valid, true);
  assert.equal(sealEnvelope(base()).validation.valid, true);
  const omission = { identifier: 'storage-internals', rationale: 'Task covers normalization before storage.' };
  assert.equal(sealEnvelope(base({ considered_material_omissions: [omission] })).validation.valid, true);
  for (const value of [null, {}, 'omitted', [null], ['source'], [{}],
    [{ identifier: 'missing-interface' }], [{ identifier: '', rationale: 'out of scope' }],
    [{ identifier: 'missing-interface', rationale: ' ' }], [omission, omission],
  ]) assert.throws(() => sealEnvelope(base({ considered_material_omissions: value })), /omission/);
});

test('guard revalidates omission rationale even with matching hash and flags', () => {
  const sealed = sealEnvelope(base({ considered_material_omissions: [
    { identifier: 'storage-internals', rationale: 'Task covers normalization before storage.' },
  ] }));
  const payload = JSON.parse(sealed.canonical);
  delete payload.considered_material_omissions[0].rationale;
  const canonical = canonicalSerialize(payload);
  const envelope_hash = sha256(canonical);
  const forged = { payload, canonical, envelope_hash, validation: { ...sealed.validation, envelope_hash } };
  assert.throws(() => assertInvocationReady(forged), /omission/);
});
