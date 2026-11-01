---
name: convert-case
description: Rules and procedure for converting one casebook case (PDF) into a full page-by-page CasePass case, with reference examples. Read before converting or verifying any case.
---

# Converting a casebook case into a CasePass case

You turn ONE case from a casebook PDF into a finished, fully authored CasePass case
(a `CasePage[]` the app renders as the "Full case" document and the Live Mock screen).
The owner reviewed three hand-converted cases and corrected them many times. The rules
below ARE those corrections. A first automated attempt on "Army Hotel" was rejected as
"nowhere near" what the owner wants; section 3 lists exactly why. Read it twice.

## 0. Reference examples (read these before writing anything)

Finished, owner-approved cases, as standalone files in `.claude/skills/convert-case/examples/`:

| File | Study it for |
|---|---|
| `fire-proof.ts.txt` | The model interviewer-led case: page order, verbatim wording, `**bold**` / `==highlight==`, clarifying-info lines, framework groups, calc lines, brainstorming, conclusion. |
| `whale-hotel.ts.txt` | Hotel / investment case: clarifying info as `Question? **Answer**`, data-table exhibit, `calcTable` with a traceable total row, illustration exhibit. |
| `duck-island.ts.txt` | Exhibit-heavy case: pie, axis-bar and small-multiple line charts that match the PDF, formula-first calc walkthroughs, source headings as page titles. |
| `booth-army-hotel.ts.txt` | TARGET mapping for the Booth casebook template (two-column slides: left = question, right = interviewer guidance). Shows how nested bullet outlines, guidance, tables and the recommendation map onto blocks. |

Open at least `fire-proof.ts.txt`, the example closest to your case, and (for Booth)
`booth-army-hotel.ts.txt` BEFORE you start, and imitate their shapes. If your case
resembles one of them, your pages should look structurally like theirs.

## 1. Inputs and outputs

Get the case details from the queue (read-only):

    node scripts/convert-queue.mjs --id <catalog_case_id>

It prints the case UUID, the PDF path, the page range and the catalog's hints
(case type, industry, difficulty: hints only, verify against the PDF).

You produce, and touch nothing else:

1. `lib/cases/authored/<catalog_case_id>.ts`: the new case file (template in section 9).
2. Two lines in `lib/cases/authored/index.ts` (an import and a registry entry).
3. Image files, only if an exhibit needs one, under `public/cases/<catalog_case_id>-<n>.jpg`.

Do NOT create any other file in the project: no preview HTML, no copies of PDF pages, no
notes, no scripts. Scratch work goes in the OS temp folder. The owner reviews the case
inside the app, not in a preview file. Never run `git push`, never run
`scripts/apply-authored.mjs`, never run SQL or migrations, never edit
`lib/cases/content.ts`, `components/` or another case's file. Publishing is the owner's
decision, made after review.

## 2. Reading the source: you MUST look at the pages

Text extraction loses charts and FLATTENS BULLET HIERARCHY (it turns a 4-level outline
into one run of text). The picture is the source of truth for structure.

1. Render the pages to PNG and open EVERY page with the Read tool:

       node scripts/render-pages.mjs "<pdf>" <first> <last>

   It prints the PNG paths (written to the OS temp folder). Use the Read tool on each PNG.
   (The Read tool cannot open the PDF itself on this machine; use these PNGs.) For small
   print or dense tables, re-render one page at a larger scale: add `<out-dir> 2.5`.
2. Extract the text for exact wording: `pdftotext -f <first> -l <last> "<pdf>" -`
   (add `-layout` only to untangle a table). Copy wording from the text, take structure
   from the picture.
3. Page numbers equal PDF page numbers. The queue's end page is inferred: stop where the
   next case's cover page begins.
4. Read the WHOLE case (every page, as an image) before writing anything.

For each page, before writing, note the hierarchy you see: underlined headings, bullet
levels (•, –, sub-bullets), numbered lists, bold/italic runs, columns, tables, charts.
Your output must preserve that hierarchy (section 5).

## 3. What the owner wants (and what was rejected)

The owner's standards, from reviewing Fire Proof, Duck Island and Whale Hotel:

