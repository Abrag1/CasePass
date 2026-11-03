import type { CasePage } from "../content";

export const CASE_ID = "61f46376-ecd2-4325-86a6-1521d4236a13";

const PROMPT =
  "Our client is a business unit within a large national health insurance company. The client focuses primarily on the higher education student health insurance market, selling medical insurance, prescription drug insurance and dental insurance to students at large universities. The client is the market leader, both in terms of customers (~500K) and revenue (~$500M). The overall market for higher education student health insurance is estimated at 2.5M potential customers and $2.2B in potential revenue.\n\nThis market requires a unique, two-staged sales model. The “first sale” is often made to the on-campus student health center to gain access to the student population. The “second sale” is to the students, who are the ultimate purchasers of the insurance products. In certain segments of the market, a broker may also act as an intermediary to the school.\n\nThe client’s operating margins have declined significantly in the face of aggressive competition and shrinking higher education budgets. Additionally, health care reform presents a potential risk for future growth and profitability – notably, students age 26 and under can remain on their parents’ health insurance (versus having to buy student health insurance), and health insurers will be required to spend 80% of all revenue on medical expenses. The client’s current operating margins are 9%, down from 25% five years ago.\n\nDeloitte Consulting has been engaged to identify profitable avenues of growth for the client as a part of the client’s three-year growth strategy. Additionally, we have been asked to deliver prioritized recommendations on potential growth strategies.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "The market-leading student health insurance business of a large national insurer is seeing its operating margins fall. Work through a series of mini-cases on growth avenues, small-school economics and how to prioritize the opportunities.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth-strategy", "brainstorming", "chart-clearing", "exhibit-heavy"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 400, fg = "#1f2421") => ({ v, align: "left" as const, w, fg });
const C = (v: string, w = 400, fg = "#1f2421") => ({ v, align: "center" as const, w, fg });

const GREY = "#808080";
const LIGHT = "#d9d9d9";
const BLACK = "#000000";

