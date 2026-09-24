# Evidence snapshot: docs/IDENTITY_PERSISTENCE_CONTRACT.md

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/blob/1e86688cc2ed45b174d675d353c47b96c8d5bbec/docs/IDENTITY_PERSISTENCE_CONTRACT.md
- Version: 1e86688cc2ed45b174d675d353c47b96c8d5bbec
- Source date: 2026-09-17T03:17:08+00:00
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Pinned design / implementation evidence; acceptance separately cited
- Relationship: Do not infer default-branch integration or runtime acceptance from publication.

---

# Concord identity, persistence, and succession contract

**Status:** design contract; no runtime implementation is claimed

**Owner:** JON-15

**Contract revision:** 2026-09-17

This contract defines how a Concord governance identity survives execution
sessions without treating a process, checkpoint, storage location, or key as the
identity. It is the canonical JON-15 lifecycle/storage/reconstruction boundary.
Population issuance and counting, terminal-state effects, protected-domain
authorization, and archival publication remain with their named owners.

## 1. Invariants and terms

- A **governance identity** is the immutable registry identifier issued by the
  authoritative population registry. It persists across sessions and never
  changes owners.
- An **execution session** is a temporary process/residency attached to one
  living identity. Session concurrency is scheduling state, not population.
- A **credential or key** authenticates an actor for a bounded purpose. It can
  expire or be replaced without changing identity, and possession never creates
  or transfers identity.
- **Current state** is the latest expected-version state accepted by its
  authoritative owner. A checkpoint, cache, index, archive, or Workbench view is
  never current authority.
- A **checkpoint** is an immutable, integrity-checked reconstruction aid. It can
  accelerate recovery but cannot create an identity, reverse death, restore an
  authorization, or overrule current authoritative state.
- **Total Recall** is a living identity's non-executing residency/resource
  state. It consumes no active-execution slot but continues to occupy the same
  population slot.
- A **successor** is a separately issued governance identity with separate keys.
  Succession can copy only an authorized transfer package; it cannot continue or
  resurrect the predecessor's identity.
- **Death/terminal** is final. JON-60 defines its effects and JON-78 supplies the
  authoritative population lifecycle fact. JON-15 preserves the history and
  rejects reconstruction as that identity after the terminal fact is observed.

The signed anonymous cookie currently used by Finger is a capture-association
identifier, not a governance identity or governance credential. A Finger
`subject_key` can reference an authenticated Concord identity only after the
trusted integration boundary has established that association.

## 2. Durable state boundaries

| Boundary | Contents | Authority and mutability | Retention / recovery role |
| --- | --- | --- | --- |
| Population registry | Identity ID, class/division, creation provenance, living/terminal fact | JON-78 authority; JON-15 read-only consumer | Decides whether the identity exists and is living |
| Domain current state | Current governance/work state and expected version | Owning domain writer under JON-17 | Wins over checkpoints and derived views |
| Raw identity history | Complete attributable prompts, responses, tool/activity envelopes, decisions, and session boundaries | Append-only JON-15 identity history; corrections are linked additions | Preserved for the life of the identity and retained after terminal state under applicable records policy |
| Private autobiographical memory | Identity's private longitudinal summaries and memory artifacts | Identity-scoped protected store; derived from attributable sources | Rebuilt or invalidated when source/version checks fail |
| Private workfiles | Drafts and working artifacts not submitted to an institutional authority | Identity-scoped protected store | Mounted only for the same authorized identity |
| Checkpoints | Serialized reconstructive state plus the provenance envelope in section 4 | Immutable aid; never authoritative | Candidate starting point for verified replay |
| Transfer packages | Explicit allowlisted state, authorization, predecessor/successor IDs, and receipts | Created before predecessor death through JON-17 authorization | Readable by successor only after all gates pass; never includes identity or keys |
| Archive/publication records | Submitted or published records, corrections, disclosure metadata | JON-18 contracts; Archivist/publication stores remain separate | Historical evidence, not present authorization |
| Search/index projections | References, classifications, valid-time and visibility metadata | Rebuildable projections | Discovery only; dereference requires current authorization |
| Session state | Process ID, lease, transient context, session keys and capabilities | Ephemeral scheduler/security state | Discarded at session end; never used as identity proof |

