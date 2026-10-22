# Evidence snapshot: Proposal for review — Concord AGT integration and bounded delegation

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `ebd5a2562ffa660ad601bd0652a31e5addc88dab`; original SHA-256: `7254ff90809ed2705a58bc7a32c0aa8f0d8a136c842444c2f805aba099e9d5a1`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T14:33:04.644Z
- Source date: 2026-09-23T14:33:04.644Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Proposal or historical reference; only explicitly marked owner decisions are accepted
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current disposition — September 23, 2026

This proposal is preserved as the reviewed design snapshot. JON-137 (private source reference withheld) contains two delivered Linear advisory reviews and the owner's subsequent “Implement changes” instruction. The initial draft-only/no-implementation wording below records the proposal's original authorization; later bounded sandbox authorization is now recorded on JON-138 (private source reference withheld)/JON-130 (private source reference withheld)–135. Continue through those existing issues and JON-141 (private source reference withheld)'s sole integration writer. JON-135 (private source reference withheld) independent acceptance remains pending. This update does not authorize broader production work or Linear Coding Sessions.

## Original proposal and review scope

# Proposal: AGT integration for Concord — review draft

## Authority and purpose

Owner request, September 23, 2026: “Can you create a proposal and send it to linear agent for review.”

This authorizes creation and a bounded Linear-agent design review only. No coding, installation, repository changes, implementation dispatch, further delegation, merges, deployment, or global hold release is authorized. JON-130 (private source reference withheld)–135 were created prematurely during the earlier planning exchange; they are proposed work packages, not approved execution orders. Leave those issues parked and their delegates unset. Linear Coding Sessions are not needed or authorized for this review.

## Goal

Design a local Node.js workflow in which authenticated agents can execute permitted tools, unauthorized actions cannot reach protected stores, and admission, decisions and outcomes remain reconstructable. Start with synthetic domains and deterministic tool calls, then separately demonstrate actual Linux process isolation. No hosted HTTP server or model API is required for the initial harness.

## Observed foundation and evidence limits

The inspected checkout contains Node.js 22+ JavaScript, a native HTTP server and Finger-specific SQLite/file-object persistence. It is not the full governance runtime.

Earlier authorized installation added @microsoft/agent-governance-sdk 5.0.0 and a scoped js-yaml 5.4.2 override. package.json, package-lock.json and CHANGELOG.md are local uncommitted changes above 40f647e5b8d23307f713fc3a3753a1d3a46611cb. A future implementation handoff must preserve and deliver those changes; a remote reviewer must not assume access to them. Session evidence reports zero npm audit findings, passing SDK import/YAML allow-deny checks, syntax checks and 23 existing regression tests. These establish installation, not integration, OS isolation or production security. Review may evaluate these reported results without running code.

Reuse the completed designs in JON-17 (private source reference withheld) / PR ptown16801-lang/concord#19 (private source reference withheld) (49c19837191b83e93844653f7bf6259ee838d3ef) and JON-15 (private source reference withheld) / PR ptown16801-lang/concord#15 (private source reference withheld) (1e86688cc2ed45b174d675d353c47b96c8d5bbec). Their Done status must not be interpreted as a deployed runtime. JON-35 (private source reference withheld) controls admitted-operation revocation semantics. JON-18 (private source reference withheld) owns Archivist/publication contracts. No completed design should be reopened or duplicated.

## Proposed architecture

Agent process → institutional gateway → authorized mediator → domain-local authorization using AGT → dedicated domain read/writer service → authoritative store.

AGT evaluates configured policy; Concord supplies authenticated identity, institutional authority, domain invariants and transaction rules. AGT allow is necessary but insufficient on its own. Linux permissions and isolated service credentials establish the non-bypassable storage boundary. AGT trust scoring cannot grant political or institutional authority.

A request binds stable actor identity, operation ID, domain/audience, action/resource, canonical argument digest, expected versions, admission authority evidence and policy generation. Untrusted request fields cannot provide authority. Unknown actions, invalid credentials, incompatible policy state and unavailable required authority deny before effects.

Capability validation, one-use consumption, version check, state mutation and commit audit/outbox evidence must be coordinated transactionally. Retries must not duplicate effects. Denial/admission records and execution outcomes have explicit persistence/failure rules; hash chains alone do not prove protection against privileged rewriting.

JON-35 (private source reference withheld): revocation blocks new admission but does not cancel an already lawfully admitted operation. Once approved, an action must be carried out; no party may cancel it. Permission expiry after admission likewise does not prevent the approved action from completing. These rules do not waive the operation’s original admitted scope, expected-version/transactional conditions, domain invariants, or other validity checks.

Keep protected domains and investigatory archives separate. Keep Finger behavioral data, security audit and public publication distinct. JON-18 (private source reference withheld)'s Archivist remains sole public-ledger publisher; this proposal does not create a competing publication authority.

## Owner design decisions

