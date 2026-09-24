# Evidence snapshot: Review lane D — coin prior-art acceptance and missing-evidence gate

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-112/review-lane-d-coin-prior-art-acceptance-and-missing-evidence-gate
- Version: 2026-09-18T21:36:32.203Z
- Source date: 2026-09-18T21:36:32.203Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Independent research acceptance lane for the current coin prior-art review path.

Primary target: <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue> exact-model prior-art audit.
Dependencies/evidence to check: <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> outstanding conformance corrections, <issue id="1e1d4d62-b365-4e39-9383-fb51bbe3d760" href="https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification">JON-106</issue> missing source-verification table, and any completed <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue>/104/105 review findings relevant to <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue>.

Do not mark <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue> PASS while required source-verification evidence is missing. If <issue id="1e1d4d62-b365-4e39-9383-fb51bbe3d760" href="https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification">JON-106</issue> is the only missing bounded deliverable, keep <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue> In Review and ensure <issue id="1e1d4d62-b365-4e39-9383-fb51bbe3d760" href="https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification">JON-106</issue> remains the single correction path rather than spawning duplicate research.

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

Return the exact acceptance blockers or PASS evidence. No novelty score, no quiz work, and no redesign of the coin mechanism.

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
