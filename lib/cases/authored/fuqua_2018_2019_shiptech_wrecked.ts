import type { CasePage } from "../content";

export const CASE_ID = "5b168cd1-7c0d-4c8f-a0f3-7dd5339f7050";

const PROMPT =
  "Your client is ShipTech, a shipping company that specializes in ground transportation in the United States. ShipTech has experienced decreasing revenue in recent years and has asked your team for advice on how to reverse the trend";

export const CASE_META = {
  review: "auto",
  case_type: "Revenue Growth",
  synopsis:
    "A US ground-transportation shipping company has seen its revenue fall and wants to reverse the trend. Read the sales exhibits, work out why it is turning business away, and size the hiring needed to hit its target.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "revenue-growth", "transportation", "brainstorming", "exhibit-heavy"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a time that you disagreed with a teammate. Question 2: Tell me about a time that you used data to solve a problem.",
    infoBoxLabel: "Interviewer Guidance:",
    infoSections: [
      {
        lines: [
          "ShipTech would like to increase revenue by 10% or $100M in the near term",
          "ShipTech specializes in commercial transportation (bulk liquid, flatbed, large equipment, etc).",
          "No new competitors have entered the market or are taking significant share",
          "ShipTech does not outsource any part of its operations. It does not have any quality issues",
          "ShipTech pays a commission-based salary and drivers are not guaranteed pay",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    extraCharts: [
      {
        kind: "combo",
        title: "ShipTech Actual Sales vs Target and Potential",
        titleAlign: "center",
        titleSize: 22,
        frameBorder: "#262626",
        lightBaseline: true,
        yMin: 600,
        yMax: 1800,
        yStep: 200,
        yGrid: true,
        axisStyle: "none",
        legend: "bottom",
        categories: ["2014", "2015", "2016", "2017"],
        lines: [
          { name: "Sales", color: "#595959", values: [1500, 1300, 1290, 1000], marker: "circle" },
          { name: "Target Sales", color: "#b3b3b3", values: [1400, 1400, 1300, 1200], marker: "circle" },
          { name: "Potential Sales", color: "#8c8c8c", values: [1500, 1500, 1600, 1600], marker: "circle" },
        ],
      },
    ],
    guidanceLabel: "Exhibit #1 Guidance:",
    guidanceLines: [
      "You can **explain** to candidate that potential sales represents the total amount of business offered by customers",
      "Candidate should recognize trends and quantify them:",
      "  Sales have been declining: ~==25%== decrease in the last year or ==$300M==",
      "  The client is not meeting its annual sales target: missed by ~==20%== or ==$200M== last year",
      "  The client is leaving “business on the table” as its customers are offering ==60%== or ==$600M== additional sales than the client can handle",
      "Excellent candidates recognize:",
      "  If client captured ==66%== (==$400M== of the $600M) in additional sales customers offered in 2017 they would have hit their target",
    ],
  },
  {
    n: "03",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "What could be causing the client to reject sales from customers? Assume that the client is aware of all potential sales from customers.",
    guidanceLabel: "Interviewer Guidance:",
    guidanceLines: [
      "Candidate should develop a list of factors that would limit the client’s ability to meet customer needs:",
      "  Lacking Employees: drivers, support staff, maintenance, dispatch, etc",
      "  Poor quality or not enough equipment: trucks, tires, etc.",
      "  Geographical constraints: terminals too far from locations where customers need service",
    ],
    nextStepText: "**Tell** the candidate that the company has been having issues hiring and retaining drivers and **provide** Exhibit #2 and Exhibit #3",
  },
  {
    n: "04",
    label: "Exhibit #2 and #3",
    title: "Exhibit #2 and #3",
    kind: "qa",
    extraCharts: [
      {
        kind: "combo",
        title: "Survey Results: What drivers value most",
        titleAlign: "center",
        titleSize: 22,
        frameBorder: "#d9d9d9",
        sideHatch: true,
        yMax: 100,
        yStep: 10,
        yTickSuffix: "%",
        yGrid: true,
        axisStyle: "none",
        legend: "bottom",
        categories: [""],
        stack: {
          percent: true,
          widthRatio: 0.4,
          labelSize: 16,
          series: [
            { name: "Compensation", color: "#cccccc", values: [45], labels: ["45%"], labelColor: "#595959" },
            { name: "Health Benefits", color: "#ffffff", values: [20], labels: ["20%"], labelColor: "#595959" },
            { name: "PTO", color: "#e0e0e0", values: [15], labels: ["15%"], labelColor: "#595959" },
            { name: "Manager", color: "#7f7f7f", values: [5], labels: ["5%"], labelColor: "#595959" },
            { name: "Location", color: "#999999", values: [15], labels: ["15%"], labelColor: "#595959" },
          ],
        },
      },
      {
        kind: "combo",
        title: "Drivers rated ShipTech’s offerings against its competitors",
        titleAlign: "center",
        titleSize: 22,
        lightBaseline: true,
        yMax: 10,
        yStep: 1,
        yGrid: true,
        axisStyle: "none",
        legend: "bottom",
        categories: ["Compensation", "PTO", "Health Benefits", "Manager", "Location"],
        clusters: [
          { name: "ShipTech", color: "#e6e600", values: [4, 3, 0, 7, 9] },
          { name: "IPS", color: "#e0e0e0", values: [9, 8, 6, 6, 6] },
          { name: "ESPS", color: "#000000", values: [7, 6, 6, 5, 7] },
          { name: "WorldShip", color: "#8f8f00", values: [6, 6, 7, 5, 4] },
        ],
      },
    ],
    guidanceLabel: "Exhibit #2 and #3 Guidance:",
    guidanceLines: [
      "Candidate should identify that compensation is the most valued offering for drivers",
      "In comparison to its competitors, ShipTech is providing significantly worse health benefits, PTO, and compensation.",
      "Candidate should prioritize compensation as it is the most important offering for drivers and ask for information on the compensation package",
      "**Provide** candidate with Exhibit #4",
    ],
  },
  {
    n: "05",
    label: "Exhibit #4",
    title: "Exhibit #4",
    kind: "qa",
    qText:
      "**Tell** the candidate that the client has agreed to increase their offerings to meet the industry standard. How many drivers will ShipTech need to hire assuming the following information:",
    guidancePreLabel: "Exhibit #4",
    guidancePreLines: [
      "The Sales Target next year is the same",
      "Each driver produces $1,000,000 in Revenue",
      "Each driver’s compensation package will increase to $60,000 per year",
      "Truck fixed costs (the candidate should clarify whether these costs are fixed and whether there is 1 truck assigned per driver)",
      "  $4,000 maintenance",
      "  $200,000 fuel",
      "ShipTech currently employs 4,000 drivers",
    ],
    guidanceLabel: "Exhibit #4 Guidance",
    guidanceLines: [
      "$1,200,000,000 = $1,000,000 – $60,000+ $204,000(4,000+x) =",
      "==~1380== drivers need to be hired to meet the target next year",
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "ShipTech’s CEO is about to walk in to hear an update. What are you going to recommend?",
  },
];
