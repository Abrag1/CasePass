import type { CasePage } from "../content";

export const CASE_ID = "cbd80fc0-c6ae-41c1-b62f-916fd64eb797";

const PROMPT =
  "Your client is a private equity firm looking at the baby formula market in China. In particular, they are looking at a company called Super Jr., which is a Chinese startup founded in 2006. Super Jr. brands itself as a foreign company, advertising their products as being made and imported from Australia.\n\nThe PE firm would like your help in determining whether they should invest in Super Jr.";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "A private equity firm is looking at the baby formula market in China and at Super Jr., a startup that brands itself as a foreign company. Assess the market, the company and its fit for the client, then recommend whether to invest.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "investment-decision", "light-math", "chart-clearing", "exhibit-heavy"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 400, fg = "#1f2421") => ({ v, align: "left" as const, w, fg });
const RED = "#e8201c";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you managed a work conflict. 2. What is the best feedback you’ve received? Why?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case tests a candidate’s ability to **clear charts** effectively and to **synthesize** a large volume of information to make a recommendation. A strong candidate will develop a framework that goes beyond discussion of market conditions and profitability, and they will apply their framework to drive the case forward.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Discussion/Q&A" },
          { n: "3", text: "Chart Clearing/Quantitative Analysis" },
          { n: "4", text: "Final Recommendation" },
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
    guidancePreIntro: "Provide the following information in the discussion with candidate.",
    guidancePreLines: [
      "**Business Model**",
      "  Super Jr. currently has no manufacturing capabilities and sources their product, “Super Jr. Formula,” from an Australian manufacturer.",
      "  Super Jr . primarily distributes to regional and local supermarkets. The supermarkets currently charge them a fee for stocking their product (for shelf-space usage).",
      "**Brand**",
      "  Super Jr . has spent a lot on marketing and has gained reputation in the Chinese market as a “decent” brand.",
      "**Management**",
      "  The management team at Super Jr . is composed of people who have previously worked in the food sales and distribution industry.",
      "**Growth Strategy**",
      "  The current growth strategy is to continue expanding distribution to large-format, national retail chains (such as, Walmart), while investing further in marketing to penetrate the premium segment, allowing them to price at a premium",
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Baby Formula Market Considerations",
          children: [
            { label: "Market size / growth rate" },
            {
              label: "Competitive landscape",
              children: [{ label: "Market share / momentum" }, { label: "Competitor value propositions / business models" }],
            },
            {
              label: "Customer segment growth",
              children: [
                { label: "By region / demographic" },
                { label: "Willingness to pay" },
                { label: "Elasticity/brand loyalty" },
                { label: "Trends in product preferences (organic, imported vs. local, etc.)" },
              ],
            },
            {
              label: "Product types",
              children: [{ label: "Commodity vs. specialty" }, { label: "Profit margin differences" }, { label: "Raw material availability / pricing" }],
            },
            { label: "Channels", children: [{ label: "Infrastructure to support growth" }] },
          ],
        },
        {
          label: "Super Jr. Company Considerations",
          children: [
            {
              label: "Company strategy",
              children: [
                { label: "Product / customer segments" },
                { label: "Growth targets" },
                { label: "Organic and inorganic (M&A) growth plans" },
              ],
            },
            {
              label: "Profitability",
              children: [
                { label: "Pricing strategy / profit margins" },
                { label: "Cost structure" },
                { label: "Exposure to cost risks (raw materials, foreign exchange fluctuations)" },
              ],
            },
            { label: "Brand image" },
            { label: "Supplier sources" },
            { label: "Channels" },
            { label: "Management experience" },
            { label: "R&D" },
          ],
        },
        {
          label: "Fit for PE Client",
          children: [
            { label: "Ability to hit profitability / ROI targets" },
            { label: "Synergies with existing PE portfolio" },
            { label: "PE staff capacity to provide management support vs. need for management support" },
            { label: "Opportunity cost from other investment options" },
          ],
        },
      ],
    },
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: ["To determine whether Super Jr. is a good investment for our client, we need to determine that:"],
        steps: [
          { n: "1", text: "The baby formula market is attractive." },
          { n: "2", text: "Super Jr.’s position in that market is promising." },
          { n: "3", text: "Super Jr. would be a good fit within our client’s portfolio." },
        ],
      },
      {
        paragraphs: [
          "**Transition statement:** My first step is to assess the growth of the baby formula market. Is there any data on the historical performance of this market?",
        ],
      },
    ],
    nextStepText:
      "**Present the candidate with Exhibit 1 after** they have walked through their framework and have suggested a direction for further analysis (sample framework on next page).",
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    // Two charts, as printed side by side. Left: Y axis runs 2-10 (bars start at the axis minimum).
    colBarTitle: "Baby Formula Market Historical Data",
    colBarInnerNote: "CAGR = 20%",
    colBarFirst: true,
    colBarItems: [
      { label: "2000", value: 3, color: "#333333" },
      { label: "2001", value: 3.4, color: "#333333" },
      { label: "2002", value: 4.2, color: "#333333" },
      { label: "2003", value: 5.5, color: "#333333" },
      { label: "2004", value: 6.7, color: "#333333" },
      { label: "2005", value: 7.8, color: "#333333" },
      { label: "2006", value: 9, color: "#333333" },
    ],
    colBarYMin: 2,
    colBarYMax: 10,
    colBarYStep: 1,
    colBarYLabel: "Billions $",
    colBarHorizontalLabels: true,
    colBarNoGrid: true,
    axisBarTitle: "Projected Growth from Super Jr.",
    axisBarSeries: [{ name: "Million $", color: "#d9d9d9" }],
    axisBarGroups: [
      { label: "2006", values: [5] },
      { label: "2007", values: [7] },
      { label: "2008", values: [12] },
      { label: "2009", values: [21] },
      { label: "2010", values: [32] },
      { label: "2011", values: [44] },
      { label: "2012", values: [60] },
    ],
    axisBarYMax: 70,
    axisBarYStep: 10,
    axisBarYLabel: "Million $",
    axisBarNoGrid: true,
    axisBarNoLegend: true,
    guidanceLabel: "Sample takeaways from Exhibit 1:",
    guidanceLines: [
      "The baby formula market overall has seen steady annual growth, at ==20% CAGR== (tripling the market size in 6 years).",
      "  This growth rate is strong considering that annual GDP growth in fast-growing countries like China is around 9% (although the candidate may not know this, they should feel comfortable commenting that 20% CAGR is encouraging).",
      "  If this growth rate continues, the market will more than double in size in a rather short time horizon (~4 years).",
      "Super Jr. is projected to grow from approximately ==$5M to $60M== in the span of 6 years, which is very significant growth.",
      "  Super Jr.’s growth outlook is very optimistic compared to overall historical market growth rates.",
      "  This means Super Jr. will have to outgrow the market by stealing share from competitors.",
    ],
  },
  {
    n: "04",
    label: "Math Question 1",
    title: "Math Question 1",
    kind: "qa",
    qText: "Assuming the same CAGR from 2000 to 2006, what would be the overall market size in 2012?",
    answerText:
      "**Sample Response:**\nFrom the graph, we can see that CAGR of 20% implies a tripling of the market size in 6 years. Another 6 years at this growth rate would lead to a further tripling of the market size, from $9B to ==$27B==.\n\n**Alternative Response:**\nFinal Market Size = Initial Market Size * (1 + CAGR)^(# Years)\n  = $9B * ( 1+ 0.2)^6\n  = ==$27B==\n\n**Sample estimation process for (1.2)^6:**\n= (6/5 * 6/5)^3 = (36/25)^3 ~= (35/25)^3\n= (7/5)*(7/5)*(7/5) = (49/25)*(7/5) ~= 2*7/5 = 14/5\n= 2.8 --> round up to 3 because of net rounding down during simplifications",
  },
  {
    n: "05",
    label: "Math Question 2",
    title: "Math Question 2",
    kind: "qa",
    qText: "Estimate the CAGR Super Jr. expects to achieve between 2006 and 2012. Is the projection realistic?",
    answerText:
      "**Sample Response:**\nEstimate CAGR using the rule of 72:\n$60M/2 = $30M\n$30M/2 = $15M\n$15M/2 = $7.5M\n$7.5M/2 ~= $3.75M (close to $5M)\n--> Size doubles almost 4 times in 6 years, or about every 1.5 years\nRule of 72: 72/1.5 = ==48%==\n\n**Alternative Response:**\nCAGR = (End Value/Beginning Value)^(1/# years) - 1\n= (60/5)^(1/6) - 1\n= (12^(1/6)) - 1\n~= 1.5 - 1 = 0.5 = ==50%==\nNote: The actual CAGR calculation results in a CAGR of 51%.\n\n**Sample estimation process for (12)^(1/6):**\nfrom prior problem we know 1.2^6 = 3, therefore 3^(1/6) = 1.2\n(12)^(1/6) = (3*4)^(1/6) = 3^(1/6) * 4^(1/6)\n= 1.2 * 4^(1/(2*3)) = 1.2 * 2^(1/3)\n~= 1.2 * 1.25 = 6/5 * 5/4 = (30/20) = 1.5\n\nGiven the market CAGR is 20% and the projected CAGR for Super Jr. is ~50%, 2.5x that of the market, this projection will be difficult to achieve since Super Jr. needs to accomplish this by stealing market share from competitors.",
  },
  {
    n: "06",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    guidancePreLabel: "Candidate-Led Next Steps",
    guidancePreIntro:
      "Upon completing the quantitative analysis and discussing the results, the candidate should ask for more information, such as:",
    guidancePreLines: [
      "What are the core competencies of Super Jr. and how do they compare to competitors (sales, distribution, production)?",
      "What particular segment does Super Jr. play in and is it easy to penetrate and/or gain share in that segment?",
      "What do customers demand? Does Super Jr. do anything that meets/exceeds customer expectations?",
    ],
    // Marimekko read off the printed chart (no value labels are printed): column widths and slice
    // heights were measured from a 4x render of page 316 (widths 210.4 / 204.0 / 113.2 px;
    // Premium 13% local established, Medium 19% specialty + 27% local established, Low 11% specialty).
    extraCharts: [
      {
        kind: "marimekko",
        title: "Market Share by Company Type",
        columns: [
          { label: "Premium", width: 210, sub: "30%", slices: [{ value: 87 }, { value: 13 }, { value: 0 }] },
          { label: "Medium", width: 204, sub: "15%", slices: [{ value: 54 }, { value: 27 }, { value: 19 }] },
          { label: "Low", width: 113, sub: "20%", slices: [{ value: 0 }, { value: 89 }, { value: 11 }] },
        ],
        series: [
          { name: "MNC Brands", color: "#808080" },
          { name: "Local Established Brands", color: "#d9d9d9" },
          { name: "Local Specialty", color: "#ffffff" },
        ],
        seriesNotes: ["4 players", "> 20 players", "> 80 players"],
        yLabel: "% Market",
        xTitle: "Segment Type",
        subLabel: "CAGR",
        labelsAbove: true,
        valueLabels: false,
        noGrid: true,
        footnote: "* Super Jr. is considered a ‘local specialty’ company",
      },
    ],
    nextStepText:
      "The candidate should, in general, ask for information about customer or product segments or the competitive landscape. **When they do, show the candidate Exhibit 2.**",
    infoBoxLabel: "Sample Takeaways:",
    infoSections: [
      {
        paragraphs: ["As a ‘local specialty’ brand, Super Jr. competes in the medium and low markets."],
        lines: [
          "The medium and low markets are highly fragmented, whereas the premium brand is much more concentrated.",
          "Overall market momentum is being driven by growth in the premium market.",
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Exhibit 3",
    title: "Exhibit 3",
    kind: "qa",
    guidancePreLabel: "Candidate-Led Next Step",
    guidancePreLines: [
      "At this point the candidate should be synthesizing the information to argue that Super Jr. is either a good or bad investment for the client.",
      "**Provide the candidate with Exhibit 3** once the candidate has presented some arguments either for or against investment in Super Jr.",
    ],
    infoSections: [
      {
        groups: [
          {
            heading: "Sample Arguments in Favor of Investment:",
            items: [
              "Super Jr. has an established brand, so it is possible their planned move into the premium market will be successful, yielding higher growth.",
              "Significant fragmentation among Specialty Market players suggests an opportunity for Super Jr. to gain market share by acquisition and/or aggressive marketing.",
            ],
          },
          {
            heading: "Sample Arguments Against Investment:",
            items: [
              "The growth rate of the markets Super Jr. competes in are much lower than their company growth projections.",
              "There are very few players in the premium market and, as such, there may be unforeseen difficulties for Super Jr. as it attempts to enter this segment.",
            ],
          },
        ],
      },
    ],
    // The printed percentages (rows Raw Materials to R&D) are red in the source.
    dataTableTitle: "Key stats by Company Types",
    dataTableCols: "1.3fr 1fr 1.3fr 1fr",
    dataTableHeaders: [hd("Factors"), hd("Multi-Nationals"), hd("Local Established Brands"), hd("Super Jr.")],
    dataTableRows: [
      { cells: [L("Retail Price"), L("$125"), L("$70"), L("$110")] },
      { cells: [L("Profit Margin"), L("30%"), L("15%"), L("15%")] },
      { cells: [L("Raw Materials"), L("12%", 400, RED), L("27%", 400, RED), L("45%", 400, RED)] },
      { cells: [L("Manufacturing"), L("28%", 400, RED), L("43%", 400, RED), L("0%", 400, RED)] },
      { cells: [L("Marketing"), L("20%", 400, RED), L("10%", 400, RED), L("50%", 400, RED)] },
      { cells: [L("SG&A"), L("5%", 400, RED), L("5%", 400, RED), L("5%", 400, RED)] },
      { cells: [L("R&D"), L("35%", 400, RED), L("15%", 400, RED), L("0%", 400, RED)] },
    ],
    guidanceLabel: "Sample Takeaways from Exhibit 3:",
    guidanceLines: [
      "Super Jr. spends most of its resources on marketing and none on R&D.",
      "Super Jr. has very high raw material costs and zero manufacturing costs (which is to be expected since they source final goods).",
      "Prices for local established brands (which compete with Super Jr.) are much lower, primarily due to lower marketing costs.",
      "Input costs (raw materials + manufacturing) are fairly commensurate across segments.",
    ],
    nextStepText:
      "Following the discussion, the interviewer should ask the candidate to synthesize the results of the case into a final recommendation. This case is very open ended and good arguments can be made either way. As long as the candidate sticks with and supports their recommendation with logical evidence from the case discussion, the recommendation should be accepted by the interviewer (sample recommendations on the following pages).",
  },
  {
    n: "08",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Rec: For Investment",
    infoSections: [
      {
        groups: [
          {
            heading: "Recommendation",
            items: [
              "**Invest in Super Jr.:**",
              "  With a continued emphasis on marketing, Super Jr. can build a reputation in the premium market while gaining market share in the low and medium markets.",
              "  The Super Jr. business model means they have low fixed capital costs and can be flexible and responsive to the market in their choice of products to source.",
              "  The management team’s experience in food distribution may be a significant competitive advantage as Super Jr. seeks to grow quickly.",
              "  As the brand gets more established, marketing expenditures could be reduced, thus increasing profit margins.",
            ],
          },
          {
            heading: "Risks",
            items: ["Breaking into the premium market proves harder than expected", "Break-down of relationship with Australian distributor"],
          },
          {
            heading: "Next Steps",
            items: ["Conduct market study of premium market", "Analyze contract terms with distributor"],
          },
        ],
      },
    ],
    guidanceLabel: "Rec: Against Investment",
    guidanceLines: [
      "**Recommendation**",
      "  Don’t invest in Super Jr.:",
      "    Super Jr. doesn’t have any core competency (beyond marketing) to develop new products and compete in the premium market given that they do not have any R&D capabilities.",
      "    Their growth projections are likely premised at least in part on entering the premium market, which is highly concentrated and for which their brand isn’t well-suited yet.",
      "    Their business model carries a lot of risk (no R&D in-house, high ‘raw material’ costs, single point of failure with their Australian distributor, exposure to foreign exchange fluctuations).",
      "**Risks**",
      "  Super Jr.’s business model proves to be the best setup to grow quickly in this high-growth market",
      "  Super Jr. establishes its brand quickly and firmly, decreasing the returns on any investment in its competitors",
      "**Next Steps**",
      "  Analyze Super Jr.’s specific plans to hit its growth targets for fit with its business model",
      "  Evaluate Super Jr.’s competitors for potential alternative investment opportunities and / or to determine Super Jr.’s competitive advantage",
    ],
  },
];
