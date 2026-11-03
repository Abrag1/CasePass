// Dispatcher for CasePage.extraCharts: one frame per entry, drawn in order.
import type { ExtraChart } from "@/lib/cases/extra-charts";
import { MultiPieChart } from "./multiPie";
import { MarimekkoChart } from "./marimekko";
import { HBarsChart } from "./hBars";
import { BellCurveChart } from "./bellCurve";
import { FlowChart } from "./flow";
import { ComboChart } from "./combo";

export function ExtraCharts({ charts, dark }: { charts?: ExtraChart[]; dark?: boolean }) {
  if (!charts?.length) return null;
  return (
    <>
      {charts.map((c, i) => {
        switch (c.kind) {
          case "multiPie":
            return <MultiPieChart key={i} data={c} dark={dark} />;
          case "marimekko":
            return <MarimekkoChart key={i} data={c} dark={dark} />;
          case "hBars":
            return <HBarsChart key={i} data={c} dark={dark} />;
          case "bellCurve":
            return <BellCurveChart key={i} data={c} dark={dark} />;
          case "flow":
            return <FlowChart key={i} data={c} dark={dark} />;
          case "combo":
            return <ComboChart key={i} data={c} dark={dark} />;
        }
      })}
    </>
  );
}
