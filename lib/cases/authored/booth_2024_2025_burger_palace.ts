import type { CasePage } from "../content";

export const CASE_ID = "9ec77583-09b3-4a7b-a678-ea501901d882";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A Chicago area fast food chain has been approached by Midway Airport about opening a new location in the main terminal. Advise whether it would be a profitable venture.",
  full_prompt:
    "Our client is Burger Palace, a Chicago area fast food restaurant with 20 locations. They have been approached by Midway Airport about opening a new location inside the main terminal.\n\nThey have asked us to come to a meeting with their CEO and tell them if we think this would be a profitable venture. How would you structure your approach to this question?",
  tags: ["candidate-driven", "market-entry", "market-sizing", "breakeven", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client is Burger Palace, a Chicago area fast food restaurant with 20 locations. They have been approached by Midway Airport about opening a new location inside the main terminal.\n\nThey have asked us to come to a meeting with their CEO and tell them if we think this would be a profitable venture. How would you structure your approach to this question?",
    note: "**Fit Questions** — 1. Tell me about your most rewarding professional accomplishment. 2. Tell me about your most difficult professional challenge.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "The primary objective is for the new restaurant to be ==profitable==; Burger Palace's management will move ahead if it is. They would like to act as quickly as possible.",
          "This is a straightforward profitability case that is good practice for a candidate to **drive a case**. The interviewer should not need to provide much guidance or prodding throughout the case.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Discussion/Q&A" },
          { n: "3", text: "Profitability analysis" },
          { n: "4", text: "Final recommendation" },
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
    guidancePreIntro:
      "Provide the candidate with the information below **when it is requested**. Push the candidate to think about **specific ways to estimate revenue, costs, and profits** at Burger Palace. Don't simply disclose information if asked general questions about expected revenue, costs, or profits.",
    guidancePreLines: [
      "**Burger Palace**",
      "  Information has not been provided about other Burger Palace locations, although we do have some comparable revenue/cost information:",
      "  The average transaction size is ==$10==.",
      "  Variable costs are approximately ==80%== of sales revenue.",
      "  Fixed costs will include:",
      "    ==$200,000== in annual rent and fixed operating costs (includes the initial construction of the new restaurant).",
      "    ==$80,000== as an annual royalty fee to Midway Airport.",
      "**Competition**",
      "  There are currently ==7== restaurants at Midway.  They each have an equal market share.",
      "  If Burger Palace were to open a restaurant, we expect that each of the ==8== restaurants would then gain an equal market share.",
      "  We do not expect the number of total customers to increase because of the new Burger Palace location.",
      "  We don't know anything about the types of restaurants currently at Midway.",
      "**Sales Volume at Midway**",
      "  Let the candidate structure their own approach and ask for all of the following information. If needed, **prompt** with, \"How would you estimate the number of customers that Burger Palace would have at Midway airport?\"",
      "**Passengers**",
      "  Hours/dates of operation: 6am – 10pm",
      "  Day open per year: ==350== days",
      "  Gates at Midway: ==25==",
      "  Average planes per hour: ==1== per hour per gate",
      "  Average plane size: ==175== passengers",
      "  Average load factor: ==80%== (number of seats filled on average)",
      "  Passengers who will eat each day: ==5%== of passengers will eat at Midway",
      "**Employees**",
      "  Number of employees: ==2,000==",
      "  Employees who will eat each day: ==60%== of employees will eat at Midway",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: ["**Working hypothesis:** Burger Palace should open the new restaurant in Midway."],
      },
      {
        label: "Profitability: Will the new restaurant be profitable?",
        groups: [
          {
            heading: "Expected revenue",
            items: [
              "Volume of sales – estimate by looking at expected customers",
              "Average revenue per sale – estimate by looking at avg. tickets at other Burger Palaces, customer research at Midway, or avg. ticket of similar restaurants in airport",
            ],
          },
          {
            heading: "Expected costs",
            items: [
              "Fixed costs – rent, food preparation equipment, operating expenses, salaried labor, royalty fees to Midway airport, advertising",
              "Variable costs – hourly labor, ingredients (burger patties, buns, and fries), utilities",
            ],
          },
        ],
      },
      {
        label: "Market: Will the new restaurant succeed in the airport food market?",
        groups: [
          {
            heading: "Primary Competitors",
            items: [
              "Are the other restaurants similar in cuisine/style?",
              "Would the other restaurants respond to the Burger Palace opening?",
            ],
          },
          {
            heading: "Customer Profile",
            items: [
              "Major customer groups: passengers and employees",
              "Would customers respond positively to the healthiness of the food, speed of service, price, etc.?",
            ],
          },
        ],
      },
      {
        label: "Risks: What other factors should Burger Palace consider?",
        lines: [
          "Execution – would Burger Palace be able to successfully open and run the restaurant, given that it's their first airport location?",
          "Strategy fit - How does this potential airport location fit into Burger Palace's broader business strategy? (e.g., expand reach, target new customer segments)",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidates will take a variety of approaches to structuring an approach to this question. The primary things to look for are:",
      "**Did the candidate state a hypothesis?**",
      "  The candidate should express the core idea that they would like to test through their analysis. They should clearly demonstrate how the questions they're asking are directed at answering the specific question of whether Burger Palace should open a new restaurant.",
      "  It's less important for the hypothesis to be backed up with evidence, since it's so early in the case (though strong candidates will draw on their own knowledge and intuitions to develop preliminary insights about the potential for this new restaurant).",
      "**Is profitability the primary consideration?**",
      "  The prompt is very clear that profitability is the deciding factor for management. It's OK for candidates to discuss other considerations, but their primary focus should be on profitability.",
      "**Is the framework case-specific?**",
      "  Excellent frameworks will explore specific aspects of the Midway fast food market, rather than just generic ideas about new market entry.",
    ],
  },
  {
    n: "03",
    label: "Calculations",
    title: "Calculations",
    kind: "qa",
    calcLines: [
      {
        q: "Number of Passengers",
        stack: true,
        a: "25 gates x 1 plane/hr. x 16 hrs./day = ==400== planes/day\n175 capacity/plane x 80% avg load factor = ==140== pax/plane\n400 planes/day x 140 passengers/plane = ==56,000== pax/day\n56,000 pax/day x 1/8 BP market share x 5% eat each day = ==350== pax/day at Burger Palace (note math shortcut that 56k/8=7k)",
      },
      {
        q: "Contribution from Passengers",
        stack: true,
        a: "350 pax/day x $10 avg spend x 20% profit margin = ==$700== profit/day (excl. FC)\n$700 profit/day x 350 days/year = ==$245,000== profit/year (excl. FC)",
      },
      {
        q: "Number of Employees",
        stack: true,
        a: "2,000 employees x 1/8 BP market share x 60% eat per day = ==150== employees/day at BP",
      },
      {
        q: "Contribution from Employees",
        stack: true,
        a: "150 employees/day x $10 avg transaction size x 20% profit margin = ==$300== profit/day (excl. FC)\n$300 profit/day x 350 days/year = ==$105,000== profit/year (excl. FC)",
      },
      {
        q: "Annual Profit",
        stack: true,
        a: "$245,000 passenger profit + $105,000 employee profit = ==$350,000== total annual profit (excl. FC)\n$350,000 - $280,000 annual fixed costs = ==$70,000== total annual profit",
      },
    ],
    infoBoxLabel: "A strong candidate will identify and use math shortcuts",
    infoSections: [
      {
        lines: [
          "Use contribution margin directly instead of revenue and variable costs separately (i.e. using $2 CM in one step rather than using $10 revenue and $8 costs in two steps).",
          "Add the 350 passengers and 150 employees to a 500 customer total before computing revenues and profits.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Some interviewees will have trouble starting the market sizing and may need a little nudge to begin thinking in that manner. That is OK--it isn't about whether or not they can read the interviewer's mind--it's about how logically they think about the problem as they go. Do they make realistic assumptions about how many people are on a plane? Do they account for the fact that the planes won't all be full?",
      "Most interviewees will miss that customers will include both passengers and Midway Airport employees. If so, let the candidate go through calculations for passengers only, then **ask**, \"Would anyone else be eating at Burger Palace?\" Finally, proceed to the second calculation.",
    ],
  },
  {
    n: "04",
    label: "Brainstorming: Optional",
    title: "Brainstorming: Optional",
    kind: "qa",
    qText:
      "After the candidate has identified ==$70 K== in annual expected profit, **ask**, \"What are other factors that should be considered when opening a new restaurant at Midway Airport?\"",
    infoBoxLabel: "Potential Answers",
    infoSections: [
      {
        label: "Internal Factors",
        lines: ["Implementation & execution", "Staffing the new location", "Brand effects for Burger Palace", "Advertising & marketing"],
      },
      {
        label: "External Factors",
        lines: [
          "Competitive response within Midway",
          "Assumption about Burger Palace receiving 1/8 market share",
          "Customer preferences",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Math Extension: Optional",
    title: "Math Extension: Optional",
    kind: "qa",
    qText:
      "If the candidate identifies market share as a risk and has performed well on the math, **ask**, \"You mentioned that Burger Palace may not be able to achieve 1/8 market share. What is the minimum market share that Burger Palace would need to break even?\"",
    guidancePreLines: [
      "The candidate should **assume** that the average transaction size is the same at other restaurants at Midway ($10).",
    ],
    infoBoxLabel: "Math Extension",
    infoSections: [
      {
        label: "Breakeven occurs when:",
        lines: [
          "Annual Costs = Annual Revenue (i.e. Profit = 0)",
          "Annual Costs = $280k + Annual Revenues x 80% variable costs",
          "Therefore, breakeven occurs when: ==$280k = Annual Revenue x 20%==",
          "  Note: this could be calculated directly from the alternative approach, breakeven occurs when: Fixed Costs = Revenue * % Contribution Margin",
        ],
      },
      {
        label: "Market Size:",
        lines: [
          "Annual Revenue = Market Share x Market Size",
          "  Market Share is unknown; Market Size is known",
          "Market Size = (# pax/day + # employees/day) x Avg. Transaction x 350 days",
          "Market Size = (56,000 x 5% + 2,000 x 60%) x $10 x 350 days",
          "Market Size = (2,800 + 1,200) x $3,500 = ==$14M==",
        ],
      },
      {
        label: "Combining these two sections:",
        lines: [
          "$280k = Annual Revenue x 20% = Market Share x Market Size x 20%",
          "$280k = $14M x Market Share x 20%",
          "Market Share = $280k/$2.8M = ==10%==",
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: [
          "A new Burger Palace location inside Midway Airport would be **profitable**, so Burger Palace should **open the new restaurant**",
        ],
        lines: [
          "The new restaurant should expect ==$70,000== total annual profit",
          "We expect Burger Palace to receive ==12.5%== market share, although they would break even at only ==10%==",
        ],
      },
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "Change in market share",
              "  We assumed we would split market share with the other Midway restaurants. Is this completely realistic?",
              "  Do we need to look deeper into what other/similar types of food are present at Midway and where they are located?",
              "Increase in costs or Midway Airport royalty payment",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Conduct market assessment to determine feasibility of assumptions and better understand competitive landscape",
              "Advertising/branding opportunities for Burger Palace's other locations – will opening this location help the other locations?",
              "Potential to charge higher prices: often chains charge higher prices at their airport locations to compensate for their royalty fees to the airport. Is there room for Burger Palace to raise prices?",
            ],
          },
        ],
      },
    ],
  },
];
