import type { CasePage } from "../content";

export const CASE_ID = "8be68761-402e-44ea-9c98-34a37645e8aa";

const PROMPT =
  "Massive Dynamic is a multi-national pharmaceutical company.  One of their assets, Cortexiphan, is an anti-infective that successfully treats three major types of hospital-born illness and is currently in Phase II clinical trials.  Unfortunately, Massive Dynamic only has the capital to finance a Phase III clinical trial for one of the three illnesses with Cortexiphan treats.  Walter Bishop, Chief Medical Officer of Massive Dynamic, has enlisted your help to decide which of the three possible indications for cortexiphan they should pursue to maximize profits over a five year-period post-launch.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A pharmaceutical company can fund a Phase III trial for only one of three possible indications of its drug. Decide which indication to pursue and how to price it to maximize five-year profit.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "healthcare", "pharma", "pricing", "medium-math"],
};

const GREY = "#cccccc";
const A = "#ebebeb";
const B = "#f6f6f6";
const hd = (v: string, bg = GREY) => ({ v, align: "center" as const, bg, fg: "#000000", borders: "tblr", borderColor: "#ffffff" });
const c = (v: string, bg: string, bold = false) => ({ v, align: "center" as const, w: bold ? 700 : 400, fg: "#000000", bg, borders: "tblr", borderColor: "#ffffff" });

