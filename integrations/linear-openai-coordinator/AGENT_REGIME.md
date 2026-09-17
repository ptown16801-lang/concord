# Coordinator child-agent regime

## Status and factual baseline

This is the activation design for the isolated Linear → OpenAI coordinator. It extends the bridge preserved in draft PR #13; it does not authorize a second coordinator, a coding runtime, quiz work, destructive issue operations, or automatic rollout. Repository code can prepare the service, but Vercel deployment, paid OpenAI access, Linear OAuth approval, and secret provisioning remain owner-controlled external actions.

The baseline implementation receives signed `AgentSessionEvent` webhooks, fetches the current issue from Linear before project authorization, uses OpenAI Responses function calls, and exposes only issue reads, current-project listing, planning-field updates, comments, planning child creation, and owner elicitation. Tool calls are sequential. The service has no merge, billing, credential, delete, archive, cancel, assignment, or coding-dispatch tool.

The term **child agent** below means a short-lived, read-only OpenAI advisory call inside one coordinator assignment. A Linear child issue is only a planning record and is never evidence that an execution agent was launched.

## Architecture

```text
Linear AgentSessionEvent
        │ signed body + freshness check
        ▼
Ingress and project authorization
        │ stable event identity
        ▼
Durable assignment gate ── duplicate ──► reuse terminal state / do no work
        │ first claim
        ▼
Read-only advisors (sequential, bounded, no tools or credentials)
        │ reports are untrusted recommendations
        ▼
Accountable coordinator (one Responses tool loop)
        │ proposed function call
        ▼
Policy + target-project guard
        │ allowed mutation
        ▼
Linear GraphQL executor (the only writer)
        │
        ├──► AgentActivity response or owner elicitation
        └──► structured lifecycle telemetry + terminal assignment state
```

There is one deployed bridge and one accountable coordinator per assignment. Advisors are internal specialists, not independently addressable Linear actors. They run sequentially before the coordinator, cannot recurse, and cannot call Linear or each other. The coordinator must independently verify their claims before using them.

## Responsibilities

| Role | Responsibility | Explicitly cannot |
| --- | --- | --- |
| Ingress | Verify HMAC and timestamp; accept supported session actions; require a stable assignment identity | Interpret project content or mutate Linear |
| Assignment gate | Admit one run per webhook/activity identity; preserve terminal state for replay suppression | Store prompt/response content or decide work |
| Context reconciler | Identify authoritative facts, conflicts, missing evidence, and completed artifacts | Use tools, mutate state, or make owner decisions |
| Work-breakdown advisor | Suggest planning, research, or review records when decomposition materially helps | Assign a writer, dispatch coding, create issues, or produce quiz work |
| Boundary reviewer | Flag authorization, duplication, destructive-action, dispatch, quiz, and escalation risks | Approve its own exceptions or override policy |
| Accountable coordinator | Choose the final response and permitted planning mutations; reconcile advisor reports | Delegate accountability, execute code, or exceed exposed tools |
| Policy/executor | Validate operation category and target project; perform allowed GraphQL calls sequentially | Infer intent or expand OAuth/tool scope |
| Owner | Resolve decisions not established by authoritative project material; approve external activation | Implicitly approve a decision merely by assigning an issue |

The default advisors are `context_reconciler` and `boundary_reviewer`. `work_breakdown_advisor` is optional because decomposition is not useful for every assignment. At most three known roles can be configured. Unknown roles fail the run rather than becoming general-purpose agents.

## Coordination and delegation boundaries

One Linear `created` event or owner `prompted` activity is one assignment. Its stable `webhookId` is preferred; the session ID is a safe fallback for creation and the activity ID for a follow-up. An event without a stable identity is rejected. The durable `NX` claim ensures a replay cannot start a second set of model calls. Terminal states are retained without storing project content.

Advisors receive only the current issue snapshot and Linear-supplied prompt context needed for their bounded review. They receive neither the Linear OAuth token nor OpenAI/Linear secrets and have no function tools. Their output is labeled untrusted when passed to the coordinator. Advisor failure fails the assignment safely; the coordinator does not continue with a silently missing required review.

Only the coordinator can propose tool calls, and only the server executor can perform them. All target issue reads and mutations are re-fetched and required to match the authoritative current issue's project ID. The configured project-name allowlist is an additional gate and fails closed when absent. Child creation requires a server-validated `work_kind` of `planning`, `research`, or `review`. Quiz text is rejected on every mutation path. Coding dispatch is structurally unavailable because no assignment, delegation, repository, shell, or coding-session tool is exposed.

The single-writer rule refers to mutation authority, not prose generation: advisors may recommend, but the coordinator is accountable for the choice and the bridge's Linear app actor is the only writer. `parallel_tool_calls: false` and sequential execution preserve an auditable mutation order. Existing issues and completed artifacts should be read and reused before a child record is proposed.

