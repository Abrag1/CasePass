import type { CasePage } from "../content";

export const CASE_ID = "fdf780cd-c63f-4e74-b033-57728025b33f";

export const CASE_META = {
  review: "auto",
  case_type: "Mergers and Acquisitions",
  synopsis:
    "A multinational women's clothing retailer is deciding whether to sell or hold an underperforming casual wear brand. Project revenues from a data sheet, value both options with deal multiples and test the cash-flow breakeven.",
  full_prompt:
    "Deloitte has been asked to help the client, Coffee, evaluate a hold or sell decision. Coffee is a large multinational women's clothing retailer with worldwide revenues of over $3B in 2016. They sell sports, formal and casual apparel. The company as a whole has been performing strongly and has emerged out of the financial crisis with strong sales growth and many investment opportunities. Despite the company's strong performance overall, its American operation has an underperforming brand that they have put up for review. The firm has also closed some of the brand's associated stores.",
  tags: ["interviewer-led", "m-and-a", "valuation", "heavy-math", "exhibit-heavy"],
};

const cell = (v: string, i: number) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const), w: i === 0 ? 600 : 400, fg: "#1f2421" });
const rowsOf = (rows: string[][]) => rows.map((r) => ({ cells: r.map(cell) }));
const heads = (hs: string[]) => hs.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Deloitte has been asked to help the client, Coffee, evaluate a hold or sell decision. Coffee is a large multinational women's clothing retailer with worldwide revenues of over $3B in 2016. They sell sports, formal and casual apparel. The company as a whole has been performing strongly and has emerged out of the financial crisis with strong sales growth and many investment opportunities. Despite the company's strong performance overall, its American operation has an underperforming brand that they have put up for review. The firm has also closed some of the brand's associated stores.\n\nThe American operation has two major brands: a formal wear brand bearing the same name as the company, “Coffee,” and a casual wear brand named “Tea.” The brands are sold through the following channels:\n• Coffee branded retail stores: $200M in annual revenues\n• Tea branded retail stores: $20M in annual revenues\n• Coffee branded outlet stores: $150M in annual revenues\n• Wholesale sales to major retail chains (e.g., Macy's): $600M in annual revenues\n\nThe Tea brand has historically been neglected because management has focused its resources on the core business – the Coffee brand. Nonetheless, the Tea brand has consistently put up a profit with minimal management attention and capital reinvestment. Essentially, Coffee wishes to understand whether they are better served by divesting the Tea brand and refocusing their attention on their core Coffee brand business or holding the Tea business and simply “milking the cash cow.”",
    note: "**Fit Questions** — 1. What has been your most significant professional accomplishment? 2. Tell me about a weakness.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "There are several questions which will be outlined in this case. You should **provide** the below information as background and **distribute** a copy of the data sheet on the next page for the candidate’s reference throughout the case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Background discussion" },
          { n: "2", text: "Data sheet discussion" },
          { n: "3", text: "Questions 1-5" },
          { n: "4", text: "Recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Data Sheet",
    title: "Data Sheet",
    kind: "qa",
    dataTableIntro: [
      "Management has decided that the terms of the sale will be as follows:",
      "  Sale of Tea brand will include only Tea’s branded product sales in Tea’s retail channel and Tea’s wholesale business",
      "  Buyer will not have access to Coffee’s Outlet stores or Coffee branded retail stores for distribution",
    ],
    dataTableTitle: "Brand vs. Channel Sales CY2016",
    dataTableCols: "1.5fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: heads(["($M)", "Coffee branded retail stores", "Tea branded retail stores", "Coffee branded outlets", "Wholesale"]),
    dataTableRows: rowsOf([
      ["Coffee Brand products", "180", "10", "120", "540"],
      ["Tea Brand products", "20", "10", "30", "60"],
    ]),
    dataTableFootnote: "Note: Sales in the Wholesale channel are expected to remain unchanged in CY2017",
    dataTableMore: [
      {
        title: "Number of Retail Stores",
        cols: "1.5fr 1fr 1fr 1fr",
        headers: heads(["", "Start of 2015", "Start of 2016", "Start of 2017"]),
        rows: rowsOf([
          ["Coffee branded stores", "100", "125", "150"],
          ["Tea branded stores", "45", "32", "20"],
        ]),
        footnote: "Note: All store closings and openings occur at the start of the calendar year. Number of outlet stores remains constant",
      },
      {
        title: "Revenue Multiples: Consumer Product Transactions in the U.S.",
        cols: "1.5fr 1fr 1fr 1fr",
        headers: heads(["", "Revenue multiple", "Deal size ($M)", "Deal date"]),
        rows: rowsOf([
          ["Transaction A", "0.6", "147", "January 2016"],
          ["Transaction B", "0.7", "300", "March 2016"],
          ["Transaction C", "0.9", "180", "April 2015"],
          ["Transaction D", "0.6", "70", "October 2015"],
          ["Transaction E", "1.9", "5", "November 2012"],
        ]),
      },
      {
        title: "Tea Brand Business Historical Performance",
        cols: "1.5fr 1fr 1fr 1fr",
        headers: heads(["(% of sales)", "2014", "2015", "2016"]),
        rows: rowsOf([
          ["Revenues", "100%", "100%", "100%"],
          ["Gross Profit", "23%", "23%", "22%"],
          ["EBIT", "12%", "11%", "10%"],
          ["SG&A", "5%", "6%", "6%"],
          ["COGS", "77%", "77%", "78%"],
        ]),
        footnote: "Note: Contains all sales of Tea Brand Products",
      },
    ],
  },
  {
    n: "03",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** Coffee should hold the Tea brand. The following considerations will be used to test whether this hypothesis holds true.",
        ],
      },
      {
        label: "Market",
        groups: [
          { heading: "Channels: retail, outlet, wholesale", items: [] },
          { heading: "Customer preference: coffee v. tea", items: [] },
          { heading: "Competitor response", items: ["Ability to remain competitive if only in coffee market"] },
        ],
      },
      {
        label: "Projected Revenues",
        groups: [
          {
            heading: "Holding Tea:",
            items: [
              "By channel for Coffee & Tea products",
              "# Stores by channel",
              "Breakeven (if hold, when is cash flow equivalent to sale of Tea?)",
            ],
          },
          {
            heading: "Divesting Tea",
            items: [
              "Projected valuation",
              "Premium on purchase for buyer (own synergies, ability to fill Tea stores with their own products)",
              "  Buyer may view scenario differently and want to negotiate purchase price",
              "Ability to fill Coffee stores with higher revenue products than from Tea",
            ],
          },
        ],
      },
      {
        label: "Risks",
        groups: [
          { heading: "Holding Tea: may no longer be ‘cash cow’ over time", items: [] },
          {
            heading: "Loss of diversification / synergies from divestiture",
            items: [
              "Impact on Coffee brand loyalty over time",
              "Potential sourcing issues if reliant only on international suppliers for raw material",
            ],
          },
          { heading: "Tariffs on coffee / tea apparel imports and associated revenue impact", items: [] },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Strong candidates should **focus on revenue generation** for the two options (holding Tea or divesting), but they should not forget to look into other success metrics such as:",
      "  Customer perception and loyalty",
      "  Brand development",
      "  Benefits from holding / selling Tea",
      "  Risks associated with holding / selling Tea",
    ],
  },
  {
    n: "04",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "**Provide** the below questions to the candidate:\n\n**Question #1A:**\nUsing the terms of the sale from the data sheet, find the associated revenues for 2017 that the buyer would receive from buying Tea?\n\n**Question #1B:**\nUsing the terms of the sale from the data sheet, find the associated 2017 revenue that Coffee could maintain by not selling Tea?",
    guidancePreLabel: "Question #1A",
    guidancePreLines: ["Interviewer can **mention** that the terms of the sale are available on the data sheet given their importance."],
    infoBoxLabel: "Calculations / Insights",
    infoSections: [
      {
        label: "Question #1A:",
        paragraphs: ["Candidate should do the following:"],
        steps: [
          { n: "1", text: "Isolate the revenues of the part of the business being put up for sale (Tea’s retail + Tea’s wholesale)." },
          { n: "2", text: "Project Tea’s retail revenues by using proportional change of stores from 2016 to 2017." },
          { n: "3", text: "Tea’s wholesale revenues will not change from 2016 to 2017." },
        ],
      },
      {
        label: "Question #1B:",
        paragraphs: ["Candidate should do a similar analysis as below:"],
      },
    ],
    calcTable: {
      title: "Question #1A",
      headers: ["Revenue ($M)", "Coffee branded retail stores", "Tea branded retail stores", "Coffee branded outlets", "Wholesale"],
      rows: [
        ["Coffee Brand products", "180", "10", "120", "540"],
        ["Tea Brand products", "20", "10", "30", "60"],
        ["Fraction of 2016 stores in 2017", "-", "20/32 = 0.625", "-", "1 (no change)"],
        ["2017 revenues", "", "10*0.625 = 6.25", "", "60"],
      ],
    },
    calcTables: [
      {
        title: "Question #1B",
        headers: ["Revenue ($M)", "Coffee branded retail stores", "Tea branded retail stores", "Coffee branded outlets", "Wholesale"],
        rows: [
          ["Coffee Brand products", "180", "10", "120", "540"],
          ["Tea Brand products", "20", "10", "30", "60"],
          ["Fraction of 2016 stores in 2017", "150/125 = 1.2", "20/32 = 0.625", "1", "1 (no change)"],
          ["2017 revenues", "1.2*20 = 24", "10*0.625 = 6.25", "30", "60"],
        ],
      },
    ],
    answerText:
      "Total Revenues = ==$66.25M== (see Q 1A above) + ==$24M== (1.2 * $20M from Coffee retail) + ==$30M== (from Coffee outlet) = ==$120.25M==",
  },
  {
    n: "05",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "How would you value the sale scenario and hold scenario? Please use available data to support your argument.",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**Push** the candidate to perform the below steps:",
      "  1. Take revenues calculated from previous question.",
      "  2. Refine revenue multiple to adjust for outliers and dated information.",
      "  3. Apply revenue multiples to value the two scenarios.",
    ],
    infoBoxLabel: "Potential Response",
    infoSections: [
      { paragraphs: ["Candidate should determine a revenue multiple from the data sheet."] },
      {
        label: "Good Answer:",
        paragraphs: ["Average of all deal multiples is ==~0.9==."],
        lines: ["Sale = $66.25M * 0.9 = ==~$60M==", "Hold = $120.25M * 0.9 = ==~$108M=="],
      },
      {
        label: "Better Answer:",
        paragraphs: [
          "Remove Transaction E as it is dated and reflects inflated pre-crash asset prices. Doing this yields an average deal multiple of ==~0.7==.",
        ],
        lines: ["Sale = $66.25M * 0.7 = ==~$46M==", "Hold = $120.25M x*0.7 = ==~$84M=="],
      },
      { label: "Additional Thoughts in a Great Answer:" },
      {
        label: "Sell Scenario:",
        lines: [
          "Buyer may have existing channels that can satisfy the demand; or buyer can build channels from scratch.",
          "Buyer is also purchasing the remaining store leases as part of its purchase price, so ability to fill up space in Tea stores currently filled by Coffee branded products may also attract a slight premium.",
          "Coffee’s ability to replace the lost revenue streams associated with the sale will improve the attractiveness of the sell scenario but should be wary of the buyer seeking a discount for having to replace the lost revenue where Coffee products were sold.",
          "The buyer can capture some of the existing demand for the Tea brand currently satisfied through Coffee branded retail stores and Coffee branded outlets (i.e., a portion of each of the $20M and the $30M.",
        ],
      },
      {
        label: "Hold Scenario:",
        lines: [
          "Candidate can compare Coffee’s return on investment to Tea’s to determine if there is any merit in investing money into Tea to turn it around.",
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "If Coffee decides to hold the Tea brand, how long will it take for the cash flow from Tea to equal the amount of money that Coffee would have received through selling Tea?",
    guidancePreLabel: "Question 3",
    guidancePreLines: [
      "Note: Candidate should use ==$50M== as the sales price in the calculation, ignore time value of money.",
      "**If asked**, tell the candidate to assume no depreciation / amortization or changes in working capital. (So, we would make cash flow equal to EBIT minus taxes.)",
    ],
    infoBoxLabel: "Response to Question 3",
    infoSections: [
      {
        label: "Good Answer:",
        paragraphs: [
          "Using $120.25M of revenue from question 1B, candidate can use the 10% EBIT margin to get close to cash flow.",
          "10% * 120.25M = ==~$12M per year==",
          "Therefore, breakeven = $50M/$12M or ==~4 years==.",
        ],
      },
      {
        label: "Better Answer:",
        lines: [
          "Candidate should realize that EBIT is not the true cash flow and should take taxes out.",
          "Assuming 40% tax rate, net earnings % would be 6% (10% * 0.6).",
          "  6% * 120.25 = ==$7.2M per year==",
        ],
      },
      { paragraphs: ["Therefore, breakeven = $50M/$7.2M or about ==7 years==."] },
    ],
  },
  {
    n: "07",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "Based on your analysis, what would you recommend Coffee do?",
    infoBoxLabel: "Response to Question 4",
    infoSections: [
      {
        lines: [
          "The candidate should compare the value of the sale scenario (~$46M) to the hold scenario (~84M) – refer to Question 2.",
          "Based on the analysis, the conclusion should be to **hold onto the Tea brand**. The candidate should at minimum recommend that Coffee pursue the scenario with the higher valuation.",
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "If candidate chooses to hold Tea, the candidate should mention:",
        lines: [
          "Hold value to Coffee exceeds the sell case",
          "There may be an opportunity to improve the performance of Tea that may require extra investment:  open more Tea retail stores, enterprise cost reduction program, take brand international, take brand to a broader range of potential wholesale clients (e.g. independent retailers)",
        ],
      },
      {
        label: "If candidate chooses to sell Tea, the candidate should mention:",
        lines: [
          "Some revenue streams from Tea branded goods are likely to be readily replaced by Coffee’s operations",
          "Allows Coffee to gain as much as possible for the Tea retail business before it loses more value",
          "Mention the fact that as long as the trend continues to close the Tea stores, the valuation for Tea may go down",
        ],
      },
      { label: "Risks and Next Steps" },
      {
        label: "Hold:",
        lines: [
          "Risks",
          "  Holding Tea could allow the retail business to continue to leak value. The combined effects of store closures and steady decline in EBIT margin (12% in 2014 to 10% in 2016) has resulted in a significant reduction in Tea’s retail profits. The bulk of Tea’s value increasingly lies with the wholesale business.",
          "Next Steps",
          "  Coffee needs to assess whether this declining trend in the Tea retail outlets will continue and determine if that is potentially harmful to the overall business.",
        ],
      },
      {
        label: "Sell:",
        lines: [
          "Risks",
          "  Loss of opportunity related to the hold scenario revenues",
          "  Buyer may try to negotiate a discount for having to replace lost revenue for where Coffee products were sold",
          "Next Steps",
          "  Determine extra investment needed to hold and improve Tea and determine if there is any scenario where the hold value of Coffee still exceeds the sell case including additional investment",
          "  Determine sell terms suitable for Coffee that do not include discounting the sale value of Tea",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Arguments can be made to substantiate either sell or hold, but make sure that **reasons are given** for what the candidate chooses.",
      "A good answer will be logically structured to address various business considerations including:",
      "**Overall business strategy for women's apparel:** Does Tea’s brand, product mix, and styling fit within the overall strategy of Coffee’s vision? This is potentially an overriding factor in the decision to buy or hold the business.",
      "**Ability to Change:** In a hold scenario, does Coffee have the appetite to fully implement the changes required to halt the slide of Tea?",
      "**Impact to Remaining Revenue Streams:** Candidate should explore the impact that a divested business unit will have on the portions of the business that remain.",
      "**Potential Buyers:** Who are the prospective buyers for the business, and what are the potential issues with making a deal with each one?",
      "  Private Equity: Potential carve out experience, but unlikely to overpay for asset. If they do not have other similar businesses in their portfolio, will need to set up their own back office functions.",
      "  Strategic buyer: May take brand up or down market; an existing retail buyer may want to close the rest of the Tea retail stores; lack of back office will make it difficult for some buyers to do a “bolt-on” business.",
      "**Transaction Costs:** Banker costs and potential loss of management focus on the core business during deal will make sale scenario less attractive.",
      "**Stranded Costs:** There may be services across the two brands that are shared and may be stranded upon sale.",
    ],
  },
];
