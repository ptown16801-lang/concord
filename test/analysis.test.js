import assert from 'node:assert/strict';
import test from 'node:test';

import { analyzeSession, generateHeatMaps, generateReplay } from '../src/finger/analysis.js';

test('replay preserves raw events in capture-time order and DOM context', () => {
  const late = { type: 'pointerup', pointerType: 'touch', timestamp: 250 };
  const early = { type: 'pointerdown', pointerType: 'touch', timestamp: 100 };
  const replay = generateReplay([late, early], {
    viewport: { width: 400, height: 800 },
    initialDom: '<main>Before</main>',
    finalDom: '<main>After</main>',
  });

  assert.equal(replay.durationMs, 150);
  assert.deepEqual(replay.frames, [
    { offsetMs: 0, event: early },
    { offsetMs: 150, event: late },
  ]);
  assert.equal(replay.initialDom, '<main>Before</main>');
  assert.equal(replay.finalDom, '<main>After</main>');
});

test('heat maps separate input types and provide a combined position, path, and dwell view', () => {
  const heatMaps = generateHeatMaps([
    { type: 'pointerdown', pointerType: 'touch', pointerId: 1, timestamp: 10, clientX: 20, clientY: 40 },
    { type: 'pointermove', pointerType: 'touch', pointerId: 1, timestamp: 60, clientX: 40, clientY: 80 },
    { type: 'pointerdown', pointerType: 'pen', pointerId: 2, timestamp: 70, clientX: 50, clientY: 100 },
    { type: 'mousemove', timestamp: 80, clientX: 10, clientY: 20 },
  ], { viewport: { width: 100, height: 200 } });

  assert.equal(heatMaps.maps.touch.positions.length, 2);
  assert.equal(heatMaps.maps.touch.paths.length, 1);
  assert.equal(heatMaps.maps.touch.totalDwellMs, 50);
  assert.equal(heatMaps.maps.touch.positions[1].normalizedX, 0.4);
  assert.equal(heatMaps.maps.touch.positions[1].normalizedY, 0.4);
  assert.equal(heatMaps.maps.stylus.positions.length, 1);
  assert.equal(heatMaps.maps.mouse.positions.length, 1);
  assert.equal(heatMaps.maps.combined.positions.length, 4);
  assert.equal(heatMaps.maps.combined.paths.length, 1);
});

test('multi-touch contacts keep independent paths', () => {
  const { maps } = generateHeatMaps([
    { type: 'touchstart', identifier: 1, timestamp: 0, x: 0, y: 0 },
    { type: 'touchstart', identifier: 2, timestamp: 1, x: 100, y: 100 },
    { type: 'touchmove', identifier: 1, timestamp: 2, x: 10, y: 10 },
    { type: 'touchmove', identifier: 2, timestamp: 3, x: 90, y: 90 },
  ]);

  assert.equal(maps.touch.positions.length, 4);
  assert.equal(maps.touch.paths.length, 2);
  assert.deepEqual(maps.touch.paths.map((path) => path.pointerId), ['1', '2']);
});

test('analysis always emits replay and all heat-map views for an empty capture', () => {
  const output = analyzeSession([]);
  assert.equal(output.replay.durationMs, 0);
  assert.deepEqual(Object.keys(output.heatMaps.maps), ['touch', 'mouse', 'stylus', 'combined']);
});
