// Rich, page-object case content for the two fully-authored CasePass cases.
//
// This is the single source of truth that BOTH the "Full case" document view and
// the Live Mock screen render from (per the design handoff). The `cases` table in
// Supabase holds only case-level metadata (name/type/difficulty/source/tags/synopsis)
// so the library, filters, and session assignment keep working; the ordered
// `pages[]` for each case live here, keyed by the case's UUID.
//
// Interviewer-only fields (qText, guidance, calc, answer, insight, infoSections,
// note, cheat) must never reach the interviewee's browser. Use
// `redactPagesForCandidate()` before sending pages to an interviewee.

import { AUTHORED_CASES, AUTO_GENERATED_IDS } from "./authored";

export type PageKind = "ready" | "qa" | "cheat";

export interface CalcLine {
  q: string;
  a: string;
  // Force the stacked (label above expression) layout
  stack?: boolean;
}

export interface LegendItem {
  name: string;
  color: string;
}

// Stacked bar (market share over time)
export interface Chart1Seg {
  pctLabel: string;
  color: string;
  h: string;
}
export interface Chart1Period {
  label: string;
  segs: Chart1Seg[];
}

// Cost-structure table (then vs. now)
export interface Chart2Col {
  label: string;
  facilities: string;
  it: string;
  staffing: string;
  transportation: string;
}

// Grouped column chart
export interface BarChartBar {
  valueLabel: string;
  h: string;
  w?: string;
  color: string;
}
export interface BarChartGroup {
  label: string;
  bars: BarChartBar[];
  gap?: string;
  isLast?: string;
}

// Line chart (SVG polyline)
export interface LineChartGrid {
  y: string;
  topPct: string;
  label: string;
}
export interface LineChartPoint {
  x: string;
  y: string;
  leftPct: string;
  month: string;
}

// Generic data table
export interface DataTableHeader {
  v: string;
  align: "left" | "center" | "right";
}
export interface DataTableCell {
  v: string;
  align: "left" | "center" | "right";
  w: number;
  fg: string;
  // Optional pictogram shown before the label (key into blocks.tsx ICONS)
  icon?: string;
  // Optional Harvey-ball fill, 0–1 (rendered instead of text)
  harvey?: number;
}
export interface DataTableRow {
  cells: DataTableCell[];
}

// Pie chart (slice angles are computed from `value`)
export interface PieSlice {
  label: string;
  value: number;
  color: string;
}

// Bar chart with a Y axis and no value labels (bars are read off the axis)
export interface AxisBarGroup {
  label: string;
  values: number[]; // one per series
}

// Scatter plot: unconnected points on numeric X and Y axes
export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

// Small-multiple line chart: one entry per panel
export interface MiniLineChart {
  title: string;
  color: string;
  xLabels: string[];
  values: number[];
  yMax: number;
  yStep: number;
}

// Multi-series line chart: several lines (solid or dashed) on shared categories.
// Omit multiLineYStep to draw no Y axis values (some casebook charts have none).
export interface MultiLineSeries {
  name: string;
  color: string;
  dashed?: boolean;
  values: number[];
}

// Tree / issue-tree diagram: a root node with any depth of children, drawn left to right.
export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

// Labelled fact block shown beside an illustration (e.g. "Variable A: Hotel Stories")
export interface FactPanelRow {
  label?: string;
  value: string;
}
export interface FactPanel {
  heading: string;
  rows: FactPanelRow[];
}

// Aces Exhibit 3 — market share by segment
export interface SegmentRow {
  name: string;
  local: string;
  regional: string;
  long: string;
  total: string;
  w: number;
  fg: string;
}
export interface SegmentBlock {
  title: string;
  padTop: string;
  divider: string;
  rows: SegmentRow[];
}

// Rich background reading (American Airlines "case information")
export interface InfoIconLine {
  icon: string;
  text: string;
}
export interface InfoGroup {
  heading: string;
  items: string[];
}
export interface InfoStep {
  n: string;
  text: string;
}
export interface InfoSection {
  label?: string;
  labelSize?: string;
  labelNote?: string;
  paragraphs?: string[];
  iconLines?: InfoIconLine[];
  groups?: InfoGroup[];
  lines?: string[];
  steps?: InfoStep[];
}

// Interviewer cheat sheet (Aces)
export interface CheatRow {
  label: string;
  rev: string;
  cost: string;
  profit: string;
  fg: string;
}

export interface CasePage {
  n: string;
  label: string;
  title: string;
  kind: PageKind;

  // Prompt page (kind: 'ready')
  body?: string;
  note?: string;

  // Set false on interviewer-only reference pages that happen to carry a table, so
  // they can be presented on the interviewer's own screen but never pushed to the
  // interviewee's Live Mock screen.
  shareable?: boolean;

  // "Interviewer says" / "Say next" callout
  qText?: string;

  // Interviewer guidance, pre-exhibit
  guidancePreLabel?: string;
  guidancePreNote?: string;
  guidancePreIntro?: string;
  guidancePreLines?: string[];

  // Interviewer guidance, post-exhibit / wrap-up
  guidanceLabel?: string;
  guidanceLines?: string[];

  // Calculation walkthrough
  calcNote?: string;
  calcLines?: CalcLine[];
  // Table-style walkthrough: first column labels each row; `totalLast` styles the
  // final row as a total.
  calcTable?: { headers: string[]; rows: string[][]; totalLast?: boolean };

  // Answer + "what a strong candidate spots" insight. Text supports **bold**
  // markup; when it contains it the answer renders in regular weight so only the
  // marked key points stand out.
  answerText?: string;
  insightText?: string;
  // When set, the insight/bonus lines render inside the same box as the answer
  // (one visual structure) instead of as separate callouts.
  insightLabel?: string;
  answerBonusLabel?: string;
  answerBonusLines?: string[];
  // Separate callout under the answer group (e.g. "move on to Question 2")
  nextStepText?: string;

  // Rich background reading
  infoBoxLabel?: string;
  infoSections?: InfoSection[];

  // Exhibits (at most one per page in practice)
  chart1?: Chart1Period[];
  chart1Legend?: LegendItem[];
  chart2?: Chart2Col[];
  barChartTitle?: string;
  barChartLegend?: LegendItem[];
  barChartGroups?: BarChartGroup[];
  lineChartTitle?: string;
  lineChartColor?: string;
  lineChartXLabel?: string;
  lineChartPointsStr?: string;
  lineChartGridY?: LineChartGrid[];
  lineChartPoints?: LineChartPoint[];
  pieTitle?: string;
  pieSlices?: PieSlice[];
  axisBarTitle?: string;
  axisBarSeries?: LegendItem[];
  axisBarGroups?: AxisBarGroup[];
  axisBarYMax?: number;
  axisBarYStep?: number;
  axisBarYLabel?: string;
  // Scatter plot (points only, no connecting line). Axes run from Min (default 0) to Max in
  // `Step` increments; `scatterYLabel` may contain "\n" to break the axis title over two lines.
  scatterTitle?: string;
  scatterPoints?: ScatterPoint[];
  scatterXMin?: number;
  scatterXMax?: number;
  scatterXStep?: number;
  scatterXLabel?: string;
  scatterYMin?: number;
  scatterYMax?: number;
  scatterYStep?: number;
  scatterYLabel?: string;
  scatterGrid?: boolean;
  miniLinesTitle?: string;
  miniLines?: MiniLineChart[];
  multiLineTitle?: string;
  multiLineSeries?: MultiLineSeries[];
  multiLineXLabels?: string[];
  multiLineXTitle?: string;
  multiLineYTitle?: string;
  multiLineYMax?: number;
  multiLineYStep?: number;
  treeTitle?: string;
  treeRoot?: TreeNode;
  illustrationTitle?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  factPanels?: FactPanel[];
  dataTableTitle?: string;
  dataTableFootnote?: string;
  dataTableCols?: string;
  dataTableHeaders?: DataTableHeader[];
  dataTableRows?: DataTableRow[];
  segmentTitle?: string;
  segmentTable?: SegmentBlock[];

  // Interviewer cheat sheet (kind: 'cheat')
  cheatRows?: CheatRow[];
  cheatTakeaway?: string;
}

// Stable UUIDs — must match supabase/seed.sql.
export const ACES_CASE_ID = "11111111-1111-1111-1111-111111111111";
export const AMAIR_CASE_ID = "22222222-2222-2222-2222-222222222222";
// Authored from the catalog: Fire Proof Inc. (UVA Darden 2018-19, p.83). This id
// is the existing catalog row's UUID in the cases table.
export const FIRE_PROOF_CASE_ID = "72dea52c-0cf9-42eb-afb5-5d7cc5ff9c93";

