# Checkpoint neighborhoods

Status: proposed engineering contract, September 30, 2026. A recorded technical/design review does not adopt its proposed interfaces or establish runtime acceptance.

## Authority and scope

This design elaborates the accepted checkpoint-neighborhood foundation: durable semantic anchors, explicit typed relationships and permission filtering before a one-hop projection is calculated. Field names, interface signatures and navigation mechanics remain proposed. Checkpoints and views do not become authoritative stores. Historical Workbench delivery and a current production implementation are not established by this document.

## Dependency ownership

| Owner | Input consumed by this contract | Boundary retained |
| --- | --- | --- |
| JON-17 | Trusted caller context and authorized, versioned read adapter | Defines authorization; JON-22 never accepts browser claims as permission |
| JON-18 | Authenticated publication records and independently authorized disclosure derivatives | Publication is provenance, not proof that an act was lawful; protected source pointers stay protected |
| JON-14 | Window hosting and navigation slots | Owns shell/source integration |
| JON-27 | Pointer, touch and keyboard actions | Owns shared input behavior; no bespoke conflicting gesture vocabulary |
| JON-24 | Source-qualified next-state descriptions | Owns transition semantics; JON-22 only displays hypothetical possibilities |
| JON-21 | Optional authorized analytical annotations | Owns metrics and uncertainty; similarity does not prove motive or affiliation |
| JON-23 | Search/help routing over permitted objects | Owns indexing and contextual help |

JON-52 Research Library interfaces remain held and are neither an input requirement nor an implementation shortcut. A disclosure derivative receives its own permitted reference; it does not expose the sealed original's ID, hash, location, event time, relation count or linkage unless each such field is separately authorized.

## Proposed data contracts

All IDs below are opaque stable identifiers supplied or minted by the relevant owner, not display titles. Revisions identify immutable versions; corrections create a new revision with lawful supersession provenance rather than rewriting historical source records. Exact encoding, storage engine and identifier generator remain implementation choices. Missing values are explicit absence, never fabricated defaults.

| Record | Required fields | Optional fields and constraints |
| --- | --- | --- |
| SourceRef | `owner`, `recordId`, `revision` | Digest or locator only when separately authorized for disclosure; references never confer access |
| Checkpoint | `schemaVersion`, `checkpointId`, `revision`, `origin`, `sourceRefs`, `summary` | `origin` is system event, user designation or emergent nomination; `category` is optional and extensible; visible occurrence time distinct from record creation time; creator identity/provenance visible only when permitted |
| Relationship | `schemaVersion`, `relationshipId`, `revision`, `type`, `fromRef`, `toRef`, `sourceRefs` | Optional qualified explanation; relationship and both endpoints require authorization independently |
| ProjectedObject | `viewRef`, `kind`, `label`, `sourceRevision` | Kind may be checkpoint, record, participant, institution or next-state description; return only authorized fields and allowed navigation actions |
| Neighborhood | `projectionVersion`, `center`, `objects`, `relations`, `groups` | Optional opaque page cursor; source freshness/uncertainty only if safe to disclose; no hidden totals or denied-object diagnostics |

Checkpoint origin records how an anchor was identified, not the truth of its interpretation. `sourceRefs` are nonempty for an authoritative-source-derived anchor; a user or emergent designation may instead cite its own attributable designation record, and must be labeled as designation rather than confirmed institutional fact. Open-ended emergent anchors require no predefined category. This schema records already-authorized nominations; it does not define a nomination electorate, voting threshold or enactment power.

Internal source envelopes may contain protected metadata for authorized server processing. The public/projected schema is a separate allowlist, never a shallow copy of that envelope. Labels, explanations, timestamps and provenance are authorized as content, not made safe merely by hiding IDs.

### Relationship direction

The following direction conventions are proposed for unambiguous implementation; the six type names themselves are accepted by JON-22.

