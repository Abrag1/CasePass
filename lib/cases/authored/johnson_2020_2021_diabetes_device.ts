import type { CasePage } from "../content";

export const CASE_ID = "c74572da-d4bb-4fdb-86dd-aa92e993b30b";

const PROMPT =
  "Our client is a manufacturer of medical devices used to treat chronic diseases. They recently launched a new device for treating diabetic patients. The device has two components – an injector and a disposable cartridge. They would like to know how they should price and sell these products in order to maximize profit. What advice would you give them?";

export const CASE_META = {
  review: "auto",
  case_type: "Pricing",
  synopsis:
    "A medical device manufacturer has launched a two-component diabetes device (an injector and a disposable cartridge). Work out how to price and sell the components to maximize profit.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "pricing", "healthcare", "quant-heavy", "exhibit-heavy"],
};

const INK = "#1f2421";
const BLUE = "#c6def9";
const LINE = "#3fa2dc";
const band = (v: string) => ({ v, align: "center" as const, bg: BLUE, fg: INK, borders: "tblr", borderColor: LINE, span: 2 });
const bc = (v: string, bg?: string) => ({ v, align: "left" as const, w: bg ? 700 : 400, fg: INK, borders: "tblr", borderColor: LINE, bg });
const rows = (data: string[][]) => data.map((r) => ({ cells: r.map((v) => bc(v)) }));
const colHead = (a: string, b: string) => ({ cells: [bc(a, BLUE), bc(b, BLUE)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Overview [Interviewer-led]",
        paragraphs: [
          "This is a quant-heavy, interviewer-led case. Ask the following questions sequentially and provide Exhibits when prompted.",
        ],
        steps: [
          { n: "1", text: "What prices should our client set the two components at in order to maximize profit?" },
          { n: "2", text: "Can you think of other pricing/selling strategies that may help increase profitability further?" },
          { n: "3", text: "Our client thinks bundling is a good idea to save on costs. For every 5 cartridges bundled with an injector, they are also willing to take a $10 discount from the combined price of the components. Should our client sell the two components as a bundle? If so, in what ratio?" },
          { n: "4", text: "Our client would like to compare their bundling strategy with the bundling strategies of other businesses. What other product bundles can you think of?" },
        ],
      },
      {
        label: "Case Information",
        groups: [
          {
            heading: "The production costs for each component are as follows:",
            items: ["Injector: $40/unit", "Disposable cartridge: $20/unit"],
          },
          {
            heading: "Both the injector and cartridge are sold directly to patients with a prescription",
            items: ["Injector can be reused up to 20 times but cartridges are one-time use"],
          },
          {
            heading: "Our client has done some initial projections of acceptance rates at various prices based on customer surveys",
            items: ["Acceptance rate is defined as the percentage of customers who are willing to pay that specific price for the product"],
          },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "**Question 1: What prices should our client set the two components at in order to maximize profit?**",
    dataTableTitle: "Price and Acceptance Rates for the Two Components",
    dataTableTitleBold: true,
    dataTableSideBySide: true,
    dataTableFontSize: 14,
    dataTableCols: "1fr 1fr",
    dataTableHeaders: [band("Injector")],
    dataTableRows: [
      colHead("Price ($/unit)", "Acceptance rate (%)"),
      ...rows([["100", "80"], ["110", "70"], ["125", "60"], ["150", "50"], ["175", "40"]]),
    ],
    dataTableMore: [
      {
        cols: "1fr 1fr",
        headers: [band("Disposable Cartridge")],
        rows: [
          colHead("Price ($/unit)", "Acceptance rate (%)"),
          ...rows([["60", "80"], ["62", "75"], ["64", "70"], ["66", "65"], ["68", "60"]]),
        ],
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Candidate should calculate profitability at each price by taking gross margin*acceptance rate.",
      "To calculate gross margin, candidate will need to ask for costs of production.",
      "**For the injector:**",
      "  At $100: ($100-$40)*80% = $48",
      "  At $110: ($110-$40)*70% = $49",
      "  At $125: ($125-$40)*60% = $51",
      "  At $150: ($150-$40)*50% = ==$55==",
      "  At $175: ($175-$40)*40% = $54",
      "**For the cartridge:**",
      "  At $60: ($60-$20)*80% = ==$32==",
      "  At $62: ($62-$20)*75% = $31.5",
      "  At $64: ($64-$20)*70% = $30.8",
      "  At $66: ($66-$20)*65% = $29.9",
      "  At $68: ($68-$20)*60% = $28.8",
      "**The most profitable prices are $150 for the injector and $60 for the cartridge**",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "**Question 2: Can you think of other pricing/selling strategies that may help increase profitability further?**",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Candidate should brainstorm a few ideas, but the main point they should get at is the following:",
      "**Bundle the two products together**",
      "**Attractive to customers**",
      "  Complementary products – customers need to buy both anyway",
      "  Injector is reusable but cartridges are not",
      "**Beneficial for our client** – helps save on costs",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "**Question 3: Our client thinks bundling is a good idea to save on costs. For every 5 cartridges bundled with an injector, they are also willing to take a $10 discount from the combined price of the components. Should our client sell the two components as a bundle? If so, in what ratio?**",
    guidancePreLines: [
      "**Provide Exhibit 2.** Candidate will need to calculate gross margins for the 4 bundling ratios below:",
    ],
    extraCharts: [
      {
        kind: "combo",
        title: "Cost Savings Per Bundle at Various Bundling Ratios",
        titleBold: true,
        titleAlign: "center",
        titleSize: 26,
        categories: Array.from({ length: 26 }, (_, i) => String(i)),
        lines: [
          {
            name: "Cost savings per bundle",
            color: "#74aeda",
            width: 4,
            smooth: true,
            values: [
              null,
              null,
              null,
              null,
              null,
              7.0,
              8.0,
              9.2,
              10.6,
              12.2,
              14.0,
              16.1,
              18.5,
              21.2,
              24.4,
              28.0,
              32.2,
              36.9,
              42.4,
              48.8,
              56.0,
              null,
              null,
              null,
              null,
              null,
            ],
          },
        ],
        yMin: 0,
        yMax: 60,
        yStep: 10,
        yLabel: "Cost savings per bundle ($)",
        xTitle: "# cartridges bundled with an injector",
        axisBold: true,
        fontScale: 1.3,
        axisStyle: "none",
        lightBaseline: true,
        yGrid: true,
        xPlacement: "on",
        xLabelEvery: 5,
        legend: "none",
        plotAspect: 0.45,
      },
    ],
    calcLines: [
      { q: "1:5 ratio", a: "Price – discount – cost + savings = (150 + 60*5) – 10 – (40 + 20*5) + 7 = ==307==" },
      { q: "1:10 ratio", a: "(150 + 60*10) – (2*10) – (40 + 20*10) + 14 = ==504==" },
      { q: "1:15 ratio", a: "(150 + 60*15) – (3*10) – (40 + 20*15) + 28 = ==708==" },
      { q: "1:20 ratio", a: "(150 + 60*20) – (4*10) – (40 + 20*20) + 56 = ==926==" },
      { q: "1 injector + 5 cartridges", a: "(150 – 40) + 5*(60 – 20) = ==310==" },
      { q: "1 injector + 10 cartridges", a: "(150 – 40) + 10*(60 – 20) = ==510==" },
      { q: "1 injector + 15 cartridges", a: "(150 – 40) + 15*(60 – 20) = ==710==" },
      { q: "1 injector + 20 cartridges", a: "(150 – 40) + 20*(60 – 20) = ==910==" },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Candidate should also calculate gross margins from the separate components without the bundle.",
      "Note: acceptance rates can be ignored for this question.",
      "**A bundling ratio of 1:20 (injector to cartridge) would increase the gross margin by $16. The other bundling options are less profitable than selling the two components separately**",
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "**Question 4: Our client would like to compare their bundling strategy with the bundling strategies of other businesses. What other product bundles can you think of?**",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "There are many possible answers for this brainstorming question. Here are just a few examples:",
      "  Camera/film",
      "  Hardware/software",
      "  Water purification system/filter cartridges",
      "  Cable/internet",
      "**Conclusion:**",
      "  I recommend that the client sells the injector for ==$150/unit== and disposable cartridge for ==$60/unit==. To further increase profitability, the client can bundle the two components at a ==1:20== ratio of injector to cartridge. Moving forward, the client should conduct surveys to find the acceptance rates for each bundling ratio to more accurately estimate profitability.",
    ],
  },
];
