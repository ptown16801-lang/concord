# Reconciliation and supersession — 2026-09-24

## Result and authority

Root DECISIONS.md is the integration-ready consolidated candidate. It does not
introduce substantive policy or pretend that missing originals were inspected.
The repository/path/integration identity is `ptown16801-lang/concord:Develo:/DECISIONS.md`.
Candidate branch `docs/decisions-consolidation-20260924` starts at remote Develo
`29ca0b44cf8d911df6978e84c7a91e7777afd304`, after the accepted marketplace design merge.
This base is an integration destination, not a claim that Develo had all decisions.

At initial recovery the primary Ubuntu checkout was on local Develo at
`b332c2309e123bd05099d4f9fcfd3bd202bdb0fa`, with its original untracked research/review
material preserved. Those three ahead-of-Develo commits are already on published
governance branches. The separate JON-141 candidate at `6cf4eab` holds product
integration work and its own writer/review obligations; it was neither merged nor
edited. Documentation branch `881ce1e` already corrected the project hierarchy but
was not on Develo. Its correction is reused without adopting its older workflow
status as current. This candidate will need a semantic/package/CI reconciliation if
another branch reaches Develo first.

The later [difference audit](RECONCILIATION_AUDIT_2026-09-24.md) records local Develo
advancing to 4a44f4f through two documentation commits, while origin/Develo remains
29ca0b4. Its proposal/consultation evidence is incorporated without merging or
overwriting that work. Initial local-state.json remains a dated discovery snapshot.

## Known discrepancies

| Finding | Controlling evidence | Disposition |
| --- | --- | --- |
| September 20 CURRENT_DECISIONS.md is newer by save date but stale in content | Actual JON-30 and JON-31–38 adopted text; attached audit | CON-031–038 capture settled choices. Historical summary is not a governing source. Original bytes unavailable here. |
| Two handoff ZIPs reproduce that summary | AUDIT-REPORT and exact libfile/member identities in AUDIT-DIRECTORY | Preserve as historical packages. No silent rewrite or claim of freshly reverified byte equality. New summary is generated from master bytes. |
| JON-31–38 still described as open | JON-30 resolution September 16 and each child | No transfer; interpretive admission gate; duplicates consume credit; sealed refusal; start-time authority (later narrowed by CON-045); phase cadence; traditional-style grand jury; express authority grant. No repeat owner questions. |
| Vote umbrella / Concord-as-surface hierarchy | Owner correction, LIN-IDENTITY and current task | CON-001 supersedes CON-090. Old PROJECT_RECORD preserved byte-for-byte, current path routes to master. Drive’s stale hierarchy is recorded, not edited. |
| Scheduler requirements outside general register | LIN-SCHEDULER, updated September 22 | CON-024–025 preserve hybrid adaptation, explanations, deterministic fallback, unranked goals and shadow/canary path. No candidate selected. |
| Coin refusal clarification newer than earlier audit/spec | Exact local question/owner choice; JON-96/97; current 7073e9a | ECON-02 controls; CON-092 preserves rejected forced reuse. Refusal does not destroy/return; optional signed return; free choice; no immutable marks/public disclosure invention. |
| Coin work advanced after attachment discovery | LIN-REGISTER revision 3 and exact issue acceptance comments | Full JON-97 specification, bounded JON-98/106 research, JON-99 threat, JON-100 hidden-layer and JON-101 interface design acceptance recorded separately from runtime. Earlier mistaken acceptance-repudiation and invented JON-102 gate preserved as corrected history. |
| JON-163 draft and framework conflated | JON-163 discussion, preserved drafts and later draft.3/advisory sources | CON-070 = agreed framework; CON-071 = v1-draft.3 proposal at the later audit. Actual advisory response is recorded, not mistaken for independent approval. OD-1–4, qualifying review, retention readiness and exact-revision human adoption remain pending. |
| Feature-branch publication mistaken for default integration | Fresh PR metadata and Git refs | PR29 merged to PR25’s feature branch at 2f12adb, not Develo. PR17 merged to Develo at 29ca0b4. Design acceptance is separately cited; branch publication alone is insufficient. |
| No verified master-maintenance process | Instruction/CI/template inspection plus GH-PR41-3D8D8A0 | CON-074 and WORKFLOW are published in PR41 with passing exact-revision CI. Canonical integration, branch protection and ongoing adherence remain separate/unverified. |
| Older JON-35 cancellation exception survives later owner correction | Local September 23 owner questions/answers and LIN-AGT | CON-045 supersedes CON-035 within admitted-operation cancellation/expiry scope; CON-046 requires collector-available pause/resume. Other admission validity constraints remain. |
| Old blanket holds/statuses beneath newer updates | Current issue-specific scope, project update and owner instructions | Preserve legitimate holds; do not resurrect blanket no-coding or old orchestration. Completed bootstrap approval and bounded library acceptance remain accepted. No work launched by this task. |
| Producer CI might hide a newer local failing review | LOCAL-REVIEW / LOCAL-DELIVERY, 22edf73 | JON-135 local REVISE is indexed, including row-identifier replacement failure and collector reconstruction limitation. Product fixes/acceptance remain with existing workstream. |

