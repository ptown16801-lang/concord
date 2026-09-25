import { assertInvocationReady, canonicalSerialize, sha256, validateMissingContextRequest } from './bounded-envelope.js';

export const DEEPSEEK_PROVIDER_STATES = Object.freeze({
  READY: 'ready',
  UNAVAILABLE: 'unavailable',
  QUOTA_EXHAUSTED: 'quota_exhausted',
  NOT_CONFIGURED: 'not_configured',
  QUALIFICATION_MISSING: 'qualification_missing',
  BLOCKED_BY_POLICY: 'blocked_by_policy',
});

function freezeRequest(value) {
  return Object.freeze({ ...value });
}

export function createDeepSeekAdapter({ client, qualification = 'qualified', availability = DEEPSEEK_PROVIDER_STATES.READY } = {}) {
  if (typeof client !== 'function') throw new TypeError('DeepSeek adapter requires a transport client function');

  return Object.freeze({
    async invoke(sealedEnvelope, { maxAttempts = 1 } = {}) {
      if (qualification !== 'qualified') {
        return Object.freeze({ status: DEEPSEEK_PROVIDER_STATES.QUALIFICATION_MISSING, candidate: null });
      }
      if (availability !== DEEPSEEK_PROVIDER_STATES.READY) {
        return Object.freeze({ status: availability, candidate: null });
      }
      if (!Number.isInteger(maxAttempts) || maxAttempts < 1) throw new TypeError('maxAttempts must be a positive integer');

      const ready = assertInvocationReady(sealedEnvelope);
      if (ready.payload.provider.name !== 'deepseek') throw new Error('envelope provider is not deepseek');
      const request = freezeRequest({
        provider: 'deepseek',
        model: ready.payload.provider.model,
        envelope: ready.canonical,
        envelope_hash: ready.envelope_hash,
      });

      let lastError;
      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        assertInvocationReady(sealedEnvelope);
        try {
          const response = await client(request);
          if (response?.missing_context_request) {
            const checked = validateMissingContextRequest(response.missing_context_request);
            if (!checked.valid) throw new Error(`invalid missing-context request: ${checked.errors.join('; ')}`);
          }
          const serializedResponse = canonicalSerialize(response ?? null);
          return Object.freeze({
            status: 'candidate',
            authority: 'candidate_only',
            input_envelope_hash: ready.envelope_hash,
            request_artifact_hash: sha256(canonicalSerialize(request)),
            response_artifact_hash: sha256(serializedResponse),
            candidate: response ?? null,
          });
        } catch (error) {
          lastError = error;
        }
      }
      throw lastError;
    },
  });
}
