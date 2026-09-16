export const SYSTEM_INSTRUCTIONS = `You are a project-management coordinator operating inside Linear on behalf of the project owner.

Operating rules:
- Treat Linear as the project-management system of record, not as an unrestricted code-execution queue.
- Use the issue, project, comments, and guidance supplied by Linear as authoritative context for the current task.
- Never invent repository identities, branches, commits, project state, completed work, or user decisions.
- Before implementation-specific handoff, verify project identity, repository/directory, base branch/commit, runtime/environment, permissions, scope, and dependencies from authoritative records. If any required identity cannot be verified, do not guess.
- Preserve existing work. Do not create duplicate execution runs when an existing worker/session/artifact already exists.
- You may read issues, comment, create child issues, and update issue planning fields using the provided tools when doing so is necessary to fulfill the user's instruction.
- Do not archive, delete, cancel, merge, change billing/model settings, rotate credentials, or delegate coding work: those capabilities are intentionally unavailable.
- Prompt the project owner only when a decision is absolutely necessary and cannot be resolved from authoritative project material. Use request_owner_decision only in that case, and state exactly why the decision cannot safely be inferred.
- For routine ambiguity, prefer a conservative reversible action or no mutation, and explain it.
- Keep responses concise, factual, and suitable for the Linear Agent Session UI.
- If asked for actual repository implementation, prepare an implementation-ready handoff in Linear rather than pretending this coordinator edited code.
`;

export const TOOL_DEFINITIONS = [
  {
    type: "function",
    name: "linear_get_issue",
    description: "Read a Linear issue by identifier or UUID.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "linear_list_current_project_issues",
    description: "List recent issues in the current issue's Linear project.",
    parameters: {
      type: "object",
      properties: { limit: { type: "integer", minimum: 1, maximum: 50 } },
      required: ["limit"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "linear_create_child_issue",
    description: "Create a child issue under the current Linear issue, inheriting its team and project.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1, maxLength: 240 },
        description: { type: "string" },
        priority: { type: "integer", minimum: 0, maximum: 4 }
      },
      required: ["title", "description"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "linear_update_issue",
    description: "Update safe planning fields on an existing Linear issue. Omitted fields remain unchanged.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string", minLength: 1, maxLength: 240 },
        description: { type: "string" },
        priority: { type: "integer", minimum: 0, maximum: 4 }
      },
      required: ["id"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "linear_comment_issue",
    description: "Add a project-management comment to a Linear issue.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string" },
        body: { type: "string", minLength: 1 }
      },
      required: ["id", "body"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "request_owner_decision",
    description: "Escalate to the project owner only when an actual decision is absolutely necessary and cannot be resolved from authoritative project records.",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string", minLength: 1 },
        why_required: { type: "string", minLength: 1 }
      },
      required: ["question", "why_required"],
      additionalProperties: false
    },
    strict: true
  }
];

export function buildAgentInput(payload, contextLimit = 120000) {
  const action = payload?.action ?? "unknown";
  const session = payload?.agentSession ?? {};
  const promptedBody = payload?.agentActivity?.body ?? "";
  const promptContext = payload?.promptContext ?? session?.promptContext ?? "";
  const issue = session?.issue ?? {};
  const compact = [
    `Linear AgentSession action: ${action}`,
    `Session ID: ${session?.id ?? "unknown"}`,
    `Current issue: ${issue?.identifier ?? issue?.id ?? "unknown"} ${issue?.title ?? ""}`,
    promptedBody ? `New user prompt:\n${promptedBody}` : "",
    promptContext ? `Linear promptContext:\n${promptContext}` : ""
  ].filter(Boolean).join("\n\n");
  return compact.length <= contextLimit ? compact : compact.slice(0, contextLimit) + "\n\n[context truncated by coordinator safety limit]";
}

export function isProjectAllowed(payload, allowlistValue) {
  if (!allowlistValue?.trim()) return true;
  const allowed = new Set(allowlistValue.split(",").map(x => x.trim().toLowerCase()).filter(Boolean));
  const projectName = payload?.agentSession?.issue?.project?.name;
  if (!projectName) return false;
  return allowed.has(projectName.toLowerCase());
}
