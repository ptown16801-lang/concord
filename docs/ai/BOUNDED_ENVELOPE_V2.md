# Bounded context envelope

This developer utility validates and hashes an exact, immutable set of supplied
context and dependency references. It does not fetch missing evidence, authenticate
source truth or grant execution authority. This split preserves the provider-neutral
v2 core from commit `bc00c16e4dffeb70f1814b19aa7fd8de8d6dc70e` without changing its
implementation. No provider adapter, credential, network transport, dispatcher or
automatic invocation is included.

The source version has recorded acceptance for bounded offline scope. This extracted
core and adapted test suite remain a separate integration candidate until reviewed
and merged. That earlier scope does not establish production operation, live-provider
qualification or independent acceptance of this split. No decision change is made.

## What is checked

Import the utility from `src/ai/bounded-envelope.js`. It uses only Node's built-in
`node:crypto` module. Concord's existing Node.js requirement is at least 22.5.

The exported version constants are:

| Constant | Value |
| --- | --- |
| `BOUNDED_ENVELOPE_SCHEMA_VERSION` | `2.0.0` |
| `CANONICALIZATION_VERSION` | `concord-json-c14n-v2` |
| `BOUNDED_CONTEXT_POLICY_VERSION` | `JON-200/2026-09-30` |

The policy identifier versions this validator implementation; it does not adopt a
governing decision or require access to a private task system.

Each `included_context` entry has a unique `artifact_id`, a `path` or `identifier`,
the actual UTF-8 `content`, and its `content_hash`. The accepted forms are
`sha256:<64 lowercase hex>` of those UTF-8 bytes or `git-blob:<40 lowercase hex>`
of Git's length-prefixed UTF-8 blob. A bounded slice carries its own hash, not the
whole file's hash. Neither local paths nor remote identifiers are resolved by the
core; they are labels for the supplied content.

Each material dependency names supplied artifact IDs in a nonempty
`evidence_artifact_ids` list and states `why_material`. A dependency marked
`unresolved` rejects sealing. Artifact and dependency identities must be unique.
Construction also requires a task deliverable, nonempty contribution lineage,
prohibited actions, requested output, explicit provider/model/version labels,
initiator, timestamp, and the expected validator version. These labels are caller
assertions; accepting their structure does not authenticate them.

The data-handling declaration must state classification, sanitization and retention,
and affirm credential and authoritative-state exclusions. A narrow field-name scan
rejects obvious secret-bearing keys. It is not a comprehensive secret detector for
arbitrary text, and it does not verify those declarations.

`considered_material_omissions` may be absent or empty. Each supplied omission must
have a unique identifier and a nonempty rationale. Construction and fresh validation
reject malformed or unjustified entries. This does not require a list of unrelated
context, and structural validity cannot establish that all semantically necessary
context was selected.

## Immutable JSON and canonical bytes

Inputs must be ordinary finite JSON data. Getters, functions, undefined values,
cycles, sparse arrays, hidden properties and exotic objects are rejected instead
of being executed or silently dropped. `immutableJsonSnapshot` copies accepted
data and deeply freezes the result.

`canonicalSerialize` sorts object keys and preserves array order for generic
artifacts. The private envelope serializer additionally normalizes only the
explicit schema set paths: context, dependencies, considered omissions, constraint
action lists, contribution lists and their tool permissions, and dependency evidence
IDs. Its comparison is locale-independent and its paths use unambiguous segments.
Other arrays, including ordered steps and extension arrays, remain order-sensitive.
This is the utility's versioned JSON profile, not a claim of RFC 8785 compliance.

`sealEnvelope` returns deeply frozen payload, canonical bytes, SHA-256 hash and a
validation record bound to that exact hash and the three versions. The derived
`context_complete` result means these structural checks passed. A caller cannot
supply a bare completeness assertion to bypass them.

`assertInvocationReady` is retained as the existing API name. It performs no
invocation: it snapshots the input, recomputes the canonical bytes and hash, runs
fresh payload validation and checks strict validity/completeness flags, empty errors
and matching versions. It returns a frozen validated snapshot. Calling it does not
authorize another program to send or execute the data.

## Missing context, revision and candidate records

`validateMissingContextRequest` checks six nonempty fields: `kind`, `identifier`,
`why_material`, `needed_for`, `minimum_scope`, and `expected_form`. It returns
validation results and performs no fetching or scope expansion.

`reviseEnvelope` requires a new envelope ID and timestamp. It accepts optional
provider labels, additional bounded context and dependency updates. Unknown fields,
malformed arrays and duplicate dependency updates reject. The revised envelope
records `revision_of`, validates the resulting evidence and receives a new hash;
the prior envelope remains unchanged. Any external binding must be evaluated
against the new hash by its separately authorized caller.

`createCandidateArtifactRecord` requires output/input SHA-256 hashes, producer
identity labels, repository/commit provenance and nonempty contribution lineage.
Its authority always remains `candidate_only`, including when a caller supplies
an `adopted` disposition. The helper neither authenticates the asserted lineage nor
creates approval, governance authority, publication or deployment.

## Compatibility and verification

Version 1 manifests containing only paths and hashes deliberately fail v2 validation.
Preserve their original bytes and hashes; construct and review a new version rather
than relabeling the old one. The historical PR44 and PR45 sources contain the same
v1 core/test bytes; PR45 additionally freezes a task-specific packet. They are not
prerequisites for this standalone three-file split. The packet and provider-specific
adapter are excluded, and their historical tests remain preserved separately.

Run the core syntax check and focused tests from the repository root:

```sh
node --check src/ai/bounded-envelope.js
node --check test/bounded-envelope.test.js
node --test test/bounded-envelope.test.js
```

The adapted suite contains 27 tests: 17 source tests retain their assertions with
synthetic fixture labels, and 10 adapter-coupled tests now exercise the core exports
or a local counter-only mock consumer directly. Three adapter-only tests for retry
and qualification routing are outside this split. No transport or substitute
provider is introduced. The separate source/test ledger accounts for all 30 original
tests and every core change relative to the public v1 source.

This documentation does not claim the whole repository has passed integration
checks. Run the repository's applicable syntax and test checks again when this
candidate is applied to its actual destination branch. Publication and inclusion
in the default branch must be verified separately.
