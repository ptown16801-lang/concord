# Evidence snapshot: Implement constitutional branch, succession, impeachment, and judiciary invariants

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary
- Version: 2026-09-19T04:15:49.209Z
- Source date: 2026-09-19T04:15:49.209Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Work type:** governance design-coordination parent. **Deliverable:** source-qualified state/interface map for offices, caretaker succession, judiciary, permanent divisions and proceedings, with one owner per child contract. Reuse frozen <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue>/<issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue> revision 1.0 and delivered <issue id="31df609d-b332-4982-b3f4-85999e0e19f9" href="https://linear.app/jons-garage/issue/JON-89/jon-83a-independent-source-traceability-review-of-bootstrap">JON-89</issue> review; no repeat consolidation or owner approval. <issue id="72a63cb5-ec9b-4ece-a974-a61eb1473bb5" href="https://linear.app/jons-garage/issue/JON-67/research-temporary-restriction-and-review-model">JON-67</issue> owns residual restriction procedures; <issue id="0e115c66-5d54-4ba1-a8c3-3dd6314709bd" href="https://linear.app/jons-garage/issue/JON-68/research-impeachment-appeal-implementation-details">JON-68</issue> owns residual appellate procedures; <issue id="fe321d82-df40-4788-9cc9-7a7a68bafcec" href="https://linear.app/jons-garage/issue/JON-62/recover-and-implement-capital-offense-conviction-and-execution-rules">JON-62</issue> owns capital/finality rules; <issue id="7866b2c5-1c24-436c-9749-22b38e2a29ef" href="https://linear.app/jons-garage/issue/JON-60/implement-tombstone-terminal-condemnation-placeholder-protocol">JON-60</issue> owns terminal effects. <issue id="79ac2c3d-cfbd-44b1-9c8f-18fd411bfb6c" href="https://linear.app/jons-garage/issue/JON-91/jon-85a-reconcile-recovered-jon-78jon-79-pins-and-unblock-bootstrap">JON-91</issue>'s two reported pin-acceptance results are conditional domain-interface evidence, not restored coding authority; <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue>/<issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> remain held. Ordinary unresolved mechanics remain delegated under <issue id="200fe456-c2a1-43a3-ac7f-9995dedb43ad" href="https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions">JON-30</issue>; only genuine new higher-order conflicts require the owner.

---

## Scope and completion clarification — migration audit

Milestone A identifies the currently permitted design work, not completion or removal of this parent's retained implementation and verification obligations. The existing implementation/independent-verification children retain their separate duties and authorizations subject to the project hold. Do not close this mixed-stage parent on design evidence alone or make all unrelated A-stage issues prerequisites for its children. The frozen specification and owner approval cited below remain settled; historical requests for them do not create new owner gates.

## Historical parent checkpoint — 2026-09-16 audit; not current execution state

<issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue> and <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue> are Done: bootstrap specification revision 1.0 is delivered, owner-approved and frozen. The historical checkpoint awaiting specification/approval is superseded. <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue>'s existing implementation session stopped without a delivered implementation; it is Backlog pending accepted <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue>/79 inputs and explicit pins. <issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> requires the actual implementation artifact for independent verification; <issue id="31df609d-b332-4982-b3f4-85999e0e19f9" href="https://linear.app/jons-garage/issue/JON-89/jon-83a-independent-source-traceability-review-of-bootstrap">JON-89</issue>'s source review is In Review. No repeated owner approval or duplicate implementation is required.

The adopted Option D restriction-timing model and Option C mixed appellate-review standard below also supersede older requests to choose those models. Remaining routine procedures/calibration belong to engineering under the recorded subsidiarity constraints; substantive new authority or rights changes still require the appropriate decision.

## FROZEN BOOTSTRAP SPECIFICATION — OWNER APPROVED 2026-09-16

Bootstrap impeachment implementation specification **revision 1.0** (Linear document `1db79f6f-a631-43e2-ac85-e8f55561b232`) is owner-approved and frozen. Approval source: <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue> comment `9679e53a-3fd2-4ca4-963a-4ba2c30e15de`, 2026-09-16 18:15 UTC. This frozen revision controls the <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue> implementation handoff and preserves the previously recorded supersession map and settled bootstrap decisions. <issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> remains required for independent verification before any authorized merge/acceptance.

