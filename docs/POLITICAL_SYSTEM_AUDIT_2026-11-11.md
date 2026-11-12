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
[archivist]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md#L155
[project-status]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/PROJECT_STATUS.md
[pr37]: https://github.com/ptown16801-lang/concord/pull/37
[pr48]: https://github.com/ptown16801-lang/concord/pull/48
[pr69]: https://github.com/ptown16801-lang/concord/pull/69
[pr70]: https://github.com/ptown16801-lang/concord/pull/70
