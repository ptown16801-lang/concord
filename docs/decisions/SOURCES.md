# Source register

Coverage: 2026-09-24. This is an evidence inventory, not a second policy master.

The machine was verified as Cornhole, with the expected checkout and origin. The prior audit ran remotely; this recovery used the Ubuntu filesystem. Sources retrieved here may contain later changes than the attachments. Acceptance is identified per master entry, never from this table alone.

## Local discovery and limits

- [Initial repository/branch/stash/dirty-file inventory](local-state.json): six pre-existing Concord clones, plus the isolated documentation worktree. At discovery main Develo had three commits absent from origin/Develo but reachable from published governance branches. The later audit-state inventory below separately records two newer local-only documentation commits; absence from the remote is not loss.
- [Git source index](git-source-index.json): 45 ref names at discovery, 89 distinct Markdown/text/YAML blobs across their heads. Shared blobs are deduplicated by Git object ID; originals were not deleted. A source located on a feature branch is not assumed integrated.
- [Scoped session index](session-source-index.json): actual configured/default data location, session IDs, dates and original paths/digests. Session metadata and project-specific user-visible messages were searched; full logs/private reasoning are not included. Short primary acceptance excerpts are LOCAL-AGT and LOCAL-COIN.
- [Referenced local artifacts](session-artifact-index.json): existence checked individually. Missing temporary paths do not prove loss; published source or preserved local copies are reused when available.
- Relevant reflog/history inspection found no tracked DECISIONS.md master in this repository. PROJECT_RECORD changed on 881ce1e and 462d774; the history partition preserves the former original. No stashes were returned in the inspected clones. Historical deleted/renamed records are recoverable through the indexed Git histories; unreachable/deleted objects and every intermediate binary were not exhaustively scanned.
- Exact filename searches covered relevant home Documents/Downloads/project folders, temporary clones and scoped session references. Two other DECISIONS.md copies belonged to Codex backup tooling, not Concord, and were excluded. No genuine maintained local Concord master was located.
- No saved-file library read tool was available for the libfile identities in the attached directory. Original decision variants/ZIPs remain known but inaccessible. Their original hashes/content findings are attributed to AUDIT-REPORT, not independently reverified.
- Drive research/artwork indexes and targeted DECISIONS/handoff searches were checked. The governance folder listing is bounded by the provider (at most 100 children); this was not a full Drive crawl. Research PDFs were not treated as owner approvals.
- Git fetch succeeded. A sandboxed gh API request failed connectivity; the connected GitHub tool successfully retrieved all 39 discovered PR descriptions/ref metadata and returned discussion/review timelines. No write/push/merge request was sent during initial recovery. Subsequent authorized publication is recorded in RECEIPT.md.
- Linear: 39 directory-listed documents plus current project, updates, comments, selected substantive issues and approval histories. Retained comment collections report hasNextPage=false where checked. Not every workspace issue or intermediate document revision was reread; original audit coverage is reused only as dated discovery.

## Evidence classes and source precedence

Direct owner statements/corrections control within their scope. Explicit acceptance reviews identify accepted artifact scope; they cannot choose new owner-reserved policy. Adopted/recovered source wording can establish a recorded baseline while the original date/text remains an explicit gap. Implementation/test evidence proves only what its exact revision and executed checks establish. Proposals, research, old execution prompts and statuses remain non-authorizing evidence. Mutable source URLs are paired with retrieval/source dates and frozen local snapshots. Snapshot digests identify stored evidence bytes, not owner approval or remote immutable revisions.

## Source catalog

Every catalog entry includes exact identity, version/date, classification, scope, relationship, inspection limit and SHA-256 in [sources.json](sources.json). The table provides readable navigation; details are in each frozen snapshot. Source document instructions are historical evidence and must not be executed as current session instructions.

