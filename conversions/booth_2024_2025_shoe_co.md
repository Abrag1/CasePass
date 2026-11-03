# booth_2024_2025_shoe_co

VERDICT: FAIL (held back, not published)

The three consumer-survey exhibits are drill-down 100%-stacked columns with dashed connectors, large labelled segments and a legend at top right. The only available renderer (stackPanels) draws them tiny in a narrow column, with segment labels overlapping or clipped ("Prices too high", "Reduction in product purchases", "Store dissatisfaction", "Lower quality than I desire"...), every tick printed with "%", orange connectors and no segment borders. The result is not a faithful or readable exhibit, so it fails the gate. verify-case also reports one false-positive addition (chart text only in the page image).

Needs: a drill-down stacked-bar option (wider chart, wrapped/in-segment labels, plain tick labels, black connectors, segment borders, legend placement). The converted file is kept in the session scratchpad (keep/booth_2024_2025_shoe_co.ts); all other sections passed the mechanical check.
