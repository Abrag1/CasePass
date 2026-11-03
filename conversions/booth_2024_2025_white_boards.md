# booth_2024_2025_white_boards

VERDICT: FAIL (held back, not converted)

Exhibit #1 (page 331, "Current Total Costs Per Day") is a three-bar chart (Maintenance costs of trucks $260, Fuel Costs $350, Salaries of employees $240) with value labels, thin black bar outlines, and a Y axis that prints only $10, $30 and $40 with irregular unlabelled minor ticks. The drawn bar heights do not match the value labels ($260 sits near $27 on the axis, $350 near $34, $240 near $26), so the source chart is internally inconsistent. axisBar always draws evenly stepped ticks from 0 and ties bar height to the label, so drawing to the axis shows wrong values and drawing to the labels shows a different axis. Either way it would not match the casebook, so it fails the gate.

The Framework slide (page 330) also carries a small embedded table image (dashed row separators, boxed In-house/Outsourced columns, a non-monetary benefits/costs block) that could probably be approximated with a data table; not the blocker.

Needs: custom tick labels and independent value labels on axisBar (or the owner's decision on how to treat the source's inconsistent axis). Nothing was written for this case.
