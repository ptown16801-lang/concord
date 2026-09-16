# Project identification and dispatch checks

This package checks a reviewed project profile and assignment against a fresh observation packet. It exits successfully only when required evidence agrees. It never launches agents, changes Linear, merges code, or installs credentials.

Build and improve this reusable workflow without identifying the next project. Identify each project before assigning work on its code. An unidentified or blocked assignment must not stop unrelated work with satisfied prerequisites.

## Usage

```sh
node qa/dispatch/dispatch-gate.mjs \
  --profile /path/to/project-profile.json \
  --assignment /path/to/assignment.json \
  --observed /path/to/fresh-observations.json
node --test qa/dispatch/dispatch-gate.test.mjs
```

The command writes a machine-readable ready/blocked report. A nonzero exit means the coordinator must not dispatch that assignment. The nullable files in `templates/` deliberately fail closed; they are not pre-authorized jobs. `profiles/concord-native.json` preserves verified identities and explicitly unresolved environment values. It is deliberately **not ready**.

## Evidence and enforcement boundary

The validator checks consistency of supplied evidence, not its authenticity. An authorized coordinator must obtain current Linear/GitHub/runtime observations, review the packet, invoke the checker immediately before dispatch, and honor its result. A person able to forge every input can forge a ready result. This package is not a security boundary or an installed Linear interceptor. No runtime lock, billing cap, atomic reservation, or automatic enforcement is claimed.

Repository identity/permissions must come from the selected provider connection; the executing worker's network, Git checkout, runtime, and source access must be checked separately. A runtime or GitHub success in this ChatGPT session does not certify a Linear-native environment. Snapshot timestamps do not replace refreshing the underlying evidence. Do not renew `checkedAt` without rereading affected sources. If the scheduling queue can change concurrently, reserve ownership using the execution provider and recheck before launching; this checker alone cannot eliminate that race.

## Profile and assignment contract

| Packet | Required contents |
| --- | --- |
| Profile | Stable workspace/team/project IDs; repository ID and owner/name; project directory; profile version; authorized base branch and full commit; selected runtime name/version and environment identity; source IDs/revisions; mandatory permission and gate IDs; maximum observation age. |
| Assignment | Unique ID, profile ID/version, owner, permitted paths, deliverables, acceptance criteria, required permission names, required gate IDs, source IDs, dependency commit pins, and explicit authorization reference. |
| Observations | Capture timestamp and matching profile version, actual identity/base/runtime/environment, verified runtime/environment flags, permissions, current source revisions, accepted and published dependency pins with acceptanceEvidenceId/publicationEvidenceId for true flags, active assignments, attributable authorization records, and gate evidence. |

Profile/runtime values are explicit and contain no Concord fallback. Another project may select another runtime. Paths are repository-relative, normalized, and restricted lexically to the profile directory. The runner must additionally enforce real filesystem containment, including symlinks, before writing. IDs are case-sensitive. Exact runtime versions deliberately require refreshing observations when the selected runtime changes; the coordinator resolves a project's compatibility range before recording the selected version.

Store evidence references, not secrets. Resolve empty/unknown values from authoritative records. Resolve conflicts using established source precedence. Ask the owner only when the target remains genuinely ambiguous or an account-level action is required. Reuse established authorization rather than asking again.

Reuse a profile while stable fields remain valid. Refresh changed repository mapping, base, environment, permissions, relevant source revisions, dependencies, and active work. Bind each assignment to the checked profile version and base commit. Increment profile version when its contents change; do not silently move a pinned base. Check the union of profile and assignment required gates/permissions, plus the assignment's dependencies; unrelated blocked work must not become a global stop.

## Concord-specific evidence and boundaries

`profiles/concord-native.json` is a reviewed, incomplete native-execution profile from September 16, 2026. Its repository and Linear IDs were read from their providers. Its saved native environment ID and exact saved runtime are unresolved and remain null. Do not copy the local runtime into those fields. Follow the runtime requirement in the profile notes when selecting and verifying the actual native runtime.

JON-90 is the sole native workflow/environment acceptance gate. Its PR #5 demonstrates native delivery and compatible Node 22/24 execution, but the saved environment default still needs evidence. The Concord native profile mandates `JON-90` in its `requiredGates`; assignment-level omissions cannot remove it. Provide actual gate evidence. JON-84 remains informational. The local execution path used to develop this package is distinct and does not complete JON-90.

`concord-recovery-candidates.json` records the five published recovery commits. Every `accepted` field is false because publication and passing isolated CI do not prove acceptance or integration. This inventory is not an observation packet and is never an automatic dependency approval. Keep the original recovery branches/commits intact and record any follow-up PR's new commit explicitly.

Preserve Finger's completed deployable-beta milestone. Preserve existing active tasks. A stopped or completed task with an unaccepted artifact is not an invitation to start another copy. A source link inaccessible to the worker must be supplemented by an exact versioned source body through an authorized handoff; do not infer its contents.

## Review and CI

`npm test` discovers the dispatch tests. The repository workflow also explicitly runs `qa/jon58/validate-fixtures.mjs` when that fixture directory is present. An existing fixture directory without its validator is a failure, not a silent skip. When absent, CI clearly reports it was not run. Passing fixture validation still does not claim production adapters or integration passed.

Before implementation dispatch, retain the ready report and its exact input versions. After work, retain the delivered branch/PR, tested commit, commands/results, independent review, remaining blockers, and current Linear checkpoint. Completion requires the assignment's own acceptance evidence, not a status label or another issue's completion.
