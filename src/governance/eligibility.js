const EVENT_TYPES = Object.freeze({
  IDENTITY_REGISTERED: "IDENTITY_REGISTERED",
  ALLEGATION_RECORDED: "ALLEGATION_RECORDED",
  FORMAL_PROCEEDING_OPENED: "FORMAL_PROCEEDING_OPENED",
  FORMAL_PROCEEDING_CLOSED: "FORMAL_PROCEEDING_CLOSED",
  C4_CREATION_EVENT_OPEN: "C4_CREATION_EVENT_OPEN",
  C4_RESTRICTION_CLOSED: "C4_RESTRICTION_CLOSED",
  DEATH_RECORDED: "DEATH_RECORDED",
  CAPITAL_TERMINATION_RECORDED: "CAPITAL_TERMINATION_RECORDED",
  FELONY_CONVICTION_ENTERED: "FELONY_CONVICTION_ENTERED",
});

export const EligibilityEventType = EVENT_TYPES;

export class EligibilityTransitionError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "EligibilityTransitionError";
    this.code = code;
  }
}

/**
 * Append-only, optimistic-concurrency controlled authority for franchise state.
 * A command batch is reduced against a clone and committed only in full.
 */
export class EligibilityRegistry {
  #events = [];
  #states = new Map();
  #clock;

  constructor({ clock = () => new Date() } = {}) {
    this.#clock = clock;
  }

  get version() {
    return this.#events.length;
  }

  apply(command, options) {
    return this.applyBatch([command], options)[0];
  }

