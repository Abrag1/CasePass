import type { CasePage } from "../content";

export const CASE_ID = "443d4440-109a-4ebc-b10b-aea06f510bf5";

const PROMPT =
  "Our client, Invest-4-Humanity (I4H), is an investment fund looking to open a call center in an African country. I4H is an altruistic investment firm that seeks to choose investments that not only yield positive financial returns but also provide maximum benefit to society. I4H has decided to invest in either a retail sales or banking service call center. Our objective is to advise I4H on how best to approach this investment.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "An altruistic investment fund wants to open a call center in an African country and must choose between a retail sales and a banking service center. Weigh country, labor supply, profitability and social benefit to advise the fund.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth", "investment", "light-math", "exhibit-heavy"],
};

const RED_BG = "#b11b1b";
const PINK_D = "#e3cbcb";
const PINK_L = "#f0e5e5";
const row = (label: string, vals: string[], i: number) => {
  const bg = i % 2 === 0 ? PINK_D : PINK_L;
  return {
    cells: [
      { v: label, align: "left" as const, w: 700, fg: "#1f2421", bg },
      ...vals.map((v) => ({ v, align: "center" as const, w: 400, fg: "#1f2421", bg })),
    ],
  };
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Behavioral Case Question** — Spend 15 Minutes on: Tell me about a time when you had to convince another stakeholder to see things your way",
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is a McKinsey-style, interviewer-led case. Provide the interviewee with the prompt and answer any clarifying questions. Once the interviewee has no more questions, ask the case questions sequentially.",
        ],
      },
      {
        label: "Case Information",
        lines: [
          "A specific country has not been determined, but somewhere in Africa.",
          "The retail call center is a telemarketing call center that makes calls to potential US customers.",
          "The banking call center takes calls from the bank's customers.",
          "  If I4H opens a banking center, they will be paid by a banking client.",
          "The call center will make money through a combination of licensing fees and incentives from companies.",
        ],
      },
      {
        label: "Case Flow Guide",
        lines: [
          "**Question 1:** What key issues should I4H look at when deciding which country and type of call center they should invest in?",
          "**Question 2:** After some initial research, the team thinks that operational risks will be especially important to understand. What are they key operational/logistical challenges that must be addressed when making this investment decision, and which call center is more affected?",
          "**Question 3:** Provide Exhibit 1. Ask the interviewee for initial insights. Given that a call center requires at least 600 people to operate, which country and wage would you advise I4H to first consider?",
          "**Question 4:** Look at Exhibit 1 and consider Country C. If the probability that a worker will accept the job at $1.0 per hour is 0.8, how many workers can I4H expect to hire? (640 workers)",
          "  The team has done some research and found that to operate a retail call center will require 700 workers. By what percentage must they increase the number of workers to reach this number?",
          "  What are some ideas to gain the additional workers?",
          "**Question 5:** Which call center makes more profit on an hourly basis? By what percent is it larger? What does your analysis imply for your recommendation for I4H?",
          "**Question 6:** The CEO of I4H has just entered the room and wants an update on progress and preliminary recommendations.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText:
      "What key issues should I4H look at when deciding which country and type of call center they should invest in?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Push** the candidate to explain their thinking on each point – a canned framework applied blindly is not acceptable. For instance, 3Cs is not a good framework here. Likewise, a pure profit framework that does not go into the risks is not good either. One potential framework (whatever framework they use, make sure it is well structured and hit these key points):",
      "Investment Cost: By country, By type of call center",
      "Benefits: Financial, Social",
      "Risk: Operational, Political, Economic",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "After some initial research, the team thinks that operational risks will be especially important to understand. What are the key operational/logistical challenges that must be addressed when making this investment decision, and which call center is more affected?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Even though the candidate should have already hit upon this question at a high level in the initial framework, **push** the candidate to think of more ideas, and check that they do it in a structured way. The key here is to stay structured: the candidate would do well to ask for time to structure their thoughts and should use another 'mini-framework' when answering the question. One possible approach:",
      "Operational/Logistic Challenges: Labor, Infrastructure, Time Zone",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "Provide Exhibit 1. Ask the interviewee for initial insights. Given that a call center requires at least 600 people to operate, which country and wage would you advise I4H to first consider?",
    dataTableTitle: "Number of employees who would consider working at the call center for a given hourly wage",
    dataTableCols: "1.2fr 1fr 1fr 1fr",
    dataTableHeaders: [
      { v: "Wage Per Hour", align: "left", bg: RED_BG, fg: "#ffffff" },
      { v: "$0.50", align: "center", bg: RED_BG, fg: "#ffffff" },
      { v: "$1.00", align: "center", bg: RED_BG, fg: "#ffffff" },
      { v: "$1.50", align: "center", bg: RED_BG, fg: "#ffffff" },
    ],
    dataTableRows: [
      row("Country A", ["562", "645", "795"], 0),
      row("Country B", ["521", "620", "840"], 1),
      row("Country C", ["615", "800", "1030"], 2),
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "It's clear that Country C gives the best yield of laborers for a given wage, but why? We don't have information on why, but a strong candidate should at least give some possibilities and how that affects I4H's objectives.",
      "**Country C at $1.0 per hour** is the best choice to look at initially because it **provides a reasonable chance** to get 600 people at the lowest hourly wage. The Exhibit refers to people who **would consider working, not who will work**, so Country C at $0.5 per hour is not a good choice – it is unlikely to yield enough labor.",
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "Look at Exhibit 1 and consider Country C. If the probability that a worker will accept the job at $1.0 per hour is 0.8, how many workers can I4H expect to hire? (640 workers).\n\nThe team has done some research and found that to operate a retail call center will require 700 workers. By what percentage must they increase the number of workers to reach this number? What are some ideas to gain the additional workers?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Make the candidate calculate the answer to one decimal place accuracy – ==9.4%==. They should see that I4H needs to increase from 640 to 700, or a gain of 60 workers. 60/640 is about ==9.4%==. Do not let the candidate approximate 9% or 10%, make them go to at least one decimal place.",
      "The candidate should then discuss in a structured format some ways to increase the response rate. One structure could be:",
      "  Benefits",
      "  Promotion",
      "  Partner with government",
    ],
  },
  {
    n: "06",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "Which call center makes more profit on an hourly basis? By what percent is it larger? What does your analysis imply for your recommendation for I4H?",
    guidancePreLabel: "Provide the candidate with the following information",
    guidancePreLines: [
      "The team has narrowed down the choice to Country C. Operating the retail call center will require 700 workers at $1/hour, whereas the banking call center will require 450 workers at $1.5/hour.",
      "Further, the cost of labor in the retail call center represents 80% of total revenue, whereas in the banking call center is represents 75% of total revenue.",
      "In addition to the labor costs, the banking center requires an additional 5% of total annual revenue to be spent on infrastructure backup – this is special equipment purchased from the bank client that backs up the phone and internet connections. The retail center does not require this additional expense. Ignore all other expenses and do not worry about the initial investment cost.",
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Retail call center: hourly revenue is $700/0.8 = $875, implies the hourly profit is ==$175/hour==",
      "Banking call center: hourly revenue is ($450 x 1.5)/0.75 = $900. The hourly labor cost is $450 x 1.5 = $675, and there is an additional 5% = $45 for special equipment. The hourly profit is ==$180/hour==",
      "The candidate should note that the **banking** call center is ==more profitable by about 3%.== However, they should also remember I4H's objectives include **social benefit**. The retail call center employs 250 more people than the banking call center and pumps in $25 more dollars per hour into the local economy (700 versus 675 – the extra 5% going toward special equipment goes to the banking client).",
      "There is a strong case to be made that the retail call center, though slightly less profitable, more closely achieves I4H's objectives, given the information available.",
    ],
  },
  {
    n: "07",
    label: "Question 6",
    title: "Recommendation",
    kind: "qa",
    qText:
      "The CEO of I4H has just entered the room and wants an update on progress and preliminary recommendations. The interviewee has 15 seconds to gather their thoughts.",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "The synthesis should get right to the point and include something like:",
      "Based on our current analysis, we recommend that you pursue a retail call center in Country C. We have found that the retail call center will be almost as profitable as the banking call center, and provide greater social benefit.",
      "A significant risk is not being able to find enough workers to run the call center, especially given the time difference between the US and Africa.",
      "This risk can be mitigated by allowing for a flexible work schedule and working with the local government to provide additional incentive to potential workers.",
      "Next steps include looking at potential retail clients and putting together capital to begin construction on the call center.",
    ],
  },
];
