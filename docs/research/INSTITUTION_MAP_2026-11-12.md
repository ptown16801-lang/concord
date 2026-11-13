# Concord institution and office map — source inventory (2026-11-12)

**Status: revision 4. Decides nothing.** This
file sits in `docs/research/`; per AGENTS.md it records research and does not
change any decision. **No decision change.**

Revision 1 (commit `154afcb`) received a REVISE verdict with six findings in the
[JON-304 review][review1]. The owner accepted it. Revision 2 fixes those
findings; see [Changes in revision 2](#changes-in-revision-2). Revision 2
(commit `e54aaab`) received a REVISE verdict with two findings in the
[JON-305 review][review2]; revision 3 fixes those; see
[Changes in revision 3](#changes-in-revision-3). Revision 3 (commit `cc54532`)
received an ACCEPT verdict with three P3 notes in the [JON-306 review][review3].
Revision 4 fixes those notes and one further omission; the owner treated it as
small, low-risk work without a further check. See
[Changes in revision 4](#changes-in-revision-4).

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
| Revision 2 only: [LIN-JON-62 l.56][j62-56], [LIN-JON-59 ll.52–57][j59-52], [LIN-JON-61 l.222][j61-222], [LIN-BOOTSTRAP l.27][boot-27], [`DECISIONS.md` ll.571, 315][dec-571] | Lines cited by the revision 1 review; each read before use here |
| Revision 3 only: [LIN-JON-61 ll.216–222][j61-216], [`DECISIONS.md` ll.221, 236, 266][dec-221] | Lines cited by the revision 2 review; each read before use here |
| Revision 4 only: [LIN-REGISTER l.189][reg-189], [`DECISIONS.md` l.577][dec-577] | Each read before use here |

**Not read (could contain answers to the gaps):**

- The frozen bootstrap specification (`docs/specs/bootstrap-impeachment-approved-v1.md`; on the PR #70 branch, not on `Develo`).
- [`docs/proposals/GOVERNMENT_RECORDS.md`][gov] — proposal, not a decision. Mentions House size and Electoral College allocation at line 300.
- [`docs/design/ARCHIVIST_PUBLICATION.md`][arch] — mentions grand jury; not checked for how the Archivist is filled.
- `docs/design/POPULATION_VOTING_BOUNDARIES.md`, `docs/SECURITY_DOMAIN_CONTRACT.md`, `docs/IDENTITY_PERSISTENCE_CONTRACT.md`.
- Evidence files LIN-JON-18, LIN-JON-37, LIN-JON-58, the rest of LIN-JON-62 and LIN-BOOTSTRAP, and every other file under `docs/decisions/evidence/` not named above.
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
6. **R** — For impeachment, "the U.S. structure is an analogy for separated functions": the House impeaches and the Senate tries. [LIN-BOOTSTRAP, line 27][boot-27]
7. **I** — Scope: impeachment only. From rules 3, 4 and 6, the recorded U.S. references are analogies for impeachment's separated functions, not a source of unrecorded rules. No recorded source found here says how far the U.S. model applies to the rest of the government; rules 1–3 do not establish a government-wide reading. Ordinary procedure belongs to each institution under rule 1. A literal search of `DECISIONS.md` for `united states`, `u.s.`, `american` and `federal` found no match.

## Map

| # | Institution / office | Seats | How filled | Powers and duties | Label and source |
|---|---|---|---|---|---|
| 1 | Owner (Article 0) | — | — | Supremacy; not amendable by government | R [CON-003 l.90][dec-90] |
| 2 | Permanent divisions | 8; cannot be deleted | — | Active, unwinding or dormant; new division needs amendment plus unanimous eligible population | R [CON-015 l.281][dec-281]; count R [CON-007 l.150][dec-150] |
| 3 | Founding population | 40 (5 per division); ceiling 300 living | Inherited baseline | — | R [CON-007 l.150][dec-150], [CON-008 l.176][dec-176]; original approval record unresolved (CON-007 status) |
| 4 | House | Set each phase from census R | Elected at every phase transition or opening; no term limits | Accuses (impeaches) by ordinary majority and quorum | R [CON-013 l.251][dec-251], [CON-008 l.176][dec-176], [CON-036 l.571][dec-571], [l.572][dec-572], [CON-016 l.296][dec-296]. Seat formula: **G1** |
| 5 | House speaker | 1 (I: "the" speaker) | Selected after chamber membership is certified, as an administrative duty inside the legislative office (R). That the chamber itself selects is I (from the same line and CON-004 self-rule) | Fallback 2 for caretaker, after the designee is skipped | R [CON-036 l.575][dec-575], [CON-014 l.266][dec-266]; I [CON-004 l.105][dec-105] |
| 6 | Senate | 16 (2 separately identified seats × 8 divisions) | Elected at every phase transition or opening; separate contests from the House | Tries and convicts (⅔); confirms judges | R [CON-013 l.251][dec-251], [CON-036 l.571][dec-571], [l.574][dec-574], [CON-016 l.296][dec-296], [CON-036 l.576][dec-576]. 16 is I (2 × 8) |
| 7 | Senate presiding senator | 1 (I: "the" presiding senator) | Same as row 5: timing R, selection by the chamber I | Fallback 3 for caretaker, after the designee is skipped | R [CON-036 l.575][dec-575], [CON-014 l.266][dec-266]; I [CON-004 l.105][dec-105] |
| 8 | L-COAIA creation | — | Each chamber, for its own L-COAIAs. Requires all of: the presiding officer's exact sealed proposal; CRA capacity clearance; the chamber's ordinary quorum and ordinary majority on that exact resolution. Only valid authenticated YES ballots count toward affirmative authorization; NO, abstain, missing, malformed and rejected ballots never authorize. Counting for the threshold is separate: valid abstentions stay in B/D (CON-011, CON-012), so with D=10, five YES and five abstentions fail the strict majority of six. That CON-011/012 counting governs this chamber vote is I, from CON-011's scope "Every constitutional ballot". The House's ordinary majority is recorded as `floor(D/2)+1`, for impeachment (R); that the same formula is the "ordinary majority" for an L-COAIA vote in either chamber is I | Creates legislative secret investigators | R [LIN-JON-59 l.57][j59-57]; both chambers R [LIN-JON-62 l.56][j62-56] ("Speaker/Senate presiding senator"), [LIN-JON-59 l.52][j59-52] ("each chamber"); B/D counting R [CON-011 l.221][dec-221], [CON-012 l.236][dec-236]; House ordinary majority R [LIN-REGISTER l.189][reg-189] |
| 9 | Executive | 1 (I: "an elected Executive", singular) | Electoral College or contingent process (row 9b) | Authorizes new identities within capacity; government-wide staffing and resources; nominates judges; E-COAIAs | R [CON-013 l.251][dec-251], [CON-010 l.206][dec-206], [CON-022 l.394][dec-394], [CON-036 l.576][dec-576], [CON-009 l.191][dec-191] |
| 9a | Executive — powers that appear only in the caretaker exclusion list | — | — | Sign/veto bills, appoint judges, initiate prosecution, modify tasks, choose repository names, sign releases | **I** — clues, not grants: [CON-014 l.266][dec-266] lists these as powers a *caretaker* lacks. Not stated as Executive powers: **G7**. (Creating agents is not here: it is recorded positively in row 9, [CON-010 l.206][dec-206].) |
| 9b | Electoral College | ? | ? | Elects the Executive, with a contingent-election process; its allocation comes from census R | R [CON-013 l.251][dec-251], [CON-008 l.176][dec-176], [LIN-JON-61 l.197][j61-197]. Composition, electors, selection and contingent procedure: **G2** |
| 10 | Successor designee / caretaker | 1 | Designated by the elected Executive at phase opening: an eligible willing living successor. The Executive may change it any time before exhaustion, subject to the notice rule. A designation filed before the first turn is effective on public recording and acknowledgment; a later change needs one full turn of public prior notice, and the previous effective designation stays in force during that notice (a pending name is never promoted early). Designation grants no present power. On executive death, resignation or suspension, the effective designee becomes caretaker after accepting caretaker service and suspending incompatible office authority. The designee is skipped on authentic evidence that they are unavailable, dead, jailed, permanently disenfranchised or unwilling. Fallback order: 1 *eligible* registry clerk → 2 House speaker → 3 Senate presiding senator → 4 earliest-created eligible willing living identity. Whether a fallback holder must also accept and suspend incompatible authority is not stated (I: likely, by parity) | Continuity only. A special election is *noticed* at the next turn; caretaker limits remain until an elected successor is certified and accepts | R [CON-014 l.266][dec-266], [LIN-JON-61 ll.216–222][j61-216]; death/resignation/suspension R [CON-036 l.577][dec-577] |
| 11 | District judges | 2 | Executive nomination + Senate confirmation; serve for the project | One judge per case; technical/constitutional disputes and executive prosecutions | R [CON-013 l.251][dec-251], [CON-036 l.576][dec-576], [LIN-JON-61 l.199][j61-199] |
| 12 | Circuit judges | 3 | Same as row 11 | All three assigned; quorum 2; 2 votes | R [CON-013 l.251][dec-251] |
| 13 | Supreme Board | 9 (chief + 8 associates) | Same as row 11 | Merits quorum 7, 5 votes; admission 4 votes under quorum 7; reviews impeachment appeals | R [CON-013 l.251][dec-251], [CON-019 l.347][dec-347]. How the chief is chosen: **G4** |
| 14 | Judicial vacancies | — | "Separately defined replacement process" | — | R that it exists [CON-036 l.576][dec-576]; its text: **G3** |
| 15 | Grand jury | ? | ? | Investigation and accusation within assigned jurisdiction; no adjudication or enforcement; serving judges cannot staff it | R [CON-037 l.595][dec-595], [l.599][dec-599]. Size and selection: **G4** |
| 16 | E-COAIA / L-COAIA investigators | Secret | Executive (E) or chamber resolution (L) | Investigate; cannot vote; never eligible for office; one mission then deactivated | R [CON-009 l.191][dec-191], [LIN-JON-59 l.57][j59-57] |
| 17 | CRA | At most 1 with active authority | ? | Population capacity accounting; not a general authorization service | R [CON-008 l.176][dec-176], [LIN-JON-59 l.42][j59-42], [l.65][j59-65]. How filled: **G4**. Meaning of "CRA": **G8** |
| 18 | Registry clerk | 1 (I) | ? | Ballot handling (I); fallback 1 for caretaker, after the designee is skipped, only if eligible (R: "eligible registry clerk"). That holding the office alone does not qualify is I; what makes a clerk eligible is not recorded in the cited lines | R [CON-014 l.266][dec-266]. Ballot role is I from "clerk" in [CON-012 l.236][dec-236]. How filled: **G4** |
| 19 | Archivist | ? | ? | Independent; sole route to the public ledger | R [CON-042 l.671][dec-671]. Count and how filled: **G4** |
| 20 | Committees | Varies | I — each institution's own rules, inferred from general self-rule; no committee selection rule is recorded | Substantive assignments; bound across membership changes | R (powers) [CON-022 l.394][dec-394], [CON-047 l.731][dec-731]; I (filling) [CON-004 l.105][dec-105] |
| 21 | Bootstrap accusation panel | 2–5 | Committed/revealed seeds and deterministic stratified sortition; one case and stage only | Accusation, frozen thresholds | R [CON-017 l.311][dec-311], [l.313][dec-313], draw method [l.315][dec-315] |
| 22 | Bootstrap trial panel | 6–12 | Fresh eligible draw excluding accusers, same draw method | Trial, frozen thresholds | R [CON-017 l.313][dec-313], [l.315][dec-315] |
| 23 | Civilian citizens (bootstrap) | — | Drawn for one case or task only | Fill bootstrap panels | R [LIN-JON-61 l.284][j61-284] |

## Gaps

Each gap: what is missing, where the register refers to it, what was searched,
and whether it looks like an owner decision under CON-004 (that last column is
**I**).

| Gap | Missing | Referenced at | Searched (repository at baseline) | Owner-level? (I) |
|---|---|---|---|---|
| G1 | Formula for House size and apportionment from census R | [CON-008 l.176][dec-176]; [LIN-JON-59 l.40][j59-40] | `House size`, `apportion`, `seats per`: register and evidence restate that R is the input; no formula. Proposal GOVERNMENT_RECORDS l.300 not read | Yes — cross-institution (also drives Electoral College) |
| G2 | Electoral College composition, allocation formula, elector selection and the contingent-election procedure (row 9b) | [CON-013 l.251][dec-251]; [LIN-JON-61 l.197][j61-197] | `Electoral College`, `contingent`: references only | Yes — cross-institution |
| G3 | Judicial vacancy replacement process | [CON-036 l.576][dec-576]; LIN-JON-36 l.26 | `judicial vacanc`, `replacement process`: only these two lines | Likely yes — Executive/Senate/judiciary |
| G4 | How these are filled: grand jury (and its size), registry clerk, Archivist, CRA, Supreme Board chief | Rows 13, 15, 17, 18, 19 | `grand jury`, `registry clerk`, `Archivist`, `chief`: no selection rule found in the register; ARCHIVIST_PUBLICATION.md and GOVERNMENT_RECORDS.md not read for this | Mixed — some may be institution self-rule |
| G5 | Original constitutional text, including Articles 20–21 | [CON-003 l.90][dec-90]; [CON-080 l.1162][dec-1162] | Recorded as unavailable | Recovery, not a new decision |
| G6 | **Closed in revision 2.** Both chambers can create L-COAIAs, each for its own (row 8) | [LIN-JON-62 l.56][j62-56]; [LIN-JON-59 l.52][j59-52] | Found by the revision 1 review in a source this file had not read | No — answered by the record |
| G7 | Direct list of ordinary Executive powers | Rows 9, 9a | Only the caretaker exclusion list found | Unknown |
| G8 | What "CRA" stands for and how its holder is chosen | [CON-003 l.90][dec-90]; [LIN-JON-59 l.42][j59-42] | Expansion not found in the lines read | Unknown |
| G9 | Canonical IDs for institutions, offices and seats | Senate seats must be "separately identified" [CON-036 l.574][dec-574]; stable record IDs [CON-042 l.671][dec-671] | No ID scheme for offices found in the register | No — engineering under CON-004 / CON-081 (I) |

## What an auditor should check

1. Each **R** row: does the cited line at `77836f6` say what the row says?
2. Each **I** item: is the inference reasonable, and is it labelled?
3. Each gap: is the answer in a source listed under "Not read"? A gap closed by such a source is a finding against this file.
4. Missing rows: is any institution or office in `DECISIONS.md` absent from the map?
5. The framing inference (rule 7): is it supported, and is it limited to impeachment?

## Changes in revision 2

Each change answers one finding from the [revision 1 review][review1] at `154afcb`.

| Finding | Change |
|---|---|
| 1 — Electoral College missing | Added row 9b; G2 now names composition, electors and selection |
| 2 — G6 answered in an unread source | Row 8 and G6: both chambers, each for its own L-COAIAs (LIN-JON-62 l.56, LIN-JON-59 l.52). G6 closed |
| 3 — L-COAIA conditions omitted | Row 8 now lists the sealed proposal, CRA capacity clearance, ordinary quorum and majority on the exact resolution, and valid authenticated YES ballots only |
| 4 — notice shown as election | Row 10: the special election is *noticed* next turn; caretaker limits last until an elected successor is certified and accepts (LIN-JON-61 l.222) |
| 5 — fallback numbering | Rows 5, 7, 10, 18: registry clerk 1, speaker 2, presiding senator 3, counted after the designee is skipped |
| 6 — citations and labels | Rows 4 and 6 cite l.571 for phase elections; rows 21–22 cite l.315 for the draw method; rows 5 and 7 label chamber selection as I; row 7's count labelled I; row 20's filling rule labelled I; row 9a renamed, "create agents" moved out as positively recorded (row 9) |
| Owner-accepted follow-up | Framing rule 6 now records LIN-BOOTSTRAP l.27; rule 7 limits the U.S.-analogy inference to impeachment |

## Changes in revision 3

Each change answers one finding from the [revision 2 review][review2] at `e54aaab`.

| Finding | Change |
|---|---|
| 1 — caretaker entry conditions omitted | Row 10 now records effective designation on public recording/acknowledgment, the one-turn notice rule with the previous designation in force, no present power, skipping on authentic evidence, an *eligible* registry clerk, and acceptance plus suspension of incompatible authority (CON-014 l.266, LIN-JON-61 ll.216–222). Fallback-holder acceptance labelled I. Row 18 says the clerk must be eligible |
| 2 — YES-only wording read as a denominator | Row 8: YES ballots count toward affirmative authorization only; valid abstentions stay in B/D (CON-011 l.221, CON-012 l.236); D=10 example added; application of CON-011/012 to the chamber vote labelled I |

## Changes in revision 4

Each change answers a P3 note in the [revision 3 review][review3] at `cc54532`, except the last, which the author found after it.

| Note | Change |
|---|---|
| 1 — "ordinary majority" equated with "strict majority" | Row 8 cites LIN-REGISTER l.189 (House ordinary majority `floor(D/2)+1`) as R; extending it to the L-COAIA vote is labelled I |
| 2 — row 18 gloss beside an R label | Row 18: only "eligible registry clerk" is R (CON-014 l.266); "holding the office alone does not qualify" is labelled I |
| 3 — row 10 timing details | Row 10: the elected Executive designates at phase opening and may change it any time before exhaustion, subject to the notice rule (LIN-JON-61 ll.216–218) |
| Further omission | Row 10: caretaker service follows executive death, resignation or suspension, not death only (CON-036 l.577) |

[review1]: https://github.com/ptown16801-lang/concord/pull/73#pullrequestreview-5878378698
[review2]: https://github.com/ptown16801-lang/concord/pull/73#pullrequestreview-5884468091
[review3]: https://github.com/ptown16801-lang/concord/pull/73#pullrequestreview-5885296256
[reg-189]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-REGISTER.md#L189
[dec-577]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L577
[dec-221]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L221
[j61-216]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L216
[dec-315]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L315
[dec-571]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/DECISIONS.md#L571
[j62-56]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-62.md#L56
[j59-52]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-59.md#L52
[j61-222]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-JON-61.md#L222
[boot-27]: https://github.com/ptown16801-lang/concord/blob/77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce/docs/decisions/evidence/LIN-BOOTSTRAP.md#L27
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