// Duck Island Beer Co. (Duke Fuqua DMCC 2018-19, p.133): the existing catalog row's UUID.
export const DUCK_ISLAND_CASE_ID = "767cbae2-9bc8-4eb9-a66c-8e339892140f";

// Whale Hotel (UVA Darden 2020-21 casebook, p.171). New catalog row, id fixed in migration 0015.
export const WHALE_HOTEL_CASE_ID = "f9b56e3b-a2bc-4555-92b9-89594746de9c";

export function pageHasExhibit(p: CasePage): boolean {
  return !!(
    p.chart1 ||
    p.chart2 ||
    p.barChartGroups ||
    p.lineChartPointsStr ||
    p.pieSlices ||
    p.axisBarGroups ||
    p.scatterPoints ||
    p.miniLines ||
    p.multiLineSeries ||
    p.treeRoot ||
    p.illustrationSrc ||
    p.dataTableRows ||
    p.segmentTable
  );
}

// A page can be pushed onto the candidate screen if it's the prompt or carries an exhibit.
export function pageIsPresentable(p: CasePage): boolean {
  if (p.shareable === false) return false;
  return p.kind === "ready" || pageHasExhibit(p);
}

const ACES_PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "The prompt",
    kind: "ready",
    body: "Our client, Aces, is a package delivery firm operating in Country XYZ. Five years ago, XYZ’s government deregulated the package delivery industry, leaving three identical firms — Aces, Deuces, and Jacks — to fill the void. Each firm is required to operate in every municipality in the country.\n\nThe market has held steady at 300 million packages a year for nearly three decades. Since deregulation, Aces has charged $0.44/lb on an average package weight of 5 lbs. For the first 45 months, all three firms split the market evenly at 33.3% each, earning 10 cents of profit per dollar of revenue.\n\nAbout 15 months ago, Aces’ market share suddenly fell to 20%. Three months later it rebounded — reaching 40%, alongside revenue growth. We’ve been brought in to determine whether Aces needs to change anything given this new dynamic.",
    note: "Behavioral warm-up (ask before the case): “How would your teammates tend to describe you?” This is an interviewer-led case — work through the five questions in order below, sharing each exhibit only when noted.",
  },
  {
    n: "02",
    label: "Question 1 · Revenue",
    title: "Calculate Aces’ revenue",
    kind: "qa",
    qText:
      "Before jumping into the analysis of what happened, I’d like your help to first calculate the revenue of Aces 15 months ago and over the last 12 months. [Show Exhibit 1.]",
    chart1Legend: [
      { name: "Aces", color: "#2d6a4f" },
      { name: "Deuces", color: "#435a6b" },
      { name: "Jacks", color: "#a68a5b" },
    ],
    chart1: [
      {
        label: "First 45 months after deregulation",
        segs: [
          { pctLabel: "Aces 33%", color: "#2d6a4f", h: "80px" },
          { pctLabel: "Deuces 33%", color: "#435a6b", h: "80px" },
          { pctLabel: "Jacks 33%", color: "#a68a5b", h: "80px" },
        ],
      },
      {
        label: "15 months ago",
        segs: [
          { pctLabel: "Aces 20%", color: "#2d6a4f", h: "48px" },
          { pctLabel: "Deuces 60%", color: "#435a6b", h: "144px" },
          { pctLabel: "Jacks 20%", color: "#a68a5b", h: "48px" },
        ],
      },
      {
        label: "12 months ago",
        segs: [
          { pctLabel: "Aces 40%", color: "#2d6a4f", h: "96px" },
          { pctLabel: "Deuces 30%", color: "#435a6b", h: "72px" },
          { pctLabel: "Jacks 30%", color: "#a68a5b", h: "72px" },
        ],
      },
    ],
    calcLines: [
      { q: "Price per package", a: "$0.44/lb × 5 lbs = $2.20" },
      { q: "Deliveries until 15 months ago", a: "33% × 300M = 100M packages" },
      { q: "Revenue until 15 months ago", a: "100M × $2.20 = $220M" },
      { q: "Deliveries, last 12 months", a: "40% × 300M = 120M packages" },
      { q: "Revenue, last 12 months", a: "120M × $2.20 = $264M" },
    ],
    answerText:
      "Revenue grew from $220M (steady state) to $264M over the last 12 months — up 20%, tracking the jump in market share.",
  },
  {
    n: "03",
    label: "Question 2 · Profit",
    title: "Calculate Aces’ profit",
    kind: "qa",
    qText: "Next, I want you to calculate the profit of Aces 15 months ago, and over the last 12 months.",
    guidancePreNote: "[NOTE: Show candidate exhibit 2 and provide below information only when the interviewee asked for them.]",
    guidancePreLines: [
      "15 months ago, Facilities represented 10% of total costs. IT and Staffing each cost an additional 5% of total costs. The remaining costs were all transportation costs (depreciation of vehicles and fuel).",
      "Today (hasn’t changed since 12 month ago), total non-transportation costs (Facilities, IT and Staffing costs) combined represent only 10% of total costs, despite no change in absolute $ spent on them.",
    ],
    chart2: [
      { label: "First 45 months after deregulation", facilities: "10%", it: "5%", staffing: "5%", transportation: "80%" },
      { label: "Last 12 months", facilities: "5%", it: "2.5%", staffing: "2.5%", transportation: "90%" },
    ],
    calcNote: "All figures below are for Aces.",
    calcLines: [
      { q: "Costs until 15 months ago", a: "$220M × (1 − 10%) ≈ $200M" },
      { q: "Profit until 15 months ago", a: "$220M − $200M = $20M" },
      { q: "Non-transportation cost ($ unchanged)", a: "$200M × 20% = $40M" },
      { q: "That $40M is now only 10% of costs, so total cost =", a: "$40M ÷ 10% = $400M" },
      { q: "Profit, last 12 months", a: "$264M − $400M = −$136M" },
    ],
    answerText:
      "Aces went from +$20M profit to a $136M loss — even though revenue rose. The cost base nearly doubled to $400M and shifted almost entirely into transportation.",
    insightText:
      "Candidate should point out that the shift in transportation costs with the sudden increase in market share seems responsible for the negative earnings, and probe for why that should have changed as a percentage of revenue.",
  },
  {
    n: "04",
    label: "Question 3 · Market dynamics",
    title: "What happened to the industry",
    kind: "qa",
    qText: "Please describe what has happened to the XYZ delivery industry 15 and 12 months ago.",
    guidancePreNote: "[NOTE: Provide below information to the interviewee directly and show the candidate exhibit 3]",
    guidancePreIntro: "The package delivery industry in XYZ is segmented into three groups:",
    guidancePreLines: [
      "Local, 0-50 miles, 60% of all deliveries",
      "Regional, 51 -150 miles, 20% of all deliveries",
      "Long-haul, 150+ miles, 20% of all deliveries",
      "Assuming 100% price sensitive consumers ( only choose lower price companies)",
    ],
    segmentTitle: "Exhibit 3 · Market share by segment",
    segmentTable: [
      {
        title: "Steady state (pre-disruption)",
        padTop: "0px",
        divider: "none",
        rows: [
          { name: "All firms", local: "60%", regional: "20%", long: "20%", total: "100%", w: 700, fg: "#232623" },
          { name: "Jacks", local: "20%", regional: "6.7%", long: "6.7%", total: "33%", w: 400, fg: "#3a3f3b" },
          { name: "Deuces", local: "20%", regional: "6.7%", long: "6.7%", total: "33%", w: 400, fg: "#3a3f3b" },
          { name: "Aces", local: "20%", regional: "6.7%", long: "6.7%", total: "33%", w: 600, fg: "#2d6a4f" },
        ],
      },
      {
        title: "15 months ago (disruption begins)",
        padTop: "16px",
        divider: "1px solid #f2f3f0",
        rows: [
          { name: "All firms", local: "60%", regional: "20%", long: "20%", total: "100%", w: 700, fg: "#232623" },
          { name: "Jacks", local: "0%", regional: "10%", long: "10%", total: "20%", w: 400, fg: "#3a3f3b" },
          { name: "Deuces", local: "60%", regional: "0%", long: "0%", total: "60%", w: 400, fg: "#3a3f3b" },
          { name: "Aces", local: "0%", regional: "10%", long: "10%", total: "20%", w: 600, fg: "#2d6a4f" },
        ],
      },
      {
        title: "Last 12 months (today)",
        padTop: "16px",
        divider: "1px solid #f2f3f0",
        rows: [
          { name: "All firms", local: "60%", regional: "20%", long: "20%", total: "100%", w: 700, fg: "#232623" },
          { name: "Jacks", local: "30%", regional: "0%", long: "0%", total: "30%", w: 400, fg: "#3a3f3b" },
          { name: "Deuces", local: "30%", regional: "0%", long: "0%", total: "30%", w: 400, fg: "#3a3f3b" },
          { name: "Aces", local: "0%", regional: "20%", long: "20%", total: "40%", w: 600, fg: "#2d6a4f" },
        ],
      },
    ],
    guidanceLines: [
      "The candidate should realize that 15 months ago, Deuces broke the package delivery market into 3 segments and modified its pricing to dominate the high margin local segment and priced itself out of the regional & long-haul market. Three months later, Jacks followed suit.",
    ],
  },
  {
    n: "05",
    label: "Question 4 · Competitor economics",
    title: "Deuces’ and Jacks’ revenue and profit",
    kind: "qa",
    qText: "How much are Deuces and Jacks’ revenue and profit over the last 12 months?",
    guidancePreNote: "[NOTE: Provide below information only when the interviewee asked for them.]",
    guidancePreLines: [
      "Both Deuces and Jacks charges below prices for the different segments:",
      "Local: $0.40/lb",
      "Regional: $0.80/lb",
      "Long-Haul: $1.20",
      "Due to shorter routes, Deuces and Jacks’ transportation costs are only $100 million, while their non-transportation costs are all in line with Aces’.",
    ],
    calcLines: [
      { q: "Revenue (last 12 months)", a: "$0.40/lb × 5 lbs × 90M packages = $180M" },
      { q: "Total cost (last 12 months)", a: "$100M transportation + $40M non-transportation = $140M" },
      { q: "Profit (last 12 months)", a: "$180M − $140M = $40M" },
    ],
    answerText:
      "Each of Deuces and Jacks earns roughly $40M profit over the last 12 months — more than double Aces’ old steady-state profit, while Aces is now losing $136M.",
  },
  {
    n: "06",
    label: "Question 5 · Recommendation",
    title: "What should Aces do?",
    kind: "qa",
    qText: "What should Aces do?",
    guidanceLines: [
      "Mimic competitors — reprice by segment and fight to win share back in the high-margin Local segment.",
      "Or defend the Regional/Long-haul segments where Aces already dominates, and raise prices there to rebuild margin.",
      "Either path should pair with a push to cut transportation costs and build a durable advantage in Regional/Long-haul — likely the more sustainable route.",
    ],
    answerText:
      "There’s no single right answer — reward candidates who weigh both paths, then commit to a recommendation that quantifies the trade-off (segment repricing vs. cost-driven defense of Regional/Long-haul) and names a clear next step.",
  },
  {
    n: "07",
    label: "Interviewer cheat sheet",
    title: "Key numbers at a glance",
    kind: "cheat",
    cheatRows: [
      { label: "Steady state (33% share)", rev: "$220M", cost: "$200M", profit: "+$20M", fg: "#2d6a4f" },
      { label: "Last 12 mo — Aces (40% share)", rev: "$264M", cost: "$400M", profit: "−$136M", fg: "#b0453a" },
      { label: "Last 12 mo — Deuces / Jacks (30% each)", rev: "$180M", cost: "$140M", profit: "+$40M", fg: "#2d6a4f" },
    ],
    cheatTakeaway:
      "Aces swung from +$20M profit to a $136M loss in a year — not because volume fell (it actually grew from 100M to 120M packages) but because rivals carved out the low-cost Local segment, forcing Aces into a Regional/Long-haul mix with far higher transportation cost per package. Deuces and Jacks are each clearing $40M by contrast. The fix has to address cost-per-route, not just volume or headline market share.",
  },
];

