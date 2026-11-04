import type { CasePage } from "../content";

export const CASE_ID = "c98cfd67-1c5e-4d1c-8317-3cdbadf8a46e";

const PROMPT =
  "Our client is Munder-Difflin (M-D), a $6.6B business unit of a $25B paper manufacturer.  The business unit started out as a paper distributor to small and medium-sized companies and has grown in size by penetrating other market segments – janitorial supplies and packaging materials – through a number of acquisitions over its history.   It distributes the products of both the parent company and some of the parent company’s competitors.\n\nM-D currently has a network of 100 distribution centers that carry variations of the company’s portfolio of products. In addition to the distribution centers, M-D has over 120 “will call” locations where customers can walk-in to pick up smaller sized orders. Its main customers are small-mid sized printers, industrial manufacturers, building service contractors (companies that are in charge of cleaning and maintenance of large commercial buildings), and large national retailers.\n\nIn 2009, M-D saw revenue drop from $8B to $6.5B and earnings from $150M to $50M. M-D’s performance fell far below expectations, operating below the parent company’s cost of capital of 8.3%. M-D will need to develop a plan that significantly improves business performance by addressing both strategic (customers, products, channels, profitability) and operational (sourcing, warehouse/network) issues. How can M-D reverse this revenue and earnings decline and become competitive?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A paper, janitorial and packaging distributor has seen revenue and earnings fall below its parent’s cost of capital. Diagnose the decline, set a strategy for each product line and evaluate three new growth options.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "distribution", "exhibit-heavy", "growth-strategy"],
};

const RED = "#b01c1c";
const DARK = "#4d4d53";
const INK = "#3a3f3b";
const LINE = "#c9c9c9";
type Al = "left" | "center" | "right";
const H = (v: string, align: Al = "center", bg: string | null = RED) => ({ v, align, bg: bg ?? undefined, fg: bg ? "#ffffff" : "#111111" });
const C = (v: string, align: Al = "center", w = 400, bg?: string) => ({ v, align, w, fg: INK, bg, borders: "b", borderColor: LINE });
const BUL = (v: string) => ({ cells: [{ v: "▪ " + v, align: "left" as Al, w: 400, fg: INK }] });

