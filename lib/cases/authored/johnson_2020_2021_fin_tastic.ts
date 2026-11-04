import type { CasePage } from "../content";

export const CASE_ID = "1d5bdb68-084c-4b55-865f-4cb74f34376b";

const PROMPT =
  "Our client, Fin-Tastic Publishers, is a publisher of books for children ages 4 – 9 years old. Our client plans to launch a new book next quarter featuring a young turtle going to school for the first time. Our client has asked us to assist in determining what price point the book should be sold at.";

export const CASE_META = {
  review: "auto",
  case_type: "Pricing",
  synopsis:
    "A children's book publisher plans to launch a new title next quarter and needs a price point for it. Use production costs and price sensitivity data to choose the price that maximizes profit.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "pricing", "breakeven", "brainstorming", "light-math"],
};

const BLUE = "#1f7dac";
const BAND = "#cad6df";
const BAND2 = "#e7ebf1";
const PINK = "#e0457b";
const HD = (v: string) => ({ v, align: "center" as const, bg: BLUE, fg: "#ffffff" });
const c = (v: string, bg: string) => ({ v, w: 400, align: "center" as const, bg, fg: "#1f2421", borders: "b" as const, borderColor: "#ffffff" });
const row = (i: number, a: string, b: string) => ({ cells: [c(a, i % 2 ? BAND2 : BAND), c(b, i % 2 ? BAND2 : BAND)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    guidancePreLabel: "Responses to Clarifying Questions",
    guidancePreLines: [
      "**Is the new publication expected to cannibalize sales of current publications?** No, there is no expected cannibalization rate",
      "**Is there a goal besides determining a price point?** No, however the price point should be selected to maximize profits",
      "**Are royalty payments required to be made to the author?** No, the story is the intellectual property of Fin-Tastic Publishers",
      "**Does Fin-Tastic Publishers own the rights to the turtle featured in its new story?** Yes, the turtle is considered the intellectual property of Fin-Tastic Publishers",
    ],
  },
  {
    n: "02",
    label: "General Structure Suggestions",
    title: "General Structure Suggestions",
    kind: "qa",
    infoBoxLabel: "General Structure Suggestions",
    infoSections: [
      {
        label: "Financial considerations:",
        lines: [
          "What are the costs associated with production?",
          "How will non-production costs (ex. marketing) be allocated?",
          "How have previous publications been priced?",
        ],
      },
      {
        label: "Non-financial considerations:",
        lines: [
          "How will the new book be marketed?",
          "Who are the customers? Schools? Libraries?",
          "How could demand increase or decrease over time?",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Exhibit 1: Production Expenses",
    title: "Exhibit 1",
    kind: "qa",
    exhibitTitle: "Exhibit 1: Production Expenses",
    dataTableCols: "1fr 1fr",
    dataTableHeaders: [HD("Category"), HD("Expense")],
    dataTableRows: [
      row(0, "Setup: Production Setup Costs", "$55,000,000"),
      row(1, "Setup: Capital Equipment Costs", "$40,000,000"),
      row(2, "Indirect Labor", "$100,000,000"),
      row(3, "Direct Labor", "$280,000,000"),
      row(4, "Rent", "$15,000,000"),
      row(5, "Insurance", "$15,000,000"),
      row(6, "Ink", "$310,000,000"),
      row(7, "Paper", "$355,000,000"),
      row(8, "Equipment Depreciation", "$30,000,000"),
      row(9, "Desired Quantity Sold", "200,000,000"),
    ],
    calcTable: {
      title: "Cost Allocation",
      headers: ["Category", "Expense"],
      rows: [
        ["Fixed Costs", "$200M"],
        ["Setup: Capital Equipment Costs", "$40M"],
        ["Indirect Labor", "$100M"],
        ["Rent", "$15M"],
        ["Insurance", "$15M"],
        ["Equipment Depreciation\n(Note: Depreciation is not usage based for Fin-tastic Publishers)", "$30M"],
        ["Variable Costs", "$1,000M"],
        ["Setup: Production Setup Costs", "$55M"],
        ["Direct Labor", "$280M"],
        ["Ink", "$310M"],
        ["Paper", "$355M"],
        ["Desired Quantity Sold", "200M"],
      ],
      rowStyles: [
        { bold: true },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: true },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: true },
      ],
    },
    calcLines: [
      { q: "Price Per Unit", a: "= Fixed Costs / Quantity + Variable Cost Per Unit" },
      { q: "", a: "= $200,000,000 / 200,000,000 + $1,000,000,000 / 200,000,000" },
      { q: "", a: "= ==$6.00==" },
    ],
    guidanceLabel: "Exhibit 1 Actions",
    guidanceLines: [
      "The candidate should notice:",
      "  Price may be determined utilizing the following formula: Price Per Unit = Fixed Costs / Quantity + Variable Cost Per Unit",
      "  If the candidate appears stuck, ask them to write the breakeven formula and modify it to solve for price: Breakeven Quantity = Fixed Costs / (Price Per Unit – Variable Cost Per Unit)",
      "To move on:",
      "  Strong candidates will identify that this price represents a breakeven point, and not profitability",
      "  To further assess pricing options, present the candidate with Exhibit 2.",
    ],
  },
  {
    n: "04",
    label: "Exhibit 2: Price Sensitivity",
    title: "Exhibit 2",
    kind: "qa",
    exhibitTitle: "Exhibit 2: Price Sensitivity",
    extraCharts: [
      {
        kind: "combo",
        yMin: 100,
        yMax: 700,
        yStep: 100,
        yGrid: true,
        axisStyle: "none",
        lightBaseline: true,
        yLabel: "Purchases (Millions)",
        legend: "none",
        plotAspect: 0.5,
        categories: ["$4.00", "$5.00", "$6.00", "$7.00", "$8.00", "$9.00", "$10.00", "$11.00", "$12.00"],
        xTitle: "Price Per Book",
        lines: [{ name: "Purchases", color: PINK, values: [620, 550, 500, 480, 450, 440, 205, 155, 105], width: 4 }],
      },
    ],
    calcTable: {
      headers: ["Price", "Purchases Over 200M", "Contribution Margin", "Profit"],
      rows: [
        ["$7.00", "280M", "$1.00", "$280M"],
        ["$8.00", "250M", "$2.00", "$500M"],
        ["$9.00", "240M", "$3.00", "==$720M=="],
      ],
    },
    calcAfterGuidance: true,
    guidanceLabel: "Exhibit 2 Actions",
    guidanceLines: [
      "The candidate should notice:",
      "  Books cannot be sold for less than $6, otherwise Fin-Tastic Publishers will lose money",
      "  Fin-Tastic Publishers would like to sell $200M copies next year. The price point at which demand dips below this is $10",
      "  The breakeven point only identifies the point at which Fin-Tastic Publishers has covered fixed costs. After this, the profitability of each additional unit may be defined by the contribution margin (Price – Variable Cost). Therefore, $9 is the ideal price:",
    ],
  },
  {
    n: "05",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "Prompt the candidate to brainstorm creative ways for Fin-Tastic Publishers to market its new story",
  },
  {
    n: "06",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    infoBoxLabel: "Conclusion",
    infoSections: [
      { label: "Summary:", lines: ["A price point of $9.00 per copy allows Fin-Tastic Publishers to maximize profitability"] },
      { label: "Recommendation:", lines: ["Should mention new the $9.00 and expected profitability ($720M) or revenue ($3.96B)"] },
      {
        label: "Risks:",
        lines: ["Demand could be misestimated, and breakeven calculations do not include estimates for a margin of error"],
      },
      { label: "Next steps:", lines: ["Begin marketing efforts to ensure demand post-publication"] },
    ],
  },
];
