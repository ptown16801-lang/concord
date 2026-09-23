# Retired dispatch policy

PR #16's planner includes the same retired gate implementation. It is excluded
from the JON-141 integration candidate as well; future planning work must use the
current policy and must not import those gates transitively.

The `qa/dispatch` validator, profiles, assignment/observation templates, and policy tests proposed in PR #11 (`3465d56bb133959443cee18c4e8404dd163c074d`) are retired workflow artifacts. They were never incorporated into the default branch and are intentionally not imported here. Their `ready`/`blocked` reports, shared-profile requirements, saved runtime/environment evidence, `delivery.native` requirement, and mandatory JON-90 gate must not gate normal Linear work.

Use the [runtime compatibility check](../workflow/README.md) for Node >=22.5, in-memory `node:sqlite`, and local checkout/HEAD reporting. It accepts Node 24 without saved-default or native-delivery proof. No replacement dispatch approval packet is required.

Retiring this proposed workflow policy does not grant product authorization, change provider or filesystem permissions, or relax production security controls. PR #11 remains unchanged as provenance; its validator and tests are not part of the active test suite.
