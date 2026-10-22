# Evidence snapshot: Concord artifact archive

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `c9186ee587e57d0c370a4e7c2eb31dc54dadc236`; original SHA-256: `d283a9caddba0b2743dfef73a1b0a91c7102c2e96ca400fcee75426423036a3b`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T13:27:00.962Z
- Source date: 2026-09-23T13:27:00.962Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Published review candidate — September 23, 2026

Following Linear's advisory guidance, published draft PR ptown16801-lang/concord#32 (private source reference withheld) at `e7462d860d5c4a17d7d1f6283bc25f23ebf3716a`. This supersedes the earlier local-only delivery status. The diff remains five files; runnable synthetic manifest and generated four-outcome report are included in the usage document. All 30 tests passed locally on Node 22.23.2 and 24.21.0, and all four GitHub push/PR CI jobs passed on Node 22/24. Linear confirmed bounded criteria are satisfied and recommended reviewer sign-off; an actual diff review has been requested in the issue thread. Keep the candidate draft-only pending review; full archive delivery remains unfinished. No concurrent subsystem files were changed.

## Local coding slice delivered for review — September 23, 2026

Implemented a dependency-free, read-only artifact manifest library and CLI. It validates IDs/provenance/location/hash/delivery metadata, streams local SHA-256 checks, reports verified/mismatch/unavailable/error per artifact, and keeps recorded delivery claims separate from byte verification. Rejects traversal, escaped symlinks and non-files. No remote fetching or uploads.

* Local checkout: `/tmp/concord-jon28-artifact-manifest`
* Local branch: `codex/jon-28-artifact-manifest`
* Commit: `a8980574b2e786f70138020c6c248340fbba1c14`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* Five files: `src/archive/artifact-manifest.js`, `scripts/verify-artifact-manifest.js`, `test/artifact-manifest.test.js`, `docs/ARTIFACT_MANIFEST.md`, `CHANGELOG.md`.
* Node 24.21.0: all 30 tests passed (7 new); repository syntax checks, both new source syntax checks, and whitespace checks passed. Tests required execution outside the sandbox for subprocess stdout and local HTTP listeners.
* Isolated checkout is clean. Shared Concord checkout and concurrent work were not modified by this task. No package/dependency changes.

This is a local commit, not a pushed branch or PR. In Review refers to this bounded slice; full archive delivery remains unfinished. The verifier needs an operator-controlled stable directory and does not certify historical provenance, remote upload success, or hostile concurrent filesystem safety. Usage and schema are in `docs/ARTIFACT_MANIFEST.md`.

## Selected local coding slice — September 23, 2026

Owner requested an unrelated Concord coding task after checking concurrent work. Codex is implementing a standalone, read-only artifact-manifest verifier in an isolated checkout based on `40f647e5b8d23307f713fc3a3753a1d3a46611cb`. Scope: validate reference-artifact metadata, stream SHA-256 verification of local files, and distinguish verified/mismatched/missing bytes from recorded delivery status. No uploads, Workbench reconstruction, scientific corpus copying, authoritative publication, or changes to scheduler/AGT/Finger work.

Exclusive paths: `src/archive/artifact-manifest.js`, `scripts/verify-artifact-manifest.js`, `test/artifact-manifest.test.js`, `docs/ARTIFACT_MANIFEST.md`, and an isolated-branch changelog entry. Checked Concord Linear issues, JON-28 (private source reference withheld) comments/relations, open GitHub PRs, and the dirty local checkout. Existing concurrent work: JON-127 (private source reference withheld)/128 scheduler, JON-129 (private source reference withheld) Finger grid validation, JON-130 (private source reference withheld)–138 AGT sandbox/review. This slice does not complete the full archive delivery issue. Current owner authorization applies to this slice only.

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Project ownership correction — 2026-09-16 Eastern

**Concord → Archive & Records subsystem.** Vote is only a folder. This original issue owns artifact preservation inside Concord; the former standalone Archive project is retired. Backlog/Queued and existing blockers are preserved, not promoted. No coding, deployment, worker launch or quiz work is authorized by this organizational move. Research Library GOV/PDF ownership remains separate at subsystem level under JON-26 (private source reference withheld).

---

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Artifact index and preservation contract. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own reference artifact identity, hashes, provenance, canonical locations and retention/delivery-status metadata. JON-18 (private source reference withheld) owns authoritative governance publication; JON-55 (private source reference withheld)'s completed artwork archive is reused unchanged. Do not copy the Research Library scientific PDF corpus. Source or transfer gaps affect only the particular artifact; no upload or source-recovery execution is authorized by the design assignment.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Current audit checkpoint — 2026-09-16

Preserve the artifact index and existing work. The earlier signed-upload connectivity failure below describes the runtime used for that attempt; it is not evidence of a current workspace-wide outage. Before an authorized future transfer, verify the exact artifact, permitted destination, current access and transport. Preparation alone is not delivery. An approval denial is a separate constraint and must not be bypassed through another transport. This update performs no binary upload and does not change the queue.

Store the current Concord HTML and generated project documents in Linear as attached reference artifacts. Use this issue as the canonical attachment index for migrated files.

## Recorded implementation evidence — historical

Artifact/index work has started. Concord and Research Library documents, issue links, hashes, Drive references, and implementation checkpoints are being preserved in Linear. Direct upload of large generated artifacts has also been attempted through Linear's signed-upload flow.

## Last recorded transport blocker — historical observation

The runtime can obtain a valid Linear signed upload request, but cannot reach the signed `storage.googleapis.com` PUT endpoint. Therefore the current merged Workbench HTML/ZIP cannot honestly be represented as a successfully attached Linear binary from this runtime.

Until binary transport is available:

* keep artifact filenames, SHA-256 digests, canonical external storage links, issue/document references, and verification results in Linear;
* do not duplicate the scientific-PDF corpus here—Google Drive remains the Research Library's canonical PDF store;
* do not mark a prepared-but-not-PUT upload as a completed attachment;
* retry large binary attachment only when the signed PUT transport is reachable.

Current status is Backlog / queued within Concord's Archive & Records subsystem. The former Archive project record is retired; its existing work remains held/design-only. Historical preservation attempts do not authorize a fresh run or establish completion.
