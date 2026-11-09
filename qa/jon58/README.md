# JON-58 adversarial fixture pack

This directory is the independently reviewable JON-88 preparation artifact. It contains declarative, synthetic test cases for later JON-82 integration and a dependency-free Node.js validator. It is **not** a population service, ballot model, production adapter, or claim that the combined system works.

## Version and source record

- Fixture pack: `jon58-adversarial@1.0.0`
- Deterministic seed: `jon58-fixtures-v1` (metadata only; fixtures use no randomness)
- Contract date: 2026-09-16
- Repository checkout: `/workspace/concord`
- Base branch and commit observed before work: `work` at `40f647e` (`Finalize Vote/Concord audit verification record`)
- Initial working tree: clean (`git status --short --branch` reported only `## work`)
- Work branch: `jon-88-adversarial-fixtures`

The fixture rules were transcribed from the Linear context supplied to this task: JON-58's accepted definitions, the JON-78 through JON-81 producer contracts summarized by JON-82/JON-88, JON-82 v1.1, JON-88 v1.0, and the referenced Concord agent workflow document. Those source artifacts are not present in this checkout, and producer APIs or implementation commits were not available here. Consequently, interface details remain `ADAPTER_PENDING`; this pack intentionally makes no API-shape assumptions and does not reproduce JON-87's interface audit.

## Contents and coverage

`fixtures/manifest.json` fixes the pack version, file order, seed, and adapter status. The six fixture files cover:

1. the population boundary, concurrent creation, uniqueness/rollback, and special identity classes;
2. first-valid ballot immutability, malformed correction, retries, duplicates, and late attempts;
3. post-ballot retention, pre-ballot disqualification, restoration, and close finality;
4. abstention, identity-set invariants, `D = |B| + |U|`, and exact 60%, two-thirds, three-quarters, strict-majority, unanimity, and `D=0` arithmetic;
5. allegations/referrals, authenticated C4 affected lists, and felony-conviction timing; and
6. deterministic restart/replay, duplicate delivery, crash boundaries, and exclusion of forum/helpfulness signals.

Every case carries an ID, source rule, initial state, ordered or explicitly concurrent schedule, defined expectation, and observations required from a future adapter. All named people are deliberately synthetic.

## Validate locally

Node.js is the only runtime dependency; the validator uses built-in modules and does not require `npm install`.

```sh
node qa/jon58/validate-fixtures.mjs
```

The validator checks the manifest and schema, globally unique case IDs, schedule ordering/concurrency metadata, synthetic and unique/disjoint `B` and `U` identities, opening-roll membership, `D = |B| + |U|`, exact `BigInt` threshold comparisons, the zero-denominator rule, fixed test/vector counts, and a reproducible SHA-256 over the versioned fixture bytes. The digest identifies the input artifact; it is not a production-state checksum.

## Future production-adapter integration

After JON-78 through JON-81 provide reviewable producer outputs and the JON-82 dispatch gate is cleared, an integration owner can build a separate adapter without changing fixture meaning:

1. Load cases in manifest order and establish `initialState` through the producer-supported setup path.
2. Translate each schedule operation to an actual producer command. Operations sharing a step and `group` must be issued with a real synchronization barrier; do not serialize them and call that a race test.
3. Capture committed state, durable receipts/events, rejection classifications, and transaction boundaries required by `adapterObserves`.
4. Normalize only representation (for example, sort identity-keyed sets); do not infer missing facts or treat the declarative expected result as the implementation.
5. Compare the observed result with `expected`, replay from durable storage, and retain per-case evidence tied to the exact combined producer SHA.
6. Report unsupported mappings as `ADAPTER_PENDING`, not passing. Keep harness validation distinct from production integration results.

## Limitations and gate

- **PRODUCTION_INTEGRATION_NOT_RUN.** JON-78 through JON-81 producer outputs were unavailable and JON-82 remains gated.
- The validator validates fixture quality, internal consistency, exact arithmetic, and byte-level reproducibility only. It never executes production behavior.
- `sourceRule` is concise traceability text, not a replacement for the authoritative issue contracts.
- Concurrent schedules describe required orchestration but this dependency-light validator does not create workers, databases, locks, crashes, or processes.
- Undefined APIs remain `ADAPTER_PENDING`; no endpoint, event schema, storage engine, or receipt format is invented here.
- Passing this validator must never be reported as JON-82 integration success or owner approval.
