# Bootstrap impeachment implementation — JON-85

> **Status (2026-11-10, JON-261):** historical producer notes from September 2026, copied
> with the code from `codex/jon-141-conflict-integration` at `b813e15`. The code is
> unaccepted; the test counts and review references below describe that branch, not Develo.
> The [current input-validation corrections](#input-validation-corrections--2026-11-14)
> below describe the PR's later adapter contract; the September provenance remains historical.

This is the implementation contract for the [owner-frozen revision 1.0](bootstrap-impeachment-approved-v1.md),
Linear document `1db79f6f-a631-43e2-ac85-e8f55561b232`, approved in JON-83 comment
`9679e53a-3fd2-4ca4-963a-4ba2c30e15de`. The September 23 continuation recovers and
corrects the old cloud implementation. It is a domain library, not a deployed government.

## Provenance

- Remote default `Develo` and starting SHA: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.
- Recovered from an earlier Codex cloud task (private task reference removed for publication).
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
  For pre-empanelment `*_INPUT_DISCREPANCY_REVIEW`, only authenticated
  `RESOLVE_REVIEW` with its configured permission can release the hold. Its adapter
  receipt must contain `caseId`, `stage`, `discrepancyVersion` (the triggering
  journal event version), `reviewedStateVersion`, `resolution: 'RESUME'`,
  `reviewerId`, `authorityReference`, `sourceEventId`, `independentlyAuthorized: true`
  and `competent: true`. IDs/references must be nonblank strings; the reviewer cannot
  be the accused or the actor who recorded the discrepancy. The trusted review
  authority must verify legal competence, independence and the attributable decision;
  caller-supplied flags or receipts are never accepted as proof. These external
  authority checks require a real integration, not fixture assertions.
  The journal persists the validated receipt separately from the command actor.
  Resolution restores the pre-empanelment state and discards the affected stage's
  commitment/attempt, requiring a fresh seed commitment and source validation.
  It does not create a roster or guarantee that the repaired sources are valid.
  A further discrepancy requires a separately bound review resolution. Changed
  source versions alone cannot bypass the hold. Genuine participant-shortage
  `WAITING_FOR_INDEPENDENT_PARTICIPANTS` continues to retry without review.

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

## Local continuation — participation provenance

The persistent local checkout follows the same published recovery branch. Participation
entries now require an identity present in the complete population snapshot and a
nonblank string sourceEventId; malformed/null entries enter discrepancy review instead
of producing a trial roster. Population authorities retain terminal identities, so
historical participation remains attributable after death. One event may reference
multiple participants; repeated identical entries still count each identity once.

The regression first failed on the previous published head, then passed with this
correction. The local full-suite result is 67 tests passed, including 29 impeachment
checks. Cross-branch eligibility migration remains under JON-141; this continuation
retains the approved JON-79 pin and does not claim independent JON-86 acceptance.


## Independent finding F1 — discrepancy release gate

The independent JON-86 reviewer reproduced automatic release from source discrepancy
review at `8a2e3773daba2b470d2fb027448789b6965f4075`. That head does not satisfy frozen
revision 1.0 section 5 interface requirement 6. Two existing producer tests had
incorrectly allowed unreviewed recovery; they now require independent resolution.

The correction records a pending discrepancy from both capture failures and planning
results, blocks seed commitment/entry while it is pending, and adds the bound,
attributable resolution event described above. Six F1 regressions cover both stages
and discrepancy origins, restart/replay, absent providers, caller-supplied assertions,
unauthorized commands, malformed/stale receipts, repeat discrepancies, and normal
trial WAITING retries. The existing accusation WAITING retry test remains applicable.
Before the correction five new tests failed and the WAITING test passed; all six
pass after the correction. Exact final SHA and full-suite/CI evidence are recorded
in PR #36 and JON-85/86. Independent retest and acceptance remain with JON-86.

## Input-validation corrections — 2026-11-14

These implementation changes address [PR #70 review 5900166376](https://github.com/ptown16801-lang/concord/pull/70#pullrequestreview-5900166376).
They do not amend the frozen specification or establish independent acceptance.
The historical claims above about unchanged population/eligibility files describe
their September recovery, before these validation corrections.

`src/validation.js` defines the identifier predicate shared by the population
registry, eligibility reducer, durable eligibility commands, and impeachment
boundaries. IDs must be nonempty, already trimmed strings of at most 256 characters,
without C0 controls, DEL or C1 controls (U+0000–U+001F and U+007F–U+009F).
Allegation, conviction, proceeding, identity, affected-identity, command and
authenticated-authority IDs all use this predicate; the reducer no longer trims
an invalid ID into a different one. An invalid caller command is rejected before
any event is stored. Existing journal records are not rewritten.

Every array in source data must have an own element at every index. The canonical
JSON encoder rejects sparse arrays recursively, including unused nested fields;
it also rejects cycles and non-JSON values. Source validation converts these
failures into an attributed `INPUT_DISCREPANCY` review hold before a panel can be
published. Assignment validation remains a panel-forming source. Repair alone cannot
release a source hold or reuse its committed seed.

Ballot, evidence and review receipts are refused with an error for every defect,
including sparse arrays, non-JSON values and invalid or missing required fields.
The transaction rolls back with no journal entry, hold or discrepancy event. A bad
review receipt while a source hold is pending leaves that original hold, including
its version, reason and source references, unchanged. Receipt-hold resumption and
`resumeStatus` are removed; panel-source holds retain their independent-review gate.

`SOURCE_NAMES` is the single list used for validation, source storage, seed
commitments, panel/exclusion source IDs, source-version records and retry guards:
population, office, eligibility, conflicts, rules, participation and
assignmentValidation. The assignment adapter supplies
`assignmentReasonCodes(state, db) -> {snapshotId, version, validReasonCodes}`;
the similarly named field returned by `capture` is replaced. A changed assignment
source alone can authorize a new waiting attempt, but an unversioned mutation,
rollback or genuinely unchanged snapshot remains refused. Eligibility supplies
`validReasonCodes` in its own versioned snapshot. Codes remain authority data,
checked for format, uniqueness, membership and collision with planner-derived codes.

Each new source-data hold carries `discrepancySources[]`, copied to
`state.inputDiscrepancy.sources[]`. Each reference contains `authority` and
`snapshotId`. An absent/unreadable snapshot ID is recorded as `null` with
`snapshotIdStatus: 'MISSING'`; an unusable supplied ID is `null` with status
`'INVALID'`. The malformed value and substantive payload are never copied into
the hold. Cross-source contradictions identify all implicated sources. A composed
source's own authority records retain their narrower references. Snapshot changes
are attributed using committed per-source digests, including the assignment source.
Changes outside the seven named sources are attributed to `compositionCapture`
in both stale-commit and mid-assignment checks. Auxiliary data has its own committed
digest; a mixed change identifies the changed named sources and that boundary.

An adapter throwing before it returns a snapshot is attributed to its adapter
boundary (`compositionCapture` or `assignmentValidation`) with an explicitly missing
snapshot ID, unless it supplies valid narrower
`discrepancySources`. The registry adapter supplies its population, eligibility and
roleMetadata references itself. Adapter error messages that are not stable code
strings become `MALFORMED_SOURCE_SNAPSHOT`; raw exception text is not journaled.
The service's own case-journal projection is referenced as
`case:<caseId>:<journalVersion>`. Older records without attribution remain historical
records; replay does not invent references for them.

Regression tests named `JON-315` and `JON-316` cover the source and identifier
classes, uniform receipt refusal, preservation of pending holds across restart,
composed-source attribution and both auxiliary-change checks.