No general-purpose JON-15 store may duplicate the population registry, a
protected domain's authoritative current state, or the Archivist's ledgers.
JON-15 stores stable references and observed versions for reconstruction and
provenance.

## 3. Lifecycle and ownership

The JON-15 lifecycle projection has four display states:

1. **Living / inactive:** registered living identity with no execution lease.
2. **Living / active:** one or more scheduler-admitted execution sessions. The
   scheduler owns concurrency limits; additional sessions do not add population.
3. **Living / Total Recall:** no active execution lease; durable identity data
   and reserved residency/resource state remain. Population occupancy is
   unchanged.
4. **Terminal:** registry reports terminal/death. No new execution or recovery
   session may be admitted for that identity. History remains attributable and
   cannot be relabeled as a successor's history.

Only JON-78 issues identity IDs and defines their population occupancy. Only the
terminal-state owner may define downstream condemnation/tombstone effects. A
JON-15 projection may lag and display that lag, but it must fail closed when the
registry is unavailable or its version cannot be validated; it must not infer
"living" from a checkpoint or prior session.

## 4. Checkpoint provenance envelope

Every checkpoint must carry, or be rejected for reconstruction without, these
fields:

- `checkpoint_id`, schema version, creation timestamp, producing service/build,
  and content digest;
- immutable `identity_id`; source execution/session ID; producer actor/service;
- population-registry observation version and observed lifecycle state;
- each authoritative source ID and expected version represented in the bytes;
- raw-history high-water mark and digest/chain reference;
- memory/workfile source references and their classification/visibility;
- policy/AGT generation used during creation;
- encryption domain and key **reference/version** (never private key material);
- parent checkpoint ID, migration chain, and recovery/import provenance;
- included and deliberately excluded state classes; and
- signature/attestation plus verification result.

Imported or migrated bytes retain both original and migration provenance. A
newer timestamp does not make a checkpoint more authoritative. A checkpoint is
eligible only when its identity matches, its integrity and provenance validate,
and none of its represented versions is ahead of or incompatible with the
authoritative sources.

## 5. Reconstruction order

Reconstruction is fail-closed and ordered:

1. Establish compatible JON-17 gateway/policy generations and authenticate the
   recovery service; do not restore a subject's old session key or capability.
2. Read the identity from the JON-78 registry. Reject missing, mismatched, or
   terminal identities. Registry unavailability pauses reconstruction.
3. Read current authorization and current expected-version state from every
   affected authoritative domain. Historical access does not satisfy this step.
4. Open only storage roots bound to the same immutable identity and authorized
   security domain. Verify ownership, labels, manifests, and integrity chains.
5. Select the newest *eligible* checkpoint by verified history position, not by
   wall-clock timestamp alone. Quarantine invalid candidates and preserve their
   failure evidence through the proper protected record interface.
6. Load the checkpoint as a candidate, then replay attributable raw history
   after its high-water mark. Derived autobiographical memory is regenerated
   when its inputs or algorithm version differ.
7. Reconcile every reconstructed field against current authoritative versions.
   Authoritative current state wins; conflicts are recorded, never silently
   resolved in favor of the checkpoint.
8. Re-check lifecycle and authorization immediately before admission. Issue a
   fresh execution lease, fresh session keys, and bounded capabilities.
9. Append a reconstruction receipt containing selected/rejected checkpoint IDs,
   source versions, replay range, reconciliation outcomes, policy generation,
   and the admitted session ID.

If terminal state arrives during this sequence, admission stops. Any handling
of an already lawfully admitted cross-domain operation follows JON-17/JON-35;
reconstruction itself grants no exception.

## 6. Identity-to-storage isolation

Protected storage is addressed by `(security_domain, identity_id, data_class)`,
not by display name, process ID, current key, or filesystem path supplied by a
client. On Linux, each identity's private memory and workfiles use a distinct
UID/process boundary and distinct encryption/key scope where host isolation is
available. Shared service accounts may mediate access but must not create a
shared readable namespace.

