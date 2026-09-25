# Concord governance recovery — initial research brief

Date: 2026-09-23. Status: research proposal, not an implementation or acceptance report.

## Baseline and evidence

Local repository: `/home/cornholio/projects/concord`, clean at inspection, commit
`b332c2309e123bd05099d4f9fcfd3bd202bdb0fa`. Inspected
`src/governance/sandbox/runtime.js`, `docs/GOVERNANCE_SANDBOX.md`, and the September
23 governance audit. GitHub's commit lookup returned “No commit found”; this is
consistent with Linear's current candidate record saying the commit is not pushed.
That was the initial research-time observation. Publication-time update: the
candidate is now available in [PR #34](https://github.com/ptown16801-lang/concord/pull/34)
at [the same commit](https://github.com/ptown16801-lang/concord/commit/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa),
as confirmed by the updated JON-138 record. The governance implementation is not
yet merged into the default branch; source paths in this brief refer to that
candidate, not the documentation PR's base.

Live Linear records consulted:

- [JON-138](https://linear.app/jons-garage/issue/JON-138): local sandbox and advisory discussion; broader remote collector and recovery work remains open.
- [JON-135](https://linear.app/jons-garage/issue/JON-135): current candidate matches the local SHA; independent acceptance is pending. Its newest candidate section supersedes historical candidate sections below it.

Reported 65-test results belong to those existing records. This research did not
rerun them or independently accept the candidate. GitHub and Linear were used
read-only; Scite located the transaction-commit literature. No deployment, paid
paper purchase, external message, or model-training workload was initiated.

## Established constraints

Approval persists the exact request, authority/policy evidence and reservation.
Approved operations cannot be canceled or expire; later revocation governs new
admissions. Collector outage pauses approved work. Recovery must preserve approval
and avoid duplicate effects. The local domain transaction is authoritative for the
mutation and its outcome; public Archivist publication is a separate responsibility.

Code inspection confirms the local sequence: reconcile retained audit history;
record execution intent; hold the local collector transaction while committing the
domain mutation, operation status, outcome audit and reservation release; retry
outcome delivery. The collector and domain still have separate commits. This is
not a distributed atomic transaction.

## First finding: remote readiness is not commit-time availability

Consider this conceptual schedule, not a reproduced implementation defect:

1. The remote collector durably stores intent and replies.
2. The writer receives the reply.
3. The collector becomes unreachable.
4. The writer commits its local mutation.

A health check or signed acknowledgement cannot rule out step 3. An acknowledgement
can establish historical durable receipt under stated storage assumptions; it cannot
prove continuing availability. Adding another check merely moves the race.

Therefore a remote replacement for `whileAvailable` needs a precise contract for
the execution boundary. This brief does not reinterpret the existing outage rule.
Implementation must not quietly substitute “acknowledged earlier” for “available.”

## What the primary sources establish

AWS's transactional-outbox guidance places the mutation and outgoing event in one
database transaction and requires duplicate-safe consumption. This supports keeping
Concord's domain outcome atomic with its outbox. It does not provide atomicity with
a separate collector. [AWS guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html).

Gray and Lamport's abstract explains that conventional two-phase commit can block
on coordinator failure and that Paxos Commit adds fault-tolerant coordination.
This motivates comparing coordination designs, not claiming an implementation is
nonblocking under arbitrary faults. Scite identified DOI 10.1145/1132863.1132867;
the open preprint abstract was consulted, not the full paper.
[Open preprint](https://arxiv.org/abs/cs/0408036).

etcd's documented guarantees distinguish durable completed operations from a
client's uncertainty after a timeout. Watch notifications are not linearizable and
may be delayed. Consequently, neither a timed-out write nor a delayed watch proves
absence of an effect. These guarantees apply within etcd, not automatically to a
separate SQLite database. [etcd guarantees](https://etcd.io/docs/v3.6/learning/api_guarantees/).

## Protocol options to evaluate

| Option | Benefit | Unresolved boundary |
| --- | --- | --- |
| Domain outbox plus durable remote intent receipt | Small extension; duplicate-safe outcome delivery | Leaves the acknowledgement-to-mutation outage window; not established as satisfying the owner's rule |
| One atomic authoritative store for mutation and required audit evidence | Removes the dual-write window within that store | Changes trust/storage ownership; an independent remote collector still needs its own contract |
| Distributed commit with durable participant state | Coordinates the decision across writer and collector | Recovery complexity and blocking; protocol abort must never cancel the underlying approved operation |

Recommendation for the research phase: preserve the existing implementation and
compare these models before choosing infrastructure. Do not select etcd, a queue,
or a cloud provider simply because it supplies one relevant primitive.

## Proposed protocol-independent requirements

- Stable domain/operation/request-digest identity across retries; reject identical
  IDs carrying different payloads. Distinguish business approval from execution attempts.
- A committed domain outcome must never be re-executed because its acknowledgement
  was lost. Query authoritative state and redeliver the same receipt.
- Restored collector state must be reconciled against retained evidence. A cursor
  alone is insufficient when an older backup may have lost acknowledged receipts.
- Investigate collector incarnation IDs and verified history checkpoints. An epoch
  is only useful if restore cannot silently roll it back with the data.
- Multiple workers require commit-time exclusion or fencing enforced by the writer.
  Expiry of a worker lease must not expire the approved operation or its reservation.
- Signed receipts establish issuer/content integrity, not proof that storage still
  retains the content. Backup recovery and privileged tampering need separate evidence.
- Liveness claims must name assumptions: eventual service/network recovery, retained
  authoritative state, fair retry scheduling, and valid reservations. Permanent loss
  cannot be repaired by a retry protocol alone.

## Proposed acceptance matrix — not yet executed

| Injected condition | Required observation |
| --- | --- |
| Collector unreachable before intent receipt | Pending approval and reservation intact; zero mutations |
| Collector stores intent but reply is lost | Retry same identity; no conflicting receipt or duplicate effect |
| Collector fails after reply, before domain commit | Explicit outcome under the chosen availability contract; no unreviewed weakening |
| Writer dies before domain commit | Recover pending; later completion changes the record once |
| Writer dies after commit, before receipt delivery | Recover committed; redeliver only; record version unchanged |
| Two workers resume the same operation | One domain effect; identical returned committed result |
| Old worker resumes after replacement | Commit-time fencing/exclusion rejects stale execution |
| Collector restored from empty or older snapshot | Reconstruct missing history or pause; never trust stale delivery markers |
| Duplicate receipt ID with different digest | Reject and surface conflict without overwriting evidence |
| Revocation, policy upgrade or expiry after approval | Original approved scope remains; no cancellation or scope expansion |
| Domain restored behind collector | Quarantine inconsistency; no blind replay based on intent alone |
| Network partition persists | Pending work remains visible; no false completion or bounded-time guarantee |

Each experiment should record fixed code/configuration identifiers, fault schedule,
operation/request digest, before/after versions, reservation state, and both evidence
histories. An independent reviewer must validate results separately from the producer.

## Next bounded experiment

Build a small deterministic state-machine model of the readiness race and the three
candidate protocols, with dropped/duplicated/reordered messages and process restart.
Check safety (no lost approval, no duplicate effect, truthful outcome) separately
from conditional liveness. Then use two actual processes and separate durable stores
to test the selected protocol's crash points. A model result is not network or disk
durability proof.

Research placement remains under Concord/JON-138; writer evidence relates to
JON-132, integration to JON-133, isolation to JON-134, and later independent acceptance
to JON-135. These are proposed mappings, not new assignments or status changes.

Before implementing a remote execution gate, resolve what event satisfies collector
availability at the protected mutation boundary, which stores may share trust, and
how independently restored domain/collector histories establish recovery authority.
These questions do not prevent continued research or modeling.
