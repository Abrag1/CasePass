import type { CasePage } from "../content";

export const CASE_ID = "c353ebb3-c8dd-40f6-aa9b-c7f72037740a";

const PROMPT =
  "Over the last few years some states have legalized medical marijuana sales on a prescription basis, and some have even legalized recreational use. The cultivation and sales of marijuana most often take place in small storefronts called dispensaries. In most states, limits have been created on how many dispensaries are allowed to exist at any one time.\n\nYour client, North Carolina Tobacco Company, made $8 Billion in revenue and $2 Billion in profits last year, but has seen declining use of cigarettes in the United States, which currently makes up 25% of its total revenue and profit. NC Tobacco is considering moving into the recreational marijuana market. What should they do? Assume that federal regulations are not a concern in this case.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A tobacco company with declining cigarette sales is considering moving into the recreational marijuana market. Size the market, choose how to enter and decide whether buying dispensaries is worth it.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "market-sizing", "npv", "medium-math"],
};

const GREY = "#999999";
const hd = (v: string) => ({ v, align: "center" as const, bg: GREY, fg: "#ffffff" });
const c = (v: string, bg: string, borders = "tblr") => ({ v, align: "center" as const, w: 400, fg: "#000000", bg, borders, borderColor: "#ffffff" });
const A = "#ebebeb";
const B = "#f6f6f6";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Describe a time a teammate was not pulling their weight. What did you do about it? What three things would your previous supervisor identify as your areas of improvement?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreIntro: "Provide if requested:",
    guidancePreLines: [
      "Global use of tobacco has not declined and is even increasing in some areas",
      "NC Tobacco is interested in diversifying their portfolio of products",
      "NC Tobacco is normally focused on long-term profitability, but because this is a very new market they aren’t completely sure what else they should be thinking about.",
      "NC Tobacco only interested in entering the recreational market, as medical marijuana is highly regulated and requires the dispensary to be a not for profit organization. (Assume recreational dispensaries are for-profit)",
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: ["A good candidate will recognize that this is a market entry question. The framework can include:"],
        lines: [
          "**Market Evaluation**: Market Size, barriers to entry,",
          "**Entry**: Buy, Build, Partner",
          "**Economics**: Costs, Revenue, synergies with cigarette business, NPV",
          "**Risks**: Political fallout in NC (tobacco centric state), Negative PR for getting in drug business, potential substitution of cigarette sales, consumer distaste for ‘big corporate’, problems with financing (banks don’t want to finance due to risks associated with Marijuana).",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText:
      "NC Tobacco is interested in Washington and Colorado, which are two states that have legalized recreational use of marijuana. What is the potential market size in Washington and Colorado?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Guide the candidate toward a top-down approach. Provide the following information if requested:",
      "  Colorado Population: 5 Million",
      "  Colorado Population that smokes: 15%",
      "  Washington Population: 7 Million",
      "  Washington Population that smokes: 10%",
      "  Number of grams consumed per week: 1",
      "  Price per gram (assume this is the equivalent of 1 marijuana cigarette): $15",
      "Candidate should lay out information requested on an organized chart or data table.",
    ],
    answerText:
      "Washington Market size: $15/gram * 50 grams/yr * 7M people * 10% = ==$525 M==\nColorado Market Size: $15/gram *50 grams/yr * 5M people * 15% = ==$562.5 M==\nCandidate should note a fairly large market size relative to current NC Tobacco profits, and a relatively larger market size in Colorado.",
  },
  {
    n: "03",
    label: "Prompt #3",
    title: "Prompt #3",
    kind: "qa",
    qText: "Now that NC Tobacco understands the market size, how should they enter the market?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "The candidate should analyze the cost/benefits for buy, build or partner. Guide them to the primary analysis of buy or build, if they don’t arrive there quickly. If candidate inquires about JV, assume NC Tobacco wants full control of the process. The candidate should approach this in a structured way that analyzes the positives and negatives of each. Utilizing a table is one way to facilitate this:",
    ],
    calcTable: {
      title: "Analysis",
      plain: true,
      cols: "0.9fr 2.6fr 2.4fr",
      headerBg: "#666666",
      headers: ["Strategy", "Buy", "Build"],
      rowBg: ["#ececec", "#ececec"],
      rows: [
        [
          "Benefits",
          "- Quick to ramp up and capitalize on first mover advantage\n- Utilize local expertise\n- Few states have marijuana cigarettes so easy to consolidate\n- Utilize local brand recognition",
          "- Easier to build culture\n- Few consolidated competitors means less competition\n- Similar products may allow ease of  entrance into market",
        ],
        [
          "Disadvantages",
          "- Integration into new company\n- Scattered, independent operators may make consolidation challenging\n- Financing may be challenging for marijuana dispensary purchases",
          "- **Limited licenses distributed restrict ability to build from scratch**\n- Time to grow plants, establish brand name and sell may take too long – other competitors may enter",
        ],
      ],
    },
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "Candidate should recall limited amount of licenses distributed and recognize that building would be more difficult. Client should buy rather than build.",
    ],
  },
  {
    n: "04",
    label: "Prompt #4",
    title: "Prompt #4",
    kind: "qa",
    qText:
      "NC Tobacco is interested in purchasing a portion of the dispensaries currently in the market. What do they need to know in order to determine the worthiness of the investment, and which market they should enter, if any?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Potential avenues of pursuit could be an ROI, a Breakeven, or an NPV analysis. Guide the candidate towards an NPV analysis and a determination of the value of the purchases to NC Tobacco. Once they have asked for financial information, provide Exhibit 1.",
      "The first step of this analysis is to determine the revenue for each individual dispensary. Candidate should recognize that they require the number of individual dispensaries in each state. See below for information – individual revenue numbers are on interviewer copy of Exhibit 1.",
      "  Total number of dispensaries in Colorado: 100",
      "  Total number of dispensaries in Washington: 200",
      "One they calculate the individual revenue, the candidate should begin pursuing an NPV valuation with the data at hand.  Provide the following information upon request",
      "  Total number of dispensaries in Colorado available for sale: 10",
      "  Estimated purchase price of each Colorado dispensary: $4M",
      "  Total number of dispensaries in Washington available for sale: 30",
      "  Estimated purchase price of each Washington dispensary: $1.5M",
      "  Discount rate: 10% (assume the NPV is in perpetuity)",
    ],
    dataTableTitle: "Estimated Income Statement for a Future NC Tobacco Dispensary",
    dataTableFontSize: 15,
    dataTableCols: "1fr 1fr 1fr",
    dataTableHeaders: [{ v: "", align: "center" }, hd("Colorado"), hd("Washington")],
    dataTableRows: [
      { cells: [c("Revenue", A, "r"), c("?", A, "r"), c("?", A)] },
      { cells: [c("Cost of Goods Sold", B, "r"), c("$2,175,000", B, "r"), c("$1,050,000", B)] },
      { cells: [c("Overhead", A, "r"), c("$1,100,000", A, "r"), c("$450,000", A)] },
      { cells: [c("Salary", B, "r"), c("$525,000", B, "r"), c("$375,000", B)] },
    ],
    calcTable: {
      title: "Exhibit 1: Interviewer Guidance",
      subtitle: "Estimated Income Statement for a Future NC Tobacco Dispensary",
      plain: true,
      center: true,
      headerBg: "#999999",
      headers: ["", "Colorado", "Washington"],
      rowBg: ["#ebebeb", "#f6f6f6", "#ebebeb", "#f6f6f6"],
      rows: [
        ["Revenue", "$5,625,000", "$2,625,000"],
        ["Cost of Goods Sold", "$2,175,000", "$1,050,000"],
        ["Overhead", "$1,100,000", "$450,000"],
        ["Salary", "$525,000", "$375,000"],
      ],
    },
    calcTables: [
      {
        title: "Analysis",
        plain: true,
        center: true,
        cols: "2.2fr 1.3fr 1.3fr",
        headerRule: true,
        headers: ["", "Colorado", "Washington"],
        rowBg: [],
        boldRows: [10, 12, 13],
        rulesAbove: [2, 6, 8, 9],
        boxRows: [11, 12],
        rows: [
          ["Market Size", "$562,500,000", "$525,000,000"],
          ["# of Dispensaries", "100", "200"],
          ["Revenue/Dispensary", "$5,625,000", "$2,625,000"],
          ["Cost of Goods Sold", "($2,175,000)", "($1,050,000)"],
          ["Overhead", "($1,100,000)", "($450,000)"],
          ["Salary", "($525,000)", "($375,000)"],
          ["CF/store", "$1,825,000", "$750,000"],
          ["# of stores available for purchase", "10", "30"],
          ["Total CF/Store", "$18,250,000", "$22,500,000"],
          ["Discount Rate", "10%", "10%"],
          ["DCF of purchased stores", "$182,500,000", "$225,000,000"],
          ["Cost to purchase 1 store", "($4,000,000)", "($1,500,000)"],
          ["Cost to purchase available stores", "($40,000,000)", "($45,000,000)"],
          ["NPV", "$142,500,000", "$180,000,000"],
        ],
      },
    ],
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "A good candidate will immediately note the higher NPV for Washington over Colorado. An excellent candidate will realize that both are viable options due to the positive NPV..",
    ],
  },
  {
    n: "05",
    label: "Prompt #5",
    title: "Prompt #5",
    kind: "qa",
    qText:
      "Should NC Tobacco move forward with purchasing dispensaries? What are some other factors that NC Tobacco might want to consider before moving forward with their decision?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Candidate should provide a conclusion slide clearly identifying the recommendation, along with the risks associated with the strategy. Recommended action would be to move forward with purchase of both Colorado and Washington dispensaries due to NPV, but the candidate can make a case for either moving forward or for not purchasing as long as sufficient support is provided. This is a good opportunity to push the candidate with ‘what else’ questions, particularly during the risk assessment.",
    ],
    infoBoxLabel: "Analysis",
    infoSections: [
      {
        label: "Potential Rationale for moving forward with purchase:",
        lines: [
          "Positive NPV",
          "Higher profit margin than cigarettes",
          "First mover advantage",
          "Potential high-growth market as more states legalize",
          "Synergistic opportunities in supply chain, marketing, etc.",
          "New (and highly loyal) customer base",
          "Cigarettes inviable for long term",
        ],
      },
      {
        label: "Potential Rationale for not continuing:",
        lines: [
          "NPV small for company making $8 Billion/yr in revenue",
          "Potential variability in projected vs. actual income statement estimates",
          "Potentially low estimate of purchase price (given low NPV/store)",
          "Potential first mover disadvantage",
          "Negative PR for getting in ‘drug’ business",
          "Potential substitution of cigarette sales",
          "Potential consumer distaste for ‘big business’",
          "Problems with financing (banks don’t want to finance due to risks associated with Marijuana)",
          "Cigarette sales still strong abroad – focus on international opportunities",
        ],
      },
    ],
  },
];
