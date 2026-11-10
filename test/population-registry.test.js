import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { Worker } from "node:worker_threads";
import {
  POPULATION_CEILING,
  PopulationRegistry,
} from "../src/population/index.js";

const at = "2026-09-16T12:00:00.000Z";

function creation(id, overrides = {}) {
  return {
    id,
    division: "division-1",
    identityClass: "ordinary",
    creationRoute: "executive_authorization",
    createdBy: "executive-1",
    authorityReference: `authorization-${id}`,
    createdAt: at,
    ...overrides,
  };
}

function fill(registry, count) {
  for (let index = 0; index < count; index += 1) {
    registry.createIdentity(creation(`identity-${index}`));
  }
}

test("lawful creation at 299 succeeds and creation at 300 fails atomically", () => {
  const registry = new PopulationRegistry();
  fill(registry, POPULATION_CEILING - 1);

  const last = registry.createIdentity(creation("identity-299", {
    creationRoute: "agent_petition",
    createdBy: "petitioner-1",
  }));
  assert.equal(last.living, true);
  assert.deepEqual(registry.getPopulation(), { living: 300, ceiling: 300, available: 0 });

  assert.throws(
    () => registry.createIdentity(creation("identity-over-cap")),
    /population ceiling of 300 reached/,
  );
  assert.equal(registry.getIdentity("identity-over-cap"), null);
  assert.deepEqual(registry.getEvents("identity-over-cap"), []);
  registry.close();
});

function runCompetingCreator(filename, candidate) {
  const worker = new Worker(new URL("../test-support/population-create-worker.js", import.meta.url), {
    workerData: { filename, creation: creation(candidate) },
  });
  const ready = new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
  });
  return { worker, ready };
}

test("concurrent near-cap creators sharing the authority cannot produce 301", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "concord-population-"));
  const filename = path.join(directory, "population.sqlite");
  const first = new PopulationRegistry(filename);
  fill(first, POPULATION_CEILING - 1);

  const candidates = [
    runCompetingCreator(filename, "candidate-a"),
    runCompetingCreator(filename, "candidate-b"),
  ];
  await Promise.all(candidates.map(({ ready }) => ready));
  const results = candidates.map(({ worker }) => new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.postMessage("start");
  }));
  const outcomes = await Promise.all(results);
  assert.equal(outcomes.filter(({ status }) => status === "created").length, 1);
  assert.equal(outcomes.filter(({ status }) => status === "rejected").length, 1);
  assert.equal(first.getPopulation().living, POPULATION_CEILING);

  first.close();
  rmSync(directory, { recursive: true, force: true });
});

test("duplicate identifiers fail without a second identity or audit event", () => {
  const registry = new PopulationRegistry();
  registry.createIdentity(creation("same-id"));
  assert.throws(() => registry.createIdentity(creation("same-id")), /UNIQUE constraint failed/);
  assert.equal(registry.getPopulation().living, 1);
  assert.equal(registry.getEvents("same-id").length, 1);
  registry.close();
});

test("terminal transition updates population and preserves an attributable audit", () => {
  const registry = new PopulationRegistry();
  registry.createIdentity(creation("terminal-id", { identityClass: "investigator" }));
  const result = registry.markTerminal({
    id: "terminal-id",
    reason: "death",
    actorId: "registrar-1",
    authorityReference: "death-record-1",
    occurredAt: "2026-09-16T13:00:00.000Z",
    details: { source: "vital-record" },
  });
  assert.equal(result.living, false);
  assert.equal(registry.getPopulation().living, 0);
  assert.deepEqual(
    registry.getEvents("terminal-id").map(({ eventType }) => eventType),
    ["created", "terminal"],
  );
  assert.throws(() => registry.markTerminal({
    id: "terminal-id",
    reason: "again",
    actorId: "registrar-1",
    authorityReference: "record-2",
    occurredAt: "2026-09-16T14:00:00.000Z",
  }), /Living identity not found/);
  registry.close();
});

test("audit failure rolls the identity insertion back", () => {
  const registry = new PopulationRegistry();
  registry.database.exec(`
    CREATE TRIGGER reject_test_audit BEFORE INSERT ON population_events
    BEGIN SELECT RAISE(ABORT, 'simulated audit failure'); END
  `);
  assert.throws(
    () => registry.createIdentity(creation("rolled-back")),
    /simulated audit failure/,
  );
  assert.equal(registry.getIdentity("rolled-back"), null);
  assert.deepEqual(registry.getPopulation(), { living: 0, ceiling: 300, available: 300 });
  registry.close();
});

test("all identity classes share the global ceiling", () => {
  const registry = new PopulationRegistry();
  fill(registry, POPULATION_CEILING - 1);
  registry.createIdentity(creation("hidden-investigator", { identityClass: "investigator" }));
  assert.throws(
    () => registry.createIdentity(creation("cra-over-cap", { identityClass: "cra" })),
    /population ceiling/,
  );
  assert.equal(registry.hasCapacity(), false);
  registry.close();
});
