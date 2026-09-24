# Evidence snapshot: HISTORICAL — Concord Linear-native migration audit and verification

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/historical-concord-linear-native-migration-audit-and-verification-c616873bc30b
- Version: 2026-09-21T02:41:23.763Z
- Source date: 2026-09-21T02:41:23.763Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Proposal or historical reference; only explicitly marked owner decisions are accepted
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

# Deep audit disposition — September 18, 2026

This document is a historical migration record only. It is not a current workflow, directive, required audit, supervisor prompt, or constraint on normal Linear behavior. Historical findings and metadata changes below may be useful as evidence, but they impose no present operating policy.

## Objective

Convert Concord from custom coordination semantics to Linear's native project-management model without resuming paused execution or rewriting historical evidence.

## Historical v5.0 migration changes

* Team operating policy replaced with **Linear-native operating model v5.0**.
* Concord project description updated to use native concepts.
* Standing supervisor/dispatcher/review-drain runtime authority retired.
* Legacy workflow-state labels `Agent Running`, `Queued`, and `Implementation Blocked` marked do-not-use for new work.
* Native `Area` label group created with topical work areas.
* Existing topical milestones marked legacy/no-new-issues.
* Four lifecycle milestones created:
  * A · Architecture and contracts accepted
  * B · Implementation baseline complete
  * C · Integrated candidate validated
  * D · Release and research baseline frozen
* Existing Concord issues are being migrated from topical milestone semantics to Area labels.

## Migration rules

1. **Preserve history.** Do not delete old issue comments, PR links, accepted decisions, or retired orchestration records.
2. **One semantic per native field.**
   * status = lifecycle state
   * milestone = project lifecycle stage
   * Area label = topic/workstream
   * relation = dependency/related/duplicate
   * assignee = accountable owner; delegate = agent working on that owner's behalf
3. **Do not infer execution.** The project remains paused and Backlog; configuration work cannot move product issues to In Progress.
4. **Do not invent blockers.** Add `blocked by` only after verifying a true prerequisite from the canonical task contract.
5. **No mass stage reassignment from titles alone.** Read enough of each unfinished issue to distinguish design/contract work from implementation/integration/release work.
6. **Completed historical issues may remain without a new milestone** unless moving them improves current lifecycle reporting without distorting history.

## Next migration passes

### Pass 1 — unfinished issue stage audit

For every unfinished Concord issue:

* verify its canonical deliverable;
* assign exactly one Area label;
* classify lifecycle stage A/B/C/D;
* verify parent/sub-issue structure;
* verify status against evidence;
* remove any legacy workflow-state label;
* record true blockers as native relations only.

### Pass 2 — parent/sub-issue audit

Check whether children have independently acceptable outputs and preserve their existing acceptance duties. Do not collapse or reparent historical review trees merely for tidiness. Completed reports remain evidence; outstanding producer corrections remain with the producer. No new coordinator hierarchy is needed.

### Pass 3 — dependency audit

Replace prose-only prerequisites with native relations when supported by the actual contract. Remove false serialization where siblings can proceed independently.

### Pass 4 — recurring workflow audit

Identify repeated processes that survive normal issue/status/dependency behavior.

* prove the bounded workflow;
* use deterministic native conditions/actions for mechanical updates where supported;
* use a Skill optionally for reusable reasoning, not as a compulsory stage;
* configure a native Loop only for a specific supported event/recurring need, and verify publication and a controlled run receipt.
  Retiring instructions alone does not disable a native Loop or install a replacement.

### Pass 5 — templates and Guidance

When the standard issue/project shape is stable:

* create a native issue template for deliverable + acceptance + sources + owner + prerequisites + edit boundary;
* create a native project template for future projects if the lifecycle model proves reusable;
* move stable team conventions into Linear Guidance where available.
  Do not duplicate those conventions in every issue.

## Definition of migration complete

Concord is considered structurally migrated when:

* every unfinished issue has one clear deliverable, one Area, and a correct lifecycle stage;
* parent/sub-issue boundaries are independently acceptable and non-overlapping;
* true dependencies are represented with relations rather than prose/custom labels;
* workflow-state labels are absent from active work;
* no active runtime depends on a standing supervisor/dispatcher/review coordinator;
* project updates, not custom status issues, are the normal reporting path;
* the actual delivery/review/correction/dependency handoff has a verified trigger or responsible bounded actor, with published configuration and test evidence where automated;
* resumption reconstructs each issue's real artifact/review disposition rather than rerunning every held item;
* native Loop enablement, Guidance, parent/child auto-close, and GitHub status automation have been checked where they can affect acceptance.

