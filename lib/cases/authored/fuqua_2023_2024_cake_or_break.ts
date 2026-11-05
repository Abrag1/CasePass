import type { CasePage } from "../content";

export const CASE_ID = "d4800890-7973-4876-8337-aa295aadb122";

const PROMPT =
  "Everything Bundt Cakes (“EBC”) is a bakery that specializes in bundt cakes of all sizes. They offer a variety of flavors, including a seasonal flavor. Since 2020, EBC has noticed a decline in profits and would like your help to increase profits again.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A bundt cake bakery has seen profits decline since 2020. Brainstorm the drivers, read revenue and cost exhibits by cake size and flavor type, weigh revenue growth options, and recommend how to grow profits.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "consumer-goods", "brainstorming", "exhibit-heavy"],
};

const BLUE = "#2f50a3";
const RED = "#ff4560";
const BEIGE = "#d3cdc1";
const LINE = "#6f86c4";
const BALL = "#2f55a4";
const TRACK = "#e3e3e3";
const INK = "#1f2421";

const SERIES = [
  { name: "5 inches", color: BLUE },
  { name: "10 inches", color: RED },
  { name: "15 inches", color: BEIGE },
];

const hb = (title: string, seasonal: number[], regular: number[]) => ({
  kind: "hBars" as const,
  title,
  series: SERIES,
  groups: [
    { label: "Seasonal Flavors", values: seasonal },
    { label: "Regular Flavors", values: regular },
  ],
  max: 40,
  axisStep: 5,
  grid: true,
  stacked: true,
  legendBottom: true,
  singleLineLabels: true,
  labelFontSize: 13,
  valueFontSize: 14,
});

