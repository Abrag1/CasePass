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
  noRowDivider?: boolean; // no dashed line between rows of a grid
  sliceNames?: boolean; // print the slice name (e.g. "Yes") above its percentage, in a serif face
  sliceLabelColor?: string; // colour of labels drawn inside the slices (default white)
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

// Process-flow diagrams and timelines. Two ways to lay one out (they can be combined):
//  - `steps`: automatic row(s) of boxes joined by arrows (simple linear processes);
//  - `nodes` + `arrows`: free layout on one fixed canvas, positions as 0-1 shares of the canvas
//    (x from the left, y from the top; canvas width is 1000 units, height is 1000 * `aspect`).
// A timeline is just nodes (tags, bar, boxes) and arrows (stems, brackets) placed on that canvas.
export interface FlowNode {
  // Lines are split on a newline character; long lines wrap inside w. Plain "text" nodes use (x, y) as the anchor of the text.
  text?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  // box: rectangle; tag: small bordered label; text: free label (no frame);
  // blockArrow: wide bar of size w x h with an arrow head to its right (headLen / headH, canvas shares).
  shape?: "box" | "tag" | "text" | "blockArrow";
  fill?: string; // "bg" = the exhibit background (used to cut gaps in a bar)
  fill2?: string; // with fill: vertical gradient from fill (top) to fill2 (bottom)
  stroke?: string;
  strokeWidth?: number;
  color?: string; // text colour
  size?: number; // font size in canvas units (default 13)
  bold?: boolean;
  italic?: boolean;
  serif?: boolean;
  align?: "left" | "center" | "right";
  lineGap?: number; // line spacing as a multiple of the font size (default 1.25)
  // Optional additions (defaults keep the original behaviour):
  radius?: number; // rounded corners (canvas units) for box / tag nodes
  fillOpacity?: number; // 0-1 opacity of the fill (a box drawn over another lets it show through)
  valign?: "top" | "middle"; // vertical text position inside a box (default middle)
  padTop?: number; // with valign "top": space above the first line (canvas units, default 10)
  padX?: number; // left/right text padding (canvas units, default 8)
  noWrap?: boolean; // use the text lines exactly as given (a newline splits; leading spaces are kept as indent), no auto-wrap or shrink
  shadow?: boolean;
  headLen?: number;
  headH?: number;
}
export interface FlowArrow {
  points: [number, number][]; // polyline, 0-1 canvas shares
  dashed?: boolean;
  color?: string;
  width?: number; // line width in canvas units (default 2.5)
  head?: "end" | "start" | "both" | "none"; // default "end"
  headStyle?: "open" | "filled"; // default "open"
  headSize?: number; // head length in canvas units
}
export interface FlowData {
  kind: "flow";
  title?: string;
  style?: "chevron" | "box"; // look of `steps`
  steps?: { title: string; bullets?: string[]; color?: string }[];
  columns?: number; // steps per row (default: all in one row, at most 4)
  aspect?: number; // canvas height / width for the free layout (default 0.5)
  nodes?: FlowNode[];
  arrows?: FlowArrow[];
  footnote?: string;
}

