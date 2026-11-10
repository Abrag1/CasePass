import type { CasePage } from "../content";

export const CASE_ID = "bf02cd82-a602-4e9e-8116-5fff77c030e0";

const PROMPT =
  "Our client, PayCo, is a global credit card company, with revenues over $5B in 2010.\n\nA recent trend in the credit card industry is the use of contactless (tap and go) payments technology to make small everyday purchases at places like fast food restaurants and convenience stores.\n\nPayCo is looking to leverage contactless payments to drive top-line growth and has identified the transit vertical (i.e. subways, trains, buses, taxis) as an opportunity for growth since this is generally a cash dominated vertical.  In support of this strategy, PayCo has developed proprietary technology (called “TAP”) to process contactless transactions specifically for transit applications, and is looking to commercialize this technology.  A key challenge is whether transit authorities will implement this new technology or stay with current systems for fare collection.\n\nWe have been engaged to size the overall transit market globally, prioritize potential opportunities, develop a financial business case, and develop a go-to-market strategy for commercializing PayCo’s contactless technology";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "A global credit card company wants to commercialize its proprietary contactless payments technology for transit. Prioritize the market, build the financial case for the first city and decide whether to pursue it.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "technology", "profitability", "exhibit-heavy"],
};

const RED = "#b01c1c";
const BLK = "#111111";
type Al = "left" | "center" | "right";
const H = (v: string, align: Al = "center", bg: string | null = RED) => ({ v, align, bg: bg ?? undefined, fg: bg ? "#ffffff" : BLK });
const L = (v: string) => ({ v, align: "left" as Al, w: 700, fg: BLK, borders: "tblr", borderColor: BLK });
const C = (v: string) => ({ v, align: "center" as Al, w: 400, fg: BLK, borders: "tblr", borderColor: BLK });
const row = (label: string, vals: string[]) => ({ cells: [L(label), ...vals.map(C)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Business Situation",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Problem Statement [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewer-led case. **Your role on the PayCo engagement is to develop the business case for commercializing PayCo’s contactless technology**",
        ],
        steps: [
          { n: "1", text: "Which market and transit vertical should PayCo target as a first priority?" },
          { n: "2", text: "What is the profitability of the “TAP” technology?  Specifically, will PayCo break even on commercializing “TAP” in less than 5 years?" },
          { n: "3", text: "Would you recommend that the client pursue the commercialization of this technology?" },
        ],
      },
      {
        paragraphs: ["[**Note to interviewer: Provide data sheet 1 to the candidate as you ask question one. Same for data sheet 2.**]"],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1 · Exhibit 1",
    kind: "qa",
    qText: "**Question 1: Which market and transit vertical should PayCo target as a first priority?**",
    infoBoxLabel: "Approach / Analysis [Provide Exhibit 1]",
    infoSections: [
      {
        paragraphs: ["**A good answer** will draw the following conclusions from the data provided:"],
        lines: [
          "The answer we’re looking for is **New York Subways**.",
          "Given the subway and bus detail, the candidate should quickly recognize that the country data is too high-level",
          "A quick comparison of subways and buses should rule out buses without any calculations",
          "Even though Tokyo is the largest, it actually has the smallest potential due to a low probability of winning a contract.",
          "New York has the highest potential revenue opportunity for PayCo based on the calculation below:",
        ],
      },
    ],
    exhibitTitle: "Exhibit 1",
    exhibitFirst: true,
    dataTableTitle: "Country Data¹",
    dataTableTitleRules: RED,
    dataTableFootnoteLeft: true,
    dataTableCols: "1.6fr 1fr 1fr 1fr",
    dataTableHeaders: [H("", "left", null), H("US"), H("England"), H("Japan")],
    dataTableRows: [
      row("Population (MM)", ["313", "63", "126"]),
      row("Population Growth (%)", ["0.96%", "0.56%", "-0.28%"]),
      row("GDP ($Tr)", ["$14.7", "$2.2", "$4.3"]),
      row("GDP Growth (%)", ["2.7%", "1.6%", "3.0%"]),
      row("GDP per Capita (USD)", ["$47,400", "$35,100", "$34,200"]),
    ],
    dataTableMore: [
      {
        title: "Subway System Data",
        cols: "1.6fr 1fr 1fr 1fr",
        headers: [H("", "left", null), H("NYC"), H("London"), H("Tokyo")],
        rows: [
          row("Daily Passengers (MM)", ["11.5", "8.5", "14.3"]),
          row("Annual Fare Collection ($B)", ["$12", "$13", "$45"]),
          row("Timing for new system", ["2012", "2012", "2015"]),
          row("Probability of winning contract ²", ["90%", "70%", "20%"]),
        ],
      },
      {
        title: "Buses Data",
        footnote:
          "Notes:\n1 Data from CIA World Factbook, extracted April 2011.  GDP figures at purchasing power parity.\n2 Probability of winning contract is based on estimates from the PayCo Business Development team, and can be used to determine the  potential revenue opportunity for PayCo",
        cols: "1.6fr 1fr 1fr 1fr",
        headers: [H("", "left", null), H("NYC"), H("London"), H("Tokyo")],
        rows: [
          row("Daily Passengers (MM)", ["3.0", "4.5", "5.8"]),
          row("Annual Fare Collection ($B)", ["$2.8", "$5.5", "$4.4"]),
          row("Timing for new system", ["2013", "2013", "2015"]),
          row("Probability of winning contract ²", ["90%", "70%", "20%"]),
        ],
      },
    ],
    calcTable: {
      headers: ["", "Fare Collection", "* Prob of winning contract", "= PayCo Market Opportunity"],
      rows: [
        ["New York:", "$12M", "* 90%", "= ==$10.8M=="],
        ["London:", "$13M", "* 70%", "= $ 9.1M"],
        ["Tokyo:", "$45M", "* 20%", "= $ 9.0M"],
      ],
    },
    guidanceLines: [
      "**A better answer** will include the items above and address additional elements around the data. Some findings include:",
      "  Although Tokyo looks like a huge opportunity initially, they are not looking for a new system until 2015, while NYC and London are ready earlier (2012).",
      "  The candidate may also raise the sensitivity of this assessment on the Sales Probability data point and point out how even a 5% increase for Tokyo would give it the highest value",
      "**A great answer** will include the items above and also raise additional considerations beyond the data, including:",
      "  How strong is PayCo’s brand in each city?",
      "  Is one city more strategically important to PayCo?",
      "  Are there differences in cost or difficulty in going after these markets?",
      "  Do PayCo’s capabilities make one option more likely to succeed than another?",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2 · Exhibit 2",
    kind: "qa",
    qText:
      "**Question 2: What is the profitability of the “TAP” technology for NYC?**\n**Specifically, will PayCo break even on commercializing “TAP” in less than 5 years?**",
    infoBoxLabel: "Approach / Analysis [Provide Exhibit 2]",
    infoSections: [
      {
        paragraphs: [
          "A **good answer** would be:",
          "Yes, PayCo will break even in 4 years, with a total profit (excluding time value of money) of ==$250,000==.",
        ],
        lines: [
          "A key insight is that the past investment in developing the “TAP” technology is a sunk cost in making the decision on commercializing the technology and should not be incorporated into the analysis",
          "Here is a summary of revenues and costs calculations as a guide for the interviewer:",
          "  Revenue = (TAP Fare Collection * TAP Processing Fee) + Annual License Fee",
          "  Costs = (# of transactions * cost per transaction) + Advertising and Promotion + SG&A",
        ],
      },
      {
        paragraphs: ["A **great answer** should:"],
        lines: [
          "Be very well structured with clear calculations laid out in a grid (like a spreadsheet)",
          "Comfortably handle the variety of units (revenues in $MMs, costs in $000s, percentages)",
          "Acknowledge time value of money and suggest calculating an NPV to evaluate the investment",
        ],
      },
    ],
    exhibitTitle: "Exhibit 2",
    dataTableTitle: "NYC Subway Forecast Data",
    dataTableTitleRules: RED,
    dataTableCols: "1.9fr 1fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [H("", "left", null), H("2011"), H("2012"), H("2013"), H("2014"), H("2015")],
    dataTableRows: [
      row('"TAP" Transactions (MM)', ["1,500", "2,000", "2,500", "3,000", "3,000"]),
      row('"TAP" Fare Collection ($MM)', ["$3,750", "$5,000", "$6,250", "$7,500", "$7,500"]),
    ],
    dataTableMore: [
      {
        title: "PayCo “TAP” Assumptions",
        footnote: "* Processing Fee applies to dollar value of Fare Collections",
        cols: "2fr 1fr",
        headers: [{ v: "Revenue Assumptions", align: "center", bg: RED, fg: "#ffffff", span: 2 }],
        rows: [row("Annual License Fee ($000s)", ["$250"]), row('"TAP" Processing Fee *', ["0.20%"])],
      },
      {
        cols: "2fr 1fr",
        headers: [{ v: "Cost Assumptions", align: "center", bg: RED, fg: "#ffffff", span: 2 }],
        rows: [row('Past Investment in "TAP" Development ($000s)', ["$1,000"]), row("Cost per transaction", ["$0.005"])],
      },
      {
        cols: "1.9fr 1fr 1fr 1fr 1fr 1fr",
        headers: [H("Cost Projections (in $000s)", "left", null), H("2011"), H("2012"), H("2013"), H("2014"), H("2015")],
        rows: [
          row("Advertising and Promotion", ["$500", "$250", "$0", "$0", "$0"]),
          row("SG&A", ["$50", "$50", "$50", "$50", "$50"]),
        ],
      },
    ],
    calcTable: {
      title: "Exhibit Summary",
      plain: true,
      center: true,
      leftCols: [0],
      cols: "2.6fr repeat(6, 1fr)",
      subtitle: "Note to interviewer: Pro-forma financial statement – sample of what the interviewee could assemble from the source data",
      boldRows: [5, 13, 14, 16],
      rulesAbove: [3, 5, 9, 12, 13, 14],
      headers: ["", "2011", "2012", "2013", "2014", "2015", "TOTAL"],
      rows: [
        ["Revenue", "", "", "", "", "", ""],
        ["NYC Fare Collection Forecast ($MM)", "$3,750", "$5,000", "$6,250", "$7,500", "$7,500", ""],
        ["* Processing Fee", "0.20%", "0.20%", "0.20%", "0.20%", "0.20%", ""],
        ["Variable Revenue ($000s)", "$7,500", "$10,000", "$12,500", "$15,000", "$15,000", "$60,000"],
        ["+ Fixed License Fees for technology ($000s)", "$250", "$250", "$250", "$250", "$250", "$1,250"],
        ["TOTAL REVENUE ($000s)", "$7,750", "$10,250", "$12,750", "$15,250", "$15,250", "$61,250"],
        ["Costs", "", "", "", "", "", ""],
        ["NYC Transaction Forecast (MM)", "1,500", "2,000", "2,500", "3,000", "3,000", ""],
        ["* Cost per transaction", "$0.005", "$0.005", "$0.005", "$0.005", "$0.005", ""],
        ["Variable Cost ($000s)", "$7,500", "$10,000", "$12,500", "$15,000", "$15,000", "$60,000"],
        ["+ Advertising and Promotion ($000s)", "$500", "$250", "$0", "$0", "$0", ""],
        ["+ SG&A ($000s)", "$50", "$50", "$50", "$50", "$50", ""],
        ["Fixed Costs", "$550", "$300", "$50", "$50", "$50", "$1,000"],
        ["TOTAL COST ($000s)", "$8,050", "$10,300", "$12,550", "$15,050", "$15,050", "$61,000"],
        ["TOTAL PROFIT ($000s)", "($300)", "($50)", "$200", "$200", "$200", "$250"],
        ["(cumm)", "($300)", "($350)", "($150)", "$50", "$250", ""],
        ["", "", "", "", "Break even", "", ""],
      ],
      rowStyles: [
        { bold: false },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false },
        { bold: false, indent: 1 },
        { bold: true },
        { bold: false },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false },
        { bold: false, indent: 1 },
        { bold: false, indent: 1 },
        { bold: false },
        { bold: true },
        { bold: true },
        { bold: false },
        { bold: true },
      ],
    },
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "**Question 3: Would you recommend that the client pursue the commercialization of this technology?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: ["**A good answer** will include:"],
        lines: [
          "Based on the cost/benefit analysis, commercializing “TAP” is estimated to generate ==$250,000== in profit over 5 years and meets the client’s criteria for break even.",
        ],
      },
      {
        paragraphs: ["**A great answer** would recognize the above, but also include:"],
        lines: [
          "Identification of risks in the assumptions, such as:",
          "  The 90% sales probability assumption for NYC",
          "  Revenue or cost drivers",
          "Identification of sensitivity in calculations, such as:",
          "  Forecasted transactions and fare revenue",
          "  Cost forecasts, particularly Advertising and Promotion",
          "Qualitative benefits of pursuing commercialization",
          "  Positive impact on brand and market share",
          "  Becoming market leader and growing to other cities",
          "Competitive Response",
          "  How might PayCo’s competitors respond to its launch of this technology?",
          "Defining next steps, such as further analysis or a high-level implementation plan",
        ],
      },
    ],
  },
];
