import { randomUUID } from "node:crypto";
import { processFingerSession } from "./processor.js";

/**
 * Append-only reference store. Production persistence can implement the same
 * save/list contract while keeping processing independent of the database.
 */
export class InMemoryAnalysisGenerationStore {
  #bySession = new Map();

  async save(generation) {
    const generations = this.#bySession.get(generation.sessionId) ?? [];
    if (generations.some((entry) => entry.id === generation.id)) {
      throw new Error(`analysis generation ${generation.id} already exists`);
    }
    const saved = structuredClone(generation);
    generations.push(saved);
    this.#bySession.set(generation.sessionId, generations);
    return structuredClone(saved);
  }

  async list(sessionId) {
    return structuredClone(this.#bySession.get(sessionId) ?? []);
  }
}

export class FingerAnalysisService {
  constructor(store, { clock = () => new Date(), idFactory = randomUUID } = {}) {
    if (!store || typeof store.save !== "function") throw new TypeError("store.save is required");
    this.store = store;
    this.clock = clock;
    this.idFactory = idFactory;
  }

  async process(session, options) {
    const artifact = processFingerSession(session, options);
    return this.store.save({
      id: this.idFactory(),
      sessionId: session.id,
      generatedAt: this.clock().toISOString(),
      artifact,
    });
  }
}
