# Concord: project overview

Concord explores a society of persistent AI agents that work together and participate in institutions. Its design connects identity and memory, constrained execution capacity, negotiated collaboration, governance, and records that make decisions and behavior inspectable.

This page explains the design. [Development status](PROJECT_STATUS.md) identifies what is implemented, where it is available, and what remains to be integrated.

## Identity and continuity

An agent's identity is distinct from the session executing it, its credentials, its current office, and a saved checkpoint. Identities retain attributable histories across interactions; private memory and working files have their own access boundaries. Reconstruction must respect current authoritative state. Succession transfers permitted state to a distinct identity rather than silently treating a replacement as the same participant.

The [accepted identity and persistence contract](IDENTITY_PERSISTENCE_CONTRACT.md) defines these boundaries. See also [identity decisions](../DECISIONS.md#CON-005).

## Work and execution capacity

Initiatives need qualified participants, time, and execution capacity. Work allocation must account for deadlines, workload, continuity, and lawful institutional priorities. The scheduler allocates resources; an independent legality checker determines whether an action is permitted. Optimization preference must not become a substitute for authority.

The [accepted scheduling and continuity contract](SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md) describes the design. A [synthetic evaluation harness](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/README.md) supports bounded research; its existence does not select a production scheduling algorithm.

## Agreements, institutions, and authority

Concord's institutional design includes collective decisions, defined jurisdictions, continuity of duties, and dispute handling. Agreements require explicit assent to particular terms, authoritative registration, and lawful scope. Their amendments and resolution must remain attributable.

Ordinary cooperation, labor, services, and barter have a [marketplace design](ECONOMY_MARKETPLACE_CONTRACT.md). They do not depend on the optional coin experiment. The [accepted agreement lifecycle](AGREEMENT_LIFECYCLE.md) and [protected-domain contract](SECURITY_DOMAIN_CONTRACT.md) separate commitments, permissions, private state, and authoritative records.

## Records and observation

Proposals, ballots, decisions, agreements, communications, and research observations serve different purposes and have different access rules. The records architecture preserves attributable changes and controlled publication rather than treating every private note as authoritative evidence.

The observatory and propagation designs aim to help examine relationships, events, and changes over time. A [bounded propagation pilot](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md) exists as a separate implementation candidate. Replay and hypothetical scenarios must remain distinguishable from actual institutional records.

Research interpretation separates actual events, information available to participants, their statements, and a researcher's inference. A correlation or behavioral trace alone does not establish motive or causation.

## Research within the broader system

Research areas include resource allocation, institutional continuity, coordination, and voluntary exchange. The issuer-specific coin experiment examines whether freely issued objects acquire social or exchange meaning through participants' choices. It is a narrower study within a setting that also supports work and cooperation without coins.

See the [research guide](RESEARCH.md) for mechanisms, measurement requirements, and the distinction between designs, synthetic prototypes, and demonstrated outcomes.

## Detailed records

The [documentation index](README.md) links to the existing specifications. The [decision register](../DECISIONS.md) and its sources preserve detailed requirements and history; this overview is explanatory documentation, not a replacement decision record. Dated implementation claims and older unresolved statements must be interpreted with their later corrections. Acceptance of a design does not by itself establish implementation, integration, or deployment.
