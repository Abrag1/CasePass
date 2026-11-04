import type { CasePage } from "../content";

export const CASE_ID = "732a2f16-1ec8-4b16-b000-ef8ce6a87364";

const PROMPT =
  "Your client is an IT company that offers ERP systems to businesses. They are currently looking to enter the convenience store market in the U.S. and has asked us to help size that market.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Sizing",
  synopsis:
    "An IT company that sells ERP systems wants to enter the U.S. convenience store market. Size the market by segmenting stores by company size and applying a revenue model.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "market-sizing", "light-math"],
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
          "This is a typical market sizing, interviewee-led case. Key points of this market sizing exercise is to segment convenience stores by size and then apply revenue models. The interviewee can also segment the size of the companies and licenses by number of employees.",
        ],
      },
      {
        label: "Approach / Analysis",
        paragraphs: [
          "**Given: 10M convenience stores in the U.S.**",
          "Assuming that 90% of the stores would use an ERP system (instead of spreadsheets), the addressable market becomes 9M stores.",
          "Now individual companies can own multiple stores or just a single store, so we have to break these stores up into small, medium, and large companies. Let's assume that small companies account for 2M stores, medium-sized companies account for 3M stores, and large companies account 4M stores.",
          "Each small company owns 1 store, each medium-sized company owns 10 stores, and each large company owns 100 stores. That means that there are 2M small companies, 300K medium-sized companies, and 40K large companies.",
          "In terms of pricing, it is reasonable to assume that small, medium, and large companies all pay different prices for ERP systems. For simplicity, let's assume that one license works for one company, a small company would pay $10K per license per year, a medium-sized company would pay $100K per license per year, and a large company would pay $1M per license per year.",
          "With that, annual revenues would be $20B from small companies, $30B from medium companies, and $40B from large companies, which totals to $90B annually. This seems reasonable since Oracle and SAP, major players in the industry, had $40B and $25B in revenue respectively in 2018.",
        ],
      },
    ],
  },
];
