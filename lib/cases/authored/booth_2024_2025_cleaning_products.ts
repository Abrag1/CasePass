import type { CasePage } from "../content";

export const CASE_ID = "3e2baccf-e1be-4dd4-8359-d2c19e34129d";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "A household cleaning products manufacturer wants to do better in the market. Interpret a price elasticity exhibit to decide whether a coordinated price change meets the client's revenue goal.",
  full_prompt:
    "Our client is a prominent manufacturer of household cleaning products such as soap. They feel that an opportunity exists for them to do better in the market. What will be some of the first things that you will ask the client?",
  tags: ["interviewer-led", "growth-strategy", "pricing", "light-math", "brainstorming"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client is a prominent manufacturer of household cleaning products such as soap. They feel that an opportunity exists for them to do better in the market. What will be some of the first things that you will ask the client?",
    note: "**Fit Questions** — 1. What is the biggest challenge you faced at your last job and how did you navigate it? 2. What is your leadership style? Tell me about a time when you effectively led a team by leveraging this leadership style.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a short case designed to test a candidate’s ability to interpret simple information and think creatively. The recommendation is fairly straightforward, and most candidates will arrive at the same conclusion. The interviewer should take note of the candidate’s delivery. Strong candidates will anticipate the interviewer’s next question and drive the discussion forward. The best candidates will flesh out this basic case with out-of-the-box thinking and creative recommendations.",
        ],
      },
      {
        label: "Interviewer Guidance",
        paragraphs: [
          "**Drive** the candidate to ask what is meant by “doing better in the market” before writing out a full framework. If the candidate doesn’t bring it up, guide the discussion in that direction. Possible replies by candidate may include stronger growth, more market share, more profitable, etc.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Structured Brainstorming / Q&A" },
          { n: "3", text: "Final Recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    qText:
      "Once candidate presents the framework, **ask**: What questions will you ask our client to help you get the information you need?",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "**Only provide** the following if asked. If not, drive the candidate towards the information:",
    guidancePreLines: [
      "Revenues in the last year were ==$3 billion==.",
      "The client’s product mix includes dish washing powder, clothing detergent powder, hand wash liquid, shower gel, and all-purpose soap.",
      "There are no opportunities in cost savings or by adding new products to the mix.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "A simple internal/external factors framework is effective here, but any number of frameworks could work well. The framework below is illustrative of a backbone that ought to be fleshed out in greater detail.",
        ],
      },
      {
        label: "Internal:",
        groups: [
          {
            heading: "Revenues",
            items: [
              "Price (relative and absolute) / price elasticity",
              "Quantity, product mix, channel mix (grocery vs low cost vs bulk (e.g. Costco))",
            ],
          },
          {
            heading: "Expenses",
            items: [
              "Fixed costs (PP&E, SG&A, advertising, etc.)",
              "Variable costs (labor at factories, raw material such as plastic, shipping, etc.)",
            ],
          },
        ],
      },
      {
        label: "External",
        groups: [
          { heading: "Market (growth, percent share)", items: [] },
          { heading: "Competition (new entrants, differentiation, price)", items: [] },
          { heading: "Customers (preference, trend toward environmentally friendly products)", items: [] },
        ],
      },
      {
        label: "Transition Statement:",
        paragraphs: [
          "I would like to begin by better understanding client revenues, and then I would like to examine their product mix. First, do we know client sales last year?",
        ],
      },
    ],
    guidanceLabel: "Case Development",
    guidanceLines: [
      "After presenting the framework and learning the information in the section above, a strong candidate will conclude the following:",
      "  It appears that the only way to increase profitability is to improve revenues.",
      "  Possible ways to do this include increasing sales volumes or altering prices.",
      "  The firm can increase volumes by either grabbing more market share or growing the total available market.",
      "A strong candidate might ask a number of questions at this point, but guide the discussion towards **price elasticity**. **Show Exhibit 1** on the following page.",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1: Price Elasticity",
    title: "Price Elasticity",
    kind: "qa",
    qText:
      "Based on your ideas, you conducted a market research study. Your research has shown that if the prices of the client’s products are changed all at once in the percentages shown, the volumes of the products sold will remain unchanged. Note that changes in price either all happen at the same time or none of the changes are made at all (i.e., they will either change all the prices below or none of them).",
    dataTableTitle: "Exhibit 1: Price Elasticity",
    dataTableCols: "1.6fr 1.6fr 1fr",
    dataTableHeaders: [
      { v: "Product", align: "left" },
      { v: "Price change %\nthat can be\nimplemented without changing volume", align: "center" },
      { v: "% of revenues (Current)", align: "center" },
    ],
    dataTableRows: [
      ["Dish Washing Powder", "-2", "5"],
      ["Clothes Detergent Powder", "1", "20"],
      ["Hand Wash Liquid", "0", "30"],
      ["Shower Gel", "2", "30"],
      ["All-Purpose Soap", "4", "15"],
    ].map((r) => ({
      cells: r.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const), w: 400, fg: "#1f2421" })),
    })),
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**Allow** the candidate to talk through their insights from Exhibit 1. A strong candidate will understand they have enough information to calculate the new revenues associated with the price change and drive the discussion forward. Either way, **ask** the following question:",
      "  The client has told us that they will be happy with a 1% increase in revenues.  Should they go ahead with the price change?",
      "The candidate should calculate current revenue and revenue after price change from table (i.e. the candidate should come up with the two rightmost columns in the table below).  Strong candidates will recall from earlier in the case that total current revenue is ==3 billion dollars==.",
    ],
    calcTable: {
      title: "Calculation walkthrough",
      headers: [
        "Product",
        "Price change %\nthat can be\nimplemented without changing volume",
        "% of revenues (Current)",
        "Current Revenue ($mil.)",
        "Revenue after price change ($mil.)",
      ],
      rows: [
        ["Dish Washing Powder", "-2", "5", "150", "147"],
        ["Clothes Detergent Powder", "1", "20", "600", "606"],
        ["Hand Wash Liquid", "0", "30", "900", "900"],
        ["Shower Gel", "2", "30", "900", "918"],
        ["All-Purpose Soap", "4", "15", "450", "468"],
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Based on these calculations, revenues will be ==$3.039 billion== after the price change representing an increase of ==$39 million==. The client’s target was $30 million (1% revenue change), so they **should go ahead** with the price change.",
      "  A strong candidate will recognize that they can calculate the overall change in revenue by **summing the difference in revenue by product** to arrive at the ==$39M== increase in revenue.",
    ],
  },
  {
    n: "04",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "**Ask** the candidate: is there anything that our client should watch out for? Sample responses may include:",
    infoBoxLabel: "Sample responses",
    infoSections: [
      {
        label: "Internal",
        lines: [
          "Geography: Does the research reflect all the client’s key markets?",
          "Cost Increase: There may be some additional costs associated with price increases (i.e. advertising to explain price increase) that may eat into profits generated through the $39M additional revenue.",
          "Sustainability of revenue increase: This is a one-time increase in revenues. The client cannot expect to continue raising prices to keep a steady top-line growth.",
        ],
      },
      {
        label: "External",
        lines: [
          "Competitive response: Competitor’s moves may undermine our price changes.",
          "Legal: Are we a monopoly producer?  If so, we may invite antitrust lawsuits by increasing prices.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "If the candidate stops after two or three ideas, **probe** them by asking “what else?” to come up with at least four or five ideas before proceeding to developing a final recommendation. This should be an opportunity for the candidate to demonstrate structured thinking.",
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
        label: "Recommendation",
        paragraphs: ["**Go ahead with the price change**"],
        lines: [
          "Revenue will increase by ==$39M==, which is higher than the goal of a 1% increase",
          "Given price changes will not cause a decrease in volume of the products sold",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Research may not have been fully reflective of client’s geographic / demographic market",
          "Research is based on the status quo – if competitors use the opportunity to lower prices, we may lose customers and revenue",
          "Research only considered one change option; there may be more optimal price changes that could be made",
        ],
      },
      {
        label: "Next steps",
        lines: [
          "Pilot the recommendation in one market to confirm the results from the market research",
          "Explore other potential channels to grow revenue organically (e.g., online) and consider expanding marketing and sales effort to improve market share in profitable products",
          "Cost cutting diagnostic could be done to see if there are other avenues to improve the bottom line",
        ],
      },
    ],
  },
];
