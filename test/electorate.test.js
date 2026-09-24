import assert from "node:assert/strict";
import test from "node:test";

import {
  ElectorateAccounting,
  electorateThresholds,
  thresholdPasses,
} from "../src/governance/electorate.js";

test("threshold arithmetic is integer-exact at zero, one, and boundaries", () => {
  assert.deepEqual(electorateThresholds(0), {
    sixtyPercent: 0,
    twoThirds: 0,
    threeQuarters: 0,
    strictMajority: 1,
    unanimity: 0,
  });
  assert.deepEqual(electorateThresholds(1), {
    sixtyPercent: 1,
    twoThirds: 1,
    threeQuarters: 1,
    strictMajority: 1,
    unanimity: 1,
  });

  for (let d = 0; d <= 100; d += 1) {
    const values = electorateThresholds(d);
    assert.equal(values.sixtyPercent, Math.ceil((3 * d) / 5));
    assert.equal(values.twoThirds, Math.ceil((2 * d) / 3));
    assert.equal(values.threeQuarters, Math.ceil((3 * d) / 4));
    assert.equal(values.strictMajority, Math.floor(d / 2) + 1);
    assert.equal(values.unanimity, d);
    for (const [name, required] of Object.entries(values)) {
      assert.equal(thresholdPasses(name, Math.max(0, required - 1), d), false);
      if (d > 0) assert.equal(thresholdPasses(name, required, d), true);
    }
  }
});

test("B includes abstention, U contains only eligible nonvoters, and duplicates do not replace", () => {
  const election = new ElectorateAccounting(["ada", "bea", "cy"]);
  assert.equal(election.recordBallot("ada", "abstain").status, "accepted");
  assert.equal(election.recordBallot("ada", "yes").status, "duplicate");

  const result = election.snapshot();
  assert.deepEqual(result.acceptedBallotIdentities, ["ada"]);
  assert.deepEqual(result.eligibleNonvoterIdentities, ["bea", "cy"]);
  assert.equal(result.electorateSize, 3);
  assert.equal(election.attempts.length, 2);
});

test("pre-ballot disqualification removes U and restoration before close returns it", () => {
  const election = new ElectorateAccounting(["ada", "bea"]);
  election.setEligibility("bea", false);
  assert.deepEqual(election.snapshot().eligibleNonvoterIdentities, ["ada"]);
  assert.equal(election.recordBallot("bea", "yes").status, "ineligible");
  election.setEligibility("bea", true);
  assert.deepEqual(election.snapshot().eligibleNonvoterIdentities, ["ada", "bea"]);
});

test("post-ballot disqualification retains B and restoration after close cannot change D", () => {
  const election = new ElectorateAccounting(["ada", "bea"]);
  election.recordBallot("ada", "yes");
  election.setEligibility("ada", false);
  election.setEligibility("bea", false);
  const closed = election.close();
  assert.deepEqual(closed.acceptedBallotIdentities, ["ada"]);
  assert.deepEqual(closed.eligibleNonvoterIdentities, []);
  assert.equal(closed.electorateSize, 1);
  assert.throws(() => election.setEligibility("bea", true), /closed/);
  assert.deepEqual(election.snapshot(), closed);
});

test("snapshots mechanically prove B and U are disjoint and D equals their sizes", () => {
  const election = new ElectorateAccounting(["a", "b", "c", "d"]);
  election.recordBallot("a", "no");
  election.recordBallot("b", "abstain");
  election.setEligibility("c", false);
  const { acceptedBallotIdentities: b, eligibleNonvoterIdentities: u, electorateSize: d } =
    election.snapshot();
  assert.deepEqual([...new Set([...b, ...u])], [...b, ...u]);
  assert.equal(b.filter((identity) => u.includes(identity)).length, 0);
  assert.equal(d, b.length + u.length);
});

test("opening roll and electorate inputs reject duplicates and invalid counts", () => {
  assert.throws(() => new ElectorateAccounting(["a", "a"]), /duplicate/);
  assert.throws(() => new ElectorateAccounting(["a"], { eligible: ["b"] }), /opening roll/);
  assert.throws(() => electorateThresholds(-1), /non-negative safe integer/);
  assert.throws(() => thresholdPasses("unanimity", 2, 1), /cannot exceed/);
  const election = new ElectorateAccounting(["a"]);
  assert.throws(() => election.setEligibility("a", "false"), /boolean/);
});
