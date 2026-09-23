# Bootstrap impeachment implementation — JON-85

This is the implementation contract for the [owner-frozen revision 1.0](bootstrap-impeachment-approved-v1.md),
Linear document `1db79f6f-a631-43e2-ac85-e8f55561b232`, approved in JON-83 comment
`9679e53a-3fd2-4ca4-963a-4ba2c30e15de`. The September 23 continuation recovers and
corrects the old cloud implementation. It is a domain library, not a deployed government.

## Provenance

- Remote default `Develo` and starting SHA: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.
- Recovered task: https://chatgpt.com/codex/tasks/task_e_6aab5590b558832583d47839f7a416da
- Retrieved with `codex cloud diff task_e_6aab5590b558832583d47839f7a416da`.
- Original export: 74,137 bytes; SHA-256 `b25c2b4bc1596b9498c3f2936013da05ab9f15db2a9e2b5fc9d9d1ae1aabe874`.
- Recovery commit: `ca06377`; this preserves the recovered implementation before corrections.
  This is **content recovery**, not recovery of the original `2a6f966...` Git object.
- Accepted JON-78 pin: `882dcffb31b520c6f9458984a35745c8b4bfa3b8`, tree
  `67d3849e05f9e0740ec6831163b60084016abd2f`.
- Accepted JON-79 pin: `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`, tree
  `c2f0cb37a3851350164df8dcc523b1b42d18ab94`.

The recovered population source/migration/tests/worker and eligibility reducer/tests
were compared byte-for-byte against those pins and match. Both exports and syntax
checks remain. No competing identity or franchise authority was introduced. The
upstream implementations remain unchanged, including their previously recorded
integration and privileged-database-writer limitations.

The old impeachment code did **not** implement the frozen formulas: it used
`ceil(P/10)`/`ceil(P/5)` with 12/24 caps, different accusation thresholds, and
preassigned both stages. Its nine tests asserted those wrong rules. This continuation
replaces those expectations with checks against the actual frozen source.

## Composition and stage behavior

`planBootstrapStage` plans exactly one stage. At bootstrap accusation entry,
`R` is the union of the role-qualified independent pools; `A=min(5,max(2,floor(R/3)))`.
Selection reserves six trial-capable identities. At trial entry, a fresh snapshot
excludes every recorded accusation participant and computes `T=min(12,N_trial)`.
There is no provisional trial roster to mutate later.

Accusation thresholds for 2–5 seats are 2,2,3,3; trial thresholds for 6–12 are
5,6,6,6,7,8,8. Mature House and Senate modes are evaluated independently using
**supplied authoritative ordinary** fixed-seat denominator/quorum/threshold values.
No ordinary rule is invented by this module, and a mature Senate can have fewer
than six participants. Frozen stage denominators and thresholds never shrink.

Joins use identityId. Serving district, circuit and Supreme Board judges are
excluded from office records before sizing. Accusation participation history,
known investigators and independent conflicts exclude trial candidates.
Permanent members precede civilians. Each tier minimizes absolute deviation from
its original eligible division proportions, with integer-scaled scores and SHA-256
tie breaking. Missing divisions never require seats. Hash input uses canonical JSON
array encoding of `[seed,caseId,stage,identityId,drawIndex,algorithmVersion]`, avoiding
ambiguous concatenations. Invalid assignments receive a reason/source receipt and
the draw expands without changing its target. Incomplete draws publish no roster.

## Command and persistence boundary

`BootstrapImpeachmentService.execute(command, credential)` accepts OPEN, COMMIT_SEED,
ENTER_STAGE, CLOSE_STAGE, POST_FREEZE_WAIT, RESOLVE_REVIEW and READ. Commands include
caseId, commandId and expectedVersion (READ does not mutate); OPEN adds accusedId,
COMMIT_SEED adds seedCommitment, ENTER_STAGE adds seed. Use exported `seedCommitment`.
A separate commit precedes reveal, pinned to the exact source snapshot digest.
Unchanged waiting inputs cannot be retried or rerolled. A fresh source version can
be committed and retried; mutations under an old version/ID are discrepancies.

`createCommandAuthenticator` verifies Ed25519 signatures over canonical command JSON
(use exported `canonicalCommand`) against trusted configured public keys and per-command permissions. The authenticated
principal is derived from that configuration. It does not accept caller-provided
`authentication: true`. Key enrollment, revocation and rotation belong to the host;
no production keys or permissive default authenticator ship with this code.

`ImpeachmentStore(filename)` uses file-backed SQLite, synchronous FULL, BEGIN
IMMEDIATE and expected-version checks. Events and command results commit together;
repeating an identical command ID returns its stored result, while changed reuse
fails. Triggers reject ordinary update/delete and key/rowid replacement. Database
owners who can drop triggers or replace files remain outside this protection.
Use a private host-controlled database path and normal filesystem access controls.

