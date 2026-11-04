import type { CasePage } from "../content";

export const CASE_ID = "cfbd6446-e5e8-41da-8226-7eb356c2b730";

const PROMPT =
  "Your client is a clothing retailer that specializes in discount fashion (think of brands like Old Navy and Kohl's). The company operates exclusively in North America (US and Canada). In the last two years, your client has experienced a decline in profitability and has hired us to 1) diagnose the issue - what is causing the decline and 2) provide a turnaround strategy to get back on track.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A North American discount fashion retailer has seen profitability decline over the last two years. Diagnose the cause and recommend a turnaround strategy.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "profitability", "retail", "operations", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Overview [Interviewer-led]",
        paragraphs: [
          "This is an operations / supply chain focused case. Ask the interviewees what they would ask each member of the c-suite. Provide them with additional case information as they ask the right questions.",
        ],
      },
      {
        label: "Case Information",
      },
      {
        label: "Industry (CMO)",
        lines: [
          "Market share in 2015 was 70%",
          "Market share in 2017 (now) is 60%",
          "3 major competitors in this space",
          "  No new entrants recently",
          "No major shift in customer demographics",
          "  But people are moving away from cities",
          "  Our client operates in cities",
        ],
      },
      {
        label: "Financials (CFO)",
        lines: [
          "Revenue decreased by 10%",
          "COGS increased by 30%",
          "Same-store sales decreased as people move away from cities to sub-urban areas",
        ],
      },
      {
        label: "Supply Chain (COO)",
        lines: [
          "COGS increased because:",
          "  Raw material cost went up",
          "  Channel rebates went down",
          "    Less kickback / incentives to order more units",
        ],
      },
      {
        label: "Case Flow Guide",
        lines: [
          "**Question 1:** What would you ask the CMO?",
          "**Question 2:** What would you ask the CFO?",
          "**Question 3:** What is your recommendation to the CEO and the COO?",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "**Question 1: What would you ask the CMO?**",
    guidancePreLines: [
      "This initial question guides the interviewee to think from top-down, starting from a high-level view of the overall industry.",
    ],
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Good questions to ask include:",
        groups: [
          {
            heading: "Changes to market share (down to 60% from 70% two years ago)",
            items: [
              "Overall size of the industry remained the same but our client’s market share declined? **NO**",
              "The overall size of the pie grew but our client did not grow as fast? **NO**",
              "New entrants stealing our market share? **NO**",
            ],
          },
          {
            heading: "Changes to the products",
            items: ["New innovation? **NO**", "New differentiating factor? **NO**"],
          },
          {
            heading: "Changes to the customer base",
            items: [
              "Different demographics now buying our clothes? **NO**",
              "Changes in brand perception? **NO**",
              "Changes in spending habit? **NO**",
              "Changes to same-store sales? **YES, why is that happening?**",
              "  Our client’s stores are in cities and people are moving to sub-urban areas",
              "  This indicates **1) sales are down** and **2) inventory issue (excess inventory, expensive holding cost, channel contracts).** This is a hint for a deep dive into **inventory / COGS.**",
            ],
          },
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "**Question 2: What would you ask the CFO?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Good questions to ask include:",
        groups: [
          {
            heading: "Changes to revenue",
            items: [
              "Change in price? **NO**",
              "Change in volume? **YES, people are moving away from where our stores are**",
            ],
          },
          {
            heading: "Changes to cost (ask the interviewee to brainstorm cost drivers)",
            items: [
              "Changes to fixed cost (e.g. store leases, salary, etc.)? **NO**",
              "Changes to variable cost? **YES, what goes into variable cost & what could be happening?**",
              "  There is an increase in wholesale prices (passed down from manufacturer from an increase in raw material cost)",
              "  There is a decrease in rebates for volume (decline in channel promotions)",
              "  **These two issues led to a 30% increase in COGS.**",
            ],
          },
        ],
      },
    ],
    calcTable: {
      title:
        "Question 2b: Given that in 2015 revenue was $200M and gross margin was 40%, how much did gross profit change if volume decreased by 10% and COGS increased by 30% total in two years?",
      headers: ["", "2015", "2017"],
      rows: [
        ["Rev", "200M", "180M = (200M * 0.9) No change in price"],
        ["COGS", "120M", "156M = (120M * 1.3) 120M plugged from 200M – 80M"],
        ["GP(40%)", "80M", "24M = gross profit decreased by 70% = 1 – (24/80)"],
      ],
    },
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "**Question 3: What would recommend to the CEO and COO? (This is a hint to wrap up the case)**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "Good Recommendation",
        groups: [
          {
            heading: "1. Answer the first question in the case prompt – Diagnose the issue",
            items: [
              "Profitability declined due to",
              "  1) decrease in sales from people moving away from cities – 10%",
              "  2) increase in COGS from increase in wholesale prices (passed down from manufacturer) and decrease in channel rebates – 30%",
              "  3) 70% decrease in gross profit – urgent problem",
            ],
          },
          {
            heading: "2. Turnaround strategy",
            items: [
              "Fixed contracts to lock in rebates / promotions and wholesale prices",
              "Rationalize SKUs and cut underperforming products",
              "Close underperforming stores",
              "New suppliers",
              "Potentially open smaller stores in sub-urban areas to recapture lost customers",
            ],
          },
        ],
      },
    ],
  },
];
