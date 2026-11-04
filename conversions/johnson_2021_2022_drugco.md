VERDICT: PASS

# DrugCo (Johnson 2021-2022, pp. 105-107)

Independent verifier found no CRITICAL and one MAJOR: "Part 4: Recommendation" was an empty infoBox rendered above the Part 3 guidance (out of source order, duplicated heading). Fixed by making it the last interviewer-guidance line after the Part 3 bullet, matching the source order; re-previewed section 3. Everything else verified: Case Flow Guide and panels verbatim, "100 -> 5.4" sub-bullet nested, Exhibit 1 values (75/30, 60/40, 40/60, 30/75) printed on the chart, no crops.

verify-case.mjs: 0 additions, 0 lint; MECHANICAL: FAIL on one omission (Part 3, heading and bullet split across qText and guidanceLines). Documented orchestrator override, confirmed by the verifier as a matcher artefact: all Part 3/Part 4 text is present verbatim. eslint and tsc clean. Case Flow Guide intentionally appears on section 1 as in other Johnson cases, then is split into per-section guidance.
Note: the live 2020-21 DrugCo has the same Part 4 infoBox ordering issue (not changed here).
