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
    return this.#serialize(async () => {
      const sessionsDirectory = path.join(this.#directory, "sessions");
      const sessionDirectory = path.join(sessionsDirectory, session.id);
      await mkdir(sessionDirectory, { recursive: true });

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
  const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, contents, { encoding: "utf8", mode: 0o600 });
  await rename(temporary, file);
}
