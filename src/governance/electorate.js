const THRESHOLD_NAMES = Object.freeze([
  "sixtyPercent",
  "twoThirds",
  "threeQuarters",
  "strictMajority",
  "unanimity",
]);

/**
 * Return the exact number of affirmative ballots required for each threshold.
 * Integer arithmetic is used throughout; a zero electorate has no passing
 * threshold, including unanimity.
 */
export function electorateThresholds(electorateSize) {
  assertNonNegativeSafeInteger(electorateSize, "electorateSize");
  const d = BigInt(electorateSize);
  return Object.freeze({
    sixtyPercent: Number(ceilRatio(3n * d, 5n)),
    twoThirds: Number(ceilRatio(2n * d, 3n)),
    threeQuarters: Number(ceilRatio(3n * d, 4n)),
    strictMajority: Number(d / 2n + 1n),
    unanimity: electorateSize,
  });
}

export function thresholdPasses(name, affirmativeBallots, electorateSize) {
  if (!THRESHOLD_NAMES.includes(name)) {
    throw new TypeError(`Unknown threshold: ${name}`);
  }
  assertNonNegativeSafeInteger(affirmativeBallots, "affirmativeBallots");
  const thresholds = electorateThresholds(electorateSize);
  if (affirmativeBallots > electorateSize) {
    throw new RangeError("affirmativeBallots cannot exceed electorateSize");
  }
  return electorateSize > 0 && affirmativeBallots >= thresholds[name];
}

/**
 * Authoritative per-election accounting for an immutable opening roll.
 *
 * B contains opening-roll identities with a first valid accepted ballot
 * (including abstention). U contains opening-roll nonvoters that currently
 * remain eligible. Disqualification never removes an accepted ballot from B.
 * Closing freezes the accounting, so a later restoration cannot alter D.
 */
export class ElectorateAccounting {
  #openingRoll;
  #eligible;
  #ballots = new Map();
  #attempts = [];
  #closed = false;

  constructor(openingRoll, { eligible = openingRoll } = {}) {
    this.#openingRoll = identitySet(openingRoll, "openingRoll");
    this.#eligible = identitySet(eligible, "eligible");
    for (const identity of this.#eligible) {
      if (!this.#openingRoll.has(identity)) {
        throw new RangeError(`Eligible identity is not on the opening roll: ${identity}`);
      }
    }
  }

  recordBallot(identity, choice) {
    this.#assertOpen();
    let status = "accepted";
    if (!this.#openingRoll.has(identity)) status = "not-on-opening-roll";
    else if (this.#ballots.has(identity)) status = "duplicate";
    else if (!this.#eligible.has(identity)) status = "ineligible";

    const attempt = Object.freeze({ identity, choice, status });
    this.#attempts.push(attempt);
    if (status === "accepted") this.#ballots.set(identity, choice);
    return attempt;
  }

  setEligibility(identity, eligible) {
    this.#assertOpen();
    if (typeof eligible !== "boolean") throw new TypeError("eligible must be a boolean");
    if (!this.#openingRoll.has(identity)) {
      throw new RangeError(`Identity is not on the opening roll: ${identity}`);
    }
    if (eligible) this.#eligible.add(identity);
    else this.#eligible.delete(identity);
    return this.snapshot();
  }

  close() {
    this.#closed = true;
    return this.snapshot();
  }

  snapshot() {
    const acceptedBallotIdentities = [...this.#ballots.keys()];
    const eligibleNonvoterIdentities = [...this.#eligible].filter(
      (identity) => !this.#ballots.has(identity),
    );
    const electorateSize = acceptedBallotIdentities.length + eligibleNonvoterIdentities.length;
    return Object.freeze({
      acceptedBallotIdentities: Object.freeze(acceptedBallotIdentities),
      eligibleNonvoterIdentities: Object.freeze(eligibleNonvoterIdentities),
      electorateSize,
      thresholds: electorateThresholds(electorateSize),
      closed: this.#closed,
    });
  }

  get attempts() {
    return Object.freeze([...this.#attempts]);
  }

  #assertOpen() {
    if (this.#closed) throw new Error("Election accounting is closed");
  }
}

function identitySet(identities, name) {
  if (identities == null || typeof identities[Symbol.iterator] !== "function") {
    throw new TypeError(`${name} must be iterable`);
  }
  const values = [...identities];
  for (const identity of values) {
    if (typeof identity !== "string" || identity.length === 0) {
      throw new TypeError(`${name} identities must be non-empty strings`);
    }
  }
  const result = new Set(values);
  if (result.size !== values.length) throw new Error(`${name} contains a duplicate identity`);
  return result;
}

function ceilRatio(numerator, denominator) {
  return (numerator + denominator - 1n) / denominator;
}

function assertNonNegativeSafeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer`);
  }
}
