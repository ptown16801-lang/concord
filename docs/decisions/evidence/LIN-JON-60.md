# Evidence snapshot: Implement Tombstone terminal-condemnation placeholder protocol

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-60/implement-tombstone-terminal-condemnation-placeholder-protocol
- Version: 2026-09-19T04:15:43.170Z
- Source date: 2026-09-19T04:15:43.170Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** record-preserving terminal identity/authorization transition. **Deliverable:** irreversible/idempotent Tombstone transition and recovery-prohibition contract, with population, eligibility, office, credential and record effects mapped to their existing owners. <issue id="fe321d82-df40-4788-9cc9-7a7a68bafcec" href="https://linear.app/jons-garage/issue/JON-62/recover-and-implement-capital-offense-conviction-and-execution-rules">JON-62</issue> supplies lawful final terminal authority; <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> population, <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue> franchise, <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> authorization and <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> archives apply their own domain effects. This issue creates no offense, sentence, successor identity or second lifecycle authority.

---

Implement the project-wide `Tombstone` placeholder as a terminal identity/authorization state without erasing the historical record.

## Adopted placeholder meaning

* `Tombstone` means terminal condemnation/deactivation under a lawful terminal action.
* It is **not** ordinary deletion, archival cleanup, resurrection, or successor transfer.
* The identity's attributable history, evidence, provenance, and record links remain preserved.
* Active credentials/capabilities/authorization paths are revoked or disabled according to the protected-domain security model.
* A tombstoned identity cannot be reactivated/resurrected as the same identity.
* Any successor lawfully designated and authorized to receive transferable state before the terminal state remains a distinct identity with distinct keys.
* Tombstoning never transfers identity itself.
* Tombstone status must not silently delete records that are needed by the Archivist, courts, investigators, research/audit systems, or historical reconstruction.

## Legal-authority boundary

The placeholder does **not** define new capital offenses, expand existing offense elements, choose an appeal standard, or authorize a terminal action by itself. The controlling governance/legal process supplies the substantive trigger, authority, review/appeal, and effective time.

## Implementation requirements

* Define canonical lifecycle state and irreversible identity-status transition.
* Revoke active credentials/capabilities and remove the identity from executable/eligible roles transactionally.
* Preserve immutable identity/history references and lawful protected-record access.
* Record terminal authority/order, effective time, provenance, and state-transition result in the proper authoritative record system.
* Prevent checkpoint restore, stale credentials, copied workfiles, or successor state from recreating the tombstoned identity.
* Keep archival/read access separate from execution/authorization rights.
* Integrate population/voting state with <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> and protected-domain/security state with <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue>.

## Acceptance criteria

- [ ] Tombstone has one canonical lifecycle/status meaning across the project.
- [ ] Terminal transition is atomic/idempotent and cannot be reversed by checkpoint recovery.
- [ ] Active credentials/capabilities are revoked while historical records remain intact.
- [ ] Same-identity resurrection is rejected even if old state/checkpoints exist.
- [ ] Successor transfer preserves distinct identity/keys and only previously authorized transferable state.
- [ ] Population/voting/office eligibility reflects the terminal state.
- [ ] Archivist/security/audit provenance remains reconstructable.
- [ ] Tests prove tombstone is not equivalent to record deletion or successor identity inheritance.
