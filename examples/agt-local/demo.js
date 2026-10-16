import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createFixture } from './fixture.js';

const directory = mkdtempSync(join(tmpdir(), 'concord-governance-demo-'));
const fixture = await createFixture(directory);
try {
  const action = fixture.signed(fixture.request());
  console.log('Approved:', await fixture.runtime.admit(action));
  fixture.collector.setAvailable(false);
  console.log('Collector offline:', fixture.runtime.resume('operation-1').status);
  console.log('Record unchanged:', fixture.runtime.record('sample/one'));
  fixture.runtime.revoke('agent-1');
  fixture.advance(120_000);
  await fixture.restart();
  console.log('Approved work survived revocation, expiry and restart.');
  fixture.collector.setAvailable(true);
  console.log('Collector restored:', fixture.runtime.resume('operation-1').status);
  fixture.runtime.resume('operation-1');
  console.log('One committed effect:', fixture.runtime.record('sample/one'));
  console.log('Durable collector receipts:', fixture.collector.entries().length);
  console.log('Synthetic databases:', directory);
} finally { fixture.close(); }
