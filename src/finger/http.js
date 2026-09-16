import { resolveFingerIdentity } from "./identity.js";

const DEFAULT_MAX_BODY_BYTES = 10 * 1024 * 1024;

export function createFingerHttpHandler(options) {
  if (!options?.ingestionService) throw new Error("An ingestion service is required");

  return async function fingerHttpHandler(request, response) {
    if (request.method !== "POST") {
      response.writeHead(405, { Allow: "POST" });
      response.end();
      return;
    }

    let identity;
    try {
      identity = await resolveFingerIdentity(request, options);
      const payload = await readJson(request, options.maxBodyBytes ?? DEFAULT_MAX_BODY_BYTES);
      const reference = await options.ingestionService.ingest(payload, identity);
      accepted(response, reference, identity.setCookie);
    } catch (error) {
      options.onIngestionError?.(error);
      // Finger must never make admission depend on capture or backend success.
      accepted(response, null, identity?.setCookie ?? null);
    }
  };
}

async function readJson(request, maximumBytes) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBytes) throw new Error("Finger payload exceeds the configured limit");
    chunks.push(chunk);
  }
  const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Finger payload must be a JSON object");
  }
  return payload;
}

function accepted(response, reference, cookie) {
  const headers = {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  };
  if (cookie) headers["Set-Cookie"] = cookie;
  response.writeHead(202, headers);
  response.end(JSON.stringify(reference ? { accepted: true, reference } : { accepted: true }));
}
