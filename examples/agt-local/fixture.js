import { generateKeyPairSync, sign } from 'node:crypto';
import { join } from 'node:path';
import { VERSION, CANONICAL_VERSION, AGT_VERSION, canonical, digest, textDigest } from '../../contracts/admission.js';
import { GovernanceSandbox, LocalAuditCollector } from '../../src/governance/sandbox/runtime.js';

export async function createFixture(directory, { evaluators = [], domain = 'synthetic' } = {}) {
  let time = Date.now();
  const issuer = generateKeyPairSync('ed25519'), actor = generateKeyPairSync('ed25519');
  const root = { issuer: 'synthetic-policy-owner', keyId: 'policy-key', publicKey: issuer.publicKey.export({ type: 'spki', format: 'pem' }) };
  const collector = new LocalAuditCollector(join(directory, `${domain}-collector.sqlite`));
  const options = { database: join(directory, `${domain}-domain.sqlite`), domain, audience: `${domain}-writer`, trustRoots: [root], collector, evaluators, clock: () => time };
  let runtime = new GovernanceSandbox(options);
  const yaml = `apiVersion: governance.toolkit/v1\nname: synthetic-record-policy\ndefault_action: deny\nrules:\n  - name: read\n    condition:\n      action: sample.read\n      resource: sample/one\n      purpose: test\n    effect: allow\n  - name: write\n    condition:\n      action: sample.write\n      resource: sample/one\n      purpose: test\n    effect: allow\n`;
  function policy(generation = 1, text = yaml) {
    const manifest = { schema: VERSION, domain, audience: options.audience, generation, compatibilityId: `set-${generation}`,
      issuer: root.issuer, keyId: root.keyId, notBefore: time - 1000, expiresAt: time + 60_000, policyDigest: textDigest(text),
      participants: Object.fromEntries(['gateway', 'mediator', 'authorization'].map(role => [role, { serviceId: `${domain}-${role}`, agtVersion: AGT_VERSION, generation, schema: VERSION }])) };
    return { manifest, yaml: text, signature: sign(null, Buffer.from(canonical(manifest)), issuer.privateKey).toString('base64') };
  }
  runtime.registerActor({ id: 'agent-1', publicKey: actor.publicKey.export({ type: 'spki', format: 'pem' }), expiresAt: time + 10_000,
    grants: ['sample.read', 'sample.write'].map(action => ({ action, resource: 'sample/one', purpose: 'test' })) });
  runtime.seed('sample/one', 'before');
  const installed = await runtime.installPolicy(policy());
  if (installed.decision !== 'installed') throw new Error(JSON.stringify(installed));
  function signed(request, nonce = runtime.challenge('agent-1')) {
    const message = { actorId: 'agent-1', nonce, request };
    return { ...message, signature: sign(null, Buffer.from(canonical(message)), actor.privateKey).toString('base64') };
  }
  function request(id = 'operation-1', action = 'sample.write', value = 'after', version = 0) {
    const args = action === 'sample.write' ? { value } : {};
    return { schema: VERSION, canonicalVersion: CANONICAL_VERSION, operationId: id, domain, audience: options.audience, action,
      resource: 'sample/one', purpose: 'test', arguments: args, argumentDigest: digest(args), expectedVersions: { 'sample/one': version } };
  }
  return { get runtime() { return runtime; }, collector, options, policy, signed, request,
    advance(ms) { time += ms; },
    async restart() { runtime.close(); runtime = new GovernanceSandbox(options); return runtime.restorePolicy(); },
    close() { runtime.close(); collector.close(); } };
}
