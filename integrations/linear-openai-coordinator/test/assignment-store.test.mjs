import test from "node:test";
import assert from "node:assert/strict";
import { AssignmentStore, assignmentEventId } from "../lib/assignment-store.mjs";

class FakeRedis {
  values = new Map();

  async get(key) { return this.values.get(key) || null; }
  async set(key, value, options = {}) {
    if (options.nx && this.values.has(key)) return null;
    this.values.set(key, value);
    return "OK";
  }
  async del(key) { return this.values.delete(key) ? 1 : 0; }
}

test("assignment event IDs prefer webhook IDs and require stable prompted activity IDs", () => {
  assert.equal(assignmentEventId({ webhookId: "w1" }), "webhook:w1");
  assert.equal(assignmentEventId({ action: "created", agentSession: { id: "s1" } }), "session:s1:created");
  assert.equal(assignmentEventId({ action: "prompted", agentActivity: { id: "a1" } }), "activity:a1");
  assert.equal(assignmentEventId({ action: "prompted", agentSession: { id: "s1" } }), null);
});

test("assignment store admits one writer and reuses terminal state", async () => {
  const store = new AssignmentStore(new FakeRedis(), 3600);
  assert.deepEqual(await store.claim("webhook:w1", { sessionId: "s1" }), { claimed: true, state: "running" });
  assert.deepEqual(await store.claim("webhook:w1", { sessionId: "s1" }), { claimed: false, state: "running" });
  await store.finish("webhook:w1", "completed");
  assert.deepEqual(await store.claim("webhook:w1", { sessionId: "s1" }), { claimed: false, state: "completed" });
});
