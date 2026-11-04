VERDICT: PASS

# PayCo (Johnson 2021-2022, pp. 37-43)

Independent verifier: PASS, 0 CRITICAL, 0 MAJOR. All 7 source pages viewed. Problem statement (3 steps), Exhibit 1 (Country, Subway, Buses tables) and Exhibit 2 (assumptions, cost projections) match cell for cell; p.43 Exhibit Summary has every number, sign, TOTAL column and "Break even" under 2014. Recomputed: variable revenue = fares x 0.20% (total 60,000); fixed license fees 1,250; total revenue 61,250; total cost 61,000; profit (300)/(50)/200/200/200 = 250; cumulative break-even in 2014. Q1 calc (New York $10.8M, London $9.1M, Tokyo $9.0M) matches. No Case Flow Guide in the source; no interviewer answers in candidate-facing fields.

verify-case.mjs: MECHANICAL: FAIL, documented orchestrator override; all items confirmed false positives by the verifier: one "addition" is the CSS `cols` string "1.9fr 1fr ..." on a data table; two omissions are page footers/page numbers/repeated headers at page breaks (real text present); "derived numbers" are the Exhibit Summary totals, recomputed against p.43. 0 lint. tsc and eslint clean.
Cosmetic: Buses table stacked below Subway; red text, underline and break-even arrow not reproduced. Reused from the 2020-21 version after checking the 2021-22 PDF.
