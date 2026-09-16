# Exact electorate accounting

`src/governance/electorate.js` is the authoritative, per-election accounting
interface. Construct `ElectorateAccounting` from the immutable opening-roll
identity IDs and, if necessary, the subset eligible at opening.

- `recordBallot(identity, choice)` accepts only the first valid ballot from an
  eligible opening-roll identity. `choice` may be `"abstain"`; the accounting
  layer deliberately does not interpret choices. Every attempt is retained in
  `attempts`, while duplicates and ineligible/non-roll attempts do not enter B.
- `setEligibility(identity, boolean)` applies an authoritative eligibility
  transition before close. Removing eligibility affects U only: an identity
  already in B remains counted. Restoration returns an opening-roll nonvoter to
  U only while the election remains open.
- `snapshot()` returns B as `acceptedBallotIdentities`, U as
  `eligibleNonvoterIdentities`, and D as `electorateSize`. The lists are unique
  and disjoint by construction, and D is computed as their exact combined size.
- `close()` freezes the election. Ballots and eligibility changes after close
  are rejected, so later restoration cannot reopen or alter the result.

`electorateThresholds(D)` returns exact integer requirements for 60%,
two-thirds, three-quarters, strict majority, and unanimity.
`thresholdPasses(name, affirmativeBallots, D)` is the authoritative pass check
and always returns false when D is zero.
