import type { CasePage } from "../content";

export const CASE_ID = "cdf278d9-ab08-46f4-b862-2fe7124bca48";

const PROMPT =
  "In the year 2012, we have been retained by a television network that is trying to decide how much to bid for the rights to broadcast the 2018 Winter Olympic Games in PyeongChang, South Korea.\n\nHow much should they bid?";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "A television network wants to decide how much to bid for the rights to broadcast the 2018 Winter Olympic Games. Estimate the advertising revenue, work through the costs and discount the profit back to 2012 to find the maximum bid.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "investment-decision", "heavy-math", "npv", "brainstorming"],
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
    note: "**Fit Questions** — 1. Tell me about a time you had to deal with a conflict with a group or with your manager. 2. Tell me about a time you had to deal with a difficult team member or overcome a coworker who was blocking progress.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: ["**Drive** case to **revenues first** and read quantitative data beforehand."],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Revenue Analysis" },
          { n: "3", text: "Cost analysis" },
          { n: "4", text: "NPV calculation and recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    guidancePreLabel: "Case Development",
    guidancePreLines: ["Our client is a broadcast television network that makes money through advertising only, not subscriptions."],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "Working Hypothesis: The bid price will be determined by the overall profitability of broadcasting the Olympics. Therefore, I would like to first start with potential ad revenue generated from televising this event.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Broadcasting Market",
          children: [
            {
              label: "Olympics Viewers",
              children: [
                { label: "Size for this particular event" },
                { label: "Trends on Olympic viewership (growing / shrinking / method of viewing (ex. tablets))" },
                { label: "Population segments – are viewers a compelling population for advertisers?" },
              ],
            },
            {
              label: "Competition",
              children: [{ label: "Other networks / substitutes (e.g. streaming online)" }],
            },
          ],
        },
        {
          label: "Amount to bid – determined by profitability",
          children: [
            {
              label: "Revenue",
              children: [
                { label: "Advertising" },
                { label: "Merchandising" },
                { label: "License non-US networks to use our feed" },
              ],
            },
            {
              label: "Cost",
              children: [
                { label: "Fixed costs – building on-site studio, paying talent, broadcast infrastructure" },
                { label: "Variable costs – hotels, insurance" },
                { label: "Other bidding costs" },
                { label: "Opportunity cost – what else could we be showing?" },
                { label: "Discounting – cash flows will be in the future; what is client's discount rate?" },
              ],
            },
          ],
        },
        {
          label: "Television Network",
          children: [
            { label: "Fit – are we the right station? Are we ESPN, ABC or HGTV?" },
            { label: "Experience – past sports or Olympic broadcasting experience?" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "This is a **profitability case** so the framework should include internal and external factors driving profitability including the following:",
      "  Assessment of the current market and competitive landscape.",
      "  Revenues and costs: please notice that the case is focused on the revenue side. It is fine to ask the candidate about costs as a brainstorming exercise, but make sure the candidate deep dives into revenues.",
      "  Candidate should acknowledge that the amount to bid is limited by the profits that could be generated from the broadcasting.",
    ],
  },
  {
    n: "03",
    label: "Key Data",
    title: "Key Data",
    kind: "qa",
    shareable: false,
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "All data and facts to be provided upon candidate's request.  **Do not show** the candidate the table.  Rather, expect the candidate to organize this information appropriately as this case provides an opportunity for the candidate to practice structuring their math.",
      "After leading the candidate to focus on ad revenue, they should calculate total ad revenue generated from the Olympic event (==$928M==). Per hour revenue generated is ==$4M== ($200k per slot x 20 slots per hour) in non-prime time and ==$8M== in prime time ($400k per slot x 20 slots per hour).",
    ],
    dataTableIntro: [
      "Market research has shown that consumers can take no more than 10 minutes of ads per hour of television; they will stop watching if ad time is higher.",
    ],
    dataTableCols: "1fr 1.4fr",
    dataTableHeaders: [hd("Winter Olympics Schedule"), hd("")],
    dataTableRows: [
      { cells: [L("Duration"), L("16 days")] },
      { cells: [L("Open Ceremony"), L("First day (Friday)")] },
      { cells: [L("Competitions"), L("Held in next 14 days")] },
      { cells: [L("Closing Ceremony"), L("Last day (Saturday)")] },
      { cells: [L("Broadcast", 700), L("")] },
      { cells: [L("Opening Ceremony"), L("8 – 11pm")] },
      { cells: [L("Weekdays coverage"), L("9am – 12pm, 2 – 5pm, 7 – 11pm (per day)")] },
      { cells: [L("Weekend coverage"), L("11am – 9pm (per day)")] },
      { cells: [L("Closing Ceremony"), L("8 – 11pm")] },
      { cells: [L("Advertising", 700), L("")] },
      { cells: [L("Prime Time"), L("Mon to Fri 7 – 11pm; Sat – Sun all day, Opening and Closing ceremonies")] },
      { cells: [L("Non Prime Time"), L("Mon to Fri all other times")] },
      { cells: [L("Adv. slot duration"), L("30 seconds")] },
      { cells: [L("Prime Time adv. slot cost"), L("$400,000")] },
      { cells: [L("Non Prime Time adv. slot cost"), L("$200,000")] },
    ],
    calcTable: {
      headers: ["Category", "Calculation", "Total"],
      rows: [
        ["Weekday (non prime)", "10 days X 6 hours X $4M", "$240M"],
        ["Weekday (Prime)", "10 days X 4 hours X $8M", "$320M"],
        ["Weekend (Prime)", "4 days X 10 hours X $8M", "$320M"],
        ["Opening/Closing", "2 events X 3 hours X $8M", "$48M"],
        ["Total", "", "==$928M=="],
      ],
      totalLast: true,
    },
  },
  {
    n: "04",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    guidancePreLabel: "Brainstorm",
    guidancePreLines: [
      "After calculating revenue, have the candidate **brainstorm costs**. An internal/external framework could be appropriate here.",
    ],
    infoBoxLabel: "Brainstorm",
    infoSections: [
      {
        label: "Internal",
        groups: [
          {
            heading: "FC",
            items: ["Buildings on-site", "Paying network talent", "Broadcast infrastructure"],
          },
          {
            heading: "VC",
            items: ["Contract employees (additional on-site labor)", "Marketing to viewers about Olympics and events"],
          },
        ],
      },
      {
        label: "External",
        groups: [
          {
            heading: "FC",
            items: ["Rental property on-site", "Rental equipment on-site"],
          },
          {
            heading: "VC",
            items: ["Hotels", "Insurance", "Utilities on-site"],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "There is no breakdown here.  Once candidate completes brainstorm, state that the total accounting cost is ==$428M==.",
      "This yields an even accounting profit of ==$500M== ($928M-$428M). Many candidates will think the case is over; however, we still need to worry about **opportunity cost**.",
      "If candidate doesn't mention opportunity cost, remind them. Here, opportunity cost is $1M per hour of displaced programming ($1M X 146 hours), or ==$146M==. Economic profit is ==$354M== ($500M-$146M).",
      "Again, many candidates will think final answer is $354M. However, these cash flows are 6 yrs. in future (case is set in 2012) and need to be **discounted**. Discount rate is 12%; through rule of 72 (72/12=6 yrs. to double), you end up dividing 2018 profit in half. Therefore, in 2012 dollars, profit = ==$177M==.",
      "Candidate should recognize that the max bid the client should make based on predicted advertising revenue is ==$177M==.",
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
        lines: [
          "Enter a bid of ==$177M==",
          "  Expected additional revenue opportunities from being a part of the Olympics might warrant a higher bid as you may be able to expand your viewership from this opportunity, thereby enabling you to charge higher advertising fees",
          "  For excellent performance, candidate should mention that client can also prevent a competitor from having an event that is hard to counterprogram against",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Other competitors might enter the bid",
              "Fit of airing the Olympics with network brand and programming",
              "New technologies disrupting the industry might strongly change the viewership base (tablets, smartphones) and prevent client from recognizing predicted ad revenue as advertisers will shift their medium to match consumer viewership",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Assess whether or not competitors are planning to enter the bid and determine what resulting bid strategy should",
              "Complete internal assessment to ensure that network fit matches the Olympic programming",
              "Do a customer survey to understand the potential disruption caused by new technologies",
            ],
          },
        ],
      },
    ],
  },
];
