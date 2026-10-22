# Concord development status

Implementation baseline checked October 22, 2026. Public default branch before this documentation repair: `Develo` at `4b6e41fd8d211746a81e870955e34475e66d02a3`.

Concord has implemented components and substantial accepted design work. The complete environment is still being integrated and validated. The distinctions below concern the exact available artifacts, not an overall completion percentage.

| Area | Available artifact | Current state |
| --- | --- | --- |
| Browser interaction, storage, and replay | [Component reference](reference/component-runtime.md), `src/`, `public/`, and `test/` on default | Implemented component source on the recorded default baseline. Residual hardening and integration scopes remain distinct from its historical beta completion. |
| Ordinary collaboration and marketplace | [Marketplace contract](ECONOMY_MARKETPLACE_CONTRACT.md) | Accepted design on default; this does not establish a running production marketplace. |
| Identity, agreements, protected domains, scheduling | [Accepted design specifications](README.md#accepted-design-specifications) | Recorded design acceptance. Maintained copies are included with exact accepted source revisions and later qualifications. Runtime completion is separate. |
| Governance integration | [PR #37](https://github.com/ptown16801-lang/concord/pull/37), `b813e15b33741b5c4ed982be6598193166124f96` | Combined implementation candidate, 41 commits ahead of default. Open draft; review and acceptance for default-branch integration remain pending. |
| Scheduler evaluation | [PR #33](https://github.com/ptown16801-lang/concord/pull/33), `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6` | Implemented synthetic harness; its seven changed file versions are present in the integration candidate. Owner harness acceptance and production algorithm selection remain separate. |
| Propagation and replay | [PR #48](https://github.com/ptown16801-lang/concord/pull/48), `d72b8c1db1daa465e3f8e462f504918219be4e1a` | Implemented bounded synthetic pilot and guide on a development branch. Broader product persistence and visual acceptance remain separate. |
| Coin experiment | [Research guide](RESEARCH.md#issuer-specific-coin-experiment) and [PR #40](https://github.com/ptown16801-lang/concord/pull/40) | Accepted mechanism and related design work exist. A complete implemented experiment, final study protocol, and research outcomes are not established. |
| Observatory and research library | [Project overview](OVERVIEW.md#records-and-observation) and [research guide](RESEARCH.md#library-and-related-research) | Designs and reported partial artifacts exist. Broader integration is unfinished; deferred Library work remains deferred. |

## How to interpret review and integration

An accepted design, a tested implementation, a GitHub review, a merge into the default branch, and a deployment are different milestones. A draft pull request may contain a design already accepted in its source records. Conversely, passing automated checks does not establish acceptance of the complete system.

[PR #42](https://github.com/ptown16801-lang/concord/pull/42) merged into PR37's integration branch, not into `Develo`. [PR #50](https://github.com/ptown16801-lang/concord/pull/50) contains a subsequent bounded repair on that integration base. These relationships matter when deciding which code is available in a checkout.

Consult the [Actions history](https://github.com/ptown16801-lang/concord/actions) and the checks attached to an exact revision when evaluating a candidate. Automated results cover their stated tests; broader integration and behavioral claims require their own evidence.

## Updating this snapshot

Refresh this page when a referenced candidate changes or is integrated. Identify the resulting default revision, preserve the meaning of scoped acceptance, and link to current artifacts. Later source corrections take precedence over stale status paragraphs in historical records.