These operational completion conditions are not yet all verified.

## Deep findings and actions

| Finding | Evidence and effect | Disposition |
| -- | -- | -- |
| Earlier audit coverage was overstated | List results truncated issue descriptions. Full reads exposed v3.0 references in <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>/<issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> and a stale Todo assertion in <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> beyond the previous checks. | Corrected those working references/assertions. Do not infer full-body cleanliness from snippet searches. |
| v5.0 dropped effective controls from v4.x | The full replacement omitted explicit authorization/hold precedence, duplicate-launch recovery, bounded review retries, context minimization, independent-review safeguards and sensitive-data boundaries. | Restored these in the same canonical document as v5.1, while preserving the simpler native-first model. |
| Instructions were confused with installed automation | Retired <issue id="ae3a7c27-f57a-48d5-af80-abc58b3514f7" href="https://linear.app/jons-garage/issue/JON-93/concord-supervisor-loop-project-health-and-safe-auto-repair">JON-93</issue>/<issue id="db22245f-f0f5-4b53-99e2-6ba309a23767" href="https://linear.app/jons-garage/issue/JON-108/concord-review-coordinator-drain-in-review-to-disposition">JON-108</issue> and a rewritten runtime source do not establish native Loop enablement, publication, or event handoffs. | Corrected claims in the shared policy and Concord description. Native settings/history remain unverified through the exposed connector. |
| Completed reviews still had unfinished-work blockers | <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue>, <issue id="0a46402e-0ce1-4649-8ab7-c800464a9d56" href="https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review">JON-104</issue>, and <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue> were Done but blocked by the still-open producer <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>. <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue> has a recorded FAIL report; <issue id="0a46402e-0ce1-4649-8ab7-c800464a9d56" href="https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review">JON-104</issue> has its actual matrix in comment f996b7ad-452a-4b79-bb18-c84fed457379; <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue> links its report document. | Converted exactly those three blocked-by edges to related lineage. Readback confirmed empty blocker lists on the reports, unchanged Done states, and <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> still blocking pending <issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue> through <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue>. No producer acceptance was granted. |
| Design permission was being mistaken for total deliverable scope | <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> and <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue> have current design coordination but retained implementation/verification criteria, and <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue> has B-stage implementation children. | Added bounded completion clarifications and marked stale workflow checkpoints historical. Preserved all product criteria and children; no mass stage reassignment. Placement in A cannot erase later duties or create a project-wide waterfall gate. |
| Legacy milestone descriptions lost scope | Earlier replacements shortened the original descriptions, including The Form integration boundaries and the deferred-research restoration mapping. Percentages rose when unfinished issues were removed. | Restored the eight original scope descriptions with explicit legacy notices. Percentages reflect current remaining membership, not preserved historical progress or subsystem completion. The earlier percentages cannot be repaired merely by renaming a bucket. |
| Cross-project propagation was inconsistent | The Form, Neural Engine, and Independent Case Study retained copied v4.1 blocks; Jefferson had no shared-method pointer. | Replaced copied blocks with current canonical references and added Jefferson's reference. Readback preserved each project's identity, hold/priority, scope and research/privacy boundaries. No Concord milestone scheme was imported into other projects. |
| Reported health was unsupported | Project update 5a622c25-7028-4cd0-9ef4-a0552f904e42 returned onTrack after the health argument was omitted, despite unverified runtime behavior. | Replaced its blanket all-clear with scoped findings and explicit atRisk health for incomplete operational verification; readback confirmed the correction. The intentional pause is not itself a failure. Configuration cleanup is not product progress or release readiness. |
| Historical preservation claims were too broad | There is no complete immutable pre-migration snapshot proving equality of every field, relation and document. Native issue mentions can themselves create related links. | The visible mutation calls and selected readbacks support narrower preservation claims, not an all-fields guarantee. This pass explicitly changed three obsolete blocking relations and targeted text only; it issued no product status, assignee, delegate, priority or parent reassignment. |

