import type { CasePage } from "../content";

export const CASE_ID = "ef874bf1-1b1c-4f02-984c-6092cb6cc349";

const PROMPT =
  "Your client is GreenShield Health Insurance, or GHI. They are a health insurance company that wants to expand into Florida. GHI wants your help creating a business plan for this venture to see if it makes sense to enter this market.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry / Market Sizing",
  synopsis:
    "A health insurance company wants to expand into Florida and needs a business plan. Size the market, work out the breakeven share and choose the best sales channel to decide whether to enter.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "market-sizing", "breakeven", "channel-selection"],
};

const cell = (v: string, i: number) => ({ v, align: i === 0 ? ("left" as const) : ("right" as const), w: 400, fg: "#1f2421" });
const rowsOf = (rows: string[][]) => rows.map((r) => ({ cells: r.map((v, i) => cell(v, i)) }));
const heads = (hs: string[]) => hs.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("right" as const) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Describe a time when you led a team through a significant change or introduced a new idea during a project. 2. Tell me about a time when you failed.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: ["This is a 3 part case that tests several different skills:"],
        lines: [
          "**PART 1: MARKET ATTRACTIVENESS (15 min)**",
          "  Testing: Market Sizing, Breakeven Analysis, other factors",
          "**PART 2: CHANNEL SELECTION (15 min)**",
          "  Testing: Grasp of channel economics of client acquisition model, other channel factors",
          "**PART 3: PROPOSED RECOMMENDATION (5 min)**",
          "  Testing: Ability to synthesize conclusions from large amounts of data, identify risks, and respond to challenges",
        ],
      },
      {
        label: "Case Prompt",
        lines: [
          "**Before** allowing the candidate time to write out a framework, have a discussion about the important facets of a business plan and what one would need to believe to enter this market.",
          "The candidate would ideally touch upon market attractiveness, customer identification, and distribution channels. For the next portion of the case, **guide** the candidate through each of the dimensions and allow them to come up with a separate mini-framework for each.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Q&A Discussion" },
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
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Health Insurance Market",
          children: [
            { label: "Size", children: [{ label: "# insured by employer" }, { label: "# insured by other means v. uninsured" }] },
            {
              label: "Customer Segments",
              children: [{ label: "Insured v. uninsured" }, { label: "Ability to afford insurance" }, { label: "Satisfaction with current plan" }],
            },
            { label: "Competition", children: [{ label: "Other health insurance companies" }, { label: "State-run health exchange" }] },
            { label: "Channels", children: [{ label: "Direct (mail, calls, agents) v. indirect (internet, billboard)" }] },
            { label: "Growth Rate" },
          ],
        },
        {
          label: "Profitability",
          children: [
            { label: "Revenue", children: [{ label: "Price per policy" }, { label: "Volume-# potential policies issued" }] },
            {
              label: "Costs",
              children: [
                { label: "Fixed costs-initial investment" },
                { label: "Variable costs-per policy issued (admin, etc.), salesforce, marketing" },
              ],
            },
          ],
        },
        {
          label: "Company (GHI)",
          children: [
            { label: "Fit with current portfolio of customers (by state)" },
            { label: "FL insurance regulation concerns" },
            { label: "Changes to existing insurance laws (e.g. ACA)" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should **walk** the interviewer through their framework. The interviewer should **ask further questions** of the candidate, if necessary, to drive a discussion around market potential for the client.",
      "  If the candidate does not fully flush out their thoughts on the size and segments associated with the market, **probe** the candidate further by asking, do you think that every person who could individually get health insurance (>18 yrs. old) in FL has health insurance?",
      "  If the candidate still struggles to identify different customer segments for the market, **prompt** them by saying, what are some reasons that a person may not have insurance?",
    ],
  },
  {
    n: "03",
    label: "Part 1: Market Attractiveness",
    title: "Part 1: Market Attractiveness",
    kind: "qa",
    guidancePreLabel: "Part 1: Market Attractiveness",
    guidancePreLines: [
      "1. **Ask** the candidate how they would estimate market size (e.g. what data would be necessary, how they would use that data, etc.).",
      "  After this discussion, **show Exhibit 1 (cover Exhibit 2)** and ask the candidate to react. No calculations are necessary, but the candidate should have already cited several of the factors in the exhibit during the discussion.",
      "2. **Ask** the candidate to determine the breakeven criteria and formula, given the following information **(show Exhibit 2)**:",
      "  Investment Required $2,000,000",
      "  Revenue per policy = $500",
      "  Medical Cost per policy = $350",
      "  Admin Cost per policy = $100",
      "  The candidate should easily calculate the contribution margin per policy (==$50==). As a result, ==40,000 policies== need to be sold to cover the 2M investment. Assume all costs and revenues are over the lifetime of the customer.",
      "3. Next, using Exhibits 1 and 2, **ask** the candidate to calculate the share of the current market the firm would need to capture to breakeven:",
      "  (40,000 policies) / (4,800,000)= ==0.8%==",
      "  Note: Use number of insured, not target market. The candidate should identify that this is a realistic market share target.",
    ],
    dataTableTitle: "Exhibit 1: Market Sizing",
    dataTableCols: "1.6fr 1fr",
    dataTableHeaders: heads(["Market Estimation", ""]),
    dataTableRows: rowsOf([
      ["Florida population", "17,000,000"],
      ["Over 18 yrs. old", "12,000,000"],
      ["Not covered by employer, %", "50%"],
      ["Not covered by employer, amt", "6,000,000"],
      ["Currently Insured, %", "80%"],
      ["Currently Insured, amt", "4,800,000"],
      ["Uninsured, %", "20%"],
      ["Uninsured, amt", "1,200,000"],
      ["Uninsured, can afford", "30%"],
      ["Uninsured, can afford", "360,000"],
      ["Insured but unhappy", "30%"],
      ["Unhappy, amt", "1,440,000"],
      ["Total Target Audience", "1,800,000"],
    ]),
    dataTableMore: [
      {
        title: "Exhibit 2: Breakeven Analysis",
        cols: "1.6fr 1fr",
        headers: heads(["Breakeven Analysis", ""]),
        rows: rowsOf([
          ["Upfront Investment", "$ 2,000,000"],
          ["Revenue Per Policy", "$ 500"],
          ["Medical Cost Per Policy", "$ 350"],
          ["Administrative Cost Per Policy", "$ 100"],
        ]),
      },
    ],
  },
  {
    n: "04",
    label: "Part 2: Channel Selection",
    title: "Part 2: Channel Selection",
    kind: "qa",
    guidancePreLabel: "Part 2: Channel Selection",
    guidancePreLines: [
      "1. The candidate should **begin** with a brief discussion of their framework for addressing the issue of channel selection (having been previously completed). Below are relevant questions that the candidate should ask to arrive at an appropriate solution.",
      "2. How is insurance sold?",
      "  Discuss direct (calling customers, direct mail, agents) and indirect models (internet, billboard).",
      "3. Where do the sales come from?",
      "  Discuss leads. Specifically, the candidate should identify that direct models will likely generate far higher leads than indirect models, but are probably also more costly.",
      "  After the candidate identifies channel differences in lead generation, **show Exhibit 3** and allow them to react. A strong candidate may dive into calculating the most attractive sales channels.",
      "4. **Ask** the candidate to explain differences between yield percentages and look for a coherent response (e.g. secondary and tertiary insights are given, a relationship to self and knowledge of how effective each channel is personally may be explained, etc.).",
      "5. **Ask** the candidate to identify the most attractive sales channel and which resulting model is best (e.g. direct v. indirect).",
    ],
    dataTableTitle: "Exhibit 3: Channel Selection",
    dataTableCols: "1.3fr repeat(5, 1fr)",
    dataTableHeaders: [
      { v: "Lead Generation by Channel", align: "left" },
      { v: "Internet", align: "right" },
      { v: "Direct Mail", align: "right" },
      { v: "Call Center", align: "right" },
      { v: "Billboard", align: "right" },
      { v: "Agents", align: "right" },
    ],
    dataTableRows: rowsOf([
      ["Cost Per Lead", "25", "15", "30", "10", "30"],
      ["Number of Leads", "1,000", "20,000", "10,000", "500", "10,000"],
      ["Yield", "10%", "2%", "5%", "1%", "30%"],
      ["Revenue Per Sale", "1000", "1000", "1000", "1000", "750"],
    ]),
    guidanceLabel: "The profit calculation for each channel is as follows",
    guidanceLines: [
      "Total Revenue-Total Cost = ((# of leads) * (% yield) * (revenue per sale)) – ((# of leads) * (cost per lead))",
      "**Result:**",
      "  Internet - $75K",
      "  Direct Mail - $100K",
      "  Call Center - $200K",
      "  Billboard - $0",
      "  Agent - $1,950K",
      "The candidate should identify that **direct sales models are best** and that using agents, call centers, and direct mail are the best channels for selling insurance.",
    ],
  },
  {
    n: "05",
    label: "Part 3: Recommendation",
    title: "Part 3: Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: ["The client company should enter the Florida insurance market"],
        lines: [
          "Based on the upfront investment necessary, the client only needs to capture ==0.8%== of the insured market to breakeven",
          "The direct channels are the most profitable and, as such, the client company should leverage these starting with agents first",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "The Florida market may look attractive now, but we do not have any information on market trends",
              "We do not know about our client’s existing direct sales capabilities (e.g., do they already employ agents and have expertise in this area?)",
              "We are not sure if the direct channels will best address the market segments the client hopes to target in Florida",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Conduct further market research to best understand trends in the FL health insurance market over time",
              "Create plan for build out of client salesforce (agents) and training specific to the FL health insurance market",
              "Determine how the client’s target customer responds to marketing by sales channel to refine lead generation model",
            ],
          },
        ],
      },
    ],
  },
];
