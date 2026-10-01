import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request as httpRequest } from 'node:http';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createPropagationHttpHandler, isLocalRequest, pilotEnabled } from '../src/propagation/http.js';

async function harness(t, timeoutMs = 5000) {
  const server = createServer(createPropagationHttpHandler({ timeoutMs }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}`;
  return { url, post: async body => {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: url }, body: JSON.stringify(body) });
    return { response, data: await response.json() };
  } };
}
function next(run, kind, payload = {}) { return { eventId: `e${run.events.length + 1}`, sequence: run.events.length + 1, propositionRevision: run.manifest.propositionRevision, previousEventId: run.events.at(-1)?.eventId ?? null, kind, payload }; }
test('local HTTP flow: create, observe, evaluate, annotate, replay, branch and hold', async t => {
  const { post } = await harness(t);
  let result = await post({ action: 'create', options: { runId: 'P', propositionRevision: 'v1' } });
  assert.equal(result.response.status, 200); assert.equal(result.response.headers.get('cache-control'), 'no-store');
  let p = result.data.run;
  result = await post({ action: 'append', run: p, event: next(p, 'OBSERVE', { D: '7', affirmative: '5' }) }); p = result.data.run;
  assert.equal(result.data.state.guardResult, null);
  result = await post({ action: 'append', run: p, event: next(p, 'EVALUATE') }); p = result.data.run;
  assert.equal(result.data.state.stage, 'completed');
  const targetDigest = result.data.eventDigests[0];
  result = await post({ action: 'append', run: p, event: next(p, 'NOTE_CORRECTED', { targetEventId: 'e1', targetSequence: 1, targetDigest, expectedPreviousCorrectionId: null, reason: 'Synthetic correction', text: 'Intended count was 4' }) }); p = result.data.run;
  assert.equal(result.data.state.guardResult.basis, 'historical-original-inputs');
  assert.equal((await post({ action: 'replay', run: p, prefix: 2 })).data.state.guardResult.basis, 'original-inputs');
  const original = JSON.stringify(p);
  result = await post({ action: 'fork', run: p, prefix: 0, options: { runId: 'Q', reason: 'Alternative', changeEventId: 'e1' } });
  let q = result.data.run; assert.equal(result.data.state.observation, null);
  result = await post({ action: 'append', run: q, event: next(q, 'OBSERVE', { D: '7', affirmative: '4' }) }); q = result.data.run;
  result = await post({ action: 'append', run: q, event: next(q, 'EVALUATE') }); q = result.data.run;
  assert.equal(result.data.state.stage, 'waiting');
  result = await post({ action: 'append', run: q, event: next(q, 'HOLD', { holdId: 'H' }) }); q = result.data.run;
  assert.equal(result.data.state.stage, 'held');
  result = await post({ action: 'append', run: q, event: next(q, 'RELEASE', { holdId: 'H' }) });
  assert.equal(result.data.state.stage, 'waiting'); assert.equal(JSON.stringify(p), original);
});
test('HTTP rejects cross-origin/proxy/Host/method/content-type and malformed requests', async t => {
  const { url, post } = await harness(t);
  for (const headers of [{ Origin: 'https://example.com' }, { Host: 'example.com' }, { 'Sec-Fetch-Site': 'cross-site' }, { Forwarded: 'for=127.0.0.1' }, { 'X-Forwarded-For': '127.0.0.1' }]) {
    const status = await new Promise((resolve, reject) => {
      const req = httpRequest(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers } }, response => { response.resume(); resolve(response.statusCode); });
      req.on('error', reject); req.end('{}');
    });
    assert.equal(status, 403, JSON.stringify(headers));
  }
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await fetch(url, { method: 'POST', body: '{}' })).status, 415);
  assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400);
  assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: Buffer.from([0xff]) })).status, 400);
  assert.equal((await post({ action: 'create', options: { runId: 'P', propositionRevision: 'v1' }, unknown: true })).response.status, 400);
  assert.equal((await post({ action: 'unknown' })).response.status, 400);
  assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: ' '.repeat(1048577) })).status, 413);
});
test('local boundary and startup policy reject remote peers and unsafe enablement', () => {
  assert.equal(pilotEnabled({}), false);
  for (const HOST of [undefined, '0.0.0.0', 'localhost', '::']) assert.throws(() => pilotEnabled({ PROPAGATION_PILOT: 'true', HOST }));
  for (const HOST of ['127.0.0.1', '::1']) assert.equal(pilotEnabled({ PROPAGATION_PILOT: 'true', HOST }), true);
  assert.equal(isLocalRequest({ socket: { remoteAddress: '192.0.2.1', localPort: 3000 }, headers: { host: 'localhost:3000' } }), false);
});
test('slow bodies time out without retaining server work', async t => {
  const { url } = await harness(t, 40);
  const status = await new Promise((resolve, reject) => {
    const req = httpRequest(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Transfer-Encoding': 'chunked' } }, response => { response.resume(); resolve(response.statusCode); req.destroy(); });
    req.on('error', error => { if (error.code !== 'ECONNRESET') reject(error); }); req.write('{');
  });
  assert.equal(status, 408);
});
async function launch(t, pilot) {
  const reservation = createServer(); await new Promise(resolve => reservation.listen(0, '127.0.0.1', resolve));
  const port = reservation.address().port; await new Promise(resolve => reservation.close(resolve));
  const dir = mkdtempSync(path.join(tmpdir(), 'jon24-http-test-'));
  const child = spawn(process.execPath, ['src/server.js'], { env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', PROPAGATION_PILOT: pilot ? 'true' : 'false', FINGER_ENABLED: 'false', FINGER_IDENTITY_SECRET: 'synthetic-test-only-secret', FINGER_DATA_DIR: dir, FINGER_DATABASE: path.join(dir, 'finger.sqlite'), FINGER_OBJECT_DIR: path.join(dir, 'objects') }, stdio: ['ignore', 'pipe', 'pipe'] });
  t.after(async () => { if (child.exitCode === null && child.signalCode === null) { const stopped = once(child, 'exit'); child.kill(); await stopped; } });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('server startup timeout')), 5000);
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`server exited ${code}`)); });
    child.stdout.on('data', chunk => { if (String(chunk).includes('listening')) { clearTimeout(timer); resolve(); } });
  });
  return `http://127.0.0.1:${port}`;
}
test('real server defaults API off; enabled local mount serves new page and original Finger', async t => {
  const off = await launch(t, false); assert.equal((await fetch(`${off}/api/propagation`, { method: 'POST' })).status, 404);
  const on = await launch(t, true);
  const home = await (await fetch(on)).text(); assert.match(home, /start-finger/); assert.match(home, /propagation.html/);
  const page = await (await fetch(`${on}/propagation.html`)).text(); assert.match(page, /Synthetic pilot/);
  for (const resource of ['propagation.js', 'propagation.css']) assert.equal((await fetch(`${on}/${resource}`)).status, 200);
  const response = await fetch(`${on}/api/propagation`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create', options: { runId: 'P', propositionRevision: 'v1' } }) });
  assert.equal(response.status, 200); assert.equal((await response.json()).state.stage, 'active');
  assert.equal((await (await fetch(`${on}/api/finger/config`)).json()).enabled, false);
});
test('page controls are bound; user text is rendered as text without persistence', () => {
  const html = readFileSync(new URL('../public/propagation.html', import.meta.url), 'utf8');
  const script = readFileSync(new URL('../public/propagation.js', import.meta.url), 'utf8');
  for (const match of script.matchAll(/\$\('([^']+)'\)/g)) assert.ok(html.includes(`id="${match[1]}"`), match[1]);
  assert.doesNotMatch(script, /innerHTML|localStorage|sessionStorage|indexedDB/);
});
