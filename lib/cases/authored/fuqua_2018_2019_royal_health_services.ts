import type { CasePage } from "../content";

export const CASE_ID = "6bf55a08-9be0-4e4a-8049-c60db2340422";

const PROMPT =
  "Royal Health Services is a regional healthcare system operating several hospitals and clinics in the Midwest. Due to market fragmentation, and increased costs of providing care, their profit margin has continued to decrease. The board of directors has asked you to develop a strategy to increase profitability over the next two years.";

export const CASE_META = {
  review: "auto",
  case_type: "Mergers & Acquisitions",
  synopsis:
    "A regional Midwest healthcare system is losing margin and its board wants a two-year profitability strategy. Work out which route can move the needle, compare candidate partners, and size the value a merger could create.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "mergers-acquisitions", "healthcare", "profitability", "exhibit-heavy"],
};

const BLUE = "#000099";
const hd = (v: string) => ({ v, align: "center" as const, bg: BLUE, fg: "#ffffff" });
const c = (v: string, o: { first?: boolean; last?: boolean; bottom?: boolean } = {}) => ({
  v,
  align: (o.first ? "left" : "center") as "left" | "center",
  w: o.first ? 700 : 400,
  fg: "#000000",
  borders: (o.first ? "l" : "") + (o.last ? "r" : "") + (o.bottom ? "b" : ""),
});
const row = (cells: string[], bottom = false) => ({
  cells: cells.map((v, i) => c(v, { first: i === 0, last: i === cells.length - 1, bottom })),
});

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about at time you disagreed with your manager. What did you do? Question 2: How will you apply the business skills you have learned in your previous career, and in business school, to a staff that is unwilling to change?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Additional Information to give the candidate if asked:",
          "  Royal Health operates 7 hospitals and 40+ clinics in Missouri, Kansas, & Nebraska (clinics are less of a focus of this case)",
          "  Royal Health provides all levels of care to all ages",
          "  Royal Health is not nationally known for the care provided and is therefore unlikely to attract patients from outside the region",
          "  Healthcare industry has had considerable consolidation in recent years",
          "  Regulatory changes and pressure from payers have made in increasingly difficult individual hospitals and smaller health systems to maintain profitability",
          "**After the candidate presents their framework, ask where they would like to start and why. (Additional guidance on the next page)**",
        ],
      },
      {
        label: "Prompt #1 Guidance",
        paragraphs: [
          "*Areas below are not all inclusive. Highlight potential areas the candidate would like to focus and guidance based on their response",
        ],
      },
      {
        label: "Increase Price",
        paragraphs: ["**Should the candidate want to discuss increasing margins internally:**"],
        lines: [
          "Pricing is highly regulated and subject to bargaining power of health system with payers (i.e. very little that can be done at the health system level)",
          "Royal Health also unlikely to attract additional patients from surrounding areas or outside region to increase volume (also this is a profitability case, not an emphasis on revenue)",
        ],
      },
      {
        label: "Explore Cost Reduction",
        paragraphs: ["**Should the candidate want to discuss cost reduction:**"],
        lines: [
          "**Ask candidate:** Why they want to look at internal costs and what they should be looking at (brainstorm)",
          "  Reduction in labor expense, SG&A, IT, etc.",
          "  Contracts with medical suppliers",
          "  Contracts with physician groups",
          "  Overall costs of providing patient care",
          "  Facilities cost reduction",
          "**Next step:** After the candidate has brainstormed ideas, inform them that while these may be good ideas, they are not areas that will drive significant impact at this time. Help drive candidate towards competition and/or M&A",
        ],
      },
      {
        label: "Competition/ M&A",
        paragraphs: ["**Should the Candidate want to discuss competition:**"],
        lines: ["Provide exhibit #1 and ask for their initial thoughts"],
      },
      {
        paragraphs: ["**Should the Candidate want to discuss M&A:**"],
        lines: ["Provide exhibit #1 and present the information as potential targets/opportunities"],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    dataTableTitle: "Exhibit #1",
    dataTableCols: "1.2fr 0.9fr 1.1fr 0.9fr 1.6fr 1fr",
    dataTableHeaders: [
      hd("Organization"),
      hd("2016 Revenue"),
      hd("2016 Operating Income"),
      hd("# of Hospitals"),
      hd("States of Operation"),
      hd("# of Employees"),
    ],
    dataTableRows: [
      row(["Health System #1", "$800M", "$40M", "2", "KS, MO", "~4,000"]),
      row(["Health System #2", "$7.2B", "$576M", "34", "CO, KS, IL, IN, KY, OH, PA, TX, WA", "~55,000"]),
      row(["Health System #3", "$1.8B", "$90M", "6", "IL, MO, OK", "~22,000"]),
      row(["Royal Health Services", "$2.4B", "$72M", "7", "KS, MO, NE", "~27,000"], true),
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreIntro: "**Provide the candidate exhibit #1 and ask for their initial thoughts**",
    guidancePreLines: [
      "Hospitals are not necessarily competitors but are targets for M&A (let the candidate determine this)",
      "Health System 2 is provided to show the benefit of scale; greater margins ideally driving the candidate to consider M&A if that was not already their focus in the initial framework",
      "The number of employees is unnecessary information as the size of each hospital within the system varies",
    ],
    calcTable: {
      title: "Exhibit #1 Guidance",
      plain: true,
      headerBg: BLUE,
      cols: "1.2fr 0.8fr 1.2fr 1.1fr",
      boldCols: [0],
      colColors: ["", "", "", "#ff0000"],
      headers: ["Organization", "2016 Revenue", "2016 Operating Income", "*Operating Margin"],
      rows: [
        ["Health System #1", "$800M", "$40M", "40/800 = **5%**"],
        ["Health System #2", "$7.2B", "$576M", "576/7200 = **8%**"],
        ["Health System #3", "$1.8B", "$90M", "90/1800 = **5%**"],
        ["Royal Health Services", "$2.4B", "$72M", "72/2400 = **3%**"],
      ],
    },
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Candidate should accurately calculate operating margins (provided above) and note that Royal Health services is currently the worst performer (3%) and that the scale of health system 2 is likely helping drive a higher margin",
      "Candidate should note that health system #1 overlaps states of operation, while health system #2 has no overlap and health system #3 only shares MO",
      "After determining that these health systems are not all competitors, the candidate should consider this information has been given to consider targets for acquisition or partnership to increase scale and efficiencies:",
      "  **If the candidate suggests an attempt to be bought out by health system #2:** after hearing their reasoning, mention the board holds several founding members that are proud of the organization and that they do not want to be sold",
      "  **If the candidate suggests acquiring health system #1:** after hearing their reasoning and potentially probing for these responses, highlight that there is a great deal of overlap in the regions in which Royal Health and Health System #1 operate. Also highlight that at this time Royal does not have the ability to raise the required capital for a full on acquisition and that the size of health system #1 will not provide the scale they are seeking",
      "  **If the candidate suggests health system #3:** Their reasoning should include a potential merger to increase scale, ability to expand into new regions, some overlap to take advantage of in the MO market, and value provided to both health systems given the current climate",
    ],
  },
  {
    n: "03",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "ready",
    body:
      "After reviewing your initial analysis, your client has agreed that a potential merger with Health System #3 is their best option to take advantage of scale and to improve their profitability. Health System #3 has expressed interest in this proposal, but would like additional support to help determine if this is worth pursuing.\n\nWhat are some of the ways to create value through a merger?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Candidate should brainstorm several categories and present ways to create value in each category. Examples are listed below",
          "Synergies",
          "  Reduction of corporate shared service costs (e.g. admin, finance, legal, IT, revenue cycle, etc.) through centralization, potentially headcount reduction, etc.",
          "  Reduce level of initial and future investments needed",
          "  Centralize medical services in regions that overlap (improve patient experience, reduce cost, etc.)",
          "Scale",
          "  Opportunity to grow and diversify business and access new markets",
          "  Greater market share; increased bargaining power from suppliers, health plans, etc.",
          "Growth opportunities by providing a better patient experience and by having a better reputation in the industry",
          "  Integrated care across the organizations",
          "  Standardize clinical processes",
          "**Next Step: Once the candidate has brainstormed several ideas, and has discussed synergies through shared services (e.g. legal, IT, etc.) present exhibit #2**",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    dataTableTitle: "2016 Operating Expense (In Millions)",
    dataTableSideBySide: true,
    dataTableCols: "1.6fr 1fr",
    dataTableHeaders: [hd("Organization"), hd("Total Op. Expense")],
    dataTableRows: [
      {
        cells: [
          c("Combined Total of Royal & Health System #3", { first: true, bottom: true }),
          c("$4,038", { last: true, bottom: true }),
        ],
      },
    ],
    dataTableMore: [
      {
        title: "2016 Corporate Shared Services – % of Total Op. Expense",
        cols: "1.4fr 1fr 1fr",
        headers: [hd("Service"), hd("Health System #3"), hd("Royal Health Services")],
        rows: [
          row(["Finance", "6%", "3%"]),
          row(["Human Resources", "4%", "7%"]),
          row(["IT", "8%", "11%"]),
          row(["Legal", "4%", "5%"]),
          row(["Revenue Cycle", "13%", "9%"], true),
        ],
      },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "The first table presents total 2016 Operating expenses for a combined organization of Health System #3 and Royal Health System in Millions",
      "The second table presents several corporate shared services (Finance, HR, IT, Legal & Revenue Cycle) that combined make up 35% of the total operating expenses for each organization",
      "  NOTE: Revenue Cycle is a common healthcare function that handles registration, billing, insurance payments, and a large number of other back office functions",
      "NOTE: the candidate may consider that additional savings could come from scale, or to be conservative to take a mid-point rather than the lowest of each category. For this analysis have them use just the lowest",
      "The candidate can round to an approximate ~4,000 in total operating expense",
    ],
    guidanceLabel: "Analysis:",
    guidanceLines: [
      "Candidate should determine that by merging, the combined health system should be able to lower shared services costs closer to the most efficient organization",
      "  For this analysis the candidate should take the lowest percentage from each category, moving from 35% to 28% of the original $4B. At 35% this was for 1.4B in costs, at 28% costs are reduced to 1.12B",
      "  This analysis should lead to savings of 280 million making total Operating Expenses ~$3,720 rather than ~$4,000",
      "An excellent candidate will include information from exhibit #1 to find the following:",
      "  Combined revenue 4.2B (margin with no savings: 4.76%)",
      "  Combined op income $442M with savings and a total operating expense of $3,720 (combined margin 12.9%)",
      "  NOTE: this is not necessary for this case and only added value",
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "ready",
    body:
      "The Board of Directors for Royal Health Services is about to meet to determine whether there is a strong enough opportunity to further explore this merger. How do you recommend that they proceed?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Recommendation",
          "  Candidate should recommend moving forward",
          "  Candidate should include some figures from exhibit #2 as well as other potential value creation opportunities that were brainstormed in prompt #2",
          "Risks",
          "  Anti-trust and regulatory issues",
          "  Synergies not being realized",
          "  Current regulatory climate (i.e. potential changes to reimbursement should there be changes to the ACA)",
          "Next Steps",
          "  Announce that agreement is being pursued; sign definitive agreement to seek regulatory approval",
          "  Complete due diligence",
          "  Consider any necessary rebranding",
        ],
      },
    ],
  },
];
