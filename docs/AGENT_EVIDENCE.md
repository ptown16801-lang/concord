# Agent evidence correctness — Concord-wide

Later owner simplification (CON-093): incomplete usage remains UNKNOWN and cannot
prove complete accounting, but is not a blanket blocker for ordinary authorized
subscription use. Custom allowance admission is deferred. Required authority,
safe authentication, permissions and independent evidence still control their
respective actions. See AGENT_ALLOWANCE.md for current operating rules.

Applies to every Concord agent, provider, role, child, research/review pass and retry. This implements existing CON-093 and the owner's 2026-09-25 request to apply relevant Claude-audit fixes project-wide. It does not change role assignments, independent-review gates, money boundaries or the shared allowance.

If we cannot read how much an agent consumed, record “we do not know,” not “nothing was used.” Apply this across Concord; preserve each agent’s assigned role and model requirements.

## Missing evidence is not zero

- Missing, null, malformed, unreadable, stale or unavailable required usage/permission evidence is UNKNOWN. Only an explicit validated observation can establish zero. No records found does not establish no usage.
- Preserve observed totals separately from estimates, reservations and unknown amounts. If a required component is unknown, do not present a partial sum as a complete total.
- Mark incomplete coverage: excluded worktrees, nested/child agents, other sessions/devices, deleted logs and manual task attribution. A project-name match is a discovery heuristic, not verified objective membership.
- A partial local report cannot establish full subscription/account usage. Retain historical reservations for crashed/interrupted prototype runs; do not invent settlement. Full telemetry and custom admission are deferred, not ordinary-work prerequisites. Missing task authority, unclear billing mode or unsafe permissions still block the affected action.
- Never reset history by changing provider, session, task/issue ID or checkout. Link observations and all retries to the same stable objective and existing allowance; no additional per-provider budget is created.

## Minimum contribution / attempt receipt

Retain objective/task ID and attribution basis (how the session/run belongs to that objective), authoritative issue/revision and artifact/base revision, agent/provider/model and session identity, role and relevant prior contribution, owned paths, actual local preflight results, enabled tools/permissions, checks and outcomes, failures/retries/omissions, uncertainty and evidence locations. Preserve unknown fields explicitly.

Record usage categories in native units, separating uncached input, cache creation, cache reads and output when available. Do not invent cross-provider conversions or subscription percentages. A successful process exit is not proof of measured usage, independent acceptance or entitlement.

## Efficient evidence without weakening correctness

Perform mechanical preflight locally before invoking another model. Pass only relevant authoritative evidence and required instructions; do not trim away independence, security, authority or acceptance criteria. Preserve objective-evidence-first ordering. Record model and tools explicitly under the agent's existing role rules; no universal model downgrade is authorized. Cache reuse does not excuse stale evidence.

## Truthful status

Distinguish adopted instructions, tested code, installed local configuration, active enforcement, independent review and measured efficiency gains. Instructions alone are not enforcement. Local deployment does not update other hosts or already-running sessions. No background collector, paid execution, new agent, dispatcher, merge or deployment follows from this document.

Linear advisory basis: https://linear.app/jons-garage/issue/JON-163#comment-c15c4188-ffe2-4a72-aaa9-f4719b35477b and shared-allowance advice https://linear.app/jons-garage/issue/JON-163#comment-190666bd-3c29-45e4-a7ff-92922100ad62. The policy-only consistency response is not source-code validation or qualifying independent approval.

Implementation evidence: shared allowance rejects missing/stale readings and unknown settlement amounts; offline launcher retains unknown-usage reservations. Claude collector reports missing counters as null and fails unavailable source directories, but remains partial/manual. No account-wide hard cap is claimed.