const HEAD = (v: string) => ({ v, align: "center" as const, bg: BLUE, fg: "#ffffff", borders: "trbl", borderColor: LINE });
const LABEL = (v: string) => ({ v, align: "left" as const, w: 400, fg: INK, top: true, borders: "trbl", borderColor: LINE });
const BALLCELL = (f: number) => ({ v: `${f * 100}%`, align: "center" as const, w: 400, fg: INK, harvey: f, harveyColor: BALL, harveyTrack: TRACK, borders: "trbl", borderColor: LINE });
const row = (label: string, f: number[]) => ({ cells: [LABEL(label), ...f.map(BALLCELL)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Case Overview",
    title: "Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Steps",
        lines: [
          "Brainstorm #1: Profitability drivers",
          "Exhibit #1: Product revenues",
          "Exhibit #2: Revenue growth options",
          "Brainstorm #2: Ways to increase profits",
          "Recommendations and next steps",
        ],
      },
      {
        label: "Clarifying Information (If Prompted)",
        lines: [
          "**Product**: There are three sizes of cakes: 5 inches, 10 inches, and 15 inches. The company is located in the US.",
          "**Model**: The primary form of revenue is individuals who physically go to the store or order online. There is a nominal amount of revenue through business orders.",
          "**Objective**: To find ways to increase profitability to help future growth.",
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
        label: "Revenue",
        groups: [
          { heading: "Number of cakes sold", items: ["By size", "By product type"] },
          { heading: "Price per cake", items: ["By size", "By product type"] },
        ],
        lines: ["New products", "New business"],
      },
      {
        label: "Costs",
        groups: [
          { heading: "Fixed costs", items: ["Salaries", "Equipment", "Rent", "Overhead costs", "SG&A"] },
          { heading: "Variable costs", items: ["Ingredient costs", "Labor"] },
        ],
      },
      {
        label: "Market Trends",
        groups: [
          { heading: "Industry", items: ["Competition", "Substitutes", "Supply chain considerations"] },
          {
            heading: "Consumer trends",
            items: ["Price sensitivity", "Changes in preferences (healthy eating focus, etc.)", "Changes in number of customers / shrinking cake market"],
          },
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Brainstorm #1 – Profitability drivers",
    title: "Profitability drivers",
    kind: "qa",
    qText: "Before we go into analysis, I’d love to hear your thoughts on why EBC may be facing decreasing profitability.",
    infoBoxLabel: "Brainstorm Prompt",
    infoSections: [
      {
        label: "Revenues",
        lines: [
          "Less customers / demand for cake",
          "Effects of the COVID-19 pandemic",
          "Increasing competition: grocery stores with generic cakes, at-home bakers, and other specialized cake vendors like Baked by Melissa",
          "Increase in substitutes: bakeries like Crumbl Cookies, healthier “snack” places like Edible Arrangement snack cups",
        ],
      },
      {
        label: "Costs",
        lines: [
          "Increasing ingredient costs: the supply chain shortages impacted companies across many industries, so increasing ingredient costs could reduce profitability",
          "Increasing fixed costs: store rental costs, equipment, etc.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "This brainstorm should have some structure but does not have to be too detailed.",
      "A **strong candidate** will detail specific reasons, and directly relate these reasons with EBC’s business model.",
    ],
  },
  {
    n: "04",
    label: "Exhibit #1",
    title: "Product revenues",
    kind: "qa",
    infoBoxLabel: "Exhibit Notes",
    infoSections: [
      {
        lines: [
          "This type of exhibit is especially common with **Deloitte interviews**, where they are testing the candidate’s ability to take in a lot of information and extract the important parts of it.",
          "Good candidates will be able to cleanly clear the exhibit and highlight notable pieces of information.",
          "Strong candidates will immediately infer that there’s a different between flavor types and speculate on that.",
          "Guide the interviewee towards discussing potential options for increasing profitability.",
        ],
      },
    ],
    extraCharts: [
      hb("Revenues Per Cake", [7.5, 15, 22.5], [6, 12, 18]),
      hb("Costs Per Cake", [6, 12, 18], [4, 8, 12]),
    ],
    exhibitColumns: [1.15, 1],
    exhibitLeftCharts: 2,
    dataTableCols: "1.35fr 1fr",
    dataTableHeaders: [
      { v: "Seasonal Flavors (inclusive)", align: "left", bg: BLUE, fg: "#ffffff", borders: "trbl", borderColor: LINE },
      { v: "Regular Flavors", align: "left", bg: BLUE, fg: "#ffffff", borders: "trbl", borderColor: LINE },
    ],
    dataTableRows: [
      {
        cells: [
          {
            v: "Maple (Jan – Feb)\nCookies & Cream (Feb – Mar)\nLemon (Mar – Apr)\nVery berry (Apr – May)\nStrawberries & Cream (May – June)\nKey Lime (June – July)\nBlueberry (July – Aug)\nCarrot (Aug – Sept)\nPumpkin (Sept – Oct)\nCinnamon roll (Oct – Nov)\nGingerbread (Nov – Dec)\nHot chocolate (Dec – Jan)",
            align: "left",
            w: 400,
            fg: INK,
            top: true,
            bullets: true,
            borders: "trbl",
            borderColor: LINE,
          },
          { v: "Chocolate\nVanilla\nMarble\nOreo\nRed velvet\nSprinkles", align: "left", w: 400, fg: INK, top: true, bullets: true, borders: "trbl", borderColor: LINE },
        ],
      },
    ],
    guidanceLabel: "Detailed Insights",
    guidanceLines: [
      "There are 2 seasonal and 6 regular flavors in any given month, with seasonal flavors having 25% higher revenues than regular flavors.",
      "Strong candidates will recognize that despite the regular having less revenue, the margin on the regular flavors are better than seasonal. (34% vs. 25%.)",
      "Candidate may speculate whether it’s because of resource availability, negotiations with suppliers on seasonal ingredients vs regular ingredients, or something else.",
    ],
  },
  {
    n: "05",
    label: "Exhibit #2",
    title: "Revenue growth options",
    kind: "qa",
    infoBoxLabel: "Exhibit Notes",
    infoSections: [
      {
        lines: [
          "Starting catering will provide the easiest and most cost-effective way to increase profits. It also has a high potential to capture new demographics (75%).",
          "Partnerships with grocery stores have the least customer interest and though there is a high chance for getting a new demographic of customers, it is difficult to implement, and the competition is high as EBC would compete with many other brands.",
          "Offering new flavors has some potential as it does have high customer interest, but the implementation costs are higher than catering, the potential for a new demographic of customers is lower, and it isn’t the easiest to implement. A strong interviewee will connect this back to Exhibit 1 where they learned that the seasonal flavors don’t have as much margin as regular flavors.",
          "Entering new geographies will result in high costs, which may be a future goal to consider but it will not help with the current issue at hand.",
        ],
      },
    ],
    dataTableCols: "1.5fr 1.2fr 1.2fr 1.2fr 1.2fr",
    dataTableFontSize: 14,
    dataTableHeaders: [
      HEAD(""),
      HEAD("Start Catering"),
      HEAD("Partnerships with Grocery Stores"),
      HEAD("Offer More Seasonal Flavors"),
      HEAD("Enter New Geographies"),
    ],
    dataTableRows: [
      row("Customer interest", [0.5, 0.25, 0.75, 0.5]),
      row("Competition", [0.75, 1, 0.5, 1]),
      row("Ability to implement", [1, 0.5, 0.5, 0.25]),
      row("Potential to capture new demographic", [0.75, 1, 0.25, 1]),
      row("Implementation costs", [0.25, 0.5, 0.5, 1]),
    ],
  },
  {
    n: "06",
    label: "Brainstorm #2 – Ways to increase profits",
    title: "Ways to increase profits",
    kind: "qa",
    qText: "What ways can EBC increase profits for the future?",
    infoBoxLabel: "Brainstorm Prompt",
    infoSections: [
      {
        label: "Internal",
        lines: ["Catering and new business models", "New flavors", "Targeting new geographies", "New products (cupcake line)"],
      },
      {
        label: "External",
        lines: [
          "Partnerships with grocery stores",
          "Partnerships with non-food companies (like an EBC & Fuqua partnership for Admitted Students Weekend)",
          "Sponsorships with influencers / celebrities",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The list on the left is non-exhaustive and answers can go in many directions; this brainstorm is intended to test the candidate’s creative thinking.",
      "This brainstorm should be more structured. We know why the profitability is lower since 2020, but we want to consider ways of diversifying the portfolio to bring in new revenue forms.",
      "A **strong candidate** will think of creative ways to improve revenue, beyond just adding new products.",
      "On completing the brainstorm, the interviewer should pivot towards closing the case.",
    ],
  },
  {
    n: "07",
    label: "Recommendation & Next Steps",
    title: "Recommendation & Next Steps",
    kind: "qa",
    qText: "The CEO of EBC is about to walk in the room and would love to hear your recommendation.",
    infoBoxLabel: "Recommendation & Next Steps",
    infoSections: [
      {
        label: "Recommendation",
        lines: [
          "We would recommend that EBC begin an offering for catering service to increase profitability in the coming years. Seeing that the margins are better on the regular flavors, we would recommend offering the regular flavors in the catering portfolio.",
          "A **strong candidate** may add an observation like: If we can negotiate with the suppliers and reduce the costs of seasonal flavors, we can offer them with the catering portfolio.",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Customer trends may change",
          "Cannibalization",
          "Catering depends on customers wanting to order solely bundt cakes; other competitors may offer other products",
          "Customers may be coming in more for the seasonal flavors and buying the regular flavors as the add-on, so focusing catering on regular flavors could reduce profits.",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Due diligence by doing further analysis to ensure that catering will ensure continued increases in profits.",
          "A strong interviewee may mention some of these as well:",
          "  Analyze financial statements to ensure that the regular flavors bring in enough revenue for it to be profitable.",
          "  Allocate capital for marketing, packaging, and labor to focus on the catering part of the business",
          "  Design and deploy a plan to slowly start adding in the catering business to the currently existing single customer model",
        ],
      },
    ],
  },
];
