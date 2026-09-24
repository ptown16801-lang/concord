# Evidence snapshot: Consolidate bootstrap impeachment decisions into an implementation specification

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation
- Version: 2026-09-19T03:08:42.710Z
- Source date: 2026-09-19T03:08:42.710Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

# CURRENT EXECUTION CONTRACT — v1.1 / 2026-09-16

**Work type:** specification consolidation. **Executor:** the existing Linear-agent session; do not create another run. **Sole deliverable:** one versioned, source-reconciled bootstrap impeachment implementation specification for owner review and subsequent Codex handoff. **Not authorized here:** repository coding, commits, PRs, merging, or launching downstream work.

The owner instructed **“Implement the above”** after approving this consolidation-first workflow. The earlier task to return 2–3 alternatives and earlier comments instructing this same issue to code are superseded as execution instructions. Preserve their history; do not repeat the preference interview or completed research.

## Inputs and authority

Read this contract and the latest checkpoint first, then <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue> and the specific decision sources below. Reuse the existing research result (`f275fc59-f80e-4cf0-9deb-dbf076599ebb`, 2026-09-16 08:49 UTC). A document timestamp alone is not evidence of an owner reversal. New explicit owner instructions remain controlling and must be reconciled into the contract before continuing affected work.

## Settled decisions — preserve, do not reopen

| Decision | Controlling recorded source in this issue |
| -- | -- |
| Option 2: capped proportional panels | Owner decision `3a069dec-db9a-4613-b104-e4f788f3b78e`, 08:56 UTC |
| Exact enhanced small-body thresholds | Owner decision `06fd6e94-a540-49a0-b39c-901d93ca168d`, 09:01 UTC |
| Small-body rules and six-person trial floor are bootstrap-only; mature institutions use ordinary governing rules | Owner decision `a6f5877c-36fa-49ce-984a-beb0e88a6ad5`, 09:01 UTC |
| All serving judiciary mechanically excluded from every non-judicial governmental role; former judges must first leave office and otherwise qualify | Owner decision `5b6236ae-d6f3-429f-9c65-9e24381254a4`, 09:02 UTC |
| C: stratified sortition; division is a balancing factor, not an individual-seat requirement | Owner decision `433f0bf4-3a2b-4b78-949d-50ab35213a65`, 10:06 UTC; explicitly supersedes A in `c1a7a96c-98b3-4b75-8bed-a468c2d7a711` |
| Strict accusation/trial separation; expand-until-valid replacement; WAITING_FOR_INDEPENDENT_PARTICIPANTS when valid composition is impossible; institution-specific maturity transitions | Same 10:06 UTC adopted decision and consolidation directive `d086b9e2-d878-441d-a687-3a06eda79b7b` |

The adopted Option 2 research gives `A = min(5, max(2, floor(R/3)))` and `T = min(12, R - A)`, with `T >= 6` required in bootstrap. Define and reconcile R precisely against authorized exclusions; never double-count or use overlapping accusation/trial participants.

Thresholds: accusation A=2 requires 2/2; A=3–4 requires `ceil(2A/3)`; A=5 uses simple majority. Trial T=6–8 requires `ceil(3T/4)`; T=9–12 requires `ceil(2T/3)`. Do not turn these simulation rules into claims about external legal requirements.

<issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue>'s other adopted safeguards remain controlling, including self-representation, case independence, governing proof/review standards, and attributable discrepancy review. Reconcile superseded descriptions of judiciary fallback and unresolved thresholds explicitly, without inventing new authority or silently amending unrelated rules.

## Deliverable and acceptance

Produce one document, **Bootstrap impeachment implementation specification**, with revision, decision-source table, explicit supersession map, definitions, deterministic state transitions, selection/exclusion/replacement algorithm, phase snapshots, institution-specific maturity transitions, interfaces to population/eligibility records, and acceptance-test cases. Proposed repository destination for later Codex handoff: `docs/specs/bootstrap-impeachment.md`; this is a proposed path, not a claim that it already exists.

Include boundary cases for insufficient independent participants, all serving-judiciary exclusions, no accusation/trial overlap, stratification without mandatory division seats, threshold cutovers, lawful replacement, and mature-versus-bootstrap behavior. State which checks are specification-level reasoning and which require later code execution.

If a real higher-order conflict remains, attach the exact conflicting source passages and the smallest owner decision required. Do not manufacture alternatives merely to satisfy the obsolete research brief.

Move to In Review only with the specification link/version and source/consistency checklist. <issue id="1436cf59-eb10-4e21-8b94-af218735fb58" href="https://linear.app/jons-garage/issue/JON-66/research-bootstrap-impeachment-scaling-model">JON-66</issue> can complete after its specification acceptance; completion does not imply code exists, tests passed, or final owner approval occurred. <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/jon-61-decision-gate-select-bootstrap-impeachment-scaling-model">JON-83</issue> remains the owner-only final approval gate for the consolidated wording. Do not close or decide it on the owner's behalf.

## Boundaries and stop conditions

Stop only the affected path for unavailable required source/access, a genuine controlling-rule contradiction, or a new reserved owner-level decision. Use ordinary engineering discretion for nonconstitutional mechanics, stating assumptions explicitly. Do not repeat unchanged failed operations, research settled choices, generate quizzes, alter unrelated issues, or restart other projects. Preserve partial work.

## Latest checkpoint — DELIVERED_AND_APPROVED / 2026-09-16

**Completed:** Bootstrap impeachment implementation specification revision 1.0 was delivered in document `1db79f6f-a631-43e2-ac85-e8f55561b232`; the owner approved and froze it through <issue id="876e097e-65c8-4669-89e3-2f66d855e38e" href="https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification">JON-83</issue> comment `9679e53a-3fd2-4ca4-963a-4ba2c30e15de` at 18:15 UTC. This specification-consolidation issue is Done.
**Evidence boundary:** specification delivery/approval does not establish an implementation, a code test, or a merged PR.
**Correction:** the 17:16 BLOCKED_RUNTIME_START checkpoint was historical and was superseded by subsequent delivery and approval. Preserve its original error and session history; it is not a current reason to restart this completed task.
**Remaining elsewhere:** <issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue> requires accepted published population/eligibility interfaces and exact dependency pins; <issue id="dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602" href="https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification">JON-86</issue> verifies its eventual implementation. <issue id="31df609d-b332-4982-b3f4-85999e0e19f9" href="https://linear.app/jons-garage/issue/JON-89/jon-83a-independent-source-traceability-review-of-bootstrap">JON-89</issue> is advisory source review.
**Next action:** reuse frozen revision 1.0 and its decision-source index. Do not rerun consolidation, reopen settled owner decisions, or repeat startup diagnostics for this completed issue.

For subsequent checkpoints record `Contract revision / Executor-session / Completed / Evidence / Remaining / Blocker / Next action`. Include repository/branch/SHA only when actually inspected. Older comments are historical evidence, not parallel execution prompts.
