const SAFE_FIELDS = new Set([
  "action", "assignmentId", "durationMs", "issueId", "projectId", "role",
  "sessionId", "state", "status", "tool", "webhookId"
]);

export function safeLogFields(fields = {}) {
  const safe = {};
  for (const [key, value] of Object.entries(fields)) {
    if (SAFE_FIELDS.has(key) && value !== undefined && value !== null) safe[key] = value;
  }
  return safe;
}

export function logEvent(level, event, fields = {}) {
  const safe = safeLogFields(fields);
  const entry = { timestamp: new Date().toISOString(), level, event, ...safe };
  const method = level === "error" ? "error" : level === "warn" ? "warn" : "log";
  console[method](JSON.stringify(entry));
}
