import test from "node:test";
import assert from "node:assert/strict";
import { safeLogFields } from "../lib/observability.mjs";

test("observability metadata excludes content and secrets", () => {
  assert.deepEqual(safeLogFields({
    assignmentId: "a1",
    role: "boundary_reviewer",
    prompt: "private issue body",
    token: "secret",
    result: "private response"
  }), {
    assignmentId: "a1",
    role: "boundary_reviewer"
  });
});
