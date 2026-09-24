# Evidence snapshot: Security gateways, domain authorization, and authoritative stores

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores
- Version: 2026-09-23T11:31:38.579Z
- Source date: 2026-09-23T11:31:38.579Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Delivery disposition — 2026-09-17

Design draft delivered in PR <pull-request id="97398c4a-8bc0-42cd-a0c0-f087067ced37" href="https://linear.app/jons-garage/review/define-protected-domain-security-contract-74c16b3cb3d9">ptown16801-lang/concord#19</pull-request> at `49c19837191b83e93844653f7bf6259ee838d3ef`, matching producer receipt `1f08d84f-32a1-437f-9636-8bbc6de9778a`. In Review reflects pending acceptance of the security-domain design, not verified production isolation or an active producer. Preserve the existing draft and recorded checks.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** security-domain and authoritative-writer design. **Deliverable:** domain/identity/access matrix, AGT compatibility and capability contracts, expected-version/recovery rules and threat/acceptance scenarios. <issue id="01f01456-3c06-45aa-af7b-10c99f6cd777" href="https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering">JON-35</issue> already settles admitted cross-domain operations: later revocation alone does not cancel a lawfully started operation, without waiving other validity checks or lawful cancellation. <issue id="9456331b-a71c-4a13-beb6-b627a381d12f" href="https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model">JON-15</issue> owns identity history; <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> owns records/publication semantics; <issue id="f2fca42c-1775-4671-9155-c41d34e2415d" href="https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement">JON-59</issue> owns sealed-census visibility. Coordinate interfaces; do not author their separate authority models.

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
