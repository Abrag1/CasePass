import type { CasePage } from "../content";

export const CASE_ID = "e131cc3d-2574-4048-ae02-05983ca7e098";

const PROMPT =
  "Our client, Apricot, is a cutting-edge tech company that has patented a new technology called iPhat and is considering potential applications for it. iPhat measures a person’s BMI (Body Mass Index) by sending an electrical signal through a feedback loop within a portion of the body. The new hardware required for the signal and feedback mechanism is small (about the size of a penny). Apricot is unsure of how to bring this to market. Walk me through what how you would approach this?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A tech company has patented a technology that measures BMI and is unsure how to bring it to market. Size the smartwatch market, weigh entry against licensing, run a break-even analysis and recommend a path.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "market-sizing", "exhibit-heavy", "brainstorming"],
};

const APPLE = "#b01c1c";
const FITBIT = "#4d4d53";
const SAMSUNG = "#a39b8e";
const GARMIN = "#ee9693";
const OTHERS = "#7b7164";
const PCT = ["0.0%", "10.0%", "20.0%", "30.0%", "40.0%", "50.0%", "60.0%", "70.0%", "80.0%", "90.0%", "100.0%"];
const W = "#ffffff";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question. Spend 15 Minutes on: Tell me about a time you did something entrepreneurial to overcome a difficult challenge.",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "Structure can be more open ended, focused around product, company, competitors, and options for application. Note: Because this starts out open-ended, interviewee should display a highly structured approach, however, this is an opportunity for interviewee to show relatable personality (tech, health, getting in shape, etc.)",
        ],
      },
      { label: "Case Information" },
      { label: "Goal:", lines: ["Apricot’s shareholders are looking for the most strategic and financially beneficial entry for iPhat"] },
      { label: "Market Size:", lines: ["We will get to that in minute."] },
      { label: "Competition", lines: ["No competitors for BMI within wearable tech"] },
      {
        label: "Apricot’s Product Portfolio",
        groups: [
          { heading: "Software B2C", items: ["Personal Health Data Management (iOS)", "Women’s Health Tracking (iOS)"] },
          { heading: "Hardware B2C", items: ["Fitness Tracking Rings (Finger)", "Smart Sneakers (not selling well)"] },
        ],
      },
      { label: "Capital Concerns", lines: ["We will get to that in a minute"] },
      { label: "BMI", lines: ["Measures body fat, water retention, muscle density"] },
      {
        label: "Case Flow Guide",
        lines: [
          "Part 1: Smartwatch Market (Market Sizing)",
          "Part 2: Break Even Analysis (Math)",
          "Part 3: Other Opportunities (Brainstorming)",
          "Part 4: Key Considerations / Risks (Brainstorming)",
          "Part 5: Recommendation",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "Apricot has considered building its own brand of a smartwatch that utilizes iPhat. How would you size the market for smartwatches in the U.S.?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: [
      "**A good answer** will be well-structured, have a good estimate on average smartwatch price, and narrow down the market size through at least a 4 tier hierarchy, including:",
      "  U.S. Population (approx. 320M – choose this because it is easy to divide into age segments)",
      "  Age Distribution (approx. 80yr lifespan, 10yr per segment, 40M per segment)",
      "  Penetration rate (approx. average 12%)",
      "  Market Size (approx. average $200/smartwatch)",
      "**A great answer** will include the above as well other segments with associated penetration rates such as:",
      "  Gender",
      "  Income",
      "  Location",
      "  Smartphone ownership",
    ],
    guidanceLabel: "Note:",
    guidanceLines: [
      "2018 U.S. smartwatch market size ($3 Billion). Average price around $200/smartwatch.",
      "Interviewee must walk through structure with the interviewer prior to doing the math.",
      "Interviewee must confirm assumptions while doing the math.",
      "Interviewee must recognize the “so what?” about the number he/she gets to at the end.",
      "Show some personality. For instance, “this number makes sense, because disposable income is at an all-time high” or “fitness/well-being is very important to consumers today. I work out everyday.” or “tech gadgets are super popular right now, every person in my family has a Fitbit. We even have a daily step challenge”.",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "Show Exhibit 1. Apricot has done its own analysis of the market for the past 4 years. What are the pros and cons of entering this market?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Pros",
        lines: [
          "Industry leader is losing market share (Competition Power)",
          "Consumers are becoming less brand sensitive (Buying Power)",
          "Apricot has an opportunity to differentiate and drive value to consumer (Competition Power)",
          "Not a high level of substitutes for consumers (Substitute Power)",
        ],
      },
      {
        label: "Cons",
        lines: [
          "Still a huge market leader that has economies of scale (Competition Power)",
          "More competition as other players gain market share (Competition Power)",
          "High entry barriers (New Entry Power)",
          "High fixed costs upon entry (New Entry Power)",
          "Difficult to exit, unless selling off to a competitor (New Entry Power)",
          "Suppliers gain power as more players enter the market (Supplier Power)",
        ],
      },
      { paragraphs: ["**Note:** Interviewee should use the 5-forces, but not outright say the structure."] },
    ],
    extraCharts: [
      {
        kind: "stackCols",
        title: "Exhibit 1. Smartwatch Market Share",
        titleStyle: "centered-bold",
        gridlines: true,
        serif: true,
        labelBreaks: true,
        plainAxes: true,
        xBand: true,
        boldLabels: true,
        minLabelFont: 11,
        segBorder: false,
        legendPlacement: "bottom",
        legend: [
          { name: "Apple", color: APPLE },
          { name: "Fitbit", color: FITBIT },
          { name: "Samsung", color: SAMSUNG },
          { name: "Garmin", color: GARMIN },
          { name: "Others", color: OTHERS },
        ],
        panels: [
          {
            yMax: 100,
            yStep: 10,
            yTickLabels: PCT,
            columns: [
              {
                label: "$1.8B\n2015",
                segs: [
                  { value: 63.0, color: APPLE, label: "63.0%", textColor: W },
                  { value: 16.0, color: SAMSUNG, label: "16.0%", textColor: W },
                  { value: 21.0, color: OTHERS, label: "21.0%", textColor: W },
                ],
              },
              {
                label: "$2.2B\n2016",
                segs: [
                  { value: 63.4, color: APPLE, label: "63.4%", textColor: W },
                  { value: 9.8, color: SAMSUNG, label: "9.8%", textColor: W },
                  { value: 26.8, color: OTHERS, label: "26.8%", textColor: W },
                ],
              },
              {
                label: "$2.6B\n2017",
                segs: [
                  { value: 67.2, color: APPLE, label: "67.2%", textColor: W },
                  { value: 4.3, color: FITBIT, label: "4.3%", textColor: W },
                  { value: 5.2, color: SAMSUNG, label: "5.2%", textColor: W },
                  { value: 6.0, color: GARMIN, label: "6.0%", textColor: W },
                  { value: 17.3, color: OTHERS, label: "17.3%", textColor: W },
                ],
              },
              {
                label: "$3.0B\n2018",
                segs: [
                  { value: 50.7, color: APPLE, label: "50.7%", textColor: W },
                  { value: 12.7, color: FITBIT, label: "12.7%", textColor: W },
                  { value: 13.2, color: SAMSUNG, label: "13.2%", textColor: W },
                  { value: 6.1, color: GARMIN, label: "6.1%", textColor: W },
                  { value: 17.3, color: OTHERS, label: "17.3%", textColor: W },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "What are the costs associated with bringing an Apricot smartwatch to market?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: ["High Level Costs (Don’t have to nail all of these, but should be close)"],
        lines: [
          "Production – COGS, Facility Startup, Distribution, Labor, Raw Materials",
          "R&D – BMI Implementation, Platform Consolidation, Multiple Brands (High-End/Low-Cost, Male/Female)",
          "Marketing – Pricing, Promotion, Product Placement, Advertising, Focus Groups, Customer Acquisitions, Cross-selling",
          "G&A – Customer Service, Production Back Office Support",
          "Cannibalization (If interviewee asked about other Apricot products prior)",
        ],
      },
      {
        paragraphs: [
          "**Question 4:** Apricot’s shareholders have determined that it would cost $240 million in annual capital to produce smartwatches. How many units would Apricot need to sell to break even?",
          "Show Exhibit 2. Tell interviewee the sell price if they ask or assume. Unit sell price is $200/unit.",
        ],
      },
    ],
    extraCharts: [
      {
        kind: "combo",
        title: "Exhibit 2. Unit Cost Structure",
        titleBold: true,
        titleSerif: true,
        titleAlign: "center",
        titleSize: 38,
        serif: true,
        yMax: 160,
        yStep: 20,
        yTickLabels: ["$-", "$20", "$40", "$60", "$80", "$100", "$120", "$140", "$160"],
        legend: "none",
        xLabelRotate: 45,
        axisBold: true,
        axisStyle: "none",
        baselineOnly: true,
        plotAspect: 0.4,
        categories: ["Raw Materials", "Distribution", "Production Labor", "Inventory", "Sales/Marketing", "Salaries/Benefits", "G&A", "Rent", "Utilities", "R&D", "Total Cost"],
        bars: {
          name: "Unit cost",
          color: "#c00000",
          values: [48, 40, 32, 10, 10, 3, 3, 2, 1, 1, 150],
          bases: [0, 48, 88, 120, 130, 140, 143, 146, 148, 149, 0],
          widthRatio: 0.42,
          valueLabels: true,
          valuePrefix: "$",
          labelOffset: 18,
        },
      },
    ],
    answerText: "3 million units, revenue of $600 million, resulting in 20% market share in the U.S.",
    guidanceLabel: "Note:",
    guidanceLines: [
      "Ignore cannibalization of other Apricot products.",
      "Interviewee must calculate a contribution margin using the variable costs in order to get breakeven. Variable costs in Exhibit 2 are Raw Materials, Distribution, and Production Labor. All other costs are Fixed.",
      "Interviewee should relate back to Exhibit 1 to compare Apricot’s market share to incumbents’ market share. Key insight, Apricot would need to become the 2nd leader in the market behind Apple in order to break even.",
    ],
  },
  {
    n: "05",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText: "What are some other applications that Apricot could implement iPhat in?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: [
      "Interviewee should be structured in this open-ended brainstorming session. Answer could include:",
      "  Licensing/Partnerships – rising players in the smartwatch market",
      "  Existing Apricot Products – Smart Sneakers",
      "  Healthcare Industry",
      "  Targeted opportunities in health tracking – chronic heart diseases, blood pressure, obesity",
    ],
    guidanceLabel: "Note:",
    guidanceLines: [
      "Licensing is the biggest opportunity because market entry for smart watches is tough (Apple owning 50% of the market).",
      "The market is becoming more concentrated with the top players capturing more and more market share. Therefore, there is an opportunity to license to multiple companies.",
    ],
  },
  {
    n: "06",
    label: "Question 6",
    title: "Question 6",
    kind: "qa",
    qText: "Apricot has also considered licensing iPhat to existing smartwatch players. What are the risks associated with this?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Note:",
        lines: [
          "This is open-ended. Don’t have to nail these, but must use what they come up with in recommendation.",
          "Building in-house risks were mentioned during the market analysis",
          "Licensing – competition may build similar product, may lose IP, litigation against the brand, may not meet quality standards, end-customer misuse, buyers may want sole contract, may hurt the brand, may take focus from core competencies.",
        ],
      },
      { paragraphs: ["**Question 7:** Apricot’s COO and CMO walk in. What’s your recommendation?"] },
      {
        label: "Note:",
        lines: ["Interviewee should tailor recommendation to both audiences - Chief Operating and Chief Marketing officers"],
      },
    ],
  },
];
