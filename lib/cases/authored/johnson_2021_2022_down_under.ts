import type { CasePage } from "../content";

export const CASE_ID = "c21a36f1-1506-45b1-9126-d2e886d2d705";

const PROMPT =
  "Our client is Down Under Apparel an Australian based swim wear and lifestyle company. The company unexpectedly missed its internal earnings target. The CEO has called your team to help diagnose the problem and provide a recommendation.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "An Australian swim wear and lifestyle company has unexpectedly missed its internal earnings target. Diagnose why and recommend a course of action.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "retail", "exhibit-heavy", "light-math"],
};

const GREEN = "#84bd00";
const GREY = "#d9d9d9";
const INK = "#1f2421";
const LINE = "#9a9a9a";
const HD = (v: string, align: "left" | "center" | "right" = "center") => ({ v, align, bg: GREEN, fg: "#ffffff" });
const cell = (v: string, align: "left" | "center" | "right" = "center", w = 400, bg?: string) => ({ v, align, w, fg: INK, bg, borders: "b", borderColor: LINE });
const dataRow = (name: string, vals: string[], total: string) => ({
  cells: [cell(name, "left", 700), ...vals.map((v) => cell(v)), cell(total, "center", 400, GREY)],
});
const totalRow = (vals: string[]) => ({
  cells: [cell("Total", "left", 700, GREY), ...vals.map((v) => cell(v, "center", 400, GREY))],
});
const seg = (value: number, color: string) => ({ value, color, label: "$" + value });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question (spend 15 minutes on): Describe a time when you took the initiative to do something when it wasn’t your responsibility",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Overview [Interviewer-led]",
        paragraphs: ["This is an interviewer-led case, guide the interviewee through the following:"],
        lines: [
          "Develop structured approach to identify & recommend a solution to the problem",
          "Methodically learn more about the client to tailor the analysis",
          "Analyze the forecast & actual information through interpreting data",
          "Synthesize information to determine why Down Under missed its earnings forecast",
          "Brainstorm a potential solutions and deliver a recommendation",
        ],
      },
      { label: "Case Information" },
      {
        label: "Competitors",
        lines: [
          "The client competes against a difference competitor set depending on the product. Historically, the Maui was the largest rival in the surf and athletic swim wear, but offered lower quality products at lower price points.",
          "The client has no interest in growth through competitor acquisition.",
        ],
      },
      {
        label: "Customers",
        lines: [
          "**Surfers and Professional Athletes (30% of Revenue)**: Values performance and cutting edge technology (hydrodynamic). Willing to pay for performance, yet low earnings for the average suffer and swimmer suggest limits to what they will pay",
          "**Luxury Seekers (70% of revenue)**: Fastest Growing segment, contributing to the explosive growth. These are casual users who enjoy the performance but not a key to buying process. Values the brand and ascetics. Brand offers legitimacy.",
        ],
      },
      {
        label: "Channel",
        lines: [
          "**Surf Shops**: Typically small independent retailers located in beach towns. Client has long standing relationships and entry point for any given market. See more Surfers and Professional Athletes. Carry limited merchandise due to small locations, almost exclusively performance wear.",
          "**Big Box Retailers** ( think Dick’s, not Walmart): Asking for products at targeted price points to appeal to their customers. Typically more price sensitive customers. Offers a wide variety of performance wear and equipment (boards, beach equipment etc.) some lifestyle products. Frequent Sales",
          "**Department Stores** (think Bloomingdales, not J.C. Penny): Least price sensitive customers. Offers a wide variety products focusing on the lifestyle wear. Only channel outside online that offers the resort collection.",
          "**Direct to Consumer** (Online): Attracts repeat customers who are already familiar with brand and products. Never puts anything on sale.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Step 1: Developing a framework",
    title: "Step 1: Developing a framework",
    kind: "qa",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: [
          "The candidate should summarize the case and create a framework",
          "**[**The interviewer should evaluate whether or not the framework is MECE, which is a good indication of structured thinking**]**",
        ],
      },
      {
        label: "Key considerations of this case:",
        lines: [
          "The candidate has to recognize that the **main topic of the case is identifying why Down Under Missed It’s earnings forecast**",
          "**Understanding the client and industry** is key prerequisite before launching into a project",
          "**Concept of forecasts vs. actuals** and the ability to distinguish between the two",
          "**Segmenting data** is necessary for analysis and to draw insights (e.g., customer types, sales channels, etc.)",
          "**Precise questions** uncover additional data",
          "**Risks and challenges** of launching a new product",
        ],
      },
      {
        paragraphs: [
          "**After the framework,** the candidate should state a hypothesis and work through a framework to test it. Redirect candidate that immediately requests data to learn more about the client",
          "Note: The candidate should attempt to learn more about the client and then identify hypotheses",
        ],
      },
      {
        label: "Step 2: Asking critical questions and analyzing data effectively",
        spaceBefore: 18,
        paragraphs: [
          "**The candidate should come to the following conclusion:** The client missed its earning forecast due to selling 2M fewer surfboards/ surf equipment at surf shops",
          "The candidate can arrive to the conclusion in several ways. One potential path is below:",
        ],
        lines: [
          "Candidate asks about expected earnings and is provided **Exhibit 1**",
          "Candidate compares expected sales and costs to determine expected earnings = $1,100 million",
          "Candidate asks for a breakdown of the sales forecast and is provided **Exhibit 2**",
          "  No analysis at this time. The candidate moves to actual sales and is provided **Exhibit 3.**",
          "Exhibit 3 provides the following information:",
          "  Actual Sales = $12,000 million",
          "  **New category introduced** in 2014: Surf Equipment",
          "  Interviewer must provide the following when prompted: $800 million sold at Surf Shops",
          "  Using the information on the sheet, $800 million / $400 = 2 million units sold",
          "  Compares this information to Exhibit 2 and determine that 2M is **only 50%** of units sold compared to forecast",
          "  **Revised hypothesis**: Missed surf equipment sales at surf shops is the issue for missing target",
          "  Proposes to validate through understanding cost information and is provided **Exhibit 4**",
          "Exhibit 4 confirms that costs are inline with expectations and costs are not a problem",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Exhibit 1: Financial Trends",
    title: "Exhibit 1",
    kind: "qa",
    guidancePreLines: [
      "Always provide Exhibit 1 before any other exhibits, even if the interviewee asks for specific information",
      "Expected Profit = $1,100M",
      "Actual Profit = $500M",
    ],
    exhibitTitle: "Financial Trends",
    extraCharts: [
      {
        kind: "combo",
        yMax: 14000,
        yStep: 2000,
        yTickLabels: ["$-", "$2,000", "$4,000", "$6,000", "$8,000", "$10,000", "$12,000", "$14,000"],
        legend: "none",
        plotAspect: 0.4,
        footnote: "Note: in millions ($)",
        panels: [
          {
            heading: "Sales by Year",
            categories: ["2012", "2013", "2014"],
            clusterLegend: true,
            clusters: [
              { name: "Forecast", color: "#ebebeb", values: [8000, 9300, 12800], valueLabels: true, valuePrefix: "$", labelColor: INK },
              { name: "Actual", color: GREEN, values: [8350, 9500, 12000], valueLabels: true, valuePrefix: "$" },
            ],
          },
          {
            heading: "Costs by Year",
            categories: ["2012", "2013", "2014"],
            clusterLegend: true,
            clusters: [
              { name: "Forecast", color: "#ebebeb", values: [7800, 8900, 11700], valueLabels: true, valuePrefix: "$", labelColor: INK },
              { name: "Actuals", color: GREEN, values: [7500, 9000, 11500], valueLabels: true, valuePrefix: "$" },
            ],
          },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Exhibit 2: Forecast Details",
    title: "Exhibit 2",
    kind: "qa",
    guidancePreLines: [
      "Provide only if the interviewee asks for breakdown of the information in Exhibit 1",
      "Key insight: Surf Equipment Sales at Surf Shops Forecast = $1,600M, Units Forecast = 4M",
    ],
    exhibitTitle: "Forecast Details",
    dataTableTitleRules: GREEN,
    dataTableFootnoteLeft: true,
    dataTableTitle: "2014 Sales Forecast by Channel and Category ($MM)",
    dataTableTitleBold: true,
    dataTableCols: "1.5fr 1fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [HD("", "left"), HD("Big Box"), HD("Department"), HD("Online"), HD("Surf Shops"), HD("Total")],
    dataTableRows: [
      dataRow("Beach Attire", ["$1,000", "$800", "$480", "$400"], "$2,680"),
      dataRow("Casual Swim", ["$1,400", "$870", "$580", "$435"], "$3,285"),
      dataRow("Professional Swim", ["$400", "$0", "$360", "$800"], "$1,560"),
      dataRow("Resort Wear", ["$1,050", "$1,100", "$450", "$675"], "$3,275"),
      dataRow("Surf Equipment", ["$400", "$0", "$0", "$1,600"], "$2,000"),
      totalRow(["$4,250", "$2,770", "$1,870", "$3,910", "$12,800"]),
    ],
    dataTableMore: [
      {
        title: "2014 Projected Units Sold by Channel and Category",
        footnote: "Note: in millions",
        cols: "1.5fr 1fr 1fr 1fr 1fr 1fr",
        headers: [HD("", "left"), HD("Big Box"), HD("Department"), HD("Online"), HD("Surf Shops"), HD("Total")],
        rows: [
          dataRow("Beach Attire", ["8", "6", "4", "3"], "21"),
          dataRow("Casual Swim", ["11", "6", "4", "3"], "24"),
          dataRow("Professional Swim", ["3", "0", "2", "4"], "9"),
          dataRow("Resort Wear", ["7", "6", "3", "4"], "20"),
          dataRow("Surf Equipment", ["1", "0", "0", "4"], "5"),
          totalRow(["30", "18", "13", "18", "79"]),
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Exhibit 3: Sales by Category (Actuals)",
    title: "Exhibit 3",
    kind: "qa",
    guidancePreLines: [
      "The interviewee should notice that Surf Equipment is new. After making that observation, provide that:",
      "  Surf Equipment is a recently launched category",
      "  Products include surf boards, sold primarily at Surf Shops",
      "  Sold only $800M at Surf Shops this year (50% of the forecast)",
    ],
    extraCharts: [
      {
        kind: "hBars",
        title: "Net Sales by Category",
        titleStyle: "centered-bold",
        series: [
          { name: "Casual Swim", color: "#3f5b00" },
          { name: "Professional Swim", color: "#999999" },
          { name: "Resort Wear", color: GREEN },
          { name: "Beach Attire", color: "#e8e8e8" },
          { name: "Surf Equipment", color: "#d4ff7a" },
        ],
        groups: [
          { label: "2012", values: [2600, 1600, 2100, 2000], valueTexts: ["$2,600", "$1,600", "$2,100", "$2,000"] },
          { label: "2013", values: [3050, 1700, 2550, 2200], valueTexts: ["$3,050", "$1,700", "$2,550", "$2,200"] },
          { label: "2014", values: [3480, 1800, 3000, 2520, 1200], valueTexts: ["$3,480", "$1,800", "$3,000", "$2,520", "$1,200"] },
        ],
        max: 4000,
        axisStep: 500,
        tickPrefix: "$",
        zeroLabel: "$-",
        axisBold: true,
        insideLabels: true,
        plotWidth: 330,
        legendBottom: true,
        footnote: "Note: in millions ($)",
      },
      {
        kind: "hBars",
        title: "Margin by Category",
        titleStyle: "centered-bold",
        groups: [
          { label: "Casual Swim", values: [4], colors: [GREEN] },
          { label: "Professional Swim", values: [8], colors: [GREEN] },
          { label: "Resort Wear", values: [11], colors: [GREEN] },
          { label: "Beach Attire", values: [6], colors: [GREEN] },
          { label: "Surf Equipment", values: [20], colors: [GREEN] },
        ],
        max: 25,
        axisStep: 5,
        valueSuffix: "%",
        plotWidth: 190,
        insideLabels: true,
        axisBold: true,
      },
    ],
    exhibitTitle: "Sales by Category (Actuals)",
    exhibitColumns: [2.5, 1],
    dataTableHeaders: [{ v: "Average Price by Category (2014)", align: "center", bg: GREEN, fg: "#ffffff", span: 2 }],
    dataTableCols: "1fr 1fr",
    dataTableRows: [
      { cells: [cell("Beach Attire", "left"), cell("$128", "right")] },
      { cells: [cell("Casual Swim", "left"), cell("$134", "right")] },
      { cells: [cell("Professional Swim", "left"), cell("$173", "right")] },
      { cells: [cell("Resort Wear", "left"), cell("$163", "right")] },
      { cells: [cell("Surf Equipment", "left"), cell("$400", "right")] },
    ],
  },
  {
    n: "06",
    label: "Exhibit 4: Cost Structure (Actuals)",
    title: "Exhibit 4",
    kind: "qa",
    guidancePreLines: [
      "Since Surf Equipment is a recent launch, it has a relatively higher marketing cost as a percentage of overall costs",
      "For all other products, FY 2014 costs are approximately the same as FY 2013 costs",
      "This exhibit should inform the interviewee that costs are the main issue",
    ],
    exhibitTitle: "Cost Structure (Actuals)",
    exhibitColumns: [2.1, 1],
    extraCharts: [
      {
        kind: "stackCols",
        title: "Average Cost by Category",
        titleStyle: "centered-bold",
        panels: [
          {
            yMax: 350,
            yStep: 50,
            yTickLabels: ["$-", "$50", "$100", "$150", "$200", "$250", "$300", "$350"],
            columns: [
              { label: "Casual Swim", segs: [seg(30, "#3f5b00"), seg(20, "#999999"), seg(15, GREEN), seg(15, "#c9c9c9"), seg(60, "#d4ff7a")] },
              { label: "Professional Swim", segs: [seg(60, "#3f5b00"), seg(30, "#999999"), seg(15, GREEN), seg(20, "#c9c9c9"), seg(60, "#d4ff7a")] },
              { label: "Surf Equipment", segs: [seg(40, "#3f5b00"), seg(50, "#999999"), seg(70, GREEN), seg(40, "#e8e8e8"), seg(120, "#d4ff7a")] },
              { label: "Beach Attire", segs: [seg(35, "#3f5b00"), seg(20, "#999999"), seg(10, GREEN), seg(12, "#c9c9c9"), seg(36, "#d4ff7a")] },
              { label: "Resort Wear", segs: [seg(30, "#3f5b00"), seg(20, "#999999"), seg(30, GREEN), seg(10, "#c9c9c9"), seg(43, "#d4ff7a")] },
            ],
          },
        ],
        legend: [
          { name: "Materials", color: "#3f5b00" },
          { name: "Labor", color: "#999999" },
          { name: "Marketing", color: GREEN },
          { name: "Shipping", color: "#c9c9c9" },
          { name: "SG&A", color: "#d4ff7a" },
        ],
        legendPlacement: "bottom",
        barWidth: 70,
        segBorder: false,
      },
      {
        kind: "flow",
        title: "Other Information",
        titleStyle: "centered-bold",
        aspect: 1.3,
        nodes: [
          {
            shape: "text",
            x: 0.02,
            y: 0.5,
            align: "left",
            noWrap: true,
            size: 44,
            text: "•  Down Under’s offers free\n    shipping for Direct to\n    Customer sales due to\n    competitive pressures\n\n•  Down Under is opening a\n    new manufacturing and\n    distribution center and\n    consideration 3 sites:\n          -   Southern California\n          -   Mexico\n          -   Guatemala\n\n•  Five years ago, Down Under\n    relocated many of its\n    manufacturing facilities to\n    South Asia from Australia\n    boosting long term\n    profitability\n\n•  FY 2014 costs are\n    approximately the same as\n    FY 2013 costs",
          },
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Step 3: Brainstorming a solution",
    title: "Step 3: Brainstorming a solution",
    kind: "qa",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: [
          "Candidate should propose potential solutions to increase sales at Surf Shops. If the candidate does not switch to “solutioning,” then guide him/her with the following question:",
          "Thinking **about your own or a friend’s shopping experience**, how could the client increase sales?",
          "A good response would include the following considerations:",
        ],
        lines: [
          "Tailor to the customer experience instead of sales overall",
          "Acknowledge but not focus on other ways to increase sales (e.g., working with the vendor, product modification, etc.)",
          "Outline potential challenges, risk, or other considerations",
        ],
      },
      { paragraphs: ["**Note**: The candidate should prepare a structure or framework to organize brainstorming"] },
    ],
  },
  {
    n: "08",
    label: "Step 4: Brainstorming a solution",
    title: "Step 4: Brainstorming a solution",
    kind: "qa",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: [
          "At this stage, the candidate should **recap the case and deliver a fact-based recommendation** on the best course of action for Down Under.",
          "A good response will include the following:",
        ],
        steps: [
          { n: "1", text: "**Recap the case:** The team was engaged by Down Under to identify the reason why the company missed its earnings forecast" },
          { n: "2", text: "**Share Insights:** Down Under missed its earnings forecast as a result of lower than expected sales of Surf Equipment at Surf Shops. The new product launch into a tangential category proved challenging for Down Under." },
          {
            n: "3",
            text: "**Propose next steps identify risks:**",
            sub: [
              "Propose options to increase sales (e.g., introduce surf equipment into new channels, developed actionable steps to increase sales with surf shops, increase product consideration, etc.)",
              "Identify other considerations/challenges (lack of channel and consume awareness of product, movement away from core competencies, long term impact to brand)",
              "Provide mitigation strategies for risks proposed",
            ],
          },
        ],
      },
    ],
  },
];