// Data Sheet 2 column heights: Revenue ($M) 373 / 398 / 462 / 487 / 518 and Pretax Operating Income ($M)
// 88 / 70 / 58 / 42 / 44 at 112px for 518 (the printed value labels give the scale; bar pixels in the source match it).
const px = (v: number) => `${Math.round((v / 518) * 112 * 10) / 10}px`;
const dsBar = (valueLabel: string, v: number, color: string) => ({ valueLabel, h: px(v), w: "34px", color });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. When did you make a lasting impact on a team? 2. If I asked your last boss why I shouldn’t hire you, what would they say?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case tests a candidate’s ability to engage in **structured brainstorming** and **interpret large volumes of data**. Strong candidates will be extremely diligent about **structuring** their responses. The interviewer should note that the sample responses included here are not the only successful responses.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Multiple Discussions/Q&A" },
          { n: "3", text: "Multiple Recommandations" },
        ],
      },
      {
        label: "Case Questions",
        paragraphs: [
          "The following questions are provided on subsequent pages in the order that they should be revealed to the candidate. **Do not share all questions with the candidate up front**, as each question is meant to be a mini-case. A traditional framework will not be needed for this case, but the candidate should remain structured in their thinking and in their responses throughout the case.",
        ],
        steps: [
          { n: "1", text: "Brainstorm: What are the potential avenues of growth for the student health insurance company?" },
          {
            n: "2",
            text: "Chart Clearing: What are some of the key trends that you see on the data sheet (Data Sheet 1)? Based on these trends, what are the potential avenues of growth for the student health insurance company?",
          },
          {
            n: "3",
            text: "Brainstorm: Our client felt a large part of the addressable market was not being addressed (the small school market). They specifically wanted a strategy for moving “down market” and going after smaller schools. At a high level, what qualitative and quantitative criteria should the client consider when assessing this market?",
          },
          {
            n: "4",
            text: "Quantitative Analysis: Our primary concern related to the attractiveness of the small school segment was whether healthy operating margins could be achieved. What type of information would you need to calculate operating margin percentage for this segment? What is the operating margin percentage for each of the four product / customer scenarios?",
          },
          {
            n: "5",
            text: "Recommendations: Given the outcome of your previous operating margin analysis, what recommendations would you develop for the client in terms of pursuing the small school market?",
          },
          {
            n: "6",
            text: "Synthesis: Ultimately, multiple opportunities were identified for the client to grow, including increasing share in the core market, pursuing small schools and selling new products to schools and to students – how would you evaluate the opportunities and prioritize them?",
          },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "What are the potential avenues of growth for the student health insurance company?",
    guidancePreLabel: "Interviewer guidance",
    guidancePreLines: [
      "This question was intentionally developed to assess the candidate’s ability to deal with ambiguity and provide a variety of solutions based on their academic and professional experience.",
      "**Look for** the candidate to provide structure in assessing the growth opportunity.",
      "If the interviewee starts listing random opportunities, **ask how they would structure an approach** to devising ideas.",
      "A sample response is provided to the right. This framework is one of several potential avenues a candidate might take towards answering this question. The interviewer should evaluate the candidate’s ability to create a high level structure and to flesh it out with more granular insights.",
    ],
    // The printed 2x2 (Customers/Markets New/Existing by Products/Business Models Existing/New) is drawn as a tree:
    // each quadrant is one branch, in the printed order (New row first, Existing column first).
    shareable: false,
    treeTitle: "Sample Response",
    treeRoot: {
      label: "Sample Response",
      children: [
        {
          label: "Customers/Markets: New",
          children: [
            {
              label: "Products/Business Models: Existing",
              children: [
                {
                  label: "Identify new segments / channels to sell existing products",
                  children: [
                    { label: "Pursue small school segment (universities)" },
                    { label: "Pursue secondary schools (private / charter schools) to capture transition to college" },
                    { label: "Pursue individual students where schools do not offer insurance" },
                  ],
                },
              ],
            },
            {
              label: "Products/Business Models: New",
              children: [
                {
                  label: "Target non-consumers (uninsured), tailoring product scope to address barriers to entry (i.e. emergency plans for cost-conscious consumers)",
                },
              ],
            },
          ],
        },
        {
          label: "Customers/Markets: Existing",
          children: [
            {
              label: "Products/Business Models: Existing",
              children: [
                {
                  label: "Defend and grow the core business",
                  children: [
                    { label: "Optimize price" },
                    { label: "Enhance marketing and sales force effectiveness to increase penetration" },
                    { label: "Apply pricing strategy to steal share in the large school market" },
                    { label: "Develop additional areas of differentiation (functionality, reliability, convenience)" },
                  ],
                },
              ],
            },
            {
              label: "Products/Business Models: New",
              children: [
                {
                  label: "Develop new products for students AND schools customers",
                  children: [
                    {
                      label:
                        "Capture student wallet share for adjacent insurance products (tuition insurance, electronics insurance, auto insurance, renters insurance, etc.)",
                    },
                    { label: "Consider adjacent health services for current students (mental health, wellness)" },
                    { label: "Consider adjacent services for health centers (billing)" },
                    { label: "Develop digital applications to provide remote health services" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "What are some of the key trends that you see on the data sheet?\n\nBased on these trends, what are the potential avenues of growth for the student health insurance company?",
    guidancePreLabel: "Interviewer guidance",
    guidancePreLines: [
      "**Provide the candidate with Data Sheet 1** (next page).",
      "Ask the candidate to **synthesize** their comments and provide additional recommendations (a strong candidate will draw insights from these trends without being prompted).",
    ],
    // Data Sheet 1 is one composite exhibit of four panels; each panel is drawn as its own chart, in panel order 1-4.
    // Panel 1 bar heights (Number of Schools) were measured from a 4x render of page 302 against the printed Y axis
    // (0 to 2,000), +/- 15 schools; the boxed percentages are printed.
    colBarTitle: "Data Sheet 1 · (1) Student Health Market Size",
    colBarSubtitle: "% of all students",
    colBarItems: [
      { label: ">20K", value: 210, color: BLACK, valueLabel: "32%" },
      { label: "10-20K", value: 330, color: BLACK, valueLabel: "26%" },
      { label: "5-10K", value: 520, color: BLACK, valueLabel: "20%" },
      { label: "1-5K", value: 1600, color: BLACK, valueLabel: "20%" },
      { label: "<1K", value: 1870, color: BLACK, valueLabel: "2%" },
    ],
    colBarYMax: 2000,
    colBarYStep: 500,
    colBarYTickLabels: ["0", "500", "1,000", "1,500", "2,000"],
    colBarYLabel: "Number of Schools",
    colBarXTitle: "School Size (Students)",
    colBarHorizontalLabels: true,
    colBarValueLabels: true,
    colBarNoGrid: true,
    extraCharts: [
      {
        kind: "multiPie",
        title: "Data Sheet 1 · (2) Revenue Composition by Customer Size",
        pies: [
          {
            slices: [
              { label: "Large Schools (>$1M annual revenue)", value: 93, color: GREY },
              { label: "Small Schools (<$1M annual revenue)", value: 7, color: BLACK },
            ],
          },
        ],
        legend: [
          { name: "Large Schools (>$1M annual revenue)", color: GREY },
          { name: "Small Schools (<$1M annual revenue)", color: BLACK },
        ],
        footnote: "Note : 90% of the client’s “Large Schools” have >10K students",
      },
      {
        kind: "hBars",
        title: "Data Sheet 1 · (3) Product Revenue Contribution",
        series: [{ name: "Product Revenue Contribution", color: BLACK }],
        groups: [
          { label: "Medical Insurance", values: [99], valueTexts: ["99%"] },
          { label: "Dental Insurance", values: [0.6], valueTexts: ["0.6%"] },
          { label: "Discount Cards", values: [0.2], valueTexts: ["0.2%"] },
          { label: "Student Assistance Program (SAP)", values: [0.2], valueTexts: ["0.2%"] },
        ],
        max: 100,
        valueSuffix: "%",
        categoryTicks: true,
        footnoteLines: [
          { bold: "Discount Cards", text: ": Cards that provide discounts on prescriptions, dental services, gym memberships, etc." },
          { bold: "Student Assistance Program", text: ": Remote counseling services for students" },
        ],
      },
      {
        kind: "hBars",
        title: "Data Sheet 1 · (4) Select Product Penetration",
        series: [
          { name: "School", color: GREY },
          { name: "Student", color: BLACK },
        ],
        groups: [
          { label: "Dental", values: [42.0, 6.6] },
          { label: "Discount Cards", values: [52.3, 19.5] },
          { label: "Student Assistance Program (SAP)", values: [7.5, 100.0] },
        ],
        max: 100,
        valueSuffix: "%",
        valueDecimals: 1,
        categoryTicks: true,
        footnoteLines: [
          { bold: "School", text: " Penetration = # schools offering product / total school customers" },
          { bold: "Student", text: " Penetration = # students with specified product / # students with medical insurance" },
        ],
      },
    ],
    answerText:
      "**Charts**\n**1:** Lower enrollment schools (<10K students) have a significant portion of students (==42%==) fragmented across thousands of schools.\n**2:** The client earns the vast majority of its revenue from schools with more than 10K students.\n**1 & 2:** There is an opportunity for the client to diversify its current revenue base by pursuing the small school market, which is comprised of almost ==90%== of all schools.\n**3:** The client is not well diversified in terms of number of products driving revenue.\n**4:** The client has difficulty selling its ancillary products to both students and schools that purchase the medical product.\n**3 & 4:** There is a significant opportunity to grow revenue by increasing the penetration of non-core products.",
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "Our client felt a large part of the addressable market was not being addressed (the small school market).\n\nThey specifically wanted a strategy for moving “down market” and going after smaller schools. At a high level, what qualitative and quantitative criteria should the client consider when assessing this market?",
    guidancePreLabel: "Interviewer guidance",
    guidancePreLines: [
      "Interviewee should recognize this is a **market attractiveness** question and provide relevant criteria for assessment.",
      "The market attractiveness criteria and corresponding comments provided to the right are **NOT exhaustive**. Look for the candidate to touch on many of these areas, and possibly offer other areas for investigation.",
      "The interviewer should again focus on the candidate’s ability to provide a **structured, detailed response**.",
    ],
    // One criterion can have several bullets per column: each bullet pair is its own row, the criterion name only on the first.
    calcTable: {
      title: "Sample Response",
      headers: ["Criteria", "Qualitative", "Quantitative"],
      rows: [
        [
          "Market size",
          "• Segment the market to understand potential customer behavior",
          "• Quantify revenue potential by considering # of schools, # of students, insurance requirements, and premium projections by segments developed",
        ],
        ["", "• Consider key factors in insurance buying behavior", ""],
        ["Market growth", "• Assess maturity of the market", "• Historic market growth rates"],
        ["", "• Consider market trends and healthcare reform", "• Model projected number of schools currently in the market and likelihood to join"],
        [
          "Competitive intensity",
          "• Conduct customer interviews, focus groups, voice of the customer analysis",
          "• Market share analysis",
        ],
        ["", "• Conduct competitor assessment", "• Win/loss rates for sales"],
        [
          "Strategic fit",
          "• Determine how strategy required to win in new segment (cost versus differentiation) aligns with existing business strategy",
          "• N/A",
        ],
        [
          "Capability needs",
          "• Understand future state capability needs from the new market",
          "• Requisite investments (capital expenditures) to enter the new market",
        ],
        ["", "• Conduct gap analysis", ""],
        [
          "Profitability",
          "• Interview potential clients to develop understanding of revenue and cost assumptions",
          "• Model potential margin scenarios based on various revenue, market size and cost structure assumptions",
        ],
        [
          "Likely penetration / market share",
          "• Assess customer needs in the market",
          "• Model sensitivity analysis based on market growth, competitive intensity, margin and pricing requirements",
        ],
        ["", "• Consider client’s current share in other segments", ""],
      ],
    },
  },
  {
    n: "05",
    label: "Question 4: Part 1",
    title: "Question 4: Part 1",
    kind: "qa",
    qText:
      "Our primary concern related to the attractiveness of the small school segment was whether healthy operating margins could be achieved.\n\nWhat type of information would you need to calculate operating margin percentage for this segment?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: ["**Do not provide candidate with Data Sheet 2** until they provide some ideas in response to the question."],
    answerText:
      "**Sample Answer:**\n- Cost structure of the company (fixed versus variable)\n- Product pricing\n- Penetration (number of customers)\n- Total revenue",
  },
  {
    n: "06",
    label: "Question 4: Part 2",
    title: "Question 4: Part 2",
    kind: "qa",
    qText: "What is the operating margin percentage for each of the four product / customer scenarios?",
    guidancePreLabel: "Interviewer guidance",
    guidancePreLines: ["**Provide candidate with Data Sheet 2.**"],
    infoBoxLabel: "Question 4: Sample Response",
    infoSections: [
      {
        paragraphs: [
          "Using Data Sheet 2, the interviewee should **calculate the expected costs** under each of the four scenarios and then **calculate the operating margin percentage**. They will need to calculate the number of customers in each scenario and apply the fixed and variable costs.",
        ],
      },
    ],
    // Data Sheet 2: the paired Revenue / Pretax Operating Income columns carry printed value labels (no axis);
    // column heights follow those values.
    barChartTitle: "Data Sheet 2 · Client Historical Financials",
    barChartLegend: [
      { name: "Revenue ($M)", color: LIGHT },
      { name: "Pretax Operating Income ($M)", color: BLACK },
    ],
    barChartGroups: [
      { label: "2006", gap: "4px", isLast: "none", bars: [dsBar("$373M", 373, LIGHT), dsBar("$88M", 88, BLACK)] },
      { label: "07", gap: "4px", isLast: "none", bars: [dsBar("$398M", 398, LIGHT), dsBar("$70M", 70, BLACK)] },
      { label: "08", gap: "4px", isLast: "none", bars: [dsBar("$462M", 462, LIGHT), dsBar("$58M", 58, BLACK)] },
      { label: "09", gap: "4px", isLast: "none", bars: [dsBar("$487M", 487, LIGHT), dsBar("$42M", 42, BLACK)] },
      { label: "10", gap: "4px", isLast: "none", bars: [dsBar("$518M", 518, LIGHT), dsBar("$44M", 44, BLACK)] },
    ],
    dataTableTitle: "Product/Customer Combinations",
    dataTableCols: "1.7fr 1fr 1.5fr",
    dataTableHeaders: [hd("Option"), hd("Insurance Plan Sold (Product)", "center"), hd("Average Annual Premium Revenue per School (Customer Type)", "center")],
    dataTableRows: [
      { cells: [L("(A) Plus – Large School"), C("Plus"), C("$1,000,000")] },
      { cells: [L("(B) Standard – Large School"), C("Standard"), C("$1,000,000")] },
      { cells: [L("(C) Plus – Small School"), C("Plus"), C("$500,000")] },
      { cells: [L("(D) Standard – Small School"), C("Standard"), C("$500,000")] },
    ],
    dataTableMore: [
      {
        title: "Client-Specific Insurance Plan Pricing",
        cols: "1.2fr 1.2fr",
        headers: [hd("Insurance Plan"), hd("Price Per Student Per Year", "center")],
        rows: [{ cells: [L("Plus Insurance", 700), C("$2,000")] }, { cells: [L("Standard Insurance", 700), C("$1,000")] }],
      },
      {
        title: "Client-Specific Cost Structure",
        cols: "1.2fr 1.4fr",
        headers: [hd("Cost Structure Component"), hd("Cost Amount", "center")],
        rows: [
          { cells: [L("Selling Expenses"), C("7% of Premium Revenue")] },
          { cells: [L("Setup Costs"), C("$50,000 Per School")] },
          { cells: [L("Administration Costs"), C("$50 Per Student")] },
          { cells: [L("Medical Costs"), C("80% of Premium Revenue")] },
        ],
        footnote:
          "Note: Under recently passed Health Care Reform laws, insurance companies are required to spend 80% of all premium revenue on medical expenses",
      },
    ],
    calcTable: {
      title: "Response (see next pages for complete calculations):",
      headers: ["Option", "Operating Margin %"],
      rows: [
        ["1", "==5.5%=="],
        ["2", "==3.0%=="],
        ["3", "==0.5%=="],
        ["4", "==(2.0%)=="],
      ],
    },
    calcTables: [
      {
        title: "Question 4: Sample Response",
        headers: [
          "Option",
          "Product Sold",
          "Avg. Annual Premium Revenue per School",
          "Customers (Students per school)",
          "Medical Expenses",
          "Selling Expenses",
          "Setup Costs",
          "Admin Costs",
          "Total Costs",
          "Operating Margin %",
        ],
        rows: [
          ["1", "Plus ($2,000)", "$1,000,000", "500", "80% ($800K)", "7% ($70K)", "5% ($50K)", "2.5% ($25K)", "94.5% ($945K)", "==5.5%=="],
          ["2", "Standard ($1,000)", "$1,000,000", "1000", "80% ($800K)", "7% ($70K)", "5% ($50K)", "5% ($50K)", "97% ($970K)", "==3.0%=="],
          ["3", "Plus ($2,000)", "$500,000", "250", "80% ($400K)", "7% ($35K)", "10% ($50K)", "2.5% ($12.5K)", "99.5% ($498K)", "==0.5%=="],
          ["4", "Standard ($1,000)", "$500,000", "500", "80% ($400K)", "7% ($35K)", "10% ($50K)", "5% ($25K)", "102% ($510K)", "==(2.0%)=="],
        ],
      },
    ],
    answerText:
      "**Follow-Up Question:** What observations or trends do you notice about the cost structure?\n\n**Sample responses**\n- Fixed costs are more tenable with larger customers.\n- Higher priced product cuts variable costs in half.\n- Medical expenses / selling expenses are fixed regardless of the school size or product.",
  },
  {
    n: "07",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "Given the outcome of your previous operating margin analysis, what recommendations would you develop for the client in terms of pursuing the small school market?",
    guidancePreLabel: "Interviewer guidance",
    guidancePreLines: [
      "Interviewee likely will not give a simple yes or no answer, but they should **identify scenarios under which it would make sense to pursue the market**.",
      "Use the **prompt questions** to the right as necessary to draw out a stronger candidate response.",
      "Interviewee should recognize that under the provided cost structure, **none of the scenarios lead to an operating margin that was in line with the current, overall operating margin** (provided in the background section); better answers will center on finding ways to make the market viable (by applying levers to improve profitability or inventing a new business model).",
    ],
    calcTable: {
      title: "Sample Response",
      headers: ["", "Whether to pursue", "How to pursue", "Prompt Questions (if required)"],
      rows: [
        [
          "OK Answer",
          "• Client should not pursue the segment because it is not profitable enough",
          "• N/A",
          "• Under what conditions should the client pursue the small school market?",
        ],
        [
          "Good Answer",
          "• Client should pursue the market if they can apply different levers to make it more profitable",
          "• Reduce SG&A or selling costs through standard cost reduction methods (business process redesign, contract renegotiation, etc.)",
          "• Is there anything they could do to make the unprofitable small market segment more attractive?",
        ],
        [
          "",
          "",
          "• The interviewee may suggest price increases or reducing medical costs, but it’s important to note that neither is possible under current health care reform",
          "",
        ],
        [
          "Strong Answer",
          "• Client should pursue the market with a different business model",
          "• Create an online B2C model that sells directly to students and bypasses the two intermediaries (brokers and schools) – similar to other industries that have transitioned into direct, online distribution (e.g. books, airplane tickets, etc.)",
          "• What kind of business model would be appropriate for this market?",
        ],
        ["", "", "• Other ideas", ""],
      ],
    },
  },
  {
    n: "08",
    label: "Question 6",
    title: "Question 6",
    kind: "qa",
    qText:
      "Ultimately, multiple opportunities were identified for the client to grow, including increasing share in the core market, pursuing small schools and selling new products to schools and to students.\n\nHow would you evaluate the opportunities and prioritize them?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Interviewee should establish a **framework for screening or prioritizing multiple opportunities**. A sample framework and criteria are provided to the right to end the case.",
      "Note that a traditional recommendation followed by risks and next steps is **not necessary** in this case. Rather, a framework that structures and synthesizes priority areas from the case discussion is best.",
    ],
    shareable: false,
    treeTitle: "Sample Response",
    treeRoot: {
      label: "Sample Response",
      children: [
        {
          label: "Strategic Impact and Fit",
          children: [
            { label: "Competitive differentiation" },
            { label: "White space / new market opportunity" },
            { label: "Is there disruptive potential?" },
            { label: "Address unmet marketplace needs" },
            { label: "Alignment with current business unit and corporate strategy" },
          ],
        },
        {
          label: "Financial Impact",
          children: [
            { label: "Revenue potential (what is the market size?)" },
            { label: "What is the expected margin?" },
            { label: "Administrative cost reduction" },
            { label: "Future cost avoidance" },
          ],
        },
        {
          label: "Necessary Costs",
          children: [{ label: "Investment (capital) costs" }, { label: "Ongoing operating costs" }],
        },
        {
          label: "Ease of Implementation",
          children: [
            { label: "Alignment with existing capabilities" },
            { label: "Complexity of the change" },
            { label: "Availability of partners or acquisition targets" },
          ],
        },
      ],
    },
  },
];
