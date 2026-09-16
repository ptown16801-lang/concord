const POINTER_GROUPS = ['touch', 'mouse', 'stylus'];
const MAX_DWELL_MS = 1_000;

function finiteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function eventTime(event, index) {
  const value = finiteNumber(event.elapsedMs)
    ?? finiteNumber(event.eventTimestamp)
    ?? finiteNumber(event.timestamp)
    ?? finiteNumber(event.timeStamp)
    ?? finiteNumber(event.clientTimestamp);
  if (value !== null) return value;
  const parsed = typeof event.timestamp === 'string' ? Date.parse(event.timestamp) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : index;
}

function pointerGroup(event) {
  const value = String(event.pointerType ?? event.inputType ?? '').toLowerCase();
  if (value === 'pen' || value === 'stylus') return 'stylus';
  if (value === 'touch') return 'touch';
  if (value === 'mouse' || event.type?.startsWith('mouse')) return 'mouse';
  if (event.type?.startsWith('touch')) return 'touch';
  return null;
}

function position(event, viewport) {
  const x = finiteNumber(event.clientX) ?? finiteNumber(event.x);
  const y = finiteNumber(event.clientY) ?? finiteNumber(event.y);
  if (x === null || y === null) return null;

  const width = finiteNumber(event.viewportWidth) ?? finiteNumber(event.viewport?.width) ?? finiteNumber(viewport?.width);
  const height = finiteNumber(event.viewportHeight) ?? finiteNumber(event.viewport?.height) ?? finiteNumber(viewport?.height);
  return {
    x,
    y,
    normalizedX: finiteNumber(event.normalizedX) ?? (width > 0 ? x / width : null),
    normalizedY: finiteNumber(event.normalizedY) ?? (height > 0 ? y / height : null),
  };
}

function assertEvents(events) {
  if (!Array.isArray(events)) throw new TypeError('events must be an array');
  for (const event of events) {
    if (!event || typeof event !== 'object' || Array.isArray(event)) {
      throw new TypeError('each event must be an object');
    }
  }
}

export function generateReplay(events, context = {}) {
  assertEvents(events);
  const ordered = events
    .map((event, index) => ({ event, index, timestamp: eventTime(event, index) }))
    .sort((a, b) => a.timestamp - b.timestamp || a.index - b.index);
  const origin = ordered[0]?.timestamp ?? 0;

  return {
    schemaVersion: 1,
    viewport: context.viewport ?? null,
    initialDom: context.initialDom ?? null,
    mutations: Array.isArray(context.mutations) ? context.mutations : [],
    finalDom: context.finalDom ?? null,
    durationMs: ordered.length ? Math.max(0, ordered.at(-1).timestamp - origin) : 0,
    frames: ordered.map(({ event, timestamp }) => ({
      offsetMs: Math.max(0, timestamp - origin),
      event,
    })),
  };
}

function emptyMap(pointerType) {
  return {
    pointerType,
    positions: [],
    paths: [],
    totalDwellMs: 0,
  };
}

export function generateHeatMaps(events, context = {}) {
  assertEvents(events);
  const maps = Object.fromEntries(POINTER_GROUPS.map((type) => [type, emptyMap(type)]));
  maps.combined = emptyMap('combined');
  const previous = new Map();

  const samples = events.flatMap((event) => {
    const contacts = Array.isArray(event.changedTouches) ? event.changedTouches : [];
    if (!contacts.length) return [event];
    return contacts.map((contact) => ({ ...event, ...contact, pointerType: 'touch' }));
  });
  const ordered = samples
    .map((event, index) => ({ event, index, timestamp: eventTime(event, index) }))
    .sort((a, b) => a.timestamp - b.timestamp || a.index - b.index);

  for (const { event, timestamp } of ordered) {
    const group = pointerGroup(event);
    const point = position(event, context.viewport);
    if (!group || !point) continue;

    const pointerId = String(event.pointerId ?? event.identifier ?? `${group}:default`);
    const key = `${group}:${pointerId}`;
    const prior = previous.get(key);
    const dwellMs = prior ? Math.max(0, Math.min(MAX_DWELL_MS, timestamp - prior.timestamp)) : 0;
    const record = { ...point, timestamp, dwellMs, pointerId };

    maps[group].positions.push(record);
    maps.combined.positions.push({ ...record, pointerType: group });
    maps[group].totalDwellMs += dwellMs;
    maps.combined.totalDwellMs += dwellMs;

    if (prior) {
      const segment = {
        from: prior.point,
        to: point,
        startTimestamp: prior.timestamp,
        endTimestamp: timestamp,
        durationMs: timestamp - prior.timestamp,
        pointerId,
      };
      maps[group].paths.push(segment);
      maps.combined.paths.push({ ...segment, pointerType: group });
    }

    if (/up$|end$|cancel$/i.test(String(event.type ?? ''))) previous.delete(key);
    else previous.set(key, { point, timestamp });
  }

  return { schemaVersion: 1, maps };
}

export function analyzeSession(events, context = {}) {
  return {
    replay: generateReplay(events, context),
    heatMaps: generateHeatMaps(events, context),
  };
}
