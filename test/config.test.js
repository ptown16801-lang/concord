import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { loadConfig } from '../src/finger/config.js';

test('Finger is enabled by default with safe development defaults', () => {
  const config = loadConfig({});

  assert.equal(config.enabled, true);
  assert.equal(config.port, 3000);
  assert.equal(config.dataDir, path.resolve('.finger-data'));
  assert.equal(config.concordVersion, 'development');
  assert.match(config.fingerVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(config.maxBodyBytes, 10 * 1024 * 1024);
});

test('Finger can be disabled and configured entirely through the environment', () => {
  const config = loadConfig({
    FINGER_ENABLED: 'false',
    PORT: '4312',
    FINGER_DATA_DIR: './tmp/finger-fixture',
    CONCORD_VERSION: 'concord-test-build',
    FINGER_MAX_BODY_BYTES: '2048',
  });

  assert.equal(config.enabled, false);
  assert.equal(config.port, 4312);
  assert.equal(config.dataDir, path.resolve('./tmp/finger-fixture'));
  assert.equal(config.concordVersion, 'concord-test-build');
  assert.equal(config.maxBodyBytes, 2048);
});

test('GIT_SHA is used as the Concord build when no explicit version is set', () => {
  assert.equal(loadConfig({ GIT_SHA: 'abc1234' }).concordVersion, 'abc1234');
});
