# Concord Claude efficiency — v3, simplified 2026-09-25

> Later owner-approved correction: [simple spending rules](AGENT_ALLOWANCE.md) and
> CON-093 supersede the custom launcher integration priority and complete-telemetry
> prerequisites below for ordinary authorized subscription work. Retain focused
> context, task-appropriate model selection, receipts and unknown usage. The prototype
> remains deferred/disabled; role, permission and independent-review gates remain.

Applies to all Concord Claude work, all checkouts, retries and task IDs. Owner requested implementation after the usage audit. These operating instructions supplement CON-093; they do not activate the allowance launcher, change role assignments or waive independent review.

## Current implementation and next step

The September 26 four-role instruction in AGENTS.md and CON-070 controls: local Codex is the only code author, a separate qualifying local Codex session verifies, and Grok supplies advisory packet review. Earlier Claude-builder assignments are historical. Claude has no standing launch authority; any separately authorized advisory task must remain non-authoring. The observed Claude runs were setup verification and a fixture retry; they do not establish a recurring per-task cost. Reuse that setup evidence unless a relevant dependency changes.

The custom managed launcher is an offline prototype and is deferred. It is not the next implementation priority or a prerequisite for separately authorized non-authoring Claude advice. Use native subscription authentication and supported permission controls, a bounded task in an isolated worktree, and an attributable receipt. Reuse the metadata collector when useful; do not start a telemetry project merely to run a task.

Verify subscription rather than paid API execution and stop the affected provider if included access is unavailable or billing mode is unclear. Missing historical usage stays unknown, not a blanket blocker. Task authority, role eligibility, supported permissions and independent review still apply. This document does not authorize a new task, unattended execution or activation of the prototype.

Inspect existing context evidence before removing required information or tools. Preserve the authoritative Linear issue, objective repository/test evidence and specialist independence. Prefer concise instructions and existing native controls; do not build custom spending infrastructure.

## Before invoking Claude

1. Codex performs mechanical work locally: repository/path checks, deterministic tests and fixture plumbing. Claude has no standing workflow lane; explicit compatible advisory scope is required. Record the escalation reason, acceptance criteria and bounded owner authority; a model preference is not launch authority.
2. Verify the actual checkout/base, dirty state, owned paths, file access and exact test executable locally. Verify native permission patterns against the installed CLI documentation before the first permitted tool use. Preserve sandbox boundaries. Test a harmless local fixture when permission plumbing is uncertain; do not spend a Claude turn discovering an already observable local failure.
3. Prepare one focused task packet: stable objective ID, relevant issue/revision, acceptance criteria, owned paths, current diff/failure evidence, relevant decision IDs/excerpts and source links, required reviewer/lineage conditions, observed local preflight results and intended checks. Read required project instructions. Do not paste whole decision histories, issue comment threads or logs by default. Required authority and independent evidence take precedence over reducing size; fetch changed/missing evidence selectively.
4. Name the model explicitly in each launch and receipt and choose it for the specialist task. Opus may be appropriate for difficult reasoning or a required specialist/model assignment. A smaller model is an option only when it can satisfy the authorized task and role requirements. Record the rationale; do not automatically downgrade an escalation to Sonnet or Haiku, change a mandated model, or select an unavailable model silently.
5. Inventory required tools. Use the minimum task-specific native tools and MCP servers with supported CLI configuration; preserve permission/denial rules. Do not remove global connections or disable required tools to save tokens. Record the effective tool set. Use `/context` to diagnose baseline overhead when available; do not start an extra paid/model turn just to measure it.
6. Retain related work in its existing session where appropriate, keeping stable instructions/tool configuration. Clear unrelated work; compact long continuing work. Neither a fresh session nor an issue rename resets allowance. Do not disable working prompt caching.
7. Follow AGENT_ALLOWANCE.md's current rules: subscription-only access, no billing-setting changes or extra spending without specific owner approval, cumulative retries and twice-expected-effort planning checkpoints. Custom admission and full telemetry are deferred; this checklist supplies no new task authority.

## Receipts and cumulative accounting

After every attempt, including denied writes, failures, retries and interrupted runs, record objective ID, session/model, tools, preflight result, outcome, evidence and separately: uncached input, cache creation, cache reads and output. Distinguish missing usage from zero. Link all attempts to the SAME existing objective allowance and original setup receipts; retain Codex, research and independent-review consumption/unknowns. Successful completion is a disposition, never a reset.

