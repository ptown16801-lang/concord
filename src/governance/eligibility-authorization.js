import { createPublicKey, verify } from "node:crypto";
import { EligibilityTransitionError } from "./eligibility-errors.js";

const fail = (code, message) => { throw new EligibilityTransitionError(code, message); };

// Canonical JSON also rejects values whose meaning would change in persistence.
export function canonicalJson(value) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return `[${Array.from(value, canonicalJson).join(",")}]`;
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  throw new TypeError("Eligibility requests must contain only JSON values");
}

/** Bytes signed by an external service. No private keys or token minting live here. */
export function eligibilitySigningPayload({ authorityId, policyGeneration, expectedVersion, commands, authorization }) {
  return Buffer.from(canonicalJson({
    protocol: "concord/eligibility-write/v1",
    authorityId,
    policyGeneration,
    expectedVersion,
    commands,
    keyId: authorization.keyId,
    requestId: authorization.requestId,
    issuedAt: authorization.issuedAt,
    expiresAt: authorization.expiresAt,
  }));
}

/** Trusted writer bootstrap configuration; never populated from request fields. */
export class EligibilityAuthorization {
  #authorityId;
  #generation;
  #principals;
  #maxLifetimeMs;

  constructor({ authorityId, policyGeneration, principals, maxLifetimeMs = 60_000 } = {}) {
    if (typeof authorityId !== "string" || !authorityId.trim() ||
        typeof policyGeneration !== "string" || !policyGeneration.trim() ||
        !Array.isArray(principals) || !principals.length ||
        !Number.isSafeInteger(maxLifetimeMs) || maxLifetimeMs < 1) {
      throw new TypeError("Explicit authority, policy generation, service keys, and positive request lifetime are required");
    }
    this.#authorityId = authorityId;
    this.#generation = policyGeneration;
    this.#maxLifetimeMs = maxLifetimeMs;
    this.#principals = new Map();
    for (const principal of principals) {
      const { keyId, principalId, publicKey, transitions } = principal;
      if (typeof keyId !== "string" || !keyId.trim() || this.#principals.has(keyId) ||
          typeof principalId !== "string" || !principalId.trim() ||
          !Array.isArray(transitions) || !transitions.length ||
          transitions.some((type) => typeof type !== "string" || !type)) {
        throw new TypeError("Each trusted service key needs a unique key ID, principal ID, and explicit transition grants");
      }
      const key = publicKey?.type === "public" ? publicKey : createPublicKey(publicKey);
      if (key.asymmetricKeyType !== "ed25519") throw new TypeError("Eligibility service keys must be Ed25519 public keys");
      this.#principals.set(keyId, { principalId, key, transitions: new Set(transitions) });
    }
  }

  verify(commands, { expectedVersion, authorization }, now) {
    if (!authorization || typeof authorization !== "object") fail("UNAUTHORIZED", "A signed service request is required");
    const { keyId, requestId, issuedAt, expiresAt, policyGeneration, signature } = authorization;
    const principal = this.#principals.get(keyId);
    if (!principal || typeof requestId !== "string" || !requestId.trim() || requestId !== requestId.trim() ||
        typeof signature !== "string" || !/^[A-Za-z0-9_-]{86}$/.test(signature)) {
      fail("UNAUTHORIZED", "Unrecognized service key or invalid signed request");
    }
    if (policyGeneration !== this.#generation) fail("POLICY_MISMATCH", "Request policy generation is not current");
    const issued = Date.parse(issuedAt);
    const expires = Date.parse(expiresAt);
    if (typeof issuedAt !== "string" || typeof expiresAt !== "string" ||
        !Number.isFinite(issued) || !Number.isFinite(expires) ||
        issued > now || expires <= now || expires <= issued || expires - issued > this.#maxLifetimeMs) {
      fail("EXPIRED_AUTHORIZATION", "Request lifetime is invalid, expired, or not yet active");
    }
    const payload = eligibilitySigningPayload({
      authorityId: this.#authorityId, policyGeneration: this.#generation, expectedVersion, commands, authorization,
    });
    if (!verify(null, payload, principal.key, Buffer.from(signature, "base64url"))) fail("UNAUTHORIZED", "Invalid service signature");
    if (commands.some(({ type }) => !principal.transitions.has(type))) fail("FORBIDDEN_TRANSITION", "Service lacks a grant for this transition");
    return Object.freeze({
      principalId: principal.principalId, keyId, requestId, policyGeneration,
      authorityId: this.#authorityId, issuedAt, expiresAt, signature,
    });
  }
}
