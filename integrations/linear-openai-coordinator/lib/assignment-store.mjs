import { Redis } from "@upstash/redis";

const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60;

export function assignmentEventId(payload) {
  if (payload?.webhookId) return `webhook:${payload.webhookId}`;
  if (payload?.action === "created" && payload?.agentSession?.id) {
    return `session:${payload.agentSession.id}:created`;
  }
  if (payload?.action === "prompted" && payload?.agentActivity?.id) {
    return `activity:${payload.agentActivity.id}`;
  }
  return null;
}

export class AssignmentStore {
  constructor(redis, ttlSeconds = DEFAULT_TTL_SECONDS) {
    this.redis = redis;
    this.ttlSeconds = ttlSeconds;
  }

  static fromEnv() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) throw new Error("Durable assignment store is not configured");
    const configuredTtl = Number(process.env.AGENT_ASSIGNMENT_TTL_SECONDS || DEFAULT_TTL_SECONDS);
    const ttl = Number.isInteger(configuredTtl) && configuredTtl >= 3600 ? configuredTtl : DEFAULT_TTL_SECONDS;
    return new AssignmentStore(new Redis({ url, token }), ttl);
  }

  keys(eventId) {
    const encoded = encodeURIComponent(eventId);
    return {
      lock: `linear-openai-coordinator:assignment:${encoded}:lock`,
      result: `linear-openai-coordinator:assignment:${encoded}:result`
    };
  }

  async claim(eventId, metadata) {
    const keys = this.keys(eventId);
    const existing = await this.redis.get(keys.result);
    if (existing) return { claimed: false, state: existing.status || "completed" };

    const lock = JSON.stringify({ status: "running", startedAt: new Date().toISOString(), ...metadata });
    const acquired = await this.redis.set(keys.lock, lock, { nx: true, ex: this.ttlSeconds });
    return acquired
      ? { claimed: true, state: "running" }
      : { claimed: false, state: "running" };
  }

  async finish(eventId, status) {
    const keys = this.keys(eventId);
    await this.redis.set(keys.result, {
      status,
      finishedAt: new Date().toISOString()
    }, { ex: this.ttlSeconds });
    await this.redis.del(keys.lock);
  }
}
