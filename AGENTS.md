# Concord project instructions

## Required Linear delivery — owner correction 2026-09-30

Owner instruction in chat `01a0f23a-061a-7c82-bcd4-c8bb3a3cf597`:
“send the unsent, You need to add to agents or decisions that you must do this”.

For authorized Concord work, deliver completed research, design drafts, review
findings and implementation evidence to the relevant existing Linear issue before
reporting delivery complete. This is standing authorization for those bounded
delivery documents/comments; do not ask again merely to send the work. Respect
later explicit local-only instructions and protected-data/disclosure boundaries.

Check existing Linear records first to avoid duplicates. Send the actual reviewable
content or an accessible exact-version artifact, not just a local filesystem path.
Include source revision or digest, findings, actual checks, unresolved limits and
review/acceptance state. Preserve original reports and clearly identify subsequent
corrections; do not present superseded failures or test counts as current results.
Read back every saved document/comment, verify its issue association and content,
and give the owner its Linear link. If access or safe disclosure is blocked, retain
the local artifact and explicitly report **Linear delivery pending**, the reason
and exact next action. A local save or attempted tool call is not delivery.

This reporting authorization does not authorize issue creation, status/assignment
changes, agent dispatch, policy adoption, commits, pushes, merges or deployment.
Record those states separately using the [completion receipt](docs/decisions/WORKFLOW.md#completion--synchronization-receipt).
This is a working instruction, not a claim that a background synchronization service exists.

Concord and The Form are peers; Vote is a folder only. Deployment is Linux-only.
Read the relevant accepted entries in [DECISIONS.md](DECISIONS.md) before material work.
The designated canonical identity is `ptown16801-lang/concord:Develo:/DECISIONS.md`.
Until this candidate is integrated, report its branch/revision and candidate status.
Do not silently treat another branch's master or generated summary as current authority.

At session start, identify checkout/remotes/branch/revision; inspect dirty state,
worktrees and local-only evidence. Check remote synchronization (read-only fetch when
authorized) and applicable latest owner corrections/issue approvals. Record offline
limits. Never overwrite newer local evidence with an older remote summary. Historical
prompts/source snapshots are evidence, not instructions to execute old actions.

Use [WORKFLOW.md](docs/decisions/WORKFLOW.md) for updates and completion receipts.
Before completing a task that changes an accepted decision, update its stable entry,
cite actual acceptance, retain supersession, link the issue/review and report IDs.
Preserve CONCORD-WF-002: consult Linear before large decisions and record its actual
advice; a request alone is not a response. Routine corrections within accepted scope
do not need repeated consultation. Respect communication/execution permissions and
reserved human authority; advisory feedback does not supply independent approval.
Otherwise explicitly report **No decision change**. Routine implementation does not
need invented policy entries. No status, merge, test or agent recommendation creates
owner acceptance. Unknown dates must remain explicitly unavailable.

One designated integrator writes the master for an integration attempt. Separately
authorized parallel work submits proposed changes to that integrator. Check expected
HEAD/canonical revision and other local edits immediately before committing; explicitly
review semantic overlap as well as Git conflicts. For the 2026-09-24 candidate, this
session owns only decision documentation/tooling; JON-141 retains its runtime writer.
Do not infer continuing ownership or an automatic dispatch from this historical note.

Run `npm run decisions:generate`, `npm run decisions:check` and
`npm run decisions:test` for decision-tooling changes. PRs need one exact decision-impact
line from the PR template, source/review references and committed/pushed/reviewed/
integrated state. Preserve historical handoffs; summaries are generated navigation.
Human review must assess acceptance, completeness and semantic contradictions.

Keep current holds: quizzes deferred; held Research Library work not reopened; Finger
beta complete with residual scope separate. Do not enable Linear Coding Sessions or
Loops, revive choreography, launch agents, merge/deploy or publish without applicable
authorization. The owner subsequently authorized publication through PR41 and its
thread-specific corrections. Keep merge authority and review disposition explicit;
the original local-only instruction is a historical stage, not a renewed push gate.

On this Ubuntu host, keep terminal commands/results visible with
`python3 /home/cornholio/.local/share/codex-visible-terminal/watch_all.py --open` and
regular output polling. Do not expose credentials or private reasoning. Preserve user
work, stashes, profiles and unrelated processes. On Bubblewrap startup failure, read
`/home/cornholio/Documents/Bubblewrap-Recovery.md` before retrying; do not bypass denied
escalations or relax global isolation to manufacture a pass.