// General line / column chart on one shared category axis: optional columns, any number of lines, optional
// point markers, dashed vertical markers, free text labels and a styled title. Only `categories` and `yMax`
// are required; everything else is an optional addition.
export interface ComboLine {
  name: string;
  color: string;
  values: (number | null)[]; // null = gap (no point at this category)
  width?: number; // stroke width in SVG units (default 3)
  marker?: "circle" | "diamond" | "square"; // point marker at each value
  markerColor?: string; // fill (default: the line colour)
  markerSize?: number; // marker size in SVG units (default 9)
  dashed?: boolean; // dashed line
  onAxis2?: boolean; // plot against the secondary (right) Y axis
  valueLabels?: boolean; // value printed at each point
  valueSuffix?: string; // e.g. "%"
  labelColor?: string; // default grey
  labelColors?: (string | null)[]; // per-point colour (e.g. white over a column)
  labelPos?: ("above" | "below" | null)[]; // per-point side (default above)
}
// Everything that belongs to one plot area. With `panels`, each panel is drawn side by side sharing the Y scale
// of the chart; without, the same fields on the chart itself describe a single panel.
export interface ComboBars {
  name: string;
  color: string;
  values: number[];
  colors?: string[]; // per-bar colours (override `color`)
  valueLabels?: boolean; // value printed above each bar
  valueSuffix?: string; // appended to each value label, e.g. "%"
  widthRatio?: number; // column width as a share of the category slot (default: 60%, at most 60 units)
  ticks?: (number | null)[]; // short dashed tick across each bar at this level (e.g. last year's value)
  tickColor?: string; // default grey
  tickName?: string; // legend entry for the ticks
}
// Stacked columns on the same Y axis: `series` are listed bottom first; with `percent` every column is scaled to the
// full axis height (100%-stacked) and `labels` give the printed text of each segment (default: the value).
export interface ComboStack {
  series: { name: string; color: string; values: number[]; labels?: string[]; labelColor?: string; labelBold?: boolean }[];
  percent?: boolean;
  widthRatio?: number; // column width as a share of the category slot (default 0.55)
  labelSize?: number; // in-segment label size (SVG units, default 14)
  labelBold?: boolean;
}
export interface ComboPanel {
  stack?: ComboStack;
  categories: string[]; // a newline inside a label splits it into lines
  bars?: ComboBars;
  lines?: ComboLine[];
  xTitle?: string; // axis title under the category labels
  // Free text at data coordinates: x as a (fractional) category index, y as an axis value.
  texts?: { text: string; x: number; y: number; color?: string; size?: number; bold?: boolean; anchor?: "start" | "middle" | "end" }[];
  // Vertical markers at (fractional) category indexes, from the axis to the top of the plot.
  markers?: { at: number; label?: string; dashed?: boolean; color?: string; labelColor?: string }[];
  // Full-width horizontal reference lines at axis values.
  refLines?: { at: number; color: string; width?: number; dashed?: boolean; label?: string; labelColor?: string }[];
  // Boxed text with an optional leader line. `x` (category index, fractional) and `y` (axis value) place the box's
  // top-left corner; `w` is its width in SVG units; `pointer` is the data coordinate the leader line points to.
  callouts?: { text: string; x: number; y: number; w: number; pointer?: { x: number; y: number }; from?: number; size?: number }[]; // `from`: where the leader leaves the box bottom, 0 (left) to 1 (right); default nearest the pointer
}
export interface ComboChartData extends Partial<ComboPanel> {
  kind: "combo";
  title?: string; // a newline splits lines
  titleBold?: boolean;
  titleUnderline?: boolean;
  titleSerif?: boolean;
  titleAlign?: "left" | "center"; // default left
  titleSize?: number; // SVG units (default 20)
  panels?: ComboPanel[]; // side-by-side panels sharing the Y axis settings (each draws its own tick labels)
  yMin?: number;
  yMax: number;
  yStep?: number;
  yTickLabels?: string[]; // custom text per tick, bottom to top (overrides prefix/suffix)
  yTickPrefix?: string;
  yTickSuffix?: string; // e.g. "%"
  yLabel?: string; // rotated axis title at the left
  y2Min?: number; // secondary (right) Y axis; drawn when y2Max is set
  y2Max?: number;
  y2Label?: string; // rotated title beside the right axis, reading bottom to top (a newline splits lines)
  y2TickLabels?: string[]; // custom text per right-axis tick, bottom to top
  axisBold?: boolean; // bold tick labels, category labels, legend entries and axis titles
  y2Step?: number;
  y2TickPrefix?: string;
  y2TickSuffix?: string;
  legendBox?: boolean; // border around the legend
  axisTitleBold?: boolean;
  yGrid?: boolean; // light horizontal gridlines at every tick
  axisStyle?: "plain" | "arrows" | "none"; // arrowheads at the end of both axes / "none": no axis lines or tick marks (gridlines and tick texts only)
  xPlacement?: "between" | "on"; // "on": first/last category sit on the axis ends (scatter-like); default "between"
  xLabelRotate?: number; // degrees, e.g. 45 (labels read upwards to the right, ending at their tick)
  xLabelEvery?: number; // draw only every n-th category label (dense axes)
  serif?: boolean; // serif font for all chart text
  fontScale?: number; // multiplier for tick texts, category labels and axis titles (default 1)
  plotAspect?: number; // plot height as a share of the chart width (default about 0.34)
  legendNoWrap?: boolean; // keep the legend on one row
  lightBaseline?: boolean; // with axisStyle "none": the zero line is a normal light gridline
  legend?: "topRight" | "right" | "bottom" | "inside" | "none"; // "inside": top right corner of the plot; // default "bottom" when series are named
  footnote?: string;
  footnoteBold?: boolean; // serif bold footnote in the ink colour (as printed under some exhibits)
}

// Stacked columns with labelled segments, in one or more panels side by side. Each panel has its own Y axis
// (own maximum, ticks and tick texts), its own columns and optional dashed connectors between neighbouring columns.
// Segment values are in the panel's axis units (percent for 100%-stacked, dollars for dollar-scaled); the FIRST
// segment of a column is the bottom one. Labels are drawn inside the segments (wrapped, font shrinks to fit).
export interface StackColsSeg {
  value: number;
  color: string;
  label?: string;
  textColor?: string; // default: black or white, chosen from the fill
}
export interface StackColsConnector {
  // From the right edge of column `from.col` at axis value `from.at`, to the left edge of column `to.col` at `to.at`.
  from: { col: number; at: number };
  to: { col: number; at: number };
}
export interface StackColsPanel {
  title?: string; // large underlined heading above the panel
  subtitle?: string; // text under the heading (a newline splits lines)
  yMax: number;
  yStep?: number; // tick step (default yMax / 5)
  yTickPrefix?: string; // e.g. "$"
  yTickSuffix?: string; // e.g. "%"
  yTickLabels?: string[]; // explicit tick texts, bottom to top (overrides prefix/suffix)
  topLabel?: string; // text of the top tick only (e.g. "100%" or "$400K")
  columns: { label: string; total?: string; segs: StackColsSeg[] }[]; // `total` is printed above the column
  connectors?: StackColsConnector[];
}
export interface StackColsData {
  kind: "stackCols";
  title?: string; // chart title above the panels (a newline splits lines)
  panels: StackColsPanel[];
  legend?: ExtraSwatch[];
  legendPlacement?: "topRight" | "bottom" | "right"; // "right": vertically centred beside the plot; default topRight
  connectorColor?: string; // default: the ink colour
  segBorder?: string | false; // segment border colour (default dark); false = none
  barWidth?: number; // column width in SVG units (default 170)
  gridlines?: boolean; // light grey horizontal gridlines at every tick (default none)
  frame?: boolean; // thin grey border around the whole chart area (default none)
  titleBold?: boolean; // title bold, underlined and centred over the panels (default plain, left)
  footnote?: string;
}

export type ExtraChart = StackColsData | MultiPieData | MarimekkoData | HBarsData | BellCurveData | FlowData | ComboChartData;
