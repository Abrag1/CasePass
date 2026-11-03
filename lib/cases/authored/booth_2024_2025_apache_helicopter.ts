import type { CasePage } from "../content";

export const CASE_ID = "1dceca6d-8e98-4f5c-82da-25590e49a93c";

const PROMPT =
  "Our client is a US defense contractor. One of its divisions manufactures Apache helicopters for military operations. The company is considering setting up a new plant to meet increasing demand in the attack helicopter space. The client is considering three sites for the new plant – Brazil, France, and the US.\nThey have hired us to help them answer the following two questions:\n\n1) How would you determine the parameters for the decision?\n2) Where should they set up the plant?";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "A US defense contractor that manufactures Apache helicopters is considering a new plant in Brazil, France or the US. Determine the decision parameters and recommend where to build.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "investment-decision", "heavy-math", "brainstorming", "industrial-goods"],
};

const cell = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });
const lcell = (v: string, w = 400) => ({ v, align: "left" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about one of your strengths and one of your weaknesses and how these are displayed in a team setting. 2. Tell me about a time you had to convince someone of something using data.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case tests a candidate's ability to think logically through a cost-benefit analysis between three options while determining whether assumptions are reasonable. There is no clear right answer in this case. This is a good case for practicing quantitative reasoning and structured math.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Market sizing" },
          { n: "3", text: "Cost-benefit analysis" },
          { n: "4", text: "Final recommendation" },
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
    guidancePreIntro:
      "A good candidate will ask questions in a logical format and specify the categories they are considering. **If asked**, provide the candidate with the following information:",
    guidancePreLines: [
      "The client has 3 plants in the US; 2 in Kansas and 1 in Michigan.",
      "Company Information:",
      "  The plants operate at full capacity today.",
      "  One of the US plants can accommodate an additional assembly line at the cost of $500M; the other 2 are constrained in residential areas and cannot be expanded.",
      "  This is the only defense contractor that sells Apache helicopters.",
      "  They will only be selling to Brazil, France, or the US.",
      "  This is the first time that they sell to Brazil or France.",
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Demand Characteristics (understand how much)",
          children: [
            { label: "Size of increased demand spike", children: [{ label: "Based on location" }] },
            { label: "Market details", children: [{ label: "Size" }, { label: "Current margin" }] },
          ],
        },
        {
          label: "Facility Capabilities by Region (understand can we do it)",
          children: [
            { label: "Qualified labor" },
            { label: "Political stability" },
            { label: "International supply chain management" },
            { label: "QA of raw materials" },
          ],
        },
        {
          label: "Profitability by plant location (select which one is best)",
          children: [
            { label: "NPV, Breakeven" },
            { label: "Revenue", children: [{ label: "Quantity based on plant location" }, { label: "Price per helicopter" }] },
            { label: "Cost", children: [{ label: "Investment" }, { label: "FC, VC of production" }] },
          ],
        },
      ],
    },
    infoBoxLabel: "Transition",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** To best determine where to open a plant, I would like to first look at the demand by region. Once identified, we can further test where to establish the plant based on profitability and capabilities by region.",
        ],
      },
    ],
    guidanceLabel: "Framework",
    guidanceLines: ["A good candidate answers the prompt in the way they set up their framework."],
  },
  {
    n: "03",
    label: "Market Sizing / Demand",
    title: "Market Sizing / Demand",
    kind: "qa",
    guidancePreLabel: "Market Sizing / Demand",
    guidancePreLines: [
      "If the candidate does not begin by considering market demand, **guide** them toward this by calculating the increase in demand from the additional plant. This is based off of the defense budget for each of the three nations that the contractor would sell to.",
      "**Provide the candidate the following information as they ask for it:**",
      "  Defense budget for the next five years: ==$100B== (US), ==$15B== (BR), ==$10B== (FR)",
      "  Countries will dedicate a certain percentage of their defense budget to be spent on Apache helicopters based on the location of the plant. **Provide Exhibit 1.**",
      "  Candidate should conclude their calculations by identifying key takeaways from the data. For example, the highest demand / government spend ($) will occur from a plant in Brazil.",
    ],
    dataTableTitle: "Defense Budget Over Next 5 Years",
    dataTableCols: "1.1fr 1.2fr 1.2fr 1.2fr",
    dataTableHeaders: [
      { v: "", align: "center" },
      { v: "Purchases by US Dept. of Defense", align: "center" },
      { v: "Purchases by Brazil Dept. of Defense", align: "center" },
      { v: "Purchases by France Dept. of Defense", align: "center" },
    ],
    dataTableRows: [
      { cells: [lcell("Plant in the US"), cell("20% of budget"), cell("0%"), cell("0%")] },
      { cells: [lcell("Plant in Brazil"), cell("20% of budget"), cell("50% of budget"), cell("0%")] },
      { cells: [lcell("Plant in France"), cell("20% of budget"), cell("0%"), cell("50% of budget")] },
    ],
    calcTable: {
      title: "Calculation to be performed by candidate",
      headers: ["", "United States", "Brazil", "France"],
      rows: [
        ["Plant in the US", "20% * $100B = $20B", "$0", "$0"],
        ["Plant in Brazil", "20% * $100B = $20B", "50% * $15B = $7.5B", "$0"],
        ["Plant in France", "20% * $100B = $20B", "$0", "50% * $10B = $5B"],
      ],
    },
  },
  {
    n: "04",
    label: "Brainstorm #1",
    title: "Brainstorm #1",
    kind: "qa",
    guidancePreLines: [
      "If the candidate asks about competition, **remind** them there are currently no other producers of Apache Helicopters. Then, **guide** them to think about costs.",
    ],
    qText: "What are the major costs that are associated with the development of the plant and production of helicopters?",
    infoBoxLabel: "Brainstorm #1",
    infoSections: [
      {
        paragraphs: ["There are many ways you can approach this brainstorm. The best way is to think of the value chain."],
      },
      {
        label: "Plant Development (CAPX)",
        lines: ["Property", "Legal", "Construction", "Qualified labor"],
      },
      {
        label: "(Opx) Plant Operations",
        groups: [
          { heading: "Sourcing", items: ["Materials", "Shipping based on location of suppliers", "Sourcing QA material"] },
          { heading: "Production", items: ["Assembly", "Labor (union)", "Training", "QA/QC"] },
          { heading: "Distribution", items: ["Storage (5 years)", "Shipping", "QA on delivery", "Taxes"] },
        ],
      },
      { paragraphs: ["Note: Candidates can insert more buckets as they see fit."] },
    ],
  },
  {
    n: "05",
    label: "Cost-Benefit Information",
    title: "Cost-Benefit Information",
    kind: "qa",
    guidancePreLabel: "Cost-Benefit Information",
    guidancePreIntro: "The candidate can be provided with the information below when asking about costs.",
    guidancePreLines: [
      "**Initial plant set-up costs:**",
      "  US: ==$500M==",
      "  Brazil: ==$2B==",
      "  France: ==$3B==",
      "**Fixed costs per year:**",
      "  US: ==$100M==",
      "  Brazil: ==$100M==",
      "  France: ==$100M==",
      "**Variable cost of production:**",
      "  US: ==$15M==",
      "  Brazil: ==$20M==",
      "  France: ==$25M==",
      "**Additional cost:**",
      "  If helicopters are shipped into the US, then the US Govt. requires them to be certified; the certification process is ==$15M== per chopper.",
    ],
    infoBoxLabel: "Sample Approach: Helicopters",
    infoSections: [
      {
        paragraphs: [
          "The candidate should recognize they need the price per chopper. If they haven’t identified this, steer them in that direction during the math.",
        ],
      },
      { lines: ["  The helicopters sell for ==$100M== a piece."] },
      { paragraphs: ["Candidates should then recognize they need to calculate the number of helicopters produced at each plant."] },
    ],
    calcTable: {
      title: "Sample Approach: Helicopters",
      headers: ["", "United States", "Brazil", "France"],
      rows: [
        ["Plant in the US", "$20B/$100M = 200 heli", "0", "0"],
        ["Plant in Brazil", "$20B/$100M = 200 heli", "$7.5B/$100M = 75 heli", "0"],
        ["Plant in France", "$20B/$100M = 200 heli", "0", "$5B/$100M = 50 heli"],
      ],
    },
  },
  {
    n: "06",
    label: "Sample Approach: Costs",
    title: "Sample Approach: Costs",
    kind: "qa",
    infoBoxLabel: "Sample Approach: Costs",
    infoSections: [
      { paragraphs: ["Candidates should layout the costs per plant location remembering the $15M for importing to the US:"] },
      {
        paragraphs: [
          "Note: A strong candidate will recognize that the revenue from France is lower than Brazil and that the initial setup costs as well as variable costs in France are higher than Brazil. Therefore, they should **rule France out** and not need to perform the calculation.",
        ],
      },
    ],
    calcTable: {
      title: "Sample Approach: Costs",
      headers: ["Plant location", "United States", "Brazil", "France"],
      rows: [
        ["Initial setup", "$500M", "$2B", "$3B"],
        ["Annual Fixed Cost", "$100M*5 = $500M", "$100M*5 = $500M", "$100M*5 = $500M"],
        ["Variable Cost", "$15M*200 = $3B", "$20M*(200+75) = $5.5B", "$25M*(200+50) = $ 6.25B"],
        ["Import Cost", "$0", "$15M * 200 = $3B", "$15M * 200 = $3B"],
        ["Total Costs (Over 5 years)", "$4B", "$11B", "$12.75B"],
      ],
      totalLast: true,
    },
  },
  {
    n: "07",
    label: "Sample Approach: Profit",
    title: "Sample Approach: Profit",
    kind: "qa",
    infoBoxLabel: "Sample Approach: Profit",
    infoSections: [
      {
        paragraphs: [
          "A great candidate will pause and explain why the costs are so different between the various locations. They may give some hypotheses around why certain differences, such as production costs, may be even more of an issue with exchange rate volatility, etc.",
          "At this point a candidate should be fully pushing to calculate the **total profit** expected per location.",
        ],
      },
    ],
    calcTable: {
      title: "Sample Approach: Profit",
      headers: ["Plant location", "United States", "Brazil", "France"],
      rows: [
        ["Total Revenue (over 5 years)", "$20B", "$20+$7.5B = $27.5B", "$20B+$5B = $25B"],
        ["Total Cost (over 5 years)", "$4B", "$11B", "$12.75B"],
        ["Profit (Over 5 years)", "==$16B==", "==$16.5B==", "==$12.25B=="],
      ],
      totalLast: true,
    },
    nextStepText:
      "At this point, a good candidate should **recommend which plant** the contractor should select.\nA great candidate will directly jump into a **brainstorm of the risks** between selecting one plant over the other.",
  },
  {
    n: "08",
    label: "Brainstorm #2",
    title: "Brainstorm #2",
    kind: "qa",
    qText: "Given that there is only a 3% difference in profit, what are some factors that would cause you to choose either the US or Brazil?",
    infoBoxLabel: "Brainstorm #2",
    infoSections: [
      {
        paragraphs: [
          "Candidates should pick up that this is a **risk brainstorm**. The best way to do this would be to list risk factors down the left hand side of a table and compare the two options:",
        ],
      },
    ],
    dataTableCols: "1fr 1.4fr 1.4fr 0.8fr",
    dataTableHeaders: [
      { v: "Risk", align: "left" },
      { v: "Plant in US", align: "left" },
      { v: "Plant in Brazil", align: "left" },
      { v: "Advantage", align: "center" },
    ],
    dataTableRows: [
      { cells: [lcell("Political"), lcell("Negative view of US defense contractors"), lcell("Instability, issues with president, Reselling"), cell("US")] },
      { cells: [lcell("Currency"), lcell("Another recession"), lcell("Cheaper to pay labor Volatility in currency/5 years"), cell("US")] },
      { cells: [lcell("Labor"), lcell("Unionized labor, skilled"), lcell("Cheaper labor, unskilled"), cell("Brazil")] },
      { cells: [lcell("Cost of quality material"), lcell("Expensive to receive initial material"), lcell("Expensive to have proper QA/QC"), cell("US")] },
      { cells: [lcell("Assumptions (demand, etc.)"), lcell("New administration in 5 years"), lcell("More likely to pull back from purchase"), cell("US")] },
      { cells: [lcell(""), lcell("New opp. in Brazil (commercial heli)"), lcell(""), cell("")] },
    ],
  },
  {
    n: "09",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidancePreLines: [
      "Once the cost-benefit analysis is complete, **ask for a recommendation**:",
      "Note: This is meant to go either way based on candidate's last brainstorm; sample is for US.",
    ],
    qText: "“The CEO is about to walk into the room and has asked us for a recommendation. What would you tell them?”",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "A potential response could include:",
        lines: [
          "You should open a new plant in the US",
          "It is slightly less profitable than opening in Brazil, however, your existing operations and stability in the US offset the potential risk of opening up in Brazil",
        ],
      },
      {
        groups: [
          { heading: "Risks", items: ["Change in administration causing decreased demand", "Missing out on opportunity to enter Brazil"] },
          {
            heading: "Next Steps",
            items: [
              "We should look into locking in a contract with the existing administration to ensure purchase",
              "We should see if Brazil would purchase at a price lower that $100M. Additionally, we should do an analysis to see if we can enter in a commercial helicopter capacity.",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "This case tests a candidate's ability to weigh different options and understand the potential demand for the client's product. Creativity and the ability to drive the case in the right direction should be rewarded.",
      "It is important that the candidate refer back to the original case questions and allow their framework to drive the analyses.",
      "A good candidate will anticipate the risks and do a cost-benefit exercise. By doing so, they should select one option and make a clear and succinct recommendation based on what they find.",
    ],
  },
];
