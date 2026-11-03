import type { CasePage } from "../content";

export const CASE_ID = "4b90f1d4-6ee4-457c-b6a1-56a3d83a24de";

const PROMPT =
  "Situation\n\n• Midwest Machinery makes a variety of machines designed for the medium to heavy industrial sector that are used in factories, farms, and industrial buildings. Revenues are $3B and net profit margins are 12%.\n• The CEO wants to find cheaper ways to produce machines, and has pushed management to search for alternate suppliers in faraway places such as Colombia, Shanghai and India.\n• The CEO also wants to increase efficiency in processes that support operations. In particular, they want to ensure that basic activities that do not involve intellectual capital are performed at the lowest cost possible. The CEO respects the company’s traditions and strong sense of community with the town, but knows that profitability must come first for them and their shareholders.\n\nIssue and Question\n\n• The MM team has proposed moving the manufacturing process for the XL292 machine, a critical machine for many of their end products, to India. These results may affect the CEO’s decision on whether to outsource other processes, as there is a total of $300M in costs with outsourcing potential. Before the CEO looks at the financial data, they want to have a clear understanding of the pros and cons of outsourcing.\n• Develop a structure for thinking through the pros and cons of outsourcing this process to India. Explain the model and what you would advise the CEO to consider as they review the data.";

export const CASE_META = {
  review: "auto",
  case_type: "Sourcing / Outsourcing",
  synopsis:
    "A US industrial machinery maker is weighing whether to move production of one machine to India. Structure the pros and cons, then use cost data to judge the economics and make a recommendation.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "outsourcing", "heavy-math", "brainstorming", "industrial-goods"],
};

