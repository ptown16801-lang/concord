import { createHash } from 'node:crypto';

export const BOUNDED_ENVELOPE_SCHEMA_VERSION = '1.0.0';
export const CANONICALIZATION_VERSION = 'concord-json-c14n-v1';
export const BOUNDED_CONTEXT_POLICY_VERSION = 'JON-200/2026-09-25';

const DEPENDENCY_STATES = new Set(['satisfied', 'unresolved']);
const DISPOSITIONS = new Set([
  'informational',
  'adopted',
  'partially_adopted',
  'rejected',
  'blocked',
  'superseded',
]);
const SECRET_KEY = /(^|_)(secret|password|passwd|token|api[_-]?key|authorization|credential)(_|$)/i;
const SET_ARRAY_KEYS = new Set([
  'included_context',
  'material_dependencies',
  'considered_material_omissions',
  'prohibited_actions',
  'required_actions',
  'contributions',
  'permissions_tools',
  'adopted_recommendation_ids',
  'partially_adopted_recommendation_ids',
  'rejected_recommendation_ids',
  'unused_recommendation_ids',
]);

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, clone(child)]));
  }
  return value;
}

function deepFreeze(value) {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze);
  } else if (isPlainObject(value)) {
    Object.values(value).forEach(deepFreeze);
  }
  return Object.freeze(value);
}

function canonicalNode(value, key = '') {
  if (Array.isArray(value)) {
    const normalized = value.map((item) => canonicalNode(item));
    if (SET_ARRAY_KEYS.has(key)) {
      normalized.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
    }
    return normalized;
  }
  if (isPlainObject(value)) {
    const result = {};
    for (const childKey of Object.keys(value).sort()) {
      const child = value[childKey];
      if (child !== undefined) result[childKey] = canonicalNode(child, childKey);
    }
    return result;
  }
  return value;
}

export function canonicalSerialize(value) {
  return JSON.stringify(canonicalNode(value));
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function hasSecretBearingKey(value, path = '$') {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const hit = hasSecretBearingKey(value[i], `${path}[${i}]`);
      if (hit) return hit;
    }
    return null;
  }
  if (!isPlainObject(value)) return null;
  for (const [key, child] of Object.entries(value)) {
    if (SECRET_KEY.test(key) && !['credential_exclusion'].includes(key)) return `${path}.${key}`;
    const hit = hasSecretBearingKey(child, `${path}.${key}`);
    if (hit) return hit;
  }
  return null;
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateSourceArtifact(entry, index, errors) {
  if (!isPlainObject(entry)) {
    errors.push(`included_context[${index}] must be an object`);
    return;
  }
  if (!nonEmptyString(entry.artifact_id)) errors.push(`included_context[${index}].artifact_id is required`);
  if (!nonEmptyString(entry.content_hash)) errors.push(`included_context[${index}].content_hash is required`);
  if (!nonEmptyString(entry.path) && !nonEmptyString(entry.identifier)) {
    errors.push(`included_context[${index}] requires path or identifier`);
  }
}

function validateDependency(entry, index, errors) {
  if (!isPlainObject(entry)) {
    errors.push(`material_dependencies[${index}] must be an object`);
    return;
  }
  if (!nonEmptyString(entry.identifier)) errors.push(`material_dependencies[${index}].identifier is required`);
  if (!DEPENDENCY_STATES.has(entry.status)) {
    errors.push(`material_dependencies[${index}].status must be satisfied or unresolved`);
  }
  if (entry.status === 'unresolved') errors.push(`material dependency unresolved: ${entry.identifier || index}`);
}

function validateLineage(lineage, errors) {
  if (!isPlainObject(lineage)) {
    errors.push('lineage is required');
    return;
  }
  if (!nonEmptyString(lineage.triggering_issue)) errors.push('lineage.triggering_issue is required');
  if (!nonEmptyString(lineage.task_id)) errors.push('lineage.task_id is required');
  if (!Array.isArray(lineage.contributions)) errors.push('lineage.contributions must be an array');
  for (const [index, contribution] of (lineage.contributions ?? []).entries()) {
    if (!isPlainObject(contribution)) {
      errors.push(`lineage.contributions[${index}] must be an object`);
      continue;
    }
    for (const field of ['provider', 'model', 'session_or_agent_id', 'role']) {
      if (!nonEmptyString(contribution[field])) errors.push(`lineage.contributions[${index}].${field} is required`);
    }
    if (!Array.isArray(contribution.permissions_tools)) {
      errors.push(`lineage.contributions[${index}].permissions_tools must be an array`);
    }
  }
}

