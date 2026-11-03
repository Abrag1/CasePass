import type { CasePage } from "../content";

export const CASE_ID = "7a6c8cc8-4131-444e-8fac-c4c54c23e1cd";

const PROMPT =
  "Our client, Green Co, is a $10B global manufacturer and retailer of high-end outdoor apparel, with several well-known brands. The company has big growth aspirations. Through organic and inorganic growth, Green Co is hoping to grow from $10B in revenue in FY21 to $15B by FY25.\n\nAt the same time, the CEO has recognized their customers’ and investors’ interest in being an environmentally sustainable company and has asked their Director of Sustainability to develop goals for absolute reduction in carbon emissions despite the growth they have planned (as compared to a “Business As Usual” (BAU) scenario). The CEO expects this to support the company’s overall sustainability vision, help ensure protection of their brands’ value, and bolster the company’s market capitalization.";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "An apparel manufacturer and retailer planning to grow from $10B to $15B in revenue wants to set carbon emission reduction goals. Project energy spend and emissions, compare the NPV of two energy efficiency project groupings and decide which to pursue.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "investment-decision", "npv", "esg", "heavy-math"],
};

const cell = (v: string, i: number) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const), w: i === 0 ? 600 : 400, fg: "#1f2421" });
const rowsOf = (rows: string[][]) => rows.map((r) => ({ cells: r.map(cell) }));
const heads = (hs: string[]) => hs.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about yourself. 2. Tell me about a time you had unclear instructions for a task and how you approached this task.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case is **interviewer driven**, uses a non-traditional format (it has no framework), and includes NPV calculation. It is a great case for an interviewee who is in the mid-to-late stage of casing and who desires a very quantitative case.",
          "There are several questions which will be outlined in this case. You should **provide** the case prompt and then **show** the candidate Exhibit 1: Data Sheet for the candidate’s reference throughout the case. Before asking question 1A, **allow the interviewee to review the data sheet**.",
          "The BAU scenario is one in which the company implements no carbon emission reductions.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Case Prompt and Data Sheet Review" },
          { n: "2", text: "Questions 1-4" },
          { n: "3", text: "Brainstorming" },
          { n: "4", text: "Recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1: Spend & Emissions",
    title: "Question 1: Spend & Emissions",
    kind: "qa",
    qText:
      "**Question #1A**\nAfter allowing the candidate to review Exhibit 1, ask:\n\nWithout putting a carbon reduction goals in place, how much money would you project the company to spend on energy in FY25?\n\n**Question #1B**\nAsk the following:\n\nHow much will the company emit in FY25?",
    guidancePreLabel: "Question 1",
    guidancePreLines: [
      "**Question #1A**",
      "  You may **remind** the interviewee that they have some FY25 data.",
      "  A candidate may wish to assume some increase in energy prices, which is perfectly acceptable. Allow them to **assume no price change**.",
      "**Question #1B**",
      "  **Push** the candidate to calculate the **exact number** and not round.",
    ],
    dataTableTitle: "Table 1 – Company FY21 Data",
    dataTableCols: "1.3fr 1fr 1.6fr",
    dataTableHeaders: heads(["Metric", "", "FY21"]),
    dataTableRows: rowsOf([
      ["Company Revenue", "", "$10 billion"],
      ["Locations", "Offices:", "20"],
      ["", "Retail:", "600"],
      ["", "Manuf. & Dist.:", "50"],
      ["", "Total:", "670"],
      ["Energy Consumption (millions kWh)", "Offices:", "0.5"],
      ["", "Retail:", "4.0"],
      ["", "Manuf. & Dist.:", "2.0"],
      ["", "Total:", "6.5"],
      ["Energy Spend", "", "$65 million"],
      ["Carbon Emissions", "", "300,000 metric tons of CO2-e**"],
    ]),
    dataTableMore: [
      {
        title: "Table 2 – FY25 Growth Goal",
        cols: "1.3fr 1fr 1.6fr",
        headers: heads(["Metric", "", "FY25 (Goal)"]),
        rows: rowsOf([
          ["Company Revenue", "", "$15 billion"],
          ["Locations", "Offices:", "28"],
          ["", "Retail:", "900"],
          ["", "Manuf. & Dist.:", "60"],
          ["", "Total:", "988"],
          ["NPV Calculation", "", "NPV(i) = sum from t=1 to N of Rt / (1 + i)^t"],
        ]),
        footnote:
          "** CO2-e is the unit measurement for carbon emissions; one can assume that carbon emissions are directly correlated to energy consumption\n** Assume discount rate of 10%",
      },
      {
        title: "Table 3 - Potential Energy Efficiency Projects",
        cols: "1.2fr 1.6fr 1fr 1fr 1fr 1fr",
        headers: heads(["Project Groupings", "Energy Efficiency Project(s)", "CapEx", "Annual Savings", "CO2-e Reductions", "Lifetime"]),
        rows: rowsOf([
          ["Grouping 1 – Offices", "Lighting & HVAC Retrofits at all Offices", "$4,000,000", "$1,600,000", "140,000 metric tons", "5 Years"],
          ["Grouping 2 – Manufacturing & Distribution", "Solar Installations & other controls", "$41,500,000", "$4,400,000", "140,000 metric tons", "Perpetuity"],
        ]),
      },
    ],
    calcTable: {
      headers: ["Metric", "", "FY21", "FY25 Forecast"],
      rows: [
        ["Locations", "Offices:", "20", "28"],
        ["", "Retail:", "600", "900"],
        ["", "Manuf. & Dist.:", "50", "60"],
        ["", "Total:", "670", "988"],
        ["Energy Consumption (millions kWh)", "Offices:", "0.5", "0.7"],
        ["", "Retail:", "4.0", "6.0"],
        ["", "Manuf. & Dist.:", "2.0", "2.4"],
        ["", "Total:", "6.5", "9.1"],
        ["Energy Spend", "", "$65 million", "==$91 million=="],
        ["Carbon Emissions", "", "300,000 metric tons of CO2-e", "==420,000 metric tons of CO2-e=="],
      ],
    },
    guidanceLabel: "Questions #1A and #1B",
    guidanceLines: [
      "Candidate should do the following:",
      "Recognize that the ratio of # Offices and other Locations can be applied for energy consumption.",
      "  Offices: 40% increase, 0.5m kWh increases to 0.7m kWh",
      "  Retail: 50% increase, 4.0m kWh increases to 6.0m kWh",
      "  Manuf/Dist: 20% increase, 2.0m kWh increases to 2.4m kWh",
      "  Total energy increases to 9.1m kWh.",
      "Recognize that if 6.5 million kWh cost $65 million in FY21 that results in a cost of $10 per million kWh. If energy costs stay the same (assume it does), the FY25 energy consumption will translate to ==$91 million== in energy spend.",
      "Ratio of FY21 emissions to FY21 energy consumption can be used to estimate FY25 emissions based on FY25 consumption. Answer is ==420,000 metric tons==.",
      "  6.5m kWh / 300,000 metric tons = 9.1m kWh / x metric tons",
    ],
  },
  {
    n: "03",
    label: "Question 2: NPV",
    title: "Question 2: NPV",
    kind: "qa",
    qText:
      "**Question #2**\nAsk the following:\n\nWhat is the NPV of the two potential project groupings that the company is considering implementing? Assume benefits and costs are immediately realized in FY21.",
    guidancePreLabel: "Question 2",
    guidancePreLines: [
      "**Ask** the candidate for the approach that they would take and **write out the formula**. **Do not ask** them to do the NPV calculation, it will take too long for the allotted time. Once they write the formula, provide the information that the PV (cost savings) is $6.7M.",
      "Discount rate is 10% (also on the data sheet).",
      "Investment and payback both happen in FY21.",
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Question #2**",
      "  Candidate should calculate the NPV of each of the two scenarios. Given the NPV (and other considerations), the candidate should make a recommendation on which grouping the Director of Sustainability should implement.",
      "**Grouping 1:**",
      "  NPV = PV(savings) - upfront costs= $1.6M + $1.6M/(1+0.1)^1 + $1.6M/(1+0.1)^2 + $1.6M/(1+0.1)^3 + $1.6M/(1+0.1)^4 − $4.0M",
      "  Once they have the concept and formula correct, provide the information that the PV of the cash flows from cost savings is $6.7 M.",
      "  Candidate can then subtract the upfront costs to get NPV: $6.7 M - $4 M = ==$2.7M==",
      "**Grouping 2:**",
      "  Using the perpetuity formula, c/i,",
      "  NPV = PV(savings) − upfront costs = $4.4M / 0.1 − $41.5M = ==$2.5M==",
      "  Based on this, **Grouping 1 has the best NPV**.",
      "**Note:**",
      "  A good candidate may also ask about upfront capital constraints. Given unlimited capital, a candidate could argue that the company should implement both options since they are all positive NPV.",
      "  Candidates should also consider the lifetime of these investments; different companies may want payback within a shorter time horizon even though the project will last in perpetuity.",
    ],
  },
  {
    n: "04",
    label: "Question 3: Emission Reduction",
    title: "Question 3: Emission Reduction",
    kind: "qa",
    qText:
      "**Question #3A**\nAsk the following:\n\nRelative to the BAU scenario, what are the potential energy cost savings if the company chose to adopt a goal of:\n  a) 0% absolute increase in emissions from FY21 to FY25 or,\n  b) 5% decrease in emissions from FY21 to FY25?\n\n**Question #3B**\nWhich of the two project groupings should Green Co pursue to achieve a goal of 5% decrease in emissions?",
    guidancePreLabel: "Question 3",
    guidancePreLines: [
      "The BAU (Business as Usual) scenario, as mentioned in the prompt, is one in which the company implements no carbon emission reductions.",
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Questions #3A and #3B",
        lines: [
          "Since emissions are directly correlated to energy consumption (as noted in the data tables) and the cost of energy stays constant:",
          "  A 0% increase in absolute emissions would equate to a 0% change in energy consumption. Energy spend would stay at $65 million, resulting in a **savings of $26 million** ($91 million - $65 million).",
          "  A 5% reduction in emissions, following the same logic, would equate to a 5% reduction in energy consumption (and thus spend). Spend would be reduced by 5% to $61.75 million ($65M * 95%) and thus the savings from the Business as Usual number is **$29.25 million** ($91 million - $61.75 million).",
          "Being methodical will be critical to this question; there are several variables that must be addressed in logical order:",
          "  BAU carbon emissions are forecasted to be 420,000 MT CO2 –e .",
          "  A 5% reduction target would require a 135,000 MT reduction (420,000 MT – 285,000 MT), which **could be accomplished by both project groupings** (140,000 MT each).",
          "Since both Grouping 1 and 2 offer the same carbon emissions savings potential, the **candidate should choose the one with the better NPV, which is Grouping 1.**",
          "In addition to getting the NPV calculation right and getting to a recommended goal, a great answer would include:",
          "  Balancing NPV with the non-financial benefits (i.e., carbon emissions) to ensure the goal makes sense from a financial and non-financial (e.g., stakeholder expectations) perspective.",
          "  Benchmarking these goals against those of their peers and competitors in the marketplace to understand whether these goals will help meet stakeholder expectations.",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "**Question #4**\nWhat other factors should the company consider when setting goals and planning for the implementation?",
    guidanceLabel: "Key points may include",
    guidanceLines: [
      "Additional financial considerations",
      "  Length of availability of tax credits & incentives",
      "  Availability of capital (Grouping 2 requires a very large upfront investment)",
      "Organizational",
      "  Internal appetite for adoption of these goals",
      "  External stakeholder expectations",
      "  Management commitment",
      "  Alignment with CEO’s vision",
      "Operational",
      "  Creation of an implementation roadmap",
      "  Measurement & verification of results (i.e. cost savings, carbon emissions reductions)",
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "Brainstorm",
        paragraphs: ["Green Co should implement the Grouping 1 energy efficiency project"],
        lines: [
          "This project has a positive NPV of ==$2.7M== vs Grouping 2’s ==$2.5M==",
          "It meets the company’s sustainable vision for the future by reducing carbon emissions by 5%",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Does Green Co have the financial means to implement?",
              "Does client have capability to implement project",
              "Forecasts and constant price of energy may be inaccurate",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Determine Green Co’s financial position to implement",
              "Examine movement in energy prices",
              "Analyze company’s ability to implement and impact on wider company operations",
            ],
          },
        ],
      },
    ],
  },
];
