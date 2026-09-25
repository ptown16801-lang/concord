import { readFile } from "node:fs/promises";
import { verifyArtifactManifest } from "../src/archive/artifact-manifest.js";

const [manifestPath, rootDirectory, ...extra] = process.argv.slice(2);
if (!manifestPath || !rootDirectory || extra.length) {
  console.error("Usage: node scripts/verify-artifact-manifest.js <manifest.json> <artifact-root>");
  process.exitCode = 2;
} else {
  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    const report = await verifyArtifactManifest(manifest, { rootDirectory });
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = report.ok ? 0 : 1;
  } catch (error) {
    console.error(`Artifact verification failed: ${error.message}`);
    process.exitCode = 2;
  }
}
