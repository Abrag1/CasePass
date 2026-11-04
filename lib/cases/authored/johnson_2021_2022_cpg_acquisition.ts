import type { CasePage } from "../content";
import type { FlowNode } from "../extra-charts";

export const CASE_ID = "ef8dcc2d-f956-4792-af97-e5b281923e79";

const PROMPT =
  "Our client is a major global CPG conglomerate. Their star products are in home storage and home cleaning. They are acquiring an online platform that provides consumers with personal grooming products on a subscription basis. This target works like Amazon Pantry, in that it delivers their grooming products directly to the consumers’ doorstep every month. But, unlike Amazon’s services, the target produces all their products in-house. The target runs like a start-up and is based in San Francisco, and their consumer base is in the US. They have a strong social media following and have grown rapidly over the past few years. They have enlisted your services to help them think through the major considerations or risks as well as the biggest opportunities to manage.";

export const CASE_META = {
  review: "auto",
  case_type: "M&A",
  synopsis:
    "A global CPG conglomerate is acquiring a subscription-based personal grooming platform. Work through synergies and risks, cultural differences, and how to prioritise the post-deal work.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "m&a", "post-merger-integration", "light-math"],
};

// ---- Exhibit helpers: pixel positions on the 1152-wide source page mapped onto the flow canvas ----
const RED = "#b01b1b";
type Box = { x0: number; y0: number; x1: number; y1: number };
type NodeIn = Omit<FlowNode, "x" | "y" | "w" | "h" | "size"> & { l: number; t: number; r: number; b: number; size?: number };
function mk(o: Box) {
  const W = o.x1 - o.x0;
  const H = o.y1 - o.y0;
  const u = 1000 / W;
  return {
    aspect: H / W,
    node: (n: NodeIn): FlowNode => {
      const { l, t, r, b, size, ...rest } = n;
      return {
        ...rest,
        x: (l - o.x0) / W,
        y: (t - o.y0) / H,
        w: (r - l) / W,
        h: (b - t) / H,
        size: size !== undefined ? Math.round(size * u * 10) / 10 : undefined,
      };
    },
  };
}

// Question 1: sample structure matrix (page 170)
const q1 = mk({ x0: 50, y0: 285, x1: 1095, y1: 752 });
const colX: [number, number][] = [[238, 400], [401, 583], [584, 785], [786, 938], [939, 1091]];
const heads = ["HR", "Finance", "IT", "Operations /\nSupply\nChain", "Brand"];
const synergy = [
  "•   Employee\n    rationalization\n•   System\n    merging",
  "•   Employee\n    rationalization\n•   System merging\n•   AR/AP\n    Management",
  "•   Admin systems",
  "•   Distribution\n    networks\n•   Raw material\n    buy power\n•   Inventory\n    management",
  "•   None",
];
const risks = [
  "•   Culture\n    management\n•   Employee\n    retention",
  "•   Reporting\n    requirements\n    and filings",
  "•   Security\n    management\n•   Consumer data\n    analytics\n•   SG&A data\n    migration\n•   Costly & takes time",
  "•   Changed\n    consumer\n    experience",
  "•   Employee\n    retention\n    failure\n•   Social media\n    strategy\n    changes",
];
const noWrap = (ns: FlowNode[]): FlowNode[] => ns.map((n) => ({ ...n, noWrap: true }));

const q1Nodes: FlowNode[] = noWrap([
  q1.node({ text: "Sample structure", shape: "text", l: 53, t: 345, r: 230, b: 368, size: 22, align: "left", color: "#000000" }),
  ...heads.map((h, i) => q1.node({ text: h, shape: "box", l: colX[i][0], t: 289, r: colX[i][1], b: 455, size: 24, fill: RED, stroke: "#ffffff", strokeWidth: 1, color: "#ffffff", align: "center" })),
  q1.node({ text: "Synergy\nOpportunities", shape: "box", l: 95, t: 459, r: 237, b: 602, size: 17, bold: true, fill: RED, stroke: "#ffffff", strokeWidth: 1, color: "#ffffff", align: "left" }),
  q1.node({ text: "Risks/Cost\nInvestments", shape: "box", l: 95, t: 604, r: 237, b: 748, size: 17, bold: true, fill: RED, stroke: "#ffffff", strokeWidth: 1, color: "#ffffff", align: "left" }),
  ...synergy.map((s, i) => q1.node({ text: s, shape: "box", l: colX[i][0], t: 459, r: colX[i][1], b: 602, size: 16, valign: "top", padTop: 6, fill: "#e4cccc", stroke: "#ffffff", strokeWidth: 1, color: "#000000", align: "left" })),
  ...risks.map((s, i) => q1.node({ text: s, shape: "box", l: colX[i][0], t: 604, r: colX[i][1], b: 748, size: 15, valign: "top", padTop: 6, fill: "#f0e4e4", stroke: "#ffffff", strokeWidth: 1, color: "#000000", align: "left" })),
]);