1. **Verbatim.** The casebook's own words for prompts, clarifying info, guidance,
   analysis, calculations and answers. Never add, paraphrase, summarise or "improve":
   no invented titles, frameworks, insights, notes or extra maths. (An added "roughly
   7×" and an invented year-2 profit line were both rejected.) Keep source typos and
   quirks as printed.
2. **Structure, not blobs.** Every list in the source is a list in the output. One source
   bullet = one output item. Nested bullets stay nested. Never merge bullets into a run-on
   sentence joined with `;`, ` - ` or ` — `, and never paste a block of text into one field.
3. **Answers are bullets**, never a paragraph: `"- point\n- point"`, sub-points as `"  …"`.
   Mirror the casebook's own bullets.
4. **Calculations show their working.** Formula in words, then the numbers; totals must be
   traceable (show the sum). A per-item × per-scenario breakdown is a `calcTable`
   (`totalLast: true`). Put `==highlight==` in the answer text (`a`), never in a label (`q`).
5. **Exhibits match the PDF's chart type**: a pie is a pie, a bar chart with a Y axis and no
   value labels stays that way, four small line charts stay four small line charts. Never
   swap in a table or a different chart. Values come from the picture, not guesses.
6. **Selective emphasis.** `**bold**` on the key instruction words and terms
   ("**Share** … **verbally** … **Coach** …", "**If asked**", "**Probe**") and
   `==highlight==` on the key figures and results ($330,000, 3750). Not whole sentences,
   not everything. The wording must be identical with the markers removed.
7. **Nothing the candidate shouldn't see in candidate-facing text.** `body` and exhibit text
   render raw on the candidate's screen: no `**` / `==` markup there.
8. Never write "Your interviewee doesn't need an account." anywhere.
9. **Use the source's own headings** for labels and titles ("Question: Pricing Strategy",
   "Prompt #1", "Global Market Share", "Recommendation"), not invented ones.
10. **Only fix a real error, and say so.** If the source's own maths or answer key is wrong
    (e.g. Duck Island prints 165 bottles but calculates with 330; Whale's off-peak sum
    omitted "+ 250 (new)"), keep the printed version or change it minimally, and report
    it under FLAGS. Never silently fix, never add an explanatory note on the page.

### What went wrong in the first Army Hotel attempt (do NOT repeat)

- The 4-level framework outline became lines like `"Competition - Number of hotels"` and
  `"Revenues - Demand/Occupancy - # of rooms - Pricing - WTP"`: hierarchy destroyed, bullets
  merged. Fix: `infoSections` with `label` (top heading) > `groups` (heading + items) and
  `"  "`-indented sub-items. See `booth-army-hotel.ts.txt` page 03.
- Clarifying information became semicolon-joined sentences with invented `**Competition** —`
  separators and lost its bullets. Fix: one source bullet per line.
- The prompt page's `note` was a long blob of three source sections with markup. Fix: keep
  `note` to one or two short sentences; the case-level guidance goes on its own page.
- Lists such as "Add a restaurant…; Host army conferences; Find ways…" were joined with
  semicolons. Fix: each is its own line.
- It had no page images (only flattened text), so it could not see the layout. Fix: render
  and view every page (section 2).
- It left scratch files (`*_preview.html`, a PDF excerpt) in the project root. Fix: none.
- (Second attempt, Breast Cancer Surgery) The structure was good, but "Interviewer guidance"
  and "Interviewer guidance: Framework" were their own pages, the Framework facts were a
  separate page from the framework guidance, and "Risks and Next Steps" was split from the
  recommendation. In the app each page is a timed section with its own notes and feedback,
  so these were meaningless sections. Fix: section 6.
- Text placed in `guidancePreNote` / `guidancePreIntro` / `guidancePreLabel` without
  `guidancePreLines` never renders (the whole box is skipped). Fix: see section 4.

## 4. What each field renders as (so you pick the right field)

Candidate pages see ONLY `body` and exhibits; everything else is interviewer-only.

