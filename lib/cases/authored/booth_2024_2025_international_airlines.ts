import type { CasePage } from "../content";

export const CASE_ID = "47102dc7-7fb3-4e3a-81cc-b86919087cef";

const PROMPT =
  "One of our clients, a leading international airline, has come to Bain with a problem. Over the last three years they have noticed that while their business has been doing well, their profitability seems to be stagnant. They have come to us to try to determine what the issue is and how they can correct the problem.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A leading international airline has seen its profitability stagnate over the last three years even though the business is doing well. Find the source of the problem and recommend how to correct it.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "profitability", "airline", "light-math", "exhibit-heavy"],
};

const cell = (v: string, i: number) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const), w: i === 0 ? 600 : 400, fg: "#1f2421" });
const rowsOf = (rows: string[][]) => rows.map((r) => ({ cells: r.map(cell) }));
const heads = (hs: string[]) => hs.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Of what experience on your resume are you most proud? 2. How have you used analysis to guide your decisions?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a profitability case. The candidate should draw out a framework outlining the possible issues and then use it to ask exploratory questions. Ensure the candidate understands the airline business model before proceeding.",
        ],
      },
      {
        label: "Framework",
        paragraphs: [
          "This is a classic profitability case, so a framework considering external factors (i.e. state of the airline industry, competitive landscape) and internal factors (i.e. revenue streams, costs) is appropriate. The framework should be industry specific.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Analysis of Freight" },
          { n: "3", text: "Profitability evaluation" },
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
    guidancePreIntro: "Additional Information (to provide during discussion with the candidate):",
    guidancePreLines: [
      "The airline has two main lines of business: passenger and freight. **Provide Exhibit 1** only when asked about business segments (product mix or profit trends). The firm operates globally.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** The client is experiencing decreases in profitability due to the freight business. I would like to begin by analyzing trends in the profitability of this business segment over the past several years.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Increase profitability by optimizing usage on freighter flights",
      children: [
        {
          label: "This is not a market wide trend",
          children: [
            {
              label: "Clients",
              children: [{ label: "Market size" }, { label: "Overall growth trends" }, { label: "Demographic / client-mix changes" }],
            },
            {
              label: "Competition",
              children: [{ label: "Same profitability trend?" }, { label: "New competitors in the market?" }],
            },
            {
              label: "Innovation and trends",
              children: [{ label: "Alternative transportation developments affecting business (Uber, faster trains, etc.)" }],
            },
          ],
        },
        {
          label: "Profitability is decreasing due to freight business",
          children: [
            {
              label: "Revenues",
              children: [{ label: "Product-mix" }, { label: "Passengers" }, { label: "$revenue / mile traveled ratio" }],
            },
            {
              label: "Costs",
              children: [
                { label: "Capacity utilization" },
                { label: "Fuel costs" },
                { label: "Maintenance" },
                { label: "Personnel" },
                { label: "Insurance" },
              ],
            },
          ],
        },
        {
          label: "Freight business can be improved",
          children: [
            { label: "Major cost item can be improved making profitability grow" },
            { label: "Investment needed to make the change is more than compensated by the upside (NPV, ROIC, BE analysis)" },
            { label: "Special customer needs that make adjustments impossible (service levels)" },
            { label: "Any long-term commitments?" },
            { label: "Re-sell capacity" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Note that this is a Bain & Co case and the candidate should start with an \"Answer First\" approach. The answer provided might be different as long as the supporting facts below are MECE and able to redirect the candidate to the correct analysis.",
      "The ideal candidate should be quick to hypothesize about the recovery of one of the business segments. If clarifying questions and answers already indicate there is a freight problem, the hypothesis should be related to freight flights.",
      "If the candidate did not take an answer first approach, the framework should include buckets associated with the market (size, customers and competitors), client profitability (detailed revenues and costs, airline specific, references to product mix) and execution (regulation, decision making, ability and client capabilities).",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1: Segments",
    title: "Exhibit 1: Segments",
    kind: "qa",
    qText: "Let the candidate walk you through the data.",
    infoBoxLabel: "Details About Freight",
    infoSections: [
      {
        paragraphs: ["Provide the following information once candidate identifies freight as an issue:"],
        lines: [
          "There are two main types of freight: belly freight, which is carried in the bays of the planes that are operating as passenger jets, and freighter freight, which is carried on specially-designed freighters.",
          "With the exception of live animal freight, which is an inconsequential portion of this airline's overall business, all types of freight can be carried on either freighters or passenger planes.",
          "Passenger planes typically have about 35% of the room for freight as compared to freighters.",
        ],
      },
    ],
    dataTableTitle: "Revenue and Profit by Business Segment",
    dataTableCols: "1.6fr 1fr 1fr 1fr",
    dataTableHeaders: heads(["", "2000", "2001", "2002"]),
    dataTableRows: rowsOf([
      ["Passenger Revenues", "$300 million", "$375 million", "$450 million"],
      ["Profits from Passenger Business", "$140 million", "$165 million", "$190 million"],
      ["Freight Revenues", "$212.5 million", "$225 million", "$275 million"],
      ["Freight profits", "$200 million", "$190 million", "$120 million"],
    ]),
    guidanceLabel: "Key Takeaways",
    guidanceLines: [
      "There might be a problem with the usage of freighter and passenger jets to carry the freight.",
      "Belly freight is a substitute for freighters themselves.",
      "Candidate should now ask for some information about the profitability of belly freight versus freighter freight.",
    ],
  },
  {
    n: "04",
    label: "Exhibit 2: Profits",
    title: "Exhibit 2: Profits",
    kind: "qa",
    guidancePreLabel: "Key Data",
    guidancePreIntro:
      "Provide the following once asked about belly versus freighter freight profitability. This box gives details on costs, then move to usage in the Additional Details box. **Revenues are included in Exhibit 2 (next page) and should be shown to candidate last.**",
    guidancePreLines: [
      "The cost per ton of belly freight (i.e. the incremental cost to the airline) is approximately 20% that of freighter freight.",
      "The time to deliver belly freight is approximately 10% longer than that of freighter freight.",
      "The destinations served are actually greater with belly freight flights than with freighter freight.",
      "They operate out of the same airports, although separate personnel are required to operate freighter freight flights.",
      "If belly freight or freighter freight capacity goes unoccupied, it's non-revenue generating (i.e. nothing else is carried in that space).",
    ],
    infoBoxLabel: "Additional Details",
    infoSections: [
      {
        lines: [
          "International Airlines has quadrupled their number of freighters from 3 to 12 over the past 3 years. Further they have added new freighter flights. This has led to the usage of the freighters' capacity on each flight to drop from 85% to 35%.",
          "At the same time, the number of passenger flights has doubled and the number of destinations served via passenger flights has increased by 1/3. Belly freight capacity usage however has dropped from 85% to 60%.",
        ],
      },
    ],
    dataTableIntro: [
      "The total cost for a freighter freight flight averages $400,000 per flight and for passenger flights they are $600,000 (regardless of the freight carried). Further, revenues for each flight from the freight move on a sliding scale based upon how full the planes are.",
    ],
    dataTableTitle: "Revenue By Freight Usage",
    dataTableCols: "1.6fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: heads(["Freight usage:", "25%", "50%", "75%", "100%"]),
    dataTableRows: rowsOf([
      ["Passenger (freight revenues per flight)", "$150,000", "$300,000", "$450,000", "$600,000"],
      ["Freighter (freight revenues per flight)", "$200,000", "$400,000", "$600,000", "$800,000"],
    ]),
    answerText:
      "Due to the unnecessary freighter expansion project, the airline is making ==$280K== per freighter flight down from ==$680K==. As a result, it is now losing ==$120k per flight== versus a profit of ==$280k per flight==.\n- $800K * (85%) = $680K    $800K * (35%) = $280K\n- $400K cost per freighter flight:\n  - Before: $680K - $400K = $280K profit\n  - Current: $400K - $280K = $120K loss per freighter flight",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Much of this freight could be carried in the belly of the planes and would result in a cost free incremental profit to the airline.",
      "It can consider trimming its freighter operations to lower facility / personnel costs.",
      "It can consider entering into agreements with other freighter companies in order to share usage of planes and personnel in an effort to cut costs / maximize usage.",
      "The airline could try and become a leader in the express freighting business.",
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
        groups: [
          {
            heading: "Examples",
            items: [
              "Use passenger flights' available freight capacity to serve current freight business and study the sale of freight business",
              "Sell available capacity to competition",
            ],
          },
          {
            heading: "Supporting factors",
            items: [
              "Freight business losing $120k per flight",
              "Passenger flights at 60% capacity on belly freight",
              "Belly freight costs only 20% of that of freighter flights",
            ],
          },
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Can the company cover the same routes?",
              "Further reduction in use of freighter and passenger flight capacity",
              "Expensive and risky to try and become a leader in the express freighting business",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Analyze need to reduce number of routes to return to profitable freighter flights while maximizing usage of passenger freight to increase profit",
              "Review any possible contractual constraint on selling / divesting from freight",
              "Analyze spin-off opportunities for freight business (business valuation)",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "A good candidate takes an answer first approach with MECE supporting factors. Additionally, specially for this case, the candidate should clarify the business model of the firm, namely regarding product mix. The candidate should also be able to understand the math and provide the conclusion that the firm is losing $120k / freight flight without any support from the interviewer.",
    ],
  },
];
