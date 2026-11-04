import type { CasePage } from "../content";

export const CASE_ID = "884f1bf2-69dd-472e-be74-f36e510e54f8";

const PROMPT =
  "Your client, MegaBox, is a privatized detention center management company that operates in the United States. The MegaBox board has an idea for a clandestine operation to grow profits: a honey bun business serving MegaBox’s inmate population. They have hired you to figure out whether they should launch the business.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability/Other",
  synopsis:
    "A privatized detention center operator is weighing a honey bun business serving its inmate population. Work out the profitability, the break-even time and the health trade-offs, then advise whether to launch.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "food-and-beverage", "light-math", "exhibit-heavy"],
};

const GREY = "#d9d9d9";
const PURPLE = "#8a2cf0";
const INK = "#000000";
const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align, bg: GREY, fg: INK, borders: "tblr" });
const lab = (v: string) => ({ v, align: "left" as const, w: 700, fg: PURPLE, borders: "tblr" });
const val = (v: string) => ({ v, align: "left" as const, w: 400, fg: INK, borders: "tblr" });
const row = (a: string, ...rest: string[]) => ({ cells: [lab(a), ...rest.map(val)] });

const SHOW = "At end of brainstorm, please show interviewee Exhibit 1.";
const ASSUME = "* Assume 20,000 inmates.\n** Assume 30 days/month.";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Problem Statement (Notes for interviewer)",
    infoSections: [
      {
        label: "Clarifying points:",
        lines: [
          "MegaBox’s current business model is buying inmates from government facilities and making profits on margins (e.g. spending less on food).",
          "They’re making about $200M in profits a year, which is about average.",
          "Two sales channels: through prison commissary, through moles. Assume no difference in price or cost structure.",
          "Assume external parties are making the honey buns at a low price (e.g. retired grandmothers).",
        ],
      },
      {
        label: "Other considerations:",
        lines: [
          "Assume we can finance this project with our current profits",
          "Assume other questions don’t matter to the prompt",
          "If prompted, ask, “Why would you like to know that?”",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Approach / Analysis",
    title: "Approach / Analysis",
    kind: "qa",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Financials",
        lines: [
          "Revenues",
          "  Price (unit)",
          "  Volume (amount that can be produced)",
          "  Mix (different types of honeybuns?)",
          "Costs",
          "  CapEx",
          "  COGS (raw materials, price of final product)",
          "  SG&A (storage, granny salaries, extra pay for moles, transportation)",
          "  Spoilage",
          "Can we afford it?",
        ],
      },
      {
        label: "Consumer",
        lines: [
          "Customers (inmates)",
          "  How many?",
          "  Willingness to pay (price sensitive?)",
          "  How do we capture them?",
          "  How do we retain them?",
        ],
      },
      {
        label: "Market",
        lines: [
          "Market landscape",
          "  What are they eating now?",
          "  Other options (commissary goods)",
          "  Will this cannibalize commissary?",
        ],
      },
      {
        label: "Nice-to-haves:",
        paragraphs: [
          "Product details, management team considerations, external considerations (PESTLE analysis), opportunity cost considerations (e.g. are our financial resources better suited elsewhere?)",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 1: Brainstorm",
    title: "Question 1",
    kind: "qa",
    qText: "**Question 1:** How profitable would this be for us? First, let’s brainstorm what we need to calculate profitability.",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Clarifying points:",
        paragraphs: [
          "The price of the honey buns",
          "The COGS for honey bun sales",
          "The price of raw materials",
          "The price you are buying the honey buns for",
          "The SG&A for honey bun sales",
          "Storage costs",
          "Granny baking salaries",
          "Some extra pay for the moles",
          "Transporting the honey buns",
        ],
      },
      {
        label: "Clarifying points:",
        paragraphs: [
          "The number of prisoners that will consume the honey buns",
          "The frequency of honey bun consumption",
          "The amount of money prisoners will have to spend",
          "Commissary",
          "Non-commissary",
          "Alternative economies (e.g. bartering)",
          "The spoilage rates for honeybuns",
          "Upfront costs (we don’t know this now, but will later)",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    qText: "Could you please calculate the monthly revenue and profits? Thoughts?",
    guidancePreLines: [SHOW],
    dataTableCols: "1.6fr 1fr",
    dataTableFootnote: ASSUME,
    dataTableFootnoteLeft: true,
    dataTableHeaders: [hd(""), hd("2020")],
    dataTableRows: [
      row("Honey Bun Price per Unit", "$5"),
      row("Honey Bun COGS per Unit", "$2"),
      row("Honey Bun Gross Margin per Unit", "$3"),
      row("Honey Bun SG&A per Unit", "$2"),
      row("Honey Bun Profit per Unit", "$1"),
      row("% of inmates that will eat*", "80%"),
      row("Frequency of consumption", "Every 2nd day"),
      row("$ available, commissary, per month", "$200"),
      row("$ available, non-commissary, per month", "$100"),
    ],
    calcNote: "Exhibit 1, Interviewer Only",
    calcTable: {
      headers: ["", "2020"],
      rows: [
        ["Honey Bun Price per Unit", "$5"],
        ["Honey Bun COGS per Unit", "$2"],
        ["Honey Bun Gross Margin per Unit", "$3"],
        ["Honey Bun SG&A per Unit", "$2"],
        ["Honey Bun Profit per Unit", "$1"],
        ["% of inmates that will eat*", "80%"],
        ["Frequency of consumption", "Every 2nd day"],
        ["$ available, commissary, per month", "$200"],
        ["$ available, non-commissary, per month", "$100"],
        ["Total revenue, monthly", "$1,200,000"],
        ["Total profit, monthly", "$240,000"],
      ],
      rowStyles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, { bold: true }, { bold: true }],
    },
    calcTables: [
      {
        title: "Calculations",
        headers: [],
        rows: [
          ["Revenue:", "$5 buns x 16,000 inmates x 15 days/month = ==$1.2M=="],
          ["Profit:", "$1.2M x 20% = ==$240K=="],
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    qText: "Could you please calculate the projected monthly revenue and profits? Thoughts?",
    guidancePreLines: [SHOW],
    dataTableCols: "1.6fr 1fr 1fr",
    dataTableFootnote: ASSUME,
    dataTableFootnoteLeft: true,
    dataTableHeaders: [hd(""), hd("2020"), hd("2021E")],
    dataTableRows: [
      row("Honey Bun Price per Unit", "$5", "20% increase"),
      row("Honey Bun COGS per Unit", "$2", "25% decrease"),
      row("Honey Bun Gross Margin per Unit", "$3", "TBA"),
      row("Honey Bun SG&A per Unit", "$2", "25% increase"),
      row("Honey Bun Profit per Unit", "$1", "TBA"),
      row("% of inmates that will eat*", "80%", "Down 30%"),
      row("Frequency of consumption", "Every 2nd day", "Daily"),
      row("$ available, commissary, per month", "$200", "$250"),
      row("$ available, non-commissary, per month", "$100", "$150"),
    ],
    calcNote: "Exhibit 2, Interviewer Only",
    calcTable: {
      headers: ["", "2021E", "2021E"],
      rows: [
        ["Honey Bun Price per Unit", "20% increase", "$6"],
        ["Honey Bun COGS per Unit", "25% decrease", "$1.50"],
        ["Honey Bun Gross Margin per Unit", "TBA", "$4.50"],
        ["Honey Bun SG&A per Unit", "25% increase", "$2.50"],
        ["Honey Bun Profit per Unit", "TBA", "$2"],
        ["% of inmates that will eat*", "Down 30%", "50%"],
        ["Frequency of consumption", "Daily", "2x"],
        ["$ available, commissary, per month", "$200", "$250"],
        ["$ available, non-commissary, per month", "$100", "$150"],
        ["Total revenue, monthly", "", "$1,800,000"],
        ["Total profit, monthly", "", "$600,000"],
      ],
      rowStyles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, { bold: true }, { bold: true }],
    },
    calcTables: [
      {
        title: "Calculations",
        headers: [],
        rows: [
          ["Revenue:", "$6 buns x 10,000 inmates x 30 days/month = ==$1.8M=="],
          ["Profit:", "$1.8M x 33% = ==$600K=="],
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "**Question 2:** Our finance team has calculated that getting the honey bun business up and running would cost us a one-time $20M upfront to get started. Megabox will not move forward with this investment unless it can break even within 3 years. How long would it take MegaBox to break even? Given this, should they move forward?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Calculation:",
        paragraphs: [
          "The easiest way to do this is to set up a formula:",
          "First year profit + recurring profit(x) = upfront investment",
          "Translated: 240,000 + 600,000(x) = 20,000,000",
          "The solution is ==32.93~ months==. This is an ugly number. It’s less than 36 months (three years), so MegaBox will move forward.",
          "Note: Some candidates might say it’ll take over 30 years. Remind them about units if needed.",
        ],
      },
      {
        label: "Bonus brainstorm:",
        paragraphs: [
          "What levers could Megabox pull to reduce the break-even time?",
          "Anything unit level is fair game—recapturing lost market share from inmates, selling to administrative staff, lowering COGS/SG&A, etc.",
          "Push on how they would do this.",
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "**Question 3:** Our medical team is concerned that health issues may emerge as a result of launching this honey bun business. How should MegaBox weigh the health issues with the financial benefits of launching?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Thoughts:",
        paragraphs: [
          "Physical health issues are the big ones: heart disease, diabetes.",
          "Mental health issues are part of this, too: eating disorders, addiction.",
          "The individual costs of care and probabilities for developing a health issue could be analyzed. Worth considering that developing health issues is more likely in a prison environment",
          "The aggregate costs of medical should be considered: are we losing more on medical care than we are making in profits?",
        ],
      },
      {
        label: "Bonus brainstorm:",
        paragraphs: [
          "How many inmates do you think we’d lose?",
          "How much of our main business do you think we’d lose?",
          "What additional ethical issues should we consider?",
          "Ethical issues with letting inmates die if it’s still profitable",
        ],
      },
    ],
    dataTableTitle: "Option 1: Treat new health conditions",
    dataTableTitleBold: true,
    dataTableCols: "1.4fr 1fr",
    dataTableHeaders: [hd("Treatment areas"), hd("Monthly costs, unit")],
    dataTableRows: [row("Diabetes", "$60"), row("Heart disease", "$20"), row("Addiction", "$10"), row("Eating disorders", "$10")],
    dataTableMore: [
      {
        cols: "1.4fr 1fr",
        footnote: "* Projected. Assume 2021 numbers.",
        headers: [hd("Treatment areas"), hd("% inmates affected*")],
        rows: [row("Diabetes", "50%"), row("Heart disease", "25%"), row("Addiction", "60%"), row("Eating disorders", "90%")],
      },
      {
        title: "Option 2: Go sugar free",
        cols: "1.6fr 1fr",
        headers: [hd(""), hd("2021E")],
        rows: [
          row("Honey Bun Price per Unit", "$6"),
          row("Honey Bun COGS per Unit", "$1.50"),
          row("Honey Bun Gross Margin per Unit", "$4.50"),
          row("Honey Bun SG&A per Unit", "$2.50"),
          row("Honey Bun Profit per Unit", "$2"),
          row("% of inmates that will eat*", "20%"),
          row("Frequency of consumption", "Every 2nd day"),
        ],
      },
      {
        cols: "1.6fr 1fr",
        headers: [hd(""), hd("2021E")],
        rows: [row("Treatment prices", "90% lower")],
      },
    ],
    calcNote: "Exhibit 3, Interviewer Only. * Projected. Assume 2021 numbers.",
    calcTable: {
      title: "Option 1: Treat new health conditions",
      headers: ["Treatment areas", "Total monthly costs"],
      rows: [
        ["Diabetes", "$300,000"],
        ["Heart disease", "$50,000"],
        ["Addiction", "$60,000"],
        ["Eating disorders", "$90,000"],
        ["Total", "$500,000"],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        headers: ["", "2021E"],
        rows: [
          ["Previous total monthly profit", "$600,000"],
          ["Monthly treatment costs", "$500,000"],
          ["New total monthly profit", "==$100,000=="],
        ],
        totalLast: true,
      },
      {
        title: "Option 2: Go sugar free",
        headers: ["", "2021E"],
        rows: [
          ["Honey Bun Profit per Unit", "$2"],
          ["# of inmates that will eat*", "4,000"],
          ["Frequency of consumption", "15"],
          ["Adj. sugar-free total monthly profit", "$120,000"],
        ],
        totalLast: true,
      },
      {
        headers: ["", "2021E"],
        rows: [
          ["Adj. sugar-free total monthly profit", "$120,000"],
          ["Treatment prices", "$50,000"],
          ["New total monthly profit", "==$70,000=="],
        ],
        totalLast: true,
      },
    ],
  },
  {
    n: "08",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText:
      "**Question 4:** The MegaBox EVP is in the waiting room of the Zoom meeting and wants to know whether to launch this honeybun business. What will you tell her?",
    guidanceLabel: "Recommendation",
    guidanceLines: [
      "**Thoughts:**",
      "  This could go either way. Some considerations below.",
      "  No, profits aren’t going to be high enough to break even in three years.",
      "  Yes, but only if we are willing to wait around 15 years to break even, or if we can pull additional cost saving levers on treatments.",
      "  Risks: alternative health risks unrelated to sugar would be the main one.",
      "  Mitigation: R&D to make product healthier, better tasting, more appealing",
      "  Next steps: Depends on yes/no answer. Should be implementable ASAP",
      "**Wrapping up:**",
      "  Ask the candidate how they are feeling.",
      "  Congratulate them on finishing the case",
      "  Offer high-level feedback on ability to drive/talk through problems and ability to structure/execute math",
    ],
  },
];