# Historical workflow contract — v1.0 / 2026-09-16

This older workflow text is retained for traceability. Current authorization and native lifecycle fields control; its substantive acceptance obligations and frozen product decisions remain preserved.

**Work type:** umbrella coordination and acceptance record. This parent must not launch a duplicate implementation alongside its children. Preserve its current parked status and all previously adopted subject-matter rules.

## Bootstrap handoff and scope gates

<issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue> consolidates existing bootstrap decisions into one versioned implementation specification; it is no longer a fresh 2–3-option study and must not code. <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue> retains the explicitly reserved owner-only approval of the consolidated wording. <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue> is the separate Codex implementation handoff, parked until approval, a frozen dispatch packet, and execution authorization. <issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> independently verifies the delivered <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue> PR/SHA. Verification consumes a reviewable artifact while implementation is In Review; it must not wait for implementation Done and create a circular gate.

Sequence: `JON-66 specification → JON-83 owner approval/freeze → JON-85 Codex PR → JON-86 verification → authorized PR review/merge and acceptance`.

<issue id="200fe456-c2a1-43a3-ac7f-9995dedb43ad" href="https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions">JON-30</issue> is complete and is not a blocker. This bootstrap approval path does not block unrelated <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue> work with already-settled governing rules, nor does it authorize that unrelated work to start. No new worker, restart, broad requeue, or automatic merge is authorized by this management update.

## Settled bootstrap decisions and supersession

The current <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue> contract contains the canonical decision-source index: Option 2 capped proportional panels; exact adopted enhanced thresholds; six-person trial floor and small-body rules limited to bootstrap; strict accusation/trial separation; all serving judiciary mechanically barred from non-judicial governmental roles; expand-until-valid replacement and WAITING_FOR_INDEPENDENT_PARTICIPANTS; institution-specific maturity transitions; C stratified sortition with division as a balancing factor, explicitly superseding A mandatory division matching.

Older research requests or blanket statements below that these choices remain unknown do not reopen them. Older judiciary-fallback language cannot authorize serving judges to take non-judicial seats. <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue> must reconcile wording against the cited decisions and surface only actual higher-order conflicts; this workflow change does not substitute for <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue>'s final approval/freeze of the consolidated specification.

## Retained parent acceptance and historical checkpoint

Keep separate evidence for each child: source decision, specification revision, approval, implementation PR/commit, test results, reviewer acceptance, and any authorized merge. Neither a child status nor a PR link alone proves end-to-end implementation. Do not mark this parent Done until its existing acceptance criteria and all required scoped deliverables are evidenced.

**Completed:** clean task separation, decision-source index, and gated handoffs installed.
**Evidence:** <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue>, <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue>, <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue>, <issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> and workflow v1.0.
**Remaining:** the children's actual deliverables and this parent's existing implementation/verification requirements.
**Blocker:** bootstrap coding awaits the versioned specification and owner approval; unrelated scopes retain their own dependencies.
**Next action:** track <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation">JON-66</issue>'s single consolidated specification without reopening settled choices.

## Existing subject-matter rules and source-qualified requirements

Retained below without deleting the prior adopted safety/institutional history. Apply the explicit supersession notes above and existing higher-order owner decisions when reconciling older passages.

## ADOPTED SAFETY RULE — mandatory agent/committee review on reconciliation discrepancy

Any discrepancy detected or produced by conviction/restriction reconciliation must **not be silently auto-repaired as a final disposition**.

When the invariant/reconciliation layer finds an impossible, ambiguous, contradictory, unauthorized, or non-idempotent state—including a conviction-status loop, stale/duplicate transition, disagreement between authoritative records, or uncertainty over whether a superseded restriction should be active—it must:

