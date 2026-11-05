import type { CasePage } from "../content";

export const CASE_ID = "7ccc7031-1b2d-4aad-b751-65983ccce463";

const PROMPT =
  "Your client, SneakyChat, is a wildly popular Silicon Valley startup with a rapidly growing user base. SneakyChat’s App allows users to send expiring pictures as well as connect with local people in their area. A potential acquirer has offered to purchase the Company for $500m, but on the condition that the Company will generate $2m in cumulative net income over the next 3 months, and have at least 700k daily active users as of the end of month 3. SneakyChat’s CFO has hired you to help hit these metrics.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "A fast-growing Silicon Valley app has an acquisition offer that depends on hitting a net income and daily-active-user target within three months. Work out how to monetize users and which marketing options to choose to hit both metrics.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "tech", "growth-strategy", "brainstorming", "exhibit-heavy"],
};

const K = "#000000";
const lab = (v: string, w = 400, borders?: string, extra: Record<string, unknown> = {}) => ({ v, align: "left" as const, w, fg: K, borders, borderColor: K, ...extra });
const num = (v: string, w = 400, borders?: string, extra: Record<string, unknown> = {}) => ({ v, align: "right" as const, w, fg: K, borders, borderColor: K, ...extra });
const blank = () => ({ v: "", align: "left" as const, w: 400, fg: K });
const cen = (v: string, span: number) => ({ v, align: "center" as const, w: 700, fg: K, span });

