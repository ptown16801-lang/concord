import test from "node:test";
import assert from "node:assert/strict";
import { buildAdvisorInput, sameProject, selectedAdvisorRoles, validateMutationContent, validatePlanningChild } from "../lib/regime.mjs";

test("advisor roles are bounded and deduplicated", () => {
  assert.deepEqual(selectedAdvisorRoles("context_reconciler,context_reconciler,boundary_reviewer"), ["context_reconciler", "boundary_reviewer"]);
  assert.throws(() => selectedAdvisorRoles("unknown"), /Unknown advisory/);
  assert.throws(() => selectedAdvisorRoles("context_reconciler,work_breakdown_advisor,boundary_reviewer,unknown"), /At most three/);
});

test("advisor input labels untrusted context and truncates", () => {
  const input = buildAdvisorInput("context_reconciler", { agentActivity: { body: "x".repeat(200) } }, { id: "i1" }, 120);
  assert.match(input, /Advisory role: context_reconciler/);
  assert.match(input, /context truncated/);
});

test("planning children exclude execution and quiz categories", () => {
  assert.doesNotThrow(() => validatePlanningChild({ work_kind: "planning", title: "Map dependencies" }));
  assert.throws(() => validatePlanningChild({ work_kind: "coding", title: "Implement" }), /limited to planning/);
  assert.throws(() => validateMutationContent({ body: "Create a quiz" }), /Quiz work/);
});

test("target authorization requires the current project", () => {
  assert.equal(sameProject({ project: { id: "p1" } }, { project: { id: "p1" } }), true);
  assert.equal(sameProject({ project: { id: "p2" } }, { project: { id: "p1" } }), false);
  assert.equal(sameProject({ project: null }, { project: { id: "p1" } }), false);
});