| Relation | Read `from → to` as | Group when `from` is the selected checkpoint |
| --- | --- | --- |
| PRECEDED_BY | This checkpoint followed that checkpoint/event | Predecessors |
| PRODUCED | This checkpoint produced that output | Outputs |
| USED_EVIDENCE | This checkpoint used that evidence record | Evidence |
| INVOLVED | This checkpoint involved that participant/institution | Participants |
| AUTHORIZED_BY | This checkpoint cites that authority record | Authority context |
| ENABLES | This checkpoint enables consideration of that next state | Next states |

`AUTHORIZED_BY` is a cited claim/reference, never an authorization decision by the graph. `ENABLES` is descriptive and does not grant executable capability. A projected object may become the center even if it is not itself a checkpoint. Such a center shows its authorized incident relationships with direction preserved; the renderer may describe the inverse in words but must not reverse the stored meaning. Expansion is one edge from the center, not transitive traversal or inferred adjacency. Unknown relation types are preserved in versioned source storage but omitted from unsupported client presentation without exposing protected counts; their safe presentation requires a registered semantic contract.

## Authorization before projection

Proposed logical interface: `projectNeighborhood(trustedContext, request) → Neighborhood | Unavailable`. The request contains a center reference, supported view mode and optional opaque page cursor; it cannot set the caller, domain, authorization result or policy generation. JON-17's server-side adapter supplies those trusted values.

1. Establish the current authorized read scope and applicable versions before neighborhood queries. Resolve the center through that scope. Missing and unauthorized centers have the same caller-visible unavailable result.
2. Query only the authorized projection relation or equivalent permission-constrained query. Do not query the whole graph into the client and filter afterward. No pre-filter counts, rankings, pagination, cache admission or layout may observe protected topology.
3. Require authorization for each relationship, both endpoints, source-reference fields and descriptive payloads. A visible endpoint does not imply a visible edge. An authorized disclosure derivative is traversed as its own object, never as an invitation to retrieve the protected original.
4. Select immediate relationships and group their authorized endpoints. Deduplicate using authorized object identity. Compute sort order, layout, navigation affordances and page limits solely from that permitted set. Proposed tie-break: visible type, visible label, then permitted opaque reference; never hidden chronology or global row position.
5. Revalidate authorization freshness before returning the response. If the adapter cannot establish consistent scope/version, return a generic unavailable response; do not return a stale wider projection. Exact snapshot and revocation mechanism is owned by JON-17 and must be pinned before runtime implementation.
6. Keep any server cache partitioned by authorization scope and source/policy revision, and invalidate it on changes that could narrow access. No public cache key, ETag, cursor, response count or export manifest may encode broader source membership. Reauthorize every cache hit, page continuation, recenter, history restore and export. If this cannot be guaranteed, bypass the cache.

The non-disclosure rule includes existence, timing, counts, location, identities and topology. Implementation acceptance must compare two worlds identical in permitted content but different in protected content. Both must expose equivalent payloads, errors, pagination, layouts, identifiers and user-observable behavior. Timing/resource side channels require measured evidence and a suitable query architecture; this prose does not prove constant-time behavior or OS containment. Protected operational diagnostics remain in an authorized sink, never a caller-visible error detail.

Limits apply after authorization. Any “more” indicator counts only additional permitted entries. Cursors are opaque, integrity protected and scope/version bound; stale cursors require a fresh projection rather than revealing how hidden membership changed. Numeric page-size limits remain an implementation parameter to validate, not a new product policy.

## Navigation and presentation

Proposed local navigation state is a stack of permitted center references, presentation mode and UI position, scoped to the authenticated session. Successful recenter pushes the previous center only after receiving a new authorized projection. Back requests a fresh projection; it does not resurrect old cached labels or details. On access change, clear previously displayed content and stale navigation labels before presenting the new permitted view. Use the same neutral unavailable state for revoked and nonexistent references. Changing users/domains clears the stack.

