# Frozen source export

Source: https://linear.app/jons-garage/document/bootstrap-impeachment-implementation-specification-1f7d10e8f846

Document ID: `1db79f6f-a631-43e2-ac85-e8f55561b232`; source updatedAt: `2026-09-16T18:15:32.742Z`.
Exported 2026-09-23; Linear issue markup converted to Markdown links only.

**Revision:** 1.0
**Status:** Owner-approved and frozen for implementation handoff
**Date:** 2026-09-16
**Owner approval:** [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification) comment `9679e53a-3fd2-4ca4-963a-4ba2c30e15de`, 2026-09-16 18:15 UTC
**Scope:** Bootstrap accusation and impeachment-trial composition, sizing, voting thresholds, state transitions, and population/eligibility interfaces
**Proposed later repository path:** `docs/specs/bootstrap-impeachment.md` (proposal only; no repository artifact is created here)

## 1. Authority and limits

This specification consolidates [JON-66](https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation) decisions and continuing [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) safeguards. It defines Concord simulation rules, not external legal requirements. [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification) remains the owner-only approval/freeze gate; [JON-85](https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff) is the separate implementation handoff; [JON-86](https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification) independently verifies the resulting implementation. Revision 1.0 does not authorize code, a pull request, merge, or downstream execution.

