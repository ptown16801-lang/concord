import { createPublicKey, verify } from 'node:crypto';
import { Worker } from 'node:worker_threads';
import {
  VERSION, canonical, digest, textDigest, shape, names, requireThat,
  requestSchema, manifestSchema, contextSchema,
} from '../../contracts/admission.js';

function fail(code) { return Object.freeze({ schema: VERSION, decision: 'deny', code }); }
function error(code) { return Object.assign(new Error(code), { code }); }
function snapshot(value) { return JSON.parse(canonical(value)); }

function policyWorker(data, timeoutMs) {
  return new Promise((resolve, reject) => {
    // Policy workers are not test-runner children and must not inherit its IPC mode.
    const { NODE_TEST_CONTEXT: ignoredTestContext, ...env } = process.env;
    const worker = new Worker(new URL('./policy-worker.js', import.meta.url), { workerData: data, env });
    let settled = false;
    const finish = (failure, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      void worker.terminate();
      if (failure) reject(error(failure));
      else resolve(value);
    };
    const timer = setTimeout(() => finish('TIMEOUT'), timeoutMs);
    worker.once('message', (value) => finish(value.error, value));
    worker.once('error', () => finish('POLICY_ERROR'));
    worker.once('exit', () => finish('POLICY_ERROR'));
  });
}

async function boundedContext(provider, request, timeoutMs) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(() => provider(snapshot(request), { signal: controller.signal })),
      new Promise((_, reject) => { timer = setTimeout(() => reject(error('TIMEOUT')), timeoutMs); }),
    ]);
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}

/** Trusted local composition API. No handler, execution, storage, or HTTP API. */
export function createAdmissionKernel({ domain, audience, actions, trustRoots, resolveContext, timeoutMs = 1000, clock = Date.now }) {
  names(domain);
  names(audience);
  requireThat(Array.isArray(actions) && actions.length > 0);
  actions.forEach(names);
  const knownActions = new Set(actions);
  requireThat(Number.isSafeInteger(timeoutMs) && timeoutMs > 0 && timeoutMs <= 30_000);
  requireThat(typeof resolveContext === 'function' && typeof clock === 'function');
  const roots = new Map();
  for (const root of trustRoots) {
    shape(root, 'issuer keyId publicKey');
    names(root.issuer);
    names(root.keyId);
    const key = createPublicKey(root.publicKey);
    requireThat(key.asymmetricKeyType === 'ed25519');
    const id = `${root.issuer}\n${root.keyId}`;
    requireThat(!roots.has(id));
    roots.set(id, key);
  }
  let active;
  let highestGeneration = 0;
  let epoch = 0;
  let lastTime = -Infinity;
  function now() {
    const time = clock();
    if (!Number.isSafeInteger(time) || time < lastTime) throw error('CLOCK_ERROR');
    lastTime = time;
    return time;
  }
  function fresh(manifest) {
    const time = now();
    if (!(manifest.notBefore <= time && time < manifest.expiresAt)) throw error('POLICY_UNAVAILABLE');
    return time;
  }

  return Object.freeze({
    async installPolicy(bundle) {
      // Seal immediately, including on an invalid update. Never fall back to an old allow.
      const attempt = ++epoch;
      active = undefined;
      try {
        const copy = snapshot(bundle);
        shape(copy, 'manifest signature yaml');
        const { manifest, signature, yaml } = copy;
        manifestSchema(manifest);
        requireThat(manifest.domain === domain && manifest.audience === audience);
        requireThat(manifest.generation > highestGeneration);
        requireThat(typeof yaml === 'string' && Buffer.byteLength(yaml) <= 65_536 && textDigest(yaml) === manifest.policyDigest);
        requireThat(typeof signature === 'string' && /^[A-Za-z0-9+/]{86}==$/.test(signature));
        const key = roots.get(`${manifest.issuer}\n${manifest.keyId}`);
        requireThat(key && verify(null, Buffer.from(canonical(manifest)), key, Buffer.from(signature, 'base64')));
        fresh(manifest);
        requireThat((await policyWorker({ yaml }, timeoutMs)).valid === true);
        fresh(manifest);
        if (epoch !== attempt) return fail('POLICY_CHANGED');
        highestGeneration = manifest.generation;
        active = copy;
        return Object.freeze({ schema: VERSION, decision: 'installed', generation: manifest.generation });
      } catch (failure) {
        return fail(['TIMEOUT', 'CLOCK_ERROR'].includes(failure.code) ? failure.code : 'POLICY_INVALID');
      }
    },

    async evaluate(input) {
      let request;
      try { request = snapshot(input); requestSchema(request); }
      catch { return fail('INVALID_REQUEST'); }
      if (request.domain !== domain || request.audience !== audience) return fail('WRONG_TARGET');
      if (!knownActions.has(request.action)) return fail('UNKNOWN_ACTION');
      const policy = active;
      const evaluationEpoch = epoch;
      if (!policy) return fail('POLICY_UNAVAILABLE');
      try {
        fresh(policy.manifest);
        let context;
        try {
          context = snapshot(await boundedContext(resolveContext, request, timeoutMs));
          contextSchema(context, request, policy.manifest, now());
        } catch (failure) {
          return fail(failure.code === 'TIMEOUT' ? 'TIMEOUT' : 'CONTEXT_DENIED');
        }
        const result = await policyWorker({ yaml: policy.yaml, request, actorId: context.actorId }, timeoutMs);
        if (epoch !== evaluationEpoch || active !== policy) return fail('POLICY_CHANGED');
        contextSchema(context, request, policy.manifest, fresh(policy.manifest));
        if (result.allowed !== true) return fail('POLICY_DENIED');
        return Object.freeze({
          schema: VERSION, decision: 'allow', code: 'ELIGIBLE',
          requestDigest: digest(request), actorId: context.actorId,
          authoritySnapshotId: context.authority.snapshotId,
          generation: policy.manifest.generation, policyDigest: policy.manifest.policyDigest,
          compatibilityId: policy.manifest.compatibilityId,
        });
      } catch (failure) {
        return fail(['TIMEOUT', 'POLICY_CHANGED', 'POLICY_UNAVAILABLE', 'CLOCK_ERROR'].includes(failure.code) ? failure.code : 'POLICY_ERROR');
      }
    },
  });
}
