# JON-127 initial offline comparison — 2026-11-01

## Scope and provenance

The owner accepted the bounded JON-128 synthetic harness under JON-140 and separately authorized JON-127 comparison runs in this chat. The run began from a local `git archive` of exact harness revision `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6`. These artifacts are now preserved on an isolated local Git branch based on that revision. No network download or change to the main checkout was needed.

The compared methods are the harness's deterministic baseline and one hand-authored, offline `waitingFirst` rule in `comparison.mjs`. The latter prioritizes tasks with more consecutive waiting rounds, then stable task ID, and chooses an eligible incumbent or first eligible agent. It is an exploratory rule, not a GP/LLM-generated artifact, approved policy or lawful priority rule. All inputs are fabricated. No deadline/urgency ordering is applied.

The injected checker is a synthetic stub. Its approval does not prove a real legality or authorization service. The script asserts that a rejected/failed checker never results in an applied assignment. The harness also enforces eligibility and capacity.

## Checks and commands

* `node --test test/scheduler/*.test.js`: 34 passed, 0 failed on Node v24.21.0.
* `node comparison.mjs`: exit 0; seven paired synthetic scenarios completed.
* `sha256sum experiments/jon127/comparison.mjs experiments/jon127/comparison-results.json`: script `9857f8bc6200a67f16472f334d66d8b1966ce683f1ea60dbe3bdde74277c2ac5`; result `c627842207b7c664459ce8fcb7e22d9a6649999306f95f45f3159dee74143966`.

## Observed comparison

| Scenario | Baseline | Waiting-first rule |
| --- | --- | --- |
| Normal load | Two tasks complete, no wait or handoff | Same |
| Overload | Waiting task first served round 3; maximum total wait 3 | Waiting task first served round 1; maximum total wait 1 |
| Protected/public capacity | Both tasks complete with no wait | Same; synthetic authorization is respected |
| Starvation/handoff pressure | Waiting task first served round 3; no handoff | First served round 1; one handoff |
| Authority change | One forced handoff; task completes | Same |
| Checker outage | Round 1 does not apply; task unfinished at horizon | Same |
| Candidate failure | Not applicable to direct baseline | Failed candidate uses deterministic baseline and completes through the checker |

Both methods completed the same number of tasks within each scenario's horizon. The waiting-first rule shortened this constructed wait but caused an extra handoff in the constructed trade-off case. These observations do not rank the owner's unweighted continuity, fair rotation, starvation and handoff goals.

## Limits and next evidence

This is an initial synthetic comparison of two rule behaviors. It is not the JON-127 offline symbolic generation experiment, offline LLM artifact generation experiment, or approved-policy-selection experiment. Those require separately bounded artifacts and evidence. No production checker, protected data, policy registry, shadow evaluation, canary or deployment was exercised. Deadline performance cannot be assessed until a lawful priority vocabulary and test expectations are pinned; urgency strings in the accepted harness are descriptive only. No scheduler technology or policy is selected.

The repository main checkout remained untouched. An initial evidence copy was posted to JON-127 before these artifacts were put in Git; that Linear copy is superseded as the artifact source by this branch.
