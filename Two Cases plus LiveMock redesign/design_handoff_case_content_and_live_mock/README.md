# Handoff: Case Content (Aces Delivery Service, American Airlines) + Live Mock Redesign

## Overview
This bundle covers two additions to CasePass, prototyped together in one HTML reference file (`Casos.dc.html`):

1. **Two fully-authored cases** added to the case library — replacing the placeholder/dummy cases:
   - **Aces Delivery Service** (Profitability, interviewer-led, math + exhibit heavy)
   - **American Airlines** (Growth, interviewee-led, qualitative + light math)
2. **A redesigned Live Mock view** — the real-time interviewer/interviewee session screen — now grounded in the real case content above instead of a hardcoded placeholder case, with a new step navigator, coaching-hint system, present-to-candidate flow, and stricter interviewer/interviewee role separation.

## About the Design Files
The attached `Casos.dc.html` is a **design reference built in HTML** — a working prototype showing the intended structure, content, copy, and behavior. It is not production code to copy verbatim into your app. The task is to **recreate this design in CasePass's existing environment** (whatever your production stack is — React, etc.), using your existing components, state management, and design system where they already cover a pattern (buttons, cards, nav, etc). Treat the HTML as the source of truth for: exact copy/text, data structure per case, layout/behavior of the Live Mock screen, and the interaction model — not for literal markup or inline styles.

## Fidelity
**High-fidelity.** Colors, spacing, copy, and interaction behavior in the prototype are final intent, not placeholders. Recreate pixel-close using your production design system's equivalent tokens (colors/spacing/type) rather than the raw hex/px values below if your system already has near-equivalents — but match the *structure and hierarchy* exactly.

## Part 1 — Case Content Data Model

Both cases are stored as an ordered array of **page objects** (one per step of the interview: prompt, background info, each exhibit, recommendation). This shape is what both the "Full case" document view and the new Live Mock view render from — build your production data model around this shape so both views can share one source of truth per case.

### Common page fields
- `n` (string) — display index, e.g. `'01'`, `'03b'`
- `label` (string) — short nav label, e.g. `'Exhibit 2'`
- `title` (string) — full step title shown as the page/step heading
- `kind` — `'ready'` (opening prompt) | `'qa'` (everything else) | `'cheat'` (interviewer-only summary sheet, excluded from the live step flow)

### Prompt page (`kind: 'ready'`)
- `body` (string) — the verbatim case prompt, read aloud to the candidate
- `note` (string) — a short interviewer aside (e.g. "This is what you read aloud to open the case.")

### Question/exhibit pages (`kind: 'qa'`)
Each page can combine zero or more of these blocks, in this fixed visual order. All are optional per page — only include the ones that page actually has:

1. **"Interviewer says" callout** (`hasQText` + `qText`) — light blue box (`#eef2f6` bg, `#d7e0e8` border, label color `#3d5a72`), label reads **"Interviewer says"** (Live Mock relabels this **"Say next"**). This is what the interviewer speaks aloud next.
2. **"Interviewer Guidance" callout, pre-exhibit** (`hasGuidancePre` + `guidancePreLabel` + `guidancePreLines[]`, optionally `guidancePreNote`/`guidancePreIntro`) — white box, dashed gray border (`#d7d9d4`), italic uppercase label. Bulleted context the interviewer may reveal on request, shown *before* any exhibit.
3. **Exhibit block** — exactly one of:
   - `hasChart1` + `chart1[]` — full-bleed **stacked bar** (market share over time). Each entry: `{ label, segs:[{color,h,pctLabel}] }`.
   - `hasChart2` + `chart2[]` — **table** (cost structure then-vs-now). Columns: Period / Facilities / IT / Staffing / Transportation (Transportation bolded green as the key driver).
   - `hasBarChart` + `barChartTitle` + `barChartGroups[]` (+ optional `barChartLegend[]`) — grouped **column chart**, each group is one category with 1-2 bars, shared baseline, group label below.
   - `hasLineChart` + `lineChartTitle` + `lineChartColor` + `lineChartPointsStr` (SVG polyline coords) + `lineChartGridY[]` (gridline y-position + label) + `lineChartPoints[]` (x/y + x-axis label per point, e.g. month name).
   - `hasDataTable` + `dataTableTitle` + `dataTableCols` (CSS grid-template-columns string) + `dataTableHeaders[]` + `dataTableRows[]` (each row: `cells[]` with `v`/`align`/`w`(eight)/`fg`(color) — used to bold/color the "answer" row, e.g. the revenue-maximizing row).
   - `hasInfoSections` + `infoBoxLabel` + `infoSections[]` — richer background reading: each section can have a `label`, `paragraphs[]`, `iconLines[]` (icon + text bullets), `groups[]` (a sub-heading + sub-bullet `items[]`, used for e.g. "Price" / "Volume" breakdowns), or `steps[]` (numbered take-aways, one per exhibit).
