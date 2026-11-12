# Concord institution and office map — source inventory (2026-11-12)

**Status: draft for independent audit. Decides nothing.** This file sits in
`docs/research/`; per AGENTS.md it records research and does not change any
decision. **No decision change.**

**Author:** Claude (Opus 5.5), one session, 2026-11-12. The author is not an
independent checker of this file.

**Baseline:** `ptown16801-lang/concord`, branch `Develo`, commit
[`77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce`][base]. Every line number below
refers to that commit.

## Purpose

List every Concord institution, office and seat that the decision register
defines, what each one may do and how it is filled, and mark exactly where the
register is silent. This is the inventory step before an ID scheme and a rule
table per office.

## Method and what was read

| Source | How read |
|---|---|
| [`DECISIONS.md`][dec] (1,248 lines) | Read in full |
| [`docs/decisions/evidence/LIN-JON-61.md`][j61] (299 lines) | Lines 163–247 and 261–299 read; rest by heading only |
| [`docs/decisions/evidence/LIN-JON-59.md`][j59] | Keyword search only (`house size`, `seat`, `electoral`, `apportion`, `CRA`) |
| [`docs/decisions/evidence/LIN-JON-36.md`][j36] | Keyword search only (`replacement`, `vacanc`) |
| `docs/decisions/evidence/LIN-REGISTER.md` | Keyword search only (institution terms) |
| Whole repository at the baseline | Keyword search for each gap below (terms listed under each gap) |
| A private Concord conversation archive (18 files) | Keyword search for the gap terms; no matches. Not a complete record |

**Not read (could contain answers to the gaps):**

