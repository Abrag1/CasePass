import type { CasePage } from "../content";

export const CASE_ID = "dcfbe834-ea86-47e1-85bd-db4e026b55ad";

const PROMPT =
  "Your role on the PayCo engagement is to develop the business case for commercializing PayCo’s contactless technology.\n\n1) Which market and transit vertical should PayCo target as a first priority?\n2) What is the profitability of the “TAP” technology? Specifically, will PayCo breakeven on commercializing “TAP” in less than 5 years?\n3) Would you recommend that the client pursue the commercialization of this technology?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A global credit card company has developed contactless payments technology for transit authorities. Choose the first market to target, test whether the technology breaks even within five years, and decide whether to commercialize it.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "breakeven", "financial-services", "exhibit-heavy"],
};

const hd = (v: string, align: "left" | "center" | "right" = "center") => ({ v, align });
const L = (v: string, w = 600) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Are you applying to all consulting firms? Why / why not? 2. Why should I hire you over your peers?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "Read the following statement out loud to the candidate before you read the case prompt:",
          "Our client, PayCo, is a global credit card company, with revenues over $5B in 2010.  A recent trend in the credit card industry is the use of contactless (tap and go) payments technology to make purchases at places like fast food restaurants and convenience stores.",
          "PayCo is looking to leverage contactless payments to drive top-line growth and has identified the transit vertical (i.e. subways, trains, buses, taxis) as an opportunity for growth since this is generally a cash dominated vertical.  In support of this strategy, PayCo has developed proprietary technology (called “TAP”) to process contactless transactions specifically for transit applications, and is looking to commercialize this technology.  A key challenge is whether transit authorities will implement this new technology or stay with current systems for fare collection.",
          "Deloitte Consulting has been engaged to size the overall transit market globally, prioritize potential opportunities, develop a financial business case, and develop a go-to-market strategy.",
        ],
      },
      {
        label: "Case Questions:",
        paragraphs: [
          "This case is driven by the above series of questions to be asked of the candidate.  **Do not pursue all questions with the candidate up front, as each question is meant to be a mini-case.**  These questions are provided on subsequent pages in the order that they should be asked of the candidate.  A traditional framework will not be needed for this case, but the candidate should remain structured in their thinking and in their responses throughout the case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Questions and Financial Analysis" },
          { n: "3", text: "Recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "1. Which market and transit vertical should PayCo target as a first priority?\n\n**Note to interviewer: Provide Exhibit 1 to the candidate.**  If the candidate only provides a quantitative answer, prompt them for additional qualitative considerations.",
    guidancePreLabel: "A good answer will draw the following conclusions from the data provided:",
    guidancePreLines: [
      "The answer we’re looking for is New York Subways.",
      "Given the subway and bus detail, the candidate should quickly recognize that the country data is too high-level.",
      "A quick comparison of subways and buses should rule out buses without any calculations.",
      "Even though Tokyo subways is the largest market, it actually has the smallest potential due to a low probability of winning a contract.",
      "New York has the highest potential revenue opportunity for PayCo based on the calculation below:",
    ],
    dataTableTitle: "Country Data¹",
    dataTableCols: "1.6fr 1fr 1fr 1fr",
    dataTableHeaders: [hd("", "left"), hd("US"), hd("England"), hd("Japan")],
    dataTableRows: [
      { cells: [L("Population (MM)"), C("313"), C("63"), C("126")] },
      { cells: [L("Population Growth (%)"), C("0.96%"), C("0.56%"), C("-0.28%")] },
      { cells: [L("GDP ($Tr)"), C("$14.7"), C("$2.2"), C("$4.3")] },
      { cells: [L("GDP Growth (%)"), C("2.7%"), C("1.6%"), C("3.0%")] },
      { cells: [L("GDP per Capita (USD)"), C("$47,400"), C("$35,100"), C("$34,200")] },
    ],
    dataTableMore: [
      {
        title: "Subway System Data",
        cols: "1.6fr 1fr 1fr 1fr",
        headers: [hd("", "left"), hd("NYC"), hd("London"), hd("Tokyo")],
        rows: [
          { cells: [L("Daily Passengers (MM)"), C("11.5"), C("8.5"), C("14.3")] },
          { cells: [L("Annual Fare Collection ($B)"), C("$12"), C("$13"), C("$45")] },
          { cells: [L("Timing for new system"), C("2012"), C("2012"), C("2015")] },
          { cells: [L("Probability of winning contract ²"), C("90%"), C("70%"), C("20%")] },
        ],
      },
      {
        title: "Buses Data",
        footnote:
          "Notes:\n1 Data from CIA World Factbook, extracted April 2011.  GDP figures at purchasing power parity\n2 Probability of winning contract is based on estimates from the PayCo Business Development team, and can be used to determine the  potential revenue opportunity for PayCo",
        cols: "1.6fr 1fr 1fr 1fr",
        headers: [hd("", "left"), hd("NYC"), hd("London"), hd("Tokyo")],
        rows: [
          { cells: [L("Daily Passengers (MM)"), C("3.0"), C("4.5"), C("5.8")] },
          { cells: [L("Annual Fare Collection ($B)"), C("$2.8"), C("$5.5"), C("$4.4")] },
          { cells: [L("Timing for new system"), C("2013"), C("2013"), C("2015")] },
          { cells: [L("Probability of winning contract ²"), C("90%"), C("70%"), C("20%")] },
        ],
      },
    ],
    calcTable: {
      headers: ["City", "(Fare Collection)", "*", "(Prob of winning contract)", "=", "PayCo Market Opportunity"],
      rows: [
        ["New York:", "$12MM", "*", "90%", "=", "==$10.8MM=="],
        ["London:", "$13MM", "*", "70%", "=", "$ 9.1MM"],
        ["Tokyo:", "$45MM", "*", "20%", "=", "$ 9.0MM"],
      ],
    },
    guidanceLines: [
      "**A better answer** will include the items above and address additional elements around the data.  Some findings include:",
      "  Although Tokyo looks like a huge opportunity initially, they are not looking for a new system until 2015, while NYC and London are ready earlier (2012).",
      "  The candidate may also raise the sensitivity of this assessment on the sales probability data point and point out how even a 5% increase for Tokyo would give it the highest value.",
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
    title: "Question 2",
    kind: "qa",
    qText:
      "2. What is the profitability of the “TAP” technology [for NYC]? Specifically, will PayCo break even on commercializing “TAP” in less than 5 years?\n\n**Note to interviewer: Provide Exhibit 2 to the candidate.**",
    guidancePreLabel: "A good answer would be:",
    guidancePreLines: [
      "Yes, PayCo will break even in **4 years** and will achieve a total profit (excluding time value of money) of ==$250,000== in 5 years.",
      "  A key insight is that the past investment in developing the “TAP” technology is a sunk cost in making the decision on commercializing the technology and should not be incorporated into the analysis.",
      "  Here is a summary of revenues and costs calculations as a guide for the interviewer:",
      "    Revenue = (TAP Fare Collection * TAP Processing Fee) + Annual License Fee",
      "    Costs = (# of transactions * cost per transaction) + Advertising and Promotion + SG&A",
    ],
    dataTableTitle: "NYC Subway Forecast Data",
    dataTableCols: "1.6fr 1fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [hd("", "left"), hd("2011"), hd("2012"), hd("2013"), hd("2014"), hd("2015")],
    dataTableRows: [
      { cells: [L("“TAP” Transactions (MM)"), C("1,500"), C("2,000"), C("2,500"), C("3,000"), C("3,000")] },
      { cells: [L("“TAP” Fare Collection ($MM)"), C("$3,750"), C("$5,000"), C("$6,250"), C("$7,500"), C("$7,500")] },
    ],
    dataTableMore: [
      {
        title: "PayCo “TAP” Assumptions",
        footnote: "* Processing Fee applies to dollar value of Fare Collections",
        cols: "2.4fr 1fr",
        headers: [hd("Revenue Assumptions", "left"), hd("")],
        rows: [
          { cells: [L("Annual License Fee ($000s)"), C("$250")] },
          { cells: [L("“TAP” Processing Fee *"), C("0.20%")] },
        ],
      },
      {
        cols: "2.4fr 1fr",
        headers: [hd("Cost Assumptions", "left"), hd("")],
        rows: [
          { cells: [L("Past Investment in “TAP” Development ($000s)"), C("$1,000")] },
          { cells: [L("Cost per transaction"), C("$0.005")] },
        ],
      },
      {
        cols: "1.6fr repeat(5, 1fr)",
        headers: [hd("Cost Projections (in $000s)", "left"), hd("2011"), hd("2012"), hd("2013"), hd("2014"), hd("2015")],
        rows: [
          { cells: [L("Advertising and Promotion"), C("$500"), C("$250"), C("$0"), C("$0"), C("$0")] },
          { cells: [L("SG&A"), C("$50"), C("$50"), C("$50"), C("$50"), C("$50")] },
        ],
      },
    ],
    calcTable: {
      headers: ["", "2011", "2012", "2013", "2014", "2015"],
      rows: [
        ["Total Fares Collected (MM)", "$3,750", "$5,000", "$6,250", "$7,500", "$7,500"],
        ["Processing fee", "0.20%", "0.20%", "0.20%", "0.20%", "0.20%"],
        ["Annual Licensing Fee (MM)", "$0.25", "$0.25", "$0.25", "$0.25", "$0.25"],
        ["Total Revenue (MM)", "$7.75", "$10.25", "$12.75", "$15.25", "$15.25"],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        headers: [],
        rows: [
          ["# of Transactions", "1,500", "2,000", "2,500", "3,000", "3,000"],
          ["Cost per Transaction", "$0.005", "$0.005", "$0.005", "$0.005", "$0.005"],
          ["Advertising and Promotion (MM)", "$0.50", "$0.25", "$0.00", "$0.00", "$0.00"],
          ["SG&A (MM)", "$0.05", "$0.05", "$0.05", "$0.05", "$0.05"],
          ["Total Transaction Costs (MM)", "$8.05", "$10.30", "$12.55", "$15.05", "$15.05"],
        ],
        totalLast: true,
      },
      {
        headers: [],
        rows: [["Profit (MM)", "-$0.30", "-$0.05", "$0.20", "$0.20", "$0.20"]],
        totalLast: true,
      },
    ],
    guidanceLines: [
      "**A great answer** would:",
      "  Be very well structured with clear calculations laid out in a grid (like a spreadsheet or income statement / P & L statement).",
      "  Realize the revenue and the cost for each year are the same after the initial calculation (see below).",
      "  Comfortably handle the variety of units (revenues in $MMs, costs in $000s, percentages).",
      "  Acknowledge time value of money and suggest calculating an NPV to evaluate the investment.",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "3. Would you recommend that the client pursue the commercialization of this technology?",
    guidancePreLabel: "Evaluation",
    guidancePreLines: [
      "PayCo should pursue the commercialization of this technology",
      "  Based on the cost/benefit analysis, commercializing “TAP” is estimated to generate ==$250,000== in profit over five years and meets the criteria for breakeven",
    ],
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "A good answer will include:",
        lines: [
          "Based on the cost / benefit analysis, commercializing “TAP” is estimated to generate ==$250,000== in profit over 5 years and meets the client’s criteria for breakeven.",
        ],
      },
      {
        label: "A great answer would recognize the above, but also include:",
        lines: [
          "Identification of risks in the assumptions, such as:",
          "  The 90% sales probability assumption for NYC.",
          "  Revenue or cost drivers.",
          "Identification of sensitivity in calculations, such as:",
          "  Forecasted transactions and fare revenue.",
          "  Cost forecasts, particularly advertising and promotion.",
          "Qualitative benefits of pursuing commercialization:",
          "  Positive impact on brand and market share.",
          "  Becoming market leader and growing to other cities.",
          "Competitive Response:",
          "  How might PayCo’s competitors respond to its launch of this technology?",
          "Defining next steps, such as further analysis or a high-level implementation plan.",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "90% sales probability assumption that PayCo would win the for NYC contract",
              "Reasonableness of the revenue and cost assumptions:",
              "  Forecasts of transaction amount and fare revenue",
              "  Advertising and promotion costs",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Analyze potential competitor response and / or bid for NYC contract",
              "Perform further analysis on the revenue and cost assumptions / forecasts and develop a high-level implementation plan",
            ],
          },
        ],
      },
    ],
  },
];