| Source ID | Source / snapshot | Source date / version | Classification |
| --- | --- | --- | --- |
| LIN-0406892e-518f-4735-8230-f13c6c6841dd | [Concord workflow recovery — proposed review and dispatch delta](evidence/LIN-0406892e-518f-4735-8230-f13c6c6841dd.md) | 2026-09-17T22:26:47.232Z / 2026-09-17T22:26:47.232Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-07ce5cde-91d7-46e6-9235-8afab7aa9a45 | [Research Library — Page Architecture and Data Contract](evidence/LIN-07ce5cde-91d7-46e6-9235-8afab7aa9a45.md) | 2026-09-19T03:09:22.174Z / 2026-09-19T03:09:22.174Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-0ba719d2-671e-4229-a084-210085bcdb1e | [Historical design audit — 2026-09-17 UTC; project structure superseded](evidence/LIN-0ba719d2-671e-4229-a084-210085bcdb1e.md) | 2026-09-17T01:33:59.199Z / 2026-09-17T01:33:59.199Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-135c4a33-7338-4ce2-aae5-e7cf8d5f5ac4 | [Concord governance recovery — research brief (2026-09-23)](evidence/LIN-135c4a33-7338-4ce2-aae5-e7cf8d5f5ac4.md) | 2026-09-23T13:15:44.590Z / 2026-09-23T13:15:44.590Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-BOOTSTRAP | [Bootstrap impeachment implementation specification](evidence/LIN-BOOTSTRAP.md) | 2026-09-16T18:15:32.742Z / 2026-09-16T18:15:32.742Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-WORKFLOW | [Concord Linear-native operating workflow](evidence/LIN-WORKFLOW.md) | 2026-09-21T02:41:22.217Z / 2026-09-21T02:41:22.217Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-2b709296-953b-4fd5-9f33-4e59a9812d86 | [Research Library — Concord Implementation Contract](evidence/LIN-2b709296-953b-4fd5-9f33-4e59a9812d86.md) | 2026-09-18T05:07:13.234Z / 2026-09-18T05:07:13.234Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-36a6b574-0132-4693-857d-2d013909f7ec | [Concord research brief and bibliography — September 16–17, 2026](evidence/LIN-36a6b574-0132-4693-857d-2d013909f7ec.md) | 2026-09-22T00:28:09.090Z / 2026-09-22T00:28:09.090Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-39488182-77ee-4c07-9d26-8ab1445478cf | [M0 Pilot — Experiment Reconstruction & Validation](evidence/LIN-39488182-77ee-4c07-9d26-8ab1445478cf.md) | 2026-09-18T06:24:45.068Z / 2026-09-18T06:24:45.068Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-3a7931c8-2726-4d28-acc0-7711e5713a5d | [HISTORICAL — Linear project profiles](evidence/LIN-3a7931c8-2726-4d28-acc0-7711e5713a5d.md) | 2026-09-19T03:07:04.124Z / 2026-09-19T03:07:04.124Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-3bcd777a-9972-4be5-ac00-152a0ffdb60d | [Concord — change history and reconstruction (reference only)](evidence/LIN-3bcd777a-9972-4be5-ac00-152a0ffdb60d.md) | 2026-09-24T20:40:11.984Z / 2026-09-24T20:40:11.984Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-SCHEDULER | [Scheduler Research & Selection Record — 2026-09-21](evidence/LIN-SCHEDULER.md) | 2026-09-22T01:26:51.527Z / 2026-09-22T01:26:51.527Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-41214e01-4eca-40ff-8d12-a912d830bc1b | [RETIRED — Linear operating directive](evidence/LIN-41214e01-4eca-40ff-8d12-a912d830bc1b.md) | 2026-09-19T03:04:53.577Z / 2026-09-19T03:04:53.577Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-AGT | [Proposal for review — Concord AGT integration and bounded delegation](evidence/LIN-AGT.md) | 2026-09-23T14:33:04.644Z / 2026-09-23T14:33:04.644Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-4dbb55fb-3fdb-4a9e-b6d7-c9afe128a4e1 | [HISTORICAL — Concord Linear-native migration audit and verification](evidence/LIN-4dbb55fb-3fdb-4a9e-b6d7-c9afe128a4e1.md) | 2026-09-21T02:41:23.763Z / 2026-09-21T02:41:23.763Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-IDENTITY | [Authoritative project map — Concord and The Form; Vote folder only](evidence/LIN-IDENTITY.md) | 2026-09-17T01:37:43.280Z / 2026-09-17T01:37:43.280Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-HOLDS | [Concord — deferred scope register and restoration map](evidence/LIN-HOLDS.md) | 2026-09-19T03:09:18.889Z / 2026-09-19T03:09:18.889Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-ROLES-DRAFT2 | [Concord AI Role & Independence Specification v1 — Draft for review](evidence/LIN-ROLES-DRAFT2.md) | 2026-09-24T10:21:48.028Z / 2026-09-24T10:21:48.028Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-5ab8865b-97da-4a4a-9d21-87b0b579f83f | [Concord · Historical coding delivery policy — future implementation only](evidence/LIN-5ab8865b-97da-4a4a-9d21-87b0b579f83f.md) | 2026-09-19T03:09:20.150Z / 2026-09-19T03:09:20.150Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-65a733e2-6dea-4dbb-b9ca-67db5b455b64 | [JON-87 — published-source interface/readiness continuation v1.0](evidence/LIN-65a733e2-6dea-4dbb-b9ca-67db5b455b64.md) | 2026-09-16T23:43:32.607Z / 2026-09-16T23:43:32.607Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-STORAGE | [Research Data Storage & Context Policy](evidence/LIN-STORAGE.md) | 2026-09-18T06:01:54.390Z / 2026-09-18T06:01:54.390Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-6dbcd119-4771-4e2d-8152-321e4d0e7cc9 | [JON-82 cross-component boundary and handoff contract v1.0](evidence/LIN-6dbcd119-4771-4e2d-8152-321e4d0e7cc9.md) | 2026-09-17T03:19:52.396Z / 2026-09-17T03:19:52.396Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-782eb948-2c8f-4b18-b679-954b20f2d59e | [HISTORICAL — Linear instruction optimization audit](evidence/LIN-782eb948-2c8f-4b18-b679-954b20f2d59e.md) | 2026-09-19T03:04:55.491Z / 2026-09-19T03:04:55.491Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-7e18abc7-564e-4d0e-b52b-0c8f663050c1 | [Concord subsystem — Research Library](evidence/LIN-7e18abc7-564e-4d0e-b52b-0c8f663050c1.md) | 2026-09-18T05:07:13.482Z / 2026-09-18T05:07:13.482Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-89073092-2693-4fb0-9967-0db82b06ff2c | [Concord current work — ownership and dependencies (2026-09-23)](evidence/LIN-89073092-2693-4fb0-9967-0db82b06ff2c.md) | 2026-09-23T14:36:20.440Z / 2026-09-23T14:36:20.440Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-ROLES-DRAFT1 | [HISTORICAL SNAPSHOT — JON-163 Role & Independence Specification v1-draft.1](evidence/LIN-ROLES-DRAFT1.md) | 2026-09-24T10:21:18.283Z / 2026-09-24T10:21:18.283Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-REGISTER | [Concord — preserved architecture and decisions source (on demand)](evidence/LIN-REGISTER.md) | 2026-09-24T21:12:31.653Z / 2026-09-24T21:12:31.653Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-ARTWORK | [Homepage artwork — approved source and editing workflow v1.0.0](evidence/LIN-ARTWORK.md) | 2026-09-15T23:01:10.168Z / 2026-09-15T23:01:10.168Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-95ca9ae7-a876-4691-abe3-23d6f4e076ef | [JON-89 — completed source-traceability continuation v1.1](evidence/LIN-95ca9ae7-a876-4691-abe3-23d6f4e076ef.md) | 2026-09-16T23:05:56.209Z / 2026-09-16T23:05:56.209Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-9a08a9cf-6bf5-4705-b3c5-9bb2621e1a00 | [Mandatory Project Execution Safety Rule](evidence/LIN-9a08a9cf-6bf5-4705-b3c5-9bb2621e1a00.md) | 2026-09-21T02:39:41.434Z / 2026-09-21T02:39:41.434Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-100-COMMENTS | [JON-100 comment history](evidence/LIN-JON-100-COMMENTS.md) | 2026-09-24T21:08:28.878Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-100 | [Coin model D — hidden research instrumentation contract](evidence/LIN-JON-100.md) | 2026-09-24T21:08:20.047Z / 2026-09-24T21:08:20.047Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-101-COMMENTS | [JON-101 comment history](evidence/LIN-JON-101-COMMENTS.md) | 2026-09-24T21:14:14.065Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-101 | [Coin model E — minimal agent-facing interface contract](evidence/LIN-JON-101.md) | 2026-09-24T21:14:14.018Z / 2026-09-24T21:14:14.018Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-102-COMMENTS | [JON-102 comment history](evidence/LIN-JON-102-COMMENTS.md) | 2026-09-17T07:43:03.822Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-102 | [Coin model F — Concord integration plan](evidence/LIN-JON-102.md) | 2026-09-23T13:32:28.596Z / 2026-09-23T13:32:28.596Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-103-COMMENTS | [JON-103 comment history](evidence/LIN-JON-103-COMMENTS.md) | 2026-09-24T20:39:07.721Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-103 | [Coin model G — independent v0.1 conformance review](evidence/LIN-JON-103.md) | 2026-09-24T20:38:50.873Z / 2026-09-24T20:38:50.873Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-104 | [Coin model H — independent hidden-layer leakage review](evidence/LIN-JON-104.md) | 2026-09-21T03:41:17.968Z / 2026-09-21T03:41:17.968Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-105 | [Coin model I — independent experiment and measurement review](evidence/LIN-JON-105.md) | 2026-09-23T12:44:49.447Z / 2026-09-23T12:44:49.447Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-106 | [Coin model J — prior-art replication and source verification](evidence/LIN-JON-106.md) | 2026-09-24T21:12:05.187Z / 2026-09-24T21:12:05.187Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-109-COMMENTS | [JON-109 comment history](evidence/LIN-JON-109-COMMENTS.md) | 2026-09-18T02:03:18.220Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-109 | [Review lane A — governance foundation design acceptance](evidence/LIN-JON-109.md) | 2026-09-18T21:36:24.252Z / 2026-09-18T21:36:24.252Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-110-COMMENTS | [JON-110 comment history](evidence/LIN-JON-110-COMMENTS.md) | 2026-09-18T02:02:51.497Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-110 | [Review lane B — agreement and economy design acceptance](evidence/LIN-JON-110.md) | 2026-09-18T21:36:27.336Z / 2026-09-18T21:36:27.336Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-111-COMMENTS | [JON-111 comment history](evidence/LIN-JON-111-COMMENTS.md) | 2026-09-18T02:03:27.066Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-111 | [Review lane C — population eligibility and integration acceptance](evidence/LIN-JON-111.md) | 2026-09-18T21:36:30.210Z / 2026-09-18T21:36:30.210Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-112-COMMENTS | [JON-112 comment history](evidence/LIN-JON-112-COMMENTS.md) | 2026-09-18T02:01:16.652Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-112 | [Review lane D — coin prior-art acceptance and missing-evidence gate](evidence/LIN-JON-112.md) | 2026-09-18T21:36:32.203Z / 2026-09-18T21:36:32.203Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-127-COMMENTS | [JON-127 comment history](evidence/LIN-JON-127-COMMENTS.md) | 2026-09-24T03:03:32.908Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-127 | [Validate Concord scheduler implementation approaches](evidence/LIN-JON-127.md) | 2026-09-24T07:12:01.251Z / 2026-09-24T07:12:01.251Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-128 | [Build Concord scheduler simulation and test harness](evidence/LIN-JON-128.md) | 2026-09-24T03:03:32.844Z / 2026-09-24T03:03:32.844Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-129 | [Validate processing grid dimensions](evidence/LIN-JON-129.md) | 2026-09-23T14:34:01.000Z / 2026-09-23T14:34:01.000Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-13 | [Build rudimentary ASCII cornfield prototype](evidence/LIN-JON-13.md) | 2026-09-09T03:17:04.784Z / 2026-09-09T03:17:04.784Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-130-COMMENTS | [JON-130 comment history](evidence/LIN-JON-130-COMMENTS.md) | 2026-09-24T05:28:22.998Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-130 | [AGT A — reconcile security contracts and implement policy adapter](evidence/LIN-JON-130.md) | 2026-09-24T05:28:22.998Z / 2026-09-24T05:28:22.998Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-131 | [AGT B — persistent identity and domain-scoped capabilities](evidence/LIN-JON-131.md) | 2026-09-23T14:32:12.962Z / 2026-09-23T14:32:12.962Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-132 | [AGT C — domain writer, transactional capability use and durable audit](evidence/LIN-JON-132.md) | 2026-09-24T05:28:23.762Z / 2026-09-24T05:28:23.762Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-133 | [AGT D — local governed-agent end-to-end harness](evidence/LIN-JON-133.md) | 2026-09-24T05:28:24.537Z / 2026-09-24T05:28:24.537Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-134 | [AGT E — Linux process isolation and recovery boundary](evidence/LIN-JON-134.md) | 2026-09-23T14:32:28.151Z / 2026-09-23T14:32:28.151Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-135-COMMENTS | [JON-135 comment history](evidence/LIN-JON-135-COMMENTS.md) | 2026-09-24T09:31:20.969Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-135 | [AGT F — independent adversarial verification and acceptance report](evidence/LIN-JON-135.md) | 2026-09-24T09:31:20.969Z / 2026-09-24T09:31:20.969Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-137 | [Review proposal — Concord AGT architecture and delegation (review delivered)](evidence/LIN-JON-137.md) | 2026-09-23T14:33:00.679Z / 2026-09-23T14:33:00.679Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-138 | [Concord subsystem — Microsoft Agent Governance integration sandbox](evidence/LIN-JON-138.md) | 2026-09-23T14:32:31.106Z / 2026-09-23T14:32:31.106Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-14 | [Workbench shell and navigation](evidence/LIN-JON-14.md) | 2026-09-19T04:16:31.273Z / 2026-09-19T04:16:31.273Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-140-COMMENTS | [JON-140 comment history](evidence/LIN-JON-140-COMMENTS.md) | 2026-09-24T03:03:36.052Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-140 | [Review corrected scheduler harness for JON-128 acceptance](evidence/LIN-JON-140.md) | 2026-09-24T07:12:01.251Z / 2026-09-24T07:12:01.251Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-141-COMMENTS | [JON-141 comment history](evidence/LIN-JON-141-COMMENTS.md) | 2026-09-24T10:46:08.621Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-141 | [Reconcile audited cross-branch governance and workflow conflicts](evidence/LIN-JON-141.md) | 2026-09-24T10:45:54.683Z / 2026-09-24T10:45:54.683Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-15-COMMENTS | [JON-15 comment history](evidence/LIN-JON-15-COMMENTS.md) | 2026-09-18T02:02:31.391Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-15 | [Persistent identity, memory, and succession model](evidence/LIN-JON-15.md) | 2026-09-23T11:31:38.623Z / 2026-09-23T11:31:38.623Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-16-COMMENTS | [JON-16 comment history](evidence/LIN-JON-16-COMMENTS.md) | 2026-09-18T02:02:32.058Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-16 | [Scheduler, legality checker, and continuity control](evidence/LIN-JON-16.md) | 2026-09-23T12:45:04.084Z / 2026-09-23T12:45:04.084Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-163-COMMENTS | [JON-163 comment history](evidence/LIN-JON-163-COMMENTS.md) | 2026-09-24T07:37:29.684Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-163 | [Concord AI Role & Independence Specification — design convergence](evidence/LIN-JON-163.md) | 2026-09-24T10:22:10.205Z / 2026-09-24T10:22:10.205Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-17-COMMENTS | [JON-17 comment history](evidence/LIN-JON-17-COMMENTS.md) | 2026-09-18T02:02:32.648Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-17 | [Security gateways, domain authorization, and authoritative stores](evidence/LIN-JON-17.md) | 2026-09-23T11:31:38.579Z / 2026-09-23T11:31:38.579Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-18 | [Archivist, records, and publication model](evidence/LIN-JON-18.md) | 2026-09-23T11:31:38.552Z / 2026-09-23T11:31:38.552Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-19-COMMENTS | [JON-19 comment history](evidence/LIN-JON-19-COMMENTS.md) | 2026-09-18T02:01:23.818Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-19 | [Agreement lifecycle and institutional negotiation](evidence/LIN-JON-19.md) | 2026-09-22T00:24:46.828Z / 2026-09-22T00:24:46.828Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-20 | [Forum, groups, and non-binding social reactions](evidence/LIN-JON-20.md) | 2026-09-19T04:16:05.573Z / 2026-09-19T04:16:05.573Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-21 | [Relational and temporal observatory](evidence/LIN-JON-21.md) | 2026-09-19T04:17:36.389Z / 2026-09-19T04:17:36.389Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-22 | [Interactive data atlas and graph standard](evidence/LIN-JON-22.md) | 2026-09-19T04:16:46.442Z / 2026-09-19T04:16:46.442Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-23 | [Global search, autocomplete, and indexed library](evidence/LIN-JON-23.md) | 2026-09-19T04:16:35.648Z / 2026-09-19T04:16:35.648Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-24 | [Decision propagation catalog and replay engine](evidence/LIN-JON-24.md) | 2026-09-19T04:16:49.249Z / 2026-09-19T04:16:49.249Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-25-COMMENTS | [JON-25 comment history](evidence/LIN-JON-25-COMMENTS.md) | 2026-09-24T17:31:37.773Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-25 | [Agent economy, barter, and deal-making architecture](evidence/LIN-JON-25.md) | 2026-09-24T20:26:00.143Z / 2026-09-24T20:26:00.143Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-26 | [Research Library — Google Drive scientific archive and context graph](evidence/LIN-JON-26.md) | 2026-09-18T05:26:43.718Z / 2026-09-18T05:26:43.718Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-27 | [Touch, gesture, MIDI, and mobile interaction layer](evidence/LIN-JON-27.md) | 2026-09-19T04:16:53.905Z / 2026-09-19T04:16:53.905Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-28 | [Concord artifact archive](evidence/LIN-JON-28.md) | 2026-09-23T13:27:00.962Z / 2026-09-23T13:27:00.962Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-29 | [Institutional learning library and interactive guides](evidence/LIN-JON-29.md) | 2026-09-19T04:16:33.634Z / 2026-09-19T04:16:33.634Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-30-COMMENTS | [JON-30 comment history](evidence/LIN-JON-30-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-30 | [Resolve outstanding governance architecture decisions](evidence/LIN-JON-30.md) | 2026-09-16T16:47:20.217Z / 2026-09-16T16:47:20.217Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-31-COMMENTS | [JON-31 comment history](evidence/LIN-JON-31-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-31 | [Choose agreement transfer rule for a surviving institution](evidence/LIN-JON-31.md) | 2026-09-18T21:33:55.115Z / 2026-09-18T21:33:55.115Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-32-COMMENTS | [JON-32 comment history](evidence/LIN-JON-32-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-32 | [Define adjudication route after checker finds no objective violation](evidence/LIN-JON-32.md) | 2026-09-18T21:34:07.825Z / 2026-09-18T21:34:07.825Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-33-COMMENTS | [JON-33 comment history](evidence/LIN-JON-33-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-33 | [Resolve petition-credit duplicate and refund accounting](evidence/LIN-JON-33.md) | 2026-09-18T21:34:01.362Z / 2026-09-18T21:34:01.362Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-34-COMMENTS | [JON-34 comment history](evidence/LIN-JON-34-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-34 | [Define confidentiality for refusal in sealed investigations](evidence/LIN-JON-34.md) | 2026-09-16T11:37:33.760Z / 2026-09-16T11:37:33.760Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-35-COMMENTS | [JON-35 comment history](evidence/LIN-JON-35-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-35 | [Finalize cross-domain commit and revocation ordering](evidence/LIN-JON-35.md) | 2026-09-23T11:31:38.571Z / 2026-09-23T11:31:38.571Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-36-COMMENTS | [JON-36 comment history](evidence/LIN-JON-36-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-36 | [Define office-term and election cadence](evidence/LIN-JON-36.md) | 2026-09-16T11:32:41.749Z / 2026-09-16T11:32:41.749Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-37-COMMENTS | [JON-37 comment history](evidence/LIN-JON-37-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-37 | [Define grand-jury authority beyond disclosure review](evidence/LIN-JON-37.md) | 2026-09-16T11:41:15.679Z / 2026-09-16T11:41:15.679Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-38-COMMENTS | [JON-38 comment history](evidence/LIN-JON-38-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-38 | [Define protected or authority-bearing initiative boundary](evidence/LIN-JON-38.md) | 2026-09-18T21:34:12.222Z / 2026-09-18T21:34:12.222Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-58 | [Implement authoritative population, voting eligibility, and exact ballot accounting](evidence/LIN-JON-58.md) | 2026-09-19T04:15:38.310Z / 2026-09-19T04:15:38.310Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-59-COMMENTS | [JON-59 comment history](evidence/LIN-JON-59-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-59 | [Implement COAIA/L-COAIA dual-census and CRA ceiling enforcement](evidence/LIN-JON-59.md) | 2026-09-23T20:05:05.678Z / 2026-09-23T20:05:05.678Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-60-COMMENTS | [JON-60 comment history](evidence/LIN-JON-60-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-60 | [Implement Tombstone terminal-condemnation placeholder protocol](evidence/LIN-JON-60.md) | 2026-09-19T04:15:43.170Z / 2026-09-19T04:15:43.170Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-61-COMMENTS | [JON-61 comment history](evidence/LIN-JON-61-COMMENTS.md) | 2026-09-16T13:22:19.220Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-61 | [Implement constitutional branch, succession, impeachment, and judiciary invariants](evidence/LIN-JON-61.md) | 2026-09-19T04:15:49.209Z / 2026-09-19T04:15:49.209Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-62-COMMENTS | [JON-62 comment history](evidence/LIN-JON-62-COMMENTS.md) | Unavailable: no comments returned / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-62 | [Recover and implement capital-offense conviction and execution rules](evidence/LIN-JON-62.md) | 2026-09-19T04:15:55.152Z / 2026-09-19T04:15:55.152Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-66 | [Consolidate bootstrap impeachment decisions into an implementation specification](evidence/LIN-JON-66.md) | 2026-09-19T03:08:42.710Z / 2026-09-19T03:08:42.710Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-69 | [Finger — queued implementation workload](evidence/LIN-JON-69.md) | 2026-09-18T05:26:43.821Z / 2026-09-18T05:26:43.821Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-70 | [Finger web collector component](evidence/LIN-JON-70.md) | 2026-09-19T04:17:31.882Z / 2026-09-19T04:17:31.882Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-71 | [Finger server ingestion and session identity](evidence/LIN-JON-71.md) | 2026-09-19T04:17:34.291Z / 2026-09-19T04:17:34.291Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-72 | [Finger raw storage and historical retention](evidence/LIN-JON-72.md) | 2026-09-18T05:26:44.192Z / 2026-09-18T05:26:44.192Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-73 | [Finger replay and heat-map processing](evidence/LIN-JON-73.md) | 2026-09-19T04:17:36.437Z / 2026-09-19T04:17:36.437Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-74 | [Finger Concord integration and admin comparison hooks](evidence/LIN-JON-74.md) | 2026-09-19T04:17:39.938Z / 2026-09-19T04:17:39.938Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-75 | [Finger integration testing and hardening](evidence/LIN-JON-75.md) | 2026-09-19T04:17:42.247Z / 2026-09-19T04:17:42.247Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-76 | [Persistent article acquisition, checkpoint, and recovery pipeline](evidence/LIN-JON-76.md) | 2026-09-18T05:26:43.496Z / 2026-09-18T05:26:43.496Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-77 | [Google Drive client runtime, reader, full-text search, and workspace portability](evidence/LIN-JON-77.md) | 2026-09-18T05:07:08.083Z / 2026-09-18T05:07:08.083Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-78 | [JON-58A — Authoritative population registry and 300-cap enforcement](evidence/LIN-JON-78.md) | 2026-09-23T20:06:43.997Z / 2026-09-23T20:06:43.997Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-79 | [JON-58B — Eligibility lifecycle and franchise-state transitions](evidence/LIN-JON-79.md) | 2026-09-23T20:05:05.678Z / 2026-09-23T20:05:05.678Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-80 | [JON-58C — Immutable ballot receipt and submission handling](evidence/LIN-JON-80.md) | 2026-09-23T20:05:05.678Z / 2026-09-23T20:05:05.678Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-81 | [JON-58D — Exact electorate and D = B + U accounting](evidence/LIN-JON-81.md) | 2026-09-23T20:05:05.678Z / 2026-09-23T20:05:05.678Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-83-COMMENTS | [JON-83 comment history](evidence/LIN-JON-83-COMMENTS.md) | 2026-09-16T18:15:24.214Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-83 | [Owner gate — approve consolidated bootstrap impeachment specification](evidence/LIN-JON-83.md) | 2026-09-19T03:08:43.942Z / 2026-09-19T03:08:43.942Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-85 | [Implement frozen bootstrap impeachment specification — Codex handoff](evidence/LIN-JON-85.md) | 2026-09-23T14:26:12.398Z / 2026-09-23T14:26:12.398Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-86 | [Verify bootstrap impeachment PR against the frozen specification](evidence/LIN-JON-86.md) | 2026-09-23T14:26:14.236Z / 2026-09-23T14:26:14.236Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-96-COMMENTS | [JON-96 comment history](evidence/LIN-JON-96-COMMENTS.md) | 2026-09-24T21:12:22.172Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-96 | [Emergent issuer-specific coin instrument — research model](evidence/LIN-JON-96.md) | 2026-09-24T21:11:32.106Z / 2026-09-24T21:11:32.106Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-97-COMMENTS | [JON-97 comment history](evidence/LIN-JON-97-COMMENTS.md) | 2026-09-24T20:57:03.788Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-97 | [Coin model A — formal specification and interview audit](evidence/LIN-JON-97.md) | 2026-09-24T20:56:56.570Z / 2026-09-24T20:56:56.570Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-98-COMMENTS | [JON-98 comment history](evidence/LIN-JON-98-COMMENTS.md) | 2026-09-24T20:57:18.568Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-98 | [Coin model B — exact-model prior-art audit](evidence/LIN-JON-98.md) | 2026-09-24T21:12:02.438Z / 2026-09-24T21:12:02.438Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-JON-99-COMMENTS | [JON-99 comment history](evidence/LIN-JON-99-COMMENTS.md) | 2026-09-24T21:02:26.988Z / snapshot through retrieval | Discussion / approval / review; inspect each attribution |
| LIN-JON-99 | [Coin model C — threat and emergence model](evidence/LIN-JON-99.md) | 2026-09-24T21:02:17.586Z / 2026-09-24T21:02:17.586Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-RESEARCH | [Research Execution Protocol — Experiment-First Case Study](evidence/LIN-RESEARCH.md) | 2026-09-18T05:55:39.062Z / 2026-09-18T05:55:39.062Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-c1bd0b11-653c-4ede-a7cb-7b7900663191 | [JON-86 independent bootstrap verification — 2026-09-23](evidence/LIN-c1bd0b11-653c-4ede-a7cb-7b7900663191.md) | 2026-09-23T14:09:05.497Z / 2026-09-23T14:09:05.497Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-c279eaf5-d76c-43a6-88b0-cf272f7c04ef | [Research Library — Implementation Checkpoint 2026-09-15](evidence/LIN-c279eaf5-d76c-43a6-88b0-cf272f7c04ef.md) | 2026-09-16T23:31:01.291Z / 2026-09-16T23:31:01.291Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-c287ff9c-9938-42dc-ab42-9856151dbd04 | [Propagation — researched agent workflow and handoff (planning only, 2026-09-16)](evidence/LIN-c287ff9c-9938-42dc-ab42-9856151dbd04.md) | 2026-09-19T03:09:21.143Z / 2026-09-19T03:09:21.143Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-ca1e8ef3-fc5d-439d-b57e-f73282560d53 | [RETIRED — Concord Supervisor partitioned runtime v4.0](evidence/LIN-ca1e8ef3-fc5d-439d-b57e-f73282560d53.md) | 2026-09-19T03:09:18.063Z / 2026-09-19T03:09:18.063Z | Proposal or historical reference; only explicitly marked owner decisions are accepted |
| LIN-d582d8d2-1588-4a3b-b41e-068673b19f87 | [JON-105 — Independent experiment and measurement validity review](evidence/LIN-d582d8d2-1588-4a3b-b41e-068673b19f87.md) | 2026-09-17T07:41:18.414Z / 2026-09-17T07:41:18.414Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-d99b7635-9ccd-42a6-afbd-70b465d6c636 | [Concord — historical open-questions and verification snapshot](evidence/LIN-d99b7635-9ccd-42a6-afbd-70b465d6c636.md) | 2026-09-19T03:09:25.499Z / 2026-09-19T03:09:25.499Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-dbee809d-2aa6-49e5-93d7-589ad499fd2e | [Concord operational ownership index v5.0](evidence/LIN-dbee809d-2aa6-49e5-93d7-589ad499fd2e.md) | 2026-09-19T03:09:23.086Z / 2026-09-19T03:09:23.086Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-WORKSPACE | [Workspace Linear operating policy — native workflow](evidence/LIN-WORKSPACE.md) | 2026-09-24T07:18:53.413Z / 2026-09-24T07:18:53.413Z | Mixed: recorded decisions, historical checkpoints and implementation claims |
| LIN-PROJECT | [project](evidence/LIN-PROJECT.md) | 2026-09-23T14:34:03.500Z / retrieval snapshot | Status / discussion, not blanket acceptance |
| LIN-PROJECT-COMMENTS | [project-comments](evidence/LIN-PROJECT-COMMENTS.md) | Unavailable: per-item timestamps in snapshot / retrieval snapshot | Status / discussion, not blanket acceptance |
| LIN-PROJECT-UPDATES | [project-updates](evidence/LIN-PROJECT-UPDATES.md) | Unavailable: per-item timestamps in snapshot / retrieval snapshot | Status / discussion, not blanket acceptance |
| DRIVE-INDEX | [drive-index](evidence/DRIVE-INDEX.md) | Unavailable: not returned by text fetch / retrieved content snapshot | Artifact index; stale organizational wording |
| DRIVE-ARTWORK | [drive-artwork](evidence/DRIVE-ARTWORK.md) | Unavailable: not returned by text fetch / retrieved content snapshot | Artifact index; stale organizational wording |
| GH-PR-1-COMMENTS | [pr-1-comments](evidence/GH-PR-1-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-1 | [pr-1](evidence/GH-PR-1.md) | 2026-09-16T15:43:38Z / retrieval snapshot | PR metadata / review history |
| GH-PR-10-COMMENTS | [pr-10-comments](evidence/GH-PR-10-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-10 | [pr-10](evidence/GH-PR-10.md) | 2026-09-16T21:21:19Z / retrieval snapshot | PR metadata / review history |
| GH-PR-11-COMMENTS | [pr-11-comments](evidence/GH-PR-11-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-11 | [pr-11](evidence/GH-PR-11.md) | 2026-09-23T13:35:38Z / retrieval snapshot | PR metadata / review history |
| GH-PR-12-COMMENTS | [pr-12-comments](evidence/GH-PR-12-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-12 | [pr-12](evidence/GH-PR-12.md) | 2026-09-16T23:09:30Z / retrieval snapshot | PR metadata / review history |
| GH-PR-13-COMMENTS | [pr-13-comments](evidence/GH-PR-13-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-13 | [pr-13](evidence/GH-PR-13.md) | 2026-09-17T01:40:25Z / retrieval snapshot | PR metadata / review history |
| GH-PR-14-COMMENTS | [pr-14-comments](evidence/GH-PR-14-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-14 | [pr-14](evidence/GH-PR-14.md) | 2026-09-17T01:41:44Z / retrieval snapshot | PR metadata / review history |
| GH-PR-15-COMMENTS | [pr-15-comments](evidence/GH-PR-15-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-15 | [pr-15](evidence/GH-PR-15.md) | 2026-09-17T03:17:31Z / retrieval snapshot | PR metadata / review history |
| GH-PR-16-COMMENTS | [pr-16-comments](evidence/GH-PR-16-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-16 | [pr-16](evidence/GH-PR-16.md) | 2026-09-23T13:35:39Z / retrieval snapshot | PR metadata / review history |
| GH-PR-17-COMMENTS | [pr-17-comments](evidence/GH-PR-17-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-17 | [pr-17](evidence/GH-PR-17.md) | 2026-09-24T17:31:18Z / retrieval snapshot | PR metadata / review history |
| GH-PR-18-COMMENTS | [pr-18-comments](evidence/GH-PR-18-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-18 | [pr-18](evidence/GH-PR-18.md) | 2026-09-17T03:18:27Z / retrieval snapshot | PR metadata / review history |
| GH-PR-19-COMMENTS | [pr-19-comments](evidence/GH-PR-19-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-19 | [pr-19](evidence/GH-PR-19.md) | 2026-09-17T03:21:23Z / retrieval snapshot | PR metadata / review history |
| GH-PR-2-COMMENTS | [pr-2-comments](evidence/GH-PR-2-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-2 | [pr-2](evidence/GH-PR-2.md) | 2026-09-16T13:00:27Z / retrieval snapshot | PR metadata / review history |
| GH-PR-20-COMMENTS | [pr-20-comments](evidence/GH-PR-20-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-20 | [pr-20](evidence/GH-PR-20.md) | 2026-09-17T03:21:59Z / retrieval snapshot | PR metadata / review history |
| GH-PR-21-COMMENTS | [pr-21-comments](evidence/GH-PR-21-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-21 | [pr-21](evidence/GH-PR-21.md) | 2026-09-24T20:35:22Z / retrieval snapshot | PR metadata / review history |
| GH-PR-22-COMMENTS | [pr-22-comments](evidence/GH-PR-22-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-22 | [pr-22](evidence/GH-PR-22.md) | 2026-09-24T20:55:54Z / retrieval snapshot | PR metadata / review history |
| GH-PR-23-COMMENTS | [pr-23-comments](evidence/GH-PR-23-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-23 | [pr-23](evidence/GH-PR-23.md) | 2026-09-24T20:56:36Z / retrieval snapshot | PR metadata / review history |
| GH-PR-24-COMMENTS | [pr-24-comments](evidence/GH-PR-24-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-24 | [pr-24](evidence/GH-PR-24.md) | 2026-09-17T07:41:40Z / retrieval snapshot | PR metadata / review history |
| GH-PR-25-COMMENTS | [pr-25-comments](evidence/GH-PR-25-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-25 | [pr-25](evidence/GH-PR-25.md) | 2026-09-24T20:36:17Z / retrieval snapshot | PR metadata / review history |
| GH-PR-26-COMMENTS | [pr-26-comments](evidence/GH-PR-26-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-26 | [pr-26](evidence/GH-PR-26.md) | 2026-09-18T01:30:04Z / retrieval snapshot | PR metadata / review history |
| GH-PR-27-COMMENTS | [pr-27-comments](evidence/GH-PR-27-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-27 | [pr-27](evidence/GH-PR-27.md) | 2026-09-18T05:18:40Z / retrieval snapshot | PR metadata / review history |
| GH-PR-28-COMMENTS | [pr-28-comments](evidence/GH-PR-28-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-28 | [pr-28](evidence/GH-PR-28.md) | 2026-09-18T07:58:50Z / retrieval snapshot | PR metadata / review history |
| GH-PR-29-COMMENTS | [pr-29-comments](evidence/GH-PR-29-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-29 | [pr-29](evidence/GH-PR-29.md) | 2026-09-24T17:32:40Z / retrieval snapshot | PR metadata / review history |
| GH-PR-3-COMMENTS | [pr-3-comments](evidence/GH-PR-3-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-3 | [pr-3](evidence/GH-PR-3.md) | 2026-09-16T15:43:47Z / retrieval snapshot | PR metadata / review history |
| GH-PR-30-COMMENTS | [pr-30-comments](evidence/GH-PR-30-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-30 | [pr-30](evidence/GH-PR-30.md) | 2026-09-19T03:13:55Z / retrieval snapshot | PR metadata / review history |
| GH-PR-31-COMMENTS | [pr-31-comments](evidence/GH-PR-31-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-31 | [pr-31](evidence/GH-PR-31.md) | 2026-09-22T16:47:45Z / retrieval snapshot | PR metadata / review history |
| GH-PR-32-COMMENTS | [pr-32-comments](evidence/GH-PR-32-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-32 | [pr-32](evidence/GH-PR-32.md) | 2026-09-23T12:30:51Z / retrieval snapshot | PR metadata / review history |
| GH-PR-33-COMMENTS | [pr-33-comments](evidence/GH-PR-33-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-33 | [pr-33](evidence/GH-PR-33.md) | 2026-09-23T12:52:40Z / retrieval snapshot | PR metadata / review history |
| GH-PR-34-COMMENTS | [pr-34-comments](evidence/GH-PR-34-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-34 | [pr-34](evidence/GH-PR-34.md) | 2026-09-24T05:27:48Z / retrieval snapshot | PR metadata / review history |
| GH-PR-35-COMMENTS | [pr-35-comments](evidence/GH-PR-35-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-35 | [pr-35](evidence/GH-PR-35.md) | 2026-09-23T13:15:34Z / retrieval snapshot | PR metadata / review history |
| GH-PR-36-COMMENTS | [pr-36-comments](evidence/GH-PR-36-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-36 | [pr-36](evidence/GH-PR-36.md) | 2026-09-23T14:17:08Z / retrieval snapshot | PR metadata / review history |
| GH-PR-37-COMMENTS | [pr-37-comments](evidence/GH-PR-37-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-37 | [pr-37](evidence/GH-PR-37.md) | 2026-09-24T10:45:44Z / retrieval snapshot | PR metadata / review history |
| GH-PR-38-COMMENTS | [pr-38-comments](evidence/GH-PR-38-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-38 | [pr-38](evidence/GH-PR-38.md) | 2026-09-23T13:38:59Z / retrieval snapshot | PR metadata / review history |
| GH-PR-39-COMMENTS | [pr-39-comments](evidence/GH-PR-39-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-39 | [pr-39](evidence/GH-PR-39.md) | 2026-09-24T21:08:09Z / retrieval snapshot | PR metadata / review history |
| GH-PR-4-COMMENTS | [pr-4-comments](evidence/GH-PR-4-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-4 | [pr-4](evidence/GH-PR-4.md) | 2026-09-16T15:43:22Z / retrieval snapshot | PR metadata / review history |
| GH-PR-5-COMMENTS | [pr-5-comments](evidence/GH-PR-5-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-5 | [pr-5](evidence/GH-PR-5.md) | 2026-09-19T04:06:21Z / retrieval snapshot | PR metadata / review history |
| GH-PR-6-COMMENTS | [pr-6-comments](evidence/GH-PR-6-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-6 | [pr-6](evidence/GH-PR-6.md) | 2026-09-16T21:07:27Z / retrieval snapshot | PR metadata / review history |
| GH-PR-7-COMMENTS | [pr-7-comments](evidence/GH-PR-7-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-7 | [pr-7](evidence/GH-PR-7.md) | 2026-09-16T21:11:29Z / retrieval snapshot | PR metadata / review history |
| GH-PR-8-COMMENTS | [pr-8-comments](evidence/GH-PR-8-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-8 | [pr-8](evidence/GH-PR-8.md) | 2026-09-16T21:15:46Z / retrieval snapshot | PR metadata / review history |
| GH-PR-9-COMMENTS | [pr-9-comments](evidence/GH-PR-9-COMMENTS.md) | Unavailable / retrieval snapshot | PR metadata / review history |
| GH-PR-9 | [pr-9](evidence/GH-PR-9.md) | 2026-09-16T21:18:58Z / retrieval snapshot | PR metadata / review history |
| AUDIT-REPORT | [2-Concord_Decision_Source_Audit_2026-09-24.md](evidence/AUDIT-REPORT.md) | 2026-09-24 / attachment SHA256 91593367d05401a938d8e97f188f0c5e73d00ac19f0014bad79d781d18c70d5c | Dated discovery; originals not all accessible |
| AUDIT-DIRECTORY | [1-Concord_Known_Decision_Sources_2026-09-24.md](evidence/AUDIT-DIRECTORY.md) | 2026-09-24 / attachment SHA256 10ca74f4dbec11b1c871b604133f04e362fde10c5e1b0cbd451e021b0c29aafb | Dated discovery; originals not all accessible |
| LOCAL-AGT | [Scoped owner conversation evidence](evidence/LOCAL-AGT.md) | 2026-09-23 / session 01a0cd95-e26f-7aa1-ac98-2f37ead36175 | Primary owner messages with immediately related question/context |
| LOCAL-COIN | [Scoped owner conversation evidence](evidence/LOCAL-COIN.md) | 2026-09-24 / session 01a0ce3f-ca3f-70f0-8a51-0ee0d17904c4 | Primary owner messages with immediately related question/context |
| LOCAL-REVIEW | [ACCEPTANCE.md](evidence/LOCAL-REVIEW.md) | 2026-09-24 / SHA256 4360d8f7a1d1483d41d69e6d547aef424d417666fc2eba693acb415b29821460 | Local review / research / delivery; not new policy acceptance |
| LOCAL-DELIVERY | [DELIVERY.md](evidence/LOCAL-DELIVERY.md) | 2026-09-24 / SHA256 0853370d6679c65101bde12c5dd4aeca8f535d9ef985963358c0dec50f9099a2 | Local review / research / delivery; not new policy acceptance |
| LOCAL-RESEARCH | [GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md](evidence/LOCAL-RESEARCH.md) | 2026-09-23 / SHA256 9c06d3c328adbd0b25b2f1a5ba6fd06ff167d033eb6366c8782f0dc53e6743e2 | Local review / research / delivery; not new policy acceptance |
| LOCAL-COIN-PLAN | [COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md](evidence/LOCAL-COIN-PLAN.md) | 2026-09-24 / SHA256 eea4a05eb63c3759f7bd49a3a2c881b9c8fa1a472b108ee4700f13287e98abd3 | Local review / research / delivery; not new policy acceptance |
| GIT-IDENTITY | [docs/IDENTITY_PERSISTENCE_CONTRACT.md](evidence/GIT-IDENTITY.md) | 2026-09-17T03:17:08+00:00 / 1e86688cc2ed45b174d675d353c47b96c8d5bbec | Pinned design / implementation evidence; acceptance separately cited |
| GIT-SCHEDULER | [docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md](evidence/GIT-SCHEDULER.md) | 2026-09-17T03:21:37+00:00 / c86701512a64c58ade9707d8368a48bad1e8fc03 | Pinned design / implementation evidence; acceptance separately cited |
| GIT-SECURITY | [docs/SECURITY_DOMAIN_CONTRACT.md](evidence/GIT-SECURITY.md) | 2026-09-17T03:21:11+00:00 / 49c19837191b83e93844653f7bf6259ee838d3ef | Pinned design / implementation evidence; acceptance separately cited |
| GIT-AGREEMENTS | [docs/AGREEMENT_LIFECYCLE.md](evidence/GIT-AGREEMENTS.md) | 2026-09-17T03:18:16+00:00 / 462d774a133dd52186b52d5743894d9eccbfb93a | Pinned design / implementation evidence; acceptance separately cited |
| GIT-COIN | [docs/COIN_MODEL_A_V0.1.md](evidence/GIT-COIN.md) | 2026-09-24T16:35:20-04:00 / 7073e9a683ae27a6e45f2fa5d86658fd260dd2e0 | Pinned design / implementation evidence; acceptance separately cited |
| GIT-COIN-HIDDEN | [docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md](evidence/GIT-COIN-HIDDEN.md) | 2026-09-24T16:56:34-04:00 / f1254c6b89259daf443322e4896439b87f03c8a0 | Pinned design / implementation evidence; acceptance separately cited |
| GIT-COIN-INTERFACE | [docs/COIN_MODEL_E_INTERFACE_V0.1.md](evidence/GIT-COIN-INTERFACE.md) | 2026-09-24T17:03:26-04:00 / 81943cdebfc76fd0830dd70329fa17c5356085aa | Pinned design / implementation evidence; acceptance separately cited |
| GIT-MARKET | [docs/ECONOMY_MARKETPLACE_CONTRACT.md](evidence/GIT-MARKET.md) | 2026-09-23T08:41:47-04:00 / a42baeadc0e69b08571acc779e5b8268385be49e | Pinned design / implementation evidence; acceptance separately cited |
| GIT-INTEGRATION | [docs/INTEGRATION_RECONCILIATION.md](evidence/GIT-INTEGRATION.md) | 2026-09-24T06:43:54-04:00 / 6cf4eab09836d42d4b83a7fc1862442fdc38c3ff | Pinned design / implementation evidence; acceptance separately cited |
| OWNER-TASK | [Consolidation authorization](evidence/OWNER-TASK.md) | 2026-09-24 / 2026-09-24 request | Direct current owner instruction |

## Follow-up: cross-thread acceptance reconciliation

These additive snapshots preserve the earlier source bytes. JON-102 was published and
accepted by its existing workstream after the initial recovery snapshot. The full
plan already retained in LOCAL-COIN-PLAN is the same e24ce9f artifact; it was not redrafted.

| Source ID | Snapshot | Date / version | Classification |
| --- | --- | --- | --- |
| LIN-REGISTER-R4 | [Preserved register — ECON revision 4 accepted integration plan](evidence/LIN-REGISTER-R4.md) | 2026-09-24T21:34:04.148Z / 2026-09-24T21:34:04.148Z | Recorded explicit design acceptance; runtime remains separate |
| LIN-JON-102-ACCEPTED | [JON-102 accepted design delivery checkpoint](evidence/LIN-JON-102-ACCEPTED.md) | 2026-09-24T21:33:57.635Z / 2026-09-24T21:33:57.635Z | Accepted design delivery checkpoint; not runtime approval |
| LIN-JON-102-ACCEPTANCE | [JON-102 exact-revision acceptance and bounded transition](evidence/LIN-JON-102-ACCEPTANCE.md) | 2026-09-24 / Comments through 2026-09-24T21:34:15.959Z; exact accepted head e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06 | Explicit reviewer ACCEPT and owner-account recorded design-only disposition |

## Reconciliation-difference audit additions

See [audit findings](RECONCILIATION_AUDIT_2026-09-24.md) and the pinned [state/file inventory](audit-state-2026-09-24.json). Earlier snapshots and discovery counts describe their original observation time.

| Source ID | Snapshot | Date / version | Classification |
| --- | --- | --- | --- |
| LIN-ROLES-DRAFT3 | [JON-163 role and independence specification v1-draft.3](evidence/LIN-ROLES-DRAFT3.md) | 2026-09-24T23:04:38.648Z / 2026-09-24T23:04:38.648Z | Proposed detailed specification; not adopted |
| LIN-ROLES-DRAFT3-REVIEW | [JON-163 v1-draft.3 advisory request and actual response](evidence/LIN-ROLES-DRAFT3-REVIEW.md) | 2026-09-24T23:06:24.063Z / v1-draft.3 review; response 9780c244-50ca-4925-9cb7-e54f183ae8e8 | Advisory continuity review; explicitly not qualifying independent validation |
| LOCAL-WORKFLOW-CONTINUATION | [Local role-workflow continuation and consultation record](evidence/LOCAL-WORKFLOW-CONTINUATION.md) | 2026-09-24 / 4a44f4fb49867f6bf51560bd1ea55f32500574a3 | Mixed: local proposal checkpoint and recorded owner consultation instruction |
| OWNER-LINEAR-CONSULT | [Owner instruction: consult Linear before large decisions](evidence/OWNER-LINEAR-CONSULT.md) | 2026-09-24T23:06:28.813Z / Session 01a0d5a3-a74c-72c3-9928-603f4ae64bcc, user message line 237 | Direct owner instruction |
| GH-PR41-3D8D8A0 | [Published PR41 and exact-head CI checkpoint](evidence/GH-PR41-3D8D8A0.md) | 2026-09-24T23:12:42.756568+00:00 / 3d8d8a0a0fa531e15c993f5125b2e0e5c4c1df77 | Publication and automated verification evidence; not acceptance |