## Preserved responsibility boundaries

Concord's actual scheduler/checker, institutional review, Archivist, authoritative stores and hidden instrumentation are product functions, not the retired project-management supervisor. Their duties remain in their canonical contracts.

<issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> retains marketplace/barter/settlement and the already-required Goodwill reconciliation. <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> retains the separate non-intervention coin experiment; marketplace anti-double-spend/central-accounting rules were not imported into it. <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> still consumes its five genuine design inputs and preserves the hidden-research boundary. Completed independent review is not approval of the reviewed product.

The Form owns its discussion surface; Concord owns its integration/analytics. The Governance Commons mapping remains explicitly an assumption. Independent Case Study findings remain non-binding and cannot silently become Concord requirements. Jefferson retains urgent status, its single-user Android scope and the zero-false-automatic-merge gate before real-record migration. Synthetic fixtures cannot replace private-source fidelity testing.

## Coverage and limits

The current Concord inventory returned 67 issues with no next page: 33 Backlog, 32 Done and 2 Canceled. The 33 unfinished issues retain their existing A/B placement and Area classifications. The separate held/reference partitions were not reopened or exhaustively scanned.

This pass examined the shared policy, five project descriptions, migration plan, milestone descriptions, recorded workflow proposal, and selected high-risk contracts/relations including <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>, <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue>, <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue>, <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> through <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue>, <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> and <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue> through <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue>. Large tool responses were sometimes truncated; only visible relevant sections support findings. This is not a fresh full-text review of every one of the 33 unfinished contracts, all historical comments, or repository code. Existing PR/test claims were preserved as recorded evidence, not independently rerun here.

No enabled Concord task was found on the separate ChatGPT automation surface; that observation does not certify native Linear Loops. Native Linear Loop reads/writes/history were not exposed by the discovered Loop query; the team read did not expose workflow automation settings. The historical proposal records Loop ID 00a8b03e-796f-4fa6-9eab-d3999ae3e8d6, but it is not proof that this remains the only/current Loop. No native Loop was created, published, enabled, disabled, or manually executed by this audit.

The legacy external resource link labeled “Vote — umbrella project” remains a documented UI cleanup item. Its destination is retired; Vote remains folder metadata, not another project.

## Remaining operational verification — bounded, not another polling loop

1. Inspect the actual native Loop inventory, enablement, published prompts, event/schedule conditions, permissions and recent run receipts. Establish whether retired monitoring can still execute and whether any replacement handoff is actually installed. Do not create a second coordinator to inspect the first.
2. Inspect native Guidance and issue/project templates; an ordinary policy document is not proof those settings inherit it. Inspect parent/child auto-close and GitHub transition rules so they cannot silently accept unverified work.
3. Verify one existing-scope handoff in a controlled setting: producer delivery records a reviewable artifact; a bounded independent reviewer produces a disposition; FAIL returns correction to the same producer; PASS releases only satisfied prerequisites. Paused-project events must not dispatch, repeated events must not duplicate a session, and unchanged state must not invoke needless AI work.
4. Finish semantic reconciliation only where a specific contract still mixes current authorization, historical delivery state and end-to-end acceptance. Preserve original duties and outputs rather than moving everything to a new phase or spawning replacements.

For these checks, the producer owns its delivery/evidence closeout, the independent reviewer owns its verdict, and a verified native rule or specifically authorized bounded actor owns a handoff. “Linear holds state” alone assigns none of those execution actions. These are unverified acceptance requirements, not a claim that a live automated chain is running.

## Primary documentation checked

* [Linear Loops](<https://linear.app/docs/loops>): settings, publication, conditions/actions and run history.
* [Issue relations](<https://linear.app/docs/issue-relations>): blocker versus related semantics and automatically linked mentions.
* [Parent and sub-issues](<https://linear.app/docs/parent-and-sub-issues>): inheritance and configurable completion behavior.
* [Project milestones](<https://linear.app/docs/project-milestones>): current issue-based percentages and parallel stages.
* [Assigning issues](<https://linear.app/docs/assigning-issues>): accountability versus agent delegation.
* [Linear Agent](<https://linear.app/docs/linear-agent>): Guidance and reusable Skills.

These public sources establish feature behavior, not this workspace's installed configuration.
