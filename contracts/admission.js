import { createHash } from 'node:crypto';

export const VERSION = 'concord.admission/v1';
export const CANONICAL_VERSION = 'concord.json/v1';
export const AGT_VERSION = '5.0.0';

export function requireThat(condition) {
  if (!condition) throw new Error('Invalid contract');
}

// A deliberately narrow JSON profile, not a claim of RFC 8785 compliance.
export function canonical(value, depth = 0) {
  requireThat(depth <= 32);
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number') {
    requireThat(Number.isSafeInteger(value) && !Object.is(value, -0));
    return String(value);
  }
  requireThat(value !== null && typeof value === 'object');
  if (Array.isArray(value)) {
    requireThat(Reflect.ownKeys(value).length === value.length + 1);
    return '[' + Array.from({ length: value.length }, (_, index) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
      requireThat(descriptor && Object.hasOwn(descriptor, 'value') && descriptor.enumerable);
      return canonical(descriptor.value, depth + 1);
    }).join(',') + ']';
  }
  requireThat(Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
  requireThat(Reflect.ownKeys(value).length === Object.keys(value).length);
  return '{' + Object.keys(value).sort().map((key) => {
    requireThat(!['__proto__', 'constructor', 'prototype'].includes(key));
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    requireThat(Object.hasOwn(descriptor, 'value'));
    return JSON.stringify(key) + ':' + canonical(descriptor.value, depth + 1);
  }).join(',') + '}';
}

export function digest(value) {
  return createHash('sha256').update(canonical(value)).digest('hex');
}

export function textDigest(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function shape(value, fields) {
  requireThat(value && !Array.isArray(value) && typeof value === 'object');
  const expected = fields.split(' ');
  requireThat(Object.keys(value).length === expected.length && expected.every((field) => Object.hasOwn(value, field)));
}

export function names(value) {
  requireThat(typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9:._/-]{0,199}$/.test(value));
}

export function versions(value) {
  requireThat(value && !Array.isArray(value) && typeof value === 'object' && Object.keys(value).length > 0);
  for (const [key, version] of Object.entries(value)) {
    names(key);
    requireThat(Number.isSafeInteger(version) && version >= 0);
  }
}

export function requestSchema(request) {
  shape(request, 'schema canonicalVersion operationId domain audience action resource purpose arguments argumentDigest expectedVersions');
  requireThat(request.schema === VERSION && request.canonicalVersion === CANONICAL_VERSION);
  for (const key of ['operationId', 'domain', 'audience', 'action', 'resource', 'purpose']) names(request[key]);
  requireThat(request.arguments && !Array.isArray(request.arguments) && typeof request.arguments === 'object');
  requireThat(request.argumentDigest === digest(request.arguments));
  versions(request.expectedVersions);
}

export function manifestSchema(manifest) {
  shape(manifest, 'schema domain audience generation compatibilityId issuer keyId notBefore expiresAt policyDigest participants');
  requireThat(manifest.schema === VERSION);
  for (const key of ['domain', 'audience', 'compatibilityId', 'issuer', 'keyId']) names(manifest[key]);
  requireThat(Number.isSafeInteger(manifest.generation) && manifest.generation > 0);
  requireThat(Number.isSafeInteger(manifest.notBefore) && Number.isSafeInteger(manifest.expiresAt) && manifest.notBefore < manifest.expiresAt);
  requireThat(/^[a-f0-9]{64}$/.test(manifest.policyDigest));
  shape(manifest.participants, 'gateway mediator authorization');
  for (const participant of Object.values(manifest.participants)) {
    shape(participant, 'serviceId agtVersion generation schema');
    names(participant.serviceId);
    requireThat(participant.agtVersion === AGT_VERSION && participant.generation === manifest.generation && participant.schema === VERSION);
  }
}

export function contextSchema(context, request, manifest, now) {
  shape(context, 'schema actorId serviceId credentialId channelId requestDigest domain audience authenticatedAt expiresAt participants authority');
  requireThat(context.schema === VERSION);
  for (const key of ['actorId', 'serviceId', 'credentialId', 'channelId']) names(context[key]);
  requireThat(context.domain === request.domain && context.audience === request.audience && context.requestDigest === digest(request));
  requireThat(Number.isSafeInteger(context.authenticatedAt) && context.authenticatedAt <= now && Number.isSafeInteger(context.expiresAt) && now < context.expiresAt);
  requireThat(canonical(context.participants) === canonical(manifest.participants));
  requireThat(context.serviceId === manifest.participants.mediator.serviceId);
  const authority = context.authority;
  shape(authority, 'snapshotId actorId domain action resource purpose argumentDigest expectedVersions notBefore expiresAt permitted');
  names(authority.snapshotId);
  requireThat(authority.actorId === context.actorId && authority.permitted === true);
  for (const key of ['domain', 'action', 'resource', 'purpose', 'argumentDigest']) requireThat(authority[key] === request[key]);
  versions(authority.expectedVersions);
  requireThat(canonical(authority.expectedVersions) === canonical(request.expectedVersions));
  requireThat(Number.isSafeInteger(authority.notBefore) && authority.notBefore <= now && Number.isSafeInteger(authority.expiresAt) && now < authority.expiresAt);
}
