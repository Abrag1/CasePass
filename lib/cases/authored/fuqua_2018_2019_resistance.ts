import type { CasePage } from "../content";

export const CASE_ID = "fe9adbef-42d3-4443-8ca1-3ad72f2c8ffc";

const PROMPT =
  "Action Med received many pharma products in clinical development as a result of a recent acquisition, including a drug, called BPL, to treat resistant HIV. The total cost of drug development is 2 Billion USD (includes R&D and anticipated marketing spend).\n\nAction Med wants to know the target patient population for this product, and how many patients will realistically take the drug. They also need to focus their marketing efforts on specific healthcare sites. How would you begin to think about this problem?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Sizing",
  synopsis:
    "A pharma company inherited a drug for resistant HIV after an acquisition. Size the patient population, pick which type of healthcare facility to target, and judge whether the drug can recover its development cost.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-sizing", "pharma", "medium-math", "exhibit-heavy"],
};

const hd = (v: string, align: "left" | "center" = "center") => ({ v, align, bg: "#cccccc", fg: "#000000" });
const cell = (v: string, bg: string, align: "left" | "center" = "center") => ({ v, align, w: 400, fg: "#000000", bg });
const row = (bg: string, a: string, b: string, c: string, d: string, e: string, f: string, g: string) => ({
  cells: [cell(a, bg, "left"), cell(b, bg), cell(c, bg), cell(d, bg), cell(e, bg), cell(f, bg), cell(g, bg)],
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Resistance: Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Can you tell me about a time that you had a lead a team through a difficult or challenging scenario at work? Question 2: Tell me about a time that you came up with an innovative solution to a problem.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Patients have resistant HIV when combination therapy fails to achieve complete viral suppression (virological failure). BPL treats patients who have virological failure after taking 3+ meds.",
          "A good framework will include questions about the cost of development, the need for market sizing, a view of the competitive environment, and the anticipated price of the product.",
          "Interviewer should probe on what kinds of data would be needed to calculate the total market size by healthcare facility. The interviewee should mention number of hospitals, total patients per hospital with resistant HIV, percentage of patients who actually take the drug (uptake), and price of the product",
          "Exhibit 1 should be handed out after completion of the framework.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    dataTableTitle: "Exhibit #1",
    dataTableCols: "1.3fr 1fr 1fr 1fr 1.2fr 1fr 1fr",
    dataTableHeaders: [
      hd("Type of healthcare facility", "left"),
      hd("Number of facilities in the US", "left"),
      hd("Average patients per hospital with HIV", "left"),
      hd("% of patients with resistant HIV", "left"),
      hd("Potential uptake of BPL among resistant HIV patients", "left"),
      hd("Number of pills/ patient/ year", "left"),
      hd("Price per pack of 6 pills", "left"),
    ],
    dataTableRows: [
      row("#ececec", "Private Hospital", "200", "2,000", "20%", "25%", "24", "$100"),
      row("#f5f5f5", "Academic Center of Excellence", "150", "4,000", "20%", "20%", "24", "$100"),
      row("#ececec", "Small Private practice", "2,000", "500", "5%", "25%", "24", "$100"),
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "The client has already collected some key data points about the potential size of the market for BPL, but has not yet determined whether to go after academic medical centers, private hospitals, or private practices",
      "**Key Question** – how much revenue will the product generate after 5 years at each type of hospital?",
      "Assume there is no growth rate, and that the time value of money is not an issue (i.e. you can just multiply 1 year of revenue by 5 to get 5 years or revenue)",
      "They only have the marketing resources to target 1 type of healthcare provider at this time",
      "The uptake % is the percentage of patients with resistant HIV who will end up taking BPL if it goes to market",
      "A good candidate should use the numbers provided to calculate the annual revenue for each type of healthcare facility:",
      "  Private hospital: ==$192M in annual revenue, $960M after 5 years==",
      "    (200 x 2,000 x 20% x 25% x (24/6) x 100) = 192M; 192 *5 = 960M",
      "  **Academic Center of Excellence:** ==$230.4M in annual revenue, $1.152BN after 5 years== **– THEY SHOULD CHOOSE ACADEMIC CENTERS OF EXCELLENCE**",
      "  Small Private Practice: ==$120M in annual revenue, $600M after 5 years==",
    ],
  },
  {
    n: "03",
    label: "Resistance: Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText:
      "• Action Med also supplies APIs (active pharmaceutical ingredients) to other major pharma companies\n• Action Med is currently solely focused in the Neurology therapeutic area (hand out exhibit 2), and supplies 70% of Sanofi's APIs in this area. Action Med's CEO has also asked us to take a look at competitive dynamics among other API suppliers, in order to predict any increase in profits from increased sales.\n      – Based on the information given, what do you expect Action Med will see in additional revenue due to Sanofi's predicted 30% increase in market share in the Neurology therapeutic area? (I.e. compare 2018 and 2022)\n      – Taking into account the revenue from targeting Academic Medical Centers (5 year combined revenue) AND the revenue from Sanofi's increased market share in 2022, will Action Med recover its R&D investment in BPL?\n      – After the calculation has been completed – take a minute to prepare your final thoughts for the CEO of Action Med",
    exhibitTitle: "Exhibit 2",
    exhibitColumns: [1, 1],
    extraCharts: [
      {
        kind: "multiPie",
        radius: 120,
        plainTitles: true,
        pies: [
          {
            title: "2018 Pharma Product Sales",
            slices: [
              { label: "Cardiovascular", value: 38, color: "#000099" },
              { label: "Neurology", value: 20, color: "#d9d9d9" },
              { label: "Oncology", value: 42, color: "#b3b3ff" },
            ],
          },
        ],
        legend: [
          { name: "Cardiovascular", color: "#000099" },
          { name: "Neurology", color: "#d9d9d9" },
          { name: "Oncology", color: "#b3b3ff" },
        ],
        infoBox: { title: "Additional information:", lines: ["Total patients buying prescription medication = 200M"] },
      },
      {
        kind: "combo",
        title: "Neurology Market Share, 2018 - 2018",
        titleAlign: "center",
        titleSize: 40,
        fontScale: 2.3,
        plotAspect: 0.75,
        customLegend: [{ color: "#000099", label: "2018" }, { color: "#c00000", label: "2022" }],
        yMax: 45,
        yStep: 5,
        yTickSuffix: "%",
        axisStyle: "none",
        lightBaseline: true,
        legend: "bottom",
        categories: ["Pfizer", "AstraZeneca", "GSK", "Sanofi"],
        clusterWidthRatio: 0.55,
        clusters: [
          { name: "2018", color: "#000099", values: [33, 31, 19, 10], valueLabels: true, labelsAbove: true, valueSuffix: "%" },
          { name: "2022", color: "#c00000", values: [21, 20, 14, 40], valueLabels: true, labelsAbove: true, valueSuffix: "%" },
        ],
        infoBox: {
          title: "Additional information:",
          lines: ["Action Med Provides 70% of Sanofi's APIs in both 2018 and projected to 2022", "Avg. Price of Action Med API sold to Sanofi = $75"],
        },
      },
    ],
    guidancePreLabel: "Interviewer Guidance/Calculations",
    guidancePreLines: [
      "For the purposes of this analysis, assume that Action Med is 100% focused on APIs in the Neurology therapeutic area",
      "Assume no growth rates – assume that market size stays the same and that the time value of money is not an issue",
      "**Correct calculation should be:**",
      "20% * 200M patients = ==40 Million Neurology patients==",
      "  Sanofi 2022 share = 40% * 40M = ==16M patients==",
      "    Action Med supplies 70% share = .7 * 16M = ==11.2M==",
      "    11.2M * 75$ per year = ==848M==",
      "    848M + 1.152BN (calculated from exhibit 1) = ==2BN==",
      "    **Key takeaway: Action Med will get enough revenue by 2022 to cover their R&D/Marketing cost of 2BN**",
    ],
  },
];
