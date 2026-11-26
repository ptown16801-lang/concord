# Bootstrap decisions and database fit — source audit

**Status:** Draft public derivative — not independently reviewed

**Source inspection date:** November 11, 2026

**Decision impact:** No decision change

This report examines bootstrap impeachment decisions and database fit. It supplements broader political-system/authority mapping work; it does not replace that work, the governing register, or an implementation review.

This is a public adaptation of a private working audit. Private source links and coordination details are omitted. Public redacted evidence snapshots are labelled as such in their own files; they are not the unchanged originals. The later public publication design and government-records proposal are identified separately in the source index. No owner policy, production engine, code acceptance, merge or deployment is adopted here.

## Question and short answer

Which apparently broken bootstrap behaviors reflect deliberate Concord decisions, which concerns still need implementation verification or interpretation, and where would a database improve Concord's records and search?

Several restrictive behaviors are explicit choices: bootstrap floors and separation, stage freezing, limited effects of conflicts discovered after participation, independent discrepancy review, separated institutional stores, and admitted-operation pause/resume. They should be preserved rather than silently optimized away. The original snapshot-versioning and exclusion-provenance findings address implementation compliance with those rules. They do not establish that the rules are wrong.

The strongest database recommendation is to build on the existing bounded SQLite designs and government-records proposal, preserve domain separation, and evaluate a rebuildable SQLite FTS5 search projection. A wholesale engine migration is not supported by a measured Concord workload in this audit. These are proposals, not adopted architecture.

## Charter

- Goal: provide a source-linked disposition of the reported concerns without asking the owner to repeat settled decisions or treating builder claims as acceptance.
- Scope / object / subject: Concord governance and record integrity / bootstrap impeachment and supporting storage / the original approvals, frozen specification, relevant decision entries, issue contracts, and database capabilities.
- Type: descriptive source audit. The intended system and reported concerns were already understood; the task was to recover applicable intended behavior and bound recommendations.
- Knowledge depth: working. The original implementation diff and selected behavior were examined earlier; this audit inspected decision history and sources. It did not execute a new independent review of the revised implementation.
- Questions: Q1 Which rules were explicitly chosen and superseded? Q2 Which reported gaps concern implementation rather than new policy? Q3 Which exact interpretations remain unresolved in the inspected evidence? Q4 What database use fits existing storage and security contracts? Q5 Which existing technical issue owns a resulting proposal?
- Versions: published Develo register 77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce; bootstrap specification revision 1.0; first code review at caf599c8592891f20c23dba992af9c6f9ea82e27; builder's revised code at 21e6a09f39f63f82d192aaff5d0ac14236b004d3. The submitted review and subsequent implementation recheck are separate evidence.
- Boundary: this is a documentation-only addition. No governing files, runtime code, merge/deployment state, or institutional authority are changed.

## Canonical sources and search boundary

