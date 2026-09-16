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
  return {
    sequence,
    occurredAtMs: occurredAtMs(event, sequence),
    eventType: text(event?.type) ?? "unknown",
    pointerKind: pointerKind(event),
    contactId: event?.pointerId ?? event?.identifier,
    rawX: finite(event?.clientX),
    rawY: finite(event?.clientY),
    normalizedX: finite(event?.normalizedX ?? event?.normalized?.x),
    normalizedY: finite(event?.normalizedY ?? event?.normalized?.y),
    rawPayload: event,
  };
}

function occurredAtMs(event, fallback) {
  for (const value of [event?.elapsedMs, event?.occurredAtMs, event?.eventTimestamp, event?.timeStamp]) {
    if (Number.isFinite(value) && value >= 0) return value;
  }
  if (typeof event?.timestamp === "number" && Number.isFinite(event.timestamp) && event.timestamp >= 0) {
    return event.timestamp;
  }
  const parsed = typeof event?.timestamp === "string" ? Date.parse(event.timestamp) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pointerKind(event) {
  const explicit = text(event?.pointerType);
  if (explicit) return explicit === "pen" ? "stylus" : explicit;
  const type = text(event?.type)?.toLowerCase() ?? "";
  if (type.startsWith("touch")) return "touch";
  if (type.startsWith("mouse") || type === "click" || type === "dblclick") return "mouse";
  return undefined;
}

function finite(value) {
  return Number.isFinite(value) ? value : undefined;
}

function text(value) {
  return typeof value === "string" && value ? value : undefined;
}