The U.S. structure is an analogy for separated functions: the House has the sole power of impeachment and the Senate the sole power to try impeachments, with two-thirds of members present required for conviction. See [Constitution Annotated, Article I, Section 2, Clause 5](<https://constitution.congress.gov/browse/article-1/section-2/clause-5/>) and [Article I, Section 3, Clause 6](<https://constitution.congress.gov/browse/article-1/section-3/clause-6/>). Concord's bootstrap sizes, six-person floor, enhanced thresholds, civilian service, and Supreme Board appeal are project-specific rules.

## 2. Decision-source table

| Rule | Controlling source | Consolidated effect |
| -- | -- | -- |
| Capped proportional panels (Option 2) | `3a069dec-db9a-4613-b104-e4f788f3b78e` | Bootstrap sizes use §7 formulas. |
| Exact enhanced thresholds | `06fd6e94-a540-49a0-b39c-901d93ca168d` | §8 thresholds are exact. |
| Bootstrap-only scope | `a6f5877c-36fa-49ce-984a-beb0e88a6ad5` | Six-person floor and enhanced thresholds never govern a mature institution. |
| Serving-judiciary incompatibility | `5b6236ae-d6f3-429f-9c65-9e24381254a4` | Every serving judge is mechanically excluded from bootstrap accusation and trial seats. |
| Stratified sortition; division is only a balancing factor | `433f0bf4-3a2b-4b78-949d-50ab35213a65` | Division affects balance but is not an individual-seat eligibility requirement. |
| Separation, replacement, waiting, institution-specific maturity | `433f0bf4-3a2b-4b78-949d-50ab35213a65`; `d086b9e2-d878-441d-a687-3a06eda79b7b` | No accusation/trial overlap; exhaust lawful draw before waiting; transitions are institution-specific. |
| Formulas and stage-snapshot model | Research `f275fc59-f80e-4cf0-9deb-dbf076599ebb`, 2026-09-16 08:49 UTC | Provides Option 2 formulas, permanent/civilian ordering, fresh trial snapshot, and stage freeze. |
| Continuing safeguards | [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) current description | Preserves self-representation, proof/review standards, conflict rules, evidence visibility, appeals, and discrepancy review. |

## 3. Explicit supersession map

| Earlier text | Controlling replacement | Implementation treatment |
| -- | -- | -- |
| Mandatory division matching in `c1a7a96c-98b3-4b75-8bed-a468c2d7a711` | Later `433f0bf4-3a2b-4b78-949d-50ab35213a65`, confirmed by `d086b9e2-d878-441d-a687-3a06eda79b7b` | Never require a seat from a division or wait merely because a division is unrepresented. |
| [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) fallback allowing “Judiciary where constitutionally appropriate” | `5b6236ae-d6f3-429f-9c65-9e24381254a4` | No serving district, circuit, or Supreme Board judge may fill a non-judicial role. A former judge must first leave office and otherwise qualify. |
| [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) prose saying thresholds/minimum counts remain unresolved | `06fd6e94-a540-49a0-b39c-901d93ca168d`; `a6f5877c-36fa-49ce-984a-beb0e88a6ad5` | Use §8 thresholds and the six-person bootstrap trial floor. |
| Research predicate requiring six for a normal Senate | `a6f5877c-36fa-49ce-984a-beb0e88a6ad5` | A mature Senate uses ordinary quorum/threshold rules even with fewer than six participants. |
| Earlier alternative-study or code instructions for [JON-66](https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation) | Current contract v1.0; `0d3610d9-0784-4865-9358-4d36f03a8f20` | Preserve as history; do not reopen or code here. |
| Earlier counsel/public-representation discussion | [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) self-representation rule | Do not assign or recognize counsel. |

No direct higher-order conflict remains. This specification does not amend unrelated impeachment rules.

## 4. Definitions

* **Case:** one impeachment matter with immutable `caseId`.
* **Stage:** `ACCUSATION` or `TRIAL`.
* **Snapshot:** attributable, immutable population, office, eligibility, recusal, known-conflict, division, and participation state at stage entry.
* **Mature institution:** the permanent House or Senate can perform its role under ordinary governing rules at stage entry.
* **Bootstrap institution:** the permanent institution fails its case/stage maturity test.
* **Accusation participant:** anyone who served, deliberated, or cast a ballot on the accusation side, permanent or bootstrap.
* **Independent eligible identity:** one unique living identity passing role eligibility and all mandatory exclusions.
* **Civilian citizen:** an eligible citizen outside the relevant permanent institution and all judicial offices; authority is limited to this case and stage.
* **Universal exclusion:** the accused; any serving judge; any duplicate identity; and any identity made unavailable or ineligible by authoritative law/status, including applicable death, unwillingness, jail, disenfranchisement, recusal, or incompatibility.
* **Trial-specific exclusion:** every accusation participant and anyone known at assignment time to have investigated the case or to have another independently disqualifying conflict.
* **R:** a stage-qualified count of unique independent capacity, never raw population and never a sum that double-counts a person.
  * At bootstrap accusation entry, `R_acc` is the cardinality of the union of accusation-eligible and provisionally trial-eligible identities after universal exclusions. Sizing is valid only if a disjoint allocation exists for the accusation target and at least six provisional trial identities.
  * At bootstrap trial entry, let `C` be the frozen count of accusation participants and `N_trial` the fresh count of trial-eligible identities after all universal/trial exclusions. Define `R_trial = C + N_trial`. Because accusation participants are absent from `N_trial`, `R_trial - C = N_trial` without overlap.
* **Empaneled:** roster, denominator, threshold, mode, snapshot IDs, draw seed, and audit are frozen.
* **Valid replacement:** the next attributable draw candidate passing the same filters; replacement never waives a rule or changes the target.

## 5. Authoritative interfaces

```text
PopulationSnapshot {
  snapshotId, effectiveAt, populationVersion,
  identities[{identityId, alive, citizenshipStatus, willing,
              jailed, disenfranchisementStatus, divisionId}]
}
OfficeSnapshot {
  snapshotId, officeVersion,
  offices[{officeId, institution, holderIdentityId, serving,
           permanentSeat, recusalStatus}]
}
EligibilitySnapshot {
  snapshotId, rulesetVersion,
  roleEligibility[{identityId, caseId, stage, eligible, reasonCodes[]}]
}
CaseParticipationLedger {
  caseId, version,
  events[{identityId, role, stage, eventType, effectiveAt, sourceEventId}]
}
ConflictSnapshot {
  snapshotId, caseId, knownInvestigators[],
  independentlyDisqualified[], sourceEventIds[]
}
SortitionCommitment {
  caseId, stage, snapshotIds[], rulesetVersion,
  seedCommitment, revealedSeed, algorithmVersion
}
PanelRecord {
  caseId, stage, mode, targetSize, affirmativeThreshold,
  roster[], alternates[], exclusions[{identityId, reasonCode}],
  snapshotIds[], drawAudit[], createdBy, createdAt
}
```

Interface requirements:

1. Join and deduplicate only by `identityId`; office/division rows never create extra people.
2. Derive serving-judiciary exclusion from `OfficeSnapshot` before sizing or drawing.
3. Record every exclusion/replacement with a stable reason and source event.
4. Commit the sortition seed before revealing candidate order; revealed seed plus algorithm version must replay exactly.
5. Composition records contain no protected substantive evidence. Scheduler inputs remain opaque.
6. Missing, stale, unauthorized, contradictory, ambiguous, or non-idempotent sources produce an attributable discrepancy. Fail closed only for the affected authority pending competent independent review under [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary); do not guess a panel.

## 6. Institution-specific maturity

Evaluate only at entry to the relevant unempaneled stage.

* `HOUSE_MATURE`: eligible, unrecused permanent House members can satisfy the ordinary fixed-seat quorum and make the governing affirmative threshold mathematically reachable. Otherwise `HOUSE_BOOTSTRAP`.
* `SENATE_MATURE`: eligible, unrecused permanent senators can satisfy ordinary Senate quorum and make the applicable ordinary conviction threshold mathematically reachable. Otherwise `SENATE_BOOTSTRAP`.

The six-person floor is not part of Senate maturity. House and Senate modes are independent. Once empaneled, later staffing does not change that stage's mode, roster, denominator, or threshold; it affects a later unempaneled stage/case.

## 7. Bootstrap sizing and feasibility

For `HOUSE_BOOTSTRAP`:

```text
A = min(5, max(2, floor(R_acc / 3)))
T_provisional = min(12, R_acc - A)
```

Do not empanel when `T_provisional < 6` or when role-specific eligibility prevents a disjoint allocation of `A` accusation identities and six provisional trial identities. Enter `WAITING_FOR_INDEPENDENT_PARTICIPANTS`. The provisional trial set is a capacity reservation, not a roster; it prevents the accusation draw from consuming the only future trial-capable identities.

After a charge, close the accusation roster and take a fresh trial snapshot. For `SENATE_BOOTSTRAP`:

```text
C = count(frozen accusation participants)
N_trial = count(fresh trial-eligible identities excluding C)
R_trial = C + N_trial
T = min(12, R_trial - C) = min(12, N_trial)
```

Proceed only when `T >= 6`. Eligibility changes between stages affect the fresh T; changes after trial empanelment do not. This stage-qualified R preserves the Option 2 arithmetic, fresh trial snapshot, and strict separation without double-counting.

## 8. Thresholds

Bootstrap accusation:

| A | Required affirmative votes |
| -- | -- |
| 2 | 2 |
| 3 | 2 |
| 4 | 3 |
| 5 | 3 |

Formally: 2 when A=2; `ceil(2A/3)` for A=3–4; `floor(A/2)+1` for A=5.

Bootstrap trial:

| T | Required affirmative votes |
| -- | -- |
| 6 | 5 |
| 7 | 6 |
| 8 | 6 |
| 9 | 6 |
| 10 | 7 |
| 11 | 8 |
| 12 | 8 |

Formally: `ceil(3T/4)` for T=6–8; `ceil(2T/3)` for T=9–12.

Abstention, absence, quorum, ballot validity, and exact accounting remain governed by authoritative voting rules; never silently reduce the frozen affirmative threshold. Mature bodies use only ordinary rules. Trial conviction separately requires clear and convincing evidence under [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary).

## 9. Deterministic selection and replacement

 1. Load mutually consistent snapshots and participation ledger.
 2. Deduplicate by `identityId`.
 3. Apply universal exclusions; at trial also apply all known trial-specific exclusions.
 4. Run §7 sizing and disjoint-feasibility checks.
 5. Partition eligible candidates into priority tiers: (1) eligible, unrecused permanent members of the institution being bootstrapped; (2) eligible civilian citizens.
 6. Order each tier by stratified sortition:
    * compute each recorded division's proportion of the eligible tier;
    * at each draw, prefer candidate choices minimizing post-selection absolute deviation from those proportions;
    * break equally balanced choices by ascending `H(revealedSeed || caseId || stage || identityId || drawIndex || algorithmVersion)`;
    * an empty, absent, or exhausted division never creates an eligibility requirement.
 7. Select tier 1 before tier 2. For accusation, reject a choice that would leave fewer than six provisionally trial-eligible nonselected identities.
 8. Validate immediately before assignment. If invalid, record the reason and expand to the next candidate in the same attributable order.
 9. If candidates are exhausted before the target is full, enter `WAITING_FOR_INDEPENDENT_PARTICIPANTS`; never reduce size, threshold, floor, or separation.
10. Atomically freeze a complete panel and audit.

Division is a reproducible balancing factor, not a matched seat, quota, or individual eligibility rule. A valid panel may omit any division.

This replacement mechanism applies during empanelment. Under [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary), investigative involvement or another serious conflict discovered only after participation begins does not automatically remove the participant and is not, alone, a Supreme Board reversal ground. Other independently applicable vacancy/removal/misconduct law remains controlling. If a lawful post-freeze event makes action impossible, preserve the record and enter the applicable waiting/review path rather than silently substituting someone.

## 10. State machine

```text
REPORTED
 -> ACCUSATION_STAGE_ENTRY
    -> ACCUSATION_INPUT_DISCREPANCY_REVIEW
    -> WAITING_FOR_INDEPENDENT_PARTICIPANTS
    -> ACCUSATION_EMPANELED (HOUSE_MATURE | HOUSE_BOOTSTRAP)
       -> CHARGE_REJECTED -> CLOSED
       -> CHARGED -> TRIAL_STAGE_ENTRY
          -> TRIAL_INPUT_DISCREPANCY_REVIEW
          -> WAITING_FOR_INDEPENDENT_PARTICIPANTS
          -> TRIAL_EMPANELED (SENATE_MATURE | SENATE_BOOTSTRAP)
             -> ACQUITTED -> CLOSED
             -> CONVICTED -> REMOVAL_EFFECTIVE
                -> APPEAL_AVAILABLE / APPEAL_PENDING -> FINAL
```

Guards:

* `*_EMPANELED` requires consistent snapshots, passing mature/bootstrap feasibility, a complete valid roster, threshold, and attributable panel record.
* `WAITING_FOR_INDEPENDENT_PARTICIPANTS` requires valid inputs but insufficient lawful composition after exhausting the draw.
* `*_INPUT_DISCREPANCY_REVIEW` requires defective authoritative inputs and is distinct from a genuinely small population.
* `CHARGED` requires the frozen accusation threshold.
* `CONVICTED` requires the frozen trial threshold and governing evidentiary burden.
* Retry waiting only after an attributable source version changes. Identical input replay yields the same result without duplicate authority.
* Conviction consequences, disqualification, restrictions, reconciliation, and appeals remain governed by [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) rather than being redefined here.

## 11. Phase snapshots

| Moment | Re-evaluate | Freeze |
| -- | -- | -- |
| Accusation entry | House maturity, exclusions, `R_acc`, A, provisional disjoint capacity, draw | Mode, roster, denominator, threshold, snapshots, seed, audit |
| Charge decision | Ballots against frozen threshold | Result and complete accusation participation ledger |
| Trial entry | Senate maturity, fresh exclusions, C, `N_trial`, `R_trial`, T, draw | Mode, roster, denominator, threshold, snapshots, seed, audit |
| Trial decision | Ballots and evidentiary predicate | Verdict and attributable decision |
| Later stage/case | Current authoritative records | New snapshot; never mutate earlier frozen records |

## 12. Preserved [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) safeguards

This specification does not alter impeachable-conduct categories; protection for lawful policy disagreement; self-representation and its fairness floor; layered visibility, no secret guilt, no unnecessary unsealing, and disclosure ledger; clear-and-convincing proof; separation from criminal proceedings; adopted conflict rules; conviction removal and separately authorized disqualification; Supreme Board appeal and mixed review standard; appellate remedies; severity-based temporary safeguards; or append-only restriction reconciliation and mandatory independent review of discrepancies.

## 13. Acceptance tests

| ID | Setup | Expected | Check type |
| -- | -- | -- | -- |
| S1 | `R_acc=7` | A=2, provisional T=5; wait without reducing the floor | Specification arithmetic |
| S2 | `R_acc=8`, role-compatible | A=2, provisional T=6; accusation threshold 2; six-person trial threshold 5 | Specification arithmetic |
| S3 | `R_acc` 9, 12, 15, 17 | A=3,4,5,5; provisional T=6,8,10,12 | Specification arithmetic |
| S4 | T=6…12 | Thresholds 5,6,6,6,7,8,8 | Specification arithmetic |
| S5 | Eight nominal candidates are serving judges | Exclude all before R; wait with reason codes | Rule plus later filter/audit test |
| S6 | Same person appears in citizen and office rows | Count once by identityId | Later join/property test |
| S7 | Accusation participants appear in trial population | Exclude from `N_trial`; never select | Invariant plus later executable test |
| S8 | One division has no candidate; six exist elsewhere | Draw may proceed; no division-caused wait | Rule plus deterministic draw test |
| S9 | Selected candidate fails validation | Record reason; take next; preserve target/threshold | Rule plus replacement test |
| S10 | Draw exhausted before T=6 | Wait; do not merge functions or lower floor | State reasoning plus state test |
| S11 | House mature; Senate deficient | Normal House accusation, bootstrap Senate trial | Transition plus integration test |
| S12 | Senate ordinary rules are reachable with fewer than six | Mature Senate rules; no bootstrap floor | Transition plus integration test |
| S13 | Fresh trial snapshot leaves five eligible nonaccusers | Wait at trial; completed accusation stays frozen | Transition plus integration test |
| S14 | Known investigator is a trial candidate | Exclude and expand draw | Rule plus filter test |
| S15 | Investigative involvement discovered after participation begins | No automatic removal/reversal on that fact alone | [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) consistency |
| S16 | Replay same snapshots, seed, algorithm version | Same roster/audit or wait; no duplicate authority | Later determinism/idempotence test |
| S17 | Population and office sources conflict on judicial service | Discrepancy review; no guessed panel | Consistency plus fault-injection test |
| S18 | Institution matures after stage freezes | Frozen stage unchanged; later stage/case re-evaluates | Transition plus integration test |

## 14. Verification and handoff checklist

Specification-level reasoning completed:

- [X] All settled [JON-66](https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation) rules mapped to controlling sources.
- [X] Mandatory division matching expressly superseded.
- [X] Serving judiciary universally excluded despite older fallback prose.
- [X] R made stage-qualified, unique, exclusion-aware, and compatible with a fresh trial snapshot.
- [X] Accusation/trial overlap prohibited and provisional trial capacity reserved.
- [X] Exact threshold cutovers enumerated.
- [X] Mature/bootstrap transitions are institution-specific.
- [X] [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) self-representation, proof, conflict, appeal, visibility, restriction, and discrepancy safeguards preserved.
- [X] No genuine higher-order conflict or new owner decision found.

Required only after [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification) approval and [JON-85](https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff) implementation:

- [ ] Validate schemas/APIs against actual population, eligibility, office, voting, archive, and sortition code.
- [ ] Unit-test formulas, filters, thresholds, replacement, and reason-code audits.
- [ ] Property-test uniqueness, disjointness, replay, and threshold invariants.
- [ ] Integration-test independent maturity, fresh snapshots, waiting/resume, evidence opacity, and attributable records.
- [ ] Fault-inject stale/contradictory sources and verify discrepancy review.
- [ ] Have [JON-86](https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification) verify the implemented revision/SHA against owner-frozen [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification) wording.

**Owner-review action:** approve, amend, or reject the wording through [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification). Creation of this document is not approval or freeze.

