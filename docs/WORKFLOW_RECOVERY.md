# Workflow recovery — 2026-09-27

The owner authorized repairs after the workflow audit in chat
01a0e481-208c-7d81-9596-0251d0dab632. No temporary registrations were pruned and
no existing source or dirty evidence was removed. The app worktree tool failed
with "Git is unavailable"; ordinary Git created the repair/recovery checkouts.

Stable recovered paths on this host (detached historical snapshots):

| Purpose | Path | Base |
| --- | --- | --- |
| Setup guidance | `/home/cornholio/projects/concord/.concord-recovery/guidance` | `8225c4774c73761c763bf0c883d4ebeb469a12dd` |
| Historical setup fixture | `/home/cornholio/projects/concord/.concord-recovery/setup-fixture` | `5c64c9297aa2606592aaf1d3ac662729394b92f9` |
| Decision consolidation | `/home/cornholio/projects/concord/.concord-recovery/decisions` | `6676c9f5a1e02e12f8c0c1cdbea5392b5e74e73f` |
| JON-135 review | `/home/cornholio/projects/concord/.concord-recovery/jon135` | `1731602de02cef6fb0228f155202beeed844c295` plus retained review patch |

Every recovered HEAD was verified. The JON-135 patch passed `git apply --check`
and was applied only to its matching recovered base; four historical trailing
blank-line warnings were retained, not silently repaired. Its original review
commit is unavailable here; reconstruction does not recreate that original commit
or establish current acceptance. No recovered runtime or provider was launched.

The complete-history Git bundle, copied review patch and SHA-256 manifest are at
`/home/cornholio/.codex/visualizations/2026/09/27/01a0e481-208c-7d81-9596-0251d0dab632/`.
The bundle passed `git bundle verify`. Keep it outside disposable worktrees.
The original local-only review evidence and save states remain untouched.

Current repairs are in `/home/cornholio/projects/concord/.concord-worktrees/workflow-repair`,
branch `codex/workflow-repair`, based on Develo `4b6e41fd8d211746a81e870955e34475e66d02a3`.
Do not resume old role/launcher instructions from recovered snapshots. Use the
current AGENTS.md, owner task scope and source precedence before any continuation.
The recovery copies are evidence, not active dispatch or a new integration writer.
