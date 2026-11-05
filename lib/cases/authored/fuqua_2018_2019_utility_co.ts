import type { CasePage } from "../content";

export const CASE_ID = "a604d779-164f-4fbb-9b76-8ae8c4ea0fcc";

const PROMPT =
  "Our client is Utility Co., a US-based utility company that operates on the West Coast of the United States. Utility Co. has been profitable over the last several years, and has seen relatively stable/favorable business conditions during that time. However, 2 weeks ago, regulators began pressuring Utility Co. to reduce its costs in order to improve prices/rates for customers. Utility Co. operates in a highly-regulated energy market, and is required to justify the prices/rates it charges customers through an annual process that examines a provider's cost structure and attaches a \"reasonable return\" on top of its cost structure in order to arrive at prices/rates. The CEO of Utility Co., Larry \"Chipper\" Jones, has engaged our team to identify where and how Utility Co. can reduce its costs by $500M.";

export const CASE_META = {
  review: "auto",
  case_type: "Cost Reduction",
  synopsis:
    "A regulated West Coast utility is under pressure to cut its costs by $500M. Find where its costs are out of line with peers and how to take them out.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "cost-reduction", "energy", "medium-math", "exhibit-heavy"],
};

const GREY = "#cccccc";
const hd = (v: string, align: "left" | "center" = "center") => ({ v, align, bg: GREY, fg: "#000000" });
const c = (v: string, bg: string, align: "left" | "center" = "center") => ({ v, align, w: 400, fg: "#000000", bg });
const A = "#ebebeb";
const B = "#f6f6f6";
const act = (bg: string, a: string, b: string) => ({ cells: [c(a, bg, "left"), c(b, bg)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a weakness. Question 2: Tell me about a time when you led a team through ambiguous circumstances.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "This is an interviewee led case, but will require the interviewer to nudge/direct the interviewee during the case. The interviewee is expected to provide structured thoughts backed by evidence/experience. That may not always mean that the interviewee's initial hypothesis/best guess will align with where the case is going. The key is for the interviewee to \"earn\" the slide/exhibit before they are provided.",
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
    guidancePreIntro: "Information to provide if asked:",
    guidancePreLines: [
      "Utility Co. provides both gas and electric services, but both businesses operate the same",
      "Utility Co. is a fully-integrated utility, performing all functions of the utility value chain: generation, transmission, and retail",
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Good structure will **segment the utility by activities** and consider:",
          "  **Generation:** cost of fuel (e.g. renewables, gas/coal, nuclear, etc.) and efficiency, efficiency/throughput (TPT) of labor & assets (including maintenance/repairs and capital expenses)",
          "  **Transmission/maintenance:** cost of maintaining assets (e.g. power lines), construction of new assets, TPT/efficiency of labor",
          "  **Retail:** call center costs & TPT/efficiency, cost of customer billing/payment, overhead/SG&A, building/infrastructure costs, technology/systems",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        title: "FY18, West Coast Utility Industry Costs\n$B",
        titleRule: true,
        noYAxis: true,
        segBorder: false,
        barWidth: 150,
        segNames: ["Depreciation", "Maintenance\n& Construction", "Fuel/Inputs"],
        endArrow: "100%",
        bottomRows: [
          { label: "Revenues ($B)", boldLabel: true, cells: ["$25B", "$25B"] },
          { label: "Asset Age & Use\n(Index)", boldLabel: true, cells: ["2.0", "2.0"] },
        ],
        panels: [
          {
            yMax: 100,
            yStep: 100,
            columns: [
              {
                label: "Utility Co.",
                total: "$20B",
                segs: [
                  { value: 30, color: "#000099", label: "30%", textColor: "#ffffff" },
                  { value: 50, color: "#666666", label: "50%", textColor: "#ffffff" },
                  { value: 20, color: "#cccccc", label: "20%", textColor: "#000000" },
                ],
              },
              {
                label: "Competitors/Peers",
                total: "$18B",
                segs: [
                  // Source labels sum to 99% (33+44+22) but the bar is drawn full height, so the stored values are scaled to 100; printed labels stay 33/44/22.
                  { value: 33.34, color: "#000099", label: "33%", textColor: "#ffffff" },
                  { value: 44.33, color: "#666666", label: "44%", textColor: "#ffffff" },
                  { value: 22.33, color: "#cccccc", label: "22%", textColor: "#000000" },
                ],
              },
            ],
          },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "Exhibit shows revenues and costs of the client and competitors/peers",
      "The candidate should calculate relative cost differences and identify that the client's higher relative cost structure is driven by **maintenance & construction costs**",
      "**Asset Age & Use Index** should demonstrate that the age and use of underlying assets are not driving depreciation or maintenance/construction costs differences",
    ],
    calcTable: {
      title: "Financial Data, $B",
      plain: true,
      gridBorders: true,
      center: true,
      leftCols: [0],
      headerBg: "#ffffff",
      headerFg: "#000000",
      cols: "1.5fr 1fr 1.3fr",
      headers: ["Financial Data, $B", "Client", "Competitor/Peer"],
      rows: [
        ["Rev", "$25", "$25"],
        ["Cost", "$20", "$18"],
        ["-Fuel", "$6", "$6"],
        ["-Main.", "$10", "$8"],
        ["-Depr.", "$4", "$4"],
        ["Profit", "$5", "$7"],
      ],
    },
    guidanceLabel: "Analysis",
    guidanceLines: [
      "The client and competitors/peers have similar revenues, but the client has higher costs",
      "Higher costs are driven by maintenance & construction",
      "Asset age & use are similar – demonstrating that the client's depreciation aligns w/ competitors and that higher relative maintenance & construction costs are not driven by greater use/age",
      "Good/Excellent candidates will ask about maintenance & construction costs and identify potential drivers: (1) TPT/efficiency of maintenance & construction teams (2) Labor cost rates & type (union vs. non-union) (3) Number of assets to maintain (4) Geographical dynamics – Proximity of assets to service centers",
    ],
  },
  {
    n: "04",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    dataTableTitle: "Maintenance & Construction Activity Log/Observations",
    dataTableTitleLeft: true,
    dataTableTitleRule: "#000000",
    dataTableFontSize: 15,
    dataTableFootnote: "Labor agreements mandate that employees receive at least 60 minutes per day for lunch + breaks",
    dataTableFootnoteLeft: true,
    dataTableCols: "1.5fr 1fr",
    dataTableHeaders: [hd("Observed Daily Activity", "left"), hd("Average Time per Worker")],
    dataTableRows: [
      act(A, "Wait for tasks/instructions (in the office)", "30 min"),
      act(B, "Driving to job site", "15 min"),
      act(A, "Wait for materials", "30 min"),
      act(B, "Break", "30 min"),
      act(A, "Wrench time", "150 min"),
      act(B, "Lunch", "60 min"),
      act(A, "Wrench time", "60 min"),
      act(B, "Break", "30 min"),
      act(A, "Wrench time", "30 min"),
      act(B, "Drive time from job site", "15 min"),
      act(A, "Team meetings/admin", "30 min"),
    ],
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "Exhibit shows time activity for maintenance and construction workers",
      "Candidate should identify wasteful activities that drive costs, and begin to ask for information that would provide potential savings. **Please provide the following when asked:**",
      "  Cost rate ($/HR): $50",
      "  Workers: Workers per Job - 10, Annual Jobs - 500K (assume 1 job can be completed in 1 day)",
      "Once candidate quantifies time savings opportunities, **ask them to brainstorm tactics** for reducing wasteful time",
    ],
    calcTable: {
      plain: true,
      gridBorders: true,
      center: true,
      leftCols: [0],
      headerBg: "#ffffff",
      headerFg: "#000000",
      cols: "1.6fr 1fr",
      boldRows: [4, 6],
      headers: ["Hours Saved:", ""],
      rows: [
        ["Hours Saved/Worker", "2"],
        ["Workers/Job", "10"],
        ["Annual Jobs", "500K"],
        ["Annual Hours Saved", "10M"],
        ["Cost Rate:", ""],
        ["$/HR", "$50"],
        ["Total $'s Saved:", "$500M"],
      ],
    },
    guidanceLabel: "Analysis",
    guidanceLines: [
      "The candidate should identify the following time activities as addressable opportunities: (1) Waiting for tasks/instructions (2) Wait for materials (3) Lunch (4) Breaks",
      "Addressable opportunity = Wasted Time (180 min) – Mandatory Breaks/Lunch (60 min) = ==120 min (2 hours)==",
      "Brainstorm on tactics for addressing wasteful time:",
      "  **Performance Mgmt.:** Measure/incentivize workers and teams based on # of job completed (e.g. gamify by posting standings, offer bonuses/awards for top performing teams, etc.)",
      "  **Planning/Management:** Assign jobs the day before (to reduce time waiting for assignments), deliver materials prior to start of job (rather than day of)",
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "Larry \"Chipper\" Jones is about to walk into the room and wants to hear our findings and thoughts. What do you recommend?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Good candidates will take a moment to gather thoughts and state the following:",
      "  Utility Co. can save ==$500M== by improving labor efficiency – reducing wasteful time among field work crews",
      "  **Tactics for reducing wasteful work:** (1) Adjust incentives/performance management (2) Ensure that jobs and materials are assigned/ready prior to worker arrival at job sites",
      "  **Risks:** (1) Push-back/adoption challenges w/ workers (2) Manager time – additional performance management/measurement and materials coordination/verification processes & responsibilities",
      "  **Next-steps:** (1) Working with HR/Tech teams to design performance mgmt. capabilities (2) Work with HR/managers to craft messaging/roll-out of new performance mgmt. policies and systems",
    ],
  },
];
