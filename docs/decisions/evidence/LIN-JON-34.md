# Evidence snapshot: Define confidentiality for refusal in sealed investigations

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-34/define-confidentiality-for-refusal-in-sealed-investigations
- Version: 2026-09-16T11:37:33.760Z
- Source date: 2026-09-16T11:37:33.760Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## ADOPTED USER DECISION — sealed now, auditable later

The project owner selected **Option C**.

When an agent refuses or declines participation in a sealed investigation, the refusal remains **completely sealed while investigative secrecy applies**. No public refusal event may reveal, directly or indirectly, the existence, scope, target, timing, protected metadata, or nature of the sealed investigation.

The protected investigative domain must create an authenticated, append-only refusal/nonparticipation record sufficient to establish who was asked, the lawful authority/context for the request, the response, relevant timing, and any reason that may lawfully be retained.

That sealed record may later be examined only through an **authorized review path**—for example a competent court, grand jury, or other lawfully authorized oversight mechanism—or disclosed when the applicable secrecy restriction lawfully ends. Access/disclosure itself must be recorded with provenance.

Ordinary technical and procedural mechanics may be defined locally under <issue id="200fe456-c2a1-43a3-ac7f-9995dedb43ad" href="https://linear.app/jons-garage/issue/JON-30/resolve-outstanding-governance-architecture-decisions">JON-30</issue>, but they must preserve confidentiality, due-process floors, protected-domain boundaries, authoritative records, and the later-auditability requirement.
