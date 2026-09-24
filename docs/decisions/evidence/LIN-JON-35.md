# Evidence snapshot: Finalize cross-domain commit and revocation ordering

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering
- Version: 2026-09-23T11:31:38.571Z
- Source date: 2026-09-23T11:31:38.571Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## ADOPTED USER DECISION — authority at operation start controls

The project owner selected **Option A**.

For an authorized operation spanning multiple protected domains, authorization is evaluated at the operation's lawful start. Once the cross-domain operation has validly begun under that authority, a later revocation of the actor's authority does **not by itself cancel the already-started operation**; the operation may proceed to its defined completion/commit under the authority snapshot/capability that admitted it.

This rule does not authorize new operations after revocation and does not excuse failure of other required validity checks, expected-version/transactional conditions, domain invariants, or an explicit lawful cancellation mechanism applicable to the in-flight operation.

Implementation must bind the operation to authenticated start-time authority evidence, operation identity, participating domains, expected versions, and the admitted scope so the in-flight authorization cannot be expanded after revocation. Completion/abort evidence must be append-only and attributable.

Ordinary transaction/locking/recovery mechanics may be defined by the responsible engineering agents under <issue id="200fe456-c2a1-43a3-ac7f-9995dedb43ad" href="https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions">JON-30</issue>, provided they preserve protected-domain isolation and do not reinterpret later revocation as retroactively invalidating an already lawfully admitted operation.