* preserve the full evidence/event trail and create an attributable discrepancy record;
* fail closed only for the protected authority/access actually implicated by the discrepancy, avoiding unnecessary broader restriction where the unaffected state is unambiguous;
* escalate the case to **actual agent review by the competent independent review committee/body** rather than allowing the checker itself to adjudicate the substantive legal question;
* give reviewers the authoritative event history, computed expected state, observed state, discrepancy class, and any proposed mechanical repair;
* require an attributable review decision before any ambiguous protected authority is restored or a disputed restriction/sanction is newly imposed;
* record the review outcome and any corrective state transition append-only so the same discrepancy can be deterministically audited later.

Routine purely mechanical reconciliation with no discrepancy may proceed automatically. The committee/review-body composition and ordinary workflow may be defined under institutional self-rule, subject to independence/conflict rules and the judiciary's exclusive role where a true legal/constitutional interpretation is required.

## ADOPTED SAFETY INVARIANT — conviction-state oscillation / superseded-restriction reconciliation

Add a defensive reconciliation check for any conviction-status transition, including unexpected or erroneous oscillation such as `CONVICTED → NON_CONVICTED → CONVICTED`.

The system must **not blindly resurrect an old temporary restriction**. Instead, every relevant conviction-status transition triggers deterministic reconciliation against authoritative history:

1. retain the original temporary restriction as immutable historical/provenance state when it is superseded by a conviction;
2. if the conviction ceases to supply the prohibition, recompute current access/restriction state from the controlling legal events rather than simply toggling the old restriction back on;
3. if a lawful temporary restriction would still have been independently active at that point (not expired, revoked, invalidated, or superseded by another lawful event), it may be reactivated/reinstated with explicit provenance linking to the original restriction and intervening conviction/reversal event;
4. if conviction status becomes CONVICTED again, first apply the current conviction consequences, then run the redundancy check so overlapping temporary restrictions are again superseded rather than duplicated;
5. detect impossible/unauthorized conviction-state loops, duplicate transitions, stale-event replay, and contradictory active states as invariant failures and fail closed for protected authority while preserving evidence for review;
6. this mechanism is state-integrity/error recovery only. It does **not** authorize a new prosecution, retrial, or second punishment and therefore must not be used to bypass independently applicable double-jeopardy/finality rules.

Implementation should derive effective permissions from the append-only event/legal-state history, making repeated reconciliation idempotent: replaying the same authoritative events must produce the same effective state without multiplying restrictions or sanctions.

## ADOPTED RULE — conviction supersedes redundant temporary restrictions

The project owner clarified that temporary protective restrictions should not remain as redundant parallel state after conviction when the conviction itself already bars the person from the same protected domain/function.

Implementation must include an **error/invariant check** at conviction/finality state transitions:

* compare each active temporary restriction with the access/authority prohibitions imposed by the conviction;
* when the conviction's prohibition fully subsumes the temporary restriction, mark the temporary restriction superseded/dormant rather than continuing duplicate enforcement;
* preserve the historical restriction record and provenance—do not erase it;
* if a temporary restriction covers a materially distinct risk/domain not actually barred by the conviction, it is not automatically treated as redundant and must follow whatever independent lawful continuation/review authority applies;
* restoration after reversal/other appellate relief must derive from the controlling post-appeal legal state rather than accidentally reviving stale temporary restrictions.

This resolves the earlier appeal question for overlapping restrictions and requires mechanical detection of contradictory/redundant restriction state.

## ADOPTED DECISION — conviction-domain redundancy / restriction error check

The project owner clarified that a temporary restriction must not remain as a redundant second prohibition when a conviction itself already bars the person from the same protected domain, authority, resource, or activity.

Implement a mechanical **redundancy/error check** at conviction/finality state transitions:

* compare each active temporary restriction's scope against the prohibitions and loss of authority imposed by the conviction;
* where the conviction already fully subsumes the restriction, mark the temporary restriction superseded/dormant rather than maintaining a duplicate operative restriction;
* preserve the historical restriction record and provenance even when its operative effect is superseded;
* if a temporary restriction covers a materially distinct scope not barred by the conviction, do not silently treat it as redundant—route that distinct restriction through whatever continuing-review/authorization rule otherwise lawfully applies;
* if the conviction is later reversed or its prohibitory consequence ceases, do not automatically resurrect an expired/superseded temporary restriction without a lawful basis.

