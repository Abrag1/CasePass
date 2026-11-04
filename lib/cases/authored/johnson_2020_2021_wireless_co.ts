import type { CasePage } from "../content";

export const CASE_ID = "13323131-538a-4616-8943-f7cc39b7a6db";

const PROMPT =
  "Your client is a national wireless carrier (think Verizon or AT&T). They recently began offering workshops in a small subset of their stores. These workshops are scheduled time for customers to learn more about functionalities on their devices (e.g. getting the most out of maps, learning how to teach photos, etc.). The client wants us to 1) develop a framework to evaluate the success of these workshops and 2) determine if our client should roll out these workshops nationwide, and if so, provide a high-level plan to do so.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A national wireless carrier has started offering device workshops in a few stores. Build a framework to judge their success and decide whether and how to roll them out nationwide.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "light-math", "profitability"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewee-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewee-led case but more conversational. This case can go in a completely different direction depending on the discussion. This is a sample analysis from a first round interview.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Part 1: Framework to Evaluate Success",
    title: "Part 1: Framework to Evaluate Success",
    kind: "qa",
    guidancePreLines: ["A good interviewee should clarify what success means to the client."],
    infoBoxLabel: "Sample Framework",
    infoSections: [
      {
        steps: [{ n: "1", text: "Shareholders’ returns" }, { n: "2", text: "The firm’s profitability" }],
      },
      {
        label: "Financials",
        lines: ["Profitability of a workshop", "  Revenue (e.g. increased in foot traffic / spend / cross-sale)", "  Cost", "Stock Price (before and after)"],
      },
      {
        label: "Customers",
        lines: ["Customer Lifetime Value (before and after)", "Brand Perception", "Reviews / Anecdotes of the workshops"],
      },
      {
        label: "Value Chain",
        lines: ["Increase in Buyer / Supplier Power", "Exclusive Partnerships with Phone Manufacturers"],
      },
    ],
  },
  {
    n: "03",
    label: "Part 2: Profitability Analysis",
    title: "Part 2: Profitability Analysis",
    kind: "qa",
    guidancePreLines: [
      "If the interviewee does not dive into financials first, guide them to brainstorm profitability drivers for these workshops.",
    ],
    infoBoxLabel: "Example of Profitability Drivers",
    infoSections: [
      {
        lines: [
          "Device sales",
          "Accessory sales",
          "Data plan usage",
          "Customer Lifetime Value",
          "  Lower customer acquisition cost",
          "  Higher margin per customer",
          "  Better customer retention within the network",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Part 3: Deep Dive into Accessory Sales",
    title: "Part 3: Deep Dive into Accessory Sales",
    kind: "qa",
    guidancePreLines: [
      "Move the interviewee into a discussion of accessory sales. Ask them how would they evaluate success from accessory sales.",
    ],
    qText: "**Ask:** What are the drivers for the number of accessory sold per day? What would be the formula?\n\n**What is the total annual revenue from accessory sales from all workshop stores?**",
    infoBoxLabel: "Quick Math Exercise",
    infoSections: [
      {
        paragraphs: [
          "Number of accessories sold = (capacity of each workshop) x (fill rate at each workshop) x (conversion rate of attendees to buyers) x (number of workshops per day)",
        ],
        lines: [
          "Capacity of attendees at each workshop = 100 people maximum",
          "Number of workshops per day = 8 workshops per day",
          "Number of days in a year = 350 days",
          "Currently 20 stores have workshops",
          "Fill rate = 70%",
          "Conversion rate = 70%",
          "Average accessory spend = $15",
        ],
      },
    ],
    answerText: "Multiply all the numbers above together = ==$41.2M== (interviewee is expected to estimate to about ==$40M==).",
  },
  {
    n: "05",
    label: "Part 4: Nationwide Roll Out",
    title: "Part 4: Nationwide Roll Out",
    kind: "qa",
    guidancePreLines: ["Total annual revenue from accessory sales across all workshop stores = ==$41.2M=="],
    qText: "Given that the total cost of these workshops in all current stores are $45M, should our client roll out these workshops across the country?",
    answerText:
      "This is a trick question. Reactive interviewees will be fixated on the number that they had just calculated and immediately determine that it is not a good idea, since the number calculated is less than the total cost (41.2M < 45M).\n\nHowever, the number that they calculated is ONLY for accessory sales. Looking back at Question 1, a good interviewee would remember that there are other drivers of profitability. They would determine that the $4M differential is small and with other profitability drivers, workshops would yield positive returns.",
  },
  {
    n: "06",
    label: "Part 5: How should the client roll out the workshops nationwide?",
    title: "Part 5: Nationwide Roll Out Plan",
    kind: "qa",
    qText: "How should the client roll out the workshops nationwide?",
    guidancePreLines: ["The interviewee can be creative here. Here are some example ideas:"],
    guidanceLabel: "Example ideas",
    guidanceLines: [
      "Identify popular workshops by devices and launch those first",
      "Launch at locations that are geographically and demographically similar to currently successful stores",
      "Receive incentives from particular phone manufacturers to run workshops",
    ],
  },
];