The [public source index](#public-source-index) identifies the evidence available without private account access. The private working audit also retained the original source locators. Direct source inspection is not an independent-review verdict. Evidence snapshots that declare redaction remain redacted derivatives; their historical task states are not current execution authority.

Source priority for intended behavior:
1. Original owner approval/selection records, including the freeze approval and decision-bearing bootstrap selection comments.
2. The frozen specification and accepted decision/security contracts, within their recorded scope.
3. Exact-version implementation evidence and current issue briefs.
4. Agent explanations, builder spec maps, research and proposals, used as claims to check rather than authority.

Coverage included the complete 25-comment JON-66 discussion and freeze-approval discussion, constitutional and self-rule records, the published register and relevant source snapshots, security/publication/search/replay/writer contracts, the existing government-records proposal, bootstrap artifact/review records, and official SQLite/PostgreSQL documentation. Private operating notes were used only to avoid stale workflow assumptions, not published as project evidence. Bulk connector retrieval was used before selective reading. Some large design/issue collections were inspected selectively; this is not a claim to have read every historical project conversation or every unrelated issue.

Primary admitted-operation answers were also recovered from an existing local Git evidence object. No private transcript, machine/account detail or access-bearing attachment URL is reproduced here. The public register's CON-045/046 provides the maintained locator. Original constitutional/master-prompt material remains recorded as incompletely recovered; an unsuccessful search is not proof that an owner decision never existed.

## Findings ledger

| ID | Finding | Disposition and evidence |
| -- | -- | -- |
| F01 | Bootstrap revision 1.0 was explicitly approved, including selection, replay/audit, snapshot, replacement and stratification mechanics. | Recorded owner approval. [S03](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-83-COMMENTS.md) and [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md). This is distinct from accepting later code. |
| F02 | The six-person floor and enhanced small-body thresholds are bootstrap-only. House and Senate maturity are independent. | Settled choice: the bootstrap-only scope selection recorded in JON-66; spec §§6 and 8. [S02](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-66.md) [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md). |
| F03 | Stratified sortition C superseded mandatory division matching A. A division is a balancing factor, not a required seat. | Explicit replacement: the later stratified-sortition selection and its explicit supersession directive. [S02](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-66.md). |
| F04 | Insufficient lawful independent bootstrap composition requires waiting without reducing floors, thresholds or separation. | Deliberate safeguard, not proof that every implementation wait is correct. Spec §§7 and 9. [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md). |
| F05 | A complete empaneled stage freezes mode, roster, denominator and threshold. Trial entry uses fresh source snapshots. | Stage boundaries matter: freeze does not justify mislabelling a lawful new pre-stage source as changed old data. Spec §§6, 10 and 11. [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md). |
| F06 | Investigative involvement or serious conflict discovered only after participation begins does not automatically remove a participant or alone justify reversal. | Recorded adopted bootstrap conflict rule. Other independently applicable law is preserved. [S05](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md) and spec §9 in [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md). |
| F07 | Genuine missing, stale, unauthorized, contradictory, ambiguous or non-idempotent sources require attributable discrepancy review, limited to affected authority. | Deliberate safety rule. Source changes alone do not authorize bypassing a pending independent-review hold. [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md) §5.6 and [S05](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md). |
| F08 | Every exclusion and replacement needs a stable reason and source event. | Express frozen interface requirement, not a new policy question. [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md) §5 requirement 3. |
| F09 | Ordinary technical and procedural mechanics are delegated within jurisdiction and protected invariants. | Recorded self-rule decision; owner escalation is reserved for material higher-order or expressly reserved choices. [S06](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-30.md); CON-004 in [S01](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md). |
| F10 | Formally admitted protected operations retain their admitted scope through later revocation/expiry. Required audit outages pause effects and preserve work for nonduplicating resumption. | CON-045/046 in [S01](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md); original September 23 answers were inspected locally. This does not waive version conditions or turn every preliminary command into formal admission. |
| F11 | Protected institutional archives and their writers, keys, backups and payload indexes must remain separated. | Accepted security design, not a suggested convenience arrangement. [S07](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/docs/SECURITY_DOMAIN_CONTRACT.md) §1 and [S08](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-17.md). |
| F12 | Public publication, secret failures, disclosures, investigatory sources, artifacts and scientific-library records have different ownership and access. | Recorded publication/security boundaries. [S09](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-18.md) and [S07](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/docs/SECURITY_DOMAIN_CONTRACT.md). A search index cannot become another authoritative writer. |
| F13 | SQLite is already specified for the bounded test-domain writer and proposed for the standalone publication design. | Existing bounded scope/design precedent, not a universal owner engine choice. [S11](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-132.md) and [S10](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md) R5. |
| F14 | A later working publication design describes a standalone synthetic slice followed by separate integration. | The public contract [S10](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md) explicitly limits the initial implementation to standalone synthetic tests. Its proposed engineering detail is distinct from its recorded design choices; this audit does not independently certify the original owner discussion. |
| F15 | The public bootstrap candidate is a bounded component; this source audit gives no new implementation verdict. | [S14](https://github.com/ptown16801-lang/concord/pull/70) and [S16](https://github.com/ptown16801-lang/concord/pull/70#pullrequestreview-5849674407). This decision audit does not satisfy an independent implementation check. |
| F16 | Global indexing, routing and source anchors belong to the existing search issue; institutional replay belongs to a different existing issue. | [S13](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-23.md) and [S21](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-24.md); the bounded pilot's implementation limits are in [S12](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md). The owner's engineering decision register is also distinct from simulated governmental records. |
| F17 | SQLite allows one simultaneous writer per file; FTS5 supports full-text search. | Official capability facts. [S17](https://www.sqlite.org/whentouse.html) and [S18](https://www.sqlite.org/fts5.html). Workload fit remains an inference to validate. |
| F18 | WAL supports concurrent readers/writer on one host, but attached databases are not an atomic set in WAL mode. | Official capability/limit. [S19](https://www.sqlite.org/wal.html). Do not weaken domain boundaries to manufacture one transaction. |
| F19 | PostgreSQL provides MVCC and transaction-isolation facilities for concurrent sessions. | Official capability. [S20](https://www.postgresql.org/docs/current/mvcc-intro.html). No Concord benchmark in this audit establishes that migration is needed. |
| F20 | A substantive government-records database proposal already exists. | [S22](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md) proposes a per-domain event/command/input/outbox kernel and cross-domain derivatives. Its SQL and domain groupings are unaccepted design alternatives; its twelve historical code comparisons lack complete revision pins and are not freshly verified defects. |

## Reported concerns: what follows from the sources

### Mature quorum and failed assignment

Ordinary quorum and the governing threshold already control mature House/Senate behavior. The six-person bootstrap rule is not an additional mature-Senate requirement. This is settled by F02.

The builder reports that a failed assignment in mature mode can make the implementation wait for its whole roster target. Whether that exact path correctly consumes ordinary governing rules was not independently retested here. It needs a code/ordinary-rule comparison; it should not be presented as a request to choose mature quorum rules again. (Inference from F02, F09 and the reported limitation.)

### Division balancing and unrecorded divisions

Mandatory matching is obsolete. A draw can lawfully omit a division. F03 is controlling.

No explicit recorded selection of the exact null-division scoring treatment was found in the inspected original decision comments. The frozen algorithm refers to each recorded division's proportion. Engineering should explain and test its treatment against that wording and the absence of a quota or individual division-eligibility test; only an actual material conflict should become an owner question. (Inference from F03 and F09.)

### Provisional trial capacity

At actual trial selection, known investigators and accusation participants are excluded; that rule is settled.

The narrower issue is when those trial-specific exclusions enter the provisional trial-capacity calculation at accusation entry. Comparing spec §4's wording about universal exclusions with §7's disjoint-capacity purpose and the candidate planner exposes two readings (inference). No explicit original answer to that precise counting step was found in the inspected decision sources. A scenario comparison mentioned in working research was not independently reproduced here. [S15](https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/bootstrap-impeachment.js) [S04](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md).

This remains an interpretation gap within a frozen approved design, not a reason to reopen sizing, thresholds, separation or stratified selection wholesale.

### Snapshot versioning and exclusion provenance

F05, F07 and F08 establish the intended contract behind the first review's P1/P2 findings. A real contradiction under the same version should still be rejected. A lawful change must have attributable new source identity/version rather than masquerading as changed old content.

Switching database engines would not itself repair wrong version labels or absent source-event links. (Inference.) The builder's revised-code fix claims require separate implementation-review evidence. [S16](https://github.com/ptown16801-lang/concord/pull/70#pullrequestreview-5849674407) is the first submitted review, not approval of the revised code. No new passing verdict is given here.

### Downstream consequences and incomplete integration

Removal, appeals, restrictions, protected evidence and publication retain their separate authoritative owners. The parent obligations remain; a domain library is not proof of complete constitutional execution. Conversely, a bounded import or first synthetic slice is not automatically defective because it does not implement every downstream subsystem. Scope must be judged against its actual task and acceptance criteria. (Inference from F12–F15.)

## Database proposals

These are Codex recommendations, not owner decisions.

The existing [government-records proposal](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md) already covers a domain map, reusable event/idempotency/admission/outbox patterns, versioned inputs and controlled derivatives. Reuse it as a design starting point rather than commission a competing common-record architecture. Before adopting any part, reconcile its declared canonical-JSON mismatch, consumed-input uniqueness/replay scope, and deadline/outcome semantics with the current admission contract and CON-045/046. Its historical comparison C4 also flags the need to protect the real exclusion reason/source event while offering a separately authorized public procedural view. This is a proposal to reconcile and verify existing work, not acceptance of its SQL, physical groupings, or current-defect claims. (Inference from F08, F10–F12 and F20.)

### A. Continue the dedicated relational-store approach

For the bounded same-host components, start from the existing dedicated SQLite designs in JON-132 and JON-18 rather than introduce a migration without workload evidence. (Inference; F11–F13, F17.)

The existing records proposal sketches much of the useful structure: source records and versions, immutable events, case/stage snapshot references, per-reason source links, operation/request identities, outcomes, and audit/outbox evidence. Keep effective time distinct from recording time where the domain contract needs that distinction. Enforce the relevant uniqueness, expected-version and transaction requirements within the owning authority's transaction.

Do not join House, Senate and Judiciary protected originals into a convenience database or a payload-bearing global search index. Do not let a database index or stored summary adopt policy, grant authority, erase a discrepancy hold or relax formal admission rules. (F07, F10–F12.)

### B. Evaluate SQLite FTS5 for rebuildable search

The most concrete additional database evaluation fits JON-23's existing scope: a rebuildable full-text search projection with stable source/version/passage anchors and explicit supersession metadata. Rankings should locate evidence; the source and its recorded status establish authority. (Inference; F16–F17.)

Public search and protected-domain search require separate permitted inputs and boundaries. A derived index must be recoverable from preserved source records and must not leak hidden material through snippets, counts or errors. Source databases and their owners remain authoritative. (F11–F12.)

An index for the owner's engineering decision records could use the same evidence-location pattern, but it is a separate consumer from Concord's simulated governmental runtime. DECISIONS.md and original approvals remain the governing sources.

### C. Persist replay under its existing owner

JON-24's synthetic pilot currently does not establish persistent replay acceptance. A future relational event/replay store could retain ordered events, input/rule versions, run identity and explicitly separate hypothetical forks. This belongs to its existing scope and must not enact institutional authority merely by replaying a visualization. (Inference from F16; [S12](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md).)

### D. Consider a client/server engine only against demonstrated needs

PostgreSQL is a conditional alternative if measured write contention, required remote access or a changed deployment topology makes SQLite unsuitable. (Inference from F17 and F19.) There is no benchmark, migration plan or selected production engine in this audit.

Neither engine eliminates the separate-writer, audit-availability, source-version, recovery or security-isolation requirements. WAL mode is not a blanket cross-database atomicity solution. (F10–F12, F18.)

### Evaluation criteria before any adoption

- Show stable source/version/passage references and unambiguous supersession without interpreting last edit time as acceptance.
- Rebuild the same derived index from the same preserved sources and declared index version.
- Demonstrate denied/protected records do not leak through global results, snippets, counts or error differences.
- Test representative concurrent reads and governed writes, contention, restart and recovery; record the actual workload and results.
- Preserve idempotent operation/outcome handling and required audit pause/resume behavior.
- Keep hypothetical replay separate from authoritative institutional state.
- Identify the installed SQLite/FTS5 build and relevant journaling/atomicity conditions before choosing configuration.

These are proposed acceptance checks, not executed test results.

## Scope filter

Excluded similarly named database work from other projects. It does not select Concord's storage.

Excluded superseded mandatory division matching and the old research predicate requiring six in a mature Senate as current rules. Retained them only to explain the replacements.

Excluded research drafts, agent advisory conclusions and issue status labels as evidence of owner adoption. Limited database recommendations to the actual governance, publication, replay and search ownership contracts.

## Object filter

Preserved the distinctions between bootstrap and mature institutions, pre-entry and empaneled stages, formally admitted and preliminary operations, domain storage and global search, and a bounded component versus full constitutional integration.

Existing SQLite use is bounded precedent, not a project-wide mandate. The exact current PR fixes and the complete production failure model were not independently verified by this source audit.

A missing original is an evidence limit, not permission to replace a deliberate rule or a claim that the owner never answered.

## Conclusions

1. Preserve the restrictive behaviors expressly supported by F01–F12. Several apparent failures are intentional legal/security safeguards.
2. Routine implementation details should be justified against those safeguards under F09; do not turn every unspecified field name or recovery detail into another owner interview.
3. The precise provisional trial-count interpretation remains unresolved in the inspected evidence; null-division scoring and mature-mode assignment behavior need narrower contract analysis, not wholesale reapproval.
4. Continue evaluating dedicated relational/SQLite storage within existing ownership boundaries before proposing a new engine. This is a recommendation supported by F11–F13 and F17–F19, not an adoption.
5. The best concrete additional search proposal belongs to JON-23; persistent institutional replay remains with JON-24. Reconcile the existing government-records proposal rather than treat its architecture as missing. These do not replace the owner's canonical decision register. (F16, F20.)
6. The report is Draft. The original PR review, the revised implementation recheck, independent review of this audit, and owner acceptance are distinct events. (F01, F15.)

## Next steps and risks

- A different-model reviewer should check this report's material claims against the listed original sources before its status is changed to Checked. This document's author checks do not satisfy that independent review.
- Verify the revised implementation through its separate independent review. This report is contextual research, not a substitute passing review.
- Resolve the precise provisional-capacity interpretation with exact approved passages; retain uncertainty if those passages do not settle it.
- Any resulting database or schema implementation needs its own bounded assignment and appropriate checks; this report grants no execution authority.
- Original constitutional/master-prompt evidence is incomplete in the inspected recovery inventory. Some historical scope/acceptance claims may require additional originals; no exhaustive all-interview claim is made.
- No new database benchmark, configuration experiment, production integration test or independent code recheck was performed in this audit.

## Public source index

The repository evidence snapshots below were inspected as dated supporting records, not new instructions. Where a file declares a public redaction, its own provenance notice controls. The public candidate and review links establish artifact content or a submitted review; they do not prove owner acceptance. Current private task records are not reproduced as public coordination logs.

- **S01:** [Published decision register — exact Develo baseline](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md).
- **S02:** [Bootstrap consolidation and recorded selection-source index — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-66.md).
- **S03:** [Freeze approval — public redacted comment snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-83-COMMENTS.md).
- **S04:** [Frozen bootstrap specification — public redacted export](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md).
- **S05:** [Constitutional and impeachment safeguards — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md).
- **S06:** [Institutional self-rule — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-30.md).
- **S07:** [Protected-domain security contract — exact original public revision](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/docs/SECURITY_DOMAIN_CONTRACT.md).
- **S08:** [Security ownership — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-17.md).
- **S09:** [Publication/records ownership — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-18.md).
- **S10:** [Standalone publication design R20261010.2 — public contract and explicit implementation limits](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md).
- **S11:** [Dedicated writer/SQLite scope — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-132.md).
- **S12:** [Bounded propagation pilot — exact public implementation summary](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md).
- **S13:** [Search/indexing contract — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-23.md).
- **S14:** [Bootstrap integration candidate — public PR description and revision navigation](https://github.com/ptown16801-lang/concord/pull/70).
- **S15:** [Revised composition planner — exact public candidate](https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/bootstrap-impeachment.js).
- **S16:** [First submitted implementation review — original candidate only](https://github.com/ptown16801-lang/concord/pull/70#pullrequestreview-5849674407).
- **S17:** [SQLite official workload guidance](https://www.sqlite.org/whentouse.html).
- **S18:** [SQLite official FTS5 documentation](https://www.sqlite.org/fts5.html).
- **S19:** [SQLite official WAL documentation](https://www.sqlite.org/wal.html).
- **S20:** [PostgreSQL official concurrency documentation](https://www.postgresql.org/docs/current/mvcc-intro.html).
- **S21:** [Institutional propagation/replay scope — public redacted snapshot](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-24.md).
- **S22:** [Government-records database design — existing unaccepted proposal and historical-evidence limits](https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md).

## Publication and verification limits

This document is the proposed public repository edition of the source audit. It remains Draft and has not had an independent different-model review. The private working copy is historical supporting material, not a second governing register. Once a repository revision is published, external trackers should link to that exact revision rather than copy the report.

No runtime source, governing instruction, decision entry, code-review verdict, merge or deployment changes are made by this document. Source/link/privacy checks on the document are distinct from testing Concord's runtime or accepting its implementation.
