import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { assertCompatibleNode } from "./runtime-preflight.mjs";

const preflight = fileURLToPath(new URL("./runtime-preflight.mjs", import.meta.url));
const repository = fileURLToPath(new URL("../../", import.meta.url));

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function temporaryDirectory(t) {
  const directory = mkdtempSync(join(tmpdir(), "concord-runtime-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function runPreflight(cwd, options = {}) {
  return spawnSync(process.execPath, [preflight], { cwd, encoding: "utf8", ...options });
}

test("accepts Node >=22.5 including Node 24 without a saved default", () => {
  for (const version of ["22.5.0", "22.23.2", "23.0.0", "24.0.0", "24.21.0", "25.0.0"]) {
    assert.doesNotThrow(() => assertCompatibleNode(version));
  }
});

test("rejects incompatible or unparseable runtimes with an actionable error", () => {
  for (const version of ["20.19.0", "21.7.3", "22.0.0", "22.4.1"]) {
    assert.throws(
      () => assertCompatibleNode(version),
      /Node\.js 22\.5\.0 or newer is required;.*Use a compatible Node\.js runtime and retry\./u,
    );
  }
  assert.throws(() => assertCompatibleNode("unknown"), /Unable to parse Node\.js version/u);
});

test("reports the actual runtime, SQLite query, branch, and exact HEAD as JSON", () => {
  const result = runPreflight(repository);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    status: "ok",
    nodeVersion: process.version,
    runtimePath: process.execPath,
    git: {
      branch: git(repository, "branch", "--show-current"),
      head: git(repository, "rev-parse", "HEAD"),
    },
    sqlite: { database: ":memory:", queryVerified: true },
  });
});

test("supports detached checkouts without leaking secrets or remote URLs or writing runtime files", (t) => {
  const directory = temporaryDirectory(t);
  git(repository, "clone", "--quiet", "--shared", "--no-checkout", repository, directory);
  const head = git(directory, "rev-parse", "HEAD");
  git(directory, "update-ref", "--no-deref", "HEAD", head);
  const remote = "https://sentinel-user:sentinel-password@example.invalid/private.git";
  git(directory, "remote", "set-url", "origin", remote);
  const secret = "preflight-secret-must-not-appear";

  const result = runPreflight(directory, { env: { ...process.env, FINGER_IDENTITY_SECRET: secret } });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).git, { branch: "", head });
  for (const value of [remote, "sentinel-password", secret, "FINGER_IDENTITY_SECRET"]) {
    assert.equal(`${result.stdout}${result.stderr}`.includes(value), false);
  }
  assert.deepEqual(readdirSync(directory), [".git"]);
});

test("returns a JSON error outside a Git checkout without leaking environment values", (t) => {
  const directory = temporaryDirectory(t);
  const secret = "failure-secret-must-not-appear";
  const result = runPreflight(directory, {
    env: { ...process.env, NODE_NO_WARNINGS: "1", FINGER_IDENTITY_SECRET: secret },
  });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.deepEqual(JSON.parse(result.stderr), {
    status: "error",
    message: "Unable to read the Git branch. Run this preflight inside a Git checkout.",
  });
  assert.equal(result.stderr.includes(secret), false);
  assert.deepEqual(readdirSync(directory), []);
});

test("fails when a checkout has no HEAD commit", (t) => {
  const directory = temporaryDirectory(t);
  git(directory, "init", "--quiet");
  const result = runPreflight(directory, { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.deepEqual(JSON.parse(result.stderr), {
    status: "error",
    message: "Unable to read the Git HEAD. Run this preflight inside a Git checkout.",
  });
});

test("fails with a safe JSON error when node:sqlite is unavailable", () => {
  const result = spawnSync(process.execPath, ["--no-experimental-sqlite", preflight], {
    cwd: repository,
    encoding: "utf8",
  });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.deepEqual(JSON.parse(result.stderr), {
    status: "error",
    message: "The in-memory node:sqlite compatibility check failed.",
  });
});
