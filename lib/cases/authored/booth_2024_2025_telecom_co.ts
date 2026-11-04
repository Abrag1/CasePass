import type { CasePage } from "../content";

export const CASE_ID = "5ccd93e2-8602-462a-80a9-acc791d19330";

const PROMPT =
  "Our client, Telecom Co., provides satellite TV services (DBS) nationally. Telecom Co.’s customer base is being threatened by telcos and cable companies offering “triple play” (combo services). To combat this, Telecom Co. is considering deploying wireless network (WiMAX) to offer broadband internet.\n\nShould the client go into the WiMAX business?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A national satellite TV provider is considering a wireless broadband (WiMAX) network to answer rivals' combo offers. Work through the cost structure, spectrum and base station economics, and a break-even view of the investment.",
  full_prompt: PROMPT,
  tags: ["candidate-driven", "market-entry", "break-even", "telecom", "exhibit-heavy"],
};

const LBL = "#99ccff";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time when you had to convince someone of an opposing viewpoint 2. Tell me about a time when you overcame adversity",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a market entry case that requires break even analysis. The candidate may be challenged to seek out understanding of the industry in order to clearly articulate a solution.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Brainstorm" },
          { n: "3", text: "Profitability analysis" },
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
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** Telecom Co. should invest in WiMAX to be competitive against other providers.",
          "Framework to help answer whether or not the investment is attractive:",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Costs",
          children: [
            {
              label: "Capital expenditures",
              children: [{ label: "Base stations" }, { label: "Licenses" }, { label: "Additional equipment" }],
            },
            {
              label: "Operational expenses",
              children: [{ label: "Maintenance" }, { label: "Leases" }],
            },
            { label: "SG&A", children: [{ label: "Sales & marketing" }] },
          ],
        },
        {
          label: "Revenue",
          children: [
            {
              label: "Market share",
              children: [{ label: "How big is the market?" }, { label: "Reasonable market share?" }],
            },
            {
              label: "Pricing",
              children: [{ label: "Market price benchmark" }, { label: "Price sensitivity" }],
            },
          ],
        },
        {
          label: "Key challenges",
          children: [{ label: "Buy vs.build" }, { label: "Competitive moves" }, { label: "Regulations" }],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidates will take a variety of approaches to structuring an approach to this question. The primary things to look for are:",
      "Did the candidate state a **hypothesis**?",
      "  The candidate should express the core idea that they would like to test through their analysis. They should demonstrate how their hypothesis answers the core prompt of whether or not Telecom Co. should enter the WiMAX market",
      "  It’s less important for the hypothesis to be backed up with evidence, since it’s so early in the case (though strong candidates will draw on their own knowledge and intuitions)",
      "Is the framework **case-specific**?",
      "  Excellent frameworks will explore specific aspects of telco industry",
      "The candidate should **move forward** with examining the costs next",
    ],
  },
  {
    n: "03",
    label: "Exhibit #1: Total Cost Structure",
    title: "Total Cost Structure",
    kind: "qa",
    guidancePreLabel: "Exhibits",
    guidancePreLines: ["**Exhibit 1: Cost structure**", "  Outline of costs associated with pursuing the opportunity"],
    // The printed call-out (a red arrow under SG&A) is carried as a child of SG&A; the footnote follows the tree.
    treeRoot: {
      label: "Total cost",
      children: [
        {
          label: "Network cost",
          children: [{ label: "Spectrum" }, { label: "Base Stations" }, { label: "Customer Premise Equipment*" }],
        },
        {
          label: "SG&A",
          children: [{ label: "Assume these costs are minimal initially and focus on network costs" }],
        },
      ],
    },
    extraCharts: [
      {
        kind: "flow",
        aspect: 0.06,
        nodes: [{ text: "* CPE is additional equipment placed in subscribers’ homes", x: 0.01, y: 0.5, shape: "text", italic: true, size: 20, align: "left" }],
      },
    ],
    guidanceLabel: "Interviewer Guide",
    guidanceLines: ["**Exhibit 1: Cost structure**", "  Candidate should ask for detailed breakdown / data for each."],
  },
  {
    n: "04",
    label: "Exhibit #2: Historic Spectrum auction price",
    title: "Historic Spectrum auction price",
    kind: "qa",
    guidancePreLabel: "Exhibits",
    guidancePreLines: ["**Exhibit 2: Spectrum Auction Price**", "  Assume Spectrum price average is ==$500M== and use this in final calculation"],
    // Values are the printed bar labels; the dashed Average line sits at 500.
    colBarTitle: "Spectrum auction price",
    colBarItems: [
      { label: "May-2005", value: 1100, valueLabel: "1,100", color: LBL, innerLabel: "Verizon" },
      { label: "Oct-2005", value: 480, valueLabel: "480", color: LBL, innerLabel: "T-Mobile" },
      { label: "Dec-2005", value: 250, valueLabel: "250", color: LBL, innerLabel: "Comcast" },
      { label: "Feb-2006", value: 450, valueLabel: "450", color: LBL, innerLabel: "Verizon" },
      { label: "Apr-2006", value: 340, valueLabel: "340", color: LBL, innerLabel: "AT&T" },
      { label: "Aug-2006", value: 750, valueLabel: "750", color: LBL, innerLabel: "Verizon" },
      { label: "Nov-2006", value: 350, valueLabel: "350", color: LBL, innerLabel: "T-Mobile" },
      { label: "Mar-2007", value: 240, valueLabel: "240", color: LBL, innerLabel: "Verizon" },
      { label: "Apr-2007", value: 620, valueLabel: "620", color: LBL, innerLabel: "AT&T" },
      { label: "Jun-2007", value: 520, valueLabel: "520", color: LBL, innerLabel: "AT&T" },
      { label: "Sep-2007", value: 320, valueLabel: "320", color: LBL, innerLabel: "Verizon" },
    ],
    colBarYMax: 1250,
    colBarYStep: 250,
    colBarYTickLabels: ["0", "250", "500", "750", "1,000", "$1,250M"],
    colBarNoGrid: true,
    colBarValueLabels: true,
    colBarBarRatio: 0.7,
    colBarRefLine: { value: 500, label: "Average", color: "#111111" },
    guidanceLabel: "Interviewer Guide",
    guidanceLines: [
      "**Exhibit 2: Spectrum Auction Price**",
      "  Candidate should **list** what they see in this historic data, but ultimately identify that they can use the **average** in their total cost calculation",
    ],
  },
  {
    n: "05",
    label: "Exhibit #3: Own or Lease base station?",
    title: "Own or Lease base station?",
    kind: "qa",
    guidancePreLabel: "Exhibits",
    guidancePreLines: [
      "**Exhibit 3: Base Station Own or Lease?**",
      "  **Before** diving into calculating the cost of base stations, ask the candidate to list pros and cons for building vs. leasing base stations.",
    ],
    infoBoxLabel: "Brainstorm sample answer",
    infoSections: [
      {
        label: "Build",
        groups: [
          { heading: "Pro", items: ["Complete control over network footprint", "Best tower real estate can be used for network"] },
          { heading: "Con", items: ["Very costly to own / operate", "Longer time-to-market"] },
        ],
      },
      {
        label: "Lease",
        groups: [
          { heading: "Pro", items: ["Smaller upfront investment", "Time-to-market advantages as towers already exist"] },
          { heading: "Con", items: ["Availability of towers → coverage not possible if tower real estate unavailable in given location"] },
        ],
      },
    ],
    // Segment boundaries measured on a 3.5x render of the source (axis ticks as scale, +/-0.5 on a 400 / 150 scale);
    // the 380 and 150 totals are printed.
    extraCharts: [
      {
        kind: "stackCols",
        panels: [
          {
            title: "Build (Own & Operate)",
            subtitle: "Single base station",
            yMax: 400,
            yStep: 100,
            topLabel: "$400K",
            columns: [
              {
                label: "CAPEX & OPEX",
                total: "380",
                segs: [
                  { value: 200, color: LBL, label: "Electronics" },
                  { value: 80, color: LBL, label: "Planning & Design" },
                  { value: 50, color: LBL, label: "Cabling/Misc." },
                  { value: 50, color: LBL, label: "Maintenance" },
                ],
              },
            ],
          },
          {
            title: "Lease",
            subtitle: "Single base station",
            yMax: 150,
            yStep: 50,
            topLabel: "$150K",
            columns: [
              {
                label: "OPEX",
                total: "150",
                segs: [
                  { value: 50, color: LBL, label: "Tower lease" },
                  { value: 50, color: LBL, label: "Backhaul lease" },
                  { value: 30, color: LBL, label: "Electronics" },
                  { value: 10, color: LBL, label: "Cabling/Misc." },
                  { value: 10, color: LBL, label: "Maintenance" },
                ],
              },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guide",
    guidanceLines: [
      "**Exhibit 3: Base Station Own or Lease?**",
      "  Candidate should realize that it is **cheaper to rent** and should suggest to rent, assuming ==$150K== per station. This should be used in final cost calculation.",
      "  Brainstorm should be organized and show structure.",
    ],
  },
  {
    n: "06",
    label: "Math",
    title: "Math",
    kind: "qa",
    infoBoxLabel: "Math: Info",
    infoSections: [
      {
        label: "Base Station",
        paragraphs: ["A good candidate should know:"],
        lines: ["U.S. population", "Persons per household (2.5)"],
      },
      {
        paragraphs: ["**When asked**, give the candidate the information below:"],
        lines: [
          "Market share (estimated by management) is 5%",
          "Base station bandwidth is 80, 000 kbps",
          "Bandwidth required per household is 320 kbps",
          "% of concurrent connections is 50%",
          "  Telco companies balance the cost per subscriber and required bandwidth per subscriber by estimating % of users online at the same time",
          "Cost per base station is $150K (to lease)",
        ],
      },
      {
        label: "Customer Premise Equipment",
        lines: ["CPE cost is $150 per household", "Client estimates that 2/3 could be passed through to the customer"],
      },
      {
        label: "Revenue from offering",
        lines: ["Broadband internet service price is $20 per month"],
      },
    ],
    calcLines: [
      { q: "Base Station Cost", a: "" },
      { q: "Estimating number of households", a: "300M / 2.5 = ==120M== households" },
      { q: "Marketshare", a: "120M x 5% = ==6M== households" },
      { q: "Households per base station", a: "(80,000 kbps / 320 kbps) x 2 = ==500== households per base station" },
      { q: "***multiplied by 2 to account for concurrent connections (50%)", a: "" },
      { q: "Number of base stations needed to service 6M households", a: "6M / 500 = ==12,000== households" },
      { q: "Base station cost", a: "12,000 x 150,000 = ==$1.8B==" },
      { q: "CPE Cost", a: "" },
      { q: "Total cost", a: "$150 x 6M = ==$900M==" },
      { q: "Pass on 2/3 to customer", a: "$900M x 1/3 = ==$300M==" },
      { q: "TOTAL COSTS", a: "" },
      { q: "Spectrum = $500M    Base Station = $1.8B    CPE = $300M", a: "$500M + $1.8B + $300M = ==$2.6B==" },
      { q: "REVENUE", a: "" },
      { q: "6M subscribers x $20/month x 12 months", a: "= ==$1.4B / year==" },
    ],
  },
  {
    n: "07",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: [
          "Telecom Co. should **not invest** in WiMAX due to high up-front costs and lower revenue lift.",
          "Telecom Co. should focus on **defending existing core services** such as satellite TV.",
        ],
      },
      {
        label: "Risks / Next Steps",
        groups: [
          { heading: "1. Lose market share to competitors", items: ["Identify other areas of value to retain customers. This could be done by tech innovations or partnerships."] },
          { heading: "2. Lose out on high growth opportunity", items: ["Research customer trends to quantify the potential in WiMAX market"] },
        ],
      },
    ],
  },
];
