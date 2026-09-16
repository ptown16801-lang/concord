import { createHash, randomUUID } from "node:crypto";

export const FINGER_ANALYSIS_VERSION = "1.0.0";

export const DEFAULT_PROCESSING_OPTIONS = Object.freeze({
  columns: 64,
  rows: 64,
  maxDwellMs: 1_000,
});

const POINTER_TYPES = ["touch", "mouse", "stylus"];
const TERMINAL_PHASES = new Set(["end", "cancel"]);

/**
 * Convert a stored raw Finger session into a deterministic replay and heat-map
 * artifact. The input is deliberately storage-agnostic so an object-store JSON
 * document or query result can be passed without an adapter.
 */
export function processFingerSession(session, options = {}) {
  assertSession(session);
  const settings = normalizeOptions(options);
  const declaredStartedAt = session.startedAt == null
    ? null
    : timestampValue(session.startedAt, "startedAt");
  const declaredEndedAt = session.endedAt == null
    ? null
    : timestampValue(session.endedAt, "endedAt");
  const orderedEvents = session.events
    .map((event, sourceIndex) => ({
      event,
      sourceIndex,
      timestamp: eventTimestamp(event, declaredStartedAt),
    }))
    .sort((left, right) => left.timestamp - right.timestamp || left.sourceIndex - right.sourceIndex);

  const startedAtMs = declaredStartedAt ?? orderedEvents[0]?.timestamp;
  const endedAtMs = declaredEndedAt ?? orderedEvents.at(-1)?.timestamp ?? startedAtMs;
  const samples = orderedEvents.flatMap(({ event, sourceIndex, timestamp }) =>
    eventSamples(event, sourceIndex, timestamp, startedAtMs, session.viewport),
  );
  applyDwellAndPath(samples, settings.maxDwellMs);

  const framesByOffset = new Map();
  for (const sample of samples) {
    const frame = framesByOffset.get(sample.offsetMs) ?? {
      offsetMs: sample.offsetMs,
      interactions: [],
      mutations: [],
      events: [],
    };
    frame.interactions.push(sampleForReplay(sample));
    framesByOffset.set(sample.offsetMs, frame);
  }
  for (const { event, timestamp } of orderedEvents) {
    if (!isMutationEvent(event)) continue;
    const offsetMs = Math.max(0, timestamp - startedAtMs);
    const frame = framesByOffset.get(offsetMs) ?? { offsetMs, interactions: [], mutations: [], events: [] };
    frame.mutations.push(structuredClone(event.mutation ?? event.data ?? event));
    framesByOffset.set(offsetMs, frame);
  }
  for (const { event, timestamp } of orderedEvents) {
    const offsetMs = Math.max(0, timestamp - startedAtMs);
    const frame = framesByOffset.get(offsetMs) ?? { offsetMs, interactions: [], mutations: [], events: [] };
    frame.events.push(structuredClone(event));
    framesByOffset.set(offsetMs, frame);
  }

  const views = Object.fromEntries(
    [...POINTER_TYPES, "combined"].map((pointerType) => [
      pointerType,
      buildView(
        pointerType === "combined" ? samples : samples.filter((sample) => sample.pointerType === pointerType),
        settings,
      ),
    ]),
  );

  return {
    schemaVersion: 1,
    analysisVersion: FINGER_ANALYSIS_VERSION,
    sessionId: session.id,
    source: {
      fingerVersion: session.fingerVersion ?? session.versions?.finger ?? null,
      concordVersion: session.concordVersion ?? session.versions?.concord ?? null,
      eventCount: session.events.length,
      sha256: sourceDigest(session),
    },
    bounds: {
      startedAt: new Date(startedAtMs).toISOString(),
      endedAt: new Date(Math.max(startedAtMs, endedAtMs)).toISOString(),
      durationMs: Math.max(0, endedAtMs - startedAtMs),
      viewport: normalizeViewport(session.viewport),
    },
    replay: {
      initialDom: structuredClone(session.initialDom ?? session.dom?.initial ?? null),
      frames: [...framesByOffset.values()].sort((left, right) => left.offsetMs - right.offsetMs),
      finalDom: structuredClone(session.finalDom ?? session.dom?.final ?? null),
    },
    heatMaps: {
      grid: { columns: settings.columns, rows: settings.rows },
      views,
    },
  };
}

