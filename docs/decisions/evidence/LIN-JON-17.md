# Evidence snapshot: Security gateways, domain authorization, and authoritative stores

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `b5275c0e0a588dc7a562ad82755b7db55814799a`; original SHA-256: `fc68a8e6499b0859221fe2f90a644cb7224e377a1271bb43b71e2e2c725787dd`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T11:31:38.579Z
- Source date: 2026-09-23T11:31:38.579Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Delivery disposition — 2026-09-17

Design draft delivered in PR ptown16801-lang/concord#19 (private source reference withheld) at `49c19837191b83e93844653f7bf6259ee838d3ef`, matching producer receipt `1f08d84f-32a1-437f-9636-8bbc6de9778a`. In Review reflects pending acceptance of the security-domain design, not verified production isolation or an active producer. Preserve the existing draft and recorded checks.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** security-domain and authoritative-writer design. **Deliverable:** domain/identity/access matrix, AGT compatibility and capability contracts, expected-version/recovery rules and threat/acceptance scenarios. JON-35 (private source reference withheld) already settles admitted cross-domain operations: later revocation alone does not cancel a lawfully started operation, without waiving other validity checks or lawful cancellation. JON-15 (private source reference withheld) owns identity history; JON-18 (private source reference withheld) owns records/publication semantics; JON-59 (private source reference withheld) owns sealed-census visibility. Coordinate interfaces; do not author their separate authority models.

---

Implement Concord’s protected-domain security model without collapsing all privileges into one service.

## Accepted model

* Multiple independently isolated institutional Security Gateways.
* Domain-local authorization service per protected security domain.
* Dedicated Writer Service per protected domain.
* Read path: Agent → Gateway → authorized mediator/custodian → domain authorization → Read Service → authoritative store → controlled return.
* Write path: Agent → Gateway → authorized mediator → domain authorization → domain Writer → authoritative store.
* Protected backups retain the same domain separation as live stores.
* Corrupt/unavailable authoritative domains freeze and preserve evidence before authorized recovery.
* Microsoft Agent Governance Toolkit is the primary governance/security framework, retaining stronger controls including process/UID isolation, sealed privilege domains, expiring/one-use capabilities, expected-version transactional commits and controlled recovery.
* Deployment is Linux-only; host isolation assumptions and process/UID controls must be specified for Linux rather than generalized across other operating systems.
* Gateways participating in the same protected path must run synchronized, mutually compatible AGT/policy generations and **fail closed** when policy/generation compatibility cannot be established.
* Preserve the stronger SAS-style authorization semantics adopted by the project; AGT integration must not weaken sealed privilege domains, domain-local writers/stores, one-use/expiring capabilities, expected-version commits, or controlled recovery.
* House, Senate, and Judiciary investigatory archives remain separate security domains; no shared convenience store may collapse those archives into one privilege boundary.
* Temporary access expiry affects future use; exposure history remains attributable. Highest-risk material should use limited/non-retentive sessions when feasible.

## Work

Specify security-domain boundaries, service identities, writer/read-service contracts, AGT/policy generation compatibility, fail-closed mismatch behavior, SAS semantics, capability lifetimes, transaction/version semantics, revocation order, recovery authorization, separate investigatory-archive domains, logging and Workbench visibility. Do not expose protected queue/membership/mission metadata in public views.