const AMAIR_PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "The prompt",
    kind: "ready",
    body: "Your client is American Airlines. Competition is fierce among the major airlines, with prices being driven steadily downward. After a year of weaker-than-average growth, they have hired our firm to devise a set of strategies for growth.\n\nObjective (if asked to clarify): Assume management’s goal is profitable revenue growth, rather than cost cutting.",
    note: "This is an interviewee-led case — hand the candidate the prompt and let them drive the structure. It’s a qualitative growth case with limited quantitative data; the goal is a wide range of suggestions, not depth on one idea. Only reveal Exhibit 4 if the candidate notes that on routes served by few competitors, the company could raise prices.",
  },
  {
    n: "02",
    label: "Case overview",
    title: "Case Overview [Interviewee-led]",
    kind: "qa",
    guidanceLabel: "Case Overview [Interviewee-led]",
    guidanceLines: [
      "This is a qualitative version of a growth strategy case. There is only one calculation in the case and fairly limited quantitative data. The goal for the candidate should be to generate a wide range of suggestions rather than look to dig very deeply into one particular suggestion. Only give Exhibit 4 if the candidate notes that for routes served by few competitors, the company could raise prices. In addition, encourage them to make assumptions where necessary. However, they should look to gain insights from the qualitative data presented in the Exhibits, but these are not exhaustive of all possible solutions.",
    ],
  },
  {
    n: "03",
    label: "Case information",
    title: "Reference for the interviewer",
    kind: "qa",
    infoBoxLabel: "Case Information · background",
    infoSections: [
      {
        label: "General insights",
        labelSize: "14.5px",
        labelNote: "(Only give if requested)",
        iconLines: [
          {
            icon: "💳",
            text: "Pricing handled by computer system – currently based on class of seat (first, business, economy class) and time to flight – all inclusive in ticket price",
          },
          {
            icon: "✈️",
            text: "Market highly fragmented overall as there are over ten competitors in the market, each of which holds a relatively small share (no dominant player)",
          },
          { icon: "🛫", text: "However, many routes are only served by 1–2 companies" },
          { icon: "👥", text: "There are two major segments in the air transportation market: vacationers and business travelers." },
          {
            icon: "👔",
            text: "Business travelers make up a slight majority of business class seats and a vast majority of first class seats. Essentially all economy class seats are taken by vacationers.",
          },
          { icon: "📊", text: "For Exhibit 4, assume the variable cost with filling a seat is negligible" },
        ],
      },
      {
        label: "Insights on revenue",
        labelSize: "14.5px",
        paragraphs: ["Any solution should look at all possible areas of revenue growth: price and volume."],
        groups: [
          {
            heading: "Price",
            items: [
              "Likely rule out pure price increases due to the competitiveness of the market.",
              "One potential solution is unbundling the ticket price (e.g. baggage check-in, snacks, etc. become extra, rather than part of the ticket price).",
              "Vacationers are much more price sensitive, so these strategies will be more effective in economy class and potentially business class.",
            ],
          },
          {
            heading: "Volume",
            items: [
              "Examine ways to increase the number of customers — both taking customers away from competitors and inducing new customers to enter the market.",
              "Look at ways to increase the number of flights per customer.",
              "One suggestion is a loyalty program, as this would increase the number of flights per customer and make them less likely to defect to a competitor.",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "03b",
    shareable: false,
    label: "Case information",
    title: "Exhibit-by-exhibit takeaways",
    kind: "qa",
    infoBoxLabel: "Case Information · what to listen for",
    infoSections: [
      {
        steps: [
          {
            n: "1",
            text: "From Exhibit 1, the candidate should notice that quality of service is highly important to business travelers and thus this could provide a competitive advantage.",
          },
          {
            n: "2",
            text: "From Exhibit 2, the candidate should notice that the airplanes are almost fully booked during the winter season (typical vacationing season) and relatively empty during the summer. Thus a strong suggestion would also include some way to boost summer sales.",
          },
          {
            n: "3",
            text: "From Exhibit 3, they should notice that unbundling the baggage cost from the ticket price is likely to increase sales (as stated earlier) and that improving the company’s listing on comparison websites will make them more likely to reach the proportion of consumers who use these sites.",
          },
          {
            n: "4",
            text: "From Exhibit 4, since variable costs are negligible, the candidate should look to maximize revenue — find the number of seats occupied, then multiply by price per seat.",
          },
        ],
      },
    ],
    dataTableTitle: "Quick reference · revenue by occupancy (Exhibit 4)",
    dataTableCols: "repeat(4, 1fr)",
    dataTableHeaders: [
      { v: "Occupancy", align: "left" },
      { v: "Seats occupied", align: "left" },
      { v: "Price / seat", align: "left" },
      { v: "Revenue", align: "left" },
    ],
    dataTableRows: [
      { cells: [{ v: "100%", align: "left", w: 400, fg: "#3a3f3b" }, { v: "200", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$400", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$80,000", align: "left", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "90%", align: "left", w: 400, fg: "#3a3f3b" }, { v: "180", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$500", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$90,000", align: "left", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "80%", align: "left", w: 400, fg: "#3a3f3b" }, { v: "160", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$600", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$96,000", align: "left", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "70%", align: "left", w: 700, fg: "#2d6a4f" }, { v: "140", align: "left", w: 700, fg: "#2d6a4f" }, { v: "$700", align: "left", w: 700, fg: "#2d6a4f" }, { v: "$98,000", align: "left", w: 700, fg: "#2d6a4f" }] },
      { cells: [{ v: "60%", align: "left", w: 400, fg: "#3a3f3b" }, { v: "120", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$800", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$96,000", align: "left", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "50%", align: "left", w: 400, fg: "#3a3f3b" }, { v: "100", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$900", align: "left", w: 400, fg: "#3a3f3b" }, { v: "$90,000", align: "left", w: 400, fg: "#3a3f3b" }] },
    ],
    answerText:
      "Revenue is maximized at a price of $700 and an occupancy rate of 70%. Occupancy isn’t constant over the year (Exhibit 2) — 70% is close to the annual average, so this holds up as a sensible average-case answer. These suggestions aren’t exhaustive — any idea that makes sense in this competitive, price-sensitive market is acceptable.",
  },
  {
    n: "04",
    label: "Exhibit 1",
    title: "What matters most, by traveler type",
    kind: "qa",
    qText: "Share if the candidate asks what customers value when choosing an airline.",
    barChartTitle: "Percentage of respondents rating factor “very important” when choosing airline",
    barChartLegend: [
      { name: "Business", color: "#15294d" },
      { name: "Vacation", color: "#2d6a4f" },
    ],
    barChartGroups: [
      { label: "Price", gap: "6px", isLast: "1px solid #eceee9", bars: [{ valueLabel: "20%", h: "28px", w: "28px", color: "#15294d" }, { valueLabel: "90%", h: "126px", w: "28px", color: "#2d6a4f" }] },
      { label: "Time of Departure", gap: "6px", isLast: "1px solid #eceee9", bars: [{ valueLabel: "30%", h: "42px", w: "28px", color: "#15294d" }, { valueLabel: "65%", h: "91px", w: "28px", color: "#2d6a4f" }] },
      { label: "Quality and Comfort", gap: "6px", isLast: "1px solid #eceee9", bars: [{ valueLabel: "65%", h: "91px", w: "28px", color: "#15294d" }, { valueLabel: "20%", h: "28px", w: "28px", color: "#2d6a4f" }] },
      { label: "Attentive Service", gap: "6px", isLast: "1px solid #eceee9", bars: [{ valueLabel: "85%", h: "119px", w: "28px", color: "#15294d" }, { valueLabel: "15%", h: "21px", w: "28px", color: "#2d6a4f" }] },
      { label: "Variety of Destinations", gap: "6px", isLast: "none", bars: [{ valueLabel: "20%", h: "28px", w: "28px", color: "#15294d" }, { valueLabel: "10%", h: "14px", w: "28px", color: "#2d6a4f" }] },
    ],
  },
  {
    n: "05",
    label: "Exhibit 2",
    title: "Seasonal occupancy",
    kind: "qa",
    qText: "Share if the candidate asks about demand patterns over the year.",
    lineChartTitle: "Average percentage of seats sold by month",
    lineChartColor: "#2d6a4f",
    lineChartPointsStr:
      "40,42.5 92.7,50 145.5,27.5 198.2,57.5 250.9,80 303.6,95 356.4,105.5 409.1,84.5 461.8,72.5 514.5,65 567.3,42.5 620,20",
    lineChartGridY: [
      { y: "20", topPct: "9.52", label: "100%" },
      { y: "57.5", topPct: "27.38", label: "75%" },
      { y: "95", topPct: "45.24", label: "50%" },
      { y: "132.5", topPct: "63.10", label: "25%" },
      { y: "170", topPct: "80.95", label: "0%" },
    ],
    lineChartPoints: [
      { x: "40", y: "42.5", leftPct: "6.25", month: "Jan" },
      { x: "92.7", y: "50", leftPct: "14.48", month: "Feb" },
      { x: "145.5", y: "27.5", leftPct: "22.73", month: "Mar" },
      { x: "198.2", y: "57.5", leftPct: "30.97", month: "Apr" },
      { x: "250.9", y: "80", leftPct: "39.20", month: "May" },
      { x: "303.6", y: "95", leftPct: "47.44", month: "Jun" },
      { x: "356.4", y: "105.5", leftPct: "55.69", month: "Jul" },
      { x: "409.1", y: "84.5", leftPct: "63.92", month: "Aug" },
      { x: "461.8", y: "72.5", leftPct: "72.16", month: "Sep" },
      { x: "514.5", y: "65", leftPct: "80.39", month: "Oct" },
      { x: "567.3", y: "42.5", leftPct: "88.64", month: "Nov" },
      { x: "620", y: "20", leftPct: "96.88", month: "Dec" },
    ],
  },
  {
    n: "06",
    label: "Exhibit 3",
    title: "Price sensitivity survey",
    kind: "qa",
    qText: "Share if the candidate asks about price sensitivity or booking behavior.",
    dataTableTitle: "Exhibit 3 · Price sensitivity survey — % of respondents agreeing",
    dataTableCols: "2.4fr 0.8fr 0.8fr",
    dataTableHeaders: [
      { v: "Statement", align: "left" },
      { v: "Yes", align: "right" },
      { v: "No", align: "right" },
    ],
    dataTableRows: [
      { cells: [{ v: "“I would take a worse departure time if it was cheaper”", align: "left", w: 400, fg: "#3a3f3b" }, { v: "60%", align: "right", w: 600, fg: "#2d6a4f" }, { v: "40%", align: "right", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "“I would reduce my amount of baggage if that reduced the price”", align: "left", w: 400, fg: "#3a3f3b" }, { v: "80%", align: "right", w: 600, fg: "#2d6a4f" }, { v: "20%", align: "right", w: 400, fg: "#3a3f3b" }] },
      { cells: [{ v: "“I would take a layover overnight to save money”", align: "left", w: 400, fg: "#3a3f3b" }, { v: "15%", align: "right", w: 400, fg: "#3a3f3b" }, { v: "85%", align: "right", w: 600, fg: "#2d6a4f" }] },
      { cells: [{ v: "“I use discounting services such as comparison websites when choosing my flight”", align: "left", w: 400, fg: "#3a3f3b" }, { v: "55%", align: "right", w: 600, fg: "#2d6a4f" }, { v: "45%", align: "right", w: 400, fg: "#3a3f3b" }] },
    ],
  },
  {
    n: "07",
    label: "Exhibit 4",
    title: "Price elasticity — JFK to IAH",
    kind: "qa",
    qText:
      "Only reveal if the candidate notes that on routes served by few competitors, the company could raise prices. Assume the variable cost of filling a seat is negligible; assume a 200-seat capacity.",
    lineChartTitle: "Price per seat vs. seats filled — JFK to IAH",
    lineChartColor: "#3f6ea5",
    lineChartXLabel: "Seats filled",
    lineChartPointsStr: "40,20 156,50 272,80 388,110 504,140 620,170",
    lineChartGridY: [
      { y: "20", topPct: "9.52", label: "$900" },
      { y: "50", topPct: "23.81", label: "$800" },
      { y: "80", topPct: "38.10", label: "$700" },
      { y: "110", topPct: "52.38", label: "$600" },
      { y: "140", topPct: "66.67", label: "$500" },
      { y: "170", topPct: "80.95", label: "$400" },
    ],
    lineChartPoints: [
      { x: "40", y: "20", leftPct: "6.25", month: "50%" },
      { x: "156", y: "50", leftPct: "24.38", month: "60%" },
      { x: "272", y: "80", leftPct: "42.50", month: "70%" },
      { x: "388", y: "110", leftPct: "60.63", month: "80%" },
      { x: "504", y: "140", leftPct: "78.75", month: "90%" },
      { x: "620", y: "170", leftPct: "96.88", month: "100%" },
    ],
  },
  {
    n: "08",
    label: "Wrap-up",
    title: "Approach & Analysis",
    kind: "qa",
    qText: "Ask the candidate to land on 2–3 concrete recommendations.",
    guidanceLines: [
      "First, the company could look to lower its listed price by making some of the additional services an extra charge, thus capturing the price-sensitive vacation market.",
      "Next, they should boost the quality of service for first-class seats, which will provide sustainable differentiation over the competitors.",
      "Finally, look into loyalty programs to boost overall sales, and discounts or package deals with resorts during the summer months to boost sales in the typically under-booked summer.",
    ],
  },
];

const FIRE_PROOF_PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "The prompt",
    kind: "ready",
    body: "The CEO of Fire Proof Inc. wants to find new ways to diversify her revenue and product line. Currently, Fire Proof only sells fire resistant jackets, gloves, hard-hats, and tools to government sponsored fire departments nationwide. The CEO believes the company can expand their operations to make equipment for other industries. How would you advise Fire Proof Inc.?",
    note: "Interviewer-led case (Parthenon EY · Round 1 style). Optional behavioral warm-ups first: (1) What is your favorite class at school? (2) Tell me about a time where you had to make a decision with limited information. What was your approach? Then read the prompt and let the candidate structure before you reveal anything below.",
  },
  {
    n: "02",
    label: "Clarifying information",
    title: "Answers to give only if asked",
    kind: "qa",
    guidancePreLabel: "Clarifying information",
    guidancePreNote: "Provide this only if corresponding questions are asked.",
    guidancePreLines: [
      "How does Fire Proof Inc. make money? — They sign contracts with municipalities and cities to supply fire proof apparel to fire departments.",
      "How large is Fire Proof Inc.? — Fire Proof Inc. does $500M in annual sales and has been growing at 4% yearly over the last 5 years.",
      "How many competitors do they have / Market position? — Fire Proof is number 1 in the fire equipment market but they have 3 main competitors that compete for government contracts.",
      "How diversified are their competitors? — Fire equipment makes up no more than 25% of all 3 competitors' revenue.",
      "Why haven't Fire Proof diversified their business before? — The company focused on mastering what they knew and improving their operations in building fire equipment.",
    ],
  },
  {
    n: "03",
    label: "Framework guidance",
    title: "A strong structure for this case",
    kind: "qa",
    infoBoxLabel: "Framework guidance",
    infoSections: [
      {
        paragraphs: [
          "Many frameworks work — these are suggestions, not the only answer. A strong structure covers internal fit, product similarity, market attractiveness, and the financials.",
        ],
        groups: [
          {
            heading: "Internal capabilities",
            items: [
              "Manufacturing capacity — can we build it?",
              "Supply-chain capacity — do we have the network?",
              "Industry knowledge — do we have the talent to make a good product?",
              "Financial resources — can Fire Proof afford the investment?",
            ],
          },
          {
            heading: "Product similarities",
            items: [
              "Raw-material overlap — can we use the same materials?",
              "Customer overlap — are the customers similar (government)?",
              "Production overlap — is the manufacturing process similar?",
            ],
          },
          {
            heading: "Market attractiveness",
            items: [
              "How many competitors are in the new industry?",
              "How big is the new market?",
              "Is the new market growing?",
              "Are there high barriers to entry?",
            ],
          },
          {
            heading: "Financials",
            items: [
              "What investment is required to enter?",
              "Acquire a company or build internally?",
              "What profit margins can Fire Proof achieve?",
              "When does the company break even?",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "How to move forward",
    guidanceLines: [
      "The candidate should include product similarity somewhere in their framework — call attention to that bullet.",
      "Then mention: the client has already researched supplying equipment for police departments, and Exhibit 1 details what they found. Present Exhibit 1 (the next step).",
    ],
  },
  {
    n: "04",
    label: "Question 1 · Exhibit 1",
    title: "Choosing where to play",
    kind: "qa",
    qText: "Which product market is the most & least attractive for Fire Proof to enter? Why?",
    dataTableTitle: "Exhibit 1",
    dataTableFootnote: "* Annual market growth over the last 3 years",
    dataTableCols: "2.1fr 1fr 1fr 1.1fr 1.3fr",
    dataTableHeaders: [
      { v: "Police Equipment", align: "left" },
      { v: "Production Overlap", align: "center" },
      { v: "Market Size", align: "center" },
      { v: "Market Growth*", align: "center" },
      { v: "# of Competitors", align: "center" },
    ],
    dataTableRows: [
      { cells: [
        { v: "Officer Uniforms", align: "left", w: 600, fg: "#3a3f3b", icon: "shirt" },
        { v: "100% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 1 },
        { v: "$1.5B", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "5%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "3", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Hand Cuffs", align: "left", w: 600, fg: "#3a3f3b", icon: "cuffs" },
        { v: "25% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.25 },
        { v: "$300M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "-2%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "8", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Police Badges", align: "left", w: 600, fg: "#3a3f3b", icon: "badge" },
        { v: "25% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.25 },
        { v: "$100M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "3%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "4", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Bullet Proof Vests", align: "left", w: 600, fg: "#3a3f3b", icon: "vest" },
        { v: "75% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.75 },
        { v: "$600M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "10%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "20", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Weapon Holsters", align: "left", w: 600, fg: "#3a3f3b", icon: "holster" },
        { v: "50% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.5 },
        { v: "$300M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "5%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "12", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Riot Shields", align: "left", w: 600, fg: "#3a3f3b", icon: "shield" },
        { v: "75% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.75 },
        { v: "$450M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "12%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "6", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Body Cameras", align: "left", w: 600, fg: "#3a3f3b", icon: "camera" },
        { v: "12.5% production overlap", align: "center", w: 400, fg: "#3a3f3b", harvey: 0.125 },
        { v: "$250M", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "50%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "25", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
    ],
    answerText:
      "- Most attractive: **Bullet Proof Vests**. Why?\n  1. **High production overlap**\n  2. **Second largest market size**\n  3. **Double digit growth**\n  4. **Fragmented market** for easier penetration\n- Least attractive: **Police Badges**. Why?\n  1. **Low production overlap**\n  2. **Smallest market**\n  3. **Low growth**\n  4. **Highly concentrated market**",
    insightLabel: "After looking at Exhibit 1, candidates should be able to identify and call out the following",
    insightText:
      "The most attractive markets have **1. high production overlap, 2. large market sizes, 3. high growth, and 4. higher number of competitors (fragmented market)**.",
    answerBonusLabel: "Bonus call-outs",
    answerBonusLines: [
      "**Uniforms** look interesting because of its large size and overlap, but the **high concentration of competitors** makes for a difficult market entry.",
      "**Body Cameras** look interesting due to the high growth and market fragmentation, but this should be avoided because it is **out of Fire Proof's area of expertise** (as illustrated from the low overlap).",
      "**Riot Shields** are a close second place to bullet proof vests because although it has a faster growth rate, it also has **fewer competitors (more concentrated market)**.",
    ],
    nextStepText: "Once the candidate identifies that bullet proof vests is the most attractive market, move on to Question 2.",
  },
  {
    n: "05",
    label: "Question 2 · Revenue",
    title: "Sizing the prize",
    kind: "qa",
    qText:
      "Our team has done some internal analysis and have identified that Fire Proof can realistically capture 30% of the bullet proof vest market in 3 years. What is Fire Proof's projected revenues for bullet proof vests in year 3?",
    guidancePreNote: "Supply only when asked:",
    guidancePreLines: ["Assume that the market will continue to grow at 10% each year over the next 3 years."],
    calcNote: "Directions: 10% of 660 = 66.",
    calcLines: [
      { q: "Year 1", a: "($600M × 1.1) = $660M" },
      { q: "Year 2", a: "($660M × 1.1) = ($660M + $66M) = $726M" },
      { q: "Year 3", a: "($726M × 1.1) = ($726M + $72.6M) = $798.6M ≈ round to $800M" },
      { q: "Fire Proof Revenue", a: "$800M × 30% = $240M in 3 years" },
    ],
    answerText: "Fire Proof Revenue = $800M × 30% = **$240M** in 3 years.",
  },
  {
    n: "06",
    label: "Question 3 · ROI",
    title: "Testing the return",
    kind: "qa",
    qText:
      "Our team has identified that Fire Proof will need to invest $100M in capital expenditures to configure their plants to make bullet proof vests. If the company has a target ROI in 3 years of at least 15%, will they meet their goal?",
    guidancePreNote: "Supply only when asked:",
    guidancePreLines: [
      "Estimated market share by year: Year 1: 10%, Year 2: 20%, Year 3: 30%",
      "Average yearly net profit margin: 25%",
    ],
    calcNote: "Directions: 25% = 2 × 10% of 66 + ½ × 10% of 66.",
    calcLines: [
      { q: "Year 1", a: "Revenue = 10% × $660M = $66M\nNet profit = (25% × $66M) = $13.2M + $3.3M = $16.5M" },
      { q: "Year 2", a: "Revenue = 20% × $726M = ($72.6M × 2) = $145.2M\nNet profit = (25% × $145.2M) = ($14.52M × 2) = $29.04M + $7.26M = $36.3M" },
      { q: "Year 3", a: "Revenue = 30% × $800M = $240M\nNet profit = ($240M ÷ 4) = $60M" },
      { q: "Total net profit over 3 years", a: "$16.5M + $36.3M + $60M = $112.8M", stack: true },
      { q: "ROI", a: "(~$113M − $100M) ÷ $100M = ~13%", stack: true },
    ],
    guidanceLabel: "Post-analysis question",
    guidanceLines: [
      "Ask the interviewee if he/she thinks this is still a good investment despite not hitting the 15% goal. (No right or wrong answers.)",
      "Expected answers:",
      "  **Yes**, because it is very close and the company needs to diversify (main priority).",
      "  **No**, because there may be other markets we haven't explored yet that can allow them to hit their goals.",
    ],
  },
  {
    n: "07",
    label: "Brainstorming",
    title: "Beyond police equipment",
    kind: "qa",
    qText:
      "Beyond just the police department, what are other markets and/or products that Fire Proof can consider to diversify their revenue stream?",
    infoBoxLabel: "Brainstorming guidance",
    infoSections: [
      {
        paragraphs: [
          "Note: This is just one possible set of categories and answers. Many more are possible, and interviewers should assess both the volume and relevance of answers.",
        ],
        groups: [
          { heading: "Military Equipment", items: ["Military vests", "Weapon Harness", "Military uniforms", "Etc."] },
          { heading: "Medical Accessories", items: ["Medical coats", "Stethoscopes", "Gloves", "Tunics"] },
          { heading: "Construction", items: ["Hardhats", "Construction jackets", "Safety visors / glasses", "Hammers, pick-axe, etc."] },
          { heading: "Recreational Gear", items: ["Hiking Boots", "Heavy duty jackets", "Sleeping bags", "Thermal gear"] },
        ],
      },
      {
        paragraphs: [
          "Creative candidates will be able to quickly map out alternative industries and products for diversification. The best candidates will have clear buckets representing industries followed by a list of potential product lines to support that industry / market.",
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Conclusion · Recommendation",
    title: "Landing the recommendation",
    kind: "qa",
    qText:
      "Should Fire Proof diversify their product stream to make bullet proof vests for police departments? (Yes/No & why?)",
    guidanceLabel: "To conclude, the interviewee should provide the following",
    guidanceLines: [
      "**Recommendation:** Yes/No & why? Mention what makes the market attractive / not attractive, and what the financial implications are.",
      "**Risks (if yes):** could include cost overruns to the $100M projected investment, competitors fight back hard (eroding profit margins), competitor relationships with customers may be strong, government budgets could change, etc.",
      "**Risks (if no):** potential lack of other alternatives, another competitor enters the bullet proof vest market first, company is still undiversified.",
      "**Next steps:** explore other potential markets (as discussed in brainstorming), explore acquisition vs. internal investment approach, dive deeper into competitor contract relationships, etc.",
    ],
  },
];

const DUCK_ISLAND_PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Prompt #1",
    kind: "ready",
    body: "Your client is a craft beer company called Duck Island Beer Company out of Austin, TX. They are an international craft beer company beloved by craft drinkers around the world. They are looking to start selling beer in the United Kingdom. They want to know which style of beer to sell and if it would be profitable.",
    note: "**Behavioral Questions** — **Question 1:** Describe a time when you were challenged? How did you handle the situation? **Question 2:** What is the most creative thing you have ever done?",
  },
  {
    n: "02",
    label: "Prompt 1 · Background",
    title: "Background information if asked",
    kind: "qa",
    guidancePreLabel: "Background Information if asked",
    guidancePreLines: [
      "Market Share - See **Exhibit 1**",
      "Profit/Revenue - ==$43B== in Revenue, ==$10B== in Profit",
      "Portfolio of beers - Over ==50 brands== split between lagers, ales, IPAs, and stouts.",
      "Current Strategy - Seeking **rapid expansion** and revenue in any way possible",
      "UK shows **potential** as a craft market",
      "Duck Island currently operates everywhere in the world **except the UK, Africa and Australia**",
    ],
    guidanceLabel: "Guidance",
    guidanceLines: [
      "Candidate should do a **profitability analysis** and determine if this is fits their strategy and also if it will be profitable.",
    ],
  },
  {
    n: "03",
    label: "Prompt 1 · Guidance",
    title: "Interviewer guidance",
    kind: "qa",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "This case is meant to be **driven by interviewee**, allow him/her to drive the case after each prompt and respond with **“ands”** if depth of explanation does not make path forward clear.",
      "Most candidates will recognize that this is a **profitability case**. But a good candidate will see **aspects of market entry** and tailor their problem solving accordingly. Additionally, he or she will focus on the **qualitative aspects** of the beer industry.",
      "Interviewee should develop a **MECE framework**, some example buckets are: **External:** market factors, customer demand, regulatory concerns; **Revenue:** pricing strategy, volume, service offerings; **Costs:** ID variable and fixed cost, benchmarking competitors; **Market:** Competition, market share, barriers to entry; **Entry:** acquisition, JV, build from ground up",
      "Drive the interviewee to think about **trends in the beer market in the US** and if those will apply abroad. You can **coach** the interviewee to use real life examples of what they know about the craft industry.",
      "Exhibits should be **handed out as the interviewee asks** for certain aspects. They should realize that the client has a **large market share (and power)**, that there is **potential in the UK for craft** and specifically for the style of beer known as **India Pale Ale (IPA)**.",
    ],
  },
  {
    n: "04",
    label: "Exhibit 1",
    title: "Global Market Share",
    kind: "qa",
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: ["To be handed **whenever asked about market share**"],
    pieTitle: "Exhibit 1 · Global Market Share",
    pieSlices: [
      { label: "Duck Island", value: 39, color: "#2d6a4f" },
      { label: "Smith Cools", value: 12, color: "#8b9dc3" },
      { label: "Hammerstein", value: 7, color: "#2f4a8a" },
      { label: "Star Beer", value: 7, color: "#c9a227" },
      { label: "~100 Companies", value: 35, color: "#b8bdb9" },
    ],
    answerText:
      "- Biggest insight is that the client has the **largest piece of the pie** and few competitors\n- The market is an **oligopoly** between a few players with a lot of the power",
  },
  {
    n: "05",
    label: "Exhibit 2",
    title: "Beer Market in UK",
    kind: "qa",
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "Exhibit shows **total amount of brands by style** in the marketplace and **how many competitors** own those brands",
    ],
    axisBarTitle: "Exhibit 2 · Beer Market in UK",
    axisBarYLabel: "Total Numbers",
    axisBarYMax: 35,
    axisBarYStep: 5,
    axisBarSeries: [
      { name: "Brands", color: "#b8bdb9" },
      { name: "Competitors", color: "#c9a227" },
    ],
    axisBarGroups: [
      { label: "Lager", values: [20, 8] },
      { label: "Ale", values: [25, 10] },
      { label: "India Pale Ale", values: [4, 2] },
      { label: "Stout", values: [30, 10] },
    ],
    answerText: "- The IPA category has the **least amount of brands and competition**",
  },
  {
    n: "06",
    label: "Exhibit 3",
    title: "Beer Sales in millions of USD in the UK",
    kind: "qa",
    guidancePreLabel: "Exhibit #3 Guidance",
    guidancePreLines: ["Exhibit shows **recent trends in sales** by style of beer"],
    miniLinesTitle: "Exhibit 3 · Beer Sales in millions of USD in the UK",
    miniLines: [
      { title: "Ales", color: "#c9a227", xLabels: ["2013", "2014", "2015", "2016"], values: [5, 7, 8, 8], yMax: 10, yStep: 2 },
      { title: "IPAs", color: "#c9a227", xLabels: ["2013", "2014", "2015", "2016"], values: [0.5, 2, 3, 3.5], yMax: 4, yStep: 0.5 },
      { title: "Lagers", color: "#c9a227", xLabels: ["2013", "2014", "2015", "2016"], values: [9, 10, 10.8, 11], yMax: 12, yStep: 2 },
      { title: "Stouts", color: "#c9a227", xLabels: ["2013", "2014", "2015", "2016"], values: [8.2, 9.4, 10.2, 9.2], yMax: 12, yStep: 2 },
    ],
    answerText:
      "- The IPA category has shown the **biggest increase in sales**\n- A good candidate will connect this with the **lack of competition** in a style of beer that is increasing in popularity\n- This should lead the candidate to want to specifically choose the style of **India Pale Ale (IPA)** as the style to analyze for potential export\n- At this point, the interviewee should explore **entering the UK craft market with an IPA** as the product.",
  },
  {
    n: "07",
    label: "Prompt 2",
    title: "Factors in going abroad",
    kind: "qa",
    qText: "What factors would influence this decision to go abroad?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "Interviewee should be allowed to take **a few minutes** and brain-storm in a **MECE** fashion. Some of the factors could be as following",
        ],
        groups: [
          { heading: "Internal", items: ["Cash on hand for CapEx", "Knowledge of the UK market & Marketing strategy"] },
          {
            heading: "External",
            items: [
              "Competition",
              "Barriers to entry",
              "Distribution channels",
              "Tariffs",
              "Regulatory concerns",
              "Converting a traditional beer culture into a more craft-oriented culture",
              "Shipping costs if brewed in the US",
              "Costs if brewed locally in the UK",
              "US price points vs. UK price points",
              "Added costs to expand the supply chain (more hops, bottles, packaging)",
            ],
          },
          { heading: "Other", items: ["Legal drinking age in UK", "Brexit", "USD to Euro conversions and volatility"] },
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Prompt 3",
    title: "Two methods of entry",
    kind: "qa",
    qText:
      "Our internal strategy team has decided that:\n- The market is **favorable for entry**\n- We want to launch our flagship beer the “**Duck Island IPA**”\n- We want you to provide your analysis on one of **two methods of entry**\n  1. **Brew in the US** and export to the UK\n  2. **Brew locally in the UK** and brand it as a US Beer\n- **Which one do you recommend and why?**",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreNote:
      "**Share** the following data estimated by the internal strategy team **verbally** with the caser. **Coach** him/her to come up with **profitability** and **recommendation**",
    guidancePreLines: [
      "**General Data** — Estimated sales in 1st year = ==2,000 Barrels==",
      "**General Data** — Price = ==$10 per 6 Pack==",
      "**General Data** — ==165== 12 oz. Bottles in a Barrel",
      "**Imported from US** — Cost of brewing = ==$0.50 per Bottle==",
      "**Imported from US** — Cost of shipping = ==$0.50 per Bottle==",
      "**Imported from US** — Tariffs for a 6 pack of bottles = ==$1 per 6 Pack==",
      "**Brewed in UK** — Cost of Brewing = ==$0.50 per Bottle==",
      "**Brewed in UK** — Cost of shipping = ==$0.50 per Bottle==",
      "**Brewed in UK** — ==No Tariffs==",
      "**Brewed in UK** — CapEx for new brewery operations = ==$110,000==",
    ],
    calcNote: "The profitability should come out as ==$330,000== for both scenarios calculated as follows:",
    calcLines: [
      { q: "Total number of bottles", a: "2000 Barrels x (165 x 2) Bottles/Barrels = ==660,000==", stack: true },
      { q: "Revenues", a: "$10/six pack × 660,000/6 = ==$1.1M==", stack: true },
      {
        q: "Cost of importing from the US",
        a: "(Cost of brewing/bottle + Cost of shipping per bottle + Tariff per bottle) × Number of bottles\n= (0.5 + 0.5 + (1/6)) × 660,000 = ==$770,000==",
        stack: true,
      },
      {
        q: "Total cost of brewing in UK",
        a: "(Cost of brewing/bottle + Cost of shipping per bottle) × Number of bottles + CapEx\n= (0.5 + 0.5) × 660,000 + 110,000 = ==$770,000==",
        stack: true,
      },
      { q: "Total profits in both cases", a: "Revenues − Total costs\n= $1.1M − $0.77M = $0.33M = ==$330,000==", stack: true },
    ],
    answerText:
      "- The candidate can choose to **brew in the US** and see the potential growth as it being marketed as an “imported US beer”\n- The candidate can also choose to **brew in the UK** and recognize that after the first year CapEx, they can have higher profit with lower costs",
  },
  {
    n: "09",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText:
      "Jason Stamm, CEO of Duck Island, is expected to walk in the room in about 5 minutes and wants to hear our thoughts about the direction his company should take in the future. **What do you recommend?**",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "A good candidate will **take a moment to structure** his or her thoughts. These thoughts might include:",
      "  **Leading with recommendation first** in launch or do not launch.",
      "  **High level explanation** of the basis of this decision",
      "  **A clear decision** as to why go towards one recommendation over another (both options have the same profit of ==$330,000==)",
      "  **Risks**",
      "  **Next Steps**",
    ],
  },
];

const WHALE_HOTEL_PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case prompt",
    kind: "ready",
    body: "Our client is a real estate company that owns and operates luxury hotels around the world. They've previously owned 3 resorts in Dubai and are considering building a fourth, targeted specifically at high net worth individuals - called whales.",
    note: "**Behavioral Interview Question** — As a consulting professional, you will often have to resolve conflict within teams. Tell me about a time you successfully resolved conflict in a team setting.",
  },
  {
    n: "02",
    label: "Clarifying information",
    title: "Clarifying information",
    kind: "qa",
    guidancePreLabel: "Clarifying Information",
    guidancePreNote: "Note: Provide this **only if corresponding questions are asked**.",
    guidancePreLines: [
      "What's the payback period? **5 years**",
      "How long is the construction period? **2 years**",
      "What is the tourism industry in Dubai like? **Very ritzy and highly seasonal (25% increase in the summer)**",
      "Does the company currently own hotels in Dubai? **No - ignore cannibilization**",
      "Are there any similar resorts in Dubai? **Yes, the King's Palace, the Belzor, and the Egyptian**",
    ],
  },
  {
    n: "03",
    label: "Prompt 1",
    title: "Whales per night",
    kind: "qa",
    qText:
      "After looking at Exhibit 1, calculate the total number of whales at expected at each hotel each night.",
    guidancePreLabel: "Prompt 1",
    guidancePreLines: [
      "**Hand the candidate Exhibit 1**",
      "**Prompt the candidate to do Peak and Off-Peak separately**",
    ],
    dataTableTitle: "Exhibit 1",
    dataTableFootnote: "Note: Peak season runs from June - August",
    dataTableCols: "1.25fr 0.8fr 1fr 1fr 1.15fr 1fr 1fr 1fr",
    dataTableHeaders: [
      { v: "Resort", align: "left" },
      { v: "# of Rooms", align: "center" },
      { v: "Off-Peak Utilization", align: "center" },
      { v: "Off-Peak Whales %", align: "center" },
      { v: "Rate", align: "center" },
      { v: "Pool Quality", align: "center" },
      { v: "Peak* Utilization", align: "center" },
      { v: "Peak* Whales %", align: "center" },
    ],
    dataTableRows: [
      { cells: [
        { v: "King's Palace", align: "left", w: 600, fg: "#3a3f3b" },
        { v: "5000", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "80%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "25%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "$2000/night", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "Poor", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "80%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "25%", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Egyptian", align: "left", w: 600, fg: "#3a3f3b" },
        { v: "4000", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "75%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "25%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "$2000/night", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "Good", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "95%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "37.5%", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
      { cells: [
        { v: "Belzor", align: "left", w: 600, fg: "#3a3f3b" },
        { v: "8000", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "75%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "33.3%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "$2500/night", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "Excellent", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "100%", align: "center", w: 400, fg: "#3a3f3b" },
        { v: "50%", align: "center", w: 400, fg: "#3a3f3b" },
      ] },
    ],
    calcNote: "Exhibit Guidance — Whales Per Night",
    calcTable: {
      headers: ["Resort", "Whales per night, Off-Peak", "Whales per night, Peak"],
      rows: [
        ["King's Palace", "5000 × 80% × 25% = ==1000==", "5000 × 80% × 25% = ==1000=="],
        ["Egyptian", "4000 × 75% × 25% = ==750==", "4000 × 95% × 37.5% = ==1425=="],
        ["Belzor", "8000 × 75% × 33.3% = ==2000==", "8000 × 100% × 50% = ==4000=="],
        ["Total", "1000 + 750 + 2000 = ==3750==", "1000 + 1425 + 4000 = ==6425=="],
      ],
      totalLast: true,
    },
    answerText:
      "**Interviewee should identify that:**\n- **Correlation** between whale % and **swimming pool quality**\n- Impact of **seasonality** on overall demand (great candidates will notice that **Belzor is at 100% utilization**, meaning that there could be additional demand (for a hotel with an excellent pool) that is not being met",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Steer** the interviewee towards the conclusion that the hotel **must have an excellent quality pool**",
      "**Ask** the interviewee what a reasonable rate to charge a whale for a new hotel would be - any rate is acceptable as long as it is **supported logically**",
    ],
  },
  {
    n: "04",
    label: "Prompt 2",
    title: "Expected demand",
    kind: "qa",
    qText:
      "Market research indicates that a hotel with an excellent quality pool charging $2,500 a night would capture 100% of the whales who stat at the King's Palace and the Egyptian as well as an additional 250 whales per night during the off-season and 1575 during the peak season. What is the expected demand for the potential new hotel?",
    calcNote: "Exhibit Guidance",
    calcLines: [
      { q: "Nightly Whale Demand, Off-Peak", a: "1000 (King's Palace) + 750 (Egyptian) + 250 (new) = ==2000==", stack: true },
      { q: "Nightly Whale Demand, Peak", a: "1000 (King's Palace) + 1425 (Egyptian) + 1575 (new) = ==4000==", stack: true },
    ],
  },
  {
    n: "05",
    label: "Prompt 3",
    title: "How many stories?",
    kind: "qa",
    qText: "How many stories will the new hotel require?",
    guidancePreLabel: "Prompt 3",
    guidancePreLines: ["**Hand the Candidate Exhibit 2**"],
    illustrationTitle: "Exhibit 2",
    illustrationSrc: "/cases/whale-hotel-exhibit-2.jpg",
    illustrationAlt: "Illustration of a hotel with a pool: marker A points to the hotel building and marker B to the pool",
    factPanels: [
      {
        heading: "Variable A: Hotel Stories",
        rows: [{ value: "1500 rooms per story" }, { value: "$1 billion construction cost per story" }],
      },
      {
        heading: "Variable B: Pool Options",
        rows: [
          { label: "Excellent", value: "$500 million" },
          { label: "Good", value: "$100 million" },
          { label: "Poor", value: "$50 million" },
        ],
      },
    ],
    answerText:
      "- Interviewee should recognize that, in order to meet demand of **4000 rooms per night** in peak season, the hotel must be **at least 3 stories tall**",
  },
  {
    n: "06",
    label: "Prompt 4",
    title: "Investment and revenue",
    kind: "qa",
    qText:
      "Annual operating expenses are $250M per 1500 rooms. Land acquisition is $2B. What is the total initial investment and would you recommend moving forward with the hotel.",
    calcNote: "Exhibit Guidance",
    calcLines: [
      { q: "Initial investment", a: "Land - $2B\nRooms - $3B - (3 stories)\nPool - $.5B - (excellent quality)\nTotal - ==$5.5B==", stack: true },
      {
        q: "Annual revenue",
        a: "$2,500/night × 30 nights = $75K per whale monthly\n4000 whales × $75K per whale = $300M (peak, monthly) × 3 Month Peak Season = $900M Peak\n2000 whales × $75k per whale = $150M (off-peak, monthly) × 9 Months = $1.35B Off-Peak\nTotal Annual Revenue = ==$2.25B== Annually",
        stack: true,
      },
    ],
  },
  {
    n: "07",
    label: "Prompt 4 (continued)",
    title: "Profit and payback",
    kind: "qa",
    qText:
      "Annual operating expenses are $250M per 1500 rooms. Land acquisition is $2B. What is the total initial investment and would you recommend moving forward with the hotel.",
    calcNote: "Exhibit Guidance",
    calcLines: [
      {
        q: "Annual profit",
        a: "Annual Revenue - $2.25B\nAnnual Opex - $750M ($250M per 1500 rooms × 3)\nAnnual Operating Profit - ==$1.5B==",
        stack: true,
      },
      {
        q: "Payback period",
        a: "2 years of construction\n3 years of revenue (3 × $1.5B) = $4.5B\nAfter 5-years, $5.5B cost - $4.5B revenue",
        stack: true,
      },
    ],
    answerText:
      "**A good candidate will realize that:**\n- We **don't break even in 5-years**\n- We will turn a profit, **8 months into year 5**\n- We haven't considered **additional revenue sources** or a potential **exit opportunity**\n- If time allows - consider asking them **how to raise additional revenue**",
  },
  {
    n: "08",
    label: "Prompt 5",
    title: "Recommendation",
    kind: "qa",
    qText: "The real estate company's CEO is on his way in - what do you recommend?",
    guidanceLabel: "Exhibit Guidance",
    guidanceLines: [
      "A candidate can recommend either **moving forward with the deal** or **foregoing the opportunity**,",
      "If they recommend moving forward, they should include that they are **evaluating additional revenue streams** that will bring the company closer to a **5-year payback period**",
      "A candidate might choose to **turn-down the hotel** because of:",
      "  Issues with the **payback period**",
      "  **Competitive response** from the King's Palace, Egyptian, or Belzor",
    ],
  },
];

export const CASE_CONTENT: Record<string, CasePage[]> = {
  // Cases written by the conversion agents, one file each (lib/cases/authored/)
  ...AUTHORED_CASES,
  [ACES_CASE_ID]: ACES_PAGES,
  [AMAIR_CASE_ID]: AMAIR_PAGES,
  [FIRE_PROOF_CASE_ID]: FIRE_PROOF_PAGES,
  [DUCK_ISLAND_CASE_ID]: DUCK_ISLAND_PAGES,
  [WHALE_HOTEL_CASE_ID]: WHALE_HOTEL_PAGES,
};

// True for agent-generated cases the owner has not confirmed yet (shown with a review notice).
export function isAutoGenerated(caseId: string): boolean {
  return AUTO_GENERATED_IDS.has(caseId);
}

export function getCasePages(caseId: string): CasePage[] | null {
  return CASE_CONTENT[caseId] ?? null;
}

// The ordered pages an interviewee could ever have on screen: prompt + all Q&A
// steps, but never the interviewer-only cheat sheet.
export function livePages(pages: CasePage[]): CasePage[] {
  return pages.filter((p) => p.kind !== "cheat");
}

// Strip every interviewer-only field so an interviewee's browser only ever
// receives the prompt body + exhibit data (what can legitimately be presented).
export function redactPagesForCandidate(pages: CasePage[]): CasePage[] {
  return pages
    .filter((p) => p.kind !== "cheat")
    .map((p) => ({
      n: p.n,
      label: p.label,
      title: p.title,
      kind: p.kind,
      body: p.body,
      // exhibits only — no qText/guidance/calc/answer/insight/infoSections/note
      chart1: p.chart1,
      chart1Legend: p.chart1Legend,
      chart2: p.chart2,
      barChartTitle: p.barChartTitle,
      barChartLegend: p.barChartLegend,
      barChartGroups: p.barChartGroups,
      lineChartTitle: p.lineChartTitle,
      lineChartColor: p.lineChartColor,
      lineChartXLabel: p.lineChartXLabel,
      lineChartPointsStr: p.lineChartPointsStr,
      lineChartGridY: p.lineChartGridY,
      lineChartPoints: p.lineChartPoints,
      pieTitle: p.pieTitle,
      pieSlices: p.pieSlices,
      axisBarTitle: p.axisBarTitle,
      axisBarSeries: p.axisBarSeries,
      axisBarGroups: p.axisBarGroups,
      axisBarYMax: p.axisBarYMax,
      axisBarYStep: p.axisBarYStep,
      axisBarYLabel: p.axisBarYLabel,
      scatterTitle: p.scatterTitle,
      scatterPoints: p.scatterPoints,
      scatterXMin: p.scatterXMin,
      scatterXMax: p.scatterXMax,
      scatterXStep: p.scatterXStep,
      scatterXLabel: p.scatterXLabel,
      scatterYMin: p.scatterYMin,
      scatterYMax: p.scatterYMax,
      scatterYStep: p.scatterYStep,
      scatterYLabel: p.scatterYLabel,
      scatterGrid: p.scatterGrid,
      miniLinesTitle: p.miniLinesTitle,
      miniLines: p.miniLines,
      multiLineTitle: p.multiLineTitle,
      multiLineSeries: p.multiLineSeries,
      multiLineXLabels: p.multiLineXLabels,
      multiLineXTitle: p.multiLineXTitle,
      multiLineYTitle: p.multiLineYTitle,
      multiLineYMax: p.multiLineYMax,
      multiLineYStep: p.multiLineYStep,
      treeTitle: p.treeTitle,
      treeRoot: p.treeRoot,
      illustrationTitle: p.illustrationTitle,
      illustrationSrc: p.illustrationSrc,
      illustrationAlt: p.illustrationAlt,
      factPanels: p.factPanels,
      dataTableTitle: p.dataTableTitle,
      dataTableFootnote: p.dataTableFootnote,
      dataTableCols: p.dataTableCols,
      dataTableHeaders: p.dataTableHeaders,
      dataTableRows: p.dataTableRows,
      segmentTitle: p.segmentTitle,
      segmentTable: p.segmentTable,
    }));
}
