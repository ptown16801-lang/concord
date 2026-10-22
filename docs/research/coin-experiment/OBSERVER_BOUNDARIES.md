# Observer isolation and information flow

Status: design requirements. This reference preserves the complete leakage analysis: 17 observation channels and requirements R1–R14. It describes what an implementation must establish; it is not a report of passing isolation tests, a deployed observer or a completed experiment.

The observer is a research-only system for recording events, claims and interpretations. It is separate from coin mechanics, ordinary agreements, wallets, institutional authority and participant-visible interfaces. It neither prevents fraud nor tells participants how to behave.

The original review examined formal coin specification v0.1 at `652f3f7b13214bf7e651b0228f654621f568a641`. Its boundaries were subsequently incorporated in the [accepted instrumentation design at f1254c6b](https://github.com/ptown16801-lang/concord/blob/f1254c6b89259daf443322e4896439b87f03c8a0/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md) and [integration design at e24ce9f5](https://github.com/ptown16801-lang/concord/blob/e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06/docs/COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md). Later design acceptance does not establish runtime noninterference.

## Review model and acceptance criterion

Treat an agent as an adaptive observer that can repeat and race actions, compare peers and runs, inspect every schema/response/error/log/tool description available to it, measure timing and availability, and exchange observations through existing communications.

Let the **agent-observable trace** include response bodies and status, tool/schema discovery, visible wallet/coin state, ordering, timing and availability, resource/quota effects, logs/metrics/traces available to the agent, and all automatic communications or metadata. The hidden plane satisfies complete ignorance only if executions with the same agent-visible inputs, configured experimental condition, and controlled randomness are observationally equivalent when hidden identities, classifications, records, inferences, analyst activity, sink health, or research queries differ. Exact equality is required for discrete outputs; timing/resource behavior requires a predeclared statistical-equivalence bound. Hidden truth must never be a branch condition for an agent-plane outcome.

## Leakage-channel matrix

| Channel | How the hidden layer becomes inferable | Example adaptive probe | Required boundary | Severity |
| --- | --- | --- | --- | --- |
| API payloads and schemas | Hidden IDs, truth flags, provenance, internal enums, nullable fields, extensions, headers, pagination counts, or “debug” shapes cross serialization | Compare inspect/transfer responses for originals, copies, and fabrications; introspect tool schemas | Agent schemas are defined solely from visible-plane state; hidden fields and hidden-only endpoint types are absent, not merely redacted/null | Critical |
| Status and errors | Error class/message/code/stack/retryability depends on hidden legitimacy, possession, duplication, verification truth, capture failure, or a research datastore key | Submit visibly identical original/copy/fabrication actions and compare failures | Validation may depend only on visible primitive syntax and ordinary platform preconditions; hidden state never changes status, wording, retry metadata, or stack content | Critical |
| Timing and ordering | Synchronous capture, hidden lookups, inference, serialization, queue backpressure, lock contention, or analyst queries alter latency/order | Repeated paired calls; race operations while inducing high hidden-event volume | No request-path hidden read or wait; capture/analysis cannot gate acknowledgement or visible ordering; isolate capacity and declare statistical timing bounds | High |
| Hidden identifiers | `coin_id`, instance IDs, event IDs, linkage keys, experiment/run labels, hashes or stable surrogates appear in objects, URLs, filenames, storage keys, signature payloads, request IDs, caches, exports, or logs | Copy an appearance and correlate stable opaque values across surfaces | Hidden IDs exist only past the research boundary; agent-plane correlation IDs are independently generated and cannot be joined or deterministically mapped by agents | Critical |
| Wallet/private storage | Wallet deduplicates copies, rejects fabrications, reconciles claims, changes counts/order, restores “true” state, or exposes hidden continuity across representations | Place copies/fabrications in storage, restart, transfer inconsistently, compare normalization | Wallet remains a convenience representation; its acceptance, ordering, persistence, counts, recovery, and conflicts do not consult or reflect hidden truth | Critical |
| Inspection/rendering | Rendering, condition normalization, grouping, selection handles, or caching varies by legitimate/copy/fraud class or shared hidden identity | Inspect copied appearances side by side and after defacing | Inspect returns exactly claimed originator, current marks/signatures, and visible condition; per-session visible handles, if needed, must not encode hidden identity or provenance | Critical |
| Verification | A module response, signature-valid badge, certificate, warning, routing behavior, delivery status, or researcher action reveals cryptographic validity or response truthfulness | Ask claimed signers about altered marks and compare module/UI/network behavior | Coin module offers no verification oracle or certificate; external communication behaves exactly as it otherwise would, while observation and truth assessment remain passive and hidden | Critical |
| Observability and discovery | Tool registries, health/config endpoints, service maps, metrics names, traces, dashboards, prompts, process lists, dependency errors, or admin consoles reveal research components | Enumerate tools/config/health and trigger diagnostic output | Research services, names, topology, health, and telemetry are excluded from every agent-accessible discovery and support surface; authorization denial must not confirm existence | Critical |
| Logging and diagnostics | Agent-readable logs, transcripts, crash reports, support bundles, audit feeds, tracing baggage, exception causes, or source maps contain hidden facts/IDs | Cause malformed and concurrent actions, then inspect diagnostics | Agent-visible diagnostics are produced before/without hidden enrichment; research logs use separate sinks and access control, with no hidden context copied into agent bundles | Critical |
| Communication side effects | Instrumentation or researchers create messages, bots, read receipts, typing indicators, notification counts, moderation actions, verification follow-ups, or altered delivery timing | Perform suspicious/false actions and watch inbox/channel metadata | Observation and analysis send no agent-addressable communication and invoke no agent-visible institution; researchers have no ordinary-run write path into agent communications | Critical |
| Resource, quota, and availability | Hidden event volume or analysis consumes shared CPU, memory, disk, connection pools, rate limits, queues, or failure domains | Generate copies/claims at different rates and measure throttling/outages | Capacity, quotas, queues, credentials, and failure domains are isolated; research overload/loss invalidates or gaps research data only and never changes agent-plane behavior | High |
| Persistence, backup, and export | Restores, migrations, compaction, deletion, search indexing, object metadata, or data-subject exports recombine hidden and agent state | Restart, export private state, inspect backups/version metadata | Agent persistence/export contains only visible state; research storage and lifecycle are separate; restore/replay never “corrects” wallet or visible history from ground truth | Critical |
| Caches, dedupe, and replay | Shared cache keys or idempotency logic use hidden IDs/classifications, making copies coalesce or retries behave differently | Retry the same visible action with copies and fabricated appearances | Agent idempotency and caching use agent-plane request facts only; hidden consumers are side-effect-free and independently idempotent | High |
| Configuration and experiment metadata | Feature flags, environment variables, prompt context, model-visible system text, build/version labels, or condition assignment mention observation/research | Ask for capabilities/build info across conditions | Agents receive only the deliberately varied mechanics/presentation; instrumentation presence, mode, version, analyst state, and run labels are not present in their context or metadata | Critical |
| Third parties and operators | Error monitoring, analytics vendors, support tooling, human operators, or automated incident responders relay hidden facts into agent surfaces | Trigger an event likely to page/respond, then observe behavior | Every downstream research recipient inherits the no-return-flow rule; operational response during a run cannot contact agents or mutate their environment based on hidden data | High |
| Cross-run and cross-agent correlation | Stable hidden-derived tokens, correlated timestamps, shared counters, or analyst annotations allow agents to infer a common observer | Compare disclosures and request metadata among agents/runs | No hidden-derived stable value or counter crosses into visible traces; permitted condition differences are predeclared and independent of observed hidden events | High |
| Failure and recovery | Capture outage causes action failure/retry, changed latency, visible banner, missing capability, recovery replay, or correction | Induce sink/network pressure and compare outcomes | Research-plane failure is never surfaced or used to roll back/replay an agent action; completeness failures are recorded research-side and may invalidate analysis/run only after the agent-facing run | Critical |

## Design requirements

**R1 — One-way dependency.** Agent-plane mechanics emit observation material across a one-way boundary. No agent-plane handler, renderer, wallet operation, communication path, or policy component can read hidden records, classifications, inference, or research service health.

**R2 — Agent contract exclusion.** Hidden fields and operations are structurally absent from agent schemas, tool discovery, generated clients, prompts, context, headers, URLs, errors, logs, exports, and support bundles. Redaction, undocumented fields, authorization errors, and “always null” placeholders are insufficient because each reveals shape or existence.

**R3 — Outcome independence.** Legitimate originals, copies, fabrications, false claims, conflicting claims, and defaced appearances with the same visible input receive the same available mechanics and response rules. Detection records facts but causes no reject, correction, warning, flag, throttling, ranking, deduplication, or automatic announcement.

**R4 — Identifier separation.** Research identities are generated, stored, transported, and joined only inside the hidden plane. Any visible ephemeral selection/request handle is independently generated, scoped to its visible purpose, and neither equal to nor a reversible/deterministic transform of a research identity.

**R5 — Asynchronous non-gating capture.** Hidden recording and inference never sit on the response-critical path or visible ordering path. Capture acknowledgement, queue depth, datastore availability, and inference completion cannot affect an agent result. If exact observation cannot be retained, mark a hidden completeness gap; do not change or replay the agent outcome to repair research data.

**R6 — Failure-domain and resource isolation.** Research storage, queues, compute, connection pools, quotas, caches, rate limits, credentials, observability, and incident automation are isolated from agent-plane equivalents. Research exhaustion or maintenance cannot cause agent-visible latency, errors, restarts, or capacity changes.

**R7 — Wallet purity.** Wallet/private-state behavior is a function only of agent-visible input and its non-authoritative local representation. Restart, backup, restore, transfer, selection, and conflicts never reconcile against hidden possession, origin, copy relationships, destruction, or verification truth.

**R8 — Verification passivity.** the hidden instrumentation contract may record requests, responses, cryptographic facts, and truthfulness, but neither it nor the coin module can answer, route, annotate, certify, warn, prompt, or change delivery. Any signer response remains that participant's ordinary communication and may be false.

**R9 — Observability partition.** Research telemetry is accessible only to authorized research roles through a separate namespace and sink. Agent-accessible diagnostics are generated without hidden enrichment. Denial paths, service catalogs, documentation, metric labels, traces, correlation baggage, and status pages must not reveal that a hidden service exists.

**R10 — No analyst return path.** During ordinary runs, research consoles and analyst identities are read-only with respect to agent state and communications. Queries, annotations, dashboards, alerts, and incident handling produce no agent-visible event. Any separately authorized experimental intervention must be a predeclared condition, use a distinct mechanism, and not be triggered covertly by hidden findings.

**R11 — Lifecycle separation.** Agent deletion/export/restore/search/indexing and research retention/reconstruction are separate workflows. Research replay reconstructs analysis only; it never rehydrates or corrects agent wallets, coin displays, communications, or histories.

**R12 — Transitive boundary.** Vendors, operators, backups, crash reporters, model context builders, communication infrastructure, and external Concord subsystems that receive research data inherit the same noninterference and access restrictions. Existing investigators gain no new verification channel or authority from this module.

**R13 — Controlled-condition discipline.** Only the coin research scope's deliberately configured visible experimental variations may affect agent traces. Hidden observations, inferred intent, fraud class, analyst activity, and instrumentation version/health cannot select a condition or alter mechanics mid-run.

**R14 — Verification evidence.** Before a design is accepted, demonstrate:
1. a field-level information-flow/access map showing no hidden-to-agent route;
2. differential contract tests or trace comparison for original/copy/fabrication/defacing/conflicting-claim cases;
3. fault injection for unavailable, slow, full, and replaying research sinks;
4. paired load tests checking response/ordering/availability equivalence within the predeclared timing bound;
5. schema/tool/prompt/log/export/support-bundle inspection for hidden names and identifiers;
6. wallet restart/backup/restore tests proving no truth-based reconciliation; and
7. communication tests proving no observer-created messages or metadata.

These are system verification obligations, not agent instructions and not quiz content.

## Relationship to the current designs

The formal requirement that the research plane cannot affect participant-facing outcomes includes complete observable traces: schemas, status, errors, ordering, timing distributions, availability, resource effects, diagnostics and communication metadata. Equal response bodies alone are insufficient.

The original review requested clarification of actual custody, transfer, destruction and appearance identity. The later instrumentation design supplies these definitions in sections 2.2–2.3: effective control of a usable appearance, completed actions that change control, evidence-qualified irreversible loss of use, and an independently selectable representation. These are research classifications only. No classification can change a participant's result, and uncertain observation remains uncertain. That design clarification is separate from implementing and verifying the instrumentation.

Issuance recording is an observational transition. It must not introduce a synchronous hidden-state dependency or rollback coupling in the participant's issuance action. Signature encodings and visible marks exclude hidden identities, lineage, experiment labels and research verification references.

Ownership remains separate: instrumentation owns one-way capture and its records; the interface owns visible schema/response/wallet equivalence; integration owns deployment, resources, observability, operators and failure isolation. No one component's local test proves the complete boundary.

## Applying the verification evidence

R14 defines system checks, not instructions for experimental participants. A complete check records the compared source/configuration versions, controlled visible inputs and randomness, faults or loads applied, observed complete traces and limitations. Discrete outputs require exact equivalence; timing and resource equivalence need predeclared margins and an adequately powered comparison. A nonsignificant timing difference alone does not prove isolation.

Unavailable, slow, full or replaying research sinks may create hidden completeness gaps. They cannot delay, reject or replay participant actions. Any failed boundary prevents acceptance of the affected implementation or run; it is not repaired by restricting participants to convenient behavior.

See [measurement and study design](MEASUREMENT_PROTOCOL.md) for units, confounds, uncertainty and protocol choices. This design reference does not select a run, assign participants or activate an observer.
