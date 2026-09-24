# Evidence snapshot: Validate Concord scheduler implementation approaches

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches
- Version: 2026-09-24T07:12:01.251Z
- Source date: 2026-09-24T07:12:01.251Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current execution dependency — September 23, 2026

Harness-based comparative runs wait for <issue id="bc24626d-a347-4bb8-9b0c-3f2f1e4e1a64" href="https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance">JON-140</issue>'s exact-head acceptance evidence for <issue id="96a38d49-72d1-4b2c-bc5e-0b5f84ae6d34" href="https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness">JON-128</issue>. Planning can continue. <issue id="b27b486a-c91e-4240-930b-e89283d5880d" href="https://linear.app/jons-garage/issue/JON-139/correct-six-scheduler-harness-audit-findings-in-pr-33">JON-139</issue> correction delivery is already Done and must not be rebuilt. The existing <issue id="bc24626d-a347-4bb8-9b0c-3f2f1e4e1a64" href="https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance">JON-140</issue> review was requested at PR <pull-request id="72e734b7-7fea-4710-96c7-0295339ef9a4" href="https://linear.app/jons-garage/review/add-deterministic-concord-scheduler-simulation-harness-2efbb11d017a">ptown16801-lang/concord#33</pull-request> `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6`; preserve that reviewer rather than starting another. AGT remediation and bootstrap implementation are separate work and do not block this synthetic harness review.

Compare scheduler layers against the accepted boundary contract in <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and the <document id="40eb029a-3b96-40b4-877f-b85d4818790d" href="https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614">Scheduler Research &amp; Selection Record — 2026-09-21</document>.

Scope:

* establish a deterministic baseline and common simulation/test harness;
* evaluate one offline symbolic rule-generation approach;
* evaluate one offline LLM artifact-generation approach;
* evaluate one approved-policy-selection approach only after policies exist to select among.

Hard gates include legality, authorization, protected-data exposure, immutable policy versioning/provenance, rollback, deterministic fallback, and offline → shadow → staged-canary promotion.

Do not select a technology, implement a production scheduler, invent weights for the four unranked owner goals, or treat any candidate as adopted.
