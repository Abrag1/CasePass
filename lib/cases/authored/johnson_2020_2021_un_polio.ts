import type { CasePage } from "../content";

export const CASE_ID = "4122b7dd-89d9-42bc-b38b-988b5a58bba0";

const PROMPT =
  "Your client is the United Nations, who have hired you to help them with their fight to eradicate polio. They’re struggling with two related problems: 1) out of the countries that have requested their help to fight polio, which should they choose to go into first and 2) once they have chosen a particular location to go into, what factors need to be considered to ensure success.\n\nTo start, what are some of the characteristics you would look for to identify the best location for the UN to start with?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Share",
  synopsis:
    "The United Nations wants to fight polio and must decide which requesting country to enter first and what it takes to succeed there. An interviewer-led case with a country-selection chart, a vaccination S-curve and a cost comparison.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-selection", "healthcare", "exhibit-heavy", "light-math"],
};

// Exhibit 1: bubble chart. Each country is its own one-point series so its marker can have its own size.
// Positions and sizes are read off the casebook picture (X: 0-100 across the plot, Y: 0-100 up the plot).
const N = 101;
const at = (i: number, v: number) => Array.from({ length: N }, (_, k) => (k === i ? v : null));
const DARK = "#6f5b50";
const LIGHT = "#d9d9d9";
const bubble = (name: string, x: number, y: number, size: number, dark: boolean) => ({
  name,
  color: dark ? DARK : LIGHT,
  values: at(x, y),
  width: 0,
  marker: "circle" as const,
  markerSize: size,
});