const L = (v: string, w = 600) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you had to develop a creative solution to solve a problem. 2. Think about a ‘good team’ that you’ve been a part of - what made it a good team and how did you contribute to it?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case involves brainstorming and considerable quantitative analysis. It is a good exercise for those who wish to practice ‘case math,’ particularly when working through the optional questions.",
          "Excellent candidates will distinguish themselves through their ability to synthesize the quantitative and qualitative aspects, particularly by factoring key details from the Q&A / discussion into the mathematical calculations and by demonstrating an understanding of both components when providing their final recommendation.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Q&A/ Discussion" },
          { n: "2", text: "Framework" },
          { n: "3", text: "Quantitative analysis" },
          { n: "4", text: "Optional questions" },
          { n: "5", text: "Recommendation" },
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
    guidancePreIntro: "Additional information to be provided (**only if asked**):",
    guidancePreLines: [
      "**Community** – The company is located in a small town in the U.S. and has been the largest employer there for over 30 years.",
      "**Unions** – Midwest is unionized but the union and management have typically been on friendly terms.",
      "**CEO Personal Incentive** – If they save the company over ==$50M== this year, they will receive a ==$1M== bonus.",
      "**Competitors –** They have been benefiting from lower costs associated with outsourcing for years.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** Midwest should outsource production to increase profits and to remain competitive in the market. I would like to begin by exploring the economics of such a decision, and then consider the impact of outsourcing on the people and community.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Framework: India",
          children: [
            {
              label: "Pros",
              children: [
                { label: "Financial:", children: [{ label: "Cheaper labor, facilities, etc. abroad" }] },
                {
                  label: "Plant operations:",
                  children: [
                    {
                      label:
                        "Unnecessary production may be streamlined resulting in more savings long term, opportunity to build in higher capacity in new plant (if needed)",
                    },
                  ],
                },
              ],
            },
            {
              label: "Cons",
              children: [
                {
                  label: "Financial:",
                  children: [
                    {
                      label:
                        "Potential hidden costs with respect to handling products, quality control, currency exchange rates, and doing business in a foreign country",
                    },
                  ],
                },
                { label: "People:", children: [{ label: "Fearing for their jobs, good people may leave" }] },
                { label: "Plant operations:", children: [{ label: "Idle capacity may cause further expense in local plants" }] },
                { label: "Community relations:", children: [{ label: "Backlash from community may hurt company brand/reputation" }] },
                {
                  label: "Funding:",
                  children: [
                    {
                      label: "Upfront CAPEX investment will be required to move production; could be difficult to obtain funding from bankS",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Framework: U.S.",
          children: [
            {
              label: "Pros",
              children: [
                { label: "People:", children: [{ label: "Loyalty, best people stay, morale will be up" }] },
                { label: "Plant operations:", children: [{ label: "Capacity will remain steady" }] },
                {
                  label: "Community Relations:",
                  children: [{ label: "Unions and community leaders will continue to support Midwest management" }],
                },
                {
                  label: "Technology:",
                  children: [{ label: "By producing locally, Midwest can quickly keep up with technological changes" }],
                },
              ],
            },
            {
              label: "Cons",
              children: [
                { label: "Financial:", children: [{ label: "MM will continue to waste profits due to high costs" }] },
                { label: "People:", children: [{ label: "Good employees may still leave as personal opportunities diminish" }] },
              ],
            },
          ],
        },
      ],
    },
    nextStepText:
      "**Question 1:** Once the candidate has discussed their framework, they should drive toward next steps and a data request. If not, guide the candidate to an economic analysis of the decision (**show Exhibit 1**). If the candidate does not automatically begin, ask them to calculate the profitability of staying local vs. going abroad to India.",
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    dataTableTitle: "Economics of Staying Local or Outsourcing to India",
    dataTableCols: "2fr 1fr 1fr",
    dataTableHeaders: [
      { v: "", align: "left" },
      { v: "Stay Local", align: "center" },
      { v: "India", align: "center" },
    ],
    dataTableRows: [
      { cells: [L("Total Units"), C("10,000"), C("10,000")] },
      { cells: [L("Labor and benefits per hour"), C("$30"), C("$7")] },
      { cells: [L("Hours to produce a unit"), C("6"), C("8")] },
      { cells: [L("Material Cost per unit"), C("$400"), C("$250")] },
      { cells: [L("Holding cost per unit"), C("$30"), C("$20")] },
      { cells: [L("Shipping cost per unit"), C("$15"), C("$44")] },
      { cells: [L("Import Duty"), C("$0"), C("$90")] },
      { cells: [L("Made in USA credit per unit"), C("$85"), C("$0")] },
    ],
    calcTable: {
      title: "Sample response:",
      headers: ["Economics: U.S.", "Economics: India"],
      rows: [
        ["= (Labor * Hours) (30*6 = $180)", "= (Labor * Hours) (7*8 = $56)"],
        ["+ Materials ($400)", "+ Materials ($250)"],
        ["+ Holding cost ($30)", "+ Holding cost ($20)"],
        ["+ Shipping ($15)", "+ Shipping ($44)"],
        ["+ Import duty ($0)", "+ Import duty ($90)"],
        ["- USA credit ($85)", "- USA credit ($0)"],
        ["==$540/unit==", "==$460/unit=="],
        ["$540/unit * 10K units = ==$5.4M total cost==", "$460 * 10K units = ==$4.6M total cost=="],
      ],
      totalLast: true,
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Cost savings = ==$0.8M== ($5.4M - $4.6M) or ==14.8%== (~15%, $0.8M/$5.4M)",
      "Extrapolating to other processes of $300M of costs with outsourcing potential – it can save up to ==~45M== ($300M * ~15%)",
      "$45M is ~13% of Midwest’s bottom line ($3B * 12% = $360M of profit, $45M/$360M = 12.5%)",
      "**Ask the candidate:**",
      "  Returning to your model, how has the outcome of your calculations affected your thinking about this problem, if at all?",
      "Candidate should return to their framework and initial hypothesis and use the data to either confirm or to shift their hypothesis. The candidate should consider risks and next steps based off of this data and their conclusions. This response is an opportunity to demonstrate structured thinking (in written form) before moving on to questions 2 and 3.",
    ],
  },
  {
    n: "04",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "What would happen if labor costs in India doubled?",
    calcTable: {
      title: "Sample response:",
      headers: [],
      rows: [
        ["= (Labor * Hours) (7*8*2 = $112)"],
        ["+ Materials ($250)"],
        ["+ Holding cost ($20)"],
        ["+ Shipping ($44)"],
        ["+ Import duty ($90)"],
        ["- USA credit ($0)"],
        ["==$516/unit=="],
        ["$516 * 10K units = ==$5.16M total cost=="],
      ],
      totalLast: true,
    },
    answerText:
      "- Save ==~4%== as compared with staying local (($5.4M - $5.16M)/$5.4M)\n- If outsource all $300M in costs = ==~$12M savings== ($300M * ~4%)\n- Total savings represent ==~3%== of current profit margin ($12M/$360M)",
  },
  {
    n: "05",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "At an investment of $2.5M, how many units would Midwest Machinery Co. need to break even? (Use original labor costs.)",
    answerText:
      "- Breakeven when investment = Total cost saved\n- Cost savings = $80/unit\n- Investment = $2.5M\n- Breakeven:\n  - Investment = Cost savings * Units\n  - $2.5M = $80 * units\n  - $2.5M/$80 = ==31,250 units== to breakeven on investment",
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        lines: [
          "Midwest should **outsource production of the XL282 machine**:",
          "  Midwest can expect to save about $0.8M when going abroad with the XL282 machine, with a total expected outsourcing potential of around $45M. Although the savings for this individual machine do not seem high enough to merit overseas investment, the aggregate overseas potential is large enough to justify the risk.",
          "  Based on the ‘pros and cons’ discussion, it may be a good idea to perform a pilot using the XL282 machine, making sure this part is successful before moving the additional processes totaling $300M of costs to India.",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Unpredictable changes in a foreign country:",
              "  Supplier change – large savings may disappear",
              "  Government changes –taxes and credits may shift",
              "  Hourly rate – less predictable rates and productivity in India",
              "  Weather- potential supply disruption due to weather conditions",
              "Quality of product",
              "Employees’ job concerns over outsourcing, union and community backlash",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Perform a more detailed analysis of variable risk factors to quantify likelihood of potential disruptions",
              "Craft a proposal for the XL292 machine pilot that includes a more detailed cost forecast and that maintains product quality standards",
              "Invest time in frequent and open communication with employees to be transparent about company shifts and any effects these shifts would have on employees’ jobs",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "The candidate should develop an opinion regarding whether the overseas investment is worthwhile. The recommendation itself is less important than the consideration of both qualitative and quantitative factors.",
      "The candidate should weigh the impact of the additional $300M in outsourcing costs (i.e. their final recommendation should not solely be based on the expected results from the XL282 machine).",
      "When candidate is weighing the importance of different factors, they should demonstrate awareness of background information provided (e.g. CEO is more concerned about profits than community ties).",
    ],
  },
];
