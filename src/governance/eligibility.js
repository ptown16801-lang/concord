import { EligibilityAuthorization, canonicalJson } from "./eligibility-authorization.js";
import { EligibilityStore } from "./eligibility-store.js";
import { EligibilityTransitionError } from "./eligibility-errors.js";
export { EligibilityTransitionError } from "./eligibility-errors.js";

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

/** Queries always reconstruct from one committed store snapshot; no eligibility cache. */
class EligibilityQueries {
  #store;
  #clock;

  constructor(store, clock) { this.#store = store; this.#clock = clock; }
  close() { this.#store.close(); }
  get version() { return this.#store.snapshot().version; }

  requestReceipt(requestId) { return this.#store.requestReceipt(requireId(requestId, "requestId")); }

  auditLog({ afterVersion = 0 } = {}) {
    if (!Number.isSafeInteger(afterVersion) || afterVersion < 0) throw new TypeError("afterVersion must be a non-negative safe integer");
    return this.#store.snapshot().events.filter(({ version }) => version > afterVersion);
  }

  stateAt(identityId, { version, at } = {}) {
    const snapshot = this.#store.snapshot();
    return stateFromSnapshot(snapshot, identityId, { version: version ?? snapshot.version, at });
  }

  /** Live integration read: caller cannot supply an old time or old eligibility. */
  readEligibility(identityId, { minimumVersion = 0 } = {}) {
    const snapshot = this.#store.snapshot();
    if (!Number.isSafeInteger(minimumVersion) || minimumVersion < 0) throw new TypeError("minimumVersion must be a non-negative safe integer");
    if (snapshot.version < minimumVersion) throw transitionError("STALE_READ", "Authority has not reached the required version");
    const observedAt = timestamp(this.#clock(), "observedAt");
    return freeze({
      authorityId: snapshot.authorityId, identityId: requireId(identityId, "identityId"), version: snapshot.version, observedAt,
      ...decision(stateFromSnapshot(snapshot, identityId, { version: snapshot.version, at: observedAt })),
    });
  }

  canCastNewBallot(identityId, { at = this.#clock() } = {}) {
    return decision(this.stateAt(identityId, { at }));
  }

  // Historical/retention query only: acceptedBallotAt must come from the ballot authority.
  electionStatus(identityId, { closesAt, acceptedBallotAt = null, at = this.#clock(), version }) {
    requireId(identityId, "identityId");
    const close = timestamp(closesAt, "closesAt");
    const observed = timestamp(at, "at");
    const accepted = acceptedBallotAt === null ? null : timestamp(acceptedBallotAt, "acceptedBallotAt");
    if (accepted && accepted > close) throw transitionError("BALLOT_AFTER_CLOSE", "An accepted ballot cannot postdate election close");
    if (accepted) return freeze({ status: "ACCEPTED", retained: true, acceptedBallotAt: accepted });
    return freeze({
      status: observed > close ? "CLOSED" : "OPEN", retained: false,
      ...decision(this.stateAt(identityId, { version, at: observed > close ? close : observed })),
    });
  }
}

/** A separate SQLite read-only connection, suitable for the future Read Service. */
export class EligibilityReader extends EligibilityQueries {
  constructor({ filename, authorityId, clock = () => new Date() } = {}) {
    super(new EligibilityStore({ filename, authorityId, readOnly: true }), clock);
  }
}

/** Writer-service entry point. Construction/configuration belongs to trusted bootstrap. */
export class EligibilityRegistry extends EligibilityQueries {
  #store;
  #authorization;
  #clock;

  constructor({ filename, authorityId, policyGeneration, principals, maxLifetimeMs, clock = () => new Date() } = {}) {
    const authorization = new EligibilityAuthorization({ authorityId, policyGeneration, principals, maxLifetimeMs });
    const store = new EligibilityStore({ filename, authorityId });
    super(store, clock);
    this.#store = store;
    this.#authorization = authorization;
    this.#clock = clock;
  }

  apply(command, options) { return this.applyBatch([command], options)[0]; }

  applyBatch(commands, { expectedVersion, authorization } = {}) {
    if (!Number.isSafeInteger(expectedVersion) || expectedVersion < 0) throw transitionError("EXPECTED_VERSION_REQUIRED", "An explicit expectedVersion is required");
    if (!Array.isArray(commands) || commands.length === 0) throw transitionError("EMPTY_BATCH", "At least one transition is required");
    // Freeze the exact wire value before signature verification or transactional use.
    const batch = JSON.parse(canonicalJson(commands));
    if (batch.some((command) => !command || typeof command !== "object" || Array.isArray(command))) throw transitionError("INVALID_COMMAND", "Transitions must be objects");
    const proof = authorization === undefined ? undefined : JSON.parse(canonicalJson(authorization));
    const verify = () => this.#authorization.verify(batch, { expectedVersion, authorization: proof }, new Date(timestamp(this.#clock(), "recordedAt")).valueOf());
    const evidence = verify();
    return this.#store.append({
      expectedVersion, commands: batch, authorization: evidence,
      buildEvents: (snapshot) => {
        // Recheck expiry after acquiring the writer lock, before doing any writes.
        verify();
        const states = reconstruct(snapshot.events);
        const events = [];
        let lastTime = snapshot.events.at(-1)?.effectiveAt ?? null;
        for (const command of batch) {
          const effectiveAt = timestamp(command.effectiveAt ?? this.#clock(), "effectiveAt");
          if (lastTime && effectiveAt < lastTime) throw transitionError("NON_MONOTONIC_TIME", "Transitions must not predate committed or earlier batch transitions");
          for (const event of reduceCommand(states, command, effectiveAt)) {
            events.push({ ...event, version: snapshot.version + events.length + 1, effectiveAt,
              recordedAt: timestamp(this.#clock(), "recordedAt"), authorization: evidence });
          }
          lastTime = effectiveAt;
        }
        verify();
        return events;
      },
    });
  }
}

function stateFromSnapshot(snapshot, identityId, { version, at }) {
  identityId = requireId(identityId, "identityId");
  if (!Number.isSafeInteger(version) || version < 0 || version > snapshot.version) throw new RangeError("version is outside the audit log");
  const cutoff = at === undefined ? null : timestamp(at, "at");
  const states = reconstruct(snapshot.events.filter((event) => event.version <= version && (!cutoff || event.effectiveAt <= cutoff)));
  const state = states.get(identityId);
  return state ? publicState(state, version, cutoff) : null;
}

function reconstruct(events) {
  const states = new Map();
  let lastTime = null;
  try {
    for (const event of events) {
      if (timestamp(event.effectiveAt, "effectiveAt") !== event.effectiveAt || (lastTime && event.effectiveAt < lastTime)) throw new Error("Invalid event time");
      reduceCommand(states, event, event.effectiveAt);
      lastTime = event.effectiveAt;
    }
  } catch (error) {
    throw transitionError("CORRUPT_HISTORY", `Invalid committed transition: ${error.message}`);
  }
  return states;
}

function reduceCommand(states, command, effectiveAt) {
  if (!command || typeof command !== "object") throw transitionError("INVALID_COMMAND", "Transition must be an object");
  if (Object.hasOwn(command, "authentication")) throw transitionError("INVALID_COMMAND", "Caller-supplied authentication is not authority evidence");
  const { type } = command;
  if (type === EVENT_TYPES.C4_CREATION_EVENT_OPEN) {
    const proceedingId = requireId(command.proceedingId, "proceedingId");
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
    return [{ type, affectedIdentityIds: ids, proceedingId }];
  }

  const identityId = requireId(command.identityId, "identityId");
  if (type === EVENT_TYPES.IDENTITY_REGISTERED) {
    if (states.has(identityId)) throw transitionError("REPEATED_TRANSITION", `${identityId} is already registered`);
    states.set(identityId, initialState(identityId));
    return [{ type, identityId }];
  }
  const state = existingState(states, identityId);
  const proceedingId = [EVENT_TYPES.FORMAL_PROCEEDING_OPENED, EVENT_TYPES.FORMAL_PROCEEDING_CLOSED, EVENT_TYPES.C4_RESTRICTION_CLOSED].includes(type)
    ? requireId(command.proceedingId, "proceedingId") : undefined;
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
function existingState(states, id) { const state = states.get(id); if (!state) throw transitionError("UNKNOWN_IDENTITY", `${id} is not registered`); return state; }
function livingState(states, id) { const state = existingState(states, id); assertLiving(state); return state; }
function assertLiving(state) { if (state.terminal) throw transitionError("TERMINAL_IDENTITY", "Death or capital termination is final"); }
function requireId(value, field) { if (typeof value !== "string" || !value.trim()) throw transitionError("INVALID_IDENTIFIER", `${field} must be a non-empty string`); return value.trim(); }
function timestamp(value, field) { const date = value instanceof Date ? value : new Date(value); if (Number.isNaN(date.valueOf())) throw transitionError("INVALID_TIME", `${field} must be a valid date`); return date.toISOString(); }
function transitionError(code, message) { return new EligibilityTransitionError(code, message); }
function freeze(value) { return Object.freeze(value); }