  applyBatch(commands, { expectedVersion = this.version } = {}) {
    if (!Number.isSafeInteger(expectedVersion) || expectedVersion !== this.version) {
      throw transitionError("VERSION_CONFLICT", `Expected version ${expectedVersion}; current version is ${this.version}`);
    }
    if (!Array.isArray(commands) || commands.length === 0) {
      throw transitionError("EMPTY_BATCH", "At least one transition is required");
    }

    const states = cloneStates(this.#states);
    const events = [];
    let lastTime = this.#events.at(-1)?.effectiveAt ?? null;
    for (const command of commands) {
      const effectiveAt = timestamp(command?.effectiveAt ?? this.#clock(), "effectiveAt");
      if (lastTime && effectiveAt < lastTime) {
        throw transitionError("NON_MONOTONIC_TIME", "Transitions must not predate committed or earlier batch transitions");
      }
      const emitted = reduceCommand(states, command, effectiveAt);
      for (const event of emitted) {
        events.push(freeze({
          ...event,
          version: this.version + events.length + 1,
          effectiveAt,
          recordedAt: timestamp(this.#clock(), "recordedAt"),
        }));
      }
      lastTime = effectiveAt;
    }

    this.#states = states;
    this.#events.push(...events);
    return events.map((event) => structuredClone(event));
  }

  auditLog({ afterVersion = 0 } = {}) {
    if (!Number.isSafeInteger(afterVersion) || afterVersion < 0) {
      throw new TypeError("afterVersion must be a non-negative safe integer");
    }
    return this.#events
      .filter(({ version }) => version > afterVersion)
      .map((event) => structuredClone(event));
  }

  stateAt(identityId, { version = this.version, at } = {}) {
    requireId(identityId, "identityId");
    if (!Number.isSafeInteger(version) || version < 0 || version > this.version) {
      throw new RangeError("version is outside the audit log");
    }
    const cutoff = at === undefined ? null : timestamp(at, "at");
    const states = new Map();
    for (const event of this.#events) {
      if (event.version > version || (cutoff && event.effectiveAt > cutoff)) continue;
      replayEvent(states, event);
    }
    const state = states.get(identityId);
    return state ? publicState(state, version, cutoff) : null;
  }

  canCastNewBallot(identityId, { at = this.#clock() } = {}) {
    const state = this.stateAt(identityId, { at });
    return decision(state);
  }

  electionStatus(identityId, { closesAt, acceptedBallotAt = null, at = this.#clock() }) {
    const close = timestamp(closesAt, "closesAt");
    const observed = timestamp(at, "at");
    const accepted = acceptedBallotAt === null ? null : timestamp(acceptedBallotAt, "acceptedBallotAt");
    if (accepted && accepted > close) {
      throw transitionError("BALLOT_AFTER_CLOSE", "An accepted ballot cannot postdate election close");
    }
    if (accepted) {
      return freeze({ status: "ACCEPTED", retained: true, acceptedBallotAt: accepted });
    }
    if (observed > close) {
      return freeze({ status: "CLOSED", retained: false, ...decision(this.stateAt(identityId, { at: close })) });
    }
    return freeze({
      status: "OPEN",
      retained: false,
      ...decision(this.stateAt(identityId, { at: observed })),
    });
  }
}

function reduceCommand(states, command, effectiveAt) {
  if (!command || typeof command !== "object") throw transitionError("INVALID_COMMAND", "Transition must be an object");
  const { type } = command;
  if (type === EVENT_TYPES.C4_CREATION_EVENT_OPEN) {
    const proceedingId = requireId(command.proceedingId, "proceedingId");
    if (!command.authentication || typeof command.authentication !== "object" || !requireOptionalId(command.authentication.authorityId)) {
      throw transitionError("UNAUTHENTICATED_C4", "C4 creation requires authenticated authority evidence");
    }
    if (!Array.isArray(command.affectedIdentityIds) || command.affectedIdentityIds.length === 0) {
      throw transitionError("EMPTY_AFFECTED_LIST", "C4 creation requires an affected-identity list");
    }
    const ids = command.affectedIdentityIds.map((id) => requireId(id, "affectedIdentityId"));
    if (new Set(ids).size !== ids.length) throw transitionError("DUPLICATE_AFFECTED_IDENTITY", "C4 affected identities must be unique");
    for (const identityId of ids) {
      const state = livingState(states, identityId);
      if (state.c4.has(proceedingId)) throw transitionError("REPEATED_TRANSITION", `C4 restriction ${proceedingId} is already open for ${identityId}`);
      state.c4.add(proceedingId);
    }
    return [{ type, affectedIdentityIds: ids, proceedingId, authentication: structuredClone(command.authentication) }];
  }

  const identityId = requireId(command.identityId, "identityId");
  if (type === EVENT_TYPES.IDENTITY_REGISTERED) {
    if (states.has(identityId)) throw transitionError("REPEATED_TRANSITION", `${identityId} is already registered`);
    states.set(identityId, initialState(identityId));
    return [{ type, identityId }];
  }
  const state = existingState(states, identityId);
  const proceedingId = command.proceedingId && requireId(command.proceedingId, "proceedingId");
  switch (type) {
    case EVENT_TYPES.ALLEGATION_RECORDED:
      state.allegations += 1;
      return [{ type, identityId, allegationId: requireId(command.allegationId, "allegationId") }];
    case EVENT_TYPES.FORMAL_PROCEEDING_OPENED:
      assertLiving(state);
      if (state.formal.has(proceedingId)) throw transitionError("REPEATED_TRANSITION", "Formal proceeding is already open");
      state.formal.add(proceedingId);
      return [{ type, identityId, proceedingId }];
    case EVENT_TYPES.FORMAL_PROCEEDING_CLOSED:
      if (!state.formal.delete(proceedingId)) throw transitionError("INVALID_TRANSITION", "Formal proceeding is not open");
      return [{ type, identityId, proceedingId }];
    case EVENT_TYPES.C4_RESTRICTION_CLOSED:
      if (!state.c4.delete(proceedingId)) throw transitionError("INVALID_TRANSITION", "C4 restriction is not open");
      return [{ type, identityId, proceedingId }];
    case EVENT_TYPES.DEATH_RECORDED:
    case EVENT_TYPES.CAPITAL_TERMINATION_RECORDED:
      assertLiving(state);
      state.terminal = type === EVENT_TYPES.DEATH_RECORDED ? "DECEASED" : "CAPITAL_TERMINATED";
      state.formal.clear();
      state.c4.clear();
      return [{ type, identityId }];
    case EVENT_TYPES.FELONY_CONVICTION_ENTERED:
      assertLiving(state);
      if (state.felonyBar) throw transitionError("REPEATED_TRANSITION", "Permanent felony franchise bar already exists");
      state.felonyBar = true;
      return [{ type, identityId, convictionId: requireId(command.convictionId, "convictionId") }];
    default:
      throw transitionError("UNKNOWN_TRANSITION", `Unknown eligibility transition: ${String(type)}`);
  }
}

function replayEvent(states, event) {
  if (event.type === EVENT_TYPES.IDENTITY_REGISTERED) {
    states.set(event.identityId, initialState(event.identityId));
    return;
  }
  if (event.type === EVENT_TYPES.C4_CREATION_EVENT_OPEN) {
    for (const identityId of event.affectedIdentityIds) existingState(states, identityId).c4.add(event.proceedingId);
    return;
  }
  const state = existingState(states, event.identityId);
  if (event.type === EVENT_TYPES.ALLEGATION_RECORDED) state.allegations += 1;
  else if (event.type === EVENT_TYPES.FORMAL_PROCEEDING_OPENED) state.formal.add(event.proceedingId);
  else if (event.type === EVENT_TYPES.FORMAL_PROCEEDING_CLOSED) state.formal.delete(event.proceedingId);
  else if (event.type === EVENT_TYPES.C4_RESTRICTION_CLOSED) state.c4.delete(event.proceedingId);
  else if (event.type === EVENT_TYPES.FELONY_CONVICTION_ENTERED) state.felonyBar = true;
  else if (event.type === EVENT_TYPES.DEATH_RECORDED || event.type === EVENT_TYPES.CAPITAL_TERMINATION_RECORDED) {
    state.terminal = event.type === EVENT_TYPES.DEATH_RECORDED ? "DECEASED" : "CAPITAL_TERMINATED";
    state.formal.clear(); state.c4.clear();
  }
}

function decision(state) {
  if (!state) return freeze({ eligible: false, reason: "NOT_REGISTERED" });
  if (typeof state.eligible === "boolean") {
    return freeze({ eligible: state.eligible, reason: state.reason });
  }
  if (state.terminal) return freeze({ eligible: false, reason: state.terminal });
  if (state.felonyBar) return freeze({ eligible: false, reason: "PERMANENT_FELONY_BAR" });
  if (state.formal.size) return freeze({ eligible: false, reason: "FORMAL_PROCEEDING" });
  if (state.c4.size) return freeze({ eligible: false, reason: "C4_TEMPORARY_RESTRICTION" });
  return freeze({ eligible: true, reason: null });
}

function publicState(state, version, at) {
  return freeze({ identityId: state.identityId, version, at, living: !state.terminal,
    terminalStatus: state.terminal, permanentlyDisenfranchised: state.felonyBar,
    openFormalProceedingIds: [...state.formal].sort(), openC4RestrictionIds: [...state.c4].sort(),
    allegationCount: state.allegations, ...decision(state) });
}
function initialState(identityId) { return { identityId, terminal: null, felonyBar: false, allegations: 0, formal: new Set(), c4: new Set() }; }
function cloneStates(states) { return new Map([...states].map(([id, s]) => [id, { ...s, formal: new Set(s.formal), c4: new Set(s.c4) }])); }
function existingState(states, id) { const state = states.get(id); if (!state) throw transitionError("UNKNOWN_IDENTITY", `${id} is not registered`); return state; }
function livingState(states, id) { const state = existingState(states, id); assertLiving(state); return state; }
function assertLiving(state) { if (state.terminal) throw transitionError("TERMINAL_IDENTITY", "Death or capital termination is final"); }
function requireId(value, field) { if (typeof value !== "string" || !value.trim()) throw transitionError("INVALID_IDENTIFIER", `${field} must be a non-empty string`); return value.trim(); }
function requireOptionalId(value) { return typeof value === "string" && Boolean(value.trim()); }
function timestamp(value, field) { const date = value instanceof Date ? value : new Date(value); if (Number.isNaN(date.valueOf())) throw transitionError("INVALID_TIME", `${field} must be a valid date`); return date.toISOString(); }
function transitionError(code, message) { return new EligibilityTransitionError(code, message); }
function freeze(value) { return Object.freeze(value); }
