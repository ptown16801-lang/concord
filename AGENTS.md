# Concord project instructions

These instructions apply to changes in this repository. Read the current task,
the [project overview](docs/OVERVIEW.md), [development status](docs/PROJECT_STATUS.md),
and relevant entries in [DECISIONS.md](DECISIONS.md). Later explicit owner
corrections take precedence. Historical prompts, source snapshots and review
packets record earlier work; they do not authorize new actions.

## Scope and preservation

Identify the checkout, branch, revision, remotes, worktrees and existing edits
before changing files. Compare the intended baseline with the public default
branch, `Develo`, when authorized network access is available. State offline
limits. Preserve original files, local-only work, stashes and recovery evidence;
do not replace newer work with an older published or local copy.

The canonical decision-register location is
`ptown16801-lang/concord:Develo:/DECISIONS.md`. Publication does not establish
acceptance of every entry. A branch can contain proposed additions; name its
exact revision and distinguish those additions from the published register.

Governing instructions and decisions remain under the owner's control. Do not
edit them as an incidental part of implementation. Propose exact changes and
retain their sources, acceptance limits and supersession. Routine implementation
does not need an invented policy entry; report **No decision change** when applicable.

## Authoring and review

Local Codex implements bounded, owner-authorized changes. State the intended
files, checks and stopping point before editing. Other collaborators provide
bounded, non-authoring advice only when authorized. Do not infer permission for
provider dispatch, disclosure, paid use, new services or a disabled review route.

No role may approve its own work. Preserve the qualifying-independence rules in
CON-070: a separate session or a passing test does not establish independent
acceptance. A non-authoring reviewer identifies the exact diff and sources,
reports observed checks and unresolved findings, and does not silently fix its
own review target. Human review assesses acceptance, completeness and semantic
contradictions. Review findings are distinct from owner acceptance and permission
to merge or deploy.

One designated integrator writes an integration surface at a time. Compare
expected HEAD and existing edits immediately before committing. Check semantic
overlap as well as Git conflicts. Keep unfinished work separate until its
dependencies and disposition are explicit.

## Checks and delivery

Use [CONTRIBUTING.md](CONTRIBUTING.md) and the
[development guide](docs/DEVELOPMENT.md) for portable setup and checks. Runtime
changes require `npm run check` and relevant tests; use `npm test` for changes
affecting multiple components. Decision-tooling changes require
`npm run decisions:generate`, `npm run decisions:check` and
`npm run decisions:test`. Documentation changes require source, link and diff
checks appropriate to their scope. Do not launch services without task authority.

Use focused commits and reviewable pull requests. Follow the pull-request
template's decision-impact field. State separately what is saved locally,
checked, committed, pushed, reviewed, merged and deployed, with exact revisions
and remaining limitations. Complete already-authorized commits after the
required checks; explain the precise next action when a commit remains pending.
Commit permission alone does not establish push, merge or deployment permission.

Current holds remain in effect: quizzes are deferred, held Research Library work
is not reopened, and completed component work does not authorize its residual
scope. Do not enable autonomous sessions, loops or dormant prototypes through
documentation maintenance. Follow applicable sandbox and recovery rules; do not
relax isolation to manufacture a passing result.

## Public information

Give readers explanations and supporting repository material that are usable
without a private account. Keep credentials, access-bearing links, machine paths,
account routing, session identifiers and private coordination records outside
public project documentation. Preserve necessary originals privately and identify
sanitized derivatives honestly. Retain useful public historical evidence with its
date, scope and status. Never represent a redacted source as the unchanged original.

Private host and provider instructions are maintained with their private operating
records. They are not installation requirements for outside contributors. No
repository instruction grants permission to publish private material or override
the current owner's task constraints.