The JON-17 gateway authorizes every mount/read/write against the authenticated
identity, data class, purpose, and current policy generation. Backups preserve
the same domain and identity separation. If required host isolation is not
available, private stores remain sealed and the Workbench reports
`isolation_unavailable`; the system must not silently downgrade to shared
storage.

Raw interaction envelopes identify the governance identity, execution session,
actor/source, timestamps, and sequence. Sensitive payloads may be separately
encrypted or access-restricted, but redaction, correction, or lawful retention
actions must leave attributable receipts so "complete history" does not become
an unaudited mutable transcript.

## 7. Authorized successor transfer

Transfer is a two-identity protocol completed while the predecessor is living:

1. The separately issued successor identity and its independent credentials are
   resolved through their authoritative owners.
2. An authorized actor creates a transfer authorization naming predecessor,
   successor, purpose, allowlisted data classes/items, exclusions, expiry,
   one-use/replay rules, and controlling authority reference.
3. JON-17 evaluates current authorization for both sides and seals a manifest of
   exact object IDs, source versions, digests, and classifications. Identity
   records, private keys, active capabilities, execution leases, and
   non-transferable private memory are always excluded.
4. Immediately before commit, the protocol revalidates both identities,
   expected versions, expiry, policy generation, and the predecessor's living
   state. Failure leaves no partially readable package.
5. Domain writers atomically publish the sealed package and append matching
   predecessor/successor receipts. The successor imports copied state with
   `transferred_from` provenance; ownership and attribution of the originals do
   not change.
6. Redemption issues authorization for the successor's current identity and
   keys. It never accepts predecessor credentials and never renames predecessor
   history.

Death before commit cancels an incomplete transfer. Death after a completed
transfer does not revoke the successor's already transferred copy unless the
transfer contract or controlling authority independently requires that result.
No post-death checkpoint, archive record, key, or administrator action can
complete a transfer or recreate the predecessor identity.

## 8. History, archive, and search semantics

Every historical item is classified as exactly one knowledge relation, with
source references:

- `known_at_time`: attributable information available to the identity by the
  item's `valid_at`/observation time;
- `private_longitudinal`: identity-isolated autobiographical memory derived over
  time, with visibility and derivation provenance; or
- `retrospective`: information learned or derived later about an earlier event,
  carrying both event time and observation/recording time.

Indexes store `identity_id`, record/object reference, knowledge relation,
`event_time`, `observed_at`, `recorded_at`, source/provenance, classification,
security domain, and supersession links. They do not copy protected payloads or
authorization decisions into a convenience index.

Search is two-stage. Discovery returns only references/metadata visible under
the caller's current authorization. Dereference then asks the owning JON-17
domain for current access. Results expose separate fields for historical
attribution (who knew/did what then) and current authorization (who may read or
act now). Expired/revoked access does not erase exposure history; an archived or
formerly visible record does not confer current access. JON-18 controls any
public-ledger publication, correction, or disclosure representation.

## 9. Workbench lifecycle views

Workbench is a read-only projection and must show freshness/source on every
view. It must not create identities, mark terminal state, grant access, publish
records, or execute transfers.

- **Identity summary:** immutable identity ID/class/division, registry lifecycle
  and version, population occupancy, active execution count, Total Recall state,
  isolation health, current-state versions, and last refresh. Population and
  active-execution counts are visually separate.
- **Sessions and reconstruction:** session leases/status, checkpoint candidates,
  provenance/integrity status, chosen high-water mark, replay range, rejected
  candidates, reconciliation conflicts, and reconstruction receipt.
- **Memory and storage:** data-class inventory, owning domain, isolation mode,
  current mount authorization, source/high-water mark, and integrity status;
  payload previews require a separate authorized read.
- **History/search:** timeline filters for `known_at_time`,
  `private_longitudinal`, and `retrospective`; event/observation time; original
  attribution; current visibility; source and supersession links.
