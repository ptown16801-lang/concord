# Decision maintenance workflow

## Authority and integration identity

The designated master is `ptown16801-lang/concord`, `Develo`, `/DECISIONS.md`.
The current documentation branch is a candidate until reviewed and integrated.
Linear preserves actual owner decisions, discussions, dependencies and work status;
the master consolidates their operative effect. Historical interviews, specs, source
snapshots and handoffs are evidence. CURRENT_DECISIONS.md is generated navigation.
An unincorporated later explicit owner correction still controls: identify it, record
it and reconcile it before dependent work; a stale master cannot cancel owner intent.

This task’s integration base is Develo `29ca0b44cf8d911df6978e84c7a91e7777afd304`.
This avoids importing unaccepted runtime branches. JON-141 has a separate existing
runtime integrator. Do not rewrite that branch or assume its candidate is integrated.
The documentation candidate can be reviewed independently; if the runtime aggregate
lands first, reconcile documentation, package scripts and CI against the new Develo.

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

Update the stable entry before task completion. Record precise operative text, status,
scope, acceptance source/date (or explicit unavailability), rationale/alternatives,
superseded IDs, related issue/review and distinct implementation/verification state.
A proposal remains Proposed until actual acceptance. Use Unresolved for a narrow
unknown; ordinary delegated engineering choices need no invented owner gate.
Do not add entries for routine implementation details. An unchanged decision gets
`Decision impact: No decision change` in the task/PR disposition.

New decisions use the next unused CON number; never recycle IDs. Existing ECON, DEC
and subsystem IDs retain their identities and namespaces. Source records go in
`sources.json`: exact URL/path, revision/date, classification, scope, relationship and
snapshot digest. A missing original date is `Unavailable: <reason>`, not retrieval
or file-modification time. Do not import full unrelated conversations or private
reasoning. Save only relevant user-visible excerpts with line/date provenance.

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
- Committed, pushed, reviewed and integrated: each with its actual state/evidence.
- Pending semantic conflict, owner question, inaccessible source or publication step.

Saved is not committed; committed is not pushed; pushed is not reviewed; merged is
not policy acceptance, runtime verification or deployment. A handoff request is not
a received review. Do not say ongoing enforcement is active because instructions or
CI edits were written. This candidate has only locally exercised controls.

## Automated checks and limits

The dependency-free Node validator checks entry IDs/statuses/fields, referenced source
records and immutable snapshot digests, stable anchors/local links, supersession
references/cycles and generated-summary drift. Focused tests mutate representative
inputs, including failed provenance, cycle, drift and moved-base cases. Existing CI
checks master/summary and PR disposition; no recurring job, bot, hook or service is
activated. The PR template makes decision impact mandatory in the documented review
process. CI presence is not repository branch protection; no settings were changed.

Checks do not establish semantic completeness, actual owner acceptance, truth of a
source, reviewer independence or absence of a later offline correction. External links
are recorded but not network-validated in ordinary checks. Historical source links
remain as issued even when a snapshot references an unavailable file. Humans must
review these limits. Required owner decisions cannot be satisfied with fabricated
URLs/dates, a passing check or a placeholder “approval.”
