import type { CasePage } from "../content";

export const CASE_ID = "516d749c-d36b-4175-8e3d-fc637ee69389";

const PROMPT =
  "Your client is an ice cream truck, operating out of a flea market in Houston, Texas. They’re facing a variety of issues currently and are looking for help in determining a sustainable operating model and go-forward strategy. They have a variety of questions they are hoping you are able to address.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "An ice cream truck at a Houston flea market needs a sustainable operating model. Work through its financial drivers, contribution margin, the customer mix needed to hit a revenue target and tactics to raise profit.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "brainstorming", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question. Spend 15 Minutes on: Tell me about the last time you admitted an error or mistake to your boss, client, or colleague",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewer-led case, similar to EY OTS style. There are four questions to be asked sequentially during the course of the interview:",
        ],
        lines: [
          "**Question 1:** What are drivers that could effect the financial position of this enterprise?",
          "**Question 2:** What is the gross contribution margin?",
          "**Question 3:** Assuming all factors stay the same (25 total customers/day, days/mo, mo/yr, price/scoop), how many people must order double ice cream cones/day to reach $20K in annual revenue?",
          "**Question 4**: What are some tactics the ice cream stand can introduce to increase its profit?",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "What are drivers that could effect the financial position of this enterprise?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: ["Have the interviewee brainstorm potential drivers. Some examples include:"],
    infoBoxLabel: "Examples",
    infoSections: [
      { label: "Revenue", lines: ["Prices", "Volume", "Mix of products", "Seasonality"] },
      {
        label: "Costs",
        lines: [
          "Variable Costs",
          "  COGS",
          "  Labor",
          "Fixed Costs",
          "  Insurance",
          "  Utilities",
          "  Rent",
          "  Depreciation",
          "  Repairs/Maintenance",
          "  SG&A",
          "  Tax",
          "  Interest",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "What is the annual gross contribution margin?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: ["Provide the following information (note that this includes extraneous information):"],
    infoBoxLabel: "Information to provide",
    infoSections: [
      {
        label: "Revenue",
        lines: [
          "They sell two products (Single/Double Scoop ice cream cones)",
          "  Single Scoop cones are priced at $4.00",
          "  Double Scoop cones are priced at $7.00",
          "There are 25 customers per day, of whom 15 buy Single Scoop and 10 buy Double Scoop cones",
          "The stand is open 30 days a month for 4 months a year",
        ],
      },
      {
        label: "Costs",
        lines: [
          "There are two line-level employees scooping ice cream at $8.00 per hour (for an 8-hour day, each working 4 hours) and there is a manager that is salaried at $10.00 per hour",
          "COGS is 50%",
          "The truck lease costs $1K to lease per month",
          "Insurance is $3K per year",
          "Tax is 20%",
        ],
      },
    ],
    guidanceLabel: "Annual Gross Contribution Margin:",
    guidanceLines: [
      "**Revenue**: ==$15,600==",
      "**Variable Costs**: ==$15,480== (hint: the manager is counted in SG&A and all other expenses are fixed)",
      "**Gross Margin:** ==$120==",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "Assuming all factors stay the same (25 total customers/day, 30 days/month, 4 months/year, price/scoop), how many people must order double ice cream cones/day to reach at least $20K in annual revenue?",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: [
          "Interviewee may solve this either algebraically, setting the total revenue = $20,000 and attempting to calculate the mix, or back into it by another method. A sample method used is found below:",
          "First, we checked to see if the target of $20K was viable. We assumed that all customers ordered Double Scoops only – 25 people ordered per day, at a rate of 30 days/month, for 4 months/year at a price of $7.00 per cone. This yielded $21K in potential revenue.",
          "We then took the surplus above the target goal of $20K, which happened to be $1K, and divided that by the # of days/month, the # of months/year, and the price for a single scoop ice cream cone at $4.00. This gave me the solution that a minimum of 2.08 customers would have to order a Single Scoop a day to hit $20K exactly.",
          "Since the # of consumers are integers, we would need to round down to 2 customers/day purchasing single scoop cones. This means that **23 people/day must order Double Scoop ice cream cones in order to make >$20K a year in revenue**.",
          "Total revenue assuming this customer mix/year = $20,280",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText: "What are some tactics the ice cream truck can introduce to increase its profits?",
    guidancePreLabel: "Approach / Analysis",
    guidancePreLines: [
      "The interviewee is free to brainstorm here as best they can (recommend that they create a mini-structure to guide their thoughts)",
    ],
    infoBoxLabel: "Examples of profitability drivers include:",
    infoSections: [
      {
        lines: [
          "Change in mix of customers/products to focus on high-profit areas",
          "Expand into different seasons/locations dependent on projected customer volume",
          "Franchise the truck to reduce operational burden while receiving risk-free cash (disadvantage is lack of control of brand name)",
          "New product introduction (different flavor, cones, toppings)",
        ],
      },
    ],
  },
];
