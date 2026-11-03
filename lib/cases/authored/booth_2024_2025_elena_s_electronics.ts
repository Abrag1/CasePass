import type { CasePage } from "../content";

export const CASE_ID = "3e980cf2-4a94-44f6-999c-650e08cb54f3";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "An electronics chain piloted separate sales and product specialists in its cell phone division. Assess whether the pilot worked by comparing per-store revenue, product mix and profit, and decide whether to expand it.",
  full_prompt:
    "Our client is Elena's Electronics, an electronic goods chain store. Historically, the client relied on rapid opening of new stores to increase growth. However, the client's presence is now so broad that it must also look for internal growth. In 2017, Elena's Electronics tested a pilot that changed the responsibilities of staff in its cell phone division.\n\nIn the old model, all employees were expected to handle all tasks related to sales and products. Under the new program, there are two different types of employees: sales specialists and product specialists. Sales specialists handle all customer interactions, such as talking to customers about their needs and recommending products. Product specialists handle all product management functions, including inventory, ordering, and shelf management.\n\nThe purpose of the pilot was to see whether sales specialists could target customer needs better and thus increase profits from phone sales. Our client wants us to assess whether or not the program was successful and whether it should expand the pilot program to all the divisions of the stores.",
  tags: ["candidate-led", "profitability", "consumer-electronics", "heavy-math", "exhibit-heavy"],
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
    body: "Our client is Elena's Electronics, an electronic goods chain store. Historically, the client relied on rapid opening of new stores to increase growth. However, the client's presence is now so broad that it must also look for internal growth. In 2017, Elena's Electronics tested a pilot that changed the responsibilities of staff in its cell phone division.\n\nIn the old model, all employees were expected to handle all tasks related to sales and products. Under the new program, there are two different types of employees: sales specialists and product specialists. Sales specialists handle all customer interactions, such as talking to customers about their needs and recommending products. Product specialists handle all product management functions, including inventory, ordering, and shelf management.\n\nThe purpose of the pilot was to see whether sales specialists could target customer needs better and thus increase profits from phone sales. Our client wants us to assess whether or not the program was successful and whether it should expand the pilot program to all the divisions of the stores.",
    note: "**Fit Questions** — 1. Tell me something interesting about you that is not on your resume. 2. What would you bring to the Firm?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "A strong candidate may **ask** about criteria for success. **Instruct** the candidate that “profitability is very important, but they want us to take a broad look at whether the pilot was successful”.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Analysis of store revenues" },
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
    guidancePreIntro:
      "The focus of this case is on profitability, so the candidate should **start** there after explaining their framework. If the candidate asks about qualitative factors, share the following information:",
    guidancePreLines: [
      "**Other Divisions**",
      "  The other primary divisions at Elena’s Electronics are televisions, laptops, smart appliances, and new tech (drones, 3D headsets, etc.). Their sales were unaffected by the pilot for the cell phone division.",
      "**Competitors**",
      "  The primary competitors to Elena’s are big box electronics stores, such as Best Buy. These stores have a wide variety of staffing models – there is no clear industry standard.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** Elena’s Electronics should expand the pilot program to increase profitability across all of its divisions.",
        ],
      },
      {
        label: "Was the pilot program successful?",
        groups: [
          { heading: "Profitability", items: ["Revenue", "Cost"] },
          { heading: "Other metrics", items: ["Brand", "Competitive positioning", "Customer experience"] },
        ],
      },
      {
        label: "Would the pilot program be repeatable?",
        lines: [
          "Similarity of cell phone division to other divisions",
          "Customer base consistency across departments",
          "Workforce readiness for the transition",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Strong candidates should focus on **profitability**, but they should not forget to look into other success metrics such as:",
      "  Morale/motivation of the sales team",
      "  Customer experience",
      "  Competitor response",
      "  Brand development",
    ],
  },
  {
    n: "03",
    label: "Economics",
    title: "Economics",
    kind: "qa",
    qText:
      "When the candidate mentions that they would like to explore revenue, say, “I have some financial statements with me. Which number you would like to start with?”",
    guidancePreLabel: "Exhibit 1: Solution",
    guidancePreLines: [
      "**Show Exhibit 1**, but make sure to **cover up** Exhibit 2 first.",
      "The candidate should calculate **revenue per store** and **phones sold per store**. If the candidate is stuck, **prompt** with “How much did the average revenue per store change as a result of the pilot program? How about the number of phones sold per store?”",
    ],
    dataTableTitle: "Exhibit 1",
    dataTableCols: "1.6fr 1fr 1fr",
    dataTableHeaders: heads(["", "2016", "2017"]),
    dataTableRows: rowsOf([
      ["Number of stores", "120", "160"],
      ["Total phone revenue", "$36 M", "$44 M"],
      ["Total phones sold", "54,000", "104,000"],
    ]),
    calcTable: {
      title: "Exhibit 1: Solution",
      headers: ["", "2016", "2017"],
      rows: [
        ["Number of stores", "120", "160"],
        ["Total phone revenue", "$36 M", "$44 M"],
        ["Total phones sold", "54,000", "104,000"],
        ["Revenue/store", "==$300 K==", "==$275 K=="],
        ["Phones sold/store", "==450==", "==650=="],
      ],
    },
    answerText:
      "- The candidate should identify that while phones sold per store are up, store revenues are down. A strong candidate will conclude that this is likely due to the **product mix** sold as a result of the program.",
    nextStepText:
      "When the candidate asks if there is additional information that could help explain changes in product mix, **reveal Exhibit 2**.",
  },
  {
    n: "04",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    guidancePreLabel: "Exhibit 2: Solution",
    guidancePreLines: [
      "Candidates should solve for the quantities sold in different product lines. Candidates should also solve for per-store profit.",
    ],
    dataTableTitle: "Exhibit 2",
    dataTableCols: "1.2fr 1fr 1fr 1.2fr 1.2fr",
    dataTableHeaders: heads(["Product", "Selling Price", "Elena’s COGS", "Quantity Sold (2016)", "Quantity Sold (2017)"]),
    dataTableRows: rowsOf([
      ["Deluxe", "$1,000", "$700", "24,000", "16,000"],
      ["Midrange", "$500", "$400", "18,000", "24,000"],
      ["Budget", "$250", "$200", "12,000", "64,000"],
    ]),
    calcTable: {
      title: "Option 1",
      headers: ["Product", "Quantity per store (2016)", "Quantity per store (2017)"],
      rows: [
        ["Deluxe", "24,000/120 = 200", "16,000/160 = 100"],
        ["Midrange", "18,000/120 = 150", "24,000/160 = 150"],
        ["Budget", "12,000/120 = 100", "64,000/160 = 400"],
      ],
    },
    calcTables: [
      {
        title: "Option 2",
        headers: ["Product", "Profit Margin", "Total profit (2016)", "Total Profit (2017)"],
        rows: [
          ["Deluxe", "$300", "$300*24,000 = $7.2 M", "$300*16,000 = $4.8 M"],
          ["Midrange", "$100", "$100*18,000 = $1.8 M", "$100*24,000 = $2.4 M"],
          ["Budget", "$50", "$50*12,000 = $0.6 M", "$50*64,000 = $3.2 M"],
          ["Total", "", "$9.6 M", "$10.4 M"],
          ["Total per store", "", "$9.6 M/120 = ==$80 K==", "$10.4 M/160 = ==$65 K=="],
        ],
      },
      {
        headers: ["Product", "Profit Margin", "Per store profit (2016)", "Per store profit (2017)"],
        rows: [
          ["Deluxe", "$300", "200*$300 = $60 K", "100*$300 = $30 K"],
          ["Midrange", "$100", "150*$100 = $15 K", "150*$100 = $15 K"],
          ["Budget", "$50", "100*$50 = $5 K", "400*$50 = $20 K"],
          ["Total per store", "", "==$80 K==", "==$65 K=="],
        ],
      },
    ],
    insightLabel: "Exhibit 2: Analysis",
    answerText:
      "- There has been a shift to selling more budget phones and fewer deluxe phones. As a result, profit per store has decreased, despite an increase in the overall quantity of phones sold. The candidate should suggest that this is likely due to the new program.\n- After the candidate identifies that total profit per store has decreased as a result of the program, **ask** them to **brainstorm** reasons for why this might be happening. If the candidate asks about the sales compensation program under the new specialist model respond that “compensation is based on the quantity of phones sold.”\n- A strong candidate will synthesize that sales of the budget phones are increasing because sales specialists are recommending the budget phones to the consumers. This may be occurring because the budget phone is easy to sell due to its simple function and low price.",
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidancePreLabel: "Recommendation",
    guidancePreLines: [
      "The pilot program caused a decrease in phone revenue and profit per store, so the pilot should not be expanded to additional divisions",
      "  The per-store profitability for phones decreased from ==$80 K== to ==$65 K==",
      "  Elena’s experienced a ==4x== increase in the number of budget phones sold, but a ==50%== decrease in the number of deluxe phones sold.",
      "  Sales specialists are compensated in a way that motivates them to sell lower margin products",
    ],
    infoBoxLabel: "Risks and Next Steps",
    infoSections: [
      {
        label: "Risks",
        lines: [
          "The program may have brought about some benefits, and changing it could reverse those benefits:",
          "  Morale/effectiveness of sales specialists from new compensation structure",
          "  Customer experience",
          "  Cross-selling in other divisions",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Redesign the program:",
          "  Better train sales specialists, bring incentives to focus on more profitable phones, and involve sales specialists in the review of their compensation package",
          "  Study customer journey",
          "  Examine revenue and profit differences that could be traced back to this program",
        ],
      },
    ],
  },
];