## Stable ID mapping

CON numbers were introduced for this consolidation without reallocating historical
identifiers. Existing ECON-01–03 retain their names. JON numbers are issue IDs, not
replaced decision IDs. Multiple sources repeating the same acceptance are one event.

| Historical/source identifier | Mapping / handling |
| --- | --- |
| DEC-004 (player-state ownership) | Retained original identity; no new use. Full original wording/scope unavailable; do not treat persistence collision as its definition. |
| Earlier proposed DEC-004 for authoritative game persistence/exports | Recorded collision maps that proposal to DEC-007, per historical PROJECT_RECORD. |
| DEC-007 | Authoritative game persistence/exports; retained as source identity. Original text/acceptance and present Concord scope still require recovery. |
| DEC-008 | Separate protected government datastores; relevant consolidated boundary in CON-040–041. Do not overwrite original identifier/text. |
| ECON-01 / ECON-02 / ECON-03 | Same IDs in root master; later revision-3 acceptance state reconciled without erasing earlier findings. |
| JON-31–38 | CON-031–038 preserve actual adopted text; CON-035 replaced by later CON-045, not silently discarded. |
| Coin INV-01–INV-31 and J96-* | Preserve in exact GIT-COIN source namespace. CON-050–051 and ECON entries summarize current operative boundaries; they do not renumber subsystem invariants. |
| Capital C1–C5 | Offense-class identifiers, preserved within CON-020–021 and exact LIN-JON-62 source. They are not generic master decision IDs. |
| Bootstrap revision 1.0 and source comment UUIDs | Preserve exact frozen document/approval at LIN-BOOTSTRAP and LIN-JON-83-COMMENTS; CON-017 supplies current navigation and operative sizes/thresholds. |
| JON-163 OD-1–OD-4 | Preserve draft owner-question IDs; they are proposed dispositions, not adopted master policy. |
| CONCORD-WF-001 | Preserve local proposal identity; current detailed-role status and source navigation are in CON-071. No proposal adoption inferred. |
| CONCORD-WF-002 | Preserve original ID as an Accepted master entry; exact owner consultation instruction recovered locally. |
| ZKDISCLOSURE / unavailable DEC variants | Reserve identities in attached directory; no guessed mapping/renumbering. |

## Local recovery not previously represented by the remote audit

1. **Primary owner provenance recovered:** the September 23 admission cancellation,
   expiry and collector-outage conversation, and September 24 exact free-choice coin
   selection. Their policy substance had already been summarized remotely; these
   newly recovered local question/answer excerpts strengthen attribution. They are
   not newly adopted policy. LOCAL-AGT and LOCAL-COIN provide exact session/line/date.
2. **Unpublished independent review:** `/tmp/concord-jon135-review`, commit
   `22edf73daeeb4097f4b0e2b359512150fbb3a819`, and untracked copies under the primary
   checkout’s `docs/reviews/jon-135/`. The report copies are byte-identical
   (SHA-256 `4360d8f7a1d1483d41d69e6d547aef424d417666fc2eba693acb415b29821460`),
   and count as one review, not independent corroborations. REVISE includes a trusted-SQL rowid/_rowid_/oid
   replacement bypass at candidate `1731602`, even though 109 tests and repaired-host
   isolation checks passed. This is important negative evidence, not a policy change.
