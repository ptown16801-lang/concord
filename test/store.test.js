import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { FingerStore } from '../src/finger/store.js';

test('raw source remains readable and analysis generations are immutable', async (context) => {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'concord-finger-store-'));
  const store = await new FingerStore({
    dataDir,
    fingerVersion: '1.2.3-test',
    concordVersion: 'concord-test-build',
  }).initialize();
  context.after(async () => {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  const created = await store.createSession({
    id: 'session-1',
    associationId: 'actor-1',
    userId: 'user-1',
    capabilities: { maxTouchPoints: 2 },
    context: { viewport: { width: 200, height: 400 } },
    initialDom: '<main>Initial</main>',
  });
  assert.equal(created.fingerVersion, '1.2.3-test');
  assert.equal(created.concordVersion, 'concord-test-build');

  const events = [
    { type: 'pointerdown', pointerType: 'touch', pointerId: 1, timestamp: 0, clientX: 10, clientY: 20 },
    { type: 'pointermove', pointerType: 'touch', pointerId: 1, timestamp: 20, clientX: 20, clientY: 40 },
  ];
  await store.appendEvents(created.id, events);
  await store.finalizeSession(created.id, { finalDom: '<main>Final</main>' });

  const source = store.getSession(created.id, { includeEvents: true });
  assert.deepEqual(source.events, events);
  assert.equal(source.status, 'completed');
  assert.equal(source.summary.eventCount, 2);

  const first = await store.generateAnalysis(created.id, { algorithmVersion: 'test-1' });
  const second = await store.generateAnalysis(created.id, { algorithmVersion: 'test-2' });
  assert.equal(first.generation, 1);
  assert.equal(second.generation, 2);
  assert.notEqual(first.replayArtifactId, second.replayArtifactId);

  const persisted = store.getSession(created.id);
  assert.deepEqual(persisted.analyses.map((analysis) => analysis.generation), [2, 1]);
  const replay = await store.getArtifact(first.replayArtifactId);
  assert.equal(replay.kind, 'replay');
  assert.equal(replay.value.frames.length, 2);

  assert.equal(store.getHistory({ associationId: 'actor-1' })[0].id, created.id);
});
