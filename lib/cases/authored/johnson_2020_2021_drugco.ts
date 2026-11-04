import type { CasePage } from "../content";

export const CASE_ID = "153c7050-c507-42a8-937f-9a5ac7fb146b";

const PROMPT =
  "Our client is pharmaceutical drug company. The company is less profitable on approved drugs than its peer companies. The client has engaged our team to diagnose the issue and provide a recommendation.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A pharmaceutical drug company is less profitable on approved drugs than its peers. Diagnose the issue and recommend how to fix it.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "profitability", "pharma", "brainstorming", "light-math"],
};

const RED = "#b31b1b";
const GREY = "#4d4d53";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question. Spend 15 Minutes on: Tell me about a time when you received negative feedback and how you dealt with it.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Overview [Interviewee-led]",
        paragraphs: [
          "This is a typical BCG first round interview case, interviewee-led and more conversational. The interviewee is expected to drive the conversation, diagnose the main issue, and ultimately brainstorm creative ideas for recommendations. Push back on the interviewee's ideas and push them to have an intellectual debate.",
        ],
      },
      {
        label: "Case Information",
        lines: [
          "Both the client and peer companies (the industry) have the same number of drugs before pre-clinical trial (e.g. 100 drugs).",
          "After testing and approving, the client and the industry launch the same number of drugs.",
          "  100 → 5.4",
          "No material differences between drugs from the client and the industry",
        ],
      },
      {
        label: "Part 1: After the initial framework,",
        paragraphs: ["if the interviewee had not mentioned cost or approval rates, guide them toward that direction."],
      },
    ],
  },
  {
    n: "02",
    label: "Part 2: Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    qText: "**Part 2: Provide Exhibit 1 once they question the cost structure or the approval rate differences**",
    guidancePreLines: ["Push the interviewee to diagnose the issue and think about why the approval rates are inverted"],
    axisBarTitle: "Drug Approval Rates",
    axisBarSeries: [
      { name: "Client", color: RED },
      { name: "Industry", color: GREY },
    ],
    axisBarGroups: [
      { label: "Pre-Clinical", values: [75, 30] },
      { label: "Phase 1", values: [60, 40] },
      { label: "Phase 2", values: [40, 60] },
      { label: "Phase 3", values: [30, 75] },
    ],
    axisBarYMax: 80,
    axisBarYStep: 100,
    axisBarYTickSuffix: "%",
    axisBarTitleCentered: true,
    axisBarValueInk: true,
    axisBarAxisLines: false,
    axisBarNoYAxis: true,
    axisBarNoGrid: true,
    axisBarLabelsAbove: true,
    axisBarValueLabels: true,
    guidanceLabel: "Insights from Exhibit 1",
    guidanceLines: [
      "The client has lax approval standards in the beginning phases, leading to more drugs going into the later phases of development versus the industry where they are ultimately declined approval.",
      "The problem is that the later phases are more expensive to test, thus even though the company launches the same number of drugs as the industry, the cost that is allocated across the approved drugs in sum is way higher because they are testing more in the phase 2-3.",
    ],
  },
  {
    n: "03",
    label: "Part 3: Brainstorm",
    title: "Part 3",
    kind: "qa",
    qText: "**Part 3: Brainstorm ways to have stricter approval rates at the beginning phases (open for ideation)**",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: ["Financial incentives, Management pressure, Equipment, Employee expertise"],
    infoBoxLabel: "Part 4: Recommendation",
    infoSections: [{ label: "Part 4: Recommendation" }],
  },
];
