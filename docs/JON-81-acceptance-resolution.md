# JON-81 acceptance resolution

This review evaluates the recovered JON-81 candidate published at
`a090a67719681b04683f1f87c35d4080ea0854f5` (pull request 9). It preserves
that candidate's verified tree, arithmetic, fixtures, and provenance. The
candidate is not ready to leave In Review.

## Findings

1. **Authoritative accepted receipts/events: fails.**
   `ElectorateAccounting.recordBallot(identity, choice)` independently decides
   whether a ballot is accepted and stores the choice in its own in-memory map.
   It does not consume JON-80 `accepted_ballots` receipts or their immutable
   `receiptId`, `acceptedAt`, and `submissionDigest` evidence. This is a second
   ballot-acceptance authority rather than a projection of the ballot producer.

2. **Authoritative eligibility transitions: fails.**
   `setEligibility(identity, boolean)` accepts an unversioned caller-supplied
   boolean. It neither consumes JON-79 audit events nor records the eligibility
   authority's version/effective time used at close. The arithmetic tests model
   the intended pre-ballot, post-ballot, and restoration behavior, but do not
   prove the source or ordering of those decisions.

3. **Durable close and frozen-result evidence: fails.**
   `close()` changes only an in-memory flag. The candidate has no durable close
   record, authoritative ordering/version evidence, immutable frozen result, or
   recovery API. A process restart loses the opening roll, B, U, D, attempts,
   close state, and thresholds.

4. **Exact accounting across restart/recovery: fails.**
   While a live instance constructs unique, disjoint B and U sets and computes
   `D = |B| + |U|`, no restart/recovery fixture exists. Consequently the exact
   invariant is established only for transient state, not recovered state.

5. **Shared exports and documentation: unresolved.**
   JON-79 and JON-80 both publish `./governance` through
   `src/governance/index.js`; JON-81 separately publishes
   `./governance/electorate`. Each recovery branch also edits the same
   `package.json` check command and changelog area. The candidates have not been
   composed into one export surface, and JON-81's documentation still describes
   direct ballot acceptance and direct eligibility mutation.

6. **Required before acceptance.**
   Keep the exact threshold functions and arithmetic fixtures. Replace the
   mutable intake class with a read-side projection that:

   - receives only JON-80 accepted-receipt records for B;
   - receives opening-roll and close-time, versioned JON-79 eligibility evidence
     for U;
   - records the election ID, authoritative close instant/order, producer
     versions or cursors, and receipt/event evidence references;
   - persists an immutable frozen result and validates it during recovery;
   - proves after a real store restart that B and U are unique and disjoint and
     that D and all thresholds reproduce exactly; and
   - exports through the shared `./governance` index with the JON-79/JON-80
     package, check-script, changelog, and documentation edits reconciled.

## Narrow follow-up boundary

Implement one producer-boundary adapter and frozen-result repository after the
accepted JON-79 and JON-80 revisions are pinned. JON-80 remains the sole ballot
acceptance authority; JON-79 remains the sole eligibility authority; JON-81 only
projects their durable evidence. Do not add submission validation, eligibility
state transitions, or another ballot/eligibility store to JON-81.

Acceptance requires focused projection/recovery tests plus the repository's
normal `npm run check` and `npm test` checks. Until those changes and producer
pins exist, keep JON-81 In Review.

## Evidence reviewed

- JON-81 recovery PR 9 and commit
  `a090a67719681b04683f1f87c35d4080ea0854f5` (verified recovered tree
  `053109bf4d49cbe571d9e938d3837cdfa41ae055`).
- JON-79 recovery PR 7 and commit
  `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`.
- JON-80 recovery PR 8 and commit
  `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf`.
- Fresh Node 22 and Node 24 checks reported successful on all three recovery
  pull requests. Those checks establish isolated candidate behavior, not the
  missing producer-boundary composition or restart recovery.
