import type { CasePage } from "../content";

export const CASE_ID = "6a4e9f14-2be0-4091-a19e-2ff44c1c714c";

const PROMPT =
  "Chipster Technology is a multi billion dollar technology company. The CIO has hired you to review the current talent profile of the IT organization. The company has previously operated with a \"closed culture\" mentality. Currently the IT group has 10,000 employees which support 90,000 other employees. The CIO would like you to ensure that the company is operating as \"best in class.\"";

export const CASE_META = {
  review: "auto",
  case_type: "Operations",
  synopsis:
    "The CIO of a multi billion dollar technology company wants its IT organization to operate as \"best in class\". Review the IT talent profile against benchmarks and find where the company can save money.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "operations", "technology", "cost-savings", "hard-math"],
};

const GREY = "#cccccc";
const hd = (v: string, align: "left" | "center" = "left") => ({ v, align, bg: GREY, fg: "#ffffff" });
const c = (v: string, bg: string) => ({ v, align: "left" as const, w: 400, fg: "#000000", bg, borders: "tblr", borderColor: "#ffffff" });
const BG = ["#ebebeb", "#f6f6f6"];
const rows = (data: string[][]) => data.map((r, i) => ({ cells: r.map((v) => c(v, BG[i % 2])) }));

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: What was the biggest challenge you have faced in your professional life. Question 2: What is one thing you are proud of that is not on your resume?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: [
          "The interviewee should look to clarify the goal. If asked, clarify:",
          "  Primary goal - Make sure the company is not spending more on IT labor then its peers (save money is possible without sacrificing effectiveness)",
          "  Secondary - to ensure the young talent is learning relevant skills and are being pushed up through the organization",
        ],
      },
      {
        label: "Other Details",
        lines: [
          "Location: The company is global and currently operates 29 separate IT support sites",
          "10,000 employees are comprised of full-time and contract employees",
        ],
      },
      {
        paragraphs: [
          "NOTE – The Case will focus on the primary goal, however great casers will incorporate the talent effect of proposed changes",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit #1",
    title: "Exhibit #1",
    kind: "qa",
    dataTableTitle: "Chipster vs Benchmark data",
    dataTableFontSize: 15,
    dataTableFootnote: "* Benchmarks are IT function specific for Fortune 250 companies with headcounts between 70k-150k",
    dataTableFootnoteLeft: true,
    dataTableCols: "2.2fr 1fr 1fr",
    dataTableHeaders: [hd(""), hd("Chipster"), hd("Benchmark*")],
    dataTableRows: rows([
      ["Attrition", "9.5%", "10%"],
      ["Average Time at Level", "4 yrs.", "3.5 yrs."],
      ["% full time employees", "80%", "60%"],
      ["% of heads in emerging markets", "50%", "50%"],
      ["IT Hub locations", "8", "4"],
      ["IT Satellite locations", "22", "11"],
    ]),
    guidancePreLabel: "Exhibit #1 Guidance",
    guidancePreLines: [
      "This shows that Chipster is behind the average in Full Time % and Location when compared to benchmark, remember the goal is to be \"best in class\".",
      "Key Takeaways",
      "  1. the difference between FT % this will help the interviewee drive towards cost savings without reducing total head count",
      "  2. Chipster has too many locations",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "The interviewee should use the benchmarks to get comfortable with the differences between chipster and the market.",
      "The analysis should conclude with questions about costs of locations and or costs of converting employees from full time to contractors.",
      "Good Candidates will get one insight and ask for cost, Great candidates will recognize both.",
    ],
  },
  {
    n: "03",
    label: "Exhibit #2",
    title: "Exhibit #2",
    kind: "qa",
    dataTableTitle: "Cost Matrix By Market",
    dataTableFontSize: 15,
    dataTableCols: "1.2fr 1fr 1fr",
    dataTableHeaders: [hd(""), hd("Emerging"), hd("Mature")],
    dataTableRows: rows([
      ["Full-Time", "100K", "120K"],
      ["Contractor", "50K", "100K"],
      ["Hub", "30M", "40M"],
      ["Satellite", "20M", "30M"],
    ]),
    guidancePreLabel: "Exhibit #2 Guidance",
    guidancePreLines: [
      "The interviewee should start by calculating the current spend for Chipster. Give them some time and direct them to do so if they don't after 90 second.",
      "Do not let them calculate the benchmark amounts first, they should be more concerned about Chipsters current spend.",
      "Once they calculate the Chipster spend, tell them that you spoke with the client and \"senior leadership believes they can reduce payroll spend by 10% by leveraging more contract labor, but shifting to benchmark won't be possible, they do think they can shift to benchmark from a location standpoint because many of the current locations are leftovers from acquisitions that never got properly closed\"",
      "The interviewee should easily see to split the location spend in half and reduce FT and Contract labor by 10% this results in $410M of Savings",
    ],
    guidanceLabel: "Analysis",
    guidanceLines: [
      "Mature Market Costs",
      "  Full Time – 50% of 10k in Mature market and 80% of them are full time. Therefore 5,000 are in Mature markets and 4,000 are FT, 1000 are contractors.",
      "120,000*4,000= 480M",
      "100,000*1,000= 100M",
      "4 Hubs * 40M = 160M",
      "11 Satellites * 30M = 330M",
      "Total = 1,070M",
      "Emerging Markets",
      "  Full Time – 50% of 10k in Mature market and 80% of them are full time. Therefore 5,000 are in Mature markets and 4,000 are FT, 1000 are contractors.",
      "100,000 * 4,000 = 400M",
      "50,000 * 1,000 = 50M",
      "4 Hubs * 30M = 160M",
      "11 Satellites * 20M = 220M",
      "Total = 940M",
    ],
  },
  {
    n: "04",
    label: "Prompt #2 · Post Math Brainstorm",
    title: "Post Math Brainstorm",
    kind: "qa",
    guidancePreLabel: "Prompt #2",
    guidancePreLines: ["NOTE: Great candidates will do this without being prompted."],
    qText: "\"Now that you see the opportunities for cost savings, what is are some of the potential risks of making these changes \"",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Good or Great Candidates need to talk about the effect it may have on the young talent in the organization. It is important the interviewee is bringing back information from the beginning of the case.",
      "If the interviewee doesn't brainstorm something around talent prompt them too.",
      "Other thoughts can be but are not limited to : Effects on business strategy, bad PR, upset contracting partners, HR push back, cost of closing site",
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        lines: [
          "Inform the CIO how the company is doing as opposed to benchmark",
          "Note the cost savings opportunities",
          "Touch on something around talent implications",
          "Discuss risks and next steps.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Good candidates will regurgitate the math",
      "Great candidates will loop in info from the prompt and their talent brainstorm on top of the math.",
    ],
  },
];
