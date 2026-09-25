import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BOUNDED_CONTEXT_POLICY_VERSION,
  BOUNDED_ENVELOPE_SCHEMA_VERSION,
  CANONICALIZATION_VERSION,
  assertInvocationReady,
  canonicalSerialize,
  createCandidateArtifactRecord,
  reviseEnvelope,
  sealEnvelope,
  validateMissingContextRequest,
} from '../src/ai/bounded-envelope.js';
import { createDeepSeekAdapter, DEEPSEEK_PROVIDER_STATES } from '../src/ai/deepseek-adapter.js';

function base(overrides = {}) {
  return {
    envelope_id: 'env-001',
    schema_version: BOUNDED_ENVELOPE_SCHEMA_VERSION,
    canonicalization_version: CANONICALIZATION_VERSION,
    task_boundary: { deliverable: 'Find one deterministic normalization edge case.' },
    included_context: [
      { artifact_id: 'src-1', path: 'src/finger/persistent-store.js', content_hash: 'sha256:aaa', kind: 'source' },
      { artifact_id: 'test-1', path: 'test/persistent-store-normalization.test.js', content_hash: 'sha256:bbb', kind: 'test' },
    ],
    material_dependencies: [
      { identifier: 'persistent-normalizer-source', status: 'satisfied', evidence_artifact_ids: ['src-1'] },
      { identifier: 'normalizer-test-contract', status: 'satisfied', evidence_artifact_ids: ['test-1'] },
    ],
    constraints: { prohibited_actions: ['repository_write', 'full_repository_access', 'credential_access'] },
    requested_output: { kind: 'candidate_analysis', missing_context_protocol: 'structured-v1' },
    lineage: {
      triggering_issue: 'JON-200',
      task_id: 'finger-normalization-qualification',
      contributions: [{
        provider: 'openai',
        model: 'gpt-5.6-sol',
        session_or_agent_id: 'builder-session',
        role: 'Builder',
        permissions_tools: ['github:write', 'linear:write'],
      }],
    },
    provider: { name: 'deepseek', model: 'qualification-placeholder', version: 'unbound' },
    initiator: { identity: 'chatgpt-orchestrator', role: 'Orchestrator' },
    validator: { policy_version: BOUNDED_CONTEXT_POLICY_VERSION },
    created_at: '2026-09-25T20:50:00.000Z',
    data_handling: {
      classification: 'public-source-bounded-pilot',
      sanitization_decision: 'source/test slices only; no secrets or authoritative state',
      credential_exclusion: true,
      authoritative_state_exclusion: true,
      retention: { disposition: 'retain with qualification evidence' },
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
    assert.throws(() => sealEnvelope(invalid), /bounded envelope construction failed/);
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
    additional_context: [{ artifact_id: 'iface-1', path: 'src/finger/store.js', content_hash: 'sha256:ccc', kind: 'interface' }],
  });
  assert.equal(revised.validation.valid, true);
  assert.notEqual(revised.envelope_hash, original.envelope_hash);
  assert.equal(revised.payload.revision_of, original.envelope_hash);
});

test('DeepSeek adapter has one guarded envelope-only invocation path', async () => {
  let calls = 0;
  const adapter = createDeepSeekAdapter({ client: async (request) => {
    calls += 1;
    assert.equal(typeof request.envelope, 'string');
    return { finding: 'candidate' };
  }});
  const result = await adapter.invoke(sealEnvelope(base()));
  assert.equal(result.authority, 'candidate_only');
  assert.equal(calls, 1);
  await assert.rejects(() => adapter.invoke(base()), /sealed envelope/);
});

test('retry revalidates same sealed envelope and no fallback/raw overload exists', async () => {
  let calls = 0;
  const adapter = createDeepSeekAdapter({ client: async () => {
    calls += 1;
    if (calls === 1) throw new Error('temporary');
    return { finding: 'candidate' };
  }});
  await adapter.invoke(sealEnvelope(base()), { maxAttempts: 2 });
  assert.equal(calls, 2);
  assert.deepEqual(Object.keys(adapter), ['invoke']);
});

test('invalid envelope cannot be constructed or reach provider; optional unavailable provider is non-blocking', async () => {
  let calls = 0;
  const client = async () => { calls += 1; return {}; };
  const adapter = createDeepSeekAdapter({ client });
  assert.throws(
    () => sealEnvelope(base({ material_dependencies: [{ identifier: 'missing', status: 'unresolved' }] })),
    /unresolved/,
  );
  assert.equal(calls, 0);
  const unavailable = createDeepSeekAdapter({ client, availability: DEEPSEEK_PROVIDER_STATES.UNAVAILABLE });
  const state = await unavailable.invoke(sealEnvelope(base()));
  assert.equal(state.status, 'unavailable');
  assert.equal(calls, 0);
});

test('DeepSeek missing-context response must be structured', async () => {
  const bad = createDeepSeekAdapter({ client: async () => ({ missing_context_request: { identifier: 'x' } }) });
  await assert.rejects(() => bad.invoke(sealEnvelope(base())), /invalid missing-context request/);
  const good = createDeepSeekAdapter({ client: async () => ({ missing_context_request: {
    kind: 'source', identifier: 'x', why_material: 'needed', needed_for: 'proof', minimum_scope: 'function', expected_form: 'source',
  } }) });
  assert.equal((await good.invoke(sealEnvelope(base()))).status, 'candidate');
});

test('core is provider-neutral and candidate artifacts remain non-authoritative', () => {
  const gemini = sealEnvelope(base({ provider: { name: 'gemini', model: 'test-model', version: 'test' } }));
  assert.equal(gemini.validation.valid, true);
  const record = createCandidateArtifactRecord({
    artifact_id: 'out-1', output_hash: 'sha256:ddd', producer: { provider: 'gemini', model: 'test-model' },
    input_envelope_hash: gemini.envelope_hash, triggering_issue: 'JON-178',
    repo_state: { branch: 'candidate', commit: 'abc' }, contribution_lineage: [], disposition: 'informational',
  });
  assert.equal(record.authority, 'candidate_only');
});

test('canonical serializer is deterministic for ordinary objects', () => {
  assert.equal(canonicalSerialize({ b: 2, a: 1 }), canonicalSerialize({ a: 1, b: 2 }));
});
