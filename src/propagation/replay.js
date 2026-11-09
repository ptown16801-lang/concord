import { LIMITS, SCHEMA, ENGINE, DEFINITION, DEFINITION_DIGEST, requireThat as ok, copy, digest, canonicalize, keys, id, text, hash } from './contracts.js';
import { evaluateThreshold } from './threshold.js';

const manifestKeys = ['schema', 'engine', 'definition', 'definitionDigest', 'runId', 'propositionRevision', 'mode', 'parent'];
const eventKeys = ['eventId', 'sequence', 'propositionRevision', 'previousEventId', 'kind', 'payload'];
const initial = () => ({ stage: 'active', observation: null, guardResult: null, holdId: null, pendingStage: null, corrections: [] });
function sequence(value) { ok(Number.isSafeInteger(value) && value >= 0, 'invalid sequence'); }
function pending(state) { ok((state.stage === 'active' || state.stage === 'waiting') && state.holdId === null, 'stage is not pending'); }
function eventShape(e) {
  keys(e, eventKeys); id(e.eventId); sequence(e.sequence); id(e.propositionRevision);
  if (e.previousEventId !== null) id(e.previousEventId);
  switch (e.kind) {
    case 'OBSERVE': keys(e.payload, ['D', 'affirmative']); evaluateThreshold(e.payload.D, e.payload.affirmative); break;
    case 'EVALUATE': keys(e.payload, []); break;
    case 'HOLD': case 'RELEASE': keys(e.payload, ['holdId']); id(e.payload.holdId); break;
    case 'NOTE_CORRECTED':
      keys(e.payload, ['targetEventId', 'targetSequence', 'targetDigest', 'expectedPreviousCorrectionId', 'reason', 'text']);
      id(e.payload.targetEventId); sequence(e.payload.targetSequence); hash(e.payload.targetDigest);
      if (e.payload.expectedPreviousCorrectionId !== null) id(e.payload.expectedPreviousCorrectionId);
      text(e.payload.reason); text(e.payload.text); break;
    default: throw new TypeError('unknown event kind');
  }
}
function apply(state, e, run, previous) {
  const p = e.payload;
  switch (e.kind) {
    case 'OBSERVE':
      pending(state); ok(state.observation === null, 'observation already exists');
      state.observation = { ...p, runId: run.manifest.runId, eventId: e.eventId, corrected: false };
      break;
    case 'EVALUATE':
      pending(state);
      if (!state.observation) state.guardResult = { outcome: 'unresolved' };
      else {
        state.guardResult = { ...evaluateThreshold(state.observation.D, state.observation.affirmative), basis: state.observation.corrected ? 'historical-original-inputs' : 'original-inputs' };
        state.stage = state.guardResult.outcome === 'satisfied' ? 'completed' : 'waiting';
      }
      break;
    case 'HOLD': pending(state); state.pendingStage = state.stage; state.stage = 'held'; state.holdId = p.holdId; break;
    case 'RELEASE':
      ok(state.stage === 'held' && state.holdId === p.holdId, 'hold mismatch');
      state.stage = state.pendingStage; state.pendingStage = null; state.holdId = null; break;
    case 'NOTE_CORRECTED': {
      const target = previous.find(x => x.eventId === p.targetEventId);
      ok(target && target.kind !== 'NOTE_CORRECTED' && target.sequence === p.targetSequence && digest(target) === p.targetDigest, 'correction target mismatch');
      const existing = state.corrections.find(x => x.runId === run.manifest.runId && x.targetEventId === p.targetEventId);
      ok((existing?.eventId ?? null) === p.expectedPreviousCorrectionId, 'stale correction head');
      const note = { runId: run.manifest.runId, eventId: e.eventId, ...p };
      if (existing) state.corrections[state.corrections.indexOf(existing)] = note;
      else state.corrections.push(note);
      if (state.observation?.runId === run.manifest.runId && state.observation.eventId === target.eventId) {
        state.observation.corrected = true;
        if (state.guardResult && state.guardResult.outcome !== 'unresolved') state.guardResult.basis = 'historical-original-inputs';
      }
      break;
    }
  }
}

