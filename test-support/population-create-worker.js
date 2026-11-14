import { parentPort, workerData } from "node:worker_threads";
import { PopulationRegistry } from "../src/population/index.js";

const registry = new PopulationRegistry(workerData.filename);
parentPort.postMessage({ ready: true });
parentPort.once("message", () => {
  try {
    registry.createIdentity(workerData.creation);
    parentPort.postMessage({ status: "created" });
  } catch (error) {
    parentPort.postMessage({ status: "rejected", message: error.message });
  } finally {
    registry.close();
  }
});
