import type { CasePage } from "../content";

export const CASE_ID = "c65cae94-bd4f-45f7-905a-4a806c25e04f";

const PROMPT =
  "The new CEO of HealthCorp, a not-for-profit health insurer, has recently engaged you to help her solve a budding problem. Over the last 3 years, HealthCorp has experienced revenue erosion while peers are experiencing both top and bottom line growth. HealthCorp would like you to help diagnose the cause of this poor performance, and eventually, help formulate a course of action to improve revenue by $1B in the next two years.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "A not-for-profit health insurer has seen its revenue erode while peers grow. Diagnose the cause, then choose a portfolio of initiatives to win back $1B of revenue within two years.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "health-care", "exhibit-heavy", "medium-math"],
};

const BAR = "#cccccc";
const BLUE = "#0f3fa0";
const SCALE = 11200;
const lab = (text: string, x: number, v: number) => ({ text, x, y: v + 330, size: 30 });

const hd = (v: string, align: "left" | "center" = "center") => ({ v, align, bg: "#cccccc", fg: "#ffffff" });
const cell = (v: string, align: "left" | "center" = "center") => ({ v, align, w: 400, fg: "#000000" });
const row = (a: string, b: string, c: string, d: string) => ({
  cells: [cell(a, "left"), cell(b), cell(c), cell(d)],
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Who has been your best mentor? What made him or her so good? Question 2: Tell me about the best team you have ever been on. What made it so great?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "This is a growth case centered around customer experience",
          "General industry info: health insurers negotiate prices with physicians and hospital networks based system by system negotiations. Prices are typically related to Medicare reimbursements",
          "HealthCorp does not have a material number of Medicare or Medicaid patients",
          "The provider market with which HealthCorp works has undergone rapid consolidation within the last 5 years",
          "HealthCorp has seen a large, for-profit disrupter enter the market in the last 2 years",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    exhibitColumns: [3, 5],
    extraCharts: [
      {
        kind: "combo",
        title: "HealthCorp Revenue, $M",
        titleBold: true,
        titleColor: BLUE,
        titleSize: 36,
        fontScale: 1.8,
        yMax: SCALE,
        yTickLabels: ["", ""],
        yStep: SCALE,
        axisStyle: "none",
        baselineOnly: true,
        baselineColor: "#000000",
        legend: "none",
        plotAspect: 0.8,
        categories: ["2015", "2016", "2017"],
        bars: { name: "Revenue", color: BAR, values: [9800, 9300, 8900], widthRatio: 0.56 },
        texts: [lab("9,800", 0, 9800), lab("9,300", 1, 9300), lab("8,900", 2, 8900)],
        arrows: [{ from: { x: 0, y: 11100 }, to: { x: 2, y: 10150 }, label: "-5%" }],
      },
      {
        kind: "combo",
        title: "HealthCorp Net Promoter Score (NPS)",
        titleBold: true,
        titleColor: BLUE,
        titleSize: 36,
        fontScale: 1.8,
        yMax: SCALE,
        yTickLabels: ["", ""],
        yStep: SCALE,
        axisStyle: "none",
        baselineOnly: true,
        baselineColor: "#000000",
        legend: "none",
        plotAspect: 0.8,
        categories: ["2015", "2016", "2017"],
        bars: { name: "NPS", color: BAR, values: [9800, 4850, 860], widthRatio: 0.56 },
        barBreaks: true,
        topConnectors: { color: "#444444", width: 1.2 },
        texts: [lab("16.0", 0, 9800), lab("13.5", 1, 4850), lab("11.5", 2, 860)],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "**Exhibit**",
      "  **Present** this exhibit after the candidate has finished his/her prompt",
      "  If the candidate is unfamiliar with Net Promotor Score (NPS), **explain** that NPS is a measure that attempts to capture overall customer satisfaction and that a higher NPS indicates a more satisfied customer",
      "  **If the candidate asks,** health insurance industry average NPS is 15",
      "**Brainstorm**",
      "  Once the candidate has identified that falling NPS is seemingly related to thedrop in revenue, **ask** him/her as to what sort of initiatives HealthCorp could undertake to increase NPS",
    ],
    answerText:
      "- The candidate should quickly realize that there is a correlation between the decrease in revenue and the decrease in HealthCorp NPS\n- The candidate should calculate a Revenue per point of NPS ratio and realize that every point of NPS is worth ==$200M== of revenue.\n  2016: ($9,800 – $9,300) / (16.0 – 13.5) = ==$200M==\n  2017: ($9,300 - $8,900) / (13.5 – 11.5) = ==$200M==\n- The candidate should then be able to conclude that in order to achieve the $1B target, HealthCorp must improve their NPS by at least ==5 Points==",
  },
  {
    n: "03",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    dataTableTitle: "Exhibit #2",
    dataTableFootnote: "*NPS increase is realized only after project implementation",
    dataTableCols: "2.2fr 1fr 1.2fr 1fr",
    dataTableHeaders: [hd("Project", "left"), hd("Cost"), hd("Time to Implement"), hd("Increase in NPS*")],
    dataTableRows: [
      row("Customer journey mapping", "$4M", "13 months", "2"),
      row("Outsource customer service", "$7M", "22 months", "3"),
      row("Partner with premier providers", "$3M", "16 months", "2"),
      row("Redesign claims process", "$2M", "30 months", "4"),
      row("Invest in community initiatives", "$5M", "12 months", "1"),
      row("Develop mobile app", "$1.5M", "9 months", "2"),
      row("Implement rewards program", "$12M", "6 months", "4"),
    ],
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "**Present** this exhibit after the candidate has finished Exhibit #1 and the associated brainstorm",
      "  **Narrative:** “The CEO and CSO concur with your assessment that NPS seems to be a driving factor behind the drop in revenue. While they engage their internal corporate development team to look for M&A opportunities, they want you to evaluate a portfolio of internal initiatives and help them decide what to do to.”",
      "  **If the candidate asks:** “They are cash strapped and only have $10M to spend on initiatives.”",
    ],
    calcTable: {
      title: "Exhibit #2 – Interviewer Guidance",
      headers: ["Project", "Cost", "Time to Implement", "Increase in NPS", "NPS / Cost efficiency", "Priority"],
      rows: [
        ["Customer journey mapping", "$4M", "13 months", "2", "0.5", "3"],
        ["Outsource customer service", "$7M", "22 months", "3", "0.43", "4"],
        ["Partner with premier providers", "$3M", "16 months", "2", "0.66", "2"],
        ["Redesign claims process", "$2M", "30 months", "4", "2.0", "Doesn’t meet 24 month deadline"],
        ["Invest in community initiatives", "$5M", "12 months", "1", "0.2", "6"],
        ["Develop mobile app", "$1.5M", "9 months", "2", "1.33", "1"],
        ["Implement rewards program", "$12M", "6 months", "4", "0.33", "5"],
      ],
    },
    answerText:
      "- The candidate should recall that they need to hit $1B in revenue growth over the next 2 years. In order to do this, the candidate must identify a portfolio of projects that delivers at least ==5 pts of NPS==.\n- The candidate should calculate the efficiency of each initiative by dividing increase in NPS by the cost to come up with an efficiency index. Calculations have been provided for the interviewer on the following sheet.\n  Ultimately, the candidate should recommend spending a combined total of ==$8.5M== on a mobile app, partnering with premier providers, and completing a customer journey roadmap",
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The CEO and her CSO just requested a quick telecon, please present your recommendations.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The interviewee should **immediately** begin synthesizing their findings:",
      "  Which projects to undertake and the total revenue gain expected from the initiatives",
      "  Risks to the plan and other considerations",
      "  Mitigating actions and next steps",
    ],
  },
];
