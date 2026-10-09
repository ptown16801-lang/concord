# Evidence snapshot: AGT F — independent adversarial verification and acceptance report

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report
- Version: 2026-09-24T09:31:20.969Z
- Source date: 2026-09-24T09:31:20.969Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## New producer review freeze — September 24, 2026

PR <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request> is now `1731602de02cef6fb0228f155202beeed844c295`, superseding `7ba5bc5` for the remaining approval-time expiry defect. Six new boundary cases pass (three reproduced the prior defect); 73/73 tests pass locally on Node 22/24 and all four fresh CI jobs pass. Current producer handoff is recorded in the comments on <issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>/132/133/135. Existing reviewer ownership and acknowledgment requirement remain unchanged. This does not claim independent execution, Linux isolation acceptance or completion; <issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue> remains separate. No duplicate reviewer is started.

## Current handoff; reviewer acknowledgment pending — September 23, 2026

Current published PR <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request> candidate is `7ba5bc5c5a975d72298540e9aa776504d5b4f263`, superseding the b332c23/76f331e candidates below. The existing independent reviewer remains `01a0ce32-9a4e-75a1-a253-672f8205658e`, through parent session `01a0cd95-e26f-7aa1-ac98-2f37ead36175`. A handoff is queued; availability and execution on this revision are not yet acknowledged. No second reviewer or implementation is being started. Historical In Progress does not prove this revision is under active review.

