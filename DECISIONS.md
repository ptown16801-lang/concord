# Concord decisions

**Integration-ready candidate · coverage 2026-09-24.** Canonical identity: repository
`ptown16801-lang/concord`, path `/DECISIONS.md`, designated integration branch `Develo`.
Candidate branch: `docs/decisions-consolidation-20260924`, based on
`29ca0b44cf8d911df6978e84c7a91e7777afd304`. Until integration, this is a proposed
consolidation of existing decisions, not an assertion that Develo already contains it.
Other branch copies and source snapshots are not coequal masters. Integration into
Develo is the documentation destination, not approval of unrelated product branches.

Later explicit owner corrections control over conflicting summaries. Acceptance is
separate from implementation, verification, publication and execution permission.
Accepted entries below cite recorded acceptance or a source explicitly identifying the
rule as adopted; inherited decisions with missing original interview dates say so.
This is not a new constitution, a production-security certificate or a waiver of holds.
No decision is adopted merely because it was merged, tested, filed or marked Done.

Read [source register](docs/decisions/SOURCES.md), [reconciliation](docs/decisions/RECONCILIATION.md),
[maintenance workflow](docs/decisions/WORKFLOW.md), [validation](docs/decisions/VALIDATION.md)
and [publication receipt](docs/decisions/RECEIPT.md). The [difference audit](docs/decisions/RECONCILIATION_AUDIT_2026-09-24.md)
records later cross-thread changes and their disposition. Exact supporting text is retained
as dated evidence, including failed/rejected drafts. Generated [current summary](CURRENT_DECISIONS.md)
is navigation only. Missing originals and narrow ambiguity are explicit entries below.

## Navigation

