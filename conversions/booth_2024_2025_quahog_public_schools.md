# booth_2024_2025_quahog_public_schools

VERDICT: PASS
MECHANICAL: PASS

Re-converted after the new bellCurve exhibit renderer (components/cases/charts/bellCurve.tsx) was built; the earlier hold-back was for Exhibit 1 (two overlapping bell curves). Independent verifier: zero CRITICAL, zero MAJOR. verify-case reports 0 additions; its one omission is the "Additional clarifying information" heading, a casing match artefact. Maths recomputed (4,800 / 3,200 shortage; 4,000 books).

Notes (accepted):
- Curve geometry (sd = 1, means 4.86 units apart, tail cut-offs, callout positions) was measured from the page image (about +/-2 px widths, +/-5 px positions); the source gives no values. Curve tails sit slightly off the printed strokes and the source axis tilts while the render is level.
- Exhibit 1 has its own section (section 2), separate from Framework, matching the casebook's own slide and keeping the framework answer key out of sight while the candidate looks at the exhibit.
- Tree arrows drawn as an arrow glyph where the source prints an unrenderable box glyph; source typo "4000 books" kept; fit questions joined in one note line.
- Dark mode of the bell curve was reviewed in code, not rendered.
