import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateKeyPairSync, randomUUID, sign } from "node:crypto";
import { EligibilityEventType as T, EligibilityRegistry, eligibilitySigningPayload } from "../src/governance/index.js";

export const at = (minute) => `2026-09-16T10:${String(minute).padStart(2, "0")}:00.000Z`;
export const registration = (identityId = "ordinary-1") => ({ type: T.IDENTITY_REGISTERED, identityId, effectiveAt: at(0) });

export function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "concord-eligibility-"));
  const services = { population: generateKeyPairSync("ed25519"), court: generateKeyPairSync("ed25519") };
  let now = new Date(at(59));
  const config = {
    filename: join(directory, "eligibility.sqlite"), authorityId: "concord-eligibility-test",
    policyGeneration: "policy-1", clock: () => now,
    principals: [
      { keyId: "population", principalId: "population-service", publicKey: services.population.publicKey, transitions: [T.IDENTITY_REGISTERED, T.DEATH_RECORDED] },
      { keyId: "court", principalId: "court-service", publicKey: services.court.publicKey, transitions: Object.values(T).filter((type) => type !== T.IDENTITY_REGISTERED && type !== T.DEATH_RECORDED) },
    ],
  };
  const registry = new EligibilityRegistry(config);
  t.after(() => {
    try { registry.close(); } catch { /* A restart test may already have closed it. */ }
    rmSync(directory, { force: true, recursive: true });
  });
  const authorize = (commands, { expectedVersion = registry.version, keyId = commands.every(({ type }) => [T.IDENTITY_REGISTERED, T.DEATH_RECORDED].includes(type)) ? "population" : "court", ...overrides } = {}) => {
    const authorization = {
      keyId, requestId: randomUUID(), issuedAt: now.toISOString(),
      expiresAt: new Date(now.valueOf() + 30_000).toISOString(), policyGeneration: config.policyGeneration, ...overrides,
    };
    authorization.signature = sign(null, eligibilitySigningPayload({ ...config, commands, expectedVersion, authorization }), services[keyId].privateKey).toString("base64url");
    return { expectedVersion, authorization };
  };
  return {
    config, directory, registry, services, authorize,
    setTime: (value) => { now = new Date(value); },
    apply: (command, options) => registry.apply(command, authorize([command], options)),
    applyBatch: (commands, options) => registry.applyBatch(commands, authorize(commands, options)),
  };
}
