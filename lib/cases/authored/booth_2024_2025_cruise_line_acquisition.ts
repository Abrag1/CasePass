import type { CasePage } from "../content";

export const CASE_ID = "32b598c3-5636-4759-8c04-b36f52baa54e";

const PROMPT =
  "Our client is FunCruiseLines, a major cruise line headquartered in the United States. They are currently considering acquiring a new, luxury cruise line, FSC (Fancy Small Cruises). Before doing so, they would like to determine if there is room to increase profitability of FSC.\n\nThey have asked us to come to a meeting with their CFO and tell them if we think this can be done.\n\nHow should we structure this case?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A major U.S. cruise line is considering acquiring a luxury cruise line and wants to know whether there is room to increase the target's profitability. Structure the problem, analyze unit costs against competitors and the parent, and recommend whether to proceed.",
  full_prompt: PROMPT,
  tags: ["candidate-driven", "profitability", "travel", "chart-reading", "brainstorming"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a conflict that you have had in the workplace. 2. Tell me about your most rewarding accomplishment.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "The primary objective is to determine if it is feasible to increase profitability of the acquisition target. The goal is to move from 10% to 40% EBITDA. Do not disclose target unless asked.",
          "This is a straightforward profitability case that is good practice for the candidate to drive the case forward. Not much guidance should be necessary.",
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
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Will FunCruiseLines be able to increase profits?",
          children: [
            {
              label: "Expected Revenues per passenger per day",
              children: [{ label: "Ticket Sales" }, { label: "Excursions" }, { label: "Casino" }, { label: "Beverage" }],
            },
            {
              label: "Expected costs",
              children: [
                { label: "Fixed – corporate salaries, office rent, shipboard salaries, fuel, port docking fees" },
                { label: "Variable –food & beverage, excursion costs" },
              ],
            },
          ],
        },
        {
          label: "Will efforts to increase profits be successful?",
          children: [
            {
              label: "Primary competitors",
              children: [
                { label: "What is their profitability?" },
                { label: "Will they respond?" },
                { label: "Will efforts to reduce costs make us less competitive?" },
              ],
            },
            {
              label: "Execution",
              children: [
                { label: "What timeframe is needed to execute?" },
                { label: "Will any capital investments be needed to reduce operating costs?" },
              ],
            },
          ],
        },
      ],
    },
    infoBoxLabel: "Framework",
    infoSections: [{ paragraphs: ["**Working hypothesis:** FunCruiseLines will be able to increase profitability of FSC."] }],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidates will take a variety of approaches to structuring an approach to this question. The primary things to look for are:",
      "**Did the candidate state a hypothesis?**",
      "  The candidate should express the core idea that they would like to test through their analysis. They should clearly demonstrate how the questions they’re asking are directed at answering the specific question of whether FunCruiseLines should acquire FSC.",
      "  It’s less important for the hypothesis to be backed up with evidence, since it’s so early in the case (though strong candidates will draw on their own knowledge and intuitions to develop preliminary insights about the potential for this acquisition).",
      "**Is profitability the primary consideration?**",
      "  The prompt is very clear that profitability is the deciding factor for management. It’s OK for candidates to discuss other considerations, but their primary focus should be on profitability.",
      "**Is the framework case-specific?**",
      "  Excellent frameworks will explore specific aspects of the Cruise Line market and overall economic environment (e.g., COVID-19), rather than just generic ideas about profitability.",
    ],
  },
  {
    n: "03",
    label: "Revenue & Cost information",
    title: "Revenue & Cost information",
    kind: "qa",
    infoBoxLabel: "Revenue & Cost information",
    infoSections: [
      {
        label: "Revenues",
        paragraphs: [
          "This case will be focused on costs, not revenues. While a great candidate will be able to list out expected revenue categories, they should be educated that FSC is an all-inclusive line, with revenues of $1,000 per APCD (Available Passenger Cruise Day - this is a “unit revenue” for the Cruise Line industry). Gaming (casino) revenues can be ignored.",
        ],
      },
      {
        label: "Costs",
        paragraphs: [
          "**Provide** the candidate with exhibits 1 + 2 as requested. The candidate should be able to make assumptions on which cost categories should align with competitors (e.g., food) and which can align to the parent company. These are listed below. Provide guidance as needed, but ensure candidate explains their rationale for their choices.",
        ],
      },
      {
        label: "Cost alignment",
        groups: [
          {
            heading: "Align to parent company",
            items: [
              "Office rent",
              "Fuel cost / barrel",
              "  Candidate should recognize this will not align on an APCD basis due to fewer passengers on board, however candidate should recognize the 10% cost reduction and apply accordingly",
              "Shipboard salaries",
              "Corporate salaries",
            ],
          },
          {
            heading: "Align to competitors",
            items: [
              "Port docking fees – align to competitors because destinations are more luxurious than FunCruiseLines",
              "Food & beverage",
              "Excursions",
            ],
          },
        ],
      },
      {
        label: "Continued",
        paragraphs: ["The candidate should calculate totals for FSC, FunCruiseLines, and competition, as well as new costs to FSC after alignment."],
      },
      {
        label: "Costs",
        lines: ["FSC (pre): ==$900/APCD==", "FSC (post): ==$650/APCD==", "FunCruiseLines: ==$200/APCD==", "Competitor Avg: ==$660/APCD=="],
      },
      {
        label: "Itemized costs",
        lines: [
          "Corporate salaries: $10/APCD – align to parent",
          "Office rent: $5/APCD – align to parent",
          "Fuel cost: $45/APCD – apply 10% discount to align to parent $/bbl",
          "Shipboard salaries: $220/APCD – align to competition",
          "Port docking fees: $50/APCD – align to competition",
          "Food & beverage: $100/APCD – align to competition",
          "Excursions: $220/APCD – align to competition",
          "Total: ==$650/APCD==",
        ],
      },
      {
        paragraphs: [
          "The candidate should note the stark difference between FSC and the parent company, however, this is not an issue as the parent company is a very different business (>2,000 passengers / ship).",
          "The candidate should also note that this does not meet the margin requirements the parent company was interested in. The candidate can then be asked to **brainstorm** to come up with the idea of increasing the number of passengers / ship.",
        ],
      },
    ],
    axisBarTitle: "Exhibit #1: Costs per APCD",
    axisBarSeries: [
      { name: "FSC", color: "#f4cccc" },
      { name: "FunCruiseLines", color: "#e84432" },
      { name: "Competitor Avg.", color: "#666666" },
    ],
    axisBarGroups: [
      { label: "Corporate\nSalaries", values: [100, 10, 20] },
      { label: "Office Rent", values: [100, 5, 10] },
      { label: "Fuel Cost", values: [50, 20, 40] },
      { label: "Shipboard\nSalaries", values: [250, 75, 220] },
      { label: "Port\nDocking\nFees", values: [50, 20, 50] },
      { label: "Food & Bev", values: [100, 50, 100] },
      { label: "Excursions", values: [250, 20, 220] },
    ],
    axisBarYMax: 250,
    axisBarYStep: 50,
    axisBarValueLabels: true,
    axisBarNoGrid: true,
    axisBarInnerTitle: "Cost per APCD",
    axisBarLegendTopLeft: true,
    axisBarLabelsAbove: true,
    colBarTitle: "Exhibit #2: Fuel costs / bbl",
    colBarItems: [
      { label: "", value: 0, color: "transparent", valueLabel: "" },
      { label: "", value: 36, color: "#1a1a1a", pattern: "dots" },
      { label: "", value: 40, color: "#b3b3b3" },
      { label: "", value: 0, color: "transparent", valueLabel: "" },
    ],
    colBarBarRatio: 1,
    colBarLegend: [
      { name: "FunCruiseLines", color: "#1a1a1a", pattern: "dots" },
      { name: "FSC", color: "#b3b3b3" },
    ],
    colBarYMax: 44,
    colBarYStep: 44,
    colBarYTickLabels: ["", ""],
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    colBarNoYAxis: true,
    colBarXTitle: "Cost / bbl",
    nextStepText: "At this point, present the candidate with exhibit 3.",
  },
  {
    n: "04",
    label: "Passenger density",
    title: "Passenger density",
    kind: "qa",
    infoBoxLabel: "Passenger density",
    infoSections: [
      {
        paragraphs: ["Once presented with exhibit 3, the candidate should recognize that only fixed costs will be adjusted, and that costs will be reduced 20%."],
      },
      {
        label: "New costs",
        lines: [
          "Corporate salaries: $8/APCD",
          "Office rent: $4/APCD",
          "Fuel cost: $36/APCD",
          "Shipboard salaries: $176/APCD",
          "Port docking fees: $40/APCD",
          "Food & beverage: $100/APCD",
          "Excursions: $220/APCD",
          "Total: ==$584/APCD==",
        ],
      },
    ],
    colBarTitle: "Exhibit #3: Survey results",
    colBarItems: [
      { label: "", value: 0, color: "transparent", valueLabel: "" },
      { label: "", value: 800, color: "#b3b3b3" },
      { label: "", value: 1000, color: "#000000" },
      { label: "", value: 0, color: "transparent", valueLabel: "" },
    ],
    colBarBarRatio: 1,
    colBarLegend: [
      { name: "FSC (Current)", color: "#b3b3b3" },
      { name: "Acceptable to Customers", color: "#000000" },
    ],
    colBarYMax: 1100,
    colBarYStep: 1100,
    colBarYTickLabels: ["", ""],
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    colBarNoYAxis: true,
    colBarXTitle: "Passengers / ship",
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        lines: [
          "Candidate should deliver the recommendation that the client should move forward with the acquisition as they can reach their EBITDA target of ==40%+==",
        ],
      },
      {
        label: "Risks & Next Steps",
        lines: [
          "Candidate should recognize that reduced costs may reduce the customer experience, follow up with customer survey",
          "Candidate should recognize risks with combining corporate offices to ensure that the parent company can market & meet needs of luxury customers, follow up with staff survey and / or training",
        ],
      },
    ],
  },
];
