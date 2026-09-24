# Evidence snapshot: Persistent article acquisition, checkpoint, and recovery pipeline

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-76/persistent-article-acquisition-checkpoint-and-recovery-pipeline
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
- [ ] Identity verification feeds <issue id="91304de0-9b09-4806-813a-f31a0019335e" href="https://linear.app/jons-garage/issue/JON-40/library-integrity-gate-verify-pdf-attachments-against-canonical-gov">JON-40</issue> without creating a second canonical identity system.
- [ ] Mismatch/quarantine behavior is regression-tested.
- [ ] Duplicate/version handling is explicit and non-destructive.
- [ ] Retry/abandonment policy prevents infinite zero-yield loops.
- [ ] Status CSV/report plus recovery/update scripts can reproduce acquisition state.
- [ ] Package/checkpoint finalization preserves the previous valid state on failure.
