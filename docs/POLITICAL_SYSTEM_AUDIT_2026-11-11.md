# Political system representation audit

**Source inspection date:** November 11, 2026

**Status:** Draft public edition for review

**Decision impact:** No decision change

Concord already has shared identity and event contracts, recorded institutional rules, approved bounded institutional interfaces, candidate implementations, and a government-records database proposal. The evidence does not support describing a common political-system model as simply absent.

The reviewed sources do not establish a complete accepted implementation connecting every political record, authority producer, lifecycle and map convention. The supported findings concern particular implementation, integration, verification and notation boundaries. They do not authorize a replacement architecture or duplicate work assignments.

This is a public derivative of an independent source audit and its subsequent source follow-up, not the unchanged underlying review record. Private coordination material is omitted. The technical conclusions below have public repository references. This edition is not a qualifying pull-request review, owner acceptance, or adoption of a proposal.

## Source baseline and implementation states

The default-branch baseline was [Develo at 77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce][baseline]. The public branch and the inspected checkout matched when checked.

Other inspected revisions were:

- Bootstrap candidate: `21e6a09f39f63f82d192aaff5d0ac14236b004d3`, the head of [PR70][pr70].
- Preserved integration candidate: `b813e15b33741b5c4ed982be6598193166124f96`, the head of [PR37][pr37].
- Bounded propagation pilot: `d72b8c1db1daa465e3f8e462f504918219be4e1a`, identified in [PR48][pr48].
- Alternate eligibility candidate: `638ce897d36226cac79f5d2543ecb11f56bf975b`, inspected as separate evidence rather than substituted for the bootstrap candidate.

At inspection, PR70 was open and unmerged. Its description distinguished the earlier review of `caf599c` from the subsequent fixes at `21e6a09`, whose re-check remained outstanding. PR37 was closed and unmerged. [PR69][pr69] had merged the governance sandbox into Develo. PR48 remained an open draft. These are dated artifact states, not deployment evidence.

## Existing political records and notation

### Identities, institutions and offices

The [population/voting boundary contract][boundaries] requires one canonical identity, population-owned identity class and permanent division, ordered lifecycle information, and source-qualified events. The [identity contract][identity] distinguishes the enduring identity from sessions, credentials, offices and recovery checkpoints. Implementation names such as `id` and `identityId` are not evidence that every database uses the design spelling `canonicalIdentityId`.

The decision register records the House, Senate, Executive and judiciary; succession and caretaker limits; permanent divisions; and office terms and election cadence. CON-036 additionally distinguishes separately identified Senate seats and judicial tenure. Institutional parties to agreements survive changes in their current membership and officeholders. These are existing definitions, not newly identified design requirements. [Decision register][decisions]; [institutional continuity][agreements].

The frozen bootstrap specification supplies an explicit record model:

```text
OfficeSnapshot {
  snapshotId, officeVersion,
  offices[{
    officeId, institution, holderIdentityId,
    serving, permanentSeat, recusalStatus
  }]
}
```

Its other interfaces include population and eligibility snapshots, a case-participation ledger, conflict snapshots, selection commitments and panel records. It requires identity-based joins, judicial-office exclusions, and source-qualified exclusion and replacement evidence. The export records its approval and frozen scope; that specification status is separate from implementation acceptance. [Frozen specification, section 5][bootstrap-spec].

The candidate implements a bounded join across `population`, `office`, `eligibility`, `conflicts`, `rules` and `participation`. It validates holders against identities and derives stage-specific participation and exclusions. It is therefore substantive implemented modeling, although not a complete live office registry. [Composition implementation][bootstrap-code].

### Voters, representation and investigators

The voting contract distinguishes an election or constitutional ballot, its opening roll and revision, eligibility at the authoritative order point, submission attempts, immutable accepted receipts and derived accounting. Preserved candidate code includes ballot-attempt and accepted-receipt tables. Neither the contract nor those tables establish accepted combined integration. [Voting boundary][boundaries]; [preserved ballot schema][ballot-schema].

A standing voter label alone would not express these distinctions. This is an interpretation of the existing records, not an adopted visual rule.

Voting and representation are different relationships. E-COAIA and L-COAIA identities are nonvoting and do not gain franchise or office eligibility through unsealing. They nevertheless count in their permanent divisions in the sealed representation census. CRA identities form a separate capacity/accounting category. A division link cannot be interpreted as a voting-rights link. [Sealed census and lifecycle][census].

