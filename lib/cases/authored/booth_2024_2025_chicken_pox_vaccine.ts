import type { CasePage } from "../content";

export const CASE_ID = "292e8a0d-9af4-49c5-8a4d-a0fb76be415a";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "A large pharmaceutical company has completed the second phase of testing for a chicken pox vaccine and must decide whether to fund the third phase. Size the market, price the product and weigh costs against benefits.",
  full_prompt:
    "Your client is a large pharmaceutical drug company working on a vaccine for chicken pox. The vaccine needs to pass three phases of testing to be approved by the FDA. It has just completed the second phase, and the client is asking for your help to decide if they should fund the third phase. The third phase would last 2 years and cost $300M. Results from previous phases indicate the vaccine has a 95% chance of approval. We would be able to start producing vaccine immediately following approval.\n\nShould our client invest or not?",
  tags: ["candidate-driven", "investment-decision", "market-sizing", "pricing", "breakeven"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Your client is a large pharmaceutical drug company working on a vaccine for chicken pox. The vaccine needs to pass three phases of testing to be approved by the FDA. It has just completed the second phase, and the client is asking for your help to decide if they should fund the third phase. The third phase would last 2 years and cost $300M. Results from previous phases indicate the vaccine has a 95% chance of approval. We would be able to start producing vaccine immediately following approval.\n\nShould our client invest or not?",
    note: "**Fit Questions** — 1. Walk me through your resume. 2. Why X Firm? (specify a Firm of interviewer choosing)",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case contains a lot of information to be given. Let the interviewee know we are **only concerned with the US market**. The candidate should ask questions on the vaccine (dosage, frequency, etc.). The key will be to identify that once the current population is vaccinated, the **revenues will drop** as the volume would only correspond to incremental population growth.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Market sizing - volume" },
          { n: "3", text: "Pricing the product" },
          { n: "4", text: "Cost-benefit analysis and discussion" },
          { n: "5", text: "Recommendation" },
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
    guidancePreIntro: "The below information should be provided **only when candidate asks**:",
    guidancePreLines: [
      "Vaccine is a one time injection.",
      "Assume US population is ==300M==, and it is uniformly distributed from 0-75 (as many people enter population as leave every year).",
      "It is estimated that it would take ==3 years== to vaccinate existing population, and would be done at an even pace.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: ["**Working hypothesis:** The client should invest in the vaccine."],
      },
      {
        label: "Pharma Market",
        groups: [
          { heading: "Customer Segments", items: ["Likely children, potentially includes some adults"] },
          { heading: "Competition / Substitutes", items: [] },
          { heading: "Size / Growth Rate", items: [] },
          { heading: "Channels", items: ["Providers, pharmacy clinics"] },
        ],
      },
      {
        label: "Profitability",
        groups: [
          {
            heading: "Revenue",
            items: [
              "Price – per treatment",
              "Volume – number of treatments needed (current pop.)",
              "  Future vol once current population is vaccinated",
            ],
          },
          {
            heading: "Costs",
            items: [
              "Fixed costs",
              "  Plant capacity",
              "  R&D costs",
              "  Investment / BE timeline",
              "Variable costs",
              "  SG&A",
              "  Inputs for production, labor",
              "“Discounting Cost” – do we need to discount these free cash flows (FCF)?",
            ],
          },
        ],
      },
      {
        label: "Pharma Company",
        groups: [
          { heading: "Fit with existing products, i.e. other vaccines or childhood focused therapies?", items: [] },
          { heading: "Opportunity cost -  could this money be spent elsewhere?", items: [] },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Interviewee should begin by **sizing the US market**.",
      "If interviewee has not asked about the portion of population that would need vaccine, then **push** him or her to go in that direction.",
      "When asked what portion of population would need vaccine, **Show only Exhibit 1, cover Exhibit 2.**",
      "  Candidate should be pushed to conclude that the portion of the population needing the vaccine is that with an infection rate of ==less than 50%==.",
    ],
  },
  {
    n: "03",
    label: "Market Sizing: Volume",
    title: "Market Sizing: Volume",
    kind: "qa",
    // Exhibit 1 (shown with this section's analysis): a smooth S-curve with arrow-ended axes,
    // Y ticks 50% and 100% only, X ticks 3-21 by 3, no gridlines.
    curveChart: {
      title: "Cumulative Distribution of Chicken Pox Exposure",
      points: [
        { x: 0, y: 0 },
        { x: 8.4, y: 57.5 },
        { x: 9.5, y: 66 },
        { x: 10.5, y: 74 },
        { x: 12, y: 82 },
        { x: 13.5, y: 89.5 },
        { x: 15, y: 94 },
        { x: 16.5, y: 97 },
        { x: 18, y: 99 },
        { x: 19.2, y: 99.8 },
        { x: 20.4, y: 99.6 },
      ],
      xMin: 0,
      xMax: 22.3,
      yMin: 0,
      yMax: 106.5,
      xTicks: [
        { v: 3, label: "3" },
        { v: 6, label: "6" },
        { v: 9, label: "9" },
        { v: 12, label: "12" },
        { v: 15, label: "15" },
        { v: 18, label: "18" },
        { v: 21, label: "21" },
      ],
      yTicks: [
        { v: 50, label: "50%" },
        { v: 100, label: "100%" },
      ],
      xTitle: "Age",
      yTitle: "% Infected",
    },
    infoBoxLabel: "Market Sizing: Volume",
    infoSections: [
      {
        paragraphs: [
          "Candidate should begin by **sizing the population** that can be treated by this drug, which can be viewed in two parts: existing population when vaccine is released and people that will be born every year.",
        ],
      },
      {
        label: "Insights from Exhibit # 1",
        lines: [
          "By age 18, 100% of the population has been exposed to chicken pox and thus does not need the vaccine.",
          "300M/75 = ==4M== people of each age; 4M*18 = ==72M== people ages 0-18",
          "Since only those who haven't been infected would need the vaccine, we should vaccinate ages 0 - 9, 50% of the 0-18 population.  This is used as a cut off point since population is evenly distributed, those younger than 9 have >50% chance of not having been infected and those older than 9 has <50% chance of not having been infected.",
          "  72M x 50% = ==36M== in addressable market",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Probe** interviewee to recognize that population with < 50% chance of infection can be considered as “not infected”.",
      "Population that is already infected (>50% infection) should not be treated first - vaccination doesn't work for them.",
      "Candidate can also use 320M for the US population and assume even distribution of population from 0 to 80 years.",
      "  Each age range would still have 4 M people.",
      "  Infection assumptions remain the same regardless of initial population size and age range used.",
    ],
  },
  {
    n: "04",
    label: "Pricing the Product",
    title: "Pricing the Product",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "**Provide the following only when asked:**",
    guidancePreLines: [
      "Costs (per injection):",
      "  Distribution ==$1.50==",
      "  Production ==$2.50==",
      "  SG&A ==$5.00==",
      "Assume the ==$300M== costs for phase three includes everything else (plant set up costs, etc.) and can be expensed evenly over the 2 years of testing.",
    ],
    infoBoxLabel: "Pricing the Product",
    infoSections: [
      {
        paragraphs: ["When asked about price, **show Exhibit 2.**"],
        lines: [
          "Client should price at ==$30==. While an argument could be made for a lower price point, the inflection point at $30 and low price elasticity below $30 suggests it is the right price point.",
          "There is a slight decline between $25 and $30 that will lose a small population for $5 more per unit over total populace, but slope of demand gets considerably steeper after $30.",
          "At $30, notice that only ==75%== of the market is approachable for vaccination.",
        ],
      },
    ],
    // Exhibit 2: arrow-ended axes (Y ticks 25-100%, X ticks 10-40 by 5), a nearly flat line that
    // bends at $30 and then falls steeply. The small "....." before the 10 tick is printed in the source.
    curveChart: {
      title: "Parent’s Willingness to Pay",
      points: [
        { x: 5, y: 89.5 },
        { x: 10, y: 90 },
        { x: 15, y: 89.4 },
        { x: 20, y: 87.3 },
        { x: 25, y: 83.8 },
        { x: 28, y: 79.5 },
        { x: 30, y: 76 },
        { x: 31, y: 72.8 },
        { x: 37.1, y: 35 },
      ],
      xMin: 4.9,
      xMax: 41.8,
      yMin: -1.4,
      yMax: 106.4,
      xTicks: [
        { v: 8.2, label: "....." },
        { v: 10, label: "10" },
        { v: 15, label: "15" },
        { v: 20, label: "20" },
        { v: 25, label: "25" },
        { v: 30, label: "30" },
        { v: 35, label: "35" },
        { v: 40, label: "40" },
      ],
      yTicks: [
        { v: 25, label: "25%" },
        { v: 50, label: "50%" },
        { v: 75, label: "75%" },
        { v: 100, label: "100%" },
      ],
      xTitle: "Price ($)",
      yTitle: "% Willing to purchase vaccine",
    },
  },
  {
    n: "05",
    label: "Cost-Benefit Calculation",
    title: "Cost-Benefit Calculation",
    kind: "qa",
    guidancePreLabel: "Cost-Benefit Calculation",
    guidancePreLines: [
      "Net target population for vaccination is:",
      "  Population (age 0-18) * (% not infected) * (% willing to pay)",
      "    72 M * 50% * 75% = ==27M==",
      "  ==9M== treated per year based on the assumption it takes 3 years to vaccinate existing population.",
      "In addition, there are 4M babies being born each year (as population is steady state), with parent willingness to pay staying constant at $30.",
      "  Thus, 4M*75% = ==3M== vaccinations per year.",
      "Total costs per injection are $9 (see prev. page) and thus, the contribution margin is ==$21==/injection.",
      "An example of math structure to calculate net profit for three years after vaccine approval is shown below.  Note that a strong candidate will use the **contribution margin** to calculation net profit for each of these three years and compare the total profit to the initial 300M investment.",
    ],
    // The source's worked example table (interviewer reference, not for the candidate screen).
    shareable: false,
    dataTableCols: "2.2fr repeat(7, 0.75fr)",
    dataTableHeaders: ["Year (Millions)", "1", "2", "3", "4", "5", "6", "... After"].map((v, i) => ({
      v,
      align: i === 0 ? ("left" as const) : ("right" as const),
    })),
    dataTableRows: [
      ["Existing Population Vaccines", "", "", "9", "9", "9", "", ""],
      ["New Baby Vaccines", "", "", "3", "3", "3", "3", "3"],
      ["Total", "", "", "12", "12", "12", "3", "3"],
      ["Revenue", "", "", "360", "360", "360", "90", "90"],
      ["Costs", "-150", "-150", "-108", "-108", "-108", "-27", "-27"],
      ["Net Profit", "-150", "-150", "252", "252", "252", "63", "63"],
    ].map((r) => ({
      cells: r.map((v, i) => ({ v, align: i === 0 ? ("left" as const) : ("right" as const), w: 400, fg: "#1f2421" })),
    })),
    infoBoxLabel: "Key Takeaways",
    infoSections: [
      {
        label: "Good candidate:",
        lines: [
          "Profitability during first 3 years is ==$756M==, annuity profit is ==$63M== from year 6 onwards.",
          "Breakeven in ==~1.25 years==.",
        ],
      },
      {
        label: "Stronger candidate:",
        lines: [
          "Pharma companies usually have rather high hurdle rates (or discount rates) due to the risky nature of their business model, but any reasonable rate will yield a high positive NPV.",
          "  Candidate does not need to calculate NPV – just recognize high positive value.",
          "Interviewee should also mention the **percentage chance of failure** (for example 5%) and discuss how that could affect the calculation (there are a couple correct ways to interpret the effect).",
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText: "Do we need to be worried about any new entrants?",
    guidancePreLabel: "Provide when asked",
    guidancePreNote:
      "Note: Many interviewees will blindly say yes. If this occurs, provide the information in the first bullet below. This should prompt the candidate to ask about the rest of the data.",
    guidancePreIntro: "This information is only to be provided **when asked**:",
    guidancePreLines: [
      "Vaccine will not be patented.",
      "Other companies would have to undergo same series of testing and no other companies have started formal testing of vaccine.",
      "Phase 1 and 2 combined take ==3 years== (we have 3 years of competitive protection); Phase 1 and 2 cost ==$200M==.",
    ],
    infoBoxLabel: "Suggested Response",
    infoSections: [
      {
        paragraphs: ["We do not need to worry about potential new entrants."],
        lines: [
          "Since there is a natural three year protection due to required FDA testing, other companies would not be able to capture the “existing population” segment of the market. Assuming they do enter in year 6, we would be sharing only 3M vaccines per year. Even assuming they were able to capture a decent portion of the market, they wouldn’t be able to cover the upfront testing costs for years.",
          "  With 50% of market and holding price constant (which is itself unrealistic), competition gets only  ==$31.5M==, and breakeven time is ==~10 years==.",
          "  Under more likely scenario where price is reduced in half to $15, competition only gets ==$9M== if they get 50% of market, and breakeven time on phase 3 alone is ==~33 years==. Calculation: ($15-$9)*3M*50% = $9M.",
          "  Costs for phase 1 and 2 should not be used when calculating go/no go since they are sunk, but should be considered when evaluating competitors’ decision.",
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        lines: [
          "**Client should invest in the chicken pox vaccine**",
          "  Breakeven in ==1.25 years==, profitability during first 3 years is ==$756M==, annuity profit is ==$63M==",
          "  Charge ==$30== per injection, gross margin of ==$21 (70%)==",
          "  Target ages 0-9; ==75%== of parents willing to pay at this price point",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Risk of potential new entrants",
          "  Pharmaceuticals usually have high hurdle rates, and, given that we will have 3 years protection from FDA process and will corner the existing market, it will take several years for competitors to breakeven; therefore, competitors have no real incentive to enter, even for generics",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Develop a roll-out / implementation plan for the investment",
          "  Including channel strategy and any fit with existing products from client",
        ],
      },
    ],
  },
];
