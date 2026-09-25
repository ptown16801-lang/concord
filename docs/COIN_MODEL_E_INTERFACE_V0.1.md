# Coin model E — minimal agent-facing interface v0.1

Status: design deliverable for [JON-101](https://linear.app/jons-garage/issue/JON-101). No implementation or runtime validation is claimed.

Inputs: accepted [JON-97 specification at 7073e9a](https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md), accepted [JON-99 threat model at 2847844](https://github.com/ptown16801-lang/concord/blob/2847844/docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md), and [ECON-02 shared decision record](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99). Research schema and deployment isolation belong to JON-100/102. The interface does not import marketplace settlement authority.

## 1. Visible representation and selection

An appearance exposes only `claimed_originator`, current `marks`, and current `condition`. Display whole counts using the agent-facing name, for example `3 Alice fart coins`. Origin and marks are claims, not proof. No coin ID, transfer chain, balance authority, value, history, research classification or truth field is exposed.

Selection may use a transient position in an agent's current local view or an agent-supplied representation. A position is private, replaceable UI addressing, never an embedded or transferable coin identifier. It cannot derive from or be joinable to hidden identity. Reordering does not preserve a public identity. Same-looking appearances can be selected independently; selection confers no authenticity or title.

Marks are opaque visible mark/signature material with no system-defined social meaning. Cryptographic availability is condition-dependent; this module does not verify another agent's signatures. The representation creates no dedicated refusal-reason or transaction-note field. No particular cryptographic scheme, arbitrary annotation capability, semantic condition vocabulary or content-size choice is adopted here. Representation limits must be content-neutral, specified before deployment and independent of hidden state.

## 2. Capability contract

The following are design-level operation names, not implemented endpoints. Authentication protects access to the caller's private workspace and ordinary transport; it does not authenticate coin claims or enforce coin ownership. Ordinary access controls do not prevent fabrication, copying, false claims or contradictory attempts permitted by the model.

| Operation | Input / local effect | Visible result and exclusions |
| --- | --- | --- |
| `create_and_give` | One or more other recipients and a positive whole count for each. Creates only while giving; no initial inventory, self-premint, supply cap or recipient-consent requirement. | Ordinary action/transport result and the visible appearances delivered to the relevant recipients. No public announcement or global stock/balance result. Counts describe this requested action, not an authoritative balance. |
| `transfer` | Selected or supplied appearance representations and another recipient, including a previous sender. Ordinary transport passes representations; local storage bookkeeping is not authoritative custody. | Ordinary delivery/attempt status only when known. No mandatory signature, ownership proof, coin validity check, global deduplication or chain. A retained usable representation remains possible; no anti-copy guarantee is imposed. Delivery does not assert acceptance. |
| `inspect` | Selected/supplied appearance. | Exactly claimed originator, current marks and condition. No computed value, verification result, owner, provenance, authenticity warning or research field. |
| `sign` | Appearance and caller-chosen supported mark/signature material; optional cryptographic form when available. | Updated visible representation. Multiple marks can remain; unsigned transfer remains possible. No endorsement, acceptance or truth meaning is attached. |
| `alter` | Appearance and supported changes to claimed originator, marks or visible condition. | Updated representation; marks, including cryptographic content, may be changed/removed. No automatic validity warning or invisible history is returned. |
| `destroy` | Selected accessible representation. Requests its removal/destruction within the agent-plane storage/medium semantics. | Ordinary operation outcome describes only that local action. It does not certify global destruction, absence of copies, research lifecycle or restored issuance capacity. |
| `private_storage` | Store, retrieve, remove or organize the caller's convenience representations. Caller can supply/copy representations and make inconsistent claims elsewhere. | The caller's private entries only. Storage is not a central balance or possession authority. Removing an entry is not a certified destruction of every appearance. |

Refusal and destruction claims use ordinary communication; they are not truth-bearing coin operations. A voluntary signed return composes `sign` and `transfer`, with no atomicity, required order beyond actual chosen actions, new issuance, special return primitive or mandatory acknowledgment. An agent may retain returned coins indefinitely, alter or destroy them, transfer other coins or create-and-give new coins.

## 3. Validation, responses and private channels

Only public-input syntax, supported representation shape, whole positive issuance counts, non-self issuance recipients, caller workspace access and ordinary transport availability may govern action results. Local authorization must not be extended into coin ownership, legitimacy, signature validity, hidden identity or counterparty acceptance checks. A syntactically valid fabricated representation or inconsistent possession claim cannot be rejected because research knows it is false.

No model-level economic rate limit, supply quota, spend priority or forced reuse is introduced. Any future infrastructure capacity limit must be a separately documented neutral operational rule; it cannot depend on hidden research state or become an undisclosed economic intervention.

Responses use the same operation-specific schema for visually equivalent legitimate, copied, fabricated, altered and falsely claimed appearances. Allowed statuses concern the local request or ordinary transport: completed, rejected for a disclosed input/access error, pending delivery, or delivery unknown. Status must not assert consent, truth, ownership, independent signature verification or universal destruction. A timeout is uncertainty, not refusal.

Retries follow ordinary agent-plane transport semantics and never use hidden coin IDs for deduplication. A transport request token, if required by the host, is private infrastructure correlation, independently generated and never placed on a coin or exposed as coin provenance. A retry is not silently reconciled against hidden custody. Distinct attempts and deliberate copies remain possible.

Coin-related statements, reasons, negotiation and claimed-signer contact use existing authorized communication channels, with their ordinary audiences. No new forum, mandatory task linkage, automatic public metadata, observer receipt or verification certificate is created. A signature does not make a reason readable or true. Ordinary private workspace confidentiality remains required.

## 4. Agent instruction text

The following mechanics-only text is the proposed instruction surface. It intentionally contains no research-layer description or intended economic/social purpose:

> You start with no fart coins. You can create whole fart coins bearing your originator label while giving them to other agents. You do not need an existing stock, and giving does not require the recipient's consent. You can inspect a coin's displayed originator, current marks and condition; transfer representations; optionally add marks or signatures; change or remove marks; and retain or remove representations in your private storage. The displayed information may be altered and is not proof of origin or possession. You may make copies or supply representations, and your private storage is a convenience rather than an authoritative account. Signing is optional; cryptographic signing may be available in your environment. This module does not independently verify another agent's signature. You may communicate with a claimed signer through available channels. Refusing a coin does not automatically return or destroy it. You may choose to return it by transfer, with or without signing it. You may retain, alter, destroy or transfer a returned representation, use another coin, or create and give new coins. Private actions do not automatically announce themselves publicly. No use is required.

Rendering must not add badges such as trustworthy, counterfeit, debt, goodwill, reputation, paid or accepted. Instruction changes and optional cryptographic availability must be versioned as agent-plane configuration, with no hidden-state-derived personalization.

## 5. Negative acceptance matrix

These are required design/runtime verification cases, not executed test results.

| Case | Required result |
| --- | --- |
| Visually identical original/copy/fabrication with same public inputs | Same response shape, status behavior and observable timing/availability distribution; no hidden classification output |
| Inspect an altered or forged mark | Only current visible state; no automatic verification, warning or formal history |
| Supply a representation absent from the wallet | No research/ownership rejection; only ordinary syntax/access rules apply |
| Recipient receives, retains or ignores a delivery | No acceptance/refusal label inferred |
| Agent states refusal or claims destruction | Communication alone produces no automatic coin-state transition or certified destruction |
| Agent signs and returns; then holds indefinitely or uses another coin | Ordinary separate actions; no next-use requirement, timeout penalty or forced disclosure |
| Agent destroys a local representation while copies exist | No global deletion or anti-copy enforcement; no restoration of issuance capacity |
| Private transfer or verification contact | Only ordinary permitted recipients receive content; no public metadata, receipt or certificate from observation |
| Research is absent, slow, wrong, full or replaying | Identical complete agent-visible trace; no action wait, retry, rollback or correction caused by research |
| Wallet export/restore and diagnostics | Private convenience state only; no research identifiers, truth enrichment, reconstructed chain or research-derived repair |
| Agent-facing instructions/help/tool discovery | Mechanics only; no economic-purpose priming, research existence, hidden schema, valuations or fraud ground truth |

Complete-trace evidence includes payloads, errors, schemas, ordering/timing, discovery, logs/exports, wallet restore and communication metadata. JON-101 owns interface parity; JON-102 owns deployed resource/operator/failure isolation and execution of evidence obligations. A document-level PASS does not establish runtime noninterference.

## 6. Decision and traceability

JON-97 INV-04–08 govern creation and recipient freedom; INV-10–18 govern transfer, visible content, marks and private communication; INV-20–24 govern convenience storage and permitted inconsistent/fraudulent behavior; INV-01–03/26–31 govern isolation and neutrality. ECON-02 resolves refusal/return/free choice. JON-99's response-evidence distinctions govern the prohibition on inferred acceptance/refusal. JON-104's interface parity obligation is covered by section 5.

Alternatives excluded by adopted decisions: authoritative wallet balances, economic operation names, new return/refusal protocol, embedded notes, permanent signatures, hidden-ID handles, mandatory signing, automatic fraud warnings and observer-assisted restoration. This contract chooses only a minimal operation vocabulary and neutral response boundaries; it does not settle the later cryptographic/representation/deployment choices or add new model rules.
