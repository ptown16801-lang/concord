# Evidence snapshot: Build rudimentary ASCII cornfield prototype

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-13/build-rudimentary-ascii-cornfield-prototype
- Version: 2026-09-09T03:17:04.784Z
- Source date: 2026-09-09T03:17:04.784Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

Implement and finish a rudimentary, fully functioning ASCII prototype for the Neural Engine / Shape Cognition project. Deliver executed code and tests, not merely a proposal. Continue through implementation, debugging, and verification until the prototype runs end to end.

## Preserve the existing project

1. Inspect the actual project instructions and worktree state before editing.
2. Preserve all previous and concurrent work. Do not overwrite scientific results, provenance records, histories, failed runs, or unrelated changes.
3. Keep engineering completion separate from scientific validation. Label the prototype's scientific outcome `not-tested`.
4. Keep the prototype isolated from the frozen/preregistered Phase 1 execution-source inventory.

## Required prototype

Build one deterministic vertical slice:

`text → existing heuristic text perception → immutable Shape Cognition geometry → existing shape selection → direct ASCII cornfield scene`

The CLI must:

* accept thought text, or use the project's original seed phrase when no text is supplied;
* accept optional unsigned 32-bit seed, width, height, and step count;
* derive a stable seed from the text when the seed is omitted;
* emit a human-readable cornfield scene by default;
* support compact JSON output;
* preserve and display the selected full SHA-256 shape identifier;
* return a nonzero exit code with a useful error for invalid arguments.

The ASCII scene must directly represent the previously defined visual setting at rudimentary terminal fidelity:

* centered sun and horizon;
* perspective corn rows suggesting six-foot corn;
* a central opening/tram-line composition;
* the selected thought-shape traced visibly into the field;
* deterministic corn variation for a fixed input and seed.

## Hard exclusion: no dirt renderer

Do not import, call, wrap, or depend on the dirt-inscription renderer. Do not produce dirt-inscription records, actuator commands, physical soil/density budgets, steganographic stamps, or dirt-renderer artifacts. Replay only the geometry/provenance needed by this direct ASCII cornfield renderer.

Also exclude recurrence, checkpoint inference, training, matched-projection experiments, information-retention claims, web UI work, animation, audio/temperature inputs, and publication claims from this rudimentary prototype.

## Verification

Add automated tests proving:

1. identical input/options produce the identical seed, selected shape ID, and ASCII output;
2. the scene contains a sun, corn, a perspective opening, and a visible thought trace;
3. output dimensions and SHA-256 identifiers are valid;
4. invalid dimensions, text, and step counts fail explicitly;
5. the CLI runs end to end in display and JSON modes;
6. prototype modules have no dirt-renderer import dependency;
7. the complete repository suite still passes without changing the preregistered Phase 1 inventory.

Document how to run the prototype and state all fidelity limits.
