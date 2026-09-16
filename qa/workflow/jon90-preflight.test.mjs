import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

import { assertCompatibleNode } from "./jon90-preflight.mjs";

test("accepts the supported Node runtime range", () => {
  assert.doesNotThrow(() => assertCompatibleNode("22.5.0"));
  assert.doesNotThrow(() => assertCompatibleNode("24.0.0"));
});

test("rejects an incompatible Node runtime with an actionable error", () => {
  assert.throws(
    () => assertCompatibleNode("22.4.1"),
    /Node\.js 22\.5\.0 or newer is required; found 22\.4\.1\. Select the Concord Node 22 runtime and retry\./u,
  );
});

test("reports successful SQLite and Git checks as JSON", () => {
  const output = execFileSync(process.execPath, ["qa/workflow/jon90-preflight.mjs"], {
    encoding: "utf8",
  });
  const report = JSON.parse(output);

  assert.equal(report.status, "ok");
  assert.equal(report.nodeVersion, process.version);
  assert.equal(report.runtimePath, process.execPath);
  assert.equal(report.git.branch, execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim());
  assert.match(report.git.head, /^[0-9a-f]{40}$/u);
  assert.deepEqual(report.sqlite, {
    database: ":memory:",
    queryVerified: true,
  });
});
