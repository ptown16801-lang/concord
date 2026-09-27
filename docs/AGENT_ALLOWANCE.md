# Agent spending and task limits

## Current owner-approved rules — September 25, 2026

This section supersedes the historical custom-admission requirements below for
ordinary authorized agent work. Source: [owner acceptance](decisions/evidence/OWNER-SIMPLE-SPENDING-20260925.md), CON-093.

- Use included subscription access and existing provider billing controls.
- No purchases, refills, auto-top-ups, upgrades, paid API fallback or billing-setting changes without a specific owner approval. Existing paid credits are not subscription capacity.
- When included access runs out or billing mode is unclear, stop that provider and report; do not silently switch to paid use.
- Keep a bounded task and cumulative retry history. Twice expected effort is a planning checkpoint; stop repeated failures and reassess. It is not an exact subscription or dollar meter.
- Only the owner may approve an exception after being asked. Record the exact task, amount, action, expiry and actual human approval. Other agents cannot override the money rule; a one-case exception never authorizes recurring refills or a general paid fallback.

Custom ledger admission, percentage cutoffs, fresh cross-provider telemetry and
protected-launcher installation are **deferred**, not prerequisites for ordinary
authorized development. Existing logs, unknowns and reservations remain evidence;
do not reset them or manufacture complete usage totals. No daemon, new budget
system or automatic exception mechanism is needed. Role, worktree, permission and
independent-review requirements remain unchanged.

Claude controls are owner-reported complete; Grok no-card status is owner-reported.
No account settings were checked or changed for this simplification. Rules are not
tamper-proof enforcement, and no account-wide hard cap is claimed.

## Historical deferred prototype — not current operating instructions

The following design and numeric defaults are preserved for provenance only. Do
not run its initialization commands or treat its gates as current launch requirements.

Implementation source: [Linear advice](https://linear.app/jons-garage/issue/JON-163#comment-190666bd-3c29-45e4-a7ff-92922100ad62), followed by the owner's instruction to implement its changes. This is a tested admission/accounting component with owner-delegated numeric defaults, not an account-wide spend limiter, a provider credential service or an unattended dispatcher.

`scripts/agent-allowance.mjs` provides transactional reserve/settle/repair operations using built-in Node SQLite. Use one durable database for the existing objective outside disposable worktrees; never initialize a new database to bypass exhausted capacity. No caller may launch before successful reservation. Current operational provider launch integration is **not activated**. Direct commands for any agent, manual chats, other computers and processes outside this gate are not controlled.

The owner delegated sensible parameter selection and then explicitly extended the policy to ALL agents. `config/agent-allowance.json` freezes ONE expected workload of $3 API-list-price equivalent and ONE total ceiling of $6 across ChatGPT, Codex, Claude, Grok, Gemini and all roles, research, children, retries and reviews. Provider entries reference the same pool; they are not additive budgets. Normal work shares $3; repairs share the remaining $3. Unknown agents are denied until registered against that same pool. Each run has a $0.50 maximum estimate with $0.10 reserved for overshoot, ten-minute duration and twelve-turn setting. Repair authorization expires in one hour, with one targeted correction per defect and at least $0.25 withheld for separate reassessment. Policy expires after seven days without resetting accounting; this scope extension preserves the original expiry and objective. These dollar figures are workload estimates, not billing or subscription capacity.

Provider subscription readings are a separate unit: basis points used, fresh within five minutes. Stop admission at 65% used in any required window. Configured candidate windows are Claude session/week and Grok week; OpenAI/Gemini windows remain unknown and block admission rather than inventing telemetry. All provider integrations still need verification. This is an admission buffer, not proof that an in-flight request cannot cross it. History retains prior Claude estimate 2,507,169 microdollars; unknown ChatGPT/Codex, Grok and Gemini history is not treated as zero. Any unreconciled history blocks the shared pool. `config/agent-allowance.pending.json` is preserved as the earlier unconfigured template. Supported provider integration and independent review are still required before live enforcement. Neither dollar estimates nor local tests prove account-wide protection.

Default additional spending is always $0. No agent or repair draw may enable credits, refills, top-ups, upgrades, paid overages or API/PAYG fallback. The owner retains separately verified case-by-case override authority (exact task, amount, action and expiry); the component does not authenticate human consent or implement paid execution. Ordinary task approval and model-labelled approval records are insufficient. No override has been requested or granted here.

Historical prototype examples — DO NOT RUN as ordinary operating instructions (INPUT files contain receipts, never credentials):

```sh
node scripts/agent-allowance.mjs /durable/path/objective.sqlite init config/agent-allowance.pending.json
node scripts/agent-allowance.mjs /durable/path/objective.sqlite status
node scripts/agent-allowance.mjs /durable/path/objective.sqlite reserve request-and-reading.json
node scripts/agent-allowance.mjs /durable/path/objective.sqlite settle observed-result.json
node scripts/agent-allowance.mjs /durable/path/objective.sqlite repair authorized-repair.json
```

The module API defines the JSON fields. Reserve takes `{request, reading}`, settle takes `{id,result}`. No reset, policy-update, automatic renewal or reservation-expiry release command is provided. Policy changes need a separately authorized migration preserving the ledger; none is implemented. SQLite serializes concurrent admission. This first implementation permits only one outstanding run for the objective, so concurrency cannot double-spend headroom. A crash or unknown actual consumption retains the full reservation until evidence-backed settlement. A missing database cannot be recreated by `reserve` as a funded objective.

Repairs require checkpoint, reproducible defect evidence, exact starting revision, hypothesis, minimal increment, validation plan, expiry and recorded approval. One draw per stable defect/hypothesis; all draws count against cumulative repair capacity, even if unused or expired. Reassessment capacity is withheld from Builder work. The current component does not dispatch that reassessment or attest reviewer eligibility. Stop on no progress, reservation overshoot, changed boundaries or expired authority. Scope revision includes acceptance, cost, access, security and authority assumptions. Keep providers' units separate inside the same objective ledger. Day/week rollovers and renamed issues do not erase cumulative history.

## Trust and limits

The gate validates structured inputs, not the truth of a human identity or provider attestation. Calling an input approver “ChatGPT” does not authenticate an approval. Agents must not have write access to the operational policy, database or approval inbox; deployment needs a separately protected operator boundary. Same-user filesystem access can bypass this library. No installed OS boundary or authenticated approval transport is claimed. SQLite audit events are append-only through this API, not cryptographically tamper-proof.

Actual usage may exceed estimates due to in-flight operations; the configured overshoot margin is reserved and any overrun blocks further work. Provider-side extra usage and top-ups must remain disabled. This gate cannot stop an already running provider request, and it cannot prove account-wide spending protection. The offline launcher now exercises deadlines and reservation retention with local fixtures; native provider controls and live Claude integration still require qualification, reliable readings and the approved protected boundary. See [launcher status](MANAGED_AGENT_LAUNCHER.md). Subscription protection must not be represented as working merely because these tests pass.

Validation: `node --test test/agent-allowance.test.js`. Tests use invented units, explicit test-only approvals and local SQLite; no model requests or billing occur.

Historical decision impact: the original prototype added CON-093. The later owner-approved simplification updates that existing decision's implementation, not a second policy. Implementation remains a candidate; JON-163 draft OD-1–OD-4 are not adopted. No merge/deployment authorization inferred.

Current evidence guidance: [AGENT_EVIDENCE.md](AGENT_EVIDENCE.md). Partial reports cannot establish complete usage; they do not impose the historical custom-admission gate on ordinary work. Preserve role, permission and independent-review requirements.
