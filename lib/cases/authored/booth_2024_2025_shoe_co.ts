import type { CasePage } from "../content";

export const CASE_ID = "6ff63991-afc5-4294-8d32-c53924c6ebfa";

const PROMPT =
  "Our client, Shoe Co., is a small affordable luxury shoe retailer, branded as classic and fun. The average shoe sells at a price point of $300 per pair.\n\nUnfortunately, our client is facing a recent decline in the volume of same store sales despite the growth of same store sales for competitors. Our client hired us to understand the root cause of the client's same store sales decline?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A small affordable luxury shoe retailer is losing same store sales while competitors grow. Work through consumer survey exhibits to find the root cause and size the benefit of a fix.",
  full_prompt: PROMPT,
  tags: ["candidate-driven", "market-entry", "root-cause", "exhibit-heavy", "brainstorming"],
};

const YEL = "#ffe800";
const LBL = "#99ccff";
const DBL = "#0055d4";
const ORG = "#ff5000";
const GRY = "#999999";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a situation where you dealt with ambiguity? 2. Tell me about a time where you were required to motivate a diverse team?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a straightforward market entry case that is good practice for the candidate to drive the case forward. Not much guidance should be necessary.",
          "Volume of sales can be understood as the average number of transactions within the store.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Profitability analysis" },
          { n: "3", text: "Brainstorm" },
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
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** Shoe Co. is likely facing a decline in sames store sales due to a misalignment with customer trends given that competitor growth indicates it is not an industry wide trend.",
          "Framework should focus on drivers of same store sales including:",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Market Dynamics",
          children: [{ label: "geographic considerations" }, { label: "industry wide trends" }],
        },
        {
          label: "Customers",
          children: [
            { label: "Customer trend information and preference" },
            { label: "Where are customers falling out of the pipeline (coming to the store, checking out?, returns?" },
          ],
        },
        {
          label: "Competitors",
          children: [
            { label: "Competitor price points" },
            { label: "competitor customer demographic" },
            { label: "Competitor product differentiation" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidates will take a variety of approaches to structuring an approach to this question. The primary things to look for are:",
      "Did the candidate state a **hypothesis**?",
      "  The candidate should express the core idea that they would like to test through their analysis. They should clearly demonstrate how the questions they're asking are directed at answering the specific question of what is the driver of Shoe Co's decline in same store sales",
      "  It's less important for the hypothesis to be backed up with evidence, since it's so early in the case (though strong candidates will draw on their own knowledge and intuitions)",
      "Is the identification of the **root cause**  the primary consideration?",
      "  The prompt is very clear that same store sales are declining and the client wants to know the root cause.",
      "Is the framework **case-specific**?",
      "  Excellent frameworks will explore specific aspects of the luxury shoe market and overall competitive environment .",
      "Candidate should ask for information about either the competitors or customers, if they ask about the competitors **steer** them towards the customer information.",
    ],
  },
  {
    n: "03",
    label: "Exhibit #1: Consumer Survey Results",
    title: "Consumer Survey Results",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        title: "Percentage of respondents",
        panels: [
          {
            yMax: 100,
            yStep: 20,
            yTickSuffix: "",
            topLabel: "100%",
            columns: [
              { label: "Familiarity (spend)", segs: [{ value: 70, color: YEL, label: "Aware of Shoe Co" }, { value: 30, color: LBL, label: "Not aware of Shoe Co" }] },
              { label: "Purchase Shoe Co", segs: [{ value: 80, color: YEL, label: "Do not purchase" }, { value: 20, color: LBL, label: "Purchase" }] },
              {
                label: "Reason for not purchasing",
                segs: [
                  { value: 35, color: LBL, label: "Not my style" },
                  { value: 25, color: DBL, label: "Store issues" },
                  { value: 25, color: DBL, label: "Product issues" },
                  { value: 15, color: DBL, label: "Price too high" },
                ],
              },
            ],
            connectors: [
              { from: { col: 0, at: 70 }, to: { col: 1, at: 100 } },
              { from: { col: 1, at: 80 }, to: { col: 2, at: 100 } },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Exhibits",
    guidanceLines: [
      "**Exhibit 1:**",
      "  Candidate should note that Shoe Co. has a ==70%== consumer awareness",
      "  But only a ==~20%== conversion rate to purchase",
      "A strong candidate will ask for further information on this low conversion rate and if this is a recent or ongoing trend?",
    ],
  },
  {
    n: "04",
    label: "Exhibit #2: Consumer Survey Results",
    title: "Consumer Survey Results",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        title: "Percentage of responses\n(all recent Shoe Co purchasers)",
        legend: [
          { name: "Design driven\n(~75%)", color: ORG },
          { name: "Quality driven\n(~25%)", color: GRY },
        ],
        legendPlacement: "topRight",
        panels: [
          {
            yMax: 100,
            yStep: 20,
            topLabel: "100%",
            columns: [
              {
                label: "Spending change over last three years",
                segs: [
                  { value: 40, color: LBL, label: "Increased" },
                  { value: 30, color: LBL, label: "Stayed the same" },
                  { value: 30, color: YEL, label: "Decreased" },
                ],
              },
              {
                label: "Reason for decrease",
                segs: [
                  { value: 40, color: YEL, label: "Reduction in product purchases" },
                  { value: 20, color: LBL, label: "Store dissatisfaction" },
                  { value: 20, color: LBL, label: "Less income" },
                  { value: 10, color: LBL, label: "Not my style" },
                  { value: 10, color: LBL, label: "Prices too high" },
                ],
              },
              {
                label: "Reason for reduced purchases",
                segs: [
                  { value: 35, color: ORG, label: "My style has changed" },
                  { value: 30, color: ORG, label: "Design does not update" },
                  { value: 25, color: GRY, label: "Value for money" },
                  { value: 5, color: GRY, label: "Lower quality than I desire" },
                  { value: 5, color: ORG, label: "Missed a key trend" },
                ],
              },
            ],
            connectors: [
              { from: { col: 0, at: 100 }, to: { col: 1, at: 100 } },
              { from: { col: 0, at: 70 }, to: { col: 1, at: 0 } },
              { from: { col: 1, at: 40 }, to: { col: 2, at: 100 } },
              { from: { col: 1, at: 0 }, to: { col: 2, at: 0 } },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Exhibits",
    guidanceLines: [
      "**Exhibit 2:**",
      "  Candidate should note that this is a persistent trend that is due to a decrease in volume of purchases",
      "  Candidate should see that ==~30%== (75% of 40%) decreased purchases for design reasons",
      "Candidate should ask if there is more information around the product design",
    ],
  },
  {
    n: "05",
    label: "Exhibit #3: Consumer Survey Results",
    title: "Consumer Survey Results",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        title: "Percentage of responses",
        panels: [
          {
            yMax: 100,
            yStep: 20,
            topLabel: "100%",
            columns: [
              {
                label: "Familiarity with Shoe Co",
                segs: [
                  { value: 55, color: LBL, label: "Not familiar" },
                  { value: 40, color: YEL, label: "Familiar but don't buy" },
                  { value: 5, color: LBL, label: "Purchase" },
                ],
              },
              {
                label: "Reasons for not purchasing",
                segs: [
                  { value: 20, color: LBL, label: "Store" },
                  { value: 40, color: YEL, label: "Product" },
                  { value: 25, color: LBL, label: "Pricing" },
                  { value: 15, color: LBL, label: "Not my style" },
                ],
              },
              {
                label: "Product drivers",
                segs: [
                  { value: 79, color: YEL, label: "Product specific" },
                  { value: 10.6, color: YEL, label: "Design" },
                  { value: 10.4, color: LBL, label: "Quality" },
                ],
              },
            ],
            connectors: [
              { from: { col: 0, at: 95 }, to: { col: 1, at: 100 } },
              { from: { col: 0, at: 55 }, to: { col: 1, at: 0 } },
              { from: { col: 1, at: 60 }, to: { col: 2, at: 100 } },
              { from: { col: 1, at: 20 }, to: { col: 2, at: 0 } },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Exhibits",
    guidanceLines: [
      "**Exhibit 3:**",
      "  Candidate should note that ==40%== of those familiar with Shoe Co. do not buy because of product issue",
      "  The wrong product assortment is keeping customers away",
    ],
  },
  {
    n: "06",
    label: "Math",
    title: "Math",
    kind: "qa",
    guidancePreLabel: "Share when the candidate reaches the conclusion",
    guidancePreIntro: "Once candidate reaches the above conclusion, **share** the following information:",
    guidancePreLines: [
      "Shoe Co spends significantly less in design compared to other competitors in the market.",
      "Industry benchmarks is 8% of sales, Shoe Co is currently at 6.5%",
      "Shoe Co has sales of $800M and Gross Margin % of 40%",
      "Bain Retail Expert expects that \"...getting the assortment right can be worth between 5-10% in sales lift for the average retailer.\"",
    ],
    qText: "What would the expected gross margin lift be with an increase in design spend?",
    calcNote:
      "The candidate should calculate totals for FSC, FunCruiseLines, and competition, as well as new costs to FSC after alignment.",
    calcLines: [
      { q: "Design Spend Increase:", a: "" },
      { q: "Increase in design spend as % of sales", a: "8% - 6.5% = ==1.5%==" },
      { q: "Required increase in design spend", a: "$800*1.5% = ==$12M==" },
      { q: "Expected Gross Margin Lift costs:", a: "" },
      { q: "Expected sales lift", a: "$800*5%= ==$40M==" },
      { q: "Gross Margin", a: "$40M *40% = ==16M==" },
      { q: "Expected Lift", a: "$16M - $12M = ==$4M==" },
    ],
  },
  {
    n: "07",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "What other quantitative or qualitative questions would you want to consider if you were Shoe Co?",
    infoBoxLabel: "Brainstorm",
    infoSections: [
      {
        label: "Qualitative",
        lines: [
          "Investing in-house versus outsourcing design - is this a capability that Shoe Co should have internally?",
          "Scale of investment - given Shoe Co's small size, will this investment based on % of sales be big enough to be meaningful?  Is there a minimum dollar threshold above which they must invest to reap benefits?",
        ],
      },
      {
        label: "Quantitative",
        lines: ["Ramp-up costs (i.e. hiring designers, expanding facilities)", "Payback period", "NPV"],
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
        lines: [
          "Candidate should deliver the recommendation that Shoe Co should increase their product design spend to better serve customer tastes and lift their gross margin by ==$4M==.",
        ],
      },
      {
        label: "Risks & Next Steps",
        lines: [
          "Candidate should recognize some risks associated with the recommendation including that the recommendation might have a longer timeline that client would prefer",
          "Next steps should align with the risks or recommendation noted, such as a launching a consumer survey to better understand their design preferences going forward",
        ],
      },
    ],
  },
];
