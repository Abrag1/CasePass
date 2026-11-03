import type { CasePage } from "../content";

export const CASE_ID = "ddf2c120-45d6-4e0d-8950-74ccd22cd160";

const PROMPT =
  "Our client is a large pharmaceutical company with a strong business in \"Rare Disease\" (RD). Rare diseases are conditions that affect fewer than 200,000 people in the US. Historically, pharmaceutical companies have not invested significantly in Rare Disease , because it has not been cost effective to conduct research for such small populations.\n\nDue to the fall off in the number of pharmaceutical blockbusters and improved regulation to make R&D cheaper for Rare Disease, pharmaceutical companies have begun to invest more in Rare Disease R&D over the last few years. Our client has hired BCG because it would like to grow its Rare Disease business.\n\nHow can the client double its Rare Disease business in 5 years?";

export const CASE_META = {
  review: "auto",
  case_type: "Growth strategy",
  synopsis:
    "A large pharmaceutical company wants to double its Rare Disease business in five years. Size what its existing assets and drug pipeline will deliver, then work out what must be acquired to close the gap.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "growth-strategy", "pharmaceutical", "npv", "acquisition"],
};

const hd = (v: string, align: "left" | "center" | "right" = "center") => ({ v, align });
const L = (v: string, w = 700) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me a story that explains your background, and why you're here today (why consulting, why this firm, why location). 2. What is your proudest accomplishment (not necessarily a professional achievement)?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case is a NPV investment evaluation go / no-go.",
          "You should read the case prompt to the candidate and show them the data sheet on the next page as they request each piece of information.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Revenue Analysis" },
          { n: "3", text: "Cost analysis" },
          { n: "4", text: "NPV calculation and recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** I would like to first consider the client's position in the market by learning more about our client's current R & D and drugs on the market. Do we have any similar information?",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Existing RD Drug Market",
          children: [
            {
              label: "Existing drugs/ patents",
              children: [
                {
                  label: "Increase Penetration",
                  children: [
                    { label: "Frequency of usage" },
                    { label: "Increase penetration on market" },
                    { label: "Acquisition" },
                  ],
                },
              ],
            },
            {
              label: "New drugs",
              children: [
                {
                  label: "Product Development",
                  children: [{ label: "Small improvements in current drugs -> increase price point?" }],
                },
              ],
            },
          ],
        },
        {
          label: "New RD Drug Market",
          children: [
            {
              label: "Existing drugs/ patents",
              children: [
                {
                  label: "New Market Entry",
                  children: [
                    { label: "Can drugs be used in other diseases?" },
                    { label: "Combinations with other drugs?" },
                    { label: "Expansion to other countries/regions or capturing underserved region in the US?" },
                  ],
                },
              ],
            },
            {
              label: "New drugs",
              children: [
                {
                  label: "Diversification",
                  children: [
                    {
                      label:
                        "New pipeline of R&D – when would drugs be ready to go-to-market? (respecting time-frame of 5 years)",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidate should ask what growth means: revenues, profits, volume, market share, customer base, etc. or lay out options between those alternatives. The interviewer should respond by saying that the client is interested in all potential options for growth.",
      "  Candidate should structure the growth opportunities considering current assets/drugs/patents + new opportunities",
      "  Note: The suggested framework is different from the traditional market and profitability framework as it considers all options through an existing v. new lens and structure.",
      "  Even if the candidate comes up with a different framework, it should consider the expansion on current drugs and the new drugs under development for other rare diseases. If not, ask the candidate what other factors should be considered until they come to this point.",
      "Candidate should also talk about cross-functional issues, like regulations or reimbursement of these drugs by health insurers.",
      "If necessary, after discussion of the framework, ask the candidate one of the questions below to get them started on further exploration of the issue.",
      "  How would you approach our client's question on growing its Rare Disease business?",
      "  Where would you like to start?",
      "The candidate should then ask for company information for analysis. **Show them Exhibit 1.**",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Math Calculation",
    kind: "qa",
    qText:
      "After showing Exhibit 1 to the candidate, ask them: **based on the data, how large will the client's Rare Disease business be in 5 years?**\n\nIf necessary, ask, **what is the shortfall to the client's goal of doubling their business?**\n\nThen ask, **what does the client need to do to double the Rare Disease revenues in 5 years?** If candidates discusses acquisitions, ask, **who should be acquired? How many assets will we need to buy?**",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "Information to be provided upon request:",
    guidancePreLines: [
      "Our client is an industry leader with a track record of success. Its existing business is ==$2.5B==, expected to grow at ==5%== per year.",
      "Rare disease market is ==$30B== and is as profitable as \"Big Pharma\".",
      "While research is relatively expensive, the government provides tax credits for drugs designated to treat rare diseases.",
      "Additionally, prices tend to be higher to make up for the upfront research investment. It's also growing faster than Big Pharma.",
      "There are many small bio-techs that are attractive targets and there are also other big pharmaceutical companies that have rare disease divisions / assets. Assume each company has approximately ==$500M== in revenues.",
    ],
    dataTableTitle: "Assets in research and development",
    dataTableCols: "0.8fr 0.8fr 1fr 2fr 1fr",
    dataTableHeaders: [
      hd("Phase", "left"),
      hd("# Assets"),
      hd("Time to market (years)"),
      hd("Attrition (% expected to be approved to reach the market)"),
      hd("Peak revenue ($M)"),
    ],
    dataTableRows: [
      { cells: [L("Research", 700), C("20"), C("6"), C("10%"), C("500")] },
      { cells: [L("Phase I", 700), C("5"), C("4"), C("20%"), C("500")] },
      { cells: [L("Phase II", 700), C("3"), C("3"), C("40%"), C("500")] },
      { cells: [L("Phase III", 700), C("1"), C("2"), C("60%"), C("500")] },
    ],
    dataTableMore: [
      {
        title: "Revenue by years on market",
        cols: "1fr 2fr",
        headers: [hd("Year on the market"), hd("Revenue (% of peak revenue)")],
        rows: [
          { cells: [C("1st", 700), C("20%")] },
          { cells: [C("2nd", 700), C("40%")] },
          { cells: [C("3rd", 700), C("60%")] },
          { cells: [C("4th", 700), C("80%")] },
          { cells: [C("5th", 700), C("100%")] },
        ],
      },
    ],
    calcLines: [
      {
        q: "Growth from existing assets",
        a: "assumes linear growth – do not ask to calculate compounding growth.",
      },
      {
        q: "Current baseline",
        a: "$2.5B, growing at 5% for 5 years = $2.5B * 5% * 5 = ==$625M==",
      },
    ],
    calcTable: {
      title: "Growth from pipeline:",
      headers: ["Phase", "# of assets", "Attrition", "Peak Rev", "% of peak rev", "Total"],
      rows: [
        ["I", "5", "x 20%", "x $500M", "x 20% - 1st year", "= $100M"],
        ["II", "3", "x 40%", "x $500M", "x 40% - 2nd year", "= $240M"],
        ["III", "1", "x 60%", "x $500M", "x 60% - 3rd year", "= $180M"],
        ["", "", "", "", "", "= ==$520M=="],
      ],
      totalLast: true,
    },
    guidanceLabel: "Math Calculation",
    guidanceLines: [
      "Note: research assets need 6 years to reach the market and will not generate revenue in 5 years.",
      "**Shortfall:**",
      "  Growth target:  $2.5B - to double the business",
      "  Internal growth is $625M + $520M = $1.145M, need ~==$1.4B== more",
      "  If each asset is $500M, then the client needs to buy ==3== peak revenue assets or more (if they are in R&D) to double business in 5 years.",
      "**Portfolio in 5 years:**",
      "  $5B portfolio with:",
      "    $3.1B (~60%): from current baseline",
      "    $520M (~10%): from pipeline",
      "    $1.4B (~30%): acquisitions",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "Recommendation",
        paragraphs: [
          "In order to double the current revenue of $2.5B, client will need to acquire ~==3== \"peak revenue\" assets to close the gap between your goal of $2.5B and the $1.1B their portfolio will generate organically",
        ],
        lines: [
          "Current pipeline will provide $3.1B in revenue, assuming 5% growth",
          "New research will contribute with $520M in revenue, considering Phases I to III",
          "Acquisition of 3 players (average revenue of $500M), would compose additional needed revenue of $1.4B",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Difficulty in acquiring businesses / market value",
              "Delays in R&D and testing phases may delay revenues from new products",
              "Regulation",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Perform due diligence of possible targets to evaluate best options",
              "Define internal mechanisms to control track of product launches to guarantee timing",
              "Work on FDA approval and obtain patents for drugs in pipeline and on market to guarantee projected revenues",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "After completing the analysis, ask the candidate to provide a recommendation on what is necessary for the company to achieve its desired market growth. The main question in this case is not whether the growth is realistic or feasible, but rather, what should be done to achieve the client's target.",
      "In the recommendation, the candidate should focus on addressing the original question and on providing the results from the analysis.",
    ],
  },
];
