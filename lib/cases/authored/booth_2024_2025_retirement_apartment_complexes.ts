import type { CasePage } from "../content";

export const CASE_ID = "424d51fb-76c3-4ef4-8c55-28fff8ce1a61";

const PROMPT =
  "Our client owns and operates 25 retirement apartment complexes for the 55-75 year old demographic. The apartment complexes are in the Southeast and Southwest states of Florida, California, New Mexico and Arizona.\n\nThe main goal for the client is to maximize profitability, so the client company's CEO is considering expanding into Northern states. As a pilot, the client built an apartment complex in downtown Chicago two years ago.  By and large, the client's apartment complexes have similar designs and amenities. However, the new complex in Chicago has more amenities than the client's properties in the South.\n\nWhat are the main factors the CEO should consider for growth in the US?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability / Market Entry",
  synopsis:
    "A company that runs retirement apartment complexes in the South is considering expanding into Northern states after a pilot complex in Chicago. Compare profit and margin between the regions, then weigh the benefits and risks of entering the North.",
  full_prompt: PROMPT,
  tags: ["candidate-driven", "market-entry", "profitability", "math-structuring", "brainstorming"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 400) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const R = (v: string, w = 400) => ({ v, align: "right" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you used data to solve a problem and to convince someone of your solution. 2. If you receive multiple offers, how will you pick a Firm?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case will require candidates to focus on **profitability analysis**, within the context of new market entry considerations. Strong candidates will bring structure to their quantitative analysis, in order to keep information organized across a set of options. While candidates will be tempted to round during math calculations, this is one case where the answers could be impacted by doing so and thus **rounding should not be permitted**.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Math Question" },
          { n: "3", text: "Brainstorm" },
          { n: "4", text: "Recommendation" },
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
    guidancePreIntro: "Provide the information below **if requested**.",
    guidancePreLines: [
      "**Demand in the North**",
      "  A survey of pre-retirees and retirees across a number of states, including New York, New Jersey, Massachusetts and Illinois, revealed an unmet demand in the North for retirement facilities. Retirees wanted options that would allow them to stay close to their families and friends.",
      "**Competition**",
      "  In the South competition is fierce. In the North, competition is fragmented or nonexistent.",
      "**Revenues**",
      "  In the South, rent includes maintenance, amenities, and utilities.",
      "  In the North, rent further includes charges for access to a 24-hour on-site medical facility.",
      "  For the purposes of this analysis, buildings within a region can be considered identical.",
      "**Amenity Differences**",
      "  The pilot building in the North offers 24-hour access to a medical facility in the complex.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** In order to evaluate the options on the basis of profitability, we need to understand the cost differential between complexes in the South and the pilot complex in the North.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Retirement facility industry",
          children: [
            {
              label: "Market size/growth",
              children: [
                { label: "By region" },
                { label: "Other segments (demographics, type of care needed)" },
              ],
            },
            {
              label: "Trends/retiree preferences",
              children: [
                { label: "Proximity to family" },
                { label: "Integrated health services" },
                { label: "Low tax states" },
                { label: "Urban vs. suburban/rural" },
              ],
            },
            {
              label: "Competitor landscape",
              children: [
                { label: "By region within industry" },
                { label: "From other types of property use (multi-family housing, condos, assisted living facilities)" },
              ],
            },
          ],
        },
        {
          label: "Market entry considerations",
          children: [
            { label: "Startup/construction costs - build vs. buy?" },
            { label: "Marketing needs/launch strategy" },
            {
              label: "Client fit for expansion in new region",
              children: [{ label: "Construction and property mgmt. relationships" }],
            },
            {
              label: "Barriers to entry",
              children: [{ label: "Regulation" }, { label: "Access to financing" }],
            },
            { label: "Time to breakeven" },
          ],
        },
        {
          label: "Profitability (North vs. South) = R - C",
          children: [
            {
              label: "Revenue",
              children: [
                {
                  label: "Rent",
                  children: [
                    { label: "# of units" },
                    { label: "Occupancy rate" },
                    { label: "# of bldgs. and regions" },
                  ],
                },
                { label: "Utilities, if managed by building co." },
                { label: "Premium for amenities, if any" },
                { label: "Retail revenue, if applicable" },
                { label: "Building maintenance fees" },
              ],
            },
            {
              label: "Costs",
              children: [
                {
                  label: "Fixed costs",
                  children: [
                    { label: "Property management contract/labor" },
                    { label: "Amenities" },
                    { label: "Admin and marketing" },
                    { label: "Lease and property taxes" },
                    { label: "Maintenance (bldg.-wide i.e. HVAC)" },
                    { label: "Building-wide utilities" },
                  ],
                },
                {
                  label: "Variable costs",
                  children: [
                    { label: "Maintenance (i.e. per unit wear and tear costs)" },
                    { label: "Utilities (per unit)" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    n: "03",
    label: "Math Questions",
    title: "Math Questions",
    kind: "qa",
    qText:
      "1. Which region generates more profit per building in the short-term? In the long-term?\n2. How do the profit margins compare between the regions?",
    guidancePreLabel: "Information to provide to candidate",
    guidancePreLines: [
      "**Occupancy rates**",
      "  Occupancy rates for new complexes typically start around 90%. Over time, they have tended to settle out around 80%. The pilot building in Chicago is still seeing a 90% occupancy rate.",
    ],
    dataTableFootnote: "Note: Maintenance costs/unit are incurred regardless of occupancy.",
    dataTableCols: "1.6fr 1fr 1fr",
    dataTableHeaders: [hd("Per Building, Per Month"), hd("South", "center"), hd("North", "center")],
    dataTableRows: [
      { cells: [L("Units/Building"), R("800"), R("400")] },
      { cells: [L("Rent revenue/Unit"), R("$500"), R("$1000")] },
      { cells: [L("Maintenance costs/Unit"), R("$125"), R("$200")] },
      { cells: [L("Amenities"), R("$48,000"), R("$56,000")] },
      { cells: [L("Utilities"), R("$38,000"), R("$45,000")] },
      { cells: [L("SG&A"), R("$80,000"), R("$64,000")] },
      { cells: [L("Medical Facility"), R("$0"), R("$55,000")] },
    ],
    calcTable: {
      title: "Math Solution",
      headers: ["", "South", ""],
      rows: [
        ["Occupancy", "80% (current buildings)", "90% (given expansion, first couple years)"],
        ["Revenues per month = rent * # units * occupancy rate", "$500 * 800 * 80%", "$500 * 800 * 90%"],
        ["", "= 320K", "= 360K"],
        ["Costs per month = FC + VC", "48K + 38K + 80K + (125 * 800) = 166K + 100K", ""],
        ["", "= 266K", ""],
        ["Profit per month = R - C", "320K – 266K", "360K – 266K"],
        ["", "= 54K", "= 94K"],
        ["Profit margin = Profit/R", "54/320 = 27/160", "94/360 = 47/180"],
        ["", "(long divide)", "(long divide)"],
        ["", "= ==16.875%==", "= ==26.11%=="],
      ],
    },
    calcTables: [{
      headers: ["", "North", ""],
      rows: [
        ["Occupancy", "80% (if rate falls to match Southern trend)", "90% (current pilot rate)"],
        ["Revenues per month = rent * # units * occupancy rate", "$400 * 1000 * 80%", "$400 * 1000 * 90%"],
        ["", "= 320K", "= 360K"],
        ["Costs per month = FC + VC", "56K + 45K + 64K + 55K + (200 * 400) = 220K + 80K", ""],
        ["", "= 300K", ""],
        ["Profit per month = R - C", "320K - 300k", "360K – 300K"],
        ["", "= 20K", "= 60K"],
        ["Profit margin = Profit/R", "20/320 = 1/16", "60/360 = 1/6"],
        ["", "(half of 1/8)", ""],
        ["", "= ==6.25%==", "= ==16.67%=="],
      ],
    }],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "To challenge candidate, **don't provide** units per building figure until candidate requests it.",
      "If needed, **prompt** candidates to compare profit margins in addition to profits per building.",
      "Candidates may want to round – however, in this case, rounding may affect their answer. **Request** that the candidate complete the calculations **without rounding**.",
      "**Sample Takeaways**",
      "  Profit margins in the South are higher across the board.",
      "  Profitability in the first couple years after an expansion, when occupancy rates are 90% in both the North and South, is significantly higher in the South.",
      "  If the North's 90% occupancy rate holds, profitability per building would be commensurate with the South in the long run -- could provide good diversification benefit for company.",
      "  Occupancy trend in pilot building should be monitored.",
      "  Potential to add medical facilities in Southern buildings, given demonstrated willingness to pay for those services in the North.",
    ],
  },
  {
    n: "04",
    label: "Brainstorm Question",
    title: "Brainstorm Question",
    kind: "qa",
    qText: "What are the benefits and risks to entering the market in the North?",
    infoBoxLabel: "Sample Brainstorm Structure",
    infoSections: [
      {
        label: "Market share",
        groups: [
          { heading: "Benefits", items: ["First mover advantage in the North given low competition levels"] },
          { heading: "Risks", items: ["High level of fragmentation may be function of underlying fundamentals or regulatory barriers"] },
        ],
      },
      {
        label: "Profitability",
        groups: [
          {
            heading: "Benefits",
            items: [
              "Potentially higher occupancy rates",
              "Higher proven willingness to pay for amenities",
              "Diversification benefit for company as a whole, in the event of regional recessions",
            ],
          },
          {
            heading: "Risks",
            items: [
              "Uncertainty on occupancy trends",
              "Higher willingness to pay / occupancy may be impacted more in a recession",
              "Costs may increase disproportionately over time (minimum wage laws, taxes)",
              "Opportunity cost from tying up capital in North instead of Southern expansion / medical facility expansion",
              "Startup cost overruns",
            ],
          },
        ],
      },
      {
        label: "Operations",
        groups: [
          { heading: "Benefits", items: ["New build allows for updated amenities, adoption of best practices"] },
          { heading: "Risks", items: ["Uncertainty on new build timelines, zoning, licensing, subcontract relationships, etc."] },
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Request for Recommendation",
    title: "Request for Recommendation",
    kind: "qa",
    qText: "What is the recommendation for the client?",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "Recommendation",
        paragraphs: [
          "Build out market entry plan in the North to obtain first mover advantage, pilot medical facility renovation in the South",
        ],
        lines: [
          "Profit margin is equivalent in new Northern market (ST) as established Southern market (LT) at ==~16.8%==",
          "High customer WTP for amenities, such as a medical facility, indicates market opportunity for upgrades in current facilities and inclusion in any new Southern expansion; high profit margin for new Southern expansion allows for such facility upgrades",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Drop in occupancy rates in North",
          "Startup costs in Northern expansion",
          "Cost of medical facility renovation",
          "No interest and / or capability to pay for medical facilities in South",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Conduct market survey for occupancy benchmarks in North",
          "Negotiate long-term contracts with contractors",
          "Price out medical facility renovation",
          "Survey residents in Southern facilities for interest in medical facility",
        ],
      },
    ],
  },
];
