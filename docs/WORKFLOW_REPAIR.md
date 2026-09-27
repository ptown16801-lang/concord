# Workflow repair receipt — 2026-09-27

Objective: address the eight findings in the owner's workflow audit, using native
GitHub controls and preserving existing work. Owner instruction: “lets address them
all right now”, followed by the preference for a standard system, in chat
01a0e481-208c-7d81-9596-0251d0dab632. Exact message timestamps unavailable.

Decision impact: Updated CON-070, CON-074, CON-093

This reconciles existing owner decisions and observed integration/configuration;
it does not adopt CON-071, change spending authority or supply independent acceptance.

## Owned scope and exclusions

Local Codex author owns this isolated repair branch's instructions, decision-source
reconciliation, GitHub packet workflow/tests, Node launcher, validation routing and
receipts. No application source, dormant enforcement code, database, provider login,
host security policy, global instruction file or billing setting was changed.
The main checkout's prior dirty files remain untouched. No agent was dispatched.
Exact runtime model identifier/complete usage unavailable; evidence is producer
checking, not independent review. All prior attempt/usage uncertainty is retained.

## Findings addressed

- F1: role entry points now defer to the September 26 four-role boundary. Claude
  builder/Grok-primary-reviewer assignments are explicitly superseded. Optional
  provider advice requires separate compatible authority; no fallback or launch.
- F2/F4: packet comparisons use immutable base/head SHAs. Old events and mid-build
  head/base/text changes stop publication. Only exact bot-owned packets are updated;
  quoted human markers and duplicate packets do not select an overwrite target.
- F3: CI evidence carries sampled time, check IDs/links and revision identity.
  Test-workflow completion and PR edits refresh the snapshot. Manual refresh handles
  coalesced pending runs; reviewers must still check current revisions/live checks.
- F5: live native GitHub ruleset 23790153 now requires both existing Node check
  contexts from GitHub Actions app 15368, an up-to-date branch and resolved review
  threads. Existing PR/deletion/non-fast-forward/no-bypass controls remain. With one
  human collaborator, approval count stays zero; no custom approval service added.
- F6: selected guidance/importer and CON-093 source records from reviewed candidate
  8225c47 are reconciled into this reviewable repair branch. No dormant prototype
  code/config is imported. Later role changes need their own eligible review.
- F7: native visible terminal/tool output replaces the unavailable watcher requirement.
  `bash scripts/with-node.sh` chooses an installed supported Node without installs or
  shell-profile changes. Missing global AGENTS is recorded accurately, not recreated.
- F8: missing temporary candidates reconstructed in stable detached recovery paths;
  complete-history Git bundle verified; JON-135 patch restored to its exact base.
  See [recovery routing](WORKFLOW_RECOVERY.md). Old registrations/evidence preserved.

## Producer checks and retained failures

- Node 22.23.2 and 24.21.0: full suite 47/47 PASS on each, zero skips. Includes
  fourteen workflow regression cases plus the existing thirty-three tests.
- `npm run check`: PASS. `python3 -B test/claude-usage.test.py`: 5/5 PASS.
- `decisions:generate`, `decisions:check`, `decisions:test`: PASS. Reconciled master
  contains 66 decisions and 268 immutable source records; summary matches.
- Both workflow YAML files parsed with local PyYAML. Exact embedded workflow
  JavaScript was exercised with in-memory API fixtures, never an actual provider.
- Node launcher: works with the session's Node-free PATH, supports explicit Node 22,
  and correctly rejects CONCORD_NODE=/bin/false without silently falling back.
- Git whitespace check passed on the repair candidate. Recovered historical review
  patch retains four original trailing-blank-line warnings; it was not rewritten.
- GitHub initial ruleset PUT returned 422 for an incorrect field spelling and changed
  nothing. Corrected PUT and independent GET/readback confirmed native rules above.
- App-managed worktree creation failed “Git is unavailable”; Git CLI fallback used
  with normal permission escalation. No global isolation bypass or daemon installed.

## Synchronization and acceptance

Base Develo: 4b6e41fd8d211746a81e870955e34475e66d02a3, live-checked before repair.
Branch: codex/workflow-repair. Resolve the final revision from Git/PR, not a
self-referential embedded hash. Committed/pushed state is reported in the completion
receipt; this source file is not evidence of a future successful command.

Native rules are installed and read back. Source/workflow changes are a candidate
until reviewed and merged. Workflow-run/manual-refresh behavior requires the updated
workflow on the default branch; local tests do not claim that default-branch delivery.
The owner retains acceptance and merge authority. No production merge/deployment or
qualifying independent review was performed in this author session.

Required review: a non-authoring reviewer must inspect the exact final diff, validate
CON-070 lineage/consequence eligibility, rerun authorized local tests, and return a
finding-level verdict. Do not count these producer checks as that review. Any external
packet needs explicit selection/redaction authority; none has been sent to a provider.

## Rollback

Git changes are isolated in the repair branch. Preserve later edits before reverting
any owned file. The audit artifact directory contains ruleset-before/proposed/after
JSON, recovery bundle, review patch and hash manifest. To undo only the rule additions,
first compare current rules against the saved after-state, then restore the original
native parameters under owner authority; do not replace later settings blindly.
Recovered directories are evidence; do not prune/delete them merely for tidiness.
