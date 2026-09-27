# Owner instruction — subscription-only limits

Date: 2026-09-25. Exact message timestamps unavailable. Source: current local Concord Claude setup conversation, owner J. This is a user-visible excerpt and disposition, not private reasoning.

After Linear advisory comment 190666bd-3c29-45e4-a7ff-92922100ad62, owner instructed: “Implement changes and fixes Linear recommended.”

Owner then delegated parameter selection: “Can we just come up with the sensible spending limits now? Can you just make them up and implement them? They have to be reasonable. Like one task can't use more than, you know, like two times it's expected use. But I don't know how to hardcode. Just use your best judgment.”

Owner clarified the absolute boundary: “But there's a hard limit where nothing can ever do a refill or charge more money they're just allowed to use their base subscriptions”.

Disposition under delegated judgment: freeze expected workload before launch; total ceiling 2x expectation including repairs/reviews/retries. Default expected API-list-price equivalent $3 ($2 Claude / $1 Grok), total $6 ceiling with per-provider partitions. These are usage estimates, not bills or subscription percentages. No paid usage, refills, purchased balances, top-ups, upgrades or API/PAYG fallback are allowed by any exception. Repair grants draw only on included subscription capacity. Stop at missing or >=65% provider usage (five-minute freshness), ten-minute run deadline, twelve-turn setting, one repair per defect, one-hour repair authorization, seven-day policy validity. Real ceilings remain limited by unverified provider readings and integration; no live enforcement or independent review is asserted.

Implementation selection is authorized; JON-163 OD-1–OD-4 and independent acceptance are not thereby adopted. No merge/deployment authorized. Linear advice remains advisory.

Subsequent owner clarification: “Of course I can always override this case by case if asked”. This preserves named-human case-specific authority. It does not grant an agent authority to approve paid use, treat general task approval as spending consent, or enable a recurring refill. Any exception requires the actual owner's explicit scope, amount, permitted action and expiry; a model-supplied owner label is insufficient. Current configuration remains $0 additional usage. This component provides no authenticated human approval transport or paid execution path; a separately verified case approval is required before implementing such an action.
