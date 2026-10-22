# Decision maintenance workflow

## Authority and integration identity

The canonical register is `ptown16801-lang/concord`, `Develo`, `/DECISIONS.md`.
The published register and candidate changes have distinct revisions. Each entry
retains its own acceptance and implementation limits. Historical records and
source snapshots preserve provenance; `CURRENT_DECISIONS.md` is generated
navigation. A later explicit owner correction still controls. Identify and
reconcile relevant corrections before dependent work; an older register cannot
cancel owner intent.

Use the actual current default revision as the integration baseline. The old
September 2026 reconciliation base and writer assignments are historical, not
standing ownership of future changes. Keep unrelated runtime candidates separate
unless their exact scope and integration are authorized.

## Before consequential work

1. Identify the real checkout, remotes, branch, HEAD and designated canonical revision.
   Inspect `git status --short --branch`, `git worktree list`, relevant local-only
   branches/untracked documents and `git log --left-right` against the canonical ref.
2. Refresh remote evidence when access/authorization permit. Check relevant current
   issue comments, owner corrections and acceptance scope; do not treat a saved date,
   project summary or generated digest as evidence of a fresh remote check.
3. Read relevant accepted master entries and sources. Respect narrower pending
   acceptance, execution holds and review independence. Offline work can proceed
   within existing authority; identify cached revisions and inaccessible corrections.
4. Name one integration writer for this attempt. Separately authorized parallel
   contributors propose entry changes with their expected base and sources. They do
   not independently publish alternate masters. No extra agent/service is required.

## When a decision changes

Decision-record maintenance is owner-controlled. This workflow grants no standing
authority to draft or edit governing instructions or decision records. Follow the
current bounded task; otherwise report outcomes and proposed corrections for the
owner without adopting them.

An authorized record change identifies precise operative text, status, scope,
acceptance source/date (or explicit unavailability), rationale, superseded IDs,
and distinct implementation and verification states.
A proposal remains Proposed until actual acceptance. Use Unresolved for a narrow
unknown; ordinary delegated engineering choices need no invented owner gate.
Do not add entries for routine implementation details. An unchanged decision gets
`Decision impact: No decision change` in the task/PR disposition.

New decisions use the next unused CON number; never recycle IDs. Existing ECON, DEC
and subsystem IDs retain their identities and namespaces, including recovered
CONCORD-WF-### records. Apply any owner-reserved consultation and acceptance
requirements, including CONCORD-WF-002, through the route authorized for the
current task. A historical instruction does not override a later prohibition or
authorize private-account access or communication. Outside contributors can
submit a public proposal without a private task-tracker account; the owner
resolves reserved coordination and acceptance dependencies.

Source records go in `sources.json`: public location or an honest private-original
notice, exact revision/date, classification, scope, relationship and snapshot
digest. Keep private originals outside the public repository. A sanitized
snapshot has its own digest; retain separate original provenance instead of
claiming changed bytes are the original. A missing original date is
`Unavailable: <reason>`, not retrieval or file-modification time. Do not import
conversations, account/session records or private reasoning into public evidence.

Supersession is directed from the replacement entry to the replaced entry. Preserve
replaced wording under Superseded and explain partial replacement/scope explicitly.
A rejected proposal may be retained as superseded history without implying it was
previously accepted. Supporting source snapshots are frozen evidence, never another
manually maintained policy summary.

## Before committing or integrating

Inspect all local changes, choose explicit full expected revisions and run:

```sh
npm run decisions:generate
npm run decisions:check
npm run decisions:test
npm run decisions:preflight -- --expected-head <full-current-HEAD> --expected-canonical <full-origin-Develo>
git diff --check
```

Preflight checks exact HEAD, cached canonical ref and live `ls-remote` revision,
then displays other edits/worktrees. If network is unavailable, pass `--offline` and
report the cached-ref limitation. It does not fetch, write, lock other writers, prove
owner acceptance or guarantee the remote will not change a moment later. A changed
expected revision is a reason to inspect/reconcile, not merely replace the argument.
Review overlapping **meaning**, source precedence, statuses and scope as well as Git
conflicts. Record that review in the receipt. Stage only owned paths explicitly.

During integration, compare the candidate’s expected Develo base with live Develo,
reconcile any concurrent corrections, rerun the focused checks on the resulting tree,
and obtain whatever review/merge authority applies. The author’s checks are not
qualifying independent review. A proposed JON-163 detailed rule is not silently
activated by this workflow; the agreed independence framework remains applicable.

## Derived summaries and handoffs

`npm run decisions:generate` writes CURRENT_DECISIONS.md deterministically from the
exact master bytes. Its SHA-256 identifies content, not a Git commit. The source
containing commit is separately resolvable with:

```sh
git log -1 --format=%H -- DECISIONS.md
```

This avoids a self-referential hash/commit scheme. A generated summary carries a
coverage date; it cannot prove no new decision exists elsewhere. New handoffs should
link the master, its digest and known source commit, describe their bounded coverage,
and include the synchronization receipt below. Preserve historical ZIPs as issued;
annotate staleness in the source/reconciliation register rather than silently replacing
their contents. Do not manually maintain a competing CURRENT_PROJECT_STATE policy.

## Completion / synchronization receipt

Report these separately:

- Decision impact: Updated IDs, or No decision change.
- Local branch, base and commit/revision (or explicitly uncommitted).
- Saved locally and checked/tested: each with its actual scope and evidence.
- Committed, pushed, reviewed, integrated/merged and deployed: each with its actual
  state and evidence, or explicitly not performed or unknown.
- Pending semantic conflict, owner question, inaccessible source or publication step.

Follow the [checks and delivery guidance](../../AGENTS.md#checks-and-delivery) for
completion reporting and pending commits. Complete an already-authorized commit
after the required checks. If it remains pending, name the reason and exact next
action; if owner input is needed, identify the precise decision and its source.

Saved is not committed; committed is not pushed; pushed is not reviewed; merged is
not policy acceptance, runtime verification or deployment. A handoff request is not
a received review. Do not say ongoing enforcement is active because instructions or
CI edits were written. Attach check and review evidence for the exact candidate;
older receipts do not verify its current state.

## Automated checks and limits

The dependency-free Node validator checks entry IDs/statuses/fields, referenced source
records and immutable snapshot digests, stable anchors/local links, supersession
references/cycles and generated-summary drift. Focused tests mutate representative
inputs, including failed provenance, cycle, drift and moved-base cases. Existing CI
checks master/summary and PR disposition. The separate review-context workflow
posts navigation links; it does not perform a provider review or adopt a decision.
The PR template makes decision impact explicit. CI presence alone does not
establish branch protection or permission to change repository settings.

Checks do not establish semantic completeness, actual owner acceptance, truth of a
source, reviewer independence or absence of a later offline correction. External links
are recorded but not network-validated in ordinary checks. Historical source links
may be redacted or marked unavailable in a public derivative, with originals
preserved privately. Humans must review these limits. Required owner decisions cannot be satisfied with fabricated
URLs/dates, a passing check or a placeholder “approval.”
