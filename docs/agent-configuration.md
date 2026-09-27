# Agent configuration revision 1 — 2026-09-26

## Scope and authority

The owner requested AGENTS.md configurations for Concord and the other projects,
then clarified the scope to the five registered Codex projects. This revision
implements project entry points and source navigation within existing policies.
Decision impact: No decision change to existing product, workflow, role or spending
policies. No accepted decision or prior correction is superseded by this revision.

Project root: `/home/cornholio/projects/concord`.

## Evidence

- AGENTS.md (preserved pre-edit snapshot)
- README.md
- package.json
- CONTRIBUTING.md
- DECISIONS.md: CON-001, CON-002, CON-070, CON-072, CON-074, CONCORD-WF-002
- docs/decisions/WORKFLOW.md

Official discovery reference: https://learn.chatgpt.com/docs/agent-configuration/agents-md
Global guidance and project guidance are layered; a same-directory override takes
precedence. Start a fresh session in the intended project to load updated guidance.

## Rationale and alternatives

Preserve existing instructions and add concise project-specific navigation and
validation. Rejected copying one generic file everywhere: these projects have
different privacy, governance and acceptance requirements. Rejected replacing global
preferences or expanding runtime configuration: neither is needed for this request.
Detailed evidence stays in existing project records rather than startup context.

## Implementation and validation limits

After installation, AGENTS.md is local guidance for future sessions. Existing running
sessions are not restarted. No enforcement software, scheduler, spending control,
provider setup, project registration, commit, push or deployment is installed by this
revision. Global AGENTS.md remains unchanged. Existing dirty work is preserved.

Validation covers preservation of prior instructions, source paths, absence of
same-directory overrides, file sizes under the default discovery budget, review of
scope/contradictions and exact installed-byte readback. No application/runtime or
private-data tests are warranted by instructions-only changes. Fresh-session loading
is not exercised by a new model run; current-session instructions do not reload merely
because files changed. These checks are not independent product acceptance.

## Receipt and rollback

The configuration task retains before snapshots, proposed files, diffs, hashes,
review findings and installation results at:
`/home/cornholio/Documents/Codex/2026-09-26-are-you-able-to-see-all/agent-configurations/`.
Restore only this revision's changed files from their before snapshots after checking
for later edits. Newly created files may be removed only if their content still
matches this revision. Do not reset the repository or discard other work.

Resource accounting belongs to that configuration task's persistent record; no prior
project allowance is reset. Unknown historic usage stays unknown.

## Revision 2 — four-role local workflow — 2026-09-26

Source: the owner's four-role prompt in local Codex session workspace
`2026-09-26-i-d-give-concord-four-distinct`, followed by the instruction to put it
in Concord's folder. This is a current owner operating instruction recorded in
AGENTS.md; no product decision or accepted CON-070 independence threshold changes,
and CON-071's detailed proposal remains pending. It narrows this workflow to one
local code author, a non-authoring planner, a qualifying separate local verifier,
and an advisory external packet reviewer. It does not dispatch any role.

Rationale: keep shared boundaries discoverable at the repository root and keep
per-task authorization in each implementation prompt. Copying task scopes into
standing rules or treating a separate session as automatic independence was rejected.
Existing instructions and dirty work are retained. Implementation is documentation
only, not technical enforcement or independent acceptance.

Checkout at inspection: `codex/grok-review-packet`,
`6e3e0b3971230b24cd8bd779f5e27378e0b2a64f`. Canonical integration, remote freshness
and live Linear state were not verified; this is a local configuration update.
The JON-135 link is owner-supplied context, not a claim that its live contents were
reviewed. No external packet was sent; no runtime checks or reviewer was launched.

Evidence and rollback snapshots for both files are in
`/home/cornholio/Documents/Codex/2026-09-26-i-d-give-concord-four-distinct/role-boundaries-evidence/`.
Discovery source: the owner-pasted “Custom instructions with AGENTS.md” guide
in this session, also referenced at https://learn.chatgpt.com/docs/agent-configuration/agents-md.
It specifies global then root-to-working-directory discovery, override precedence,
and a default combined 32 KiB cap. CODEX_HOME resolves to `/home/cornholio/.codex`;
config.toml has no explicit project_doc_max_bytes, fallback filenames or selected
profile. Neither the global directory nor repository root has AGENTS.override.md.
Global AGENTS.md is 7,108 bytes. The updated root plus global guidance and separator
must remain below 32,768 bytes; no configuration limit is raised. Nested working
directories require their own applicable-chain check. This session began elsewhere;
file placement does not prove fresh-session automatic discovery.
Validate exact readback, preservation, diff whitespace and role/precedence wording.
Rollback only this revision after checking for later edits; preserve prior dirty work.
This bounded documentation task adds no agents, infrastructure or paid use. Historical
resource usage remains unknown; no existing cumulative allowance is reset.


## Revision 3 — workflow audit repair — 2026-09-27

The owner requested repair of all reported workflow findings in chat
01a0e481-208c-7d81-9596-0251d0dab632. Current guidance is reconciled with the
September 26 four-role instruction. Historical configuration observations above
remain evidence, not a current host inventory. `/home/cornholio/.codex/AGENTS.md`
is absent at this audit; no verified global backup was restored and no global
instruction policy was invented. The Concord root carries its own project rules.
The missing external terminal watcher is no longer required: use native visible
terminal/tool output and poll running commands. No background watcher was installed.

[Local setup](LOCAL_SETUP.md) supplies an explicit launcher for existing Node >=22.5
when a noninteractive session omits NVM from PATH. It does not modify shell profiles,
install packages or change isolation. Follow the current checkout's relative guidance,
so isolated candidates do not silently read another checkout's mutable policy.

Official discovery reference: https://developers.openai.com/api/docs/guides/latest-model
(section Using agents.md; consulted 2026-09-27). Global then repository instructions
are separate loading layers; a historical file-size calculation does not prove that
an absent global file is loaded. No fresh provider session or independent acceptance
is claimed. Review the final repair receipt for tested revision and integration state.
