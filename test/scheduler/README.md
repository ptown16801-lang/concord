# Synthetic scheduler evaluation harness (JON-128)

Run `node --test test/scheduler/*.test.js`, `npm test`, and `npm run check`.
The harness uses only Node built-ins and fabricated agent-to-work scenarios.

The deterministic baseline reserves eligible incumbents before assigning new work,
then rotates otherwise-equal eligible agents using assignment history and stable IDs.
Missing capacity leaves work unassigned. Durations and authoritative changes use
discrete rounds; observations remain separate rather than forming a weighted score.

An injected checker must approve a proposal before it can apply. A failed candidate
proposer uses the deterministic baseline, still subject to the checker. Checker
failure records the fallback proposal but freezes ordinary work and preserves the
incumbent checkpoint. Recovery needs a new successful check. This first harness
does not implement standby services or essential-continuity exceptions.

Policy identity/version/provenance bindings cannot be rebound within a scenario.
Fixture objects have an explicit schema; nested extra payloads are rejected. Fixture
authors must still supply fabricated, opaque strings: schema validation cannot prove
that a string contains no real-world information.

## Trace and adapter contract

- Each round records `requestedPolicy` from the fixture and `executedPolicy` for the
  proposer that actually ran. Direct baseline execution and policy-failure fallback
  use `BASELINE_POLICY` from `baseline.js`. Its version must change when its algorithm
  changes. An injected candidate's declared identity comes from the fixture; this
  harness does not authenticate third-party implementations.
- The candidate receives the requested policy in its snapshot. The checker receives
  the executed policy as `proposal.policy` and `snapshot.policy`, with the original
  request separately available as `requestedPolicy`. A checker-outage trace includes
  a `fallbackProposal` with baseline identity, but that proposal is not applied.
- Checker responses are `{ outcome: "approved" | "rejected" | "failed", reason?:
  string | null }`. Evidence is copied, normalized, and frozen as it is captured.
  Object-valued reasons and other malformed outcomes fail closed. Thrown checker
  errors use the stable `checker-error` code rather than retaining error objects.
- `waitRounds` counts consecutive unassigned rounds since arrival, resetting on
  service; `totalWaitRounds` counts all unassigned rounds since arrival; `ageRounds`
  counts elapsed rounds since arrival including service. Waiting includes unavailable
  capacity and checker holds; consult `gap` to distinguish them.
- `authoritativeChanges` preserves the applied immutable fixture events and their
  provenance/effective round, including rounds with no remaining task records.
- Multiple writes to the same authority field/target in one round are rejected.
  Independent events are sorted solely for canonical replay. IDs and provenance use
  a total UTF-16 code-unit order, independent of locale; Unicode normalization is not
  applied, so distinct strings remain distinct identifiers.

`audit-regressions.test.js` covers JON-139 findings A1–A6, including policy fallback,
authority conflicts, waiting across pauses/resumption, Unicode permutations,
cancellation/event evidence, and checker-owned mutable payloads. Ten of its eleven
tests fail on the audited pre-fix commit `9965976`; the valid string-reason reuse test
is an additional guard that already passed there. All six findings have reproductions.

## Boundaries

This is evaluation infrastructure, not an adopted scheduler or production checker.
The approving checker is a test stub. The harness does not implement signatures,
live authorization services, adjudication, shadow/canary rollout, policy approval,
or GP/LLM/portfolio experiments. Policy-change events record fixture provenance;
they are not proof of an implemented production policy registry or live adaptation.
Deadline and urgency labels are preserved in traces; the baseline does not invent a
lawful ordering between those labels. Candidate comparisons need a separately pinned
lawful priority vocabulary and test expectations before claiming deadline performance.

Binding sources:

- [JON-128](https://linear.app/jons-garage/issue/JON-128)
- [Accepted JON-16 contract](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md)
- [Research and selection record](https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614)

The original four files were recovered from saved cloud task
`task_e_6ab1fc805f98832586aa167e65d58482`. The recovery commit preserves that diff;
the subsequent correction adds regression coverage for the defects found in review.

JON-139 tracks the audit corrections. JON-140 tracks acceptance review of the corrected
head; passing tests and delivery of corrections do not themselves complete JON-128.
