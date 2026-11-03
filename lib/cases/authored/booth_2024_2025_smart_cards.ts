import type { CasePage } from "../content";

export const CASE_ID = "bf68a48b-84f6-45f0-a9e8-79ec1c80243f";

const PROMPT =
  "Our client, Electronics Inc., is a large diversified Electronics Component manufacturer. One of their businesses is the manufacture of Smart Cards used by transport authorities (passenger cards). They entered this business 3 years ago.\n\nThe CEO is unhappy with the performance of this business and has asked McKinsey for help. What areas will you explore?";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "A diversified electronics manufacturer is unhappy with the performance of its Smart Card business, which sells to transport authorities. Explore the market, the client's position against its competitors and what the client should do with the business.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "growth-strategy", "light-math", "brainstorming", "chart-clearing"],
};

const hd = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align });
const L = (v: string, w = 700) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you dealt with ambiguity and the steps you took to manage the situation. 2. Tell me about a time you had to overcome a challenging situation at work and how you maintained buy-in from key stakeholders to resolve the situation.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a command-and-control style case, where the interviewer leads the candidate through a series of questions. The candidate should maintain an active role in the discussion at all times, and should not be thrown off if the interviewer drives the case in a different direction.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Q&A/ Discussion" },
          { n: "3", text: "Interviewer Questions" },
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
    guidancePreIntro: "Additional detail that can be provided in response to candidate follow-up questions:",
    guidancePreLines: [
      "The focus is on the US market.",
      "The client manufactures both Smart Cards and Card Readers. Customers for these are primarily transport authorities (e.g.: CTA).",
      "The client also manufactures chips and custom electronic components.",
      "The client's Smart Card business has experienced low revenue growth and recent customer complaints.",
      "The CEO is considering whether to spin off or to sell the Smart Card business.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** To understand the client's growth challenges and potential options for the Smart Card business, I'd first want to better understand the Smart Card Market and our client's position in it.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Smart Card Market",
          children: [
            { label: "Size/Growth" },
            { label: "Customer segments" },
            { label: "Trends in adoption/tech" },
          ],
        },
        {
          label: "Client's Smart Card Business",
          children: [
            { label: "Customers" },
            { label: "Value chain" },
            { label: "Synergies with other business lines" },
          ],
        },
        {
          label: "Competition",
          children: [
            { label: "Who (substitute manufacturers, next gen apps)" },
            { label: "Market share/growth of share" },
            { label: "Competencies" },
          ],
        },
        {
          label: "Product and Product Support",
          children: [
            { label: "Price vs. WTP" },
            { label: "Quality (reliability, product life, ease of integration with other systems, cost for updates, security)" },
            { label: "Delivery" },
            { label: "Customer service" },
            { label: "Servicing, replacement, maintenance" },
          ],
        },
      ],
    },
    guidanceLabel: "Framework",
    guidanceLines: [
      "Our main customers are transport authorities. How might you segment them?",
      "  Examples: by revenue, margin or geography.",
      "  An example of revenue-based segmentation could be Tier 1 transport authorities (NY, Chicago, SF) vs. Tier 2 (mid-sized cities).",
      "  If needed, **lead** candidate to revenue-based segmentation before transitioning to the next question.",
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "Great. Industry professionals do generally segment by revenue. Now what?",
    guidancePreLabel: "Question 2",
    guidancePreLines: [
      "The candidate should want to understand how the client does in each segment compared to their competitors.",
      "Once they reach this insight, **provide them with Exhibit 1**.",
    ],
    dataTableTitle: "Market Segment Penetration",
    dataTableCols: "1.2fr 1fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [
      hd("Segment", "center"),
      hd("Smart Cards Penetration in Segment", "center"),
      hd("Electronics Inc. (Client) share", "center"),
      hd("Competitor A share", "center"),
      hd("Competitor B share", "center"),
      hd("Others share", "center"),
    ],
    dataTableRows: [
      { cells: [L("Tier-1 (10 customers)"), C("100%"), C("15%"), C("40%"), C("45%"), C("0%")] },
      { cells: [L("Tier-2 (70 customers)"), C("10%"), C("0%"), C("2%"), C("8%"), C("0%")] },
    ],
    guidanceLabel: "Chart Clearing",
    guidanceLines: [
      "**Sample Insights from Table**",
      "  This is a concentrated market, with only 3 players.",
      "  We are the weak third player in the market.",
      "  Our competitors have a significant advantage in the Tier-1 segment.",
      "    We should consider what is needed to grow share in this segment.",
      "  There may be opportunity in Tier-2.",
      "    This Tier may not be profitable though, considering the low penetration rate to date.",
      "**Note:** A strong candidate will realize the last point regarding penetration rates and provide next steps when considering whether to pursue any opportunity in Tier-2.",
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "What do you think the key purchase drivers in this business are? (i.e. Why would a customer choose one player over another?)",
    infoBoxLabel: "Sample Answer",
    infoSections: [
      {
        groups: [
          {
            heading: "Cost",
            items: [
              "Per unit price (card reader, smart card)",
              "Replacement / maintenance / upgrade costs",
              "Package pricing options of card reader + smart card  **Key Driver**",
            ],
          },
          {
            heading: "Quality/service",
            items: [
              "Reliability of tech  **Key Driver**",
              "Security",
              "Customer service",
              "Proven adoption in similar markets",
            ],
          },
          {
            heading: "Flexibility",
            items: [
              "Switching costs (i.e. contract terms)",
              "Ease of integrating with other tech / systems",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Note:** A strong candidate will identify key drivers and rank or prioritize these answers in some way.",
      "**If asked**, tell the candidate that all players in the market have parity on everything except reliability.",
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "As mentioned earlier, there have been some recent customer complaints. As a result, some of the client's current customers are considering moving to other vendors. All the players in the market have parity on all the purchase drivers except reliability.\n\nHere is some relevant data (**read or show to candidate**):\n• Electronics Inc.:  Reader Reliability 90%  Card Reliability 75%\n• Competitor A:  Reader Reliability 98%  Card Reliability 60%\n• Competitor B:  Reader Reliability 99%  Card Reliability 70%\n\nWhat are your takeaways from this information?",
    guidanceLabel: "Sample Response",
    guidanceLines: [
      "Reader reliability is much more important than card reliability.",
      "  Cards can be easily replaced, but reader failure can shut down the entire system.",
      "  Client should explore the possibility of improving reader reliability since it threatens the integrity of the system.",
      "Client appears to have a small card reliability advantage.",
      "  May be an advantage that can be better monetized if it is delinked from the card reader product.",
    ],
  },
  {
    n: "06",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "Upgrading reader quality to 99% reliability will require a $10M investment. Based on this information, what do you think the client should do with the business?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "**Note:** The candidate might want to do a cost-benefit analysis, but a strong candidate will hypothesize that it may not make sense to upgrade since we have such a low market share and face two dominant players who already have 99% reliability.",
    ],
    guidanceLabel: "Sample Response",
    guidanceLines: [
      "This is a platform strategy where \"winner-takes-all\" within each geography, and all Tier 1 geographies are saturated.",
      "For Tier-1 customers, the client is worse off than Competitor A and B. The client has reliability issues and no superior \"value-proposition\" in any other substantive respect.",
      "There are demand-side economies (proof of concept with more established customer base) and supply-side economies (scale, lower infrastructure costs) that provide the established competitors with additional advantages.",
      "There might be an opportunity in the Tier-2 segment, and the client should explore this possibility. However, given that the other competitors haven't targeted a larger share of Tier 2, it could simply be unprofitable.",
      "Unless a profitable solution can be developed for Tier 2, the client should exit the market and sell off assets to Competitor A or B.",
    ],
  },
  {
    n: "07",
    label: "Question 6",
    title: "Question 6",
    kind: "qa",
    qText: "How would you find out if there is an opportunity in the Tier-2 segment?",
    guidanceLabel: "Sample Response",
    guidanceLines: [
      "The client should go to the Tier 2 customers and find out why they have not adopted smart cards.",
      "The insights from this investigation could potentially be used to develop a better solution for Tier 2.",
      "For instance, the client might find that Tier 2 customers don't need and don't want to pay for the full-scale product offered to Tier 1 customers and might be willing to consider a cheaper, functional system. In this case, the client should consider the possibility of providing a cheaper \"lite\" solution to the Tier 2 customers.",
    ],
  },
  {
    n: "08",
    label: "Synthesis and Recommendation",
    title: "Synthesis",
    kind: "qa",
    infoBoxLabel: "Synthesis",
    infoSections: [
      {
        paragraphs: [
          "Since this case is light on quant, the interviewer should use this opportunity to push the candidate to **synthesize** their thoughts and to provide a **recommendation orally**, including risks and next steps.",
        ],
      },
      {
        label: "Recommendation",
        lines: [
          "Unless a profitable solution can be developed for Tier 2, the client should exit the market and sell off assets to Competitor A or B.",
        ],
      },
      {
        label: "Risks",
        lines: [
          "If the client enters the Tier 2 market, they may expose themselves to risk of an unprofitable venture.",
        ],
      },
      {
        label: "Next Steps",
        lines: [
          "This could be mitigated by first analyzing the customer in this segment and determining whether the client can better meet Tier 2 customer needs as compared to current competitors. However, if the client cannot do this, it is best to divest themselves of the card reader and smart card assets.",
        ],
      },
      {
        label: "Evaluation: Candidate performance differentiators:",
        lines: [
          "A framework suited to this case - exploring the industry and competition, not profitability.",
          "Realizing that the Tier-2 segment may be unprofitable to serve.",
          "Recognizing that reader reliability is more important for integrity of the system.",
          "Understanding the \"winner-takes-all\" nature of this business.",
          "Answering the original question of \"what to do\" - sell-off assets to a competitor and exit. This can be a difficult insight because it is counterintuitive to tell a client to give up on a business or line of business. However, it is important that it not be overlooked, as sometimes the best answer is not the one that will result in the most growth.",
        ],
      },
    ],
  },
];