function validatePayload(payload) {
  const errors = [];
  if (!isPlainObject(payload)) return ['envelope payload must be an object'];
  if (!nonEmptyString(payload.envelope_id)) errors.push('envelope_id is required');
  if (payload.schema_version !== BOUNDED_ENVELOPE_SCHEMA_VERSION) errors.push('unsupported schema_version');
  if (payload.canonicalization_version !== CANONICALIZATION_VERSION) errors.push('unsupported canonicalization_version');
  if (!isPlainObject(payload.task_boundary) || !nonEmptyString(payload.task_boundary.deliverable)) {
    errors.push('task_boundary.deliverable is required');
  }
  if (!Array.isArray(payload.included_context) || payload.included_context.length === 0) {
    errors.push('included_context must contain source evidence');
  } else {
    payload.included_context.forEach((entry, index) => validateSourceArtifact(entry, index, errors));
  }
  if (!Array.isArray(payload.material_dependencies)) {
    errors.push('material_dependencies must be an array');
  } else {
    payload.material_dependencies.forEach((entry, index) => validateDependency(entry, index, errors));
  }
  if (!isPlainObject(payload.constraints) || !Array.isArray(payload.constraints.prohibited_actions)) {
    errors.push('constraints.prohibited_actions is required');
  }
  if (!isPlainObject(payload.requested_output) || Object.keys(payload.requested_output).length === 0) {
    errors.push('requested_output is required');
  }
  validateLineage(payload.lineage, errors);
  if (!isPlainObject(payload.provider) || !nonEmptyString(payload.provider.name) || !nonEmptyString(payload.provider.model)) {
    errors.push('provider.name and provider.model are required');
  }
  if (!isPlainObject(payload.initiator) || !nonEmptyString(payload.initiator.identity) || !nonEmptyString(payload.initiator.role)) {
    errors.push('initiator.identity and initiator.role are required');
  }
  if (!isPlainObject(payload.validator) || !nonEmptyString(payload.validator.policy_version)) {
    errors.push('validator.policy_version is required');
  }
  if (!nonEmptyString(payload.created_at) || Number.isNaN(Date.parse(payload.created_at))) {
    errors.push('created_at must be an ISO-compatible timestamp');
  }
  const handling = payload.data_handling;
  if (!isPlainObject(handling)) {
    errors.push('data_handling is required');
  } else {
    if (!nonEmptyString(handling.classification)) errors.push('data_handling.classification is required');
    if (!nonEmptyString(handling.sanitization_decision)) errors.push('data_handling.sanitization_decision is required');
    if (handling.credential_exclusion !== true) errors.push('data_handling.credential_exclusion must be true');
    if (handling.authoritative_state_exclusion !== true) errors.push('data_handling.authoritative_state_exclusion must be true');
    if (!isPlainObject(handling.retention) || !nonEmptyString(handling.retention.disposition)) {
      errors.push('data_handling.retention.disposition is required');
    }
  }
  if (payload.context_complete !== undefined) {
    errors.push('context_complete is derived and must not be supplied manually');
  }
  const secretPath = hasSecretBearingKey(payload);
  if (secretPath) errors.push(`secret-bearing envelope field is prohibited: ${secretPath}`);
  return errors;
}

export function validateMissingContextRequest(request) {
  const required = ['kind', 'identifier', 'why_material', 'needed_for', 'minimum_scope', 'expected_form'];
  const errors = [];
  if (!isPlainObject(request)) return { valid: false, errors: ['missing-context request must be an object'] };
  for (const field of required) {
    if (!nonEmptyString(request[field])) errors.push(`${field} is required`);
  }
  return { valid: errors.length === 0, errors };
}