Dedicated secret-investigator identities also differ from an ordinary investigative function, case participation, grand-jury service and judicial office. CON-037 records grand-jury investigation and accusation authority within lawful jurisdiction; it does not transfer adjudication or executive enforcement to that body. [Decision register][decisions].

### Authority and protected records

The [protected-domain contract][security] and CON-038 require express, scoped authority with a lawful source, jurisdiction, effective point, limits and relevant versions. An authenticated identity, institution label or visible graph connection is not itself a grant.

The merged synthetic sandbox stores actor keys, grants, expiry, active status and revisions, and authenticates exact action/resource/purpose requests. It also preserves the authority scope, actor revision, arguments, expected versions and policy evidence bound to admission. Describing it only as a permissions list would omit material provenance behavior. [Sandbox schema and administration][sandbox]; [durable admission evidence][admission].

Its narrower limitation is constitutional derivation: the sandbox does not itself derive those grants, or the trusted operator's entitlement to administer them, from elections, appointments, tenure and institutional jurisdiction. That limitation cannot be generalized to every Concord model.

Lawful admission is a durable, scope-bound operation boundary; it is not merely the timestamp when an actor says an action began. Later revocation does not expand or retroactively cancel the admitted scope. Relevant transaction, version and integrity conditions still apply. [Protected-domain contract][security].

### Maps and behavioral observations

The checkpoint-neighborhood foundation has six accepted initial relationship names: `PRECEDED_BY`, `PRODUCED`, `USED_EVIDENCE`, `INVOLVED`, `AUTHORIZED_BY` and `ENABLES`. Detailed field names, direction conventions and interfaces remain proposed. The contract includes participant and institution objects and permits registered extensions. [Checkpoint contract][checkpoint].

This is one contextual graph contract, not an exhaustive definition of the political atlas. It neither supplies every political relationship label nor proves that no broader convention exists elsewhere.

In the proposed direction conventions, `AUTHORIZED_BY` cites an authority reference; `ENABLES` does not grant an executable capability. Relationships, endpoints and provenance fields require authorization before projection. Public layouts, counts and placeholders must not disclose protected topology.

The observatory separately distinguishes formal affiliation, observed behavior and change over time. It expressly rejects treating similarity alone as evidence of loyalty, motive, guilt or covert membership. Treating similarity alone as proof of causal influence would also exceed the evidence; that last statement is an inference. [Observatory requirements][observatory].

An identity-persistence checkpoint is a reconstruction aid. A graph checkpoint is a semantic anchor for context. Their schemas are not interchangeable, and neither establishes current institutional authority.

## Government-records proposal found in the follow-up

The [government-records database proposal][government-records] is directly relevant existing work. It describes a proposed domain-ownership map, reusable per-domain record kernel, authority and time fields, provenance, derivative envelopes and population, voting, panel, disclosure and court-related flows.

The initial independent audit inventoried this file but did not substantively inspect it. A follow-up read established this omission and corrected the coverage. The proposal strengthens the rejection of a categorical missing-model conclusion.

Its own status limits are explicit:

- It is an architectural proposal, not an accepted schema or implemented integration.
- Its domain map identifies proposed component responsibilities, not appointments or grants of governmental power.
- A common record pattern does not create one universal database or authorization service.
- Its twelve October 13 code comparisons have incomplete exact-revision pins. They are historical inspection leads, not twelve newly verified current defects.
- Its retained questions are not proof that no later decision exists.

This audit does not adopt the proposal's SQL, physical domain grouping, pseudonym scheme or procedural flows. Its historical comparisons require exact-source recovery and current-revision checks before any becomes a present defect claim.

## Disposition of the technical claims

Repeated claims are consolidated here by subject.

