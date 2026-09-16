import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createFingerIngestionService,
  FileObjectStore,
  FingerPersistence,
  FingerSqliteRepository,
  PersistentFingerStore,
} from "../src/finger/index.js";

test("persistent ingestion preserves collector-relative timing and inferred pointer kind", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "concord-finger-normalization-"));
  const repository = new FingerSqliteRepository();
  const persistence = new FingerPersistence({
    repository,
    objectStore: new FileObjectStore(directory),
  });
  t.after(async () => {
    repository.close();
    await rm(directory, { recursive: true, force: true });
  });

  const versions = {
    finger: "finger-test",
    concord: "build-test",
    concordVersion: "0.1.0-test",
    concordBuild: "build-test",
  };
  const service = createFingerIngestionService({
    store: new PersistentFingerStore(persistence, versions),
    versions,
  });

  const reference = await service.ingest({
    sessionId: "browser-session",
    startedAt: "2026-09-16T10:00:00.000Z",
    endedAt: "2026-09-16T10:00:00.100Z",
    device: {},
    events: [
      {
        type: "touchmove",
        timestamp: "2026-09-16T10:00:00.075Z",
        elapsedMs: 75,
        eventTimestamp: 50_075,
        clientX: 12,
        clientY: 34,
      },
    ],
  }, { identityId: "identity-1", userId: null });

  const [event] = repository.queryEvents(reference.sessionId);
  assert.equal(event.occurredAtMs, 75);
  assert.equal(event.pointerKind, "touch");
  assert.equal(event.rawPayload.timestamp, "2026-09-16T10:00:00.075Z");
});