| Mode | Content | Action |
| --- | --- | --- |
| Compact | Authorized label, kind and concise source-qualified summary | Open expanded view; recenter if permitted |
| Expanded | Immediate permitted groups, typed edges and uncertainty labels | Recenter on any visible object; back |
| Investigate | Additional authorized rationale/provenance and read-only source detail | Follow permitted source route or return; no authority mutation |

A deeper mode never expands permission. Keyboard and touch must reach the same actions, with text equivalents for graph relationships. Hidden nodes produce no placeholders, blank reserved slots or disabled controls suggesting a protected neighbor. Presentation geometry remains replaceable; meaningful information and authorized navigation are the acceptance target.

## One hypothetical branch

Proposed interface: `createScenario(trustedContext, permittedCenterRevision, hypotheticalInputs) → ScenarioView`. Maintain one separate branch per active exploration. Every scenario object carries an unmistakable hypothetical label and references only the authorized projected baseline. Its edits change a separate overlay; no source record, checkpoint revision, relationship, nomination vote, ledger or authoritative transition is written.

Scenario inputs contain user assumptions, not asserted institutional facts. JON-24 supplies any supported transition semantics; absent semantics remain UNKNOWN rather than simulated by guessed rules. No live institutional action handler or capability is reachable from branch execution. Recenter/back can inspect the branch while preserving the original baseline. Discard removes the overlay only. Source changes mark the scenario stale and require a fresh authorized baseline; revocation removes affected content rather than retaining it in assumptions, exports or history. Scenario export, if later implemented, reauthorizes every included field and labels the result hypothetical. It cannot be imported as authoritative history.

## Acceptance matrix for later implementation

These are review scenarios, not tests executed by this design session.

| ID | Scenario | Required observation |
| --- | --- | --- |
| CP01 | System event, user designation and uncategorized emergent anchor | Stable identity/revision, attributable origin and explicit evidential status; no mandatory category |
| CP02 | Each of the six relation types and an unsupported extension | Direction survives serialization; supported relations retain meaning; no guessed semantics |
| CP03 | Visible center and hidden endpoint, edge or provenance field | Omit unauthorized content before grouping/count/layout; no placeholders or diagnostic hints |
| CP04 | Two source worlds differ only in hidden records | Same permitted response, pagination, geometry and observable behavior; measure timing leakage separately |
| CP05 | Missing center compared with unauthorized center | Same caller-visible unavailable response and navigation behavior |
| CP06 | Public derivative refers internally to a sealed original | Only derivative-authorized fields appear; no sealed ID/hash/link/time leaks |
| CP07 | Recenter on output, evidence, institution and next-state object | Each becomes center with one-hop directed incident context; no transitive disclosure |
| CP08 | Permission revoked between query and return, cache hit, back, paging or export | Narrowed access enforced; stale content and labels removed; no old projection restored |
| CP09 | Expand through three modes by pointer, touch and keyboard | Equivalent reachable actions and text relationships; unchanged authorization |
| CP10 | Add hypothetical branch and change inputs | Authoritative source digest/revision unchanged; all scenario outputs labeled hypothetical |
| CP11 | Source revision changes or branch loses access | Scenario stale/removed as appropriate; no implicit migration to new facts or authority |
| CP12 | Create/nominate/aggregate using a protected source | Authorized producer boundary rejects before derived metadata exists; no partial checkpoint leakage |
| CP13 | Unavailable policy adapter, malformed cursor or unsupported source version | Deterministic generic failure without protected fallback or partial projection |
| CP14 | Repeated identical authorized query on the same revisions | Stable ordering and provenance; changes attributable to visible revisions only |

CP12 applies when producer APIs are implemented elsewhere: the read-only viewer cannot alone certify producer compliance. Runtime evidence must identify the actual adapter and covered operations, rather than claim that viewer filtering proves all nomination/voting/analysis paths safe.

## Implementation limits

Authoritative security readers, durable checkpoint storage, original Workbench compatibility and production integration are not established by this draft. The acceptance matrix specifies checks for a future implementation; it is not a report that those checks ran.
