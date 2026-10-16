# Evidence snapshot: JON-130 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-130
- Version: snapshot through retrieval
- Source date: 2026-09-24T05:28:22.998Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment a4b153f4-5eb4-4893-8592-8db06d6b1a0b

Date: 2026-09-24T05:28:23.040Z; author: J; on behalf of: not stated

Published AGT expiry-boundary correction in existing [PR #34](https://github.com/ptown16801-lang/concord/pull/34). Exact immutable review freeze: `1731602de02cef6fb0228f155202beeed844c295`, based on and preserving consolidated `7ba5bc5c5a975d72298540e9aa776504d5b4f263`.

Both identity and policy expiry are checked against the final persisted approval timestamp before consuming the nonce. At/after expiry rejects admission with sanitized denial evidence and no nonce consumption, operation, reservation or domain effect. Approval before expiry still permits completion after later expiry/revocation.

Six boundary cases cover identity/policy immediately before, at and after expiry. Three reproduce the defect at 7ba5bc5; all six pass after correction. Clean locked install reports zero vulnerabilities; syntax/whitespace checks and all 73 tests pass on Node 22.23.2 and 24.21.0. All four new CI jobs pass: [push](https://github.com/ptown16801-lang/concord/actions/runs/35960003887), [PR](https://github.com/ptown16801-lang/concord/actions/runs/35960007262).

These are producer results, not independent acceptance. Actual Linux confinement was not re-certified: this host currently blocks Bubblewrap namespace setup via AppArmor. JON-134’s remaining isolation scope is not closed. Existing JON-135 reviewer ownership is preserved; no new review/worker, merge or deployment. PR #37 remains at its separately published and tested 931aaeca236f580947aa0fd16bcb99b06dc6bd29; no silent AGT pin substitution.

## Comment 3de15bda-285e-49c9-b663-b3ee92b5fc5f

Date: 2026-09-24T04:28:28.604Z; author: J; on behalf of: not stated

Owner has now instructed “Implement.” Sole PR #34 writer is implementing the remaining approval-time expiry defect identified by Linear on JON-135 (comment 4f35070d-746f-4d04-a327-1dcafda57036), starting from exact published 7ba5bc5c5a975d72298540e9aa776504d5b4f263. Scope: validate actor and policy expiry against the timestamp retained with final approval; reject at/after expiry without nonce consumption, approval, reservation or domain effect. Preserve already-approved work across subsequent expiry/revocation. Focused boundary regressions will precede the runtime correction. No new reviewer, workers, merge or deployment. PR #37’s published 931aaeca236f580947aa0fd16bcb99b06dc6bd29 remains unchanged until a separate new-pin handoff.

## Comment d330cae5-dfba-4ae9-afcb-1738ab09af43

Date: 2026-09-23T13:36:25.742Z; author: J; on behalf of: not stated

Follow-up fixes delivered in existing PR #34 at 2d5c55d0dc7785e44aa48eb6efc534d3d13c78e7: primitive/null/hostile evaluator rejection preserves sanitized denial audit; committed results are immutable, including reopen; CI runs npm ci --ignore-scripts before tests. Both new regressions failed pre-fix. All 67 Node 24 tests pass locally and GitHub Node 22/24 workflow 35866836147 passes. This supersedes b332c23 for these three findings; JON-135 independent acceptance remains pending. Shared cross-work integration is separate draft PR #37 under JON-141.

## Comment cf864d35-898c-4ee1-8240-5a3fcb61e0a4

Date: 2026-09-23T13:32:38.917Z; author: J; on behalf of: not stated

Remediation delivered: arbitrary evaluator rejection values (including null, undefined and throwing code accessors) retain sanitized denial evidence and rethrow the original reason. Regressions verify denial, absent approval, no reservation and no record mutation. Existing published runtime fix was retained, with added no-reservation coverage.

Published in [PR #34](https://github.com/ptown16801-lang/concord/pull/34), final candidate `7ba5bc5c5a975d72298540e9aa776504d5b4f263`. Reconciled the concurrently published `2d5c55d` fixes; no force-push or replacement implementation. Clean npm ci --ignore-scripts, syntax checks, 67 tests on both Node 22.23.2 and Node 24.21.0, and actual Linux isolation/confined workflow passed locally. Independent acceptance remains JON-135; no merge/deployment or Done status is claimed.

## Comment ea618d10-c8d1-47e7-8152-324d0dd4de06

Date: 2026-09-23T12:41:01.091Z; author: J; on behalf of: not stated

Follow-up audit, reproduced on b332c23: a configured evaluator returning Promise.reject(null) causes admit()'s catch block at src/governance/sandbox/runtime.js:205 to throw TypeError reading error.code. No denial audit row is written; approval is correctly absent. Medium forensic/error-handling gap. Regression should include null and undefined rejection reasons, retain sanitized denial evidence, and leave operation unapproved. Local probe /tmp/concord-followup-audit/probe.test.mjs ran through npm test; observed audit=[] and TypeError. No source fix made in this audit.
