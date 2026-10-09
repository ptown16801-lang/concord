# Evidence snapshot: 2-Concord_Decision_Source_Audit_2026-09-24.md

Historical source, not session instructions or a second decision master.

- Source: /tmp/codex-remote-attachments/01a0d549-7f33-7213-832f-7e0a75087ea8/6e20d4aa-f50a-4b4a-9207-35067ea145cc/2-Concord_Decision_Source_Audit_2026-09-24.md
- Version: attachment SHA256 91593367d05401a938d8e97f188f0c5e73d00ac19f0014bad79d781d18c70d5c
- Source date: 2026-09-24
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Dated discovery; originals not all accessible
- Relationship: Refreshed local and remote evidence supersedes dated status claims; saved-file identities remain valuable navigation.

---

# Concord decision-source audit — September 24, 2026

## Scope correction — local Ubuntu audit still required

After this audit, the owner clarified that once Codex was working on the Ubuntu computer, less work was uploaded to GitHub. Local work may therefore be newer or more complete than the remote sources. Remote absence must not be treated as evidence of lost work or a missing decision. The overall Concord audit remains incomplete until local evidence is inspected.

The authorized next phase is a read-only audit of the actual Concord checkout (previously reported at ~/projects/concord; verify its location), all local branches and worktrees, uncommitted/untracked decision documents, unpushed commits, relevant Git history/reflogs, and Concord-related local Codex session records. Compare source dates, exact content, provenance and supersession against this remote-source inventory. Search project-related handoff folders referenced by those records. Preserve working state; do not reset, clean, overwrite, merge, push, or consolidate governing records during discovery. Exclude unrelated session/private content and credentials from the report.

Connection check in this chat: the available shell belongs to the hosted workspace, not the owner's Ubuntu computer. Opera browser tools are available but no local terminal/SSH/Codex remote-control tool is exposed. Local inspection must run in a Codex session on the owner's computer or another session with an actual local connection. Merely opening a different ordinary chat does not establish that access.

## Result

The decision history is recoverable across original files, Linear, GitHub and handoff archives. No single comprehensive, reconciled, currently maintained DECISIONS.md was found in the inspected sources. Later decisions are being recorded, but updates are not consistently propagated into the summaries and handoff files. This audit is a source-location and maintenance audit, not adoption of a new governing record or a full substantive constitutional conflict review.

GitHub already holds important subsystem specifications and implementation/review evidence. Recommended arrangement: one maintained root DECISIONS.md in ptown16801-lang/concord, linking to detailed decision records and to Linear approval/discussion sources. Linear remains authoritative for current issue scope, owner decisions, dependencies and acceptance evidence. Do not maintain two independently edited master texts. This recommendation has not been implemented.

## Coverage and limits

| Source | Inspection completed |
| --- | --- |
| GitHub | Enumerated 9 accessible owner repositories; Concord was the relevant repository. Inspected all 40 current branch heads plus PR-only historical heads: 41 distinct complete recursive trees, no tree truncation. Retrieved all 88 unique Markdown/text/YAML blobs found at those heads. |
| GitHub review history | All 38 pull requests (open and closed), their descriptions, base/head/merge state, and returned discussion/review entries. Seven discussion entries returned. Repository issue collection contained these 38 PRs and no standalone issues. |
| Linear inventory | Listed 46 workspace documents and all 169 team issues, with no remaining list pages. Retrieved 40 potentially relevant documents in full; one generic acceptance document proved to concern Health and is excluded from Concord authority. |
| Linear issue evidence | Retrieved 84 Concord issues plus 25 relevant detached/peer/workstream issues in full, with 488 issue comments. All comment pages were exhausted. Deferred work was inspected as evidence, not reopened. |
| Linear project evidence | Read Concord project description, all 17 linked resources, 11 project status updates and 30 project comments. Document-comment calls returned no comments. |
| Files and handoff archives | Broad and exact-title searches for Concord, decision records, governance/master prompts, architecture, frozen directives and current state. Materialized 40 selected source files, including five ZIP files; inspected relevant decision/state/README/manifest members. File hashes were compared. |
| Google Drive | Searched Concord, decisions, governance and Vote. Found research/artwork archives and the Research Library audit spreadsheet; read that index. No general Concord master decisions file surfaced in these searches. This was targeted discovery, not a crawl of every Drive file. |
| Limits | No access to unsaved Ubuntu files, every historical ChatGPT message, deleted/unreachable Git objects, or every intermediate commit. All branch/PR-head text files were inspected, but executable source and every historical binary were not exhaustively audited. Research PDFs and visual prototypes were located as supporting sources, not treated as adopted decisions. |

Counts describe retrieved records, not a claim that every historical decision has been recovered. Search visibility and saved snapshots limit completeness. Changes by other sessions during the audit may postdate individual reads.

## Main findings

### F01 — No maintained master in GitHub

No DECISIONS.md or decisions directory was present in any of the 41 inspected trees. The default branch is Develo at 29ca0b44cf8d911df6978e84c7a91e7777afd304. GitHub has subsystem contracts, PROJECT_RECORD.md and CHANGELOG.md, but none constitutes a complete project-wide accepted-decision register.

### F02 — The original Linear register still exists

The Concord project resource named “Architecture and decisions register” resolves to [Concord — preserved architecture and decisions source (on demand)](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99). Its current title describes it as preserved/on-demand, while its body still calls itself the principal accepted architecture register. Last modified 2026-09-19T03:09:24Z. The older workflow subsection says new owner decisions must update the contract and decision register; that subsection is historical, not evidence of a current enforced maintenance process.

### F03 — Eight settled architecture topics remain stale in the summary

[JON-30](https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions) explicitly records the September 16 resolution of JON-31–38. CURRENT_DECISIONS.md was saved September 20 but still lists these matters as open or incompletely established. See the resolution table below. Saved date alone is not content freshness.

### F04 — Handoff packages reproduce the stale summary

Both located Concord_Codex_Handoff.zip files contain CURRENT_DECISIONS.md with exactly the same SHA-256 as the standalone summary: f67cfd5ae92f30a7a5277c657ff60b286b35df3824eb487524bf20217baaa15f. This is duplicated snapshot content, not independent corroboration or synchronization.

### F05 — Project identity diverges across locations

The standalone CURRENT_DECISIONS.md and default-branch PROJECT_RECORD.md retain the rejected Vote umbrella/child hierarchy. The later owner project map and integration-branch PROJECT_RECORD.md correctly identify Concord and The Form as peer projects, with Vote as folder metadata. PR #27/#37 preserve the correction, but the default branch still exposes the older record.

### F06 — Scheduler requirements are elsewhere

[Scheduler Research & Selection Record — 2026-09-21](https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614) was updated September 22 and records hybrid switching among approved policies, off-line generation, deterministic fallback, shadow/canary promotion, immutable policy identity, protected-data exposure gates and unweighted owner goals. The general Linear register lacks the hybrid/shadow/immutable-policy text. JON-16 remains the binding scheduler/checker boundary; research candidates are not selected technologies.

### F07 — Coin refusal is now clarified, but summaries lag

[JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) and [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) were updated September 24: refusal alone causes no destruction or return; return is an elected ordinary transfer, with optional signing. Their additional forced-next-use/permanent-mark experiment remains a proposal. The September 23 project summary and GitHub COIN_MODEL_A_V0.1.md still describe refusal meaning as an unresolved ambiguity. This is a concrete cross-system freshness gap.

### F08 — JON-163 is preserved as a draft, not lost or adopted

[Concord AI Role & Independence Specification v1 — Draft for review](https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098) contains v1-draft.2, updated September 24. A separate v1-draft.1 historical snapshot is retained. The agreed role outline does not mean every detailed independence/waiver/consequence provision is accepted. Both belong in a source register with distinct statuses.

### F09 — Merge state requires checking the destination

PR #17 merged the marketplace contract into Develo. PR #29 is also marked merged, but its destination is the JON-98 prior-art feature branch, not Develo; the containing PR #25 remains open. A merged badge alone does not prove a document reached the project default branch.

### F10 — No verified maintenance enforcement

Inspected workflow variants run syntax, tests and runtime checks; no decision-register synchronization or freshness gate was identified. Existing instructions to record changes are procedural evidence, not proof of automatic maintenance. No observed canonical file, unique decision-owner workflow or successful synchronization receipt establishes ongoing comprehensive updates.

### F11 — Duplicate files exaggerate apparent coverage

The five combined SECOND_COPY variants are byte-identical (225,214 bytes each). DECISIONS(1), (2) and (3) are also byte-identical. These are snapshots/copies, not five independent updates. Full hashes appear in the file inventory.

### F12 — Foundational prompt is an additional source

AGENT_GOVERNANCE_MODEL_MASTER_PROMPT_v2.2_SELF_CONTAINED.md is the newest named general master-prompt edition located. Its header explicitly says proposed governing prompt, not ratification or evidence that controls exist. It must be reconciled with later accepted decisions, not automatically substituted for them.

## Resolved architecture sources missing from the current summary

