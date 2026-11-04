import type { CasePage } from "../content";

export const CASE_ID = "459e9363-6483-4c79-a347-34f1affcdec1";

const PROMPT =
  "This is 1996. Our client is a major cell phone manufacturer that has #1 market share globally, but are now #3 in the US. The US cell phone market has been growing at 15% CAGR and has an annual volume of 100M units. They would like to know what has happened to their market share in the US and how to go about restoring it to #1. They believe that the US market is key to their global dominance. Revenues have been increasing, while profits have remained flat; however, they believe this is due to the change in market share and is not a cost issue.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Share",
  synopsis:
    "A cell phone manufacturer that leads globally has slipped to third in the US market in 1996. Work out what happened to its market share and how to restore it.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "market-share", "exhibit-heavy", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question (spend 15 minutes on): Tell me about a time when you were in an ethically ambiguous situation",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Overview [Interviewee-led]",
        paragraphs: [
          "This is a market share case. Possible structures includes 3C, External vs. Internal, etc. Industry landscape, competition, product, company, and channels are all reasonable starting points. The key to the case is that client shift from high margin product to low margin product, and as a result, the profit remained flat while the revenue increased.",
        ],
      },
      {
        label: "Case Information",
        lines: [
          "It is essentially an oligopoly with 3 companies controlling almost the entire market.",
          "If ask about international market: answer is to focus on US for now.",
          "Timeframe: Mid-nineties. iPhone is not the answer!",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "**What is the potential cause of the stagnant market size in the United States?**",
    guidancePreLines: ["Approach / Analysis [Provide Exhibit 1,2, and 3 in order]"],
    extraCharts: [
      {
        kind: "combo",
        title: "Client's Revenues And Margins From 1993 to 1996",
        titleAlign: "center",
        categories: ["1993", "1994", "1995", "1996"],
        lines: [
          { name: "Margins", color: "#4f4f57", width: 4, values: [80, 85, 85, 85] },
          { name: "Revenues", color: "#b01c1c", width: 4, values: [100, 105, 120, 130] },
        ],
        yMin: 0,
        yMax: 140,
        yStep: 20,
        axisStyle: "plain",
        xPlacement: "between",
        legend: "right",
        fontScale: 1.5,
        titleSize: 26,
        plotAspect: 0.5,
      },
      {
        kind: "combo",
        title: "Client's Volume and Growth by Segment (US)",
        titleAlign: "center",
        titleSize: 22,
        categories: ["Below $100", "$100-500", "$500-$1,000", "Above $1000"],
        bars: { name: "Volume", color: "#c00000", values: [50, 25, 15, 10], valueLabels: true, valueSuffix: "%", widthRatio: 0.4 },
        lines: [
          {
            name: "Growth",
            color: "#333333",
            width: 4,
            onAxis2: true,
            values: [8, 9, 10, 6],
            valueLabels: true,
            valueSuffix: "%",
            labelColors: ["#ffffff", null, null, null],
            labelPos: [null, null, null, null],
          },
        ],
        yMin: 0,
        yMax: 50,
        yStep: 10,
        yTickSuffix: "%",
        y2Min: 0,
        y2Max: 12,
        y2Step: 2,
        y2TickSuffix: "%",
        axisStyle: "plain",
        legend: "inside",
        legendBox: true,
        fontScale: 1.2,
        plotAspect: 0.4,
      },
      {
        kind: "combo",
        title: "Industry's Volume and Growth by Segment (US)",
        titleAlign: "center",
        titleSize: 22,
        categories: ["Below $100", "$100-500", "$500-$1,000", "Above $1000"],
        bars: { name: "Volume", color: "#c00000", values: [45, 20, 10, 25], valueLabels: true, valueSuffix: "%", widthRatio: 0.4 },
        lines: [
          {
            name: "Growth",
            color: "#333333",
            width: 4,
            onAxis2: true,
            values: [6, 11, 8, 24],
            valueLabels: true,
            valueSuffix: "%",
            labelColors: ["#ffffff", "#ffffff", null, null],
            labelPos: [null, "below", null, null],
          },
        ],
        yMin: 0,
        yMax: 50,
        yStep: 10,
        yTickSuffix: "%",
        y2Min: 0,
        y2Max: 30,
        y2Step: 5,
        y2TickSuffix: "%",
        axisStyle: "plain",
        legend: "inside",
        legendBox: true,
        fontScale: 1.2,
        plotAspect: 0.4,
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Exhibit #1: The key takeaway is that market is growing at 15% CAGR (as given in prompt) so revenues are increasing, but profits remained flat. Repeat that this is due to a loss in market share but could also be about revenues/costs. If ask about revenues or product, go to Exhibit #2. If not, wrap up Exhibit #1 and direct them to #2.",
      "Exhibit #2: The key here is to recognize that company's growth is below 15% (overall industry growth) in every segment. Be careful **not** to claim that it is underperforming in every customer segment since it is statistically possible that this is not the case. Other insight is that majority of unit sales volume is in very low and low end (75%). These sales could be lower margins and customers might be price sensitive. After these comments have been made move to Exhibit #3.",
      "Exhibit #3: The key takeaways are that the 100+ range is where all of the growth is. Secondly, the below $100 market is growing the slowest and is only area where client is outperforming market. The interviewee should note that the 100+ market as the source of market share and profitability issues.",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "**The client wants to focus on the low/very low end market. What are the pros and cons of this strategy?**",
    guidancePreLines: [
      "The client recognized that majority of the growth comes from the 100+ segment, but they want to actually continue to penetrate the very low and low end of the market.",
    ],
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Pros",
        paragraphs: [
          "Client is #1 globally, has the scale to produce profitably (can mention experience curve), and is the natural owner of this segment. They could potentially get to #1 market share domestically, albeit via lower priced products. Additionally, focusing on the low/very low end market could help them globally as emerging markets open and rising incomes help spread the proliferation of likely lower priced cell phones.",
        ],
      },
      {
        label: "Cons",
        paragraphs: [
          "The 100+ segment is growing at 24% CAGR and will exceed the low end in a few years. From a long-term perspective, this growth will prevent the client from maintaining #1 share in the US even if they attain it in the short term through this strategy. It could be helpful to understand the motivations of the client and why they view US market share as the key.",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "**You walk into the CEO. What's your quick 2-minute recommendation?**",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: ["Ask the candidate to come up with the recommendation immediately. No time to think about the structure."],
  },
];
