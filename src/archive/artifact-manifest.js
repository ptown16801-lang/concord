import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open, realpath } from "node:fs/promises";
import path from "node:path";

/** Validate reference metadata without interpreting it as proof of delivery. */
export function validateArtifactManifest(manifest) {
  if (!manifest || manifest.schemaVersion !== 1 || !Array.isArray(manifest.artifacts)) {
    throw new TypeError("manifest must have schemaVersion 1 and an artifacts array");
  }
  const ids = new Set();
  for (const artifact of manifest.artifacts) {
    if (!artifact || typeof artifact !== "object") throw new TypeError("artifact must be an object");
    for (const field of ["id", "filename", "canonicalLocation", "provenance"]) {
      if (typeof artifact[field] !== "string" || !artifact[field].trim()) {
        throw new TypeError(`artifact ${field} must be a nonempty string`);
      }
    }
    if (ids.has(artifact.id)) throw new TypeError(`duplicate artifact id: ${artifact.id}`);
    ids.add(artifact.id);
    if (typeof artifact.sha256 !== "string" || !/^[a-f0-9]{64}$/i.test(artifact.sha256)) {
      throw new TypeError(`invalid SHA-256 for ${artifact.id}`);
    }
    if (artifact.localPath !== undefined && !safeRelativePath(artifact.localPath)) {
      throw new TypeError(`localPath must be a contained relative path for ${artifact.id}`);
    }
    if (artifact.byteLength !== undefined &&
        (!Number.isSafeInteger(artifact.byteLength) || artifact.byteLength < 0)) {
      throw new TypeError(`byteLength must be a nonnegative safe integer for ${artifact.id}`);
    }
    if (!artifact.delivery || !["pending", "prepared", "delivered"].includes(artifact.delivery.status)) {
      throw new TypeError(`invalid recorded delivery status for ${artifact.id}`);
    }
    if (artifact.delivery.status === "delivered" &&
        (typeof artifact.delivery.evidence !== "string" || !artifact.delivery.evidence.trim())) {
      throw new TypeError(`recorded delivery needs an evidence reference for ${artifact.id}`);
    }
  }
  return manifest;
}

/** Stream local bytes; never fetch remote locations or change archive metadata. */
export async function verifyArtifactManifest(manifest, { rootDirectory } = {}) {
  validateArtifactManifest(manifest);
  if (typeof rootDirectory !== "string" || !rootDirectory) {
    throw new TypeError("rootDirectory is required");
  }
  const root = await realpath(rootDirectory);
  const artifacts = [];
  for (const artifact of manifest.artifacts) {
    const result = {
      id: artifact.id,
      expectedSha256: artifact.sha256.toLowerCase(),
      recordedDelivery: structuredClone(artifact.delivery),
      status: "unavailable",
    };
    if (artifact.localPath === undefined) {
      result.reason = "no-local-path";
      artifacts.push(result);
      continue;
    }
    let handle;
    try {
      const filename = await realpath(path.resolve(root, artifact.localPath));
      if (!contained(root, filename)) {
        result.status = "error";
        result.reason = "outside-root";
      } else {
        handle = await open(filename, constants.O_RDONLY | constants.O_NONBLOCK | constants.O_NOFOLLOW);
        const before = await handle.stat({ bigint: true });
        if (!before.isFile()) {
          result.status = "error";
          result.reason = "not-regular-file";
        } else {
          const hash = createHash("sha256");
          let byteLength = 0;
          for await (const chunk of handle.createReadStream({ autoClose: false })) {
            hash.update(chunk);
            byteLength += chunk.length;
          }
          const after = await handle.stat({ bigint: true });
          result.actualSha256 = hash.digest("hex");
          result.byteLength = byteLength;
          if (before.size !== after.size || before.mtimeNs !== after.mtimeNs || before.ctimeNs !== after.ctimeNs) {
            result.status = "error";
            result.reason = "changed-during-read";
          } else {
            result.status = result.actualSha256 === result.expectedSha256 &&
              (artifact.byteLength === undefined || artifact.byteLength === byteLength)
              ? "verified" : "mismatch";
          }
        }
      }
    } catch (error) {
      result.status = error.code === "ENOENT" ? "unavailable" : "error";
      result.reason = error.code === "ENOENT" ? "missing-file" : "read-failed";
    } finally {
      await handle?.close();
    }
    artifacts.push(result);
  }
  return { schemaVersion: 1, ok: artifacts.every(({ status }) => status === "verified"), artifacts };
}

function safeRelativePath(value) {
  return typeof value === "string" && value.length > 0 && !value.includes("\0") &&
    !value.includes("\\") && !path.posix.isAbsolute(value) && !path.win32.isAbsolute(value) &&
    !value.split("/").some((part) => part === ".." || part === "." || part === "");
}

function contained(root, filename) {
  const relative = path.relative(root, filename);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
