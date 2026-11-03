import type { CasePage } from "../content";

export const CASE_ID = "1f9f135d-d753-4deb-b0cd-21e3c01544a5";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Private Equity & Profitability Improvement",
  synopsis:
    "A small-market P.E. firm is weighing the purchase of two suburban movie theaters. Size the revenues and profitability, and test a modernization project against the firm's ROI hurdle.",
  full_prompt:
    "Your client, 6PAQ, is a small-market P.E. firm that specializes in suburban business development.\n\nOne of its analysts identified two movie theaters in a small suburban area that separately or together might prove to be a good investment. Should your client, 6PAQ, purchase these movie theaters?",
  tags: ["interviewer-led", "private-equity", "market-sizing", "brainstorming", "exhibit-heavy"],
};

const BLUE = "#729acb";
const YELLOW = "#ecc61f";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Your client, 6PAQ, is a small-market P.E. firm that specializes in suburban business development.\n\nOne of its analysts identified two movie theaters in a small suburban area that separately or together might prove to be a good investment. Should your client, 6PAQ, purchase these movie theaters?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is an **interviewer-led case**, but the interviewer should **gauge the candidate's ability to drive**. The interviewer should assess the interviewee's potential for **structuring math**, **making calculations easier**, and **bringing up relevant industry trends** (e.g. Netflix, MoviePass, etc.).",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Clarifying Information",
    title: "Clarifying Information",
    kind: "qa",
    infoBoxLabel: "Clarifying Information",
    infoSections: [
      {
        groups: [
          {
            heading: "Theater Specific Info:",
            items: [
              "The movie theaters are somewhat dilapidated",
              "Competition: None, they are the only two in the suburb and surrounding suburbs",
              "Revenue Streams:",
              "  Tickets (tix)-movies leased through distributors",
              "  Concessions (cns)-purchased from distributors",
            ],
          },
          {
            heading: "P.E. Company 6PAQ Info:",
            items: [
              "Portfolio: Suburban recreational facilities and entertainment (swimming pools, shopping malls, bowling alleys, laser tag facilities, etc.)",
              "Objectives:",
              "  6PAQ has a standard of ==100% ROI== for all investments",
              "  Sell in five years",
              "  Evaluate modernization project",
            ],
          },
          {
            heading: "Industry-wide Trends from 2010-18¹:",
            items: ["Ticket sales have declined by 1.18%", "Average Ticket Price Increased by 15.46%"],
          },
        ],
      },
      {
        paragraphs: ["¹ https://www.the-numbers.com/market/ and individual analysis"],
      },
    ],
  },
  {
    n: "03",
    label: "Possible Framework",
    title: "Possible Framework",
    kind: "qa",
    infoBoxLabel: "Possible Framework",
    infoSections: [
      {
        label: "Problem: Improve Profitability and Investment Valuation",
        groups: [
          {
            heading: "Financials",
            items: [
              "Rev (can include ways to improve here)",
              "  Tickets (P * Q)",
              "  Concessions (P * Q)",
              "Cost",
              "  FC- movie leases, labor, rent, taxes, electricity (HVAC), cleaning materials, insurance, maintenance",
              "  VC- concession costs",
            ],
          },
          { heading: "Revenue Improvement Opportunities (and list of them)", items: [] },
          {
            heading: "Marketing/Customer Analysis",
            items: ["Price Sensitivity Analysis", "SKU Analysis (Concessions and Tix)", "Gap analysis", "Advertising/Discount Spends"],
          },
          {
            heading: "Entrance & Exit",
            items: ["Purchase Price & Exit Price", "Valuation Methods- Multiple, NPV, Comparables", "Buyers"],
          },
          {
            heading: "Other",
            items: [
              "Synergies",
              "  Bundle opportunities w/ portfolio companies (cross-sell)",
              "  Cost (back-office, increased buying power, etc)",
            ],
          },
        ],
      },
      {
        paragraphs: [
          "A **good candidate** will consider possibility for **localized monopoly**, **exit opportunities**, **synergies** with existing portfolio, and **innovative ways to improve revenue and decrease costs**",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Exhibit 1 · Revenue",
    title: "Exhibit 1 – Revenue and Profitability by Theater",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 1)",
    guidancePreLines: [
      "**Revenue:** The candidate should drive towards understanding revenues first. If not, guide them there. **Show Exhibit 1** and explain:",
    ],
    qText:
      "We do not know revenues for Theaters A and B for certain but 6PAQ obtained this exhibit. What does it tell you?",
    multiLineTitle: "Exhibit 1 – Revenue and Profitability by Theater",
    multiLineSeries: [
      { name: "Theatre A Revenue", color: BLUE, values: [4.56, 3.81, 4.09, 3.93, 4.01, 3.89] },
      { name: "Theatre A Profitability", color: BLUE, dashed: true, values: [2.29, 1.9, 2.04, 1.98, 2.01, 1.95] },
      { name: "Theatre B Revenue", color: YELLOW, values: [2.66, 2.21, 2.37, 2.29, 2.32, 2.31] },
      { name: "Theatre B Profitability", color: YELLOW, dashed: true, values: [2.12, 1.78, 1.9, 1.83, 1.88, 1.85] },
    ],
    multiLineXLabels: ["2013", "2014", "2015", "2016", "2017", "2018"],
    multiLineYMax: 5,
    multiLineGridLines: 5,
    answerText:
      "Key insights:\n- 1) Revenue has been **consistent** for both Theaters and they have **similar net profits**\n- 2) Theater A has **much higher revenue**\n- 3) Theater A's **costs are much higher as a percentage of revenue**, indicating its cost structure could be improved",
  },
  {
    n: "05",
    label: "Revenue estimate",
    title: "Calculations – Revenue and Profitability by Theater",
    kind: "qa",
    qText:
      "6PAQ plans to send the same analyst to each theater for a month to estimate the number of yearly visitors and revenue. Neither theater offers demographic discounts (e.g. senior discounts) and the analyst cannot sit at the front of the theaters and count customers or be in multiple places at once. What instructions would you give to the analyst and how would you calculate it?",
    guidancePreLabel: "Interviewer Guidance (pt. 1)",
    guidancePreLines: [
      "Once the candidate nails these insights, indicate:",
      "**Important Note:** All numbers necessary for calculations should be provided and candidates can round to the tens of thousands $x.xx million (see Calculations – Revenue and Profitability by Theater pg. 88)",
    ],
    calcNote: "Tickets:",
    calcLines: [
      {
        q: "Formula",
        a: "# of Screens * # of Seats/Screen * Avg Fill Capacity * # of movies played per screen/month = Total Monthly Visitors",
        stack: true,
      },
      {
        q: "Theater A",
        a: "10 screens * 80 seats per screen * 75% average fill capacity * 20 movies played per screen per month = ==12,000 Total Monthly Visitors==",
        stack: true,
      },
      {
        q: "Theater B",
        a: "10 screens * 80 seats per screen * 50% average fill capacity * 20 movies played per screen per month = ==8,000 Total Monthly Visitors==",
        stack: true,
      },
      {
        q: "Formula",
        a: "Total Monthly Visitors * Percentage of Movies Matinee (or Premium) * Price of Matinee (or Premium) ticket * 12 months/year = Total Monthly Matinee Revenue (or Premium)",
        stack: true,
      },
      {
        q: "Theater A",
        a: "12,000 Total Monthly Visitors * 90% Premium * $10 Premium Price * 12 months/year = $1.296m (round to $1.29m)\n12,000 Total Monthly Visitors * 10% Premium * $5 Matinee Price * 12 months/year = $.072m (round to ($.07m)\nTotal Theater A Ticket Revenue = ==$1.36m==",
        stack: true,
      },
      {
        q: "Theater B",
        a: "8,000 Total Monthly Visitors * 80% Premium * $10 Premium Price * 12 months/year = $.768m (round to $.77m)\n8,000 Total Monthly Visitors * 20% Premium * $5 Matinee Price * 12 months/year = $.096m (round to ($.1m)\nTotal Theater B Ticket Revenue = ==$870k== (round to $870k)",
        stack: true,
      },
      {
        q: "Concessions: Formula",
        a: "Total Monthly Visitors * Average Spend Per Customer * Percentage of Customers who buy concessions * 12 months/year = Total Yearly Concession Revenue",
        stack: true,
      },
      {
        q: "Theater A",
        a: "12k Monthly Visitors * $6 Avg Cust. Spend * 75% of Cust. Purchase Concessions * 12 Months/year = ==$648k== (round to $650k)",
        stack: true,
      },
      {
        q: "Theater B",
        a: "8k Monthly Visitors * $7 Avg Cust. Spend * 75% of Cust. Purchase Concessions * 12 Months/year = ==$504k== (round to $500k)",
        stack: true,
      },
    ],
    nextStepText:
      "After having candidate calculate revenues, ask them to brainstorm ways to improve them (see Ansoff Matrix in Brainstorming Guidance, pg. 89)",
  },
  {
    n: "06",
    label: "Brainstorming · Revenue Improvement",
    title: "Brainstorming Guidance: Revenue Improvement",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 1)",
    guidancePreLines: [
      "After having candidate calculate revenues, **ask them to brainstorm** ways to improve them (see Ansoff Matrix in Brainstorming Guidance, pg. 89)",
    ],
    infoBoxLabel: "Revenue Improvement",
    infoSections: [
      {
        groups: [
          {
            heading: "Existing Customers · Existing Products",
            items: [
              "Alter SKUs",
              "Implement special/discounts (senior, students, etc)",
              "Increase prices (w/ new local monopoly)",
              "Show more movies",
              "Additional trailers",
            ],
          },
          {
            heading: "Existing Customers · New Products",
            items: [
              "Open alternative space (e.g. arcade)",
              "Charge for parking if lot owned",
              "New food or alcohol",
              "Start movie pass",
              "Offer premium seating",
            ],
          },
          {
            heading: "New Customers · Existing Products",
            items: [
              "Increase ad spend",
              "Offer theme nights or diversify customer-targeted movies (e.g. cult classics reruns)",
              "Open additional theater",
              "Cross-sell to customers of other portfolio companies",
            ],
          },
          {
            heading: "New Customers · New Products",
            items: ["Offer other types of entertainment (e.g. local plays)"],
          },
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Cost drivers · Profitability",
    title: "Calculations – Revenue and Profitability by Theater",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 1)",
    guidancePreLines: [
      "Next, tell them that you believe there are **significant synergies** and that total costs for theaters as a function of revenue are: Theater A) ==50%== Theater B) ==20%==",
      "Ask candidate **what could be driving the difference in cost** and afterwards, to **calculate profitability**. (see Brainstorming Guidance, pg. 7, Revenue Calculations pg. 90)",
    ],
    infoBoxLabel: "Cost Drivers",
    infoSections: [
      {
        lines: [
          "Electricity/HVAC",
          "Movie leases",
          "Rent/real estate",
          "SKU choices",
          "Unionized labor",
          "Taxes if on larger property",
          "Poor relationships with distributors",
        ],
      },
    ],
    calcTable: {
      headers: ["", "Total Revenues:", "Total Costs:", "Total Profitability:"],
      rows: [
        ["Theater A)", "1.36m+.65m=$2.01m", "50% * 2.01m=~$1m", "2.01m-1m=$1.01m (round to $1m)"],
        ["Theater B)", ".87m+.5m=$1.37m", "20% * 1.37m=$.27m", "1.37m-.27m=$1.1m"],
        ["For both theaters:", "", "", "==$2.1M=="],
      ],
      totalLast: true,
    },
  },
  {
    n: "08",
    label: "Modernization project",
    title: "Calculations – ROI Sub-Investment",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 2)",
    guidancePreLines: ["**Modernization project:** Tell the candidate:"],
    qText:
      "The analyst identified an investment for both theaters he believes will significantly lift Net Income. Specifically, it will install arcades in both theaters, nicer seats, a new mobile app for ticket purchasing, and an HVAC system for Theater A which will drive down heating and AC costs. It will cost $4m upfront. After completion one year after development begins, both theaters will generate an additional 50% revenue (in part due to monopoly pricing and improved theater quality), and Theater A's costs will decrease to what Theater B's are (due to increased buying power and lower HVAC costs) as a percentage. The theaters will continue to operate as they originally did during the year until completion. Discount rates and opportunity costs should be ignored. Should the firm undergo this project, consistent with their firm investment criteria?",
    extraCharts: [
      {
        kind: "flow",
        aspect: 0.222,
        nodes: [
          { text: "Y0", shape: "tag", x: 0.0527, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { text: "Y1", shape: "tag", x: 0.2203, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { text: "Y2", shape: "tag", x: 0.3877, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { text: "Y3", shape: "tag", x: 0.5553, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { text: "Y4", shape: "tag", x: 0.7228, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { text: "Y5", shape: "tag", x: 0.8902, y: 0.045, w: 0.0475, h: 0.0991, size: 16, serif: true, align: "center", stroke: "#729acb", strokeWidth: 2 },
          { shape: "blockArrow", x: 0.0765, y: 0.2703, w: 0.86, h: 0.1734, headLen: 0.0385, headH: 0.3446, fill: "#689fc8" },
          { shape: "box", x: 0.239, y: 0.2703, w: 0.0085, h: 0.1734, fill: "bg", stroke: "none" },
          { shape: "box", x: 0.9095, y: 0.2703, w: 0.0085, h: 0.1734, fill: "bg", stroke: "none" },
          { text: "Initial Cost:\n$4m investment", shape: "box", x: 0.0175, y: 0.5473, w: 0.14, h: 0.3941, size: 16, serif: true, align: "left", lineGap: 1.66, stroke: "#1f5f9f", strokeWidth: 1.2 },
          { text: "Yearly Revenue Improvement: $1.7m\nYearly Cost Improvement: $.27m\nYearly N.I. Improvement:: ~$2m", shape: "box", x: 0.439, y: 0.5473, w: 0.28, h: 0.3941, size: 16, serif: true, align: "left", lineGap: 1.66, stroke: "#1f5f9f", strokeWidth: 1.2 },
        ],
        arrows: [
          { points: [[0.0765, 0.1441], [0.0765, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.244, 0.1441], [0.244, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.4115, 0.1441], [0.4115, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.579, 0.1441], [0.579, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.7465, 0.1441], [0.7465, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.914, 0.1441], [0.914, 0.2703]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.0765, 0.4437], [0.0765, 0.5473]], color: "#8a8a8a", width: 1, head: "none" },
          { points: [[0.244, 0.4437], [0.244, 0.491], [0.914, 0.491], [0.914, 0.4437]], color: "ink", width: 1.2, head: "none" },
          { points: [[0.579, 0.491], [0.579, 0.5473]], color: "ink", width: 1.2, head: "none" },
        ],
      },
    ],
    calcNote: "Note: This is an ROI calculation (see Calculations – ROI modernization project pg. 91)",
    calcLines: [
      { q: "ROI Calculations", a: "Formula: Net Profit/Invested Capital", stack: true },
      {
        q: "Modernization Project",
        a: "Incremental Profit = (Total New Profit – Total current Profit) * Years\nIncremental Profit = ((150% Current Revenue – New Costs) – (Current Revenue – Current Costs)) * 4 Years\nIncremental Profit = ($5.07m – 20% * ($5.07m)) – ($3.38m – $1. 27m)) * 4 years\n= ($4.06m – $2.11m) * 4 years\n~ $2m * 4 years = ==$8m==",
        stack: true,
      },
      { q: "ROI", a: "$8m-$4m / $4m = ==100%==", stack: true },
    ],
    guidanceLabel: "Interviewer Guidance (pt. 2)",
    guidanceLines: [
      "A **good candidate** will realize that during the first year, nothing will change about either theater while improvements are made, so they should consider the investment only for its Net Profit in Years 2-5. A good candidate would also realize that as revenues have doubled, costs have gone down, and the increase in multiple means that they will certainly be able to sell for a 100% ROI.",
    ],
  },
  {
    n: "09",
    label: "Overall investment",
    title: "Calculations – Overall Investment",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 2)",
    guidancePreLines: [
      "Ask the candidate to calculate whether the overall investment would clear the firm's 100% ROI hurdle, if the purchase price multiple was 5x Net Income and the exit price multiple is 6x. (see Calculations – Overall Investment, pg. 10).",
    ],
    calcLines: [
      { q: "New Revenues", a: "Current Revenues * (1+Revenue Increase Percentage) = New Revenues", stack: true },
      { q: "Current Revenues", a: "$2.01m + $1.37m = $3.38m", stack: true },
      { q: "New Revenues", a: "$3.38m * 150% = $ 5.07m", stack: true },
      { q: "New Total Costs", a: "New Revenues * New Total Cost Percentage = New Total Costs (exc.", stack: true },
      { q: "Current Costs", a: "$1m + $.27m = $1.27m", stack: true },
      { q: "New Costs", a: "$5.07m * 20% = $1.01m", stack: true },
      { q: "New Net Income", a: "New Revenues – New Total Costs = New N.I.", stack: true },
      { q: "Total", a: "$5.07m-$1.01m=$4.06m", stack: true },
      { q: "Overall Investment: Valuation", a: "=N.I.*N.I multiple", stack: true },
      { q: "Purchase Price", a: "=$2.1m * 5 = ==$10.5m==", stack: true },
      { q: "Exit Price", a: "$4.06m * 6 = ~ ==$24.4m==", stack: true },
      { q: "ROI", a: "$24.4m-$10.5/$10.5m = ==132%==", stack: true },
    ],
  },
  {
    n: "10",
    label: "Recommendation",
    title: "Recommendations",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance (pt. 2)",
    guidancePreLines: ["Lastly, ask for a recommendation (see Recommendation, pg. 93)"],
    infoBoxLabel: "Recommendations",
    infoSections: [
      {
        label: "Recommendation:",
        paragraphs: [
          "6PAQ P.E. Firm should invest in both theaters and undergo the modernization project",
          "With its new improvements and monopoly powers, it could make over ==100% ROI== on both the initial and modernization project",
          "On the modernization project, 6PAQ could make a ==100% ROI== while on the overall theater investment, 6PAQ could make a ==132% ROI==",
        ],
      },
      {
        label: "Risks include:",
        groups: [
          { heading: "1. Substitutes and Threats", items: ["New local entrants", "Netflix and streaming services"] },
          {
            heading: "2. Accuracy of assumptions",
            items: [
              "NI multiple increase",
              "Improved NI from investment",
              "No opportunity cost or discount rate",
              "100% ROI on modernization project leaves little room for error",
            ],
          },
          { heading: "3. Theater owners' unstated intent to sell", items: [] },
        ],
      },
      {
        label: "6PAQ should:",
        groups: [
          {
            heading: "1. Conduct analysis:",
            items: [
              "Use its existing relationships in the industry to conduct intelligence gathering",
              "Purchase market research reports to identify time horizon of threats trends",
              "Further analyze and triangulate assumptions",
            ],
          },
          { heading: "2. Approach theater owners to gauge interest and initiate discussions", items: [] },
        ],
      },
    ],
  },
];
