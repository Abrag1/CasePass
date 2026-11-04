import type { CasePage } from "../content";

export const CASE_ID = "532301e0-7b4c-4127-af5c-d38793f128f3";

const PROMPT =
  "Your client is the owner of a regional chain of convenience stores operating in the United States. It is an election year, and one of the leading candidates is a divisive personality. Those who approve of the candidate do so with gusto, and often display clothing and signs indicating their support. Those who disapprove of him oppose him strongly, and will often go to great lengths to ensure they are not mistaken for supporters of his campaign. Should the convenience store owner sell merchandise relating to this candidate's campaign in her stores?";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "The owner of a regional convenience store chain is deciding whether to sell merchandise for a divisive election candidate. Evaluate the profit potential, compare it with the stores' existing product mix, and weigh the other factors.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "profitability", "retail", "exhibit-heavy", "brainstorming"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question: How would you evaluate the current strategy of your previous employer?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Information to provide if asked",
        lines: [
          "Merchandise would include T Shirts, hats, flags, lawn signs, mugs and bumper stickers. This merchandise would be visually distinctive and eye-catching. Shoppers would be sure to notice the addition of this merchandise in these convenience stores.",
          "The client operates across 25 locations across five states in the midwestern US and would launch across all stores.",
          "The store locations fall in a variety of political districts, some of which lean towards or against the candidate in question.",
          "The owner would like to make this decision based on profitability, but would like to know what other factors should be considered as well.",
          "There are six months remaining before election day, and we can assume none of this merchandise will be sold after that point.",
        ],
      },
      {
        label: "Case Overview [Candidate-led]",
        lines: [
          "The candidate should drive to a profitability calculation of the campaign merchandise, benchmark this against current store performance by category and identify that regardless of the decision made on campaign merch that the store has an opportunity to improve its performance by eliminating trucker supplies. The campaign merchandise is one possible substitute, but the candidate should advise investigating (and may brainstorm) other moneymaking opportunities for the store.",
        ],
      },
      {
        label: "Structure: Intervewer guidance",
        paragraphs: ["Guidance for Interviewer:"],
        lines: [
          "A successful structure will evaluate the potential profits of launching this line of products (potential revenue minus upfront and ongoing costs) and attempt to compare them to the opportunity cost of doing so (how would those profits compare to the profits of the stores' existing product mix).",
          "Excellent structures will consider the cost/risk of alienating customers opposed to this candidate, and what to do with unsold inventory after the election.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Profitability",
    title: "Profitability",
    kind: "qa",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreIntro: "As candidate asks, provide the following information:",
    guidancePreLines: [
      "The campaign will involve hats, shirts, flags, mugs, lawn signs and bumper stickers.",
      "The campaign will last for six months until the end of election season.",
      "There are 25 stores in the client's portfolio.",
      "Fixed Costs: Launching this campaign would involve a one time setup fee of $19,000 and monthly licensing fees of $1000.",
      "Pricing, Cost of Goods and Volume per month per store have been forecast below:",
      "  Pricing:",
      "    Hats and Shirts-$20",
      "    Flags, Mugs and Signs-$15",
      "    Bumper Stickers: $5",
      "  Cost of Goods:",
      "    Hats: $12",
      "    Shirts and Mugs: $10",
      "    Flags and Signs-$5",
      "    Bumper Stickers: $0.50",
      "  Volume per month per store:",
      "    Hats: 50",
      "    Shirts: 30",
      "    Flags: 15",
      "    Mugs: 30",
      "    Signs: 10",
      "    Stickers: 100",
    ],
    infoBoxLabel: "Profitability",
    infoSections: [
      {
        paragraphs: [
          "The candidate should evaluate the potential dollar profits and profit margin of launching this line. To do this, the candidate will have to calculate revenue, fixed and variable costs.",
        ],
      },
    ],
    calcNote: "Calculations",
    calcTable: {
      headers: ["", "PRICE", "COST", "PRICE-COST", "VOLUME PER MONTH PER STORE", "Gross Margin Per Store Per Month"],
      rows: [
        ["Hats", "$20.00", "$12.00", "$8.00", "50", "$400.00"],
        ["Shirts", "$20.00", "$10.00", "$10.00", "30", "$300.00"],
        ["Flags", "$15.00", "$5.00", "$10.00", "15", "$150.00"],
        ["Mugs", "$15.00", "$10.00", "$5.00", "30", "$150.00"],
        ["Signs", "$15.00", "$5.00", "$10.00", "10", "$100.00"],
        ["Stickers", "$5.00", "$0.50", "$4.50", "100", "$450.00"],
      ],
    },
    calcTables: [
      {
        title: "Total Revenue",
        headers: ["", "PRICE", "VOLUME", ""],
        rows: [
          ["Hats", "$20.00", "50", "$1,000.00"],
          ["Shirts", "$20.00", "30", "$600.00"],
          ["Flags", "$15.00", "15", "$225.00"],
          ["Mugs", "$15.00", "30", "$450.00"],
          ["Signs", "$15.00", "10", "$150.00"],
          ["Stickers", "$5.00", "100", "$500.00"],
          ["", "", "", "2925"],
          ["", "Stores", "", "25"],
          ["", "Months", "", "6"],
          ["", "Total Revenue", "", "$438,750.00"],
        ],
        totalLast: true,
      },
      {
        headers: ["", ""],
        rows: [
          ["Profit per store per month", "$1,550.00"],
          ["Number of stores", "25"],
          ["Total monthly profit", "$38,750.00"],
          ["Months remaining", "6"],
          ["Total Gross Profit of campaign", "$232,500.00"],
          ["Initial setup fee", "$19,000.00"],
          ["Monthly licensing fee (6x1000)", "1000"],
          ["Total Profit of Campaign", "$212,500.00"],
          ["Profit Margin", "0.484330484"],
        ],
      },
    ],
    guidanceLabel: "If they ask, candidate may be given permission to round as appropriate",
    guidanceLines: [
      "$1500 gross profit per store per month",
      "$40,000 total gross profit per month",
      "$225,000 total gross profit across campaign",
      "**$200,000 total profit potential of campaign.**",
      "$450,000 Total Revenue",
      "**45-50% Profit Margin**",
      "**The important takeaway is that the total profit potential of selling this merchandise for six months is roughly $200,000 at around a 45-50% profit margin, and in order to know if this is good or bad it must be compared to the potential profits of not selling this merchandise.**",
    ],
  },
  {
    n: "03",
    label: "Opportunity Cost",
    title: "Opportunity Cost",
    kind: "qa",
    guidancePreLabel: "Opportunity Cost",
    guidancePreLines: [
      "Candidate should seek to benchmark the ~$200,000 profit potential of the merchandise campaign against the profits of not selling this merchandise at all. Prompt the candidate to inquire how s/he would go about figuring that out, and guide towards an analysis of current performance of product categories in the convenience store. **Show Exhibits 1 and 2.**",
    ],
    extraCharts: [
      {
        kind: "combo",
        title: "Revenue by Product Category",
        titleBold: true,
        titleSerif: true,
        titleAlign: "center",
        titleSize: 24,
        serif: true,
        categories: ["2014", "2016"],
        lines: [
          { name: "Beverages", color: "#b01c1c", width: 6, values: [1850, 2000] },
          { name: "Candy and Snacks", color: "#4f4f57", width: 6, values: [1500, 1500] },
          { name: "Tobacco Products", color: "#a59f92", width: 6, values: [1200, 1150] },
          { name: "Other Merchandise", color: "#f09a9a", width: 6, values: [800, 1000] },
          { name: "Trucker Supplies", color: "#7d7468", width: 6, values: [800, 400] },
        ],
        yMin: 0,
        yMax: 2500,
        yStep: 500,
        yLabel: "Revenue (in 1000s of $)",
        yGrid: true,
        axisStyle: "none",
        xPlacement: "between",
        legend: "bottom",
        xTitle: "Axis Title",
        fontScale: 1.4,
        plotAspect: 0.37,
        legendNoWrap: true,
        lightBaseline: true,
      },
      {
        kind: "combo",
        title: "Profit Margin by Product Category",
        titleSerif: true,
        titleAlign: "center",
        titleSize: 29,
        fontScale: 1.75,
        plotAspect: 0.52,
        lightBaseline: true,
        serif: true,
        categories: ["Beverages", "Candy and\nSnacks", "Tobacco\nProducts", "Other\nMerchandise", "Trucker Supplies"],
        bars: { name: "Profit Margin", color: "#b01c1c", values: [40, 30, 20, 10, 20] },
        yMin: 0,
        yMax: 45,
        yStep: 5,
        yTickSuffix: "%",
        yGrid: true,
        axisStyle: "none",
        legend: "none",
      },
    ],
    guidanceLabel: "Exhibit Analysis: Interviewer Guidance",
    guidanceLines: [
      "The candidate should realize that Trucker Supplies are a dog. The category will generate only as much revenue over the next six months as the entire forecast profit of the campaign materials and at a significantly lower profit margin. Additionally, sales of Trucker Supplies have been trending downward for two years. The store may be advised to reallocate shelf space currently occupied by Trucker Supplies. Great candidates will come to this conclusion AND realize that campaign merchandise is only one option to do this, and will drive towards the brainstorm.",
    ],
  },
  {
    n: "04",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    guidancePreLabel: "Brainstorm",
    guidancePreLines: [
      "Have the candidate brainstorm risks and benefits of replacing trucker supplies with the candidate's promotional merchandise. Good candidates will not get locked into the idea of selling candidate merch, and will seek out other opportunities to replace shelf space dedicated to trucker supplies. If the candidate does not point this out him/herself, guide the candidate to  do a second brainstorm other options besides candidate merchandise.",
    ],
    infoBoxLabel: "Possible Brainstorm Structure",
    infoSections: [
      {
        label: "Candidate Merch",
        groups: [
          {
            heading: "Risks",
            items: [
              "Alienate user base who does not support candidate and lose future business",
              "Left with unsold merchandise after campaign ends",
            ],
          },
          {
            heading: "Benefits",
            items: ["Immediately see higher profits by replacing trucker gear", "Gain loyalty from supporters of the candidate"],
          },
        ],
      },
      {
        label: "Other Possibilities",
        lines: [
          "Survey truckers to see why sales are declining-can that business return?",
          "Increase shelf space for high margin popular candy and snacks",
          "Rotating seasonal merchandise-beach gear, winter hats, etc.",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidanceLabel: "Intervewer guidance",
    guidanceLines: [
      "Candidate can go in either direction, and should take into account risks listed in brainstorm if moving forward with campaign merchandise. Recommendation should be based on data. Next steps could be to evaluate profitability of selling multiple candidates' swag, cost/benefit analysis of lost business from those who dislike the candidate versus gained business from his fans. No matter what, the candidate should advise moving away from trucker supplies and finding a better long term product category for that shelf space.",
    ],
  },
];
