import assert from "node:assert/strict";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { spawn, spawnSync } from "node:child_process";
import { generateKeyPairSync, sign, verify } from "node:crypto";
import { join } from "node:path";
import { EligibilityEventType as T, EligibilityRegistry, EligibilityReader, eligibilitySigningPayload } from "../src/governance/index.js";
import { at, fixture, registration } from "../test-support/eligibility-fixture.js";

const proceeding = (identityId = "ordinary-1") => ({ type: T.FORMAL_PROCEEDING_OPENED, identityId, proceedingId: "p-1", effectiveAt: at(10) });

function connect(t, config) {
  const registry = new EligibilityRegistry(config);
  t.after(() => registry.close());
  return registry;
}

function externalDatabase(t, filename) {
  const database = new DatabaseSync(filename);
  database.exec("PRAGMA foreign_keys = ON");
  t.after(() => database.close());
  return database;
}

test("a file, authority identity, and trusted service configuration are mandatory", (t) => {
  const { config, directory } = fixture(t);
  assert.throws(() => new EligibilityRegistry(), TypeError);
  for (const filename of [undefined, ":memory:", "relative.sqlite"]) {
    assert.throws(() => new EligibilityRegistry({ ...config, filename }), TypeError);
  }
  assert.throws(() => new EligibilityRegistry({ ...config, principals: [] }), TypeError);
  assert.throws(() => new EligibilityReader({ ...config, filename: join(directory, "missing.sqlite") }));
  assert.throws(() => new EligibilityRegistry({ ...config, authorityId: "another-authority" }), { code: "STORE_MISMATCH" });
});

test("missing, fabricated, and attacker-signed identities cannot write", (t) => {
  const f = fixture(t);
  const command = registration();
  assert.throws(() => f.registry.apply(command), { code: "EXPECTED_VERSION_REQUIRED" });
  assert.throws(() => f.registry.apply(command, { expectedVersion: 0 }), { code: "UNAUTHORIZED" });
  const options = f.authorize([command]);
  options.authorization.signature = sign(null, eligibilitySigningPayload({ ...f.config, commands: [command], ...options }), generateKeyPairSync("ed25519").privateKey).toString("base64url");
  assert.throws(() => f.registry.apply(command, options), { code: "UNAUTHORIZED" });
  assert.throws(() => f.registry.apply({ ...command, authentication: { authorityId: "court-1" } }, { expectedVersion: 0 }), { code: "UNAUTHORIZED" });
  assert.throws(() => f.registry.apply(command, f.authorize([command], { requestId: " ambiguous " })), { code: "UNAUTHORIZED" });
  assert.equal(f.registry.version, 0);
});

