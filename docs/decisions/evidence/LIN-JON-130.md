# Evidence snapshot: AGT A — reconcile security contracts and implement policy adapter

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter
- Version: 2026-09-24T05:28:22.998Z
- Source date: 2026-09-24T05:28:22.998Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current published candidate and ownership — September 23, 2026

The current shared sandbox artifact is <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request> at `7ba5bc5c5a975d72298540e9aa776504d5b4f263`. It is published, not local-only. J remains accountable. Existing <issue id="750a2b17-6734-47c9-b999-10039fc5f30d" href="https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts">JON-141</issue> session `01a0ce1f-4d47-7a91-b5a6-a28c8fc46d12` is the sole remaining writer for this PR and aggregate integration; route corrections through that existing owner and the relevant <issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>–134 scope, without a second producer.

[Producer handoff](<https://linear.app/jons-garage/issue/JON-141#comment-38621d3c-4515-426c-b298-91177fb6c026>) records 67 tests on Node 22/24 and passing published CI on this revision. These are supplied producer results. Linear's bounded correction PASS on `2d5c55d` does not constitute full independent acceptance of `7ba5bc5`. <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue> retains the existing independent reviewer and formal <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue>/<issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue> completion dependencies. Broader production boundaries and original acceptance criteria below remain open.

## Historical delivery and audit checkpoints

Older commit IDs, local-only statements, test counts and provisional ownership below describe their recorded snapshots; they are not the current handoff.

## Uploaded candidate — September 23, 2026

Source and committed audit documentation are now remotely accessible in <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request>, targeting Develo from <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>-governance-audit-remediation. Exact candidate: [b332c2309e123bd05099d4f9fcfd3bd202bdb0fa](<https://github.com/ptown16801-lang/concord/commit/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa>).

This supersedes earlier “not pushed”/local-only access notes. GitHub requires a pull request, so the protected Develo branch was not changed. Producer evidence: clean install, 65 tests passing, real Linux isolation and confined workflow checks passing; dependency audit reports zero findings. [Audit record](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_AUDIT_2026-09-23.md>) and [runbook](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_SANDBOX.md>) are included. Independent acceptance under <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue> remains pending. No merge or production readiness is claimed.

## Current review candidate — September 23, 2026

`b332c2309e123bd05099d4f9fcfd3bd202bdb0fa` supersedes `76f331e`. Further adversarial inspection identified replacement through SQLite's hidden row identifiers; the producer added explicit guards and regression coverage for rowid, *rowid* and oid under both recursive_triggers settings. The archived candidate is locally accessible at /tmp/concord-audit-candidate-bzy7cv5j (not pushed).

Clean offline npm ci, all 65 regression tests, actual Linux isolation and confined workflow probes passed on this exact candidate. <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue>'s separate reviewer has been notified to evaluate this revised commit. Independent acceptance remains pending; original observations and earlier candidate records below are historical.

## Audit remediation delivered for review — September 23, 2026

Local fixed candidate: `76f331ee721f832574ddfd6d3dd5439cd5724909` (not pushed). This supersedes the open-finding baseline below for implementation status only; independent acceptance is pending.

<issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue> delivered immutable full signed policy bundles bound by approval digest, offline policy-provenance verification using separately trusted roots, and sanitized denial correlation/time/stage/actor-verification state. <issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue> consumed that evidence contract and added explicit replacement guards plus idempotent reconciliation of all retained local audit records before resume. <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue> exercised collector replacement/conflict, expiry/revocation/restart, full regressions and real confinement against the committed candidate.

Evidence: clean `git archive` candidate at /tmp/concord-audit-candidate-58hegkv0; `npm ci --offline --ignore-scripts --cache /tmp/concord-npm-cache`; `npm test` 65/65 passing (six new audit regressions); current `npm audit --json` zero vulnerabilities; real `node examples/agt-local/isolation.js` and `node examples/agt-local/isolated-workflow.js` passed on that candidate. Syntax and whitespace checks pass. Scope remains the local sandbox; all-history reconciliation is intentionally linear, and legacy approvals cannot retroactively recover a lost policy signature.

Producer changes are complete for this bounded audit follow-up. <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue> now has a separate local reviewer with access to the immutable candidate; review does not yet constitute full independent acceptance or broader original issue completion.

## Required audit follow-up — September 23, 2026

These requirements incorporate the owner's instruction and [Linear's task-placement guidance](<https://linear.app/jons-garage/issue/JON-138#comment-da792211-c84e-47f0-9665-ba8825ea3113>). See the [reproduced findings](<https://linear.app/jons-garage/issue/JON-138#comment-921c8ce9-b6a5-48b4-8cee-7c547e9e858b>) and [severity review](<https://linear.app/jons-garage/issue/JON-138#comment-95c73b24-b659-4029-9125-e2054dfabfd2>).

Current baseline is local Git commit `ea3c0486a3440d2547837eaeef1de59d67525620`, including `docs/GOVERNANCE_AUDIT_2026-09-23.md`; it has not been pushed. This supersedes earlier uncommitted-candidate wording below. All four findings remain open. The prior 59 passing tests are regression evidence, not acceptance of these cases. Earlier claims of immutable storage and a full signed-policy snapshot are qualified by findings 1 and 3.

Own findings 3 and 4 within this existing task.

- [ ] Finding 3 — Medium, historical provenance; blocks local sandbox acceptance. Archive immutable original policy bundle bytes, signature, issuer/key reference, digest and generation. Approval evidence must reference that archive. Reproduce approval under generation 1 followed by generation 2; after restart with current policy unavailable, independently verify the old approval offline from its archived bundle. Retaining only a previously verified manifest is insufficient.
- [ ] Finding 4 — Low, forensic hardening. Record sanitized attempt correlation, timestamp, failure stage and actor-verification state for distinct denial paths and retries. Do not expose credentials or claim an actor was authenticated before cryptographic verification. This blocks a claim of complete forensic evidence; any deferral for bounded enforcement acceptance must be explicitly recorded as a residual limitation.
- [ ] Deliver focused regression evidence and exact fix commit to <issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue>/<issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue> and the independent reviewer in <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue>. Coordinate changes to the shared sandbox runtime with <issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue>.

This update adds requirements, not a remote worker dispatch. Preserve owner rules: no cancellation of approved actions; later expiry/revocation affects new admissions only; collector outage pauses approved execution.

## Local sandbox delivery — September 23, 2026

Implemented locally under Concord parent <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>; no new project or remote coding worker. Incorporated Linear's advisory reply on <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>: immutable full authority/policy snapshot, reservation/version binding, local-only collector availability guarantee, atomic domain outcome/outbox, and idempotent delivery. Nonce consumption belongs to admission; operation status transition and reservation release are the one-use execution marker committed with mutation.

Verification: 59 tests pass (23 existing Finger, 12 admission, 24 sandbox); clean offline npm ci from the lockfile and the same 59 tests pass in a separate candidate directory; current online npm audit reports zero vulnerabilities. Actual SIGKILL recovery tested before mutation and after domain commit/before delivery. Linux bubblewrap probe passed protected-path denial, read-only runtime and host-network denial. Integrated confined-agent demo passed signed request through pipe → trusted runtime → audit outage pause → one commit after recovery.

Files: src/governance/sandbox/runtime.js; examples/agt-local/; test/agt-sandbox.test.js; docs/GOVERNANCE_SANDBOX.md. Existing contracts/admission.js and admission kernel preserved. Run npm run governance:demo, governance:test, governance:isolation, governance:isolated-demo.

Candidate is LOCAL AND UNCOMMITTED above Git HEAD 40f647e5b8d23307f713fc3a3753a1d3a46611cb, not a remote PR. Fixed file manifest: /tmp/concord-governance-candidate-se4jsdkm/CANDIDATE-MANIFEST.json, SHA-256 1911f0e075d907485747dbb5ec4a310856703c28356a68e448fb42a40df78a7d. This is an artifact fingerprint, not a commit SHA. Remote reviewers cannot assume access.

Still open: production gateway/mediator/authorization/writer separation and authenticated network transport; real registry/succession and Archivist integration; remote collector guarantees; backup/tamper recovery; independent acceptance under <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue>. No production readiness claim. No approved operation cancellation/deadline introduced. Local synthetic milestone delivered for review; broader original issue acceptance is not asserted.

## Current sandbox authorization

Owner now authorizes the present Codex session to implement and test the local synthetic integration sandbox under Concord. This supersedes earlier planning-only wording for this bounded scope. No remote session is dispatched. Approval cannot be canceled; later expiry/revocation affects new admission only; audit collector outage pauses approved work. Independent review and full production readiness must not be claimed by this implementer.

## Deliverable

A reusable local Node.js AGT policy adapter and a reviewed contract for downstream identity, writer and audit implementations. No HTTP server is required for this stage.

## Baseline and preflight

Local checkout /home/cornholio/projects/concord is at 40f647e5b8d23307f713fc3a3753a1d3a46611cb. package.json, package-lock.json and CHANGELOG.md contain uncommitted authorized installation changes: AGT 5.0.0, scoped js-yaml 5.4.2 override. Preserve and deliver these through the canonical branch; do not assume remote agents can see them. Previous session verified SDK import/YAML allow-deny, npm audit zero findings and 23 existing tests; rerun on the delivered SHA.
Inspect <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> PR <pull-request id="97398c4a-8bc0-42cd-a0c0-f087067ced37" href="https://linear.app/jons-garage/review/define-protected-domain-security-contract-74c16b3cb3d9">ptown16801-lang/concord#19</pull-request> (49c19837191b83e93844653f7bf6259ee838d3ef) and <issue id="9456331b-a71c-4a13-beb6-b627a381d12f" href="https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model">JON-15</issue> PR <pull-request id="1f60309d-b2fc-46e4-9d33-028dd0c8de62" href="https://linear.app/jons-garage/review/define-persistent-identity-and-succession-contract-7dcdfa1b05aa">ptown16801-lang/concord#15</pull-request> (1e86688cc2ed45b174d675d353c47b96c8d5bbec) plus current repository state. Reuse accepted contracts; do not reimplement completed design. Record any actual unresolved contract gap.

## Scope / file ownership

Own src/governance/agt-adapter.*, contracts/*, policies/test/\*, adapter tests and dependency manifest/lockfile changes. Establish request and result schemas, authenticated-context interface, domain-local authority snapshots, policy digest/generation compatibility, errors, audit sink and writer interface. No caller-controlled authority fields. Unknown action, missing required context, parse failure, exception, timeout and incompatible policy state deny without executing any handler. AGT allow is necessary but cannot replace Concord authority checks. Policy updates must be atomic/validated, with an attributable generation.

## Acceptance

Reproducible clean install from lockfile; override rationale recorded; SDK import and YAML behavior tested; explicit allow/deny and default denial tested; handler invocation count is zero on every denial/error. Publish contract fixtures downstream workers can consume. No Microsoft account, model API or paid service required.

## Ownership and execution

Accountable human: J. Proposed executor: Codex, one bounded session for this issue when selected for execution. This is a planning record, not an active delegation or dispatch. The September 23 owner request authorizes this implementation plan; it does not release the wider Concord execution hold or re-enable Concord Linear Coding Sessions. No recursive delegation, duplicate starts, or supervisor issues. Check current owner instructions and existing work before starting.

Use ptown16801-lang/concord. Reuse existing branches/artifacts. Return PR/diff, exact commit SHA, test commands/results, remaining limitations, and interface changes to this issue. Move delivered work to In Review; Done requires review acceptance. Do not claim production enforcement from a mock test. Preserve Finger behavior and storage separation.
