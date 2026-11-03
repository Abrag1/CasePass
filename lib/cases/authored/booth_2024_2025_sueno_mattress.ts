import type { CasePage } from "../content";

export const CASE_ID = "1ec2df62-e90e-4dd1-aa58-2e96d051edc2";

const PROMPT =
  "Sueno Mattress is a top 5 US mattress manufacturing company.\n\nThe company has seen steady growth in recent years, but has missed profit targets the past three quarters and the stock price is slipping. Thomas Scott, the CEO, has contacted KPMG Strategy for advice on how to respond to the company’s current situation.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A top 5 US mattress manufacturer has grown steadily but missed profit targets for three quarters and its stock price is slipping. Work out what is behind the decline and what the client should do about it.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "profitability", "light-math", "chart-clearing", "brainstorming"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 400) => ({ v, align: "left" as const, w, fg: "#1f2421" });

const BLUE = "#0b3a8c";
const SKY = "#1595e0";
const PURPLE = "#6b2175";
const DEEP = "#3f0f5c";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Describe your ideal team working environment? 2. Tell me about a time when you had to make a decision without all of the information you wanted or needed.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case is a competitive strategy case in which an established player is losing profits due to customer purchasing habits (i.e. moving to lower priced, direct-to-consumer products). While the client has maintained revenue and volume above market growth, their units are now being sold at outlet stores at a discount resulting in smaller profit margins.",
          "Through the course of the case we will seek to get the candidate’s thoughts on:",
        ],
        lines: [
          "The overall market and competitive dynamics at play",
          "Potential reasons for client challenges",
          "Pros and cons of different channel distribution strategies",
          "Impact of shifting customer trends on a company/brand",
          "Suggested path forward to address these challenges",
          "Opportunities and risks associated with suggested path",
          "Immediate next steps for the client",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Case Prompt" },
          { n: "2", text: "Evaluating Stock Price Drop" },
          { n: "3", text: "Evaluating Net Income" },
          { n: "4", text: "Calculating Damages" },
          { n: "5", text: "Conclusion" },
        ],
      },
      {
        label: "Information to be disclosed",
        lines: [
          "**Sueno Mattress** has a varied product line, but can mostly be thought of as offering three main SKUs: Good, Better, Best.",
          "**Global market** = $30B growing at a CAGR of 7%",
          "**Industry Value Chain:** Super-luxury brands **distribute** their products via their own stores, while most other players rely on furniture stores and mattress stores to reach consumers.",
          "**Customer Trends:** In the past five years, a number of new players have entered the market with an online direct-to-consumer model, offering lower prices to consumers and driving down customer willingness to pay full prices across the industry",
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
    guidancePreIntro: "Data only if requested",
    guidancePreLines: [
      "**Sueno** distributes its products through **three major channels**:",
      "  Furniture stores (i.e. Ashley Furniture, Rooms-to-Go)",
      "  Mattress stores (i.e. Mattress Firm)",
      "  300 client owned Luxury stores across North America (i.e. Sueno Branded Stores)",
      "  Channel sales mix is in-line with other major players",
      "**Average Sueno Mattress Sales Price**",
      "  Furniture stores: $1,000",
      "  Mattress Stores: $850",
      "  Sueno Branded Stores: $1,150",
      "**Global Market Segmentation**",
      "  Asian market: 12% CAGR",
      "  US market: 5% CAGR",
      "  RoW markets: 8% CAGR",
      "**2016 Annual Sales Data:**",
      "  Mattresses Sold: 3M",
      "  Revenues: $3B",
      "**2017 Annual Sales Data:**",
      "  Mattresses Sold: 3.15M",
      "  Revenues: $3.09B",
      "**Pricing**: Sueno has not dramatically changed its own store pricing",
      "**Product Mix:** Has not dramatically changed over last 5 years",
      "**COGS/Ops. Costs:** Sueno has not seen any significant increase in product costs",
    ],
    infoBoxLabel: "Sample Response",
    infoSections: [
      {
        label: "Frame problem, approach and hypotheses:",
        paragraphs: [
          "The candidate should frame the client problem and begin to formulate a hypothesis to prove/disprove and drive the analysis.",
        ],
        lines: [
          "There are multiple possible explanations behind declining profitability including, but not limited to decreasing revenues, decreasing market share, decrease in price, increasing costs, etc.",
          "The candidate should identify what analysis needs to be done to identify the underlying cause of the problem and determine a strategic approach to advise our client such as price, volume, cost analysis; competitive landscape; customer trends/need, etc.",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "What analysis could we do to evaluate the industry and potential cause of profitability decline?",
    guidancePreLabel: "Ask the candidate the following",
    guidancePreLines: [
      "**Interviewer should steer** the candidate to look into their identified potential causes of profitability decline. Refer below to various data sets to support their analysis.",
      "  The order and depth of discussion on the following bucketed topics will likely vary from candidate to candidate.",
    ],
    // Interviewer handout: the source marks it "do not share handout".
    shareable: false,
    extraCharts: [
      {
        kind: "multiPie",
        title: "Global market data (do not share handout):",
        rowCenters: ["2016 Market Size\n$50B"],
        centerBox: true,
        pies: [
          {
            title: "Global Mattress Market 2016",
            slices: [
              { label: "USA", value: 62, color: BLUE },
              { label: "China", value: 20, color: SKY },
              { label: "RoW", value: 18, color: PURPLE },
            ],
          },
          {
            title: "Global Mattress Market 2017",
            slices: [
              { label: "USA", value: 60, color: BLUE },
              { label: "China", value: 22, color: SKY },
              { label: "RoW", value: 18, color: PURPLE },
            ],
          },
        ],
        legend: [
          { name: "USA", color: BLUE },
          { name: "China", color: SKY },
          { name: "RoW", color: PURPLE },
        ],
      },
    ],
    dataTableCols: "1.4fr 1fr",
    dataTableHeaders: [hd("Market"), hd("CAGR")],
    dataTableRows: [
      { cells: [L("Global"), L("7%")] },
      { cells: [L("United States"), L("5%")] },
      { cells: [L("China"), L("12%")] },
      { cells: [L("Rest of World"), L("8%")] },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "A good candidate might identify:",
      "  The US is losing market share to other regions",
      "  The loss is due to a slower growth compared to other regions",
      "  Sueno (our client) is focusing on the slowest growth area",
    ],
  },
  {
    n: "04",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "What analysis could we do to evaluate the client sales & financials?",
    guidancePreLabel: "Ask the candidate the following",
    guidancePreLines: [
      "If candidate requests historical financial data for Sueno provide the 2016/17 sales numbers provided in Databank. The interviewer should prompt the candidate to calculate YoY volume & revenue growth % (to determine if performance is above, below or behind competitors/ market). The interviewer should have the candidate walk through the logic and assumptions. There are multiple ways to estimate the value, but a sample calculation is provided below.",
    ],
    infoBoxLabel: "Sample Calculation",
    infoSections: [
      {
        lines: ["2016 to 2017 YoY growth:", "  Units Sold: (3.15M – 3M)/3M = ==5%==*", "  Revenue: ($3.09B - $3.0B)/$3.0B = ==3%==*"],
        paragraphs: [
          "Candidate should be able to identify Sueno’s volume growth is in line with US market, but lags behind China and Rest of World. Also, the gap between revenue and volume growth should be noted.",
        ],
      },
      {
        paragraphs: [
          "Candidate will likely request pricing information, so the interviewer should prompt the candidate to calculate estimate the value per unit. There are multiple ways to, but a sample calculation is provided below:",
        ],
        lines: ["Average revenue per sale per year:", "  2016 Avg. Price/unit: $3B/3M = ==$1,000==", "  2017 Avg. Price/unit: $3.09B/3.15M = ==$980+=="],
      },
      {
        paragraphs: [
          "It may not be necessary for candidate to accurately complete the calculation for 2017 average sales price, but they should be able to set up the equation and note that the average price has obviously fallen below $1000/unit.",
          "If prompted, inform candidate that other areas of potential analysis (e.g. variable costs, fixed costs, overhead) appear to be unchanged and prices remain unchanged.",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "After discussing industry trends and client sales/financials, ask the candidate to analyze the Channel Trend Data.",
    guidancePreLines: [
      "The interviewer should steer the candidate to look into segmenting the market data by channel segment and region. Refer below to various data sets to support their analysis.",
      "Note: Based on how the candidate frames the issue, either provide market segmentation data (as shown in graphs) or share the 2012 -2017 change (i.e. -10% change for US Furniture stores).",
    ],
    // Interviewer handout: the source marks it "do not share handout".
    shareable: false,
    extraCharts: [
      {
        kind: "multiPie",
        title: "Market segmentation data (do not share handout):",
        columns: 2,
        colLabels: ["2012", "2017"],
        rowCenters: ["US\nSize= $30B\nCAGR = 5%", "China\nSize= $8B\nCAGR = 12%", "RoW\nSize= $12B\nCAGR = 8%"],
        pies: [
          {
            slices: [
              { label: "Luxury Brand Stores", value: 17, color: BLUE },
              { label: "Furniture Stores", value: 49, color: SKY },
              { label: "Mattress Stores", value: 34, color: PURPLE },
              { label: "Direct-to-Consumer", value: 0, color: DEEP },
            ],
          },
          {
            slices: [
              { label: "Luxury Brand Stores", value: 16, color: BLUE },
              { label: "Furniture Stores", value: 39, color: SKY },
              { label: "Mattress Stores", value: 40, color: PURPLE },
              { label: "Direct-to-Consumer", value: 5, color: DEEP },
            ],
          },
          {
            slices: [
              { label: "Luxury Brand Stores", value: 19, color: BLUE },
              { label: "Furniture Stores", value: 50, color: SKY },
              { label: "Mattress Stores", value: 31, color: PURPLE },
            ],
          },
          {
            slices: [
              { label: "Luxury Brand Stores", value: 16, color: BLUE },
              { label: "Furniture Stores", value: 50, color: SKY, text: "50%" },
              { label: "Mattress Stores", value: 33, color: PURPLE, text: "33%" },
              { label: "Direct-to-Consumer", value: 3, color: DEEP },
            ],
          },
          {
            slices: [
              { label: "Luxury Brand Stores", value: 13, color: BLUE },
              { label: "Furniture Stores", value: 47, color: SKY },
              { label: "Mattress Stores", value: 40, color: PURPLE },
            ],
          },
          {
            slices: [
              { label: "Luxury Brand Stores", value: 11, color: BLUE },
              { label: "Furniture Stores", value: 43, color: SKY },
              { label: "Mattress Stores", value: 42, color: PURPLE },
              { label: "Direct-to-Consumer", value: 4, color: DEEP },
            ],
          },
        ],
        legend: [
          { name: "Luxury Brand Stores", color: BLUE },
          { name: "Furniture Stores", color: SKY },
          { name: "Mattress Stores", color: PURPLE },
          { name: "Direct-to-Consumer", color: DEEP },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "A good candidate might identify:",
      "  The emergence of direct-to-consumer as a new sales channel",
      "  The Luxury and Furniture Store segments are shrinking",
      "  The Mattress stores segment is taking more share of sales",
      "  A greater portion of 2017 sales are coming from a channel with lower sales prices",
      "  The Chinese market, although growing faster, is only ~26% of the US market",
      "The interviewer should push the candidate to outline thoughts on the impact of identified trends AND how the profitability decline may be mitigated based on the information provided.",
      "Push the candidate to develop hypotheses and quantitatively determine what the largest value at stake opportunity is.",
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Case Wrap-up:** After the candidate has exhausted available data and completed the analysis OR the interview is running out of time, prompt the candidate to provide a summary of the findings for the client and provide a recommendation to increase profitability.",
      "**Evaluation**",
      "  The candidate should be able to clearly and succinctly discuss the findings of the case. They should also discuss the results of the analyses and explain how the analyses impact the case.",
    ],
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        groups: [
          {
            heading: "Select recommendations",
            items: [
              "**Introduce new product** to meet demands of growing “direct-to-consumer” market",
              "**Reposition brand** to meet changing customer needs (i.e. target “luxury” customers”)",
              "**Expand geographically** to take advantage of global market growth in higher priced sales",
              "**Analyze same store sales** (owned stores) to determine if low performing stores should be closed",
              "**Limit availability of product** to mattress retailers (depends on brand strength)",
            ],
          },
          {
            heading: "Risks",
            items: [
              "**Introduce new product:** Cannibalism to higher margin products? What are key criteria for success? Impact on brand reputation? Can costs be cut to maintain margin?",
              "**Expanding geographically:** Pulling out of US, brand impact, investment cost? How would we do it? Market knowledge?",
              "**Repositioning brand:** Can our cost structure support this? Will more low price sales offset lost high price sales in own stores/furniture stores?",
              "**Limit availability of product to mattress outlets:** Is our brand strong enough to drive consumers towards owned stores and dept. stores to find our product?",
              "**Limit discount % allowed by retailers:** Is our brand strong enough to maintain volume at higher prices? Price elasticity of consumers?",
            ],
          },
        ],
      },
    ],
  },
];
