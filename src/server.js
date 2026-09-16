import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { loadConfig } from './finger/config.js';
import { initialize } from './finger/store.js';

const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

function json(response, status, value, headers = {}) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    ...headers,
  });
  response.end(JSON.stringify(value));
}

async function readJson(request, limit) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) {
      const error = new Error('Request body is too large');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Request body must be valid JSON');
    error.status = 400;
    throw error;
  }
}

function cookies(request) {
  return Object.fromEntries((request.headers.cookie ?? '').split(';').flatMap((entry) => {
    const split = entry.indexOf('=');
    if (split < 0) return [];
    return [[entry.slice(0, split).trim(), decodeURIComponent(entry.slice(split + 1).trim())]];
  }));
}

function actorIdentity(request, body) {
  const existing = cookies(request).finger_actor;
  const concordUser = request.headers['x-concord-user'];
  return {
    associationId: concordUser || body.associationId || body.actorId || existing || randomUUID(),
    userId: concordUser || body.userId || null,
    shouldSetCookie: !concordUser && !existing && !body.associationId && !body.actorId,
  };
}

function adminAllowed(request, token) {
  if (!token) return true;
  return request.headers.authorization === `Bearer ${token}`;
}

function routeMatch(pathname, expression) {
  const match = pathname.match(expression);
  return match ? match.slice(1).map(decodeURIComponent) : null;
}

function serveStatic(request, response, pathname) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  const requested = pathname === '/' ? '/index.html' : pathname;
  const candidate = path.resolve(PUBLIC_DIR, `.${requested}`);
  if (!candidate.startsWith(`${PUBLIC_DIR}${path.sep}`) || !existsSync(candidate) || !statSync(candidate).isFile()) return false;
  response.writeHead(200, {
    'content-type': MIME.get(path.extname(candidate)) ?? 'application/octet-stream',
    'cache-control': requested === '/index.html' ? 'no-store' : 'public, max-age=300',
  });
  if (request.method === 'HEAD') response.end();
  else createReadStream(candidate).pipe(response);
  return true;
}

