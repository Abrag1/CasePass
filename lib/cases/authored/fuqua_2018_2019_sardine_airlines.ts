import type { CasePage } from "../content";

export const CASE_ID = "4ee38d2e-47c4-49f2-b2f4-e5c117daf347";

const PROMPT =
  "Sardine Airlines is an ultra low-cost carrier with flights throughout the continental United States. They have hub airports in Oakland, California; Tulsa, Oklahoma, and Hartford, Connecticut. Sardine Airlines is facing increased pressure from other low cost carriers such as Cattle Car Air and Soul Airlines. Sardine Airlines has faced declining profit for the past year. Sardine’s CEO, Penny McPincher, has asked your team for advice on how to reverse the profitability trend.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "An ultra low-cost airline has seen its profit decline for a year and its CEO wants to reverse the trend. Work out where the margin is going from the financials, then decide how to cut costs and what to recommend.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "airlines", "cost-cutting", "exhibit-heavy"],
};

// Exhibit #1 (Statement of Operations): grey slide table, "$" at the left of each cell
const GREY_A = "#ececec";
const GREY_B = "#f6f6f6";
const HEAD = "#cdcdcd";
const PADS = ["0 15% 0 20%", "0 18% 0 22%", "0 27% 0 30%", "0 27% 0 30%"];
const DASH_PADS = ["0 4% 0 9%", "0 9% 0 13%", "0 27% 0 33%", "0 16% 0 20%"];
const hd = (v: string) => ({ v, align: "center" as const, bg: HEAD, fg: "#000000", borders: "r", borderColor: "#ffffff" });
function opRow(i: number, label: string, vals: string[] | null, o: { bold?: boolean; indent?: boolean; dash?: boolean } = {}) {
  const bg = i % 2 === 0 ? GREY_A : GREY_B;
  const w = o.bold ? 700 : 400;
  return {
    cells: [
      { v: label, align: "left" as const, w, fg: "#000000", bg, borders: "r", borderColor: "#ffffff", ...(o.indent ? { indent: 40 } : {}) },
      ...(vals ?? ["", "", "", ""]).map((v, k) => ({
        v,
        align: "right" as const,
        w,
        fg: "#000000",
        bg,
        borders: "r",
        borderColor: "#ffffff",
        ...(v ? { split: true, splitPad: o.dash ? DASH_PADS[k] : PADS[k] } : {}),
      })),
    ],
  };
}

