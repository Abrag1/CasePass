import type { CasePage } from "../content";

export const CASE_ID = "5f694555-447d-4a6e-8a1f-a8c851ab776b";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A premium consumer products company is considering a strategy for the fast-growing low income segment. Read product-category data, calculate share gaps and incremental revenue, then brainstorm tactics and risks.",
  full_prompt:
    "Our client is a large, multinational consumer products company with business in over 200 countries. Today, we are going to focus on its US business. It has been following US demographic trends and has found that low income households have been growing 2X (twice) as quickly as other consumer segments. Low income is defined as families with income at the poverty level or below.\n\nOur client has always had a premium product strategy. It sells its products in grocery stores, convenience stores, mass retailers, etc., but its products are always priced at the high-end of their respective categories. It has never targeted the low income segment before and doesn't have a strategy to do so, but, given the growth of this segment, our client is considering entering the low income segment.\n\nOur client has 3 questions for BCG:\n1) Should it have a low income strategy?\n2) If it should have a low income strategy, what are some tactics it should deploy?\n3) What are some of the risks the client may face?",
  tags: ["candidate-driven", "market-entry", "brainstorming", "light-math", "exhibit-heavy"],
};

const cell = (v: string, i: number) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const), w: i === 0 ? 700 : 400, fg: "#1f2421" });
const rowsOf = (rows: string[][]) => rows.map((r) => ({ cells: r.map(cell) }));
const heads = (hs: string[]) => hs.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client is a large, multinational consumer products company with business in over 200 countries. Today, we are going to focus on its US business. It has been following US demographic trends and has found that low income households have been growing 2X (twice) as quickly as other consumer segments. Low income is defined as families with income at the poverty level or below.\n\nOur client has always had a premium product strategy. It sells its products in grocery stores, convenience stores, mass retailers, etc., but its products are always priced at the high-end of their respective categories. It has never targeted the low income segment before and doesn't have a strategy to do so, but, given the growth of this segment, our client is considering entering the low income segment.\n\nOur client has 3 questions for BCG:\n1) Should it have a low income strategy?\n2) If it should have a low income strategy, what are some tactics it should deploy?\n3) What are some of the risks the client may face?",
    note: "**Fit Questions** — 1. What kind of a leader are you? 2. Tell me about a time when someone on your team challenged you.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case features a combination of quantitative analysis and brainstorming. A strong candidate will cater their approach, framework, and brainstorming to the specific situation at hand focusing on low income consumers as opposed to treating it as a generic consumer goods growth case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Quantitative analysis" },
          { n: "3", text: "Brainstorming" },
          { n: "4", text: "Recommendations" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "**Information to be provided upon request:**",
    guidancePreLines: [
      "Low income consumers purchase largely in smaller, local shops.",
      "Low income consumers can’t afford salons but will indulge on shampoos.",
      "Low income consumers are willing to spend more on baby food to protect their children.",
      "There are valid generics that compete with our client’s cold medicine.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        label: "Market",
        lines: [
          "Low income consumers",
          "  Demographics (who is buying? – age, gender, socioeconomic status)",
          "  Price sensitivity",
          "  Product preferences (brand v. generic)",
          "  Channel selection for these consumers (neighborhood store)",
          "Competitors",
          "  Low-cost producers (Walmart, Costco, Dollar store)",
          "Segment growth, size",
        ],
      },
      {
        label: "Profitability",
        lines: [
          "Revenue",
          "  Price of product by category: high WTP for select products (e.g. shampoo, baby food)",
          "  Volume sold for lower-priced products",
          "Costs",
          "  FC: manufacturing setup costs, initial investment to enter new channels",
          "  VC: per unit costs, labor, distribution, salesforce, marketing for new products",
        ],
      },
      {
        label: "Consumer Products Company",
        lines: [
          "Capabilities to add new product strategy",
          "Risks:",
          "  Consumer loyalty to competitors",
          "  Access to our products: arrival to store by transportation methods (e.g. car, bus, train), geographic location of storefronts in cities",
        ],
      },
      {
        label: "Transition statement:",
        paragraphs: [
          "I would first like to begin by analyzing revenue for some of the client’s products, such as food and medicine, and then analyze low income consumers’ spend by these different product categories. Do we have any similar data?",
        ],
      },
      {
        label: "The framework should include:",
        lines: [
          "The framework should be catered to the case, i.e. consumer goods strategy in the low income market. There are issues specific to this population. A strong framework would not be reusable in a generic consumer goods case.",
          "A market examination including consumer preferences.",
          "A revenue or profitability analysis.",
          "A consideration of the risks associated with the candidate’s strategy.",
        ],
      },
    ],
    nextStepText: "When the candidate asks about products, **show Exhibit 1**.",
  },
  {
    n: "03",
    label: "Exhibit 1: Consumer Spend",
    title: "Consumer Spend by Product Category",
    kind: "qa",
    qText:
      "**Then ask:**\nThe client has shared some data for its key products. What do you make of this information?\n\n**After discussion of Exhibit 1, ask:**\nIf the client achieved its fair share of the low income segment, how much additional revenue would it generate?",
    dataTableTitle: "Consumer Spend by Product Category",
    dataTableCols: "1.2fr 1.2fr 1.1fr 1.2fr 1.2fr",
    dataTableHeaders: heads([
      "Product/ category",
      "Total category sales (US$M)",
      "Client category sales (US$M)",
      "Total LI consumer spend on category (US$M)",
      "LI Consumer spend on client (US$M)",
    ]),
    dataTableRows: rowsOf([
      ["Shampoo", "400", "100", "90", "30"],
      ["Cold Medicine", "250", "50", "75", "7.5"],
      ["Diapers", "300", "150", "100", "25"],
      ["Baby food", "300", "100", "100", "30"],
    ]),
    dataTableFootnote: "LI: Low Income",
    guidancePreLabel: "Calculations",
    guidancePreLines: [
      "Calculate the overall share and share of low income consumers by product/category.",
      "Calculate incremental revenue for cold medicine and diapers",
    ],
    calcTable: {
      title: "Calculation walkthrough",
      headers: ["Product/ category", "Client overall market share", "Client share of low income consumers", "Overall share vs low income share"],
      rows: [
        ["Shampoo", "100/400 = 25%", "30/90 = 33%", "Overall < LI"],
        ["Cold Medicine", "50/250 = 20%", "7.5/75 = 10%", "Overall > LI"],
        ["Diapers", "150/300 = 50%", "25/100 = 25%", "Overall > LI"],
        ["Baby food", "100/300 = 33%", "30/100 = 30%", "Overall = LI"],
      ],
    },
    answerText:
      "- Cold medicine: (20% - 10%) x $75M = ==$7.5M==\n- Diapers: (50% - 25%) x $100M = ==$25M==\n- Total incremental revenue: $7.5M + $25M = ==$32.5M==",
    guidanceLabel: "Calculations",
    guidanceLines: [
      "After market share and revenue analysis from Exhibit 1, share that the client is not interested in the cold medicine category. However, the client has done customer research that suggests low income consumers are interested in buying diapers (**show Exhibit 2**).",
    ],
  },
  {
    n: "04",
    label: "Exhibit 2: Packaging and Price",
    title: "Product Packaging and Price by Category",
    kind: "qa",
    qText:
      "**Ask the candidate:**\nWhat do you see that could help us figure out why low income consumers aren’t buying our client’s diapers?\n\n**After Discussion:**\nWhat else should our client think about as it develops low income strategy? What are the risks?",
    dataTableTitle: "Product Packaging and Price by Category",
    dataTableCols: "1.2fr 1.2fr 1.3fr 1fr 1.2fr",
    dataTableHeaders: heads([
      "Product/ category",
      "Client package size",
      "Average package size of competitors",
      "Client price",
      "Average price of top 5 competitors",
    ]),
    dataTableRows: rowsOf([
      ["Shampoo", "10 oz bottle", "12 oz bottle", "$4", "$3"],
      ["Cold Medicine", "6 oz bottle", "6.5 oz bottle", "$6", "$3"],
      ["Diapers", "40-pack", "32 pack", "$20", "$16"],
      ["Baby food", "6 oz jar", "6 oz jar", "$2", "$1.50"],
    ]),
    infoBoxLabel: "Sample Response",
    infoSections: [
      {
        groups: [
          {
            heading: "Product",
            items: [
              "Reduce package size of diapers: our client’s package size is significantly larger than its competitors. The client should keep the price / diaper the same; but, if the client dropped the package size from 40 pack to 20 pack, it would cut the absolute price of the box to $10, even lower than its competitors.",
              "Develop discount brand to sell more affordable goods.",
            ],
          },
          {
            heading: "Customer",
            items: ["Enter smaller, local shops.", "Market specifically to low income consumers."],
          },
          {
            heading: "Company",
            items: ["Capitalize on existing strengths, such as baby food and shampoo."],
          },
        ],
      },
      { paragraphs: ["Note: Brainstorming should be conducted by categories."] },
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "Recommendation",
        paragraphs: ["The client should pursue a low income strategy by:"],
        lines: [
          "Focusing on diapers, this could generate an additional ==$25M== in revenue",
          "Increase sales by retaining its price / diaper but reduce package size from 40 to 20 diapers per box to achieve a lower absolute price of ==$10/box==",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Brand dilution and cannibalization",
          "Increased packaging and distribution costs by targeting low income consumers",
          "Competitive response, such as a price war",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Study on effect of the strategy on our brand and existing customers’ purchasing behavior",
          "Re-negotiate supplier packaging contracts to lock in lower prices and research 3rd party vendors to potentially outsource distribution cost",
          "Competitor analysis of categories in which client wants to play to analyze likelihood of such responses and client’s ability to sustain itself with such a response",
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "A strong candidate will be organized and address all 3 case questions in a structured and firm manner.",
      "It may be helpful to repeat the questions at the outset of the final recommendation.",
    ],
  },
];
