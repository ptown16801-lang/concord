import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export class FileFingerStore {
  #directory;
  #queue = Promise.resolve();

  constructor(directory) {
    if (!directory) throw new Error("Finger data directory is required");
    this.#directory = path.resolve(directory);
  }

  async saveSession(session, rawPayload) {
    if (!session || typeof session.id !== "string" || session.id.length === 0) {
      throw new TypeError("Finger session.id must be a non-empty string");
    }
    return this.#serialize(async () => {
      const sessionsDirectory = path.join(this.#directory, "sessions");
      // Never use a caller-controlled session identifier as a filesystem path
      // segment. The original id remains inside the stored metadata/index.
      const storageKey = createHash("sha256").update(session.id).digest("hex");
      const sessionDirectory = path.join(sessionsDirectory, storageKey);
      await mkdir(sessionDirectory, { recursive: true, mode: 0o700 });

      const rawFile = path.join(sessionDirectory, "raw.json");
      const metadataFile = path.join(sessionDirectory, "session.json");
      await atomicJsonWrite(rawFile, rawPayload);
      await atomicJsonWrite(metadataFile, session);

      const indexFile = path.join(this.#directory, "sessions.jsonl");
      let existing = "";
      try {
        existing = await readFile(indexFile, "utf8");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      await mkdir(this.#directory, { recursive: true, mode: 0o700 });
      await atomicWrite(indexFile, `${existing}${JSON.stringify(session)}\n`);
    });
  }

  #serialize(operation) {
    const result = this.#queue.then(operation, operation);
    this.#queue = result.catch(() => {});
    return result;
  }
}

export class MemoryFingerStore {
  sessions = [];
  rawPayloads = new Map();

  async saveSession(session, rawPayload) {
    this.sessions.push(structuredClone(session));
    this.rawPayloads.set(session.id, structuredClone(rawPayload));
  }
}

async function atomicJsonWrite(file, value) {
  await atomicWrite(file, `${JSON.stringify(value)}\n`);
}

async function atomicWrite(file, contents) {
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(temporary, contents, { encoding: "utf8", mode: 0o600, flag: "wx" });
  await rename(temporary, file);
}