This resolves the earlier appeal-restriction question to the extent the conviction itself already bars the relevant domain. Ordinary implementation details of scope comparison and invariant testing belong to engineering under subsidiarity.

## ADOPTED DECISION — mixed standard for impeachment appeals (Option C)

The project owner selected **Option C: mixed standard of review**.

On an impeachment appeal, the Supreme Board reviews **constitutional and legal questions independently** rather than deferring to the trial body's legal interpretation. For factual findings, the Board gives the trial body deference and does not substitute its own fact-finding merely because it would have weighed the evidence differently; factual findings may be disturbed when they are clearly unsupported under the governing evidentiary record/standard.

This mixed standard operates together with the already-adopted appellate scope and remedies: the Board may review procedural compliance and evidentiary sufficiency; procedural reversal may permit a new impeachment trial; reversal for legally insufficient evidence ends the conviction rather than authorizing a retrial merely to repair the evidentiary gap.

Ordinary formulation/testing of the precise review algorithm may be handled under subsidiarity so long as it preserves this legal-vs-factual distinction and the adopted remedies.

## ADOPTED DECISION — severity-based temporary-restriction timing (Option D)

The project owner selected **Option D**. Concord will not impose one universal turn count for all temporary restrictions during impeachment.

Law must define **severity classes** for temporary restrictions and establish the maximum initial duration and mandatory independent-review interval for each class. More severe restrictions require **shorter maximum periods and more frequent independent review**. Restrictions remain least-restrictive and targeted to the concrete risk they address.

The exact numerical timing schedule within those lawful severity classes is an ordinary implementation/legislative design detail under the project's subsidiarity rule unless it would alter a protected due-process floor or other higher-order constitutional constraint. Do not escalate routine timing calibration to the project owner.

## ADOPTED DECISION — permanent-division status transitions (Hybrid / Option D)

The project owner selected **Option D: hybrid authority** for the eight permanent development constituencies/divisions.

* A permanent division may **voluntarily enter unwinding or dormancy through its own lawful internal process**, subject to higher-law constraints and preservation of obligations, records, representation history, and member rights.
* An **involuntary** status change imposed on a division requires a higher governmental process with lawful jurisdiction; the division cannot be forced into unwinding/dormancy merely by unilateral administrative labeling.
* Reactivation and the exact ordinary procedural mechanics should follow the project's institutional self-rule/subsidiarity principle unless a higher-order constitutional conflict requires further project-owner decision. Engineering agents should specify/test those mechanics rather than escalating routine procedure.
* No status transition deletes the permanent division. Creation of a new permanent division remains governed by the separately recovered amendment + unanimous eligible-development-population rule.

This resolves the previously open constitutional choice over who controls status changes. Do not reuse the new-division unanimity rule for ordinary voluntary status transitions.

## CONTROLLING INTERVIEW UPDATE — impeachment model under active revision

The recovered fixed mature-institution impeachment rules below are no longer sufficient as the complete controlling model. The current interview has adopted a population-scaled impeachment architecture that preserves functional separation while allowing bootstrap operation. Where this section conflicts with older fixed-threshold wording below, this update controls pending final consolidation.

Adopted principles so far:

