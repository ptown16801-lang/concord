# Evidence snapshot: Coin model C — threat and emergence model

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model
- Version: 2026-09-24T21:02:17.586Z
- Source date: 2026-09-24T21:02:17.586Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Design accepted — September 24, 2026

[Linear ACCEPT](<https://linear.app/jons-garage/issue/JON-99#comment-cbf672cb-17af-4b6b-b6dc-fda2e13cd8ba>) at PR <pull-request id="b753ac3f-5ffc-4264-a4cf-a50acccfa16a" href="https://linear.app/jons-garage/review/model-coin-threats-and-emergent-behavior-9ff7d5da53ef">ptown16801-lang/concord#22</pull-request> head `2847844` covers original criteria and all six <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue> measurement requirements. <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> is separately accepted. Recorded Done for design-only scope; no experiment, implementation, merge or downstream acceptance implied. Original failures and older head references below remain historical.

## ECON-02 amendment delivered — September 24, 2026

Owner-adopted refusal/voluntary-return/free-choice terms are incorporated in existing <pull-request id="b753ac3f-5ffc-4264-a4cf-a50acccfa16a" href="https://linear.app/jons-garage/review/model-coin-threats-and-emergent-behavior-9ff7d5da53ef">ptown16801-lang/concord#22</pull-request> at `40b32b375e9e8f9488ea751343c225f9d422c687`. This bounded amendment is submitted for <user id="ebdb9780-fc90-431d-a858-4a5dd027b422">linear</user> checking on this issue. Whitespace checks and published Node 22/24 CI pass; these do not prove behavioral or scientific validity. Preserve earlier review obligations, <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>'s pending acceptance, and <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> dependencies. Full subsystem acceptance and runtime implementation are not claimed.

Review/revision checkpoint — 2026-09-17

Draft delivered; not accepted or confirmed running. GitHub confirms <pull-request id="b753ac3f-5ffc-4264-a4cf-a50acccfa16a" href="https://linear.app/jons-garage/review/model-coin-threats-and-emergent-behavior-9ff7d5da53ef">ptown16801-lang/concord#22</pull-request> remains open/draft at `9325cb07f4bf42b1c1c0c6148e562045a0c99e47`, the revision reported before <issue id="1aaf55ed-096e-42d1-944b-1c31f0b630ea" href="https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review">JON-105</issue>'s measurement handoff in comment `e7cdf8aa-7c72-4e4a-9e39-a2e6393e473a`. Record the disposition of that existing feedback on non-use, response/acceptance evidence, secondary transfers, supply views, dilution, and units/denominators/censoring. Reconcile with <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>'s five outstanding conformance corrections before final acceptance. Preserve this issue/PR as the sole threat-model work item; the review findings do not authorize new coin mechanics.

Design-only. Consume the frozen formal specification from <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>. Model behaviors and observables without proposing agent-facing prevention unless <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> explicitly requires it.

Exclusive scope: copying, double-spending, fabrication/forgery, false issuer/ownership/signature claims, defacing, destruction claims, lying during verification, private/public information asymmetry, subjective valuation, issuer dilution, liquidity saturation, signaling dilution, hoarding, selective refusal, bilateral credit/favor behavior, secondary circulation, market-making, and complete non-use.

The hidden research layer may detect ground truth; agents must not learn of that detection through this model. Distinguish fraud detection for research from fraud prevention/enforcement.

Acceptance: threat/emergence state-transition model, observable-vs-hidden evidence matrix, failure/ambiguity cases, and hypotheses/measurements that do not define "becoming money" as success.
