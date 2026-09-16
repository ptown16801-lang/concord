import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";
import {
  createFingerHttpHandler,
  createFingerIngestionService,
  FileFingerStore,
  MemoryFingerStore,
} from "../src/finger/index.js";

const servers = [];
afterEach(() => Promise.all(servers.splice(0).map((server) => server.close())));

const storageKey = (id) => createHash("sha256").update(id).digest("hex");

test("ingests, summarizes, stamps, associates, and references a complete session", async () => {
  const store = new MemoryFingerStore();
  const associations = [];
  const ingestionService = createFingerIngestionService({
    store,
    versions: { finger: "finger-server-2", concord: "build-42" },
    onAssociation: async (association) => associations.push(association),
  });

  const reference = await ingestionService.ingest(
    {
      sessionId: "browser-session",
      startedAt: "2026-09-16T10:00:00.000Z",
      endedAt: "2026-09-16T10:00:01.250Z",
      events: [
        { type: "pointerdown", pointerType: "touch" },
        { type: "pointermove", pointerType: "touch" },
      ],
      device: { maxTouchPoints: 5, observedMaxContacts: 2 },
      dom: { initial: "<main />" },
      fingerVersion: "untrusted-client-version",
    },
    { identityId: "identity-1", userId: "user-1" },
  );

  assert.equal(reference.status, "complete");
  assert.equal(reference.summary.eventCount, 2);
  assert.equal(reference.summary.durationMs, 1250);
  assert.deepEqual(
    { ...reference.summary.eventTypes },
    { pointerdown: 1, pointermove: 1 },
  );
  assert.deepEqual(reference.versions, {
    finger: "finger-server-2",
    concord: "build-42",
    clientFinger: "untrusted-client-version",
    clientConcord: null,
  });
  assert.match(reference.rawArtifact, /^finger:\/\/sessions\/.+\/raw$/);
  assert.equal(store.sessions[0].identityId, "identity-1");
  assert.equal(associations[0].userId, "user-1");
});

test("persists partial transmissions and reports missing fields", async () => {
  const store = new MemoryFingerStore();
  const service = createFingerIngestionService({
    store,
    versions: { finger: "1", concord: "1" },
  });

  const reference = await service.ingest(
    { events: [{ type: "close", pointerType: "mouse" }] },
    { identityId: "anonymous", userId: null },
  );

  assert.equal(reference.status, "partial");
  assert.deepEqual(reference.summary.missing, ["startedAt", "endedAt", "device"]);
  assert.equal(store.sessions.length, 1);
});

test("file store durably writes raw data and queryable session metadata", async () => {
  const directory = path.join(tmpdir(), `concord-finger-${crypto.randomUUID()}`);
  const service = createFingerIngestionService({
    store: new FileFingerStore(directory),
    versions: { finger: "1", concord: "1" },
  });

  try {
    const reference = await service.ingest(
      { events: [{ type: "__proto__" }] },
      { identityId: "anonymous", userId: null },
    );
    const raw = JSON.parse(
      await readFile(path.join(directory, "sessions", storageKey(reference.sessionId), "raw.json")),
    );
    const index = await readFile(path.join(directory, "sessions.jsonl"), "utf8");

    assert.equal(raw.events[0].type, "__proto__");
    assert.equal(JSON.parse(index).id, reference.sessionId);
    assert.equal(reference.summary.eventTypes.__proto__, 1);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("file store never resolves caller-controlled session ids as paths", async () => {
  const directory = path.join(tmpdir(), `concord-finger-path-${crypto.randomUUID()}`);
  const store = new FileFingerStore(directory);
  const maliciousId = "../../escape-attempt";
  try {
    await store.saveSession({ id: maliciousId }, { ok: true });
    const raw = JSON.parse(
      await readFile(path.join(directory, "sessions", storageKey(maliciousId), "raw.json")),
    );
    assert.deepEqual(raw, { ok: true });
    await assert.rejects(readFile(path.resolve(directory, "..", "escape-attempt", "raw.json")));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("HTTP ingestion issues a stable identity cookie and returns a reference", async () => {
  const store = new MemoryFingerStore();
  const handler = createFingerHttpHandler({
    identitySecret: "test-secret",
    secureCookies: false,
    ingestionService: createFingerIngestionService({
      store,
      versions: { finger: "1", concord: "1" },
    }),
  });
  const { origin, server } = await listen(handler);

  const first = await fetch(`${origin}/api/finger/sessions`, {
    method: "POST",
    body: JSON.stringify({ events: [] }),
  });
  const cookie = first.headers.get("set-cookie");
  const body = await first.json();
  assert.equal(first.status, 202);
  assert.equal(body.accepted, true);
  assert.ok(body.reference.sessionId);
  assert.match(cookie, /concord_finger_identity=/);

  const second = await fetch(`${origin}/api/finger/sessions`, {
    method: "POST",
    headers: { cookie: cookie.split(";")[0] },
    body: JSON.stringify({ events: [] }),
  });
  assert.equal(second.headers.get("set-cookie"), null);
  assert.equal(store.sessions[0].identityId, store.sessions[1].identityId);
  server.close();
});

test("HTTP ingestion associates an asynchronously authenticated user", async () => {
  const store = new MemoryFingerStore();
  const handler = createFingerHttpHandler({
    identitySecret: "test-secret",
    secureCookies: false,
    getAuthenticatedUserId: async () => "user-from-concord",
    ingestionService: createFingerIngestionService({
      store,
      versions: { finger: "1", concord: "1" },
    }),
  });
  const { origin, server } = await listen(handler);

  await fetch(`${origin}/api/finger/sessions`, {
    method: "POST",
    body: JSON.stringify({ events: [] }),
  });

  assert.equal(store.sessions[0].userId, "user-from-concord");
  server.close();
});

test("malformed and failed transmissions remain silent to the client", async () => {
  const errors = [];
  const handler = createFingerHttpHandler({
    identitySecret: "test-secret",
    secureCookies: false,
    ingestionService: { ingest: async () => { throw new Error("storage unavailable"); } },
    onIngestionError: (error) => errors.push(error),
  });
  const { origin, server } = await listen(handler);

  for (const body of ["not-json", "{}"]) {
    const response = await fetch(`${origin}/api/finger/sessions`, { method: "POST", body });
    assert.equal(response.status, 202);
    assert.deepEqual(await response.json(), { accepted: true });
  }
  assert.equal(errors.length, 2);
  server.close();
});

async function listen(handler) {
  const server = createServer(handler);
  servers.push(server);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return { server, origin: `http://127.0.0.1:${address.port}` };
}
