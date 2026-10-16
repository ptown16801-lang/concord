# Evidence snapshot: Concord AI Role & Independence Specification — design convergence

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence
- Version: 2026-09-24T10:22:10.205Z
- Source date: 2026-09-24T10:22:10.205Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Planning/review only. No Linear Coding Session, no Loop, no code implementation, and no provider/model qualification.

Goal: continue the model-neutral role-framework discussion to final design agreement.

Frozen proposal:

* Roles: Planner, Builder, Reviewer, Verifier, Security/Governance Reviewer, Researcher, Integrator, Release Steward.
* AI roles are capability roles, not Concord authority roles; human retains scope changes, final acceptance, merge authorization, deployment authorization, and changes to governing decisions.
* Planner architecture requires qualifying independent review before becoming an implementation contract.
* Integrator admission is a hard gate and cannot waive missing evidence.
* Independence is determined by lineage, not role labels; role changes cannot manufacture independence.
* Required lineage: provider/model family; session/agent identity; role-at-contribution; prior contribution to requirements/plan/architecture/security assumptions/code/tests/review; repo/branch/commit range; tools/permissions.
* Same-provider, different-session validation is conditionally eligible, never automatically independent.
* Next artifact: model-neutral Role & Independence Specification with Lineage & Independence Contract, consequence levels, routing table, eight Role Cards, Integrator Admission Contract, Human Authority Boundary.
* Provider/model qualification and implementation remain out of scope until internal consistency and independence review passes.

The discussion should challenge contradictions, missing normative rules, unnecessary roles, and unsafe independence assumptions before freezing the artifact boundary.

## Final agreed outcome — September 24, 2026

Linear Agent completed the requested design review in the issue discussion. After two rounds of corrections, no blocking contradiction remained.

The role framework and specification boundary are **agreed and frozen**.

The model-neutral specification will cover:

* eight Role Cards and their duties;
* reserved human authority and controlled amendments;
* consequence classification, minimum floors, routing, and escalation;
* lineage recording, retention, auditability, and evidence freshness;
* consequence-dependent independence decisions, including disqualifying self-validation and treatment of unknown lineage;
* evidence requirements, waivable versus non-waivable gates, and bounded human exceptions;
* Integrator admission decisions and exception-authorized status.

Normative clarifications adopted during review:

* consequence level is determined/validated before applying the required independence-separation threshold;
* prior material contribution remains an immediate disqualifier for independent validation;
* unknown or unverifiable required lineage fails the independence gate;
* shared infrastructure is recorded and evaluated for material correlation rather than treated as automatically disqualifying;
* human exceptions cannot convert missing evidence into satisfied evidence;
* exception-authorized artifacts remain explicitly not fully validated;
* Integrator may admit an exception-authorized artifact only after verifying a valid named-human exception, waivability, scope, validity, artifact/version match, and satisfaction of all non-waivable gates;
* evidence must be re-evaluated when the artifact, governing assumptions, security assumptions, relevant tool/execution configuration, consequence classification, or another material dependency changes.

Still out of scope until the specification passes its own internal review:

* provider/model qualification;
* provider research;
* agent implementation;
* operational automation behavior.

## Specification draft delivered — September 24, 2026

The owner's instruction to initiate drafting has been carried out. The canonical document is [Concord AI Role & Independence Specification v1 — Draft for review](<https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098>), revision **v1-draft.1**.

The document contains the eight complete Role Cards; shared lineage/independence contract; proposed consequence definitions and floors; normative routing table; common evidence, retention, and freshness rules; Integrator admission checklist; proposed waiver matrix and human-exception procedure; human authority and amendment rules; document consistency cases; and author/review lineage.

Framework convergence remains recorded above. Delivery of the actual specification is a separate milestone: **draft complete; review and human acceptance pending**. In Review means the document is delivered for review, not that an agent is running or has approved it. J remains the accountable human; no agent delegation is requested.

Owner decisions explicitly left proposed:

* **OD-1:** consequence definitions and minimum floors;
* **OD-2:** precise family/provider separation thresholds;
* **OD-3:** non-waivable gates and narrowly permitted exceptions.

Review independence: ChatGPT authored this draft and both ChatGPT and Linear materially shaped the preceding framework. Author self-check and Linear continuity/internal-consistency feedback MUST NOT be counted as qualifying independent validation. A separately eligible independent reviewer remains required; no provider selection or qualification is being performed to fill that role now.

The associated review request is a handoff record only unless an actual response is observed. No Coding Session, Loop, credit purchase, provider research, qualification, agent implementation, repository change, or change to active integration ownership is authorized by this delivery.

## Document continuation delivered — v1-draft.2, September 24, 2026

At the owner's request to start work on <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue>, Codex continued the existing specification task from Linear's actual advisory response (comment `4b7e68ca-5cf7-467d-b020-80d0f85da977`). That response reviewed v1-draft.1, found no blocking contradiction within its advisory scope, and proposed six nonblocking clarifications.

The [canonical specification](<https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098>) is now **v1-draft.2**. The [exact prior draft snapshot](<https://linear.app/jons-garage/document/historical-snapshot-jon-163-role-and-independence-specification-v1-f6cd7ca6c7b3>) preserves v1-draft.1.

All six findings are addressed as draft clarifications: the L1 proportionality question remains an explicit owner choice; an eligibility decider needs separately attested eligibility before taking a qualifying lane; supplemental evidence must identify claim and oracle basis; the integration ledger tracks affected/new claims; exceptions cannot aggregate multiple supplementary items on one artifact revision; and **OD-4** now records the retention-system/readiness decision required before adoption. Eight Role Cards and the frozen framework remain intact.

Readback verified the prior snapshot exactly and the saved revision against the intended changes after Linear's automatic issue-link formatting. This is author checking, not qualifying independent validation. Section 12.2 records authorship, source review, six-finding traceability, limitations and remaining acceptance work.

**Remaining:** revised-text review; qualifying independent evidence and classification confirmation; owner dispositions OD-1 through OD-4; retention readiness; named-human adoption of the exact revision. Linear's v1-draft.1 review is not approval of v1-draft.2. The issue remains **In Review**, accountable to J. No reviewer has been invoked or delegated, and no code, provider qualification, implementation, integration-ownership or execution-setting change was made.
