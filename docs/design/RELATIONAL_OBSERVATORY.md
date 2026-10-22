# Relational and temporal observatory

Status: analytical design requirements. Historical presentation examples used synthetic or illustrative data; they do not establish a production pipeline over persistent observations. The missing implementation and validation work is tracked separately in [project status](../PROJECT_STATUS.md).

The observatory compares responses to the same underlying event or proposition. It must not infer a relationship from unrelated text that happens to look similar. Formal affiliation, observed behavior and an actor's trajectory over time remain different facts.

## Inputs and ownership

Source systems retain attributable discussion, reaction and other permitted events. The observatory owns matched-event identity, allowed inputs, metric definitions, uncertainty/missingness and analytical checks. Graph layout/navigation belongs to [checkpoint neighborhoods](CHECKPOINT_NEIGHBORHOOD.md); decision propagation owns its own transition and replay semantics. The observatory does not create those source events or become their authority.

The intended representation includes dyads, interaction history, article helpfulness/reactions, matched-event similarity, distance within and across groups, temporal change and relationship networks. Every computed relationship must retain the raw permitted evidence and show how it was derived. Authorization and visibility rules apply to the underlying telemetry as well as the displayed graph. Quiz records and scores are outside this design.

## Comparison discipline

Analyze each individual's trajectory, then the immediate subgroup, parent institution, comparable groups and overall population. Population averages must not erase local disagreement. A local difference may have many causes; similarity or divergence alone does not establish motive, loyalty, guilt, covert membership, conspiracy or correctness.

Each output needs the event/proposition identity, observation context and exposure, comparison population, uncertainty, missingness and alternative explanations. Metrics must be benchmarked before a score is treated as decision-relevant. A consequential claim requires independent evidence and its applicable procedure.

## Verification still required

The design calls for a persisted matched-event pipeline with versioned event/proposition identity; synthetic and known-case metric benchmarks; longitudinal and group-level baselines over actual authorized records; explicit telemetry retention/visibility; and visualization regression against validated backend outputs. Historical charts do not satisfy these requirements by themselves.

This page preserves the substantive current analytical contract. It does not revive historical Workbench implementation instructions or claim that missing historical UI bytes were recovered.