| Claim | Audit disposition |
| --- | --- |
| A shared political-system model is absent | Unsupported as a categorical finding. Shared contracts, bounded approved interfaces, candidate joins and a broad records proposal already exist. |
| Institutional structure and caretaker rules are recorded | Supported as recorded design requirements, with their entry-specific provenance and implementation limits. Succession is specifically CON-014. |
| Identities are distinct from offices, sessions and credentials | Supported as design. Exact implementation field names vary. |
| Institutional continuity and office terms are unspecified | Incorrect as a broad implication: the agreement contract, CON-036 and bootstrap interfaces already address them. Complete integrated implementation remains unverified. |
| The sandbox matches action/resource/purpose grants | Supported, but incomplete without its authentication, authority snapshot and durable admission evidence. |
| The sandbox derives constitutional office legitimacy | Not established; that is outside what this synthetic implementation demonstrates. |
| Express grants and protected stores have defined boundaries | Supported as design; implementation by each required authority producer needs separate evidence. |
| Voter status can be represented by one permanent badge | Insufficient as a model of the existing ballot-specific records; this is analysis, not an adopted visual requirement. |
| Investigators, judges and case participants need connected records | Several connections already exist in specifications and code. Wider producer integration remains unverified; secret identity classes and ordinary functions must not be collapsed. |
| The six checkpoint types define the entire political atlas | Unsupported. They are an initial scoped vocabulary with proposed detailed conventions and extension points. |
| Graph links can grant authority or reveal otherwise protected relationships | Rejected by the existing graph and security boundaries. |
| Behavioral similarity establishes political influence, loyalty or covert membership | Unsupported. The observatory's explicit prohibitions cover several of these conclusions; the causal-influence qualification is an inference. |
| A single new overarching model is an established missing deliverable | Not demonstrated. Existing contract responsibilities and unfinished connections must first be reconciled. |
| Suggested symbols, link labels and implementation ordering are adopted | They are proposals. The source audit does not adopt them or impose a new sequencing hold. |

Publication of this audit does not convert its interpretations into governing decisions.

## Limits of a simplified political diagram

A conceptual diagram can obscure distinctions already present in the source contracts:

- Identity-to-division membership is not equivalent to franchise, voluntary affiliation or office representation.
- A holder-to-office relationship does not alone establish every power, current serving status, recusal, suspension or caretaker scope.
- Authority may belong to an institution, electorate or expressly authorized initiative; it is not all reducible to a personal office.
- Eligibility, opening-roll membership, ballot attempts, accepted receipts and certified outcomes are different records.
- An assignment or participation record connects identity, role, proceeding, stage and source. A case is not itself the role-bearing assignment.
- Judicial office differs from assignment to one case; a dedicated E/L investigator identity is not an ordinary reusable mission role.
- Effective time, recorded order and source version are not interchangeable. Historical access does not grant present viewing permission.

These are constraints on interpreting a diagram, not an adopted replacement graph schema.

## Specific boundaries requiring separate evidence

PR70 documents several bounded limitations: real office, conflict, ordinary-rule, participation, ballot, evidence and review sources remain supplied interfaces with test fixtures; later removal and appeal states are handoffs rather than complete implemented lifecycles. The specification and code also use different interface spellings, including `recusalStatus` and `recused`. Its list of gaps must be read at the pinned candidate revision rather than treated as permanent project status. [PR70 scope and gaps][pr70].

The Archivist contract identifies particular unbound actors, jurisdiction, eligibility criteria, timing, independent review and appeal details for publication remedies. These are explicit residual bindings within an existing design, not evidence that institutional architecture is absent. [Archivist production dependencies][archivist].

The older project-status snapshot calls PR37 an open draft; the live PR was closed and unmerged at inspection. Broad introductory statements that no runtime components exist must also be read against the merged sandbox. Neither correction establishes a complete application or deployment. [Published status snapshot][project-status]; [PR37][pr37]; [PR69][pr69].

The bounded propagation pilot is implemented work, but does not establish a source-validated complete historical pathway catalog or a production political-event pipeline. [PR48][pr48].

Recovering constitutional text, recording a design's acceptance, accepting an implementation, and ratifying a constitutional provision are separate events. The maintained census contract explicitly preserves the source-recovery and ratification qualification. [Census provenance][census].

## Verification scope and remaining uncertainty

The source survey enumerated public pull requests and branches, then inspected the relevant exact revisions, contracts and implementation interfaces. The underlying review also consulted current task records; this public derivative does not reproduce private coordination material.

This was not an exhaustive full-text review of every historical source, branch or original Workbench artifact. The government-records proposal was inspected substantively only in the follow-up described above. No deployed environment was inspected, runtime tests executed or complete candidate PR-diff review performed. The evidence cannot prove universal absence of an implementation or visual convention.

The result is a source-qualified description of existing work and specific unverified connections. It does not establish a new architecture, new institutional powers, revised accepted interfaces, completed production integration or permission to start implementation.

