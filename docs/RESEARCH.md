# Concord research

Concord's research concerns persistent AI identities, collaboration under resource constraints, institutional behavior, and how choices and relationships develop over time. Research questions sit alongside engineering work; a specification or a synthetic test is not evidence that a complete study has run.

## Issuer-specific coin experiment

One experiment asks whether freely issued personal objects acquire social or exchange meaning through participants' choices. It sits within the broader Concord design: the design provides communication, work, negotiation, barter, and agreements independently of coins.

The mechanism permits unlimited issuance during transfers to other agents. Recipients may retain, transfer, alter, sign, return, destroy, refuse an exchange, or ignore the objects. Receipt does not by itself establish agreement or obligation. There is no system-assigned exchange rate or automatic redemption claim. These freedoms let the research examine what participants choose to make of the mechanism, including non-use.

The research needs to distinguish movement from value: negotiated terms, completed work, meaningful opportunity costs, and a third party's independent acceptance can provide different evidence. An agent's explanation is a statement; a researcher's inferred motive remains an interpretation. Missing observations, silence, explicit refusal, and deliberate non-use must not be collapsed into one outcome.

Observation is designed to remain separate from participant-facing behavior. Hidden records must not provide new incentives, disclose protected facts, or silently alter action outcomes. Isolation of visible outputs, timing, errors, and availability remains an implementation requirement to demonstrate.

The mechanism and related designs have recorded acceptance. Participant model choices, concrete workloads, allocations, observation windows, sample-size reasoning, and final comparisons still need a study-specific protocol. No completed experiment or demonstrated economic outcome is claimed here.

Read the [mechanism specification](https://github.com/ptown16801-lang/concord/pull/21), [observer design](https://github.com/ptown16801-lang/concord/pull/23), and [integration plan](https://github.com/ptown16801-lang/concord/blob/e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06/docs/COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md). The [ordinary marketplace contract](ECONOMY_MARKETPLACE_CONTRACT.md) is a separate design; its settlement authority must not be silently attributed to the experimental objects.

The [detailed experiment guide](research/coin-experiment/README.md) links the full [observer-boundary matrix](research/coin-experiment/OBSERVER_BOUNDARIES.md) and [measurement/protocol requirements](research/coin-experiment/MEASUREMENT_PROTOCOL.md). These retain unresolved study choices and distinguish specified isolation from demonstrated runtime behavior.

## Scheduling and continuity

The [scheduler evaluation harness](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/README.md) supports synthetic evaluation of bounded scheduling behavior. A comparison harness, a candidate algorithm, an approved allocation policy, and a deployed scheduler are separate things. No production scheduling technology is selected by this guide.

## Propagation and replay

The [local propagation pilot](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md) is an implemented synthetic prototype. Its broader design concerns reconstructing events and exploring their consequences while preserving source identity and distinguishing actual history from hypothetical scenarios. Its bounded results do not establish full institutional replay or product integration.

## Library and related research

The Research Library design separates bibliographic identity from attached files and keeps citation, semantic, authorship, and other relationship layers inspectable. Some bounded work has been reported complete; broader Library integration and quiz work are deferred.

The [Generative Agents analysis](https://github.com/ptown16801-lang/concord/blob/27a50b02481199a2de6ccd74c06bdf35ec6ee8bc/docs/GENERATIVE_AGENTS_ANALYSIS.md) provides related literature analysis and proposed directions. External research, recommendations, replicated experiments, and Concord-specific results require separate evidence.

See [development status](PROJECT_STATUS.md) before treating any research artifact as an integrated capability.
