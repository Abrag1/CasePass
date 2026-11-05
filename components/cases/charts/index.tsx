// Dispatcher for CasePage.extraCharts: one frame per entry, drawn in order.
import type { ExtraChart } from "@/lib/cases/extra-charts";
import { MultiPieChart } from "./multiPie";
import { MarimekkoChart } from "./marimekko";
import { HBarsChart } from "./hBars";
import { BellCurveChart } from "./bellCurve";
import { FlowChart } from "./flow";
import { ComboChart } from "./combo";
import { StackColsChart } from "./stackCols";
import { BubbleChart } from "./bubble";
import { StackAreaChart } from "./stackArea";

function InfoBox({ box, dark }: { box?: { title: string; lines: string[] }; dark?: boolean }) {
  if (!box) return null;
  return (
    <div style={{ background: dark ? "#2a302c" : "#e9e9e9", boxShadow: "0 2px 4px rgba(0,0,0,.25)", padding: "10px 14px", marginTop: 10, fontSize: 13, color: dark ? "#dbe3dd" : "#1f2421" }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{box.title}</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {box.lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export function ExtraCharts({ charts, dark }: { charts?: ExtraChart[]; dark?: boolean }) {
  if (!charts?.length) return null;
  return (
    <>
      {charts.map((c, i) => {
        switch (c.kind) {
          case "multiPie":
            return (
              <div key={i}>
                <MultiPieChart data={c} dark={dark} />
                <InfoBox box={c.infoBox} dark={dark} />
              </div>
            );
          case "marimekko":
            return <MarimekkoChart key={i} data={c} dark={dark} />;
          case "hBars":
            return <HBarsChart key={i} data={c} dark={dark} />;
          case "bellCurve":
            return <BellCurveChart key={i} data={c} dark={dark} />;
          case "flow":
            return <FlowChart key={i} data={c} dark={dark} />;
          case "stackCols":
            return <StackColsChart key={i} data={c} dark={dark} />;
          case "bubble":
            return <BubbleChart key={i} data={c} dark={dark} />;
          case "stackArea":
            return <StackAreaChart key={i} data={c} dark={dark} />;
          case "combo":
            return (
              <div key={i}>
                <ComboChart data={c} dark={dark} />
                <InfoBox box={c.infoBox} dark={dark} />
              </div>
            );
        }
      })}
    </>
  );
}
