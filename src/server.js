import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFingerHttpHandler,
  createFingerIngestionService,
  FileObjectStore,
  FingerPersistence,
  FingerSqliteRepository,
  PersistentFingerStore,
  resolveVersions,
} from "./finger/index.js";

const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const MIME = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);

function integer(value, name, minimum, maximum) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new RangeError(`${name} must be an integer from ${minimum} to ${maximum}`);
  }
  return parsed;
}

const port = integer(process.env.PORT ?? "3000", "PORT", 1, 65535);
const maxBodyBytes = integer(
  process.env.FINGER_MAX_BODY_BYTES ?? String(10 * 1024 * 1024),
  "FINGER_MAX_BODY_BYTES",
  1024,
  100 * 1024 * 1024,
);
const postContinueMs = integer(
  process.env.FINGER_POST_CONTINUE_MS ?? "0",
  "FINGER_POST_CONTINUE_MS",
  0,
  60_000,
);
const fingerEnabled = process.env.FINGER_ENABLED !== "false";
const trustConcordUserHeader = process.env.FINGER_TRUST_CONCORD_USER_HEADER === "true";
const identitySecret = process.env.FINGER_IDENTITY_SECRET;
if (!identitySecret) throw new Error("FINGER_IDENTITY_SECRET must be configured");

const dataDirectory = path.resolve(process.env.FINGER_DATA_DIR ?? "var/finger");
const databasePath = path.resolve(
  process.env.FINGER_DATABASE ?? path.join(dataDirectory, "finger.sqlite"),
);
const objectDirectory = path.resolve(
  process.env.FINGER_OBJECT_DIR ?? path.join(dataDirectory, "objects"),
);
mkdirSync(dataDirectory, { recursive: true, mode: 0o700 });
mkdirSync(path.dirname(databasePath), { recursive: true, mode: 0o700 });
mkdirSync(objectDirectory, { recursive: true, mode: 0o700 });

const versions = resolveVersions();
const repository = new FingerSqliteRepository(databasePath);
const objectStore = new FileObjectStore(objectDirectory);
const persistence = new FingerPersistence({ repository, objectStore });
const store = new PersistentFingerStore(persistence, versions);
const ingestionService = createFingerIngestionService({ store, versions });
const fingerHandler = createFingerHttpHandler({
  ingestionService,
  identitySecret,
  maxBodyBytes,
  secureCookies: process.env.NODE_ENV === "production",
  getAuthenticatedUserId: trustConcordUserHeader
    ? (request) => request.headers["x-concord-user"]
    : undefined,
  onIngestionError(error) {
    console.error("Finger ingestion failed", error);
  },
});

function json(response, status, value) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(value));
}

function serveStatic(request, response, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  const requested = pathname === "/" ? "/index.html" : pathname;
  let decoded;
  try {
    decoded = decodeURIComponent(requested);
  } catch {
    return false;
  }
  const candidate = path.resolve(PUBLIC_DIR, `.${decoded}`);
  if (!candidate.startsWith(`${PUBLIC_DIR}${path.sep}`)) return false;
  if (!existsSync(candidate) || !statSync(candidate).isFile()) return false;
  response.writeHead(200, {
    "Content-Type": MIME.get(path.extname(candidate)) ?? "application/octet-stream",
    "Cache-Control": decoded === "/index.html" ? "no-store" : "public, max-age=300",
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(candidate).pipe(response);
  return true;
}

const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (request.method === "GET" && url.pathname === "/health") {
    return json(response, 200, { ok: true, finger: fingerEnabled });
  }
  if (request.method === "GET" && url.pathname === "/api/finger/config") {
    return json(response, 200, {
      enabled: fingerEnabled,
      fingerVersion: versions.finger,
      concordVersion: versions.concord,
      contactMaxMs: 10_000,
      closeDelayMs: 3_000,
      postContinueMs,
    });
  }
  if (url.pathname === "/api/finger/sessions") {
    if (!fingerEnabled) {
      // Keep the caller's flow non-blocking even when collection is disabled.
      return json(response, 202, { accepted: true });
    }
    return fingerHandler(request, response);
  }
  if (serveStatic(request, response, url.pathname)) return;
  response.writeHead(404, { "X-Content-Type-Options": "nosniff" });
  response.end();
});

server.listen(port, () => {
  console.log(`Concord Finger listening on http://localhost:${port}`);
});
