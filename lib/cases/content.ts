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

export type PageKind = "ready" | "qa" | "cheat";

export interface CalcLine {
  q: string;
  a: string;
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
  align: "left" | "right";
}
export interface DataTableCell {
  v: string;
  align: "left" | "right";
  w: number;
  fg: string;
}
export interface DataTableRow {
  cells: DataTableCell[];
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

  // Answer + "what a strong candidate spots" insight
  answerText?: string;
  insightText?: string;

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
  dataTableTitle?: string;
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

export function pageHasExhibit(p: CasePage): boolean {
  return !!(
    p.chart1 ||
    p.chart2 ||
    p.barChartGroups ||
    p.lineChartPointsStr ||
    p.dataTableRows ||
    p.segmentTable
  );
}

// A page can be pushed onto the candidate screen if it's the prompt or carries an exhibit.
export function pageIsPresentable(p: CasePage): boolean {
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

export const CASE_CONTENT: Record<string, CasePage[]> = {
  [ACES_CASE_ID]: ACES_PAGES,
  [AMAIR_CASE_ID]: AMAIR_PAGES,
};

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
      dataTableTitle: p.dataTableTitle,
      dataTableCols: p.dataTableCols,
      dataTableHeaders: p.dataTableHeaders,
      dataTableRows: p.dataTableRows,
      segmentTitle: p.segmentTitle,
      segmentTable: p.segmentTable,
    }));
}