/** Merge compatible per-session artifacts without discarding their identity. */
export function aggregateSessionAnalyses(analyses, { id = randomUUID() } = {}) {
  if (!Array.isArray(analyses) || analyses.length === 0) {
    throw new TypeError("analyses must contain at least one session analysis");
  }
  const first = analyses[0];
  const columns = first?.heatMaps?.grid?.columns;
  const rows = first?.heatMaps?.grid?.rows;
  if (!Number.isInteger(columns) || !Number.isInteger(rows)) {
    throw new TypeError("analyses must be Finger session analysis artifacts");
  }
  for (const analysis of analyses) {
    if (analysis.heatMaps.grid.columns !== columns || analysis.heatMaps.grid.rows !== rows) {
      throw new Error("all analyses must use the same heat-map grid");
    }
  }

  const views = {};
  for (const pointerType of [...POINTER_TYPES, "combined"]) {
    const positions = zeroGrid(columns, rows);
    const dwell = zeroGrid(columns, rows);
    const paths = [];
    let sampleCount = 0;
    let totalDwellMs = 0;
    let totalDistance = 0;
    for (const analysis of analyses) {
      const view = analysis.heatMaps.views[pointerType];
      addGrid(positions, view.position.cells);
      addGrid(dwell, view.dwell.cells);
      paths.push(...view.path.segments.map((segment) => ({ ...segment, sessionId: analysis.sessionId })));
      sampleCount += view.position.sampleCount;
      totalDwellMs += view.dwell.totalMs;
      totalDistance += view.path.totalDistance;
    }
    views[pointerType] = {
      position: { cells: positions, sampleCount },
      dwell: { cells: dwell, totalMs: totalDwellMs },
      path: { segments: paths, totalDistance },
    };
  }

  return {
    schemaVersion: 1,
    analysisVersion: FINGER_ANALYSIS_VERSION,
    aggregateId: id,
    sessionIds: analyses.map((analysis) => analysis.sessionId),
    heatMaps: { grid: { columns, rows }, views },
  };
}

function assertSession(session) {
  if (!session || typeof session !== "object") throw new TypeError("session is required");
  if (typeof session.id !== "string" || session.id.length === 0) {
    throw new TypeError("session.id is required");
  }
  if (!Array.isArray(session.events)) throw new TypeError("session.events must be an array");
  if (session.events.length === 0 && session.startedAt == null) {
    throw new TypeError("an empty session must include startedAt");
  }
}

function normalizeOptions(options) {
  const result = { ...DEFAULT_PROCESSING_OPTIONS, ...options };
  for (const key of ["columns", "rows", "maxDwellMs"]) {
    if (!Number.isFinite(result[key]) || result[key] <= 0) throw new RangeError(`${key} must be positive`);
  }
  result.columns = Math.floor(result.columns);
  result.rows = Math.floor(result.rows);
  return result;
}

function eventSamples(event, sourceIndex, timestamp, startedAtMs, viewport) {
  if (!event || typeof event !== "object" || isMutationEvent(event)) return [];
  const contacts = Array.isArray(event.changedTouches)
    ? event.changedTouches
    : Array.isArray(event.touches)
      ? event.touches
      : [event];
  return contacts.flatMap((contact, contactIndex) => {
    const position = extractPosition(contact, event, viewport);
    if (!position) return [];
    return [{
      sourceIndex,
      contactIndex,
      offsetMs: Math.max(0, timestamp - startedAtMs),
      pointerType: pointerTypeOf(contact.pointerType ?? event.pointerType, event.type),
      pointerId: String(contact.pointerId ?? contact.identifier ?? event.pointerId ?? 0),
      phase: phaseOf(event.type, event.phase),
      x: position.x,
      y: position.y,
      normalizedX: position.normalizedX,
      normalizedY: position.normalizedY,
      pressure: finiteOrNull(contact.pressure ?? contact.force ?? event.pressure),
      width: finiteOrNull(contact.width ?? contact.radiusX ?? event.width),
      height: finiteOrNull(contact.height ?? contact.radiusY ?? event.height),
      target: structuredClone(event.target ?? event.domTarget ?? null),
      dwellMs: 0,
      path: null,
    }];
  });
}

function extractPosition(contact, event, viewport) {
  const raw = contact.position ?? event.position ?? contact;
  const normalized = contact.normalizedPosition ?? event.normalizedPosition;
  const x = finite(raw.x ?? raw.clientX ?? contact.clientX ?? event.clientX);
  const y = finite(raw.y ?? raw.clientY ?? contact.clientY ?? event.clientY);
  let normalizedX = finite(normalized?.x ?? contact.normalizedX ?? event.normalizedX);
  let normalizedY = finite(normalized?.y ?? contact.normalizedY ?? event.normalizedY);
  const width = finite(viewport?.width);
  const height = finite(viewport?.height);
  if (normalizedX == null && x != null && width > 0) normalizedX = x / width;
  if (normalizedY == null && y != null && height > 0) normalizedY = y / height;
  if (normalizedX == null || normalizedY == null) return null;
  return {
    x,
    y,
    normalizedX: clamp(normalizedX, 0, 1),
    normalizedY: clamp(normalizedY, 0, 1),
  };
}

