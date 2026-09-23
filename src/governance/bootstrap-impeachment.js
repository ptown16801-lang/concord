import { createHash } from "node:crypto";

const STAGES = Object.freeze({
  WAITING: "WAITING_FOR_INDEPENDENT_PARTICIPANTS",
  ACCUSATION: "ACCUSATION_VOTING",
  TRIAL: "TRIAL_VOTING",
  ACQUITTED: "ACQUITTED",
  CONVICTED: "CONVICTED",
});

export const ImpeachmentStage = STAGES;

export class BootstrapImpeachmentError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "BootstrapImpeachmentError";
    this.code = code;
  }
}

/** Frozen revision 1.0 capped proportional sizing. */
export function bootstrapPanelSizes(eligiblePopulation) {
  integer(eligiblePopulation, "eligiblePopulation", 0);
  return Object.freeze({
    accusation: Math.min(12, Math.max(3, Math.ceil(eligiblePopulation / 10))),
    trial: Math.min(24, Math.max(6, Math.ceil(eligiblePopulation / 5))),
  });
}

export function accusationThreshold(size) {
  integer(size, "size", 1);
  if (size <= 3) return size;
  if (size <= 5) return Math.ceil((2 * size) / 3);
  return Math.floor(size / 2) + 1;
}

export function trialThreshold(size) {
  integer(size, "size", 1);
  return size <= 8 ? Math.ceil((3 * size) / 4) : Math.ceil((2 * size) / 3);
}

/**
 * Deterministic, independently reproducible selection. Division is a balancing
 * factor, never a reserved-seat entitlement. Judges and known case conflicts
 * are excluded before ranking, and accusation/trial rosters are disjoint.
 */
export function selectBootstrapPanels({ candidates, population, caseId, accusedId }) {
  if (!Array.isArray(candidates)) fail("INVALID_CANDIDATES", "candidates must be an array");
  id(caseId, "caseId");
  id(accusedId, "accusedId");
  const sizes = bootstrapPanelSizes(population);
  const eligible = candidates.filter((candidate) => candidate
    && typeof candidate.id === "string"
    && candidate.id !== accusedId
    && candidate.eligible === true
    && candidate.servingJudge !== true
    && candidate.caseConflict !== true);
  const unique = new Map(eligible.map((candidate) => [candidate.id, Object.freeze({ ...candidate })]));
  const ranked = balancedRank([...unique.values()], caseId);
  if (ranked.length < sizes.accusation + sizes.trial) {
    return Object.freeze({ stage: STAGES.WAITING, reason: "INSUFFICIENT_DISJOINT_POOL", sizes,
      available: ranked.length, accusation: [], trial: [], alternates: [] });
  }

  const house = ranked.filter((person) => person.houseMember === true);
  const accusationSource = house.length >= sizes.accusation ? "HOUSE" : "CIVILIAN_SORTITION";
  const accusationPool = accusationSource === "HOUSE" ? house : ranked;
  const accusation = accusationPool.slice(0, sizes.accusation);
  const used = new Set(accusation.map(({ id: participantId }) => participantId));
  const remaining = ranked.filter(({ id: participantId }) => !used.has(participantId));
  const senate = remaining.filter((person) => person.senator === true);
  const trialSource = senate.length >= sizes.trial ? "SENATE" : "CIVILIAN_SORTITION";
  const trialPool = trialSource === "SENATE" ? senate : remaining;
  const trial = trialPool.slice(0, sizes.trial);
  const selected = new Set([...used, ...trial.map(({ id: participantId }) => participantId)]);
  return Object.freeze({ stage: STAGES.ACCUSATION, sizes, accusationSource, trialSource,
    accusation, trial, alternates: ranked.filter(({ id: participantId }) => !selected.has(participantId)) });
}

/**
 * Authenticated command façade over a caller-supplied durable event store.
 * The store must implement load(caseId) and append(caseId, expectedVersion,
 * events); this domain service intentionally supplies no in-memory production
 * authority.
 */
export class BootstrapImpeachmentService {
  #store;
  #authorize;
  #eligibility;
  #population;

  constructor({ eventStore, authorize, eligibilityRegistry, populationRegistry }) {
    if (!eventStore?.load || !eventStore?.append) fail("DURABLE_STORE_REQUIRED", "A durable event store is required");
    if (typeof authorize !== "function") fail("AUTHORIZER_REQUIRED", "An authorizer is required");
    if (!eligibilityRegistry?.canCastNewBallot) fail("ELIGIBILITY_REQUIRED", "The eligibility authority is required");
    if (!populationRegistry?.getPopulation) fail("POPULATION_REQUIRED", "The population authority is required");
    this.#store = eventStore;
    this.#authorize = authorize;
    this.#eligibility = eligibilityRegistry;
    this.#population = populationRegistry;
  }

