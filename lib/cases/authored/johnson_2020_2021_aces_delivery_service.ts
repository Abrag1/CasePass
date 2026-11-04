import type { CasePage } from "../content";

export const CASE_ID = "7b555442-2671-44dc-9c0e-912588c53af4";

const PROMPT =
  "Our client, Aces, is a package delivery firm that operates in Country XYZ. Five years ago, XYZ's government deregulated the package delivery industry, leaving three identical firms to fill the void. The only requirement for the firms is that each must operate in each municipality in the country.\n\nThe market in XYZ has been constant for nearly 3 decades (300 million packages per year). Since deregulation, Aces has charged $0.44/lb and seen an average weight per package of 5 lbs.\n\nFor the first 45 months, Aces, along with Deuces and Jacks, maintained 33.3% of market share with each earning 10 cents in profits for every dollar it charges its customers.\n\nAbout 15 months ago, Aces saw a dramatic drop market share (falling to 20%) and revenue. Three months later, they rebounded (market share reached 40% and revenue grew as well). We have been hired to determine if any changes should be made within Aces in this new dynamic.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A package delivery firm in a three-firm market saw its share collapse and then rebound. Work out revenue and profit for the client and its rivals and decide what the client should do.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "logistics", "light-math", "exhibit-heavy"],
};

const BLU = "#4f81bd";
const RED = "#c0504d";
const GRN = "#9bbb59";
const PUR = "#8064a2";

const RED_BG = "#b11b1b";
const PINK_D = "#e3cbcb";
const PINK_L = "#f0e5e5";
const H = (v: string, align: "left" | "center" = "center", red = false) =>
  red ? { v, align, bg: RED_BG, fg: "#ffffff" } : { v, align, bg: PINK_L, fg: "#1f2421" };
