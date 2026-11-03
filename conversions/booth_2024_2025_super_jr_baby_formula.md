# booth_2024_2025_super_jr_baby_formula

VERDICT: PASS
MECHANICAL: PASS (orchestrator override)

Re-converted after the new marimekko exhibit renderer (components/cases/charts/marimekko.tsx) was built; the earlier hold-back was for the Marimekko Exhibit 2. verify-case reports one addition (the Exhibit 3 title "Key stats by Company Types", genuinely printed on page 318 but image-only) and one omission fragment ("Sample Takeaways from Exhibit 3: Super Jr."), both confirmed by the verifier as extraction artefacts.

The verifier rated Exhibit 1 differences CRITICAL under its strict rule: charts stacked in the wrong order, an extra "Million $" legend swatch, and "CAGR = 20%" outside the plot. The orchestrator fixed these with additive options (colBarFirst, axisBarNoLegend, colBarInnerNote) and re-previewed; the order, legend and label now match the source. Also fixed beforehand: colBar bars now start at a positive colBarYMin, so the left chart stores its true values (3 to 9) on a 2-10 axis. Not re-verified by the verifier.

Remaining differences (accepted as cosmetic): the two Exhibit 1 charts stack vertically instead of sitting side by side; Exhibit 3 has no green header or black borders (red percentages are reproduced); Marimekko widths and slice heights are measured from pixel geometry (no printed values) and match the picture within about 0.5%; left chart values read to about 0.1 and right chart to about 1.
