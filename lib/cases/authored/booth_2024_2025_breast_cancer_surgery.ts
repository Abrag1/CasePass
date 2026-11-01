import type { CasePage } from "../content";

export const CASE_ID = "e1c35d07-546d-41cd-aae5-a874b17d0abf";

export const CASE_META = {
  case_type: "Profitability",
  synopsis:
    "A medical device company has developed a new device for breast conservation surgeries and wants a revenue maximizing pricing strategy for the United States.",
  full_prompt:
    "Our client is a large medical device corporation. They have developed a new medical device to assist surgeons in breast conservation surgeries (BCS). They've approached us to determine a revenue maximizing pricing strategy for the device.\n\nA breast conservation surgery is the partial removal of breast tissue found to be cancerous. This is in contrast to a mastectomy, which removes the entire breast. While hopefully this device will be adopted worldwide, at the moment, the client would like us to determine the pricing strategy for the product in the United States only.",
  tags: ["candidate-driven", "pricing", "light-math", "revenue-maximizing", "exhibit"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client is a large medical device corporation. They have developed a new medical device to assist surgeons in breast conservation surgeries (BCS). They've approached us to determine a revenue maximizing pricing strategy for the device.\n\nA breast conservation surgery is the partial removal of breast tissue found to be cancerous. This is in contrast to a mastectomy, which removes the entire breast. While hopefully this device will be adopted worldwide, at the moment, the client would like us to determine the pricing strategy for the product in the United States only.",
    note: "**Fit Questions** — 1. Tell me about a time you navigated ambiguity in the workplace. 2. Tell me about a time you demonstrated initiative.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a **candidate driven** case. Provide the candidate with additional information **only when asked**. The candidate should understand that to assess the profitability of this device, they will have to **size the market** as well as measure the **willingness to pay** for the device.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Analysis of Market potential" },
          { n: "3", text: "Analysis of Revenue potential" },
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
    // One section for the whole framework phase. The facts to give when asked sit in their own
    // box ABOVE the framework, so the framework box can be shared with the candidate on its own.
    guidancePreLabel: "Provide when asked",
    guidancePreIntro:
      "The candidate should walk the interviewer through the framework and ask further questions to understand the market and revenue potential. Provide this information **when asked**:",
    guidancePreLines: [
      "There are around ==100,000== breast conservation surgeries per year.",
      "The device is applicable across a wide range of procedures: it can be used in every breast conservation surgery.",
      "The device is disposable, so every surgery needs a new device.",
      "The device is FDA approved.",
      "There are no concerns related to quality from R&D.",
      "The success rate of the device is 100%.",
      "Currently there are no competitors, and the device would be the only product of this kind available on the market.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: ["The candidate should develop a framework that considers the following drivers:"],
      },
      {
        label: "Med Device Market Potential",
        groups: [
          {
            heading: "Patient",
            items: [
              "Market size: Number of breast conservation surgeries conducted per year (demand)",
              "Growth trend: Frequency rate of breast cancer in population",
            ],
          },
        ],
      },
      {
        label: "Revenue Potential",
        lines: [
          "Provider/Clinician Adoption rate: willingness of clinicians to adopt the device at different price points",
          "Med Device Co. relationship with clinicians: supplier contracts, trust",
          "Insurance companies willingness to cover device cost as part of surgery",
        ],
      },
      {
        label: "BCS Device",
        groups: [
          { heading: "Degree of Innovation (availability of substitutes)", items: [] },
          {
            heading: "Main features",
            items: [
              "Device applicability / usability across  variety of breast conservation surgeries",
              "Success/complication  rate",
              "Useful life, quality",
            ],
          },
          { heading: "Compliance to regulations (FDA)", items: ["Patent"] },
        ],
      },
      {
        paragraphs: [
          "**Transition statement:** I would like to begin by better understanding a clinician's adoption of the new device. It would be great if we had data on their willingness to adopt the device at various price points.",
        ],
      },
    ],
    nextStepText:
      "At this point, the candidate should know that the market potential for the device is ==100,000 surgeries per year==. The candidate should then inquire if we know anything about a clinician's willingness to pay for the device. **Show Exhibit 1.**",
  },
  {
    n: "03",
    label: "Exhibit 1: Adoption",
    title: "Exhibit 1: Adoption",
    kind: "qa",
    // The exhibit, the revenue calculation it feeds, the recommended price and the conclusion
    // guidance are one analysis phase, so they are one section.
    // Scatter plot of four unconnected points, as printed: Y 0-100 by 10, X 0-1,000 by 100, no gridlines.
    scatterTitle: "Clinician Adoption of Device By Potential Price Point",
    scatterPoints: [
      { x: 0, y: 90 },
      { x: 300, y: 75 },
      { x: 600, y: 50 },
      { x: 1000, y: 10 },
    ],
    scatterXMax: 1000,
    scatterXStep: 100,
    scatterXLabel: "Price Per Medical Device",
    scatterYMax: 100,
    scatterYStep: 10,
    scatterYLabel: "Percent of\nSurgeries",
    calcNote:
      "In order to understand the willingness to pay of clinicians, the candidate should calculate the revenue at each price point tested during the market research.",
    calcTable: {
      headers: ["Market Potential", "Price / Device", "Willingness to Adopt (%)", "Potential Revenue"],
      rows: [
        ["100,000", "$0", "90%", "$0"],
        ["100,000", "$300", "75%", "$22.5M"],
        ["100,000", "$600", "50%", "$30.0M"],
        ["100,000", "$1000", "10%", "$10.0M"],
      ],
    },
    answerText:
      "- The client should market the device at a price of ==$600== per unit\n- This price allows the client to maximize the revenue potential given the current willingness to adopt",
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "The candidate should conclude that the device price that allows the client to achieve maximum potential revenues is ==$600==. The candidate should also conclude that greater adoption across surgeries does not necessarily lead to greater revenues, since the benefit of higher adoption may be outweighed by a lower price point.",
      "A **strong candidate** will identify that the revenue maximizing price may not be optimal in terms of profits.",
    ],
  },
  {
    n: "04",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    // The casebook prints this as ONE sentence (lead-in + question), so it stays one line, in order.
    qText: "After the candidate has identified the optimal pricing strategy of ==$600/unit==, **ask** \"How would you tailor a marketing strategy to ensure you reach 50% adoption?\"",
    infoBoxLabel: "Brainstorm",
    infoSections: [
      {
        label: "Potential Answer",
        lines: [
          "Leverage existing sales relationship with general practitioners and specialty doctors",
          "Target large hospital networks",
          "Ads (TV, Social Media, Specialty Websites)",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Risks and Next Steps",
    title: "Risks and Next Steps",
    kind: "qa",
    infoBoxLabel: "Risks and Next Steps",
    infoSections: [
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "Competitors might replicate the device and enter the market",
              "The revenue maximizing price might not be the profit maximizing one",
            ],
          },
          {
            heading: "Next steps",
            items: [
              "Raise the barriers to entry by patenting the product and signing exclusivity agreements with clinicians",
              "Move forward with the analysis including the costs to find the profit maximizing price",
            ],
          },
        ],
      },
    ],
  },
];
