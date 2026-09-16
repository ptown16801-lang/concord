import { createServer } from "node:http";
import path from "node:path";
import {
  createFingerHttpHandler,
  createFingerIngestionService,
  FileObjectStore,
  FingerPersistence,
  FingerSqliteRepository,
  PersistentFingerStore,
  resolveVersions,
} from "./finger/index.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const identitySecret = process.env.FINGER_IDENTITY_SECRET;
if (!identitySecret) throw new Error("FINGER_IDENTITY_SECRET must be configured");

const dataDirectory = path.resolve(
  process.env.FINGER_DATA_DIR ?? path.resolve("var/finger"),
);
const versions = resolveVersions();
const persistence = new FingerPersistence({
  repository: new FingerSqliteRepository(
    process.env.FINGER_DATABASE ?? path.join(dataDirectory, "finger.sqlite"),
  ),
  objectStore: new FileObjectStore(
    process.env.FINGER_OBJECT_DIR ?? path.join(dataDirectory, "objects"),
  ),
});
const store = new PersistentFingerStore(persistence, versions);
const ingestionService = createFingerIngestionService({
  store,
  versions,
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
