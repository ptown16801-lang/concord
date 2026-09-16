#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MINIMUM_NODE_VERSION = Object.freeze({ major: 22, minor: 5, patch: 0 });

export function assertCompatibleNode(version = process.versions.node) {
  const match = /^(\d+)\.(\d+)\.(\d+)/u.exec(version);
  if (!match) {
    throw new Error(`Unable to parse Node.js version ${JSON.stringify(version)}.`);
  }

  const [, major, minor, patch] = match.map(Number);
  const compatible =
    major > MINIMUM_NODE_VERSION.major ||
    (major === MINIMUM_NODE_VERSION.major &&
      (minor > MINIMUM_NODE_VERSION.minor ||
        (minor === MINIMUM_NODE_VERSION.minor && patch >= MINIMUM_NODE_VERSION.patch)));

  if (!compatible) {
    throw new Error(
      `Node.js 22.5.0 or newer is required; found ${version}. Select the Concord Node 22 runtime and retry.`,
    );
  }
}

function readGitValue(args, label) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    throw new Error(`Unable to read the Git ${label}. Run this preflight inside a Git checkout.`);
  }
}

export async function collectPreflightReport() {
  assertCompatibleNode();

  const { DatabaseSync } = await import("node:sqlite");
  const database = new DatabaseSync(":memory:");

  try {
    const row = database.prepare("SELECT 1 AS result").get();
    if (row?.result !== 1) {
      throw new Error("unexpected query result");
    }
  } catch {
    throw new Error("The in-memory node:sqlite verification query failed.");
  } finally {
    database.close();
  }

  return {
    status: "ok",
    nodeVersion: process.version,
    runtimePath: process.execPath,
    git: {
      branch: readGitValue(["branch", "--show-current"], "branch"),
      head: readGitValue(["rev-parse", "HEAD"], "HEAD"),
    },
    sqlite: {
      database: ":memory:",
      queryVerified: true,
    },
  };
}

async function main() {
  try {
    console.log(JSON.stringify(await collectPreflightReport(), null, 2));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown preflight failure.";
    console.error(JSON.stringify({ status: "error", message }, null, 2));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
