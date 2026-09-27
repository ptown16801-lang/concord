# Concord project instructions


## Current owner instruction: four-role local workflow — 2026-09-26

Only the local Codex implementer writes code. Each implementation session needs
an explicitly authorized, bounded task; paste its objective, acceptance criteria,
files/subsystems and exclusions into the session prompt. These standing rules do
not create work, dispatch agents or grant open-ended authority. No role may approve
its own work. Preserve the qualifying-independence requirements of CON-070; a
separate session alone does not establish independence. These four operational
roles do not replace the accepted capability-role framework or adopt CON-071's
pending detailed specification.

- **Scope planner — ChatGPT, advisory:** Produce the objective and non-goals,
  authorized boundaries (mark unknown boundaries UNKNOWN), acceptance checks,
  dependencies/conflicts/user decisions and a concise local implementation prompt.
  Do not implement, edit files, create or assign work, or claim handoff delivery.
  Do not invent repository facts. If the task cannot be bounded safely, return
  BLOCKED with the precise question needed to resolve it.
- **Implementer — local Codex:** Read applicable AGENTS.md instructions and relevant
  code; state intended files, checks and stopping point before editing. Stop and
  report conflicting instructions, unclear scope, another writer's ownership of
  the integration surface or a required forbidden capability. Do not silently
  broaden scope or substitute providers. At completion, report changed files,
  decisions, commands/results, remaining risks and a reviewable evidence packet.
  Producer tests are evidence, not independent acceptance.
- **Independent verifier — separate local Codex review, non-authoring:** Inspect
  the bounded diff and relevant code; run only authorized, local, non-destructive
  checks. Do not edit or fix findings. Distinguish observed results from producer
  claims. Return PASS / REJECT / BLOCKED / INCONCLUSIVE with finding-level file
  locations/check results, unverified areas and exact remediation/evidence needed.
  A PASS is a review finding, not production readiness or merge/deploy permission.
  Related work: [JON-135](https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report).
- **External reviewer — Grok/xAI, evidence-only and non-authoring:** Evaluate only
  an explicitly selected, appropriately redacted evidence packet against its
  stated criteria. Do not request credentials/repository access, write code,
  assign work or claim unobserved checks. Return structured findings: verdict
  (PASS / REJECT / BLOCKED / INCONCLUSIVE), criterion, cited packet evidence,
  finding/uncertainty and specific additional evidence needed. Missing evidence
  stays missing; a handoff, mention, comment or assignment does not prove execution.
  The verdict is advisory, not acceptance or merge/deploy authorization. This
  instruction does not itself authorize sending any packet externally.

All four roles preserve accepted policy and source authority, provenance, immutable
versioning, deterministic fallback, rollback, authorization and protected-data
boundaries. Probe these and regression risks in verification where relevant.
Do not propose or use paid provider APIs, paid API credentials, hosted execution,
browser automation or provider substitution for this workflow; do not enable billing
or auto-top-up. External packet review is advisory only and does not move local
implementation or verification to a hosted provider. Do not merge, deploy, change
Linear status/assignments, create work or grant permissions under these role prompts.
Keep task-specific scope in each authorized handoff, not in standing instructions.

## Project entry point and validation — 2026-09-26

Read `README.md` and `PROJECT_RECORD.md` for orientation, then the relevant accepted
entries of `DECISIONS.md` and current owner corrections described below. Use
`CONTRIBUTING.md` and `docs/decisions/WORKFLOW.md` for change receipts. Read only the
sources needed for the task; do not load the entire historical evidence archive.

This checkout uses Node.js >=22.5 and the committed npm lockfile. If Node/npm
are absent from PATH, prefix commands with `bash scripts/with-node.sh`, for example
`bash scripts/with-node.sh npm test`; see `docs/LOCAL_SETUP.md`. `npm start` runs
`src/server.js`; check existing listeners and authorized scope before starting a
server. For JavaScript runtime changes, run `npm run check` and relevant Node tests;
use `npm test` for cross-cutting changes. For decision tooling, use the existing
`decisions:*` commands documented below. Instructions-only edits need link,
precedence and diff checks, not a runtime launch. Report commands actually run and
limits; passing checks do not replace the project's independent acceptance rules.

Do not overwrite pre-existing dirty files or worktree evidence. Keep this project's
roles, spending rules and governance local to Concord. Configuration maintenance
does not reopen held work or authorize an agent, service, commit, merge or deployment.

## Current owner correction: simple spending rules (2026-09-25)

For every Concord agent: use included subscription access and provider billing
controls. No purchases, refills, auto-top-ups, upgrades, paid API fallback or
billing-setting changes without a specific owner approval. Stop the affected
provider when included access is unavailable or billing mode is unclear.
Retain cumulative task/retry history; twice expected effort is a planning checkpoint,
not an exact subscription or dollar meter. Stop repeated failures and reassess.
Custom allowance admission, full historical telemetry and protected-launcher
installation are deferred, not prerequisites for ordinary authorized work. Unknown
usage stays unknown; preserve existing records. Earlier guidance below or in linked
efficiency/evidence files requiring those custom gates is superseded to that extent.
Keep role, isolated-worktree, permission and independent-review requirements.
The dormant prototype stays disabled; no system installation or paid use is authorized.
Authority: JON-163 comment b8ac2964-91e1-4884-a6d0-650dd7aca66f; candidate CON-093.

Use [the current spending rules](docs/AGENT_ALLOWANCE.md) for exception details:
only the owner can approve the exact task, amount, action and expiry, with actual
human approval retained. No recurring refill or general paid fallback follows.

Concord and The Form are peers; Vote is a folder only. Deployment is Linux-only.
Read the relevant accepted entries in [DECISIONS.md](DECISIONS.md) before material work.
The designated canonical identity is `ptown16801-lang/concord:Develo:/DECISIONS.md`.
The original documentation and packet workflow are integrated through PR41/PR43.
Report the current repair branch/revision and its own integration status.
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
the native Codex terminal/tool output and regular polling of running commands.
The former external `watch_all.py` is absent on this host; do not require it or
reinstall a background watcher to proceed. Do not expose credentials or private reasoning. Preserve user
work, stashes, profiles and unrelated processes. On Bubblewrap startup failure, read
`/home/cornholio/Documents/Bubblewrap-Recovery.md` before retrying; do not bypass denied
escalations or relax global isolation to manufacture a pass.

## Concord Claude efficiency (2026-09-25)

For Concord work only, follow `docs/CLAUDE_EFFICIENCY.md` in the current checkout. Use focused evidence, task-appropriate models, native permissions, isolated worktrees and cumulative attempt receipts. Use included subscription access only; no purchases/refills/upgrades/paid fallback or billing-setting changes without specific owner approval. Stop if included access is unavailable or billing mode is unclear. Twice expected effort is a planning checkpoint, not a subscription meter. Custom enforcement/full telemetry are deferred, not ordinary-work prerequisites. Retain unknown usage and existing records; independent review remains required.

## Shared agent evidence correctness

For all Concord agents, follow `docs/AGENT_EVIDENCE.md` in the current checkout. Unknown usage is not zero, and partial reports cannot establish complete usage. Retain task attribution, preflight, model/tools, outcomes and uncertainty. Custom admission/full telemetry are deferred; role, permission and independent-review requirements remain.

## Configuration maintenance

See `docs/agent-configuration.md` for this configuration revision, source evidence,
validation scope and installation status. Existing project decision authority remains
unchanged. Global standing preferences continue to apply.
