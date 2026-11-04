import type { CasePage } from "../content";

export const CASE_ID = "146a8360-cd72-42e7-90d5-cd4738f86615";

const PROMPT =
  "Your client is Big Wheel Bike Share and they operate bike sharing services in two major cities, Washington DC and Chicago. Their bike sharing business is self-service, where they have stations across each city with a number of bikes docked and customers simply pay at the station kiosk to rent bikes. They operate as a monopoly in both Washington DC and Chicago. The management believes that their operation in Washington DC is more profitable. Our objective is to determine:\n1) Is the management right that Washington DC is more profitable than Chicago?\n2) If so, why?\n3) How can Big Wheel improve their overall profitability?";

const INK = "#1f2421";
const L = (v: string) => ({ v, align: "left" as const, w: 700, fg: INK });
const C = (v: string, w = 400, bg?: string) => ({ v, align: "center" as const, w, fg: INK, ...(bg ? { bg } : {}) });
const YEL = "#ffff00";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A self-service bike share operating in two cities believes its Washington DC business is more profitable than Chicago. Compare revenue and cost drivers, and recommend how to improve overall profitability.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "profitability", "mental-math", "transportation"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewee-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewee-led case. The interviewee should customize their approach to analyze the revenue model for a bike sharing business and relevant cost drivers. The interviewee should also recognize that while Big Wheel is a monopoly, there are competition from other modes of transportation (e.g. public transit, driving, etc.)",
          "Typical framework: Revenue/Cost for DC and Chicago, External Competition, Growth Strategies",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Step 1: Revenue Model",
    title: "Step 1: Revenue Model",
    kind: "qa",
    guidancePreLines: [
      "If the interviewee does not think about this right away, have them brainstorm how a bike sharing service makes money.",
    ],
    infoSections: [
      { label: "Big Wheel Bikeshare Fares", lines: ["Annual subscription - $70 / year", "Daily rate - $10 / day (unlimited for 24 hours, 1 day pass = 1 ride)"] },
      { label: "Washington DC", lines: ["200K annual subscribers and each person rents 10 rides a year", "1M rides a year from daily rentals"] },
      { label: "Chicago", lines: ["600K annual subscribers and each person rents 5 rides a year", "1M rides a year from daily rentals"] },
    ],
    dataTableCols: "0.7fr 1.2fr 1.2fr 0.5fr 2.3fr",
    dataTableHeaders: [
      { v: "", align: "left" },
      { v: "Subs Revenue", align: "center" },
      { v: "Day Pass Revenue", align: "center" },
      { v: "Total", align: "center" },
      { v: "Revenue / Ride", align: "center" },
    ],
    dataTableRows: [
      { cells: [L("DC"), C("($70 * 200K) = $14M"), C("($10 * 1M) = $10M"), C("$24M"), C("$24M / (200K * 10 + 1M) = $8")] },
      { cells: [L("Chicago"), C("($70 * 600K) = $42M"), C("($10 * 1M) = $10M"), C("$52M"), C("$52M / (600K * 5 + 1M) = $13")] },
    ],
    guidanceLines: ["**Takeaway:** Chicago makes more revenue in total and on a per-ride basis."],
  },
  {
    n: "03",
    label: "Step 2: Cost Drivers",
    title: "Step 2: Cost Drivers",
    kind: "qa",
    guidancePreLines: [
      "If the interviewee does not move to cost drivers after revenue, ask them about the other side of profitability and begin brainstorming about potential costs.",
      "Give interviewees **the percentages** and have them do quick math",
    ],
    dataTableCols: "1.8fr 0.8fr 0.7fr 1.2fr 0.7fr",
    dataTableHeaders: [
      { v: "", align: "left" },
      { v: "Chicago", align: "center" },
      { v: "", align: "center" },
      { v: "Washington DC", align: "center" },
      { v: "", align: "center" },
    ],
    dataTableRows: [
      { cells: [L("Bike Depreciation"), C("$13M"), C("26%", 700), C("$5M"), C("25%", 700)] },
      { cells: [L("Rebalancing Inventory"), C("$16M"), C("32%", 700, YEL), C("$5M"), C("25%", 700, YEL)] },
      { cells: [L("Bike Maintenance"), C("$8M"), C("16%", 700), C("$3M"), C("15%", 700)] },
      { cells: [L("Station Cost"), C("$8M"), C("16%", 700), C("$4M"), C("20%", 700)] },
      { cells: [L("SG&A"), C("$10M"), C("10%", 700), C("$3M"), C("15%", 700)] },
      { cells: [L(""), C("$50M", 700), C(""), C("$20M", 700), C("")] },
      { cells: [L("Revenue from previous section"), C("$52M"), C(""), C("$24M"), C("")] },
      { cells: [L("Profitability"), C("$2M", 700), C(""), C("$4M", 700), C("")] },
    ],
    calcLines: [
      { q: "Profit per ride", a: "Chicago: ==$0.5== = ($2M / 4M rides); Washington DC: ==$1.33== = ($4M / 3M rides)" },
    ],
    guidanceLines: [
      "**Takeaway:** Yes, the management was correct that Washington DC was more profitable. This is primarily driven by the lower cost of rebalancing inventory (moving bikes between stations).",
    ],
  },
  {
    n: "04",
    label: "Step 3: Competition Brainstorming",
    title: "Step 3: Competition Brainstorming",
    kind: "qa",
    guidancePreLines: [
      "If the interviewee does not think about this right away, have them brainstorm other modes of transportation in a big city.",
    ],
    guidanceLines: ["Public transportation, Driving, Carpooling, Ferry, Walking, On-Demand Ride Services"],
  },
  {
    n: "05",
    label: "Step 4: Growth Strategy Recommendations",
    title: "Step 4: Growth Strategy Recommendations",
    kind: "qa",
    guidancePreLines: ["The interviewee can be creative here. For example:"],
    guidanceLines: [
      "Target health-conscious commuters",
      "Promotions based on the number of miles biked a year",
      "Further tiered pricing",
      "Reduce rebalancing cost by using analytics to optimize the number of bikes at each station",
      "Corporate discounts",
    ],
  },
];
