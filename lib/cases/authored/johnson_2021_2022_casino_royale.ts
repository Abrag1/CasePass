import type { CasePage } from "../content";

export const CASE_ID = "d0e69784-4efe-4d89-a877-ed95cd97c9d3";

const PROMPT =
  "Our client is Casino Royale, a luxurious casino on the coast of Montenegro. Recently, Casino Royale closed a series of slot machines after losing several jackpots in the period of six months. Casino Royale has asked for our assistance in determining what they should do with this floor space instead.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A luxury casino has closed a group of slot machines and wants to make the most money from the freed floor space. Compare table games, test a high-roller table and brainstorm how to attract high rollers.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "mental-math", "brainstorming", "casino"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Case Question. Spend 15 Minutes on: Describe a time when you worked in a high-functioning team",
  },
  {
    n: "02",
    label: "Case Information / Structuring",
    title: "Approach/ Analysis (Structuring)",
    kind: "qa",
    guidancePreLabel: "Case Information",
    guidancePreIntro: "There are two important clarifying questions for the interviewee to ask:",
    guidancePreLines: [
      "1) Is there a goal in determining what to do with the floor space? **Yes, Casino Royale is a casino and wants to make as much money as possible.**",
      "2) How big is the floor space and where is it located? **Casino Royale has closed 4 slot machines, which is the equivalent of one table game. The slot machines were located in the center of the casino floor.**",
      "  If the interviewee does not ask this question, lead them to think about it before they build a structure. This question  will help the interviewee narrow their focus on the problem. There is a big difference between structuring the problem if the casino closed 50 slot machines against the wall of the casino and four in the middle of the floor.)",
      "Additional Question: What games does Casino Royale have? **Casino Royale offers blackjack, poker, slots, roulette, and craps**",
    ],
    infoBoxLabel: "Approach/ Analysis (Structuring)",
    infoSections: [
      {
        label: "Structure suggestions",
        paragraphs: [
          "Structure should focus on what to do with floor space. All answers should drive at increasing profitability.",
        ],
      },
      {
        label: "Approach 1:",
        groups: [
          {
            heading: "Existing Games",
            items: [
              "Which game is most profitable?",
              "What is demand for games?",
              "How does casino make money from each game?",
            ],
          },
          {
            heading: "New Games",
            items: [
              "Are there any games at neighboring casinos worth installing?",
              "What new games are customers interested in?",
            ],
          },
          {
            heading: "Alternatives",
            items: [
              "Can casino royale use the floor space for something else (e.g. restaurant, bar, massage tables, etc.)?",
            ],
          },
        ],
      },
      {
        label: "Approach 2: Three C’s Approach",
        paragraphs: ["Casino Royale (Company), Gamblers (Customers), Neighboring Casinos (Competition)"],
      },
    ],
  },
  {
    n: "03",
    label: "Exercise 1: Revenue Considerations",
    title: "Exercise 1: Revenue Considerations",
    kind: "qa",
    qText:
      "**Prompt One:**\nCasino Royale has done some due diligence and decided to add one table game in place of the slot machines. It has narrowed its options down to Blackjack and Poker. What information would you want to know?",
    guidancePreLines: [
      "The interviewee should build a mini-structure designed to assess the profitability of one table of blackjack vs. one table of poker. Information sought should include Revenue (# of players, # of seats, $ wagered per hand, % of hands won and lost/% charged by casino per hand, chours of operation, etc.) and Costs (Dealer salaries, operating expenses, table costs, chips, cards, security, drinks, etc.)",
      "**Before moving on make sure the interviewee understands how a casino makes money from both games:**",
      "  Blackjack is a game where the gambler bets against the house (casino). The odds are slightly in the casino’s favor to ensure that it wins in the long-run.",
      "  Poker is a game where the gambler bets against other gamblers. The casino earns money by taking a rake (a percentage of the total pot each hand).",
    ],
    infoBoxLabel: "Information to provide",
    infoSections: [
      { paragraphs: ["Once the interviewee has completed their mini-structure, you can provide the following information:"] },
      {
        label: "Blackjack Considerations",
        lines: [
          "Blackjack table seats 5 players at a time",
          "The average capacity of a blackjack table is 80%",
          "The average wager of a player is $25 per hand",
          "A player averages 40 hands per hour",
          "The casino wins 60% of the Blackjack hands",
          "  This implies casino also loses 40% of blackjack hands – DO NOT PROVIDE THE LOSS INFORMATION",
        ],
      },
      {
        label: "Poker Considerations",
        lines: [
          "Casino Royale charges a 5% rake (takes 5% of total pot ea. hand)",
          "Average hand at a poker table is $300",
          "There is an average of 50 hands per hour at a table",
        ],
      },
      {
        label: "Additional Considerations",
        lines: ["Both tables are open for 20 hours per day", "Operating costs (dealers, cards, security) are the same"],
      },
    ],
  },
  {
    n: "04",
    label: "Exercise 1: Which game earns more money per day?",
    title: "Given this information, which game earns more money per day?",
    kind: "qa",
    qText: "Given this information, which game earns more money per day?",
    calcLines: [
      {
        q: "Blackjack Calculations",
        a: "Expected Calculation\n(# of seats * Avg. Capacity) = Avg. Players at table\n(5 seats * 80% capacity) = 4 players on avg. at table\n\n(Avg. wager * Avg. hands/hour * # hours) = Avg. revenue per player\n($25 * 40 hands per hour * 20 hours) = $20,000 per player per day\n\n(Avg. players at table * Avg. revenue per player * Casino win %)\n(4 players * $20,000 * (60%-40%***)) = ==$16,000==\n\n***Candidate needs to subtract 40% of losses to arrive at revenue",
        stack: true,
      },
      {
        q: "Poker Calculations",
        a: "Expected Calculation\n(Avg. pot size * Casino rake) = Avg. revenue per hand played\n($300 per hand * 5% casino rake) = $15 per hand\n\n(Avg. rev per hand * Avg. # hands per hour * Avg hours)\n($15 per hand * 50 hands per hour * 20 hours) = ==$15,000==",
        stack: true,
      },
    ],
    calcNote: "Note: Operating costs are equal, so only need to calculate revenue",
    guidanceLines: [
      "**Candidate should notice:**",
      "  Blackjack makes $1,000 more per day than poker",
      "  Costs are not a factor (operating both games costs the same) so for the purpose of this exercise, we only need to focus on revenue",
      "**An excellent candidate will notice:**",
      "  Blackjack 60% win rate is not the casino’s revenue. The casino also loses 40% of the blackjack hands. Shortcut is to take 20% (60%-40%) of total money bet on the table per day.",
      "  Poker is less risky. In poker, the casino earns $15,000 a day without the possibility of losing. In blackjack, the average return is $16,000 per day, but there’s the possibility to incur significant losses on a day-to-day basis.",
      "  From this, it may be inferred that Poker is the optimal choice, but the interviewer should remind the candidate that these are averages and in the long-run the casino will make a 20% margin on Blackjack",
      "  Annualized return for casino (CEO level insight) is $1,000 per day is $365,000 more per year – **lot of money!!!**",
      "Interviewee should drive out of Exercise One with Blackjack as the recommendation.",
    ],
  },
  {
    n: "05",
    label: "Exercise 2: High Roller Considerations",
    title: "Exercise 2: High Roller Considerations",
    kind: "qa",
    qText:
      "**Prompt Two:**\nCasino Royale has decided to move forward with Blackjack. However, after recent inspiration from the James Bond movie “Casino Royale”, the casino is considering making this Blackjack table a “High-Rollers” table.",
    guidancePreLines: ["(Provide the candidate with the following information)"],
    infoBoxLabel: "Information to provide",
    infoSections: [
      {
        label: "High Roller Blackjack Considerations",
        lines: [
          "High Rollers wager $1,000 per hand",
          "High Rollers play 2 hands at a time",
          "High Roller plays 30 hands per hour and typically play for 1 hour",
          "Due to the nature of High-Rollers, the casino provides incentives to its elite clientele. Every high roller receives a comped room, bottle of champagne and dinner on the house. This amounts to $6,000 per high roller.",
        ],
      },
      {
        label: "Ask the interviewee the following questions (wait for answer to 1 before asking 2):",
        steps: [
          { n: "1", text: "What % of hands would the casino need to win to break-even on a high-roller that plays for 1 hour?" },
          { n: "2", text: "Should the Casino make this table high roller?" },
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Exercise 2: Break-even",
    title: "Break-even on a high roller",
    kind: "qa",
    qText:
      "What % of hands would the casino need to win to break-even on a high roller that plays for one hour?",
    calcLines: [
      {
        q: "Expected Calculation",
        a: "(Avg. wager * Avg. hands played * Avg. hands/hour) = Avg. Rev per hour\n($1,000 * 2 hands played * 30 hands/hour) = $60,000",
        stack: true,
      },
      { q: "Total Costs per High Roller", a: "$6,000" },
      {
        q: "To calculate win % needed to BE, candidate should setup:",
        a: "$60,000 * (win %) = $6,000 → Win % = $6,000/$60,000 = ==10%==",
        stack: true,
      },
    ],
    guidanceLines: [
      "**Note:** 10% represents the marginal win %, candidate should recognize that the actual win % required is ==55% of hands==",
      "  (55% win – 45% loss = 10% breakeven)",
    ],
  },
  {
    n: "07",
    label: "Exercise 2: High rollers table",
    title: "Should the casino make this table a high rollers table?",
    kind: "qa",
    qText: "Should the casino make this table a high rollers table?",
    guidancePreLines: [
      "**Note:** the interviewee can assume that the casino still expects to win 60% (and lose 40%) of the hands for high rollers.",
      "Ensure that the interviewee is making an apples-to-apples comparison. The expected return for one high roller in one hour is $6,000 while the expected return from a twenty-hour day at a regular blackjack table is $16,000.",
      "If the interviewee struggles, ask them to think about how many hours or players they would need at a high roller table to make more money?",
    ],
    calcLines: [
      {
        q: "Expected Calculation",
        a: "$60,000 * 20% (win rate) = $12,000 - $6,000 (fixed costs) = ==$6,000 per hr==",
        stack: true,
      },
      {
        q: "Expected Calculation",
        a: "Regular blackjack = $16,000 / $6,000 = 2 2/3 hours/players ~ ==3 hrs/plyrs==",
        stack: true,
      },
    ],
    guidanceLines: [
      "**Ask the interviewee does it seem doable to get 3 players at a high roller table per day?**",
      "The interviewee should conclude that given a regular blackjack table is operating at 80% capacity for twenty hours a day, it seems likely that the casino can attract 3 high rollers for one hour or 3 hours of play per day. While there’s no information on high roller demand, interviewee should recognize potential for upside and recommend high roller table.",
      "**Candidate should notice:**",
      "  High-Rollers wager $60,000 per hour",
      "  In one hour, Casino Royale would need to win 10% more hands than it loses to Breakeven on the comped gifts for high roller",
      "  With the regular win rate margin of 20%, Casino Royale can expect to exceed the Breakeven point and make money on high rollers as long as it’s able to attract over 3 high rollers or 3 hours of play",
      "**An excellent candidate will notice:**",
      "  There are two levers the casino can pull for high rollers: players and hours",
      "  Increasing the amount of time a High Roller stays at the table or the number of hands it plays will increase payoff for Casino Royale.",
      "  In fact, getting a high roller to play for two hours is more profitable than getting two high rollers for one hour. The $6,000 benefits package is a fixed cost. The casino can expect to earn $12,000 for every additional hour a player spends at the table.",
    ],
  },
  {
    n: "08",
    label: "Exercise three: Brainstorm",
    title: "Exercise three: Brainstorm",
    kind: "qa",
    qText:
      "Unfortunately, Casino Royale’s Marketing Director is on vacation in Las Vegas. They’ve asked for our help in launching a new campaign for this High Roller table. What are some things Casino Royale should consider to attract High Rollers?",
    infoBoxLabel: "Expected Actions",
    infoSections: [
      {
        paragraphs: [
          "Brainstorm should be structured to focus on things the casino can do to attract high rollers. Potential approaches can include:",
        ],
        lines: ["New vs. existing clients", "Game play vs. non-game play", "Players vs. hours"],
      },
      {
        paragraphs: [
          "Interviewee should recognize that the target audience for high rollers are extremely affluent. These players are wagering $60,000 per hour. These people have a lot of money and we need to think about what attracts these types of players.",
        ],
      },
      {
        paragraphs: [
          "Recommended approach is to focus on experience and make sure these casino guests are treated like royalty and have such a good time they don’t worry about losing money at the tables. Ideas can include parties, private jets, wagyu steaks, caviar, private chefs, etc.",
        ],
      },
    ],
  },
  {
    n: "09",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    qText:
      "The President of Casino Royale is walking through the casino floor in a few minutes. She’s asked for your recommendation:",
    infoBoxLabel: "Conclusion",
    infoSections: [
      {
        label: "Summary:",
        lines: [
          "Casino Royale earns $16,000 per day for Blackjack at win rate of 20%, $15,000 per day for Poker and breaks even on a high-roller in one hour at a win rate of 10%.",
        ],
      },
      {
        label: "Recommendation:",
        lines: [
          "High roller table offers the greatest profitability opportunity",
          "At 20% win-rate, one high roller playing for an hour earns $6,000",
          "In 3 hours, Casino Royale will earn more from High Rollers than it does in 20 hours of regular blackjack table",
          "Alternative is to make table regular blackjack during the day (expecting 80% occupancy) and convert to high roller at nights and weekends",
        ],
      },
      {
        label: "Risks:",
        lines: ["Unclear what high roller demand is", "Shorter player time for high rollers can lead to significant losses"],
      },
      {
        label: "Next Steps:",
        lines: [
          "Perform due diligence on demand for high rollers to ensure can cross the 3 player/hour per day benchmark",
          "Build table, engage marketing department to prepare packages for high rollers and invite elite clientele to table launch",
        ],
      },
    ],
  },
];
