# booth_2024_2025_student_health_insurance

VERDICT: PASS
MECHANICAL: PASS (orchestrator override)

Re-converted after the new hBars exhibit renderer (components/cases/charts/hBars.tsx) was built; the earlier hold-back was for Data Sheet 1's horizontal-bar panels. Independent verifier: zero CRITICAL; all text, tables and maths correct (Q4 calc table recomputed; printed quirks 99.5% ($498K) and 102% ($510K) kept). verify-case's 11 additions are text that exists only in the Data Sheet images (legend names, footnotes, titles) plus two wrapped tree labels, and its 2 omissions are the flattened p.300 grid text, which is present as a tree.

Verifier's MAJOR findings: gridlines on Data Sheet 1 panel 1 (the source has none) was fixed by the orchestrator with colBarNoGrid and re-previewed (not re-verified). Remaining differences accepted as cosmetic, for the owner to approve:
- Data Sheet 1 is drawn as four separate framed exhibits titled "Data Sheet 1 · (1) ..." to "(4) ..." instead of one composite sheet.
- Panel 1's boxed "% of all students" labels and speech-bubble pointer are plain percentage text above the bars, with "% of all students" as a subtitle.
- Panel 2's 7% slice is not pulled out at about 3 o'clock; the pie starts at 12 o'clock with the 7% label outside.
- Panel 1 bar heights are read from pixel geometry (about +/-15 schools); the other chart values are printed.
- Q1 grid and Q6 framework are trees (shareable:false); Q3/Q5 tables put one bullet per row, which pairs qualitative and quantitative bullets side by side.
- "Multiple Recommandations" (p.298) is the PDF text-layer wording, kept as printed.
