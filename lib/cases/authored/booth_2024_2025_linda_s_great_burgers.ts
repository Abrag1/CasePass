import type { CasePage } from "../content";

export const CASE_ID = "560d9894-5136-4e2d-af6f-4d91beca6b11";

const PROMPT =
  "Our client is Linda's Great Burgers (GB). GB is a worldwide fast food chain store. Linda's uses the individual franchise model to sell burgers. The client feels the burger market is saturated and is exploring acquisitions for growth. To increase growth Great Burgers is thinking of acquiring Heavenly Donuts.\n\nHeavenly Donuts (HD) is a young coffee/donut chain. It's business model is a territorial franchise model (i.e. franchisers are granted specific regions to sell donuts). HD is a worldwide company. Is HD a good acquisition and match for GB?";

export const CASE_META = {
  review: "auto",
  case_type: "Mergers & Acquisitions",
  synopsis:
    "A worldwide burger chain that feels its market is saturated is considering acquiring a young coffee and donut chain. Assess whether the acquisition is a good strategy and match for the client.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "mergers-acquisitions", "light-math", "brainstorming", "restaurants"],
};

const NB = "      ";
const head = (v: string) => ({
  cells: [
    { v, align: "left" as const, w: 700, fg: "#1f2421" },
    { v: "", align: "right" as const, w: 400, fg: "#1f2421" },
    { v: "", align: "right" as const, w: 400, fg: "#1f2421" },
  ],
});
const row = (a: string, b: string, c: string) => ({
  cells: [
    { v: NB + a, align: "left" as const, w: 400, fg: "#1f2421" },
    { v: b, align: "right" as const, w: 400, fg: "#1f2421" },
    { v: c, align: "right" as const, w: 400, fg: "#1f2421" },
  ],
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you had to lead a team through a complex challenge. 2. Tell me about a personal or professional challenge where you had to make risk decisions.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case is an acquisition case. You will want to assess the candidate's thought process and how they structure a road map to assess whether or not acquiring the target company is a good strategy for the client.",
          "This case also offers several opportunities to brainstorm. You will push the candidate to brainstorm at several points in the case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Exhibit 1 & Synergy Calculation" },
          { n: "3", text: "Growth Calculation" },
          { n: "4", text: "Synthesis" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** GB should acquire HD. To test this hypothesis, I would like to analyze each of these four parameters, beginning with GB's and HD's market positions first.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Linda's GB should acquire HD",
      children: [
        {
          label: "Donut Market",
          children: [
            { label: "Customers", children: [{ label: "Market Size" }, { label: "Trend" }, { label: "Segments" }, { label: "Sales %" }] },
            { label: "Competition", children: [{ label: "#" }, { label: "Size and penetration" }] },
            { label: "Substitutes", children: [{ label: "Bagels?" }, { label: "Healthy versions?" }] },
          ],
        },
        {
          label: "HD",
          children: [
            {
              label: "Profitability",
              children: [
                { label: "Revenues (PxQ)" },
                { label: "Costs", children: [{ label: "Labor" }, { label: "Stores" }, { label: "Variable" }] },
              ],
            },
            { label: "Market share" },
          ],
        },
        {
          label: "Investment",
          children: [
            { label: "Expected amount needed (valuation)" },
            { label: "NPV" },
            { label: "ROIC" },
            { label: "BE" },
            { label: "Capacity of GB to fund acquisition?", children: [{ label: "Debt" }, { label: "Equity" }] },
          ],
        },
        {
          label: "Fit with GB",
          children: [
            { label: "Management capabilities" },
            { label: "Synergies", children: [{ label: "Growth (revenues)" }, { label: "Efficiency (costs)" }] },
            { label: "Location and operational challenges related to logistics" },
            { label: "Cultural fit" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Allow the candidate to discuss their framework. Probe into some areas to see how the candidate is thinking about the problem. After you have discussed the framework, **provide the candidate with Exhibit 1.**",
      "Ask the candidate, \"where might there be synergies in the acquisition?\"",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1 & Synergy Calculation",
    title: "Exhibit 1 & Synergy Calculation",
    kind: "qa",
    dataTableTitle: "Exhibit 1",
    dataTableCols: "1.8fr 1fr 1fr",
    dataTableHeaders: [
      { v: "", align: "left" },
      { v: "Great Burger", align: "right" },
      { v: "Heavenly Donuts", align: "right" },
    ],
    dataTableRows: [
      head("Stores"),
      row("Total", "5000", "1020"),
      row("North America", "3500", "1000"),
      row("Europe", "1000", "20"),
      row("Asia", "400", "0"),
      row("Other", "100", "0"),
      head("Financials"),
      row("Growth in stores", "10%", "15%"),
      row("Total sales ($m)", "5500", "700"),
      row("Parent revenue ($m)", "1900", "200"),
      head("Cost"),
      row("COGS", "51%", "40%"),
      row("Restaurant operating costs", "24%", "26%"),
      row("Property and equipment", "4.6%", "8.5%"),
      row("Corporate SG&A", "6.3%", "4.9%"),
      head("Profit"),
      row("Sales/store ($m)", "1.1", "0.7"),
      row("Industry average ($m)", "0.9", "0.8"),
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "There is sufficient data for numerous observations. A good interviewer will push the candidate to find at least five. The candidate should communicate the findings in a confident, enthusiastic, and relationship-building manner.",
      "**Revenue synergies:**",
      "  Market coverage - GB covers more market than HD, so it could bring HD into more markets (such as Europe and Asia).",
      "  Based upon its better local business knowledge, GB could more rapidly bring HD into markets and in some geographies even experiment with cross-selling to the customers (i.e. placing the stores right next to each other under one roof).",
      "**Cost savings through economies of scale/scope:**",
      "  Raw material purchasing (volume discount)",
      "  Consolidate property and equipment",
      "  Decrease Corp SG&A",
      "**Improve HD's operation:**",
      "  GB is performing better than industry average while HD's is performing worse than the industry average. GB could transfers its better franchise model and store management to HD to improve HD's performance.",
    ],
  },
  {
    n: "04",
    label: "Growth Calculation",
    title: "Growth Calculation",
    kind: "qa",
    guidancePreLabel: "Additional Question",
    guidancePreLines: ["After discussing synergies, ask the candidate the following:"],
    qText: "What would revenues per store need to be if HD were to double market share in 5 years?",
    answerText:
      "Response:\n- Current revenue = ==$700M==\n- Double current revenue to double market share = ==$1.4B==\n- $1.4B / 1020 stores = ==$1.37M== revenues per store\n- Thus, assuming total market size and number of stores do not change, revenues would need to be ==$1.37M== per store.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidate should immediately look at the above calculation and think about whether it's feasible. You would need to double revenues per store from ==$686.3K== ($700M / 1020 stores) to ==$1.37M== over 5 years. This means that HG would have to grow revenues by around ==15% per year==, so it should be feasible.",
      "  General convention: double in 5 years implies ~15% CAGR.",
      "  Candidate should mention caveats, such as consumers' needs, competitors' response, and GB and HD's ability to attain this per store revenue growth.",
      "**Brainstorming:**",
      "  Push the candidate to list some ideas to promote such growth. This list should be structured.",
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
        paragraphs: ["GB should invest in HD for several reasons:"],
        lines: [
          "Possibility of doubling HG market share in 5 years",
          "Potential growth synergies, specially through geographic expansion",
          "Complementary businesses that can improve revenues for both businesses",
          "HD revenue per store can be optimized based on GB",
        ],
      },
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "Donuts not an attractive food option in expansion markets, trouble generating demand",
              "Cultural mismatch",
              "New entrants and market trends – healthier options?",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Other due diligence GB might need to do:",
              "  Physically visit HD locations analyzing consumer demand",
              "  Perform market analysis",
              "  Customer surveys",
              "Perform valuation of HD (get to know investment needed), study financing options (debt and equity), and learn about culture of HD to ensure it is a fit",
              "Market analysis to better understand competitors and substitute availability",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Other areas you can develop with the candidate involve company cultures and management issues. They are not beyond the scope of the case, but we leave it to the interviewer to be creative in making them up.",
      "After this discussion, ask the candidate for a final recommendation based on their findings.",
      "**Evaluation**",
      "  This case definitely tests a candidate's interpersonal skills and creative thinking. In discussing the case afterwards, remind the candidate that getting ready for a case interview is as much about learning to be a good interviewee (i.e. practicing relationship building and creativity skills) as anything else.",
    ],
  },
];
