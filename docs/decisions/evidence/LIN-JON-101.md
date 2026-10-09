# Evidence snapshot: Coin model E — minimal agent-facing interface contract

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract
- Version: 2026-09-24T21:14:14.018Z
- Source date: 2026-09-24T21:14:14.018Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Design accepted after owner-requested audit — September 24, 2026

[Independent read-only ACCEPT](<https://linear.app/jons-garage/issue/JON-101#comment-620d4dfe-9b28-4d14-989e-adc5d8be6710>) binds PR <pull-request id="acf4adf9-e1e7-474f-aefa-2d197c5020f9" href="https://linear.app/jons-garage/review/jon-101-define-the-neutral-coin-interface-contract-8ad6843e9510">ptown16801-lang/concord#39</pull-request> to `81943cdebfc76fd0830dd70329fa17c5356085aa`. [JON-96 audit](<https://linear.app/jons-garage/issue/JON-96#comment-0f371111-5c32-4bb8-bd68-3111c1a19e31>) confirmed readiness for recorded design acceptance. Done covers the interface contract, neutral instructions and negative design cases, not runtime verification or merge. Earlier absent-artifact rejection read a different branch/revision and is superseded by the exact-head acceptance.

## Interface design delivered — September 24, 2026

<issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> and <issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue> are explicitly accepted. The existing <issue id="454fb972-eb24-4af9-be23-eea326b44450" href="https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract">JON-101</issue> task now has its first design artifact, `docs/COIN_MODEL_E_INTERFACE_V0.1.md`, on branch `docs/jon-101-coin-interface`. It specifies capability/response boundaries, neutral instructions and negative cases. Submitted to Linear for full design review; no runtime tests or implementation claimed. Earlier Backlog/hold prose is superseded for this authorized design delivery.

## Adopted decision propagation — ECON-02, September 24, 2026

[Project-wide decision record](<https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99>); [specification amendment 7073e9a](<https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md>).

The existing interface contract must express voluntary return through ordinary transfer to the prior sender and optional signing through the existing sign capability. Refusal alone causes no automatic return/destruction. Holders may retain indefinitely, destroy, alter/remove marks, transfer, select other coins or create-and-give. No special return/refusal endpoint, coin-selection priority, refusal-reason field, permanent-mark guarantee, automatic publicity, mandatory acknowledgment or hidden-state validation is required or authorized by this decision. Reasons may use otherwise permitted communication channels.

Required negative design cases: refusal message alone changes no coin state; sign plus transfer can return an appearance; indefinite retention does not block other actions; removal/destruction and new issuance remain possible; private return creates no public metadata; receipt is not acceptance and silence is not refusal. Keep agent instructions mechanical and purpose-neutral. This is propagation of owner-adopted terms into the existing task contract, not delivery/acceptance of the entire interface, a new issue/PR, or release of its <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>/<issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue> dependencies.

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

Design-only. Consume <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> and <issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue>. Specify the smallest neutral agent-facing capability surface without semantic/economic priming or behavior enforcement.

Exclusive scope: create-and-give, transfer, inspect, optional sign, alter/deface, destroy/claim destruction, and private storage/wallet convenience. Preserve issuer-specific whole coins, agent-facing label `fart coins`, originator display, visible marks/signatures, no formal transfer chain, no agent-visible ID, no public announcement mechanism, no central balance/ownership authority, no automatic fraud warning, and no semantic actions such as pay/buy/sell/endorse/credit/reputation.

The wallet cannot constrain what an agent claims or attempts. Existing forms/forum/future private communications may carry coin-related messages, but this issue must not create a duplicate forum or a mandatory task-linkage protocol.

Acceptance: capability/API-level design contract and agent instruction text that explains mechanics only, plus negative acceptance cases proving the interface does not reveal intended purpose, hidden research state, system valuation, or fraud ground truth.
