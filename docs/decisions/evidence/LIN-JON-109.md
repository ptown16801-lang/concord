# Evidence snapshot: Review lane A — governance foundation design acceptance

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `27cbe90746bd6d20f4de80a821d1dfaf75041f3b`; original SHA-256: `635e8f868257f055716538884f1444cc08df769f1009333a821dcfe0032be1a3`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-18T21:36:24.252Z
- Source date: 2026-09-18T21:36:24.252Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Independent acceptance lane for delivered governance-foundation designs.

Targets: JON-15 (private source reference withheld) Persistent identity/memory/succession; JON-16 (private source reference withheld) Scheduler/checker/continuity; JON-17 (private source reference withheld) Security gateways/domain authorization/authoritative stores.

Review each target independently against its current issue contract and delivered PR/artifact. Confirm consistency with settled owner decisions and cross-issue ownership boundaries. Do not redesign the system.

Shared rules:

* Purpose is acceptance review, not reimplementation.
* Reviewer must be independent of the artifact's producer; do not let an artifact approve itself.
* For each target: read the issue contract, delivered artifact/PR, relevant review comments, and explicit acceptance criteria.
* Record PASS or FAIL with evidence.
* PASS: mark the reviewed issue Done if no explicit unresolved acceptance condition remains, and release downstream blockers.
* FAIL: move reviewed issue to Todo or Backlog as appropriate and prepend/record only the exact failed criteria and smallest correction required. Reuse the same issue/artifact; do not create duplicate implementation tracks unless the correction truly requires a distinct bounded task.
* Escalate to owner only for a genuinely reserved owner-level product/governance choice not already decided.
* HARD EXCLUSION: no quiz work of any kind, including JON-47 (private source reference withheld)/JON-64 (private source reference withheld)/JON-65 (private source reference withheld) or similar scope.
* Never auto-merge or deploy.
* Preserve historical evidence, hashes, PR links, comments, and accepted decisions.
* Do not review unrelated projects.

Return one disposition per target and apply the resulting status/correction action directly when supported.

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
