import { createServer } from "node:http";
import path from "node:path";
import {
  createFingerHttpHandler,
  createFingerIngestionService,
  FileFingerStore,
  resolveVersions,
} from "./finger/index.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const identitySecret = process.env.FINGER_IDENTITY_SECRET;
if (!identitySecret) throw new Error("FINGER_IDENTITY_SECRET must be configured");

const store = new FileFingerStore(
  process.env.FINGER_DATA_DIR ?? path.resolve("var/finger"),
);
const ingestionService = createFingerIngestionService({
  store,
  versions: resolveVersions(),
});
const fingerHandler = createFingerHttpHandler({
  ingestionService,
  identitySecret,
  secureCookies: process.env.NODE_ENV === "production",
  onIngestionError(error) {
    console.error("Finger ingestion failed", error);
  },
});

const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname === "/api/finger/sessions") return fingerHandler(request, response);
  response.writeHead(404);
  response.end();
});

server.listen(port, () => {
  console.log(`Concord listening on port ${port}`);
});