const usersRow = (label: string, u: string[], c: string[], split = false) => ({
  cells: [lab(label), ...u.map((v) => num(v)), blank(), ...c.map((v) => num(v, 400, undefined, split ? { split: true, splitPad: "0 2px" } : {}))],
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about the best day you had at your last job. Question 2: If we were to give you an offer tomorrow would you accept it, and why?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "SneakyChat currently only operates in the US",
          "No current revenue, as company has focused solely on user growth and not monetization",
          "Company started operations this year",
          "Net Income and daily active users are total at the end of 3 months",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1 - Current Operations",
    title: "Exhibit #1 - Current Operations",
    kind: "qa",
    dataTableFontSize: 15,
    dataTableCols: "1.5fr 1fr",
    dataTableHeaders: [{ v: "SneakyChat Operations", align: "left", fg: K, span: 2 }],
    dataTableRows: [
      { cells: [lab("(in thousands)", 700, "tb"), num("Current Month", 700, "tb")] },
      { cells: [lab("# Daily Active Users"), num("100")] },
      { cells: [lab("Revenue"), num("$ -", 400, undefined, { split: true, splitPad: "0 4px 0 24%" })] },
      { cells: [lab("Employee Costs"), num("150")] },
      { cells: [lab("Rent Costs"), num("50")] },
      { cells: [lab("Marketing Costs"), num("-")] },
      { cells: [lab("Total Costs"), num("200", 400, "t")] },
      { cells: [lab("Net Income", 700, "tbl", { bg: "#d9d9d9" }), num("$ (200)", 700, "tbr", { bg: "#d9d9d9", split: true, splitPad: "0 4px 0 24%" })] },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "**Candidate should ask for information on current operations and profitability prior to receiving Exhibit 1.**",
      "Candidate should identify current user base of 100k, and therefore company strategy should achieve additional 600k new users.",
      "Candidate should identify that there is no current revenue.",
      "If asked about cutting costs, instruct candidate that all costs are constant except for marketing.",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Ask them to **brainstorm** ways to generate revenue streams (guide to this point if necessary).",
      "  At the end of brainstorm, tell them that the company has selected two ways to monetize users and provide **verbal** information: 1. Selling ads generates ==$1.50/user/mo.==, 2. Selling data generates ==$0.50/user/mo.==",
      "  Note: the revenue amounts are net of any costs associated with the revenue. The company has chosen to do both for ==$2 / mo / user==",
      "Ask them to **brainstorm** ways to acquire new users (guide to this point if necessary).",
      "  At the end of brainstorm, tell them that the company has come up with a couple of options, and provide Exhibit 2.",
      "Note: sequencing of the above brainstorms doesn’t matter, however candidate needs to complete both before moving on to solve case. Guide to the second brainstorming if necessary.",
    ],
  },
  {
    n: "03",
    label: "Exhibit #2 - Marketing Proposal",
    title: "Exhibit #2 - Marketing Proposal",
    kind: "qa",
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "**Candidate should ask for information on increasing user base and costs associated prior to receiving Exhibit 2.**",
      "Candidate should recognize the footnotes indicating that an outside marketing firm has projected user growth (marketing firms tend to be fairly optimistic), and the cash on hand limits the amount of money that can be spent in month 1.",
      "A strong candidate will ask if user attrition should be factored in. Advise them that normally it would, but for the simplicity of the case they can assume no attrition at this time.",
    ],
    infoBoxLabel: "Analysis",
    infoSections: [
      {
        lines: [
          "Candidate should identify that two items can be eliminated before calculations are even performed (acquisition is cost prohibitive and print ads will not generate enough users to compensate for the cost).",
          "Candidate should calculate total current revenue and identify that if current users (100k) are monetized, the firm breaks even.",
          "Candidate should then calculate total net income for each strategy that has not already been eliminated.",
          "See solutions (next page) for specific calculations.",
        ],
      },
    ],
    dataTableFontSize: 14,
    dataTableCols: "2.3fr 1fr 1fr 1.1fr 0.3fr 1fr 1fr 1fr",
    dataTableHeaders: [],
    dataTableFootnote: "Note: Current cash on hand is $3m as of the beginning of Month 1\n*Estimates may fluctuate depending on viewership; will require full resources of Marketing team, precluding work on any other marketing strategies",
    dataTableFootnoteLeft: true,
    dataTableRows: [
      { cells: [{ ...lab("SirSalesAlot Marketing Co. Proposal", 700), span: 8 }] },
      { cells: [blank(), cen("New Users Per Month", 3), blank(), cen("Cost Per Month", 3)] },
      {
        cells: [
          lab("(in thousands)", 400, "tb"),
          ...["1", "2", "3"].map((v) => num(v, 400, "tb")),
          blank(),
          ...["1", "2", "3"].map((v) => num(v, 400, "tb")),
        ],
      },
      usersRow("Online Ads", ["125", "125", "125"], ["$ 100", "$ 100", "$ 100"], true),
      usersRow("Print Ads", ["50", "50", "50"], ["75", "75", "75"]),
      usersRow("Onsite Activations", ["100", "100", "100"], ["100", "100", "100"]),
      usersRow("Acquire Competitor", ["2,500", "-", "-"], ["3,500", "-", "-"]),
      usersRow("Super Bowl Ad", ["-", "-", "1,500*"], ["-", "-", "1,000"]),
    ],
    calcTable: {
      title: "Solution to Exhibits",
      subtitle: "Exhibit 2 - Marketing Proposal",
      plain: true,
      cols: "4.6fr 1fr 1fr 1fr 0.3fr 1fr 1fr 1fr 0.4fr 1.5fr 1.6fr 1.4fr",
      headers: ["", "", "", "", "", "Calculations", "", "", "", "", "", ""],
      headerSpans: [{ col: 5, span: 3 }],
      boldRows: [0],
      rulesAbove: [1, 2],
      ruleSkipCols: [4, 8, 9, 10, 11],
      rightCols: [1, 2, 3, 5, 6, 7, 9, 10, 11],
      center: true,
      leftCols: [0],
      spans: [
        { row: 0, col: 1, span: 3 },
        { row: 0, col: 5, span: 3 },
        { row: 8, col: 0, span: 8 },
      ],
      rows: [
        ["SirSalesAlot Marketing Co. Proposal", "Cumulative Users", "", "", "", "Monthly Revenue", "", "", "", "Total Rev", "Total Cost", "Total NI"],
        ["(in thousands)", "1", "2", "3", "", "1", "2", "3", "", "", "", ""],
        ["Online Ads", "125", "250", "375", "", "250", "500", "750", "", "1,500", "300", "1,200"],
        ["Print Ads", "50", "100", "150", "", "100", "200", "300", "", "600", "225", "375"],
        ["Onsite Activations", "100", "200", "300", "", "200", "400", "600", "", "1,200", "300", "900"],
        ["Acquire Competitor", "2,500", "2,500", "2,500", "", "5,000", "5,000", "5,000", "", "15,000", "3,500", "11,500"],
        ["Super Bowl Ad", "-", "-", "1,500", "", "-", "-", "3,000", "", "3,000", "1,000", "2,000"],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["* Cash on hand at beginning of Month 1 is $3M", "", "", "", "", "", "", "", "", "", "", ""],
      ],
    },
    guidanceLabel: "Key Reminders",
    guidanceLines: [
      "Company started with ==100k users==, if monetized at $2/user/mo, current monthly revenue = ==$200k==, which offsets current costs of $200k (from Exhibit 1)",
      "Users are **cumulative** (and therefore so is revenue)",
      "**Super Bowl** is riskier, and if chosen cannot be combined with any other strategy (per footnote)",
      "**Acquiring competitor** is cost prohibitive (per footnote)",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "Based on all of the information you have analyzed, what would be your recommendation to SneakyChat’s CFO?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should recommend growing SneakyChat’s user base through the combination of **online ads and onsite activation**",
      "  If a candidate chooses Super Bowl, or online, print and onsite, ask if there are other possibilities, and ask them to defend their selection.",
      "  Online ads & onsite activation is preferred over the Super Bowl ad as this is a much riskier strategy",
      "  The selection of Online+Print+Onsite will achieve the hurdle, but a good caser will recognize that print is less efficient and the company could allocate the resources elsewhere in the business.",
      "This recommendation will result in total net income of ==$2.1m== at the end of 3 months, as well as an additional ==675k users==, which exceeds SneakyChat’s targets",
    ],
  },
];
