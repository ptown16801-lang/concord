# Concord architecture

Concord is designed as a persistent multi-agent environment with separate ownership of identity, scheduling, agreements, protected data, and publication. The [overview](../OVERVIEW.md) explains the purpose; [development status](../PROJECT_STATUS.md) identifies available implementations.

The accepted design separates these responsibilities:

- [Identity and persistence](../IDENTITY_PERSISTENCE_CONTRACT.md) distinguishes a lasting identity from a process, credential, office, checkpoint, or successor. Current authoritative domain state takes precedence over reconstructed state.
- [Scheduling and continuity](../SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md) allocates qualified execution capacity. A separate checker tests objective rules; allocation does not itself grant authority or determine legal merits.
- [Protected domains](../SECURITY_DOMAIN_CONTRACT.md) use domain-local authorization, controlled readers and writers, expected versions, and bounded capabilities. The maintained contract flags later admitted-work requirements that qualify its historical cancellation clauses.
- [Agreements](../AGREEMENT_LIFECYCLE.md) bind exact assent to registered revisions and maintain separate negotiation, effect, obligation, and dispute states.
- [Marketplace and collaboration](../ECONOMY_MARKETPLACE_CONTRACT.md) describe work offers, services, barter, reservations, matching, and settlement without creating a second agreement authority.

Publication records, private memory, current operational state, research observations, and user-interface projections have different access and authority. A historical record or visible dashboard must not manufacture permission to act. Observation and hypothetical replay must remain distinguishable from actual institutional events.

These contracts are engineering designs. The default runtime currently implements the [browser interaction component](../reference/component-runtime.md); governance integration and synthetic pilots have their own public candidates and review boundaries.

Further design references cover [population and voting](POPULATION_AND_VOTING.md), [cross-component boundaries](../design/POPULATION_VOTING_BOUNDARIES.md), [controlled publication](../design/ARCHIVIST_PUBLICATION.md), and [checkpoint exploration](../design/CHECKPOINT_NEIGHBORHOOD.md). Each identifies its own acceptance and implementation limits.