<issue id="750a2b17-6734-47c9-b999-10039fc5f30d" href="https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts">JON-141</issue> session `01a0ce1f-4d47-7a91-b5a6-a28c8fc46d12` is sole remaining PR <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request>/integration writer. The overlapping producer has yielded and [preserved its additive handoff](<https://linear.app/jons-garage/issue/JON-141#comment-38621d3c-4515-426c-b298-91177fb6c026>). <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue> and <issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue> remain formal completion dependencies. [Linear's coordination assessment](<https://linear.app/jons-garage/issue/JON-86#comment-875a506b-33fc-4602-b1b7-b944baf1f5ed>) requires acknowledgment and an independent pass/fail report before acceptance.

## Uploaded candidate — September 23, 2026

Source and committed audit documentation are now remotely accessible in <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request>, targeting Develo from <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>-governance-audit-remediation. Exact candidate: [b332c2309e123bd05099d4f9fcfd3bd202bdb0fa](<https://github.com/ptown16801-lang/concord/commit/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa>).

This supersedes earlier “not pushed”/local-only access notes. GitHub requires a pull request, so the protected Develo branch was not changed. Producer evidence: clean install, 65 tests passing, real Linux isolation and confined workflow checks passing; dependency audit reports zero findings. [Audit record](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_AUDIT_2026-09-23.md>) and [runbook](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_SANDBOX.md>) are included. Independent acceptance under <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue> remains pending. No merge or production readiness is claimed.

## Current review candidate — September 23, 2026

`b332c2309e123bd05099d4f9fcfd3bd202bdb0fa` supersedes `76f331e`. Further adversarial inspection identified replacement through SQLite's hidden row identifiers; the producer added explicit guards and regression coverage for rowid, *rowid* and oid under both recursive_triggers settings. The archived candidate is locally accessible at /tmp/concord-audit-candidate-bzy7cv5j (not pushed).

Clean offline npm ci, all 65 regression tests, actual Linux isolation and confined workflow probes passed on this exact candidate. <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue>'s separate reviewer has been notified to evaluate this revised commit. Independent acceptance remains pending; original observations and earlier candidate records below are historical.

## Independent local review started — September 23, 2026

The owner authorized this task in sequence after <issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue> → <issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue> → <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue>. A separate local reviewer session, which did not implement the changes, is reviewing fixed candidate `76f331ee721f832574ddfd6d3dd5439cd5724909` through its accessible git-archive copy at /tmp/concord-audit-candidate-58hegkv0. This is not a duplicate implementation or a remote coding dispatch. The commit is not pushed.

Producer prerequisites for the bounded audit follow-up: clean lockfile install, 65 passing tests, zero npm audit findings, actual Linux isolation probe and integrated confined workflow all passed on the candidate. Independent reviewer must establish its own evidence for findings 1–4 and report pass/fail/blocked. Existing broader <issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue>/service-isolation scope and the complete original acceptance matrix are not automatically satisfied by these probes. No independent acceptance is claimed yet.

## Required audit follow-up — September 23, 2026

These requirements incorporate the owner's instruction and [Linear's task-placement guidance](<https://linear.app/jons-garage/issue/JON-138#comment-da792211-c84e-47f0-9665-ba8825ea3113>). See the [reproduced findings](<https://linear.app/jons-garage/issue/JON-138#comment-921c8ce9-b6a5-48b4-8cee-7c547e9e858b>) and [severity review](<https://linear.app/jons-garage/issue/JON-138#comment-95c73b24-b659-4029-9125-e2054dfabfd2>).

Current baseline is local Git commit `ea3c0486a3440d2547837eaeef1de59d67525620`, including `docs/GOVERNANCE_AUDIT_2026-09-23.md`; it has not been pushed. This supersedes earlier uncommitted-candidate wording below. All four findings remain open. The prior 59 passing tests are regression evidence, not acceptance of these cases. Earlier claims of immutable storage and a full signed-policy snapshot are qualified by findings 1 and 3.

Extend this existing independent review's adversarial matrix with all four findings. This task verifies fixes; return implementation defects to <issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>/<issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue> rather than duplicating their work.

- [ ] Finding 1 (<issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue>): reject replacement under both recursive_triggers settings; approval, reservation, status and audit payload remain intact. Explicitly state trusted SQL access prerequisite.
- [ ] Finding 2 (<issue id="5f1078db-8d70-404b-9987-bd2244c190f7" href="https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit">JON-132</issue>; integrated evidence <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue>): after collector replacement following approval/delivery, require evidence reconciliation or safe pause, with no cancellation or duplicate effects.
- [ ] Finding 3 (<issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>): verify original archived policy bytes/signature/key reference/digest/generation offline after upgrade/restart with current policy unavailable.
- [ ] Finding 4 (<issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>): verify sanitized correlation, timestamp, failure stage and truthful actor-verification state across denial paths/retries, without credential disclosure.
- [ ] A reviewer separate from the implementer must record pass/fail/blocked for each case on one immutable, accessible fixed candidate. Obtain focused regressions, <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue> integrated recovery evidence, clean install, full regressions and actual isolation checks on that exact commit.
- [ ] Findings 1–3 block local sandbox acceptance. Finding 4 blocks complete forensic-evidence claims; any bounded enforcement acceptance with it open must name the residual limitation explicitly. No independent acceptance follows from the prior 59-test baseline or advisory comments.

<issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue> verification is an explicit acceptance dependency, alongside existing <issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue> isolation work. Keep remote collector guarantees, production transport/service separation, registry/succession, publication, backups and deployment as broader production scope. This update does not dispatch a reviewer or declare acceptance.

## Candidate available for future independent review

Local sandbox producer delivered a 59-test candidate under <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue> and incorporated Linear's advisory guidance. This issue remains unstarted; no independent verification is claimed or dispatched. Exact local artifact manifest and limitations are recorded on <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>. A remote reviewer needs a delivered immutable revision/artifact before source-level review. Advisory comments alone do not satisfy this issue.

## Current sandbox authorization

Owner now authorizes the present Codex session to implement and test the local synthetic integration sandbox under Concord. This supersedes earlier planning-only wording for this bounded scope. No remote session is dispatched. Approval cannot be canceled; later expiry/revocation affects new admission only; audit collector outage pauses approved work. Independent review and full production readiness must not be claimed by this implementer.

## Deliverable

A substantial independent adversarial test suite and evidence-backed acceptance report for the delivered AGT runtime boundary.

## Ownership

Proposed executor: a separate Codex reviewer session that did not implement A–E. Own test/agt-adversarial/\* and the acceptance report. Review against canonical contracts and threat cases, not just implementation-generated expectations. Return fixes to the existing producer issue/PR; do not silently self-approve or create duplicate implementations.

## Acceptance matrix

Cover forged identity, caller-supplied authority, cross-domain leakage, direct-store bypass, policy/schema mismatch and downgrade, malicious YAML, capability replay/argument substitution, race between authorization and commit, pre/post-admission revocation per <issue id="01f01456-3c06-45aa-af7b-10c99f6cd777" href="https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering">JON-35</issue>, stale version, expiry semantics, audit outages/tampering, crash recovery and forbidden network/file access. Verify terminated agents cannot continue using stale channels. Check no protected metadata enters public traces.
Run clean lockfile installation and dependency audit, existing regression suite, SDK adapter tests, real local workflow and actual Linux isolation checks on one exact candidate SHA. Report pass/fail/blocked per case with evidence. No overall pass if host enforcement was mocked or unavailable. Findings include severity and canonical owning issue. Acceptance means tested synthetic-domain runtime readiness, not full constitutional correctness or production deployment. <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> publication integration and production rollout remain separately tracked follow-on scope.

## Ownership and execution

Accountable human: J. Proposed executor: Codex, one bounded session for this issue when selected for execution. This is a planning record, not an active delegation or dispatch. The September 23 owner request authorizes this implementation plan; it does not release the wider Concord execution hold or re-enable Concord Linear Coding Sessions. No recursive delegation, duplicate starts, or supervisor issues. Check current owner instructions and existing work before starting.

Use ptown16801-lang/concord. Reuse existing branches/artifacts. Return PR/diff, exact commit SHA, test commands/results, remaining limitations, and interface changes to this issue. Move delivered work to In Review; Done requires review acceptance. Do not claim production enforcement from a mock test. Preserve Finger behavior and storage separation.
