# booth_2024_2025_telecom_co

VERDICT: FAIL (held back, not converted)

Case #45, pages 376-384. Two exhibits cannot be reproduced faithfully:
- Exhibit #3 "Own or Lease base station?" (page 381): two stacked columns, "Build (Own & Operate)" and "Lease", each with its own dollar Y axis ($400K scale, total 380; $150K scale, total 150) and a text label inside every segment (Maintenance, Cabling/Misc., Planning & Design, Electronics, Backhaul lease, Tower lease). axisStack draws no in-segment text and shares one axis; stackPanels labels segments but is 100%-stacked with no dollar axis.
- Exhibit #2 "Historic Spectrum auction price" (page 380): 11 bars with value labels, rotated company names inside the bars (Verizon, T-Mobile, Comcast, AT&T) and a dashed "Average" line at 500. colBar has no slot for the in-bar names.
Exhibit #1 (page 379) is a tree that fits treeRoot, apart from a red arrow call-out under SG&A.

Needs: dollar-axis stacked panels with in-segment labels, and in-bar labels on colBar. Nothing was written for this case.
