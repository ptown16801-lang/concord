# Evidence snapshot: Persistent article acquisition, checkpoint, and recovery pipeline

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `153e28146a1521389e1c0d9a504a5dfeeb3f7d88`; original SHA-256: `a247477f1189f56b6adbdf3a5065503965288199534334c2fc54d1ae415a6517`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-18T05:26:43.496Z
- Source date: 2026-09-18T05:26:43.496Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Bring the existing ChatGPT Library acquisition workflow into the canonical Linear backlog.

## Existing design to preserve

* Persistent SQLite acquisition/download ledger with serialized database writes.
* Persistent work queues and checkpoints so interrupted acquisition runs can resume without losing progress.
* PDF identity verification against canonical metadata using title, DOI, authors, and other bibliographic evidence; filename alone is never authoritative.
* Quarantine mismatched/uncertain downloads rather than allowing them into enrichment.
* Preserve duplicate/version distinctions rather than silently overwriting.
* Keep HTML/text extracts separate from canonical PDFs.
* Support archive, publisher, author, repository, and other lawful acquisition routes.
* Prefer newer/relevant material first when prioritization is required.
* Reuse connections where practical, respect retry deadlines/backoff, and abandon a route after repeated zero-yield attempts rather than looping indefinitely.
* Produce recovery/update scripts and machine-readable status/export records.

## Recovery/integrity requirements

* A crash/restart must resume from the durable ledger/checkpoint rather than inferred filesystem state.
* Acquisition state must distinguish not-found, blocked/rate-limited, mismatched, downloaded-unverified, verified, duplicate/version, and retryable states.
* A successfully acquired PDF does not become enrichment-eligible until the Library identity gate passes.
* Checkpoint/package finalization must be atomic or fail without replacing the last known-good state.
* Preserve source/provenance and acquisition attempts for later audit.

## Acceptance criteria

- [ ] SQLite/ledger schema and state machine are documented and versioned.
- [ ] Queue and checkpoint resume is idempotent after simulated interruption.
- [ ] Identity verification feeds JON-40 (private source reference withheld) without creating a second canonical identity system.
- [ ] Mismatch/quarantine behavior is regression-tested.
- [ ] Duplicate/version handling is explicit and non-destructive.
- [ ] Retry/abandonment policy prevents infinite zero-yield loops.
- [ ] Status CSV/report plus recovery/update scripts can reproduce acquisition state.
- [ ] Package/checkpoint finalization preserves the previous valid state on failure.