// Exhibit 2: S-curve read off the picture (key points, joined by straight interpolation at every 1%).
const KEY: [number, number][] = [
  [0, 38.8], [5, 38.3], [10, 37.6], [15, 36.9], [20, 36.1], [25, 35.1], [30, 33.4], [35, 31.2],
  [37, 29.8], [39, 27.5], [40, 12.5], [42, 10], [45, 8.4], [50, 6.5], [55, 5.2], [60, 4.2],
  [65, 3.3], [70, 2.5], [75, 1.8], [80, 1.2], [85, 0.5], [90, 0], [100, 0],
];
const curve = Array.from({ length: N }, (_, i) => {
  const j = KEY.findIndex((k) => k[0] >= i);
  if (KEY[j][0] === i) return KEY[j][1];
  const [x0, y0] = KEY[j - 1];
  const [x1, y1] = KEY[j];
  return y0 + ((y1 - y0) * (i - x0)) / (x1 - x0);
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This case is a very unusual scenario – most candidates will have little, if any, background on the minutiae of large-scale vaccination campaigns. However, this problem does force people to be able to apply structured thinking to cases even outside of their sphere of knowledge. Also unlike most cases, this case is fully interviewer-driven (a la McKinsey-style cases), since the interviewer will walk the candidate through a series of relatively independent questions until they reach the conclusion.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: ["This section provides a sample analysis for interviewer’s reference"],
    qText: "**Question 1:** **What are some of the characteristics you would look for to identify the best location for the UN to start with?**",
    guidanceLabel: "The candidate should list some factors, such as:",
    guidanceLines: [
      "prevalence of polio in the country",
      "overall population of the country",
      "death rate from polio",
      "quality of countries medical system",
      "quality of infrastructure (ease of transportation)",
      "cultural attitudes towards ‘outsiders’ and medicine in general",
      "Make sure to ask **probing questions** so that the candidate fully explains the category and why they think it is relevant; this is especially important if the candidate comes up with an odd category in their response",
    ],
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    qText: "Once they’ve created a good list and justified all of the ideas they’ve listed, give them **Exhibit 1**.",
    extraCharts: [
      {
        kind: "combo",
        slideTitle: "Global Polio Study – Countries Requesting Assistance",
        yMin: 0,
        yMax: 100,
        yStep: 100,
        yTickLabels: ["Low", "High"],
        yLabel: "Polio Prevalence (% of population)",
        axisTitleBold: true,
        axisBold: true,
        axisStyle: "plain",
        xPlacement: "on",
        plotAspect: 0.7,
        fontScale: 0.8,
        legend: "bottom",
        legendPrefix: "Legend:",
        customLegend: [{ color: DARK, label: "Population > 100M", marker: "circle" }, { color: LIGHT, label: "Population < 100M", marker: "circle" }],
        hideXTicks: true,
        categories: Array.from({ length: N }, (_, i) => (i === 0 ? "Low" : i === 50 ? "Death Rate" : i === 100 ? "High" : "")),
        xLabelEvery: 1,
        lines: [
          bubble("Population > 100M", 51, 81, 80, true),
          bubble("Population < 100M", 10, 88, 48, false),
          bubble("", 81, 89, 94, true),
          bubble("", 43, 44, 200, true),
          bubble("", 67, 27, 42, false),
          bubble("", 11, 9, 64, false),
          bubble("", 92, 9, 22, false),
        ],
        markers: [{ at: 50, color: "#000000", dashed: false }, { at: 100, color: "#000000", dashed: false }],
        refLines: [{ at: 50, color: "#000000", width: 2 }, { at: 100, color: "#000000", width: 2 }],
        texts: [
          { text: "Somalia", x: 10, y: 82, size: 12, bold: true, anchor: "middle" },
          { text: "Bangladesh", x: 50, y: 70, size: 12, bold: true, anchor: "middle" },
          { text: "Pakistan", x: 81, y: 79, size: 12, bold: true, anchor: "middle" },
          { text: "India", x: 43, y: 23, size: 12, bold: true, anchor: "middle" },
          { text: "Guatemala", x: 67, y: 19, size: 12, bold: true, anchor: "middle" },
          { text: "Poland", x: 11, y: 21, size: 12, bold: true, anchor: "middle" },
          { text: "Zambia", x: 92, y: 2, size: 12, bold: true, anchor: "middle" },
        ],
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "In this chart, they should notice the three important data points: **the prevalence of polio** as a percentage of the population, the **death rate**, and the **overall population** of the country.",
      "Obviously a location that has high values for all three of these data will be the most attractive as a starting location. Based on this, the candidate should gravitate to one of two locations: **India** and **Pakistan**. Although Pakistan has a high prevalence and death rate, India’s massive population means that it almost certainly has more cases overall. **Note**: If the candidate asks if they can choose two countries, tell them the UN wants only one country and thus they have to choose.",
    ],
  },
  {
    n: "04",
    label: "Question 1b",
    title: "Question 1b",
    kind: "qa",
    qText:
      "**Question 1b - After they’ve made their choice, ask them:**\n“Let’s suppose that the UN chose to start in Pakistan. They plan to fight polio by vaccinating uninfected people against the disease. **What factors do you think are most important to consider when they are planning their strategy for entering Pakistan?**”",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Again, the candidate should give an number of different factors and explain their reasoning for including them. Be sure to test them if they seem uncertain about a particular idea, so that they keep only the ones they truly believe should be there.",
    ],
  },
  {
    n: "05",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "**Question 2:**\nGive them **Exhibit 2** and tell them: “The UN has conducted some research on polio vaccinations and have produced a chart to help guide our decision. **What do you think about this data?**”",
    extraCharts: [
      {
        kind: "combo",
        slideTitle: "Global Polio Study – Epidemiological S-Curve",
        title: "Effectiveness of Vaccination",
        titleBold: true,
        titleAlign: "center",
        yMin: 0,
        yMax: 50,
        yStep: 10,
        yTickSuffix: "%",
        yLabel: "Infection Rate of Polio in Population",
        axisStyle: "plain",
        xPlacement: "on",
        legend: "none",
        fontScale: 0.8,
        xTitle: "Percentage of Population Vaccinated",
        categories: Array.from({ length: N }, (_, i) => (i % 10 === 0 ? `${i}%` : "")),
        xLabelEvery: 1,
        hideXTicks: true,
        majorXTicks: 10,
        lines: [{ name: "Infection rate", color: "#7b6b6b", values: curve, width: 3, smooth: true }],
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "As soon as the candidate understands that the graph shows the decline in the infection rate as the vaccination rate increases, they will notice that at around ==40%== vaccination, infections decline dramatically. Once they make that observation, ask them why this might be.",
      "The answer is the idea of ‘herd immunity,’ which is the concept that as more people are vaccination, there will be fewer channels of transmission for the disease.",
      "Since it will be less likely that any given person will encounter someone carrying the disease, the likelihood that they will contract it will fall as well.",
    ],
  },
  {
    n: "06",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "**Question 3:**\nOnce they’ve explained this phenomenon of herd immunity, ask them **what vaccination rate the UN should target in the short and long term.**",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "In the short term, a reasonable target would be some number around ==50% - 60%==. The reason for being above 50% is so that the UN can fully capture the sharp decrease that occurs around 40%. A common mistake is suggesting 40%, since this is where the decrease is the sharpest. However, this causes them to miss out on sharp declines just after 40% (e.g., at 40% vaccination, there’s an infection rate of 20%, at 41% vaccination, infection rates are 13%, and by 50% vaccination, infections have fallen to 7%).",
      "In the long term, they should target some number between ==80% and 90%== so that they can fully eradicate polio. As a result of the herd immunity effect, they do not need to vaccinate 100% of people to achieve a 0% infection rate (in this graph, infections hit 0% at 86% vaccination).",
    ],
  },
  {
    n: "07",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "**Question 4:**\nAnother area that they want us to look into is their distribution method. Broadly speaking, distribution strategies can be more **centralized**, operating out of a few of the largest cities, or more **decentralized**, with UN workers going out to the smaller visitors to distribute the medicine. **What are some advantages and disadvantages of each?”**",
    guidanceLabel: "The candidate should come up with some of the following ideas, or others:",
    guidanceLines: [
      "from a financial perspective, centralized models will be cheaper for the nearby people, but more expensive to reach those farther away",
      "from a safety perspective, it will be much easier for the UN workers to administer a centralized model, rather than needing to go out to the villages",
      "from the perspective of maximizing vaccination, it is possible that under a centralized model, people from farther away will not come and get vaccinated, meaning that these smaller towns will remain susceptible to polio as their local vaccination rates will not be high enough to create herd immunity.",
    ],
  },
  {
    n: "08",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "**Question 5:**\nThe UN wants us to calculate the total cost of some of their different distribution methods. Pakistan has an overall population of 200M people and the UN wants to estimate the cost of vaccinating half of them. They are considering three different distribution methods, A, B, and C (in order from most to least centralized). **Method A** costs $200 per person for the first 40M people and then $800 per person for everyone after that. **Method B** costs $300 per person for the first 80M people and $700 per person thereafter. Finally, **Method C** costs $500 per person for everyone. **Which method should they choose?**",
    calcNote: "The candidate should calculate the costs as shown below:",
    calcTable: {
      headers: ["", "Method A", "Method B", "Method C"],
      rows: [
        ["Target vaccination number", "100M", "100M", "100M"],
        ["Vaccinations at lower rate", "40M", "80M", "100M"],
        ["Vaccinations at higher rate", "60M", "20M", "0M"],
        ["Low rate total cost", "$8B", "$24B", "$50B"],
        ["High rate total cost", "$48B", "$14B", "$0"],
        ["Overall cost", "==$56B==", "==$38B==", "==$50B=="],
      ],
      rowStyles: [{}, {}, {}, {}, {}, { bold: true }],
    },
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Thus **Method B** has the lowest overall cost. Once they get this, ask the candidate what a potential issue with adopting Method B might be from a financial perspective. The insight is that the long-term target is much higher (~90%), so while Method B might be cheaper for the first 100M, Method C is likely to be cheaper for larger numbers (Method C becomes cheaper after 80% vaccination rates).",
    ],
  },
  {
    n: "09",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Conclusion:**",
      "1. To start the UN’s vaccination program, they should go into Pakistan, which has the highest polio prevalence and death rates among their population.",
      "2. To ensure that all regions can achieve herd immunity, the UN should choose a decentralized distribution strategy, which will limit the costs of achieving high immunization rates.",
      "3. Our estimates show that achieving full immunity will cost around ==$90B==, so this will need to be a long-term project for the UN.",
    ],
  },
];
