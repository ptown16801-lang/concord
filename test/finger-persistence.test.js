import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  FileObjectStore,
  FingerPersistence,
  FingerSqliteRepository,
  PersistentFingerStore,
  resolveVersions,
} from "../src/finger/index.js";
import { createFingerIngestionService } from "../src/finger/ingestion.js";

async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), "concord-finger-"));
  const repository = new FingerSqliteRepository();
  let id = 0;
  const persistence = new FingerPersistence({
    repository,
    objectStore: new FileObjectStore(directory),
    clock: () => new Date("2026-09-16T10:00:00.000Z"),
    id: () => `id-${++id}`,
  });
  t.after(async () => {
    repository.close();
    await rm(directory, { recursive: true, force: true });
  });
  return { persistence, repository, directory };
}

function createSession(persistence) {
  return persistence.createSession({
    subjectKey: "person-42",
    concordSessionId: "visit-9",
    fingerVersion: "1.0.0",
    concordVersion: "2.3.0",
    concordBuild: "abc123",
  });
}

test("stores and queries full raw event payloads by time and kind", async (t) => {
  const { persistence, repository } = await fixture(t);
  const session = createSession(persistence);
  persistence.appendEvents(session.id, [
    {
      sequence: 0,
      occurredAtMs: 100.25,
      eventType: "pointermove",
      pointerKind: "touch",
      contactId: 7,
      rawX: 300,
      rawY: 120,
      normalizedX: 0.5,
      normalizedY: 0.25,
      rawPayload: { pressure: 0.72, experimentalField: "preserved" },
    },
    {
      sequence: 1,
      occurredAtMs: 101,
      eventType: "scroll",
      rawPayload: { deltaY: 12 },
    },
  ]);

  const rows = repository.queryEvents(session.id, {
    fromMs: 100,
    toMs: 100.5,
    eventType: "pointermove",
  });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].contactId, "7");
  assert.deepEqual(rows[0].rawPayload, {
    pressure: 0.72,
    experimentalField: "preserved",
  });
  const storedEvent = repository.database
    .prepare(
      `
    SELECT finger_version, concord_version, concord_build
    FROM finger_events WHERE session_id = ?
  `,
    )
    .get(session.id);
  assert.deepEqual(
    { ...storedEvent },
    {
      finger_version: "1.0.0",
      concord_version: "2.3.0",
      concord_build: "abc123",
    },
  );
});

test("content-addresses raw artifacts and keeps analysis generations", async (t) => {
  const { persistence, repository } = await fixture(t);
  const session = createSession(persistence);
  const raw = await persistence.preserveArtifact(session.id, {
    kind: "raw-event-stream",
    data: '{"events":[]}',
    contentType: "application/json",
  });
  const first = await persistence.addAnalysisGeneration(session.id, {
    analyzer: "heatmap",
    analyzerVersion: "1.0.0",
    sourceArtifactId: raw.id,
    configuration: { radius: 10 },
    manifest: { outputs: ["touch"] },
  });
  const second = await persistence.addAnalysisGeneration(session.id, {
    analyzer: "heatmap",
    analyzerVersion: "1.1.0",
    sourceArtifactId: raw.id,
    manifest: { outputs: ["touch", "combined"] },
  });

  assert.equal(first.generation, 1);
  assert.equal(second.generation, 2);
  assert.match(raw.objectKey, /^finger\/sha256\/[a-f0-9]{2}\/[a-f0-9]{64}$/);
  const generations = repository.database
    .prepare(
      "SELECT generation, analyzer_version FROM finger_analysis_generations ORDER BY generation",
    )
    .all();
  assert.deepEqual(
    generations.map((row) => ({ ...row })),
    [
      { generation: 1, analyzer_version: "1.0.0" },
      { generation: 2, analyzer_version: "1.1.0" },
    ],
  );
});