Owner elicitation is a terminal assignment outcome. It is permitted only when an actual decision remains after authoritative issue/project material and advisor conflicts are reconciled. The question must identify the unresolved choice and why it cannot safely be inferred. The owner response arrives as a new `prompted` assignment.

## Authorization model

Authorization is layered and every layer must pass:

1. **Transport:** exact raw-body HMAC verification and a 60-second webhook freshness window.
2. **Event:** supported `AgentSessionEvent` action plus a stable assignment identity.
3. **Application:** per-run Linear `client_credentials` token using the configured private app; no token is sent to a model.
4. **Project:** authoritative issue re-fetch, required `AGENT_ALLOWED_PROJECTS` match, then project-ID equality for every target issue.
5. **Role:** advisors have no tools; the coordinator sees only the fixed tool schema; the executor owns credentials and mutations.
6. **Operation:** allowlisted planning operations and fields only; planning/research/review child records only; no quiz content.

The requested Linear OAuth scopes (`read,write,app:assignable,app:mentionable`) are broader than the bridge's actual mutation surface. Least privilege is therefore enforced again in code through the fixed GraphQL documents and tool dispatcher. Adding a tool, GraphQL mutation, advisor role, project, or OAuth scope is a reviewed code/config change, not a prompt change.

## Assignment lifecycle

| State | Entry | Exit |
| --- | --- | --- |
| Received | Signature, freshness, action, and stable identity pass | Claim attempt |
| Duplicate | Lock or terminal record already exists | Stop without model calls or another activity |
| Running | Durable first-writer claim succeeds | Rejected, awaiting owner, completed, or failed |
| Rejected | Project authorization fails | Terminal record retained |
| Awaiting owner | Coordinator uses the dedicated elicitation tool | Terminal record retained; owner reply is a new assignment |
| Completed | Final Linear activity succeeds | Terminal record retained |
| Failed | Any required advisor, API, policy, or activity operation fails | Error activity when possible; terminal record retained |

The store deliberately does not automatically replay a failed or interrupted event because a Linear mutation may have succeeded before the failure became visible. A new explicit owner prompt is the recovery mechanism. This favors duplicate prevention over unattended retry. Retention defaults to seven days and is configurable, with a one-hour minimum.

## Failure handling and observability

Failures are contained at the smallest boundary:

- invalid signatures, stale requests, unsupported events, and unstable assignment identities never reach a model;
- unavailable assignment storage fails before Linear or OpenAI work begins;
- an unauthorized project emits an error and performs no planning mutation;
- advisor failure prevents coordinator execution;
- rejected tool calls return a bounded error to the coordinator without widening authority;
- coordinator/API failure emits a safe Linear error when possible and records a terminal failure;
- an error while emitting the Linear error is logged without recursively retrying.

Logs are structured JSON with event name, severity, timestamps, assignment/session/issue/project identifiers, role or tool name, state, status, and duration where relevant. The logger allowlists metadata fields and excludes prompts, issue bodies, advisor reports, tool arguments/results, response text, tokens, and secrets. Expected events include assignment start/reuse/completion/failure, advisor start/completion, tool start/completion, and error-activity failure.

Operators should alert on repeated signature/freshness failures, assignment-store failures, unauthorized-project attempts, advisor/API failure rate, long assignment duration, and terminal failures without a later owner prompt. Exact thresholds depend on observed traffic and are an activation decision; this design does not invent them.

## Activation and validation gates

Before production use, the owner must:

1. Deploy this directory as its own Vercel project/root.
2. Provision the OpenAI API key and confirm the selected model is available to the account.
3. Create and authorize the private Linear OAuth app with Agent Session Events, `authorization_code` + `client_credentials`, the documented scopes, and Concord team access.
4. Provision the Redis REST store used by the assignment gate and set an appropriate retention policy.
5. Add all secrets directly to Vercel, keep `AGENT_ALLOWED_PROJECTS=Concord`, and confirm `/api/health` reports configured with no missing variables.
6. Verify logs contain lifecycle metadata but no project content or credentials.
7. Delegate one low-risk Concord planning issue. Confirm one delivery produces one run, replay the same webhook to confirm suppression, prompt once to confirm a new assignment, and attempt an out-of-project target, coding dispatch, destructive operation, and quiz mutation to confirm each fails closed.

No repository change can complete the account, billing, OAuth-consent, secret, or live-deployment steps. Production activation should stop if any gate is unavailable.

## References

- Existing bridge artifact: [draft PR #13](https://github.com/ptown16801-lang/concord/pull/13), inspected at head `d464722ac55e3a0d4cec6d0ccb6801f4a7663122`.
- OpenAI function calling: [official guide](https://platform.openai.com/docs/guides/function-calling). The implementation follows the documented Responses function-call/output loop and uses strict tool schemas; application code remains responsible for authorization and tool execution.
