import type { CasePage } from "../content";

export const CASE_ID = "8c4ae3fe-ba0b-45f6-bacb-8772482435d1";

const PROMPT =
  "Your client is RX Co, a pharmacy retailer with stores across the United States. To bolster their presence in the Pacific Northwest, they are in talks with Drug Corp to purchase retail assets in the region. Though the acquisition seems sound, the RX Co CEO wants to be sure that the transaction will help them achieve growth.\n\nCan you help the company evaluate the deal?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A US pharmacy retailer is in talks to buy a competitor's stores in the Pacific Northwest. Work out whether the deal will deliver the growth the CEO wants.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "acquisition", "pharma", "revenue", "medium-math"],
};

const GREY = "#cccccc";
const hd = (v: string) => ({ v, align: "center" as const, bg: GREY, fg: "#ffffff" });
const c = (v: string, bg: string, borders = "tblr", rowSpan?: number) => ({ rowSpan, v, align: "center" as const, w: 400, fg: "#000000", bg, borders, borderColor: "#ffffff" });
const A = "#ebebeb";
const B = "#f6f6f6";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a time that you had to meet a deadline that you felt was not feasible. How did you react? Question 2: Tell me about your last performance review. In which area were you most disappointed?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "Candidate should quickly try to specify and quantify the specific goal of the acquisition – growth. If asked (and only if asked), RX Co **aims to grow annual revenue by 20% from current levels.** They want this to happen the first year after the acquisition is complete. Assume the acquisition can be completed and the assets operational in one year.",
          "When evaluating the framework, make sure the candidate understands this is a revenue case – and steer them away from costs.",
          "Try to push the candidate to explore the sources of revenue for pharmacy retailers, namely RX and Front of House Merchandise.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    dataTableFontSize: 15,
    dataTableCols: "1fr 1fr 1.2fr 1fr 1fr",
    dataTableHeaders: [
      { v: "", align: "center" },
      hd("Pharmacy Revenue %"),
      hd("Front-of-House Merchandise Revenue %"),
      hd("Overall Revenue / Day"),
      hd("Total US Stores"),
    ],
    dataTableRows: [
      { cells: [c("RX Co.", A, "r"), c("70%", A, "r", 2), c("30%", A, "r", 2), c("$11,000", A, "r"), c("8,400", A)] },
      { cells: [c("Drug Corp", B, "r"), c("$7,800", B, "r"), c("2,400", B)] },
    ],
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "The candidate may try to calculate the daily pharmaceutical revenue for RX Co by multiplying 0.7*$11,000*8,400. If they do, remind them that we are only interested in stores in the NW Region. Rx Co has 5,000 in the region, and Drugs has 900.",
      "  If asked, the candidate can assume stores in the NW region have the same revenue makeup and average overall revenue as stores nationwide",
      "RX Co current pharma rev is 0.7*$11,000/day*365 days/year*5000 NW stores = ==~$14B==. Growth target is $14B * 1.15 = ==~$16.1B==",
      "Pharma rev to be added from acquisition is 0.7*$7,800/day*365 days/year*900 NW stores = ==~$1.8B==",
      "Candidate should clearly conclude that the acquisition will not help RX Co achieve their revenue growth targets the next year.",
      "A strong candidate could calculate the exact number of Drug Corp stores that would need to be purchased to achieve the proper targets",
      "It is OK to round to the nearest hundred million.",
    ],
  },
  {
    n: "03",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText: "What else should else should be considered when evaluating / calculating the additional revenue that RX Co can achieve through Drug Corp acquisitions?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Candidate could mention:",
      "  Sales cannibalization. Acquiring stores in the same region may drive customers away from certain stores and towards other stores",
      "  Sales retention. Customers develop relationships with brands and Drug Corp stores may lose customers/sales if they begin operating as RX stores",
      "  Increasing retail pricing of the RX items",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "The RX Co CEO is walking into the room in 30 seconds. What do you have to tell him about the viability of this acquisition? Should they make it?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Assuming no sales cannibalization and 100% sales retention, it is already clear that RX cannot meet its pharma revenue targets through the acquisition. Additional risks below that could be mentioned compound this recommendation.",
      "Risks",
      "  Sales Cannibalization",
      "  Sales Retention",
      "  Issues with transferring DEA licenses",
      "  Delays in acquisition and conversion through regulatory delay (DEA licenses, liquor licenses, etc), brand conversions, IT/HR/Accounting/Back Office systems integration, etc.",
      "  Consumer backlash if pricing is increased",
    ],
  },
];