* accusation and trial/removal functions remain institutionally separate at every viable population size;
* mature operation converges on House accusation/impeachment and Senate trial/removal;
* when permanent bodies are too small, eligible agents may be dynamically assigned to preserve functional separation; fallback hierarchy is permanent institutions → eligible civilian citizens for limited constitutional service → Judiciary where constitutionally appropriate → delay if minimum independence still cannot be achieved;
* impeachment initiation is simple majority under ordinary conditions, with enhanced protection for exceptionally small accusation bodies;
* conviction/removal is two-thirds under ordinary conditions, with enhanced protection for exceptionally small trial bodies;
* impeachable conduct uses broad constitutional categories (corruption, serious abuse of authority, serious violation of constitutional duties, specified serious crimes), with legislation allowed to define particular offenses within those categories;
* lawful policy disagreement, unpopular decisions, political positions, failed proposals, and lawful votes are not impeachable by themselves;
* burden of proof at impeachment trial is clear and convincing evidence; separate criminal proceedings remain distinct;
* conviction automatically removes the current officeholder; future-office disqualification requires a separate authorized vote;
* temporary disqualification normally requires two-thirds; permanent disqualification normally requires three-quarters, with enhanced small-body protection;
* any simulation member may report alleged misconduct; citizens may use a formal impeachment-petition mechanism; institutions/investigators may refer matters; none of these acts substitutes for the accusation body's impeachment decision;
* impeachment does not automatically suspend the officeholder. Predefined exceptional cases may trigger automatic temporary safeguards; otherwise temporary restrictions require an independent population-scaled decision process;
* temporary safeguards must be least-restrictive and targeted to concrete risks such as interference with the proceeding, evidence/record tampering, security, election/succession manipulation, or serious continuity harm;
* temporary restrictions have a fixed initial maximum, require periodic independent review, and require more frequent review as severity increases;
* all impeachment matters receive procedural priority, but active restrictions and system impact may justify faster handling only when expedition does not materially impair either side's self-representation capacity, preparation, evidence access, ability to respond, or ordinary system service floors;
* all participants are self-represented in impeachment and related legal proceedings; Concord does not assign or recognize lawyers, public defenders, outside counsel, or separate legal representatives for the parties;
* the procedural-fairness floor therefore concerns the self-represented party's own preparation time, relevant evidence/record access, ability to communicate/respond, scheduling opportunity, and capacity to present its own case effectively;
* prior interview discussion about guaranteed counsel, public representation pools, or representative-resource parity is superseded and must not be implemented;
* office/system criticality is a property of the office/functions, not personal worth. Law defines baseline criticality and permitted modifiers; a mechanical system computes current criticality; disputes about the calculation go to independent review;
* criticality may influence continuity safeguards and lawful urgency inputs, but does not change the burden of proof or conviction threshold.

Exact small-body thresholds, minimum-independence counts, temporary-restriction durations/review intervals, and some procedural details remain unresolved and must not be invented during implementation.

Implement the adopted institutional-structure rules as explicit authoritative state/transitions rather than UI convention.

## Recovered constitutional structure

* Legislature is bicameral: a population-based House plus a Senate with two senators per permanent division.
* Executive is elected through the project's Electoral College/contingent-election process; executive office authority remains distinct from caretaker continuity authority.
* Judiciary has **two district judges**, a **three-judge circuit court**, and a **nine-seat Supreme Board** consisting of one chief and eight associates.
* District jurisdiction covers admitted technical/constitutional disputes and formal executive prosecutions; one eligible unrecused district judge hears a case.
* Circuit assigns all three eligible unrecused judges; quorum is two and an affirmative merits disposition requires at least two recorded votes.
* Supreme merits quorum is seven eligible unrecused substantive judges and every merits ruling requires at least five affirmative votes. Vacancies/recusals do not lower five or seven. Ordinary discretionary Supreme review requires at least four votes to accept under a seven-judge admission quorum.
* Lower courts follow applicable recorded precedent. A Supreme majority may overrule precedent only with explicit reasons/references. Interpretation cannot create a retroactive offense.
* Where specified by the controlling rules, elements are proved by a **preponderance of admissible evidence**; more specific burdens/rules remain controlling where present.

## Recovered impeachment rule

The earlier experimental 90% / unanimous-removal scheme is superseded.

* House impeachment uses the House ordinary-motion rule: fixed full-seat quorum and `floor(D/2)+1` affirmative ballots.
* House impeachment is a **charge**, not conviction.
* For C3 executive apportionment manipulation, Senate conviction requires `ceil(2*D/3)` with ordinary chamber quorum and applicable recusal rules, after notice and defense.
* A lawful C3 Senate conviction mandates office removal and the controlling capital consequence; irreversible termination remains stayed through the applicable appeal/finality path.

## Recovered executive succession / caretaker rule