const NAVY = "#10243e";
const MID = "#376092";
const LIGHTBLUE = "#95b3d7";
const PALE = "#dce6f1";
const SILVER = "#c0c0c0";
const CREAM = "#f7f7b8";
const DK = "#000000";
const W = "#ffffff";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: If a previous coworker was asked to describe you, what three qualities would they highlight? Question 2: Describe a time when you and a coworker had different opinions on how best to proceed on a project or solve a problem.  How was this situation resolved?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Clarifications to be provided:",
      "  Drug is only likely to be approved in the US at this time",
      "  Drug will be sold directly to hospitals by Massive Dynamic; therefore, no need to consider distribution channel cots, etc.",
      "  No need to calculate based on NPV, just do total over five years w/out discounting",
      "Provide **Exhibit 1** when asked about market size and/or competition",
      "Provide **Exhibit 2** when asked about development costs or clinical profile",
      "Provide **Exhibit 3** after an initial indication selected and pricing prompt given",
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        yTitle: "Market Share",
        legendTitle: "Competitor",
        legendAlignTop: true,
        topRows: [
          { label: "Annual Doses:", cells: ["1.5B", "200M", "5.0B"] },
          { label: "Avg. Price per\nDose ($):", cells: ["$10", "$20", "$5"] },
        ],
        legend: [
          { name: "6", color: CREAM },
          { name: "5", color: SILVER },
          { name: "4", color: NAVY },
          { name: "3", color: MID },
          { name: "2", color: LIGHTBLUE },
          { name: "1", color: PALE },
        ],
        legendPlacement: "right",
        panels: [
          {
            yMax: 100,
            yStep: 100,
            yTickSuffix: "%",
            columns: [
              {
                label: "Aspergillosis",
                segs: [
                  { value: 40, color: PALE, label: "40%", textColor: DK },
                  { value: 30, color: LIGHTBLUE, label: "30%", textColor: DK },
                  { value: 20, color: MID, label: "20%", textColor: W },
                  { value: 10, color: NAVY, label: "10%", textColor: W },
                ],
              },
              {
                label: "Rare Molds",
                segs: [
                  { value: 75, color: PALE, label: "75%", textColor: DK },
                  { value: 25, color: LIGHTBLUE, label: "25%", textColor: DK },
                ],
              },
              {
                label: "Candidiasis",
                segs: [
                  { value: 25, color: PALE, label: "25%", textColor: DK },
                  { value: 25, color: LIGHTBLUE, label: "25%", textColor: DK },
                  { value: 20, color: MID, label: "20%", textColor: W },
                  { value: 15, color: NAVY, label: "15%", textColor: W },
                  { value: 10, color: SILVER, label: "10%", textColor: DK },
                  { value: 5, color: CREAM, label: "5%", textColor: DK },
                ],
              },
            ],
          },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "**Interviewer Prompt:** Here is preliminary analysis of the three potential indications for cortexiphan.  What are your initial thoughts based on this information?",
      "Potential questions:",
      "  No new entrants other than cortexiphan are likely to enter the market in the time frame we are considering",
      "  Market for all three indications is not expected to grow or decline over time",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Qualitatively, candidate should recognize:",
      "  Asp. indication has four products available, two of which are used quite sparingly",
      "  Rare molds indication has only 2 products available, with one clear market leader; physicians likely want more options AND the potential for a lower-cost option than $20/pill (2-4x the other two treatments) is very high provided that our client can make the economics work at that price.",
      "  Candidiasis is a very crowded indication, with no clear market leader; very strong clinical profile (i.e. the efficacy of the drug relative to other available options within that indication) will be required to penetrate",
      "Candidate should also calculate total market size for each indication",
      "  Asp. =  1.5B x $10 = ==$15B==",
      "  Rare Mold = 200M x $20 = ==$4.0B==",
      "  Cand. = 5.0B x $5 = ==$25B==",
      "Candidiasis is biggest, but info on development costs and likely market share in each indication is required before making a decision; candidate should request info on clinical profile (Exhibit 2)",
    ],
  },
  {
    n: "03",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    dataTableFontSize: 15,
    dataTableCols: "1.1fr 1fr 1fr 1fr",
    dataTableHeaders: [hd("Metric"), hd("Aspergillosis"), hd("Rare Molds"), hd("Candidiasis")],
    dataTableRows: [
      { cells: [c("Probability of Phase III Trial Success", A), c("50%", A), c("25%", A), c("60%", A)] },
      { cells: [c("Phase III Trial Cost", B), c("$2 Billion", B), c("$500M", B), c("$1 Billion", B)] },
      { cells: [c("Production Cost Per Dose", A), c("$7.0", A), c("$5.0", A), c("$2.0", A)] },
      { cells: [c("Safety Profile (vs. Market Leader)", B), c("Equal", B), c("Equal", B), c("Poor", B)] },
      { cells: [c("Efficacy Profile (vs. Market Leader)", A), c("Superior", A), c("Equal", A), c("Equal", A)] },
    ],
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "**Interviewer Prompt:** Our development team has provided the following information on cortexiphan’s clinical profile, based on the Phase II trial results",
      "Potential questions:",
      "  Cortexiphan can be assumed to be priced at market average for initial analysis",
      "  Hypothetical market share should be first estimated by candidate based on the information provided in Exhibit 1 & 2 combined",
      "    Asp = Superior clinical profile to current options; likely to become new market leader (50-60%)",
      "    Rare Molds = Equal clinical profile; likely to pretty much split the market with current leader; maybe cortexiphan gets a bit less since competition has advantage of being first to market (40-50%)",
      "    Cand. = Clinical safety profile is worse than leader in a crowded market; at same price as competition we are unlikely to be a significant player (much less than 25% share of market leader)",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Candidate should have sound rationale for market share assumptions; after discussion tell them to use the following for calculations",
      "  Asp = 60%",
      "  Rare Molds = 40%",
      "  Candidiasis = 10%",
      "Candidate should now proactively calculate annual profits with market share",
      "  Profit = (Revenue per Dose – Cost per Dose)*(Market Share * Total Annual Doses)",
      "    Asp = ($10-$7) * (60% * 1.5B) = ==$2.7B==",
      "    Rare Molds = ($20-$5) * (40% * 200M) = ==$1.2B==",
      "    Cand. = ($5 - $2) * (10% * 5.0B) = ==$1.5B==",
      "Clinical trial costs and probability of success should also be included to make final decision (5 year period); calculations on next page",
    ],
    calcSheet: {
      label: "Analysis",
      top: [
        {
          title: "Profit Calculations",
          cols: "1.2fr repeat(5, 1fr)",
          headers: ["", "Annual Rev.", "5 Year Revenue", "Trial Cost", "Trial Succeeds Profit", "Trial Fails Loss"].map((v) => ({ v })),
          rows: [
            ["Aspergillosis", "$2.7", "$13.5", "$2.0", "$11.5", "($2.00)"],
            ["Rare Mold", "$1.2", "$6.0", "$0.5", "$5.5", "($0.50)"],
            ["Candidiasis", "$1.5", "$7.5", "$1.0", "$6.5", "($1.00)"],
          ].map((r) => r.map((v, i) => (i === 5 ? { v, color: "#ff0000" } : { v }))),
        },
        {
          title: "Trial Outcomes",
          cols: "1fr 1fr",
          headers: [{ v: "Success" }, { v: "Fail" }],
          rows: [
            [{ v: "50%" }, { v: "50%" }],
            [{ v: "25%" }, { v: "75%" }],
            [{ v: "60%" }, { v: "40%" }],
          ],
        },
      ],
      bottom: {
        title: "Expected Profit",
        cols: "1.3fr 1fr",
        headers: [],
        rows: [
          [{ v: "Aspergillosis" }, { v: "$4.75" }],
          [{ v: "Rare Mold" }, { v: "$1.00" }],
          [{ v: "Candidiasis" }, { v: "$3.50" }],
        ],
      },
      bottomLines: [
        "Expected Profit = (Prob Success * Profit if Success) – (Prob Fail * Loss if Fail)",
        "  Asp = $11.5*50% - $2.0*50% = $4.75",
        "  Rare Molds = $5.5*25% - $0.5*75% = $1.0",
        "  Candidiasis = $6.5*60% - $1.0*40% = $3.5",
      ],
      footerLines: ["- Candidate should drive to conclusion that Aspergillosis is the most profitable indication if successful, and has the highest expected profit even when accounting for potential failure; therefore, this should be indication chosen"],
    },
  },
  {
    n: "04",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText: "Dr. Bishop agrees with your initial assessment that the aspergillosis indication is a good first indication. Next, he is wondering whether pricing at either a discount or premium to the market will result in increased profitability.  What do you think are the main pros and cons of both strategies?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: ["Brainstorming exercise; possible answers include:"],
        groups: [
          {
            heading: "Premium:",
            items: [
              "Pros – Signals to market that product is better than what is currently available, which matches clinical profile; more revenue per dose; can selectively offer discounts to certain hospitals if required, but don’t sacrifice revenue pro-actively in case where you don’t",
              "Cons – Formulary status / market share are likely lower; bad publicity w/ current media and government pressure on high priced pharmaceuticals",
            ],
          },
          {
            heading: "Discount:",
            items: [
              "Pros – High market share and quicker product uptake; can always take price increases over time",
              "Cons – Decreased  revenue per dose; pricing choice for aspergillosis could hinder pricing potential for rare molds or candidiasis if pursue these indications later b/c low price is expected",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Exhibit #3",
    title: "Exhibit #3",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackCols",
        title: "Cortexiphan Aspergillosis Formulary Status  Distribution by Pricing Strategy",
        yTitle: "% of Hospitals",
        xTitle: "Strategy ($ per Dose)",
        zeroLabels: true,
        legendPlacement: "right",
        legendAlignTop: true,
        sideTable: {
          headers: ["Formulary\nStatus", "Expected\nMarket Share"],
          colWidths: [190, 180],
          headerBg: GREY,
          headerFg: "#ffffff",
          rowBgs: [A, B, A],
          rows: [
            ["Off Formulary", "10%"],
            ["On, Restricted", "50%"],
            ["No Restriction", "70%"],
          ],
        },
        legend: [
          { name: "Off Formulary", color: "#3a4a9f" },
          { name: "On Formulary, Restricted", color: "#ffff00" },
          { name: "No Restrictions", color: "#cccccc" },
        ],
        segBorder: false,
        panels: [
          {
            yMax: 100,
            yStep: 100,
            yTickSuffix: "%",
            columns: [
              {
                label: "Discount ($5)",
                segs: [
                  { value: 80, color: "#cccccc", label: "80%", textColor: DK },
                  { value: 20, color: "#ffff00", label: "20%", textColor: DK },
                  { value: 0, color: "#3a4a9f", label: "0%", textColor: W },
                ],
              },
              {
                label: "Parity ($10)",
                segs: [
                  { value: 60, color: "#cccccc", label: "60%", textColor: DK },
                  { value: 30, color: "#ffff00", label: "30%", textColor: DK },
                  { value: 10, color: "#3a4a9f", label: "10%", textColor: W },
                ],
              },
              {
                label: "Premium ($15)",
                segs: [
                  { value: 50, color: "#cccccc", label: "50%", textColor: DK },
                  { value: 25, color: "#ffff00", label: "25%", textColor: DK },
                  { value: 25, color: "#3a4a9f", label: "25%", textColor: W },
                ],
              },
            ],
          },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #3 Guidance",
    guidancePreLines: [
      "**Interviewer Prompt:** Our market research team has now conducted preliminary interviews with both payers and providers to get more detailed information on how cortexiphan is likely to be used at different price points",
      "Potential questions:",
      "  All hospitals can be assumed to be of similar size for calculation purposes",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Candidate should recognize qualitatively that higher price leads to worse formulary status, and consequently lower market share",
      "Candidate should determine overall market share at each price point by using a sum-product of percentage of hospitals at each formulary status * expected market share",
      "  Discount: 80%*70% + 20%*50% =  66%",
      "  Parity: 60%*70% + 30%*50% + 10%*10% = 58%  (round to 60%)",
      "  Premium: 50%*70% + 25%*50% + 25%*10% = 50%",
      "Annual revenue should be calculated based on price, market share, and total doses",
      "  Discount: 1.5B doses * 2/3 * $5 = ==$5B==",
      "  Parity: 1.5B doses * 60% * $10 = ==$9B==",
      "  Premium: 1.5B doses * 50% * $15 = ==$11.25B==  ->  five-year = ==$56.25B==",
      "Profit tracks with revenue b/c cost is the same, so only need to calculate for premium",
      "  ($15 revenue - $7 cost per pill) * 0.75B doses annually * 5 years = ==$30B==  - $2B trial cost =  ==$28B==",
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "Based on all of the information presented, what would be your recommendation for Dr. Walter Bishop regarding the development of cortexiphan?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidate should recommend pursuing the aspergillosis indication at a premium price of $15 / dose",
      "This recommendation will result in total expected revenue of $56.25B and profits of $28B over the five-year period post-launch",
      "Candidate should note risks of strategy (e.g., there is a 50% chance the trial fails, leading to a $2B loss for the cost of the trial)",
      "Aspergillosis indication is preferred because of cortexiphan’s superior clinical profile, high expected market share, and relatively large market size; although candidiasis is bigger market, we are not expected to be a big player based on the clinical profile",
      "Pricing at a premium hinders formulary status somewhat, but the higher price per dose makes up for this; should also discuss potential cons of premium price",
    ],
  },
];
