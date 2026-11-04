import type { CasePage } from "../content";

export const CASE_ID = "0de216e0-0539-4935-9d24-a943f1f8749a";

const PROMPT =
  "Your client is the family owner of a company that serves residential and commercial markets and operates 5 days/week and 16 hours/day. The owner is looking to purchase a new machine to improve its current production process.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "A family-owned carpet maker is considering a $25M machine that would colour its yarn in-house. Compare old and new process costs, test the investment on cost savings alone, then add the revenue from new high-end customers.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "investment-decision", "light-math", "industrials"],
};

const RED = "#b11b1b";
const GREY = "#4d4f55";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Behavioral Case Question** — Spend 15 Minutes on: Tell about a time when you were not able to build a successful relationship with a difficult person.",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "Provide Exhibit 1 to interviewee before asking Question 1. Once each question is answered, move on to the next. Provide additional case information with each question.",
        ],
      },
      {
        label: "Case Information",
        groups: [
          {
            heading: "Current Process",
            items: [
              "Purchase colored yarn",
              "Load correct colored yarn onto spools",
              "Weave carpet with colored yarn",
              "Back carpet",
              "Cut, roll, store",
            ],
          },
          {
            heading: "Considering new process",
            items: [
              "Purchase uncolored yarn",
              "Load spools",
              "Weave carpet",
              "NEW MACHINE (Inks, Dyes, Dries)",
              "Back carpet",
              "Cut, roll, store",
            ],
          },
        ],
      },
      { paragraphs: ["**Machine costs $25M**"] },
      {
        label: "Case Flow Guide",
        lines: [
          "**Question 1:** Should Benjamin Carpet Co. purchase the machine? How would you structure your solution?",
          "  Provide Exhibit 1 to interviewee",
          "**Question 2:** What are some of the categories that will affect the calculations?",
          "**Question 3:** Given the following information is the machine worth investing in?",
          "**Question 4:** With the following additional revenue is the venture worth pursuing?",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "Should Benjamin Carpet Co. purchase the machine? How would you structure your solution?",
    guidancePreLines: [
      "Provide Exhibit 1 to interviewee",
      "This section provides a sample analysis for interviewer’s reference",
      "Two alternatives – Buy the machine or Don’t buy the machine",
    ],
    axisBarTitle: "Cost of Old vs New Process ($/yard)",
    axisBarSeries: [
      { name: "Old", color: RED },
      { name: "New", color: GREY },
    ],
    axisBarGroups: [
      { label: "Yarn", values: [5, 4.5] },
      { label: "Inventory", values: [2, 1.5] },
      { label: "Labor", values: [1.5, 1.25] },
      { label: "Operations", values: [1.5, 2.5] },
    ],
    axisBarYMax: 6,
    axisBarYStep: 1,
    axisBarYTickPrefix: "$",
    axisBarTitleCentered: true,
    axisBarValueInk: true,
    axisBarAxisLines: true,
    axisBarNoGrid: true,
    axisBarLabelsAbove: true,
    axisBarValueLabels: true,
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      { label: "Don’t buy the machine", lines: ["Current status quo"] },
      {
        label: "Buy the machine",
        lines: [
          "Incremental Revenues – additional price / volume",
          "Incremental Cost Savings via improved operations",
          "NPV of costs and future cash flows",
          "Risks – access to capital, risk to business of changeover",
        ],
      },
    ],
    calcLines: [
      { q: "Yarn", a: "- $0.50 / yard" },
      { q: "Inventory", a: "- $0.50 / yard" },
      { q: "Labor", a: "- $0.25 / yard" },
      { q: "Ops Cost", a: "+ $1.00 / yard" },
      { q: "", a: "==$0.25 / yard savings==" },
    ],
    guidanceLabel: "Guidance on Exhibit 1",
    guidanceLines: [
      "**Exhibit Summary**",
      "  The new process improves costs across all areas except operations",
      "  $0.50 per yard savings for yarn",
      "  $0.50 per yard savings for inventory",
      "  $0.25 per yard savings for labor",
      "  $1.00 per yard increase for operations",
      "**Exhibit Analysis**",
      "  Calculate incremental cost savings with the new process",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "What are some of the categories that will affect the calculations?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Investment",
      "Yarn (inventory management, waste, lower cost)",
      "Operation Costs (Labor, Utilities, Die, Maintenance)",
      "Useful life of the machine",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "Given the following information is the machine worth investing in?",
    guidancePreLines: [
      "$0.25 incremental savings per yard of yarn (currently $10 per yard)",
      "Annual yarn production is 10M yards",
      "Machine has useful life of 10 years",
    ],
    calcLines: [
      { q: "10,000,000 yards * ($0.25 / yard)", a: "= ==$2,500,000==" },
      { q: "$2,500,000 * 10 years", a: "= ==$25,000,000== with 0% discount rate" },
    ],
    answerText:
      "With any realistic discount rate, the generated cash flow will not cover the initial $25M CapEx cost",
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "With the following additional revenue is the venture worth pursuing?",
    guidancePreLines: [
      "Currently produce & sell 10M yards / year",
      "Current fully loaded cost $10/yard",
      "With new machine:",
      "  Un-died yarn - $0.50 / yard",
      "  Inventory - $0.50 / yard",
      "  Labor - $0.25 / yard",
      "  Ops Cost + $1.00 / yard",
      "  - $0.25 / yard",
      "Machine lasts 10 years",
      "New technology allows for the creation of carpet with new textures and patterns which will attract high end customers",
      "  Current customers pay $16 per yard",
      "  New customers will pay 25% more",
      "  High-end market sells 70M yards / year",
      "  Benjamin Carpet will capture 5% of the high-end market",
      "  30% of current market comes from high-end customers",
    ],
    calcLines: [
      { q: "70 million yards / year * 5% * $20 / yard =", a: "$70 million" },
      { q: "10 million yards / year * 30% * $20 / yard =", a: "$60 million" },
      { q: "10 million yards / year * 70% * $16 / yard =", a: "$112 million" },
      { q: "New", a: "$242 million" },
      { q: "Old", a: "$160 million" },
      { q: "Additional Sales", a: "$82 million" },
      { q: "Incremental Fully Loaded Cost", a: "$32 million ($9.75 * 70M * 5% - $0.25 * 10M)" },
      { q: "Profit", a: "==$50 million==" },
    ],
    answerText: "Annual profit of $50 million easily overcomes $25 million cost and will be very profitable over 10 years",
  },
];
