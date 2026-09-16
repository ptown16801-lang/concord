import assert from "node:assert/strict";
import test from "node:test";
import {
  FingerAnalysisService,
  InMemoryAnalysisGenerationStore,
  aggregateSessionAnalyses,
  processFingerSession,
} from "../src/finger/processing/index.js";

const session = {
  id: "session-a",
  fingerVersion: "2.3.0",
  concordVersion: "build-42",
  viewport: { width: 100, height: 200, devicePixelRatio: 2 },
  initialDom: { html: "<button>Continue</button>" },
  finalDom: { html: "<main>Done</main>" },
  events: [
    { type: "pointerup", timestamp: 1_200, pointerType: "touch", pointerId: 7, clientX: 50, clientY: 100 },
    { type: "pointerdown", timestamp: 1_000, pointerType: "touch", pointerId: 7, clientX: 10, clientY: 20, pressure: 0.5 },
    { type: "dom-mutation", timestamp: 1_050, mutation: { type: "attributes", target: "button" } },
    { type: "pointermove", timestamp: 1_100, pointerType: "pen", pointerId: 2, normalizedX: 1, normalizedY: 1 },
    { type: "mousemove", timestamp: 1_150, clientX: 25, clientY: 50 },
    { type: "scroll", timestamp: 1_175, scrollX: 0, scrollY: 180 },
  ],
};

test("reconstructs ordered replay frames and device-specific heat maps", () => {
  const result = processFingerSession(session, { columns: 2, rows: 2 });

  assert.equal(result.sessionId, "session-a");
  assert.deepEqual(result.replay.frames.map((frame) => frame.offsetMs), [0, 50, 100, 150, 175, 200]);
  assert.equal(result.replay.frames[1].mutations[0].target, "button");
  assert.equal(result.replay.frames[4].events[0].scrollY, 180);
  assert.equal(result.heatMaps.views.touch.position.sampleCount, 2);
  assert.equal(result.heatMaps.views.mouse.position.sampleCount, 1);
  assert.equal(result.heatMaps.views.stylus.position.sampleCount, 1);
  assert.equal(result.heatMaps.views.combined.position.sampleCount, 4);
  assert.equal(result.heatMaps.views.combined.position.cells[1][1], 2);
  assert.equal(result.heatMaps.views.touch.dwell.totalMs, 200);
  assert.equal(result.heatMaps.views.touch.path.segments.length, 1);
  assert.equal(result.source.eventCount, 6);
  assert.match(result.source.sha256, /^[a-f0-9]{64}$/);
});

test("flattens multi-touch events and clamps long dwell intervals", () => {
  const result = processFingerSession({
    id: "multi",
    viewport: { width: 100, height: 100 },
    events: [
      { type: "touchstart", timestamp: 0, changedTouches: [
        { identifier: 1, clientX: 10, clientY: 10 },
        { identifier: 2, clientX: 90, clientY: 90 },
      ] },
      { type: "touchmove", timestamp: 5_000, changedTouches: [
        { identifier: 1, clientX: 20, clientY: 20 },
      ] },
    ],
  }, { columns: 2, rows: 2, maxDwellMs: 250 });

  assert.equal(result.heatMaps.views.touch.position.sampleCount, 3);
  assert.equal(result.heatMaps.views.touch.dwell.totalMs, 250);
  assert.equal(result.heatMaps.views.touch.path.segments.length, 1);
});

test("combines compatible analyses and retains session provenance on paths", () => {
  const first = processFingerSession(session, { columns: 2, rows: 2 });
  const second = processFingerSession({ ...session, id: "session-b" }, { columns: 2, rows: 2 });
  const aggregate = aggregateSessionAnalyses([first, second], { id: "group-a" });

  assert.deepEqual(aggregate.sessionIds, ["session-a", "session-b"]);
  assert.equal(aggregate.heatMaps.views.combined.position.sampleCount, 8);
  assert.deepEqual(
    new Set(aggregate.heatMaps.views.touch.path.segments.map((path) => path.sessionId)),
    new Set(["session-a", "session-b"]),
  );
});

test("preserves every generated analysis", async () => {
  const store = new InMemoryAnalysisGenerationStore();
  let generation = 0;
  const service = new FingerAnalysisService(store, {
    clock: () => new Date("2026-09-16T10:00:00.000Z"),
    idFactory: () => `generation-${++generation}`,
  });

  await service.process(session, { columns: 2, rows: 2 });
  await service.process(session, { columns: 2, rows: 2 });
  const saved = await store.list(session.id);

  assert.deepEqual(saved.map((entry) => entry.id), ["generation-1", "generation-2"]);
  assert.equal(saved[0].generatedAt, "2026-09-16T10:00:00.000Z");
});

test("rejects aggregation across mismatched grids", () => {
  const small = processFingerSession(session, { columns: 2, rows: 2 });
  const large = processFingerSession(session, { columns: 4, rows: 4 });
  assert.throws(() => aggregateSessionAnalyses([small, large]), /same heat-map grid/);
});

test("processes a valid empty capture as a zero-duration replay", () => {
  const result = processFingerSession({
    id: "empty",
    startedAt: "2026-09-16T10:00:00.000Z",
    events: [],
  });

  assert.equal(result.bounds.durationMs, 0);
  assert.deepEqual(result.replay.frames, []);
  assert.equal(result.heatMaps.views.combined.position.sampleCount, 0);
});

test("anchors browser-relative event timestamps to the capture start", () => {
  const result = processFingerSession({
    id: "relative",
    startedAt: "2026-09-16T10:00:00.000Z",
    endedAt: "2026-09-16T10:00:00.100Z",
    dom: { initial: "<main />", final: "<main>done</main>" },
    events: [
      { type: "pointerdown", timeStamp: 10, pointerType: "touch", normalizedX: 0.1, normalizedY: 0.1 },
      { type: "pointerup", timeStamp: 80, pointerType: "touch", normalizedX: 0.2, normalizedY: 0.2 },
    ],
  });

  assert.deepEqual(result.replay.frames.map((frame) => frame.offsetMs), [10, 80]);
  assert.equal(result.bounds.durationMs, 100);
  assert.equal(result.replay.initialDom, "<main />");
});

test("prefers collector elapsedMs over page-lifetime event timestamps", () => {
  const result = processFingerSession({
    id: "collector-relative",
    startedAt: "2026-09-16T10:00:00.000Z",
    endedAt: "2026-09-16T10:00:00.100Z",
    events: [
      { type: "pointerdown", elapsedMs: 5, eventTimestamp: 50000, pointerType: "touch", normalizedX: 0.1, normalizedY: 0.1 },
      { type: "pointerup", elapsedMs: 75, eventTimestamp: 50070, pointerType: "touch", normalizedX: 0.2, normalizedY: 0.2 },
    ],
  });
  assert.deepEqual(result.replay.frames.map((frame) => frame.offsetMs), [5, 75]);
});