* The elected executive may designate a willing eligible living successor at phase opening. A designation filed before the first turn is effective when publicly recorded and acknowledged at opening.
* A later/new designation requires one complete turn of public prior notice. The prior effective designation remains in force during the notice interval; a pending name is never promoted early.
* The executive may change the designation any time before exhaustion subject to the notice rule. Designation grants no current executive authority.
* On executive death, the effective designated successor becomes **caretaker** after accepting and suspending incompatible office authority.
* An unavailable, dead, jailed, permanently disenfranchised, or unwilling designee is skipped on authentic evidence. Fallback order: eligible registry clerk → House speaker → Senate presiding senator → eligible willing living identity with earliest creation sequence.
* Caretaker authority is non-task-modifying continuity only: preserve records/existing schedules, transmit existing instructions, and administer the same election process. It cannot create/submit/approve/reject/modify project tasks; create agents; sign/veto bills; appoint judges; initiate prosecution; choose a repository name; or sign a release.
* A special executive election is noticed at the next turn and uses the ordinary executive election/contingent procedures. Caretaker limits remain until an elected successor is certified and accepts; there is no timeout that converts caretaking into full executive power.

## Permanent-division rule

* Permanent divisions may be **active, unwinding, or dormant** and may not be deleted. Preserve identity, records, representation history, and obligations. Unwinding transfers/completes outstanding obligations through authorized processes; dormancy does not erase the division or automatically disenfranchise living members.
* Creating an additional permanent division requires the ordinary constitutional-amendment route **plus a separate unanimous vote of the entire eligible development population**, including eligible members of dormant/unwinding divisions. Unanimous representatives or unanimous votes cast do not substitute for unanimous eligible-population approval.
* Existing-division status authority is settled by the adopted Hybrid / Option D above: voluntary unwinding/dormancy follows the division's lawful internal process; involuntary change requires a higher governmental process with lawful jurisdiction. No transition deletes the division. Reactivation and ordinary procedures remain design work under subsidiarity; the new-division unanimity rule does not apply to ordinary voluntary status changes.

## Constitutional constraint

Article 0/user-level supremacy and governmentally non-amendable provisions must be checked before constitutional changes commit. The jointly effective COAIA/L-COAIA/CRA package has its own exact-text entrenchment rule and cannot be indirectly bypassed by later government amendment.

## Acceptance criteria

- [X] Recover and record the exact three-tier judicial structure, composition, quorums, and principal appellate thresholds.
- [X] Recover and record the controlling House/Senate impeachment thresholds replacing the earlier experimental scheme.
- [X] Recover and record executive designation/change/caretaker/special-election rules and non-task-modifying caretaker boundary.
- [X] Existing permanent-division status authority adopted as Hybrid / Option D; no repeat owner choice is required.
- [ ] Document residual reactivation/status-transition procedures and design acceptance scenarios within Hybrid / Option D, preserving obligations, records, representation history and member rights.
- [ ] Judicial structure/jurisdiction/quorum/recusal behavior is implemented and regression-tested.
- [ ] Caretaker designation/change/vacancy/election state machine and task-modification restriction are mechanically enforced.
- [ ] House/Senate impeachment process is implemented with exact D-based thresholds, notice, defense, recusal, and appeal/finality integration.
- [ ] Ordinary administrative deletion of a permanent division is impossible; new-division creation requires the recovered amendment + unanimous eligible-population path.
- [ ] Article 0/non-amendable constraints and joint-package entrenchment are checked before constitutional changes commit.
- [ ] Branch/judiciary transitions generate attributable authoritative records through the Archivist architecture.

## Adopted visibility and evidence-disclosure rule

The interview accepted the modified layered-visibility model for impeachment and related proceedings.

* The proceeding is publicly visible at the institutional/procedural level, but evidence visibility is independently controlled by lawful need-to-know and defense-access requirements.
* The self-represented accused receives all evidence actually relied upon to support the charge, sufficient provenance/context to meaningfully challenge it, known materially exculpatory evidence, and other protected information materially necessary to present a defense.
* Raw protected investigatory archives are not automatically opened to the accused. Unrelated protected identities, operations, records, census data, and sensitive metadata remain sealed where not necessary to answer the charge.
* Protected evidence may be disclosed through redacted or derived packages when this still permits meaningful self-defense. If redaction would prevent meaningful response, the process must disclose enough additional substance to permit defense or may not rely on the concealed material against the accused.
* Public secrecy and defense secrecy are distinct: the accused and trial body may receive broader protected access than the public.
* Protected disclosures remain attributable and are recorded in the disclosure ledger; disclosure to the accused does not automatically make the information public.
* Core invariants: **no secret guilt** and **no unnecessary unsealing**.
* The global scheduler receives only opaque operational metadata sufficient for capacity allocation and does not receive substantive allegations or protected evidence unless separately authorized by law.