Use the dependency-free importer without invoking Claude:

```sh
python3 scripts/claude-usage.py --ledger /home/cornholio/.local/share/concord/claude-usage.sqlite
```

The importer accumulates metadata from Concord-named local project logs, deduplicates request IDs within a session and retains observations after source logs disappear. Its SQLite store is a usage evidence attachment to the existing shared allowance, NOT a second budget or provider attestation. Link sessions to objective/task receipts before using them to settle the existing allowance. Non-Concord-named worktrees must be reconciled explicitly; missing history remains UNKNOWN. Never turn raw cached-token totals into subscription percentages or claim savings without comparable completed-task measurements.

## Adoption and validation

Owner instruction in the 2026-09-25 usage-audit conversation: “Tempernet these going forward for Claude brought all of Concord.” Interpreted in context as implementation of the five preceding recommendations throughout Concord. That interpretation was stated before implementation. Exact message timestamp unavailable.

Baseline: four JON-163 setup sessions, 22 model requests, 251,866 cache-write tokens, roughly 1.26M cache-read tokens, all Opus. The first requests carried 42–46k input tokens. Cache was working; no evidence supports disabling it. Retry/tool-output overhead and oversized task context were observed; exact baseline context attribution is still unknown.

Status: adopted operating instructions plus locally tested partial metadata importer. No protected launcher integration, account-wide hard cap, independent review, publication or measured savings is implied. Prototype code is retained but deferred; its activation requirements are not ordinary-work requirements. No Claude inference is needed to update these instructions.

Sources checked 2026-09-25:
- https://code.claude.com/docs/en/costs
- https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code
- https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching

## Correctness audit — 2026-09-25

The collector is explicitly PARTIAL: top-level Concord-named log directories only, excluding nested subagent logs. Project-name matching is a discovery heuristic, not authoritative project identity. Missing counters are reported as null/UNKNOWN; an unavailable source directory raises an error, and no observed requests means unknown totals rather than zero. Existing legacy records must be reconciled with original logs before settlement because earlier imports defaulted omitted counters to zero. Manual task attribution and missing history block any claim of complete allowance accounting.

Focused context must preserve the current authoritative Linear issue and objective repository/test evidence before or alongside Codex narrative. A curated packet alone cannot establish independent evidence or replace required fresh authority checks. The model preference grants neither a new Claude invocation nor provider/model qualification.

Installed operating instructions apply to future local sessions that load them; existing running sessions and other hosts are not automatically updated. Preflight, model choice and tool minimization remain instructed practice, not executable admission enforcement. No measured savings or independent implementation approval is claimed.

Linear advisory response: https://linear.app/jons-garage/issue/JON-163#comment-c15c4188-ffe2-4a72-aaa9-f4719b35477b (2026-09-25). Practices were found consistent with accepted rules, with these required clarifications: receipts explicitly retain preflight results, selected model, enabled tools and the basis linking observed sessions to the objective; unavailable required evidence, usage data or permission state blocks the dependent invocation, never implies compliance. Partial logs and manual attribution are labeled incomplete. This was a policy-only review, not source-code validation, enforcement verification or proof of savings.

All Concord agents must follow [shared evidence correctness](AGENT_EVIDENCE.md): unknown is not zero and partial reports cannot establish complete usage. Retain attribution, preflight, model/tools and uncertainty. Role, permission and independent-review requirements remain; full telemetry is not required for ordinary authorized work.

## Revision history

v3 implements OWNER-SIMPLE-SPENDING-20260925: simple operating rules and provider controls replace the custom launcher/telemetry prerequisite. The earlier v2 implementation priority below is historical, not an active instruction.

v1 adopted the initial efficiency recommendations and retained the observed usage baseline and failed evidence. v2 follows the owner's request to update project files after inspection of the actual implementation: task-appropriate specialist model selection supersedes the generic Sonnet-default wording; reuse setup evidence; diagnose starting context before trimming required evidence; prioritize the existing launcher’s Claude integration, subject to its unchanged activation requirements. Unknown usage still means “we do not know,” never “nothing was used.” No allowance, role or paid-use boundary changed. Exact owner-message timestamp unavailable.