test("signatures bind commands, affected identities, expected version, and target authority", (t) => {
  const f = fixture(t);
  f.applyBatch([registration(), registration("ordinary-2")]);
  const command = { type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4-1", affectedIdentityIds: ["ordinary-1"], effectiveAt: at(10) };
  const options = f.authorize([command]);
  assert.throws(() => f.registry.apply({ ...command, affectedIdentityIds: ["ordinary-2"] }, options), { code: "UNAUTHORIZED" });
  assert.throws(() => f.registry.apply(command, { ...options, expectedVersion: 3 }), { code: "UNAUTHORIZED" });
  const foreign = connect(t, { ...f.config, filename: join(f.directory, "other.sqlite"), authorityId: "other" });
  assert.throws(() => foreign.apply(command, options), { code: "UNAUTHORIZED" });
  f.registry.apply(command, options);
  assert.equal(f.registry.readEligibility("ordinary-1").eligible, false);
  assert.equal(f.registry.readEligibility("ordinary-2").eligible, true);
});

test("every transition requires an explicit service grant; mixed batches fail atomically", (t) => {
  const f = fixture(t);
  assert.throws(() => f.registry.apply(registration(), f.authorize([registration()], { keyId: "court" })), { code: "FORBIDDEN_TRANSITION" });
  f.apply(registration());
  for (const type of Object.values(T).filter((type) => ![T.IDENTITY_REGISTERED, T.DEATH_RECORDED].includes(type))) {
    const command = { type, identityId: "ordinary-1" };
    assert.throws(() => f.registry.apply(command, f.authorize([command], { keyId: "population" })), { code: "FORBIDDEN_TRANSITION" });
  }
  const mixed = [registration("ordinary-2"), proceeding()];
  assert.throws(() => f.registry.applyBatch(mixed, f.authorize(mixed, { keyId: "population" })), { code: "FORBIDDEN_TRANSITION" });
  assert.equal(f.registry.version, 1);
  assert.equal(f.registry.stateAt("ordinary-2"), null);
});

test("expired, future, excessive-lifetime, and incompatible-policy requests fail closed", (t) => {
  const f = fixture(t);
  const command = registration();
  for (const overrides of [
    { issuedAt: at(58), expiresAt: at(59) },
    { issuedAt: "2026-09-16T11:00:00.000Z", expiresAt: "2026-09-16T11:00:10.000Z" },
    { issuedAt: at(58), expiresAt: "2026-09-16T11:01:00.000Z" },
  ]) assert.throws(() => f.registry.apply(command, f.authorize([command], overrides)), { code: "EXPIRED_AUTHORIZATION" });
  assert.throws(() => f.registry.apply(command, f.authorize([command], { policyGeneration: "stale-policy" })), { code: "POLICY_MISMATCH" });
  assert.equal(f.registry.version, 0);
});

test("authorization expiry is checked again inside the write transaction", (t) => {
  const f = fixture(t);
  let calls = 0;
  const writer = connect(t, { ...f.config, clock: () => new Date(calls++ === 0 ? at(59) : "2026-09-16T11:00:00.000Z") });
  const command = registration();
  assert.throws(() => writer.apply(command, f.authorize([command])), { code: "EXPIRED_AUTHORIZATION" });
  assert.equal(f.registry.version, 0);
});

test("replay protection and independently verifiable receipts survive restart", (t) => {
  const f = fixture(t);
  const command = registration();
  const options = f.authorize([command]);
  f.registry.apply(command, options);
  const before = f.registry.auditLog();
  f.registry.close();
  const reopened = connect(t, f.config);
  assert.deepEqual(reopened.auditLog(), before);
  assert.equal(reopened.stateAt("ordinary-1").eligible, true);
  assert.throws(() => reopened.apply(command, options), { code: "REPLAYED_REQUEST" });
  const receipt = reopened.requestReceipt(options.authorization.requestId);
  assert.deepEqual(receipt.commands, [command]);
  assert.equal(receipt.authorization.principalId, "population-service");
  assert.equal(verify(null, eligibilitySigningPayload({ ...f.config, ...receipt }), f.services.population.publicKey,
    Buffer.from(receipt.authorization.signature, "base64url")), true);
  receipt.commands[0].identityId = "changed";
  assert.equal(reopened.requestReceipt(options.authorization.requestId).commands[0].identityId, "ordinary-1");
});

test("independent writers reject stale versions and readers observe new committed state", (t) => {
  const f = fixture(t);
  const second = connect(t, f.config);
  const reader = new EligibilityReader(f.config);
  t.after(() => reader.close());
  assert.equal(reader.apply, undefined);
  assert.equal(reader.applyBatch, undefined);
  assert.equal(reader.readEligibility("ordinary-1").eligible, false);
  f.apply(registration());
  const stale = f.authorize([proceeding()], { expectedVersion: 0 });
  assert.throws(() => second.apply(proceeding(), stale), { code: "VERSION_CONFLICT" });
  assert.deepEqual(reader.readEligibility("ordinary-1"), { authorityId: f.config.authorityId, identityId: "ordinary-1", version: 1, observedAt: at(59), eligible: true, reason: null });
  second.apply(proceeding(), f.authorize([proceeding()]));
  assert.equal(reader.readEligibility("ordinary-1").reason, "FORMAL_PROCEEDING");
  assert.equal(f.registry.stateAt("ordinary-1", { version: 1 }).eligible, true);
  assert.throws(() => reader.readEligibility("ordinary-1", { minimumVersion: 3 }), { code: "STALE_READ" });
});

test("storage errors roll back all events and request consumption; retry remains possible", (t) => {
  const f = fixture(t);
  const database = externalDatabase(t, f.config.filename);
  database.exec(`CREATE TRIGGER fail_second BEFORE INSERT ON eligibility_events WHEN NEW.version = 2
    BEGIN SELECT RAISE(ABORT, 'injected storage failure'); END`);
  const commands = [registration(), registration("ordinary-2")];
  const options = f.authorize(commands);
  assert.throws(() => f.registry.applyBatch(commands, options), /injected storage failure/);
  assert.equal(f.registry.version, 0);
  assert.equal(f.registry.requestReceipt(options.authorization.requestId), null);
  database.exec("DROP TRIGGER fail_second");
  f.registry.applyBatch(commands, options);
  assert.equal(f.registry.version, 2);
});

test("database triggers reject update, delete, replacement, and version gaps", (t) => {
  const f = fixture(t);
  f.apply(registration());
  const before = f.registry.auditLog();
  const database = externalDatabase(t, f.config.filename);
  for (const table of ["eligibility_events", "eligibility_requests", "eligibility_metadata"]) {
    assert.throws(() => database.exec(`DELETE FROM ${table}`), /append-only/);
    const column = table === "eligibility_events" ? "payload" : table === "eligibility_requests" ? "receipt" : "authority_id";
    assert.throws(() => database.exec(`UPDATE ${table} SET ${column} = ${column}`), /append-only/);
    assert.throws(() => database.exec(`INSERT OR REPLACE INTO ${table} SELECT * FROM ${table}`));
  }
  assert.throws(() => database.exec("INSERT INTO eligibility_events SELECT 3, request_id, payload, previous_hash, event_hash FROM eligibility_events"), /sequentially/);
  assert.deepEqual(f.registry.auditLog(), before);
});

test("returned event and state objects cannot mutate stored audit evidence", (t) => {
  const f = fixture(t);
  const event = f.apply(registration());
  event.authorization.principalId = "forged";
  f.apply(proceeding());
  f.registry.stateAt("ordinary-1").openFormalProceedingIds.push("forged");
  const history = f.registry.auditLog();
  history[0].identityId = "forged";
  history[0].authorization.principalId = "forged";
  assert.equal(f.registry.auditLog()[0].identityId, "ordinary-1");
  assert.equal(f.registry.auditLog()[0].authorization.principalId, "population-service");
  assert.deepEqual(f.registry.stateAt("ordinary-1").openFormalProceedingIds, ["p-1"]);
});

test("invalid proceeding IDs, C4 lists, and legacy authentication never enter history", (t) => {
  const f = fixture(t);
  f.apply(registration());
  for (const command of [
    { type: T.FORMAL_PROCEEDING_OPENED, identityId: "ordinary-1" },
    { type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4", affectedIdentityIds: ["ordinary-1", "ordinary-1"] },
    { type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4", affectedIdentityIds: ["ordinary-1", "unknown"] },
    { ...proceeding(), authentication: { authorityId: "court-1" } },
  ]) assert.throws(() => f.apply(command));
  assert.equal(f.registry.version, 1);
  assert.equal(f.registry.stateAt("ordinary-1").eligible, true);
});

test("restart preserves restrictions, restoration, terminal states, and historical cutoffs", (t) => {
  const f = fixture(t);
  f.applyBatch([registration(), registration("dead"), registration("capital"), registration("felony")]);
  f.apply(proceeding());
  f.apply({ type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4", affectedIdentityIds: ["ordinary-1"], effectiveAt: at(11) });
  f.apply({ type: T.FORMAL_PROCEEDING_CLOSED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(20) });
  f.apply({ type: T.DEATH_RECORDED, identityId: "dead", effectiveAt: at(21) });
  f.apply({ type: T.CAPITAL_TERMINATION_RECORDED, identityId: "capital", effectiveAt: at(22) });
  f.apply({ type: T.FELONY_CONVICTION_ENTERED, identityId: "felony", convictionId: "f", effectiveAt: at(23) });
  f.apply({ type: T.C4_RESTRICTION_CLOSED, identityId: "ordinary-1", proceedingId: "c4", effectiveAt: at(40) });
  const history = f.registry.auditLog();
  f.registry.close();
  const reopened = connect(t, f.config);
  assert.deepEqual(reopened.auditLog(), history);
  assert.equal(reopened.stateAt("ordinary-1", { version: 5 }).reason, "FORMAL_PROCEEDING");
  assert.equal(reopened.stateAt("ordinary-1", { at: at(25) }).reason, "C4_TEMPORARY_RESTRICTION");
  assert.equal(reopened.readEligibility("ordinary-1").eligible, true);
  assert.equal(reopened.electionStatus("ordinary-1", { closesAt: at(30), at: at(50) }).eligible, false);
  for (const [identityId, reason] of [["dead", "DECEASED"], ["capital", "CAPITAL_TERMINATED"], ["felony", "PERMANENT_FELONY_BAR"]]) {
    assert.equal(reopened.readEligibility(identityId).reason, reason);
    assert.equal(reopened.electionStatus(identityId, { closesAt: at(30), acceptedBallotAt: at(1), at: at(50) }).retained, true);
  }
});

test("corrupted event bytes fail closed on live reads and restart", (t) => {
  const f = fixture(t);
  f.apply(registration());
  const database = externalDatabase(t, f.config.filename);
  // Simulate offline corruption beyond the writer API, deliberately bypassing a guard.
  database.exec("DROP TRIGGER eligibility_events_no_update; UPDATE eligibility_events SET payload = json_set(payload, '$.identityId', 'corrupt')");
  assert.throws(() => f.registry.readEligibility("ordinary-1"), { code: "CORRUPT_HISTORY" });
  assert.throws(() => new EligibilityReader(f.config), { code: "CORRUPT_HISTORY" });
  assert.throws(() => new EligibilityRegistry(f.config), { code: "CORRUPT_HISTORY" });
});

const worker = `
  import { EligibilityRegistry } from './src/governance/index.js';
  const { config, command, options, crash } = JSON.parse(process.argv[1]);
  const registry = new EligibilityRegistry({ ...config, clock: () => new Date('${at(59)}') });
  try {
    registry.apply(command, options);
    if (crash) process.kill(process.pid, 'SIGKILL');
    process.stdout.write('committed');
  } catch (error) { process.stdout.write(error.code); }
  registry.close();
`;
const workerArguments = (f, command, options, crash = false) => ["--input-type=module", "-e", worker, JSON.stringify({
  config: { ...f.config, principals: f.config.principals.map((p) => ({ ...p, publicKey: p.publicKey.export({ type: "spki", format: "pem" }) })) },
  command, options, crash,
})];

test("committed history survives abrupt writer process death without close", (t) => {
  const f = fixture(t);
  const command = registration();
  const result = spawnSync(process.execPath, workerArguments(f, command, f.authorize([command]), true), { encoding: "utf8" });
  assert.equal(result.signal, "SIGKILL", result.stderr);
  f.registry.close();
  const reopened = connect(t, f.config);
  assert.equal(reopened.readEligibility("ordinary-1").eligible, true);
  assert.equal(reopened.version, 1);
});

test("concurrent writer processes cannot both commit at the same expected version", async (t) => {
  const f = fixture(t);
  const results = await Promise.all(["first", "second"].map((id) => new Promise((resolve, reject) => {
    const command = registration(id);
    const child = spawn(process.execPath, workerArguments(f, command, f.authorize([command], { expectedVersion: 0 })));
    let output = "", errors = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { errors += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve(output) : reject(new Error(errors)));
  })));
  assert.deepEqual(results.sort(), ["VERSION_CONFLICT", "committed"]);
  assert.equal(f.registry.version, 1);
});

test("missing events from a committed batch are detected, including an entirely missing batch", (t) => {
  const f = fixture(t);
  f.applyBatch([registration(), registration("ordinary-2")]);
  const database = externalDatabase(t, f.config.filename);
  database.exec("DROP TRIGGER eligibility_events_no_delete; DELETE FROM eligibility_events WHERE version = 2");
  assert.throws(() => f.registry.readEligibility("ordinary-1"), { code: "CORRUPT_HISTORY" });
  database.exec("DELETE FROM eligibility_events");
  assert.throws(() => f.registry.readEligibility("ordinary-1"), { code: "CORRUPT_HISTORY" });
});

test("a pinned election-close version remains reconstructable after later effective-dated records", (t) => {
  const f = fixture(t);
  f.apply(registration());
  f.apply(proceeding());
  const closeVersion = f.registry.version;
  f.apply({ type: T.FORMAL_PROCEEDING_CLOSED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(20) });
  const pinned = f.registry.electionStatus("ordinary-1", { closesAt: at(30), at: at(50), version: closeVersion });
  assert.equal(pinned.status, "CLOSED");
  assert.equal(pinned.reason, "FORMAL_PROCEEDING");
  assert.equal(f.registry.stateAt("ordinary-1", { version: 3, at: at(30) }).eligible, true);
});
