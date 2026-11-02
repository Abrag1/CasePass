import type { CasePage } from "../content";

export const CASE_ID = "547c04bc-cb49-4450-993a-3d9467881dc2";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Profitability",
  synopsis:
    "A private equity firm has bought a plastic materials manufacturer and wants to improve its profitability before cashing out within 5 years. Compare the two product lines and decide how to use plant capacity.",
  full_prompt:
    "Your client is a private equity firm that has recently purchased a plastic materials manufacturer that makes products such as plastic soda bottles.\n\nThe client is looking to cash out of their investment within 5 years and wants you to help improve the profitability of the manufacturer.",
  tags: ["interviewer-led", "profitability", "private-equity", "light-math", "capacity"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Your client is a private equity firm that has recently purchased a plastic materials manufacturer that makes products such as plastic soda bottles.\n\nThe client is looking to cash out of their investment within 5 years and wants you to help improve the profitability of the manufacturer.",
    note: "Fit Questions: (1) Describe a time when you had to handle a situation where you were presented with several conflicting priorities. (2) What did you learn about yourself at your last job? (3) What is your management philosophy?",
    infoBoxLabel: "Guide To Interviewer",
    infoSections: [
      {
        paragraphs: [
          "In this case the candidate will be required to relay a thorough framework and conduct a quantitative comparison of the two products, after which the interviewer will take charge and ask the questions mentioned in the case.",
          "A good framework will outline various costs associated with the bottling industry and help understand the importance of capacity constraints in the manufacturing industry.",
          "While the case is relatively straightforward, it allows superior candidates to shine at the end by offering a robust synthesis of the choices facing the PE firm and the risks which are necessary to consider in the recommended strategy.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Clarifying answers",
    title: "Clarifying answers to provide",
    kind: "qa",
    infoBoxLabel: "Clarifying answers to provide",
    infoSections: [
      {
        label: "Market",
        lines: [
          "Bottling market size – can be calculated by revenues later",
          "Bottling market is growing at 10% a year in North America",
          "The firm has 30% share of the bottling market",
          "The firm's bottling sales have been growing at 15% a year, projected 15% growth for each of the next two years",
        ],
      },
      {
        label: "Labor Needs",
        lines: [
          "The firm manufactures two types of products - bottles and non-bottling goods",
          "The bottles are delivered locally to the clients, large bottlers such as Coke or Pepsi",
          "Non-bottling products (such as advertising displays for stores) are delivered directly to the establishments that will use them, such as gas stations",
          "Bottles are made to spec whereas the non-bottling goods are not",
          "Firm has higher quality products and manufactures at lower costs due to more efficient machinery",
        ],
      },
      {
        label: "Operations",
        lines: [
          "The firm has two plants:",
          "  One plant in southeast US that manufactures only bottles with capacity of 1.5B bottles",
          "  Another plant in Canada that can produce both bottles and non-bottling materials with capacity of 500M products. Currently producing non-bottling",
          "Assumptions:",
          "  No downtime, plants are fully utilized",
          "  Plants are using new, highly efficient machinery",
        ],
      },
      {
        label: "Revenues and Costs",
        lines: [
          "Bottles sell for 5 cents each",
          "Non-Bottling generates $20M in revenues",
          "Bottles costs:",
          "  COGS (plastic) – 2 cents per bottle",
          "  Machinery – 1 cent per bottle",
          "  Labor - 0.5 cent per bottle",
          "Non-bottling has total variable costs of $18M",
          "SG&A across the entire firm is $20M",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Comparison of the two products",
    title: "Comparison of the two products",
    kind: "qa",
    guidancePreLabel: "Notes to Interviewer",
    guidancePreLines: ["Candidate should conduct a comparison of the two products:"],
    calcTable: {
      headers: ["Variables", "Source (given in case unless stated)", "Calculations – Bottling", "Calculations – Non-Bottling"],
      rows: [
        ["Manufacturing capacity", "", "1.5 B", "0.5 B"],
        ["Revenues", "", "5 cents per bottle", "$20M"],
        ["COGS", "", "2 cents per bottle", ""],
        ["Machinery", "", "1 cent per bottle", "-"],
        ["Labor", "", "0.5 cent per bottle", ""],
        ["Total variable costs", "Bottling: (COGS) + (machinery) + (labor)", "3.5 cents per bottle", "$18M"],
        [
          "Total profit",
          "Bottling: (manufacturing capacity) x ((total revenues) – (total variable cost))\nNon-bottling: (total revenues – total costs)",
          "==$22.5M==",
          "==$2M==",
        ],
        ["Profit margins", "(total profit) / (total revenues)", "==30%==", "==10%=="],
      ],
    },
    answerText: "Key Takeaway: **Bottling products have higher profit margins**",
  },
  {
    n: "04",
    label: "Question #1",
    title: "Question #1",
    kind: "qa",
    qText: "Should the firm convert the non-bottling production to bottling in its Canada plant? (cost - $3M)",
    guidanceLabel: "Notes to Interviewer",
    guidanceLines: [
      "Cost of conversion: $3M",
      "Assumption – the firm has sufficient cash on hand to finance this project",
      "Current profit in Canada (previously calculated):",
      "  $2M, 10% margin",
      "Projected profit from conversion if the firm can sell the entire capacity:",
    ],
    calcTable: {
      headers: ["Variables", "Source (given in case unless stated)", "Calculations"],
      rows: [
        ["Number of additional bottles", "", "0.5 B"],
        ["Profit per bottle", "Previously calculated", "1.5 cents"],
        ["Projected profit from conversion", "(# of additional bottles) x (profit per bottle)", "==$7.5M=="],
      ],
      totalLast: true,
    },
    answerText:
      "Key Takeaway: The conversion could potentially add ==$5.5M== in annual profit, if the firm can sell the entire capacity. **Breakeven is in the 1st year**",
  },
  {
    n: "05",
    label: "Question #2",
    title: "Question #2",
    kind: "qa",
    qText:
      "What are some non-financial risks to consider before converting non-bottling production to bottling in its Canada plant?",
    infoBoxLabel: "Notes to Interviewer",
    infoSections: [
      {
        groups: [
          { heading: "Implementation timeframe:", items: ["How much time will it take?", "Do we need to take a phased approach?"] },
          {
            heading: "Distribution Channels:",
            items: [
              "Will the current distribution network need to change to reach customers?",
              "How will distribution centers scale up given the growth projections?",
            ],
          },
          {
            heading: "Costs:",
            items: [
              "Will there be any additional costs to consider besides the one time conversion cost?",
              "Will there be any changes in variable costs like Labor?",
              "Any change in profit margins in the Canada plant?",
              "Can we re-negotiate supplier contracts to reduce COGS?",
            ],
          },
          {
            heading: "Other:",
            items: [
              "Will the client need to hire new workers in the Canada factory or train current workers?",
              "Resistance from Labor Union if organized labor is part of out production employee pool in Canada?",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Question #3",
    title: "Question #3",
    kind: "qa",
    qText: "How much additional market share should the firm gain in the next 2 years in order to sell the extra bottles?",
    guidanceLabel: "Notes to Interviewer",
    guidanceLines: [
      "Bottling market is growing at 10% per year in North America (given)",
      "The firm's sales are growing at 15% per year (given)",
    ],
    calcLines: [
      { q: "Number of bottles currently manufactured", a: "1.5 B" },
      { q: "Firm's current market share", a: "30%" },
      { q: "Bottling market size", a: "(# of bottles manufactured) / (market share) = ==5 B==", stack: true },
    ],
    calcTable: {
      headers: ["Variables", "Source (given in case unless stated)", "Year 0 (now)", "Year 1", "Year 2"],
      rows: [
        ["Firms sales", "Each year, multiply by the firm's sales growth rate", "1.5B", "1.72B", "1.98B"],
        ["Bottling market size", "Each year, multiply by the bottling market growth rate", "5 B", "5.5 B", "6.05 B"],
        ["Required market share", "(firm sales) / (bottling market size)", "30%", "==31.36%==", "==32.72%=="],
      ],
      totalLast: true,
    },
    answerText: "Key Takeaway: Gaining **~3% market share in 2 years** seams feasible",
  },
  {
    n: "07",
    label: "Solution and Recommendations",
    title: "Solution and Recommendations",
    kind: "qa",
    guidanceLabel: "Recommendations",
    guidanceLines: [
      "The manufacturer should convert the non-bottling manufacturing in Canada to bottling, as it offers better margins, assuming that the firm can maintain sales growth",
      "The additional capacity is needed to match next year's anticipated demand, although the firm won't need the entire capacity in the first year after expansion (only 0.22M)",
      "If market and sales grow according to projections, the firm will run out of capacity at the end of the second year",
    ],
    infoBoxLabel: "Risks, Next Steps and Bonus",
    infoSections: [
      {
        label: "Risks",
        lines: [
          "The market might not continue growing at the same rate or may enter a period of decline",
          "It may be difficult for the company to continue to grow faster than the market",
          "The non-bottling market and firm's sales might be growing at a faster rate (no information was given) and therefore capital may be better spend on that part of the business",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Client should explore what needs to be done to convert the non-bottling manufacturing to bottling (e.g. retraining, recruitment, purchasing new machinery etc.)",
        ],
      },
      {
        label: "Bonus / Guide to an Excellent Case",
        paragraphs: ["Strong candidates may also note:"],
        lines: [
          "Consider adding another plant or expanding existing plants to keep pace with the sales growth. Expansion plans should fit within the PE firm's goal of exiting within 5 years",
          "Renting out additional capacity from other plants may be a feasible option which ties up less capital and allows an easier reversal of the strategy if market trends sour",
          "Negotiate with suppliers / customers may improve the profitability of the business",
          "Increase prices due to higher quality products may be possible but lost market share due to a price increase may be difficult to make up in a five year time horizon",
        ],
      },
    ],
  },
];
