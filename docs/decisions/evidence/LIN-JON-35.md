# Evidence snapshot: Finalize cross-domain commit and revocation ordering

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `9d1f016e90ff83e7cefa002107763f49af312bbb`; original SHA-256: `9e22875e7a480cee9cf6f81c27028d9170f91000038a027b60c45b46cf65d574`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
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

Ordinary transaction/locking/recovery mechanics may be defined by the responsible engineering agents under JON-30 (private source reference withheld), provided they preserve protected-domain isolation and do not reinterpret later revocation as retroactively invalidating an already lawfully admitted operation.
