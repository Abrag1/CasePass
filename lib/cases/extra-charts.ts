// Data shapes for the newer exhibit types (one entry of CasePage.extraCharts each).
// Every chart is data-driven: geometry is computed from the values, never a picture.
// Renderers live in components/cases/charts/<kind>.tsx.

export interface ExtraSwatch {
  name: string;
  color: string;
}

// Several pies in one frame (a row, or a grid with row/column labels).
export interface MultiPieData {
  kind: "multiPie";
  title?: string;
  columns?: number; // pies per row (default: all in one row)
  colLabels?: string[];
  rowLabels?: string[];
  pies: { title?: string; center?: string; note?: string; slices: { label: string; value: number; color: string }[] }[];
  legend?: ExtraSwatch[];
  footnote?: string;
}

// Variable-width 100% stacked columns: width encodes the segment size.
export interface MarimekkoData {
  kind: "marimekko";
  title?: string;
  columns: { label: string; width: number; sub?: string; slices: { value: number }[] }[];
  series: ExtraSwatch[];
  yLabel?: string;
  xTitle?: string;
  subLabel?: string; // row label for each column's `sub` text (e.g. "CAGR")
  footnote?: string;
}

// Horizontal (grouped) bars with value labels.
export interface HBarsData {
  kind: "hBars";
  title?: string;
  series?: ExtraSwatch[]; // one per value in a group; legend drawn when more than one
  groups: { label: string; values: number[] }[];
  max: number;
  valueSuffix?: string;
  valueDecimals?: number;
  footnote?: string;
}

// Two or more normal-distribution curves with vertical markers and call-out boxes.
export interface BellCurveData {
  kind: "bellCurve";
  title?: string;
  curves: { name?: string; mean: number; sd: number; color: string; fill?: boolean }[];
  xMin: number;
  xMax: number;
  markers?: { at: number; label?: string; dashed?: boolean }[];
  spans?: { from: number; to: number; label: string; level?: number }[]; // e.g. a sigma bracket
  callouts?: { text: string; x: number; y: number; color?: string }[]; // x, y as 0-1 of the plot area
  xTitle?: string;
  footnote?: string;
}

// Process / timeline steps (chevrons or boxes), each with optional bullets underneath.
export interface FlowData {
  kind: "flow";
  title?: string;
  style?: "chevron" | "box" | "timeline";
  steps: { title: string; bullets?: string[]; color?: string }[];
  footnote?: string;
}

// Columns plus overlaid lines on one shared axis.
export interface ComboChartData {
  kind: "combo";
  title?: string;
  categories: string[];
  bars?: { name: string; color: string; values: number[] };
  lines?: { name: string; color: string; values: number[] }[];
  yMin?: number;
  yMax: number;
  yStep?: number;
  yTickLabels?: string[];
  yLabel?: string;
  footnote?: string;
}

export type ExtraChart = MultiPieData | MarimekkoData | HBarsData | BellCurveData | FlowData | ComboChartData;