test("links summaries and retains versioned history", async (t) => {
  const { persistence, repository } = await fixture(t);
  const session = createSession(persistence);
  persistence.linkConcordSummary(session.id, "scan-summary", "summary-88");
  persistence.completeSession(session.id);

  const history = repository.getHistory("person-42");
  assert.equal(history.length, 1);
  assert.equal(history[0].fingerVersion, "1.0.0");
  assert.equal(history[0].concordBuild, "abc123");
  assert.equal(history[0].status, "completed");
  const link = repository.database
    .prepare(
      "SELECT summary_type, summary_id FROM finger_concord_summary_links",
    )
    .get();
  assert.deepEqual(
    { ...link },
    { summary_type: "scan-summary", summary_id: "summary-88" },
  );
});

test("rejects deletion unless an explicit purge is audited", async (t) => {
  const { persistence, repository } = await fixture(t);
  const session = createSession(persistence);
  const raw = await persistence.preserveArtifact(session.id, {
    kind: "raw-event-stream",
    data: "raw source",
    contentType: "application/octet-stream",
  });
  const analysis = await persistence.addAnalysisGeneration(session.id, {
    analyzer: "replay",
    analyzerVersion: "1.0.0",
    sourceArtifactId: raw.id,
    manifest: { frames: 1 },
  });
  assert.throws(
    () =>
      repository.database
        .prepare("DELETE FROM finger_sessions WHERE id = ?")
        .run(session.id),
    /audited purge/,
  );

  await persistence.purgeSession(session.id, {
    requestedBy: "administrator-1",
    reason: "approved privacy request",
  });
  assert.equal(repository.getHistory("person-42").length, 0);
  const audit = repository.database
    .prepare(
      `
    SELECT requested_by, reason, completed_at FROM finger_purge_audit
    WHERE session_id = ?
  `,
    )
    .get(session.id);
  assert.equal(audit.requested_by, "administrator-1");
  assert.equal(audit.reason, "approved privacy request");
  assert.ok(audit.completed_at);
  await assert.rejects(
    () => persistence.objectStore.get(raw.objectKey),
    /ENOENT/,
  );
  await assert.rejects(
    () => persistence.objectStore.get(analysis.manifest.objectKey),
    /ENOENT/,
  );
});

test("event and generation records cannot be overwritten", async (t) => {
  const { persistence, repository } = await fixture(t);
  const session = createSession(persistence);
  persistence.appendEvents(session.id, [
    {
      sequence: 0,
      occurredAtMs: 1,
      eventType: "pointerdown",
      rawPayload: { pressure: 1 },
    },
  ]);
  assert.throws(
    () =>
      repository.database
        .prepare(
          "UPDATE finger_events SET raw_payload = ? WHERE session_id = ?",
        )
        .run("{}", session.id),
    /Finger events are immutable/,
  );
});

test("backs the ingestion contract with queryable history and raw objects", async (t) => {
  const { persistence, repository } = await fixture(t);
  const versions = {
    finger: "finger-2",
    concord: "build-7",
    concordVersion: "2.4.0",
    concordBuild: "build-7",
  };
  const service = createFingerIngestionService({
    store: new PersistentFingerStore(persistence, versions),
    versions,
  });
  const reference = await service.ingest(
    {
      sessionId: "browser-session",
      startedAt: "2026-09-16T10:00:00.000Z",
      endedAt: "2026-09-16T10:00:00.050Z",
      events: [
        {
          type: "pointermove",
          pointerType: "stylus",
          timeStamp: 14.5,
          clientX: 80,
          pressure: 0.4,
        },
      ],
      device: {},
    },
    { identityId: "identity-1", userId: "user-1" },
  );

  assert.match(reference.rawArtifact, /^finger-object:\/\/finger\/sha256\//);
  const history = repository.getHistory("user-1");
  assert.equal(history[0].eventCount, 1);
  assert.equal(history[0].concordVersion, "2.4.0");
  assert.equal(history[0].concordBuild, "build-7");
  const [event] = repository.queryEvents(reference.sessionId);
  assert.equal(event.occurredAtMs, 14.5);
  assert.equal(event.rawPayload.pressure, 0.4);
});

test("keeps Concord release and build provenance separate", () => {
  assert.deepEqual(
    resolveVersions({
      FINGER_VERSION: "finger-2",
      CONCORD_VERSION: "2.4.0",
      CONCORD_BUILD: "build-7",
    }),
    {
      finger: "finger-2",
      concord: "build-7",
      concordVersion: "2.4.0",
      concordBuild: "build-7",
    },
  );
});