// Validate the complete stored stream, even when returning an earlier prefix.
function validate(run, prefix, ancestry = [], budget = { events: 0 }) {
  keys(run, ['manifest', 'events']); keys(run.manifest, manifestKeys);
  const m = run.manifest;
  id(m.runId); id(m.propositionRevision);
  ok(!ancestry.includes(m.runId) && ancestry.length <= LIMITS.parents, 'ancestor identity or depth');
  ok(m.schema === SCHEMA && m.engine === ENGINE && m.definitionDigest === DEFINITION_DIGEST && canonicalize(m.definition) === canonicalize(DEFINITION), 'version or definition mismatch');
  ok(Array.isArray(run.events) && run.events.length <= LIMITS.events, 'event limit');
  budget.events += run.events.length; ok(budget.events <= LIMITS.chainEvents, 'chain event limit');
  sequence(prefix); ok(prefix <= run.events.length, 'prefix out of range');
  let state = initial();
  if (m.parent === null) ok(m.mode === 'synthetic', 'root mode');
  else {
    ok(m.mode === 'hypothetical', 'child mode');
    keys(m.parent, ['run', 'digest', 'reason', 'change']); text(m.parent.reason); hash(m.parent.digest);
    ok(digest(m.parent.run) === m.parent.digest, 'parent digest mismatch');
    ok(m.parent.run.manifest.propositionRevision === m.propositionRevision, 'parent revision mismatch');
    state = validate(m.parent.run, m.parent.run.events.length, [...ancestry, m.runId], budget);
    if (m.parent.change !== null) {
      keys(m.parent.change, ['event', 'digest']); hash(m.parent.change.digest);
      const e = m.parent.change.event; eventShape(e);
      ok(e.kind === 'OBSERVE' && digest(e) === m.parent.change.digest, 'change provenance mismatch');
      const history = m.parent.run.events;
      ok(e.sequence === history.length + 1 && e.previousEventId === (history.at(-1)?.eventId ?? null) && e.propositionRevision === m.propositionRevision && !history.some(x => x.eventId === e.eventId), 'change provenance position');
      // A changed observation must have been admissible at this exact baseline.
      pending(state); ok(state.observation === null, 'change baseline already observed');
    }
  }
  let selected = prefix === 0 ? copy(state) : null;
  const seen = new Set(), previous = [];
  for (let i = 0; i < run.events.length; i++) {
    const e = run.events[i]; eventShape(e);
    ok(!seen.has(e.eventId), 'duplicate stored event'); seen.add(e.eventId);
    ok(e.sequence === i + 1 && e.previousEventId === (previous.at(-1)?.eventId ?? null), 'event order');
    ok(e.propositionRevision === m.propositionRevision, 'stale proposition');
    apply(state, e, run, previous); previous.push(e);
    if (i + 1 === prefix) selected = copy(state);
  }
  return selected;
}
export function createRun(options) {
  const o = copy(options); keys(o, ['runId', 'propositionRevision']); id(o.runId); id(o.propositionRevision);
  return { manifest: { schema: SCHEMA, engine: ENGINE, definition: copy(DEFINITION), definitionDigest: DEFINITION_DIGEST, ...o, mode: 'synthetic', parent: null }, events: [] };
}
export function replayPrefix(input, prefix) {
  const run = copy(input);
  return validate(run, prefix === undefined ? run.events.length : prefix);
}
export function appendEvent(input, event) {
  const run = copy(input), e = copy(event); validate(run, run.events.length); eventShape(e);
  const accepted = run.events.find(x => x.eventId === e.eventId);
  if (accepted) { ok(canonicalize(accepted) === canonicalize(e), 'conflicting event ID'); return run; }
  run.events.push(e); canonicalize(run); validate(run, run.events.length); return run;
}
export function forkScenario(input, prefix, options) {
  const parent = copy(input), o = copy(options);
  const expected = Object.hasOwn(o, 'changeEventId') ? ['runId', 'reason', 'changeEventId'] : ['runId', 'reason'];
  keys(o, expected); id(o.runId); text(o.reason); validate(parent, prefix);
  let change = null;
  if (Object.hasOwn(o, 'changeEventId')) {
    id(o.changeEventId); const event = parent.events[prefix];
    ok(event && event.eventId === o.changeEventId && event.kind === 'OBSERVE', 'change must identify next observation');
    change = { event: copy(event), digest: digest(event) };
  }
  parent.events = parent.events.slice(0, prefix);
  const run = { manifest: { ...copy(parent.manifest), runId: o.runId, mode: 'hypothetical', parent: { run: parent, digest: digest(parent), reason: o.reason, change } }, events: [] };
  canonicalize(run); validate(run, 0); return run;
}