| Field | Renders as |
|---|---|
| `body` (kind "ready") | Large text box, paragraph breaks kept (`\n\n`). Plain text, no markup. |
| `note` (kind "ready") | Small grey single-flow text under the prompt (newlines collapse). Keep it SHORT. |
| any block below (on a "ready" page too) | A prompt page can also carry `infoSections`, `guidancePre*`, `guidanceLines` etc.; they render under the prompt for the interviewer only. |
| `qText` | "Interviewer says" box (line breaks kept, markup ok): what the interviewer asks or says. |
| `guidancePreLines` (+ `guidancePreLabel`, `guidancePreNote`, `guidancePreIntro`) | Dashed box with flat • bullets. NO nesting. The whole box renders ONLY when `guidancePreLines` is set: a `guidancePreNote`, `guidancePreIntro` or `guidancePreLabel` without `guidancePreLines` is invisible. Put an instruction sentence in `guidancePreLines` (or `qText`). |
| `infoSections` (+ `infoBoxLabel`) | Reference box. Per section: `label` (bold heading) → `paragraphs` → `groups` (bold `heading` + `–` items; items starting with two spaces become • sub-items) → `lines` (• bullets; lines starting with two spaces become – sub-bullets) → `steps` (numbered circles). |
| exhibits | Chart / table / illustration block (section 8). |
| `calcLines` / `calcTable` (+ `calcNote`) | "Calculation walkthrough" box: label/expression rows, or a table. |
| `answerText` | Green "Answer" box. Plain text, line breaks kept. Use `- ` bullets and two-space sub-lines. (Bullets are drawn as • only when the page also has `answerBonusLines`.) |
| `insightText` (+ `insightLabel`) | "What a strong candidate spots" box. |
| `answerBonusLines` (+ `answerBonusLabel`) | Extra call-outs inside the answer box. |
| `nextStepText` | "Next step" box. |
| `guidanceLines` (+ `guidanceLabel`) | Dashed box: top-level `–` lines; lines starting with two spaces become • sub-bullets. This is the main place for "Interviewer Guidance" bullets and for recommendations. |

Render order on a "qa" page: qText → guidancePre → infoSections → exhibit → calc → answer /
insight → nextStep → guidanceLines.

## 5. Source → block mapping