function applyDwellAndPath(samples, maxDwellMs) {
  const tracks = new Map();
  for (const sample of samples) {
    const key = `${sample.pointerType}:${sample.pointerId}`;
    const track = tracks.get(key) ?? [];
    track.push(sample);
    tracks.set(key, track);
  }
  for (const track of tracks.values()) {
    track.sort((left, right) => left.offsetMs - right.offsetMs || left.sourceIndex - right.sourceIndex);
    for (let index = 0; index < track.length - 1; index += 1) {
      const current = track[index];
      const next = track[index + 1];
      if (TERMINAL_PHASES.has(current.phase)) continue;
      const durationMs = Math.max(0, next.offsetMs - current.offsetMs);
      current.dwellMs = Math.min(durationMs, maxDwellMs);
      const dx = next.normalizedX - current.normalizedX;
      const dy = next.normalizedY - current.normalizedY;
      const distance = Math.hypot(dx, dy);
      current.path = {
        from: { x: current.normalizedX, y: current.normalizedY },
        to: { x: next.normalizedX, y: next.normalizedY },
        durationMs,
        distance,
        speed: durationMs > 0 ? distance / durationMs : null,
        pointerId: current.pointerId,
      };
    }
  }
}

function buildView(samples, settings) {
  const positionCells = zeroGrid(settings.columns, settings.rows);
  const dwellCells = zeroGrid(settings.columns, settings.rows);
  const segments = [];
  let totalDwellMs = 0;
  let totalDistance = 0;
  for (const sample of samples) {
    const { column, row } = cellFor(sample, settings);
    positionCells[row][column] += 1;
    dwellCells[row][column] += sample.dwellMs;
    totalDwellMs += sample.dwellMs;
    if (sample.path) {
      segments.push({ ...sample.path, pointerType: sample.pointerType });
      totalDistance += sample.path.distance;
    }
  }
  return {
    position: { cells: positionCells, sampleCount: samples.length },
    dwell: { cells: dwellCells, totalMs: totalDwellMs },
    path: { segments, totalDistance },
  };
}

function sampleForReplay(sample) {
  return {
    pointerType: sample.pointerType,
    pointerId: sample.pointerId,
    phase: sample.phase,
    position: { x: sample.x, y: sample.y },
    normalizedPosition: { x: sample.normalizedX, y: sample.normalizedY },
    pressure: sample.pressure,
    width: sample.width,
    height: sample.height,
    target: sample.target,
  };
}

function cellFor(sample, settings) {
  return {
    column: Math.min(settings.columns - 1, Math.floor(sample.normalizedX * settings.columns)),
    row: Math.min(settings.rows - 1, Math.floor(sample.normalizedY * settings.rows)),
  };
}

function pointerTypeOf(value, eventType = "") {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized === "pen" || normalized === "stylus") return "stylus";
  if (normalized === "touch" || String(eventType).toLowerCase().startsWith("touch")) return "touch";
  return "mouse";
}

function phaseOf(type = "", explicitPhase) {
  if (explicitPhase) return String(explicitPhase).toLowerCase();
  const normalized = String(type).toLowerCase();
  if (/(down|start)$/.test(normalized)) return "start";
  if (/(up|end)$/.test(normalized)) return "end";
  if (normalized.endsWith("cancel")) return "cancel";
  return "move";
}

function eventTimestamp(event, declaredStartedAt) {
  const value = event?.timestamp ?? event?.timeStamp ?? event?.occurredAt;
  if (typeof value === "number" && value < 1_000_000_000_000 && declaredStartedAt != null) {
    return declaredStartedAt + value;
  }
  return timestampValue(value, "event timestamp");
}

function timestampValue(value, name) {
  const result = typeof value === "number" ? value : Date.parse(value);
  if (!Number.isFinite(result)) throw new TypeError(`${name} must be a valid timestamp`);
  return result;
}

function isMutationEvent(event) {
  return ["mutation", "dom-mutation", "dom_mutation"].includes(String(event?.type).toLowerCase());
}

function normalizeViewport(viewport) {
  return {
    width: finiteOrNull(viewport?.width),
    height: finiteOrNull(viewport?.height),
    devicePixelRatio: finiteOrNull(viewport?.devicePixelRatio),
  };
}

function sourceDigest(session) {
  return createHash("sha256").update(stableStringify(session)).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function zeroGrid(columns, rows) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function addGrid(target, source) {
  for (let row = 0; row < target.length; row += 1) {
    for (let column = 0; column < target[row].length; column += 1) {
      target[row][column] += source[row][column];
    }
  }
}

function finite(value) {
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function finiteOrNull(value) {
  return finite(value);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}
