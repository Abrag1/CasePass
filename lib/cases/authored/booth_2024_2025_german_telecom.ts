import type { CasePage } from "../content";

export const CASE_ID = "406085fb-867e-4ac3-a125-c43d7d3861ef";

const PROMPT =
  "Our client is a large German telecom company. It is considering making a bid in an auction for one of 5 licenses to operate a new generation of mobile phone networks (4G) in the United Kingdom.\n\nIt has engaged BCG to help with the issue and determine the appropriate strategy for the auction.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A large German telecom company is considering a bid in an auction for one of 5 licenses to operate 4G mobile networks in the United Kingdom. Assess whether the license is profitable over its life and what the bid strategy should be.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "profitability", "breakeven", "bidding-strategy", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you’ve faced a challenge as part of a team. 2. Tell me about a time when you led a team to elevate its performance to a new level.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case assesses critical thinking and analytical problem solving while evaluating the profitability of a specific action for the client. It is a great case for testing a candidate’s ability to ask the right questions to obtain the correct information and drive the problem forward. It is **heavily candidate-driven**.",
          "**Provide** the case prompt below and then provide additional information (on the following page) **only as the candidate asks for it**. You should allow the candidate to drive the interaction.",
        ],
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
    guidancePreLines: [
      "**If the candidate asks for more information on the AUCTION, provide the following:**",
      "  The auction will be a sealed bid auction with all bids received simultaneously. Since it is a sealed bid auction, our client will not know the true bidding strategies of its competitors with any certainty.",
      "  The licenses will go to the highest 5 bidders. Each bidder can attain only one license. The licenses will be valid for 5 years.",
      "  The British government intends for the auction to open the mobile phone market to competition to help control consumer prices. As a result, one license has been reserved for a new entrant, but the other four are open to both new entrants as well as established competitors.",
      "  The auction is the first of its kind for 4G networks in Europe.",
      "**If the candidate asks for more information on the TECHNOLOGY, provide the following:**",
      "  The most important characteristics are the high data speeds and increased capacity for service that it offers.",
      "  It will enable data speeds of up to 5x greater than the most advanced 3G networks available today.",
      "  Additional 4G spectrum enables incumbent wireless companies to build out their capacity in order to support more customers and to enable high-bandwidth services in an environment that is increasingly capacity-constrained.",
      "  Following the introduction of 4G technology, old technology networks will be phased out by the government over the span of 3 years.",
      "Note: The candidate should, at this time, **draw out a framework**. Below is more information the candidate may ask for; **provide this only if the candidate asks**.",
      "**If the candidate asks for more information on the CLIENT, provide the following:**",
      "  It is a market leader in Germany.",
      "  It has a large presence in the rest of Europe, but no presence in the United Kingdom currently.",
      "  It has been experiencing stagnating growth and is looking for opportunities to expand.",
      "  It has the financial capability to bid what is needed, but does not want to overpay for the license.",
      "  It has the financial capability to build the network that will be needed to operate in the UK.",
      "**If the candidate asks for more information on the COMPETITION, provide the following:**",
      "  It is unclear how many competitive bids will be received or who will bid.",
      "  Four major operators exist in the current UK market, and they roughly split the market equally.",
      "  They already have established networks as well as retail outlets that can be leveraged for the introduction of 4G technology.",
      "**The Market**",
      "  Approximately 30 million people have a mobile phone in the UK.",
      "  Converting to the new network will require the purchase of a 4G network-enabled device.",
      "**Volume**",
      "  Some potential for growth beyond current market due to new services.",
      "  Must consider that conversion of customers will be critical and that client is at a disadvantage compared to established competitors.",
      "  A likely outcome is that our client will receive less than 1/5 of the total customers due to new entrant status.",
      "**Price**",
      "  Customers pay £30 per month for their current mobile phone plans, cost is expected to be higher for 4G.",
      "  Could charge additional fees for additional services and allow customer to pick and choose what they want.",
      "  Could charge more for a fixed plan with all services included; however, there will also be increased competition in the market.",
      "  Candidate should consider both the factors that will increase the price (new services) and decrease the price (increased competition).",
      "**Fixed Cost**",
      "  Significant upfront cost for our client as they must set up the network and retail chains.",
      "  Upfront costs not as significant for established competitors (a key disadvantage for our client).",
      "  Once network is established, fixed costs consist of:",
      "    Network operation",
      "    Maintenance",
      "    Retail operations, etc.",
      "**Variable Cost**",
      "  Minor once network is established (i.e. one extra customer costs little).",
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "UK Market Potential",
          children: [
            { label: "Size of market and projected growth" },
            { label: "Expected market share" },
            { label: "Adoption rates of 4G from 3G" },
            { label: "Expected lifespan of 4G" },
            {
              label: "Profitability",
              children: [
                {
                  label: "Revenue: # customers x price",
                  children: [{ label: "Customer willingness to pay" }, { label: "Potential additional services" }],
                },
                {
                  label: "Costs",
                  children: [
                    {
                      label: "Fixed Costs",
                      children: [{ label: "Upfront costs (initial network build)" }, { label: "Ongoing costs (operations, maintenance, retail)" }],
                    },
                    {
                      label: "Variable Costs",
                      children: [{ label: "Customer acquisition cost" }, { label: "Cost per customer to operate" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "German Telecom Capabilities",
          children: [
            { label: "Ability to market to customers in UK" },
            { label: "Existing technology and expertise to install and execute? Need to hire?" },
            { label: "Competitive advantage over others" },
            { label: "Status of brand, customer service reputation" },
            { label: "Financial situation (have cash or ability to acquire)" },
          ],
        },
        {
          label: "Competitive Environment",
          children: [
            { label: "Less important since industry is a licensing model and number of competitors is known" },
            { label: "Competitive advantage of each" },
          ],
        },
      ],
    },
    infoBoxLabel: "Transition",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** The client should bid for the license as long as profitability can be established, in PV terms, for the life of the license. I would first like to calculate this and then establish the bid price.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should utilize **industry specific terminology and examples** as they walk through the framework.",
      "There are two parts to this case. First, the candidate must assess if the market is attractive for our client by assessing the total profitability over the 5 years life of the license. Once complete, the candidate should determine an appropriate bid price.",
      "**Do not provide** the candidate with all of the information on the right. Rather, **push** them to make assumptions about each factor and work with them to uncover the information. Actual numbers for the calculation are provided on the next page.",
    ],
  },
  {
    n: "03",
    label: "Assessing Profitability",
    title: "Assessing Profitability",
    kind: "qa",
    guidancePreLabel: "Assessing Profitability",
    guidancePreLines: [
      "The candidate should be driving to calculate the annual revenues and costs in order to calculate the profitability and present value of the future cash flows for the next 5 years (life of the license).",
      "At this point, **instruct** the candidate not to worry about discounting future cash flows (or tell them that the discount rate is 0%).",
      "Note: Some candidates may come up with their own assumptions (e.g., retention rate of customers, adoption rates, market growth each year, etc.). Feel free to allow for more difficult calculations depending on the candidate’s level of case practice. The solution below is simply illustrative.",
    ],
    infoBoxLabel: "Data to Provide",
    infoSections: [
      {
        paragraphs: [
          "If the candidate is struggling to come up with values for price, volume, fixed cost, and variable cost, provide the following guidance:",
        ],
        groups: [
          {
            heading: "Price",
            items: ["Average price per customer is likely to increase to £50 due to new service adoption among key customer segments."],
          },
          {
            heading: "Volume",
            items: ["Assume an increase of 33% in customers (to 40M) overall.", "Assume the client will receive 1/8 of market annually (5M total)."],
          },
          { heading: "Fixed Costs", items: ["£740M to build network.", "£50M to run network annually."] },
          { heading: "Variable Costs", items: ["£50M to run network annually."] },
        ],
      },
    ],
    calcNote: "Calculations",
    calcTable: {
      title: "Revenues",
      headers: ["Revenues", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "TOTAL"],
      rows: [
        ["Price/Customer", "£600 (£50x12)", "£600 (£50x12)", "£600 (£50x12)", "£600 (£50x12)", "£600 (£50x12)", ""],
        ["# of Customers", "5M", "5M", "5M", "5M", "5M", ""],
        ["Revenues", "£3B", "£3B", "£3B", "£3B", "£3B", "£15B"],
      ],
      totalLast: true,
    },
    calcTables: [
      {
        title: "Costs",
        headers: ["Costs", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "TOTAL"],
        rows: [
          ["Build Network", "£740M", "£0", "£0", "£0", "£0", "£740M"],
          ["Run Network", "£50M", "£50M", "£50M", "£50M", "£50M", "£250M"],
          ["Variable Costs:", "£50M", "£50M", "£50M", "£50M", "£50M", "£250M"],
          ["Total Costs", "", "", "", "", "", "£1.24B"],
          ["Total Profit", "", "", "", "", "", "==£13.76B=="],
        ],
        totalLast: true,
      },
    ],
    guidanceLabel: "Calculations",
    guidanceLines: [
      "Our client’s bid is based on an assessment of profitability:",
      "  The bid could be as high as the total value of the cash flows from the license (break-even).",
      "  The candidate should consider if the bid should be lower to realize some profits from the venture.",
      "  As a result, the bid will be **no higher than** ==£13.76B==.",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: ["German Telecom should bid for the 4G mobile network in the United Kingdom"],
        lines: [
          "Bid price can be up to ==£13.76B== based on projected profits and break-even analysis",
          "Our assumption is based on an expected market share of 1/8 due to fierce competition, especially with several companies already established in the UK.",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Competition from foreign telecom companies; inability to capture 1/8 market share",
              "Unable to charge estimated average price of £50, which leads to lower revenues",
              "Government issuance of additional licenses or withdrawal of existing licenses",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Appraisal of foreign competitor landscape and likelihood of other new entrants into UK market",
              "  Market analysis to calculate feasibility of capturing intended market share",
              "Pricing analysis to determine customers’ actual willingness to pay for higher speed service",
              "Develop contingency plans to deal with new regulations should they arise",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "A good candidate response will provide a clear recommendation backed by the data with a mention of key risks to moving forward.",
      "A strong candidate will also recognize that the 4 UK-established competitors are willing to pay far more as their fixed costs will likely be significantly lower. This would imply that it is unlikely that our client would be willing to outbid the established competitors as a result. Instead the client’s real competition comes from other new entrants for the license reserved for them.",
    ],
  },
];