export function sealEnvelope(input) {
  const payload = clone(input);
  const errors = validatePayload(payload);
  if (errors.length > 0) {
    const error = new Error(`bounded envelope construction failed: ${errors.join('; ')}`);
    error.code = 'BOUND_ENVELOPE_INVALID';
    error.validation = deepFreeze({
      valid: false,
      derived_context_complete: false,
      errors: [...errors],
      policy_version: payload?.validator?.policy_version ?? null,
      schema_version: payload?.schema_version ?? null,
      canonicalization_version: payload?.canonicalization_version ?? null,
    });
    throw error;
  }
  const canonical = canonicalSerialize(payload);
  const envelopeHash = sha256(canonical);
  const validation = deepFreeze({
    valid: true,
    derived_context_complete: true,
    errors: [],
    policy_version: payload.validator.policy_version,
    schema_version: payload.schema_version,
    canonicalization_version: payload.canonicalization_version,
    envelope_hash: envelopeHash,
  });
  return deepFreeze({ payload: deepFreeze(payload), canonical, envelope_hash: envelopeHash, validation });
}

export function assertInvocationReady(sealed) {
  if (!isPlainObject(sealed) || typeof sealed.canonical !== 'string' || !isPlainObject(sealed.payload)) {
    throw new TypeError('provider invocation requires a sealed envelope');
  }
  const canonical = canonicalSerialize(sealed.payload);
  const hash = sha256(canonical);
  if (canonical !== sealed.canonical || hash !== sealed.envelope_hash) {
    throw new Error('sealed envelope mutation/hash mismatch');
  }
  const freshErrors = validatePayload(sealed.payload);
  if (freshErrors.length > 0) throw new Error(`envelope validation failed: ${freshErrors.join('; ')}`);
  if (!sealed.validation?.valid || sealed.validation.envelope_hash !== hash || sealed.validation.policy_version !== sealed.payload.validator.policy_version) {
    throw new Error('validation result is not bound to the exact envelope hash/policy');
  }
  return deepFreeze({ canonical, envelope_hash: hash, payload: sealed.payload });
}

export function reviseEnvelope(sealed, revision) {
  assertInvocationReady(sealed);
  if (!isPlainObject(revision) || !nonEmptyString(revision.envelope_id) || !nonEmptyString(revision.created_at)) {
    throw new TypeError('revision requires new envelope_id and created_at');
  }
  const payload = clone(sealed.payload);
  payload.envelope_id = revision.envelope_id;
  payload.created_at = revision.created_at;
  payload.revision_of = sealed.envelope_hash;
  if (revision.provider) payload.provider = clone(revision.provider);
  if (Array.isArray(revision.additional_context)) {
    payload.included_context = [...payload.included_context, ...clone(revision.additional_context)];
  }
  if (Array.isArray(revision.dependency_updates)) {
    const updates = new Map(revision.dependency_updates.map((entry) => [entry.identifier, entry]));
    payload.material_dependencies = payload.material_dependencies.map((entry) =>
      updates.has(entry.identifier) ? { ...entry, ...clone(updates.get(entry.identifier)) } : entry,
    );
  }
  return sealEnvelope(payload);
}

export function createCandidateArtifactRecord({
  artifact_id,
  output_hash,
  producer,
  input_envelope_hash,
  triggering_issue,
  repo_state,
  contribution_lineage,
  disposition = 'informational',
  adoption = {},
}) {
  if (!nonEmptyString(artifact_id) || !nonEmptyString(output_hash) || !nonEmptyString(input_envelope_hash)) {
    throw new TypeError('candidate artifact requires artifact_id, output_hash, and input_envelope_hash');
  }
  if (!DISPOSITIONS.has(disposition)) throw new TypeError(`invalid candidate disposition: ${disposition}`);
  const record = {
    authority: 'candidate_only',
    artifact_id,
    output_hash,
    producer: clone(producer),
    input_envelope_hash,
    triggering_issue,
    repo_state: clone(repo_state),
    contribution_lineage: clone(contribution_lineage),
    disposition,
    adoption: clone(adoption),
  };
  return deepFreeze(record);
}