const R = (label: string, vals: string[], i: number) => {
  const bg = i % 2 === 0 ? PINK_D : PINK_L;
  return {
    cells: [
      { v: label, align: "left" as const, w: 700, fg: "#ffffff", bg: RED_BG },
      ...vals.map((v) => ({ v, align: "center" as const, w: i === 0 ? 700 : 400, fg: "#1f2421", bg })),
    ],
  };
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Behavioral Case Question** — How would your teammates tend to describe you?",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        lines: ["Follow the questions one-by-one, and share the exhibit to the interviewee during the case interview."],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "Interviewer: Before jumping into the analysis of what happened, I would like your help to first calculate the revenue of Aces 15 months ago and over the last 12 months.",
    guidancePreLabel: "Calculations",
    guidancePreLines: ["**Show candidate Exhibit 1**"],
    guidanceLabel: "Exhibit 1",
    guidanceLines: [
      "Chart to be given at the beginning when introducing the case. This chart is referred to again in Stage 3 after the market segments are explained.",
    ],
    extraCharts: [
      {
        kind: "stackCols",
        title: "Market Share",
        legend: [
          { name: "Jacks", color: GRN },
          { name: "Deuces", color: RED },
          { name: "Aces", color: BLU },
        ],
        legendPlacement: "right",
        gridlines: true,
        frame: true,
        titleBold: true,
        segBorder: false,
        panels: [
          {
            yMax: 100,
            yStep: 10,
            yTickSuffix: "%",
            columns: [
              {
                label: "First 45 months after deregulation",
                segs: [
                  { value: 33.3, color: BLU, label: "33.3%" },
                  { value: 33.3, color: RED, label: "33.3%" },
                  { value: 33.3, color: GRN, label: "33.3%" },
                ],
              },
              {
                label: "15 months ago",
                segs: [
                  { value: 20, color: BLU, label: "20%" },
                  { value: 60, color: RED, label: "60%" },
                  { value: 20, color: GRN, label: "20%" },
                ],
              },
              {
                label: "12 months ago",
                segs: [
                  { value: 40, color: BLU, label: "40%" },
                  { value: 30, color: RED, label: "30%" },
                  { value: 30, color: GRN, label: "30%" },
                ],
              },
            ],
          },
        ],
      },
    ],
    calcLines: [
      { q: "Revenue 15 months ago:", a: "" },
      { q: "Average price per package?", a: "$0.44/lb x 5lbs/package=$2.20/package" },
      { q: "# of Aces' annual deliveries until 15 months ago?", a: "33% x 300M = 100M" },
      { q: "Aces' annual revenues until 15 months ago?", a: "$2.20 x 100M = ==$220M==" },
      { q: "Revenue over the last 12 months:", a: "" },
      { q: "# of Aces' deliveries over the last 12 months?", a: "40% x 300M = 120M" },
      { q: "Aces' annual revenue over the last 12 months?", a: "120 million x $2.20/package = ==$264M==" },
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "Next, I want you to calculate the profit of Aces 15 months ago, and over the last 12 months.",
    guidancePreLabel: "Calculations",
    guidancePreIntro: "[NOTE: Show candidate exhibit 2 and provide below information only when the interviewee asked for them.]",
    guidancePreLines: [
      "15 months ago, Facilities represented 10% of total costs. IT and Staffing each cost an additional 5% of total costs. The remaining costs were all transportation costs (depreciation of vehicles and fuel).",
      "Today (hasn't changed since 12 month ago), total non-transportation costs (Facilities, IT and Staffing costs) combined represent only 10% of total costs, despite no change in absolute $ spent on them.",
    ],
    extraCharts: [
      {
        kind: "stackCols",
        title: "Aces' Cost Breakdown",
        legend: [
          { name: "Staffing", color: PUR },
          { name: "IT", color: GRN },
          { name: "Facilities", color: RED },
          { name: "Transportation", color: BLU },
        ],
        legendPlacement: "right",
        gridlines: true,
        frame: true,
        titleBold: true,
        segBorder: false,
        panels: [
          {
            yMax: 100,
            yStep: 10,
            yTickSuffix: "%",
            columns: [
              {
                label: "Before 15 months ago",
                segs: [
                  { value: 80, color: BLU, label: "80%", textColor: "#1f2421" },
                  { value: 10, color: RED, label: "10%", textColor: "#1f2421" },
                  { value: 5, color: GRN, label: "5%" },
                  { value: 5, color: PUR, label: "5%" },
                ],
              },
              {
                label: "After 15 months ago",
                segs: [
                  { value: 90, color: BLU, label: "90%", textColor: "#1f2421" },
                  { value: 4, color: RED, label: "4%", textColor: "#1f2421" },
                  { value: 3, color: GRN, label: "3%" },
                  { value: 3, color: PUR, label: "3%" },
                ],
              },
            ],
          },
        ],
      },
    ],
    calcLines: [
      { q: "Profit 15 months ago:", a: "" },
      { q: "Aces' annual costs 15 months ago?", a: "$220M x (1-10%)) = $198M = ==$200M== (rounded)" },
      { q: "Aces' annual profits until 15 months ago?", a: "$220M - $200M = ==$20M==" },
      { q: "Profit over the last 12 months:", a: "" },
      { q: "Aces' non-transportation cost until 15 months ago?", a: "$200M x (10% + 5% + 5%) = $40M" },
      { q: "Aces' non-transportation cost over the last 12 months?", a: "$40M" },
      { q: "% of Aces' non-transportation cost over the last 12 months?", a: "10%" },
      { q: "Aces' annual cost over the last 12 months?", a: "$40M / 10% = $400M" },
      { q: "Aces' profits over the last 12 months?", a: "$264M - $400M = ==-136M==" },
    ],
    guidanceLabel: "Interviewer guidance",
    guidanceLines: [
      "Chart to be given in Stage 2",
      "Candidate should point out that the shift in transportation costs with the sudden increase in market share seems responsible for the negative earnings, and **probe** for why that should have changed as a percentage of revenue.",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "Please describe what has happened to the XYZ delivery industry 15 and 12 months ago",
    infoBoxLabel: "Intervewer guidance",
    infoSections: [
      {
        paragraphs: [
          "[NOTE: Provide below information to the interviewee directly and show the candidate exhibit 3)",
          "**The package delivery industry in XYZ is segmented into three groups:**",
        ],
        lines: [
          "Local, 0-50 miles, 60% of all deliveries",
          "Regional, 51 -150 miles, 20% of all deliveries",
          "Long-haul, 150+ miles, 20% of all deliveries",
          "Assuming 100% price sensitive consumers ( only choose lower price companies)",
        ],
      },
    ],
    dataTableTitle: "Exhibit 3",
    dataTableCols: "1.4fr 1fr 1fr 1fr 1.2fr",
    dataTableHeaders: [H("Original System", "left", true), H("Local", "center", true), H("Regional", "center", true), H("Long-Haul", "center", true), H("Total Market Share", "center", true)],
    dataTableRows: [
      R("All firms", ["60%", "20%", "20%", "100%"], 0),
      R("Jacks", ["20%", "6.7%", "6.7%", "33%"], 1),
      R("Deuces", ["20%", "6.7%", "6.7%", "33%"], 2),
      R("Aces", ["20%", "6.7%", "6.7%", "33%"], 3),
    ],
    dataTableMore: [
      {
        cols: "1.4fr 1fr 1fr 1fr 1.2fr",
        headers: [H("15 Months Ago", "left", true), H("Local"), H("Regional"), H("Long-Haul"), H("Total Market Share")],
        rows: [
          R("All firms", ["60%", "20%", "20%", "100%"], 0),
          R("Jacks", ["0%", "10%", "10%", "20%"], 1),
          R("Deuces", ["60%", "0%", "0%", "60%"], 2),
          R("Aces", ["0%", "10%", "10%", "20%"], 3),
        ],
      },
      {
        cols: "1.4fr 1fr 1fr 1fr 1.2fr",
        headers: [H("12 Months Ago", "left", true), H("Local"), H("Regional"), H("Long-Haul"), H("Total Market Share")],
        rows: [
          R("All firms", ["60%", "20%", "20%", "100%"], 0),
          R("Jacks", ["30%", "0%", "0%", "30%"], 1),
          R("Deuces", ["30%", "0%", "0%", "30%"], 2),
          R("Aces", ["0%", "20%", "20%", "40%"], 3),
        ],
      },
    ],
    guidanceLabel: "Interviewer guidance",
    guidanceLines: [
      "The candidate should realize that 15 months ago, **Deuces** broke the package delivery market into 3 segments and modified its pricing to dominate the high margin local segment and priced itself out of the regional & long-haul market. Three months later, **Jacks** followed suit.",
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "How much are Deuces and Jacks' revenue and profit over the last 12 months?",
    infoBoxLabel: "Intervewer guidance",
    infoSections: [
      {
        paragraphs: ["[NOTE: Provide below information only when the interviewee asked for them.]"],
        lines: [
          "Both Deuces and Jacks charges below prices for the different segments:",
          "Local: $0.40/lb",
          "Regional:  $0.80/lb",
          "Long-Haul: $1.20",
          "Due to shorter routes, Deuces and Jacks' transportation costs are only $100 million, while their non-transportation costs are all in line with Aces'.",
        ],
      },
    ],
    calcLines: [
      { q: "For the last 12 months:", a: "" },
      { q: "Jacks or Deuces' revenue for the last 12 months?", a: "$0.40/lb * 5lbs/package x 90M packages = ==$180M==" },
      { q: "Jacks or Deuces' cost over the last 12 months?", a: "$100M + $40M = ==$140M==" },
      { q: "Jacks or Deuces' profits over the last 12 months?", a: "$ 180M - $140M = ==$40M==" },
    ],
  },
  {
    n: "06",
    label: "Question 5",
    title: "Recommendation",
    kind: "qa",
    qText: "What should Aces do?",
    guidanceLabel: "Intervewer guidance",
    guidanceLines: [
      "Mimic competitors' moves and charge differently for different segment",
      "Or continue fortify dominance in the Regional and Long-Haul segment, and charge higher prices to increase profits",
      "Candidate might also recommend that Aces seek opportunities to decrease transportation costs and establish a sustainable competitive advantage in the regional and long haul segments.",
    ],
  },
];
