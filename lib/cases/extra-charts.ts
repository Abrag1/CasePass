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
  // `text` overrides the printed percent label of a slice (used when the source prints rounded values that do not sum to 100).
  pies: { title?: string; center?: string; note?: string; slices: { label: string; value: number; color: string; text?: string }[] }[];
  // One label per row, drawn in the gap between the two pies of that row (a newline splits lines; the first line is bold).
  rowCenters?: string[];
  centerBox?: boolean; // draw each rowCenters entry inside a bordered box
  radius?: number; // pie radius in SVG units (default chosen from the layout)
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
  // Optional additions (defaults keep the original behaviour).
  // `slices` follow the order of `series`; the FIRST series is drawn at the TOP of each column (same order as the legend).
  seriesNotes?: string[]; // small second line under each legend entry, one per series (e.g. "4 players")
  labelsAbove?: boolean; // column labels above the columns instead of under them
  valueLabels?: boolean; // percentage label inside each slice (default true)
  noGrid?: boolean; // hide the horizontal gridlines
  yStep?: number; // Y tick step in % (default 10)
  yTickSuffix?: string; // default "%" unless a yLabel is given, then ""
}

// Horizontal (grouped) bars with value labels.
export interface HBarsData {
  kind: "hBars";
  title?: string;
  series?: ExtraSwatch[]; // one per value in a group; legend drawn when more than one
  // `valueTexts` overrides the printed label per bar (when the source mixes decimals, e.g. "99%" and "0.6%");
  // `colors` overrides the series colour per bar.
  groups: { label: string; values: number[]; valueTexts?: string[]; colors?: string[] }[];
  max: number;
  valueSuffix?: string;
  valueDecimals?: number;
  footnote?: string;
  // Optional additions (defaults keep the original behaviour).
  categoryTicks?: boolean; // tick marks on the category axis between the groups
  axisStep?: number; // draw a value axis under the bars with ticks every `axisStep`
  axisTitle?: string; // title under the value axis
  grid?: boolean; // vertical gridlines at the axis ticks
  outline?: boolean; // thin outline around each bar (and legend swatch)
  footnoteLines?: { bold?: string; text: string }[]; // footnote lines with an optional bold lead-in, drawn before `footnote`
}

// Two or more normal-distribution curves with vertical markers and call-out boxes.
export interface BellCurveData {
  kind: "bellCurve";
  title?: string;
  curves: {
    name?: string;
    mean: number;
    sd: number;
    color: string;
    fill?: boolean;
    // Optional additions: draw only x in [from, to] (default: the whole xMin..xMax range); peak height as a share of the
    // tallest curve (default: the true normal density, so a wider curve is lower); stroke width in SVG units.
    from?: number;
    to?: number;
    height?: number;
    strokeWidth?: number;
  }[];
  xMin: number;
  xMax: number;
  markers?: { at: number; label?: string; dashed?: boolean }[]; // a "_" in `label` makes the rest a subscript (e.g. "μ_1")
  spans?: { from: number; to: number; label: string; level?: number }[]; // e.g. a sigma bracket
  // x, y are 0-1 of the whole drawing canvas (top-left of the box, or the text centre when there is no box).
  callouts?: {
    text: string;
    x: number;
    y: number;
    color?: string;
    // Optional additions: box size (0-1 of the canvas, draws a bordered box); `pointer` is a polyline [x, y][] in canvas 0-1 units.
    w?: number;
    h?: number;
    boxed?: boolean;
    pointer?: [number, number][];
  }[];
  xTitle?: string;
  footnote?: string;
  // Optional additions (defaults keep the original behaviour).
  titleStyle?: "centered-underlined";
  // Labels beside a curve: `x` in data units, `y` as a share of the peak height (a "_" makes a subscript, e.g. "σ_1").
  curveLabels?: { text: string; x: number; y: number }[];
  axisFrom?: number; // the x-axis line starts here (data units; default xMin)
  axisTo?: number; // the x-axis line ends here (default xMax)
  axisEndLabel?: string; // italic label just past the right end of the axis (e.g. "x")
  markerTicks?: boolean; // marker lines run through the axis to a small tick (default true)
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
