import type { CasePage } from "../content";

export const CASE_ID = "9e13b01f-306d-4de8-9b8a-674fa9800d8e";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A well-known contact lens provider is not doing as well as it could compared with its main competitor. Work out where the profitability gap lies, read a channel mix and channel profitability exhibit, and decide how the sales reps should spend their calls.",
  full_prompt:
    "Your client is a well-known contact lens provider called BB. BB manufactures and distributes contact lenses in the U.S. While BB is one of the largest players in the U.S. market, and has been for quite some time, the company feels that compared to its main competitor, it is not doing as well as it could.\n\nBB has called in McKinsey to find out how to solve this problem and to recommend a solution.\n\nHow would you go about structuring this case?",
  tags: ["interviewer-led", "profitability", "pricing", "sales-channels", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Your client is a well-known contact lens provider called BB. BB manufactures and distributes contact lenses in the U.S. While BB is one of the largest players in the U.S. market, and has been for quite some time, the company feels that compared to its main competitor, it is not doing as well as it could.\n\nBB has called in McKinsey to find out how to solve this problem and to recommend a solution.\n\nHow would you go about structuring this case?",
    note: "**Fit Questions** — 1. Tell me about a time you turned around a team. 2. Tell me about a time when you did not accomplish a professional goal and what you learned from it.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "As an interviewer-driven case, each section of this case is structured around a specific question to ask the candidate.",
          "If the candidate asks for more information on the product or industry, **provide** the following:",
          "(1) for the scope of this case, BB manufactures and distributes only in the U.S.;",
          "(2) demand for contact lenses has been growing steadily at about ==3%== annually; and",
          "(3) the client and its main competitor each sell about ==10 Million== contacts per year",
          "(4) the industry has high barriers to entry (since a high R&D outlay is necessary), is mature (20 years plus), and is dominated by BB and its competitor, who are equal in most areas.",
        ],
      },
      {
        paragraphs: [
          "Note: If the candidate hasn’t clarified the purpose of the case (i.e. what problem does BB want them to solve?), **push** them to do so. This case will be unsuccessful if the candidate does not key in on this early on.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Questions and answers" },
          { n: "3", text: "Final recommendation and synthesis" },
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
        label: "Revenue",
        groups: [
          {
            heading: "Price",
            items: [
              "Minor differences in pricing may exist, but probably nothing major.",
              "Customers may be price-sensitive, but given that lenses are fitted to a person by a doctor, customers do not purchase lenses purely on price; comfort, fit, and compatibility are big issues.",
            ],
          },
          {
            heading: "Product Mix",
            items: [
              "Distribution/sales channels: competitor may be selling through more profitable channels. (This is a ==key takeaway== and avenue for the case.)",
            ],
          },
          {
            heading: "Volume",
            items: [
              "Substitute goods: may be substituting away from BB? Any substitutes (Lasik, glasses, etc.) will likely hit competitor equally.",
              "Competitor may capture more of market because of better branding, better distribution, better price, better products? Could be possible, but not an issue at this time.",
            ],
          },
        ],
      },
      {
        label: "Cost",
        groups: [
          {
            heading: "Variable Costs",
            items: [
              "Raw Materials: inputs will be plastic, saline solution (water, salt), packaging (paper, aluminum foil, plastic). These are all commodities.",
              "Labor: will be unskilled, and the wage rate probably set by minimum wage standards. Unless BB is unionized and the competitor is not, nothing here to put BB at disadvantage to competitor. Thus, this is not an issue.",
            ],
          },
          {
            heading: "Fixed Costs",
            items: [
              "Plant, Property & Equipment",
              "R&D: big cost factor, but likely equal between BB and competitor.",
              "Overhead (People): no major differences as companies are of similar size.",
              "Marketing/Distribution: probably no differences.",
              "Legal issues: possible, but BB is probably big enough that even a huge class action settlement shouldn’t affect its bottom line too much.",
            ],
          },
        ],
      },
      {
        label: "Working hypothesis:",
        paragraphs: [
          "My hypothesis is that the problem lies with our client’s profitability rather than it being a result of changes in the contact lens market.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "A lot of people automatically assume that BB’s sales aren’t growing at the industry rate, or that BB isn’t satisfied with its market share. If the candidate does, **read back** the statement of the issue in the introduction (“is not doing as well as it could”) and **ask** him or her to explain what that could mean.",
      "If the candidate still doesn’t get it, point out that the statement is very subjective (it could be interpreted to mean many different things) and by then, the candidate should specify ==profitability==.",
      "This is a profitability problem, so the candidate should utilize a classic profitability framework.",
      "Contact lenses are commoditized, so difference in raw materials, prices, and fixed costs should be comparable across major competitors.",
      "The best candidates will be specific about their bullet points, giving concrete examples and eliminating certain areas based on their communicated hypotheses. Often candidates don’t do this, so after the framework is laid out, **push back** and ask the candidate to do this.",
      "If the candidate drives the case with a hypothesis, allow the candidate to do so. Then, follow up with the questions on the subsequent page.",
    ],
  },
  {
    n: "03",
    label: "Question 1: Drivers",
    title: "Drivers",
    kind: "qa",
    qText:
      "**Ask the candidate:**\nBased on the information you’ve been given so far, or mentioned, and based on what you know about the contact lens industry, where would you prioritize your investigation?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "What answer the candidate ends up with does not matter, but the candidate should concretely and rationally **eliminate** certain options by evaluating each area on their framework.",
      "The easiest way to reason out possible problem areas is by thinking about current, established major contact lens players such as Bausch & Lomb and Johnson & Johnson.",
      "Good candidates will incorporate their own experiences with contact lenses or optical solutions. **Push** the candidate to think about the economics of the business and relate it to either their own experiences or to people they know who use contact lenses.",
    ],
  },
  {
    n: "04",
    label: "Question 2: Costs",
    title: "Costs",
    kind: "qa",
    qText:
      "**Ask the candidate:**\nAfter analyzing BB’s cost structure, McKinsey is confident that BB’s costs are extremely competitive. Knowing this, where do you think the problem could lie?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should mention that the issue is on the ==revenue side== and specifically should focus on ==sales==.",
      "The candidate should have outlined the four areas that impact sales: ==product, price, promotion, place==.",
      "Once the candidate comments on customer and product mix or distribution, make the following comment and **present Exhibit 1 – Customer Mix**:",
      "  McKinsey analyzed the distribution channels of BB and its competitor, and came up with the following information.",
    ],
  },
  {
    n: "05",
    label: "Exhibit 1: Customer Mix",
    title: "Customer Mix",
    kind: "qa",
    axisBarTitle: "Sales Volume by Customer",
    axisBarYLabel: "Percent of Sales",
    axisBarYMax: 80,
    axisBarYStep: 10,
    axisBarYTickSuffix: "%",
    axisBarValueLabels: true,
    axisBarLegendRight: true,
    axisBarSeries: [
      { name: "BB", color: "#e6b8b7" },
      { name: "Competitor", color: "#c0504d" },
    ],
    axisBarGroups: [
      { label: "Big Box Discounters", values: [8, 8] },
      { label: "Doctor's Offices", values: [63, 75] },
      { label: "Optical Retailers", values: [29, 18] },
    ],
    infoBoxLabel: "Guidance for Exhibit 1",
    infoSections: [
      {
        label: "Overview:",
        groups: [
          {
            heading:
              "The Customer Mix slide is vague. The candidate should immediately walk through and clarify what is being represented. If not, highlight some key points:",
            items: [
              "The slide shows customer mix in terms of volume. As a reminder, the competitor and BB sell equal volume annually (around ==10,000,000== lenses per year).",
              "There are three main channels / customers:",
              "  Big Box Discounter = Walmart, Sam’s Club",
              "  Doctor’s Offices = Local, non-chain doctor’s offices",
              "  Optical Retailer = LensCrafters, etc.",
            ],
          },
        ],
      },
      {
        label: "Important Takeaways:",
        lines: [
          "Competitor sells more via Doctor’s Offices; BB via Optical Retailers",
          "Each customer has a varying degree of buying power. Walmart purchases in large volume. Doctor’s offices purchase in small quantities, and they are likely not as business savvy and do not have a procurement department. LensCrafters is in the middle.",
          "These customers / channels differentiate themselves: Walmart is known for cheap prices while doctor’s offices are specialized and offer higher levels of service. LensCrafters is in the middle.",
        ],
      },
      {
        label: "Key Insight:",
        lines: [
          "BB and its competitor charge the same prices for the same products in each channel (as established earlier in framework). The issue is overall profitability; therefore, the issue must lie in a ==pricing difference between the different sales channels== that makes some channels more profitable.",
          "If the candidate has not clearly explained their reasoning behind why the pricing is different, **probe** by asking, “Does this surprise you?” Then move to the next slide and **provide candidate with Exhibit 2 – Profitability by Customer**.",
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Question 3: Channel Profitability",
    title: "Channel Profitability",
    kind: "qa",
    qText: "**Question #3A**\nAsk the candidate:\nCan you tell me what you see here?",
    dataTableTitle: "Profitability by Customer",
    dataTableCols: "1.5fr 1fr 1fr 1fr",
    dataTableHeaders: [
      { v: "Per box of contacts (\n6 lenses)", align: "center" },
      { v: "Big Box Discounter", align: "center" },
      { v: "Doctor’s Office", align: "center" },
      { v: "Optical Retailer", align: "center" },
    ],
    dataTableRows: [
      ["Revenue", "$16.50", "$28.00", "$22.00"],
      ["COGS", "$8.00", "$8.00", "$8.00"],
      ["Sale, Distribution", "$5.00", "$2.00", "$3.50"],
      ["Other Fixed Costs", "$2.00", "$2.00", "$2.00"],
    ].map((r) => ({
      cells: r.map((v) => ({ v, align: "center" as const, w: 400, fg: "#1f2421" })),
    })),
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should analyze Exhibit 2 and decide to calculate profit and percent profit margin per channel.",
      "Candidate should reach the following conclusions:",
      "  Big Box Discounter: ==$1.50== profit and ==9%== profit margin",
      "  Doctor’s Office: ==$16.00== profit and ==57%== profit margin",
      "  Optical Retailer: ==$8.50== profit and ==39%== profit margin",
      "Once calculated, ask the candidate, “what are your thoughts?” before continuing with Question #3B.",
      "  The candidate should comment on how BB is behind competitors in the ==most profitable channel==.",
    ],
  },
  {
    n: "07",
    label: "Question 3: Continued",
    title: "Question 3: Continued",
    kind: "qa",
    qText:
      "**Question #3B**\nAsk the candidate:\nGiven this information and the initial problem we’re solving for, what would you want to look at?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "The candidate should want to look at how we can sell more lenses in the doctor’s office channel, possibly by shifting resources from the Big Box channel.",
    ],
    infoBoxLabel: "Question #3C",
    infoSections: [
      {
        paragraphs: ["Ask the candidate:"],
        lines: [
          "With what you see here, what are some additional alternatives to further increasing profitability?",
          "Since this is a channel strategy case, online direct to consumer alternatives should be mentioned; or, creating a subscription model service would potentially be a feasible alternative.",
          "**Probe** the candidate on risks for their proposed route. Some ideas include: cannibalization of existing sales, logistics impact on profitability, time to service and refill rates.",
          "**State** that the client has, “elected to remain in existing channels and change their distribution strategy.” Have the candidate calculate current profitability.",
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Question 4: Sales Reps",
    title: "Sales Reps",
    kind: "qa",
    qText:
      "Like its competitor, BB relies on sales reps to distribute its contact lenses to the doctor’s offices. Currently, BB has 5 reps in its call center dedicated to reaching out to the doctor’s offices and doing whatever is necessary to get them to sell as many BB lenses as possible.\n\nInterestingly, McKinsey has discovered a relationship between call frequency and sales generated:\n• For every 2 calls made to a customer per month, our client sees a 5% increase in revenue from that customer.\n• For every 3 calls made, our client sees a 15% increase from that customer.\n\nCurrently, each B&B sales person has 100 customer accounts. Each account must be called at least once a month, as B&B does not want to lose any customers. Assume that sales per customers, when the customer is called once a month, is $100.\n\nGiven these findings, what should BB do?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: ["The candidate should realize that they need to isolate the effect of making additional calls to a customer per month."],
      },
      {
        label: "Provide the following information to the candidate when asked:",
        lines: [
          "Each sales call takes 30 minutes.",
          "Each sales rep works 20 days per month, 8 hours a day.",
          "Each sales rep spends approximately 3 hours of each work day on administrative work, lunch break, etc.",
        ],
      },
      {
        label: "Relevant Calculations",
        lines: [
          "8 hours a day less 3 hours a day for admin = 5 hours a day for sales calls",
          "  5 hours per day divided by 0.5 hours per call = 10 calls per day",
          "  10 calls per day times 20 days total = maximum capacity is 200 calls per month per rep",
          "  200 calls max less 100 calls necessary = ==100== “free” calls",
          "You can use all options to call additional customers (a) three times, or (b) two times per month:",
          "  Already have called all customers once, so to reach 3 calls per month, must only call customer 2 additional times. Therefore, BB could call 100/2 = ==50== customers 3 times per month.",
          "  Alternatively, B&B could also call 100/1 = ==100== customers 2 times per month.",
          "Recall effectiveness of different numbers of calls:",
          "  1 call = $100",
          "  2 calls = $100 x 1.05 = $105",
          "  3 calls = $100 x 1.15 = $115",
          "If all customers are called twice, then sales = 100 customers x $105 per customer = ==$10,500==.",
          "Otherwise, sales = 50 customers x $100 + 50 customers x $115 = ==$10,750==.",
          "BB should call ==50 customers once and 50 customers 3 times==.",
        ],
      },
    ],
  },
  {
    n: "09",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidancePreLabel: "Recommendation",
    guidancePreLines: [
      "BB should sell more lenses in the doctor’s office channel and direct its sales reps to refocus their calling efforts to doctors for the following reasons:",
      "  BB is behind its competitor in the most profitable channel (doctor’s offices)",
      "  It can increase the efficiency and profitability of its marketing efforts by changing calling frequency",
      "  By calling 50 customers once and 50 customers three times, BB will have a revenue of ==$10,750/mo==.",
    ],
    infoBoxLabel: "Risks and Next Steps",
    infoSections: [
      {
        label: "Risks",
        lines: [
          "Potential competitor response and retrenchment",
          "Possible customer fatigue and backlash from multiple sales calls each month",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Evaluation of ways to strengthen relationships further with doctor’s offices to compete effectively against other competitor",
          "Cycle through doctor’s offices getting three calls/mo. to minimize fatigue",
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "**Excellent candidate performance will include:**",
      "  Talking through math.",
      "  Well-structured data.",
      "  Discussion about potential competitor response.",
    ],
  },
];
