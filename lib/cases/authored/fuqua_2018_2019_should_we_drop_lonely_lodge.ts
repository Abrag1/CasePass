import type { CasePage } from "../content";

export const CASE_ID = "7e6f7ced-073e-43be-a482-f02cbf109225";

const PROMPT =
  "Our client is the designer and publisher of Day Fort, a free-to-play multiplayer shooting game. Over the past 5 years, Day Fort has broken both revenue and profit records for the gaming industry. However, the client’s profitability has declined recently. Your client has hired you to help them improve the profitability of Day Fort.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A free-to-play online shooting game has seen its profitability decline even as the industry grows. Diagnose why, use market data to find the gap, and quantify the opportunity.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "video-games", "exhibit-heavy", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a time you had to convince a manager or colleague that their approach was ineffective. Question 2: Tell me about a time that you exceeded expectations to deliver on a major project.",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**If asked**: How does Day Fort make money if it is free to play?",
      "  Through selling customizable skins (outfits) for the in-game characters",
      "  Selling season “battle passes” that allow players to unlock skins by playing the game",
      "**If asked**: How do they source their “skins”?",
      "  They are made, for free, by the community of players",
      "**If asked**: Who are the customers:",
      "  People purchase the game on their computer and are from all over the world",
      "**If asked**: What is the timeline:",
      "  As soon as possible",
      "**If asked**: Is there a specific profitability target?",
      "  No specific goal",
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    extraCharts: [
      {
        kind: "stackArea",
        title: "Online multiplayer games profit pool (2014-2018) ($M)",
        categories: ["2014", "2015", "2016", "2017", "2018"],
        yMax: 30,
        yStep: 5,
        series: [
          { name: "Day Fort", color: "#cccccc", values: [0.8, 2.2, 10.6, 15.1, 12.5] },
          { name: "CS: Stop", color: "#ffff00", values: [4.5, 4.5, 4.5, 4.5, 5.2] },
          { name: "PUB A", color: "#3949a0", values: [1.2, 1.4, 1.9, 2.1, 3.5] },
          { name: "Day G", color: "#000000", values: [1.5, 1.4, 1.4, 1.5, 2.0] },
          { name: "Other", color: "#3d5a3a", values: [3.4, 3.8, 4.1, 4.2, 4.3] },
        ],
      },
    ],
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "Present this exhibit after the candidate asks for more information on the profitability of competitors",
      "The candidate should not start performing calculations, the insights drawn from this page can be derived without performing any math",
      "Once the candidate asks about customer preferences, provide them with exhibit 2",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Candidate should identify that:",
      "  Our client has the only game that lost profitability between 2017-2018",
      "  As a whole, the industry’s profitability is increasing",
      "An exceptional candidate will identify that our clients profitability has decreased 10% over the 17-18 year while the industry’s as a whole has increased 10%",
    ],
  },
  {
    n: "03",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    axisBarTitle: "Online multiplayer games market research survey results\nImportance/Performance (10=excellent most important, 1=poor/least important)",
    axisBarSeries: [
      { name: "Day Fort", color: "#c40d3c" },
      { name: "CS: Stop", color: "#3949a0" },
      { name: "Day G", color: "#a0b0d0" },
    ],
    axisBarGroups: [
      { label: "Item Trading\nAllowed", values: [0, 8, 9] },
      { label: "Game Play", values: [9, 10, 6] },
      { label: "Community", values: [9, 8, 6] },
      { label: "New Features", values: [8, 5, 5] },
    ],
    axisBarYMax: 10,
    axisBarYStep: 1,
    axisBarNoGrid: true,
    axisBarAxisLines: true,
    axisBarLegendRight: true,
    axisBarValueLabels: true,
    axisBarLabelsAbove: true,
    axisBarValueInk: true,
    axisBarTouching: true,
    axisBarTitleCentered: true,
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "The candidate should not start performing calculations, the insights drawn from this page can be derived without performing any math",
      "Once the candidate provides the recommendation that the client should allow for item trading in game, provide them with the following numbers to compare profitability scenarios",
      "  Number of players: 125M",
      "  Current",
      "    Percent of players who purchase items: 1%",
      "    Average spend per year: $10",
      "    Profit margin %: 100",
      "  If trading is allowed",
      "    Percent of players who purchase items: 10%",
      "    Average spend per year: $3",
      "    Profit margin %: 50",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Candidate should identify that:",
      "  Our client is at the top/close to the top in every category except for “Item Trading Allowed”",
      "At this point, the candidate should recommend that the client allow for item trading in the game",
      "Analysis on profitability scenarios:",
      "  Current Profit: ==$12.5M==",
      "  New Profit: ==$18.75M==",
      "  Difference: ==$6.25M==",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The CEO is about to walk into the room, please provide them with a recommendation.",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Recommendation will include:",
      "  The client should begin to allow items to be traded;  they have following behind industry trends.",
      "    Doing so will increase profits by ==$6.25M== -> a roughly ==50% increase==",
      "  Next steps, work with the dev team to build out a trading system; analyze competitor practices to identify effective trading systems.",
      "  Risks: community doesn’t respond well to the change in skins; effective trading systems are patented -> client would have to build a new system without expertise.",
    ],
  },
];
