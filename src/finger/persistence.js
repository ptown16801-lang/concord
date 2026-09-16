import { randomUUID } from "node:crypto";

function requiredString(value, name) {
  if (typeof value !== "string" || value.length === 0) {
    throw new TypeError(`${name} must be a non-empty string`);
  }
  return value;
}

/** Coordinates queryable metadata/time-series storage with immutable blobs. */
export class FingerPersistence {
  constructor({
    repository,
    objectStore,
    clock = () => new Date(),
    id = randomUUID,
  }) {
    this.repository = repository;
    this.objectStore = objectStore;
    this.clock = clock;
    this.id = id;
  }

  createSession(input) {
    const now = this.clock().toISOString();
    const session = {
      id: input.id ?? this.id(),
      subjectKey: input.subjectKey,
      concordSessionId: input.concordSessionId,
      fingerVersion: requiredString(input.fingerVersion, "fingerVersion"),
      concordVersion: requiredString(input.concordVersion, "concordVersion"),
      concordBuild: requiredString(input.concordBuild, "concordBuild"),
      startedAt: input.startedAt ?? now,
      createdAt: now,
    };
    this.repository.createSession(session);
    return session;
  }

  appendEvents(sessionId, events) {
    requiredString(sessionId, "sessionId");
    if (!Array.isArray(events)) throw new TypeError("events must be an array");
    this.repository.appendEvents(sessionId, events, this.clock().toISOString());
  }

  async preserveArtifact(
    sessionId,
    { kind, data, contentType, sourceArtifactId },
  ) {
    requiredString(sessionId, "sessionId");
    requiredString(kind, "kind");
    requiredString(contentType, "contentType");
    const versions = this.repository.getSessionVersions(sessionId);
    if (sourceArtifactId != null) {
      this.repository.assertArtifactSession(sessionId, sourceArtifactId);
    }
    const stored = await this.objectStore.put(data);
    const artifact = {
      id: this.id(),
      sessionId,
      kind,
      objectKey: stored.key,
      sha256: stored.sha256,
      byteLength: stored.byteLength,
      contentType,
      sourceArtifactId,
      ...versions,
      createdAt: this.clock().toISOString(),
    };
    this.repository.addArtifact(artifact);
    return artifact;
  }

  async addAnalysisGeneration(sessionId, input) {
    const analyzer = requiredString(input.analyzer, "analyzer");
    const analyzerVersion = requiredString(
      input.analyzerVersion,
      "analyzerVersion",
    );
    const sourceArtifactId = requiredString(
      input.sourceArtifactId,
      "sourceArtifactId",
    );
    const versions = this.repository.getSessionVersions(sessionId);
    const manifest = await this.preserveArtifact(sessionId, {
      kind: "analysis-manifest",
      data: JSON.stringify(input.manifest),
      contentType: "application/json",
      sourceArtifactId,
    });
    const generation = {
      id: this.id(),
      sessionId,
      generation: null,
      analyzer,
      analyzerVersion,
      sourceArtifactId,
      manifestArtifactId: manifest.id,
      configuration: input.configuration ?? {},
      ...versions,
      createdAt: this.clock().toISOString(),
    };
    generation.generation = this.repository.addAnalysisGeneration(generation);
    return { ...generation, manifest };
  }

  linkConcordSummary(sessionId, summaryType, summaryId) {
    this.repository.linkConcordSummary(
      requiredString(sessionId, "sessionId"),
      requiredString(summaryType, "summaryType"),
      requiredString(summaryId, "summaryId"),
      this.clock().toISOString(),
    );
  }

  completeSession(sessionId, status = "completed") {
    if (status !== "completed" && status !== "closed") {
      throw new TypeError(
        "Session completion status must be completed or closed",
      );
    }
    this.repository.completeSession(
      sessionId,
      status,
      this.clock().toISOString(),
    );
  }

  /** Permanently removes one session after recording who requested it and why. */
  async purgeSession(sessionId, { requestedBy, reason }) {
    requiredString(sessionId, "sessionId");
    requiredString(requestedBy, "requestedBy");
    requiredString(reason, "reason");
    const keys = this.repository.beginPurge(
      sessionId,
      requestedBy,
      reason,
      this.clock().toISOString(),
    );
    for (const key of keys) await this.objectStore.delete(key);
    this.repository.finishPurge(sessionId, this.clock().toISOString());
  }
}
