import type { CasePage } from "../content";

export const CASE_ID = "748e6946-a9a3-495f-9f51-2b48f75377d9";

const PROMPT =
  "Our client is a privately owned hospital that offers high-tech surgical procedures. They would like to start using robots in their surgeries. Recently, a new surgical robot, Robot X, was developed and has now been on the market for six months. This robot is highly precise and drastically reduces human work in surgeries. Should our client acquire Robot X?";

export const CASE_META = {
  review: "auto",
  case_type: "M&A",
  synopsis:
    "A privately owned hospital wants to start using robots in its surgeries and is considering acquiring a newly released surgical robot. Decide whether the investment makes sense and what else should shape the decision.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "m&a", "healthcare", "break-even", "light-math"],
};

const INK = "#1f2421";
const BLUE = "#c6def9";
const LINE = "#3fa2dc";
const bc = (v: string) => ({
  v,
  align: "left" as const,
  w: 400,
  fg: INK,
  borders: "tblr",
  borderColor: LINE,
});
const hc = (v: string) => ({ v, align: "left" as const, bg: BLUE, fg: INK, borders: "tblr", borderColor: LINE });
const row = (a: string, b: string, c: string) => ({ cells: [bc(a), bc(b), bc(c)] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an **interviewer-led** case. Ask the following questions **sequentially** and provide Exhibits when prompted.",
        ],
        steps: [
          { n: "1", text: "What features of Robot X should our client consider in deciding whether or not to invest in it?" },
          { n: "2", text: "Would Robot X be a good investment?" },
          { n: "3", text: "What other options does our client have for improving their services?" },
          { n: "4", text: "Aside from profitability, what other factors would likely influence our client’s decision on whether or not to invest in a robot for surgery?" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Case Information",
    title: "Case Information",
    kind: "qa",
    guidancePreLabel: "Case Information",
    guidancePreLines: [
      "Our client specializes in minimally invasive surgeries, but has never employed a full robot",
      "There are currently only a few surgical robots on the market; the Da Vinci Robot is the leader in the market",
      "Of the hospital staff who are authorized to perform surgeries, ==70%== are technicians (with Bachelor’s degree) and ==30%== are medical professionals (with M.D.)",
      "Buying a surgical robot will allow our client to hire ==5== fewer staff technicians per year",
      "Each staff technician is paid an annual salary of ==$60,000==",
      "The hospital generates an extra ==$300==/surgery that a surgical robot performs",
      "Technology replacement rate is ==~10 years== for surgical robots",
    ],
  },
  {
    n: "03",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "**Question 1:** What features of Robot X should our client consider in deciding whether or not to invest in it?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Monetary: potential gains, potential costs, costs of investment",
      "Technical: durability, agility, ease of use, precision, size, surgical capabilities",
    ],
  },
  {
    n: "04",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "**Question 2:** Would Robot X be a good investment?",
    guidancePreLines: [
      "**Provide Exhibit 1** when candidate asks about costs. Candidate should suggest calculating the **break even point** for the investment. If not, try to lead them in this direction.",
    ],
    exhibitTitle: "Exhibit 1",
    dataTableTitle: "Feature of Surgical Robots",
    dataTableTitleBold: true,
    dataTableFontSize: 14,
    dataTableCols: "2.2fr 1.3fr 1.3fr",
    dataTableHeaders: [hc("Category"), hc("Robot X"), hc("Da Vinci Robot")],
    dataTableRows: [
      row("Number of arms", "8", "4"),
      row("Cleaning", "Cleaned after every use", "Cleaned after every use"),
      row("Average durability", "10 years", "8 years"),
      row("Additional surgeries/year", "200", "50"),
      row("Remote operations", "Yes", "Yes"),
      row("Size (length X width X height in ft)", "5 X 4 X 5", "6 X 7 X 6"),
      row("Precision", "98%", "95%"),
      row("Maintenance costs ($/year)", "$200,000", "$100,000"),
      row("Price", "$3.2 million", "$1.5 million"),
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Break even is the point at which gains = losses",
      "Gains = 5 technicians*$60,000 + 200 surgeries*$300 = ==$360,000/year==",
      "Losses = $200,000/year + $3.2 million (one time cost)",
      "Let x be number of years it takes to reach break even, then after x years:",
      "  360,000x = 200,000x + 3,200,000",
      "  160,000x = 3,200,000; x = ==20==",
      "Our client would break even after ==20 years==",
      "This is unrealistically long (twice the lifetime of the robot) and so investment is not worthwhile",
    ],
  },
  {
    n: "05",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText: "**Question 3:** What other options does our client have for improving their services?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Buy the Da Vinci Robot instead – candidate should do **break even analysis** for this too",
      "Gains = 5 technicians*$60,000 + 50 surgeries*$300 = ==$315,000/year==",
      "Losses = $100,000/year + $1.5 million (one time cost)",
      "Let x be number of years it takes to reach break even, then after x years:",
      "  315,000x = 100,000x + 1,500,000",
      "  215,000x = 1,500,000; x = ==~7==",
      "Our client would break even after ==7 years==",
      "This is only slightly shorter than the lifetime of the robot",
      "**Candidate should also brainstorm other ways the hospital can improve their services, including:**",
      "  Improve existing technology/equipment",
      "  Employ more highly trained personnel (i.e. medical professionals)",
      "  Specialize in a certain type of procedure",
    ],
  },
  {
    n: "06",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "**Question 4:** Aside from profitability, what other factors would likely influence our client’s decision on whether or not to invest in a robot for surgery?",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Operator preferences** – ease of use of the robot would be a major determinant",
      "**Patient preferences** – some patients prefer robotic surgeries; others prefer human operators",
      "**Board of directors** – who is on the board, how much share they hold etc. can often have a big impact on decision-making, especially for private practices",
      "**Technology trends in the market** – are our client’s competitors all moving towards this technology? Would it give our client a competitive advantage?",
    ],
  },
  {
    n: "07",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Conclusion:**",
      "I recommend that the client does not invest in a surgical robot. Preliminary analysis suggests that it would take our client ==20 years== to break even on the Robot X investment, and ==7 years== to break even on the Da Vinci Robot investment. 20 years is double the lifetime of Robot X, and while 7 years is slightly shorter than the lifetime of the Da Vinci Robot, the client will not make much profit before the technology is replaced. However, one major risk is that competitors may be employing robots in surgeries and therefore, the client should look into other ways of improving their services such that they would not lose their competitive advantage.",
    ],
  },
];
