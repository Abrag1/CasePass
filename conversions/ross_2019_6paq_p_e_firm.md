VERDICT: FAIL
Reason: Exhibit 1 (p. 88) is a 4-series line chart (2 solid, 2 dashed, no axis values). The app has no multi-series/dashed line chart, so the converter saved a page crop (unsupported exhibit type), which the batch gate rejects. Needs a new chart type in components/cases/blocks.tsx, then re-run.
Converter output was removed from the registry; no verifier run.