const SL = ["#8499cc", "#7fcdcb", "#009999", "#003399", "#6666ff", "#4d4d53"];

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
        steps: [
          { n: "1", text: "What are some key areas you would explore in order to understand M-D’s decline in revenue and profitability?" },
          { n: "2", text: "Data sheet #1 shows a breakdown of revenue and OpEx for M-D. What is your assessment of its financial and operational performance?" },
          { n: "3", text: "Data sheet #2 shows a breakdown of client product mix and profitability as well as market segment information (size, growth rate and competitive landscape).  Using this in conjunction with the information provided in data sheet #1, provide your strategic recommendations for each product line." },
          { n: "4", text: "M-D’s President would like to grow earnings by $250M over the next 5 years.  She believes that she can only get an additional $100M in earnings from the company’s core segments and would like you to evaluate three “white space” growth options.  Review data sheet #3 and provide your recommendations as to which, if any, growth options M-D should pursue?" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "What are some key areas you would explore in order to understand M-D’s decline in revenue and profitability?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: ["**A good answer** will be well-structured and demonstrate a clear understanding of the profitability equation, its components, and be able to walk through the critical P&L items, including:"],
        lines: [
          "Volume (geography, segments, retailers, etc.)",
          "Prices",
          "COGS",
          "Logistics costs (warehousing, inventory, shipping)",
          "Commissions",
          "Customer service",
          "Other SG&A expenses",
        ],
      },
      {
        paragraphs: ["**A great answer** will incorporate the above items, but also address items such as:"],
        lines: [
          "Customer mix, frequency of visits, changes in buyer segments",
          "Product mix, substitution with lower margin items (e.g., private label entrants)",
          "Competitive benchmarking to better understand how the client’s revenue and cost figures compare to competitors",
          "Industry averages and trends",
          "Changes in the competitive landscape (e.g., competitive standing, new entrants)",
          "Macro trends (i.e., changes in the global market)",
          "Economic shifts (i.e., changes in price elasticity)",
          "External factors or shocks that have impacted variable costs",
          "R&D productivity",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2 · Exhibit 1",
    kind: "qa",
    qText: "Data sheet #1 shows a breakdown of revenue and OpEx for M-D. What is your assessment of its financial and operational performance?",
    infoBoxLabel: "Approach / Analysis [Provide Exhibit 1]",
    infoSections: [
      {
        paragraphs: ["**A good answer** will be well-structured and demonstrate a clear understanding of the critical P&L/Balance sheet items, including:"],
      },
      {
        label: "M-D Financials:",
        lines: [
          "Step change in revenue in 2008",
          "Higher trend in OpEx (as a % of sales) and lower earnings trends over the past few years",
          "COGS comprise the lion’s share of spend",
          "Inventory represents the lion’s share of working capital",
          "  WC = CA - CL = Inv + A/R - A/P = 600 + 100 - 400 = 300",
          "M-D not meeting its cost of capital (8.3%)",
          "  ROS = $100 EBIT / $6600 Rev = 1.5%",
          "  ROIC = $100 EBIT / $1300 Total Assets = 7.7%",
        ],
      },
      {
        label: "Competitive Positioning / Benchmarking:",
        lines: [
          "M-D’s COGS as a percentage of sales are in the bottom 25th percentile range",
          "  M-D operating at 83.3%",
          "M-D’s logistics cost as a percentage of sales  are in the bottom 25th percentile range",
          "  M-D operating at 9.1%",
          "M-D’s commission and customer service  costs as a percentage of sales  are in the 50th to 75th percentile range",
          "  M-D operating at 3.5% and 1.8%",
          "M-D’s inventory turns are close to the 25th percentile range",
          "  M-D operating at 9.2 turns (COGS/Inventory)",
        ],
      },
      {
        paragraphs: ["**A great answer** will synthesize the above items, and highlight the key areas to prioritize for improvement:"],
        groups: [
          {
            heading: "M-D has significant opportunities in Planning, Procurement and Distribution",
            items: [
              "**Planning:**  If M-D can reduce inventory by $100M, it would increase turns by 2 points (meeting the industry median) and generate an ROIC equal to their cost of capital. The client could conduct  an inventory segmentation exercise to determine turns by category, rationalize the set of SKUs and write off obsolete inventory.",
              "**Procurement:**  M-D stands to gain $150M in savings by meeting industry average levels of COGS.  The client could assess and address vendor and SKU proliferation by consolidating spend with major suppliers on the major SKUs",
              "**Distribution:**  M-D could gain up to $70M by meeting industry averages for logistics spend.",
              "  Benchmark their transportation rates to determine cost efficiency.  They should try to consolidate their freight spend with a few major or regional carriers",
              "  Conduct an insource vs. outsource study to determine if it makes sense to operate a private fleet (critical to understand service level implications here)",
              "  Conduct a distribution network analysis to optimize its physical footprint (distribution centers, cross-docks, lanes)",
            ],
          },
        ],
      },
    ],
    dataTableTitle: "Financial History",
    dataTableTitleRules: RED,
    dataTableCols: "1.4fr 1fr 1fr 1fr",
    dataTableHeaders: [H("", "left", null), H("2008"), H("2009"), H("2010")],
    dataTableRows: [
      { cells: [C("Revenue ($B)", "left", 700), C("$8"), C("$6.5"), C("$6.6")] },
      { cells: [C("COGS ($B)", "left", 700), C("$6.8"), C("$5.5"), C("$5.5")] },
      { cells: [C("OpEx ($B)", "left", 700), C("$1.05"), C("$0.95"), C("$1B")] },
    ],
    dataTableMore: [
      {
        title: "Balance Sheet 2010 ($M)",
        footnote: "Weighted avg. cost of capital = 8.3%",
        cols: "1.3fr 0.8fr 1.4fr 0.8fr",
        headers: [H("Assets", "left", null), H("", "right", null), H("Liabilities & Equity", "left", null), H("", "right", null)],
        rows: [
          { cells: [C("A/R", "left"), C("$100", "right"), C("A/P", "left"), C("$400", "right")] },
          { cells: [C("PP&E", "left"), C("$600", "right"), C("LT liabilities", "left"), C("$350", "right")] },
          { cells: [C("Inventory", "left"), C("$600", "right"), C("Total Liab.", "left"), C("$750", "right")] },
          { cells: [C("", "left"), C("", "right"), C("Total Equity", "left"), C("$550", "right")] },
          { cells: [C("Total Assets", "left", 700), C("$1,300", "right", 700), C("Total L&E", "left", 700), C("$1,300", "right", 700)] },
        ],
      },
      {
        title: "Industry Benchmarking Data",
        cols: "2.2fr 1fr 1fr 1fr",
        headers: [H("", "left", null), { v: "Percentile Ranges", align: "center", fg: "#111111", span: 3 }],
        rows: [
          {
            cells: [
              C("", "left"),
              { ...C("Top 25th", "center", 700, RED), fg: "#ffffff" },
              { ...C("50th", "center", 700, RED), fg: "#ffffff" },
              { ...C("Bottom 25th", "center", 700, RED), fg: "#ffffff" },
            ],
          },
          { cells: [C("COGS as a % of Sales", "right"), C("78%"), C("81%"), C("83%")] },
          { cells: [C("Logistics  cost as a % of Sales", "right"), C("7%"), C("8%"), C("9%")] },
          { cells: [C("Commission cost as a % of Sales", "right"), C("3%"), C("4%"), C("5%")] },
          { cells: [C("Cust Service cost as a % of Sales", "right"), C("1.0%"), C("2.0%"), C("3.5%")] },
          { cells: [C("Office/Admin cost % of sales", "right"), C("0.5%"), C("1.5%"), C("2.0%")] },
          { cells: [C("Inventory Turns", "right"), C("12.5"), C("11.0"), C("9.0")] },
        ],
      },
    ],
    extraCharts: [
      {
        kind: "combo",
        title: "P&L Summary 2010 ($MM)",
        titleBold: true,
        titleAlign: "center",
        serif: true,
        yMax: 7000,
        yStep: 1000,
        yTickLabels: ["$0", "$1,000", "$2,000", "$3,000", "$4,000", "$5,000", "$6,000", "$7,000"],
        yGrid: true,
        axisStyle: "none",
        legend: "none",
        plotAspect: 0.4,
        categories: ["Revenue", "COGS", "Logistics", "Comissions", "Customer\nService", "Office /\nAdmin", "EBIT"],
        xTitle: "Operating Expenses",
        bars: {
          name: "P&L",
          color: "#bfbfbf",
          colors: [DARK, "#bfbfbf", "#bfbfbf", "#bfbfbf", "#bfbfbf", "#bfbfbf", "#bfbfbf"],
          values: [6600, 5500, 600, 230, 120, 50, 100],
          bases: [0, 1100, 500, 270, 150, 100, 0],
          widthRatio: 0.55,
        },
        texts: [
          { text: "$6,600", x: 0, y: 5900, color: "#ffffff", bold: true, anchor: "middle" },
          { text: "$5,500", x: 1, y: 5500, color: "#ffffff", bold: true, anchor: "middle" },
          { text: "$600", x: 2, y: 1300, bold: true, anchor: "middle" },
          { text: "$230", x: 3, y: 700, bold: true, anchor: "middle" },
          { text: "$120", x: 4, y: 450, bold: true, anchor: "middle" },
          { text: "$50", x: 5, y: 330, bold: true, anchor: "middle" },
          { text: "$100", x: 6, y: 330, bold: true, anchor: "middle" },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3 · Exhibit 2",
    kind: "qa",
    qText:
      "Data sheet #2 shows a breakdown of client product mix and profitability for M-D as well as market segment information (size, growth rate and competitive landscape).  Using this in conjunction with the information provided in data sheet #1, provide your strategic recommendations for each product line.",
    infoBoxLabel: "Approach / Analysis [Provide Exhibit 2]",
    infoSections: [
      {
        paragraphs: ["**A good answer** will address some of the following items and **a great answer** will address most of the following items:"],
      },
      {
        label: "Paper:",
        lines: [
          "M-D should look to maintain its market leading share in this declining market, (-2% CAGR), however it should curtail any investments in growing this product line as it is less profitable than other product lines and the market is declining while other markets are growing",
          "Paper contributed 75% of M-D’s revenue but only 50% of its profits",
          "M-D’s EBIT % is half of the industry average (1% vs. 2%) and they should determine why this is the case.  They can do so by evaluating factors such as:",
          "  Does M-D have higher COGS than competitors, if so they should examine supplier relationships  (mainly their purchases from the parent company) and leverage their size to command better pricing?  Are they selling Paper at prices below market average? Are there significant differences in the operating structure (i.e., more overhead, more reps / account, more trucks)?",
          "  Are all of M-D’s Paper customers profitable?  There is a chance that M-D’s Paper profitability is being dragged down by unprofitable customers.  They should consider options to either make these accounts profitable or not retain them.",
        ],
      },
      {
        label: "Janitorial Supplies:",
        lines: [
          "M-D should look to invest in and grow its position by making selected investments in this product line as it is growing faster and is more profitable than its core Paper product line",
          "This market is highly fragmented, with no one company having >8% market share, and M-D has the 3rd highest market share with 4%. M-D could look to increase its presence in this market through **acquisitions in addition to organic growth**",
          "Janitorial Supplies accounted for only 15% of M-D’s revenue but represented 25% of its profits",
          "M-D’s EBIT % is below the industry average (2.5% vs. 3.5%) and they should determine why this is the case.  They can do so by evaluating factors such as:",
          "  Are there any significant differences between M-D and their Janitorial Supplies competitors? Does M-D have higher COGS than competitors or are they selling Janitorial Supplies products at prices below market average? Are there significant differences in the operating structure (i.e., more overhead, more reps / account, more trucks)?",
          "  Are all of M-D’s Janitorial Supplies customers profitable?  There is a chance that M-D’s Janitorial Supplies profitability is being dragged down by unprofitable customers.  They should consider options to either make these accounts profitable or not retain them.",
        ],
      },
      {
        label: "Packaging:",
        lines: [
          "M-D should look to aggressively invest in growing its position in this product line as it is the most profitable and fastest growing market",
          "This market is relatively fragmented, with the top company having 15% of the market share and no other company having >8% market share, M-D has the 4th highest market share with 3%",
          "Packaging accounted for only 10% of M-D’s revenue but represented ~25% of its profits",
          "There are several ways M-D can look to aggressively invest in and expand Packaging market share:",
          "  Pursue organic growth by hiring more sales reps, run promotional campaigns, increase their marketing / advertising spend in this product line, enter new geographic markets where Packaging is growing but they do not have a significant share etc.",
          "  Acquire a competitor or pursue a joint venture.  When making an acquisition M-D will have to consider many options such as the NPV of the deal, strategic fit of the company they are acquiring etc.",
        ],
      },
      {
        label: "Other Considerations:",
        lines: [
          "The recommendations outlined above would result in a considerable shift in M-D’s product mix. While pursuing them, M-D will need to evaluate whether their existing organizational and operational structure may need to change to more efficiently and profitably serve the new product and customer mix",
        ],
      },
    ],
    dataTableTitle: "Client Product Mix",
    dataTableTitleRules: RED,
    dataTableCols: "1.3fr 1fr 1fr 1fr",
    dataTableHeaders: [H("", "left", null), H("Paper"), H("Janitorial Supplies"), H("Packaging")],
    dataTableRows: [
      { cells: [C("% of Portfolio (2010)", "right", 700), C("75%"), C("15%"), C("10%")] },
      { cells: [C("% of Portfolio (2008)", "right", 700), C("85%"), C("10%"), C("5%")] },
      { cells: [C("2010 EBIT (%)", "right", 700), C("1%"), C("2.5%"), C("4%")] },
    ],
    dataTableMore: [
      {
        title: "Market Information by Segment",
        cols: "1.3fr 1fr 1fr 1fr",
        headers: [H("", "left", null), H("Paper"), H("Janitorial Supplies"), H("Packaging")],
        rows: [
          { cells: [C("Market Size ($B)", "right", 700), C("$25"), C("$25"), C("$20")] },
          { cells: [C("Market EBIT (%)", "right", 700), C("2%"), C("3.5%"), C("4%")] },
          { cells: [C("Market 5-YR CAGR", "right", 700), { ...C("-2%"), fg: "#ff0000" }, C("6%"), C("8%")] },
        ],
      },
    ],
    extraCharts: [
      {
        kind: "multiPie",
        title: "Competitive Landscape (Market Share Breakdown)",
        outsideLabels: true,
        radius: 72,
        noRowDivider: true,
        pies: [
          {
            title: "Paper",
            slices: [
              { label: "M-D", value: 20, color: SL[0], text: "20%" },
              { label: "Company B", value: 15, color: SL[1], text: "15%" },
              { label: "Company C", value: 10, color: SL[2], text: "10%" },
              { label: "Company D", value: 8, color: SL[3], text: "8%" },
              { label: "Company E", value: 5, color: SL[4], text: "5%" },
              { label: "Other", value: 42, color: SL[5], text: "42%" },
            ],
          },
          {
            title: "Janitorial Supplies",
            slices: [
              { label: "Company A", value: 8, color: SL[0], text: "8%" },
              { label: "Company B", value: 5, color: SL[1], text: "5%" },
              { label: "M-D", value: 4, color: SL[2], text: "4%" },
              { label: "Company D", value: 4, color: SL[3], text: "4%" },
              { label: "Company E", value: 4, color: SL[4], text: "4%" },
              { label: "Other", value: 75, color: SL[5], text: "75%" },
            ],
          },
          {
            title: "Packaging",
            slices: [
              { label: "Company A", value: 15, color: SL[0], text: "15%" },
              { label: "Company B", value: 8, color: SL[1], text: "8%" },
              { label: "Company C", value: 4, color: SL[2], text: "4%" },
              { label: "M-D", value: 3, color: SL[3], text: "3%" },
              { label: "Company E", value: 2, color: SL[4], text: "2%" },
              { label: "Other", value: 68, color: SL[5], text: "68%" },
            ],
          },
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4 · Exhibit 3",
    kind: "qa",
    qText:
      "M-D’s President would like to grow earnings by $250M over the next 5 years.  She believes that she can only get an additional $100M in earnings from the company’s core segments and would like you to evaluate three “white space” growth options.  Review data sheet #3 and provide your recommendations as to which, if any, growth options M-D should pursue?",
    infoBoxLabel: "Approach / Analysis [Provide Exhibit 3]",
    infoSections: [
      {
        paragraphs: ["**A good answer** will be well-structured and include points such as:"],
        groups: [
          {
            heading: "M-D should pursue Growth Option #3",
            items: [
              "Large, growing and profitable market – can reach President’s goal by gaining  ~10% market share",
              "In line with strategy to grow Packaging and Janitorial Supplies businesses",
              "Already play in these product markets, growth option is a “channel”  /  “value chain” play and will require investment in the development of  eCommerce and catalog capabilities",
              "Will need to ensure that since it is a downstream industry, you do not upset your current customers",
            ],
          },
        ],
      },
      {
        paragraphs: ["**A great answer** will incorporate the above items, but also address the following items:"],
        groups: [
          {
            heading: "M-D should pursue both Growth Option #3 and Growth Option #2",
            items: [
              "Growth Option #2 is very profitable and  can leverage existing customer base and offer ancillary recycling services",
              "Cannot pursue just Growth Option #2 because  it will not meet the President’s goals of $250M in additional earnings because a 100% market share  would only result in $100M in earnings",
            ],
          },
          {
            heading: "M-D should definitely not pursue Growth Option #1",
            items: [
              "Growth Option #1 is in a market (prescription pharmaceuticals) that is highly regulated and already has 3 main players, little / no overlap with current products / customers and therefore very low likelihood of success and low profit margins",
            ],
          },
        ],
      },
    ],
    exhibitTitle: "Growth Options",
    dataTableTitleRules: RED,
    dataTableTitle: "Growth Option # 1:",
    dataTableCols: "1fr",
    dataTableHeaders: [],
    dataTableRows: [
      BUL("M-D is considering entering into the distribution of prescription pharmaceuticals"),
      BUL("The distribution of prescription pharmaceuticals is a $200B+ industry and is expected to grow at 4% CAGR over the next 5 years as the US population ages"),
      BUL("Average profit margins for the industry are ~3%"),
      BUL("The industry is dominated by 3 companies (Canary, Marco and Astro), which combined have a >90% share of the market"),
      BUL("The downstream industries are primarily Hospitals, Nursing Homes, Clinics and Pharmacies"),
    ],
    dataTableMore: [
      {
        title: "Growth Option # 2:",
        cols: "1fr",
        headers: [],
        rows: [
          BUL("M-D is considering entering into the collection of recyclable material (primarily paper and cardboard boxes) for SMBs"),
          BUL("Large businesses have well-established recycling programs in place with their traditional waste management companies, however the majority of small – mid sized businesses do not currently have clearly defined recycling programs"),
          BUL("This industry is currently $500M  and is expected to grow at 10% CAGR over the next 5 years as consumers place an increasing importance on “eco-friendliness”"),
          BUL("Average profit margins for the industry are ~20%"),
          BUL("The industry is extremely fragmented, with no one company having greater than 5% market share"),
          BUL("Many of M-D’s competitors are also considering entering this industry, however no direct competitors have entered as of yet"),
        ],
      },
      {
        title: "Growth Option # 3:",
        cols: "1fr",
        headers: [],
        rows: [
          BUL("M-D is considering entering into the market for  the sale of Packaging and Janitorial Supplies orders under $1000"),
          BUL("This industry is primarily composed of sales to very small businesses and directly to end-consumers through catalogs and eCommerce platforms"),
          BUL("This is currently a $15B industry  (not included in the previously shown Packaging and Janitorial Supplies distribution  industry figures as this is primarily a downstream industry) and is expected to grow at 8% CAGR over the next 5 years"),
          BUL("Average profit margins for the industry  are ~10%"),
          BUL("The industry is extremely fragmented, with no one company having greater than 5% market share"),
        ],
      },
    ],
  },
];
