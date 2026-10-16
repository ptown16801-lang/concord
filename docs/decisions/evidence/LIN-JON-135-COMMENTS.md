# Evidence snapshot: JON-135 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-135
- Version: snapshot through retrieval
- Source date: 2026-09-24T09:31:20.969Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment dd718e36-a1a3-4d6d-b453-48d3f63c68f2

Date: 2026-09-24T09:31:21.004Z; author: J; on behalf of: not stated

Integration availability update only; no review assignment or acceptance change. AGT producer `1731602de02cef6fb0228f155202beeed844c295` is now consumed exactly once in draft PR37 aggregate `c0a154ae8668e63cb0908540b58eb58c6579747d`. The AGT runtime, regression tests and governance docs match producer blobs. Combined Node 22/24 suites pass 192/192 and all four published CI jobs are green. Exact integration evidence: https://linear.app/jons-garage/issue/JON-141#comment-0696a00e-755c-4163-963e-c6435e86d924 .

The recorded reviewer and parent are archived per JON-164. Independent JON-135 verification remains outstanding pending the owner/coordinator's reviewer resumption/replacement decision. No competing reviewer launched; producer/integration tests are not independent acceptance.

## Comment d3e084ad-5495-45ee-b2d3-8f7a7f0985b8

Date: 2026-09-24T05:28:25.342Z; author: J; on behalf of: not stated

