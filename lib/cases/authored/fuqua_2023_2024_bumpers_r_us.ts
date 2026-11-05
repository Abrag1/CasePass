import type { CasePage } from "../content";

export const CASE_ID = "03df611b-88c4-408e-85e5-db8c63fee32c";

const PROMPT =
  "Your client is Bumpers-R-Us, a manufacturer of plastic automotive bumpers. Bumpers-R-Us is a Tier-1 supplier for a major global OEM called CNW and is based in the southeastern United States. The client receives raw materials from around the world, which are then used in its plant to produce the plastic bumpers. The bumpers are shipped by truck 360 miles away to the local CNW plant.\n\nBumpers-R-Us has been a Tier-1 supplier to CNW for over 5 years, but over the past 6 months, the client has seen an increase in the amount of time it takes for parts to arrive at the CNW plant. CNW has issued a warning of potential fines and loss of future contracts if the lead time is not returned to the previous levels. Bumpers-R-Us is eager to find the source of the change in lead time and fix the issue as soon as possible.";

export const CASE_META = {
  review: "auto",
  case_type: "Operations",
  synopsis:
    "A plastic automotive bumper manufacturer has seen delivery lead times to its main customer creep up. Locate the slow stage in the manufacturing process, brainstorm fixes, and choose initiatives that restore the target lead time within a fixed budget.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "operations", "manufacturing", "light-math", "brainstorming"],
};

const HEAD = "#3053a3";
const DARK = "#cfd2e3";
const LIGHT = "#e9eaf1";
const PINK = "#ffb3bc";
const BLUE = "#3b5ba9";
const K = "#000000";
const FK = "black"; // theme-aware black for the flow diagram (pure black in light mode)

const robot = (x: number, y: number, w = 0.048, h = 0.0805) => ({ shape: "icon" as const, icon: "robot" as const, color: FK, x: x / 1920, y: (y - 190) / 870, w, h });
const truck = (x: number, y: number, w = 0.048, h = 0.0597) => ({ shape: "icon" as const, icon: "truck" as const, color: FK, x: x / 1920, y: (y - 190) / 870, w, h });
const bx = (x1: number, y1: number, x2: number, y2: number) => ({ shape: "box" as const, x: x1 / 1920, y: (y1 - 190) / 870, w: (x2 - x1) / 1920, h: (y2 - y1) / 870, stroke: FK, strokeWidth: 1.2 });
const lbl = (text: string, cx: number, cy: number, size = 18, align: "center" | "left" = "center") => ({ shape: "text" as const, text, x: cx / 1920, y: (cy - 190) / 870, size, color: FK, align });
const ar = (pts: [number, number][]) => ({
  points: pts.map(([x, y]) => [x / 1920, (y - 190) / 870] as [number, number]),
  color: BLUE,
  width: 1.5,
  headStyle: "filled" as const,
  headSize: 8,
});

