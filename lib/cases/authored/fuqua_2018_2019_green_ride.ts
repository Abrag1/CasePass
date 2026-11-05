import type { CasePage } from "../content";

export const CASE_ID = "6a881e88-3d74-4ce9-b483-579b0d91487f";

const PROMPT =
  "Your client, Clean Ventures (CV), is an impact investment fund that focuses on technologies with the potential to improve the environment or reduce humanity’s carbon footprint. CV has been approached by PickUp, a ride hailing app, regarding a potential investment. Management would like your help determining whether PickUp is a worthwhile investment for CV.";

export const CASE_META = {
  review: "auto",
  case_type: "Investment",
  synopsis:
    "An impact investment fund is weighing an investment in a ride hailing app. Value the opportunity financially, then test it against the fund's social impact goals.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "investment", "impact-investing", "exhibit-heavy", "hard-math"],
};

const CAR = "#000099";
const BIKE = "#ffffff";
const PT = "#6f8db9";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a time where a conflict didn’t go your way. Question 2: What do you feel is your greatest accomplishment?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "The candidate should recognize that as an impact investor, their client will have social impact goals in addition to financial goals.",
          "If asked, let the candidate know that the impact goals are just as important as the financial goals, and that impact goals are typically measured in tons of CO2 avoided.",
          "The candidate’s framework should address both financial and social considerations.",
          "Just North America for now",
          "Allow the candidate to drive towards either the financial or social considerations and direct them to either the next prompt or exhibit based upon that. They should be expected to work through both problems.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText: "How would you go about valuing this opportunity?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**Allow** the candidate to brainstorm ideas",
      "The candidate should identify things like payback period, DCF, NPV and other financial methods of valuation",
      "Once they are done brainstorming **provide the following info:**",
      "  Your client expects for there to be a liquidity event in 2022",
      "  In 2022, the overall market for ridesharing will be $15b",
      "  Your client believes Pickup will command a 20% market share",
      "  The profit margin for rideshare firms is 30%",
      "  Valuation multiples are expected to be 8x",
      "  The firm is being offered a 5% stake for $200M",
    ],
    answerText:
      "- **Analysis:** $15B x 20% = $3B x 30% = $900M x 8 = $7.2B x 5% = ==$360M value at exit==\n- This looks likely to be a worthwhile investment\n- Bonus points for identifying a need to discount the exit value in order to determine NPV. We will not require the candidate to do this, identifying it is enough",
  },
  {
    n: "03",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    extraCharts: [
      {
        kind: "marimekko",
        title: "Commuters by Type (selected cities in millions of passengers per day)",
        titleCentered: true,
        columns: [],
        series: [],
        rowLabels: ["Car", "Rideshare", "Bike", "Public Transport"],
        topSub: true,
        noLegend: true,
        noGrid: true,
        plainSlices: true,
        labelBoxes: true,
        leftPad: 140,
        panels: [
      {
        panelTitle: "2017",
        columns: [
          { label: "New York", width: 20, sub: "20", slices: [{ value: 25 }, { value: 10 }, { value: 5 }, { value: 60 }] },
          { label: "SF", width: 10, sub: "10", slices: [{ value: 55 }, { value: 20 }, { value: 5 }, { value: 20 }] },
          { label: "LA", width: 15, sub: "15", slices: [{ value: 70 }, { value: 10 }, { value: 5 }, { value: 15 }] },
        ],
        series: [
          { name: "Car", color: CAR },
          { name: "Rideshare", color: "#e4e4e4" },
          { name: "Bike", color: BIKE },
          { name: "Public Transport", color: PT },
        ],
      },
      {
        panelTitle: "2022",
        columns: [
          { label: "New York", width: 20, sub: "20", slices: [{ value: 25 }, { value: 20 }, { value: 3 }, { value: 52 }] },
          { label: "SF", width: 10, sub: "10", slices: [{ value: 55 }, { value: 30 }, { value: 1 }, { value: 14 }] },
          { label: "LA", width: 15, sub: "15", slices: [{ value: 70 }, { value: 20 }, { value: 1 }, { value: 9 }] },
        ],
        series: [
          { name: "Car", color: CAR },
          { name: "Rideshare", color: "#cccccc" },
          { name: "Bike", color: BIKE },
          { name: "Public Transport", color: PT },
        ],
      },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "**Ask** the candidate to evaluate the exhibit without giving any specific instruction",
      "The purpose of the exhibit is to evaluate the investment’s potential impact on the client’s social impact goals",
      "The candidate should recognize that additional information is needed to calculate the CO2 impact",
      "Some rounding is acceptable",
      "**Additional data:**",
      "  10 miles per person per day commute",
      "  Cars – 25 lbs of CO2 per mile",
      "  Bikes – 0lbs of CO2 per mile",
      "  Public Transport – 2lbs of C02 per mile",
      "  Car Share – 2 passengers per car average",
    ],
    calcTable: {
      title: "2017",
      subtitle: "Passenger Numbers",
      plain: true,
      headerBg: "#666666",
      cols: "1.6fr 1fr 1fr 1fr",
      headers: ["", "NYC", "SF", "LA"],
      rowBg: ["#ececec", "#f6f6f6", "#ececec", "#f6f6f6", "#ececec"],
      boldRows: [4],
      rows: [
        ["Car", "5", "5.5", "10.5"],
        ["Rideshare", "2", "2", "1.5"],
        ["Bike", "1", "0.5", "0.75"],
        ["PT", "12", "2", "2.25"],
        ["Total", "20", "10", "15"],
      ],
    },
    calcTables: [
      {
        title: "2018",
        plain: true,
        headerBg: "#666666",
        cols: "1.6fr 1fr 1fr 1fr",
        headers: ["", "NYC", "SF", "LA"],
        rowBg: ["#ececec", "#f6f6f6", "#ececec", "#f6f6f6", "#ececec"],
        boldRows: [4],
        rows: [
          ["Car", "5", "5.5", "10.5"],
          ["Rideshare", "4", "3", "3"],
          ["Bike", "0.6", "0.1", "0.15"],
          ["PT", "10.4", "1.4", "1.35"],
          ["Total", "20", "10", "15"],
        ],
      },
    ],
    answerText:
      "- **Calculating the delta:**\n- Cars: No change\n- Rideshare: 10 – 5.5= 4.5M passengers * 10 miles * 25lbs of Co2 = 1,125M / 2 = ==562.5M lbs of CO2 per day==\n  Note the rideshare has the added step of incorporating the 2 passengers per car\n- Bike: 0 emissions so no change\n- PT: 13.15 – 16.25 = -3.1M passengers * 10 miles * 2lbs of CO2 = ==-62 lbs of CO2 per day==\n- **Net:** ==500.5lbs CO2 per day increase==\n- **The candidate should note that this investment will likely increase CO2 emissions which would go against the firms core values**",
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "You are about to walk into the investment committee meeting at your client. What is your recommendation to the committee?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "While the investment appears worthwhile from a financial perspective it does not fit in with the firm’s social goals",
      "**Potential Risks/Next Steps:**",
      "  Perhaps the cities not selected will have different ridership changens",
      "  How reliable is the forecasting",
      "  How will autonomous vehicles affect our forecasts",
    ],
  },
];
