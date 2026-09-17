export async function GET() {
  const required = [
    "OPENAI_API_KEY", "LINEAR_CLIENT_ID", "LINEAR_CLIENT_SECRET", "LINEAR_WEBHOOK_SECRET",
    "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "AGENT_ALLOWED_PROJECTS"
  ];
  const missing = required.filter(name => !process.env[name]);
  return Response.json({
    ok: true,
    service: "linear-openai-coordinator",
    model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
    configured: missing.length === 0,
    missing
  });
}