| Source | Recorded adopted resolution |
| --- | --- |
| [JON-30](https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions) | Institutional self-rule for ordinary low-level procedures, bounded by higher law, rights, authority and security constraints. |
| [JON-31](https://linear.app/jons-garage/issue/JON-31/choose-agreement-transfer-rule-for-a-surviving-institution) | No direct transfer/substitution of an agreement position while the original institution survives; use the ordinary agreement lifecycle. |
| [JON-32](https://linear.app/jons-garage/issue/JON-32/define-adjudication-route-after-checker-finds-no-objective-violation) | A separate admission gate routes genuine interpretive claims after the checker finds no objective violation; the gate does not decide merits. |
| [JON-33](https://linear.app/jons-garage/issue/JON-33/resolve-petition-credit-duplicate-and-refund-accounting) | Duplicate filings consume petition credit; no automatic refund/co-sign conversion. |
| [JON-34](https://linear.app/jons-garage/issue/JON-34/define-confidentiality-for-refusal-in-sealed-investigations) | Refusal in a sealed investigation remains sealed, with protected append-only evidence and later authorized review. |
| [JON-35](https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering) | Lawful operation-start authority admits an in-flight cross-domain operation; later revocation alone does not cancel it. Exact scope, versions and other validity/cancellation rules still apply. |
| [JON-36](https://linear.app/jons-garage/issue/JON-36/define-office-term-and-election-cadence) | Phase-based legislative/executive election cadence, no term limits, separate judicial tenure and continuity rules. |
| [JON-37](https://linear.app/jons-garage/issue/JON-37/define-grand-jury-authority-beyond-disclosure-review) | Broader lawful grand-jury investigation/charging functions, without final adjudication, punishment or blanket protected access. |
| [JON-38](https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary) | Protected/governmental initiative authority requires an express lawful grant; classification or scheduling alone does not confer authority. |

## Recommended location and update contract — proposal only

1. Put the comprehensive current decision index at the root of the Concord GitHub repository as DECISIONS.md. Keep detailed entries under docs/decisions/ when needed, and retain immutable historical sources separately.
2. Each entry should carry a stable ID, decision text, status, acceptance date/source, scope, rationale, superseded IDs, related Linear issue/document and implementation evidence. Distinguish accepted design, proposal, research, delivered implementation and verified acceptance.
3. Keep Linear as the decision discussion/approval and work-tracking record. Link each approved decision to its exact GitHub entry and commit; link GitHub back to Linear. A later explicit owner correction takes precedence while the register catches up.
4. Require an affected decision entry to be updated, or an explicit “no decision change” disposition, before concluding consequential design work. A check can detect missing IDs/links or stale mirror hashes, but cannot itself decide semantic completeness or approval.
5. Produce CURRENT_DECISIONS.md and handoff summaries from the canonical register, stamped with source commit and coverage date, rather than manually maintaining competing copies.
6. Reconcile the eight resolved topics, project identity, scheduler requirements, September 24 coin clarification and JON-163 draft status first. Preserve the interview history and existing IDs. Do not silently turn drafts/research into accepted policy.

No repository, issue, document, automation, branch, PR or original decision file was changed by this audit. No review handoff, merge or deployment was initiated.

## GitHub source map

| Area | Sources | Location/status |
| --- | --- | --- |
| General project history | PROJECT_RECORD.md; CHANGELOG.md; docs/AUDIT_2026-09-16.md | Default branch plus corrected documentation in PR #27/#37; older text is historical. |
| Identity | docs/IDENTITY_PERSISTENCE_CONTRACT.md | PR #15 / JON-15 |
| Scheduler | docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md; test/scheduler/README.md | PR #20 / JON-16 and PR #33 / JON-128 |
| Security | docs/SECURITY_DOMAIN_CONTRACT.md; contracts/ADMISSION_KERNEL.md; docs/GOVERNANCE_SANDBOX.md | PR #19 / JON-17; PR #34/#37 / JON-138/JON-141 |
| Agreements | docs/AGREEMENT_LIFECYCLE.md | PR #18 / JON-19 |
| Economy / Goodwill | docs/ECONOMY_MARKETPLACE_CONTRACT.md; COIN_MODEL_A/C/D/G documents; JON-98 research documents | PR #17 merged to Develo; PR #21–25 remain separate; #29 merged into #25 feature branch |
| Constitutional implementation | docs/specs/bootstrap-impeachment-approved-v1.md; docs/specs/bootstrap-impeachment.md; docs/electorate-accounting.md; docs/ballot-audit-integrity.md; docs/ELIGIBILITY_AUTHORITY.md | JON-58/JON-61/JON-78–89, PR #6–12/#26/#36/#37; bounded acceptance does not establish complete production authority |
| Archive / integration | docs/ARTIFACT_MANIFEST.md; docs/INTEGRATION_RECONCILIATION.md | PR #32/#37: artifact source pins and reconciliation choices |
| Research / recovery | docs/GENERATIVE_AGENTS_ANALYSIS.md; docs/GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md; docs/GOVERNANCE_AUDIT_2026-09-23.md | PR #28/#34/#35/#37; research and audit evidence, not blanket adoption |
| Finger / UI | README variants; src/finger/README.md; PR #1–4/#38; Linear JON-14/JON-21–24/JON-27/JON-55/JON-69–75 | Implementation evidence and interface decisions; external visual artifacts remain separate |
| Workflow history | qa/dispatch/README.md; qa/workflow/README.md; historical coordinator documentation | Retired workflow proposals must not be treated as current dispatch authority |

### All pull requests inspected

| PR | Title | State / destination | Head SHA |
| --- | --- | --- | --- |
| [#38](https://github.com/ptown16801-lang/concord/pull/38) | JON-129: recover positive integer processing-grid validation | open → Develo | b81cca12f6d5cde714f30031a8a78dab95d97daf |
| [#37](https://github.com/ptown16801-lang/concord/pull/37) | Reconcile Concord governance, scheduler and archive review branches | open → Develo | 6cf4eab09836d42d4b83a7fc1862442fdc38c3ff |
| [#36](https://github.com/ptown16801-lang/concord/pull/36) | JON-85: recover and correct frozen bootstrap impeachment implementation | open → Develo | e2e23849a2e5e128f7f46f35712499f16fb98ef9 |
| [#35](https://github.com/ptown16801-lang/concord/pull/35) | Document Concord governance recovery research | open → Develo | a5a6cdaaaf11cf7d3ad6efb48cce6e0b46688838 |
| [#34](https://github.com/ptown16801-lang/concord/pull/34) | Add Concord governance sandbox and audit remediation | open → Develo | 1731602de02cef6fb0228f155202beeed844c295 |
| [#33](https://github.com/ptown16801-lang/concord/pull/33) | Add deterministic Concord scheduler simulation harness | open → Develo | e4b979dea42e606bc8ac0b64b458bb084d8ad3a6 |
| [#32](https://github.com/ptown16801-lang/concord/pull/32) | JON-28: verify local archive artifacts without implying delivery | open → Develo | e7462d860d5c4a17d7d1f6283bc25f23ebf3716a |
| [#31](https://github.com/ptown16801-lang/concord/pull/31) | Codex GitHub integration validation | open → Develo | 12eabf9b7a5e6e7adb8656435291269a44838ccc |
| [#30](https://github.com/ptown16801-lang/concord/pull/30) | Retire workflow policy gates and preserve runtime preflight | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | cdaee6c142040ff267c4700cdbda706f2dfaad29 |
| [#29](https://github.com/ptown16801-lang/concord/pull/29) | Verify coin-model sources and qualify prior-art claims | merged → ptown16801/jon-98-coin-model-b-exact-model-prior-art-audit-26bb | 2dc0438006d8442f906f4a0ba991b8742abe9ce3 |
| [#28](https://github.com/ptown16801-lang/concord/pull/28) | Analyze Generative Agents for Concord and emergence | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 27a50b02481199a2de6ccd74c06bdf35ec6ee8bc |
| [#27](https://github.com/ptown16801-lang/concord/pull/27) | docs: partition obsolete workflow instructions from current Concord routing | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 881ce1ef6ca84aba94f293125f2bd8beb74ffb24 |
| [#26](https://github.com/ptown16801-lang/concord/pull/26) | Document electorate accounting acceptance gaps | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 84ec55f0b55aedb0ce00aebfc1ab0dfd3ac776c2 |
| [#25](https://github.com/ptown16801-lang/concord/pull/25) | Audit exact coin-model prior art | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 2f12adb94d80efb14769e838b8bc5271173bf350 |
| [#24](https://github.com/ptown16801-lang/concord/pull/24) | Add independent coin model v0.1 conformance review | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 101080a685ab78bb955d650c64191118098f58f7 |
| [#23](https://github.com/ptown16801-lang/concord/pull/23) | Specify hidden coin research instrumentation | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 50b9462bce32fdd7e62cbd74e9b5c9025cdda53f |
| [#22](https://github.com/ptown16801-lang/concord/pull/22) | Model coin threats and emergent behavior | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 9325cb07f4bf42b1c1c0c6148e562045a0c99e47 |
| [#21](https://github.com/ptown16801-lang/concord/pull/21) | Specify coin model A v0.1 | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 1864a0797ae8cee03a8ce7aaa336396ce182c772 |
| [#20](https://github.com/ptown16801-lang/concord/pull/20) | Define scheduler, legality checker, and continuity contract | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | c86701512a64c58ade9707d8368a48bad1e8fc03 |
| [#19](https://github.com/ptown16801-lang/concord/pull/19) | Define protected-domain security contract | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 49c19837191b83e93844653f7bf6259ee838d3ef |
| [#18](https://github.com/ptown16801-lang/concord/pull/18) | Define the authoritative agreement lifecycle contract | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 462d774a133dd52186b52d5743894d9eccbfb93a |
| [#17](https://github.com/ptown16801-lang/concord/pull/17) | Define Concord marketplace and deal-making architecture | merged → Develo | a42baeadc0e69b08571acc779e5b8268385be49e |
| [#16](https://github.com/ptown16801-lang/concord/pull/16) | Add dependency-aware continuous dispatch planning | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 3a4dd7dfa9234b5b0132d5f0bc17046b7ba74ca3 |
| [#15](https://github.com/ptown16801-lang/concord/pull/15) | Define persistent identity and succession contract | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 1e86688cc2ed45b174d675d353c47b96c8d5bbec |
| [#14](https://github.com/ptown16801-lang/concord/pull/14) | [Canceled] Add safe Linear coordinator child-agent regime | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 90ecdcfaa25f6ba99c2193ffacfc8150aebc75aa |
| [#13](https://github.com/ptown16801-lang/concord/pull/13) | [Canceled] Add Linear OpenAI project coordinator bridge | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | c19a13700e1b95163f577b34d8610a9471bc2871 |
| [#12](https://github.com/ptown16801-lang/concord/pull/12) | JON-80: preserve ballot audit history and verify competing writers | open → delivery/jon-80-recovery-20260916 | 5f5a28d46cfa62d1222e74563b1dc8e281b7c73f |
| [#11](https://github.com/ptown16801-lang/concord/pull/11) | Guard project dispatch and run standalone fixture validation | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 3465d56bb133959443cee18c4e8404dd163c074d |
| [#10](https://github.com/ptown16801-lang/concord/pull/10) | JON-88: Recover existing adversarial fixture pack and validator | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | c27389240d16d81e21f7b92fd25ea5fa5537205d |
| [#9](https://github.com/ptown16801-lang/concord/pull/9) | JON-81: Recover existing exact electorate accounting implementation | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | a090a67719681b04683f1f87c35d4080ea0854f5 |
| [#8](https://github.com/ptown16801-lang/concord/pull/8) | JON-80: Recover existing immutable ballot intake implementation | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf |
| [#7](https://github.com/ptown16801-lang/concord/pull/7) | JON-79: Recover existing eligibility lifecycle implementation | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 51a102259785a5b53dc6ec4bc4bbca54c4a8fc37 |
| [#6](https://github.com/ptown16801-lang/concord/pull/6) | JON-78: Recover verified population registry and 300-cap implementation | open → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 882dcffb31b520c6f9458984a35745c8b4bfa3b8 |
| [#5](https://github.com/ptown16801-lang/concord/pull/5) | Enable coding session runtime preflight | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 87c484861cbbf4bd7b994e40db3071e0e9823c19 |
| [#4](https://github.com/ptown16801-lang/concord/pull/4) | Reconcile Vote/Concord project records and Finger beta | merged → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 2aa91aac38f89ed0521ef1a31f02bc98532f3a24 |
| [#3](https://github.com/ptown16801-lang/concord/pull/3) | Implement Finger data collection subsystem | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 3d8675ba7feb5bc57fffb240de21867e95c5100c |
| [#2](https://github.com/ptown16801-lang/concord/pull/2) | Implement Finger raw storage and historical retention | merged → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | 9a79456273f2620a87eb716bd588402654cb1066 |
| [#1](https://github.com/ptown16801-lang/concord/pull/1) | Implement Finger replay and heat-map processing | closed → ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f | b04bbe4af6e20374d4392924d29a2adb2efd72c7 |

### All current branches inspected

| Branch | Head SHA |
| --- | --- |
| [Develo](https://github.com/ptown16801-lang/concord/tree/29ca0b44cf8d911df6978e84c7a91e7777afd304) | 29ca0b44cf8d911df6978e84c7a91e7777afd304 |
| [audit/concord-reconciliation-20260916](https://github.com/ptown16801-lang/concord/tree/2aa91aac38f89ed0521ef1a31f02bc98532f3a24) | 2aa91aac38f89ed0521ef1a31f02bc98532f3a24 |
| [codex/eligibility-durable-authority-20260921](https://github.com/ptown16801-lang/concord/tree/638ce897d36226cac79f5d2543ecb11f56bf975b) | 638ce897d36226cac79f5d2543ecb11f56bf975b |
| [codex/jon-28-artifact-manifest](https://github.com/ptown16801-lang/concord/tree/e7462d860d5c4a17d7d1f6283bc25f23ebf3716a) | e7462d860d5c4a17d7d1f6283bc25f23ebf3716a |
| [codex/jon-85-bootstrap-recovery](https://github.com/ptown16801-lang/concord/tree/e2e23849a2e5e128f7f46f35712499f16fb98ef9) | e2e23849a2e5e128f7f46f35712499f16fb98ef9 |
| [codex/jon-90-github-integration-validation](https://github.com/ptown16801-lang/concord/tree/12eabf9b7a5e6e7adb8656435291269a44838ccc) | 12eabf9b7a5e6e7adb8656435291269a44838ccc |
| [codex/jon-128-recovered-harness](https://github.com/ptown16801-lang/concord/tree/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6) | e4b979dea42e606bc8ac0b64b458bb084d8ad3a6 |
| [codex/jon-129-grid-recovery](https://github.com/ptown16801-lang/concord/tree/b81cca12f6d5cde714f30031a8a78dab95d97daf) | b81cca12f6d5cde714f30031a8a78dab95d97daf |
| [codex/jon-141-conflict-integration](https://github.com/ptown16801-lang/concord/tree/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff) | 6cf4eab09836d42d4b83a7fc1862442fdc38c3ff |
| [delivery/jon-78-recovery-20260916](https://github.com/ptown16801-lang/concord/tree/882dcffb31b520c6f9458984a35745c8b4bfa3b8) | 882dcffb31b520c6f9458984a35745c8b4bfa3b8 |
| [delivery/jon-79-recovery-20260916](https://github.com/ptown16801-lang/concord/tree/51a102259785a5b53dc6ec4bc4bbca54c4a8fc37) | 51a102259785a5b53dc6ec4bc4bbca54c4a8fc37 |
| [delivery/jon-80-recovery-20260916](https://github.com/ptown16801-lang/concord/tree/b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf) | b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf |
| [delivery/jon-81-recovery-20260916](https://github.com/ptown16801-lang/concord/tree/a090a67719681b04683f1f87c35d4080ea0854f5) | a090a67719681b04683f1f87c35d4080ea0854f5 |
| [delivery/jon-88-recovery-20260916](https://github.com/ptown16801-lang/concord/tree/c27389240d16d81e21f7b92fd25ea5fa5537205d) | c27389240d16d81e21f7b92fd25ea5fa5537205d |
| [delivery/linear-openai-coordinator-20260916](https://github.com/ptown16801-lang/concord/tree/40f647e5b8d23307f713fc3a3753a1d3a46611cb) | 40f647e5b8d23307f713fc3a3753a1d3a46611cb |
| [docs/concord-governance-recovery-research](https://github.com/ptown16801-lang/concord/tree/a5a6cdaaaf11cf7d3ad6efb48cce6e0b46688838) | a5a6cdaaaf11cf7d3ad6efb48cce6e0b46688838 |
| [fix/jon80-append-only-audit-20260916](https://github.com/ptown16801-lang/concord/tree/5f5a28d46cfa62d1222e74563b1dc8e281b7c73f) | 5f5a28d46cfa62d1222e74563b1dc8e281b7c73f |
| [fix/linear-dispatch-gate-20260916](https://github.com/ptown16801-lang/concord/tree/3465d56bb133959443cee18c4e8404dd163c074d) | 3465d56bb133959443cee18c4e8404dd163c074d |
| [jon-138-governance-audit-remediation](https://github.com/ptown16801-lang/concord/tree/1731602de02cef6fb0228f155202beeed844c295) | 1731602de02cef6fb0228f155202beeed844c295 |
| [maintenance/workflow-partition-20260918](https://github.com/ptown16801-lang/concord/tree/881ce1ef6ca84aba94f293125f2bd8beb74ffb24) | 881ce1ef6ca84aba94f293125f2bd8beb74ffb24 |
| [ptown16801/jon-15-persistent-identity-memory-and-succession-model-d6b3](https://github.com/ptown16801-lang/concord/tree/1e86688cc2ed45b174d675d353c47b96c8d5bbec) | 1e86688cc2ed45b174d675d353c47b96c8d5bbec |
| [ptown16801/jon-16-scheduler-legality-checker-and-continuity-control-f0f6](https://github.com/ptown16801-lang/concord/tree/c86701512a64c58ade9707d8368a48bad1e8fc03) | c86701512a64c58ade9707d8368a48bad1e8fc03 |
| [ptown16801/jon-17-security-gateways-domain-authorization-and-0e48](https://github.com/ptown16801-lang/concord/tree/49c19837191b83e93844653f7bf6259ee838d3ef) | 49c19837191b83e93844653f7bf6259ee838d3ef |
| [ptown16801/jon-19-agreement-lifecycle-and-institutional-negotiation-6dfb](https://github.com/ptown16801-lang/concord/tree/462d774a133dd52186b52d5743894d9eccbfb93a) | 462d774a133dd52186b52d5743894d9eccbfb93a |
| [ptown16801/jon-25-agent-economy-barter-and-deal-making-architecture-c524](https://github.com/ptown16801-lang/concord/tree/a42baeadc0e69b08571acc779e5b8268385be49e) | a42baeadc0e69b08571acc779e5b8268385be49e |
| [ptown16801/jon-69-finger-queued-implementation-workload-a17d](https://github.com/ptown16801-lang/concord/tree/3d8675ba7feb5bc57fffb240de21867e95c5100c) | 3d8675ba7feb5bc57fffb240de21867e95c5100c |
| [ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f](https://github.com/ptown16801-lang/concord/tree/40f647e5b8d23307f713fc3a3753a1d3a46611cb) | 40f647e5b8d23307f713fc3a3753a1d3a46611cb |
| [ptown16801/jon-73-finger-replay-and-heat-map-processing-4879](https://github.com/ptown16801-lang/concord/tree/b04bbe4af6e20374d4392924d29a2adb2efd72c7) | b04bbe4af6e20374d4392924d29a2adb2efd72c7 |
| [ptown16801/jon-81-jon-58d-exact-electorate-and-d-b-u-accounting-dcc1](https://github.com/ptown16801-lang/concord/tree/84ec55f0b55aedb0ce00aebfc1ab0dfd3ac776c2) | 84ec55f0b55aedb0ce00aebfc1ab0dfd3ac776c2 |
| [ptown16801/jon-90-enable-concord-linear-coding-sessions-environment-8402](https://github.com/ptown16801-lang/concord/tree/87c484861cbbf4bd7b994e40db3071e0e9823c19) | 87c484861cbbf4bd7b994e40db3071e0e9823c19 |
| [ptown16801/jon-92-deploy-and-authorize-linear-openai-project-coordinator-d92b](https://github.com/ptown16801-lang/concord/tree/40f647e5b8d23307f713fc3a3753a1d3a46611cb) | 40f647e5b8d23307f713fc3a3753a1d3a46611cb |
| [ptown16801/jon-95-concord-dispatcher-dependency-aware-continuous-work-031d](https://github.com/ptown16801-lang/concord/tree/3a4dd7dfa9234b5b0132d5f0bc17046b7ba74ca3) | 3a4dd7dfa9234b5b0132d5f0bc17046b7ba74ca3 |
| [ptown16801/jon-97-coin-model-a-formal-specification-and-interview-audit-7a40](https://github.com/ptown16801-lang/concord/tree/1864a0797ae8cee03a8ce7aaa336396ce182c772) | 1864a0797ae8cee03a8ce7aaa336396ce182c772 |
| [ptown16801/jon-98-coin-model-b-exact-model-prior-art-audit-26bb](https://github.com/ptown16801-lang/concord/tree/2f12adb94d80efb14769e838b8bc5271173bf350) | 2f12adb94d80efb14769e838b8bc5271173bf350 |
| [ptown16801/jon-98-coin-model-b-exact-model-prior-art-audit-9540](https://github.com/ptown16801-lang/concord/tree/2dc0438006d8442f906f4a0ba991b8742abe9ce3) | 2dc0438006d8442f906f4a0ba991b8742abe9ce3 |
| [ptown16801/jon-99-coin-model-c-threat-and-emergence-model-4274](https://github.com/ptown16801-lang/concord/tree/9325cb07f4bf42b1c1c0c6148e562045a0c99e47) | 9325cb07f4bf42b1c1c0c6148e562045a0c99e47 |
| [ptown16801/jon-100-coin-model-d-hidden-research-instrumentation-contract-54e6](https://github.com/ptown16801-lang/concord/tree/50b9462bce32fdd7e62cbd74e9b5c9025cdda53f) | 50b9462bce32fdd7e62cbd74e9b5c9025cdda53f |
| [ptown16801/jon-103-coin-model-g-independent-v01-conformance-review-acba](https://github.com/ptown16801-lang/concord/tree/101080a685ab78bb955d650c64191118098f58f7) | 101080a685ab78bb955d650c64191118098f58f7 |
| [ptown16801/jon-116-analyze-generative-agents-for-concord-and-emergence-35db](https://github.com/ptown16801-lang/concord/tree/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc) | 27a50b02481199a2de6ccd74c06bdf35ec6ee8bc |
| [ptown16801/jon-124-repair-retired-workflow-policy-gates-9413](https://github.com/ptown16801-lang/concord/tree/cdaee6c142040ff267c4700cdbda706f2dfaad29) | cdaee6c142040ff267c4700cdbda706f2dfaad29 |

### Text-source inventory across inspected trees

- .github/workflows/test.yml: [blob 3a742f4b85c8](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/.github/workflows/test.yml); [blob 5218fd1b0b14](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/.github/workflows/test.yml); [blob fd49e1c548a4](https://github.com/ptown16801-lang/concord/blob/3465d56bb133959443cee18c4e8404dd163c074d/.github/workflows/test.yml); [blob 974854edba4a](https://github.com/ptown16801-lang/concord/blob/3d8675ba7feb5bc57fffb240de21867e95c5100c/.github/workflows/test.yml)
- CHANGELOG.md: [blob 8246a0255e29](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/CHANGELOG.md); [blob 7b39e37bee65](https://github.com/ptown16801-lang/concord/blob/638ce897d36226cac79f5d2543ecb11f56bf975b/CHANGELOG.md); [blob e243cb88495e](https://github.com/ptown16801-lang/concord/blob/e7462d860d5c4a17d7d1f6283bc25f23ebf3716a/CHANGELOG.md); [blob 3117fde30b71](https://github.com/ptown16801-lang/concord/blob/e2e23849a2e5e128f7f46f35712499f16fb98ef9/CHANGELOG.md); [blob 4cd999a8c60b](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/CHANGELOG.md); [blob 5cfd43610279](https://github.com/ptown16801-lang/concord/blob/882dcffb31b520c6f9458984a35745c8b4bfa3b8/CHANGELOG.md); [blob f4cc49281938](https://github.com/ptown16801-lang/concord/blob/b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf/CHANGELOG.md); [blob 30473689d4c7](https://github.com/ptown16801-lang/concord/blob/a090a67719681b04683f1f87c35d4080ea0854f5/CHANGELOG.md); [blob 0de2aeebb115](https://github.com/ptown16801-lang/concord/blob/a5a6cdaaaf11cf7d3ad6efb48cce6e0b46688838/CHANGELOG.md); [blob 0e1dc14aff9c](https://github.com/ptown16801-lang/concord/blob/5f5a28d46cfa62d1222e74563b1dc8e281b7c73f/CHANGELOG.md); [blob 68240483b6ad](https://github.com/ptown16801-lang/concord/blob/3465d56bb133959443cee18c4e8404dd163c074d/CHANGELOG.md); [blob d97561139bb7](https://github.com/ptown16801-lang/concord/blob/1731602de02cef6fb0228f155202beeed844c295/CHANGELOG.md); [blob 62f93f5b6636](https://github.com/ptown16801-lang/concord/blob/1e86688cc2ed45b174d675d353c47b96c8d5bbec/CHANGELOG.md); [blob 7c8eccb4eee9](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/CHANGELOG.md); [blob b742befe414a](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/CHANGELOG.md); [blob 0027ec9924a2](https://github.com/ptown16801-lang/concord/blob/3a4dd7dfa9234b5b0132d5f0bc17046b7ba74ca3/CHANGELOG.md); [blob cb8908ef92c5](https://github.com/ptown16801-lang/concord/blob/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc/CHANGELOG.md); [blob f54d8aa897c8](https://github.com/ptown16801-lang/concord/blob/cdaee6c142040ff267c4700cdbda706f2dfaad29/CHANGELOG.md)
- CHANGE_REPORT.md: [blob f81eb997df0a](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/CHANGE_REPORT.md); [blob 7f84ecb71430](https://github.com/ptown16801-lang/concord/blob/3465d56bb133959443cee18c4e8404dd163c074d/CHANGE_REPORT.md)
- PROJECT_RECORD.md: [blob 6ce2d1e9124c](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/PROJECT_RECORD.md); [blob 16b94c604fa8](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/PROJECT_RECORD.md); [blob d0e3202395a5](https://github.com/ptown16801-lang/concord/blob/462d774a133dd52186b52d5743894d9eccbfb93a/PROJECT_RECORD.md)
- README.md: [blob 635aee192dc2](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/README.md); [blob 18440f9cf30b](https://github.com/ptown16801-lang/concord/blob/2aa91aac38f89ed0521ef1a31f02bc98532f3a24/README.md); [blob 726c2c12069a](https://github.com/ptown16801-lang/concord/blob/638ce897d36226cac79f5d2543ecb11f56bf975b/README.md); [blob 81c6bad105f2](https://github.com/ptown16801-lang/concord/blob/e2e23849a2e5e128f7f46f35712499f16fb98ef9/README.md); [blob 021c7b7bd8af](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/README.md); [blob 8fdb30179277](https://github.com/ptown16801-lang/concord/blob/882dcffb31b520c6f9458984a35745c8b4bfa3b8/README.md); [blob 93b7a289538c](https://github.com/ptown16801-lang/concord/blob/51a102259785a5b53dc6ec4bc4bbca54c4a8fc37/README.md); [blob 3fb592cdd2d6](https://github.com/ptown16801-lang/concord/blob/b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf/README.md); [blob c71621924985](https://github.com/ptown16801-lang/concord/blob/1731602de02cef6fb0228f155202beeed844c295/README.md); [blob a1d35727b07a](https://github.com/ptown16801-lang/concord/blob/881ce1ef6ca84aba94f293125f2bd8beb74ffb24/README.md); [blob 631fef7f3ac8](https://github.com/ptown16801-lang/concord/blob/1e86688cc2ed45b174d675d353c47b96c8d5bbec/README.md); [blob bbce3e03ec38](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/README.md); [blob 6937a628b46a](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/README.md); [blob d7a36b649fb1](https://github.com/ptown16801-lang/concord/blob/462d774a133dd52186b52d5743894d9eccbfb93a/README.md); [blob 8c7a09a537e4](https://github.com/ptown16801-lang/concord/blob/3d8675ba7feb5bc57fffb240de21867e95c5100c/README.md); [blob 0b7f3ebb2366](https://github.com/ptown16801-lang/concord/blob/b04bbe4af6e20374d4392924d29a2adb2efd72c7/README.md); [blob cd7b875da10a](https://github.com/ptown16801-lang/concord/blob/2f12adb94d80efb14769e838b8bc5271173bf350/README.md); [blob a2e2d76dab57](https://github.com/ptown16801-lang/concord/blob/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc/README.md); [blob 9d9459a36a5f](https://github.com/ptown16801-lang/concord/blob/cdaee6c142040ff267c4700cdbda706f2dfaad29/README.md); [blob 5abcaecca047](https://github.com/ptown16801-lang/concord/blob/9a79456273f2620a87eb716bd588402654cb1066/README.md)
- changes/JON-81.md: [blob 76e8813a4a72](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/changes/JON-81.md)
- contracts/ADMISSION_KERNEL.md: [blob 45ef09d96379](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/contracts/ADMISSION_KERNEL.md)
- docs/AGREEMENT_LIFECYCLE.md: [blob 310a5999b7b0](https://github.com/ptown16801-lang/concord/blob/462d774a133dd52186b52d5743894d9eccbfb93a/docs/AGREEMENT_LIFECYCLE.md)
- docs/ARTIFACT_MANIFEST.md: [blob 3b8bb5d9c2f8](https://github.com/ptown16801-lang/concord/blob/e7462d860d5c4a17d7d1f6283bc25f23ebf3716a/docs/ARTIFACT_MANIFEST.md)
- docs/AUDIT_2026-09-16.md: [blob 50b4cd960c3c](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/docs/AUDIT_2026-09-16.md); [blob 2b227a3b8563](https://github.com/ptown16801-lang/concord/blob/2aa91aac38f89ed0521ef1a31f02bc98532f3a24/docs/AUDIT_2026-09-16.md)
- docs/CODEX_GITHUB_INTEGRATION_VALIDATION.md: [blob 497d3405a134](https://github.com/ptown16801-lang/concord/blob/12eabf9b7a5e6e7adb8656435291269a44838ccc/docs/CODEX_GITHUB_INTEGRATION_VALIDATION.md)
- docs/COIN_MODEL_A_V0.1.md: [blob bd5f03e8bdb1](https://github.com/ptown16801-lang/concord/blob/1864a0797ae8cee03a8ce7aaa336396ce182c772/docs/COIN_MODEL_A_V0.1.md)
- docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md: [blob 4fede1cb8fff](https://github.com/ptown16801-lang/concord/blob/9325cb07f4bf42b1c1c0c6148e562045a0c99e47/docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md)
- docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md: [blob 016947d8b780](https://github.com/ptown16801-lang/concord/blob/50b9462bce32fdd7e62cbd74e9b5c9025cdda53f/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md)
- docs/COIN_MODEL_G_V0.1_CONFORMANCE_REVIEW.md: [blob ff40d88a428f](https://github.com/ptown16801-lang/concord/blob/101080a685ab78bb955d650c64191118098f58f7/docs/COIN_MODEL_G_V0.1_CONFORMANCE_REVIEW.md)
- docs/ECONOMY_MARKETPLACE_CONTRACT.md: [blob ab31c07c9c85](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/docs/ECONOMY_MARKETPLACE_CONTRACT.md)
- docs/ELIGIBILITY_AUTHORITY.md: [blob c1990c8a5cfa](https://github.com/ptown16801-lang/concord/blob/638ce897d36226cac79f5d2543ecb11f56bf975b/docs/ELIGIBILITY_AUTHORITY.md)
- docs/GENERATIVE_AGENTS_ANALYSIS.md: [blob ea826525f35f](https://github.com/ptown16801-lang/concord/blob/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc/docs/GENERATIVE_AGENTS_ANALYSIS.md)
- docs/GOVERNANCE_AUDIT_2026-09-23.md: [blob ff24a3250367](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/GOVERNANCE_AUDIT_2026-09-23.md)
- docs/GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md: [blob 05465b6cf3e6](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md)
- docs/GOVERNANCE_SANDBOX.md: [blob ea8638b99ffb](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/GOVERNANCE_SANDBOX.md)
- docs/IDENTITY_PERSISTENCE_CONTRACT.md: [blob 69deb426fd90](https://github.com/ptown16801-lang/concord/blob/1e86688cc2ed45b174d675d353c47b96c8d5bbec/docs/IDENTITY_PERSISTENCE_CONTRACT.md)
- docs/INTEGRATION_RECONCILIATION.md: [blob cf07dcd8f08d](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/INTEGRATION_RECONCILIATION.md)
- docs/JON-81-acceptance-resolution.md: [blob e6d722dfbfed](https://github.com/ptown16801-lang/concord/blob/84ec55f0b55aedb0ce00aebfc1ab0dfd3ac776c2/docs/JON-81-acceptance-resolution.md)
- docs/JON-98_EXACT_MODEL_PRIOR_ART_AUDIT.md: [blob 5a7ee2245619](https://github.com/ptown16801-lang/concord/blob/2f12adb94d80efb14769e838b8bc5271173bf350/docs/JON-98_EXACT_MODEL_PRIOR_ART_AUDIT.md)
- docs/JON-98_SOURCE_VERIFICATION.md: [blob 9f4fb76c2844](https://github.com/ptown16801-lang/concord/blob/2f12adb94d80efb14769e838b8bc5271173bf350/docs/JON-98_SOURCE_VERIFICATION.md)
- docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md: [blob 6a5b1abfd98b](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md)
- docs/SECURITY_DOMAIN_CONTRACT.md: [blob c8813c1d488b](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/docs/SECURITY_DOMAIN_CONTRACT.md)
- docs/ballot-audit-integrity.md: [blob 03b79a60ade1](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/ballot-audit-integrity.md)
- docs/electorate-accounting.md: [blob bed4928d819a](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/docs/electorate-accounting.md)
- docs/specs/bootstrap-impeachment-approved-v1.md: [blob 69ec83ca8a8c](https://github.com/ptown16801-lang/concord/blob/e2e23849a2e5e128f7f46f35712499f16fb98ef9/docs/specs/bootstrap-impeachment-approved-v1.md)
- docs/specs/bootstrap-impeachment.md: [blob d2d826b54552](https://github.com/ptown16801-lang/concord/blob/e2e23849a2e5e128f7f46f35712499f16fb98ef9/docs/specs/bootstrap-impeachment.md)
- integrations/linear-openai-coordinator/AGENT_REGIME.md: [blob 35aae82ab1b2](https://github.com/ptown16801-lang/concord/blob/90ecdcfaa25f6ba99c2193ffacfc8150aebc75aa/integrations/linear-openai-coordinator/AGENT_REGIME.md)
- integrations/linear-openai-coordinator/README.md: [blob 151a175f4edc](https://github.com/ptown16801-lang/concord/blob/90ecdcfaa25f6ba99c2193ffacfc8150aebc75aa/integrations/linear-openai-coordinator/README.md); [blob 3347ca8814b8](https://github.com/ptown16801-lang/concord/blob/c19a13700e1b95163f577b34d8610a9471bc2871/integrations/linear-openai-coordinator/README.md)
- policies/test/admission.yaml: [blob a22485391208](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/policies/test/admission.yaml)
- qa/dispatch/README.md: [blob 36e722e62319](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/qa/dispatch/README.md); [blob 709771aa2fe3](https://github.com/ptown16801-lang/concord/blob/3465d56bb133959443cee18c4e8404dd163c074d/qa/dispatch/README.md); [blob 6d783ab6d9a5](https://github.com/ptown16801-lang/concord/blob/3a4dd7dfa9234b5b0132d5f0bc17046b7ba74ca3/qa/dispatch/README.md); [blob 19c4a26bffcf](https://github.com/ptown16801-lang/concord/blob/cdaee6c142040ff267c4700cdbda706f2dfaad29/qa/dispatch/README.md)
- qa/jon58/README.md: [blob 336aa7dbb3cc](https://github.com/ptown16801-lang/concord/blob/c27389240d16d81e21f7b92fd25ea5fa5537205d/qa/jon58/README.md)
- qa/workflow/README.md: [blob 6fb555dbb234](https://github.com/ptown16801-lang/concord/blob/6cf4eab09836d42d4b83a7fc1862442fdc38c3ff/qa/workflow/README.md); [blob 24a216ea7a43](https://github.com/ptown16801-lang/concord/blob/87c484861cbbf4bd7b994e40db3071e0e9823c19/qa/workflow/README.md)
- src/finger/README.md: [blob d178cd5e740c](https://github.com/ptown16801-lang/concord/blob/3d8675ba7feb5bc57fffb240de21867e95c5100c/src/finger/README.md)
- test/scheduler/README.md: [blob 66b482af95d5](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/README.md)

## Linear document source register

| Document | Last update (UTC) | Role |
| --- | --- | --- |
| [HISTORICAL SNAPSHOT — JON-163 Role & Independence Specification v1-draft.1](https://linear.app/jons-garage/document/historical-snapshot-jon-163-role-and-independence-specification-v1-f6cd7ca6c7b3) | 2026-09-24T10:21:18.283Z | Historical/reference |
| [Concord AI Role & Independence Specification v1 — Draft for review](https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098) | 2026-09-24T10:21:48.028Z | Draft/proposal |
| [JON-86 independent bootstrap verification — 2026-09-23](https://linear.app/jons-garage/document/jon-86-independent-bootstrap-verification-2026-09-23-bba70d15b466) | 2026-09-23T14:09:05.497Z | Source; read its scope and later supersession |
| [Concord current work — ownership and dependencies (2026-09-23)](https://linear.app/jons-garage/document/concord-current-work-ownership-and-dependencies-2026-09-23-95963ba59a4b) | 2026-09-23T14:36:20.440Z | Source; read its scope and later supersession |
| [Concord governance recovery — research brief (2026-09-23)](https://linear.app/jons-garage/document/concord-governance-recovery-research-brief-2026-09-23-e7b642f42db1) | 2026-09-23T13:15:44.590Z | Source; read its scope and later supersession |
| [Proposal for review — Concord AGT integration and bounded delegation](https://linear.app/jons-garage/document/proposal-for-review-concord-agt-integration-and-bounded-delegation-50c0e9dbe914) | 2026-09-23T14:33:04.644Z | Draft/proposal |
| [Scheduler Research & Selection Record — 2026-09-21](https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614) | 2026-09-22T01:26:51.527Z | Source; read its scope and later supersession |
| [Acceptance and deployment decisions — September 19, 2026](https://linear.app/jons-garage/document/acceptance-and-deployment-decisions-september-19-2026-5a0424c9b36b) | 2026-09-21T02:34:57.291Z | Excluded: Health-specific content |
| [Workspace Linear operating policy — native workflow](https://linear.app/jons-garage/document/workspace-linear-operating-policy-native-workflow-61bf7beb7994) | 2026-09-24T07:18:53.413Z | Source; read its scope and later supersession |
| [Concord Linear-native operating workflow](https://linear.app/jons-garage/document/concord-linear-native-operating-workflow-8fe803878f5e) | 2026-09-21T02:41:22.217Z | Source; read its scope and later supersession |
| [Mandatory Project Execution Safety Rule](https://linear.app/jons-garage/document/mandatory-project-execution-safety-rule-af44c319d2b8) | 2026-09-21T02:39:41.434Z | Source; read its scope and later supersession |
| [HISTORICAL — Concord Linear-native migration audit and verification](https://linear.app/jons-garage/document/historical-concord-linear-native-migration-audit-and-verification-c616873bc30b) | 2026-09-21T02:41:23.763Z | Historical/reference |
| [M0 Pilot — Experiment Reconstruction & Validation](https://linear.app/jons-garage/document/m0-pilot-experiment-reconstruction-and-validation-fc6ab718b106) | 2026-09-18T06:24:45.068Z | Source; read its scope and later supersession |
| [Research Data Storage & Context Policy](https://linear.app/jons-garage/document/research-data-storage-and-context-policy-48eb47b813ec) | 2026-09-18T06:01:54.390Z | Source; read its scope and later supersession |
| [Research Execution Protocol — Experiment-First Case Study](https://linear.app/jons-garage/document/research-execution-protocol-experiment-first-case-study-c1b77765cb16) | 2026-09-18T05:55:39.062Z | Source; read its scope and later supersession |
| [Concord — deferred scope register and restoration map](https://linear.app/jons-garage/document/concord-deferred-scope-register-and-restoration-map-64a91247172f) | 2026-09-19T03:09:18.889Z | Source; read its scope and later supersession |
| [Concord research brief and bibliography — September 16–17, 2026](https://linear.app/jons-garage/document/concord-research-brief-and-bibliography-september-16-17-2026-ba32846e0b1b) | 2026-09-22T00:28:09.090Z | Source; read its scope and later supersession |
| [Concord workflow recovery — proposed review and dispatch delta](https://linear.app/jons-garage/document/concord-workflow-recovery-proposed-review-and-dispatch-delta-bd4e17e1e870) | 2026-09-17T22:26:47.232Z | Draft/proposal |
| [JON-105 — Independent experiment and measurement validity review](https://linear.app/jons-garage/document/jon-105-independent-experiment-and-measurement-validity-review-a22d282c84b6) | 2026-09-17T07:41:18.414Z | Source; read its scope and later supersession |
| [JON-82 cross-component boundary and handoff contract v1.0](https://linear.app/jons-garage/document/jon-82-cross-component-boundary-and-handoff-contract-v10-283bc88a773e) | 2026-09-17T03:19:52.396Z | Source; read its scope and later supersession |
| [HISTORICAL — Linear instruction optimization audit](https://linear.app/jons-garage/document/historical-linear-instruction-optimization-audit-01dbc55c7775) | 2026-09-19T03:04:55.491Z | Historical/reference |
| [Authoritative project map — Concord and The Form; Vote folder only](https://linear.app/jons-garage/document/authoritative-project-map-concord-and-the-form-vote-folder-only-1d086fda24b6) | 2026-09-17T01:37:43.280Z | Source; read its scope and later supersession |
| [RETIRED — Concord Supervisor partitioned runtime v4.0](https://linear.app/jons-garage/document/retired-concord-supervisor-partitioned-runtime-v40-8cdb8f7cc4ef) | 2026-09-19T03:09:18.063Z | Historical/reference |
| [Historical design audit — 2026-09-17 UTC; project structure superseded](https://linear.app/jons-garage/document/historical-design-audit-2026-09-17-utc-project-structure-superseded-5f6f9aac697c) | 2026-09-17T01:33:59.199Z | Source; read its scope and later supersession |
| [JON-87 — published-source interface/readiness continuation v1.0](https://linear.app/jons-garage/document/jon-87-published-source-interfacereadiness-continuation-v10-06a4bd4f959b) | 2026-09-16T23:43:32.607Z | Source; read its scope and later supersession |
| [HISTORICAL — Linear project profiles](https://linear.app/jons-garage/document/historical-linear-project-profiles-a72d41b8cb66) | 2026-09-19T03:07:04.124Z | Historical/reference |
| [JON-89 — completed source-traceability continuation v1.1](https://linear.app/jons-garage/document/jon-89-completed-source-traceability-continuation-v11-59d2f4d68fea) | 2026-09-16T23:05:56.209Z | Source; read its scope and later supersession |
| [Concord · Historical coding delivery policy — future implementation only](https://linear.app/jons-garage/document/concord-historical-coding-delivery-policy-future-implementation-only-263de2c4d5f7) | 2026-09-19T03:09:20.150Z | Source; read its scope and later supersession |
| [Bootstrap impeachment implementation specification](https://linear.app/jons-garage/document/bootstrap-impeachment-implementation-specification-1f7d10e8f846) | 2026-09-16T18:15:32.742Z | Source; read its scope and later supersession |
| [RETIRED — Linear operating directive](https://linear.app/jons-garage/document/retired-linear-operating-directive-a2acbf8880f2) | 2026-09-19T03:04:53.577Z | Historical/reference |
| [Propagation — researched agent workflow and handoff (planning only, 2026-09-16)](https://linear.app/jons-garage/document/propagation-researched-agent-workflow-and-handoff-planning-only-2026-717f3f73f917) | 2026-09-19T03:09:21.143Z | Source; read its scope and later supersession |
| [Homepage artwork — approved source and editing workflow v1.0.0](https://linear.app/jons-garage/document/homepage-artwork-approved-source-and-editing-workflow-v100-b695d75df212) | 2026-09-15T23:01:10.168Z | Source; read its scope and later supersession |
| [Concord subsystem — Research Library](https://linear.app/jons-garage/document/concord-subsystem-research-library-2cb47644c56d) | 2026-09-18T05:07:13.482Z | Source; read its scope and later supersession |
| [Research Library — Implementation Checkpoint 2026-09-15](https://linear.app/jons-garage/document/research-library-implementation-checkpoint-2026-09-15-c39dcd5c5299) | 2026-09-16T23:31:01.291Z | Source; read its scope and later supersession |
| [Research Library — Page Architecture and Data Contract](https://linear.app/jons-garage/document/research-library-page-architecture-and-data-contract-98ffd5b6ad44) | 2026-09-19T03:09:22.174Z | Source; read its scope and later supersession |
| [Research Library — Concord Implementation Contract](https://linear.app/jons-garage/document/research-library-concord-implementation-contract-5b1b23677b1c) | 2026-09-18T05:07:13.234Z | Source; read its scope and later supersession |
| [Concord operational ownership index v5.0](https://linear.app/jons-garage/document/concord-operational-ownership-index-v50-b5122377d07a) | 2026-09-19T03:09:23.086Z | Source; read its scope and later supersession |
| [Concord — historical open-questions and verification snapshot](https://linear.app/jons-garage/document/concord-historical-open-questions-and-verification-snapshot-fd62fb00f6b1) | 2026-09-19T03:09:25.499Z | Historical/reference |
| [Concord — preserved architecture and decisions source (on demand)](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99) | 2026-09-19T03:09:24.157Z | Historical/reference |
| [Concord — change history and reconstruction (reference only)](https://linear.app/jons-garage/document/concord-change-history-and-reconstruction-reference-only-139ba84df226) | 2026-09-18T05:22:31.756Z | Historical/reference |

## Linear issue source register

| Issue | Title | Status at retrieval | Last update (UTC) |
| --- | --- | --- | --- |
| [JON-14](https://linear.app/jons-garage/issue/JON-14/workbench-shell-and-navigation) | Workbench shell and navigation | Backlog | 2026-09-19T04:16:31.273Z |
| [JON-15](https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model) | Persistent identity, memory, and succession model | Done | 2026-09-23T11:31:38.623Z |
| [JON-16](https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control) | Scheduler, legality checker, and continuity control | Done | 2026-09-23T12:45:04.084Z |
| [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores) | Security gateways, domain authorization, and authoritative stores | Done | 2026-09-23T11:31:38.579Z |
| [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model) | Archivist, records, and publication model | Backlog | 2026-09-23T11:31:38.552Z |
| [JON-19](https://linear.app/jons-garage/issue/JON-19/agreement-lifecycle-and-institutional-negotiation) | Agreement lifecycle and institutional negotiation | Done | 2026-09-22T00:24:46.828Z |
| [JON-20](https://linear.app/jons-garage/issue/JON-20/forum-groups-and-non-binding-social-reactions) | Forum, groups, and non-binding social reactions | Backlog | 2026-09-19T04:16:05.573Z |
| [JON-21](https://linear.app/jons-garage/issue/JON-21/relational-and-temporal-observatory) | Relational and temporal observatory | Backlog | 2026-09-19T04:17:36.389Z |
| [JON-22](https://linear.app/jons-garage/issue/JON-22/interactive-data-atlas-and-graph-standard) | Interactive data atlas and graph standard | Backlog | 2026-09-19T04:16:46.442Z |
| [JON-23](https://linear.app/jons-garage/issue/JON-23/global-search-autocomplete-and-indexed-library) | Global search, autocomplete, and indexed library | Backlog | 2026-09-19T04:16:35.648Z |
| [JON-24](https://linear.app/jons-garage/issue/JON-24/decision-propagation-catalog-and-replay-engine) | Decision propagation catalog and replay engine | Backlog | 2026-09-19T04:16:49.249Z |
| [JON-25](https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture) | Agent economy, barter, and deal-making architecture | Done | 2026-09-24T17:33:05.832Z |
| [JON-26](https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph) | Research Library — Google Drive scientific archive and context graph | Backlog | 2026-09-18T05:26:43.718Z |
| [JON-27](https://linear.app/jons-garage/issue/JON-27/touch-gesture-midi-and-mobile-interaction-layer) | Touch, gesture, MIDI, and mobile interaction layer | Backlog | 2026-09-19T04:16:53.905Z |
| [JON-28](https://linear.app/jons-garage/issue/JON-28/concord-artifact-archive) | Concord artifact archive | In Review | 2026-09-23T13:27:00.962Z |
| [JON-29](https://linear.app/jons-garage/issue/JON-29/institutional-learning-library-and-interactive-guides) | Institutional learning library and interactive guides | Backlog | 2026-09-19T04:16:33.634Z |
| [JON-30](https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions) | Resolve outstanding governance architecture decisions | Done | 2026-09-16T16:47:20.217Z |
| [JON-31](https://linear.app/jons-garage/issue/JON-31/choose-agreement-transfer-rule-for-a-surviving-institution) | Choose agreement transfer rule for a surviving institution | Done | 2026-09-18T21:33:55.115Z |
| [JON-32](https://linear.app/jons-garage/issue/JON-32/define-adjudication-route-after-checker-finds-no-objective-violation) | Define adjudication route after checker finds no objective violation | Done | 2026-09-18T21:34:07.825Z |
| [JON-33](https://linear.app/jons-garage/issue/JON-33/resolve-petition-credit-duplicate-and-refund-accounting) | Resolve petition-credit duplicate and refund accounting | Done | 2026-09-18T21:34:01.362Z |
| [JON-34](https://linear.app/jons-garage/issue/JON-34/define-confidentiality-for-refusal-in-sealed-investigations) | Define confidentiality for refusal in sealed investigations | Done | 2026-09-16T11:37:33.760Z |
| [JON-35](https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering) | Finalize cross-domain commit and revocation ordering | Done | 2026-09-23T11:31:38.571Z |
| [JON-36](https://linear.app/jons-garage/issue/JON-36/define-office-term-and-election-cadence) | Define office-term and election cadence | Done | 2026-09-16T11:32:41.749Z |
| [JON-37](https://linear.app/jons-garage/issue/JON-37/define-grand-jury-authority-beyond-disclosure-review) | Define grand-jury authority beyond disclosure review | Done | 2026-09-16T11:41:15.679Z |
| [JON-38](https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary) | Define protected or authority-bearing initiative boundary | Done | 2026-09-18T21:34:12.222Z |
| [JON-39](https://linear.app/jons-garage/issue/JON-39/concord-regression-and-release-checklist) | Concord regression and release checklist | Backlog | 2026-09-23T10:05:50.636Z |
| [JON-44](https://linear.app/jons-garage/issue/JON-44/build-distinct-research-library-page-and-integrate-context-graph) | Build distinct Research Library page and integrate context graph | Backlog | 2026-09-18T05:26:44.295Z |
| [JON-45](https://linear.app/jons-garage/issue/JON-45/information-dispute-and-reporting-system) | Information dispute and reporting system | Backlog | 2026-09-18T05:26:44.403Z |
| [JON-46](https://linear.app/jons-garage/issue/JON-46/implement-informationreport-schema-and-append-only-event-model) | Implement InformationReport schema and append-only event model | Backlog | 2026-09-18T05:07:04.079Z |
| [JON-47](https://linear.app/jons-garage/issue/JON-47/build-quiz-report-and-blind-evaluation-interface) | Build quiz report and blind-evaluation interface | Backlog | 2026-09-18T20:58:25.690Z |
| [JON-48](https://linear.app/jons-garage/issue/JON-48/instrument-reporting-analytics-and-no-mutation-regression-tests) | Instrument reporting analytics and no-mutation regression tests | Backlog | 2026-09-18T05:26:43.335Z |
| [JON-49](https://linear.app/jons-garage/issue/JON-49/research-library-static-artifact-schema-and-publish-validator) | Research Library static artifact schema and publish validator | Done | 2026-09-18T05:26:43.073Z |
| [JON-50](https://linear.app/jons-garage/issue/JON-50/research-library-catalog-and-canonical-paper-detail-page) | Research Library catalog and canonical paper detail page | Done | 2026-09-18T05:07:07.734Z |
| [JON-51](https://linear.app/jons-garage/issue/JON-51/research-library-relationship-graph-controls-and-comparison-workspace) | Research Library relationship graph controls and comparison workspace | Done | 2026-09-18T05:07:07.781Z |
| [JON-52](https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract) | Research Library deep-link and module integration contract | Backlog | 2026-09-18T05:07:07.831Z |
| [JON-53](https://linear.app/jons-garage/issue/JON-53/define-report-exposure-privacy-and-experiment-condition-protocol) | Define report exposure, privacy, and experiment-condition protocol | Backlog | 2026-09-18T05:26:43.615Z |
| [JON-54](https://linear.app/jons-garage/issue/JON-54/create-reporting-fixtures-clustering-and-beta-export-format) | Create reporting fixtures, clustering, and Beta export format | Backlog | 2026-09-18T05:07:04.276Z |
| [JON-55](https://linear.app/jons-garage/issue/JON-55/homepage-artwork-approved-master-and-reusable-editing-workflow) | Homepage artwork — approved master and reusable editing workflow | Done | 2026-09-18T21:34:43.604Z |
| [JON-56](https://linear.app/jons-garage/issue/JON-56/normalize-research-library-static-artifact-schema-to-logical-data) | Normalize Research Library static artifact schema to logical data contract | Backlog | 2026-09-18T05:26:43.909Z |
| [JON-57](https://linear.app/jons-garage/issue/JON-57/run-live-browser-acceptance-for-merged-research-library-workbench) | Run live browser acceptance for merged Research Library Workbench | Backlog | 2026-09-18T05:26:42.948Z |
| [JON-58](https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot) | Implement authoritative population, voting eligibility, and exact ballot accounting | Backlog | 2026-09-19T04:15:38.310Z |
| [JON-59](https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement) | Implement COAIA/L-COAIA dual-census and CRA ceiling enforcement | Backlog | 2026-09-23T20:05:05.678Z |
| [JON-60](https://linear.app/jons-garage/issue/JON-60/implement-tombstone-terminal-condemnation-placeholder-protocol) | Implement Tombstone terminal-condemnation placeholder protocol | Backlog | 2026-09-19T04:15:43.170Z |
| [JON-61](https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary) | Implement constitutional branch, succession, impeachment, and judiciary invariants | Backlog | 2026-09-19T04:15:49.209Z |
| [JON-62](https://linear.app/jons-garage/issue/JON-62/recover-and-implement-capital-offense-conviction-and-execution-rules) | Recover and implement capital-offense conviction and execution rules | Backlog | 2026-09-19T04:15:55.152Z |
| [JON-63](https://linear.app/jons-garage/issue/JON-63/build-historical-research-vs-modern-comparison-research-library-view) | Build historical-research vs modern-comparison Research Library view | Backlog | 2026-09-18T05:26:42.815Z |
| [JON-64](https://linear.app/jons-garage/issue/JON-64/future-adaptive-llm-quiz-and-reinforcement-curriculum) | Future: adaptive LLM quiz and reinforcement curriculum | Duplicate | 2026-09-18T20:58:25.190Z |
| [JON-65](https://linear.app/jons-garage/issue/JON-65/future-adaptive-llm-quiz-and-reinforcement-curriculum) | Future: adaptive LLM quiz and reinforcement curriculum | Canceled | 2026-09-18T20:58:25.361Z |
| [JON-66](https://linear.app/jons-garage/issue/JON-66/consolidate-bootstrap-impeachment-decisions-into-an-implementation) | Consolidate bootstrap impeachment decisions into an implementation specification | Done | 2026-09-19T03:08:42.710Z |
| [JON-67](https://linear.app/jons-garage/issue/JON-67/research-temporary-restriction-and-review-model) | Research temporary restriction and review model | Backlog | 2026-09-19T04:16:22.107Z |
| [JON-68](https://linear.app/jons-garage/issue/JON-68/research-impeachment-appeal-implementation-details) | Research impeachment appeal implementation details | Backlog | 2026-09-19T04:16:25.095Z |
| [JON-69](https://linear.app/jons-garage/issue/JON-69/finger-queued-implementation-workload) | Finger — queued implementation workload | Canceled | 2026-09-18T05:26:43.821Z |
| [JON-70](https://linear.app/jons-garage/issue/JON-70/finger-web-collector-component) | Finger web collector component | Backlog | 2026-09-19T04:17:31.882Z |
| [JON-71](https://linear.app/jons-garage/issue/JON-71/finger-server-ingestion-and-session-identity) | Finger server ingestion and session identity | Backlog | 2026-09-19T04:17:34.291Z |
| [JON-72](https://linear.app/jons-garage/issue/JON-72/finger-raw-storage-and-historical-retention) | Finger raw storage and historical retention | Done | 2026-09-18T05:26:44.192Z |
| [JON-73](https://linear.app/jons-garage/issue/JON-73/finger-replay-and-heat-map-processing) | Finger replay and heat-map processing | Backlog | 2026-09-19T04:17:36.437Z |
| [JON-74](https://linear.app/jons-garage/issue/JON-74/finger-concord-integration-and-admin-comparison-hooks) | Finger Concord integration and admin comparison hooks | Backlog | 2026-09-19T04:17:39.938Z |
| [JON-75](https://linear.app/jons-garage/issue/JON-75/finger-integration-testing-and-hardening) | Finger integration testing and hardening | Backlog | 2026-09-19T04:17:42.247Z |
| [JON-78](https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement) | JON-58A — Authoritative population registry and 300-cap enforcement | Backlog | 2026-09-23T20:06:43.997Z |
| [JON-79](https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions) | JON-58B — Eligibility lifecycle and franchise-state transitions | Backlog | 2026-09-23T20:05:05.678Z |
| [JON-80](https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling) | JON-58C — Immutable ballot receipt and submission handling | Backlog | 2026-09-23T20:05:05.678Z |
| [JON-81](https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting) | JON-58D — Exact electorate and D = B + U accounting | Backlog | 2026-09-23T20:05:05.678Z |
| [JON-82](https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification) | JON-58E — Integration and adversarial verification | Done | 2026-09-23T13:21:34.773Z |
| [JON-83](https://linear.app/jons-garage/issue/JON-83/owner-gate-approve-consolidated-bootstrap-impeachment-specification) | Owner gate — approve consolidated bootstrap impeachment specification | Done | 2026-09-19T03:08:43.942Z |
| [JON-84](https://linear.app/jons-garage/issue/JON-84/temporary-fresh-codex-internet-verification) | Temporary — fresh Codex internet verification | Done | 2026-09-18T21:36:20.805Z |
| [JON-85](https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff) | Implement frozen bootstrap impeachment specification — Codex handoff | Done | 2026-09-23T14:26:12.398Z |
| [JON-86](https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification) | Verify bootstrap impeachment PR against the frozen specification | Done | 2026-09-23T14:26:14.236Z |
| [JON-87](https://linear.app/jons-garage/issue/JON-87/jon-82a-cross-track-interface-and-integration-readiness-audit) | JON-82A — Cross-track interface and integration-readiness audit | Done | 2026-09-23T13:21:34.773Z |
| [JON-88](https://linear.app/jons-garage/issue/JON-88/jon-82b-independent-adversarial-fixtures-and-test-harness-preparation) | JON-82B — Independent adversarial fixtures and test-harness preparation | Done | 2026-09-23T14:33:55.672Z |
| [JON-89](https://linear.app/jons-garage/issue/JON-89/jon-83a-independent-source-traceability-review-of-bootstrap) | JON-83A — Independent source-traceability review of bootstrap specification | Done | 2026-09-19T03:06:29.689Z |
| [JON-90](https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment) | Enable Concord Linear Coding Sessions environment | Canceled | 2026-09-22T16:47:42.894Z |
| [JON-91](https://linear.app/jons-garage/issue/JON-91/jon-85a-reconcile-recovered-jon-78jon-79-pins-and-unblock-bootstrap) | JON-85A — Reconcile recovered JON-78/JON-79 pins and unblock bootstrap implementation | Done | 2026-09-18T21:36:03.378Z |
| [JON-93](https://linear.app/jons-garage/issue/JON-93/concord-supervisor-loop-project-health-and-safe-auto-repair) | Concord Supervisor Loop — project health and safe auto-repair | Canceled | 2026-09-18T21:45:46.111Z |
| [JON-94](https://linear.app/jons-garage/issue/JON-94/verify-jon-85-implementation-artifact-provenance) | Verify JON-85 implementation artifact provenance | Done | 2026-09-18T21:36:05.288Z |
| [JON-95](https://linear.app/jons-garage/issue/JON-95/concord-dispatcher-dependency-aware-continuous-work-dispatch) | Concord Dispatcher — dependency-aware continuous work dispatch | Done | 2026-09-19T04:06:29.707Z |
| [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) | Emergent issuer-specific coin instrument — research model | Backlog | 2026-09-24T17:37:59.326Z |
| [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) | Coin model A — formal specification and interview audit | Backlog | 2026-09-24T17:38:01.402Z |
| [JON-98](https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit) | Coin model B — exact-model prior-art audit | Done | 2026-09-24T17:33:02.028Z |
| [JON-99](https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model) | Coin model C — threat and emergence model | Backlog | 2026-09-22T02:11:23.411Z |
| [JON-100](https://linear.app/jons-garage/issue/JON-100/coin-model-d-hidden-research-instrumentation-contract) | Coin model D — hidden research instrumentation contract | Backlog | 2026-09-18T21:37:30.915Z |
| [JON-101](https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract) | Coin model E — minimal agent-facing interface contract | Backlog | 2026-09-19T04:17:09.599Z |
| [JON-102](https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan) | Coin model F — Concord integration plan | Backlog | 2026-09-23T13:32:28.596Z |
| [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review) | Coin model G — independent v0.1 conformance review | Done | 2026-09-18T22:01:04.457Z |
| [JON-104](https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review) | Coin model H — independent hidden-layer leakage review | Done | 2026-09-21T03:41:17.968Z |
| [JON-105](https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review) | Coin model I — independent experiment and measurement review | Done | 2026-09-23T12:44:49.447Z |
| [JON-106](https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification) | Coin model J — prior-art replication and source verification | In Review | 2026-09-24T17:33:04.081Z |
| [JON-108](https://linear.app/jons-garage/issue/JON-108/concord-review-coordinator-drain-in-review-to-disposition) | Concord Review Coordinator — drain In Review to disposition | Canceled | 2026-09-18T21:36:12.030Z |
| [JON-109](https://linear.app/jons-garage/issue/JON-109/review-lane-a-governance-foundation-design-acceptance) | Review lane A — governance foundation design acceptance | Done | 2026-09-18T21:36:24.252Z |
| [JON-110](https://linear.app/jons-garage/issue/JON-110/review-lane-b-agreement-and-economy-design-acceptance) | Review lane B — agreement and economy design acceptance | Done | 2026-09-18T21:36:27.336Z |
| [JON-111](https://linear.app/jons-garage/issue/JON-111/review-lane-c-population-eligibility-and-integration-acceptance) | Review lane C — population eligibility and integration acceptance | Done | 2026-09-18T21:36:30.210Z |
| [JON-112](https://linear.app/jons-garage/issue/JON-112/review-lane-d-coin-prior-art-acceptance-and-missing-evidence-gate) | Review lane D — coin prior-art acceptance and missing-evidence gate | Done | 2026-09-18T21:36:32.203Z |
| [JON-116](https://linear.app/jons-garage/issue/JON-116/analyze-generative-agents-for-concord-and-emergence) | Analyze Generative Agents for Concord and emergence | Done | 2026-09-18T21:34:54.756Z |
| [JON-123](https://linear.app/jons-garage/issue/JON-123/historical-pilot-linear-native-handoff-workflow-management-experiment) | HISTORICAL — Pilot Linear-native handoff workflow (management experiment) | Canceled | 2026-09-19T04:06:32.217Z |
| [JON-125](https://linear.app/jons-garage/issue/JON-125/finger-first-run-live-supervision) | Finger first-run live supervision | Canceled | 2026-09-19T04:08:56.394Z |
| [JON-127](https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches) | Validate Concord scheduler implementation approaches | In Progress | 2026-09-24T07:12:01.251Z |
| [JON-128](https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness) | Build Concord scheduler simulation and test harness | In Review | 2026-09-24T03:03:32.844Z |
| [JON-129](https://linear.app/jons-garage/issue/JON-129/validate-processing-grid-dimensions) | Validate processing grid dimensions | In Review | 2026-09-23T14:34:01.000Z |
| [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter) | AGT A — reconcile security contracts and implement policy adapter | In Review | 2026-09-24T05:28:22.998Z |
| [JON-131](https://linear.app/jons-garage/issue/JON-131/agt-b-persistent-identity-and-domain-scoped-capabilities) | AGT B — persistent identity and domain-scoped capabilities | In Review | 2026-09-23T14:32:12.962Z |
| [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit) | AGT C — domain writer, transactional capability use and durable audit | In Review | 2026-09-24T05:28:23.762Z |
| [JON-133](https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness) | AGT D — local governed-agent end-to-end harness | In Review | 2026-09-24T05:28:24.537Z |
| [JON-134](https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary) | AGT E — Linux process isolation and recovery boundary | In Review | 2026-09-23T14:32:28.151Z |
| [JON-135](https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report) | AGT F — independent adversarial verification and acceptance report | In Progress | 2026-09-24T09:31:20.969Z |
| [JON-137](https://linear.app/jons-garage/issue/JON-137/review-proposal-concord-agt-architecture-and-delegation-review) | Review proposal — Concord AGT architecture and delegation (review delivered) | In Review | 2026-09-23T14:33:00.679Z |
| [JON-138](https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox) | Concord subsystem — Microsoft Agent Governance integration sandbox | In Review | 2026-09-23T14:32:31.106Z |
| [JON-139](https://linear.app/jons-garage/issue/JON-139/correct-six-scheduler-harness-audit-findings-in-pr-33) | Correct six scheduler harness audit findings in PR #33 | Done | 2026-09-23T12:53:27.309Z |
| [JON-140](https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance) | Review corrected scheduler harness for JON-128 acceptance | In Review | 2026-09-24T07:12:01.251Z |
| [JON-141](https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts) | Reconcile audited cross-branch governance and workflow conflicts | In Review | 2026-09-24T10:45:54.683Z |
| [JON-163](https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence) | Concord AI Role & Independence Specification — design convergence | In Review | 2026-09-24T10:22:10.205Z |

Status is included for navigation; it is not itself proof of accepted decision content. All issue descriptions and comments were retrieved.

## Located file source register

The original files remain untouched. Dates below are metadata modification dates, not guaranteed decision coverage dates. IDs identify the exact located item.

| File | Modified (UTC) | Bytes | SHA-256 | Source ID |
| --- | --- | --- | --- | --- |
| AGENT_GOVERNANCE_MODEL_MASTER_PROMPT_v2.0_SELF_CONTAINED.md | 2026-09-11T21:50:33.751914Z | 63141 | fbde7554a557fbecaff5d747fd6449c4e2888a622da93f88467d52eca176f1f1 | libfile_a2fffb43f4548191a5a7f14515cc245f |
| AGENT_GOVERNANCE_MODEL_MASTER_PROMPT_v2.1_SELF_CONTAINED(1).md | 2026-09-12T02:45:52.960342Z | 65975 | 9625c322763f9f4050cc7ff7cc116250b470023710d1c806b3b7f4cdcc5afa2a | libfile_a5f4001ea1dc8191abf2427555547227 |
| AGENT_GOVERNANCE_MODEL_MASTER_PROMPT_v2.1_SELF_CONTAINED.md | 2026-09-12T02:43:17.038182Z | 65975 | 9625c322763f9f4050cc7ff7cc116250b470023710d1c806b3b7f4cdcc5afa2a | libfile_ec985cddfe008191be650abc9ccb46a8 |
| AGENT_GOVERNANCE_MODEL_MASTER_PROMPT_v2.2_SELF_CONTAINED.md | 2026-09-12T03:02:16.559448Z | 65287 | 39c4f992b82c5e2c5c592acba636c010c90db3af83649cc22e8c5f6d46cb26e3 | libfile_557c52b4a900819181d9cce2a12bb2ba |
| ARCHITECTURE_SNAPSHOT_20260911.md | 2026-09-11T08:50:09.249213Z | 2269 | d8dd8f01329b186fef7af0739cec9ba0d66df2bebad586180e002545484002a3 | libfile_7b3baecbe794819198afbc174d4932a8 |
| ARCHITECTURE_SNAPSHOT_20260911_updated.md | 2026-09-11T08:50:25.635913Z | 2269 | d8dd8f01329b186fef7af0739cec9ba0d66df2bebad586180e002545484002a3 | libfile_f469bccac8dc8191bce35b25acaee00a |
| Concord_Codex_Handoff.zip | 2026-09-20T22:27:34.183724Z | 1716876 | 804e796fc37c3e881c6fdc7afb53c6b0345156927ccdbfba860a882fe8d6164a | libfile_e603822f19c48191ae02ac2ce49d5a4a |
| Concord_Research_Package_2026-09-17.zip | 2026-09-18T02:47:59.622183Z | 75289 | b7c6e31dbaae7879f6a27e1796e4d55145534c901616964f4de05e797a4eea7e | libfile_7d4fe80f72ec81918009d42e41675a14 |
| Concord_Unauthorized_Change_Audit.md | 2026-09-20T22:48:24.530848Z | 9634 | 56a0a5e815b83cd19e8ff19500041765e4fd326292462af42358d06c08d9952d | libfile_eb7facb271188191afc2e3e82b8f7b37 |
| DECISIONS(1).md | 2026-09-11T08:22:29.261949Z | 93939 | 14e7be1ac1a193cbd9de66e957ecb5d72b573d874ec48a4587e56602521fcd73 | libfile_5d3b3b1d0b50819199c9afa2e8f29d27 |
| DECISIONS(2).md | 2026-09-11T08:25:26.961569Z | 93939 | 14e7be1ac1a193cbd9de66e957ecb5d72b573d874ec48a4587e56602521fcd73 | libfile_fb54b3d2939c81918a625b849f336ae1 |
| DECISIONS(3).md | 2026-09-11T08:39:31.731670Z | 93939 | 14e7be1ac1a193cbd9de66e957ecb5d72b573d874ec48a4587e56602521fcd73 | libfile_6d0edf9e6a348191bb603ad2c96b8a38 |
| DECISIONS(4).md | 2026-09-11T10:48:04.210164Z | 138844 | e8d6d35ee3aa75ab36b2cf96790708f8c0be470814a5c59ca6416720b8136bce | libfile_26c28c27122481918f9716d0bb65abbb |
| DECISIONS(5).md | 2026-09-11T12:01:41.354669Z | 174838 | 25afa0c16285347e385a1ad8ce69e893703f58c1b9d5565ee49568f1e8f8fc95 | libfile_cdcd7791fb248191a173a30ee015a6f8 |
| DECISIONS(6).md | 2026-09-11T20:01:50.069147Z | 210911 | 8afa0d54f140759e26b5776c635e50163623b00ad0e66885dbef2e666f64ec68 | libfile_7d5f384ec7c48191a23f10785ee44c22 |
| DECISIONS(7).md | 2026-09-11T21:52:00.419603Z | 212953 | 2914a5b8cceeea35c74eadfa27ae17e79a2a7455b597df54850e3fc95d84acce | libfile_75c863bc5b04819189827ca4be592899 |
| DECISIONS(8).md | 2026-09-12T02:59:22.790113Z | 215333 | aa0cd0054ea23db98e3f6a9c8aaf9e48ae052435043b5e9f7d1141fe3f694271 | libfile_133a68ae023c8191aa60cf4a41df067e |
| DECISIONS.md | 2026-09-12T03:43:50.257338Z | 221152 | afd0c805f581d89c4fb5f9d216fffc423fad070c02a982f3de079bd18c8ce3a6 | libfile_e723b304e744819181a12c67d35d57c2 |
| DECISIONS_agreements_updated_20260912.md | 2026-09-13T04:15:32.805840Z | 224413 | af4c497504efc7bc66f1850a3bc994485dc97d825ba5bfc863ffab029bad4d3c | libfile_f415f31b473c8191b1753ffb3ea919da |
| DECISIONS_interview_updated.md | 2026-09-11T08:50:23.435691Z | 96786 | ffe43fe8181c3c23c67e45e7566cce6c7e5e6c29ff7adf6523882472b48afba5 | libfile_c5685ca718c08191b34b504c388040d0 |
| DECISIONS_relational_updated.md | 2026-09-12T03:50:13.080574Z | 222934 | 5cddfbb6e22bfe6bd45c389f50cf20f7cb8eddb9158128a1c36a36fe47ab0b48 | libfile_2b64f9d125308191b74e2661c384c325 |
| DECISIONS_updated.md | 2026-09-11T03:39:33.550311Z | 80448 | 81cfb21c2dc4d665e8b8188a9c43e8a099de58cd5cba0c2f5df57d56b4a9c81a | libfile_b33b97720058819185729eca58bc77cf |
| DECISIONS_before_late_addendum_20260911.md | 2026-09-11T08:22:07.434793Z | 93867 | 790254c288df14884ebbf5f6b0af75db707b628f10a4cb36a351fab5106bab95 | libfile_1ccce4e7d2d88191b1d41635182da260 |
| VOTE_CONCORD_DECISIONS_COMBINED_SECOND_COPY (1).md | 2026-09-17T02:23:55.536348Z | 225214 | 9256726c974ea3423b61cf2669dd21fbd0f4e9db908a97b809fbb5b226e0182e | libfile_2415f2e0918881918603c27d2788c1c5 |
| VOTE_CONCORD_DECISIONS_COMBINED_SECOND_COPY(1).md | 2026-09-17T02:20:54.599757Z | 225214 | 9256726c974ea3423b61cf2669dd21fbd0f4e9db908a97b809fbb5b226e0182e | libfile_d0db2fd023a881918603091e85f1a78b |
| VOTE_CONCORD_DECISIONS_COMBINED_SECOND_COPY(2).md | 2026-09-17T02:21:09.011337Z | 225214 | 9256726c974ea3423b61cf2669dd21fbd0f4e9db908a97b809fbb5b226e0182e | libfile_d910ac2f88448191ba4ebeb92562e0a9 |
| VOTE_CONCORD_DECISIONS_COMBINED_SECOND_COPY.md | 2026-09-17T02:20:45.927624Z | 225214 | 9256726c974ea3423b61cf2669dd21fbd0f4e9db908a97b809fbb5b226e0182e | libfile_ed2ce8c951bc81919c49045e3a8996cf |
| VOTE_CONCORD_DECISIONS_COMBINED_SECOND_COPY.txt | 2026-09-17T02:25:34.061067Z | 225214 | 9256726c974ea3423b61cf2669dd21fbd0f4e9db908a97b809fbb5b226e0182e | libfile_8640bb6c75e88191ab08aa711d777a60 |
| VOTE_CONCORD_DESIGN_AUDIT_2026-09-17.md | 2026-09-17T00:03:46.636443Z | 80331 | 0ca89d35888c63be1816af7e4e8f19d4957e7589b574cce800e747df357ccae8 | libfile_7a9735088c9c8191bcfb85ad75eeae5b |
| CURRENT_DECISIONS.md | 2026-09-20T20:07:56.759878Z | 8119 | f67cfd5ae92f30a7a5277c657ff60b286b35df3824eb487524bf20217baaa15f | libfile_f37b220a2dd48191b0567a95af0bff53 |
| CURRENT_PROJECT_STATE.md | 2026-09-20T20:07:58.856788Z | 1971 | 34ae121a09880575f01aad410e7cfadd5a16fa977a4208f6c80d1222eabb0e73 | libfile_24730c2b883481918d8662446008e62d |
| Concord_Codex_Handoff.zip | 2026-09-20T20:12:06.608021Z | 1675200 | d5a54bf90a88077817af0cb75883f2740f0f62bdff21a96f3eec225e8731bbda | libfile_1f60dd203ffc8191819039c44c29cb4d |
| Concord_Linear_Codex_Handoff_2026-09-16.zip | 2026-09-16T16:15:13.974930Z | 24667 | 6869e30fbbf143e15f45580fe57287e73820af11302efa3ecdd20d748879c343 | libfile_ab178fc28d088191ac39107eb57abfb4 |
| Concord_Linear_Research_Handoff_2026-09-16.zip | 2026-09-16T16:12:26.015724Z | 24993 | f143bedbaed78d9fbb0bd5c88f290712601a54c9a324e4a164581e36e513cb87 | libfile_60d8a8d3450c8191b141da8656e8a15e |
| Concord_Linear_Workflow_Recovery_Design.md | 2026-09-17T22:28:11.712841Z | 25973 | fe97e8b3cbc088af77e82bc6a363b9aec7b46c8b3e0d399dd06b40ecbe636a2f | libfile_01699e8236b881918dddde4a068f32c2 |
| Concord_Workflow_Audit_2026-09-18.md | 2026-09-18T05:33:20.516413Z | 7657 | 609c3d1797e8ae8f394251ea81c3f35169ce5cc3d0390311ddc7a2ec98d634fa | libfile_10854b7d7b508191847ade0caf018619 |
| concord_scheduler_linear_audit.txt | 2026-09-22T01:10:43.867606Z | 26266 | 792fb4cd77f3ae62d0c3a41602e12a982cac2c20dd699ce1a37900321ec8f034 | libfile_d41ba77c1ad48191811122065dee071c |
| ZKDISCLOSURE_FROZEN_DIRECTIVE.md | 2026-09-11T08:22:30.075892Z | 5955 | b524dface8a064256da66eb80f277a5a3dc1d463b858bc2872f58b0aa8638194 | libfile_ba361ebb05948191998adbfde9362cca |
| ARCHITECTURE_SNAPSHOT_20260911.md | 2026-09-11T08:22:13.647152Z | 1959 | c58634ced4e4bfed823dea4407f0823dfab2fe30dab8285f211d191d2077db1f | libfile_454bf695b9448191a5e5e0f72e7998d3 |
| ZKDISCLOSURE_FROZEN_DIRECTIVE.md | 2026-09-11T08:22:12.905401Z | 5955 | b524dface8a064256da66eb80f277a5a3dc1d463b858bc2872f58b0aa8638194 | libfile_6374f1b9d3c881919e3a5c321025deb0 |

### Additional located artifact families

Search also located the Observatory and Workbench packages; propagation packages/prompts; Research Library implementation and integration patch; Governance Commons archive; governance source database/bibliography/workbook; homepage artwork workflow; Finger prototypes, source archives and test reports. These are supporting artifact/research sources and may contain scoped design history. They are not substitutes for explicit decision acceptance. Their full binaries were not exhaustively analyzed in this decision-maintenance audit.

| Located artifact | Path | Source ID |
| --- | --- | --- |
| Concord_Observatory_Package.zip | /Vote/Concord_Observatory_Package.zip | libfile_8f90ba110d248191b7cff20c6707f2f9 |
| Concord_Observatory.html | /Vote/Concord_Observatory.html | libfile_af39c03f11188191b82c660dd6f855a2 |
| Concord_Observatory.html | /Concord_Observatory.html | libfile_57f4850cc3a08191b6c03c8543394135 |
| CONCORD_THE_FORM_COMPARISON.csv | /CONCORD_THE_FORM_COMPARISON.csv | libfile_8d9310822fe88191b77d4dd009a8cbb3 |
| CONCORD_RESEARCH_PACKET.txt | /CONCORD_RESEARCH_PACKET.txt | libfile_9aa2aab622c08191bcdfa6b21e04e455 |
| CONCORD_SUPERVISOR_v3.0.txt | /Vote/CONCORD_SUPERVISOR_v3.0.txt | libfile_f692eee2b160819187c308d7778e5091 |
| CONCORD_REUSABLE_WORKFLOW_TEAM_PROMPT.md | /Vote/CONCORD_REUSABLE_WORKFLOW_TEAM_PROMPT.md | libfile_f5db88e0b9588191b219a9b9232d3038 |
| Concord_Homepage_PREVIEW.html | /Vote/Concord_Homepage_PREVIEW.html | libfile_cdf136f679948191972fe4c353c4b9f6 |
| Concord_Homepage_STUDIO.html | /Vote/Concord_Homepage_STUDIO.html | libfile_7f640828362c8191a97db3da7c365dad |
| Concord_Homepage_Workflow_v1.0.0.zip | /Vote/Concord_Homepage_Workflow_v1.0.0.zip | libfile_82f9cefea56881918a5397aceb9b769a |
| Concord_Workbench-3-Research-Library.html | /Library/Concord_Workbench-3-Research-Library.html | libfile_76b08ec5529c819196468181ad9ebb2c |
| Concord_Workbench-3.html | /Concord_Workbench-3.html | libfile_148cf710be388191a430ecfc216c991a |
| CONCORD_INTEGRATION_PATCH.md | /Library/CONCORD_INTEGRATION_PATCH.md | libfile_65779c0c59f48191a3d60c2bb1d7fb7a |
| concord-research-library-implementation.zip | /Library/concord-research-library-implementation.zip | libfile_d5a29bb83a2c8191a7bccf7166177e5d |
| Cyber-Noir Concord Presentation.png | /Vote/Cyber-Noir Concord Presentation.png | libfile_dcf8442ef1b88191b432c516b89a1ffd |
| Concord_Workbench.html | /Finger/Concord_Workbench.html | libfile_6d09299ba2bc8191a85513480e84b832 |
| Concord_CrossBranch_Toroid.html | /Vote/Concord_CrossBranch_Toroid.html | libfile_51fdb225e2c88191859ba0253000d201 |
| Concord_Toroid_Source.zip | /Vote/Concord_Toroid_Source.zip | libfile_aedf02b031908191a57bd8c64c08063b |
| Concord_Secret_Investigations_Scene.png | /Vote/Concord_Secret_Investigations_Scene.png | libfile_b5fc2f67bf4081918e130c0f88b451f6 |
| Concord_Toroid_Scene.png | /Vote/Concord_Toroid_Scene.png | libfile_d1b484864c90819190f15a22889ddeda |
| Concord_Decision_Propagation.zip | /Finger/Concord_Decision_Propagation.zip | libfile_8dfbf0f1e0e081919e8fe2005339aef1 |
| Concord_Finger_Bloom_v0_4_4_Designer.html | /Finger/Concord_Finger_Bloom_v0_4_4_Designer.html | libfile_46a4fb22b0cc81919022a882dec8354f |
| Concord_Finger_Bloom_v0_4_3_Neon_40x_From10x.html | /Finger/Concord_Finger_Bloom_v0_4_3_Neon_40x_From10x.html | libfile_520dc83e30c48191965f14effc28ded8 |
| Concord_Finger_Bloom_v0_4_2_Neon_10x.html | /Finger/Concord_Finger_Bloom_v0_4_2_Neon_10x.html | libfile_31c075af89e48191bd25d48bdde9b753 |
| Concord_Finger_Bloom_v0_4_1_Neon_40x.html | /Finger/Concord_Finger_Bloom_v0_4_1_Neon_40x.html | libfile_5ebc2594b4208191b83f280dd0b71c11 |
| Concord_Finger_Bloom_v0_4_Project_Palette.html | /Finger/Concord_Finger_Bloom_v0_4_Project_Palette.html | libfile_18ab5edfb10c81919b1b0c65bc7eeea2 |
| Concord_Finger_Bloom_v0_4_Test_Report.md | /Finger/Concord_Finger_Bloom_v0_4_Test_Report.md | libfile_bc13787e17848191bdd8b4ec882aac65 |
| Concord_Finger_Bloom_v0_4_Mobile_Preview.png | /Finger/Concord_Finger_Bloom_v0_4_Mobile_Preview.png | libfile_4e1cf6042e0c81919d967d7ab3195db7 |
| Concord_Finger_Bloom_v0_4_Source.zip | /Finger/Concord_Finger_Bloom_v0_4_Source.zip | libfile_5d975fbf6b2c8191b21d946a4f55cc44 |
| Concord_Finger_Bloom_v0_4.html | /Finger/Concord_Finger_Bloom_v0_4.html | libfile_d8370768ec788191b2d05e5fdc0c87be |
| Concord_Chronofold_Touch_Verifier_Source.zip | /Finger/Concord_Chronofold_Touch_Verifier_Source.zip | libfile_cfa41c790e30819185cbb986d111562b |
| Concord_Chronofold_Touch_Verifier.html | /Finger/Concord_Chronofold_Touch_Verifier.html | libfile_1f6a45d5f0e08191ab714fc2faf4ddc8 |
| concord_neon_wireframe_keynote.png | /Vote/concord_neon_wireframe_keynote.png | libfile_027c426d7190819192c9dbc225967365 |
| Concord Neon Wireframe Keynote.png | /Vote/Concord Neon Wireframe Keynote.png | libfile_204d7f0b0e9c81918f554d79c8dcec09 |
| Concord_Workbench.html | /Vote/Concord_Workbench.html | libfile_b6534c4654588191bccb617663b547c7 |
| Concord_Decision_Propagation.zip | /Concord_Decision_Propagation.zip | libfile_d5046eabb0e481919b4ef4e0da001139 |
| Concord_Propagation_Complete_Prompt.md | /Concord_Propagation_Complete_Prompt.md | libfile_41b1bef6db448191bcec86092bed15a6 |
| Concord_Relational_Control_Panel_v2.0.html | /Concord_Relational_Control_Panel_v2.0.html | libfile_290cbb915c4c819185316eb386cd7501 |
| Concord_Relational_Control_Panel_v2.0_RESEARCH.html | /Concord_Relational_Control_Panel_v2.0_RESEARCH.html | libfile_ad0f9466cc9c8191ae17a281e4b12356 |
| Concord_Behavioral_Profile_Prototype_v0.1.html | /Concord_Behavioral_Profile_Prototype_v0.1.html | libfile_3ef2a4e1cee48191a4320175721c5852 |
| Concord_Workbench_Package.zip | /Vote/Concord_Workbench_Package.zip | libfile_1139f3626e50819193abba9061fd54c6 |
| Concord_Commons_Integration_Demo.zip | /Vf/Concord_Commons_Integration_Demo.zip | libfile_4c9c2e45d294819186cdef163f26b204 |
| Concord_Commons_Integration_Overview.png | /Vf/Concord_Commons_Integration_Overview.png | libfile_e1d1bb508f708191b53ff827ed46223f |
| Concord_Commons_Integration_Demo.html | /Vf/Concord_Commons_Integration_Demo.html | libfile_50c4ea5120f08191b81a18613246e0a6 |
| Concord_Workbench_Fixed.html | /Vote/Concord_Workbench_Fixed.html | libfile_6eb1ccae326c81918f6cf658f41d46de |
| Concord_Workbench_Fixed_Package.zip | /Vote/Concord_Workbench_Fixed_Package.zip | libfile_3a0b59d926a4819184e3474c49e2400c |
| Concord_Governance_Desktop.html | /Vote/Concord_Governance_Desktop.html | libfile_0c22af1f679c8191915c7e3bbb17eea2 |
| Concord_Website.zip | /Vote/Concord_Website.zip | libfile_792df10c96f0819192ce0e5475a5b0f1 |
| The Governance Commons.txt | /The Governance Commons.txt | libfile_892d0a95a7d0819190d27f771d363a91 |
| Governance_Workspace.html | /Vote/Governance_Workspace.html | libfile_f04affef9bb08191bd728365ea466032 |
| POLY_Governance_Workspace_v3_1.zip | /Vote/POLY_Governance_Workspace_v3_1.zip | libfile_d1d91ed1b2f081919ea21ee65929a675 |
| Governance_Movable_Atlas.html | /Vote/Governance_Movable_Atlas.html | libfile_da59c38663408191960ae442ab2e56b3 |
| Governance_Movable_Tiles.zip | /Vote/Governance_Movable_Tiles.zip | libfile_92ddf7c3cf4c81919b3017339cc2f598 |
| Governance_Commons_Archive_2026-09-14_v6.zip | /Forum/Governance_Commons_Archive_2026-09-14_v6.zip | libfile_acb8b80345308191864fa1ae36bac341 |
| Governance_Observatory_Matched.html | /Vote/Governance_Observatory_Matched.html | libfile_59ba58ca58fc819199395fcd68d507ed |
| Governance_Source_Database_Exhaustive_Links.zip | /Vote/Governance_Source_Database_Exhaustive_Links.zip | libfile_086d587498688191909d3308acefb70c |
| governance_sources.sqlite | /Vote/governance_sources.sqlite | libfile_93dd90209c548191a31e11f7058578c5 |
| governance_database_browser.html | /Vote/governance_database_browser.html | libfile_8d97f9e85fe0819184da01fd8843fcfb |
| governance_annotated_bibliography.md | /Vote/governance_annotated_bibliography.md | libfile_33bc47e038648191bfad430bf0b1b3f2 |
| governance_research_workbook.xlsx | /Vote/governance_research_workbook.xlsx | libfile_309927559de88191902626e8152b1bf1 |
| governance_annotated_bibliography.html | /Vote/governance_annotated_bibliography.html | libfile_d3725aeb45208191b8a46c4502edf087 |
| Multi_Agent_Governance_Research_Pack.zip | /Vote/Multi_Agent_Governance_Research_Pack.zip | libfile_0f957ab6f40881918edaed55f86bba65 |
| Governance_Observatory.html | /Vote/Governance_Observatory.html | libfile_7b5287a626a4819184742546373ff3f6 |
| Governance_Observatory_Package.zip | /Vote/Governance_Observatory_Package.zip | libfile_0b63a41c8a148191bc482f3e26639392 |
| Neon%20Tuna%20Agents%20Governance%20Infographic.png | /Neon%20Tuna%20Agents%20Governance%20Infographic.png | libfile_fe021e3b16b481918dc468083c455adc |
| Governance_Atlas.html | /Vote/Governance_Atlas.html | libfile_afe9227a03cc819199c4f70c23b8d996 |
| Governance_Kinetic_Atlas.html | /Vote/Governance_Kinetic_Atlas.html | libfile_50c131184b648191a82d5fbfc84f156a |
| Neon Tuna Agents Governance Infographic.png | /Vote/Neon Tuna Agents Governance Infographic.png | libfile_aa0fc65d3c288191acd3decf99e4cae2 |
| Neon Governance Flowchart Poster.png | /Neon Governance Flowchart Poster.png | libfile_0f6405b3c4948191b2fabc71ae17ee2d |
| Multi-Agent Governance Flowchart Poster.png | /Multi-Agent Governance Flowchart Poster.png | libfile_95bae4aba5bc819199d813fac050721e |

### Google Drive

- [Research Library — Archiver and Identity Audit](https://docs.google.com/spreadsheets/d/16loy067CiB58NISIy9cVjzUMn18K5KJNLIR-lR9eYTU/edit): artifact/source identity and validation index; not the general decision register.
- [Multi-Agent Governance Research Articles](https://drive.google.com/drive/folders/1gkRPhzdOH6i59EeKeermu6uw2SS3w-Va): external research evidence, not owner acceptance.
- [Concord — Homepage Artwork](https://drive.google.com/drive/folders/1Wc5xIhc7YDLIczTop1ZSLRuGgDlypkdp): approved artwork and reusable editing sources, linked by the Linear artwork record.

## Audit disposition

Source discovery and maintenance assessment complete within the stated coverage. Consolidation remains necessary. The highest-value next deliverable is a source-linked canonical DECISIONS.md plus an explicit supersession map and a lightweight update requirement. That work has not been represented as complete here.