- **Succession:** predecessor and successor shown as distinct IDs, authorization
  status/expiry, allowlist/exclusions, expected versions, commit/redemption
  receipts, and terminal-state gate. There is no "continue as" action.

Stale, unavailable, incompatible, or unauthorized fields render explicitly as
such rather than as zero, living, empty, or permitted. Terminal identities keep
a historical view but expose no start/recover action.

## 10. Owner interfaces consumed

- **JON-78 — population registry:** consumes immutable identity lookup,
  lifecycle/living fact, registry version, and population occupancy. This
  contract does not issue identities or count population. The published JON-78
  candidate at `882dcffb31b520c6f9458984a35745c8b4bfa3b8` demonstrates the
  current `getIdentity`, `getPopulation`, and terminal-event shape; it remains a
  candidate until accepted/merged and is not silently treated as production.
- **JON-60 — terminal effects:** supplies the authoritative terminal/tombstone
  effect contract. JON-15 rejects resurrection and preserves history but does
  not invent condemnation, eligibility, or deletion effects.
- **JON-17 — protected authorization:** supplies gateways, domain-local
  authorization/writers, compatible policy generation, capabilities,
  expected-version commits, backup isolation, and recovery authorization.
- **JON-18 — records/publication:** supplies submission/publication,
  append-only correction, protected failure/disclosure, retention, and public
  search semantics. JON-15 supplies identity-history provenance to those
  interfaces and does not publish directly.

The current Finger persistence stack remains a separate behavioral-capture
store. Its immutable raw artifacts and analysis provenance are compatible source
references, but Finger capture association, purge policy, and summary links do
not become governance identity, autobiographical memory, or authorization.

## 11. Design acceptance cases

1. Ending a process and starting a new session preserves the same registry
   identity while producing a new session ID, lease, keys, and capabilities.
2. Two sessions for one identity increase active execution by two and population
   by zero; entering Total Recall reduces active execution and does not release
   population capacity.
3. A valid checkpoint that disagrees with a newer authoritative state is
   reconstructed using the newer state, with the conflict recorded.
4. A checkpoint with a bad digest, wrong identity, unverifiable source version,
   incompatible policy generation, or missing history high-water mark is
   quarantined and cannot admit execution.
5. Recovery while the registry is unavailable fails closed; cached "living"
   state is insufficient.
6. A terminal identity with intact checkpoints, history, keys, and workfiles
   cannot start or reconstruct. Its attributable historical view remains.
7. A successor cannot authenticate with predecessor keys, inherit predecessor
   history, or redeem data outside a completed allowlisted transfer.
8. An authorized pre-death transfer preserves original attribution, produces
   matching receipts, and imports only manifest-listed state under the
   successor's identity and current authorization.
9. Death before transfer commit leaves no redeemable partial package; a
   completed transfer still never makes the successor the predecessor.
10. A private-memory request from another identity, shared UID, stale
    capability, or incompatible gateway generation fails closed and is
    attributable. Lack of host isolation never falls back to a shared mount.
11. Search can show that an identity historically accessed a record without
    revealing its protected payload or implying that either the subject or
    viewer is currently authorized.
12. A later retrospective fact about an earlier event does not appear in a
    `known_at_time` reconstruction; its later observation provenance is visible.
13. An archived/public record remains historical evidence after authorization
    changes, while dereference and action paths use current authorization.
14. Workbench displays stale/unavailable authority explicitly, keeps population
    separate from concurrency, and offers no mutating authority shortcut.

## Source basis

- [JON-15](https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model), current owner instruction dated 2026-09-16.
- [JON-78](https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement), population-registry owner and published recovery candidate.
- [JON-60](https://linear.app/jons-garage/issue/JON-60/implement-tombstone-terminal-condemnation-placeholder-protocol), terminal-state effects owner.
- [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores), protected-domain authorization owner.
- [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model), records/publication owner.
- Repository source at baseline `40f647e5b8d23307f713fc3a3753a1d3a46611cb`, including Finger identity, immutable capture persistence, and project source-precedence records.

