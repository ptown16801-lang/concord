import { createHash } from 'node:crypto';

export const BOUNDED_ENVELOPE_SCHEMA_VERSION = '2.0.0';
export const CANONICALIZATION_VERSION = 'concord-json-c14n-v2';
export const BOUNDED_CONTEXT_POLICY_VERSION = 'JON-200/2026-09-30';

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
const ENVELOPE_SET_PATHS = new Set([
  'included_context',
  'material_dependencies',
  'considered_material_omissions',
  'constraints.prohibited_actions',
  'constraints.required_actions',
  'lineage.contributions',
  'lineage.contributions.*.permissions_tools',
  'material_dependencies.*.evidence_artifact_ids',
].map((path) => JSON.stringify(path.split('.'))));

function isPlainObject(value) {
  return value !== null && typeof value === 'object'
    && [Object.prototype, null].includes(Object.getPrototypeOf(value));
}

// Accept data, not executable getters/toJSON hooks or values JSON silently drops.
function clone(value, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (!Array.isArray(value) && !isPlainObject(value)) throw new TypeError('expected plain JSON data');
  if (ancestors.has(value)) throw new TypeError('cyclic JSON data');
  ancestors.add(value);
  const entries = [];
  for (const key of Reflect.ownKeys(value)) {
    if (Array.isArray(value) && key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) {
      throw new TypeError('JSON data must have enumerable data properties only');
    }
    if (Array.isArray(value) && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.length)) {
      throw new TypeError('JSON arrays cannot have extra properties');
    }
    entries.push([key, clone(descriptor.value, ancestors)]);
  }
  ancestors.delete(value);
  if (Array.isArray(value)) {
    if (entries.length !== value.length) throw new TypeError('sparse JSON arrays are prohibited');
    return entries.map(([, child]) => child);
  }
  return Object.fromEntries(entries);
}

function deepFreeze(value) {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze);
  } else if (isPlainObject(value)) {
    Object.values(value).forEach(deepFreeze);
  }
  return Object.freeze(value);
}

function canonicalNode(value, path = [], envelope = false) {
  if (Array.isArray(value)) {
    const normalized = value.map((item) => canonicalNode(item, [...path, '*'], envelope));
    if (envelope && ENVELOPE_SET_PATHS.has(JSON.stringify(path))) {
      normalized.sort((left, right) => {
        const a = JSON.stringify(left);
        const b = JSON.stringify(right);
        return a < b ? -1 : a > b ? 1 : 0;
      });
    }
    return normalized;
  }
  if (isPlainObject(value)) {
    const result = Object.create(null);
    for (const childKey of Object.keys(value).sort()) {
      const child = value[childKey];
      result[childKey] = canonicalNode(child, [...path, childKey], envelope);
    }
    return result;
  }
  return value;
}

export function canonicalSerialize(value) {
  return JSON.stringify(canonicalNode(clone(value)));
}

function serializeEnvelope(value) {
  return JSON.stringify(canonicalNode(clone(value), [], true));
}

export function immutableJsonSnapshot(value) {
  return deepFreeze(clone(value));
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
  if (typeof entry.content !== 'string') {
    errors.push(`included_context[${index}].content must contain the supplied UTF-8 text`);
  } else {
    const bytes = Buffer.from(entry.content, 'utf8');
    const sha = `sha256:${sha256(bytes)}`;
    const blob = `git-blob:${createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')}`;
    if (entry.content_hash !== sha && entry.content_hash !== blob) {
      errors.push(`included_context[${index}].content_hash does not match supplied content`);
    }
  }
  if (!nonEmptyString(entry.path) && !nonEmptyString(entry.identifier)) {
    errors.push(`included_context[${index}] requires path or identifier`);
  }
}

function validateDependency(entry, index, errors, artifactIds) {
  if (!isPlainObject(entry)) {
    errors.push(`material_dependencies[${index}] must be an object`);
    return;
  }
  if (!nonEmptyString(entry.identifier)) errors.push(`material_dependencies[${index}].identifier is required`);
  if (!DEPENDENCY_STATES.has(entry.status)) {
    errors.push(`material_dependencies[${index}].status must be satisfied or unresolved`);
  }
  if (entry.status === 'unresolved') errors.push(`material dependency unresolved: ${entry.identifier || index}`);
  if (!nonEmptyString(entry.why_material)) errors.push(`material_dependencies[${index}].why_material is required`);
  if (!Array.isArray(entry.evidence_artifact_ids) || entry.evidence_artifact_ids.length === 0
      || entry.evidence_artifact_ids.some((id) => !artifactIds.has(id))) {
    errors.push(`material_dependencies[${index}] must reference supplied evidence artifacts`);
  }
}

