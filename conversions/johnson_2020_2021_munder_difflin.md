VERDICT: PASS

# Munder-Difflin (Johnson 2020-2021, p.119-129)

First verification: FAIL (CRITICAL: Exhibit 2 pie labels shortened/clipped plus an invented "A-E = Company A-E" footnote; MAJOR: hyphens changed to en dashes in the working-capital formula). Fixed: multiPie gained an optional `outsideLabels` mode (leader lines, full "Company X" labels as printed); footnote removed; hyphen-minus restored verbatim ("WC = CA - CL = Inv + A/R - A/P = 600 + 100 - 400 = 300", as on p.121). Orchestrator checked the re-rendered p.128 exhibit: labels and values match, no clipping or overlap.

Mechanical: the only remaining flag is the lint warning "flattened outline (' - ' joins)" on that verbatim formula (false positive; 0 additions, 0 omissions, 0 lint errors). Documented override.

Accepted deviations (MINOR): Exhibit 1 stacks its three tables with the P&L waterfall last (source is a 2x2 grid with the chart top-right); "Operating Expenses" caption is centred rather than a bracket over Logistics-Office/Admin; p.121 two-column layout flattened to one column; bullet glyph styles differ slightly. Content and values match.

Source maths not rechecked (no calculation rows).

VERDICT: PASS
