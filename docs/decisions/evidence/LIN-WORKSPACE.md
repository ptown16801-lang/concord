# Evidence snapshot: Workspace Linear operating policy — native workflow

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/workspace-linear-operating-policy-native-workflow-61bf7beb7994
- Version: 2026-09-24T07:18:53.413Z
- Source date: 2026-09-24T07:18:53.413Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

# WORKSPACE STOP-WORK HOLD — Jefferson and Coding Sessions exception, September 19, 2026

The owner's earlier instruction was: **“Stop all work in Linear until we resolve these issues.”** The owner has now explicitly instructed: **“Take the Jefferson place off of hold.”**

**Jefferson Android Medical Record is released from the stop-work hold.** Its unfinished canonical issues may resume under the existing native workflow. <issue id="c3c3efc8-02ec-410f-9ae1-ae1379204e4c" href="https://linear.app/jons-garage/issue/JON-121/run-android-acceptance-and-export-round-trip-validation">JON-121</issue> returns to its pre-hold Todo stage; <issue id="d4a829eb-94aa-4730-97cf-e0b7a1655956" href="https://linear.app/jons-garage/issue/JON-118/implement-onenote-source-ingestion">JON-118</issue>, <issue id="2634399d-4ef4-4461-b174-4bf5e5e4aeb8" href="https://linear.app/jons-garage/issue/JON-119/implement-jefferson-source-ingestion">JON-119</issue>, and <issue id="744a8b6b-558e-49dc-8253-ef8f3a3f32d5" href="https://linear.app/jons-garage/issue/JON-120/implement-provenance-conflict-and-duplicate-handling">JON-120</issue> retain their In Review stages with the hold removed. Preserve existing branches, pull requests, results, and completion evidence; this release does not request reimplementation or reopen completed/canceled work. <issue id="b4040e8a-1a5b-4037-8290-8f10f41fa7e8" href="https://linear.app/jons-garage/issue/JON-122/migrate-and-validate-real-medical-records">JON-122</issue> remains blocked on actual acceptance of <issue id="c3c3efc8-02ec-410f-9ae1-ae1379204e4c" href="https://linear.app/jons-garage/issue/JON-121/run-android-acceptance-and-export-round-trip-validation">JON-121</issue>.

**All other projects and detached/team-level work remain on hold.** For that work, do not start or resume coding, research, review, testing, agent delegation, automated dispatch, retries, merges, deployments, or scheduled/Loop work without explicit owner authorization. Resolving a dependency or finishing an audit does not itself lift those holds. Further audit or repair outside Jefferson still requires the owner's direction.

The owner subsequently instructed: **“Also re-enable coding session.”** **Linear Coding Sessions are authorized again for Jefferson Android Medical Record.** This explicitly supersedes the earlier Coding Sessions prohibition for Jefferson, including its repetitions in project/issue descriptions and historical comments. Use the existing canonical issues and branches/PRs, with a human assignee and Linear as a bounded coding delegate. Do not launch overlapping implementations. This does not release any other project's hold, authorize coding outside Jefferson, revive canceled supervisor/dispatcher machinery, or change other projects' priorities.

This records the owner's scoped authorization; it is not a claim that a worker, native session, or Loop has started or been technically stopped. Runtime execution must be verified separately.

---

This policy applies to all current and future projects in Jon's garage unless the owner explicitly overrides it for a specific project or issue.

## Core ownership model

* When an issue is delegated to an agent, keep a human teammate as the assignee/accountable owner. Linear tracks the agent separately as the delegate.
* Agents are normal delegates/contributors, not replacement owners.
* Delegate a **bounded deliverable** to an agent when that is the appropriate executor; do not require a separate owner-routing step merely to start routine delegated work.
* Do not create ordinary issues whose job is to supervise, dispatch, restart, or manage other agents.
* If a genuinely repetitive coordination workflow later proves useful, use a **native Linear Loop** with visible instructions and run history rather than custom supervisor/dispatcher issue machinery.