function validateLineage(lineage, errors) {
  if (!isPlainObject(lineage)) {
    errors.push('lineage is required');
    return;
  }
  if (!nonEmptyString(lineage.triggering_issue)) errors.push('lineage.triggering_issue is required');
  if (!nonEmptyString(lineage.task_id)) errors.push('lineage.task_id is required');
  if (!Array.isArray(lineage.contributions) || lineage.contributions.length === 0) {
    errors.push('lineage.contributions must be a nonempty array');
    return;
  }
  for (const [index, contribution] of lineage.contributions.entries()) {
    if (!isPlainObject(contribution)) {
      errors.push(`lineage.contributions[${index}] must be an object`);
      continue;
    }
    for (const field of ['provider', 'model', 'session_or_agent_id', 'role']) {
      if (!nonEmptyString(contribution[field])) errors.push(`lineage.contributions[${index}].${field} is required`);
    }
    if (!Array.isArray(contribution.permissions_tools) || contribution.permissions_tools.some((tool) => !nonEmptyString(tool))) {
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
  const artifacts = Array.isArray(payload.included_context) ? payload.included_context : [];
  const artifactIds = new Set(artifacts.map((entry) => entry?.artifact_id));
  if (artifactIds.size !== artifacts.length) errors.push('included_context artifact IDs must be unique');
  if (!Array.isArray(payload.material_dependencies)) {
    errors.push('material_dependencies must be an array');
  } else {
    payload.material_dependencies.forEach((entry, index) => validateDependency(entry, index, errors, artifactIds));
    if (new Set(payload.material_dependencies.map((entry) => entry?.identifier)).size !== payload.material_dependencies.length) {
      errors.push('material dependency identifiers must be unique');
    }
  }
  if (Object.hasOwn(payload, 'considered_material_omissions')) {
    const omissions = payload.considered_material_omissions;
    if (!Array.isArray(omissions)) {
      errors.push('considered_material_omissions must be an array when supplied');
    } else {
      for (const [index, omission] of omissions.entries()) {
        if (!isPlainObject(omission) || !nonEmptyString(omission.identifier) || !nonEmptyString(omission.rationale)) {
          errors.push(`considered_material_omissions[${index}] requires identifier and rationale`);
        }
      }
      if (new Set(omissions.map((entry) => entry?.identifier)).size !== omissions.length) {
        errors.push('considered_material_omissions identifiers must be unique');
      }
    }
  }
  if (!isPlainObject(payload.constraints) || !Array.isArray(payload.constraints.prohibited_actions)
      || payload.constraints.prohibited_actions.length === 0
      || payload.constraints.prohibited_actions.some((action) => !nonEmptyString(action))) {
    errors.push('constraints.prohibited_actions is required');
  }
  if (!isPlainObject(payload.requested_output) || Object.keys(payload.requested_output).length === 0) {
    errors.push('requested_output is required');
  }
  validateLineage(payload.lineage, errors);
  if (!isPlainObject(payload.provider) || ['name', 'model', 'version'].some((field) => !nonEmptyString(payload.provider[field])
      || /placeholder|unbound|bind-at-invocation|^unknown$/i.test(payload.provider[field]))) {
    errors.push('provider.name, model and version must be explicitly bound');
  }
  if (!isPlainObject(payload.initiator) || !nonEmptyString(payload.initiator.identity) || !nonEmptyString(payload.initiator.role)) {
    errors.push('initiator.identity and initiator.role are required');
  }
  if (!isPlainObject(payload.validator) || payload.validator.policy_version !== BOUNDED_CONTEXT_POLICY_VERSION) {
    errors.push('unsupported validator.policy_version');
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
  const canonical = serializeEnvelope(payload);
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
  sealed = immutableJsonSnapshot(sealed);
  if (!isPlainObject(sealed) || typeof sealed.canonical !== 'string' || !isPlainObject(sealed.payload)) {
    throw new TypeError('provider invocation requires a sealed envelope');
  }
  const canonical = serializeEnvelope(sealed.payload);
  const hash = sha256(canonical);
  if (canonical !== sealed.canonical || hash !== sealed.envelope_hash) {
    throw new Error('sealed envelope mutation/hash mismatch');
  }
  const freshErrors = validatePayload(sealed.payload);
  if (freshErrors.length > 0) throw new Error(`envelope validation failed: ${freshErrors.join('; ')}`);
  const validation = sealed.validation;
  if (!isPlainObject(validation) || validation.valid !== true || validation.derived_context_complete !== true
      || !Array.isArray(validation.errors) || validation.errors.length !== 0
      || validation.envelope_hash !== hash || validation.policy_version !== sealed.payload.validator.policy_version
      || validation.schema_version !== sealed.payload.schema_version
      || validation.canonicalization_version !== sealed.payload.canonicalization_version) {
    throw new Error('validation result is not bound to the exact envelope hash/policy');
  }
  return deepFreeze({ canonical, envelope_hash: hash, payload: sealed.payload });
}

export function reviseEnvelope(sealed, revision) {
  const original = assertInvocationReady(sealed);
  revision = clone(revision);
  if (!isPlainObject(revision) || !nonEmptyString(revision.envelope_id) || !nonEmptyString(revision.created_at)) {
    throw new TypeError('revision requires new envelope_id and created_at');
  }
  const revisionFields = new Set(['envelope_id', 'created_at', 'provider', 'additional_context', 'dependency_updates']);
  if (Object.keys(revision).some((field) => !revisionFields.has(field))) throw new TypeError('unknown revision field');
  for (const field of ['additional_context', 'dependency_updates']) {
    if (Object.hasOwn(revision, field) && !Array.isArray(revision[field])) throw new TypeError(`${field} must be an array`);
  }
  if (revision.envelope_id === original.payload.envelope_id) throw new TypeError('revision requires a new envelope_id');
  const payload = clone(original.payload);
  payload.envelope_id = revision.envelope_id;
  payload.created_at = revision.created_at;
  payload.revision_of = original.envelope_hash;
  if (Object.hasOwn(revision, 'provider')) payload.provider = clone(revision.provider);
  if (Array.isArray(revision.additional_context)) {
    payload.included_context = [...payload.included_context, ...clone(revision.additional_context)];
  }
  if (Array.isArray(revision.dependency_updates)) {
    if (new Set(revision.dependency_updates.map((entry) => entry.identifier)).size !== revision.dependency_updates.length) {
      throw new TypeError('duplicate dependency updates');
    }
    const updates = new Map(revision.dependency_updates.map((entry) => [entry.identifier, entry]));
    payload.material_dependencies = payload.material_dependencies.map((entry) =>
      updates.has(entry.identifier) ? { ...entry, ...clone(updates.get(entry.identifier)) } : entry,
    );
    const existing = new Set(payload.material_dependencies.map((entry) => entry.identifier));
    payload.material_dependencies.push(...revision.dependency_updates.filter((entry) => !existing.has(entry.identifier)));
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
  const lineageErrors = [];
  validateLineage({ triggering_issue, task_id: artifact_id, contributions: contribution_lineage }, lineageErrors);
  if (!isPlainObject(producer) || ['provider', 'model', 'version', 'session_or_agent_id'].some((field) => !nonEmptyString(producer[field]))) {
    lineageErrors.push('producer provider/model/version/session_or_agent_id are required');
  }
  if (!isPlainObject(repo_state) || !nonEmptyString(repo_state.repository) || !nonEmptyString(repo_state.commit)) {
    lineageErrors.push('repo_state.repository and commit are required');
  }
  if (!/^(sha256:)?[a-f0-9]{64}$/.test(output_hash) || !/^[a-f0-9]{64}$/.test(input_envelope_hash)) {
    lineageErrors.push('candidate hashes must be SHA-256 digests');
  }
  if (lineageErrors.length > 0) throw new TypeError(`candidate provenance invalid: ${lineageErrors.join('; ')}`);
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
