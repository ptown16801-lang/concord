# S26 specialist qualification template

Issue: JON-230

This template is for an **independent, claim-specific review** after JON-228/JON-229 evidence exists.

## Reviewer eligibility

Record:
- reviewer/provider/model family;
- session identity;
- role;
- prior contributions;
- artifact revisions reviewed;
- tools/permissions;
- any shared lineage or infrastructure relevant to independence.

If eligibility is missing or unverifiable, return BLOCKED or INCONCLUSIVE.

## Exact candidate identity

- task class:
- model:
- model revision/hash:
- runtime:
- runtime revision:
- backend:
- device:
- benchmark packet revision/hash:
- result corpus revision/hash:

## Verification checklist

- [ ] exact model/runtime/backend identity verified
- [ ] actual device backend verified rather than inferred
- [ ] frozen thresholds predate result inspection
- [ ] sample quality measurements recomputed
- [ ] hard failures recomputed
- [ ] host/S26 comparison uses equivalent inputs
- [ ] USB/load overhead included
- [ ] timeout/disconnect/fallback evidence checked
- [ ] licensing constraints checked
- [ ] model quality distinguished from device efficiency
- [ ] unsupported claims and missing evidence called out

## Verdict

Return exactly one:
- PASS
- REJECT
- BLOCKED
- INCONCLUSIVE

### Allowed task

Describe the exact task this verdict covers.

### Prohibited uses

List uses this verdict does not authorize.

### Required supervision / validation

State mandatory host-side checks and human/independent-review requirements.

### Revalidation triggers

Examples:
- model/revision change;
- runtime/backend change;
- preprocessing change;
- benchmark corpus change;
- material task-distribution change;
- security/privacy policy change;
- device/firmware change affecting backend behavior.

## Decision boundary

This review is a recommendation. Production routing requires named-human disposition.

Decision impact: No decision change.
