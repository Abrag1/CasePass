VERDICT: PASS

# Cake or Break (Duke Fuqua 2023-2024)

True range pp.65-74 (queue range correct; cover p.65, "What's the MATter?" starts p.75; no Evaluation Criteria rubric page). Cover chips (Deloitte, Medium/Medium) to meta; case_type "Profitability", tags and synopsis are guesses.

Verifier: PASS on first round, no CRITICAL/MAJOR. Mechanical: verify-case PASS (0 lint, 0 additions; 2 omissions: cover furniture and the Exhibit #2 Harvey-ball table matched at 29% because it is laid out as a table; verifier compared every ball and header by eye, nothing missing). tsc clean; eslint 0 errors (pre-existing warning).

Shared code (optional, off by default): hBars `stacked`/`stackBarHeight`/`stackBandHeight`; page `exhibitLeftCharts` (default 1 = old behaviour); data-table cell `harveyColor`/`harveyTrack`. Byte-identical before/after (converter): booth_2024_2025_student_health_insurance, fuqua_2018_2019_goodbye_horses, johnson_2020_2021_down_under, johnson_2021_2022_down_under (hBars); fuqua_2018_2019_congo_s_drumming, healthy_spending, resistance (exhibitColumns). Fire Proof (existing Harvey user) not rendered; verifier confirmed by reading the diff that the new fields are undefined by default so its ball colour/outline logic is unchanged.

Minor, kept: segment labels white where the source prints dark navy on blue; chart titles/legends/ticks smaller than the PDF; chart card border and darker 0 gridline; Exhibit #2 uniform row heights (source row 4 taller), lighter/thinner cell borders, row labels top-aligned; underlined lead-ins render plain; "Prompt:" labels promoted to Say-next; Recommendation and Risks & Next Steps merged into one closing section; exhibit notes above and Detailed Insights below Exhibit #1.
Source quirks kept: seasonal revenue bar sums to 45 but is clipped at the 40 axis maximum as in the source; typo "there's a different between flavor types". Source arithmetic errors kept verbatim: seasonal margin (45-36)/45 = 20% printed as 25%; regular margin (36-24)/36 = 33% printed as 34% ("25% higher revenue" holds: 45 vs 36).
