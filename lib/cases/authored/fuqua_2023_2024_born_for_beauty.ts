import type { CasePage } from "../content";

export const CASE_ID = "152d942c-67af-45d9-b562-7383f8c3e672";

const PROMPT =
  "Your client is BFB or Born for Beauty, a leading Korean beauty marketplace that sells a variety of Korean cosmetics, including makeup, skincare, haircare, and fragrances. Their biggest market is the U.S., but they also sell in Latin America, Europe, and Australia.\n\nDespite being the market leader in the U.S., they have been facing slowing growth in the last few years. BFB is in danger of losing their current market position.\n\nThe CEO, Sunny Jung, has asked for your help to retain their market leadership and increase sales in the next few years. What should BFB do to improve growth?";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "A leading Korean beauty marketplace is losing growth momentum in the U.S. Use customer ratings and a competitor product-mix exhibit to find the gap, brainstorm product factors, and size which skincare additions would close it.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "retail", "light-math", "brainstorming"],
};

const HEAD = "#3053a3";
const TXT = "#000000";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt",
    title: "Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Note: This case is fairly straightforward and designed to be good casing practice across all skill levels. Enjoy!",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Steps",
        lines: [
          "Exhibit #1: User ratings",
          "Exhibit #2: Competitive product mix",
          "Brainstorm: New product factors",
          "Exhibit #3: Product launches",
          "Recommendations and next steps",
        ],
      },
      {
        label: "Clarifying Information (If Prompted)",
        lines: [
          "BFB is primarily e-commerce, with a handful of physical stores. In this growth exercise, they are focused on the US.",
          "They are primarily a distributor, and do not manufacture their own products.",
          "They source 90% of products from Korea and 10% from Japan.",
          "Annual revenues are currently $90m globally, at a growth rate of 4%. Their goal is to double that growth rate. (**Provide after framework if not asked**)",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Sample Framework",
    title: "Sample Framework",
    kind: "qa",
    infoBoxLabel: "Sample Framework",
    infoSections: [
      {
        label: "Organic Growth",
        groups: [
          { heading: "Product", items: ["Expand product range", "Introduce private label", "Pricing"] },
          { heading: "Marketing", items: ["Target new demos", "Campaigns", "Promotions"] },
          { heading: "Channels", items: ["Improve fulfillment or customer service", "Revamp platform"] },
        ],
      },
      {
        label: "Inorganic Growth",
        groups: [
          { heading: "Acquisition", items: ["Smaller stores", "Independent makeup brand (converted to in-house)"] },
          { heading: "Joint venture", items: ["Competitors", "Make-up brands", "Media companies"] },
        ],
      },
      {
        label: "Market",
        groups: [
          { heading: "Competitors", items: ["Korean beauty stores", "Sephora", "Instagram stores"] },
          { heading: "Industry trends", items: ["Overall Korean skincare boom"] },
          { heading: "Consumer trends", items: ["Move to organics", "Influence of media"] },
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Exhibit #1",
    title: "Site ratings",
    kind: "qa",
    extraCharts: [
      {
        kind: "combo",
        yMax: 5,
        yStep: 1,
        categories: ["Fulfillment", "Product Quality", "Product Range", "Customer Support", "Shopper Experience", "Brand Reputation"],
        clusters: [
          { name: "Born For Beauty", color: "#ff66cc", values: [4.1, 4.6, 3.8, 4.2, 4.0, 4.6], valueLabels: true, labelsAbove: true, valueDecimals: 1, labelColor: "#000000" },
          { name: "Lovely X-Change", color: "#33ccff", values: [4.3, 4.5, 4.6, 3.7, 4.4, 4.3], valueLabels: true, labelsAbove: true, valueDecimals: 1, labelColor: "#000000" },
          { name: "Hallyu Depot", color: "#ccccff", values: [3.5, 4.6, 4.4, 3.9, 3.5, 3.9], valueLabels: true, labelsAbove: true, valueDecimals: 1, labelColor: "#000000" },
        ],
        legend: "right",
        customLegend: [
          { color: "#ccccff", label: "Hallyu Depot" },
          { color: "#33ccff", label: "Lovely X-Change" },
          { color: "#ff66cc", label: "Born For Beauty" },
        ],
        footnote:
          "Note: Data is taken from a survey (n=1,000) of markets where all three companies operate in, including the US and Europe. Respondents were qualified as having had purchase experiences with all three companies.",
      },
    ],
    guidanceLabel: "Exhibit Notes",
    guidanceLines: [
      "The goal of this exhibit is to uncover which areas Born for Beauty is falling behind relative to their competitors, and address that to solve their stagnant growth.",
      "The candidate should immediately identify that there are two areas where Born for Beauty falls behind relative to some of their competitors, which are **Product Range and Shopper Experience.**",
      "The candidate should hone into **Product Range,** which is both its lowest rating and its worst aspect relative to both major competitors. Therefore, they should drive towards exploring ways to improve the product portfolio.",
    ],
  },
  {
    n: "04",
    label: "Exhibit #2",
    title: "Korean beauty product mix (U.S.)",
    kind: "qa",
    extraCharts: [
      {
        kind: "marimekko",
        columns: [
          { label: "Born For Beauty\n(CAGR: 4%)", width: 80, sub: "$80M", slices: [{ value: 5 }, { value: 7.5, text: "Fragrances", textColor: TXT }, { value: 10, text: "Haircare", textColor: TXT }, { value: 58.5, text: "Makeup", textColor: "#ffffff" }, { value: 19, text: "Skincare", textColor: "#ffffff" }] },
          { label: "Lovely X-Change\n(CAGR: 7%)", width: 57, sub: "$57M", slices: [{ value: 3.5 }, { value: 3.5 }, { value: 5 }, { value: 26.5, text: "Makeup", textColor: "#ffffff" }, { value: 61.5, text: "Skincare", textColor: "#ffffff" }] },
          { label: "Hallyu Depot\n(CAGR: 9%)", width: 52, sub: "$52M", slices: [{ value: 9.7, text: "Other Products", textColor: TXT }, { value: 0 }, { value: 0 }, { value: 34.5, text: "Makeup", textColor: "#ffffff" }, { value: 55.8, text: "Skincare", textColor: "#ffffff" }] },
          { label: "Other Stores*\n(CAGR: 8%)", width: 111, sub: "$111M", slices: [{ value: 2.8 }, { value: 7.1, text: "Fragrances", textColor: TXT }, { value: 13.6, text: "Haircare", textColor: TXT }, { value: 13.5, text: "Makeup", textColor: "#ffffff" }, { value: 63, text: "Skincare", textColor: "#ffffff" }] },
        ],
        series: [
          { name: "Other Products", color: "#edd5e4" },
          { name: "Fragrances", color: "#d9abc5" },
          { name: "Haircare", color: "#b9749f" },
          { name: "Makeup", color: "#963a74" },
          { name: "Skincare", color: "#630940" },
        ],
        topSub: true,
        noLegend: true,
        noGrid: true,
        plainSlices: true,
        sliceTexts: true,
        labelBreaks: true,
        sourceFrame: true,
        topTickPercentOnly: true,
        yStep: 20,
        plotHeight: 215,
        sideNote: "Total US Market =\n$300M",
        sideNoteAt: 0.72,
      },
    ],
    guidanceLabel: "Exhibit Notes",
    guidanceLines: [
      "The goal of this exhibit is to find identify areas where the product range of Born for Beauty falls behind relative to their competitors and the rest of the market.",
      "The candidate should immediately identify that Born for Beauty’s portfolio is heavy on makeup products and **lacking in skincare products,** whereas their competitors are heavy on skincare.",
      "  Strong candidates will tie this observation back to their framework or provide insights on the growth of skincare as a product category in recent times – therefore explaining the lagging growth.",
      "The candidate should drive to adding additional products into the product portfolio, which leads into the next brainstorm segment.",
    ],
  },
  {
    n: "05",
    label: "Brainstorm #1",
    title: "Factors for buying skincare",
    kind: "qa",
    qText: "What do you think are some factors that should go into selecting the right products to add to the skincare portfolio at Born for Beauty?",
    infoBoxLabel: "Exhibit Notes",
    infoSections: [
      {
        groups: [
          {
            heading: "Product Factors",
            items: [
              "**Quality/Features**: Quality of formulation and chemistry, minimal allergic reactions, effectiveness",
              "**Certifications:** Non-GMO, cruelty-free, etc.",
              "**Compatibility:** Whether a product comes as part of a set/range of products, and can be bundled together",
              "**Brand**: Brand recognition and popularity",
              "**Price:** Price relative to other products on the market",
            ],
          },
          {
            heading: "Operational Factors",
            items: [
              "**Availability:** Important to minimizing stockouts",
              "**Supplier Range:** Whether a brand can ship multiple products at once, reducing shipping costs",
              "**Storage Requirements:** Shelf space requirements, expiry, and cooling needs",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Quantitative Analysis",
    guidanceLines: [
      "The list on the left is non-exhaustive and answers can go in many directions; this brainstorm is intended to test the candidate’s creative thinking.",
      "A **strong candidate** will structure their brainstorm ideas and provide insights into each of them.",
      "  Candidates with knowledge of the industry will go into more complex factors, such as skin types, formulations, allergens, and product bundles",
      "  Steer candidates towards thinking about operational factors (availability, suppliers) as well",
      "On completing the brainstorm, the candidate should steer to the next exhibit on product options.",
    ],
  },
  {
    n: "06",
    label: "Exhibit #3",
    title: "Product options / math exercise",
    kind: "qa",
    qText: "Three cosmetics companies are interested in adding their skincare products to their portfolio. These are:",
    guidancePreLabel: "Exhibit Figures",
    guidancePreLines: ["**Once the candidate suggests exploring specific products to add to the portfolio, read the below aloud without showing them the figures.**",
      "**If the candidate has forgotten, provide them the following information:** BFB annual revenues are currently $90m globally, at a growth rate of 4%. Their goal is to double that growth rate. (==$90m x 4% = $3.6m in additional revenue==)",
      "This should drive the candidate towards a calculation of total sales that can be gained from each product.",
    ],
    dataTableCols: "1.3fr 1fr 1.2fr 1.3fr",
    dataTableFontSize: 15,
    dataTableHeaders: [
      { v: "Company", align: "left", bg: HEAD, fg: "#ffffff", borders: "t" },
      { v: "Skincare products", align: "left", bg: HEAD, fg: "#ffffff", borders: "t" },
      { v: "Est. yearly sales per product", align: "left", bg: HEAD, fg: "#ffffff", borders: "t" },
      { v: "Avg. price per product", align: "left", bg: HEAD, fg: "#ffffff", borders: "t" },
    ],
    dataTableRows: [
      { cells: [
        { v: "SM Cosmetics", align: "left", w: 700, fg: TXT, borders: "b" },
        { v: "30", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "4,000", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "$15", align: "left", w: 400, fg: TXT, borders: "b" },
      ] },
      { cells: [
        { v: "YG Skin Co", align: "left", w: 700, fg: TXT, borders: "b" },
        { v: "15", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "3,000", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "$20", align: "left", w: 400, fg: TXT, borders: "b" },
      ] },
      { cells: [
        { v: "JYP Care", align: "left", w: 700, fg: TXT, borders: "b" },
        { v: "20", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "1,500", align: "left", w: 400, fg: TXT, borders: "b" },
        { v: "$40", align: "left", w: 400, fg: TXT, borders: "b" },
      ] },
    ],
    calcTable: {
      plain: true,
      slideRules: true,
      subtitle: "The formula to get total sales is: products * yearly sales per product * average price per product.",
      cols: "1.3fr 1fr 1.2fr 1.3fr 1fr",
      headerBg: HEAD,
      boldCols: [0],
      rowBg: ["", "", "", "#d1dbf0"],
      rulesAbove: [1, 2, 3],
      headers: ["Company", "Skincare products", "Est. yearly sales per product", "Avg. price per product", "Total sales"],
      rows: [
        ["SM Cosmetics", "30", "4,000", "$15", "$1.8m"],
        ["YG Skin Co", "15", "3,000", "$20", "$900k"],
        ["JYP Care", "20", "1,500", "$40", "$1.2m"],
        ["TOTAL", "", "", "", "$3.9m"],
      ],
    },
    guidanceLabel: "Interviewer Guidance + Quant Analysis",
    guidanceLines: [
      "The candidate should realize that it is necessary to add **all three** companies’ products to the portfolio, and that just one or two does not meet the target additional revenue. (==$3.6m==)",
    ],
  },
  {
    n: "07",
    label: "Recommendation & Next Steps",
    title: "Recommendation & Next Steps",
    kind: "qa",
    qText: "Born for Beauty and Sunny Jung have set up a meeting with your team at the annual Korean Cosmetics conference in Los Angeles. What do you tell her during your meeting?",
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "Born for Beauty is experiencing slowing growth due to a limited product range, so they should add more skincare products to their portfolio.",
      "We’ve identified three companies who want to add their products BFB. These products will add an estimated ==$3.9m== of revenue per year, enabling us to achieve our additional revenue target of ==$3.6m==.",
    ],
    infoBoxLabel: "Risks & Next Steps",
    infoSections: [
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "These are only estimates, and we may fall short of target due to inaccurate projections.",
              "Since these are Korean skincare products, there is always a chance that they are not fully compatible with skin types in other markets.",
              "We risk lagging behind the market in terms of adding skincare products (other competitors may already be adding new, innovative formulations) so we need to act quickly.",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Perform a market study to validate our estimated sales for these products.",
              "Understand product positioning, especially how best to add these products to the digital storefront.",
              "Embark on a marketing campaign to promote the expansion of the skincare range on BFB.",
            ],
          },
        ],
      },
    ],
  },
];
