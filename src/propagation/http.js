import { createRun, replayPrefix, appendEvent, forkScenario, digest } from './index.js';
import { copy, keys, LIMITS } from './contracts.js';

export function pilotEnabled(environment) {
  if (environment.PROPAGATION_PILOT !== 'true') return false;
  if (!['127.0.0.1', '::1'].includes(environment.HOST)) throw new Error('Propagation pilot requires HOST=127.0.0.1 or HOST=::1');
  return true;
}
export function isLocalRequest(request) {
  const address = request.socket.remoteAddress;
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address)) return false;
  if (Object.keys(request.headers).some(k => k === 'forwarded' || k.startsWith('x-forwarded-'))) return false;
  const allowedHosts = [`127.0.0.1:${request.socket.localPort}`, `localhost:${request.socket.localPort}`, `[::1]:${request.socket.localPort}`];
  if (!allowedHosts.includes(request.headers.host)) return false;
  if (request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) return false;
  if (request.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(request.headers['sec-fetch-site'])) return false;
  return true;
}
function requestError(status) { return Object.assign(new Error('Invalid simulation request.'), { status }); }
function readBody(request, timeoutMs) {
  return new Promise((resolve, reject) => {
    let size = 0, finished = false; const chunks = [];
    const finish = (error, body) => {
      if (finished) return; finished = true; clearTimeout(timer);
      request.removeListener('data', data); request.removeListener('end', end);
      // Keep error/aborted listeners until the stream closes so disconnects after
      // a size limit or timeout cannot become unhandled stream errors.
      if (error) { request.resume(); reject(error); } else resolve(body);
    };
    const data = chunk => { size += chunk.length; if (size > LIMITS.bytes) finish(requestError(413)); else chunks.push(chunk); };
    const end = () => finish(null, Buffer.concat(chunks));
    const failed = () => finish(requestError(400)); const aborted = () => finish(requestError(400));
    const timer = setTimeout(() => finish(requestError(408)), timeoutMs);
    request.on('data', data); request.once('end', end); request.once('error', failed); request.once('aborted', aborted);
  });
}
export function processAction(input) {
  const body = copy(input);
  let run, prefix;
  switch (body.action) {
    case 'create': keys(body, ['action', 'options']); run = createRun(body.options); break;
    case 'replay': keys(body, ['action', 'run', 'prefix']); run = body.run; prefix = body.prefix; break;
    case 'append': keys(body, ['action', 'run', 'event']); run = appendEvent(body.run, body.event); break;
    case 'fork': keys(body, ['action', 'run', 'prefix', 'options']); run = forkScenario(body.run, body.prefix, body.options); break;
    default: throw requestError(400);
  }
  const state = replayPrefix(run, prefix);
  return { run, state, prefix: prefix ?? run.events.length, eventDigests: run.events.map(event => digest(event)) };
}
export function createPropagationHttpHandler({ timeoutMs = 5000 } = {}) {
  return async function propagationHandler(request, response) {
    const send = (status, value) => {
      if (response.destroyed) return;
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Connection': 'close' });
      response.end(JSON.stringify(value));
    };
    if (!isLocalRequest(request)) { request.resume(); send(403, { error: 'This simulation is available only in the direct local preview.' }); return; }
    if (request.method !== 'POST') { request.resume(); send(405, { error: 'Use POST.' }); return; }
    if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers['content-type'] ?? '')) { request.resume(); send(415, { error: 'JSON is required.' }); return; }
    if (Number(request.headers['content-length'] ?? 0) > LIMITS.bytes) { request.resume(); send(413, { error: 'Simulation exceeds the request size limit.' }); return; }
    try {
      const raw = await readBody(request, timeoutMs);
      const body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(raw));
      send(200, processAction(body));
    } catch (error) {
      send([408, 413].includes(error.status) ? error.status : 400, { error: 'Invalid simulation request. Check the selected event, inputs, and replay position.' });
    }
  };
}