* **Cancellation:** A lawfully admitted action cannot be canceled and must be carried out. Revocation affects future admissions only.
* **Permission expiry:** Expiry after lawful admission does not prevent the admitted action from completing.
* **Audit collector outage:** Secure local audit storage alone is insufficient to execute while the audit collector is unavailable. Preserve the pending action durably, pause it until the collector is available, then resume without duplicate execution. Any technical conflict with this behavior must be reported rather than silently changing the rule.

## Proposed work packages — not execution authorization

| Stage | Existing draft | Deliverable | Proposed role | Dependency |
| -- | -- | -- | -- | -- |
| A | JON-130 (private source reference withheld) | Reconcile accepted contracts; define schemas and AGT adapter; preserve dependency baseline | Integration engineer / Codex | Future implementation authorization |
| B | JON-131 (private source reference withheld) | Persistent identity mapping, authentication and domain-scoped capabilities | Identity/security engineer / Codex | Accepted A interface |
| C | JON-132 (private source reference withheld) | Domain writer, atomic capability use, versioned commits and durable audit | Storage engineer / Codex | Accepted A interface |
| D | JON-133 (private source reference withheld) | Local harness connecting actual A–C components across synthetic domains | Integration engineer / Codex | Accepted B and C |
| E | JON-134 (private source reference withheld) | Linux separation, real bypass tests, stop/restart and recovery runbook | Infrastructure engineer / Codex | Accepted D |
| F | JON-135 (private source reference withheld) | Independent adversarial suite and evidence-backed acceptance report | Separate security reviewer | Accepted E |

Sequence: A → (B and C in parallel) → D → E → F.

A owns shared contracts and package files. B owns identity/capability code. C owns storage/audit/migrations. D owns integration/harness. E owns Linux deployment fixtures. F owns independent adversarial tests/report. B/C may use shared contract fixtures in development, but D acceptance must use actual implementations.

## Proposed delegation rules for later implementation

J remains the human accountable owner. Each selected issue receives one bounded executor and one launch method. Use isolated branches/worktrees and explicit base/interface versions. Do not create dispatch/supervisor issues, recursive agents or duplicate implementations. Separate final reviewer from producers. Routine PR review stays on the producer issue.

Handoffs include exact SHA, PR/diff, owned files, schema/policy generation, tests and results, limitations and unresolved dependencies. In Progress means verified active work; In Review means delivered awaiting review; Done means accepted. No automatic next-phase start is proposed.

## Acceptance design

1. Policy: allowed action executes once; unknown/denied action and parse/timeout/context errors execute no handler.
2. Identity: reject forged identity, caller-selected roles, wrong audience/domain, invalid signature and changed arguments; restart and key rotation preserve registry identity.
3. Storage: concurrent replay has at most one effect; stale version and mismatched capability cause no write; commit/audit evidence survives injected crashes and retries. An admitted action pauses, remains durable and resumes without duplicate execution when the audit collector is unavailable.
4. Workflow: actual authenticated read and versioned write succeed; invalid operations cannot reach storage. No mock verifier in end-to-end acceptance.
5. Linux: restricted agent cannot read keys, access database files, invoke writer directly or reach unrelated domains; intended authorized path still works.
6. Recovery: unavailable policy or authority state fails safely. When the audit collector is unavailable, preserve and pause admitted work until it is available; secure local audit storage alone does not permit execution. Domain freeze preserves evidence; unaffected domains continue only where dependencies remain trustworthy.
7. Regression: Finger non-blocking capture and separate persistence remain intact.
8. Independent review: per-case pass/fail/blocked evidence on one candidate SHA; no isolation pass based on mocks or unavailable host privileges.

Initial completion means tested synthetic-domain runtime readiness. Real registry wiring, full constitutional policy coverage, Archivist publication and production rollout need separate accepted scope.

## Questions for Linear agent's review

* Does the design preserve JON-15 (private source reference withheld)/17/35/18, including operation admission versus commit, expiry and revocation?
* Are any existing accepted implementations/contracts overlooked or duplicated?
* Are schemas, authenticated trust boundaries and audit/transaction semantics sufficient to begin A after approval?
* Can B/C proceed independently with explicit ownership and stable interfaces?
* What gaps remain in crash consistency, capability replay, policy upgrade/downgrade, transport authentication, protected logs and Linux bypass resistance?
* Are the acceptance scenarios measurable, and does the plan distinguish installation, synthetic tests and production enforcement?
* What decisions require owner input, and which should be routine implementation choices?

## Requested review output

Reply on the review issue with: recommendation (ready for owner consideration / revise / blocked), prioritized findings with source links and proposed corrections, dependency/ownership changes, acceptance-test gaps, and the smallest recommended first milestone. Explain actual blockers rather than treating historical holds as a reason not to perform this expressly authorized review.

Do not modify JON-130 (private source reference withheld)–135, launch their workers, implement fixes, or approve execution on the owner's behalf. This review provides advice only.
