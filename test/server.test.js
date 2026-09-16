import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import test from 'node:test';

import { createApp } from '../src/server.js';

function memoryStore() {
  const sessions = new Map();
  return {
    analyses: [],
    appended: [],
    createSession(session) {
      sessions.set(session.id, { ...session, events: [] });
      return session;
    },
    appendEvents(id, events) {
      const values = Array.isArray(events) ? events : [];
      this.appended.push({ id, events: values });
      sessions.get(id)?.events.push(...values);
      return values.length;
    },
    finalizeSession(id, completion) {
      Object.assign(sessions.get(id), completion, { status: 'complete' });
      return sessions.get(id);
    },
    generateAnalysis(id) {
      this.analyses.push(id);
    },
    getSession(id) {
      return sessions.get(id) ?? null;
    },
    getHistory(actorId) {
      return [...sessions.values()].filter((session) => session.actorId === actorId);
    },
    compareHistories(actorIds) {
      return { actors: actorIds.map((actorId) => ({ actorId, sessions: this.getHistory(actorId) })) };
    },
    getArtifact() {
      return null;
    },
  };
}

async function withApp(options, run) {
  const app = createApp(options);
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  try {
    await run({ app, baseUrl: `http://127.0.0.1:${address.port}` });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

function testConfig(overrides = {}) {
  return {
    enabled: true,
    port: 0,
    dataDir: '.finger-test-unused',
    maxBodyBytes: 1024 * 1024,
    fingerVersion: '9.8.7-test',
    concordVersion: 'concord-contract-test',
    ...overrides,
  };
}

test('disabled Finger reports its state and rejects collection routes', async () => {
  await withApp({ config: testConfig({ enabled: false }), store: memoryStore() }, async ({ baseUrl }) => {
    const configResponse = await fetch(`${baseUrl}/api/finger/config`);
    assert.equal(configResponse.status, 200);
    assert.equal((await configResponse.json()).enabled, false);

    const collectionResponse = await fetch(`${baseUrl}/api/finger/sessions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    });
    assert.equal(collectionResponse.status, 404);
  });
});

test('session creation stamps server versions and preserves Concord identity hooks', async () => {
  const store = memoryStore();
  await withApp({ config: testConfig(), store }, async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/finger/sessions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-concord-user': 'user-42',
      },
      body: JSON.stringify({
        associationId: 'browser-association-9',
        visitId: 'visit-7',
        trigger: 'login',
        capabilities: { maxTouchPoints: 5 },
        initialDom: '<main>Login</main>',
      }),
    });

    assert.equal(response.status, 201);
    assert.equal(response.headers.get('set-cookie'), null);
    const { sessionId } = await response.json();
    const session = store.getSession(sessionId);
    assert.equal(session.userId, 'user-42');
    assert.equal(session.associationId, 'user-42');
    assert.equal(session.visitId, 'visit-7');
    assert.equal(session.trigger, 'login');
    assert.deepEqual(session.capabilities, { maxTouchPoints: 5 });
    assert.equal(session.fingerVersion, '9.8.7-test');
    assert.equal(session.concordVersion, 'concord-contract-test');
  });
});

test('anonymous association cookie is reusable across repeated sessions', async () => {
  const store = memoryStore();
  await withApp({ config: testConfig(), store }, async ({ baseUrl }) => {
    const first = await fetch(`${baseUrl}/api/finger/sessions`, { method: 'POST', body: '{}' });
    const cookie = first.headers.get('set-cookie');
    assert.match(cookie, /^finger_actor=[^;]+;/);
    assert.match(cookie, /HttpOnly/);

    const second = await fetch(`${baseUrl}/api/finger/sessions`, {
      method: 'POST',
      headers: { cookie: cookie.split(';', 1)[0] },
      body: '{}',
    });
    const firstSession = store.getSession((await first.json()).sessionId);
    const secondSession = store.getSession((await second.json()).sessionId);
    assert.notEqual(firstSession.id, secondSession.id);
    assert.equal(firstSession.actorId, secondSession.actorId);
  });
});

test('raw events are appended and completion triggers server-side analysis', async () => {
  const store = memoryStore();
  await withApp({ config: testConfig(), store }, async ({ baseUrl }) => {
    const created = await fetch(`${baseUrl}/api/finger/sessions`, { method: 'POST', body: '{}' });
    const { sessionId } = await created.json();
    const pointerEvent = { type: 'pointermove', t: 18, x: 100, normalizedX: 0.25 };

    const events = await fetch(`${baseUrl}/api/finger/sessions/${sessionId}/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ events: [pointerEvent] }),
    });
    assert.equal(events.status, 202);
    assert.deepEqual(await events.json(), { accepted: 1 });

    const completed = await fetch(`${baseUrl}/api/finger/sessions/${sessionId}/complete`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        events: [{ type: 'close', t: 100 }],
        finalDom: '<main>Continue</main>',
        mutations: [{ type: 'childList', t: 99 }],
        observedMaxContacts: 2,
        reason: 'continue',
      }),
    });

    assert.equal(completed.status, 202);
    assert.deepEqual(await completed.json(), { sessionId, stored: true });
    assert.deepEqual(store.getSession(sessionId).events, [pointerEvent, { type: 'close', t: 100 }]);
    assert.equal(store.getSession(sessionId).observedMaxContacts, 2);
    assert.deepEqual(store.analyses, [sessionId]);
  });
});

test('admin reads require the configured bearer token', async () => {
  const store = memoryStore();
  await withApp({ config: testConfig(), store, adminToken: 'admin-secret' }, async ({ baseUrl }) => {
    const created = await fetch(`${baseUrl}/api/finger/sessions`, {
      method: 'POST',
      headers: { 'x-concord-user': 'user-42' },
      body: '{}',
    });
    const { sessionId } = await created.json();

    assert.equal((await fetch(`${baseUrl}/api/finger/sessions/${sessionId}`)).status, 401);
    const authorized = await fetch(`${baseUrl}/api/finger/sessions/${sessionId}`, {
      headers: { authorization: 'Bearer admin-secret' },
    });
    assert.equal(authorized.status, 200);
    assert.equal((await authorized.json()).userId, 'user-42');
  });
});

test('malformed and oversized JSON receive bounded client errors', async () => {
  await withApp({ config: testConfig({ maxBodyBytes: 8 }), store: memoryStore() }, async ({ baseUrl }) => {
    const malformed = await fetch(`${baseUrl}/api/finger/sessions`, { method: 'POST', body: '{nope' });
    assert.equal(malformed.status, 400);

    const oversized = await fetch(`${baseUrl}/api/finger/sessions`, { method: 'POST', body: JSON.stringify({ long: 'value' }) });
    assert.equal(oversized.status, 413);
  });
});