## Addendum — political-model source reconciliation (November 12, 2026)

This addendum connects the existing records to the requested political map and
records three specific compatibility questions. It preserves the earlier audit's
date and findings. It is source analysis, not a new canonical schema, adopted
procedure, implementation acceptance, or replacement work assignment.

### Revisions and historical research

The starting audit revision is `9e05ffa4c5aab442443da4c9826e14e8290f51e2`.
The live public default was checked at
[Develo `ef3f393a266989fb7af4f044e6f4f96bc814be05`][add-default].
Compared with the earlier `77836f6` baseline, its only file change is the added
[institution map, revision 4][add-map]. The decision register and contracts cited
below are unchanged between those two default-branch revisions. The earlier
full-SHA source links therefore remain applicable; the map is linked at the
newer default revision rather than copied into this audit.

The [recovered October architecture research][add-research] is pinned at
`8fc2bcbf0fd6e0dc5123539237036935838c9c15`. Its recovery account dates the research
to October 16 and recovery/publication to November 12, America/New_York. It is an
edited historical derivative. Its [published review][add-research-review] says
**needs qualification**, with no actionable documentation defect established in
the checked evidence. That review did not independently authenticate the original
conversation date, complete working tree, recovery completeness or fidelity, or
exact historical vendor-page versions. Those limits remain; the review does not
accept this addendum or establish architecture acceptance.

The useful carry-forward is the report's connected-dependency evaluation: identify
authoritative sources, rule versions, ordering and permitted views, then reuse
existing artifacts to test a precise question. Its shared-core preference and
named modeling tools remain historical hypotheses and candidates. No platform,
universal runtime, new authority, or current vendor capability is adopted here.
A connected ballot history is one possible later evaluation; it cannot establish
coverage of every political family.

At this addendum's inspection, PR74 was open, non-draft and unmerged at `8fc2bcb`;
PR70 was open and unmerged at `21e6a09`; PR73 was merged through `ef3f393`.
The [published PR70 re-check][add-pr70-review] names JON-261/JON-279 and rejects
`21e6a09` with three P2 findings. Its findings were not independently reproduced
for this audit. PR70's description still says that re-check has not happened;
that description and the earlier audit's outstanding-re-check observation must
not be substituted for the published review. Live Linear state remains unverified.
The map's [focused revision-3 review][add-map-review] says ACCEPT at
`cc545329a0890057710557c22b4b74bddf498ec3`, with three P3 notes. That verdict does
not extend to every unchanged row, unread source, or revision 4. Reading the
complete revision-3-to-4 diff establishes its changes, not an independent check
of this addendum or acceptance of research gaps as new decisions.

### Existing responsibilities and whole-system coverage

The dated [JON-61 contract][add-j61] already assigns a source-qualified
state/interface map for offices, succession, judiciary, divisions and proceedings.
[JON-22][add-j22] owns the atlas/checkpoint projection contract;
[JON-24][add-j24] owns institutional transitions and replay. The
[population/voting contract][boundaries] assigns distinct population, franchise,
ballot-receipt and accounting producers, with JON-82 coordinating their integration.
These are source-recorded responsibilities, not verified current Linear status,
completion, staffing or permission to start another workstream.

