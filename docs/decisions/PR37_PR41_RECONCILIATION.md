# PR37 / PR41 reconciliation — September 24, 2026

Decision impact: No decision change

Owner instruction: “Reconcile and make the repairs.” This session prepares one
isolated review candidate; existing PR37 and PR41 heads are preserved. No merge to
Develo, deployment, independent acceptance or expansion of coin runtime scope follows.

## Inputs and cause

- PR37 runtime aggregate: `6cf4eab09836d42d4b83a7fc1862442fdc38c3ff`.
- PR41 decision consolidation: `3d8d8a0a0fa531e15c993f5125b2e0e5c4c1df77`.
- Live Develo: `29ca0b44cf8d911df6978e84c7a91e7777afd304`.
- Shared merge base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.

An isolated git merge-tree reproduced content conflicts in package.json, CI,
PROJECT_RECORD.md and README.md. CHANGELOG.md auto-merged. README already conflicted
between PR37 and live Develo after PR17 added the marketplace link. There are no
unrelated histories to bridge. Linear corrected its contrary claim in
[the audit](https://linear.app/jons-garage/issue/JON-96#comment-0a73e5e3-f183-4042-a23b-28c6f7c5e1fc).
Individual branch CI and the live-base preflight did not test the combined tree.

## Resolution

- Preserve PR37 package exports, expanded checks, governance scripts, dependencies,
  overrides and lockfile; add all four PR41 decision-maintenance scripts.
- Preserve Node22/24 matrix and fail-fast setting; run dependency installation,
  decision checks and PR disposition validation before the existing checks/tests.
- Retain PR37 README's reference partition, runtime library instructions and holds;
  add canonical decision routing and the accepted marketplace link.
- Use PR41 project-record routing, adding PR37 provenance and historical reference
  links. Preserve original historical snapshots, master and generated summary bytes.
- Preserve all runtime source, runtime tests, integration pins and all PR41 evidence.
  No accepted policy changed and no source snapshot rewritten.

Choosing one entire side would drop valid checks, scripts or documentation. A
history-rewriting bridge would solve no demonstrated problem. This candidate uses
a history-preserving merge and explicit resolution instead.

PR41's disposition validator also rejects PR37's former description because it
lacked a Decision impact line. Add the truthful no-decision-change disposition to
that existing PR; this does not change its approval or implementation status.

## Validation and remaining gates

Validation results are reported in the publication receipt / PR description for the
exact committed head. Author tests are not qualifying independent approval. PR41's
consolidation review and PR37's existing runtime/review limitations remain open.
No host isolation recertification, experiment or product rollout is claimed.

This receipt supersedes the separate-branch integration status only for this repair
candidate. Earlier PR41 receipts and source snapshots remain historical evidence;
Develo is still the designated integration destination. Review this candidate against
PR37; do not merge PR41's content a second time or repeat accepted coin reviews.

## Author validation receipt

Combined Node 22.23.2 and Node 24.21.0 suites each pass 201/201 runner entries
outside the tool sandbox. Syntax/API and pinned export checks pass on both versions.
Decision validation passes (64 entries, 257 sources); generated summary is unchanged.
Runtime source, AGT tests, lockfile and pins match PR37; master and frozen evidence
match PR41 exactly. Whitespace check and live Develo preflight pass.

Initial sandboxed full-suite attempts reported three file-level failures in runtime
preflight, artifact-manifest and HTTP tests; those attempts are retained as failed
evidence, not reported as passing. Focused direct tests passed 21/21, and complete
ordinary-user runs outside the tool sandbox then passed on both Node versions.
The precise sandbox interference was not isolated; no application change was made
to hide those failures. Host-isolation recertification is outside this repair.
