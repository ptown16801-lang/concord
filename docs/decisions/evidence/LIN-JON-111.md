# Evidence snapshot: Review lane C — population eligibility and integration acceptance

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-111/review-lane-c-population-eligibility-and-integration-acceptance
- Version: 2026-09-18T21:36:30.210Z
- Source date: 2026-09-18T21:36:30.210Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Independent technical/provenance acceptance lane.

Targets: <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> authoritative population registry; <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue> eligibility lifecycle/franchise; <issue id="2bdd3887-360e-4cd7-ac1b-3c61672a71d1" href="https://linear.app/jons-garage/issue/JON-88/jon-82b-independent-adversarial-fixtures-and-test-harness-preparation">JON-88</issue> adversarial fixtures/test-harness preparation; <issue id="79ac2c3d-cfbd-44b1-9c8f-18fd411bfb6c" href="https://linear.app/jons-garage/issue/JON-91/jon-85a-reconcile-recovered-jon-78jon-79-pins-and-unblock-bootstrap">JON-91</issue> recovered-pin reconciliation.

For <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue>/<issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue>, verify exact published artifact/PR/SHA evidence, contract coverage, Node-supported checks, interface ownership, and outstanding integration conditions. <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue>'s durable-persistence/authentication boundary must be explicitly resolved or kept as a FAIL/correction condition; do not hand-wave it away.
For <issue id="2bdd3887-360e-4cd7-ac1b-3c61672a71d1" href="https://linear.app/jons-garage/issue/JON-88/jon-82b-independent-adversarial-fixtures-and-test-harness-preparation">JON-88</issue> and <issue id="79ac2c3d-cfbd-44b1-9c8f-18fd411bfb6c" href="https://linear.app/jons-garage/issue/JON-91/jon-85a-reconcile-recovered-jon-78jon-79-pins-and-unblock-bootstrap">JON-91</issue>, determine whether their bounded deliverables are complete and whether any remaining condition belongs to another canonical issue rather than keeping these review records open indefinitely.

Shared rules:

* Purpose is acceptance review, not reimplementation.
* Reviewer must be independent of the artifact's producer; do not let an artifact approve itself.
* For each target: read the issue contract, delivered artifact/PR, relevant review comments, and explicit acceptance criteria.
* Record PASS or FAIL with evidence.
* PASS: mark the reviewed issue Done if no explicit unresolved acceptance condition remains, and release downstream blockers.
* FAIL: move reviewed issue to Todo or Backlog as appropriate and prepend/record only the exact failed criteria and smallest correction required. Reuse the same issue/artifact; do not create duplicate implementation tracks unless the correction truly requires a distinct bounded task.
* Escalate to owner only for a genuinely reserved owner-level product/governance choice not already decided.
* HARD EXCLUSION: no quiz work of any kind, including <issue id="9eb987e4-62a4-4997-82a3-8529bbb87e59" href="https://linear.app/jons-garage/issue/JON-47/build-quiz-report-and-blind-evaluation-interface">JON-47</issue>/<issue id="d60d3401-d509-463d-8a74-20049219f26f" href="https://linear.app/jons-garage/issue/JON-64/future-adaptive-llm-quiz-and-reinforcement-curriculum">JON-64</issue>/<issue id="1b679ff0-e5b0-48a2-8492-a70498f274c0" href="https://linear.app/jons-garage/issue/JON-65/future-adaptive-llm-quiz-and-reinforcement-curriculum">JON-65</issue> or similar scope.
* Never auto-merge or deploy.
* Preserve historical evidence, hashes, PR links, comments, and accepted decisions.
* Do not review unrelated projects.

Apply PASS/FAIL dispositions and release only objectively satisfied blockers.

## Anti-loop failsafe

This review regime must never create an endless review/correction cycle.

* Use a stable review key: `issue ID + artifact/PR/SHA + acceptance-criteria revision`.
* Before starting or repeating a review, inspect prior review decisions for that key. If an equivalent PASS/FAIL already exists and the artifact/criteria have not materially changed, do not rerun it.
* A FAIL must identify the exact failed criteria and the smallest corrective action. The next review may occur only after objective evidence shows that correction changed the artifact, contract, or required evidence.
* Maximum automatic review cycles for the same substantive defect: **2**. After two FAIL cycles for materially the same defect, stop automatic cycling, leave the affected issue in Todo/Backlog (or In Review if it is waiting only for evidence), and post a single `REVIEW LOOP STOPPED` checkpoint with: repeated defect, evidence, attempted corrections, and the smallest owner/architectural decision or manual intervention needed.
* Never create a new repair issue merely to reset the cycle count. Reuse the canonical issue and existing artifact.
* Do not reassign the same producer as its own independent reviewer.
* Do not reopen a PASSed issue unless new evidence, a changed contract, or an explicit owner instruction invalidates the prior acceptance.
* The coordinator must track per-issue review count and last material artifact revision. A status change alone does not reset the count.
* If two reviewer lanes disagree on the same unchanged artifact, do not bounce between them. Escalate once to the coordinator for a single reconciliation decision; if that still requires a reserved owner choice, ask the owner once.
* No quiz work may ever be used as a fallback or substitute task while a review is stopped.