## Coding

* **Linear Coding Sessions are authorized for Jefferson Android Medical Record by the owner's September 19, 2026 instruction.** The prohibition remains in force outside Jefferson unless separately lifted by the owner.
* Jefferson implementation issues may be delegated to **Linear Agent** for their existing unfinished deliverables while retaining a human assignee. Other projects remain on hold; do not delegate their implementation issues.
* Authorized Jefferson coding may also use **Codex or another explicitly approved coding agent/tool** from the canonical issue. Reuse existing work and avoid concurrent or duplicate coding sessions for the same deliverable.
* Coding evidence returns to the same canonical issue: branch/PR, exact SHA, tests, limitations, and review result.
* Never create a second implementation task merely because a prior branch, PR, or issue status looks stale. Audit existing artifacts first.

## Issue lifecycle

Use ordinary Linear state and relations:

* Backlog = not selected / parked.
* Todo = selected and ready.
* In Progress = actively being worked.
* In Review = delivered work awaiting review/acceptance.
* Done = accepted/completed.
* Canceled = intentionally retired.

Use native blockers/dependencies instead of READY/WAIT dispatch systems or custom gating states.

## Reviews

Review should normally occur on the issue and PR being reviewed using the team's started review statuses (for example In Review).
Routine review is not an owner-only gate; reserve explicit owner-decision signaling for decisions that genuinely require human authority or judgment and cannot simply be delegated.
Create a separate review issue only when independent review is itself a substantial, separately owned deliverable.

## Preflight before execution

Before starting, reopening, or delegating work:

1. Reconcile the latest owner decision.
2. Check current issue state and relations.
3. Check existing PRs, branches, commits, artifacts, and completion evidence.
4. Confirm there is a real unfinished deliverable.
5. Use the existing canonical issue whenever possible.
6. State any required assumption before acting.

Completed work stays completed. Historical instructions are evidence, not automatic launch commands.

## Automation

Do not create supervisors, dispatchers, coordinators, restart loops, or Skills preemptively.
Use ordinary Linear behavior first.
Only introduce a native Loop after a specific repetitive workflow demonstrably needs automation.

## External-system invocation boundary

This rule applies across all projects and all connector/API/MCP-mediated workflows.

A successful connector, API, or MCP operation proves only the operation that the available tool actually performed. Creating or updating an issue, comment, mention, assignment, document, webhook record, or other handoff artifact does **not** by itself prove that an external AI agent, automation, hosted execution environment, or native product workflow was invoked.

Required behavior:

1. Distinguish **recording a handoff**, **invoking an agent**, and **starting hosted execution** as separate events.
2. Treat a connector-created request as a **handoff record only** unless the available tool returns evidence that the target agent or automation actually started or responded.
3. Never claim that an external agent received, processed, reviewed, approved, completed, or responded to a request without an actual returned response or verifiable execution record.
4. Never infer approval, acceptance, or completion from silence, a successful write, a mention, assignment, or status change.
5. Do not enable Coding Sessions, Loops, AI credits, paid execution, broader permissions, delegation, or any other materially different execution path merely to force an invocation unless the owner explicitly authorizes that change.
6. Do not substitute delegation for discussion, or hosted execution for a handoff, when doing so would change the requested execution model.
7. When the connector cannot invoke the target agent directly, prepare the exact handoff in the external system and clearly state the native-UI or user action still required to invoke it.
8. Resume from the external system only after receiving its actual response or other verifiable execution evidence.
9. Tool capability governs what may be claimed as completed. Product capability that is not exposed through the available tool must not be assumed to have occurred.

General principle: **a successful write is evidence of a successful write, not evidence of downstream execution.**

## Historical records

Completed/canceled historical delegation may remain in activity history. Do not erase history merely to make the workspace look cleaner. What matters is that no historical delegation is treated as current execution authority.
