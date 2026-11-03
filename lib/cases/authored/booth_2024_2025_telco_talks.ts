import type { CasePage } from "../content";

export const CASE_ID = "c7bc2102-fcf3-4d09-a257-c3ea6bae8c19";

const PROMPT =
  "Our client is a large telecom company that operates in the Midwestern region. They focus on providing 3 primary services: phone, TV, and internet. They have already taken several cost cutting initiatives, and now are currently exploring new growth opportunities. They’ve been approached by another telecom company (WIT Co) to purchase WIT Co’s assets and customer base, which would transform our client from a regional player to a national player.\n\nOur client therefore has asked us whether or not they should proceed with purchasing WIT Co’s assets.";

export const CASE_META = {
  review: "auto",
  case_type: "Mergers & Acquisitions",
  synopsis:
    "A Midwestern telecom company has been approached to buy another telecom company's assets and customer base, which would make it a national player. Decide whether the client should proceed with the purchase.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "mergers-acquisitions", "synergies", "brainstorming", "medium-math"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 400) => ({ v, align: "left" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. What do you want me to know about you? 2. Describe your dream project at X Firm.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case focuses on a candidates ability to determine the marginal increase in profitability based on purchasing assets of another company. Additionally, it poses the question of whether or not entering on a national level is worthwhile, or if they should continue to stay in their market where they have been very profitable.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Data sheet discussion" },
          { n: "2", text: "Questions 1-4" },
          { n: "3", text: "Brainstorming" },
          { n: "4", text: "Recommendation" },
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
      "The candidate should write out a complete framework. If asked, the following information can be provided before the candidate structures their thoughts.",
    guidancePreLines: [
      "**Company**",
      "  Goal is to grow while maintaining margins on customer basis.",
      "  Background: assets are concentrated in 3 states - CA, NY, FL.",
      "**Customers**",
      "  Are both residential and business.",
      "After candidate completes the discussion of their framework, the candidate should drive toward inquiring about the financial position of the client and acquisition target. If not, make sure to provide to the information below to the candidate before moving on to Question 1.",
      "**Current Client**",
      "  Revenue of $8.5B",
      "  Costs of $7.5B",
      "  5M customers",
      "**WIT Co (acquisition target)**",
      "  Revenue of $5B",
      "  Costs of $4.55B",
      "  3.6M customers",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** I believe that the client should purchase WIT Co’s assets given the following considerations.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "WIT Co is healthy",
          children: [
            { label: "Profitability", children: [{ label: "Revenue and Costs" }] },
            { label: "Size, growth", children: [{ label: "Access to more national customer base" }] },
            { label: "Market position" },
            {
              label: "New capabilities",
              children: [{ label: "Better tech, faster speeds, reliability (phone, TV, and internet)" }],
            },
          ],
        },
        {
          label: "Purchase is financially positive",
          children: [
            { label: "Cost of acquisition" },
            { label: "Cost-benefit analysis for client", children: [{ label: "ROI / BE / NPV" }] },
          ],
        },
        {
          label: "Combination is better than alone",
          children: [
            {
              label: "Cost synergies",
              children: [{ label: "Scale" }, { label: "Combined customer services/marketing" }],
            },
          ],
        },
        {
          label: "Risks",
          children: [
            { label: "Government antitrust suits" },
            { label: "Cultural fit" },
            { label: "Geographical expansion: additional infrastructure needs" },
          ],
        },
      ],
    },
  },
  {
    n: "03",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "What is the profit and who is the customer for the current and combined companies? Compare the two and determine whether or not to buy the assets.",
    guidancePreLines: [
      "If the candidate struggles, guide them to calculate the profitability on a per customer base. Although not tested in this case, telecom cares highly about churn.",
    ],
    calcTable: {
      headers: ["", "Current Client", "WIT Co", "Combined"],
      rows: [
        ["Revenue", "$8.5B", "$5B", "$13.5B"],
        ["Costs", "$7.5B", "$4.55B", "$12.05B"],
        ["Profit", "$1B", "$450M", "$1.45B"],
        ["", "", "", ""],
        ["Customers", "5M", "3.6M", "8.6M"],
        ["Profit/Cust", "$200/cust", "$125/cust", "$168.6/cust"],
      ],
    },
    infoBoxLabel: "Question 1: Continued",
    infoSections: [
      {
        paragraphs: [
          "The candidate should recognize that the result of purchasing the assets would yield a lower profitability per customer than without the assets. A great candidate would jump into a brainstorm of how to lower costs after purchasing. However, steer candidate with the following prompt:",
          "Let’s say that if Telco purchases WIT Co’s assets, they believe that they can save $500M in costs due to a leaner labor force and to utilizing certain contracts that they currently have. Would the acquisition still be worthwhile?",
          "The candidate should recalculate but only using the combination",
        ],
      },
    ],
    calcTables: [
      {
        headers: ["", "Combined with Synergies"],
        rows: [
          ["Revenue", "$13.5B"],
          ["Costs", "$12.05B -$0.5B = $11.55B"],
          ["Profit", "$1.95B"],
          ["", ""],
          ["Customers", "8.6M"],
          ["Profit/Cust", "$226.74/cust"],
        ],
      },
    ],
    guidanceLines: [
      "The candidate should recognize that the new profit is higher than the previous combined calculation and that the acquisition is worthwhile.",
    ],
  },
  {
    n: "04",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    guidancePreLines: [
      "The candidate should drive to the acquisition price of the assets. If they do not, give them the following prompt:",
    ],
    qText: "What is the maximum amount that they should pay for WIT Co’s assets?",
    infoSections: [
      {
        lines: [
          "The candidate should recognize that they need to use a perpetuity calculation to determine the benefit of the acquisition for the client. Therefore, the maximum the client should pay is the perpetuity of the additional profits from WIT Co and the synergies they receive.",
        ],
      },
      {
        label: "Guidance",
        lines: [
          "Assume profitability is constant in perpetuity",
          "Assume a 12% discount rate",
          "Assume 2% growth into the future (mature market)",
          "Candidate should realize discount = 10% (12-2)",
        ],
      },
    ],
    calcNote: "Calculation",
    calcLines: [
      { q: "Total additional profit from acquisition is:", a: "$450M (WIT Co) + $500M (synergies) = ==$950M/year==", stack: true },
    ],
    answerText: "Perpetuity = $950M / 0.1 = ==$9.5B==",
  },
  {
    n: "05",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "What are some benefits and risks that you would want to consider when giving a final recommendation?",
    infoSections: [
      {
        paragraphs: [
          "The following is just a sample framework of this brainstorm. There are many categories they can consider and several ideas from the candidate’s original case framework can be used here to support their response.",
          "In addition, the candidate should explain why each bullet is important when discussing their brainstorm framework.",
        ],
      },
    ],
    dataTableCols: "0.8fr 1.4fr 1.4fr 1.2fr",
    dataTableHeaders: [hd("", "center"), hd("Benefits", "center"), hd("Risks", "center"), hd("Mitigation", "center")],
    dataTableRows: [
      {
        cells: [
          L("Customers"),
          L("Access to wider base / Quicker growth"),
          L("Customer attrition – assumption on revenue / Lower customer service"),
          L("Preempted notification to existing base"),
        ],
      },
      {
        cells: [
          L("Employees"),
          L("Obtain trained staff / additional skill set"),
          L("Employee attrition / Company culture (merged cultures)"),
          L("Offer critical employees incentive / Launch culture initiative"),
        ],
      },
      {
        cells: [
          L("Products"),
          L("Diversification of products / Purchase of I.P."),
          L("Lose sight of primary products / Market growth – assumption on growth rate"),
          L("Create post merger integration plan"),
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Risks and Next Steps",
    kind: "qa",
    guidancePreLines: ["Once the risk benefit brainstorm is complete, **ask for a recommendation**:"],
    qText: "“The CEO is about to walk into the room and has asked us for a recommendation. What would you tell them?”",
    infoBoxLabel: "Risks and Next Steps",
    infoSections: [
      {
        label: "A potential response could be:",
        lines: [
          "The client should acquire WIT Co’s assts for up to $9.5B",
          "We can capture $950M in additional profit a year",
          "This is due to an increase in profits of approximately $26/customer",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "We will not maintain the existing customer base which gives us the additional profit",
              "  Attrition could result from differences in service availability / quality",
              "Market will not maintain its current pace as we considered a specific growth and discount rate",
              "Synergies don’t decrease costs as expected",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "We should do a customer survey to see what customer retention would be like",
              "  Develop post-merger integration plan",
              "Perform a market analysis to ensure that we can expect a growth rate of 2% and a discount rate of 12% (overall discount rate of 10%)",
              "Perform detailed due diligence to confirm estimates / secure synergy cost reduction",
            ],
          },
        ],
      },
      {
        label: "Evaluation",
        lines: [
          "This case tests a candidate’s ability to determine the benefits and risks of an acquisition, including a determination of whether an entry into a larger market would actually be beneficial for the company.",
          "A good candidate will anticipate the risks of the assumptions made. Specifically, the candidate will consider the risks associated with the assumption of a consistent customer base, which yields the additional profit anticipated, as well as the assumption around the discount rate, which, when altered, drastically changes the price the client is willing to pay for the acquisition.",
        ],
      },
    ],
  },
];
