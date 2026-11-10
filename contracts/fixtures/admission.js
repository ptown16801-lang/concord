// Synthetic conformance data only; this is not a credential verifier.
import { VERSION, CANONICAL_VERSION, AGT_VERSION, digest } from '../admission.js';

export const FIXTURE_TIME = 1_800_000_000_000;
export function requestFixture() {
  const args = { selector: 'one' };
  return {
    schema: VERSION, canonicalVersion: CANONICAL_VERSION, operationId: 'operation-1',
    domain: 'synthetic', audience: 'synthetic-reader', action: 'sample.read',
    resource: 'sample/one', purpose: 'test', arguments: args,
    argumentDigest: digest(args), expectedVersions: { sample: 1 },
  };
}

export function participantsFixture(generation = 1) {
  return Object.fromEntries(['gateway', 'mediator', 'authorization'].map((role) => [role, {
    serviceId: `synthetic-${role}`, agtVersion: AGT_VERSION, generation, schema: VERSION,
  }]));
}

export function contextFixture(request, generation = 1) {
  return {
    schema: VERSION, actorId: 'registry-actor-1', serviceId: 'synthetic-mediator',
    credentialId: 'credential-1', channelId: 'channel-1', requestDigest: digest(request),
    domain: request.domain, audience: request.audience,
    authenticatedAt: FIXTURE_TIME - 1000, expiresAt: FIXTURE_TIME + 60_000,
    participants: participantsFixture(generation),
    authority: {
      snapshotId: 'snapshot-1', actorId: 'registry-actor-1', domain: request.domain,
      action: request.action, resource: request.resource, purpose: request.purpose,
      argumentDigest: request.argumentDigest, expectedVersions: { ...request.expectedVersions },
      notBefore: FIXTURE_TIME - 1000, expiresAt: FIXTURE_TIME + 60_000, permitted: true,
    },
  };
}