4. **Calculation walkthrough** (`hasCalc` + `calcNote?` + `calcLines[]` where each line is `{q, a}`) — light gray box, label **"Calculation walkthrough"**, question/answer pairs.
5. **Answer** (`hasAnswer` + `answerText`) — green box (`#e9f1ec` bg, `#cfe3d7` border, label color `#2d6a4f`), label **"Answer"**. The model answer/insight for that step.
6. **Interviewer Guidance, post-exhibit** (`hasGuidance` + `guidanceLabel` + `guidanceLines[]`) — same dashed-box style as #2, used for wrap-up/recommendation guidance.

### Design system for these callouts (apply consistently everywhere case content renders)
- **Interviewer says / Say next** → light blue, `#eef2f6` / border `#d7e0e8` / label `#3d5a72`
- **Interviewer Guidance** (pre or post) → white / dashed `#d7d9d4` border / italic uppercase gray label
- **Calculation Walkthrough** → light gray `#fafbf9` / border `#e6e7e3`
- **Answer** → green `#e9f1ec` / border `#cfe3d7` / label `#2d6a4f`
- These four box types are the *only* callout styles in case content — never invent a fifth ad hoc style. Keep label casing/weight (uppercase, 11px, 600-700 weight, `.05em` letter-spacing) consistent across all four so an interviewer can identify a box type at a glance without reading it.

### Case-level metadata (shown in the case library card + full case header)
`{ id, name, type, diff, src, ind, tags[], syn }` — e.g. `{ id:'aces', name:'Aces Delivery Service', type:'Profitability', diff:'Easy', src:'Cornell', ind:'Transportation & Logistics', tags:['math-heavy','exhibit-heavy','interviewer-led'], syn: '<one-paragraph synopsis>' }`.

### Aces Delivery Service — content summary
Interviewer-led profitability case. Package-delivery firm's market share crashed 33%→20%→40% while profit swung from +$20M to a $136M loss. Steps: prompt → segmentation background (local/regional/long-haul mile bands + price-sensitivity assumption, delivered as an "Interviewer guidance" box **before** the segmentation exhibit) → Exhibit 1 (stacked bar, market share by firm over 3 periods, labeled "First 45 months after deregulation" / "15 months ago" / "12 months ago") → Exhibit 2 (table, cost-structure %, Facilities/IT/Staffing/Transportation) → calculation walkthrough (profit math) → answer (root cause: rivals underpriced the low-cost Local segment, forcing Aces upmarket into costlier Regional/Long-haul routes) → interviewer cheat-sheet (kind: `'cheat'`, interviewer-only quick-numbers table, excluded from the live step flow) → recommendation guidance.

