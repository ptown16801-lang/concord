# Evidence snapshot: Persistent identity, memory, and succession model

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model
- Version: 2026-09-23T11:31:38.623Z
- Source date: 2026-09-23T11:31:38.623Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Delivery disposition — 2026-09-17

Design draft delivered in PR <pull-request id="1f60309d-b2fc-46e4-9d33-028dd0c8de62" href="https://linear.app/jons-garage/review/define-persistent-identity-and-succession-contract-7dcdfa1b05aa">ptown16801-lang/concord#15</pull-request> at `1e86688cc2ed45b174d675d353c47b96c8d5bbec`, matching producer receipt `a2fd27c5-f7fc-46ac-892d-ade6d4e7a4d2`. In Review reflects pending design acceptance, not an active producer or completed production implementation. Preserve the existing artifact; no duplicate authoring is needed.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** identity, memory and authorized successor-transfer design. **Deliverable:** one lifecycle/storage/reconstruction contract, separating identity from execution residency and keys, with provenance and design acceptance cases. <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> owns population issuance/counting; <issue id="7866b2c5-1c24-436c-9749-22b38e2a29ef" href="https://linear.app/jons-garage/issue/JON-60/implement-tombstone-terminal-condemnation-placeholder-protocol">JON-60</issue> owns terminal-state effects; <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> owns protected storage authorization; <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> owns archival/publication contracts. Consume those interfaces rather than create parallel authorities or a separate Workbench implementation. Death remains final; successor identity/keys remain distinct.

---

Canonicalize and implement the identity/persistence layer used by Concord.

## Accepted model

* Governance identity persists across execution sessions.
* Active execution concurrency is distinct from population.
* Durable checkpoints are reconstructive aids, not authority.
* Authoritative registry/current state wins after recovery.
* Complete attributable raw interaction history is preserved for the life of an identity.
* Private autobiographical memory and workfiles remain identity-isolated where host isolation is available.
* Total Recall is a living identity’s residency/resource state and does not free a population slot.
* Death is final. Transferable state may be passed before death, but successor identity/keys remain distinct.
* Historical knowledge distinguishes known-at-the-time, private longitudinal memory, and retrospective information.

## Work

Define the durable state boundaries, reconstruction order, checkpoint provenance, identity-to-storage isolation, successor-transfer authorization and Workbench views for lifecycle state. Make the archive/search layer aware of the difference between identity history and current authorization.
