# Concord documentation

Start with the [project overview](OVERVIEW.md) and [development status](PROJECT_STATUS.md). The overview explains Concord's design; the status page identifies which implementations are available on the default branch or separate development branches.

| Reader need | Guide |
| --- | --- |
| Understand the system | [Project overview](OVERVIEW.md) |
| Find implemented work and its limits | [Development status](PROJECT_STATUS.md) |
| Inspect or run available code | [Development guide](DEVELOPMENT.md) |
| Understand experiments and evidence | [Research guide](RESEARCH.md) |
| Understand negotiated work | [Marketplace and collaboration contract](ECONOMY_MARKETPLACE_CONTRACT.md) |
| Contribute a change | [Contribution guide](../CONTRIBUTING.md) |

## Accepted design specifications

These links identify the source revisions with recorded design acceptance. Maintained copies are included here with their exact source revisions and current qualifications. They document accepted designs, not runtime completion. The security contract explicitly identifies later admission requirements that supersede its older cancellation language.

- [Identity, memory, and succession](IDENTITY_PERSISTENCE_CONTRACT.md)
- [Agreement lifecycle](AGREEMENT_LIFECYCLE.md)
- [Protected domains and authoritative stores](SECURITY_DOMAIN_CONTRACT.md)
- [Scheduling, legality checking, and continuity](SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md)

## Implementation and research candidates

Read each candidate's scope and the [status page](PROJECT_STATUS.md) before treating it as an integrated capability.

- [Governance integration](https://github.com/ptown16801-lang/concord/pull/37) — combined governance components and subsequent repairs.
- [Synthetic scheduler evaluation](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/README.md) — evaluation harness, not a selected production scheduler.
- [Decision propagation pilot](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md) — bounded local synthetic implementation.
- [Coin integration design](https://github.com/ptown16801-lang/concord/blob/e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06/docs/COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md) — implementation plan and study requirements.
- [Generative Agents analysis](https://github.com/ptown16801-lang/concord/blob/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc/docs/GENERATIVE_AGENTS_ANALYSIS.md) — literature analysis and recommendations.

## Current component reference

The [browser interaction component reference](reference/component-runtime.md) documents the server, configuration, storage, replay, and data-handling details available on the default branch. It preserves the relevant technical material previously placed on the homepage.

## Decisions and provenance

The [decision register](../DECISIONS.md), [project record](../PROJECT_RECORD.md), and [source register](decisions/SOURCES.md) preserve detailed requirements and origins. Historical snapshots include superseded descriptions and dated review results. They support traceability; they are not the primary introduction to Concord.

## Detailed engineering and research documents

These documents identify their accepted boundaries, proposed details, and implementation limits individually.

- [Archivist publication](design/ARCHIVIST_PUBLICATION.md) — publication records, authority boundaries, and unexecuted acceptance scenarios.
- [Checkpoint neighborhoods](design/CHECKPOINT_NEIGHBORHOOD.md) — typed relationships and authorized exploration.
- [Population and voting](architecture/POPULATION_AND_VOTING.md) and [cross-component boundaries](design/POPULATION_VOTING_BOUNDARIES.md) — identity, eligibility, electorate, and integration responsibilities.
- [Sealed census](design/SEALED_CENSUS.md) — population accounting and protected visibility.
- [Relational observatory](design/RELATIONAL_OBSERVATORY.md) — temporal comparisons and interpretation limits.
- [Search and records](design/SEARCH_AND_RECORDS.md) — authorized discovery, record identity, and guide navigation.
- [Scheduler selection research](research/SCHEDULER_SELECTION.md) — evaluation requirements; candidates remain unselected.
- [Simulation and resilience study](research/SIMULATION_AND_RESILIENCE.md) — reproducible synthetic queue model, results, and limits.
- [Coin experiment references](research/coin-experiment/README.md), [observer boundaries](research/coin-experiment/OBSERVER_BOUNDARIES.md), and [measurement protocol requirements](research/coin-experiment/MEASUREMENT_PROTOCOL.md) — mechanisms, isolation requirements, measurements, and unresolved study choices.
- [Research Library](research/RESEARCH_LIBRARY.md) — design boundaries and retained holds.

## Reviewed proposals and repair plans

The following are documented proposals, not newly adopted production procedures or authorization to implement them:

- [Temporary restrictions](proposals/TEMPORARY_RESTRICTIONS.md)
- [Impeachment appeals](proposals/IMPEACHMENT_APPEALS.md)
- [Eligibility-boundary repair](proposals/ELIGIBILITY_BOUNDARY_REPAIR.md)
- [Government records database](proposals/GOVERNMENT_RECORDS.md) — domain map and SQL alternatives with dated comparison limits.