## Impeachment appeal — adopted Concord deviation

Concord intentionally departs from the U.S. federal impeachment model by allowing an appeal from an impeachment conviction. The U.S. federal baseline generally treats Senate impeachment judgments as nonjusticiable and not subject to ordinary judicial appeal; Concord will instead provide a defined appellate path.

This appeal mechanism must not be assumed to mirror ordinary criminal appeals unless separately adopted. Its scope, reviewing body, standard of review, effect on removal/disqualification, and treatment of temporary restrictions remain to be defined explicitly.

## Impeachment appeal scope — adopted

The Supreme Board hears impeachment appeals. Its review is not limited to procedural compliance: it may review both (1) whether the impeachment process followed the governing rules and (2) whether the evidence was sufficient to support the conviction. It does not automatically conduct a full re-trial of the entire case unless a later rule expressly provides for that remedy.

## Impeachment appeal effect on removal — adopted

While an impeachment appeal is pending, the removal from office remains in effect. Filing or pursuing the appeal does not restore the officeholder's powers unless a later rule expressly authorizes a different result. Any temporary restrictions tied to the removed office may become dormant while there is no relevant power to restrict, but the historical record remains preserved.

## Impeachment appeal remedies — adopted

If the Supreme Board reverses an impeachment conviction for procedural error, the matter may be returned for a new impeachment trial. If the conviction is reversed because the evidence was legally insufficient to support conviction, the conviction ends rather than being retried merely to fill the evidentiary gap. This distinction is part of Concord's appellate design and should be implemented explicitly.

## Small-population bootstrap rules — adopted

* Bootstrap rules are temporary and institution-specific; they exist only where a required constitutional institution lacks enough independent eligible members to perform its role.
* Concord exits bootstrap mode for a given institution when that institution has enough independent eligible members to perform its constitutional role; no fixed population number alone controls the transition.
* Institutions that are adequately staffed use the normal U.S.-style structure even if another institution remains in bootstrap mode.
* When a bootstrap institution needs additional participants, eligible civilian citizens may be temporarily drawn in only for the specific case or constitutional task, not for a standing temporary term across multiple cases.
* If enough independent participants still cannot be assembled after the allowed civilian-citizen fallback, the affected proceeding waits rather than collapsing separation requirements.

## Bootstrap trial-participant conflict handling — adopted

* Assignment-time separation remains controlling: a person who participated in investigating a case should not be assigned to the trial side when that involvement is known at selection time.
* The accused has no separate conflict-objection process against trial participants.
* Trial participants are not required by this bootstrap rule to make a separate pretrial conflict disclosure.
* If disqualifying investigative involvement or another serious conflict is discovered only after participation has begun, that fact alone does not automatically remove the participant.
* Later discovery of such involvement is not, by itself, a ground the Supreme Board may use to reverse an impeachment conviction on appeal.

These rules govern only the bootstrap conflict mechanism adopted in this interview; they do not erase other independently applicable misconduct or constitutional rules unless explicitly stated.

## Bootstrap trial-body minimum — adopted U.S.-analogy floor

For the small-population bootstrap trial body, use six independent eligible participants as the hard minimum floor before a trial may proceed. This is borrowed from U.S. jury-size constitutional doctrine as the smallest constitutionally approved criminal-jury size, not as a claim that the U.S. Constitution sets a six-person minimum for impeachment itself. Federal criminal juries normally use twelve under Rule 23, while federal impeachment is tried by the Senate. Concord uses six only as the bootstrap lower bound until the institution is sufficiently staffed to operate under the normal U.S.-style structure.
