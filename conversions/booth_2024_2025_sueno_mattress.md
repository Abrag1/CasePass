# booth_2024_2025_sueno_mattress

VERDICT: PASS
MECHANICAL: PASS

Re-converted after the new multiPie exhibit renderer (components/cases/charts/multiPie.tsx) was built; the earlier hold-back was for the two multi-pie exhibits. Independent verifier: zero CRITICAL, zero MAJOR. verify-case reports 0 additions and 0 omissions. All pie slices, centre labels, legends and the Market/CAGR table match the source images (values are the printed labels); maths recomputed.

Minor notes (accepted):
- The Market/CAGR table draws above the two pies (source: to their right).
- China 2017 slices sum to 102 in the source; printed labels kept via `text` overrides.
- Question 1 and Question 3 are shareable:false (source: do not share handout).
- Source inconsistency kept: Framework data says "Asian market: 12% CAGR" while charts say "China"; "Calculating Damages" in Case Development kept verbatim.
