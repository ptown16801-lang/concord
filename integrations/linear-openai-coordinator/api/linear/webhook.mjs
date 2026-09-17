import { createHmac, timingSafeEqual } from "node:crypto";
import { waitUntil } from "@vercel/functions";
import { getLinearAccessToken, emitAgentActivity, getIssue } from "../../lib/linear.mjs";
import { runCoordinator } from "../../lib/openai.mjs";
import { isProjectAllowed } from "../../lib/policy.mjs";
import { AssignmentStore, assignmentEventId } from "../../lib/assignment-store.mjs";
import { logEvent } from "../../lib/observability.mjs";

function verifyWebhook(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest();
  const supplied = Buffer.from(signature, "hex");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function timestampFresh(payload) {
  const ts = Number(payload?.webhookTimestamp);
  if (!Number.isFinite(ts)) return false;
  return Math.abs(Date.now() - ts) <= 60_000;
}

async function finishAssignment(store, assignmentId, status, sessionId) {
  try {
    await store.finish(assignmentId, status);
    return true;
  } catch {
    logEvent("error", "assignment_store_finish_failed", { assignmentId, sessionId, status });
    return false;
  }
}

async function processAgentSession(payload) {
  const sessionId = payload?.agentSession?.id;
  if (!sessionId) return;
  const assignmentId = assignmentEventId(payload);
  if (!assignmentId) return;
  let token;
  let store;
  let claimed = false;
  const started = Date.now();
  try {
    store = AssignmentStore.fromEnv();
    const claim = await store.claim(assignmentId, {
      action: payload.action,
      sessionId,
      webhookId: payload.webhookId || null
    });
    if (!claim.claimed) {
      logEvent("info", "assignment_reused", { assignmentId, sessionId, state: claim.state });
      return;
    }
    claimed = true;
    logEvent("info", "assignment_started", { assignmentId, action: payload.action, sessionId, webhookId: payload.webhookId });
    token = await getLinearAccessToken();
    await emitAgentActivity(token, sessionId, { type: "thought", body: "Reviewing the project context and authoritative Linear record." }, { ephemeral: true });

    const currentId = payload?.agentSession?.issue?.id || payload?.agentSession?.issue?.identifier;
    if (!currentId) throw new Error("AgentSession payload did not include an issue ID");
    const currentIssue = await getIssue(token, currentId);
    if (!currentIssue) throw new Error(`Unable to load current Linear issue ${currentId}`);

    const authorizationPayload = { agentSession: { issue: { project: currentIssue.project } } };
    if (!isProjectAllowed(authorizationPayload, process.env.AGENT_ALLOWED_PROJECTS)) {
      await emitAgentActivity(token, sessionId, {
        type: "error",
        body: "This coordinator is not authorized for the issue's project. Update `AGENT_ALLOWED_PROJECTS` only after verifying the intended project boundary."
      });
      await finishAssignment(store, assignmentId, "rejected", sessionId);
      return;
    }

    const result = await runCoordinator({ payload, linearToken: token, currentIssue });
    if (result.decisionRequest) {
      await emitAgentActivity(token, sessionId, {
        type: "elicitation",
        body: `${result.decisionRequest.question}\n\nWhy this requires your decision: ${result.decisionRequest.why_required}`
      });
      await finishAssignment(store, assignmentId, "awaiting_owner", sessionId);
      return;
    }
    await emitAgentActivity(token, sessionId, { type: "response", body: result.text });
    const persisted = await finishAssignment(store, assignmentId, "completed", sessionId);
    logEvent("info", "assignment_completed", { assignmentId, sessionId, durationMs: Date.now() - started });
    if (!persisted) logEvent("warn", "assignment_lock_retained", { assignmentId, sessionId, state: "completed" });
  } catch {
    logEvent("error", "assignment_failed", { assignmentId, sessionId, durationMs: Date.now() - started });
    if (token && sessionId) {
      try {
        await emitAgentActivity(token, sessionId, {
          type: "error",
          body: `Coordinator failed safely and stopped this assignment. Review service logs for assignment \`${assignmentId}\`; retry only with a new explicit owner prompt.`
        });
      } catch (nested) {
        logEvent("error", "error_activity_failed", { assignmentId, sessionId });
      }
    }
    if (claimed && store) {
      await finishAssignment(store, assignmentId, "failed", sessionId);
    }
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const secret = process.env.LINEAR_WEBHOOK_SECRET;
  const signature = request.headers.get("linear-signature");
  if (!verifyWebhook(rawBody, signature, secret)) return new Response("invalid signature", { status: 401 });

  let payload;
  try { payload = JSON.parse(rawBody); }
  catch { return new Response("invalid json", { status: 400 }); }
  if (!timestampFresh(payload)) return new Response("stale webhook", { status: 401 });

  if (payload.type === "AgentSessionEvent" && ["created", "prompted"].includes(payload.action)) {
    if (!assignmentEventId(payload)) return new Response("missing stable assignment event id", { status: 400 });
    waitUntil(processAgentSession(payload));
  }
  return new Response(null, { status: 200 });
}

export async function GET() {
  return Response.json({ ok: true, service: "linear-openai-coordinator", endpoint: "AgentSessionEvent" });
}

export const __test = { verifyWebhook, timestampFresh };
