import type { CasePage } from "../content";

export const CASE_ID = "f4c8efbd-3aee-4bd3-a38d-bdf0a0ea2fef";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Market sizing",
  synopsis:
    "A convenience-store chain wants to open a new store in a city the candidate picks. Estimate, from scratch, the minimum population density the area needs for the store to break even.",
  full_prompt:
    "Our client is 7-Eleven. They would like to open a new store in [your city of choice]. What is the minimum population density the area should have?",
  tags: ["candidate-led", "market-sizing", "retail", "estimation", "exhibit-heavy"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Prompt",
    kind: "ready",
    body: "Our client is 7-Eleven. They would like to open a new store in [your city of choice]. What is the minimum population density the area should have?",
    note: "Interviewer note: Before reading the prompt, ask candidate to pick a city that he/she is familiar with. Then read the following:",
    infoBoxLabel: "Additional Information (provided on request)",
    infoSections: [
      {
        paragraphs: [
          "There is no additional information for this case. Candidates are asked to estimate all numbers from scratch. At the end of the interview, interviewer should check that the number is reasonable given the size of the city of choice.",
          "Note: the goal of this case is not primarily to get an accurate number, but rather, to come up with an exhaustive list of things to consider in the absence of provided information.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Sample Structure",
    title: "Sample Structure",
    kind: "qa",
    treeTitle: "Sample Structure (any reasonable one is acceptable)",
    treeRoot: {
      label: "Market size",
      children: [
        {
          label: "Number of customers",
          children: [
            {
              label: "Profit",
              children: [
                {
                  label: "Revenue",
                  children: [{ label: "Number of units sold" }, { label: "Price/ unit" }],
                },
                {
                  label: "Costs",
                  children: [
                    { label: "Number of units sold" },
                    { label: "Cost/unit", children: [{ label: "Fixed" }, { label: "Variable" }] },
                  ],
                },
              ],
            },
          ],
        },
        { label: "Area covered" },
        {
          label: "Market penetration",
          children: [
            { label: "Competition", children: [{ label: "Existing" }, { label: "Future" }] },
          ],
        },
      ],
    },
  },
  {
    n: "03",
    label: "Analysis",
    title: "Analysis",
    kind: "qa",
    infoBoxLabel: "Analysis",
    infoSections: [
      {
        paragraphs: [
          "Interviewer note: this is a entirely candidate-led case. There are many different approaches. Below is just one example of a solution:",
        ],
      },
      {
        label: "Start with the basic equation: π = πi*V – CF = (Ri – Ci)*V – CF",
        lines: [
          "π = profit",
          "πi = incremental profit",
          "V = volume",
          "CF = fixed costs",
          "Ri = incremental revenue = revenue per unit",
          "Ci = incremental cost = variable cost per unit",
        ],
      },
      {
        label: "Next, population density is given by the relationship: V = d*A*p*Vi",
        lines: [
          "d = population density",
          "A = area reached by a given store",
          "p = market penetration",
          "Vi = volume per customer",
        ],
      },
      {
        label: "Then solve for V in first equation and then use V to solve for d in second equation:",
        paragraphs: ["Candidate should give reasonable estimates for each variable."],
        lines: [
          "CF (fixed costs) = $105,500/month",
          "  Area of store: 2,000 sq ft",
          "  Number of employees: 5",
          "  Rent: $50/sq ft/month*2,000 sq ft = $100,000/month",
          "  Utilities: $0.25/sq ft/month*2,000 sq ft = $500/month",
          "  Labor: $1,000/employee/month*5 employees = $5,000/month",
          "Ri (incremental revenue) = $10",
          "Ci = (incremental cost) = $2/item",
          "  Wholesale: $1.5/item",
          "  Transportation: $0.5/item",
          "Now solve for V in first equation: π = (Ri – Ci)*V – CF = 0 (breakeven)",
          "  Rearranging equation gives CF = (Ri – Ci)*V",
          "  $105,500/month = ($10 – $2)*V = $8*V",
          "  V = ~13,200 items/month",
        ],
      },
      {
        label: "Then solve for d in second equation: V = d*A*p*Vi",
        paragraphs: ["Again, candidate should give reasonable estimates for each variable."],
        lines: [
          "A (area reached by store) = 0.5 miles*0.5 miles = 0.25 sq miles",
          "p (market penetration) = 50%",
          "Vi (volume per customer) = 3 items/sale*10 sales/customer/month = 30 items/customer/month",
          "V = ~13,200 items/month = d*0.25*50%*30",
          "d = 3,520 customers/sq mile",
        ],
      },
    ],
    answerText:
      "**Summary (based on sample solution above)**\nIn order for the new 7-Eleven store to be profitable in this city, it needs to be located in an area where the population density is at least ==3,520 people per square mile==. Our client should keep in mind that this was calculated based on the assumption that they will be able to capture 50% of the potential customers, which may be an overestimate depending on the exact location.",
    guidanceLabel: "Tips for this case:",
    guidanceLines: [
      "Since this is a very open-ended case, it is important for the candidate to take a proactive approach and come up with reasonable numbers for each variable. Note that the numbers in the above solution can vary drastically depending on the city of choice. Breaking down the problem into as many components as possible and keeping track of the units are key to solving this case correctly.",
    ],
  },
];