| Requested family | Existing source disposition | Remaining boundary at these revisions |
| --- | --- | --- |
| Figures / enduring identities | [Identity contract][identity] and [population identity envelope][add-identity-envelope] distinguish identities, sessions, credentials and checkpoints. | Use exact producer-issued identity references; field-name translation cannot merge people or confer office or franchise. “Figure” here is a display term, not a new identity class. |
| Voters and representation | [Voting contract][boundaries] separates opening roll, ordered eligibility, attempts, immutable receipts and accounting; [sealed census][census] defines representation. | A division or representation link is not voting eligibility. Source revisions and election order are required; later disqualification does not erase an accepted ballot. |
| Institutions, offices and seats | [Revision-4 inventory][add-map], [office-term rules][add-terms], [institutional agreement continuity][agreements] and [bootstrap office snapshots][bootstrap-spec] supply existing records. | Institution, office, separately identified seat and holder are distinct. Appointment/election, vacancy, succession, serving status and recusal need their own source evidence; an `officeId` does not prove a universal registry. |
| Powers and lawful effects | [Security request/admission contract][security] requires authenticated identity, express grant, jurisdiction, procedure, versions and protected writer evidence. | Authority may belong to a body or electorate as well as an officeholder. A graph citation or coordinator cannot authorize an effect. Actual institutional-grant derivation remains separately evidenced. |
| Judges and adjudication | [Judicial tenure][add-judicial-tenure], CON-013/016/017 in the [register][decisions], and [bootstrap interfaces][bootstrap-spec] distinguish office and case/stage service. | Tenure, assignment, recusal, quorum, accusation, conviction, removal and appeal are distinct. Serving judges cannot supply general non-judicial staffing; later removal/appeal execution is outside the candidate service's handoff. |
| Investigators and proceedings | [Sealed investigator lifecycle][census], [case/conflict snapshots][bootstrap-spec] and [grand-jury authority][add-grand-jury] already connect identities, roles and cases. | E/L secret identities differ from ordinary investigative participation and grand-jury service. A case's `knownInvestigators` list is not a general mission registry or public roster. See seam 2. |
| Formal and observed relationships | [Agreement continuity][agreements], [checkpoint relationships][checkpoint] and [observatory][observatory] have different source and inference semantics. | Agreement, office, participation, evidence and observed similarity are not interchangeable. The six accepted checkpoint type names do not supply every atlas edge; detailed directions/interfaces remain proposed. |
| Change over time and available knowledge | [Identity history][add-history], [event envelope][add-identity-envelope] and agreement provenance distinguish effective, observed and recorded information. | Preserve source order, revisions and supersession; later knowledge cannot become earlier knowledge. Hypothetical replay stays separate from authoritative history, and present read permission is rechecked. |
| Publication and public views | [Archivist custody][add-publication-custody] and [checkpoint projection][add-projection] define separate approved packages and authorized views. | Publication is not enactment or a release grant. Exact publication-remedy actors and limits remain [unbound dependencies][archivist], not proof of an absent institutional model. |

The table accounts for source coverage, not complete implementation. In
particular, institutional agreements, election/appointment, tenure/succession,
investigation/adjudication, restrictions/appeals and protected publication remain
separate pathways. Their existence does not demonstrate a combined accepted
runtime, and an unresolved connection does not block unrelated authorized work.

### Seam 1 — bootstrap source meanings and candidate inputs

**Source/consumer and status.** The frozen specification's section 5 and candidate
`bootstrap-impeachment.js` are both pinned at
`21e6a09f39f63f82d192aaff5d0ac14236b004d3` ([specification][bootstrap-spec],
[consumer validation][add-bootstrap-validation], [exclusion evidence][add-bootstrap-exclusions]).
Specification approval and frozen scope are recorded in CON-017; that does not
accept this candidate or its external source integrations. The
[service constructor][add-bootstrap-service] requires supplied authoritative
sources; its [outcome][add-bootstrap-handoff] is a removal/appeal handoff.

