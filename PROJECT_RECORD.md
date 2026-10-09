# Concord project record

The owner's October 8 routing instruction records **Concord → The Form → Moltbook integration**.
This supersedes the earlier peer-project organization while preserving separate source
and data ownership. Vote remains a folder name only.
The designated consolidated master is [DECISIONS.md](DECISIONS.md) in
`ptown16801-lang/concord` on `Develo`. The original consolidation was merged through
PR41 at `441f13536f57f7c3c294f0d42c6567ccf8baf7ae` on September 24, 2026.
This combined runtime and correction branch remains a review candidate.

The September 16 record formerly at this path is preserved byte-for-byte in
[history](docs/decisions/history/PROJECT_RECORD_at_29ca0b4.md). Its Vote hierarchy
and dated status claims are historical, not current authority. The workflow-partition
branch `881ce1e` recorded the earlier peer-project organization; the October 8 owner
correction now controls. Historical source bytes remain preserved.

Later explicit owner decisions control policy; exact source/tests establish
implementation facts for their tested revision. A code/CI result does not adopt a
proposal. Linear retains approval/discussion and work status. Historical files,
archives and handoffs retain provenance; generated summaries do not define policy.

Use [maintenance instructions](docs/decisions/WORKFLOW.md),
[source register](docs/decisions/SOURCES.md),
[reconciliation](docs/decisions/RECONCILIATION.md) and
[synchronization receipt](docs/decisions/RECEIPT.md).
`CHANGELOG.md` remains the implementation change log.

## Runtime integration and preserved references

This candidate extends PR42 `89375cc8` with current Develo `4b6e41fd`, including the final PR41 delta `6676c9f`. It preserves JON-141 runtime inputs at `6cf4eab` and adds the bounded JON-132 audit-conflict repair. PR41's documentation merge does not accept or deploy this runtime candidate. See the [current repair receipt](docs/decisions/REPAIR_20261009.md), the [historical reconciliation](docs/decisions/PR37_PR41_RECONCILIATION.md), and [integration provenance](docs/INTEGRATION_RECONCILIATION.md).

The original September 16 project record is also preserved at [its original historical path](docs/history/PROJECT_RECORD_2026-09-16.md), and the unchanged [Finger beta technical reference](docs/reference/FINGER_BETA_2026-09-16.md) remains available. Historical dispatch statements do not override current owner authorization or holds.
Later local PROJECT_RECORD sections 9–10 at `4a44f4f` contain the CONCORD-WF-001
role-workflow proposal and accepted CONCORD-WF-002 consultation instruction. They
are preserved in [the continuation source](docs/decisions/evidence/LOCAL-WORKFLOW-CONTINUATION.md)
and reconciled in the master under CON-071 and the original CONCORD-WF-002 ID.
The other thread's `docs/ai-workflow/` package remains at its original local commits;
this routing file does not discard or claim integration of that package.