  async openCase({ caseId, accusedId, candidates, actor }) {
    await this.#allowed(actor, "IMPEACHMENT_OPEN");
    const prior = await this.#store.load(caseId);
    if (prior.length) fail("CASE_EXISTS", `${caseId} already exists`);
    const population = (await this.#population.getPopulation()).living;
    const assessed = candidates.map((candidate) => ({ ...candidate,
      eligible: this.#eligibility.canCastNewBallot(candidate.id).eligible }));
    const selection = selectBootstrapPanels({ candidates: assessed, population, caseId, accusedId });
    const event = { type: "CASE_OPENED", caseId, accusedId, actorId: actor.id, selection };
    await this.#store.append(caseId, 0, [event]);
    return stateFrom([event]);
  }

  async replaceParticipant({ caseId, participantId, actor }) {
    await this.#allowed(actor, "IMPEACHMENT_REPLACE");
    const events = await this.#store.load(caseId);
    const state = stateFrom(events);
    if ([STAGES.ACQUITTED, STAGES.CONVICTED].includes(state.stage)) fail("CASE_TERMINAL", "The case is terminal");
    const side = state.accusation.some((p) => p.id === participantId) ? "accusation"
      : state.trial.some((p) => p.id === participantId) ? "trial" : null;
    if (!side) fail("NOT_ASSIGNED", `${participantId} is not assigned`);
    const occupied = new Set([...state.accusation, ...state.trial].map(({ id: personId }) => personId));
    const replacement = state.alternates.find((person) => !occupied.has(person.id)
      && this.#eligibility.canCastNewBallot(person.id).eligible);
    const event = replacement
      ? { type: "PARTICIPANT_REPLACED", participantId, replacement, side, actorId: actor.id }
      : { type: "PARTICIPANT_REPLACEMENT_WAIT", participantId, side, actorId: actor.id };
    await this.#store.append(caseId, events.length, [event]);
    return stateFrom([...events, event]);
  }

  async recordVote({ caseId, side, participantId, vote, actor }) {
    await this.#allowed(actor, "IMPEACHMENT_VOTE");
    if (actor.id !== participantId) fail("ACTOR_MISMATCH", "A participant may record only their own vote");
    if (!['YES', 'NO'].includes(vote)) fail("INVALID_VOTE", "vote must be YES or NO");
    const events = await this.#store.load(caseId);
    const state = stateFrom(events);
    const roster = side === "accusation" ? state.accusation : side === "trial" ? state.trial : null;
    if (!roster) fail("INVALID_SIDE", "side must be accusation or trial");
    if ((side === "accusation" && state.stage !== STAGES.ACCUSATION)
      || (side === "trial" && state.stage !== STAGES.TRIAL)) fail("WRONG_STAGE", "Voting is not open for that side");
    if (!roster.some(({ id: personId }) => personId === participantId)) fail("NOT_ASSIGNED", "Voter is not assigned");
    if (state.votes[side][participantId]) fail("DUPLICATE_VOTE", "A vote is already recorded");
    const nextVotes = { ...state.votes[side], [participantId]: vote };
    const emitted = [{ type: "VOTE_RECORDED", side, participantId, vote, actorId: actor.id }];
    if (Object.keys(nextVotes).length === roster.length) {
      const yes = Object.values(nextVotes).filter((value) => value === "YES").length;
      const passed = yes >= (side === "accusation" ? accusationThreshold(roster.length) : trialThreshold(roster.length));
      emitted.push({ type: "BALLOT_CLOSED", side, yes, passed });
    }
    await this.#store.append(caseId, events.length, emitted);
    return stateFrom([...events, ...emitted]);
  }

  async getCase(caseId) { return stateFrom(await this.#store.load(caseId)); }

  async #allowed(actor, permission) {
    if (!actor?.id || !actor.authentication || !(await this.#authorize(actor, permission))) {
      fail("UNAUTHORIZED", `Authenticated ${permission} authority is required`);
    }
  }
}

function stateFrom(events) {
  if (!events.length) fail("CASE_NOT_FOUND", "Case does not exist");
  const opened = events[0];
  const state = { caseId: opened.caseId, accusedId: opened.accusedId, stage: opened.selection.stage,
    accusation: [...opened.selection.accusation], trial: [...opened.selection.trial],
    alternates: [...opened.selection.alternates], accusationSource: opened.selection.accusationSource,
    trialSource: opened.selection.trialSource, votes: { accusation: {}, trial: {} }, version: events.length };
  for (const event of events.slice(1)) {
    if (event.type === "PARTICIPANT_REPLACED") {
      state[event.side] = state[event.side].map((person) => person.id === event.participantId ? event.replacement : person);
      state.alternates = state.alternates.filter((person) => person.id !== event.replacement.id);
    } else if (event.type === "PARTICIPANT_REPLACEMENT_WAIT") state.stage = STAGES.WAITING;
    else if (event.type === "VOTE_RECORDED") state.votes[event.side][event.participantId] = event.vote;
    else if (event.type === "BALLOT_CLOSED" && event.side === "accusation") state.stage = event.passed ? STAGES.TRIAL : STAGES.ACQUITTED;
    else if (event.type === "BALLOT_CLOSED" && event.side === "trial") state.stage = event.passed ? STAGES.CONVICTED : STAGES.ACQUITTED;
  }
  return Object.freeze(state);
}

function balancedRank(candidates, seed) {
  const divisions = new Map();
  for (const candidate of candidates) {
    const division = candidate.divisionId || "__NONE__";
    if (!divisions.has(division)) divisions.set(division, []);
    divisions.get(division).push(candidate);
  }
  for (const group of divisions.values()) group.sort((a, b) => score(seed, a.id).localeCompare(score(seed, b.id)));
  const divisionOrder = [...divisions.keys()].sort((a, b) => score(seed, a).localeCompare(score(seed, b)));
  const result = [];
  for (let index = 0; result.length < candidates.length; index += 1) {
    for (const division of divisionOrder) if (divisions.get(division)[index]) result.push(divisions.get(division)[index]);
  }
  return result;
}

function score(seed, value) { return createHash("sha256").update(`${seed}\0${value}`).digest("hex"); }
function id(value, field) { if (typeof value !== "string" || !value.trim()) fail("INVALID_IDENTIFIER", `${field} is required`); }
function integer(value, field, minimum) { if (!Number.isSafeInteger(value) || value < minimum) fail("INVALID_NUMBER", `${field} must be an integer >= ${minimum}`); }
function fail(code, message) { throw new BootstrapImpeachmentError(code, message); }
