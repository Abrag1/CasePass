import type { CasePage } from "../content";

export const CASE_ID = "d370eb09-1fde-4ad2-a422-fccc5048a427";

const PROMPT =
  "Our client is a major toothpaste manufacturer based in the United States that serves the US market. Our client wants to lower costs and is considering moving manufacturing operations to Vietnam.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "A US toothpaste manufacturer wants to lower costs and is considering moving manufacturing to Vietnam. Size the market, compare variable costs and weigh the pros and cons of offshoring.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "cpg", "offshoring", "break-even", "light-math"],
};

const RED = "#b01c1c";
const PINK1 = "#e4cccc";
const PINK2 = "#f1e6e5";
const BLK = "#111111";
const hc = (v: string) => ({ v, align: "left" as const, bg: RED, fg: "#ffffff" });
const bc = (v: string, i: number) => ({
  v,
  align: "left" as const,
  w: 400,
  fg: BLK,
  bg: i % 2 === 0 ? PINK1 : PINK2,
});
const row = (vals: string[], i: number) => ({ cells: vals.map((v) => bc(v, i)) });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question: Spend 15 Minutes on: Describe a time when you worked in a high-functioning team",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        lines: [
          "The primary purpose of the case is to test whether the interviewee can vet the pros and cons of offshoring manufacturing.",
          "The case has listed questions to ask the interviewee and more typical of a 1st round Bain interview. The case is somewhat interviewer-led, but more conversational.",
        ],
      },
      {
        label: "Case Flow Guide",
        groups: [
          {
            heading: "Part 1: Market Sizing",
            items: [
              "Estimate the size of the US market for toothpaste. Given our client’s market share, how many tubes does our client sell each year?",
            ],
          },
          {
            heading: "Part 2: Cost Analysis of Manufacturing in the US",
            items: [
              "The client would like to do a cost analysis of their current manufacturing plant in the US. What costs would you include in the analysis?",
            ],
          },
        ],
      },
      { paragraphs: ["After the interviewee brainstorms cost items, provide **Exhibit 1**"] },
      {
        groups: [
          {
            heading: "Part 3: Business Instincts",
            items: [
              "Where would raw materials be cheaper and why?",
              "By what percent do you think labor is cheaper in Vietnam and why? What trends do you see in the future?",
              "By what percentage do you think shipping costs will increase?",
            ],
          },
          { heading: "Part 4: Cost Analysis of Moving Manufacturing to Vietnam", items: [] },
        ],
      },
      {
        paragraphs: ["Provide **Exhibit 2** to the interviewee"],
        lines: ["Do you think it’s feasible or a good idea to move manufacturing to Vietnam?"],
      },
      {
        groups: [
          {
            heading: "Part 5: Brainstorming",
            items: [
              "What considerations should be given for moving manufacturing to Vietnam?",
              "What are some risks involved with moving manufacturing?",
            ],
          },
        ],
      },
      { paragraphs: ["**Part 6: Final Recommendation**"] },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "**Question 1:** Estimate the size of the US market for toothpaste. Given our client’s market share, how many tubes does our client sell each year?",
    guidancePreLabel: "Case Information",
    guidancePreLines: [
      "There is one major competitor and a few small players in the market. Our client’s market share is about ==30%==.",
      "Competition is growing. All players are looking for ways to decrease costs, as costs have been steadily increasing over time.",
      "The plant is located on the east coast and ships to ==4== distribution centers throughout the US",
      "Total fixed costs for setting up the Vietnam plant will be ==$0.5B==",
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "US Population x Client’s Market Share x Number of tubes of toothpaste per year per person",
      "= 300M people x 30% x 3 tubes / year / person = ==270M==",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "**Question 2:** The client would like to do a cost analysis of their current manufacturing plant in the US. What costs would you include in the analysis?",
    guidancePreLines: [
      "After the interviewee brainstorms cost items, **provide Exhibit 1**. With the exhibit, let the interviewee estimate the cost of manufacturing at Vietnam. Reasonable estimates are acceptable.",
    ],
    exhibitTitle: "Exhibit 1",
    dataTableTitle: "Variable Costs in the US",
    dataTableFontSize: 16,
    dataTableCols: "1fr 1fr",
    dataTableHeaders: [hc("Type"), hc("Costs")],
    dataTableRows: [
      row(["Raw Materials", "$ 0.65"], 0),
      row(["Labor", "$ 1.00"], 1),
      row(["Shipping", "$ 0.15"], 0),
      row(["Variable Cost per Tube", "$ 1.80"], 1),
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: ["Major items include fixed cost (PPE), variable cost (labor, material, transportation, tax, … )"],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "**Question 3: a)** Where would raw materials be cheaper and why?\n**b)** By what percent do you think labor is cheaper in Vietnam and why? What trends do you see in the future?\n**c)** By what percentage do you think shipping costs will increase?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Question 3: a) Where would raw materials be cheaper and why?**",
      "  Vietnam as its closer to China, where the raw materials can be purchased for cheaper than purchasing in the United States. Raw materials are ==40%== less in Vietnam.",
      "**Question 3: b) By what percent do you think labor is cheaper in Vietnam and why? What trends do you see in the future?**",
      "  ==75%== cheaper (90-60% acceptable). As global wage gaps decreases, labor costs will rise.",
      "**Question 3: c) By what percentage do you think shipping costs will increase?**",
      "  Approximately ==100%==, as it is now costly to ship from manufacturing in Vietnam to the distribution centers",
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "**Question 4:** **Provide Exhibit 2** to the interviewee. Do you think it’s feasible or a good idea to move manufacturing to Vietnam?",
    exhibitTitle: "Exhibit 2",
    dataTableTitle: "Variable Costs in the US and Vietnam",
    dataTableFontSize: 16,
    dataTableCols: "1.3fr 1fr 1fr",
    dataTableHeaders: [hc("Type"), hc("US"), hc("Vietnam")],
    dataTableRows: [
      row(["Raw Materials", "$ 0.65", "$ 0.25"], 0),
      row(["Labor", "$ 1.00", "$ 0.25"], 1),
      row(["Shipping", "$ 0.15", "$ 0.30"], 0),
      row(["Variable Cost per Tube", "$ 1.80", "$ 0.80"], 1),
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Based on a market size of 90M people, with 3 tubes/year/person on average, it will take approximately ==2 years== to breakeven. Yes, it is feasible because it takes less than 2 years to breakeven.",
      "**The math is shown below:**",
      "  Raw Material + Labor + Shipping = Variable Cost per Tube",
      "  In the US: $0.65 + $1.00 + $0.15 = ==$1.80==",
      "  In the Vietnam: $0.25 + $0.25 + $0.30 = ==$0.80==",
      "  Savings per Tube: $1.80 - $0.80 = ==$1.00==",
      "  If total fixed cost for opening plant in Vietnam is $0.5B, the client will breakeven with 0.5B tubes.",
      "  Given that our client sells 270M tubes/year, they will break even in ==under 2 years== (0.5B/270M).",
    ],
  },
  {
    n: "06",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "**Question 5:** **a)** What considerations should be given for moving manufacturing to Vietnam?\n**b)** What are some risks involved with moving manufacturing?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Question 5: a) What considerations should be given for moving manufacturing to Vietnam?**",
      "  Product safety standards, increased shipping time and less flexible response time, increased inventory and manufacturing lead time, less manufacturing oversight since it is geographically removed from headquarters, government regulations, geopolitics",
      "**Question 5: b) What are some risks involved with moving manufacturing?**",
      "  Labor prices increase, oil price increase (increase shipping costs),Vietnamese political issues (coup, revolution, war), closing or disruption of shipping lanes",
    ],
  },
  {
    n: "07",
    label: "Question 6",
    title: "Question 6",
    kind: "qa",
    qText: "**Question 6:** What is your recommendation to the client?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Our client should move manufacturing overseas because of a short ==2 year== breakeven time, increased pressure to reduce costs, and a stronger competitive landscape.",
      "**Mediocre solution:** Only focused on pros and cons from an internal cost or product quality perspective",
      "**Good solution:** Provides additional insight into market competitor and customer reactions",
      "**Excellent solution:** Provides creative solutions to inherent risks of overseas production and external economic or political factors",
    ],
  },
];
