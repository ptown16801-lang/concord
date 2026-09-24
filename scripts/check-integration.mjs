import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import * as governance from 'concord/governance';
import * as population from 'concord/population';
import * as electorate from 'concord/governance/electorate';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('config/integration-pins.json', root)));
for (const [path, pin] of Object.entries(manifest.pins)) {
  const actual = createHash('sha256').update(await readFile(new URL(path, root))).digest('hex');
  assert.equal(actual, pin.sha256, `${path}: incompatible dependency replacement; reconcile JON-85's pinned adapter before updating ${pin.commit}`);
}
for (const name of ['EligibilityRegistry', 'DurableEligibility', 'ImpeachmentStore', 'BootstrapImpeachmentService', 'BallotBox']) {
  assert.equal(typeof governance[name], 'function', `Missing combined governance export: ${name}`);
}
assert.equal(typeof population.PopulationRegistry, 'function');
assert.equal(electorate.thresholdPasses('twoThirds', 2, 3), true);
// Exercise the reducer interface required by DurableEligibility, not a second log.
const reducer = new governance.EligibilityRegistry({ clock: () => new Date('2000-01-01T00:00:00Z') });
reducer.applyBatch([{ type: governance.EligibilityEventType.IDENTITY_REGISTERED, identityId: 'synthetic-integration' }]);
assert.equal(reducer.stateAt('synthetic-integration').living, true);
console.log('PASS pinned reducer, population source and combined package exports');
