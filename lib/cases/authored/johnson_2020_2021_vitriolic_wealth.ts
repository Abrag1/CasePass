import type { CasePage } from "../content";

export const CASE_ID = "b15ca3d7-609b-4e38-b0a6-1fd182d58452";

const PROMPT =
  "Your client, the President of Vitriolic Wealth Advisors, has come to you in a crisis. Vitriolic’s Chief Financial Officer was recently found to have been committing high financial crimes, defrauding Vitriolic out of billions over the past decade and abusing sensitive client data in the process. After these allegations surfaced, Vitriolic lost nearly 60% of its clientele. Facing bankruptcy, your firm has been engaged to guide this client through what will undoubtedly be a tumultuous future for the company.";

export const CASE_META = {
  review: "auto",
  case_type: "Cost Cutting",
  synopsis:
    "A wealth advisory firm has lost nearly 60% of its clients after its CFO was found committing fraud, and faces bankruptcy. An interviewer-led case on cost reduction versus being acquired, with a headcount and profitability calculation.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "cost-cutting", "financial-services", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Note: This case was designed to be given virtually to well-practiced casers.",
  },
  {
    n: "02",
    label: "Responses to Clarifying Questions",
    title: "Responses to Clarifying Questions",
    kind: "qa",
    guidancePreLabel: "Responses to Clarifying Questions",
    guidancePreLines: [
      "How much time does Vitriolic have left? **Our client is unsure, however knows Vitriolic will begin posting losses next quarter**",
      "Does Vitriolic have a specific plan to rebuild? **No, it does not. The severe decrease in revenue means Vitriolic cannot invest in any large-scale internal developments.**",
      "How quickly can Vitriolic regain its customer base? **Vitriolic is unsure of the rate at which it will be able to rebuild its customer base**",
    ],
  },
  {
    n: "03",
    label: "General Structure Suggestions",
    title: "General Structure Suggestions",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        label: "Financial Considerations:",
        lines: [
          "How much revenue does Vitriolic have left?",
          "What are some potential sources of short-term funding?",
          "  Stock vs. Short/Long-Term Debt",
          "How can Vitriolic decrease costs?",
        ],
      },
      {
        label: "Non-Financial Considerations:",
        lines: ["Need to replace CFO", "Impact to brand image"],
      },
    ],
  },
  {
    n: "04",
    label: "Question I: Attempt to Reduce Costs",
    title: "Question I: Attempt to Reduce Costs",
    kind: "qa",
    qText: "**Question I: What was Vitriolic’s pre-scandal profitability?**",
    guidancePreLabel: "Provide when prompted",
    guidancePreLines: [
      "Both acquisition and bankruptcy are extreme and more permanent options. Before resorting to one of these options, the candidate should first attempt to reduce costs.",
      "When prompted, provide the following:",
      "  **Pre-Scandal Revenue:** $8,500,000,000,000",
      "  **Pre-Scandal Costs:**",
      "    Physical Buildings: $800,000,000,000",
      "    Salaries of Wealth Advisors: $360,000,000,000",
      "    General Overhead: $3,200,000,000,000",
      "  Note: For the purposes of this case, General Overhead will include salaries of any non-wealth advisory employees",
    ],
    calcLines: [{ q: "Expected Analysis", a: "$8.5 T - $800 B - 360 B - $3.2 T = ==$4.14 T==" }],
  },
  {
    n: "05",
    label: "Question II: Attempt to Reduce Costs",
    title: "Question II: Attempt to Reduce Costs",
    kind: "qa",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Physical Buildings:** Due to the time and complexity involved in selling physical land, costs cannot be reduced",
      "**General Overhead:** Analysis reveals this may be reduced by 20%",
      "**Salaries of Wealth Advisors:** It is a good idea to reduce the number of Wealth Advisors, as 60% of the clientele has left",
      "  Number of Pre-Scandal Accounts: 12,000,000",
      "  Average Employees Per Account: 3",
      "  Average Accounts Per Employee: 15",
      "Candidate should calculate number of employees to determine how many may be laid off",
    ],
    calcLines: [
      {
        q: "Expected Analysis",
        a: "(12,000,000 Accounts x 3 Employees per Account) / (15 Accounts per Employee) = ==2,400,000 Employees==",
      },
    ],
  },
  {
    n: "06",
    label: "Question III: Attempt to Reduce Costs",
    title: "Question III: Attempt to Reduce Costs",
    kind: "qa",
    qText:
      "**Question III: Ask the candidate what Vitriolic’s new profitability will be.**\nDetailed breakdown of math on next slide.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Allow candidate to reduce staff by any percentage they feel is appropriate. Vitriolic has lost 60% of its clientele, so reducing staff by 60% is justified. However, excellent candidates will recognize the probability for natural attrition is high, and Vitriolic should consider this when determining how many employees to lay off.",
      "No matter what percentage of employees the candidate selects for layoffs, Vitriolic will not be profitable. After calculating Vitriolic’s new profitability, ask the candidate what other options are available to the company.",
    ],
    calcLines: [
      {
        q: "Expected Analysis",
        a: "$360,000,000 Salary Expense / 2,400,000 Employees = ==$150,000 Average Salary==",
      },
    ],
    calcTable: {
      title: "Vitriolic’s Post-Scandal Profitability",
      headers: ["", "Pre-Scandal", "Post-Scandal (50% Reduction)", "Post-Scandal (60% Reduction)"],
      rows: [
        ["Revenue", "8,500 B", "3,400 B", "3,400 B"],
        ["Buildings", "(800 B)", "(800 B)", "(800 B)"],
        ["Salary Expense", "(360 B)", "(180 B)", "(144 B)"],
        ["Overhead", "(3,200 B)", "(2,560 B)", "(2,560 B)"],
        ["Profit", "==4,140 B==", "==(140 B)==", "==(104 B)=="],
      ],
      totalLast: true,
    },
  },
  {
    n: "07",
    label: "Question IV: Become Acquired",
    title: "Question IV: Become Acquired",
    kind: "qa",
    qText:
      "Vitriolic has identified a buyer who is interested in purchasing the company. If purchased, only 10% of Vitriolic’s Wealth Advisors will be laid off. However, Vitriolic’s President will be given a severance package and asked to leave as part of the deal.\n**Question IV: What should our client consider when weighing this option?**",
  },
  {
    n: "08",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    guidanceLabel: "Conclusion",
    guidanceLines: [
      "Summary",
      "  Vitriolic is not profitable based solely on cost reduction **in time period zero**. Strong candidates may argue that a client base may be rebuilt over time, making cost reduction the more preferable option.",
      "Recommendation",
      "  Should emphasize both financial impacts as well as rebuilding brand image",
      "  Strong candidates will pay particular attention to customer perception",
      "Risks",
      "  Misestimation of cost reductions",
      "  For an acquisition, the deal could fall through",
      "Next Steps",
      "  Begin scoping cost reductions",
      "  For acquisition, begin due diligence processes",
    ],
  },
];