JON-79 remains an in-memory reducer. `DurableEligibility` wraps it in authenticated,
versioned, idempotent persisted command batches and rebuilds its projection on
restart. It verifies referenced JON-78 identities, requires proceeding IDs and
explicit effective timestamps, rejects future transitions, and replaces untrusted
C4 authentication assertions with the verified principal. `captureRegistryInputs`
reads the actual population tables and eligibility projection in the same transaction.
Unknown identities, lifecycle disagreement and missing role metadata fail closed.
Citizenship and role eligibility are supplied explicitly by a trusted role authority;
identityClass is never silently interpreted as citizenship. The adapter requires both
role permission and franchise eligibility; a broader role-specific law requires a
reviewed adapter rather than silently relaxing that restriction.

## Authority adapters and practical limits

Production installation must supply trusted, synchronous adapters operating under
the **same SQLite transaction boundary** as population/eligibility reads and panel
publication. The existing code does not install HTTP endpoints or expose these adapters
to callers. Remote authorities require their own consistent snapshot/fencing protocol;
reading a remote service twice is not an atomicity guarantee.

- `sources.capture(state, db)` returns the six composition-only sources used in the
  test fixture: population, office, eligibility, conflicts, rules and participation.
  Each has a stable snapshotId and monotonic version. Eligibility includes the joined
  populationVersion and rulesetVersion. Capture errors must use INPUT_DISCREPANCY
  with a stable reason. Completeness, source authorization and applicable role law
  are this trusted adapter's responsibilities.
- `sources.validateAssignment(identityId, stage, snapshot, db)` rechecks applicable
  exclusions immediately before assignment and returns `{valid,sourceEventId}` plus
  reasonCode for rejection. A second capture detects changes before freezing.
- `ballots.close(state, db)` returns a final authoritative receipt bound to case,
  stage and panel digest (exported `compositionDigest`), sourceEventId, quorumSatisfied, and unique roster ballots
  (YES/NO/ABSTAIN). Absent voters are not affirmative votes. This consumes the ballot
  authority; it does not replace JON-80 or make reactions into ballots.
- `evidence.assess(state, db)` returns a panel-bound CLEAR_AND_CONVINCING attestation
  with satisfied and sourceEventId. Missing proof cannot convict. Protected evidence
  itself is neither stored in the panel nor sent to a scheduler.
- `review.assess(state, commandType, db)` must certify an independently authorized
  post-freeze waiting/resumption event. Conflict discovery alone cannot remove a
  participant or trigger this path. The frozen panel remains intact during review.

A conviction records an explicit `REMOVAL_REQUIRED_APPEAL_AVAILABLE` handoff; it does
not claim removal executed. Actual office removal, disqualification, Supreme Board
appeals, restrictions, visibility/disclosure and Archivist publication remain their
existing authoritative domains. No new powers, counsel, quiz behavior or scheduler
access to evidence are introduced. This is **not** end-to-end production integration
with those still-external authorities. Independent JON-86 acceptance remains required.

## Requirement-to-test map

All executable checks below live in `test/bootstrap-impeachment.test.js`.

| Frozen checks | Evidence |
| --- | --- |
| S1–S4 | Exact capacity cases 7/8/9/12/15/17/300 and every threshold cutover |
| S5 | All serving judiciary tiers, exclusions before sizing, former judge eligibility |
| S6 | Identity/office duplicate joins and contradictory duplicate discrepancy |
| S7 | Served/deliberated/ballot participants excluded from trial |
| S8 | Unequal division proportions, missing/null division, no mandatory seat |
| S9–S10 | Failed assignment replacement audit; draw exhaustion without partial panel |
| S11–S12 | Mature House/bootstrapped Senate, mature Senate with three members |
| S13–S14 | Fresh trial snapshot loses an eligible member; known investigator excluded |
| S15/S18 | Frozen panel survives later conflict/staffing change and database restart |
| S16 | Input-order-independent draw across 43 population/seed pairs; unique/disjoint panels; durable idempotent commands |
| S17 | Judicial contradiction, missing roles/rules, stale/non-idempotent sources |
| §5/§10 | Pre-reveal seed commitment, source-version retry, no guessed panel |
| Persistence/authentication | Signed payload/permission boundary, changed replay rejection, competing processes, rollback and append-only guards |
| Integration | Real JON-78 registry and durable JON-79 projection; lifecycle mismatch rejected |
| Threshold/proof | Abstention does not reduce threshold; insufficient proof acquits |

These are producer tests, not an independent acceptance report. Test fixtures for
office, roles, voting, evidence and review do not prove production integration.

## Producer validation — 2026-09-23

On Node v22.23.2 / Linux:

- `node --test --test-reporter=spec`: **66 passed, 0 failed**, including 28 impeachment
  tests, 9 eligibility tests, 6 population tests, and 23 existing regressions.
- `node --run check`: passed; `git diff --check`: passed.
- Initial sandbox full run: 59 passed / 3 HTTP failures from localhost `listen EPERM`;
  the permitted host run above resolved that environment limitation.
- A new eligibility restart test exposed a projection-clock defect during development;
  the clock was corrected and the full 66-test suite then passed.
- No skips. Remote office/role/voting/evidence/review/Archivist integration and actual
  office-removal/appellate effects were not run or certified by these tests.

The exact published implementation SHA and CI results are recorded in the PR and
canonical Linear handoff rather than embedding a self-referential commit ID here.
