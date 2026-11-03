import type { CasePage } from "../content";

export const CASE_ID = "0bf7e257-4556-4742-a750-0f0f72d6b661";

const PROMPT =
  "A large French beauty products company with a revenue of $2B operates as manufacturer, seller and marketer of luxury fragrances. This company sells to high-end beauty retailers. Recently, the company has acquired a player in the ‘accessible’ beauty products industry.\n\nThe acquired company manufactures, sells and markets skincare and cosmetics. Being that the two companies operate similarly along their value chains, the COO has opted to combine manufacturing, but initially keep the two sales units operating separately because the luxury sales unit and the accessible sales unit don’t have the same customers. However, the COO is interested in understanding if additional value can be realized by integrating the two sales organizations.\n\nYour goal is to help the COO determine if a leveraged or a decentralized sales organization is a valuable strategy for the company.";

export const CASE_META = {
  review: "auto",
  case_type: "Operating Model",
  synopsis:
    "A French luxury fragrance company has acquired an accessible skincare and cosmetics player and is weighing whether to integrate the two sales organizations. Brainstorm the trade-offs of each sales structure, then size a new retail channel against the Board's growth goal.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "operating-model", "brainstorming", "light-math", "exhibit-heavy"],
};

const cellOf = (v: string) => ({ v, align: "left" as const, w: 400, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about the largest impact you’ve ever had on a team. 2. How would you handle being on a project in X industry, outside of your expertise? Would you be excited for this work?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: ["This case includes multiple **brainstorming** exercises and is light on math."],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Background Discussion" },
          { n: "2", text: "Initial brainstorming" },
          { n: "3", text: "Additional revenue analysis" },
          { n: "4", text: "Recommendation/Wrap-up" },
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
    guidancePreIntro: "Additional Information (only share if asked by interviewee):",
    guidancePreLines: [
      "There is an impending recession.",
      "This is a maturing industry in developed markets, but emerging markets are seeing explosive growth.",
      "A leveraged organization is the same as a centralized organization.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        groups: [
          {
            heading: "Revenue Increase",
            items: [
              "Volume increase (New channels, increased capacity, sales efficiency, buik savings opportunities)",
              "Price Increase (more informed pricing decisions)",
            ],
          },
          {
            heading: "Cost Savings",
            items: [
              "Supply chain/ staffing synergies",
              "Improved contracts with suppliers (bulk buying)",
              "Reduced SG&A footprint",
            ],
          },
          {
            heading: "Fit",
            items: ["Leadership and Organizational change", "cultural change", "dilution of luxury brand"],
          },
          {
            heading: "Operations",
            items: ["Procedural changes", "Time/cost of integration"],
          },
        ],
      },
      {
        paragraphs: [
          "**Transition statement:** To determine which sales organization structure is best, I would like to focus on sales generation in a leveraged versus a decentralized sales organization.",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    guidancePreLabel: "Brainstorm",
    guidancePreLines: [
      "Once the candidate explains their framework, **ask**, “what are the advantages and disadvantages of each operating model?”",
      "  **Push** the candidate to consider several of the options listed below, ensuring they list both advantages and disadvantages for each sales organization structure.",
    ],
    infoBoxLabel: "Brainstorming Insights",
    infoSections: [
      {
        label: "Leveraged (Centralized)",
        groups: [
          {
            heading: "(+)",
            items: [
              "Reduce redundancies",
              "Streamline best practices",
              "Human capital synergies",
              "Reduce costs",
              "Centralized control and accountability",
              "Brand synchronization",
            ],
          },
          {
            heading: "(-)",
            items: [
              "Employees will be unfamiliar with the new standard operating procedures",
              "Leadership changes may disrupt familiar culture",
              "Bureaucracy stifles decision making",
            ],
          },
        ],
      },
      {
        label: "Decentralized",
        groups: [
          {
            heading: "(+)",
            items: [
              "Flatter org structure could encourage fast acting",
              "Familiarity with status quo roles",
              "Broad knowledge",
            ],
          },
          {
            heading: "(-)",
            items: [
              "Lack of accountability could lead to a hold-up problem",
              "Increased costs",
              "No common goal",
              "No brand synchronization - could lead to customer confusion",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    guidancePreLabel: "Question 1",
    guidancePreLines: [
      "Once complete with brainstorming, **tell the candidate**:",
      "**Show the candidate Exhibits 1 & 2**, and walk the candidate through the following three questions:",
    ],
    qText:
      "The CEO has stopped by to let us know that the company’s Board has met and is upset about their profitability. They have indicated that a 5% generation of added value above their current $2B needs to be achieved by this year.\n\nQuestion 1: Based on the two provided exhibits, what are some ways to achieve the added value goal?",
    axisBarTitle: "Retailer’s Revenue by Product Line",
    axisBarYLabel: "Revenue ($MM annually)",
    axisBarYMax: 600,
    axisBarYStep: 100,
    axisBarRotateLabels: true,
    axisBarSeries: [
      { name: "Fragrance", color: "#92d050" },
      { name: "Skincare & Cosmetics", color: "#0070c0" },
    ],
    axisBarGroups: [
      { label: "Bloomingdales", values: [250, 75] },
      { label: "Macys", values: [250, 75] },
      { label: "Neiman Marcus", values: [325, 85] },
      { label: "Saks", values: [350, 80] },
      { label: "Nordstroms", values: [325, 85] },
      { label: "Walmart", values: [400, 550] },
      { label: "Walgreens", values: [85, 350] },
      { label: "CVS", values: [80, 90] },
    ],
    dataTableCols: "1fr 1.2fr 1.2fr",
    dataTableHeaders: [
      { v: "", align: "left" },
      { v: "French Beauty Co Sales Unit", align: "center" },
      { v: "Acquired Company Sales Unit", align: "center" },
    ],
    dataTableRows: [
      {
        cells: [
          cellOf("Primary retail outlets sold to:"),
          cellOf("Macys, Bloomingdale, Saks, Nordstrom Neiman Marcus"),
          cellOf("Walgreens, Walmart, CVS"),
        ],
      },
      {
        cells: [cellOf("Product Sold:"), cellOf("Fragrances"), cellOf("Skincare and cosmetics")],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Push** the candidate to initially focus on revenues and not costs.",
      "Candidate should identify that Walmart generates a significant amount of revenue through the sale of fragrances (more than any of French Beauty Co’s current fragrance retailers) – a channel that our salesforce has not tapped into currently.",
      "  **If asked**, interviewer can provide additional information on the fact that our client, being a major sales and marketing force in the industry, can easily pivot to manufacture perfume for the “accessible” customer by tapping its talented workforce.",
    ],
  },
  {
    n: "05",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "Question 2: How much revenue could be gained by selling fragrances at Walmart, and would it be enough to satisfy the Board’s goals?",
    guidancePreLabel: "Questions 2 & 3",
    guidancePreLines: [
      "When the candidate asks about the possible market capture and / or manufacturer margins, **let them know** that a market analysis performed by Accenture showed that 25% of the revenue could be captured by our client.",
      "Have the candidate **perform the following calculations** to determine if that would be enough to satisfy the Board’s goal.",
    ],
    answerText:
      "$400M in Revenue * 25% = ==$100M== potential revenue\n$100M/$2B= ==5%==\nSelling fragrances at Walmart would achieve the Board’s goal.",
  },
  {
    n: "06",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "Question 3: How else could the COO drive the required 5% value add?",
    guidancePreLabel: "Questions 2 & 3",
    guidancePreLines: [
      "Have the candidate **brainstorm** potential answers, which include:",
      "  Reduce costs",
      "  Look into emerging market growth",
      "  Improve advertising",
      "  Identify new retailers / customers",
      "  Addition new product lines",
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
        paragraphs: ["French Beauty Co should shift to a leveraged (centralized) sales organization"],
        lines: [
          "This would allow the company to manufacture and effectively sell “accessible” perfume to Walmart",
          "This will result in the projected ==5%== revenue gain that will appease the goal set by the Board",
        ],
      },
      {
        label: "Additional Benefits that may be mentioned:",
        lines: [
          "Use of existing customer relationships to sell “accessible” perfume in new channels will be valuable",
          "Encourages education, knowledge sharing and shadowing amongst the reps in each sales organization",
          "Creates a unifying culture and vision for the company",
          "The accessible perfume market will be key in an economic downturn",
        ],
      },
      {
        label: "Risks",
        lines: [
          "Challenges in combining different cultures; unfamiliarity with new standard operating procedures",
          "Leadership changes may disrupt familiar culture; bureaucracy stifles decision-making",
          "Ability to obtain shelf space for fragrances at Walmart",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "Identify similarities and differences between the two firms; develop strategic plan to bring them together",
          "Craft message from leadership and develop internal feedback system to maintain pulse on employees’ satisfaction and ability to be successful at work",
          "Leverage existing relationships at Walmart to design strategic market entry plan",
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "Assessment is based on qualitative brainstorming and quantitative approach during analysis section.",
      "Exemplary candidates are able to:",
      "  Support their brainstorming with evidence and / or examples.",
      "  Go back to the framework for additional ideas; often is a valuable tool to generate deeper insights.",
      "  Demonstrate strong analytical abilities in the value generation calculations.",
      "  Summarize the discussion and create a strong and clear final recommendation.",
    ],
  },
];