3. **Local coin integration plan:** `/tmp/concord-coin-decisions-20260924`, branch
   `docs/jon-102-coin-integration`, commit `e24ce9f` (full SHA in local-state.json),
   contains COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md. It is indexed/snapshotted as a local
   draft at initial recovery. The subsequent existing workstream published PR40 and
   obtained explicit exact-revision design acceptance at 21:33 UTC; CON-052 and the
   additive LIN-JON-102-ACCEPTANCE / LIN-REGISTER-R4 sources now record that transition.
   No runtime authorization follows, and the earlier snapshot bytes remain unchanged.
4. **Untracked governance research brief:** exact local file/digest preserved in
   LOCAL-RESEARCH. The remote a5a6cda version adds a publication-time correction absent from this
   older local copy; local presence is not automatically greater freshness. The exact
   substantive research is preserved without promoting recommendations into architecture.
5. **Preservation-only historical unpushed implementation:** a session receipt names
   `2b61bd3308162d61b4010b94e08254029734fd0b` and temporary archival patches. Those
   paths are no longer available in the inspected filesystem; the published additive
   `7ba5bc5` and its correction history remain available. Missing temp paths do not
   mean the substantive work was lost, and the overlapping old patch must not be
   blindly reapplied. See scoped artifact index and JON-141 comments.

At initial recovery no newly discovered, previously unuploaded substantive owner
policy was established beyond the remotely summarized choices above. The later
difference audit additionally recovered the direct owner consultation instruction
CONCORD-WF-002 and its local-only commit, plus the CONCORD-WF-001 proposal package.
These are distinguished from primary acceptance provenance and implementation/review
evidence; an unpublished test or draft does not itself become an accepted decision.

## Remaining evidence and owner questions

- Original saved-file families and ZIPs: exact libfile identities/member names exist,
  but this session could not read original bytes. This bounds recovery completeness,
  exact historical DEC mappings and exact constitutional text. It does not invalidate
  independently recorded later owner decisions or reopen JON-31–38.
- **CON-007:** “40 genuine ordinary identities” appears under a heading of accepted
  rules in JON-58 but the sentence says “proposes.” Recover v2.2 and its adoption
  record before relying on 40 as accepted; ask only if that evidence does not settle it.
- **CON-082:** JON-62 specifies C3 elements proven by “a preponderance of admissible
  evidence”; JON-61’s later interview says impeachment trial uses “clear and convincing
  evidence.” Frozen bootstrap revision 1.0 repeats the latter. The smallest unresolved
  owner question is whether C3 retains its specific exception or also uses the later
  higher standard. No operative burden was changed here.
- **CON-071 / OD-1–4:** exact draft role-rule choices and adoption remain pending;
  the agreed framework is not reopened. This task neither solicits nor manufactures
  qualifying independent review.
- **CON-081:** scheduler ranking remains intentionally unset. Only a demonstrated
  tradeoff should prompt a later owner choice; absence of arbitrary weights is not a
  reason to stall this documentation task.
- Full external Workbench/archive bytes, deleted/unreachable objects, unsaved editor
  buffers, every historical ChatGPT conversation and all Drive descendants were not
  exhaustively recovered. Historical tests/host repairs are attributed to their
  original revisions; no unrelated product verification was rerun.

## Cross-thread follow-up — September 24, 2026

The initial candidate c53302e was pushed and opened as PR41; its Node 22/24 GitHub
checks passed. CON-052 now consumes JON-102's existing exact-revision acceptance
rather than repeating the design, publication or review. The three additive source
snapshots preserve earlier evidence and make the changed status traceable.

JON-163 v1-draft.3 and its existing advisory findings/owner dispositions remain with JON-163.
JON-141's runtime aggregate remains PR37 at 6cf4eab; its implementation, host repair
and verification are not repeated here. The original checkout and other workstreams
are untouched. Missing originals and CON-007/CON-082 remain bounded evidence gaps,
not authorization to restart interviews or a comprehensive source crawl.

The remaining review is for PR41's consolidation itself. Its author cannot provide
qualifying independent acceptance. See the prepared [review packet](REVIEW.md).

## Validation boundary (current)

The source-backed master and maintenance tooling have an author review and focused
local tests. The role framework forbids calling that independent acceptance. Review
must still assess semantic completeness, consequential source interpretation and the
explicit gaps before integration. Automated checks cannot prove those facts or make
divergence impossible. All historical originals and existing working trees remain
preserved; source snapshots are evidence, not additional governing records.
