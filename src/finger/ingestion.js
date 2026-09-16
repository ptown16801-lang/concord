import { randomUUID } from "node:crypto";

export function createFingerIngestionService(options) {
  if (!options?.store) throw new Error("A Finger store is required");
  if (!options?.versions) throw new Error("Finger and Concord versions are required");

  return {
    async ingest(payload, context) {
      const receivedAt = new Date().toISOString();
      const events = Array.isArray(payload.events) ? payload.events : [];
      const id = randomUUID();
      const completeness = describeCompleteness(payload);
      const session = {
        id,
        identityId: context.identityId,
        userId: context.userId,
        clientSessionId: clean(payload.sessionId),
        transmissionId: clean(payload.transmissionId),
        receivedAt,
        startedAt: timestamp(payload.startedAt),
        endedAt: timestamp(payload.endedAt),
        status: completeness.missing.length ? "partial" : "complete",
        termination: clean(payload.termination) ?? "unknown",
        versions: {
          finger: options.versions.finger,
          concord: options.versions.concord,
          clientFinger: clean(payload.fingerVersion),
          clientConcord: clean(payload.concordVersion),
        },
        summary: summarize(events, payload, completeness),
        rawArtifact: `finger://sessions/${id}/raw`,
      };

      await options.store.saveSession(session, payload);
      await options.onAssociation?.({
        identityId: session.identityId,
        userId: session.userId,
        sessionId: session.id,
        receivedAt,
      });

      return Object.freeze({
        sessionId: session.id,
        rawArtifact: session.rawArtifact,
        status: session.status,
        summary: session.summary,
        versions: session.versions,
      });
    },
  };
}

function summarize(events, payload, completeness) {
  const eventTypes = Object.create(null);
  const pointerTypes = Object.create(null);
  for (const event of events) {
    if (!event || typeof event !== "object") continue;
    increment(eventTypes, clean(event.type) ?? "unknown");
    increment(pointerTypes, clean(event.pointerType) ?? "unknown");
  }

  const started = Date.parse(payload.startedAt);
  const ended = Date.parse(payload.endedAt);
  return {
    eventCount: events.length,
    eventTypes,
    pointerTypes,
    durationMs:
      Number.isFinite(started) && Number.isFinite(ended) && ended >= started
        ? ended - started
        : null,
    hasDomCapture: Boolean(payload.dom?.initial || payload.dom?.final),
    observedMaxContacts: nonNegativeInteger(payload.device?.observedMaxContacts),
    reportedMaxTouchPoints: nonNegativeInteger(payload.device?.maxTouchPoints),
    missing: completeness.missing,
  };
}

function describeCompleteness(payload) {
  const missing = [];
  if (!timestamp(payload.startedAt)) missing.push("startedAt");
  if (!timestamp(payload.endedAt)) missing.push("endedAt");
  if (!Array.isArray(payload.events)) missing.push("events");
  if (!payload.device || typeof payload.device !== "object") missing.push("device");
  return { missing };
}

function timestamp(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value))
    ? new Date(value).toISOString()
    : null;
}

function nonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0 ? value : null;
}

function increment(target, key) {
  target[key] = (Object.hasOwn(target, key) ? target[key] : 0) + 1;
}

function clean(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
