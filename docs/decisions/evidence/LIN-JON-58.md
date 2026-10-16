# Evidence snapshot: Implement authoritative population, voting eligibility, and exact ballot accounting

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot
- Version: 2026-09-19T04:15:38.310Z
- Source date: 2026-09-19T04:15:38.310Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Work type:** parked design-coordination parent; Backlog does not erase delivered children. **Deliverable:** one accepted design interface/ownership matrix for <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> population, <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue> eligibility, <issue id="222e207e-e722-4b1e-bc8a-691f1c41d8e3" href="https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling">JON-80</issue> ballot receipts, <issue id="3adec4a1-9036-4132-80cd-fd0ffc3eb1d7" href="https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting">JON-81</issue> accounting and <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> boundary coordination. Reuse <issue id="99b1f17f-3716-40af-b9fa-c65c845d6d5f" href="https://linear.app/jons-garage/issue/JON-87/jon-82a-cross-track-interface-and-integration-readiness-audit">JON-87</issue>'s delivered fifteen-finding report and <issue id="2bdd3887-360e-4cd7-ac1b-3c61672a71d1" href="https://linear.app/jons-garage/issue/JON-88/jon-82b-independent-adversarial-fixtures-and-test-harness-preparation">JON-88</issue>'s existing scenario/fixture evidence; no duplicate parent implementation or repeat source audit. Existing producer PRs/CI remain separate historical evidence, not completed integration. Assign only one owner to each contract and reference consumer dependencies instead of creating parallel authorities.

---

## Scope and completion clarification — migration audit

The currently permitted slice is design coordination; the original implementation and verification obligations below are not canceled, satisfied, or transferred by placement in milestone A. Preserve the existing producer artifacts and child ownership. Do not mark this parent Done solely because an interface matrix or child review report exists; evaluate its retained acceptance criteria with evidence when the appropriate work is authorized. Milestone membership does not make every other A issue a prerequisite for this parent's implementation children.

## Historical coordination checkpoint — 2026-09-16 audit; not current execution state

This parent coordinates <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue>–82; its In Progress status does not identify another implementation worker. Producer artifacts are published as draft PRs <pull-request id="3fe649c1-7d99-47b2-af3f-83cd196a1c73" href="https://linear.app/jons-garage/review/jon-78-recover-verified-population-registry-and-300-cap-implementation-108508d2acfd">ptown16801-lang/concord#6</pull-request>–9 and fixture preparation as <pull-request id="acbc7d87-af75-4150-a90e-1d807a3a754a" href="https://linear.app/jons-garage/review/jon-88-recover-existing-adversarial-fixture-pack-and-validator-b4f8775d54c4">ptown16801-lang/concord#10</pull-request>; follow-up workflow/audit-integrity fixes are draft PRs <pull-request id="131795a5-68c1-434e-8979-b8d492d73634" href="https://linear.app/jons-garage/review/guard-project-dispatch-and-run-standalone-fixture-validation-67581dbf4fe8">ptown16801-lang/concord#11</pull-request>–12. Published candidates and passing isolated CI are not acceptance or combined integration. <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> remains gated on explicit producer acceptance/pins and actual combined verification. Preserve existing tasks and avoid duplicate parent implementation. The governing rules and unchecked implementation acceptance items below remain authoritative.

Implement the adopted population/voting accounting invariants as authoritative state rather than UI-derived counts.

## Accepted rules

* Global living-agent population ceiling: 300.
* The current self-contained governing source proposes a founding population of **40 genuine ordinary governance identities**, five in each of eight permanent divisions. Earlier migration notes used a different bootstrap figure; that older figure is non-controlling for the v2.2 baseline unless the user expressly reincorporates it.
* Ordinary post-founding identity creation has two distinct lawful routes reflected in the recovered sources: recorded elected-Executive authorization within population/capacity limits, and an **additional** agent-initiated petition route to add one identity to an existing division. **Project-owner decision, 2026-09-16:** the former special supermajority approval threshold is removed. The petition route no longer has a standalone special-percentage rule.
* The first valid ballot is immutable; a later submission must not silently replace it.
* Exact ballot accounting is mandatory. The controlling source uses the invariant `D = B + U`.
* Death/capital termination is final and cannot vote.
* New-ballot eligibility is barred by the recovered formal-proceeding rule; a mere allegation is not enough. A lawful felony conviction creates the permanent franchise bar immediately at the conviction event.
* Forum reactions/helpfulness signals are never constitutional ballots.

## Recovered controlling ballot/franchise definitions

The archived controlling constitution/master-prompt source resolves the earlier Linear gap:

* **B** = opening-roll identities whose valid accepted ballot exists, including valid abstention.
* **U** = opening-roll identities with no valid accepted ballot that remain eligible in that electorate.
* `D = |B| + |U|`; B and U are disjoint and each identity occurs at most once.
* Threshold arithmetic is integer-exact: 60%=`ceil(3*D/5)`, two-thirds=`ceil(2*D/3)`, three-quarters=`ceil(3*D/4)`, strict majority=`floor(D/2)+1`, unanimity=D; no threshold vote passes with D=0.
* A first valid accepted ballot is immutable. Rejected/malformed attempts may be corrected before close only while the opening-roll identity remains eligible; rejected attempts remain recorded.
* Living participating development identities have franchise unless excluded by the controlling rules. Game players, nonexistent/naturally dead/capital-terminated identities, identities **under a formal proceeding**, permanently felony-disenfranchised identities, E-COAIAs, L-COAIAs, and CRA identities may not cast new ballots.
* Mere allegation, ordinary defect report, retirement, scheduling pause, dissent, C4 referral, or bare allegation is not disqualification. For C4, temporary ineligibility begins only with a court `C4_CREATION_EVENT_OPEN` and authenticated affected-identity list.
* Death/charges/other disqualification after a valid ballot leave that ballot in B and the voter in D for that election; pre-ballot disqualification removes the identity from U while ineligible. A temporary restriction ending before close can return an otherwise eligible opening-roll nonvoter to U; restoration after close does not reopen the result.
* A lawful felony conviction permanently removes franchise immediately when the authorized court or Senate enters the conviction; appeal/sentence finality is separately tracked.

## Implementation requirements

* Authoritative population registry/census state is the source for population and eligibility counts.
* Ballot identity, eligibility-at-submission, first-valid-ballot state, and immutable ballot receipt must be attributable and reconstructable.
* Duplicate/late submissions cannot alter the first valid ballot; they may be recorded as separate rejected/duplicate events.
* Exact totals must be mechanically reconcilable under the recovered `D = B + U` definitions.
* Creation/removal/death/formal-proceeding/felony and temporary-restoration state transitions must update the correct authoritative eligibility/population views transactionally.
* No hidden investigator class may evade the global ceiling; coordinate with the secret-investigator census issue.

## Acceptance criteria

- [X] Recover and record authoritative definitions of `D`, `B`, `U` from the controlling source.
- [X] Recover and record the formal-proceeding / allegation / C4 temporary-ineligibility wording from the controlling source.
- [ ] Population ceiling invariant is mechanically enforced at 300.
- [X] Remove the former special add-agent petition supermajority threshold and its denominator ambiguity from the controlling rules.
- [ ] First-valid-ballot immutability is regression-tested against duplicates/retries/races.
- [ ] Eligibility transitions for death/formal-proceeding/felony/temporary-restoration states are versioned and auditable.
- [ ] Exact ballot reconciliation tests prove the recovered accounting invariant.
- [ ] Forum/social reactions cannot enter the constitutional ballot table/path.
- [ ] Cross-checks with dual-census/secret-investigator accounting prevent ceiling bypass.
