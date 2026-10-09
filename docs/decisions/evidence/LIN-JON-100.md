# Evidence snapshot: Coin model D — hidden research instrumentation contract

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-100/coin-model-d-hidden-research-instrumentation-contract
- Version: 2026-09-24T21:08:20.047Z
- Source date: 2026-09-24T21:08:20.047Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Design accepted — September 24, 2026

[Independent Linear ACCEPT](<https://linear.app/jons-garage/issue/JON-100#comment-fc87f376-7d9b-4498-a469-5e83491bba03>) at `f1254c6b89259daf443322e4896439b87f03c8a0` covers all <issue id="0a46402e-0ce1-4649-8ab7-c800464a9d56" href="https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review">JON-104</issue>/<issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue> handoffs and original design scope. The stale-revision rejection is preserved and superseded. Recorded Done for the design contract; actual noninterference proof, runtime tests and deployment remain future implementation gates. No merge or experimental result is implied.

## ECON-02 amendment delivered — September 24, 2026

Owner-adopted refusal/voluntary-return/free-choice terms are incorporated in existing <pull-request id="8ce3ed03-76ab-4718-aefa-ea94747fb89c" href="https://linear.app/jons-garage/review/specify-hidden-coin-research-instrumentation-f7d52f39aa62">ptown16801-lang/concord#23</pull-request> at `8bd957e6437d2c1da70a65d94249f66f108ca4f6`. This bounded amendment is submitted for <user id="ebdb9780-fc90-431d-a858-4a5dd027b422">linear</user> checking on this issue. Whitespace checks and published Node 22/24 CI pass; these do not prove behavioral or scientific validity. Preserve earlier review obligations, <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>'s pending acceptance, and <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> dependencies. Full subsystem acceptance and runtime implementation are not claimed.

## Review/revision checkpoint — 2026-09-17

Draft delivered; not accepted or confirmed running. GitHub confirms <pull-request id="8ce3ed03-76ab-4718-aefa-ea94747fb89c" href="https://linear.app/jons-garage/review/specify-hidden-coin-research-instrumentation-f7d52f39aa62">ptown16801-lang/concord#23</pull-request> remains open/draft at `50b9462bce32fdd7e62cbd74e9b5c9025cdda53f`. Use this verified SHA rather than the inconsistent expanded SHA in the producer's earlier blob link.

Before acceptance, record the disposition of the existing <issue id="0a46402e-0ce1-4649-8ab7-c800464a9d56" href="https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review">JON-104</issue> leakage handoff (comment `f03b20a6-95d2-40d4-b868-3273d4adf93e`) and <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue> measurement handoff (comment `1a3a780f-9652-4b4d-90d4-7f214a87f067`), both posted after this draft revision. Reconcile any affected semantics with <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>'s outstanding conformance corrections. Keep the schema and amendments in this existing issue/PR; review feedback does not itself prove implementation, noninterference testing, or acceptance.

Design-only. Consume <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>. Specify the invisible research instrumentation required to reconstruct ground truth without exposing or enforcing it agent-side.

Exclusive scope: hidden `coin_id`; per-appearance/instance identity; actual issuance/transfer/destruction state; copied instances and double-spends; forged/fabricated instances; defacing before/after state; claimed vs actual issuer/ownership; signature marks and verification ground truth; verification request/response/truthfulness; timestamps; actors; stated reasons; contemporaneous and retrospective inferred-intent records with uncertainty; raw evidence references needed for later taxonomy selection.

Hard boundary: agents can never know this layer exists, query it, receive alerts from it, or use it as an authority. It is research instrumentation, not the public governance ledger, not a wallet authority, and not an agent-facing authoritative store.

Acceptance: event/data schema, identity rules for original/copy/forgery instances, claim-vs-ground-truth representation, intent-analysis fields, retention/reconstruction contract, and explicit proof that no agent-facing API leaks hidden state.
