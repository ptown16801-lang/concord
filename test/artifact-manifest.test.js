import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { validateArtifactManifest, verifyArtifactManifest } from "../src/archive/artifact-manifest.js";

const bytes = Buffer.from("Concord reference artifact\n");
const digest = createHash("sha256").update(bytes).digest("hex");
function entry(overrides = {}) {
  return { id: "build-report", filename: "report.txt", localPath: "report.txt",
    canonicalLocation: "https://example.invalid/archive/report", provenance: "synthetic test fixture",
    sha256: digest, byteLength: bytes.length, delivery: { status: "prepared" }, ...overrides };
}
function manifest(...artifacts) { return { schemaVersion: 1, artifacts }; }
async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "concord-artifact-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const rootDirectory = path.join(directory, "artifacts");
  await mkdir(rootDirectory);
  await writeFile(path.join(rootDirectory, "report.txt"), bytes);
  return { directory, rootDirectory };
}

test("hashes bytes without changing source, manifest, or recorded delivery", async (t) => {
  const options = await fixture(t);
  const input = manifest(entry({ sha256: digest.toUpperCase() }));
  const snapshot = structuredClone(input);
  const report = await verifyArtifactManifest(input, options);
  assert.equal(report.ok, true);
  assert.equal(report.artifacts[0].status, "verified");
  assert.equal(report.artifacts[0].actualSha256, digest);
  assert.equal(report.artifacts[0].recordedDelivery.status, "prepared");
  report.artifacts[0].recordedDelivery.status = "pending";
  assert.deepEqual(input, snapshot);
  assert.deepEqual(await readFile(path.join(options.rootDirectory, "report.txt")), bytes);
});

test("reports mixed results independently, including recorded delivery with missing bytes", async (t) => {
  const options = await fixture(t);
  await mkdir(path.join(options.rootDirectory, "folder"));
  const report = await verifyArtifactManifest(manifest(
    entry(),
    entry({ id: "wrong-hash", sha256: "0".repeat(64) }),
    entry({ id: "wrong-size", byteLength: 1 }),
    entry({ id: "missing", localPath: "missing.txt", delivery: { status: "delivered", evidence: "historical upload receipt" } }),
    entry({ id: "remote-only", localPath: undefined }),
    entry({ id: "directory", localPath: "folder" }),
  ), options);
  assert.equal(report.ok, false);
  assert.deepEqual(report.artifacts.map((row) => row.status), ["verified", "mismatch", "mismatch", "unavailable", "unavailable", "error"]);
  assert.equal(report.artifacts[3].reason, "missing-file");
  assert.equal(report.artifacts[3].recordedDelivery.status, "delivered");
  assert.equal(report.artifacts[4].reason, "no-local-path");
  assert.equal(report.artifacts[5].reason, "not-regular-file");
});

test("rejects malformed manifests, duplicate identities, and unsupported delivery claims", () => {
  for (const input of [null, {}, { schemaVersion: 2, artifacts: [] }, manifest(null),
    manifest(entry(), entry()), manifest(entry({ sha256: "invalid" })),
    manifest(entry({ provenance: " " })), manifest(entry({ byteLength: -1 })),
    manifest(entry({ byteLength: 1.5 })), manifest(entry({ delivery: { status: "uploaded" } })),
    manifest(entry({ delivery: { status: "delivered" } }))]) {
    assert.throws(() => validateArtifactManifest(input), TypeError);
  }
});

test("rejects traversal and absolute paths before reading files", async (t) => {
  const options = await fixture(t);
  for (const localPath of ["../secret", "/etc/passwd", "a/../../b", "C:\\secret", "C:/secret", "a\\b", "./report.txt", "", "a\0b"]) {
    await assert.rejects(verifyArtifactManifest(manifest(entry({ localPath })), options), /contained relative path/);
  }
});

test("rejects symlinks outside the root and non-files, including a sibling-prefix path", async (t) => {
  const options = await fixture(t);
  const sibling = `${options.rootDirectory}-other`;
  await mkdir(sibling);
  await writeFile(path.join(sibling, "report.txt"), bytes);
  await symlink(path.join(sibling, "report.txt"), path.join(options.rootDirectory, "outside"));
  await mkdir(path.join(options.rootDirectory, "folder"));
  const report = await verifyArtifactManifest(manifest(
    entry({ localPath: "outside" }), entry({ id: "directory", localPath: "folder" }),
  ), options);
  assert.deepEqual(report.artifacts.map((row) => row.reason), ["outside-root", "not-regular-file"]);
  assert.equal(report.ok, false);
});

test("streams a multi-chunk artifact and supports empty files", async (t) => {
  const options = await fixture(t);
  const large = Buffer.alloc(2 * 1024 * 1024, 42);
  await writeFile(path.join(options.rootDirectory, "large"), large);
  await writeFile(path.join(options.rootDirectory, "empty"), "");
  const report = await verifyArtifactManifest(manifest(...[large, Buffer.alloc(0)].map((content, index) => entry({
    id: String(index), localPath: index === 0 ? "large" : "empty", byteLength: content.length,
    sha256: createHash("sha256").update(content).digest("hex"),
  }))), options);
  assert.equal(report.ok, true);
});

test("CLI produces JSON and distinct success, incomplete, and invalid-input exit codes", async (t) => {
  const options = await fixture(t);
  const filename = path.join(options.directory, "manifest.json");
  const cli = new URL("../scripts/verify-artifact-manifest.js", import.meta.url);
  const run = (...args) => spawnSync(process.execPath, [cli.pathname, ...args], { encoding: "utf8" });
  await writeFile(filename, JSON.stringify(manifest(entry())));
  let result = run(filename, options.rootDirectory);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).ok, true);
  await writeFile(filename, JSON.stringify(manifest(entry({ sha256: "0".repeat(64) }))));
  result = run(filename, options.rootDirectory);
  assert.equal(result.status, 1);
  assert.equal(JSON.parse(result.stdout).ok, false);
  await writeFile(filename, "{");
  assert.equal(run(filename, options.rootDirectory).status, 2);
  assert.equal(run().status, 2);
  assert.equal(run(filename, options.rootDirectory, "extra").status, 2);
});
