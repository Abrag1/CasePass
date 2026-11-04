import type { CasePage } from "../content";

export const CASE_ID = "f45e7d43-cf27-40e0-8201-8b0c930b7ed3";

const PROMPT =
  "Your client is an industrial goods producer who primarily focuses efforts on planes, trains, and various automobile parts. Their R&D team recently developed a way of lowering emissions for diesel engines. Environmental regulation changes currently occurring will likely benefit their R&D finding in the future. To roll the product out to the market, your client plans to partner with diesel manufacturers and license its product to achieve revenue.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Share",
  synopsis:
    "An industrial goods producer has developed technology that lowers diesel engine emissions and plans to license it to engine manufacturers. Decide which manufacturers to target, size five-year licence revenue and look for ways to grow revenue afterwards.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-share", "industrial-goods", "light-math", "exhibit-heavy"],
};

const RED_BG = "#b11b1b";
const PINK_D = "#e3cbcb";
const PINK_L = "#f0e5e5";
const HD = (v: string, align: "left" | "center" = "left") => ({ v, align, bg: RED_BG, fg: "#ffffff" });
const R = (label: string, val: string, i: number) => {
  const bg = i % 2 === 0 ? PINK_D : PINK_L;
  return {
    cells: [
      { v: label, align: "left" as const, w: 700, fg: "#1f2421", bg },
      { v: val, align: "left" as const, w: 400, fg: "#1f2421", bg },
    ],
  };
};
const COLS = "2.6fr 1fr";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Behavioral Case Question** (Spend 15 Minutes on): Tell me about a time when you had difficulty convincing someone to perform a task. What did you do?",
    guidancePreLabel: "Case Information",
    guidancePreLines: [
      "**Objective:** Your client has specifically asked you to look at the potential revenue over the next five years as well as looking for options to increase revenues afterwards.",
      "**Info to be provided when prompted**",
      "  Currently operating only within the US marketplace",
      "  Most diesel engines are utilized for off-highway vehicles (John Deer, Caterpillar) → used in construction, heavy machinery, etc.",
      "  This is a brand new product",
      "  No competitors currently hold this product patent",
      "  Patent is valid for another 20 years",
      "  We currently already have relationships with all diesel engine manufacturers",
    ],
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is a McKinsey-style, interviewer-led case. Provide the interviewee with the prompt and answer any clarifying questions. Once the interviewee has no more questions, ask the case questions sequentially.",
        ],
      },
      {
        label: "Case Flow Guide",
        lines: [
          "**Question 1:** What things do you want to consider in order to determine how much revenue we can gain in the next five years.",
          "**Questions 2:** Looking at the chart provided, what are the big takeaways you see? → Which companies would you target to sell to?",
          "**Question 3:** How much revenue could you gain from selling to your selected targets over the next five years?",
          "**Question 4:** What are some options to increase revenues after the 5-year window?",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "What factors do you want to consider in order to determine how much revenue we can gain in the next five years?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: ["Interviewee is expected to provide a thorough and structured framework"],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "Looking at Exhibit 1, what are the big takeaways you see? → Which companies would you target to sell to?",
    extraCharts: [
      {
        kind: "combo",
        title: "Emissions by Vehicle Category",
        titleAlign: "center",
        titleSize: 26,
        yMin: 0,
        yMax: 300,
        yStep: 50,
        yLabel: "CO² Emission (g/tkm)",
        axisTitleBold: true,
        yGrid: true,
        axisStyle: "none",
        legend: "bottom",
        panels: [
          {
            categories: ["Navistar", "Daimler", "Paccar", "Volvo"],
            xTitle: "On-Highway Vehicles",
            bars: { name: "", color: "#5b9bd5", values: [280, 150, 100, 140], valueLabels: true, ticks: [282, 229, 199, 204], tickName: "Last Year's Emissions Levels" },
            refLines: [{ at: 150, color: "#ed7d31", width: 3.5 }],
            callouts: [{ text: "150 g/tkm is the regulation\nto be met starting this year", x: 1.7, y: 260, w: 180, size: 13, from: 0.5, pointer: { x: 2, y: 150 } }],
          },
          {
            categories: ["Caterpillar", "Deere", "Komatsu", "Volvo"],
            xTitle: "Off-Highway Vehicles",
            bars: { name: "", color: "#00b050", values: [120, 260, 210, 200], valueLabels: true, ticks: [126, 263, 214, 202] },
            refLines: [{ at: 150, color: "#ed7d31", width: 3.5 }],
            callouts: [{ text: "150 g/tkm is the\nregulation to be\nmet in 4 years", x: -0.4, y: 272, w: 118, size: 12, from: 0.63, pointer: { x: 0.58, y: 150 } }],
          },
        ],
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Provide Exhibit 1 to the interviewee",
      "Interviewee should point out **Navistar** has the highest priority in timing to lower their emissions for vehicles and should therefore be targeted first (additionally, it has the **highest** delta above emissions targets)",
      "**Deere** and **Komatsu** should also be targeted (both above the regulation threshold)",
      "Volvo should likely **not** be included as it appears they have technology available that can lower emissions rapidly (look at on-highway vehicles last year emissions level vs this years)",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "How much revenue could you gain from selling to your selected targets over the next five years?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: ["Provide Exhibit 2 to the interviewee", "License fee is $375 per vehicle"],
    dataTableTitle: "Market Share by Type",
    dataTableCols: COLS,
    dataTableHeaders: [HD("On-Highway Diesel Engine Manufacturers"), HD("Market Share")],
    dataTableRows: [R("Navistar", "30%", 0), R("Daimler", "25%", 1), R("Paccar", "10%", 2), R("Volvo", "35%", 3)],
    dataTableMore: [
      {
        cols: COLS,
        headers: [HD("Off-Highway Diesel Engine Manufacturers"), HD("Market Share")],
        rows: [R("Caterpillar", "36%", 0), R("Deere", "35%", 1), R("Komatsu", "15%", 2), R("Volvo", "24%", 3)],
      },
      {
        cols: COLS,
        headers: [HD("Road Type"), HD("Total Vehicles Annually")],
        rows: [R("On-Highway", "400,000", 0), R("Off-Highway", "120,000", 1)],
      },
    ],
    calcLines: [
      { q: "Navistar", a: "30% Market Share * 400K Total Vehicles = 120K Vehicles" },
      { q: "Deere + Komatsu", a: "50% Market Share Combined * 120K Total Vehicles = 60K Vehicles" },
      { q: "Revenue", a: "(120K + 60K) * $375/vehicle = ==$67.5M== Revenue" },
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "What are some options to increase revenues after the 5-year window?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Guide the interviewee in brainstorming potential revenue opportunities. For example:",
      "  New geographic expansion",
      "  Expand offering to planes and trains",
    ],
  },
];
