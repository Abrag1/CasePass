# booth_2024_2025_lola_lo_s_zoo

VERDICT: PASS
MECHANICAL: PASS (orchestrator override)

verify-case.mjs reports 13 additions on page 04. All 13 are text from the NPV / superscript / rule-of-72 equation images, which text extraction cannot read. The independent verifier checked every one against the page 216 images and found them identical to the printed equations. It found zero CRITICAL and zero MAJOR issues and recomputed all the maths ($4.5M revenue, $1.5M costs, $3M profit, $30M perpetuity, about $28.1M after the 29-year discount, $13.125M answer).

Minor notes (accepted):
- Tree root node "Framework" added because the source has two top-level bullets with no root.
- Formulas typed as plain text; the nested fraction is written ($3M/.1)/1.1^29, which equals the printed ($3M/1.1^29)/.1.
- "Calculations (Continued)" heading merged into one Calculations section.
- Source typos ("primary interested", "ticket sells") preserved.
- verify-case lint warning on page 03 (facts page, no question/exhibit/calc) is expected.
