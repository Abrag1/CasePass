import type { CasePage } from "../content";

export const CASE_ID = "90ff9cb8-142a-4635-9195-a87e44e96fae";

const PROMPT =
  "Your client, ChemCo, is a large multinational company in the chemicals industry. ChemCo is a leading industry player with a diverse portfolio comprising of commodity and specialty products. However, in recent years, ChemCo has been facing declining margins. You have been brought on to help reverse the downward slide.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A large multinational chemicals company with a mix of commodity and specialty products is facing declining margins. Find the source of the problem and recommend how to reverse the slide.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "chemicals", "exhibit-heavy", "brainstorming"],
};

const INK = "#1f2421";
const CYAN = "#00b0f0";
const hd = (v: string, borders: string, span?: number) => ({ v, align: "center" as const, bg: CYAN, fg: INK, borders, borderColor: "#000000", span });
const c = (v: string, align: "left" | "right", bold = false) => ({ v, align, w: bold ? 700 : 400, fg: INK, borders: "tblr", borderColor: "#000000" });
const row = (label: string, a: string, b: string, d: string, e: string, bold = false) => ({
  cells: [c(label, "left", bold), c(a, "right", bold), c(b, "right", bold), c(d, "right", bold), c(e, "right", bold)],
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Describe a time when you had to \"burn a bridge\". Question 2: Tell me about a situation where you had to lead by influence rather than by authority.",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**If asked**, ChemCo sells its products across the globe.",
      "Describe commodity and specialty products, **if asked**.",
      "  Commodity products are standard products, processed in large batches. These are low cost, low margin products with end-use in multiple industries.",
      "  Specialty products are  highly customized products, processed in small batches. These are made to order based on specific customization instructions of the clients and hence, they are typically high cost, high margin products.",
      "**If asked**, clarify that ChemCo sells its products through \"direct sales\" approach where sales representatives do site visits to all their clients to share information about ChemCo's products, understand the client's requirements, and record orders.",
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "The interviewee should recognize that at its core, this is profitability problem: Revenue-Costs framework and External Factors. They should detail each \"bucket\". For example, Sales: Volume x Price. Costs: Raw materials, Labor, Sales, etc. External Factors: Industry is declining, Poor economic conditions, Regulatory restrictions/ fees increasing etc.",
          "**If asked**, say that sales are growing in line with industry and ChemCo is the market leader in sales, but its margins are lagging the industry.",
          "Provide **Exhibit # 1** if asked about comparative analysis of cost vs. competitors. In case the interviewer does not ask about this, guide them towards this exhibit.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "This Exhibit shows a break-down of the costs of the top 3 players in the industry. The number at the top of each bar is the total cost.",
      "If candidate asks about margin/ sales or seeks clarification on footnote, state that while our sales are higher than competitors, our competitors have better margins (re-direct them to this Exhibit and focus on costs).",
    ],
    extraCharts: [
      {
        kind: "stackCols",
        title: "Break-down of costs* for ChemCo and other industry players ($M)",
        legend: [
          { name: "Raw Materials", color: "#0099cc" },
          { name: "Labor", color: "#a6a6a6" },
          { name: "Sales", color: "#5b9bd5" },
          { name: "G&A", color: "#264478" },
        ],
        legendPlacement: "bottom",
        gridlines: true,
        segBorder: false,
        plainAxes: true,
        boldTotals: true,
        titleLeftBold: true,
        boldLabels: true,
        footnote: "* Costs are proportional to sales",
        panels: [
          {
            yMax: 350,
            yStep: 50,
            columns: [
              {
                label: "ChemCo",
                total: "300",
                segs: [
                  { value: 128, color: "#0099cc", label: "128", textColor: "#3a3f3b" },
                  { value: 45, color: "#a6a6a6", label: "45", textColor: "#3a3f3b" },
                  { value: 90, color: "#5b9bd5", label: "90", textColor: "#3a3f3b" },
                  { value: 37, color: "#264478", label: "37" },
                ],
              },
              {
                label: "Poly Co",
                total: "144",
                segs: [
                  { value: 65, color: "#0099cc", label: "65", textColor: "#3a3f3b" },
                  { value: 25, color: "#a6a6a6", label: "25", textColor: "#3a3f3b" },
                  { value: 32, color: "#5b9bd5", label: "32", textColor: "#3a3f3b" },
                  { value: 22, color: "#264478", label: "22" },
                ],
              },
              {
                label: "Prop Inc",
                total: "220",
                segs: [
                  { value: 98, color: "#0099cc", label: "98", textColor: "#3a3f3b" },
                  { value: 40, color: "#a6a6a6", label: "40", textColor: "#3a3f3b" },
                  { value: 49, color: "#5b9bd5", label: "49", textColor: "#3a3f3b" },
                  { value: 33, color: "#264478", label: "33" },
                ],
              },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "The key takeaway is that Sales cost for ChemCo is much higher than the other industry players",
      "For added quantitative testing, the interviewee should be asked to calculate each component of cost as a % of the total cost.",
      "The % calculation works out as below:",
    ],
    calcAfterGuidance: true,
    calcTable: {
      title: "% of total cost",
      headers: ["", "ChemCo", "Poly Co", "Prop Inc"],
      rows: [
        ["Raw Materials", "43%", "45%", "45%"],
        ["Labor", "15%", "17%", "18%"],
        ["Sales", "30%", "22%", "22%"],
        ["G&A", "12%", "15%", "15%"],
      ],
    },
  },
  {
    n: "03",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText: "Once the candidate identifies \"Sales\" costs as the driver of lower profitability, ask them to brainstorm some of the potential reasons for higher Sales cost.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Some of the potential causes for higher Sales cost:",
      "  Overstaffed sales org (higher # of employees)",
      "  Higher salary/ commission compared to industry (higher cost per employee)",
      "  Poor internal controls for expenditure reimbursement for Sales staff",
      "  Higher marketing/ advertising spend compared to industry",
    ],
  },
  {
    n: "04",
    label: "Prompt #3 · Exhibit #2",
    title: "Prompt #3",
    kind: "qa",
    guidancePreLabel: "Prompt #3",
    guidancePreLines: [
      "**PROMPT:** In case the candidate has not earlier asked about the sales model, clarify that ChemCo sells its products through \"direct sales\" approach where sales representatives do site visits to their clients to share information about ChemCo's products, understand the client's requirements, and record orders.",
      "Further, hand the candidate **Exhibit # 2** and explain that ChemCo has collected some data about customers in their biggest geographical market, US.",
      "**Exhibit #2 Guidance:** This Exhibit shows the breakdown of number of customers and sales figures for each product and customer category. Customer categories are based on industry.",
      "If candidate asks about costs, state that all customers are serviced through direct sales approach and cost of serving all types of customers is somewhat similar.",
    ],
    dataTableTitle: "ChemCo's customer and product profiles in the US market",
    dataTableTitleBold: true,
    dataTableFontSize: 14,
    dataTableCols: "2.2fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [
      hd("", "tl"),
      hd("Product categories", "tblr", 4),
      hd("", "l"),
      hd("Commodity", "tblr", 2),
      hd("Specialty", "tblr", 2),
      hd("Customer segments by industry", "blr"),
      hd("# of customers", "tblr"),
      hd("Sales ($M)", "tblr"),
      hd("# of customers", "tblr"),
      hd("Sales ($M)", "tblr"),
    ],
    dataTableRows: [
      row("Consumer goods manufacturers", "390", "130", "180", "81"),
      row("Industrial goods manufacturers", "750", "1,875", "450", "1,575"),
      row("Automobiles manufacturers", "95", "1,140", "65", "1,625"),
      row("Total", "1,235", "3,145", "695", "3,281", true),
    ],
    calcNote: "Analysis: The candidate should proceed to calculate the revenue per customer for each of the categories:",
    calcTable: {
      title: "Product categories",
      headers: ["Customer segments by industry", "Commodity: Sales per customer ($M)", "Specialty: Sales per customer ($M)"],
      rows: [
        ["Consumer goods manufacturers", "$ 0.33", "$ 0.45"],
        ["Industrial goods manufacturers", "$ 2.50", "$ 3.50"],
        ["Automobiles manufacturers", "$ 12.00", "$ 25.00"],
      ],
    },
    guidanceLabel: "Analysis",
    guidanceLines: [
      "The key insight is that consumer goods manufacturers are generating the least amount of revenue per customer, but account for 30% of the total number of customers. Given the cost of servicing all the customers is similar, there is an opportunity to optimize sales cost here.",
    ],
  },
  {
    n: "05",
    label: "Prompt #4",
    title: "Prompt #4",
    kind: "qa",
    qText: "Once the candidate delivers the key insight from **Exhibit # 2**, ask them to brainstorm some potential ways to reduce the cost of serving consumer goods manufacturers.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Some of the potential ways to optimize the cost of serving the consumer goods manufacturers:",
      "  Sales through distributors",
      "  Changing internal sales model (use indirect sales model)",
      "    E-commerce (sale through website/ app)",
      "    Sales through mailed paper catalogues",
      "    Sales through in-house call center (remote sales)",
    ],
  },
  {
    n: "06",
    label: "Prompt #5 · Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The CEO of ChemCo is about to walk-in. What is your recommendation to him?",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        lines: [
          "Recommendation: I recommend that ChemCo should adopt indirect sales or sale through distributors to service consumer goods manufacturers (for Commodity products).",
          "Result: This will result in optimization of salesforce headcount and associated Sales cost, which is currently much higher than competitors.",
          "Justification: Direct sales approach is expensive and consumer goods manufacturers do not yield enough revenue to justify the cost of direct sales approach.",
          "Risks/ Challenges: Customer concerns for quality of service, Employee backlash due to headcount reduction, Building new capabilities/ relationships with dealers, etc.",
          "Next step: Get more data on costs of direct and indirect sales approach, estimate costs for introducing recommended mode to determine cost savings",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "There is room for optimizing the sales model for servicing the consumer goods manufacturers. **The recommendation is designed to be somewhat flexible as long as the interviewee suggests selling through distributors or changing internal sales model for these customers backed by sound reasoning, that should be considered as a valid recommendation.**",
      "An **exceptional candidate** will note that specialty products require more customer inputs and hence, recommend distributor/ indirect sales approach for commodity products only.",
    ],
  },
];