const rowShade = (i: number) => (i % 2 === 0 ? DARK : LIGHT);
const ex2Rows: [string, string, string, string, string][] = [
  ["1", "Replace oldest paint line robot", "3 hours", "$3.5M", "The oldest paint line robot has been in use for 8 years, with most plants using these robots for up to 10 years."],
  ["2", "Upgrade software for paint line robots", "5 hours", "$1.5M", "The software for the paint line robots was upgraded 3 years ago and is the second most recent version of software for these robots."],
  ["3", "Add one additional paint line robot", "4 hours", "$5M", "There is space to add an additional paint line robot."],
  ["4", "Add a third shift to the existing paint line", "8 hours", "$6.5M", "There is currently only a first and second shift on the paint line, with no existing third shift.\nNo other stages currently operate a 3rd shift; most time will be spent on clearing molded products waiting from the first & second shifts"],
  ["5", "Outsource painting of partial shipment of bumpers", "2 hours", "$2M", "N/A"],
];

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Case Overview",
    title: "Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Note: This case is interviewer-led.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Steps",
        lines: [
          "Exhibit #1: Manufacturing process",
          "Brainstorm #1: Process improvement",
          "Exhibit #2: Strategic initiatives",
          "Recommendations and next steps",
        ],
      },
      {
        label: "Clarifying Information (If Prompted)",
        lines: [
          "Bumpers-R-Us is a domestic supplier that purchases raw materials from around the world and supplies solely to the local CNW plant.",
          "The client profited $25M last year, with $10M in costs.",
          "The manufacturing process consists of four stages: molding of plastic parts from raw materials, painting of molded parts, the bonding & assembly of the bumpers (Bonding/Assembly), and the shipment between the manufacturer and CNW.",
          "The pre-6 month lead time was 29 hours.",
          "The General Manager of the plant has directed a budget of up to $5M be dedicated to addressing the lead time issue.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Sample Framework",
    title: "Sample Framework",
    kind: "qa",
    infoBoxLabel: "Sample Framework",
    infoSections: [
      {
        label: "Internal",
        groups: [
          { heading: "Process", items: ["Stage with longest lead time", "Stage with longest machine", "Problem with machine"] },
          { heading: "Labor", items: ["Current number of employees", "Current number of shifts"] },
        ],
      },
      {
        label: "External",
        lines: ["CNW", "Demand (number of parts ordered)", "Type of parts ordered", "Suppliers", "Raw materials", "Availability", "Prices"],
      },
      {
        label: "Market",
        lines: ["Competitors", "Customers", "Consumer trends"],
      },
    ],
    guidanceLines: [
      "Suitable frameworks should address both internal and external factors potentially affecting the manufacturing process.",
      "The interviewer should briefly discuss points of interest in the framework before asking the interviewee to identify an area of focus.",
      "The interviewee should identify the process, machines used in the process, or amount of time spent in each stage before the interviewer moves to Exhibit #1.",
    ],
  },
  {
    n: "03",
    label: "Exhibit #1 – Manufacturing process",
    title: "Manufacturing process",
    kind: "qa",
    extraCharts: [
      {
        kind: "flow",
        aspect: 0.4531,
        nodes: [
          lbl("Raw\nMaterials", 202, 331),
          bx(475, 199, 901, 463),
          robot(513, 230),
          robot(647, 230),
          robot(780, 230),
          robot(550, 348),
          robot(710, 348),
          lbl("Molding (9 hours)", 688, 497),
          bx(1204, 199, 1630, 463),
          robot(1265, 230),
          robot(1484, 230),
          robot(1265, 347),
          robot(1484, 347),
          lbl("Painting (16 hours)", 1438, 497),
          bx(1204, 579, 1630, 843),
          robot(1270, 610),
          robot(1475, 606),
          robot(1270, 730),
          robot(1475, 727),
          lbl("Bonding/Assembly (6 hours)", 1417, 882),
          bx(472, 579, 898, 843),
          truck(499, 617),
          truck(640, 617),
          truck(778, 621),
          truck(499, 747),
          truck(635, 747),
          truck(778, 739),
          lbl("Transportation (360 miles)", 686, 881),
          lbl("CNW\nPlant", 154, 697),
          bx(105, 939, 768, 1054),
          robot(123, 948, 0.0281, 0.046),
          lbl("One machine", 207, 967, 18, "left"),
          truck(123, 1000, 0.0281, 0.0356),
          lbl("One truck (rate of travel = 60 mph)", 203, 1027, 18, "left"),
        ],
        arrows: [
          ar([[300, 337], [435, 337]]),
          ar([[942, 337], [1153, 337]]),
          ar([[1680, 331], [1826, 331], [1826, 721], [1682, 721]]),
          ar([[1143, 717], [963, 717]]),
          ar([[435, 717], [255, 717]]),
        ],
      },
    ],
    guidanceLabel: "Exhibit Notes",
    guidanceLines: [
      "Interviewee should identify Transportation as the area with the most machines (in this case, vehicles), with the most time spent in the Painting stage.",
      "A good candidate will identify Painting as a potential area of concern.",
      "Candidates should calculate the current lead time to be 37 hours based on given information. Transportation time should be calculated to be 6 hours (360 miles/60 mph = 6 hours).",
      "**Once Painting is identified as an area of concern, the interviewer should prompt the candidate to brainstorm potential areas for improvement in the process.**",
    ],
  },
  {
    n: "04",
    label: "Brainstorm #1 – Improvement initiatives",
    title: "Improvement initiatives",
    kind: "qa",
    qText: "**Prompt**: What are some potential initiatives for improvement in the current manufacturing process?",
    infoBoxLabel: "Brainstorm Prompt",
    infoSections: [
      {
        groups: [
          { heading: "Machines", items: ["Purchasing additional machines", "Upgrade or update existing machines"] },
          { heading: "Labor", items: ["Hiring additional workers", "Adding another shift", "Creating reward system for greater outputs", "Outsource certain tasks"] },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The list on the left is non-exhaustive and answers can go in many directions; this brainstorm is intended to test the candidate's creative thinking.",
      "Once the brainstorm is complete, the interviewer should steer the interviewee to ask about initiatives considered by the client.",
    ],
  },
  {
    n: "05",
    label: "Exhibit #2 – Strategic initiatives",
    title: "Strategic initiatives",
    kind: "qa",
    guidancePreLabel: "Interviewer",
    guidancePreLines: [
      "After brainstorming solutions, the interviewer should bring the candidate back to the General Manager's initial budget of $5M for strategic initiatives. The following have been proposed; **the interviewer should read these to the interviewee without giving them the exhibit:**",
    ],
    dataTableCols: "47fr 307fr 235fr 200fr 988fr",
    dataTableHeaders: [
      { v: "Initiative", align: "left", bg: HEAD, fg: "#ffffff", span: 2 },
      { v: "Potential Reduction of Lead Time", align: "left", bg: HEAD, fg: "#ffffff" },
      { v: "Purchase Cost", align: "left", bg: HEAD, fg: "#ffffff" },
      { v: "Additional Information (only read when asked)", align: "left", bg: HEAD, fg: "#ffffff" },
    ],
    dataTableRows: ex2Rows.map(([n, name, hrs, cost, info], i) => ({
      cells: [
        { v: n, align: "left" as const, w: 400, fg: K, bg: rowShade(i), top: true, borders: "r", borderColor: "#ffffff" },
        { v: name, align: "left" as const, w: 400, fg: K, bg: rowShade(i), top: true },
        { v: hrs, align: "left" as const, w: 400, fg: K, bg: rowShade(i), top: true },
        { v: cost, align: "left" as const, w: 400, fg: K, bg: rowShade(i), top: true },
        { v: info, align: "left" as const, w: 400, fg: K, bg: PINK, top: true, bullets: info !== "N/A" },
      ],
    })),
    dataTableMore: [
      {
        title: "Quantitative Analysis",
        cols: "1.1fr 1fr 1fr",
        headers: [
          { v: "Initiative", align: "left", bg: HEAD, fg: "#ffffff" },
          { v: "Potential Reduction of Lead Time", align: "left", bg: HEAD, fg: "#ffffff" },
          { v: "Purchase Cost", align: "left", bg: HEAD, fg: "#ffffff" },
        ],
        rows: [
          ["Replace oldest paint line robot", "3 hours", "$3.5M"],
          ["Upgrade software for paint line robots", "5 hours", "$1.5M"],
          ["Add one additional paint line robot", "4 hours", "$5M"],
          ["Add a third shift to the existing paint line", "8 hours", "$6.5M"],
          ["Outsource painting of partial shipment of bumpers", "2 hours", "$2M"],
        ].map((r, i) => ({
          cells: r.map((v) => ({ v, align: "left" as const, w: 400, fg: K, top: true, bg: i < 2 ? "#ffc000" : rowShade(i) })),
        })),
      },
    ],
    guidanceLabel: "Exhibit Notes",
    guidanceLines: [
      "**Good candidates should recommend replacing the oldest pain line robot and upgrading the paint line software- this reduces the lead time from 37 to 29 hours (the target lead time) and remains within the $5M budget set by the General Manager.**",
      "Great candidates will refer back to any connections between the brainstorm and these initiatives.",
      "Candidates should steer away from adding an additional paint line robot or a third shift due to not reaching the targeted lead time of 29 hours and the costs exceeding the $5M budget.",
    ],
  },
  {
    n: "06",
    label: "Recommendation & Next Steps",
    title: "Recommendation & Next Steps",
    kind: "qa",
    guidancePreLabel: "Recommendation",
    guidancePreLines: [
      "**Prompt:** The General Manager of Bumpers-R-Us will enter the room shortly; the candidate should be prompted to give their recommendation.",
      "Good candidates should recommend the two strategic initiatives from the second math portion.",
      "Great candidates will reference the lead time and budget targets being met.",
    ],
    infoBoxLabel: "Risks & Next Steps",
    infoSections: [
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "Potential risks a good candidate may provide include: increased costs of initiatives, unexpected maintenance of existing machines, the time needed to install software and potential delays of production based on software installation.",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Potential next steps a good candidate may provide include: requesting quotes for paint robots from multiple suppliers and requesting more information on the time required for a software upgrade.",
            ],
          },
        ],
      },
    ],
  },
];
