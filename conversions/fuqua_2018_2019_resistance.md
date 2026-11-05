VERDICT: PASS

# Resistance (Duke Fuqua 2018-2019)

True range pp.50-58 (queue 49-57: p.49 is Healthy Spending's rubric; own rubric p.58 dropped as furniture per SKILL.md section 5). p.50 cover dropped, p.51 behavioral questions into note. case_type "Market Sizing" is a guess (source gives industry Pharma only).

Verifier: PASS on third round, no CRITICAL/MAJOR. Earlier findings fixed: markup leak (`**` nested in `==`), Exhibit 1 row shading, joined-bullet footnote (now grey infoBox boxes with separate bullets), chart size, pie title style.

Mechanical override (documented, confirmed by verifier and converter): verify-case FAIL = 3 omissions, all Healthy Spending's p.49 Evaluation Criteria rubric lines (queue range spill). 0 lint, 0 additions. tsc clean; eslint 0 errors (pre-existing unused-import warning).

Shared code (all optional, off by default): combo `labelsAbove`, `valueSuffix`, `infoBox` (combo/multiPie), multiPie `plainTitles`. Congo's Drumming (combo) 7 PNGs and booth_2024_2025_sueno_mattress (multiPie) 6 PNGs byte-identical before/after (converter).

Minor, kept: combo chart text slightly smaller than source; the two grey info boxes are not level/side by side (no layout option); Prompt #2 qText uses typed bullets (no nesting field), italic on last bullet lost; Prompt #1 is a joined paragraph where the source has two bullets.
Source errors kept as printed: Exhibit 1 private hospital revenue $192M (maths gives $8M), 11.2M x $75 printed as 848M (840M) so that 848M + 1.152BN = 2BN; Prompt #2 asks for "additional" revenue but the key computes full 2022 revenue; chart title "2018 - 2018".
