VERDICT: PASS

# Goodbye Horses (Duke Fuqua 2018-2019)

True range pp.159-167 (queue 158-166 is off by one). Cover chips only in case_type (Corporate Finance is a guess; source has no label). Sardine Airlines cover (p.168) and Going Green rubric (p.158) are not part of this case.

Verifier: PASS after three rounds, no CRITICAL/MAJOR. Round 1-2 MAJORs were Exhibit #2 fidelity (heading rules, axis title alignment, label/tick size, blank gutter); fixed via optional fields and a new optional `rightPanel` two-panel hBars drawing.

Mechanical override (documented, confirmed by verifier): verify-case FAIL is solely the queue page-range artefact: 6 "additions" are p.167 text (Recommendation) and the single "omission" is the Going Green p.158 rubric. Lint 0/0, no derived numbers. tsc and eslint clean.

Shared-renderer additions (all optional, off by default; hBars defaults reviewed from diff, no pixel diff): new `bubble` extra chart (bubble.tsx), hBars fields hideLabels/titleRule/axisTitleEnd/valueFontSize/tickFontSize/singleLineLabels/labelFontSize/noFrame/axisTitleFontSize/panelTitleFontSize/rightPanel (hBarsPanels.tsx).

Exhibit #1 bubble positions/radii read off the picture. Maths recomputed OK (PI 10/9..3/3; projects 2,3,5 NPV 22 on capital 14 -> 0.7; 4.2 x 3.5 = 14.7).
Source typos kept: "dose she need to do next?", "(($4.2B x 3.5 = $14.7B)". Minor: nested guidance bullet shows "–" where source has a smaller •; Exhibit #2 category label text slightly smaller than source.
