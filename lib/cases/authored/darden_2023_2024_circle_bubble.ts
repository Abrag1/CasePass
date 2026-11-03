import type { CasePage } from "../content";

export const CASE_ID = "d6014fae-0ea3-4aa9-8667-edb99d8d091a";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Growth",
  synopsis:
    "A private equity fund has just acquired a protective packaging company and wants to grow its revenue by at least 10% next year. The candidate reads customer sales and survey exhibits and sizes the upsell opportunity.",
  full_prompt:
    "The Private Equity Fund PEGrowth has recently acquired a company called Circle, which is a company in the protective packaging space. Your consulting firm had worked on the due diligence process for this deal and now the fund wants to increase the value of the company. Due to the cost-cutting program already conducted prior to the acquisition, PEGrowth wants to focus on increasing revenue.",
  tags: ["interviewer-led", "growth", "exhibit-heavy", "light-math", "brainstorming"],
};

const ORANGE = "#f47321";
const GREY = "#aeaaa8";
const NAVY = "#0f2557";
const TEAL = "#007b82";

const CUM = [
  45, 65, 80, 97, 110, 122, 133, 143, 154, 162, 169, 175, 180, 185, 190, 195, 198, 200, 201, 202, 203, 204, 205, 206, 207,
  208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 220,
];

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Prompt",
    kind: "ready",
    body: "The Private Equity Fund PEGrowth has recently acquired a company called Circle, which is a company in the protective packaging space. Your consulting firm had worked on the due diligence process for this deal and now the fund wants to increase the value of the company. Due to the cost-cutting program already conducted prior to the acquisition, PEGrowth wants to focus on increasing revenue.",
    note: "BEHAVIORAL INTERVIEW QUESTION: 1. What attributes will you bring to a case team? 2. Tell me about a time that you failed.",
  },
  {
    n: "02",
    label: "Clarifying information",
    title: "Clarifying Information",
    kind: "qa",
    infoBoxLabel: "Clarifying Information",
    infoSections: [
      { paragraphs: ["Note: **Provide this only if corresponding questions are asked.**"] },
      {
        label: "1. Products/Business Model:",
        paragraphs: [
          "The target, Circle is a company in the protective packaging space. Their customers include business clients in various industries. While historically, Circle focused only on providing air bubbles to serve the flexible wrap and void fill markets, 2 years ago, the company started expanding into stretch plastic packaging through an acquisition. Stretch plastic is a film, often used as kitchen protection film or around pallets to fix different layers together.",
        ],
      },
      {
        label: "2. Goal:",
        paragraphs: ["PEGrowth wants to increase the revenue by at least ==10%== next year. The revenue in 2019 of Circle was ==$250M== in total."],
      },
      {
        label: "3. Market:",
        paragraphs: [
          "The market for packaging materials is characterized by the concentration of few players. The margin is low with high transport cost; therefore, the market is geographically limited around the production facilities.",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Framework guidance",
    title: "Framework Guidance",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "To move forward, the interviewee should suggest an area to focus next.",
    guidancePreLines: [
      "If the interviewee wants to discuss **market**, let them know that the market is growing in line with the overall economy. The market is highly concentrated and geographically focused, so it's not an option to aggressively expand to new markets or take away market share of competitors.",
    ],
    infoBoxLabel: "Framework Guidance",
    infoSections: [
      {
        paragraphs: ["Note: There are many possible alternatives to this framework. These are only provided as possible suggestions."],
      },
      {
        label: "Market",
        lines: [
          "Market size and growth",
          "Customer",
          "  Preferences",
          "  Segment",
          "Competitive landscape",
          "  # of players",
          "  Market share",
          "  Substitutes",
        ],
      },
      {
        label: "Organic Growth",
        groups: [
          { heading: "Price", items: ["Increase/ Decrease"] },
          {
            heading: "Volume",
            items: [
              "New customers",
              "  Increase penetration",
              "  Channel strategy",
              "Existing customers",
              "  Increase frequency / retention",
              "  Bundling",
            ],
          },
          { heading: "Product Mix", items: ["New product development", "Prioritize high margin products"] },
        ],
      },
      {
        label: "Inorganic Growth",
        lines: ["Buy", "  Competitor", "  Supplier (vertically integrate)", "Partnership", "  Joint Venture"],
      },
    ],
    nextStepText: "If the interviewee wants to understand more about the company's current financials, show them Exhibit 1.",
  },
  {
    n: "04",
    label: "Question 1 · Exhibit 1",
    title: "Question 1",
    kind: "qa",
    qText: "What are the insights you get from Exhibit 1?",
    colBarTitle: "Exhibit 1",
    colBarSubtitle: "Cumulative sales by customer (total USD, 2019)",
    colBarYMax: 300,
    colBarYStep: 50,
    colBarYLabel: "Revenue (million USD)",
    colBarXTitle: "Customers",
    colBarRefLine: { value: 205, label: "80%", color: ORANGE },
    colBarItems: [
      ...CUM.map((v, i) => ({ label: String(i + 1), value: v, color: i < 25 ? ORANGE : GREY })),
      { label: "Other ~ 460", value: 250, color: GREY },
    ],
    guidanceLabel: "Exhibit or Question Guidance",
    guidanceLines: [
      "In 2019, the total company revenue was ==$250M==, which we know from the prompt.",
      "This exhibit shows the cumulative sales for the company, starting with the largest customer (Customer 1, ~$50M), followed by the second largest customer, which adds ~$20M in revenue, and so on.",
      "As the 80% dotted line is illustrating, about ==80% of the revenue (~$200M) came from only 25 of the 500 customers (5%)==.",
      "**Encourage** the candidate to see what this 80% line is illustrating and ask them why we care.",
      "Candidate should ask to understand these top 25 customers' buying behaviors and find opportunities for improvement via a **customer survey**.",
    ],
  },
  {
    n: "05",
    label: "Brainstorming",
    title: "Brainstorming",
    kind: "qa",
    qText:
      "We have conducted a survey with the top 25 customers of Circle and realized that only 3 out of 25 customers buy both air bubble packaging and stretch plastics from Circle. What do you think are the possible reasons for this?",
    infoBoxLabel: "Brainstorming Guidance",
    infoSections: [
      {
        paragraphs: [
          "Note: This is just one possible set of categories and answers. Many more are possible, and interviewers should assess both the volume and relevance of answers.",
        ],
      },
      {
        label: "External reasons",
        lines: [
          "Demand: Customers don't need the products",
          "Product: Customers need that product but in different specifications",
          "Awareness: Customers don't know that Circle has that products",
          "Contractual agreement: The customers are currently in long term contract with other suppliers",
          "Quality: Our quality does not meet customer demand",
        ],
      },
      {
        label: "Internal reasons",
        lines: [
          "Our sales departments don't actively do cross-sell or upsell",
          "No incentive for sales reps to upsell",
          "Lack of knowledge transfer/training",
          "Differences in margins between the two products",
        ],
      },
      {
        label: "Best candidates display:",
        paragraphs: ["Structured answers", "Relevant reasons to the case"],
      },
    ],
  },
  {
    n: "06",
    label: "Question 2 · Exhibit 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "After interviewing with the management, we realized that Circle is not sharing leads across different sales departments. Furthermore, there was no formal sales training, so sales reps in one department don't necessarily know about products of the other department. How can we quantify the revenue impact if we upsell at Circle?",
    stackPanelsTitle: "Exhibit 2 · Survey Results of 25 Customers",
    stackPanels: [
      {
        title: "Customer demand",
        legend: [
          { name: "Only stretch plastics", color: TEAL },
          { name: "Only air bubble", color: NAVY },
          { name: "Both", color: ORANGE },
        ],
        columns: [
          {
            label: "Do you need both products?",
            topLabel: "25",
            segs: [
              { value: 60, color: ORANGE, label: "60%" },
              { value: 24, color: NAVY, label: "24%" },
              { value: 16, color: TEAL, label: "16%" },
            ],
          },
          {
            label: "Which products do you buy from Circle?",
            topLabel: "15",
            segs: [
              { value: 20, color: ORANGE, label: "20%" },
              { value: 33, color: NAVY, label: "33%" },
              { value: 47, color: TEAL, label: "47%" },
            ],
          },
        ],
        connectors: [{ fromCol: 0, fromPct: 60, toPct: 100 }],
      },
      {
        title: "Air bubble buyers",
        legend: [
          { name: "Yes", color: ORANGE },
          { name: "No", color: NAVY },
        ],
        columns: [
          {
            label: "Do you know that Circle offers stretch?",
            segs: [
              { value: 20, color: ORANGE, label: "20%" },
              { value: 80, color: NAVY, label: "80%" },
            ],
          },
          {
            label: "Are you willing to buy stretch plastics from Circle?",
            segs: [
              { value: 75, color: ORANGE, label: "75%" },
              { value: 25, color: NAVY, label: "25%" },
            ],
          },
        ],
        connectors: [
          { fromCol: 0, fromPct: 100, toPct: 100 },
          { fromCol: 0, fromPct: 20, toPct: 0 },
        ],
        note: "Expected upsell potential: 75% of current revenue",
      },
      {
        title: "Stretch plastics buyers",
        legend: [
          { name: "Yes", color: ORANGE },
          { name: "No", color: NAVY },
        ],
        columns: [
          {
            label: "Do you know that Circle offers air bubble?",
            segs: [
              { value: 43, color: ORANGE, label: "43%" },
              { value: 57, color: NAVY, label: "57%" },
            ],
          },
          {
            label: "Are you willing to buy air bubble from Circle?",
            segs: [
              { value: 50, color: ORANGE, label: "50%" },
              { value: 50, color: NAVY, label: "50%" },
            ],
          },
        ],
        connectors: [
          { fromCol: 0, fromPct: 100, toPct: 100 },
          { fromCol: 0, fromPct: 43, toPct: 0 },
        ],
        note: "Expected upsell potential: 50% of current revenue",
      },
    ],
    guidanceLabel: "Exhibit or Question Guidance",
    guidanceLines: [
      "From exhibit 1, we know that top 5% of customers account for 80% of total revenue (top 25 customers contribute $200M in revenue).",
      "**Therefore, the average revenue per customer in top 25 is $8M.**",
      "We know that of the 25 top customers, 15 need both products. Within this, we know that 20% of these customers already buy both (3 customers). We also know that 33% of customers are air bubble customers already (5 customers). The remaining 7 customers are stretch plastic customers only.",
      "**Air bubble**",
      "We know that of the 5 customers, 80% (4 customers) are not aware that Circle sells stretch plastics. Of these, 3 customers are willing to buy from Circle.",
      "Therefore, expected upsell potential from air bubble buyers = $8M * 3 * 75% = ==$18M==",
      "**Stretch Plastics**",
      "We know that of the 7 customers, 57% (~4/7, so 4 customers) are not aware that Circle sells air bubbles. Of these 2 are willing to buy from Circle.",
      "Expected upsell potential from stretch plastics buyers = $8M * 2 * 50% = ==$8M==",
      "Total upsell potential = ==$26M==, which is ~ 10% of current revenue ($250M)",
      "The company can achieve the goal of increasing revenue by 10% by encouraging upselling.",
    ],
  },
  {
    n: "07",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    qText: "To conclude, the interviewee should provide the following:",
    guidanceLabel: "Conclusion",
    guidanceLines: [
      "**Recommendation:**",
      "  The company should upsell between product lines to existing customers to increase revenue by 10%.",
      "**Risks:**",
      "  “Willing to buy” are not necessarily going to buy",
      "  Capability to execute cross-selling",
      "  Dependency on a group of customers (top 5%)",
      "**Next Steps:**",
      "  Work with head of sales departments to prepare for cross-selling.",
      "  Conduct further study to understand the current production capacity to serve new growth",
    ],
  },
];