Published AGT expiry-boundary correction in existing [PR #34](https://github.com/ptown16801-lang/concord/pull/34). Exact immutable review freeze: `1731602de02cef6fb0228f155202beeed844c295`, based on and preserving consolidated `7ba5bc5c5a975d72298540e9aa776504d5b4f263`.

Both identity and policy expiry are checked against the final persisted approval timestamp before consuming the nonce. At/after expiry rejects admission with sanitized denial evidence and no nonce consumption, operation, reservation or domain effect. Approval before expiry still permits completion after later expiry/revocation.

Six boundary cases cover identity/policy immediately before, at and after expiry. Three reproduce the defect at 7ba5bc5; all six pass after correction. Clean locked install reports zero vulnerabilities; syntax/whitespace checks and all 73 tests pass on Node 22.23.2 and 24.21.0. All four new CI jobs pass: [push](https://github.com/ptown16801-lang/concord/actions/runs/35960003887), [PR](https://github.com/ptown16801-lang/concord/actions/runs/35960007262).

These are producer results, not independent acceptance. Actual Linux confinement was not re-certified: this host currently blocks Bubblewrap namespace setup via AppArmor. JON-134’s remaining isolation scope is not closed. Existing JON-135 reviewer ownership is preserved; no new review/worker, merge or deployment. PR #37 remains at its separately published and tested 931aaeca236f580947aa0fd16bcb99b06dc6bd29; no silent AGT pin substitution.

## Comment 523e623c-1945-4333-bf50-f5130e7fb5d1

Date: 2026-09-24T03:03:13.684Z; author: J; on behalf of: not stated

@linear Owner now requests: “AGT’s verified defects and complete scheduler consult @Linesr.” Please consult on the remaining verified AGT defects against published PR #34 at 7ba5bc5c5a975d72298540e9aa776504d5b4f263. Your earlier correction-scope PASS at 2d5c55d is recorded; please distinguish any still-open source defect from missing independent execution/acceptance evidence. Reuse the existing review thread and do not start another implementation or reviewer session. Confirm the required next action for JON-130/132/133/134/135 and whether the older local review has a report available. Implementation remains with this sole integration/AGT writer. No status changes, merge or deployment requested by this consultation.

## Comment 4f35070d-746f-4d04-a327-1dcafda57036

Date: 2026-09-24T03:04:46.315Z; author: Linear; on behalf of: not stated

One verified source defect remains: expiry can cross between validation and approval recording in [runtime.js](<#file-src/governance/sandbox/runtime.js>), allowing approval at/after expiry. [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter) and [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit) should route it to the existing writer.

[JON-134](https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary) also remains incomplete for its isolation scope; the rest are evidence gaps: [JON-135](https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report) must independently run the clean-install, adversarial, audit, and Linux matrix on `7ba5bc5`, including expiry-boundary coverage, then record results. [JON-133](https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness) has no newly verified source defect.

The older local review has no delivered independent-execution report—only static/CI review and the correction-scope PASS, both without re-execution

## Comment 34be9218-f9ec-450d-81e5-042278e8069d

Date: 2026-09-23T13:36:28.287Z; author: J; on behalf of: not stated

@linear Please continue the existing independent review against corrected PR #34 head 2d5c55d0dc7785e44aa48eb6efc534d3d13c78e7. The two current source findings and CI defect are addressed: safe rejection-code handling before denial logging, durable committed-result update guards, and dependency installation in CI. Two focused regressions fail before correction; all 67 tests pass afterward; Node 22/24 remote CI passed https://github.com/ptown16801-lang/concord/actions/runs/35866836147 . Review the exact correction and record PASS or specific residual findings, distinguishing your source/CI checks from supplied test evidence. No coding dispatch, merge, production readiness or deployment. Original scope remains the synthetic local sandbox.

## Comment b066283b-5157-4eed-8169-d938d83a3a2f

Date: 2026-09-23T13:37:56.950Z; author: Linear; on behalf of: not stated

PASS for the requested correction scope.

* **Source checks:** denial logging safely sanitizes arbitrary rejection values before rethrowing; committed results are restricted to the pending→committed transition and remain immutable after restart.
* **CI check:** workflow installs pinned dependencies with `npm ci --ignore-scripts` before validation.
* **Supplied evidence:** the two regressions and 67-test result, plus Node 22/24 remote CI, were reviewed as supplied—not independently re-executed.

## Comment ce213f72-d59a-4eec-9b37-20dc030caeeb

Date: 2026-09-23T13:33:30.243Z; author: J; on behalf of: not stated

Updated immutable candidate available for independent verification; this is a handoff record, not a reviewer dispatch or acceptance.

Candidate [`7ba5bc5c5a975d72298540e9aa776504d5b4f263`](https://github.com/ptown16801-lang/concord/commit/7ba5bc5c5a975d72298540e9aa776504d5b4f263) is published in [PR #34](https://github.com/ptown16801-lang/concord/pull/34).

Verified both Node 22/24 jobs pass for both [push run 35867680305](https://github.com/ptown16801-lang/concord/actions/runs/35867680305) and [PR run 35867685411](https://github.com/ptown16801-lang/concord/actions/runs/35867685411). Locally: clean npm ci --ignore-scripts, zero reported vulnerabilities, syntax checks, all 67 tests on Node 22.23.2 and Node 24.21.0, and actual Linux isolation plus confined-agent workflow passed. Old b332c23 failures remain historical; no independent acceptance is inferred.

Review targets: null/undefined/primitive/hostile-accessor rejection retains sanitized denial with no approval/reservation; pending completion requires a result; committed results resist alteration under both recursive-trigger settings and after restart; original remediation and isolation scope still require your own evidence. Existing runtime fix from 2d5c55d was retained; final follow-up adds explicit assertions and complete CI matrix execution. No merge or Done status changed.

## Comment a6ff0b48-06c4-4400-be2d-99ddc553dd61

Date: 2026-09-23T12:41:14.269Z; author: Linear; on behalf of: not stated

I independently confirm both source-level gaps:

* **High — null rejection bypasses denial audit.** An evaluator rejection of `null` reaches the outer catch, which dereferences `error.code` before logging. That throws `TypeError`, leaving no denial audit entry. Producer reproduction is consistent with static review. Owner: [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter).
* **High — committed result is mutable.** The immutability trigger omits `operations.result`; only status transitions are constrained. Trusted SQL can therefore forge the returned committed result without changing the actual record or collector receipt. Producer reproduction is consistent with static review. Owner: [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit).

The CI observation is producer-reported; my independent inspection of visible CI logs also found failing Node 22 runs and canceled Node 24, so the 65-test/clean-install claim remains unsupported. Owner: [JON-133](https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness).

Recommendation remains **blocked/revise** for [JON-135](https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report).

## Comment f3c84656-3c93-47f2-8695-67ca4c86e4b6

Date: 2026-09-23T12:41:02.718Z; author: J; on behalf of: not stated

Producer follow-up audit observations for comparison with your separate assessment (not independent acceptance): (1) uploaded CI run 35861694901 has 38/65 failures on Node22; workflow omits npm ci, Node24 canceled — recorded on JON-133. (2) reproduced Promise.reject(null) from evaluator: catch reads error.code, throws TypeError, audit=[]; no approval — JON-130. (3) reproduced trusted SQL update of committed operations.result: repeated resume returns forged value/version although actual record and collector receipt remain correct — JON-132. The latter is a trusted-storage invariant gap, not remote bypass. Source unchanged. Please evaluate these alongside your own findings and distinguish observed results from source-only assessment.

## Comment 21386ef2-03d2-41c2-b0cd-552c641a3a67

Date: 2026-09-23T12:39:36.197Z; author: J; on behalf of: not stated

@linear The owner explicitly requests a separate audit by you of the uploaded work. Please independently review draft PR https://github.com/ptown16801-lang/concord/pull/34 at exact head b332c2309e123bd05099d4f9fcfd3bd202bdb0fa, alongside JON-130/132/133/135 and JON-138. Source is now pushed; previous unavailable-source limitations should be rechecked, not assumed.

Audit four remediation claims: replacement rejection including rowid/_rowid_/oid with both pragma settings; collector history recovery/conflicts before effects and idempotency; complete signed policy archive with offline provenance verification; sanitized denial attribution/correlation. Also audit whether task statuses/dependencies and claimed 65-test/clean-install/isolation evidence justify the bounded acceptance claim. Read the source and tests if accessible; distinguish your own executed checks, static review, producer-reported evidence and blocked access. Check for missed adversarial variants. Return severity, reproduction or source evidence, owning existing task, and accept/revise/blocked recommendation here. Do not merge, implement fixes, create issues/projects or change statuses. This separate audit is not satisfied by repeating the producer summary. Full production readiness is not requested.

A separate local reviewer was previously started but has not yet delivered a report; do not treat that pending review as acceptance. I am also auditing the work locally. Preserve owner semantics: no cancellation after approval, new-admission-only expiry/revocation, pause approved effects while collector unavailable.

## Comment e08c65cb-7ab9-42e5-b310-c2182182a3a0

Date: 2026-09-23T12:40:38.238Z; author: Linear; on behalf of: not stated

**Recommendation: blocked—revise before bounded acceptance.** I performed static review at `b332c230…` and inspected CI logs; I did not execute checks locally.

* **Critical — all four remediation claims lack passing candidate evidence.** Both Node 22 CI runs fail; the audit regression suite cannot initialize because policy installation returns `POLICY_INVALID`. This blocks the rowid, collector recovery, archive, and denial tests before their assertions. Reproduction: run the CI test command on the candidate; fixture initialization fails. Owner: [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter) / [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit).
* **Static review — remediation designs are present but unvalidated at this head.** The runtime adds explicit replacement guards, reconciliation-before-effect behavior, immutable signed bundle retention with offline verification, and sanitized denial records. The regression tests cover both `recursive_triggers` settings and `rowid`, `_rowid_`, and `oid` for relevant protected tables. Collector conflict pauses pending work before mutation; approved work has no cancellation or reauthorization path. Owner: [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit).
* **Evidence classification:** “65 tests,” clean install, and isolation are producer-reported only. CI instead reports failures; Node 24 checks are canceled. I found no independent passing execution evidence.
* **Dependencies/statuses:** [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter), [JON-132](https://linear.app/jons-garage/issue/JON-132/agt-c-domain-writer-transactional-capability-use-and-durable-audit), and [JON-133](https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness) remain In Review; [JON-135](https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report) is still In Progress. That dependency chain does not justify acceptance.

Retest the fixed exact head through CI, including the adversarial suite and clean-install/isolation commands, before revisiting bounded acceptance.
