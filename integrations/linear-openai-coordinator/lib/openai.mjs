import { TOOL_DEFINITIONS, SYSTEM_INSTRUCTIONS, buildAgentInput } from "./policy.mjs";
import { getIssue, listProjectIssues, createChildIssue, updateIssue, commentIssue } from "./linear.mjs";
import { ADVISOR_INSTRUCTIONS, buildAdvisorInput, sameProject, selectedAdvisorRoles, validateMutationContent, validatePlanningChild } from "./regime.mjs";
import { logEvent } from "./observability.mjs";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function createResponse(body) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${required("OPENAI_API_KEY")}`
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`OpenAI Responses API failed (${response.status}): ${data?.error?.message || "unknown error"}`);
  }
  return data;
}

function functionCalls(response) {
  return (response.output || []).filter(item => item.type === "function_call");
}

function outputText(response) {
  const parts = [];
  for (const item of response.output || []) {
    if (item.type !== "message") continue;
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

async function authorizedIssue(ctx, id) {
  const issue = await getIssue(ctx.linearToken, id);
  if (!issue) throw new Error(`Issue not found: ${id}`);
  if (!sameProject(issue, ctx.currentIssue)) throw new Error("Target issue is outside the authorized current project");
  return issue;
}

async function executeTool(name, args, ctx) {
  switch (name) {
    case "linear_get_issue":
      return await authorizedIssue(ctx, args.id);
    case "linear_list_current_project_issues": {
      if (!ctx.currentIssue.project?.id) return { error: "Current issue has no project" };
      return await listProjectIssues(ctx.linearToken, ctx.currentIssue.project.id, args.limit);
    }
    case "linear_create_child_issue":
      validatePlanningChild(args);
      return await createChildIssue(ctx.linearToken, ctx.currentIssue, args);
    case "linear_update_issue":
      validateMutationContent(args);
      await authorizedIssue(ctx, args.id);
      return await updateIssue(ctx.linearToken, args);
    case "linear_comment_issue":
      validateMutationContent(args);
      await authorizedIssue(ctx, args.id);
      return await commentIssue(ctx.linearToken, args.id, args.body);
    case "request_owner_decision":
      ctx.decisionRequest = args;
      return { status: "awaiting_owner", ...args };
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

async function runAdvisors({ payload, currentIssue, model, contextLimit }) {
  const reports = [];
  const maxOutputTokens = Number(process.env.AGENT_ADVISOR_MAX_OUTPUT_TOKENS || 1200);
  for (const role of selectedAdvisorRoles()) {
    const started = Date.now();
    logEvent("info", "advisor_started", { role, issueId: currentIssue.id });
    const response = await createResponse({
      model,
      reasoning: { effort: process.env.OPENAI_REASONING_EFFORT || "medium" },
      instructions: ADVISOR_INSTRUCTIONS,
      input: buildAdvisorInput(role, payload, currentIssue, contextLimit),
      max_output_tokens: maxOutputTokens
    });
    reports.push({ role, text: outputText(response) || "No advisory findings returned." });
    logEvent("info", "advisor_completed", { role, issueId: currentIssue.id, durationMs: Date.now() - started });
  }
  return reports;
}

export async function runCoordinator({ payload, linearToken, currentIssue }) {
  const model = process.env.OPENAI_MODEL || "gpt-5.6-terra";
  const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 5000);
  const maxToolRounds = Number(process.env.AGENT_MAX_TOOL_ROUNDS || 5);
  const contextLimit = Number(process.env.AGENT_MAX_CONTEXT_CHARS || 120000);
  const ctx = { linearToken, currentIssue, decisionRequest: null };
  const advisorReports = await runAdvisors({ payload, currentIssue, model, contextLimit });
  let response = await createResponse({
    model,
    reasoning: { effort: process.env.OPENAI_REASONING_EFFORT || "medium" },
    instructions: SYSTEM_INSTRUCTIONS,
    input: buildAgentInput(payload, contextLimit, advisorReports),
    tools: TOOL_DEFINITIONS,
    tool_choice: "auto",
    parallel_tool_calls: false,
    max_output_tokens: maxOutputTokens
  });

  for (let round = 0; round < maxToolRounds; round++) {
    const calls = functionCalls(response);
    if (!calls.length) break;
    const toolOutputs = [];
    for (const call of calls) {
      let args;
      try { args = JSON.parse(call.arguments || "{}"); }
      catch { args = {}; }
      let result;
      try {
        logEvent("info", "coordinator_tool_started", { tool: call.name, issueId: currentIssue.id });
        result = await executeTool(call.name, args, ctx);
        logEvent("info", "coordinator_tool_completed", { tool: call.name, issueId: currentIssue.id });
      }
      catch (error) {
        logEvent("warn", "coordinator_tool_rejected", { tool: call.name, issueId: currentIssue.id });
        result = { error: error.message };
      }
      toolOutputs.push({ type: "function_call_output", call_id: call.call_id, output: JSON.stringify(result) });
    }
    if (ctx.decisionRequest) break;
    response = await createResponse({
      model,
      previous_response_id: response.id,
      instructions: SYSTEM_INSTRUCTIONS,
      input: toolOutputs,
      tools: TOOL_DEFINITIONS,
      tool_choice: "auto",
      parallel_tool_calls: false,
      max_output_tokens: maxOutputTokens
    });
  }

  return {
    text: outputText(response) || "Coordinator run completed.",
    decisionRequest: ctx.decisionRequest,
    responseId: response.id
  };
}
