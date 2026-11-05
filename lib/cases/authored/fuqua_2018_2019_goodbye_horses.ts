import type { CasePage } from "../content";

export const CASE_ID = "353d2f19-0f35-4644-b88c-b617b17581b6";

const PROMPT =
  "Your client is the CFO of Aperture Laboratories, a leading US biopharmaceutical company with a market cap >$150B. Aperture develops and manufactures a diversified range of products and in particular prides itself on saving millions of human lives every year.\n\nThe company is under investor pressure because of its slow firm value growth over the next 10 years. Investors are very anxious to see significant changes announced at the firm in the next quarter. The CFO has already identified and evaluated a number of high-growth, promising, but capital-intensive projects, and she does not have enough cash to invest in any of the opportunities—what dose she need to do next?";

export const CASE_META = {
  review: "auto",
  case_type: "Corporate Finance",
  synopsis:
    "A biopharmaceutical CFO under investor pressure has promising projects but not enough cash to fund them. Work out how to raise capital and which projects to fund with it.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "healthcare", "divestiture", "exhibit-heavy", "medium-math"],
};

const BAR = "#3a4a9f";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: When working on a team where you are not the leader, what is the typical role you take? Question 2: What is your least favorite aspect of Fuqua?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "The prompt can be ambiguous, and many interviewees may drive the case towards evaluating the projects or building a profit tree of the existing business to identify any issues. Neither of these approaches directly answers the prompt, but **probe** them to realize the goal is to **raise capital** in order to fund these projects.",
          "  Optional: this case can be a good opportunity for the interviewee to experience a free-flowing, conversational “partner-style” case. Consider telling the interviewee to not write anything down for the framework.",
          "Let the student build a framework, which should be focused on **ways to raise capital**, but could also include other next steps such as gaining management buy-in to invest in these high growth opportunities",
          "  Ideal framework will include ways to raise capital (issuing equity, raising debt, divesting a portion of business, canceling existing projects to free up budget) and also touch on where to deploy the capital (i.e., into the projects)",
          "  Students may discuss P&L levers in their framework, which is OK, but check to see if they realize any cost-cutting or revenue-boosting measures will not raise capital quickly and do not satisfy investor requirements for significant changes",
          "  Ideal candidate will discuss pros/cons of each way to raise capital",
        ],
      },
    ],
    nextStepText: "Guide them towards thinking about divestiture, then provide them with the first exhibit",
  },
  {
    n: "02",
    label: "Exhibit #1: Aperture business segments",
    title: "Exhibit #1: Aperture business segments",
    kind: "qa",
    guidancePreLabel: "Exhibit #1 Guidance:",
    guidancePreLines: [
      "**Provide** the exhibit and let the interviewee walk through it **verbally**",
      "The interviewee should drive the discussion and determine that **animal health** is the best option to divest, providing sufficient rationale",
      "If the interviewee does not choose animal health, discuss with them their rationale and steer them towards choosing animal health",
      "  The interviewee should take the hint and switch towards animal health",
      "Do not prompt the interview towards next steps; make sure they drive conversation towards how much capital they can raise and if they can find buyers for the business unit",
    ],
    extraCharts: [
      {
        kind: "bubble",
        yTitle: "5-yr CAGR",
        xTitle: "Increasing specialization requirements",
        yMin: -5,
        yMax: 20,
        yStep: 5,
        yTickSuffix: "%",
        xTicks: 10,
        radiusPerRootSize: 12.6,
        legend: { text: "Sales ($B)", box: [865, 229, 183, 52] },
        bubbles: [
          { x: 0, y: 1, size: 4.2, value: "4.2", name: "Animal health", nameAt: [215, 607] },
          { x: 1, y: 9, size: 3.1, value: "3.1", valueAt: [223, 403], name: "Consumer health", nameAt: [187, 483], leader: [[258, 410], [268, 421]] },
          { x: 2, y: 11, size: 2.1, value: "2.1", valueAt: [424, 357], name: "Nutrition", nameAt: [427, 331], leader: [[415, 366], [394, 382]] },
          { x: 3, y: 7, size: 9.3, value: "9.3", name: "Emerging market drugs", nameAt: [251, 554], leader: [[405, 529], [452, 499]] },
          { x: 4, y: 0, size: 9.2, value: "9.2", name: "Established products", nameAt: [470, 685] },
          { x: 5, y: 2.2, size: 22.7, value: "22.7", name: "Primary care pharmaceuticals", nameAt: [568, 475], leader: [[734, 480], [716, 517]] },
          { x: 7, y: 4, size: 15.2, value: "15.2", name: "Specialty care pharmaceuticals", nameAt: [735, 651], leader: [[902, 592], [910, 628]] },
          { x: 7, y: 13, size: 1.3, value: "1.3", valueAt: [797, 329], name: "Oncology drugs", nameAt: [655, 299], leader: [[836, 326], [880, 345]] },
        ],
      },
    ],
    infoBoxLabel: "Analysis",
    infoSections: [
      {
        lines: [
          "Chart takeaways (not all necessary to discuss)",
          "  Animal health is one of the lowest growth business units",
          "  Animal health is the most different business unit and outside of what Aperture prides itself in (saving human lives)",
          "  Its low degree of specialization will allow a larger pool of potential buyers (i.e., easier for another company to operate)",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText:
      "Unknown to the CFO until now, the business development team has retained JP Morgan to assess the sale-ability of the Animal Health business. They have identified that Aperture will likely receive a 3.5x enterprise value to sales multiple for the animal health business.",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Do not prompt further; let the interviewee work through the next steps",
      "The interviewee should drive towards understanding how much capital they will receive from the sale (($4.2B x 3.5 = ==$14.7B==)",
      "  If asked about taxes, tell the interviewee the deal has been structured by JP Morgan to be **tax-free**",
      "The interviewee should then begin discussing which projects to invest the capital in. Once they've begun thinking about this, provide the next exhibit",
    ],
  },
  {
    n: "04",
    label: "Exhibit #2: Investment opportunities",
    title: "Exhibit #2: Investment opportunities",
    kind: "qa",
    guidancePreLabel: "Exhibit #2 Guidance:",
    guidancePreLines: [
      "**Provide** the exhibit and let the interviewee walk through it **verbally**",
      "If asked, tell the interviewee that the NPV **includes** the capital investment",
      "The interviewee should drive the discussion and determine which projects to invest in; an excellent candidate will also look to discuss qualitative aspects of each projects (e.g., how long each project will likely take)",
      "Given our capital constraint of ==$14.7B==, the interviewee should attempt to maximize NPV. Thus, the most effective use of capital is to invest in:",
      "  Acquire newly approved GLP-1 agonist",
      "  Research new formulations for existing product portfolio",
      "  Cost-cutting initiative in US manufacturing plants",
      "At this point, tell the interviewee to **summarize** their recommendation",
      "  Recap we want to sell animal health to raise capital and invest in 3 projects listed above",
      "  Risks: ability to sell animal health (i.e., finding a buyer), timing of deal completion, etc.",
    ],
    extraCharts: [
      {
        kind: "hBars",
        title: "Project NPV",
        groups: [
          { label: "License respiratory products from competitor", values: [10] },
          { label: "Acquire newly approved GLP-1 agonist", values: [10] },
          { label: "Research new formulations for existing product portfolio", values: [7] },
          { label: "Build R&D center in China", values: [5] },
          { label: "Cost-cutting initiative in US manufacturing plants", values: [5] },
          { label: "Sales force rationalization", values: [3] },
        ],
        series: [{ name: "NPV ($B)", color: BAR }],
        max: 10,
        axisStep: 2,
        axisTitle: "NPV  ($B)",
        plotWidth: 250,
        labelFontSize: 15,
        valueFontSize: 24,
        tickFontSize: 24,
        axisTitleFontSize: 26,
        titleRule: "#0000a0",
        axisTitleEnd: true,
        rightPanel: {
          title: "Capital Investment Required",
          values: [9, 6, 5, 4, 3, 3],
          max: 9,
          axisStep: 1,
          axisTitle: "Capital investment ($B)",
          plotWidth: 250,
        },
      },
    ],
    infoBoxLabel: "Analysis",
    infoSections: [
      {
        lines: [
          "The easiest way to identify which projects to prioritize is to calculate a profitability index (e.g., NPV divided by capital investment)",
          "The interviewee can then rank projects by profitability index and see how many can be completed given our constraint of ==$14.7B==",
          "Calculations",
        ],
        steps: [{ n: "1", text: "$10 / $9 = 1.11" }, { n: "2", text: "**$10 / $6 = 1.67**" }, { n: "3", text: "**$7 / $5 = 1.40**" }, { n: "4", text: "$5 / $4 = 1.25" }, { n: "5", text: "**$5 / $3 = 1.67**" }, { n: "6", text: "$3 / $3 = 1.00" }],
      },
      {
        lines: [
          "Adding up projects 2, 3, and 5 gives us the highest NPV (==$22B==) given our capital constraint of $14.7B from the sale. It only requires ==$14B== to accomplish.",
          "A very good candidate will also have a recommendation for the remaining ==$700M==, i.e. share buy back, dividend payment, etc.",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The CFO is out at lunch and the CEO of Aperture walks into your conference room, wondering what you've been working on.",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "An ideal candidate will walk through the divestiture and what to do with the influx in capital.",
      "**Risks**",
      "  Ability to sell the Animal Health Division",
      "  Timing of the deal completion",
      "  Timeline for new capital projects",
      "  Potential for new capital projects to fail",
      "The ideal candidate will also have a mitigation strategy for each of these risks",
    ],
  },
];
