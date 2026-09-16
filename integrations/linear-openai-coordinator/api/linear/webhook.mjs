import { createHmac, timingSafeEqual } from "node:crypto";
import { waitUntil } from "@vercel/functions";
import { getLinearAccessToken, emitAgentActivity, getIssue } from "../../lib/linear.mjs";
import { runCoordinator } from "../../lib/openai.mjs";
import { isProjectAllowed } from "../../lib/policy.mjs";

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

async function processAgentSession(payload) {
  const sessionId = payload?.agentSession?.id;
  if (!sessionId) return;
  let token;
  try {
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
      return;
    }

    const result = await runCoordinator({ payload, linearToken: token, currentIssue });
    if (result.decisionRequest) {
      await emitAgentActivity(token, sessionId, {
        type: "elicitation",
        body: `${result.decisionRequest.question}\n\nWhy this requires your decision: ${result.decisionRequest.why_required}`
      });
      return;
    }
    await emitAgentActivity(token, sessionId, { type: "response", body: result.text });
  } catch (error) {
    console.error("coordinator_error", error);
    if (token && sessionId) {
      try {
        await emitAgentActivity(token, sessionId, { type: "error", body: `Coordinator failed safely: ${error.message}` });
      } catch (nested) {
        console.error("coordinator_error_activity_failed", nested);
      }
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
    waitUntil(processAgentSession(payload));
  }
  return new Response(null, { status: 200 });
}

export async function GET() {
  return Response.json({ ok: true, service: "linear-openai-coordinator", endpoint: "AgentSessionEvent" });
}

export const __test = { verifyWebhook, timestampFresh };
