import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assertInvocationReady,
  sealEnvelope,
} from "../src/ai/bounded-envelope.js";

test("JON-202 frozen Finger packet is validator-clean and bounded", async () => {
  const packet = JSON.parse(await readFile(
    new URL("../docs/qualification/jon-202-finger-deepseek-packet.json", import.meta.url),
    "utf8",
  ));

  const sealed = sealEnvelope(packet);
  assert.equal(sealed.validation.valid, true, sealed.validation.errors.join("\n"));
  assert.equal(sealed.validation.derived_context_complete, true);
  assert.equal(assertInvocationReady(sealed).envelope_hash, sealed.envelope_hash);
  assert.equal(packet.material_dependencies.some((entry) => entry.status === "unresolved"), false);
  assert.equal(packet.constraints.prohibited_actions.includes("full_repository_access"), true);
  assert.equal(packet.data_handling.credential_exclusion, true);
  assert.equal(packet.data_handling.authoritative_state_exclusion, true);
  assert.equal(packet.stop_condition.includes("Do not invoke DeepSeek"), true);
  assert.equal(packet.lineage.source_commit, "4b6e41fd8d211746a81e870955e34475e66d02a3");
});
