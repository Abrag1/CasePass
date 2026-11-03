import type { CasePage } from "../content";

export const CASE_ID = "7d8ca45b-9574-4be9-9d72-87af7ea46251";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "M&A Due Diligence",
  synopsis:
    "A private equity firm is considering buying the Philadelphia Phillies for $1.1B. Value the team, then decide whether the investment makes sense.",
  full_prompt:
    "Our client, Alpha Capital, is a private equity firm that is considering buying the Philadelphia Phillies. The current team owners approached Alpha about purchasing the team for $1.1B. Alpha engaged our firm in the due diligence process and wants us to help them understand:\n\nA. What is the team worth?\n\nB. Should they make this investment?",
  tags: ["interviewer-led", "valuation", "private-equity", "exhibit-heavy", "brainstorming"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Phighting Phillies",
    kind: "ready",
    body: "Our client, Alpha Capital, is a private equity firm that is considering buying the Philadelphia Phillies. The current team owners approached Alpha about purchasing the team for $1.1B. Alpha engaged our firm in the due diligence process and wants us to help them understand:\n\nA. What is the team worth?\n\nB. Should they make this investment?",
  },
  {
    n: "02",
    label: "Clarifying Questions",
    title: "Clarifying Questions",
    kind: "qa",
    guidancePreLabel: "Sample Clarifying Questions and Answers",
    guidancePreLines: [
      "Fund structure, previous investments — **This asset will go into a new fund without hold period constraints or previous investments**",
      "Hurdle rates, hold periods, other constraints — **Assume these are not major issues**",
      "Impetus / motivation for the deal? — **We want to maximize our investment.  Also assume that fund leadership is filled with avid Phillies fans who want the team to be successful**",
      "How does the team make money? — [Before answering, **ask the interviewee to brainstorm** some ideas] **The major revenue streams are: ticket sales, concessions, merchandise, media rights, and advertising/ sponsorships**",
      "What are the major cost drivers? — [Before answering, **ask the interviewee to brainstorm** some ideas] **The major cost drivers are:  Player salaries, front office costs, sales & advertising, and stadium/facilities costs**",
      "Does the team own or lease its stadium and other facilities? — **Assume the city of Philadelphia owns these and we are paying annual leasing costs.**",
      "Should we be considering revenues and costs associated with Spring Training and the farm system? — **Great question, but let’s not consider these in our analysis**",
      "Are there other potential bidders for the team? — **Assume there are not other bidders and we have the first shot at buying the team.**",
    ],
  },
  {
    n: "03",
    label: "Sample Framework",
    title: "Sample Framework",
    kind: "qa",
    infoBoxLabel: "Sample Framework",
    infoSections: [
      {
        label: "Key Points of background",
        lines: [
          "Fund structure and previous investments",
          "Hurdle rates, hold periods and other constraints",
          "Deal thesis and motivation",
        ],
      },
      {
        label: "How much is the team worth?",
        groups: [
          {
            heading: "+ Revenues",
            items: ["Ticket Sales", "Concessions", "Merchandise", "Media Rights", "Sponsorships and Ads"],
          },
          {
            heading: "- Costs",
            items: ["Player Salaries", "Front Office Costs", "SG&A", "Stadium and Facility Costs", "COGS/Other"],
          },
          {
            heading: "Potential Revenue and Cost Synergies",
            items: ["Expected Increased Revenues", "Expected Lower Costs"],
          },
          { heading: "Discount Cash Flows", items: [] },
        ],
      },
      {
        label: "Should Alpha make the investment?",
        spaceBefore: 36,
        groups: [
          {
            heading: "Management Team Considerations",
            items: ["Existing team management quality?", "Would we have to replace management"],
          },
          {
            heading: "Ability to Execute",
            items: [
              "Asking price below our valuation?",
              "Do we have access to capital to purchase the team?",
              "Our expertise in running a sports business enterprise",
              "Ability to achieve synergies we identify?",
            ],
          },
          {
            heading: "Other Factors",
            items: [
              "Fan-base reaction to PE buyer?",
              "League approval of our purchase?",
              "Potential tension between maximizing the investment and winning?",
              "Regulatory/legal risks?",
              "Risks to sport of baseball (e.g., lower fan interest)",
              "Other investments we could make with better ROI?",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Current Revenues and Costs (1 of 2)",
    title: "Current Revenues and Costs (1 of 2)",
    kind: "qa",
    guidancePreLabel: "Note for Interviewer",
    guidancePreLines: [
      "If you have **not discussed revenue and cost drivers yet**, **have the candidate brainstorm** these.  Keep pushing them until they are out of ideas or have covered the topics in the tables below.  Give hints as needed.",
    ],
    calcTable: {
      title: "Revenues",
      headers: ["", "Information for Interviewee", "Revenue Size (Keep Private)"],
      rows: [
        ["Ticket Sales", "See table at right.  Give blue font figures to interviewee", "$80,000,000"],
        ["Concessions", "See table at right.  Give blue font figures to interviewee", "$40,000,000"],
        ["Merchandise", "Sell 1M items per year, at $50 per item.  The team earns 20% royalty on total sales", "$10,000,000"],
        ["Media Rights", "Local Media: $40M, National Media: $80M", "$120,000,000"],
        ["Sponsorships/Ads", "$50M", "$50,000,000"],
        ["Total Revenue", "", "==$300,000,000=="],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        title: "Ticket Sales",
        headers: [],
        rows: [
          ["Seats/Stadium", "50000"],
          ["Standard Seats Share", "90%"],
          ["Standard Seat Fill Rate", "55.56%"],
          ["Standard Seat Price", "$25"],
          ["Premium Seats Share", "10%"],
          ["Premium Seats Fill Rate", "75%"],
          ["Premium Seat Price", "$100"],
          ["Standard Seat Revenue", "$625,000"],
          ["Premium Seat Revenue", "$375,000"],
          ["Revenue/Game", "$1,000,000"],
          ["Number of Home Games", "80"],
          ["Total Ticket Sales", "==$80,000,000=="],
        ],
        totalLast: true,
      },
      {
        title: "Concessions",
        headers: [],
        rows: [
          ["Fans Buying/Game", "20000"],
          ["Spend/Fan/Game", "$25"],
          ["Revenue/Game", "$500,000"],
          ["Number of Home Games", "80"],
          ["Total Concessions", "==$40,000,000=="],
        ],
        totalLast: true,
      },
    ],
  },
  {
    n: "05",
    label: "Current Revenues and Costs (2 of 2)",
    title: "Current Revenues and Costs (2 of 2)",
    kind: "qa",
    calcTable: {
      title: "Costs",
      headers: ["", "Information for Interviewee", "Cost Size (Keep Private)"],
      rows: [
        ["Player Salaries", "$110M", "$110,000,000"],
        ["Front Office Costs", "$20M", "$20,000,000"],
        ["Sales & Advertising", "$50M", "$50,000,000"],
        ["Stadium/Facility Costs", "$20M", "$20,000,000"],
        ["Total Costs", "", "==$200,000,000=="],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        title: "Valuation",
        headers: [],
        rows: [
          ["Revenue", "$300,000,000"],
          ["Costs", "$200,000,000"],
          ["Annual EBIT", "$100,000,000"],
          ["Taxes", "Assume $0"],
          ["Discount Rate", "10%"],
          ["Valuation", "==$1,000,000,000=="],
        ],
        totalLast: true,
      },
    ],
    guidanceLabel: "Note for Interviewer",
    guidanceLines: [
      "At this point, the candidate should see that the **valuation is less than the asking price**.  If necessary, prompt the interviewer to compare this value to the asking price.  If they do not bring up synergies, **guide them to this topic**.",
    ],
  },
  {
    n: "06",
    label: "Synergy Analysis",
    title: "Synergy Analysis",
    kind: "qa",
    guidancePreLabel: "Synergy Analysis (for Interviewer)",
    guidancePreLines: [
      "**Note for Interviewer:** **Ask** the candidate to look at the graphs on the next slide and give you his/her thoughts.  The candidate should spot **cost synergies with sales and advertising** and connect the revenue percentages to the topline revenue figure previously calculated.  These synergies increase the valuation beyond the asking price.",
      "See below for calculations on potential synergies and associated impact on the valuation.",
    ],
    colBarTitle: "Potential Boost to Total Revenues",
    colBarYMax: 4.5,
    colBarYStep: 0.5,
    colBarYTickSuffix: "%",
    colBarYTickDecimals: 0,
    colBarHorizontalLabels: true,
    colBarBarRatio: 0.32,
    colBarTitleStyle: "centered-underlined",
    colBarItems: [
      { label: "Dynamic Ticket\nPricing", value: 4, color: "#1f497d" },
      { label: "Renegotiated\nLocal Media Deal", value: 3, color: "#1f497d" },
      { label: "Attract Higher\nValue Sponsors", value: 2, color: "#1f497d" },
      { label: "Revamped\nConcessions\nOfferings", value: 1, color: "#1f497d" },
    ],
    axisStackTitle: "Team Cost Comparison ($MM)",
    axisStackYMax: 200,
    axisStackYStep: 40,
    axisStackYTickPrefix: "$",
    axisStackZeroLabel: "$-",
    axisStackLegendBelow: true,
    axisStackTitleStyle: "centered-underlined",
    axisStackBarRatio: 0.4,
    axisStackLabelsRegular: true,
    axisStackLightBaseline: true,
    axisStackLegendScale: 0.8,
    axisStackLegend: [
      { name: "Player Salaries", color: "#000000" },
      { name: "Front Office Costs", color: "#808080" },
      { name: "Sales & Advertising", color: "#bfbfbf" },
      { name: "Stadium/Facility Costs", color: "#b8cce4" },
    ],
    axisStackCols: [
      {
        label: "Phillies Costs",
        segs: [
          { value: 110, color: "#000000" },
          { value: 20, color: "#808080" },
          { value: 50, color: "#bfbfbf" },
          { value: 20, color: "#b8cce4" },
        ],
      },
      {
        label: "League Benchmark",
        segs: [
          { value: 110, color: "#000000" },
          { value: 20, color: "#808080" },
          { value: 40, color: "#bfbfbf" },
          { value: 20, color: "#b8cce4" },
        ],
      },
    ],
    calcTable: {
      headers: ["", "Phillies Costs", "League Benchmark", "Savings Potential"],
      rows: [
        ["Player Salaries", "$110,000,000", "$110,000,000", "$ -"],
        ["Front Office Costs", "$20,000,000", "$20,000,000", "$ -"],
        ["Sales & Advertising", "$50,000,000", "$40,000,000", "==$10,000,000=="],
        ["Stadium/Facility Costs", "$20,000,000", "$20,000,000", "$ -"],
      ],
    },
    calcTables: [
      {
        headers: ["", "Potential Boost to Revenues", "Topline Revenue", "Incremental Revenue"],
        rows: [
          ["Dynamic Ticket Pricing", "4%", "$300,000,000", "$12,000,000"],
          ["Renegotiated Local Media Deal", "3%", "$300,000,000", "$9,000,000"],
          ["Attract Higher Value Sponsors", "2%", "$300,000,000", "$6,000,000"],
          ["Revamped Concessions Offerings", "1%", "$300,000,000", "$3,000,000"],
        ],
      },
      {
        title: "Impact on Valuation",
        headers: [],
        rows: [
          ["Total Cost Synergies", "$10,000,000"],
          ["Total Revenue Synergies", "$30,000,000"],
          ["Total Synergies", "$40,000,000"],
          ["Valuation Impact", "==$400,000,000=="],
          ["New Total Valuation", "==$1,400,000,000=="],
        ],
        totalLast: true,
      },
    ],
  },
  {
    n: "07",
    label: "Other Considerations",
    title: "Other Considerations",
    kind: "qa",
    qText:
      "If the candidate does not drive us to the “other considerations” bucket, **ask them** what other types of factors they would want to consider in deciding whether to recommend that Alpha buys the team.  See below for some example considerations.",
    infoBoxLabel: "Other Considerations",
    infoSections: [
      {
        label: "Management Team Considerations",
        lines: ["Existing team management quality?", "Would we have to replace management?"],
      },
      {
        label: "Ability to Execute",
        lines: [
          "Do we have access to capital to purchase the team?",
          "Our expertise in running a sports business enterprise",
          "Ability to achieve synergies we identified?",
        ],
      },
      {
        label: "Other Factors",
        lines: [
          "Fan-base reaction to PE buyer?",
          "League approval of our purchase?",
          "Potential tension between maximizing the investment and winning? (e.g., whether to increase spend on player salaries)",
          "Regulatory/legal risks?",
          "Macro risks to sport of baseball (e.g., lower fan interest)",
          "Other investments we could make with better ROI?",
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Wrap-Up",
    title: "Wrap-Up",
    kind: "qa",
    qText: "The MD at Alpha Capital is walking down the hallway and she wants to know what our initial findings and recommendations are.  What do you tell her?",
    infoBoxLabel: "Note for Interviewer",
    infoSections: [
      { paragraphs: [
      "This case hinges on the candidate realizing that **revenue and cost synergies are required** to make this a viable investment.  Strong math skills are required, including intuition around the synergies.  The candidate could use the prompt to underpin a strong framework (a pre-packaged framework will likely lead to problems.  Finally, strong candidates will **continue to drive the case** throughout, particularly moving from a basic financial analysis to a discussion of the other considerations."] },
    ],
  },
];
