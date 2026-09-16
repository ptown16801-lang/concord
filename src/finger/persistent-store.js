/**
 * Adapts the Finger ingestion store contract to dedicated historical storage.
 */
export class PersistentFingerStore {
  constructor(persistence, versions) {
    if (!persistence) throw new Error("Finger persistence is required");
    this.persistence = persistence;
    this.versions = versions;
  }

  async saveSession(session, rawPayload) {
    this.persistence.createSession({
      id: session.id,
      subjectKey: session.userId ?? session.identityId,
      concordSessionId: session.clientSessionId,
      fingerVersion: session.versions.finger,
      concordVersion: this.versions.concordVersion,
      concordBuild: this.versions.concordBuild,
      startedAt: session.startedAt ?? session.receivedAt,
    });
    this.persistence.appendEvents(
      session.id,
      (Array.isArray(rawPayload.events) ? rawPayload.events : []).map(
        normalizeEvent,
      ),
    );
    const rawArtifact = await this.persistence.preserveArtifact(session.id, {
      kind: "raw-capture",
      data: JSON.stringify(rawPayload),
      contentType: "application/json",
    });
    session.rawArtifact = `finger-object://${rawArtifact.objectKey}`;
    this.persistence.completeSession(
      session.id,
      session.termination === "close" ? "closed" : "completed",
    );
  }
}

function normalizeEvent(event, sequence) {
  const occurredAtMs = finiteNonNegative(
    event?.timeStamp ?? event?.timestamp ?? sequence,
    sequence,
  );
  return {
    sequence,
    occurredAtMs,
    eventType: text(event?.type) ?? "unknown",
    pointerKind: text(event?.pointerType),
    contactId: event?.pointerId ?? event?.identifier,
    rawX: finite(event?.clientX),
    rawY: finite(event?.clientY),
    normalizedX: finite(event?.normalizedX ?? event?.normalized?.x),
    normalizedY: finite(event?.normalizedY ?? event?.normalized?.y),
    rawPayload: event,
  };
}

function finite(value) {
  return Number.isFinite(value) ? value : undefined;
}

function finiteNonNegative(value, fallback) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function text(value) {
  return typeof value === "string" && value ? value : undefined;
}
