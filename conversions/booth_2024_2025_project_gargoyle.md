# booth_2024_2025_project_gargoyle

VERDICT: FAIL (held back, not published)

Text, maths and chart values were verified correct (all within tolerance), but the casebook's five exhibits cannot be reproduced faithfully with the current chart renderers:
- Exhibit 4 (cost to serve): stackPanels draws a 0%-100% axis where the source shows $0.00-$5.00 and $0-$5M, so the $4.50 bar reads as "90%".
- Exhibit 5: the source is one overlay chart (importance bars plus three brand lines on a 1-5 axis); the renderer can only draw two separate charts, drops the "Extremely Important / Not at all important" axis labels, and starts the axis at 0.
- Exhibit 1: no slot for the "EBITDA" row label.
- Minor: no red rule under titles; Exhibit 2 has gridlines/legend instead of in-segment labels; the framework brace is a fourth tree child.

Needs: stackPanels dollar tick labels, a bars+lines combined chart, and a row-label slot for colBar. The converted file is kept in the session scratchpad (keep/booth_2024_2025_project_gargoyle.ts) for reuse once those exist.
