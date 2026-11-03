import type { CasePage } from "../content";

export const CASE_ID = "05d29e3b-eb14-44d8-b5a1-cbf0e26c8df2";

const PROMPT =
  "Our client, Finance Co, is an international asset manager who concentrates on retirement account administration. They are considering entering the US retirement market. Finance Co cannot decide whether to target the Defined Contribution (DC) market (e.g. 401k) or the Individual Retirement Account (IRA) market.\n• Each market contains ~$3 trillion in investable assets and generates about the same amount of margin per dollar of investable assets.\n• U.S. workers and their employers typically make investments in DC plans while working.\n• Upon job change or retirement, workers have the option of taking distributions, which remain tax deferred if rolled into an IRA.\n\nWhat is the growth outlook for each of these markets over the next 5 years? Which market is more attractive for Finance Co?";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "An international asset manager is considering entering the US retirement market and cannot decide between Defined Contribution plans and Individual Retirement Accounts. Size the growth of each market from population trends and balances, then recommend where to enter.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "growth-strategy", "market-entry", "exhibit-heavy", "heavy-math"],
};

const GREY = "#cccccc";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. What are your career goals over the next 5-10 years and how does consulting fit into that? 2. What do you typically do when you move onto a new project?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a market entry case, but the main question to be answered is: Which market has the best growth perspectives: IRA or Defined Contribution plans?",
          "Pay attention to the interviewee’s **structure/organization** during the **quantitative** section of the case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework discussion" },
          { n: "2", text: "Market Potential" },
          { n: "3", text: "Revenue analysis" },
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
    guidancePreIntro: "Additional Information (only share if asked by interviewee):",
    guidancePreLines: [
      "Over the life of a U.S. worker, they generally build up assets in DC plans.",
      "During job change or retirement, most workers will ‘roll’ (transfer) DC assets into an IRA.",
      "Transfer may only occur from DC to IRA, not vice versa.",
      "At retirement, people will begin to withdraw their balance over time.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        label: "Market Growth DC vs. IRA",
        lines: [
          "Average IRA or DC balances (current)",
          "× Current US population by age group",
          "= Current market by age group",
          "× US population growth rate by age group (next 5 years)",
          "= Projected IRA or DC market in 5 years",
          "**Population growth is the key driver**",
        ],
      },
      {
        label: "Competition",
        lines: [
          "# of competitors in each market",
          "Size of competition & fragmentation in each market",
          "Strengths/weaknesses",
          "Competitive response to Finance Co entering each market",
        ],
      },
      {
        label: "Company/Capabilities",
        lines: [
          "Which market would existing customers invest in?",
          "Marketing capability for each market?",
          "Fit with other products/services",
          "Initial cost for entry into each?",
        ],
      },
      {
        label: "Additional Risks",
        lines: ["Regulatory/political risk for each market"],
      },
      {
        paragraphs: [
          "**Transition statement:** Since population is the key growth driver for the IRA or DC market, I would like to begin by determining how the current US population is changing over the next 5 years, specifically by age group.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "After discussing the framework, the interviewee should be able to identify that population is a key driver for estimating growth of both markets. **Show only Exhibit 1, cover Exhibits 2-3.**",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    colBarTitle: "Current US population by age group",
    colBarSubtitle: "US population",
    colBarItems: [
      { label: "<35", value: 140, color: GREY },
      { label: "35-44", value: 45, color: GREY },
      { label: "45-54", value: 40, color: GREY },
      { label: "55-64", value: 30, color: GREY },
      { label: "65-74", value: 20, color: GREY },
      { label: "75", value: 20, color: GREY },
    ],
    colBarYMax: 150,
    colBarYStep: 50,
    colBarYTickLabels: ["0", "50", "100", "150M"],
    colBarXTitle: "Age Group",
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Exhibit 1**",
      "  If necessary, push candidate to discuss which segments of the population look interesting and which segments of the population will grow vs. shrink over the next 5 years.",
      "  Candidate should ask for DC and IRA balances to determine total market size. **Uncover Exhibits 2-3.**",
    ],
  },
  {
    n: "04",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    colBarTitle: "DC balances by age group",
    colBarSubtitle: "Average DC balance by age cohort",
    colBarItems: [
      { label: "<35", value: 1.5, color: GREY },
      { label: "35-44", value: 18, color: GREY },
      { label: "45-54", value: 27, color: GREY },
      { label: "55-64", value: 23, color: GREY },
      { label: "65-74", value: 10.5, color: GREY },
      { label: "75", value: 0, color: GREY, valueLabel: "" },
    ],
    colBarYMax: 30,
    colBarYStep: 10,
    colBarYTickLabels: ["0", "10", "20", "$30K"],
    colBarXTitle: "Age Group",
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    guidancePreLabel: "Exhibit 2&3",
    guidancePreLines: [
      "If necessary, push candidate to discuss main differences between DC and IRA balances.",
      "  Higher DC balances earlier in life are due to DC contributions tied to employment.",
      "  Higher IRA balances later in life are due to ability to ‘roll’ DC contributions upon job change and/or retirement, and workers are no longer able to make DC contributions in retirement.",
      "If necessary, push candidate to draw conclusions from previous analysis on population trends and identify that the IRA market looks more interesting (considering aging of population). If candidate doesn’t come to this hypothesis, ask them what are the population trends.",
      "Candidate should request information about future performance. **Show Exhibit 4, cover Exhibit 5.**",
    ],
  },
  {
    n: "05",
    label: "Exhibit 3",
    title: "Exhibit 3",
    kind: "qa",
    colBarTitle: "IRA balances by age group",
    colBarSubtitle: "Average IRA balance by age cohort",
    colBarItems: [
      { label: "<35", value: 0.4, color: GREY },
      { label: "35-44", value: 4, color: GREY },
      { label: "45-54", value: 7.5, color: GREY },
      { label: "55-64", value: 28, color: GREY },
      { label: "65-74", value: 51, color: GREY },
      { label: "75", value: 30, color: GREY },
    ],
    colBarYMax: 60,
    colBarYStep: 20,
    colBarYTickLabels: ["0", "20", "40", "$60K"],
    colBarXTitle: "Age Group",
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
  },
  {
    n: "06",
    label: "Exhibit 4",
    title: "Exhibit 4",
    kind: "qa",
    qText: "Calculate the total value of the DC and IRA market today and in the next five years.",
    colBarTitle: "Projected population growth rates by age group",
    colBarSubtitle: "Projected US Population Growth Next 5 years",
    colBarItems: [
      { label: "<35", value: 5, color: GREY },
      { label: "35-44", value: -5, color: GREY },
      { label: "45-54", value: 5, color: GREY },
      { label: "55-64", value: 20, color: GREY },
      { label: "65-74", value: 15, color: GREY },
      { label: "75", value: 5, color: GREY },
    ],
    colBarYMin: -10,
    colBarYMax: 20,
    colBarYStep: 10,
    colBarYTickLabels: ["-10", "0", "10", "20%"],
    colBarXTitle: "Age Group",
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    calcNote: "Math Analysis (for interviewer)",
    calcTable: {
      title: "IRA MARKET",
      headers: [
        "Age Group",
        "Current US Population (M)",
        "Current Average IRA Balance per Person ($K)",
        "IRA Balance Today ($B)",
        "Projected Growth Rate Next 5 Years",
        "Projected IRA Balance in 5 Years ($B)",
      ],
      rows: [
        ["<35", "140", "0.4", "56", "5%", "59"],
        ["35-44", "45", "4", "180", "-5%", "171"],
        ["45-54", "40", "7.5", "300", "5%", "315"],
        ["55-64", "30", "28", "840", "20%", "1008"],
        ["65-74", "20", "51", "1020", "15%", "1173"],
        ["75+", "20", "30", "600", "5%", "630"],
        ["", "", "", "==2.996T==", "", "==3.36T=="],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        title: "DC MARKET",
        headers: [
          "Age Group",
          "Current US Population (M)",
          "Current Average DC Balance per Person ($K)",
          "DC Balance Today ($B)",
          "Projected Growth Rate Next 5 Years",
          "Projected DC Balance in 5 Years ($B)",
        ],
        rows: [
          ["<35", "140", "1.5", "210", "5%", "221"],
          ["35-44", "45", "18", "810", "-5%", "770"],
          ["45-54", "40", "27", "1080", "5%", "1134"],
          ["55-64", "30", "23", "690", "20%", "828"],
          ["65-74", "20", "10.5", "210", "15%", "242"],
          ["75+", "20", "0", "0", "5%", "0"],
          ["", "", "", "==3.0T==", "", "==3.19T=="],
        ],
        totalLast: true,
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Exhibit 4**",
      "  A good candidate should only need to confirm initial hypothesis that IRA is more interesting and then use the provided exhibits for the math exercise.",
    ],
  },
  {
    n: "07",
    label: "Exhibit 5 (Optional)",
    title: "Exhibit 5 (Optional, if time permits)",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**Exhibit 5: (Optional, complete if time permits)**",
      "  After discussing Exhibit 4, ask candidate the below question, then **uncover Exhibit 5.**",
    ],
    qText:
      "Based on the information in Exhibit 5, you can see the rollover of DC distributions into IRAs have been identified as a key factor in IRA market growth. Assuming all else remains equal, let's say the IRA market was projected to grow to $3.1T next year. What DC rollover rate would result in growth in IRA's to $3.05T versus $3.1T?",
    stackPanelsTitle: "Cash flows by market",
    stackPanelsTickStep: 20,
    stackPanelsNoGrid: true,
    stackPanels: [
      {
        title: "DC DISBURSEMENTS",
        subtitle: "DC lump-sum distributions\nby destination",
        legend: [],
        note: "*Transferred to new plan",
        columns: [
          {
            label: "Current year",
            topLabel: "$200B",
            segs: [
              { value: 75, color: GREY, label: "Rollovers", labelColor: "#444444" },
              { value: 5, color: "#b8b8b8", label: "Transferred to new plan*", labelColor: "#444444" },
              { value: 20, color: GREY, label: "Cashed out", labelColor: "#444444" },
            ],
          },
        ],
      },
      {
        title: "IRA INFLOWS",
        subtitle: "IRA fund\ninflows",
        legend: [],
        columns: [
          {
            label: "Current year",
            topLabel: "$225B",
            segs: [
              { value: 66.7, color: GREY, label: "DC Rollovers", labelColor: "#444444" },
              { value: 33.3, color: GREY, label: "New contributions", labelColor: "#444444" },
            ],
          },
        ],
      },
    ],
    answerText:
      "50% rollover rate is needed\n- Currently, a 75% rollover rate is resulting in ==$150B== contribution to IRA growth (75% of $200B). To reduce IRA growth by $50B to $100B, rollover rate must be reduced by 1/3 to ==50%== (50% of 200B is $100B).",
  },
  {
    n: "08",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidancePreLabel: "Synthesis",
    guidancePreLines: [
      "After analysis of Exhibit 5 is completed, ask for the candidate’s recommendation. **Tell interviewee that Exhibit 5 was an independent exercise and not necessary for the recommendation.**",
    ],
    infoBoxLabel: "Evaluation",
    infoSections: [
      {
        paragraphs: ["Finance Co should enter the IRA market due to a greater 5 year growth outlook"],
        lines: [
          "Predicted ==$3.36T== in the IRA market versus ==$3.19T== in the DC market",
          "The aging population trend further confirms that the IRA is more favorable",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Lack of analysis on Finance Co’s ability to capture market share",
          "Adverse regulatory and/or political environment",
          "Financial position of Finance Co",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Need to determine:",
          "  Competitive environment of each market",
          "  Competitive response to Finance Co entering each market",
          "  Finance Co’s marketing and sales capabilities",
          "Consider:",
          "  Lobbying",
          "  Analysis of future changes",
          "Analyze company capabilities and fit of IRA market with Finance Co’s existing products / services",
        ],
      },
    ],
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "Based on the market growth outlook calculation, Finance Co should enter the IRA market over the DC market. A strong candidate response will provide a clear recommendation backed by data with a mention of key risks and next steps to moving forward.",
      "A strong candidate will also recognize that there are several additional analyses that are essential to a strong, well-rounded recommendation.",
      "The candidate should reference their framework when determining additional analysis.",
    ],
  },
];
