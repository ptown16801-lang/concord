import { BallotBox, CONSTITUTIONAL_SOURCE } from "../src/governance/index.js";

const [filename, choice] = process.argv.slice(2);
const box = new BallotBox(filename, {
  authorizeSubmission: () => ({
    onOpeningRoll: true,
    eligible: true,
    closesAt: "2026-09-16T12:00:00.000Z",
  }),
  now: () => new Date("2026-09-16T11:00:01.000Z"),
});
const deadline = setTimeout(() => {
  box.close();
  process.exit(1);
}, 10_000);

process.once("message", (message) => {
  if (message !== "submit") throw new Error("Unexpected worker message");
  try {
    const result = box.submit({
      electionId: "election-1",
      identityId: "agent-1",
      choice,
      sourceType: CONSTITUTIONAL_SOURCE,
      submittedAt: "2026-09-16T11:00:00.000Z",
    });
    process.send({ type: "result", choice, result }, () => process.disconnect());
  } finally {
    clearTimeout(deadline);
    box.close();
  }
});
process.send({ type: "ready" });
