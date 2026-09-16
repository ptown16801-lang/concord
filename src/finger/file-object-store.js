import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

function asBuffer(value) {
  if (typeof value === "string") return Buffer.from(value);
  if (Buffer.isBuffer(value)) return value;
  if (ArrayBuffer.isView(value)) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  }
  throw new TypeError("Artifact data must be a string, Buffer, or typed array");
}

/**
 * A filesystem object store suitable for development or a single-node install.
 * Keys are content addressed, so repeated uploads are safe and immutable.
 */
export class FileObjectStore {
  constructor(rootDirectory) {
    if (!path.isAbsolute(rootDirectory)) {
      throw new TypeError("Object store root must be an absolute path");
    }
    this.rootDirectory = path.resolve(rootDirectory);
  }

  async put(data) {
    const bytes = asBuffer(data);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const key = `finger/sha256/${sha256.slice(0, 2)}/${sha256}`;
    const destination = this.#resolve(key);
    await mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });

    const temporary = `${destination}.${process.pid}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporary, bytes, { flag: "wx", mode: 0o600 });
      await rename(temporary, destination);
    } finally {
      await rm(temporary, { force: true });
    }

    return { key, sha256, byteLength: bytes.byteLength };
  }

  async get(key) {
    return readFile(this.#resolve(key));
  }

  async delete(key) {
    await rm(this.#resolve(key), { force: true });
  }

  #resolve(key) {
    if (!/^finger\/sha256\/[a-f0-9]{2}\/[a-f0-9]{64}$/.test(key)) {
      throw new TypeError("Invalid Finger object key");
    }
    const resolved = path.resolve(this.rootDirectory, key);
    if (!resolved.startsWith(`${this.rootDirectory}${path.sep}`)) {
      throw new TypeError("Object key escapes the configured root");
    }
    return resolved;
  }
}