// Question 2: risk / mitigation boxes (page 171)
const q2 = mk({ x0: 95, y0: 272, x1: 1058, y1: 764 });
const riskRows: [string, string][] = [
  ["Culture creators leave\nthe firm", "Need to understand who drives culture in the\nTarget firm and motivate them to stay"],
  ["Client influence on new\nprojects or initiatives", "Need to identify the creative departments and\nensure business process is not disrupted"],
  ["Retained employees don’t\nwelcome/motivated", "Strong internal communication strategy that\nshould be implemented by culture creators"],
];
const rowTop = [322, 478, 633];
const rowBot = [448, 603, 759];
const q2Nodes: FlowNode[] = noWrap([
  q2.node({ text: "Risk", shape: "text", l: 264, t: 280, r: 264, b: 306, size: 26, bold: true, align: "center", color: "#000000" }),
  q2.node({ text: "Mitigation", shape: "text", l: 758, t: 280, r: 758, b: 306, size: 28, bold: true, align: "center", color: "#000000" }),
  ...riskRows.flatMap(([a, b], i) => [
    q2.node({ text: a, shape: "box", l: 100, t: rowTop[i], r: 428, b: rowBot[i], size: 23, fill: "#ffffff", stroke: RED, strokeWidth: 3, align: "center", color: "#000000" }),
    q2.node({ text: b, shape: "box", l: 465, t: rowTop[i], r: 1052, b: rowBot[i], size: 23, fill: "#ffffff", stroke: RED, strokeWidth: 3, align: "center", color: "#000000" }),
  ]),
]);

// Question 3: Pre Day 1 / Day 1-100 / Post Day 100 (page 172)
const q3 = mk({ x0: 50, y0: 330, x1: 1102, y1: 685 });
const phases: { tag: string; l: number; tagR: number; boxL: number; boxR: number; lines: string }[] = [
  { tag: "Pre Day 1", l: 54, tagR: 288, boxL: 100, boxR: 338, lines: "•  Brand\n   decisions\n•  Leadership\n   decisions\n•  Internal and\n   external\n   communication\n   strategy" },
  { tag: "Day 1-100", l: 434, tagR: 667, boxL: 481, boxR: 718, lines: "•  HR and\n   Finance\n   department\n   rationalization\n•  Employee\n   retention plans\n•  Data migration" },
  { tag: "Post Day 100", l: 814, tagR: 1048, boxL: 861, boxR: 1098, lines: "•  Data Migration\n•  Target platform\n   enhancements\n   for scale up\n•  Data analytics\n   platforms" },
];
const q3Nodes: FlowNode[] = noWrap([
  ...phases.flatMap((p) => [
    q3.node({ text: p.tag, shape: "box", l: p.l, t: 335, r: p.tagR, b: 424, size: 26, serif: true, radius: 8, valign: "top", padTop: 8, padX: 14, fill: RED, stroke: RED, color: "#ffffff", align: "left" }),
    q3.node({ text: p.lines, shape: "box", l: p.boxL, t: 396, r: p.boxR, b: 680, size: 26, serif: true, lineGap: 0.95, radius: 22, fillOpacity: 0.88, valign: "top", padTop: 10, padX: 22, fill: "#ffffff", stroke: RED, strokeWidth: 3, color: "#000000", align: "left" }),
  ]),
  q3.node({ shape: "blockArrow", l: 325, t: 351, r: 372, b: 380, fill: "#d4a9a9", stroke: "#d4a9a9", headLen: 29 / 1052, headH: 59 / 355 }),
  q3.node({ shape: "blockArrow", l: 705, t: 351, r: 752, b: 380, fill: "#d4a9a9", stroke: "#d4a9a9", headLen: 29 / 1052, headH: 59 / 355 }),
]);

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question: Spend 15 Minutes on: Tell me about a recent transaction that has caught your eye. What about it interests you?",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewer-led case, similar to EY OTS style. There are three questions to be asked sequentially during the course of the interview:",
          "**Question 1:** What are some synergy opportunities and risks or cost investments for this acquisition?",
          "**Question 2:** What are some of the issues you foresee arising due to cultural differences? How can you mitigate these issues?",
          "**Question 3:** How can you prioritize the considerations/synergy realizations? What do you feel are the critical decisions and what are the longer term items?",
        ],
      },
      {
        label: "Case Flow Guide",
        paragraphs: ["**Clarifying Questions**"],
        groups: [
          {
            heading: "What is the deal thesis? Are there any specific goals for the buy?",
            items: [
              "They bought the Target primarily for the consumer insights.",
              "They are not looking to integrate the products, they want the Target to be standalone and use them as an incubator to understanding changing consumer trends.",
              "The Client has an unsuccessful personal grooming product that they will likely retire.",
            ],
          },
          {
            heading: "Does the client have any similar online platforms?",
            items: ["No, they have a primarily retail channel strategy."],
          },
          {
            heading: "Is this a fragmented market?",
            items: [
              "No, personal grooming is heavily dominated in the US by one competitor. However the target has been quite disruptive and amassed 20% US market share.",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1: Synergies and Risks",
    title: "Question 1",
    kind: "qa",
    qText: "What are some synergy opportunities and risks or cost investments for this acquisition?",
    extraCharts: [{ kind: "flow", aspect: q1.aspect, nodes: q1Nodes }],
  },
  {
    n: "03",
    label: "Question 2: Cultural Differences",
    title: "Question 2",
    kind: "qa",
    qText: "What are some of the issues you foresee arising due to cultural differences? How can you mitigate these issues?",
    extraCharts: [{ kind: "flow", aspect: q2.aspect, nodes: q2Nodes }],
  },
  {
    n: "04",
    label: "Question 3: Prioritization",
    title: "Question 3",
    kind: "qa",
    qText: "How can you prioritize the considerations/synergy realizations? What do you feel are the critical decisions and what are the longer term items?",
    extraCharts: [{ kind: "flow", aspect: q3.aspect, nodes: q3Nodes }],
  },
];