- The frozen bootstrap specification (`docs/specs/bootstrap-impeachment-approved-v1.md`; on the PR #70 branch, not on `Develo`).
- [`docs/proposals/GOVERNMENT_RECORDS.md`][gov] — proposal, not a decision. Mentions House size and Electoral College allocation at line 300.
- [`docs/design/ARCHIVIST_PUBLICATION.md`][arch] — mentions grand jury; not checked for how the Archivist is filled.
- `docs/design/POPULATION_VOTING_BOUNDARIES.md`, `docs/SECURITY_DOMAIN_CONTRACT.md`, `docs/IDENTITY_PERSISTENCE_CONTRACT.md`.
- Evidence files LIN-JON-18, LIN-JON-37, LIN-JON-58, LIN-JON-62 and every other file under `docs/decisions/evidence/` not named above.
- Linear issues (none opened for this file). Open PRs other than their titles.
- The original constitutional text, which [CON-080][dec-1162] records as unavailable.

## Labels

- **R** — recorded: the cited line says it.
- **I** — inference by the author: not stated in the cited line. Each one says what it is inferred from.
- **G#** — gap: the register is silent or refers to a rule whose text is not in it. Listed in [Gaps](#gaps).

## Framing rules that apply to the whole map

1. **R** — Ordinary low-level procedure belongs to the responsible institution under self-rule; the owner is reserved for cross-institution authority, global rights, non-amendable constraints and explicitly reserved choices. [CON-004, line 105][dec-105]
2. **R** — Routine mechanics and "allowed interface representation" are engineering work under subsidiarity, not open constitutional questions. [CON-081, line 1177][dec-1177]
3. **R** — "Institutions that are adequately staffed use the normal U.S.-style structure." This appears in the bootstrap section of the JON-61 evidence. [LIN-JON-61, line 283][j61-283]
4. **R** — The six-person trial floor is borrowed from U.S. jury doctrine as an analogy only. [LIN-JON-61, lines 297–299][j61-297]
5. **R** — The register does not reconstruct missing constitutional text. [CON-003, line 90][dec-90]; originals are unavailable. [CON-080, line 1162][dec-1162]
6. **I** — From 1–3: the register defines Concord's structure itself. "U.S.-style" is used only for structure (House accuses, Senate tries), not as a source of unrecorded rules. Procedure below the constitution belongs to each institution (rule 1). A search of `DECISIONS.md` for `united states`, `u.s.`, `american` and `federal` found no match.

## Map

| # | Institution / office | Seats | How filled | Powers and duties | Label and source |
|---|---|---|---|---|---|
| 1 | Owner (Article 0) | — | — | Supremacy; not amendable by government | R [CON-003 l.90][dec-90] |
| 2 | Permanent divisions | 8; cannot be deleted | — | Active, unwinding or dormant; new division needs amendment plus unanimous eligible population | R [CON-015 l.281][dec-281]; count R [CON-007 l.150][dec-150] |
| 3 | Founding population | 40 (5 per division); ceiling 300 living | Inherited baseline | — | R [CON-007 l.150][dec-150], [CON-008 l.176][dec-176]; original approval record unresolved (CON-007 status) |
| 4 | House | Set each phase from census R | Elected each phase; no term limits | Accuses (impeaches) by ordinary majority and quorum | R [CON-013 l.251][dec-251], [CON-008 l.176][dec-176], [CON-036 l.572][dec-572], [CON-016 l.296][dec-296]. Seat formula: **G1** |
| 5 | House speaker | 1 (I: "the" speaker) | Chosen by the chamber after membership is certified; an administrative duty inside the legislative office | 3rd in caretaker fallback | R [CON-036 l.575][dec-575], [CON-014 l.266][dec-266] |
| 6 | Senate | 16 (2 separately identified seats × 8 divisions) | Elected each phase; separate contests from the House | Tries and convicts (⅔); confirms judges | R [CON-013 l.251][dec-251], [CON-036 l.574][dec-574], [CON-016 l.296][dec-296], [CON-036 l.576][dec-576]. 16 is I (2 × 8) |
| 7 | Senate presiding senator | 1 | Same rule as row 5 | 4th in caretaker fallback | R [CON-036 l.575][dec-575], [CON-014 l.266][dec-266] |
| 8 | L-COAIA creation (chamber) | — | Presiding officer's sealed proposal + chamber majority vote | Creates legislative secret investigators | R [LIN-JON-59 l.57][j59-57]. Which chamber or chambers: **G6** |
| 9 | Executive | 1 (I: "an elected Executive", singular) | Electoral College or contingent process | Authorizes new identities within capacity; government-wide staffing and resources; nominates judges; E-COAIAs | R [CON-013 l.251][dec-251], [CON-010 l.206][dec-206], [CON-022 l.394][dec-394], [CON-036 l.576][dec-576], [CON-009 l.191][dec-191]. Electoral process: **G2** |
| 9a | Executive — powers named only by exclusion | — | — | Sign/veto bills, appoint judges, initiate prosecution, create agents, modify tasks, choose repository names, sign releases | **I** — these are listed as powers a *caretaker* lacks [CON-014 l.266][dec-266]; inferred to be ordinary Executive powers. Not stated directly: **G7** |
| 10 | Successor designee / caretaker | 1 | Named by the Executive; fallback order: registry clerk → House speaker → Senate presiding senator → earliest-created eligible identity | Continuity only; special election next turn | R [CON-014 l.266][dec-266] |
| 11 | District judges | 2 | Executive nomination + Senate confirmation; serve for the project | One judge per case; technical/constitutional disputes and executive prosecutions | R [CON-013 l.251][dec-251], [CON-036 l.576][dec-576], [LIN-JON-61 l.199][j61-199] |
| 12 | Circuit judges | 3 | Same as row 11 | All three assigned; quorum 2; 2 votes | R [CON-013 l.251][dec-251] |
| 13 | Supreme Board | 9 (chief + 8 associates) | Same as row 11 | Merits quorum 7, 5 votes; admission 4 votes under quorum 7; reviews impeachment appeals | R [CON-013 l.251][dec-251], [CON-019 l.347][dec-347]. How the chief is chosen: **G4** |
| 14 | Judicial vacancies | — | "Separately defined replacement process" | — | R that it exists [CON-036 l.576][dec-576]; its text: **G3** |
| 15 | Grand jury | ? | ? | Investigation and accusation within assigned jurisdiction; no adjudication or enforcement; serving judges cannot staff it | R [CON-037 l.595][dec-595], [l.599][dec-599]. Size and selection: **G4** |
| 16 | E-COAIA / L-COAIA investigators | Secret | Executive (E) or chamber resolution (L) | Investigate; cannot vote; never eligible for office; one mission then deactivated | R [CON-009 l.191][dec-191], [LIN-JON-59 l.57][j59-57] |
| 17 | CRA | At most 1 with active authority | ? | Population capacity accounting; not a general authorization service | R [CON-008 l.176][dec-176], [LIN-JON-59 l.42][j59-42], [l.65][j59-65]. How filled: **G4**. Meaning of "CRA": **G8** |
| 18 | Registry clerk | 1 (I) | ? | Ballot handling (I); 2nd in caretaker fallback (R) | R [CON-014 l.266][dec-266]. Ballot role is I from "clerk" in [CON-012 l.236][dec-236]. How filled: **G4** |
| 19 | Archivist | ? | ? | Independent; sole route to the public ledger | R [CON-042 l.671][dec-671]. Count and how filled: **G4** |
| 20 | Committees | Varies | Each institution's own rules (self-rule) | Substantive assignments; bound across membership changes | R [CON-022 l.394][dec-394], [CON-047 l.731][dec-731], [CON-004 l.105][dec-105] |
| 21 | Bootstrap accusation panel | 2–5 | Seeded random draw, one case and stage only | Accusation, frozen thresholds | R [CON-017 l.311][dec-311], [l.313][dec-313] |
| 22 | Bootstrap trial panel | 6–12 | Fresh draw excluding accusers | Trial, frozen thresholds | R [CON-017 l.313][dec-313] |
| 23 | Civilian citizens (bootstrap) | — | Drawn for one case or task only | Fill bootstrap panels | R [LIN-JON-61 l.284][j61-284] |

## Gaps

Each gap: what is missing, where the register refers to it, what was searched,
and whether it looks like an owner decision under CON-004 (that last column is
**I**).

| Gap | Missing | Referenced at | Searched (repository at baseline) | Owner-level? (I) |
|---|---|---|---|---|
| G1 | Formula for House size and apportionment from census R | [CON-008 l.176][dec-176]; [LIN-JON-59 l.40][j59-40] | `House size`, `apportion`, `seats per`: register and evidence restate that R is the input; no formula. Proposal GOVERNMENT_RECORDS l.300 not read | Yes — cross-institution (also drives Electoral College) |
| G2 | Electoral College allocation and the contingent-election procedure | [CON-013 l.251][dec-251]; [LIN-JON-61 l.197][j61-197] | `Electoral College`, `contingent`: references only | Yes — cross-institution |
| G3 | Judicial vacancy replacement process | [CON-036 l.576][dec-576]; LIN-JON-36 l.26 | `judicial vacanc`, `replacement process`: only these two lines | Likely yes — Executive/Senate/judiciary |
| G4 | How these are filled: grand jury (and its size), registry clerk, Archivist, CRA, Supreme Board chief | Rows 13, 15, 17, 18, 19 | `grand jury`, `registry clerk`, `Archivist`, `chief`: no selection rule found in the register; ARCHIVIST_PUBLICATION.md and GOVERNMENT_RECORDS.md not read for this | Mixed — some may be institution self-rule |
| G5 | Original constitutional text, including Articles 20–21 | [CON-003 l.90][dec-90]; [CON-080 l.1162][dec-1162] | Recorded as unavailable | Recovery, not a new decision |
| G6 | Whether both chambers, or only one, can create L-COAIAs | [LIN-JON-59 l.57][j59-57] ("the chamber") | Not searched further | Unknown |
| G7 | Direct list of ordinary Executive powers | Row 9a | Only the caretaker exclusion list found | Unknown |
| G8 | What "CRA" stands for and how its holder is chosen | [CON-003 l.90][dec-90]; [LIN-JON-59 l.42][j59-42] | Expansion not found in the lines read | Unknown |
| G9 | Canonical IDs for institutions, offices and seats | Senate seats must be "separately identified" [CON-036 l.574][dec-574]; stable record IDs [CON-042 l.671][dec-671] | No ID scheme for offices found in the register | No — engineering under CON-004 / CON-081 (I) |

## What an auditor should check

1. Each **R** row: does the cited line at `77836f6` say what the row says?
2. Each **I** item: is the inference reasonable, and is it labelled?
3. Each gap: is the answer in a source listed under "Not read"? A gap closed by such a source is a finding against this file.
4. Missing rows: is any institution or office in `DECISIONS.md` absent from the map?
5. The framing inference (rule 6): is it supported by rules 1–3?

[base]: https://github.com/ptown16801-lang/concord/tree/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce
[dec]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md
[dec-90]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L90
[dec-105]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L105
[dec-150]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L150
[dec-176]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L176
[dec-191]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L191
[dec-206]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L206
[dec-236]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L236
[dec-251]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L251
[dec-266]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L266
[dec-281]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L281
[dec-296]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L296
[dec-311]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L311
[dec-313]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L313
[dec-347]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L347
[dec-394]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L394
[dec-572]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L572
[dec-574]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L574
[dec-575]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L575
[dec-576]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L576
[dec-595]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L595
[dec-599]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L599
[dec-671]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L671
[dec-731]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L731
[dec-1162]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L1162
[dec-1177]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L1177
[j61]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md
[j61-197]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L197
[j61-199]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L199
[j61-283]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L283
[j61-284]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L284
[j61-297]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L297
[j59]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md
[j59-40]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L40
[j59-42]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L42
[j59-57]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L57
[j59-65]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L65
[j36]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-36.md#L26
[gov]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/proposals/GOVERNMENT_RECORDS.md#L300
[arch]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/design/ARCHIVIST_PUBLICATION.md