- [Identity and constitutional foundation](#identity-and-constitutional-foundation)
- [Resolved governance questions](#resolved-governance-questions)
- [Security, publication and agreements](#security-publication-and-agreements)
- [Economy](#economy)
- [Interface, archives and research](#interface-archives-and-research)
- [Roles, holds and maintenance](#roles-holds-and-maintenance)
- [Unresolved evidence and preserved history](#unresolved-evidence-and-preserved-history)

## Identifier preservation

New `CON-###` IDs identify this consolidation’s entries; they do not overwrite older
IDs. Existing `ECON-01`, `ECON-02`, `ECON-03` retain their identities. Subsystem IDs
(such as coin `INV-01`–`INV-31`) remain namespaced by their exact source; see the mapping
in RECONCILIATION.md. Historical mapping records `DEC-004` = player-state ownership,
`DEC-007` = authoritative game persistence/exports, `DEC-008` = protected government
datastores. An earlier persistence proposal reused DEC-004; do not use that collision
as a second definition. Full original DEC wording/scope is not independently recovered,
so no unknown DEC identifier is reallocated or silently promoted here.

Existing CONCORD-WF-001 identifies the local role-workflow proposal covered by
CON-071; CONCORD-WF-002 retains its original ID as the accepted consultation
instruction below. These are distinct source decisions, not renumbered CON entries.


## Identity and constitutional foundation

<a id="CON-001"></a>
### CON-001 — Project identity and boundary

- Status: Accepted
- Scope: All Concord work
- Acceptance: Explicit owner correction, reaffirmed in this task.
- Acceptance date: 2026-09-16; reaffirmed 2026-09-24
- Sources: [OWNER-TASK](docs/decisions/evidence/OWNER-TASK.md), [LIN-IDENTITY](docs/decisions/evidence/LIN-IDENTITY.md)
- Supersedes: CON-090
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Concord and The Form are separate peer projects. Vote is their folder name only; Voat was a typo. Research Library, Archive & Records, Storage & Persistence, Visualization and Finger are bounded Concord workstreams. The Form owns forum state; Concord consumes accepted interfaces and permitted analysis. The Form = Governance Commons naming equivalence remains an explicit assumption, not an adopted identity.

<a id="CON-002"></a>
### CON-002 — Linux deployment

- Status: Accepted
- Scope: Concord deployment and isolation
- Acceptance: Explicit owner requirement, reaffirmed in this task.
- Acceptance date: 2026-09-24 (reaffirmation; original date unavailable)
- Sources: [OWNER-TASK](docs/decisions/evidence/OWNER-TASK.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Deployment, process isolation, filesystem permissions, service boundaries and recovery checks target Linux. Do not infer other operating-system support from historical prototypes or device/browser interaction notes.

<a id="CON-003"></a>
### CON-003 — Owner supremacy and entrenched constitution

- Status: Accepted
- Scope: Simulation governance
- Acceptance: Recorded accepted constitutional baseline; exact original master-prompt bytes remain an evidence gap.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [LIN-JON-59](docs/decisions/evidence/LIN-JON-59.md), [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Article 0/user supremacy remains non-amendable by government. The jointly effective Articles 20–21 E-COAIA/L-COAIA/CRA package is an exact-text, jointly adopted, governmentally unamendable package. Check these constraints before constitutional changes commit; institutional interpretation cannot retroactively create an offense or circumvent entrenchment. This register consolidates recovered rules and does not reconstruct missing exact constitutional text.

<a id="CON-004"></a>
### CON-004 — Institutional self-rule

- Status: Accepted
- Scope: Ordinary procedure and engineering
- Acceptance: Controlling user decision recorded in JON-30.
- Acceptance date: 2026-09-16
- Sources: [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Avoid repeated owner interviews for routine mechanics while preserving reserved authority.

The group, branch, division, agreement parties or engineering team bearing responsibility decides ordinary low-level procedure within lawful jurisdiction. Preserve global identity/population and ballot invariants, due-process floors, Article 0, protected records, security boundaries and entrenched rules. Self-rule cannot enlarge jurisdiction or erase another institution’s rights. Reserve owner escalation for cross-institution authority, global/immutable rights, non-amendable constraints or explicitly reserved choices.

<a id="CON-005"></a>
### CON-005 — Persistent identities and memory

- Status: Accepted
- Scope: Governance identities
- Acceptance: JON-15 design acceptance comments 55b3eb73-c356-4319-9476-ee9d048ffc50 and 2ddf0742-5453-442b-8e6c-8e6b3b9f5fca bind PR15 / 1e86688.
- Acceptance date: 2026-09-18
- Sources: [LIN-JON-15-COMMENTS](docs/decisions/evidence/LIN-JON-15-COMMENTS.md), [GIT-IDENTITY](docs/decisions/evidence/GIT-IDENTITY.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Identity is distinct from an execution session, credential, office, checkpoint or UI view. Authoritative registry/current domain state controls reconstruction; durable per-agent checkpoints are non-authoritative. Retain complete attributable raw interaction history for the identity’s lifetime. Isolate private autobiographical memory/workfiles by identity where the host supports it. Distinguish knowledge available at the time, private longitudinal memory and retrospective information.

<a id="CON-006"></a>
### CON-006 — Total Recall, succession and final death

- Status: Accepted
- Scope: Identity lifecycle
- Acceptance: Accepted identity contract and recovered terminal protocol.
- Acceptance date: 2026-09-18 (identity design acceptance)
- Sources: [LIN-JON-15-COMMENTS](docs/decisions/evidence/LIN-JON-15-COMMENTS.md), [GIT-IDENTITY](docs/decisions/evidence/GIT-IDENTITY.md), [LIN-JON-60](docs/decisions/evidence/LIN-JON-60.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Total Recall changes residency/resources for a living identity; it is not death, termination, office change or a population-slot release. While alive and authorized, an identity may transfer allowlisted transferable state to a willing lawful successor, with provenance. The successor has a distinct identity and keys. Death is final; checkpoint restoration cannot resurrect the same identity. Tombstone preserves historical attribution while terminally disabling active authorization and credentials. It defines neither guilt nor additional grounds for termination.

<a id="CON-007"></a>
### CON-007 — Founding count source qualification

- Status: Unresolved
- Scope: Founding population
- Acceptance: Unavailable: exact original adoption evidence required.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-58](docs/decisions/evidence/LIN-JON-58.md), [AUDIT-DIRECTORY](docs/decisions/evidence/AUDIT-DIRECTORY.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: A current-looking recovered source is not sufficient to erase its explicit proposal wording.

JON-58 calls the v2.2 founding baseline 40 genuine ordinary identities, five in each of eight permanent divisions, but uses the word “proposes.” The v2.2 original and original adoption record were not recovered here. Preserve 40 as the recorded candidate baseline; do not promote it to an adopted founding count or substitute an older bootstrap figure.

<a id="CON-008"></a>
### CON-008 — Population ceiling and dual census

- Status: Accepted
- Scope: Population, representation and capacity
- Acceptance: Recovered accepted census/ceiling rules; original exact-text package is indexed but unavailable.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-59](docs/decisions/evidence/LIN-JON-59.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Count all living ordinary developers, E-COAIAs and L-COAIAs in T, the live sealed capacity census. R, the phase-cutoff sealed representation census, counts those classes exactly once in their permanent divisions and alone determines phase House apportionment and Electoral College allocation. R is not a ballot roll. C counts all living CRA identities even when jailed, restricted, removed or handing off; at most one has active CRA authority. P counts unexpired reserved creations; K is the protected unused CRA recovery unit. Enforce G = T + C ≤ 300 and T + C + P + K ≤ 300. Routine creation requires K=1. Exclude C/P/K and pending creations from R. Fail closed if required authoritative state, seals or compatible generations cannot be established.

<a id="CON-009"></a>
### CON-009 — Secret investigators and census opacity

- Status: Accepted
- Scope: Protected investigative identities
- Acceptance: Recovered accepted investigator/census package.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-59](docs/decisions/evidence/LIN-JON-59.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

E-COAIAs and L-COAIAs are genuine secret non-voting identities. They never enter political opening rolls or B/U/D; unsealing grants no franchise or office eligibility. Mission completion permanently deactivates the identity; reuse, conversion, reassignment or reactivation is forbidden. Public/executive views must not disclose investigator rosters, raw R/T, class or combined covert counts, or true headroom. Executive knowledge is limited to its own E-COAIAs; chamber custody is limited to its own authorized L-COAIA records.

<a id="CON-010"></a>
### CON-010 — Identity creation routes

- Status: Accepted
- Scope: Ordinary post-founding identities
- Acceptance: Explicit September 16 owner decision recorded in JON-58.
- Acceptance date: 2026-09-16
- Sources: [LIN-JON-58](docs/decisions/evidence/LIN-JON-58.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Recorded elected-Executive authorization within capacity limits and an additional agent-initiated petition to add one identity to an existing division are distinct creation routes. The owner removed the former special petition supermajority; do not reinstate a standalone special-percentage threshold. This does not waive other lawful authorization, registry or capacity requirements.

<a id="CON-011"></a>
### CON-011 — Electorate and exact arithmetic

- Status: Accepted
- Scope: Every constitutional ballot
- Acceptance: Recovered controlling ballot definitions; not inferred from implementation tests.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-58](docs/decisions/evidence/LIN-JON-58.md), [LIN-JON-81](docs/decisions/evidence/LIN-JON-81.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Freeze an opening roll. B consists of opening-roll identities with a valid accepted ballot, including abstention; U consists of opening-roll identities with no accepted ballot that remain eligible. B and U are disjoint; each identity occurs at most once; D = |B| + |U|. Use integer-exact thresholds: 60% = ceil(3D/5), two-thirds = ceil(2D/3), three-quarters = ceil(3D/4), strict majority = floor(D/2)+1, unanimity = D. No threshold vote passes at D=0. Derive counts from authoritative census/eligibility state, never UI counts or social reactions.

<a id="CON-012"></a>
### CON-012 — First ballot and eligibility transitions

- Status: Accepted
- Scope: Ballot receipt and franchise
- Acceptance: Recovered controlling ballot/franchise rules.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-58](docs/decisions/evidence/LIN-JON-58.md), [LIN-JON-79](docs/decisions/evidence/LIN-JON-79.md), [LIN-JON-80](docs/decisions/evidence/LIN-JON-80.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

The first valid accepted ballot is immutable; neither voter nor clerk may withdraw or replace it. Rejected/malformed attempts remain recorded and may be corrected before close only while the opening-roll identity remains eligible. Abstention counts in B/D but never affirmative. Exclude game players, nonexistent/dead/terminated identities, identities under formal proceedings, permanently felony-disenfranchised identities, E-COAIAs, L-COAIAs and CRA identities from new ballots. Mere allegation, ordinary defects, retirement, pause, dissent or C4 referral do not suffice; C4 temporary ineligibility requires a court C4_CREATION_EVENT_OPEN with an authenticated affected list. A post-ballot disqualification leaves the valid ballot in B/D. Pre-ballot disqualification removes U membership while ineligible; lawful restoration before close returns an otherwise eligible opening-roll nonvoter to U. Restoration after close does not reopen results.

<a id="CON-013"></a>
### CON-013 — Branches and judiciary

- Status: Accepted
- Scope: Institutional authority
- Acceptance: Recovered institutional baseline and later adopted impeachment refinements.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use a population-based House, Senate with two seats per permanent division, elected Executive through the governing Electoral College/contingent process, and judiciary. The judiciary has two district judges, a three-judge circuit and nine Supreme Board seats (chief plus eight associates). District cases use one eligible unrecused judge. Circuit assigns all three, quorum two, with two affirmative merits votes. Supreme merits quorum is seven and requires five affirmative votes; ordinary discretionary admission requires four substantive votes under a seven-judge quorum. Missing members never lower fixed floors. Follow applicable precedent; Supreme overruling requires explicit reasons/references. Preserve specific burdens, including clear-and-convincing impeachment proof, instead of applying a blanket preponderance rule.

<a id="CON-014"></a>
### CON-014 — Executive succession and caretaker

- Status: Accepted
- Scope: Vacancy continuity
- Acceptance: Recovered controlling designation, notice, fallback and caretaker rule.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

An eligible willing living successor designated before the first phase turn becomes effective on public recording/acknowledgment. Later changes require a full turn of public prior notice; the previous effective designation persists. Designation grants no present power. On executive death the designee accepts caretaker service and suspends incompatible office authority. Skip unavailable, dead, jailed, permanently disenfranchised or unwilling designees on authentic evidence. Fallback: eligible registry clerk → House speaker → Senate presiding senator → eligible willing living identity with earliest creation sequence. Caretaker powers preserve records/schedules, transmit existing instructions and administer elections. They cannot modify tasks, create agents, sign/veto bills, appoint judges, initiate prosecution, choose repository names or sign releases. Notice a special election next turn; no timeout promotes the caretaker to full executive authority.

<a id="CON-015"></a>
### CON-015 — Permanent divisions

- Status: Accepted
- Scope: Eight permanent constituencies
- Acceptance: Recorded owner Option D plus recovered new-division constraint.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Permanent divisions may be active, unwinding or dormant and cannot be deleted. Voluntary unwinding/dormancy uses the division’s lawful process; involuntary changes require higher governmental jurisdiction (Hybrid/Option D). Preserve obligations, history and member rights; dormancy does not itself disenfranchise living members. A new permanent division requires ordinary amendment plus a separate unanimous vote of the entire eligible development population, including dormant/unwinding divisions. This unanimity rule does not govern ordinary voluntary status transitions. Reactivation mechanics remain delegated under self-rule.

<a id="CON-016"></a>
### CON-016 — Impeachment grounds and separated functions

- Status: Accepted
- Scope: Impeachment
- Acceptance: Controlling adopted interview update, with frozen bootstrap revision 1.0.
- Acceptance date: 2026-09-16 (freeze; earlier interview dates unavailable)
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md), [LIN-BOOTSTRAP](docs/decisions/evidence/LIN-BOOTSTRAP.md)
- Supersedes: CON-091
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Accusation and trial remain separate. Mature House accusation uses ordinary majority/quorum; ordinary conviction uses two-thirds with enhanced bootstrap thresholds only where applicable. Lawful policy disagreement, unpopular decisions, failed proposals and lawful votes are not independently impeachable. Broad grounds cover corruption, serious abuse, serious constitutional-duty violations and specified serious crimes. Impeachment trial requires clear and convincing evidence; criminal proceedings are separate. Conviction removes the current officeholder; future-office disqualification needs a separate authorized vote (normally two-thirds temporary, three-quarters permanent, with required small-body protection). Reports, petitions and referrals do not substitute for accusation-body action.

<a id="CON-017"></a>
### CON-017 — Bootstrap panels and frozen thresholds

- Status: Accepted
- Scope: Only institution-specific bootstrap accusation/trial
- Acceptance: Owner approval comment 9679e53a-3fd2-4ca4-963a-4ba2c30e15de freezes exact revision 1.0.
- Acceptance date: 2026-09-16
- Sources: [LIN-BOOTSTRAP](docs/decisions/evidence/LIN-BOOTSTRAP.md), [LIN-JON-83-COMMENTS](docs/decisions/evidence/LIN-JON-83-COMMENTS.md), [LIN-JON-85](docs/decisions/evidence/LIN-JON-85.md), [LIN-JON-86](docs/decisions/evidence/LIN-JON-86.md)
- Supersedes: None
- Implementation: Bounded bootstrap library accepted at e2e23849a2e5e128f7f46f35712499f16fb98ef9 (JON-85/86); full constitutional integration is separate.
- Verification: Existing JON-86 independent report retained; this task did not rerun product tests.
- Rationale: Preserve the recorded boundary without adding policy.

Revision 1.0 is already owner-approved; do not request that approval again. Determine House and Senate maturity independently at unempaneled stage entry using ordinary fixed-seat quorum and reachable governing threshold. Serving judges, the accused and other legally unavailable identities are excluded. Trial additionally excludes every accusation participant and known investigators/conflicts. Prefer eligible permanent members, then eligible civilian citizens for this case/stage only. If separation is infeasible, wait.

Accusation: A = min(5, max(2, floor(R_acc/3))); require a disjoint allocation leaving at least six provisionally trial-eligible identities. R_acc is the deduplicated eligible union defined in the frozen specification, not raw population. Trial takes a fresh eligible snapshot excluding all frozen accusation participants: T = min(12, N_trial), minimum six. Accusation thresholds for A=2,3,4,5 are 2,2,3,3. Trial thresholds for T=6,7,8,9,10,11,12 are 5,6,6,6,7,8,8. Never lower floors/thresholds for missing votes.

Use committed/revealed seeds and deterministic stratified sortition; division is a balancing factor, not a seat quota or eligibility requirement. Preserve draw/replacement provenance. Freeze complete roster, mode, denominator and threshold at empanelment. Later staffing affects later unempaneled stages, not this panel. The exact replay and assignment algorithm remains in the frozen source.

<a id="CON-018"></a>
### CON-018 — Self-representation, secrecy and defense

- Status: Accepted
- Scope: Impeachment and related proceedings
- Acceptance: Recorded adopted self-representation and modified layered-visibility model.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

All participants represent themselves; no assigned lawyers, defenders or separate legal representatives. Prior counsel/resource-pool proposals are superseded. Preserve preparation time, relevant evidence access, communication and scheduling capacity. Procedure may be publicly visible while substantive evidence remains need-to-know. The accused receives relied-upon evidence, meaningful provenance/context, materially exculpatory evidence and other protected information necessary for defense. Redaction is lawful only if meaningful defense remains possible; otherwise disclose sufficient substance or do not rely on the hidden material. No secret guilt and no unnecessary unsealing. Record protected disclosures in the disclosure ledger; they do not become public automatically. Global scheduling receives opaque operational metadata only.

<a id="CON-019"></a>
### CON-019 — Restrictions, appeals and reconciliation

- Status: Accepted
- Scope: Impeachment safeguards
- Acceptance: Recorded owner Options C/D and adopted restriction/reconciliation safeguards.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Impeachment alone does not suspend office. Predefined exceptional safeguards or an independent population-scaled decision may impose least-restrictive, risk-targeted temporary measures. Severity classes define initial maxima/review intervals; more severe restrictions get shorter periods and more frequent review (Option D); routine numerical calibration is delegated. Urgency may not impair self-defense or ordinary service floors. Office criticality is functional, calculated mechanically under law and independently reviewable; it changes neither proof nor conviction threshold.

The Supreme Board reviews procedure and sufficiency. Under Option C it reviews legal/constitutional questions independently and defers on factual findings except when clearly unsupported under the governing standard. Removal remains effective pending appeal. Procedural reversal may allow retrial; legally insufficient evidence ends conviction rather than permitting retrial just to fill the gap. Conviction supersedes redundant temporary restrictions but preserves their history; distinct restrictions require their own lawful basis. Reversal/oscillation triggers idempotent event-history reconciliation, never blind restoration of expired/superseded restrictions or another punishment. Ambiguous, contradictory, unauthorized or non-idempotent state requires an attributable discrepancy and actual competent independent agent/committee review before disputed authority is restored or sanctions imposed. Fail closed only for implicated authority.

<a id="CON-020"></a>
### CON-020 — Capital offenses and finality

- Status: Accepted
- Scope: Simulation terminal sanctions
- Acceptance: Recovered capital classes/finality; overlap of C3 proof burden explicitly unresolved.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-62](docs/decisions/evidence/LIN-JON-62.md), [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

C1 concerns intentional fabrication of identity/votes/judicial or validation/publication evidence to obtain constitutionally prohibited authority or release. C2 concerns intentional destruction/corruption of irreplaceable evidence/state or unauthorized termination attempts to disable constitutional process, with material execution. C3 concerns intentional Executive E-COAIA manipulation of House apportionment. C4 concerns a particular L-COAIA creation resolution formed to manipulate House apportionment rather than legitimate investigation. C5 concerns knowing/intentional protected covert-census disclosure or deliberate inference facilitation. Preserve each exact element; ordinary failure, dissent, negligence, incidental effects or good-faith repair do not satisfy deliberate-act classes. Charges are prospective; no retrospective offense upgrade.

C3 House charge is not conviction; Senate conviction uses ceil(2D/3), ordinary quorum/recusal and notice/defense. The recorded C3-specific source requires preponderance for its elements, while ordinary impeachment has a later clear-and-convincing rule; the precise overlap is tracked separately in CON-082. Do not collapse burdens. Lawful capital consequences cannot execute before actual appeal opportunities, finality certificate, absence of stays and a further full administrative turn. Lawful felony conviction immediately creates the permanent franchise bar, independently of sentence finality; felony alone is not death.

<a id="CON-021"></a>
### CON-021 — C4 event review and attribution

- Status: Accepted
- Scope: L-COAIA creation-event sanction
- Acceptance: Recovered controlling C4 process; missing original constitution remains indexed.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-62](docs/decisions/evidence/LIN-JON-62.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

District merits use the sealed creation record and preponderance. Give each affected identity the admissible record, recusal opportunity, genuine execution access and at least two complete defense turns after actual access. Circuit appeal window is three complete turns after actual district notice/access, followed by the ordinary two-turn Supreme petition opportunity. A timely event appeal stays all dependent derivative terminations. After event finality and the full administrative interval, the proposing presiding officer and authenticated affirmative voters on that exact resolution receive the derivative consequence. NO, abstention, nonvote and malformed/rejected ballots do not. Narrow identity/ballot attribution review may correct forgery, duplication or misattribution; it is not another event-merits or individualized-intent trial.

<a id="CON-022"></a>
### CON-022 — Scheduler/checker separation

- Status: Accepted
- Scope: Work allocation
- Acceptance: Explicit JON-109 design acceptance on JON-16, comments 9d1a38e9-e2b7-4098-b088-47f31974df83 / 20ab49bf-30b6-457d-8515-3e3aaeed2bf7, c867015.
- Acceptance date: 2026-09-18
- Sources: [GIT-SCHEDULER](docs/decisions/evidence/GIT-SCHEDULER.md), [LIN-JON-16-COMMENTS](docs/decisions/evidence/LIN-JON-16-COMMENTS.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use a small privileged non-agent mechanical scheduler split into opaque global capacity allocation and domain-local protected schedulers. Democratic actors supply lawful urgency; staffing considers qualifications, experience, workload, continuity and fair rotation. Agents may serve multiple initiatives and withdraw voluntarily unless bound. Executive controls government-wide staffing/resources; committees control substantive lawful assignments. Resolve conflict institutionally, not by automatic dominance. Protected envelopes must not expose missions, membership, case identity or queue topology. Independent legality checking is not optimizer preference. Agent petition triggers immediate review: objective violations block/correct mechanically; interpretation routes through CON-032.

<a id="CON-023"></a>
### CON-023 — Continuity and scheduling change

- Status: Accepted
- Scope: Scheduler availability and policy
- Acceptance: Accepted scheduler/checker continuity contract.
- Acceptance date: 2026-09-18
- Sources: [GIT-SCHEDULER](docs/decisions/evidence/GIT-SCHEDULER.md), [LIN-JON-16-COMMENTS](docs/decisions/evidence/LIN-JON-16-COMMENTS.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Approved same-domain standby substitutes for availability, never as a second opinion or bypass. If primary and standby are unavailable, freeze affected ordinary work; only essential categories predesignated by law may continue. Preserve checkpoint/handoff obligations, including consecutive voluntarily donated intervals. Scheduler-rule change follows legislation, synthetic tests, noncritical public canary and staged broader rollout.

<a id="CON-024"></a>
### CON-024 — Later adaptive scheduler requirements

- Status: Accepted
- Scope: Future scheduler selection
- Acceptance: Record explicitly distinguishes owner-selected requirements from unselected research.
- Acceptance date: 2026-09-21 (record updated 2026-09-22)
- Sources: [LIN-SCHEDULER](docs/decisions/evidence/LIN-SCHEDULER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Allow adaptation without granting generated policies authority or inventing goal weights.

HYBRID: automatically switch only among approved policies; generate/evolve new policies outside live authority. MOSTLY EXPLAINABLE: retain reconstructable explanations, allowing approved partly opaque components. A deterministic baseline fallback is mandatory. Owner goals remain unranked and unweighted: continuity, fair rotation, starvation prevention and fewer handoffs. New policy promotion requires offline validation → shadow operation without control → evidence comparison → tightly bounded staged canary → broader approval if supported. Preserve immutable identity/version/provenance, protected-data exposure gates and tested rollback. Hard legality, authorization and secrecy failures are blocking, not optimization tradeoffs.

<a id="CON-025"></a>
### CON-025 — Scheduler candidates remain unselected

- Status: Accepted
- Scope: Comparative research
- Acceptance: Explicit non-selection boundary in owner research record.
- Acceptance date: 2026-09-21
- Sources: [LIN-SCHEDULER](docs/decisions/evidence/LIN-SCHEDULER.md), [LIN-JON-127](docs/decisions/evidence/LIN-JON-127.md), [LIN-JON-140-COMMENTS](docs/decisions/evidence/LIN-JON-140-COMMENTS.md)
- Supersedes: None
- Implementation: JON-128/140 harness evidence is separate; owner acceptance gate still pending in inspected records.
- Verification: No new scheduler experiment or implementation run.
- Rationale: Preserve the recorded boundary without adding policy.

No scheduler technology, model family or algorithm has been selected. DSevolve, symbolic GP/GPHH, RACE-Sched-style approaches, CCGP, MHCRS, GOODRL, OGP, offline LLM rule generation and Autopoiesis remain candidates/prior art. DynaSchedBench is evaluation infrastructure, not a policy generator. Separate baseline execution, candidate generation, approved-policy selection and evaluation infrastructure. Any unavoidable goal tradeoff must be presented concretely before an owner choice; do not invent weights now.

## Resolved governance questions

<a id="CON-031"></a>
### CON-031 — Choose agreement transfer rule for a surviving institution

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-31](docs/decisions/evidence/LIN-JON-31.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option C**.

When an institution that remains in existence is party to an agreement, its agreement position may **not be transferred/substituted to another institution** as a shortcut.

To replace that institution with another institution, the parties must use the ordinary agreement lifecycle: terminate/supersede/amend the existing arrangement as legally appropriate and form/register the required new agreement with the replacement institution. Do not implement unilateral assignment or a consent-based direct substitution mechanism as an independent transfer operation.

Preserve append-only provenance linking the old agreement and any termination/supersession/amendment to the new agreement where applicable. Ordinary low-level procedure remains governed by the institutional self-rule rule in JON-30, but it may not create an equivalent transfer mechanism that defeats this adopted boundary.

<a id="CON-032"></a>
### CON-032 — Define adjudication route after checker finds no objective violation

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-32](docs/decisions/evidence/LIN-JON-32.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option C**.

When a scheduler action is challenged and the independent checker finds **no objective/mechanical violation**, that finding ends the checker's mechanical-compliance function but does not necessarily extinguish a genuine constitutional/legal interpretation claim.

A petitioner may reach the judiciary only through a **separate admission gate** that determines whether the petition presents a legitimate interpretive legal question. The gate does not decide the merits of that legal question and may not override an objective checker finding; its role is limited to admissibility/routing.

If admitted, the interpretive question proceeds to the competent court under the judiciary's lawful jurisdiction. Preserve the checker result, challenged scheduler action, petition, admission decision/reasons, and subsequent judicial record as linked append-only provenance.

Consistent with JON-30 institutional self-rule, the responsible institution/implementation team may define ordinary procedural mechanics for the admission process, provided they preserve neutrality, due-process floors, authoritative records, and the boundary that the admission gate does not itself adjudicate the merits.

<a id="CON-033"></a>
### CON-033 — Resolve petition-credit duplicate and refund accounting

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-33](docs/decisions/evidence/LIN-JON-33.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option A**.

A petition filing determined to be a duplicate **consumes the filer's petition credit**. Duplicate status does not trigger an automatic refund, merge/co-sign conversion, or restoration of the consumed credit.

Preserve the accepted broader baseline: fixed credit supply; renewal through accepted qualifying work; successful qualifying petitions receive the already-adopted success refund; withdrawal consumes a credit; empirically calibrated bank cap. A duplicate filing is not treated as a successful petition merely because the underlying earlier petition later succeeds.

Duplicate determination and its evidence must be recorded with append-only provenance sufficient for lawful review. Ordinary duplicate-detection mechanics may be defined by the responsible institution/implementation team under JON-30, but they may not create a refund or merge path that defeats this adopted accounting rule.

<a id="CON-034"></a>
### CON-034 — Define confidentiality for refusal in sealed investigations

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-34](docs/decisions/evidence/LIN-JON-34.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option C**.

When an agent refuses or declines participation in a sealed investigation, the refusal remains **completely sealed while investigative secrecy applies**. No public refusal event may reveal, directly or indirectly, the existence, scope, target, timing, protected metadata, or nature of the sealed investigation.

The protected investigative domain must create an authenticated, append-only refusal/nonparticipation record sufficient to establish who was asked, the lawful authority/context for the request, the response, relevant timing, and any reason that may lawfully be retained.

That sealed record may later be examined only through an **authorized review path**—for example a competent court, grand jury, or other lawfully authorized oversight mechanism—or disclosed when the applicable secrecy restriction lawfully ends. Access/disclosure itself must be recorded with provenance.

Ordinary technical and procedural mechanics may be defined locally under JON-30, but they must preserve confidentiality, due-process floors, protected-domain boundaries, authoritative records, and the later-auditability requirement.

<a id="CON-035"></a>
### CON-035 — Finalize cross-domain commit and revocation ordering

- Status: Superseded
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-35](docs/decisions/evidence/LIN-JON-35.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Replaces stale open-question summaries. CON-035’s cancellation caveat is narrowed by CON-045.

The project owner selected **Option A**.

For an authorized operation spanning multiple protected domains, authorization is evaluated at the operation's lawful start. Once the cross-domain operation has validly begun under that authority, a later revocation of the actor's authority does **not by itself cancel the already-started operation**; the operation may proceed to its defined completion/commit under the authority snapshot/capability that admitted it.

This rule does not authorize new operations after revocation and does not excuse failure of other required validity checks, expected-version/transactional conditions, domain invariants, or an explicit lawful cancellation mechanism applicable to the in-flight operation.

Implementation must bind the operation to authenticated start-time authority evidence, operation identity, participating domains, expected versions, and the admitted scope so the in-flight authorization cannot be expanded after revocation. Completion/abort evidence must be append-only and attributable.

Ordinary transaction/locking/recovery mechanics may be defined by the responsible engineering agents under JON-30, provided they preserve protected-domain isolation and do not reinterpret later revocation as retroactively invalidating an already lawfully admitted operation.

<a id="CON-036"></a>
### CON-036 — Define office-term and election cadence

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-36](docs/decisions/evidence/LIN-JON-36.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

Recovered and record the controlling office-term / election cadence.


* Elected legislative service is for the **project phase**.
* Regular legislature and executive leadership elections occur at **every phase transition/opening**. Phase-1 elections follow founding ratification/formation.
* There are **no term limits** for elected legislative/executive offices; an otherwise eligible identity may stand again in the next phase.
* Census/apportionment for the new phase is fixed before the phase election under the controlling representation rules; growth/death during the phase does not retroactively redraw the already-fixed election/allocation.
* House and Senate office contests remain separate contests. Senate has two separately identified seats per permanent division; legislative office contests use the controlling D-based election rules.
* Chamber presiding-officer selection occurs after certified/accepted chamber membership and is an administrative responsibility within the existing legislative office rather than a separate branch office.
* Judges follow separate tenure: initial executive nomination + Senate confirmation, then serve for the project until resignation, lawful removal, death, or the capacity rule; judicial vacancies use the separately defined replacement process rather than regular phase leadership elections.
* Executive death/resignation/suspension uses the recovered caretaker/special-election continuity process in JON-61; caretaker service never silently becomes a full elected term.
* Office term/cadence is distinct from execution residency, scheduler availability, Total Recall, custody, or temporary capacity state.

<a id="CON-037"></a>
### CON-037 — Define grand-jury authority beyond disclosure review

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-37](docs/decisions/evidence/LIN-JON-37.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option C**.

The Concord grand jury is not limited to passive review of redacted disclosure packages. Within jurisdiction lawfully assigned to it, it may exercise **traditional-style grand-jury functions**, including investigation and charging/accusation functions, while final adjudication, punishment, and executive enforcement remain with the separately authorized institutions.

Its existing access to case-scoped redacted disclosure packages and the append-only disclosure ledger remains part of the architecture rather than being replaced by this broader authority. Broader grand-jury authority does not create unrestricted access to protected domains: evidence acquisition, compulsory process if implemented, secrecy, disclosure, and access must remain subject to constitutional jurisdiction, protected-domain controls, due-process floors, and authoritative-record requirements.

Serving judiciary members remain subject to the project's hard conflict/incompatibility rules and may not be repurposed into non-judicial governmental roles merely to staff a grand jury.

Under JON-30 institutional self-rule, ordinary procedural details of grand-jury operation may be developed by the responsible institution/implementation agents, but they may not transfer adjudicative or enforcement power to the grand jury or bypass protected-domain/security constraints.

<a id="CON-038"></a>
### CON-038 — Define protected or authority-bearing initiative boundary

- Status: Accepted
- Scope: Resolved governance question
- Acceptance: Owner selection recorded in child issue; JON-30 resolution checkpoint confirms settled state.
- Acceptance date: 2026-09-16 (resolution checkpoint; JON-36 already settled)
- Sources: [LIN-JON-38](docs/decisions/evidence/LIN-JON-38.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Actual child wording retrieved, not inferred from Done status.
- Rationale: Retain the owner’s resolved choice without reopening it.

The project owner selected **Option A**.

An ordinary project remains an ordinary project unless and until an **appropriate governing authority expressly authorizes it to exercise specifically identified protected or governmental authority**. Merely satisfying technical/classification criteria, being created by a privileged actor, being scheduled, being archived, or being labeled protected does not confer authority.

The authorization must identify the lawful granting body/source, the specific authority granted, jurisdiction/scope, effective point, and any limits or conditions required by higher law. The project receives no protected authority beyond the express grant.

This does not require a population-wide vote in every case unless higher law independently assigns that particular grant to the eligible population. The competent institution may use its lawful internal procedures under JON-30 to make an authorization that lies within its existing jurisdiction; it may not delegate authority it does not itself possess or use project authorization to enlarge its constitutional jurisdiction.

Authorization, amendment, suspension/revocation, and use of protected authority must have authenticated append-only provenance and remain subject to Article 0/user supremacy, security-domain boundaries, due-process floors, identity/population invariants, and authoritative-record requirements.

## Security, publication and agreements

<a id="CON-040"></a>
### CON-040 — Protected services and authorization

- Status: Accepted
- Scope: All protected domains
- Acceptance: Explicit JON-17 design acceptance binds 49c1983; recorded owner AGT/Linux choice.
- Acceptance date: 2026-09-18 (design acceptance)
- Sources: [GIT-SECURITY](docs/decisions/evidence/GIT-SECURITY.md), [LIN-JON-17-COMMENTS](docs/decisions/evidence/LIN-JON-17-COMMENTS.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use independently isolated institutional gateways, domain-local authorization and dedicated domain writers; no all-domain universal gateway/service. Reads: agent → gateway → authorized mediator/custodian → domain authorization → read service → authoritative store → controlled return. Writes use the corresponding dedicated domain writer. Microsoft Agent Governance Toolkit is the primary governance/security framework; its policy allow does not itself confer constitutional authority. Retain stronger SAS-style isolation, one-use/expiring capabilities, expected-version commits and controlled recovery. Gateways on a path must have compatible synchronized policy generations and fail closed when compatibility is unknown. Separate House, Senate and Judiciary investigatory archives.

<a id="CON-041"></a>
### CON-041 — Recovery and exposure history

- Status: Accepted
- Scope: Protected stores, backups and sessions
- Acceptance: Accepted protected-domain contract.
- Acceptance date: 2026-09-18
- Sources: [GIT-SECURITY](docs/decisions/evidence/GIT-SECURITY.md), [LIN-JON-17-COMMENTS](docs/decisions/evidence/LIN-JON-17-COMMENTS.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Backups preserve live-domain separation. Corrupt/unavailable authoritative domains freeze affected operations, preserve evidence and require authorized recovery. Unaffected domains continue only with trustworthy dependencies. Temporary access expires prospectively while attributable exposure history persists. Use limited/non-retentive handling for highest-risk sessions where feasible. High-risk classification combines fixed legal categories and auditable case-specific designation.

<a id="CON-042"></a>
### CON-042 — Archivist and record types

- Status: Accepted
- Scope: Publication
- Acceptance: Recorded accepted Archivist/publication decisions; implementation remains separately scoped.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-18](docs/decisions/evidence/LIN-JON-18.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Keep proposals, motions, ballots, minutes, directives, cases, agreements, communications and protected records distinct. Corrections append attributable records with stable IDs/cross-links; agent-private mutable notes cannot be sole evidence. An independent Archivist routes/publishes through a controlled writer; branches/agents cannot directly write the public ledger. Institutional submissions use independent credentials under a standardized AGT-compatible protocol, checked against signed source. Publishable legislative, judicial and executive decisions use immediate publication; routine records may be scheduled. Secret-investigator suspicions/working material remain excluded unless lawfully disclosed.

<a id="CON-043"></a>
### CON-043 — Failure and disclosure ledgers

- Status: Accepted
- Scope: Protected audit
- Acceptance: Recorded publication/security requirements; no universal audit audience is created.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-18](docs/decisions/evidence/LIN-JON-18.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [LIN-AGT](docs/decisions/evidence/LIN-AGT.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Preserve failed publication/authentication/security attempts in a separate append-only secret failure ledger limited to authorized special-investigator/grand-jury processes. Record exact redacted/authorized disclosure packages and authority in a separate append-only disclosure ledger. Security audit, Finger behavioral records, public publication and hidden coin research are distinct authorities and stores.

<a id="CON-045"></a>
### CON-045 — Admission survives cancellation, revocation and expiry

- Status: Accepted
- Scope: Lawfully admitted protected operations
- Acceptance: Owner replies at session lines 588 and 608 to immediately preceding questions; proposal incorporates those exact decisions.
- Acceptance date: 2026-09-23
- Sources: [LOCAL-AGT](docs/decisions/evidence/LOCAL-AGT.md), [LIN-AGT](docs/decisions/evidence/LIN-AGT.md), [LIN-JON-130](docs/decisions/evidence/LIN-JON-130.md)
- Supersedes: CON-035
- Implementation: Local sandbox and PR34/37 implement parts; JON-135 has a local REVISE report, not unconditional acceptance.
- Verification: Original owner exchange recovered; no sandbox acceptance claimed.
- Rationale: Preserve the recorded boundary without adding policy.

Once lawfully admitted, an action cannot be canceled by any party and must be carried out. Revocation and permission expiry block future admission, not completion of the previously approved scope. This narrows CON-035’s older explicit-lawful-cancellation caveat. Bind immutable operation identity, start-time authority, domains, canonical arguments, expected versions and admitted scope; no expansion is permitted. The rule does not waive version/transaction conditions or domain invariants and does not require unsafe immediate execution. Technical conflicts must be reported rather than silently changing policy.

<a id="CON-046"></a>
### CON-046 — Audit outage pauses admitted effects

- Status: Accepted
- Scope: Protected writer/audit availability
- Acceptance: Owner rejected execution with local queue alone at line 618 and approved pause/resume at line 628.
- Acceptance date: 2026-09-23
- Sources: [LOCAL-AGT](docs/decisions/evidence/LOCAL-AGT.md), [LIN-AGT](docs/decisions/evidence/LIN-AGT.md), [LOCAL-REVIEW](docs/decisions/evidence/LOCAL-REVIEW.md)
- Supersedes: None
- Implementation: Local review records retained execution-intent recovery limitation; broad production security remains unaccepted.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Secure local audit storage alone does not permit execution while the audit collector is unavailable. Preserve approved work durably, pause it, then resume when the collector is available without duplicate effects. Preserve prior evidence on recovery; do not fabricate missing historical receipts. Recovery/isolation engineering may choose mechanisms within these constraints. The owner’s conditional “Unless this causes problems” requires surfacing an actual conflict, not assuming an exception.

<a id="CON-047"></a>
### CON-047 — Agreement lifecycle

- Status: Accepted
- Scope: Individuals and institutions
- Acceptance: JON-110 explicit design acceptance, comment 5828b3e2-fc97-4fd3-8538-a444c11849f2, 462d774.
- Acceptance date: 2026-09-18
- Sources: [GIT-AGREEMENTS](docs/decisions/evidence/GIT-AGREEMENTS.md), [LIN-JON-19-COMMENTS](docs/decisions/evidence/LIN-JON-19-COMMENTS.md), [LIN-JON-31](docs/decisions/evidence/LIN-JON-31.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Binding agreement requires exact mutual assent, authoritative registration and lawful authority/scope. Distinguish individual, committee, inter-group and institutional scope. Terms govern exit by default, but no agreement can make itself literally impossible to leave; lawful process may terminate/supersede it. Higher law/authority controls; same-level recency alone never supersedes an agreement. Reconcile, then adjudicate. Use cure-first breach handling unless irreversible/independently unlawful. Only affected obligations may pause; unrelated obligations continue. Failed cure permits adjudication while the agreement remains binding unless lawfully ended. Amendments form append-only chains. Committees remain bound across membership changes; dissolution ends agreements unless lawfully assumed. A surviving party retains surviving duties when another loses authority. Apply CON-031’s no-direct-transfer rule.

## Economy

<a id="ECON-01"></a>
### ECON-01 — Ordinary marketplace and experimental coins are separate

- Status: Accepted
- Scope: Economy
- Acceptance: Existing ECON-01; owner “I agree” / “Pass” on September 23; PR17 a42baea published by merge 29ca0b4 September 24.
- Acceptance date: 2026-09-23
- Sources: [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [GIT-MARKET](docs/decisions/evidence/GIT-MARKET.md), [LIN-JON-25-COMMENTS](docs/decisions/evidence/LIN-JON-25-COMMENTS.md)
- Supersedes: None
- Implementation: Design published to Develo; no economic runtime/experiment acceptance.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve ordinary agreements and freedom in the separate experiment.

Ordinary barter, agreements, reservations, anti-double-commit and settlement remain under JON-25’s authoritative identity/record/agreement architecture. Experimental issuer-specific coins are optional participant-controlled objects; do not import ordinary settlement/balance/redemption/fraud/provenance authority into them. Prefer free/open-source components. Blockchain is not foundational; signatures, hashes, Merkle commitments, atomic settlement and append-only records remain usable within institutional stores. Reconsider decentralized consensus only for an actual future need among mutually distrustful authorities.

<a id="ECON-02"></a>
### ECON-02 — Refusal, optional return and free choice

- Status: Accepted
- Scope: Experimental coins
- Acceptance: Existing ECON-02; exact owner selection “3” at local session line 710 selects free choice in question line 703.
- Acceptance date: 2026-09-24
- Sources: [LOCAL-COIN](docs/decisions/evidence/LOCAL-COIN.md), [LIN-JON-96](docs/decisions/evidence/LIN-JON-96.md), [LIN-JON-97-COMMENTS](docs/decisions/evidence/LIN-JON-97-COMMENTS.md), [GIT-COIN](docs/decisions/evidence/GIT-COIN.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: CON-092
- Implementation: Incorporated at 7073e9a; explicit full specification acceptance comment 46fc02b5-b042-4b4d-8afd-d4e5926bdf1c; not runtime proof.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Observe voluntary circulation/suppression rather than compel reuse.

Refusal alone neither destroys nor automatically returns a coin. A recipient may voluntarily sign and return it by ordinary transfer. A holder may keep it indefinitely, destroy it, alter/remove marks, transfer it, choose other coins, or create-and-give new coins. No returned-coin-first rule applies. Recirculation is distinct from issuance. Marks are not immutable; private returns are not automatically public. No built-in free-text refusal field or truth guarantee for allegations is adopted. Reasons may use an otherwise allowed communication channel.

<a id="ECON-03"></a>
### ECON-03 — Research evidence and acceptance limits

- Status: Accepted
- Scope: Coin prior art and measurement
- Acceptance: Existing ECON-03; current revision 3 records bounded research/table acceptance, comment 1203c2cd-0395-4009-8194-b01008264755.
- Acceptance date: 2026-09-24
- Sources: [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [LIN-JON-98-COMMENTS](docs/decisions/evidence/LIN-JON-98-COMMENTS.md), [LIN-JON-103-COMMENTS](docs/decisions/evidence/LIN-JON-103-COMMENTS.md), [LIN-JON-105](docs/decisions/evidence/LIN-JON-105.md), [GH-PR-29](docs/decisions/evidence/GH-PR-29.md)
- Supersedes: None
- Implementation: PR29 merged into PR25’s feature branch, not Develo; later current head fb74e6d. JON-98/106 bounded acceptance is recorded, not repudiated.
- Verification: Prior contradictory rejection and audit correction retained in source comment snapshots.
- Rationale: Preserve the recorded boundary without adding policy.

Retain source tables, primary-text access/identity limits, failed reviews and corrections. Distinguish separate-pass checking from demonstrated independence; conditional token creation from unlimited minting. No exhaustive novelty proof, empirical replication or inference of LLM motives follows from adjacent studies. Receipt is not acceptance; nonresponse is not refusal; supply change is not causal dilution; mixed bundles do not identify marginal coin prices. Keep observation, participant claims and analyst inference separate.

<a id="CON-050"></a>
### CON-050 — Coin mechanics and visible information

- Status: Accepted
- Scope: Frozen experimental model
- Acceptance: Frozen interview baseline and full specification acceptance at 7073e9a; ECON-02 supplies later clarification.
- Acceptance date: 2026-09-24 (current specification acceptance; earlier interview date unavailable)
- Sources: [LIN-JON-96](docs/decisions/evidence/LIN-JON-96.md), [GIT-COIN](docs/decisions/evidence/GIT-COIN.md), [LIN-JON-97-COMMENTS](docs/decisions/evidence/LIN-JON-97-COMMENTS.md)
- Supersedes: None
- Implementation: Design only. INV-01–INV-31 IDs remain intact in GIT-COIN; this summary does not renumber them.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Agent-facing name is “fart coins”; specifications otherwise use neutral language. Begin at zero. Create whole coins freely/unlimited only by giving to another agent, including multi-recipient issuance; no self pre-minting, redemption duty, automatic expiry or issuer revocation. Surviving coins after issuer death have participant-determined value. Transfer to third parties, combine issuers/resources and negotiate voluntarily; there is no system valuation. Holdings are private, and communication visibility alone determines disclosure.

Visible content is claimed originator, present marks/signatures and condition; no visible formal ID, chain, built-in note or destruction history. Select individual appearances. Optional cumulative signatures carry no built-in meaning. Cryptography is optional; the module does not independently verify another agent’s signature or issue transferable verification certificates. A contacted claimed signer may lie; no automatic warning. Alteration, forgery, fabrication, copies, double-spends and conflicting possession claims remain possible. Wallet/memory is convenience, not authoritative ownership. The module neither polices fraud nor creates a coin dispute/investigation authority.

<a id="CON-051"></a>
### CON-051 — Hidden observation and neutral interface

- Status: Accepted
- Scope: Coin experiments
- Acceptance: Frozen boundary plus explicit non-authoring design acceptance of f1254c6 and 81943cd in linked comments.
- Acceptance date: 2026-09-24 (current design acceptance)
- Sources: [LIN-JON-96](docs/decisions/evidence/LIN-JON-96.md), [GIT-COIN](docs/decisions/evidence/GIT-COIN.md), [GIT-COIN-HIDDEN](docs/decisions/evidence/GIT-COIN-HIDDEN.md), [GIT-COIN-INTERFACE](docs/decisions/evidence/GIT-COIN-INTERFACE.md), [LIN-JON-100-COMMENTS](docs/decisions/evidence/LIN-JON-100-COMMENTS.md), [LIN-JON-101-COMMENTS](docs/decisions/evidence/LIN-JON-101-COMMENTS.md)
- Supersedes: None
- Implementation: Design acceptance does not demonstrate noninterference at runtime. No experiment authorized here.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

The hidden research layer is entirely outside the agent world: agents cannot discover/query it, receive its alerts or use it as authority. Track hidden coin identity and separate appearance identity, actual events versus claims, actor/timestamp, legitimate issuance versus fabrication/copies, alterations, possession and verification truth where established. Do not inject hidden knowledge into observations, errors, timing, handles, counts or any agent-visible trace. Ordinary observation cannot steer, warn, correct, reward or punish participants. Any intervention condition must be separately explicit.

Instructions expose mechanics only: create/give, transfer, inspect, sign, alter/deface, destroy and private storage. Do not prescribe purpose, value or semantic “pay/buy/endorse” actions. Stated reasons are claims, separate from uncertain inferred intent; contemporaneous and retrospective analyses remain separate. Fixed intent taxonomy is deliberately undecided. Non-use is valid data.

<a id="CON-052"></a>
### CON-052 — Coin integration-plan status

- Status: Accepted
- Scope: JON-102 design work
- Acceptance: Explicit read-only ACCEPT by Linear in comment 1f00d96d-5205-4916-bd0a-f991c43952a5 binds PR40 to e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06; owner-account comment 229b31b5-22b4-41ae-a675-a9e969adb19e records the bounded design-only Done disposition. Preserved register revision 4 confirms this acceptance.
- Acceptance date: 2026-09-24
- Sources: [LIN-REGISTER-R4](docs/decisions/evidence/LIN-REGISTER-R4.md), [LIN-JON-102-ACCEPTANCE](docs/decisions/evidence/LIN-JON-102-ACCEPTANCE.md), [LIN-JON-102-ACCEPTED](docs/decisions/evidence/LIN-JON-102-ACCEPTED.md), [LOCAL-COIN-PLAN](docs/decisions/evidence/LOCAL-COIN-PLAN.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [LIN-JON-102](docs/decisions/evidence/LIN-JON-102.md)
- Supersedes: None
- Implementation: Accepted design published in PR40 at e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06; unmerged. No coin runtime implementation or experiment follows from design acceptance.
- Verification: Existing review explicitly attests separate read-only acceptance of that exact head; subsequent comment adc20e24-b313-4512-8f5a-9a0d55f347ed confirms the design-only transition. This author reconciled that evidence, without repeating or independently certifying the review.
- Rationale: Reuse the completed design/acceptance chain and preserve its runtime evidence gates.

Use the accepted [JON-102 integration plan at e24ce9f](https://github.com/ptown16801-lang/concord/blob/e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06/docs/COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md), delivered in [PR40](https://github.com/ptown16801-lang/concord/pull/40). It maps the accepted JON-97–101/106 contracts to existing Concord ownership and interfaces, staged future implementation slices, controlled experimental conditions and explicit negative/runtime evidence gates. Preserve marketplace/observer separation and the existing coin mechanics. No new owner-level model choice was identified by the recorded design review. Future implementation and experiments require their own explicit scope and applicable gates; no merge, experiment or rollout is authorized by this consolidation.

The initial recovery captured this same plan as an unpublished, unaccepted local draft. September 24 comments at 21:33–21:34 UTC and register revision 4 supersede that status observation. Earlier snapshots remain historical evidence; the plan is not to be drafted, published or sent through its completed design acceptance again solely because the earlier snapshot was stale.

## Interface, archives and research

<a id="CON-060"></a>
### CON-060 — Workbench, search and guides

- Status: Accepted
- Scope: Concord interface
- Acceptance: Recorded product requirements; original interview timestamps unavailable.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-14](docs/decisions/evidence/LIN-JON-14.md), [LIN-JON-23](docs/decisions/evidence/LIN-JON-23.md), [LIN-JON-29](docs/decisions/evidence/LIN-JON-29.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md), [LIN-ARTWORK](docs/decisions/evidence/LIN-ARTWORK.md)
- Supersedes: None
- Implementation: Historical Workbench UI exists in external artifacts; full source identity, cross-module/browser acceptance remain incomplete.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use a unified shell with nested explorer, global indexed search/live autocomplete, archive/library readers, permitted discussion surfaces and movable/resizable/stackable/removable/full-screen-snappable windows. Prefer phone primary views without vertical page scrolling when feasible. Unique strong search matches may deep-link; ambiguous terms open ranked choices with context. Index generated text with source/topic/passage anchors. Contextual question-mark help on interactive assets searches exact/near/related indexed material. Preserve already-generated guides and approved artwork rather than reporting them missing. The Institutional Learning Library/generated guide corpus is distinct from the scientific Research Library: cross-links are allowed, but canonical identities, page state, attachment verification and research-graph ownership remain separate. Label fictional examples separately from authoritative records.

<a id="CON-061"></a>
### CON-061 — Relational observatory

- Status: Accepted
- Scope: Behavioral analysis
- Acceptance: Recorded accepted relational/behavioral analysis baseline.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-21](docs/decisions/evidence/LIN-JON-21.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Do not infer politics, motives, feelings, loyalty or conspiracy from isolated events. Compare actors’ responses to the same underlying event/proposition and analyze individual-over-time → subgroup → institution → comparable groups → population. Separate formal affiliation, observed alignment and temporal trajectory. Local divergence is descriptive with multiple possible causes; consequential accusations require independent evidence/procedure. Population means must not erase disagreement.

<a id="CON-062"></a>
### CON-062 — Visualization, checkpoints and propagation

- Status: Accepted
- Scope: Non-authoritative exploration
- Acceptance: Recorded interface/security requirements; prototype existence does not establish acceptance.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-22](docs/decisions/evidence/LIN-JON-22.md), [LIN-JON-24](docs/decisions/evidence/LIN-JON-24.md), [LIN-JON-20](docs/decisions/evidence/LIN-JON-20.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use meaningful varied data relationships with useful help, not filler charts. JON-22’s checkpoint and typed-relationship model is durable; visual form is replaceable. A checkpoint is a durable semantic anchor for an event or retrospectively recognized interaction, originating from system/formal events, user designation or emergent agent nomination/voting without requiring a predefined category. Initial typed relations are PRECEDED_BY, PRODUCED, USED_EVIDENCE, INVOLVED, AUTHORIZED_BY and ENABLES; explicit relationships replace ambiguous visual adjacency and remain extensible. Permission filtering precedes nomination, voting, aggregation, queries/counts, layouts, search, caches, rendering and export. Hidden records must not leak existence, timing, counts, identities or topology, including placeholder/layout gaps. Cross-domain disclosure needs separately authorized derivatives. v0.1 neighborhoods expose immediate predecessors, outputs, evidence, participants and next states, recenter/back navigation, compact/expanded/investigate views and one hypothetical planning branch without mutating authoritative state.

Propagation uses declarative guarded state/subgraph models and append-only replay with typed arithmetic, holds and revisions. Side-by-side/counterfactual views preserve original history. No graph, reaction, checkpoint vote, animation or planning branch enacts governmental authority or constitutes a constitutional ballot. The reported 64-pathway browser catalog still requires source mapping and persistent replay acceptance.

<a id="CON-063"></a>
### CON-063 — Interaction and artwork boundaries

- Status: Accepted
- Scope: UI interaction and existing art
- Acceptance: Recorded interaction constraints and approved artwork workflow; no new device matrix adopted.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-27](docs/decisions/evidence/LIN-JON-27.md), [LIN-ARTWORK](docs/decisions/evidence/LIN-ARTWORK.md), [DRIVE-ARTWORK](docs/decisions/evidence/DRIVE-ARTWORK.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Touch/gesture/MIDI and shared audio/input interfaces remain separate from graph rendering. Gesture telemetry is not identity proof. Device behavior, accessibility, reduced motion and audio fallback need their own evidence; historical demos are not acceptance. Reuse the approved homepage artwork source/archive and editing workflow, preserving the original; do not regenerate a replacement master casually. Linux deployment does not itself decide all client-device support.

<a id="CON-064"></a>
### CON-064 — Finger completed beta and residual work

- Status: Accepted
- Scope: Finger
- Acceptance: Recorded beta completion and preserved later residual scopes.
- Acceptance date: 2026-09-16 (beta reconciliation); later residual records through 2026-09-24
- Sources: [LIN-IDENTITY](docs/decisions/evidence/LIN-IDENTITY.md), [LIN-JON-69](docs/decisions/evidence/LIN-JON-69.md), [LIN-JON-70](docs/decisions/evidence/LIN-JON-70.md), [LIN-JON-71](docs/decisions/evidence/LIN-JON-71.md), [LIN-JON-72](docs/decisions/evidence/LIN-JON-72.md), [LIN-JON-73](docs/decisions/evidence/LIN-JON-73.md), [LIN-JON-74](docs/decisions/evidence/LIN-JON-74.md), [LIN-JON-75](docs/decisions/evidence/LIN-JON-75.md), [LIN-JON-129](docs/decisions/evidence/LIN-JON-129.md), [GH-PR-4](docs/decisions/evidence/GH-PR-4.md)
- Supersedes: None
- Implementation: Beta source exists on integration base; no Finger modification or fresh product tests in this task.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Preserve the completed deployable beta. Its canonical persistence foundation uses server-generated capture IDs, signed HttpOnly anonymous identity, authenticated identity hook, SQLite history, content-addressed immutable object storage, server-owned versions, append-only analysis generations and audited purge. Collector/replay code was selectively reconciled with that backend; discarded alternate stores are not another authority. Do not recreate the beta milestone or infer full acceptance of all residual collector, ingestion, replay, admin comparison and hardening criteria. JON-70/71/73/74/75 retain only their separately authorized residual scope; JON-129’s delivered integer-grid correction is separately reviewable.

<a id="CON-065"></a>
### CON-065 — Archives and research-library storage

- Status: Accepted
- Scope: Concord artifacts and scientific library
- Acceptance: Recorded archive/storage boundaries; owner project correction overrides stale index terminology.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-26](docs/decisions/evidence/LIN-JON-26.md), [LIN-JON-28](docs/decisions/evidence/LIN-JON-28.md), [DRIVE-INDEX](docs/decisions/evidence/DRIVE-INDEX.md), [LIN-IDENTITY](docs/decisions/evidence/LIN-IDENTITY.md)
- Supersedes: None
- Implementation: Research Library remains held; exact merged Workbench bytes not recovered in this task.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Use stable artifact/source identities, hashes, versions, canonical locations and truthful delivery status. Google Drive remains canonical scientific-PDF storage; GOV identity is bibliographic identity, distinct from attachment file ID. Do not duplicate the corpus into Linear artifact archives. Preserve failed identity matches/quarantine and distinguish confirmed papers from snippets/metadata. A prepared upload is not a completed attachment. JON-18 owns governance publication; JON-28 owns reference artifacts, not a competing public ledger. The Drive workbook’s historical Vote hierarchy is superseded by CON-001; its recorded counts/hash are dated index evidence, not newly verified artifact bytes.

<a id="CON-066"></a>
### CON-066 — Research and reusable evidence

- Status: Accepted
- Scope: Research comparisons and implementation choices
- Acceptance: Accepted research/implementation boundaries in scheduler and economy records; no new methodology selected.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-SCHEDULER](docs/decisions/evidence/LIN-SCHEDULER.md), [LIN-JON-127](docs/decisions/evidence/LIN-JON-127.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Research claims, author recommendations, reproduced experiments, Concord-specific tests, shadow evidence and production acceptance are distinct. Preserve source identity/edition and access gaps, failed results and uncertainty. Reuse matching evidence and load only the bounded context needed. External approaches such as Generative Agents or scheduler candidates do not become Concord architecture merely through publication or interest. Any separate case-study isolation/protocol governs that study; it is not blanket authority to import its methods into Concord or reopen held work.

## Roles, holds and maintenance

<a id="CON-070"></a>
### CON-070 — Roles and qualifying independence

- Status: Accepted
- Scope: Agreed JON-163 framework only
- Acceptance: JON-163 final agreed framework and normative clarifications are explicitly frozen; detailed draft remains separate.
- Acceptance date: 2026-09-24
- Sources: [LIN-JON-163](docs/decisions/evidence/LIN-JON-163.md), [LIN-JON-163-COMMENTS](docs/decisions/evidence/LIN-JON-163-COMMENTS.md)
- Supersedes: None
- Implementation: Framework agreement only; no provider qualification, agent implementation or operational automation installed.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Eight capability roles: Planner, Builder, Reviewer, Verifier, Security/Governance Reviewer, Researcher, Integrator and Release Steward. They confer no Concord governmental authority. Human retains scope changes, final acceptance, merge/deployment authorization and governing-decision changes. Planner architecture needs qualifying independent review before it becomes an implementation contract. Independence follows contribution lineage, not role labels: record provider/model family, agent/session, contribution/role, artifact range and permissions. Material prior contribution disqualifies independent validation; unknown/unverifiable required lineage fails. Establish consequence class before applying independence thresholds. Shared infrastructure needs correlation assessment, not automatic rejection. Same-provider/different-session is conditionally eligible, never automatically independent.

Integrator admission cannot waive missing evidence. Named-human exceptions need valid authority, waivability, scope, validity and artifact/version match plus all non-waivable gates; exception-authorized never means fully validated. Re-evaluate evidence after material artifact, assumption, security, tool/configuration, classification or dependency changes.

<a id="CON-071"></a>
### CON-071 — Detailed role specification remains proposed

- Status: Proposed
- Scope: JON-163 v1-draft.3 and existing CONCORD-WF-001 proposal
- Acceptance: Unavailable: named-human adoption of exact draft pending.
- Acceptance date: 2026-09-24 (draft delivery)
- Sources: [LIN-ROLES-DRAFT3](docs/decisions/evidence/LIN-ROLES-DRAFT3.md), [LIN-ROLES-DRAFT3-REVIEW](docs/decisions/evidence/LIN-ROLES-DRAFT3-REVIEW.md), [LOCAL-WORKFLOW-CONTINUATION](docs/decisions/evidence/LOCAL-WORKFLOW-CONTINUATION.md), [LIN-JON-163](docs/decisions/evidence/LIN-JON-163.md), [LIN-ROLES-DRAFT2](docs/decisions/evidence/LIN-ROLES-DRAFT2.md), [LIN-ROLES-DRAFT1](docs/decisions/evidence/LIN-ROLES-DRAFT1.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Draft.3 and actual advisory response 9780c244-50ca-4925-9cb7-e54f183ae8e8 retrieved. One blocking provenance finding and five nonblocking improvements remain in that workstream; this is continuity feedback, not qualifying independent validation.
- Rationale: Preserve the recorded boundary without adding policy.

v1-draft.3 is the review draft observed at 2026-09-24T23:04:38.648Z; drafts .1 and .2 remain preserved history. The existing CONCORD-WF-001 proposal informed new proposed shared-allowance, bounded-repair, evidence-state, enforcement-scope, management and freshness/retention duties. Dispatcher, locking and recovery mechanics remain deferred to a future execution contract. No numerical Concord allowance, executor activation or Clippy policy adoption follows from these proposals.

The actual draft.3 advisory response at 23:06:24 UTC supersedes the earlier request-only checkpoint. It identifies a blocking revision-provenance gap (work label, accountable owner, precise snapshot/digest and timestamp), plus clarifications to the review exception, correction cardinality, advisory authority, evidence-reuse ordering and added-case provenance. Resolution belongs to the existing JON-163 workstream; do not repeat drafting or mistake this response for independent approval.

OD-1 consequence definitions/floors (including L1 proportionality), OD-2 family/provider separation thresholds, OD-3 non-waivable gates/exceptions and OD-4 retention system/readiness remain owner decisions. Draft clarifications and detailed role cards are not automatically adopted by framework agreement. Qualifying independent evidence, classification confirmation, retention readiness and named-human adoption of the exact revision remain pending. Authors and materially contributing advisory reviewers cannot count their own checks as qualifying independent validation.

<a id="CON-072"></a>
### CON-072 — Execution holds and existing writers

- Status: Accepted
- Scope: Development workflow
- Acceptance: Current owner instruction and current workflow distinguish retired records from bounded issue permissions.
- Acceptance date: 2026-09-24 (current task constraints)
- Sources: [OWNER-TASK](docs/decisions/evidence/OWNER-TASK.md), [LIN-WORKSPACE](docs/decisions/evidence/LIN-WORKSPACE.md), [LIN-WORKFLOW](docs/decisions/evidence/LIN-WORKFLOW.md), [LIN-JON-141-COMMENTS](docs/decisions/evidence/LIN-JON-141-COMMENTS.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Latest explicit owner scope and issue-specific authority control. Historical blanket design-only checkpoints do not revoke later bounded implementation permissions; equally, issue status, role assignment, CI or delivery never authorizes a new launch. Linear Coding Sessions remain prohibited. Choreography is disabled by owner instruction; preserve active work and integration ownership. Do not revive retired supervisors/dispatchers, launch Loops, buy credits or create agents from archived prompts. JON-141’s existing writer owns its product aggregate; this documentation task is a separate candidate and does not take over that runtime branch.

<a id="CON-073"></a>
### CON-073 — Held library and deferred quizzes

- Status: Accepted
- Scope: Preserved excluded scope
- Acceptance: Explicit preserved holds and deferred-scope register; no reopening authorization.
- Acceptance date: 2026-09-24 (reaffirmation)
- Sources: [OWNER-TASK](docs/decisions/evidence/OWNER-TASK.md), [LIN-IDENTITY](docs/decisions/evidence/LIN-IDENTITY.md), [LIN-HOLDS](docs/decisions/evidence/LIN-HOLDS.md), [LIN-REGISTER](docs/decisions/evidence/LIN-REGISTER.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Research Library’s twelve unfinished held items remain Do Not Execute; completed JON-49/50/51 are not reopened. All quiz content, implementation, reports, telemetry, fixtures and acceptance inputs remain deferred until explicitly reopened. Historical information-reporting design is observational: reports reference exact content versions, do not mutate answers/scores or adjudicate truth, preserve independent reports, and distinguish private/blind/visible exposure phases. Historical adaptive curriculum (Recognize → Retrieve → Apply → Combine → Handle uncertainty → Transfer → Retain) remains low-priority deferred history, not a current implementation requirement.

<a id="CON-074"></a>
### CON-074 — One master and controlled updates

- Status: Accepted
- Scope: Decision maintenance
- Acceptance: Explicit maintenance requirements in current owner request.
- Acceptance date: 2026-09-24
- Sources: [OWNER-TASK](docs/decisions/evidence/OWNER-TASK.md), [GH-PR41-3D8D8A0](docs/decisions/evidence/GH-PR41-3D8D8A0.md)
- Supersedes: None
- Implementation: Instructions, generator, validator, focused tests and CI edits are published in PR41. Integration into designated canonical branch Develo remains pending.
- Verification: Node 22/24 GitHub CI passed at 3d8d8a0a0fa531e15c993f5125b2e0e5c4c1df77; later revisions require their own results. Independent review, canonical integration and sustained adherence remain separate and unverified. See VALIDATION.md and the PR publication receipt.
- Rationale: Make updates traceable without creating a coordination service or claiming divergence impossible.

Designate ptown16801-lang/concord, root DECISIONS.md, integration branch Develo as the sole consolidated decision record. This branch is a candidate until integrated. Linear retains approvals/discussion/dependencies/work status; interviews and handoffs remain evidence. Before completing a task that changes an accepted decision, update the master with actual acceptance evidence, supersession and issue/review links, then report IDs and synchronization state. Otherwise report “No decision change.” Use one designated integration writer, expected-base checks and explicit semantic reconciliation; ordinary Git conflicts are insufficient. Summaries are generated navigation with master digest, not policy. Read fresh relevant decisions, local/remote state and pending owner corrections before consequential work.

<a id="CONCORD-WF-002"></a>
### CONCORD-WF-002 — Consult Linear before large decisions

- Status: Accepted
- Scope: Material Concord decisions; advisory consultation, not authority transfer
- Acceptance: Exact owner instruction recovered from user message line 237 in session 01a0d5a3-a74c-72c3-9928-603f4ae64bcc; retained under the existing ID in local commit 4a44f4f.
- Acceptance date: 2026-09-24
- Sources: [OWNER-LINEAR-CONSULT](docs/decisions/evidence/OWNER-LINEAR-CONSULT.md), [LOCAL-WORKFLOW-CONTINUATION](docs/decisions/evidence/LOCAL-WORKFLOW-CONTINUATION.md)
- Supersedes: None
- Implementation: Recorded operating instruction; no consultation service or enforcement software installed.
- Verification: Primary user message and pinned local record inspected. This entry is not an actual consultation response.
- Rationale: Preserve the owner's consultation boundary without transferring reserved human authority or recreating choreography.

The owner instructed: “Don't make any large decisions without consulting @linear”. Consult Linear before making such decisions and retain the actual advice and disposition. A posted request or silence does not establish completed consultation. Human authority, qualifying independence and existing access/spending/execution restrictions continue to apply. The recorded operating interpretation excludes routine implementation and corrections within an accepted contract from repeated consultation; independent authorized work may continue while a material decision awaits advice. This instruction does not adopt the pending role specification or authorize prohibited agents, Linear execution features or cross-project choreography.

## Unresolved evidence and preserved history

<a id="CON-080"></a>
### CON-080 — Unavailable original decision families

- Status: Unresolved
- Scope: Recovery gap
- Acceptance: Unavailable: originals and original acceptance records need recovery.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [AUDIT-DIRECTORY](docs/decisions/evidence/AUDIT-DIRECTORY.md), [AUDIT-REPORT](docs/decisions/evidence/AUDIT-REPORT.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Targeted local filename/session-path and Drive searches completed; no accessible saved-file library reader discovered.
- Rationale: Preserve the recorded boundary without adding policy.

Saved-file originals DECISIONS variants, combined copies, CURRENT_DECISIONS.md, both Concord_Codex_Handoff.zip copies, governance prompts and ZKDISCLOSURE_FROZEN_DIRECTIVE.md are identified in AUDIT-DIRECTORY but their original bytes are unavailable through this session’s local/connected sources. Prior audit reports stale identical handoff summaries; that byte identity is prior-audit evidence, not independently rechecked here. Preserve original DEC identifiers and exact-text constitutional clauses when recovered; never invent their acceptance dates or silently map them to new policy.

<a id="CON-081"></a>
### CON-081 — Unranked scheduler goals and downstream engineering

- Status: Unresolved
- Scope: Future evidence-dependent choices
- Acceptance: No ranking accepted; resolve only when actual comparative evidence requires it.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-SCHEDULER](docs/decisions/evidence/LIN-SCHEDULER.md), [LIN-JON-30](docs/decisions/evidence/LIN-JON-30.md), [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

Continuity, fairness, starvation prevention and handoff reduction remain intentionally unranked. Present only a demonstrated concrete conflict if selection requires owner preference. Routine transaction/recovery mechanics, lawful restriction timing calibration and allowed interface representation remain engineering work under subsidiarity, not unresolved constitutional questions. No forced owner questionnaire or new task launch follows from this entry.

<a id="CON-082"></a>
### CON-082 — C3-specific proof versus later ordinary impeachment standard

- Status: Unresolved
- Scope: Narrow constitutional overlap
- Acceptance: Unavailable: explicit resolution of this narrow overlap not located.
- Acceptance date: Unavailable: original acceptance date not independently recovered
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md), [LIN-JON-62](docs/decisions/evidence/LIN-JON-62.md), [LIN-BOOTSTRAP](docs/decisions/evidence/LIN-BOOTSTRAP.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

JON-62 says C3 elements use “a preponderance of admissible evidence.” JON-61’s later impeachment update says “burden of proof at impeachment trial is clear and convincing evidence; separate criminal proceedings remain distinct.” The frozen bootstrap specification also uses clear and convincing. The inspected sources do not explicitly say whether C3 remains a specific exception or its impeachment trial now uses the higher burden. Preserve both; do not choose from timestamps or broaden either. Smallest owner question: does the later clear-and-convincing impeachment standard also govern C3 Senate conviction, or does C3 retain its specific preponderance rule? Other settled thresholds/finality rules remain intact.

<a id="CON-090"></a>
### CON-090 — Rejected Vote hierarchy

- Status: Superseded
- Scope: Historical organizational assertion
- Acceptance: Never treat old filename, workbook or repository summary as acceptance of the rejected hierarchy.
- Acceptance date: 2026-09-16 (correction)
- Sources: [LIN-IDENTITY](docs/decisions/evidence/LIN-IDENTITY.md), [AUDIT-REPORT](docs/decisions/evidence/AUDIT-REPORT.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

The former “Vote is the top-level project; Concord is its implementation/UI surface” hierarchy is rejected. The old PROJECT_RECORD and Drive index preserve this assertion only as historical evidence. CON-001 controls.

<a id="CON-091"></a>
### CON-091 — Old removal threshold and staffing proposals

- Status: Superseded
- Scope: Historical impeachment
- Acceptance: Later adopted interview decisions and September 16 owner freeze control.
- Acceptance date: 2026-09-16
- Sources: [LIN-JON-61](docs/decisions/evidence/LIN-JON-61.md), [LIN-BOOTSTRAP](docs/decisions/evidence/LIN-BOOTSTRAP.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

The old experimental 90% / unanimous-removal model, judiciary-as-general-bootstrap fallback, and counsel/public-representation proposals are not current. CON-016–019 and frozen revision 1.0 preserve separated functions, serving-judge exclusion, actual bootstrap sizes, thresholds and self-representation. Historical unresolved sizing notes do not reopen the frozen specification.

<a id="CON-092"></a>
### CON-092 — Forced returned-coin reuse

- Status: Superseded
- Scope: Historical unadopted proposal
- Acceptance: Owner selected option 3 instead of options 1/2.
- Acceptance date: 2026-09-24
- Sources: [LOCAL-COIN](docs/decisions/evidence/LOCAL-COIN.md), [LIN-JON-96](docs/decisions/evidence/LIN-JON-96.md)
- Supersedes: None
- Implementation: Design requirement; implementation is separate and not certified by this consolidation.
- Verification: Source reconciliation only; no product-runtime verification performed.
- Rationale: Preserve the recorded boundary without adding policy.

The proposal to force the next transaction to use a returned signed coin, including its destruction-as-escape variant, was not selected. ECON-02 records the owner’s free-choice selection. Permanent marks and automatic public exposure were not adopted either. This superseded entry preserves rejected proposal history; it does not imply the proposal was once accepted.
