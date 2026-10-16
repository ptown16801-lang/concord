# Concord workflow reconciliation audit — 2026-10-16

## Verdict

**REJECT — Concord's current workflow state is not reliable enough to infer that
work is reviewed, canonically integrated, complete, or deployed from a single issue,
branch, pull request, or project status.**

The repository history remains recoverable. This audit found no evidence that Git
objects are corrupted. The immediate risks are workflow drift, ambiguous integration
targets, stale authority records, uncommitted and local-only work, missing review
decisions, and Linear states that do not consistently describe Git delivery.

This is a full **current-state reconciliation audit** of the Concord project as
observed on 2026-10-16. It is not a claim that every historical transition can be
reconstructed. The Linear tools exposed current fields, relations, comments and
attachments, but no complete status-transition audit log. Local remote-tracking refs
were not fetched during the local inventory. Live GitHub reads separately verified
the current <code>Develo</code> SHA and pull-request state.

**Decision impact: No decision change.** The corrective workflow below applies
existing owner instructions, CON-070, CON-074, CONTRIBUTING.md and
docs/decisions/WORKFLOW.md. It does not adopt a new Concord policy.

## Scope and evidence

The audit reconciled:

- all 114 issues currently returned for the Concord Linear project, including
  archived records;
- all 50 visible GitHub pull requests for the Concord repository;
- live GitHub repository, default-branch, pull-request and ruleset metadata;
- all registered local worktrees and local branches;
- dirty state, tracking relationships and commits absent from cached
  <code>origin/*</code> refs;
- current project guidance, accepted decision entries, contribution rules, the
  pull-request template and CI workflow;
- current project summary, project updates, issue comments, relations, native PR
  links and review threads; and
- current owner corrections through the 2026-10-13 DeepSeek disablement.

Detailed private Linear and local-machine inventories were intentionally excluded
from this public repository. Delivery of the exact private reconciliation through
the verified Jon's Garage Linear workspace remains pending until a successful write
and readback. Public pull-request facts are retained in
[the GitHub inventory](CONCORD_WORKFLOW_AUDIT_GITHUB_2026-10-16.csv).
Protected local-only rollback evidence was excluded from every durable audit artifact.

The live-source snapshot cutoff is 2026-10-16T03:10:01-04:00. GitHub identified
<code>ptown16801-lang/concord</code> as a public repository, live
<code>Develo</code> as
<code>4b6e41fd8d211746a81e870955e34475e66d02a3</code>, and active ruleset
<code>23790153</code> as “Protect Develo.” The public GitHub inventory contains 50
data rows and has SHA-256
<code>25b99e95e672f54877f7a084e51f2c1bbd09360eb76d89806090ba893ba4c149</code>.
State can change after this cutoff.

## What the normal workflow requires

Concord's own workflow is compatible with the ordinary branch-and-pull-request model:

1. Start with one bounded Linear issue and explicit acceptance checks.
2. Verify the real checkout, live canonical base, dirty state, worktrees, current
   owner corrections and integration ownership.
3. Create one focused branch and isolated worktree from current
   <code>Develo</code>.
4. Implement only the authorized scope and run the applicable checks.
5. Commit focused files, push the same-named branch and open one linked pull request.
6. Record exactly one decision-impact disposition and a completion receipt.
7. Obtain qualifying independent review against the exact head revision.
8. Merge into <code>Develo</code> only with the required authority and checks.
9. Update Linear with the exact commit, PR, review, merge target and remaining
   limits; read the saved record back.
10. Mark the bounded deliverable Done only when its own completion definition is
    satisfied. Record deployment separately as performed, not performed, or not
    applicable.

[GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
defines the same branch, commit, pull-request, review and merge progression.
[GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
can require pull requests, approvals and passing status checks.
[Linear's GitHub integration](https://linear.app/docs/github-integration) supports
issue links and branch-specific status automation, while
[Linear issue workflows](https://linear.app/docs/configuring-workflows) distinguish
backlog, unstarted, started, completed and canceled lifecycle categories.

For Concord, a merge into an intermediate branch is an integration step. It is not a
canonical merge. A producer test is evidence. It is not independent acceptance.
A Linear comment is evidence. It is not a submitted GitHub review decision. A local
file is saved. It is not necessarily committed, pushed, reviewed, merged or deployed.

## Rule-effective epochs

Findings were evaluated against the rule that existed when the work occurred. Later
rules were not applied retroactively:

| Effective period | Controlling change | Audit treatment |
| --- | --- | --- |
| Before 2026-09-18 | Recovery and stacked feature-branch work | Preserve historical topology; do not call later PR-template omissions historical violations. |
| 2026-09-18 through 2026-09-21 | Linear-native migration and GitHub protection setup | Expect native issue/PR reconciliation and truthful active state. |
| From 2026-09-24 | CON-070, CON-074, one master, contribution and semantic-overlap rules | Require qualifying independence, one integration writer, canonical identity and exact decision disposition for current candidates. |
| From 2026-09-26 | Four-role local workflow | Separate planner, local implementer, non-authoring verifier and bounded external evidence review. |
| From 2026-09-30 | Completion receipt and required Linear delivery | Report saved, checked, committed, pushed, reviewed, merged and deployed separately; deliver and read back completed evidence. |
| From 2026-10-08 | Explicit Jon's Garage routing | Use and verify the designated Linear connection and destination. |
| From 2026-10-13 | DeepSeek route disabled | Do not dispatch, retry or present DeepSeek work as an active executable lane. |

Old pull requests that remain active must satisfy today's readiness rules before they
can be reviewed or merged, even when opening them originally predated those rules.

## Current inventory

### Linear

| State | Count |
| --- | ---: |
| In Progress | 20 |
| In Review | 14 |
| Todo | 3 |
| Backlog | 24 |
| Done | 48 |
| Canceled | 5 |
| **Total** | **114** |

There are 37 active or Todo issues. Thirty-one have no issue-comment activity in more
than 14 days, and five have no comments. Seven In Progress local-model/S26 issues are
unassigned. None of the 37 active issues belongs to a cycle. All 114 lack estimates
and due dates. Those planning fields are optional for a personal project, but the
current project has no other dependable work-in-progress limit or cadence.

### GitHub

| State | Count |
| --- | ---: |
| Open draft | 34 |
| Open non-draft | 2 |
| Merged | 7 |
| Closed without merge | 7 |
| **Total** | **50** |

Of the 36 open pull requests:

- 16 target <code>Develo</code>;
- 1 targets <code>codex/jon-141-conflict-integration</code>;
- 1 targets a delivery branch; and
- 18 target the legacy Finger feature branch.

Thirty-four of the 36 open pull requests were not updated in the preceding 14 days.
Twenty-eight lack the currently required exact <code>Decision impact:</code> line.
Four have no native Linear issue link. None has a requested reviewer or a GitHub
review decision. GitHub shows no submitted review on any of the 50 pull requests;
that current fact is not used to impose post-September review rules retroactively.

Only PRs 17, 41 and 43 merged directly into <code>Develo</code>. Four other merged
pull requests landed in intermediate or legacy branches. PR2 and PR4 later became
ancestors of <code>Develo</code> through subsequent branch integration; PR29 remains
merged only into PR25's still-open feature branch, and PR42 remains merged only into
PR37's still-open integration branch. PR37 is the draft gate from that branch to
<code>Develo</code>; PR50 remains stacked on the integration branch.

### Local Git state

Before this audit created its own isolated worktree, the machine had:

- 19 registered worktrees, of which 15 existed and 4 registrations pointed to
  missing temporary paths;
- 22 local branches;
- 4 dirty worktrees;
- 34 commits absent from every cached <code>origin/*</code> ref; and
- no stashes.

The current audit worktree is an intentional twentieth registration and twenty-third
branch. It is excluded from the pre-existing failure counts.

The primary checkout had 7 modified tracked files and 595 untracked entries. Other
dirty worktrees held a detached workflow-authority change, local System Modeler work,
and a JON-215/workflow continuation. Local <code>Develo</code> had diverged from
cached <code>origin/Develo</code>. Recovery directories and nested worktrees inside
the primary checkout make broad staging unsafe.

## Findings

### F1 — Critical: the canonical authority is stale

Live and cached <code>Develo</code> is
<code>4b6e41fd8d211746a81e870955e34475e66d02a3</code>. Its README,
PROJECT_RECORD and WORKFLOW still describe the documentation as an integration
candidate and name an old integration base. CON-074 says PR41 integration remains
pending even though PR41 is contained in <code>Develo</code>. Later owner corrections
exist only in dirty or local-only candidates.

This means a compliant agent can read the designated master and still receive a
factually stale view of its own workflow state.

**Required correction:** one JON-215 integration writer must reconcile the later
owner corrections and current Git facts into a single exact candidate based on live
<code>Develo</code>. Historical wording must remain identifiable as historical.

### F2 — Critical: the primary checkout became a shared accumulation surface

The main checkout reused a feature branch after its earlier PR merged and accumulated
unrelated policy, recovery, configuration and Wolfram work. Separate dirty and
local-only work exists in other worktrees. Several candidates overlap on AGENTS.md,
README.md, PROJECT_RECORD.md, WORKFLOW.md and agent configuration.

This defeats isolated-worktree ownership even though worktrees were created: the
project has multiple writers for the same integration surfaces and no single
reviewable head containing the reconciled result.

**Required correction:** freeze edits only on overlapping dirty integration surfaces
while their ownership and deltas are reconciled, preserving unrelated authorized
work. Preserve hashes and manifests privately, then split each bounded deliverable
into a clean issue-owned branch. Do not stage the primary checkout broadly.

### F3 — Critical: review independence is not represented in the PR gate

All 36 open PRs have no requested reviewer and no GitHub review decision. Twenty-eight
have no review thread. Eight have only an unanswered automated “GROK REVIEW PACKET”
thread. Packet generation does not establish that a reviewer ran, observed the exact
revision, met CON-070 lineage rules, or submitted a verdict.

The active <code>Develo</code> ruleset requires a pull request, resolved threads and
passing Node 22/24 checks, but its required approving-review count is zero. This is
weaker than Concord's accepted independence rule.

PR41 merged to <code>Develo</code> after CON-070 took effect. Its PR body says
qualifying independent review and integration were pending; GitHub contains no
submitted review, and the same account authored and merged it. Other evidence may
exist outside GitHub, but the canonical merge record does not establish that the
accepted independence gate was satisfied.

**Required correction:** every review-ready PR needs a named, exact-revision,
non-authoring verifier record with contribution lineage and a submitted disposition.
Before increasing GitHub's required-approval count, verify that an eligible separate
GitHub reviewer identity exists; otherwise the setting would deadlock a one-account
repository without satisfying CON-070.

### F4 — Critical: “merged” does not consistently mean canonical integration

Only three of seven merged PRs landed directly in <code>Develo</code>. PR42 is the
current example: it merged into an integration branch, not the default branch. Its
result is carried by still-draft PR37. PR50 is stacked on the same intermediate base.
PR50's exact head is
<code>9e40e8665f28bf3d6a9e23e507beddf965468ad8</code>; its three-file repair
diff did not change when it was retargeted to integration base
<code>b813e15b33741b5c4ed982be6598193166124f96</code>. Live <code>Develo</code>
remains unchanged by PR42 and PR50.

The later coordinator receipts correctly distinguish this, but project summaries and
ordinary conversation can reduce the state to “merged,” which is materially
misleading.

**Required correction:** every receipt must say “merged into [exact target]” and
separately state whether the exact revision is an ancestor of live
<code>Develo</code>. PR37 remains the canonical integration gate; PR50 must be
retargeted or rebased and reverified after that base is settled.

### F5 — High: the pull-request queue is not being closed

Thirty-six PRs remain open, 34 as drafts. Half target a legacy feature branch.
PR37 says it consumed PR34, PR36 and PR38, yet those source PRs remain active.
Accepted design work, canceled work, superseded recovery work and current integration
work all appear in the same open queue.

This is not a historical-branch problem by itself. The failure is that historical
and superseded branches were never given an explicit terminal disposition, so the
queue still presents several competing paths as live.

**Required correction:** classify every open PR as exactly one of:

1. current and review-ready;
2. a documented dependent stack;
3. superseded after content-equivalence proof;
4. historical and intentionally closed; or
5. deliberately parked with a named reactivation condition.

No PR should be closed merely because it is old. Prove incorporation or preserve the
remaining delta first.

### F6 — High: Linear status and Git delivery use incompatible completion meanings

Fifteen open PRs textually reference at least one issue marked Done. Six open PRs
textually reference Backlog work. One draft references canceled JON-90. Textual
references are a heuristic relationship and do not prove native Linear linkage or
delivery. Some Done issues are valid bounded
design or review deliverables; others have implementation PRs that remain unmerged.
The same status therefore cannot tell a reader whether a design was accepted, code
was merged, or deployment occurred.

Examples include JON-85, JON-97, JON-98, JON-101 and JON-102. JON-85 is Done while
native blocking relations still point to unfinished work. Descriptions for JON-15,
JON-16, JON-17 and JON-19 still say In Review reflects pending acceptance even though
the current field is Done.

**Required correction:** keep Done scoped to the issue's bounded deliverable and add
an explicit integration owner/state:

- design, research or verification can be Done after its exact bounded acceptance
  when a separate issue owns implementation/integration;
- implementation is Done only after accepted canonical merge, unless its issue
  explicitly defines a narrower deliverable;
- deployment is always a separate fact: performed, not performed or N/A.

### F7 — High: disabled DeepSeek work still appears executable

JON-176, JON-200, JON-202 and JON-204 remain In Progress. JON-205 remains Todo and
delegated to Codex. PR44 and PR45 remain open drafts. Their text carries the October
13 disablement, but their lifecycle fields still advertise active execution.

**Required correction:** preserve the artifacts and history, remove stale delegation,
and classify the issues/PRs as canceled, parked or historical according to their
bounded deliverables. Do not delete branches, provider records or evidence.

### F8 — High: traceability is split across stale artifacts and later corrections

Four active PRs have no native Linear issue link. PR46's text and history reference
JON-215/JON-163; PR49 names JON-238 through JON-242; PR35 names JON-138. PR27 has no
verified owning issue in the audited native links or textual references.
JON-132/JON-135 later comments correctly record PR50 at
<code>9e40e8665f28bf3d6a9e23e507beddf965468ad8</code>, but the committed
JON-132 receipt still says commit/push are pending.
The automated PR50 review-packet comment still names the pre-retarget base. A
separate Daybreak technical finding exists in Linear, while PR42 and PR50 have no
requested or submitted GitHub review. Current Linear comments are newer than the
stale issue-description summaries.
PR37's live head is <code>b813e15b33741b5c4ed982be6598193166124f96</code>,
while its body still calls <code>6cf4eab</code> current and reports the earlier
192-test state. PR42's body still says merge is pending after its intermediate merge.

The later correction is valid evidence. The failure is that a reviewer must assemble
the current truth from several locations.

**Required correction:** the integration ledger must contain one row per deliverable:
issue, branch, exact commit, PR, base, checks, independent review, merge target,
canonical ancestry, Linear readback and deployment/N/A. Later corrections should
identify the stale artifact they supersede.

### F9 — High: the project dashboard overstates readiness

The latest structured project status update originated September 21 and was corrected
September 23. The project summary says PR42 was published but does not plainly state
that PR42 merged only into the integration branch and PR37 remains the
<code>Develo</code> gate. Milestone “B · Implementation baseline complete” shows
100% from a small membership set even though its associated implementation PR remains
open and blockers remain.

There is no Linear release pipeline or release record. That does not prove a missing
deployment when no deployment was authorized; it means deployment cannot be inferred
from Linear.

**Required correction:** publish a current at-risk project update with exact counts,
the PR37/PR50 stack, disabled lanes, review backlog and explicitly unverified
deployment. Rename or explain milestone B so its percentage cannot be read as
project-wide integration readiness.

### F10 — High: active ownership and dependency state is not credible

There are 37 active/Todo issues, 31 stale for more than 14 days by issue-comment
activity, and seven unassigned In Progress local-model/S26 issues. Fourteen active
issues are blocked by unfinished relations but remain In Progress or In Review.
The team has no Blocked status, so the relation and current comment must carry that
truth; many do not.

**Required correction:** review every active issue. Assign genuinely active work,
return unstarted work to Todo/Backlog, and write a current blocker/next-action comment
when status alone cannot express the state.

### F11 — High: workflow enforcement is partial

The <code>Develo</code> ruleset correctly requires a PR, thread resolution and strict
Node 22/24 checks. It does not require an approving review. CI checks the
decision-impact line only on branches where the current workflow runs; 28 still-open
legacy PRs lack the line and many target unprotected intermediate branches.

The repository therefore documents stronger behavior than GitHub enforces.

**Required correction:** first reconcile the real reviewer identity and branch model.
Then add enforcement that is supportable:

- current candidates must target <code>Develo</code> or name their integration owner;
- exactly one decision-impact line;
- native issue link or explicit N/A;
- completion receipt fields;
- required Node checks;
- exact-revision review evidence;
- no canonical merge while unresolved review findings remain.

### F12 — Medium: local branch and upstream topology is misleading

Local <code>Develo</code> is ahead of and behind cached
<code>origin/Develo</code>. The security-overseer commit survives on a local branch
whose worktree disappeared and whose upstream points to <code>origin/Develo</code>
instead of a same-named feature branch. The workflow-repair lineage has two local
branch names and an unpublished child beyond the PR revision.

**Required correction:** preserve unique commits first, then rebuild clean feature
worktrees from verified live <code>Develo</code>, use same-named upstream branches and
retire aliases only after their content and delivery state are proven.

### F13 — Medium: recovery material is mixed with ordinary source work

Recovery directories, save states, nested worktrees and generated evidence live under
the primary checkout. Their presence is not wrong; their location makes accidental
staging and public disclosure likely.

**Required correction:** classify private recovery material and generated output.
Put future generated output outside ordinary staging surfaces. Do not relocate,
delete or unregister existing recovery/worktree originals merely to make status
clean; any later archive or migration requires path-dependency checks, preservation
evidence and separate authorization. Add narrow ignore rules only after confirming
that no intended source file would be hidden.

## Root causes

The failures share five causes:

1. **Worktree creation without lifecycle closure.** Isolation existed at creation,
   but branches were reused, disappeared or remained dirty after delivery.
2. **Two sources of operational truth without a reconciled state machine.** Linear
   holds scope and acceptance; GitHub holds code delivery; comments attempt to bridge
   them, but no single ledger consistently closes each transition.
3. **Intermediate branches were treated as delivery destinations.** Stacked work can
   be valid, but the canonical merge step was often left implicit.
4. **Review evidence was recorded as prose rather than a required gate.** Packets,
   tests and comments accumulated without a uniform exact-revision review decision.
5. **Rules improved faster than active work was migrated.** New controls were added,
   but old active PRs and issues were not brought forward or explicitly retired.

## Reconciliation plan

### Phase 1 — Preserve and freeze

- Freeze edits only on the overlapping dirty integration surfaces while their exact
  ownership and deltas are reconciled. Separately authorized, non-overlapping work
  may continue from a verified clean base under its existing issue scope.
- Do not prune missing worktrees, delete branches, reset dirty trees or bulk-stage
  the primary checkout.
- Privately capture status, file manifests and hashes for each dirty worktree.
- Keep protected/local-only evidence out of public artifacts and unauthorized
  destinations.

### Phase 2 — Establish two ledgers

- Use JON-141 as the code-integration ledger.
- Use JON-215 as the workflow/configuration ledger.
- JON-164's verified owner-request contract maintains the active
  issue-to-workspace-to-run map across workspaces. Give it only a scoped coordination
  link to the JON-141/JON-215 ledgers; do not make it the primary Concord audit
  destination or duplicate their full contents.
- For every candidate, record issue → branch → commit → PR → review → exact merge
  target → canonical ancestry → deployment/N/A.

### Phase 3 — Resolve the current integration chain

1. Review and disposition PR37 against live <code>Develo</code>.
2. Resolve PR50's base after PR37's disposition.
3. Re-run checks and independent verification on the resulting exact PR50 diff.
4. Prove whether PR34, PR36 and PR38 are fully incorporated before marking them
   superseded.
5. Correct current JON-132/JON-135 receipts without rewriting historical evidence.

### Phase 4 — Triage every open PR

- Verify the named ownership of PR46, PR49 and PR35, then add native issue links.
  Determine PR27's owning issue or record an explicit N/A; do not invent a link.
- Park PR44/45 under the DeepSeek disablement.
- Reconcile PR46 with its unpublished child and dirty JON-215 continuation into one
  exact candidate.
- Classify the 18 legacy-base PRs and the delivery-branch PR individually.
- Bring any surviving candidate onto a current base with current checks and receipt.
- Close only after incorporation, supersession or historical disposition is recorded.

### Phase 5 — Reconcile Linear

- Correct the five disabled DeepSeek issues and stale delegate.
- Reconcile the seven unassigned In Progress issues individually: verify the actual
  run, owner and authority; assign genuinely active work only when authorized, and
  move demonstrably unstarted work to Todo/Backlog with a receipt.
- Review all 31 stale active/Todo issues.
- Resolve Done-versus-blocked and Done-versus-open-implementation contradictions.
- Correct stale description headers without erasing original comments.
- Publish a fresh project at-risk update and clarify milestone semantics.

### Phase 6 — Strengthen supported enforcement

- Keep strict Node 22/24 checks.
- Require one exact decision-impact line and a native issue link/N/A.
- Add a machine-checkable completion receipt schema.
- Require exact-revision independent-verifier evidence before canonical merge.
- Change GitHub approval requirements only after confirming an eligible reviewer
  identity and a non-deadlocking review path.

### Phase 7 — Close out each repair truthfully

For every repair, report separately:

- saved locally;
- checks run and results;
- committed;
- pushed;
- PR opened/updated;
- independent review;
- merged into exact target;
- present in live <code>Develo</code>;
- Linear delivered and read back; and
- deployed, not deployed or N/A.

## Immediate safe actions completed by this audit

- Verified the live default branch and live <code>Develo</code> SHA.
- Verified the active GitHub ruleset and its zero-approval setting.
- Inventoried all current Concord Linear issues and all GitHub PRs.
- Inventoried local worktrees, branches, dirty state and cached-local-only history.
- Created this audit in a clean isolated worktree from live
  <code>Develo</code>.
- Left all pre-existing dirty worktrees, branches, issues, PRs, statuses, settings,
  permissions and deployment state unchanged.
- Removed private Linear UUIDs, local paths, protected rollback evidence and
  local-only commit details from the public artifact.

## Remaining authority boundaries

This audit authorizes no merge or deployment. It does not prove historical status
transitions that the available Linear interface could not expose. It does not infer
that local-only history should be published. It does not treat test success, an
automated packet, issue comments or this report as qualifying independent acceptance.

The next reviewable unit is the JON-215 workflow/configuration reconciliation
candidate based on live <code>Develo</code>, followed by the JON-141 code-integration
ledger and PR37/PR50 disposition.
