# booth_2024_2025_student_health_insurance

VERDICT: FAIL (held back, not converted)

Data Sheet 1 (casebook page 302) is a four-panel composite exhibit that the existing renderers cannot draw faithfully:
- Panel 3 "Product Revenue Contribution" is horizontal bars with value labels (Medical 99%, Dental 0.6%, Discount Cards 0.2%, SAP 0.2%).
- Panel 4 "Select Product Penetration" is grouped horizontal bars, School vs Student, with a legend (Dental 42.0/6.6, Discount Cards 52.3/19.5, SAP 7.5/100.0).
- Panel 1 is a column chart with boxed "% of all students" labels (32%, 26%, 20%, 20%, 2%), one with a speech-bubble pointer; colBarCallouts only draws brackets.
- Panel 2 (pie 93%/7%) is supported.
There is no horizontal-bar renderer, and changing the chart type is not allowed.

Needs: horizontal and grouped-horizontal bar blocks, and boxed per-bar annotations on column charts. Data Sheet 2 (page 305, paired Revenue/Pretax Income columns plus three small tables) is also a composite that needs layout work. The rest of the case is straightforward; source quirks to preserve when converted: "Multiple Recommandations" typo on page 298; Q4 calc rows printed 99.5% ($498K) and 102% ($510K). Nothing was written for this case.