export function createApp(options = {}) {
  const config = { ...loadConfig(), ...options.config };
  const store = options.store ?? initialize({
    dataDir: config.dataDir,
    fingerVersion: config.fingerVersion,
    concordVersion: config.concordVersion,
  });
  const adminToken = options.adminToken ?? process.env.FINGER_ADMIN_TOKEN;
  const onSummary = options.onSummary;

  const app = async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    try {
      if (request.method === 'GET' && url.pathname === '/health') {
        return json(response, 200, { ok: true, finger: config.enabled });
      }
      if (request.method === 'GET' && url.pathname === '/api/finger/config') {
        return json(response, 200, {
          enabled: config.enabled,
          fingerVersion: config.fingerVersion,
          concordVersion: config.concordVersion,
          contactMaxMs: 10_000,
          closeDelayMs: 3_000,
          postContinueMs: Number.parseInt(process.env.FINGER_POST_CONTINUE_MS ?? '0', 10),
        });
      }

      if (url.pathname.startsWith('/api/finger/') && !config.enabled) {
        return json(response, 404, { error: 'Finger is disabled' });
      }

      if (request.method === 'POST' && url.pathname === '/api/finger/sessions') {
        const body = await readJson(request, config.maxBodyBytes);
        const identity = actorIdentity(request, body);
        const session = await store.createSession({
          id: body.sessionId ? String(body.sessionId) : randomUUID(),
          associationId: String(identity.associationId),
          userId: identity.userId ? String(identity.userId) : null,
          actorId: String(identity.userId ?? identity.associationId),
          visitId: body.visitId ? String(body.visitId) : null,
          trigger: body.trigger ?? body.invocation ?? 'explicit',
          capabilities: body.capabilities ?? body.capability ?? {},
          initialDom: body.initialDom ?? null,
          startedAt: body.startedAt,
          fingerVersion: config.fingerVersion,
          concordVersion: config.concordVersion,
          context: {
            ...(body.metadata ?? {}),
            visitId: body.visitId ?? null,
            trigger: body.trigger ?? body.invocation ?? 'explicit',
            page: body.page ?? null,
          },
        });
        const headers = identity.shouldSetCookie
          ? { 'set-cookie': `finger_actor=${encodeURIComponent(identity.associationId)}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly` }
          : {};
        // The thin collector submits its entire capture with sendBeacon. Chunked
        // event and completion routes remain available to embedded integrations.
        if (Array.isArray(body.events)) {
          if (body.events.length) await store.appendEvents(session.id, body.events);
          await store.finalizeSession(session.id, {
            finalDom: body.finalDom ?? null,
            mutations: body.mutations ?? [],
            lifecycle: body.lifecycle ?? [],
            observedMaxContacts: body.observedMaxContacts ?? 0,
            endedAt: body.finishedAt,
            reason: body.lifecycle?.findLast?.((event) => event.type === 'scan-complete')?.reason ?? 'continue',
          });
          try { await store.generateAnalysis(session.id); } catch (error) { console.error('Finger analysis failed', error); }
          if (onSummary) Promise.resolve(onSummary(await store.getSession(session.id))).catch((error) => console.error('Finger Concord summary hook failed', error));
        }
        return json(response, 201, { sessionId: session.id }, headers);
      }

      let match = routeMatch(url.pathname, /^\/api\/finger\/sessions\/([^/]+)\/events$/);
      if (request.method === 'POST' && match) {
        const body = await readJson(request, config.maxBodyBytes);
        const result = await store.appendEvents(match[0], Array.isArray(body) ? body : body.events);
        return json(response, 202, { accepted: result.accepted ?? result });
      }

      match = routeMatch(url.pathname, /^\/api\/finger\/sessions\/([^/]+)\/complete$/);
      if (request.method === 'POST' && match) {
        const body = await readJson(request, config.maxBodyBytes);
        if (Array.isArray(body.events) && body.events.length) await store.appendEvents(match[0], body.events);
        const session = await store.finalizeSession(match[0], {
          finalDom: body.finalDom ?? null,
          mutations: body.mutations ?? [],
          observedMaxContacts: body.observedMaxContacts ?? 0,
          reason: body.reason ?? 'continue',
        });
        // Processing happens after durable raw storage. Failure is intentionally not
        // exposed to the person completing the admission interaction.
        try { await store.generateAnalysis(match[0]); } catch (error) { console.error('Finger analysis failed', error); }
        if (onSummary) {
          Promise.resolve(onSummary(await store.getSession(match[0]))).catch((error) => {
            console.error('Finger Concord summary hook failed', error);
          });
        }
        return json(response, 202, { sessionId: session.id, stored: true });
      }

      match = routeMatch(url.pathname, /^\/api\/finger\/sessions\/([^/]+)$/);
      if (request.method === 'GET' && match) {
        if (!adminAllowed(request, adminToken)) return json(response, 401, { error: 'Unauthorized' });
        const session = await store.getSession(match[0]);
        return session ? json(response, 200, session) : json(response, 404, { error: 'Session not found' });
      }

      match = routeMatch(url.pathname, /^\/api\/finger\/sessions\/([^/]+)\/artifacts\/([^/]+)$/);
      if (request.method === 'GET' && match) {
        if (!adminAllowed(request, adminToken)) return json(response, 401, { error: 'Unauthorized' });
        const artifact = await store.getArtifact(match[1]);
        if (!artifact) return json(response, 404, { error: 'Artifact not found' });
        if (artifact.sessionId !== match[0]) return json(response, 404, { error: 'Artifact not found' });
        return json(response, 200, artifact.value ?? JSON.parse(Buffer.from(artifact.data).toString('utf8')));
      }

      match = routeMatch(url.pathname, /^\/api\/finger\/actors\/([^/]+)\/history$/);
      if (request.method === 'GET' && match) {
        if (!adminAllowed(request, adminToken)) return json(response, 401, { error: 'Unauthorized' });
        return json(response, 200, { actorId: match[0], sessions: await store.getHistory({ associationId: match[0] }) });
      }

      match = routeMatch(url.pathname, /^\/api\/finger\/users\/([^/]+)\/(?:history|sessions)$/);
      if (request.method === 'GET' && match) {
        if (!adminAllowed(request, adminToken)) return json(response, 401, { error: 'Unauthorized' });
        return json(response, 200, { userId: match[0], sessions: await store.getHistory({ userId: match[0] }) });
      }

      if (request.method === 'POST' && url.pathname === '/api/finger/admin/compare') {
        if (!adminAllowed(request, adminToken)) return json(response, 401, { error: 'Unauthorized' });
        const body = await readJson(request, config.maxBodyBytes);
        const subjects = Array.isArray(body.subjects)
          ? body.subjects.slice(0, 20)
          : Array.isArray(body.userIds)
            ? body.userIds.slice(0, 20).map((userId) => ({ userId: String(userId) }))
            : Array.isArray(body.actorIds)
              ? body.actorIds.slice(0, 20).map((associationId) => ({ associationId: String(associationId) }))
              : [];
        if (subjects.length < 2) return json(response, 400, { error: 'At least two subjects are required' });
        return json(response, 200, await store.compareHistories(subjects));
      }

      if (serveStatic(request, response, url.pathname)) return;
      return json(response, 404, { error: 'Not found' });
    } catch (error) {
      const status = Number.isInteger(error.status) ? error.status : 500;
      if (status >= 500) console.error(error);
      return json(response, status, { error: status >= 500 ? 'Internal server error' : error.message });
    }
  };
  app.store = store;
  app.config = config;
  return app;
}

export function startServer(options = {}) {
  const app = createApp(options);
  const server = createServer(app);
  server.listen(app.config.port, () => console.log(`Concord Finger listening on http://localhost:${app.config.port}`));
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) startServer();
