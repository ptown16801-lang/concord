export async function GET() {
  return Response.json({
    ok: true,
    service: "linear-openai-coordinator",
    model: process.env.OPENAI_MODEL || "gpt-5.6-sol",
    configured: Boolean(process.env.OPENAI_API_KEY && process.env.LINEAR_CLIENT_ID && process.env.LINEAR_CLIENT_SECRET && process.env.LINEAR_WEBHOOK_SECRET)
  });
}