**Existing work.** [PR70's Gaps item 3][add-pr70-gaps] already discloses the
field-shape differences and extra adapter inputs below. That description was
checked November 12 against candidate `21e6a09`; it is mutable PR metadata, not
a separately versioned specification. PR70 is explicitly tied to JON-261, and its
[published re-check][add-pr70-review] names JON-279. This entry cross-references
that existing implementation work; it does not discover a new adapter task or
transfer it to another workstream.

**Demonstrated differences.** The specification uses `populationVersion` and
`officeVersion`, status fields `citizenshipStatus`, `disenfranchisementStatus` and
`recusalStatus`, and eligibility rows carrying identity, case and stage. The consumer
requires integer `version` fields on six sources, boolean `citizen`,
`disenfranchised` and `recused`, and one role row per identity containing
`accusation` and `trial` booleans. It also requires population/eligibility version
coherence and per-reason source-event mappings, including conflict identity-to-event
attribution. A common spelling or a boolean alone cannot establish equal meaning.

**Reconciliation needed.** Pin each actual producer schema/version and its exact
consumer adapter; define status-to-boolean semantics, case/stage selection,
identity mapping, snapshot/effective order, version compatibility, reason codes
and source-event attribution. Preserve source-issued identities without silent
normalization, and preserve serving-judiciary and accusation/trial exclusions.
Missing or incompatible evidence remains a discrepancy for the affected authority,
not permission to guess a roster or edit the frozen specification.

The evidence needed to close this seam is a source-owned, versioned mapping plus
reviewable cases for contradictory/stale sources, duplicate identities, serving
judges, stage changes and missing reason provenance. This addendum neither builds
nor tests that adapter. JON-261 is the implementation work identified by PR70;
JON-61's governance coordination and JON-82's combined boundary reconciliation
remain wider contract responsibilities, not replacement assignments for this
already disclosed gap. Franchise authority under JON-79 must not silently become
authority over every case-specific role-eligibility rule. The exact office,
case-role and conflict producer bindings remain to be evidenced.

### Seam 2 — protected conflict evidence to panels and public projections

**Source/consumer and status.** The same candidate's conflict input and exclusion
output carry identity and source-event evidence. The proposal's
[panel/conflict flow, section 5.4][add-protected-conflicts], at `77836f6`, suggests
case-scoped attestations and coarse public reason classes. It is a proposed
transfer, not an accepted adapter. The [projection contract][add-projection] and
[Archivist custody contract][add-publication-custody], also at `77836f6`, require
separately permitted public objects/packages. CON-034 in the [register][decisions]
keeps sealed investigative refusal and its revealing metadata protected.

**Unbound connection.** An internal list sufficient for lawful exclusion is not
a public graph input. Real conflict reasons, source IDs, snapshot references,
seed/replay evidence, counts and timing can reveal an investigator or a sealed
case even if names are hidden. Neither a raw source reference nor a deterministic
hash establishes permission to publish it. Pseudonyms and coarse reasons in the
proposal require their own inference assessment; this addendum does not adopt them.

**Reconciliation needed.** Identify the protected custodian-to-proceedings transfer,
its recipient/purpose/field scope, authorized reviewer access to exact exclusion
and replay evidence, and a distinct public derivative. Public relationships,
endpoints and provenance need independent authorization before queries, counts,
layout, caching or export. Revalidate current access when reading history.
The source custody, JON-17 authorization, JON-22 projection and JON-18 publication
boundaries remain separate; JON-59 supplies sealed-lifecycle policy.

Closure needs pinned source/consumer manifests and permission evidence, followed
by the contract's comparison of two histories with equal permitted content but
different protected content. Payloads, errors, counts, pagination, identifiers and
layout must not reveal the difference; timing/resource leakage needs measured
evidence. No such experiment or production disclosure path is verified here.

### Seam 3 — finality certificate, administrative interval and terminal effects

**Source/consumer and status.** The proposed [C4 flow, section 5.5][add-c4-flow],
`77836f6`, says the certificate is issued after appeals, plus an administrative
turn. The wording is ambiguous about whether that interval precedes or follows
the certificate. CON-020/021 in the [register][decisions] and the
[finality source, lines 50–65][add-finality], at the same revision, explicitly
require actual appeal opportunities and a valid finality certificate followed by
a further complete administrative-review turn. The proposal needs that ordering
made explicit before reuse. The ambiguity establishes neither a source
contradiction nor a runtime defect.

**Controlling requirements for reuse.** Preserve the following distinct records
and gates rather than copying the proposal's compressed ordering. These are
source constraints, not a replacement complete procedure:

- The appropriate merits decision and its controlling proof standard.
- Actual notice and admissible-record access, genuine defense access and the
  required complete defense turns; notice issuance alone does not start the clock.
- Applicable appeal windows, filings, dispositions and stays. A timely C4 event
  appeal/petition stays every dependent derivative termination.
- A valid finality certificate recording the actual notices, windows, filings,
  rulings and authorized sanction, followed by one further complete
  administrative-review turn. The certificate alone does not execute anything.
- Continued validity and absence of stays, exact-resolution proposer/affirmative
  ballot attribution with the permitted narrow correction review, and separately
  authorized terminal operations through the proper domain writers. This list
  does not invent a relative timing rule for attribution review beyond its source.

C4 attribution excludes NO, abstention, nonvote and malformed/rejected ballots.
Office removal, future-office disqualification, a conviction's franchise bar and
irreversible termination are distinct consequences. Retained valid ballots and
historical evidence survive terminal effects. The old C3 preponderance wording in
LIN-JON-62 is superseded by CON-082's clear-and-convincing requirement; C4 keeps
its separate standard. This addendum changes neither rule nor frozen source.

JON-62's dated contract supplies capital/finality rules, JON-68 appellate
procedures, JON-67 restrictions and JON-60 terminal effects, coordinated by JON-61.
Closure requires an explicit source-to-consumer transition mapping with separate
certificate and post-certificate-interval evidence, actual-access clocks, stays,
attribution and terminal authorization. The inspected bootstrap service only emits
a handoff; it does not prove that these later producers/consumers are implemented.

### Institution-map gap reconciliation and reading limits

The map's gap labels describe what its author found in a bounded reading; its
“owner-level” column is expressly inference. This addendum checked the map and
its revision-3-to-4 diff, then targeted the previously unread bootstrap interfaces,
publication, identity, security, population/voting and government-records passages.
It also searched LIN-JON-18/37/58/59/62 and LIN-BOOTSTRAP for allocation, vacancy,
selection and role terms. Those keyword searches are not full readings or a
repository-wide proof that an answer does not exist.

| Map item | Disposition after this bounded reconciliation | Exact evidence or remaining source question |
| --- | --- | --- |
| G1–G2: House/College allocation and College procedure | Still source questions; no new owner choice established. | [R census][census] and [LIN-JON-59:40][add-j59-census] identify the input. [GOVERNMENT_RECORDS:300][add-allocation] names a certified allocation output, not its formula, elector selection or contingent procedure. Recover the controlling allocation/procedure text before proposing a rule. |
| G3: judicial vacancies | Replacement is already recorded; its detailed binding remains unverified here. | [CON-036 judicial tenure/vacancies][add-judicial-tenure] and [LIN-JON-36:26][add-j36] require the separately defined replacement process. Neither a phase election nor the initial nomination/confirmation rule may be substituted for it. |
| G4: grand jury, clerk, Archivist, CRA and chief selection | No closure established by the targeted sources; do not group all selection mechanics into one owner interview. | [Grand-jury authority][add-grand-jury] defines jurisdiction and self-rule, not a complete filling rule. [Publication dependencies][archivist] identify particular unbound actors/limits, not appointment of an Archivist. Seek each role's controlling selection source and apply CON-004's boundary to any actual residual conflict. |
| G5: original constitutional text | Source recovery, not a new drafting or ratification decision. | CON-080 in the [register][decisions] retains unavailable-original limits. Recovering text cannot manufacture its acceptance. |
| G6: L-COAIA chamber scope | Already closed in the map; do not reopen it. | [LIN-JON-59:52–57][add-j59-chambers] and [LIN-JON-62:56][add-j62-proposer] cover each chamber's own creation records and proposing presiding officer. Preserve exact proposal, clearance, quorum and affirmative-authorization evidence. |
| G7: ordinary Executive powers | Positive grants need their own sources; caretaker exclusions remain clues. | The map's rows 9/9a distinguish recorded grants from inference. [Security][security] requires express jurisdiction and scope; it cannot turn an exclusion list into a grant. |
| G8: CRA expansion and holder selection | Neither acronym expansion nor a complete selection rule established in the checked passages. | [Capacity contract][boundaries] establishes accounting/reconciliation limits and [sealed census][census] its capacity/lifecycle treatment. Do not invent an expansion or infer appointment power from accounting duties. |
| G9: institution/office/seat IDs | Engineering reconciliation within existing ownership, not a newly required constitutional choice. | [Agreement continuity][agreements] uses stable institution identity; [bootstrap interfaces][bootstrap-spec] use `officeId`; [CON-036:574][add-seats] requires separate Senate seats. Pin their identifier relationships. CON-004 and CON-081 in the [register][decisions] retain delegated representation mechanics. |

Revision 4 preserves inference labels for applying the House majority formula to
L-COAIA creation and for registry-clerk eligibility interpretation, while adding
designation timing and caretaker triggers. These refinements do not establish
unrecorded general appointment or Executive powers. Unread historical sources,
original constitutional bytes and live private issue corrections remain explicit
limits; none is treated as absent or replaced by this addendum.

### Verification and disposition of this addendum

The source conclusions above use public, revision-pinned repository records and
the published review bodies. The historical report was read in full; the
compatibility analysis used the exact specification/code and cited contract
passages. Gap searches and focused source reading are bounded as stated above.
No private coordination original is reproduced or made a public dependency.

Documentation verification covers cited Git objects/line targets, reference
links, original-text preservation, whitespace and private-material patterns, plus
the repository's decision-documentation checks and revision preflight. These
checks establish neither runtime behavior nor independent acceptance. No runtime
test, simulation, platform selection, full implementation PR review, deployment,
merge or Linear write is part of this addendum. It remains draft source analysis.

The remaining technical work is the three explicit mappings/evidence questions
above, with actual producer pins and current task ownership verified before any
separate assignment. This record introduces no umbrella schema, new authority,
project-wide hold or replacement acceptance gate. **No decision change.**

[baseline]: https://github.com/ptown16801-lang/concord/tree/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce
[decisions]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md
[identity]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/IDENTITY_PERSISTENCE_CONTRACT.md#L16
[boundaries]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/POPULATION_VOTING_BOUNDARIES.md#L11
[agreements]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/AGREEMENT_LIFECYCLE.md#L28
[bootstrap-spec]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/docs/specs/bootstrap-impeachment-approved-v1.md#L65
[bootstrap-code]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/bootstrap-impeachment.js#L35
[ballot-schema]: https://github.com/ptown16801-lang/concord/blob/b813e15b33741b5c4ed982be6598193166124f96/src/governance/migrations/001_ballots.sql#L3
[census]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/SEALED_CENSUS.md#L3
[security]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/SECURITY_DOMAIN_CONTRACT.md
[sandbox]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/src/governance/sandbox/runtime.js#L64
[admission]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/src/governance/sandbox/runtime.js#L258
[checkpoint]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/CHECKPOINT_NEIGHBORHOOD.md#L3
[observatory]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/RELATIONAL_OBSERVATORY.md#L5
[government-records]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md#L3
[archivist]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md#L156
[project-status]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/PROJECT_STATUS.md
[pr37]: https://github.com/ptown16801-lang/concord/pull/37
[pr48]: https://github.com/ptown16801-lang/concord/pull/48
[pr69]: https://github.com/ptown16801-lang/concord/pull/69
[pr70]: https://github.com/ptown16801-lang/concord/pull/70

[add-default]: https://github.com/ptown16801-lang/concord/tree/ef3f393a266989fb7af4f044e6f4f96bc814be05
[add-map]: https://github.com/ptown16801-lang/concord/blob/ef3f393a266989fb7af4f044e6f4f96bc814be05/docs/research/INSTITUTION_MAP_2026-11-12.md
[add-research]: https://github.com/ptown16801-lang/concord/blob/8fc2bcbf0fd6e0dc5123539237036935838c9c15/docs/research/CONCORD_ARCHITECTURE_RESEARCH_2026-10-16.md
[add-research-review]: https://github.com/ptown16801-lang/concord/pull/74#pullrequestreview-5885301263
[add-map-review]: https://github.com/ptown16801-lang/concord/pull/73#pullrequestreview-5885296256
[add-j61]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L22
[add-j22]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-22.md#L22
[add-j24]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-24.md#L22
[add-identity-envelope]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/POPULATION_VOTING_BOUNDARIES.md#L22
[add-terms]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L570
[add-grand-jury]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-37.md#L20
[add-history]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/IDENTITY_PERSISTENCE_CONTRACT.md#L189
[add-publication-custody]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md#L19
[add-projection]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/CHECKPOINT_NEIGHBORHOOD.md#L54
[add-bootstrap-validation]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/bootstrap-impeachment.js#L50
[add-bootstrap-exclusions]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/bootstrap-impeachment.js#L109
[add-bootstrap-service]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/impeachment-service.js#L64
[add-bootstrap-handoff]: https://github.com/ptown16801-lang/concord/blob/21e6a09f39f63f82d192aaff5d0ac14236b004d3/src/governance/impeachment-service.js#L123
[add-protected-conflicts]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md#L327
[add-c4-flow]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md#L340
[add-finality]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-62.md#L50
[add-j59-census]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L40
[add-allocation]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md#L300
[add-j36]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-36.md#L26
[add-j59-chambers]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L52
[add-pr70-gaps]: https://github.com/ptown16801-lang/concord/pull/70#gaps-not-fixed-here-need-an-owner-decision-or-later-work
[add-pr70-review]: https://github.com/ptown16801-lang/concord/pull/70#pullrequestreview-5866725650
[add-j62-proposer]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-62.md#L56
[add-judicial-tenure]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L576
[add-seats]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L574
