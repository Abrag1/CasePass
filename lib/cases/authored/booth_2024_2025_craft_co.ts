import type { CasePage } from "../content";

export const CASE_ID = "ad424cf8-655c-442b-9475-6448f3467604";

const PROMPT =
  "Our client, Craft Co., is a subscription service that will send customers kits for adult crafting and DIY projects (e.g., watercolor painting, woodworking)\n\nCustomers pay a monthly fee based on the number of kits they would like, Craft Co. sends them a box with craft supplies\n\nCraft Co. had grown its customer base rapidly during the COVID-19 pandemic, but has seen a dip in recent quarters as new competitors have entered the field\n\nManagement is looking to assess the business’s current performance and identify whether it can grow profitably and regain market share in the next ~3-5 years\n\nOur client would like our help in answering two questions (i) how has Craft Co. performed recently? and (ii) what strategies can it implement to grow profitability and increase share?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A subscription crafting-kit company that boomed during the pandemic has seen its subscriber base dip as competitors entered. Assess its recent performance and profitability, and brainstorm strategies to grow profitably and regain share.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "consumer-goods", "light-math", "brainstorming"],
};

const L = (v: string, w = 600) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });
const H = (v: string, harvey: number) => ({ v, align: "center" as const, w: 400, fg: "#1f2421", harvey });
const hd = (v: string, i = 1) => ({ v, align: i === 0 ? ("left" as const) : ("center" as const) });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time where you failed? 2. What is a project you worked on that you are proud of the results? Why?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "If candidate asks:",
        lines: [
          "Craft Co’s products are typically marketed towards young adults ages 18-35",
          "Craft Co. was seen as the first major player in this market, but new competitors began to enter by the end of 2020",
          "There is no specific ROI or objective that our client is aiming to achieve related to this analysis, but they are most interested in short-term strategies in the next 1-3 years as opposed to longer-term opportunities",
          "Craft Co. is currently focused solely on the U.S. market",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Profitability analysis" },
          { n: "3", text: "Brainstorm" },
          { n: "4", text: "Final recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Profitability Review",
          children: [
            { label: "Revenue", children: [{ label: "Subscriber base" }, { label: "Subscription price point" }, { label: "Volume of sales" }] },
            {
              label: "Costs",
              children: [{ label: "Fixed Costs (store front, manufacturing facilities, etc)" }, { label: "Variable Costs (materials, shipping, etc.)" }],
            },
          ],
        },
        { label: "Market Considerations", children: [{ label: "Current market Share" }, { label: "Product Suite alignment with consumer trends" }] },
        { label: "Execution Strategies" },
      ],
    },
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis**: Craft Co. is likely facing a decline in sames store sales due to a misalignment with customer trends given that competitor growth indicates it is not an industry wide trend.",
          "Framework should focus on drivers of same store sales including:",
          "**Allow** the candidate to walk you through their framework, noting that we do not have information on product opportunities, guiding them to the profitability exercise",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Brainstorm before Math",
    title: "Brainstorm before Math",
    kind: "qa",
    qText: "How can Craft Co. become more profitable?",
    guidanceLabel: "Brainstorm before Math",
    guidanceLines: [
      "**Revenue growth**",
      "  Increase revenue from existing customers",
      "  Enter new geographic markets",
      "  Expand into new channels (e.g., children's kits, cooking kits)",
      "**Cost control**",
      "  Analyze marketing mix and effectiveness to reduce spending without losing subscribers",
    ],
  },
  {
    n: "04",
    label: "Exhibit 1: Question 1",
    title: "Exhibit #1: Consumer Survey Results",
    kind: "qa",
    qText: "Question 1: Based on exhibit 1, how would you estimate Craft Co.’s monthly profitability in Q4 2020?",
    dataTableTitle: "Revenue for Craft Co. (Q4 2020)",
    dataTableCols: "1.2fr 1fr 1.4fr",
    dataTableHeaders: [hd("", 0), hd("Price"), hd("Percentage of subscribers")],
    dataTableRows: [
      { cells: [L("1 kit per month"), C("$50"), C("60%")] },
      { cells: [L("2 kits per month"), C("$80"), C("40%")] },
    ],
    dataTableMore: [
      {
        title: "Costs for Craft Co. (Q4 2020)",
        cols: "1.2fr 1fr 1.4fr",
        headers: [hd("", 0), hd("Cost"), hd("Percentage of subscribers")],
        rows: [
          { cells: [L("1 kits per month"), C("$50"), C("60%")] },
          { cells: [L("2 kits per month"), C("$60"), C("40%")] },
          { cells: [L("Operating costs per quarter (3 months)"), C(""), C("$2m")] },
          { cells: [L("Marketing costs per quarter (3 months)"), C(""), C("$8m")] },
        ],
      },
    ],
    calcTable: {
      headers: ["", "1 kit", "2 kits", "Total"],
      rows: [
        ["Revenue", "", "", ""],
        ["Customers (k)", "45", "30", "75"],
        ["Price", "$50", "$80", "n/a"],
        ["Months per quarter", "3", "3", ""],
        ["Total revenue ($m)", "$7", "$7", "==$14=="],
        ["Costs", "", "", ""],
        ["Variable costs", "$50", "$60", "n/a"],
        ["Months per quarter", "3", "3", ""],
        ["Total variable costs ($m)", "$7", "$5", "$12"],
        ["Total fixed costs ($m)", "$2 + $8 = $10", "", "$10"],
        ["Profit", "", "", "==($8)=="],
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Answer should include:**",
      "  Accurate calculation of revenue, cost, and profit",
      "  Craft Co. is operationally unprofitable, largely driven by marketing costs",
      "  Individuals purchasing 1 kit per month are breaking even and do not need to be calculated to find profit",
    ],
  },
  {
    n: "05",
    label: "Exhibit 1: Question 2",
    title: "Exhibit #1: Consumer Survey Results",
    kind: "qa",
    qText: "Question 2: Based on exhibit 1, how would you describe Craft Co.’s pattern of subscriber growth?",
    colBarTitle: "Average number of monthly subscribers, in thousands, 2019 – 2020",
    colBarTitleStyle: "centered-underlined",
    colBarItems: [
      { label: "Q1 2019", value: 60, color: "#c5c4d0" },
      { label: "Q2 2019", value: 70, color: "#c5c4d0" },
      { label: "Q3 2019", value: 90, color: "#c5c4d0" },
      { label: "Q4 2019", value: 85, color: "#c5c4d0" },
      { label: "Q1 2020", value: 100, color: "#c5c4d0" },
      { label: "Q2 2020", value: 95, color: "#c5c4d0" },
      { label: "Q3 2020", value: 85, color: "#c5c4d0" },
      { label: "Q4 2020", value: 75, color: "#c5c4d0" },
    ],
    colBarYMax: 110,
    colBarYStep: 110,
    colBarYTickLabels: ["", ""],
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    colBarNoYAxis: true,
    colBarCallouts: [
      { from: 0, to: 4, label: "+67%", level: 108 },
      { from: 4, to: 7, label: "-25%", level: 106 },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Answer should include:**",
      "  Subscriber levels have seen a steady decline in 2020, even though interest in crafts likely increased due to the pandemic",
      "  Earlier growth could be due to strong investment in marketing and lack of initial competitors and/or pandemic-related demand increase across the market",
    ],
  },
  {
    n: "06",
    label: "Exhibit 2: Question 3",
    title: "Exhibit #2: Consumer Survey Results",
    kind: "qa",
    qText: "Question 3: What do you notice about Craft Co.’s performance?",
    dataTableTitle: "Craft Co. performance against service selection factors",
    dataTableFootnote: "Perception of performance on key factors (1-5, 5 = best)\nImportance in decision: High --- Low",
    dataTableCols: "1.6fr 1fr 1fr 1fr",
    dataTableHeaders: [hd("Craft kit selection factors", 0), hd("Importance in decision"), hd("Craft Co."), hd("Average of all others")],
    dataTableRows: [
      { cells: [L("Price"), H("High importance", 0.75), C("4.3"), C("2.4")] },
      { cells: [L("Delivery speed"), H("High importance", 0.75), C("2.5"), C("3.8")] },
      { cells: [L("Craft kit quality"), H("High importance", 0.75), C("3.7"), C("3.2")] },
      { cells: [L("Time required for craft"), H("Medium importance", 0.5), C("2.3"), C("3.1")] },
      { cells: [L("Variety of craft types"), H("Medium importance", 0.5), C("3.4"), C("3.6")] },
      { cells: [L("Variety of experience levels required"), H("Low importance", 0.25), C("3.1"), C("3.0")] },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Answer should include:**",
      "  Craft Co. outperforms competitors on price and quality, but underperforms on delivery and convenience",
      "  Exhibit 2 in context with profitability analysis suggests Craft Co. has likely lost customers to higher-priced competitors positioned as “premium”, therefore there may be opportunity to increase price to restore profitability since Craft Co. is perceived as high-quality",
    ],
  },
  {
    n: "07",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "Question 4: How might Craft Co. stabilize its subscriber decline?",
    nextStepText: "After this brainstorming, the case is finished. A strong candidate will wrap up the brainstorm naturally with a strong “so-what”.",
    guidanceLabel: "Stabilization levers",
    guidanceLines: [
      "Better differentiating its product relative to new entrants",
      "Loyalty incentives",
      "Acquiring one of its competitor",
    ],
  },
];