// Exhibit #1 – INTERVIEWER GUIDE (percentages)
const GUIDE_ROW_BG = [GREY_A, GREY_B, GREY_A, GREY_B, GREY_A, GREY_B, GREY_A, GREY_B, GREY_A, GREY_B, GREY_A, GREY_B, GREY_A];

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: What in your career has prepared you for consulting? Question 2: What is the best reason that I should hire you?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Additional information to give the candidate if asked:",
          "  Sardine Airlines competes primarily on having the lowest cost fares and offering minimal service",
          "  Due to its business model Sardine Airlines has a culture of cost savings that can be passed to the customer",
          "  Sardine Airlines is trying to grow profit margin to 20% (INTERVIEWER GUIDANCE: net income/total revenue)",
          "  **If the interviewee asks about revenues/costs give them Exhibit 1, Statement of Operations**",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1 – Statement of Operations",
    kind: "qa",
    dataTableTitle: "Unaudited, in millions",
    dataTableTitleLeft: true,
    dataTableCols: "250fr 185fr 203fr 212fr 212fr",
    dataTableFontSize: 12,
    dataTableHeaders: [hd(""), hd("2015"), hd("2014"), hd("2013"), hd("2012")],
    dataTableRows: [
      opRow(0, "Operating Revenue", null),
      opRow(1, "Passenger", ["$ 1,088", "$ 1,092", "$ 908", "$ 793"], { indent: true }),
      opRow(2, "Non-ticket", ["$ 1,055", "$ 968", "$ 862", "$ 769"], { indent: true }),
      opRow(3, "Total Revenue", ["$ 2,143", "$ 2,060", "$ 1,770", "$ 1,562"], { bold: true }),
      opRow(4, "Operating Expense", null),
      opRow(5, "Fuel", ["$ 589", "$ 583", "$ 625", "$ 718"], { indent: true }),
      opRow(6, "Landing Fees", ["$ 383", "$ 370", "$ 332", "$ 296"], { indent: true }),
      opRow(7, "Maintenance", ["$ 214", "$ 164", "$ 106", "$ 67"], { indent: true }),
      opRow(8, "SG&A", ["$ 428", "$ 309", "$ 185", "$ 171"], { indent: true }),
      opRow(9, "Special Charges", ["$ -", "$ -", "$ 225", "$ -"], { indent: true, dash: true }),
      opRow(10, "NI Pre Tax", ["$ 529", "$ 634", "$ 297", "$ 310"], { bold: true }),
      opRow(11, "Taxes", ["$ 158", "$ 189", "$ 88", "$ 92"]),
      opRow(12, "Net Income", ["$ 371", "$ 445", "$ 209", "$ 218"], { bold: true }),
    ],
    calcTable: {
      title: "Exhibit #1 – INTERVIEWER GUIDE",
      plain: true,
      center: true,
      leftCols: [0],
      cols: "250fr 185fr 203fr 212fr 212fr",
      headers: ["", "2015", "2014", "2013", "2012"],
      headerBg: HEAD,
      headerFg: "#000000",
      cellBorder: "#ffffff",
      rowBg: GUIDE_ROW_BG,
      boldRows: [3, 10, 12],
      spans: [
        { row: 0, col: 1, span: 4, underline: true, bold: true },
        { row: 4, col: 1, span: 4, underline: true, bold: true },
      ],
      rows: [
        ["Operating Revenue", "YOY CHANGE IN REVENUES FROM PRIOR YEAR", "", "", ""],
        ["Passenger", "-.37%", "20.26%", "14.47%", ""],
        ["Non-ticket", "9%", "12%", "12%", ""],
        ["Total Revenue", "4%", "16%", "13%", ""],
        ["Operating Expense", "EXPENSES/NI AS A PERCENT OF TOTAL REVENUE", "", "", ""],
        ["Fuel", "27%", "28%", "35%", "46%"],
        ["Landing Fees", "18%", "18%", "19%", "19%"],
        ["Maintenance", "10%", "8%", "6%", "4%"],
        ["SG&A", "20%", "15%", "11%", "11%"],
        ["Special Charges", "0%", "0%", "13%", "0%"],
        ["NI Pre Tax", "25%", "31%", "17%", "20%"],
        ["Taxes", "30%", "30%", "30%", "30%"],
        ["Net Income", "17%", "21%", "12%", "14%"],
      ],
      rowStyles: [{}, { indent: 1 }, { indent: 1 }, {}, {}, { indent: 1 }, { indent: 1 }, { indent: 1 }, { indent: 1 }, { indent: 1 }, {}, {}, {}],
    },
    guidancePreLabel: "Exhibit #1 Guidance:",
    guidancePreLines: [
      "The exhibit is designed to have too much data to synthesize in a reasonable amount of time",
      "Additional information:",
      "  Non ticket revenue are things like bag fees, food, beverages, customer service charges, paper tickets, etc.",
      "  Landing fees are what Sardine Airlines pays to use airports",
    ],
    guidanceLabel: "Analysis:",
    guidanceLines: [
      "The candidate should keep in mind the 20% profit margin that the CEO wants, which given the NI, is ==$57.6M==",
      "The candidate should see that revenue has continued to grow, albeit slower than in the past",
      "The candidate should see that SG&A as a proportion of revenue increased from 15% to 20% and is the primary driver of declining profit – **once identified give them Exhibit 2**",
      "**If** the candidate identifies maintenance costs proportionately increasing **give them Exhibit 3** – if exhibit 3 never comes up, you do not need to push it to the candidate",
    ],
  },
  {
    n: "03",
    label: "Exhibit #2",
    title: "Exhibit #2 – SG&A Breakdown",
    kind: "qa",
    extraCharts: [
      {
        kind: "patternStack",
        viewBox: [200, 160, 620, 665],
        plotLeft: 427,
        plotBottom: 743,
        barWidth: 105,
        pitch: 190,
        unit: 1.29,
        connectors: true,
        baselineExtra: 44,
        caption: { text: "In $M", x: 570, y: 812 },
        columns: [
          {
            label: "2015",
            total: "428",
            segs: [
              { value: 21, pattern: "solid", labelStyle: "white", name: "Miscellaneous", nameDy: -9 },
              { value: 64, pattern: "hatchWide", name: "Customer Service" },
              { value: 86, pattern: "squares", name: "Rent" },
              { value: 171, pattern: "hatchFine", name: "Salaries" },
              { value: 86, pattern: "dots", name: "Marketing" },
            ],
          },
          {
            label: "2014",
            total: "309",
            segs: [
              { value: 19, pattern: "solid", labelStyle: "white", labelDx: -25 },
              { value: 12, pattern: "hatchWide", labelDx: 27 },
              { value: 46, pattern: "squares" },
              { value: 170, pattern: "hatchFine" },
              { value: 62, pattern: "dots" },
            ],
          },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance:",
    guidancePreLines: ["The percent of total SG&A and absolute increases are below"],
    guideCharts: [
      {
        kind: "patternStack",
        viewBox: [0, 268, 635, 440],
        plotLeft: 207,
        plotBottom: 658,
        barWidth: 208,
        pitch: 208,
        unit: 3.61,
        columns: [
          {
            label: "2015",
            total: "428",
            x: 207,
            width: 208,
            segs: [
              { value: 5, pattern: "solid", label: "5%", labelStyle: "white", name: "Miscellaneous", nameDy: -15, nameLeader: true },
              { value: 15, pattern: "hatchWide", label: "15%", name: "Customer Service", nameDy: -11 },
              { value: 20, pattern: "squares", label: "20%", name: "Rent" },
              { value: 40, pattern: "hatchFine", label: "40%", name: "Salaries" },
              { value: 20, pattern: "dots", label: "20%", name: "Marketing" },
            ],
          },
          {
            label: "2014",
            total: "309",
            x: 415,
            width: 152,
            segs: [
              { value: 6, pattern: "solid", label: "6%", labelStyle: "white", labelDx: -38 },
              { value: 4, pattern: "hatchWide", label: "4%", labelDx: 36 },
              { value: 15, pattern: "squares", label: "15%" },
              { value: 55, pattern: "hatchFine", label: "55%" },
              { value: 20, pattern: "dots", label: "20%" },
            ],
          },
        ],
      },
    ],
    calcTable: {
      plain: true,
      center: true,
      leftCols: [0],
      cols: "2fr 1fr",
      headers: ["", "YoY Change"],
      rowBg: ["#f6f6f6", "#ececec", "#f6f6f6", "#ececec", "#f6f6f6"],
      cellBorder: "#ffffff",
      rows: [
        ["Marketing", "$ 24"],
        ["Salaries", "$ 1"],
        ["Rent", "$ 40"],
        ["Customer Service", "$ 52"],
        ["Miscellaneous", "$ 2"],
      ],
    },
    guidanceLabel: "Analysis:",
    guidanceLines: [
      "The candidate should identify that 3 areas are driving growth in SG&A: Marketing, Rent, and Customer Service",
      "The other areas are not large enough increases to focus on to get to the ==$57.6M== profit increase the CEO is looking to achieve",
    ],
  },
  {
    n: "04",
    label: "Exhibit #3",
    title: "Exhibit #3 – Sardine Maintenance",
    kind: "qa",
    memoLines: [
      "TO: Penny McPincher, CEO of Sardine Airlines",
      "FROM: Michael Huerta, Administrator of the Federal Aviation Administration",
      "",
      "DATE: June 30th, 2015",
      "SUBJECT: Sardine Airlines Maintenance Record",
      "",
      "This memorandum is to notify that as of today, Sardine Airlines is no longer under maintenance supervision from the Federal Aviation Administration (FAA). The FAA believes the improved maintenance program no longer warrants FAA intervention.",
      "",
      "Any future decrease in maintenance standards will result in FAA supervision or sanctions.",
    ],
    guidancePreLabel: "Exhibit #1 Guidance:",
    guidancePreLines: [
      "The Federal Aviation Administration (FAA) is the U.S. Government regulatory agency responsible for the safety of U.S. airlines",
    ],
    guidanceLabel: "Analysis:",
    guidanceLines: [
      "The candidate should put together that the increase in maintenance spending is directly tied to the fact that previous maintenance spending was not sufficient to be considered safe",
      "The candidate should move off of maintenance cost cutting",
      "**If** the candidate still is interested in pursuing cost cutting in maintenance give them this prompt, “Our client is adamant that the recently improved maintenance program is running at peak efficiency and any cuts would invite unwanted scrutiny from regulators.”",
    ],
  },
  {
    n: "05",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText:
      "Sardine Airlines has been aggressively advertising to combat competitive pressures. Both the CEO and the Board believe this is a critical expenditure. Recently the landlord for the firm’s headquarters in Oakland raised rent by $35M. Customer service complaints have increased nearly 3,000%, which the company believes is due to the new 12 inch seats that were installed in the entire fleet. This has caused Sardine’s call center provider to increase billing by 520% from 2014’s $12.36M. What can Sardine Airlines do to address these issues?",
    guidancePreLabel: "Interviewer Guidance:",
    guidancePreLines: [
      "Neither the CEO or Board will take any recommendations on cutting the marketing expenses",
      "The firm does not have to be headquartered in Oakland, but does want to be in a location where it has major operations",
      "The firm is not interested in increasing seat sizes. They are actually looking to pilot 8 inch seats in a new class of service called, “steerage”",
      "The call center vendor charges rates that are on average 60% higher because their call center’s are based in the United States and staffed with native English speakers",
      "Rent in Tulsa or Hartford would be 40% less than current 2015 rent (INTERVIEWER GUIDANCE this equates to ==$34.4M==)",
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The CEO, Ms. McPincher is going to be joining us in just a few minutes to hear your recommendations on how to improve profitability.",
    guidanceLabel: "Interviewer Guidance:",
    guidanceLines: [
      "Candidate should have a recommendation that includes the following:",
      "  To increase profit margin to 20%, Sardine Airlines should focus on cutting SG&A costs",
      "  There are two key ways to cut SG&A, customer service and rent",
      "  Recommend that the call center vendor should transition to an overseas based vendor, which would save approximately ==$38M==",
      "  Move the headquarters to either Tulsa or Hartford, which will have less expensive office real estate markets and thus find major cost savings",
      "  Given the relative low increase in revenue from installing 12” inch seats, recommend against 8” seats",
      "Risks should include: one-time expenses in moving the headquarters, unhappy customers from decreased customer service quality",
    ],
  },
];
