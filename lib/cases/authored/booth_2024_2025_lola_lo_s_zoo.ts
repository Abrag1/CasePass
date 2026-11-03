import type { CasePage } from "../content";

export const CASE_ID = "82b57afc-9f79-4be9-9fd8-6f2482729f97";

const PROMPT =
  "Our client, Lola Lo, owns and runs a zoo in a major metropolitan area within the United States. There has been a recent discovery of a dinosaur on a small island in the South Pacific. This is the only dinosaur in the world. Lola Lo would like to investigate if purchasing the dinosaur is a good project.\n\nSpecifically, please help our client with the following questions:\n1. How would you determine if purchasing the dinosaur is a good project?\n2. If it is, how would you determine the purchase price for the dinosaur?";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "A zoo owner is considering buying the only dinosaur in the world, found on a South Pacific island. Decide whether the purchase is a good project and how much to pay for it.",
  full_prompt: PROMPT,
  tags: ["candidate-driven", "investment-decision", "npv", "heavy-math", "brainstorming"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a leader or role model in your life. Why do you admire them? What lessons have you learned from them? What is a recent example of you applying those lessons? 2. Tell me about a time you had to pivot your initial approach. How did you go about it?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "The candidate should realize that this is a **net present value** investment problem, meaning that Lola Lo should be willing to purchase the dinosaur at any price producing a positive net present value.",
          "**If the candidate asks about Lola Lo’s objectives**, respond, “Lola Lo is primary interested in whether the investment would pay for itself, but is also thinking more broadly about other benefits”.",
          "**If the candidate asks about timeframe**, respond, “If Lola Lo decides to move forward, the zoo would like to invest and set up the exhibit as soon as possible”.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Discussion/Q&A" },
          { n: "3", text: "Net Present Value analysis" },
          { n: "4", text: "Investment decision" },
          { n: "5", text: "Final recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: ["**Working hypothesis:** Lola Lo should purchase the dinosaur at a price that is less than the overall investment breakeven point."],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Will the dinosaur investment be at least breakeven?",
          children: [
            {
              label: "Revenues",
              children: [
                { label: "Ticket sales" },
                { label: "Food, hotel accommodations" },
                { label: "Movie & entertainment licensing" },
                { label: "Merchandise" },
                { label: "Research" },
              ],
            },
            {
              label: "Costs",
              children: [
                { label: "Purchase of dinosaur" },
                { label: "Construction of exhibit area" },
                { label: "Staff to serve the dinosaur" },
                { label: "Food & merchandise sales" },
                { label: "Operations" },
              ],
            },
          ],
        },
        {
          label: "Will it be feasible to transport and show the dinosaur in the zoo?",
          children: [
            {
              label: "Risks",
              children: [{ label: "Disease or death; cloning or discovery of additional dinosaurs" }, { label: "Safety & legal considerations" }],
            },
            {
              label: "Transportation and Display",
              children: [
                { label: "Movement of dinosaur from South Pacific" },
                { label: "Sustaining a healthy dinosaur in a captive environment" },
                { label: "Meeting zoo visitors’ preferences to view the dinosaur" },
              ],
            },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Did the candidate state a hypothesis?**",
      "  The candidate should express the core idea that they would like to test through their analysis. They should clearly demonstrate how the questions they’re asking are directed at answering the specific question of whether Lola Lo should purchase the dinosaur.",
      "  It’s less important for the hypothesis to be backed up with evidence, since it’s so early in the case (though strong candidates will draw on their own knowledge and intuitions to develop preliminary insights about the potential for this new exhibit at the zoo).",
      "**Is breakeven the primary consideration? Are external factors considered?**",
      "  Breakeven is the deciding factor for Lola Lo. It’s OK for candidates to discuss other considerations, but their primary focus should be on whether the investment would at least break even.",
      "**Is the framework case-specific?**",
      "  Excellent frameworks will explore specific aspects of the zoo and new exhibit, rather than just generic ideas about investment.",
      "  For example, how do you determine the revenue from tickets? Are you proposing a separate ticket? If so, then you can count those revenues. If you are proposing the same ticket for the zoo and dinosaur exhibit, then not all the revenues from tickets will count. Only the revenues from the tickets in excess of original ticket sells will count.",
    ],
  },
  {
    n: "03",
    label: "Case Development",
    title: "Case Development",
    kind: "qa",
    infoBoxLabel: "Case Development",
    infoSections: [
      {
        label: "Facts about the Dinosaur and Zoo",
        lines: [
          "The dinosaur is the size of an elephant.",
          "The dinosaur can easily be transported from the South Pacific to the United States.",
          "The dinosaur cannot reproduce.",
          "The dinosaur is not violent, but cannot interact with non-trained individuals.",
          "The zoo has enough land to house the dinosaur and construct an exhibit area without reconfiguring the existing park.",
        ],
      },
      {
        label: "Age and Lifespan of the Dinosaur",
        paragraphs: [
          "While the actual numbers are not that important, the candidate needs to realize that this is a net present value problem and the project lasts as long as the dinosaur is alive. It is important to determine the age and lifespan of the dinosaur.",
          "Before disclosing the following information, the candidate should suggest ways of determining both the age and the lifespan of the dinosaur.",
          "Some suggestions could be consulting a dinosaur expert, DNA testing, fossil testing, comparisons to living animals, examining growth rate/metabolism, etc.",
          "Provide candidate with the following once they come up with age and lifespan suggestions:",
        ],
        lines: ["Current Age: ==21 years==", "Expected Lifespan of Dinosaur: ==50 years=="],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should **drive the case forward**. Provide the candidate with the information below when it is requested. Push the candidate to think about specific ways to estimate revenue, costs, and profits for the dinosaur within the zoo. Don’t simply disclose information if asked open-ended questions about expected revenue, costs, or profits. If a candidate is unable to identify an item after brainstorming, you can provide it so that the candidate’s math is complete.",
      "**Revenues (annual)**",
      "  Tickets: $2,000,000",
      "  Hotels Accommodations: $1,000,000",
      "  Movie & Entertainment Licensing: $500,000",
      "  Food in the Park: $500,000",
      "  Merchandise: $250,000",
      "  Research: $250,000",
      "**Fixed Costs (one-time)**",
      "  Dinosaur: Unknown (This should be solved.)",
      "  Exhibit Area and Housing Area: $15,000,000",
      "**Variable Costs (annual)**",
      "  Staff to Serve the Dinosaur: $1,000,000",
      "  Food & Merchandise Sales: $250,000",
      "  Operations: $250,000",
    ],
  },
  {
    n: "04",
    label: "Calculations",
    title: "Calculations",
    kind: "qa",
    infoBoxLabel: "Calculations",
    infoSections: [
      {
        label: "Operating Profit",
        paragraphs: ["Based on the information provided, we can calculate the annual operating cash flows for the next 29 years as follows:"],
      },
    ],
    calcLines: [
      { q: "Annual Revenue", a: "$2M (tickets) + $1M (hotel) + $0.5M (movie) + $0.5M (park food) + $0.25M (merchandise) + $0.25M (research) = ==$4.5 M==", stack: true },
      { q: "Annual Costs", a: "$1M (staff) + $0.25M (food &merchandise) + $0.25M (operations) = ==$1.5 M==", stack: true },
      { q: "Annual Profit", a: "Annual Operating Profit  = $4.5 M – $1.5M = ==$3M==", stack: true },
      {
        q: "Discount Rate",
        a: "Besides knowing the expected lifespan of the dinosaur and all the revenues and costs, the candidate needs to ask about the discount rate.\nDiscount rate = ==10%==",
        stack: true,
      },
      {
        q: "NPV",
        a: "Now with all the information, the candidate can determine the highest amount that the client should pay for the dinosaur.\nAssume revenues and costs are static over time to simplify the equation.\nTo solve for maximum cost of dinosaur, assume the breakeven NPV = 0 .",
        stack: true,
      },
    ],
    answerText:
      "- To calculate the value of cash flows for the next 29 years, break down the net present value into two parts:\n  NPV(today to infinity) = NPV(today to 29 yrs) + NPV(29 yrs to infinity)\n- We can solve for the NPV of cash flows from today to infinity using the formula for a perpetuity.\n- We can also solve for the NPV of cash flows from 29 years to infinity. We just have to discount the starting value of the perpetuity by 29 years.\n  NPV(today to 29 yrs) = NPV(today to infinity) − NPV(29 yrs to infinity)\n  NPV(today to 29 years) = $3M / 0.1 − ($3M / .1) / 1.1²⁹ ≈ $30M − $30M / 16 = ==$28.125M==\n- Find the breakeven point between the fixed costs and the value of the returns of the investment:\n  $28.125M − fixed costs ≥ 0\n  $28.125M − $15M − cost of dinosaur ≥ 0\n  ==$13.125M== ≥ cost of dinosaur",
    guidanceLabel: "Math Shortcut",
    guidanceLines: [
      "It is not possible to calculate 1.1²⁹ by hand, so use the **rule of 72** on 10%:",
      "  72/10 = 7.2 (value doubles every 7.2 years)",
      "  29 years divided by 7.2 years is roughly four",
      "  Doubling happens four times at this rate and duration, so 1.1²⁹ ≈ 2⁴ = 16",
    ],
  },
  {
    n: "05",
    label: "Brainstorm: Exhibit Design",
    title: "Exhibit Design",
    kind: "qa",
    qText: "After concluding the breakeven analysis, ask the candidate, “If you were asked to design the exhibit area for the dinosaur, what are the major things that you would consider?”",
    infoBoxLabel: "Brainstorm: Exhibit Design",
    infoSections: [
      {
        groups: [
          {
            heading: "Safety & Logistics",
            items: [
              "Safety of viewers: nets, cages, alert systems",
              "How to route traffic around the exhibit area",
              "  Moving walkway: prevents traffic from building up and controls the cycle time that spectators spend in the exhibit area",
              "  Multiple levels: more spectators can cycle through simultaneously",
            ],
          },
          {
            heading: "Experience & Well-being",
            items: [
              "Dinosaur well-being: feeding, grooming, health monitoring",
              "Size of the exhibit area: balance between sufficient space for the dinosaur to roam and sufficient proximity for spectators to see",
              "Spectator experience and viewing efficiency",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Throughout the case, the candidate should relate their insights back to the central hypothesis being tested.",
      "The candidate should also realize that the dinosaur will not live forever; therefore, the revenue stream will disappear when the dinosaur dies.",
      "Strong candidates will make case-specific observations (relevant to this particular investment consideration of a dinosaur within Lola Lo’s Zoo), rather than using generic ideas about investments.",
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
        paragraphs: ["Lola Lo should **purchase** the dinosaur and pay no more than ==$13.125M=="],
        lines: [
          "The investment calculations show a positive net present value for a purchase price equal to or less than ==$13.125M==",
          "The zoo should expect ==$3M== total annual profit from the dinosaur exhibit for the next ==29 years==",
          "The dinosaur’s exhibit can be designed to maximize efficiency and spectator safety",
        ],
      },
      {
        groups: [
          {
            heading: "Risks",
            items: [
              "The dinosaur could die of diseases in North America",
              "No zoo in the world has ever cared for a dinosaur before; this creates a host of unknowns in the exhibit area that could drive up costs",
              "The dinosaur may come into contact with non-trained individuals more frequently (e.g. spectators) than a normal animal, raising liability risk",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Engage scientific experts for advice in caring for the livelihood of the dinosaur",
              "Evaluate dinosaur exhibit designs and associated costs by comparing options to those for similarly-sized animals at other zoos",
              "Conduct design review of the proposed exhibit to ensure safety; evaluate insurance options",
            ],
          },
        ],
      },
    ],
  },
];