### American Airlines — content summary
Interviewee-led qualitative growth case (candidate drives structure). Steps: prompt → **"Case Overview [Interviewee-led]"** framing box (styled as an Interviewer Guidance callout — tells the interviewer this is qualitative, only one calc, encourage assumptions) → **"Case Information"** background box (only-give-if-asked bullets: pricing model, market fragmentation, business-vs-vacation segments — each bullet has its own small icon; plus an "Insights on revenue" sub-section with Price/Volume sub-bullet groups) → a second "what to listen for" info box (numbered exhibit-by-exhibit takeaways + a compact quick-reference table) → Exhibit 1 (grouped bar chart, purchase-factor importance, Business vs. Vacation, shared legend, bars centered on a shared baseline) → Exhibit 2 (line chart, seasonal occupancy by month, Jan–Dec on x-axis) → Exhibit 3 (data table, price-sensitivity survey Yes/No %) → Exhibit 4 (line chart, price elasticity — revealed **only if** the candidate raises the "under-competed routes could bear higher prices" idea) → "Approach & Analysis" wrap-up (guidance box only, no answer box — there's no single right recommendation for this case).

## Part 2 — Live Mock Redesign

### What changed and why
The previous Live Mock screen hardcoded a fake "regional airline" case (steps/exhibits baked into the component). The redesign makes it **data-driven off the same page-object model above**, so whichever case is attached to a session renders correctly, and adds a purpose-built interviewer/interviewee workflow.

### Layout
Two-panel layout (`grid-template-columns: 1.15fr 1fr` when both are visible): a video-call strip on top (unchanged), then:
- **Left: Interviewer panel** (private — never shown to candidate)
- **Right: Interviewee/candidate panel** (shows only what's explicitly presented)

**Critical CSS note:** both grid panels must have `min-width: 0` set (on the grid item and its inner card). Without it, CSS grid won't let a flex/grid child shrink below its content's natural width, and any fixed-width chart content inside will silently blow out the column and cause horizontal overflow of the whole page. This bit us twice during the prototype — call it out in code review.

### Interviewer panel structure (top to bottom)
1. **Header row**: "Interviewer view" label + a **Step-by-step / All sections** segmented toggle (see View modes below).
2. **Chapter pills row**: one horizontally-scrollable pill per case page (`n · label`, e.g. "02 · Question 1 · Revenue"), current step highlighted solid green, others light gray. Clicking a pill jumps directly to that step (and switches to Step-by-step view if in All-sections view).
3. **Case-sharing control** (see Sharing controls below).
4. **Step detail** (Step-by-step view) or **full scrollable list** (All-sections view) — see View modes.
5. **Private notes** textarea — unchanged, always at the bottom, never shown to candidate.

### View modes (new)
- **Step-by-step** (default): shows only the current step — title, prev/next arrows + "Step X of N" counter, a **Present to <candidate>** button, then that step's callouts/exhibit rendered using the exact box types from Part 1.
- **All sections**: every step rendered in full, stacked, in one scrollable list (each with its own Present button) — so the interviewer can scan or skim-read the entire case top to bottom instead of only jumping chapter to chapter. This was an explicit ask: chapter buttons alone weren't enough: interviewers also wanted continuous scroll through everything.

### Present-to-candidate mechanism
- One page can be "on screen" at a time (`presentedIndex` — a single int/null, not per-exhibit flags). Present button reads "Present to <name>" normally, "On screen ✓" (solid green) when active; clicking again un-presents (back to null).
- Presenting a `kind:'ready'` page shows the verbatim prompt body on the candidate screen.
- Presenting a `kind:'qa'` page shows **only its exhibit** (chart1/chart2/barChart/lineChart/dataTable) on the candidate screen in a dark theme — **never** the qText/guidance/calc/answer blocks; those are interviewer-only regardless of what's presented.
- When nothing is presented: candidate screen shows a calm "Nothing on screen yet" empty state (dashed border, short helper copy) — already existed, kept as-is.

### Sharing controls (new — this was a specific bug fix)
- The candidate's screen has a small "CASE" synopsis chip that used to be shown unconditionally. It's now gated behind an explicit interviewer-controlled toggle: **"Share with <candidate> / Shared ✓"**, defaulting to **off**. The interviewer must deliberately share the case synopsis; it does not leak automatically just because a session started.

### Interviewer/interviewee role separation (new — this was a specific bug fix)
- The **Your view / Both screens** layout toggle (and the timer start/reset controls sitting next to it) must render **only for the interviewer role**. An interviewee must never see this control and must never be able to force "Both screens" mode — that mode would otherwise leak the private interviewer panel (answers, guidance, calc, "say next" hints) to the candidate.
- Enforce this at the state level, not just by hiding the button: derive "both screens active" as `isInterviewer && layoutPreference === 'both'` so even a stale/forced state value can't put an interviewee into split view.
- An interviewee's screen always shows exactly one panel: their own shared/candidate screen.

### Interaction summary (for QA / acceptance criteria)
- [ ] Switching cases (e.g. via "join mock" from a scheduled session) loads that case's real pages into both the step navigator and the case doc — no hardcoded fallback content anywhere.
- [ ] Chapter pills scroll horizontally as a group; clicking one jumps to that step.
- [ ] Step-by-step and All-sections are two views over the *same* underlying step list; toggle never loses your place case-to-case.
- [ ] Present/un-present toggles correctly, only one step presentable at a time, and hides calc/answer/guidance from the candidate.
- [ ] Case-synopsis share toggle defaults off and is independent of the present-step mechanism.
- [ ] Interviewee role never renders the Your-view/Both-screens control and is always confined to a single-panel, candidate-only screen.
- [ ] No element inside either panel overflows its container at common viewport widths — verify with real case content (Aces exhibit tables/charts and American Airlines' bar/line charts both have long text values that previously broke fixed-width layouts).

## Assets
No external images/icons — all charts are built from divs/SVG using the field data described above (bars, stacked segments, SVG polylines for line charts). No brand assets beyond CasePass's existing color palette (`#2d6a4f` green, `#15294d`/`#3f6ea5` blues, warm gray neutrals `#8a8f8a`/`#3a3f3b`/`#e6e7e3`).

## Screenshots
`screenshots/` contains reference captures from the prototype:
- `01-aces_exhibits.png` — Aces Delivery Service case doc, opening prompt
- `american_airlines_case.png` — American Airlines case doc, opening prompt
- `live_mock_interviewer.png` — Live Mock, interviewer role, "Both screens" layout showing the video strip + the start of the Interviewer view / candidate shared-screen panels
- `live_mock_both_screens.png` — same, for cross-reference

These are top-of-page captures only — the full exhibit-by-exhibit visuals (stacked bars, line charts, tables, callout box colors) are specified precisely in the Data Model and Design System sections above; use those as the source of truth for anything not visible in the screenshots.

## Files
- `Casos.dc.html` — the full prototype. The case library, both cases' full "case doc" pages, and the Live Mock screen all live in this one file. Search for `acesDocPages()` and `amDocPages()` (the two cases' page-object arrays — copy the literal content from these to seed your production data) and the `isLive` section (the Live Mock template + its logic in the component class) as your two main reference points.
