import type { CasePage } from "../content";

export const CASE_ID = "f33c7d51-ba92-469b-b8a5-ae4d38900f80";

export const CASE_META = {
  review: "auto",
  case_type: "Investment Decision",
  synopsis:
    "An oil refinery firm is considering an investment in a filtering unit that turns residual oil into useful feedstock to produce gasoline. Walk through the process diagram, compare operating with and without the filter, and decide whether the investment pays back.",
  full_prompt:
    "Our client, Deepwater, is an oil refinery firm looking at an investment in a filtering unit to transform residual oil into useful feedstock to produce gasoline (show Exhibit 1). The major input is crude oil which gets refined to gasoline. Deepwater would like your help in determining whether or not they should invest in the filtering unit.",
  tags: ["candidate-led", "investment-decision", "energy", "payback", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client, Deepwater, is an oil refinery firm looking at an investment in a filtering unit to transform residual oil into useful feedstock to produce gasoline (show Exhibit 1). The major input is crude oil which gets refined to gasoline. Deepwater would like your help in determining whether or not they should invest in the filtering unit.",
    note: "**Fit Questions** — 1. Why did you decide to come to Booth? 2. Describe the best team you have ever had — what defined your experience?",
    extraCharts: [
      {
        kind: "flow",
        title: "Exhibit 1 (Operations)",
        aspect: 0.5149,
        nodes: [
          {
            text: "Distiller",
            x: 0.4448,
            y: 0.0598,
            w: 0.1789,
            h: 0.1443,
            shape: "box",
            fill: "#3d7cc9",
            fill2: "#2f5f9e",
            stroke: "#4a7ebb",
            strokeWidth: 1,
            color: "#ffffff",
            size: 27,
            shadow: true,
            align: "center"
          },
          {
            text: "Distiller",
            x: 0.5563,
            y: 0.2505,
            w: 0.1789,
            h: 0.1443,
            shape: "box",
            fill: "#3d7cc9",
            fill2: "#2f5f9e",
            stroke: "#4a7ebb",
            strokeWidth: 1,
            color: "#ffffff",
            size: 27,
            shadow: true,
            align: "center"
          },
          {
            text: "Filter",
            x: 0.3795,
            y: 0.5536,
            w: 0.1778,
            h: 0.1443,
            shape: "box",
            fill: "#cc0000",
            fill2: "#5a0000",
            stroke: "#4a7ebb",
            strokeWidth: 1,
            color: "#ffffff",
            size: 27,
            shadow: true,
            align: "center"
          },
          {
            text: "Cracker",
            x: 0.7341,
            y: 0.5536,
            w: 0.1789,
            h: 0.1443,
            shape: "box",
            fill: "#3d7cc9",
            fill2: "#2f5f9e",
            stroke: "#4a7ebb",
            strokeWidth: 1,
            color: "#ffffff",
            size: 27,
            shadow: true,
            align: "center"
          },
          {
            text: "CRUDE",
            x: 0.3938,
            y: 0.133,
            shape: "text",
            align: "right",
            size: 16.5
          },
          {
            text: "GASOLINE",
            x: 0.845,
            y: 0.1,
            shape: "text",
            align: "left",
            size: 16.5
          },
          {
            text: "OIL 6",
            x: 0.6677,
            y: 0.1979,
            shape: "text",
            align: "left",
            size: 16.5
          },
          {
            text: "FEEDSTOCK",
            x: 0.7818,
            y: 0.2856,
            shape: "text",
            align: "left",
            size: 16.5
          },
          {
            text: "RESID",
            x: 0.371,
            y: 0.4773,
            shape: "text",
            align: "right",
            size: 16.5
          },
          {
            text: "FEEDSTOCK",
            x: 0.646,
            y: 0.5825,
            shape: "text",
            align: "center",
            size: 16.5
          },
          {
            text: "Fuel",
            x: 0.6518,
            y: 0.7505,
            shape: "text",
            align: "center",
            size: 16.5
          }
        ],
        arrows: [
          {
            points: [
              [
                0.0149,
                0.1
              ],
              [
                0.4448,
                0.1
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12,
            head: "none"
          },
          {
            points: [
              [
                0.4034,
                0.133
              ],
              [
                0.4448,
                0.133
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.6237,
                0.1
              ],
              [
                0.828,
                0.1
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.6237,
                0.1649
              ],
              [
                0.646,
                0.1649
              ],
              [
                0.646,
                0.2505
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.7351,
                0.3247
              ],
              [
                0.8232,
                0.3247
              ],
              [
                0.8232,
                0.5536
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.5563,
                0.3247
              ],
              [
                0.4687,
                0.3247
              ],
              [
                0.4687,
                0.5536
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.4687,
                0.4856
              ],
              [
                0.3811,
                0.4856
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.0106,
                0.6258
              ],
              [
                0.3795,
                0.6258
              ]
            ],
            color: "ink",
            width: 2,
            headSize: 12,
            dashed: true,
            head: "none"
          },
          {
            points: [
              [
                0.5573,
                0.6258
              ],
              [
                0.7341,
                0.6258
              ]
            ],
            color: "ink",
            width: 2,
            headSize: 14,
            dashed: true,
            headStyle: "filled"
          },
          {
            points: [
              [
                0.913,
                0.6258
              ],
              [
                0.9183,
                0.6258
              ],
              [
                0.9183,
                0.1392
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.6051,
                0.7526
              ],
              [
                0.4687,
                0.7526
              ],
              [
                0.4687,
                0.6979
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.698,
                0.7526
              ],
              [
                0.8232,
                0.7526
              ],
              [
                0.8232,
                0.6979
              ]
            ],
            color: "#4a7ebb",
            width: 2.7,
            headSize: 12
          },
          {
            points: [
              [
                0.6465,
                0.9381
              ],
              [
                0.646,
                0.7887
              ]
            ],
            color: "ink",
            width: 1.2,
            headSize: 8,
            headStyle: "filled"
          }
        ]
      },
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case tests the candidates ability to analyze a manufacturing process and draw conclusions about an industry with which they are not likely to be familiar. This case also tests a candidate's ability to deal with a more ambiguous solution to a case and to draw insights from discussions and brainstorms. Strong candidates will continue to ask appropriate questions to arrive at the details necessary to solve the case. The interviewer should pay close attention to the candidate's delivery as they navigate this somewhat complex case.",
        ],
      },
      {
        paragraphs: [
          "Note: At this point, **prompt** the candidate to walk you through the diagram. Making sure to outline all categories of products:",
        ],
        lines: ["Primary input - crude oil; secondary input - feedstock and fuel; byproduct - oil 6 and residual"],
      },
      {
        paragraphs: [
          "The candidate should **ask** for information regarding the company's products, the market for the products, uses for waste products, and the company background. If they do not ask upfront, these questions should come out as the candidate discusses their framework.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "ROI Analysis" },
          { n: "3", text: "Final recommendation" },
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
    guidancePreIntro: "Please provide this information if/when asked:",
    guidancePreLines: [
      "The usable output is gasoline.*",
      "Oil 6 can be converted to feedstock and then gasoline.*",
      "Residual is a waste product unless the filter is purchased.* Residuals are leftovers (heavy oils).",
      "Gasoline is sold to a competitive market and the company has no influence on the price of gasoline.",
      "There is enough demand for gasoline.",
      "Fuel can be used to fire the different units. If fuel is not available, residual is used.",
      "The filter transforms residual into useful cracker feedstock.",
      "Many of Deepwater’s competitors have invested in this kind of filter unit.",
      "There are no significant environmental concerns with respect to the filter.",
      "There is no outside market for Oil 6 or feedstock.",
      "Note*: A top candidate would recognize this on their own. If the candidate does not, make sure to clarify this.",
      "Make sure the candidate understands the diagram before moving forward.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "A good framework will allow the candidate to test their hypothesis regarding the two alternatives: production and profitability with the filter AND production and profitability without the filter.",
        ],
      },
      {
        label: "Working hypothesis:",
        paragraphs: ["Deepwater should invest in the filtering unit."],
      },
      {
        label: "Scenario A (Without Filter)",
        groups: [
          { heading: "Revenues", items: ["Gasoline $/barrel", "Residual in $/barrel"] },
          {
            heading: "Costs",
            items: [
              "Crude $/barrel",
              "Converting Oil 6 to feedstock and then gasoline; converting fuel to gasoline",
            ],
          },
        ],
      },
      {
        label: "Scenario B (With Filter)",
        groups: [
          { heading: "Revenues", items: ["Gasoline $/barrel"] },
          {
            heading: "Costs",
            items: [
              "Crude $/barrel",
              "Converting Oil 6 to feedstock and then gasoline; converting fuel to gasoline",
              "Investment in filter",
              "Opportunity cost of converting residual instead of selling in $/barrel",
            ],
          },
        ],
      },
      {
        label: "Strategic Risks",
        lines: [
          "Volatility of demand/price for inputs and outputs (crude, residual, fuel and gasoline)",
          "Regulatory changes impacting cost of residual waste production",
          "Environment considerations and potential backlash",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Cost-Benefit Criteria",
    title: "Cost-Benefit Criteria",
    kind: "qa",
    qText: "**Ask** the candidate the following questions:",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**On the diagram, which cost comparison is most relevant?**",
      "  The candidate should see the selling cost for the residual and the cost to purchase the fuel is most relevant to determining whether to purchase the filter.",
      "**Under what scenario would you then utilize residual instead of purchasing outside fuel (i.e. use residual instead of selling it)?**",
      "  If the cost of purchasing fuel is more than the selling price for residual, the client should use residual.",
    ],
  },
  {
    n: "04",
    label: "Strategic Criteria",
    title: "Strategic Criteria",
    kind: "qa",
    qText: "**Ask** the candidate:\nIf we sell all residual and buy fuel to make gasoline what concerns may arise?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Changes in fuel price and availability will impact cost / benefit of selling residual vs converting to feedstock.",
      "Note: Candidate should go through Porter’s Five forces focusing on buyer and supplier power (this should be an opportunity for structuring and brainstorming). As the interviewer, **drive** this to be a discussion between you and the candidate, continuously asking “what else?” and **pushing** the candidate to fully analyze all potential risks.",
    ],
  },
  {
    n: "05",
    label: "Investment Decision",
    title: "Investment Decision",
    kind: "qa",
    guidancePreLabel: "Investment Decision",
    guidancePreLines: [
      "The candidate should ask for more data on the different costs and selling prices. **Only give data** for items that the candidate brings up.",
      "The client estimates an investment cost of ==$40M== and a ==20 year== useful life of the filter (assume straight line depreciation).",
      "The client also estimates annual operating costs of ==$4M== per year for the filter.",
      "With the filter we can make an additional ==5,000 barrels/day== at a contribution margin of ==$4/barrel==.",
      "The plant operates ==350 days== per year.",
      "After discussing the above information, **ask**, “what is the payback period?”",
    ],
    answerText: "The candidate should do a similar analysis to the one shown here:\n- Annual Contribution Margin (CM) = $20K/day * 350 days/year = ==$7M/year==\n- Annual Operating Profits = CM – FC = $7M – $4M = ==$3M/year==\n- Payback period = investment/operating profit\n  $40M / $3M per yr. = ==~13 years==\n- Payback period is approximately 13 years, which is enough to cover for additional depreciation.\n- Annual profit after depreciation is ==$1M==.",
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    guidancePreLabel: "Recommendation",
    guidancePreLines: [
      "It is profitable for the client to invest in this filtering unit",
      "  Payback period is ==13 years==",
      "  Annual profit after depreciation is ==$1M==",
    ],
    infoBoxLabel: "Risks and Next Steps",
    infoSections: [
      {
        label: "Risks",
        lines: [
          "Volatility in the market of residual and gasoline",
          "Changing environmental concerns about the technology",
          "  Taxes on gasoline might increase, the firm may come under increased scrutiny from environmentalists, etc.",
          "Lost relationships with customers that purchased cheap residual",
        ],
      },
      {
        label: "Next steps",
        lines: [
          "Assess volatility in the markets in both the short and long term to determine any impact on the investment decision",
          "Perform sensitivity analysis under different tax scenarios and technology implementations to evaluate profitability",
          "Identify new customers for gasoline or additional byproducts",
        ],
      },
    ],
  },
];
