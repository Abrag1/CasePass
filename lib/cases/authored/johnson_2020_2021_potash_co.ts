import type { CasePage } from "../content";

export const CASE_ID = "9ecfaff6-a368-4dc9-9311-b45b3585cf8d";

const PROMPT =
  "Your client is Karnalyte Resources, which is a small potash producer. On the morning of July 30th , Uralkali, the dominant Russian producer announced that it was separating from its partner, Belaruskali. What will this do to the industry and what should Karnalyte do?";

export const CASE_META = {
  review: "auto",
  case_type: "Competitive Response",
  synopsis:
    "A small potash producer faces an industry shock when the dominant Russian producer splits from its partner. Work out how the industry will change and what the client should do.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "competitive-response", "industry-analysis", "light-math", "exhibit-heavy"],
};

const BLACK = "#111111";
const HC = (v: string, align: "left" | "center" | "right" = "left") => ({ v, align, fg: BLACK });
const DC = (v: string, w = 400) => ({ v, align: "left" as const, w, fg: BLACK });
const row = (name: string, vals: string[]) => ({ cells: [DC(name), ...vals.map((x) => DC(x))] });

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
          "Although the case is framed as a response by a particular company to a **change in the industry dynamic**, the real core of the case is thinking through the industry structure and how this drastic change will affect the industry. If the candidate tries to move too quickly to strategies that Karnalyte can take, before fully understanding the implications of the industry change, push them to look at the big picture, before dealing with strategic alternatives. Once they understand the situation, they should realize that Karnalyte’s only viable choice is to sell its assets at scrap value to try and pay off its debts. Thus this case also tests the candidate’s ability to recognize a **hopeless situation**, since few cases typically have liquidation of the company as the correct answer.",
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
    guidancePreIntro: "Only give if requested:",
    guidancePreLines: [
      "Potash is a main ingredient in fertilizer and is mined from potassium deposits in Russia and Saskatchewan.",
      "Historically, potash sales have been dominated by two companies: **Canpotex**, which represents Potash Corp, Mosaic and Agrium Inc (which are miners); and **BPC**, which represents Uralkali and Belaruskali.",
      "To ensure high profits, the two companies have restricted volumes and thus keep prices high: potash prices were $440 the day before the announcement.",
      "The industry has significant excess production capacity, both because of unused capacity by the major producers and because of many smaller miners that either have a single mine or have a mine site that they could develop.",
      "Uralkali says that it plans to compete on volumes against its former partners.",
      "Karnalyte does not currently have any producing mines, they have one mine site that could be developed.",
      "Assume that any mine that earns exactly zero profits will continue production.",
      "The scrap value of Karnalyte’s equipment is $5 million and the scrap value of the mines is $30 million.",
    ],
  },
  {
    n: "03",
    label: "Approach / Analysis",
    title: "Exhibit 1",
    kind: "qa",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        paragraphs: [
          "The key insight is that previously, the major miners have been acting as a **cartel** and **colluding** to raise prices (and profits). Once Uralkali begins competing on price, **prices will fall** rapidly as the industry approaches full capacity.",
          "When the candidate realizes that prices are going to fall, give them Exhibit 1 and have them figure out where prices will fall to. They should ask for the costs facing each level of miner to determine whether a given level will remain profitable after the price decline.",
          "From Exhibit 2, they should work in reverse to figure out which groups will produce and thus, where prices will settle once the industry stabilizes.",
        ],
      },
    ],
    exhibitTitle: "Exhibit 1",
    extraCharts: [
      {
        kind: "combo",
        title: "Demand Curve for Potash",
        titleBold: true,
        titleAlign: "center",
        serif: true,
        axisBold: true,
        yMax: 500,
        yStep: 50,
        yLabel: "Potash Price per tonne",
        legend: "none",
        plotAspect: 0.4,
        categories: ["Prices as of July 29th", "Full Capacity of Large\nMiners", "All Existing Mines", "All Existing and\nPotential Mines"],
        xTitle: "Potash Production Levels",
        lines: [
          {
            name: "Potash Price per tonne",
            color: "#4a7ebb",
            values: [440, 350, 300, 280],
            width: 5,
            marker: "diamond",
            markerSize: 14,
            valueLabels: true,
            labelBold: false,
            labelPos: [null, null, null, "right"],
            labelColor: "#404040",
          },
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    exhibitTitle: "Exhibit 2",
    dataTableTitle: "Production Economics of Potash Mines",
    dataTableSerif: true,
    dataTableCols: "1.2fr 1.2fr 1fr 1.4fr",
    dataTableHeaders: [HC("Status of Mine"), HC("Production Cost/tonne"), HC("Fixed Costs"), HC("Annual Production (tonnes)")],
    dataTableRows: [
      row("Existing Large Miner", ["$130", "$300 million", "2 million"]),
      row("Existing Small Miner", ["$200", "$50 million", "500,000"]),
      row("Potential Mines", ["$200", "$80 million", "500,000"]),
    ],
    dataTableFootnote: "* Potential mines are those that have discovered potash reserves, but have not built the infrastructure to extract it.",
    dataTableFootnoteLeft: true,
    calcTables: [
      {
        title: "If undeveloped mines produce, prices will be $280.",
        headers: ["", ""],
        rows: [
          ["Price", "$280/ton"],
          ["Variable Costs", "$200/ton"],
          ["Gross Margin", "$80/ton"],
          ["Production", "500,000"],
          ["Revenues", "$40 million"],
          ["Fixed Costs", "$80 million"],
          ["Profits", "==($40 million)=="],
        ],
        rowStyles: [{}, {}, {}, {}, {}, {}, { bold: true }],
      },
      {
        title: "Thus undeveloped mines will not produce. Now that this possibility is ruled out, move up the demand curve to the next point and evaluate small mines when prices are $300",
        headers: ["", ""],
        rows: [
          ["Price", "$300/ton"],
          ["Variable Costs", "$200/ton"],
          ["Gross Margin", "$100/ton"],
          ["Production", "500,000"],
          ["Revenues", "$50 million"],
          ["Fixed Costs", "$50 million"],
          ["Profits", "==$0=="],
        ],
        rowStyles: [{}, {}, {}, {}, {}, {}, { bold: true }],
      },
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "Since we know mines that earn zero profits will stay in business, the equilibrium price is ==$300/ton==. There is no real reason to calculate the profits of the senior miners, if the candidate does so, they should use the equilibrium $300 price and find that profits are ==$40 million==. Focusing on Karnalyte, their mine has not yet been developed, so the prior analysis shows that they cannot develop their mine. The candidate should see from their balance sheet that they must come up with $30 million by the next year and thus must liquidate their assets.",
    ],
  },
  {
    n: "05",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Conclusion:**",
      "1. This change in the partnership poses a serious threat to the potash market as higher volumes will push prices down to ==$300== as all existing mines move to full capacity.",
      "2. Since Karnalyte has not yet developed their mine and it no longer makes economic sense to do so, they should liquidate their assets.",
      "3. Once they pay off their debts and employees, immediate liquidation will leave ==$10 million== for shareholders.",
    ],
  },
];
