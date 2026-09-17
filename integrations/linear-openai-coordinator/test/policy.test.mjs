import test from "node:test";
import assert from "node:assert/strict";
import { buildAgentInput, isProjectAllowed } from "../lib/policy.mjs";

test("project allowlist accepts Concord and rejects another project", () => {
  const payload = { agentSession: { issue: { project: { name: "Concord" } } } };
  assert.equal(isProjectAllowed(payload, "Concord,Vote"), true);
  assert.equal(isProjectAllowed(payload, "Other"), false);
});

test("project allowlist fails closed when unset", () => {
  assert.equal(isProjectAllowed({}, ""), false);
});

test("buildAgentInput includes prompt and truncates", () => {
  const payload = { action: "prompted", agentSession: { id: "s1", issue: { identifier: "JON-1", title: "Test" } }, agentActivity: { body: "Proceed" }, promptContext: "x".repeat(200) };
  const text = buildAgentInput(payload, 100);
  assert.match(text, /Linear AgentSession action: prompted/);
  assert.equal(text.length > 100, true);
  assert.match(text, /context truncated/);
});