| In the source | Use |
|---|---|
| Case prompt | Page 01 `kind: "ready"`, `body` verbatim (keep paragraph breaks). `note`: the behavioural / fit questions, short. |
| Case-level interviewer guidance paragraph | On the candidate-prompt page itself (`infoBoxLabel` + `infoSections` paragraphs); numbered "case development" list → `steps`. NOT its own page (section 6). |
| Multi-level bullet outline (framework, brainstorm, issue tree) | `infoSections`: underlined/top heading → `label`; second level → group `heading`; third level → `items`; fourth → `"  "`-indented item. |
| Two-level list with a heading | `groups` (`heading` + `items`). |
| Flat bullet list | `lines` (infoSections) or `guidancePreLines`. |
| Interviewer-guidance bullets with sub-bullets | `guidanceLines`, sub-bullets prefixed with two spaces. |
| Bold sub-heading followed by bullets inside guidance | Top-level line `"**Heading**"`, then its bullets as `"  …"` lines. |
| "Question: X" (what the interviewer asks) | `qText` verbatim; label `"Question: X"`, title `"X"` (use the source's own wording). |
| Plain instruction line under a question ("Clarify that…", "If asked…") | `guidancePreLines` / `guidancePreNote` with the instruction word in `**bold**`. |
| Clarifying Q&A the casebook prints | `guidancePreLines` as `"Question? **Answer**"` (see Whale) or `"Question — Answer"` (Fire Proof). Only if the source IS a Q-and-A. |
| A paragraph of prose | ONE string. Never split a paragraph into invented bullets. |
| Table of numbers used as an exhibit | `dataTable*`. |
| Table that is the working of a calculation | `calcTable`. |
| Maths printed as bullet sentences | `answerText` bullets, verbatim, key results `==highlighted==`. |
| Recommendation / conclusion slide | A page labelled "Recommendation" with `guidanceLabel` + `guidanceLines`, or `answerText`. |
| Risks / next steps | `infoSections` groups, merged into the one closing section with the recommendation (section 6). |
| "Interviewer Guidance" panel beside a question | The same section as that question: `guidanceLabel` + `guidanceLines`, or `guidancePreLines` / `infoSections` above the exhibit. |
| Facts to give "when asked" on the framework slide | Inside the Framework section, after the framework outline. |
| Slide furniture (page numbers, "Case #N (2/5)" strips, rating grids, evaluation rubrics, logos) | Drop; list under FLAGS. |
| Header chips (case type, industry, quant level, firm style, concepts tested) | `CASE_META` (type, tags); not page content. |

## 6. Sections: one page = one timed interview phase

`PAGES` is an ordered `CasePage[]` (type in `lib/cases/content.ts`). `n` is "01", "02", ...
in order. **In the app every page is a SECTION.** During a mock the interviewer starts a
timer per section, writes notes per section, and the feedback is reported per section
(`sectionsFromPages` in `lib/interview/model.ts`). So create a page only for a phase of
the interview that the interviewer would time and comment on separately, and put
everything that helps run that phase INSIDE that page, in the source's wording.
This regroups the casebook's content for the interviewer; it never changes the wording or
the order in which the casebook presents things.

1. **Guidance never gets its own page.** Interviewer guidance, hints, expected answers,
   "provide only if asked" facts and transition statements live on the page of the phase
   they serve. Never create a section called "Interviewer guidance", "Guidance",
   "Reference" or similar.
2. **Candidate prompt section** = the prompt (`body`) + the fit/behavioural questions
   (`note`, short) + the case-level interviewer guidance (the "this is a candidate-driven /
   interviewer-led case…" paragraph, the numbered "Case Development" list), as
   `infoBoxLabel` + `infoSections` on the SAME `kind: "ready"` page. They render under the
   prompt for the interviewer; the candidate only ever receives `body`.
3. **Framework section** = the framework guidance (what a good framework covers) + the
   facts the interviewer reveals while the candidate structures and asks questions
   ("provide when asked") + the transition statement / the cue to show the next exhibit.
   Keep them in the source's order inside one `infoSections` array. Only when the casebook
   prints the facts as their own dedicated list ("Clarifying information: provide only if
   asked", as in Fire Proof and Whale Hotel) do they get their own "Clarifying information"
   section, placed right after the prompt.
4. **One section per question / prompt / exhibit.** It holds the question (`qText`), the
   hints, the exhibit, the calculation, the answer, the insight and the next step. An
   exhibit slide that has no question of its own joins the section whose analysis uses it
   (exhibit + calculation + answer + guidance on one page). A brainstorm question is its
   own section.
5. **One closing section**: the recommendation, the conclusion guidance, and risks and next
   steps. Consecutive wrap-up slides merge into this ONE section. If the casebook prints
   the recommendation inside the preceding calculation slide, it stays with that section
   and the closing section is just "Risks and Next Steps".
6. A typical Booth-style case is therefore: Candidate prompt → Framework → one section per
   question (or exhibit) → Recommendation, about 5-9 sections in total. If you have more
   than 10, you have probably split guidance off from the phase it belongs to.

Page labels and titles use the source's own headings ("Question: Pricing Strategy",
"Exhibit 1: Adoption", "Recommendation"). Repeat a prompt's text on a "(continued)" page
only when the casebook does.

## 7. Emphasis recap

`**bold**`: key instruction words and terms. `==highlight==`: key figures and results.
Apply across guidance, notes, calc, brainstorm lists and say-next text, never to
candidate-facing fields. Markers are the only thing you add.

## 8. Exhibits: replicate the casebook EXACTLY

Owner rule: any chart or visual exhibit must look like the casebook's, element for element.
Never approximate, never "pick the closest chart". Before writing an exhibit, zoom into the
source page PNG and list every visible element, then reproduce each one: chart type (scatter
dots are NOT a connected line), title, axis titles (text AND position), tick range, tick
step and tick format, gridlines (present or absent), markers and points, connecting lines (or
none), legend, data labels/value labels, series order and colours, annotations, units.
If the app has no chart type or option that reproduces it, add a data-driven one in
`components/cases/blocks.tsx` (model it on `ScatterChart`) or, failing that, save a crop of
the page under `public/cases/` (`illustrationSrc`) and flag it. When you are done, run
`node scripts/preview-case.mjs <catalog_case_id>`, open each exhibit section PNG with Read
and compare it to the source page PNG side by side; fix every difference and repeat.

| In the PDF | Use |
|---|---|
| Pie chart | `pieTitle`, `pieSlices` |
| Bar chart with a Y axis and no value labels on bars | `axisBarTitle`, `axisBarSeries`, `axisBarGroups`, `axisBarYMax/YStep/YLabel` |
| Several small line charts (2×2) | `miniLinesTitle`, `miniLines` |
| Table / matrix | `dataTable*` (wide tables get more room automatically) |
| Picture with labelled variables | `illustrationSrc` + `factPanels` (save a crop under `public/cases/`) |
| Stacked bar over time | `chart1`, `chart1Legend` |
| Grouped columns with value labels | `barChart*` |
| Single line chart (connected line) | `lineChart*` |
| Scatter plot (unconnected dots, axis titles, ticks) | `scatterTitle`, `scatterPoints`, `scatterXMax/XStep/XLabel`, `scatterYMax/YStep/YLabel` (`
` splits a title over two lines), optional `scatterGrid` |

Values come from the picture (render the page larger if needed). `duck-island.ts.txt` and
`whale-hotel.ts.txt` show working data and colour choices. If an exhibit fits none of these,
save a crop of the page as an image (`illustrationSrc`) and list it under FLAGS as an
"unsupported exhibit type". Values read off a chart are approximations: list them under
FLAGS with the tolerance.

## 9. Metadata and file template

`CASE_META`: `case_type` (the PDF's own label, else the catalog hint), `synopsis` (1-2
sentences, no spoilers), `full_prompt` (candidate prompt, verbatim), `tags` (3-5 lowercase,
e.g. `interviewer-led`, `market-entry`, `light-math`, `exhibit-heavy`, `brainstorming`).
Anything guessed goes under FLAGS.

```ts
import type { CasePage } from "../content";

export const CASE_ID = "<case_uuid from the queue>";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Market Entry",
  synopsis: "…",
  full_prompt: "…",
  tags: ["interviewer-led", "market-entry"],
};

export const PAGES: CasePage[] = [
  { n: "01", label: "Candidate prompt", title: "Case Prompt", kind: "ready", body: "…", note: "…" },
  // …
];
```

Register it in `lib/cases/authored/index.ts`: add
`import * as <camelName> from "./<catalog_case_id>";` under `// REGISTER-IMPORTS` and
`<camelName>,` in the `MODULES` array under `// REGISTER-ENTRIES`.

## 10. Self-check before reporting

1. `npx tsc --noEmit 2>&1 | grep -v "^\.next/"` has no errors in your files.
2. `npx eslint lib/cases/authored` is clean.
3. `node scripts/verify-case.mjs <catalog_case_id>` reports MECHANICAL: PASS. Read every
   ADDITION, OMISSION and WARNING it lists and fix real problems; omissions that are
   booklet furniture are fine, say so in the report.
4. Structure check, page by page against the PNGs: every source list is a list, nesting
   matches, no merged bullets, nothing pasted as a blob.
5. Re-check every number in `calcLines` / `calcTable` / `answerText` by hand.
6. Render with `node scripts/preview-case.mjs <catalog_case_id>`, then compare EVERY exhibit
   section PNG to the source page PNG: same chart type, title, axis titles, ticks, gridlines,
   markers, lines, labels, legend, colours. Any visible difference must be fixed.
7. `git status --short`: only your case file, the registry, and any exhibit images.

## 11. Report format

End with a short report (no recap of the rules):

- FILES: created / edited.
- PAGES: one line each (n, label).
- FLAGS: source errors found; deviations; values read off charts (with tolerance);
  unsupported exhibits; metadata guesses; furniture you dropped; sums or totals the source
  does not print; anything uncertain.

## 12. Publishing (done by the owner's session, never by you)

Publishing runs `node scripts/apply-authored.mjs <catalog_case_id> --run` after the code is
pushed. It flips the case from "Outline" to "Full case" and fills every field the case card
shows from `CASE_META`: `case_type`, `synopsis`, `full_prompt`, `tags`. The script refuses a
case whose `CASE_META` has any of these empty and prints a card check afterwards. So make
`CASE_META` complete and accurate (synopsis 1-2 sentences, no spoilers, 3-5 tags) in every case.

## 13. Framework section layout

In a Framework section, the "provide this information when asked" facts go in their own box
ABOVE the framework (`guidancePreLabel: "Provide when asked"`, the lead-in sentence in
`guidancePreIntro`, the facts in `guidancePreLines`). The framework outline and the transition
statement stay together in the `infoSections` box (`infoBoxLabel: "Framework"`), so the framework
can be shared with the candidate on its own. A closing "at this point… show Exhibit" line goes in
`nextStepText`. See `lib/cases/authored/booth_2024_2025_breast_cancer_surgery.ts`.
