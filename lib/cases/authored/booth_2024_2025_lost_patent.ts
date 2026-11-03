import type { CasePage } from "../content";

export const CASE_ID = "6577495b-e57f-4202-b150-023b694f3ff2";

const PROMPT =
  "Your team has been working with a major drug company on their future strategy. Their patent on a blockbuster drug, Zewal, will run out in less than a year. It currently generates half of their revenues, while 10 other drugs generate the other half of revenues. Their next blockbuster drug is still more than 5 years away from being ready and mergers are not possible. How can we help the company?";

export const CASE_META = {
  review: "auto",
  case_type: "Revenue",
  synopsis:
    "A drug company's patent on its blockbuster drug will run out in less than a year, and the next blockbuster is more than five years away. Work out how to help the company with its future strategy.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "revenue", "light-math", "brainstorming", "healthcare"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time where you had to make a decision based on incomplete information. How did you do it? 2. How do you see yourself becoming involved in the culture / various initiatives of this Firm?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case tests the candidate's business acumen as they should understand why cost savings are not likely and focus on revenues instead. This case is also very open-ended and not focused on quantitative problem-solving; it would likely be paired with a heavy quant case.",
        ],
      },
      {
        label: "Additional information (to provide in discussion with candidate):",
        paragraphs: [
          "The company is efficient and well-run. In fact, they have been cutting costs for the last few years and they are competitive with industry standards.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Brainstorming" },
          { n: "3", text: "Discussion/Q&A" },
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
          "**Working hypothesis:** Since costs are not an issue, I would like to focus first on ways to maximize revenue from Zewal before its patent expires. Then, I would like to consider any marketing and salesforce changes necessary to support sales increases. Therefore, it would be nice if we had information on how we currently sell Zewal.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Drug Market",
          children: [
            { label: "End user: our drug effectiveness, rate of disease it treats" },
            {
              label: "Competitors",
              children: [
                { label: "Strategic position in the market" },
                { label: "Salesforce positioning" },
                { label: "Their drug effectiveness" },
                { label: "Substitutes (generics)" },
              ],
            },
          ],
        },
        {
          label: "Profit Maximization",
          children: [
            {
              label: "Revenues",
              children: [
                {
                  label: "Increase sales volumes for drug before and after patent expires",
                  children: [
                    { label: "Identify potential new customers (doctors, hospitals, etc.)" },
                    { label: "Identify potential new channels for POS (drug stores / pharmacies)" },
                    { label: "Create own generic knock-off (cannibalize self)" },
                  ],
                },
                { label: "Increase sales volumes for other 10 drugs" },
              ],
            },
            {
              label: "Costs",
              children: [{ label: "Industry standards and relative positioning" }],
            },
          ],
        },
        {
          label: "Drug Company",
          children: [
            {
              label: "Evaluate salesforce effectiveness",
              children: [
                { label: "# of employees relative to industry" },
                {
                  label: "Compensation structure & company policies for Zewal sales",
                  children: [{ label: "Re-incentivize to sell other company drugs as Zewal patent expiration nears" }],
                },
              ],
            },
            {
              label: "Advertising growth",
              children: [{ label: "Targeted marketing programs" }],
            },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The prompt is intentionally vague. The candidate should seek to clarify what is meant by “help the company”. The candidate should also recognize this is not a cost-cutting case. If they push on this subject, let them know this is a well-established firm that has been cutting costs for several years.",
      "The candidate should seek additional information on each of these sections in their framework to drive towards a recommendation. Ask questions to probe for more information and logic (see next page for questions).",
      "  Customer",
      "  Competition",
      "  Company",
      "The structure for this case is very open-ended. A good candidate will have developed a structure which includes each of the areas above and more.",
      "The candidate should recognize that acquisitions are not possible (given in the prompt), so the interviewer should redirect them if they attempt to pursue this option.",
    ],
  },
  {
    n: "03",
    label: "Analysis 1 - Sales Revenue",
    title: "Analysis 1 - Sales Revenue",
    kind: "qa",
    qText: "Ask the candidate to identify ways to increase sales of their drugs.",
    guidancePreLabel: "Provide when asked",
    guidancePreLines: [
      "Customer demographics are as follows (provide to the candidate if asked):",
      "  Salesforce mainly sells to doctors.",
      "  20% of all doctors make up 80% of prescriptions.",
      "  They consistently keep in touch with major HMOs.",
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: ["Potential answers include the following:", "  Increased samples to doctors.", "  Expansion of coverage networks."],
  },
  {
    n: "04",
    label: "Analysis 2 - Sales & Marketing Efforts",
    title: "Analysis 2 - Sales & Marketing Efforts",
    kind: "qa",
    qText: "How many sales personnel should be added?",
    guidancePreLabel: "Provide when asked",
    guidancePreLines: [
      "Salesforce demographics are as follows (provide to the candidate if asked):",
      "  Dedicated salesforce of 150 people. On average a sales person is responsible for 100 doctors.",
      "  The industry standard is one per 50 doctors.",
      "  The rival company has the advantage of a bigger salesforce which can reach out to 35% of all doctors in the U.S.",
      "    Our client’s reach is about 10%.",
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Potential answers include the following:",
      "  The candidate should consider the cost of hiring versus the benefit; they should stop adding when the marginal cost > marginal revenue.",
      "  Optional: ask the candidate to sketch this graphically with basic (no numbers) marginal revenue and marginal cost curves",
    ],
  },
  {
    n: "05",
    label: "Analysis 3",
    title: "Analysis 3",
    kind: "qa",
    qText: "How would changes in the compensation structure affect sales?",
    guidancePreLabel: "Provide when asked",
    guidancePreLines: [
      "Provide to the candidate if asked:",
      "  The sales person’s compensation structure is dependent on the contribution margin of the drugs they sell. Each sales person has a portfolio of drugs with varying margins.",
      "  The contribution margin for Zewal is the lowest. So far this strategy has worked as there is more pull for the drug than push required from the sales people.",
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Potential answers include the following:",
      "  The candidate should walk through the potential benefits from increased sales with the risk of increased costs.",
    ],
  },
  {
    n: "06",
    label: "Analysis 4",
    title: "Analysis 4",
    kind: "qa",
    qText: "What are some potential ways to improve advertising given competitor’s positions?",
    guidancePreLabel: "Provide when asked",
    guidancePreLines: [
      "Competition is as follows (provide to the candidate if asked):",
      "  There is presently no single drug that has a similar chemical composition as Zewal, but doctors have been trying out a combination of drug regimen from a rival company.",
      "  When the patent expires, our client will get about 6 months before generic drug companies come up in the market.",
    ],
  },
  {
    n: "07",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: ["The drug company should:"],
        lines: [
          "In the current year before the drug expires our client should seek to maximize potential revenue by:",
          "  Expanding their sales & marketing department (MR> MC)",
          "  Improving advertising to bolster sales to doctors",
          "Our client should also seek to improve their position after the patent expires by:",
          "  Attempting to patent a specific dosage size",
          "  Maximizing sales effort through direct-to-customer marketing",
          "  Consider revising the salesforce compensation structure for the drug",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Competitors could develop a generic drug faster than expected, reducing potential revenues",
              "Increasing the salesforce and changing the compensation structure could generate more costs than expected, thus reducing profitability",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Analyze capabilities of competitors and determine if we can create contracts with high-potential doctors and hospitals to be their only supplier of Zewal",
              "Carefully monitor costs of new sales and marketing programs and incentives structure",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "There is no “right” or “wrong” answer. Candidate should show business judgment when evaluating revenue vs. cost strategies.",
      "Excellent candidates will:",
      "  Quickly recognize that this is a not cost-reduction case, as they are a well-established company that has been cutting costs for years.",
      "  Identify multiple possibilities to increase revenues both before the patent expires and after.",
    ],
  },
];
