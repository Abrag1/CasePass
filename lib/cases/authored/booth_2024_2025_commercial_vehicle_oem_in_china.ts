import type { CasePage } from "../content";

export const CASE_ID = "7d0ff919-ac2d-4e17-936a-174e1ce14d7b";

export const CASE_META = {
  review: "auto",
  case_type: "Growth Strategy",
  synopsis:
    "A global commercial vehicle manufacturer has struggled to grow in China, now the world's largest market. Brainstorm why, then calculate the market share a new China-specific brand needs to break even on a large capital investment.",
  full_prompt:
    "Our client is Matthew Stafford, CEO of Megatron International, a global commercial vehicle OEM. The company is successful and has strong positions in “mature” markets - i.e., North America and Western Europe. Nonetheless, while it entered China five years ago, it has struggled to grow there. This is particularly troubling since China has become the world’s largest market and now represents 80% of global demand by volume. We have been tasked to help Stafford and Megatron profitably increase its share position in China.",
  tags: ["interviewer-led", "growth-strategy", "brainstorming", "breakeven", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: "Our client is Matthew Stafford, CEO of Megatron International, a global commercial vehicle OEM.\n\nThe company is successful and has strong positions in “mature” markets - i.e., North America and Western Europe. Nonetheless, while it entered China five years ago, it has struggled to grow there. This is particularly troubling since China has become the world’s largest market and now represents 80% of global demand by volume.\n\nWe have been tasked to help Stafford and Megatron profitably increase its share position in China.",
    note: "**Fit Questions** — 1. What can you contribute to our consulting team? 2. Why did you choose this geographic location?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "A key assumption to this case is that ==profitability will result from growth== - the critical question is how to increase share.",
        ],
      },
      {
        label: "There are two dimensions:",
        lines: [
          "**Qualitative discussion (10 - 15 min)**",
          "  Why did Megatron originally believe it could be successful in China?",
          "  Why has Megatron struggled in China?",
          "**Quantitative calculation (10 - 15 min)**",
          "  Should Megatron proceed with the capital investment?",
          "  What are the risks to each decision?",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Qualitative brainstorming" },
          { n: "3", text: "Quantitative analysis" },
          { n: "4", text: "Recommendations" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    infoBoxLabel: "Framework",
    infoSections: [
      {
        label: "OEM Market in China",
        groups: [
          { heading: "Growth and size of market", items: [] },
          { heading: "Customer:", items: ["Preferences – quality considerations; price-sensitivity; ability to pay for vehicle"] },
          { heading: "Competitors:", items: ["Product differentiators; fragmented or concentrated mkt."] },
          { heading: "Geographic location", items: [] },
        ],
      },
      {
        label: "Profitability",
        groups: [
          { heading: "Revenue:", items: ["Price of vehicles manufactured, # sold, by region", "Product mix"] },
          {
            heading: "Costs",
            items: ["FC: PPE, initial investments-recouped?", "VC: labor, per vehicle mfg., distribution, salesforce"],
          },
        ],
      },
      {
        label: "Company",
        groups: [
          {
            heading: "Capabilities",
            items: ["Scale in manufacturing, low-cost, global", "Excellent product quality, brand reputation"],
          },
          {
            heading: "Risks",
            items: ["Entering unfamiliar emerging market", "Lack of parts / service availability / dist. Network for regions"],
          },
        ],
      },
      {
        label: "Transition statement:",
        paragraphs: [
          "I would like to consider Megatron’s positioning in China along each of these three parameters to better understand their current abilities relative to that of their competitors.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "Strong candidates should focus on **market considerations**, **profitability of the client**, and the client’s overall **capabilities and risks** it has as a company in the Chinese OEM market.",
      "If candidates do not consider the company’s capabilities, **push** them to do so before continuing with the case.",
    ],
  },
  {
    n: "03",
    label: "Question: China Entry",
    title: "China Entry",
    kind: "qa",
    qText:
      "As we mentioned, Megatron is an established and successful player in North American and Western European markets.\n\nLooking back at the decision to enter China five years ago:\nWhat capabilities did Megatron assume it could bring to bear as it expanded into China? Or, put another way, what advantages that helped drive its success in mature markets would have been most applicable as it expanded into emerging regions?",
    guidancePreLabel: "Question: China Entry",
    guidancePreLines: [
      "**Push** the candidate to go beyond their initial thoughts from their framework by asking, “what else?”, as the candidate walks you through their ideas.",
    ],
    guidanceLabel: "Interviewer Guidance: China Entry",
    guidanceLines: [
      "There is **no data** to support the question - the interviewee is merely to provide hypotheses. A strong response would draw out the various steps of the value chain and then comment on whether or not such capabilities could be transferred to China; for example:",
      "  Strong product development capabilities",
      "  Scale in manufacturing",
      "  Low-cost and global manufacturing footprint and supply chain (it currently supplies two regions)",
      "  Excellent product quality and reliability",
      "  Strong brand / marketing and sales capabilities",
      "  Global management team",
    ],
  },
  {
    n: "04",
    label: "Question: Capabilities",
    title: "Capabilities",
    kind: "qa",
    qText:
      "Despite these advantages, Megatron has clearly struggled to increase its presence in China.\n\nWhat capabilities do you think it lacks? What factors have likely contributed to its difficulties?",
    guidanceLabel: "Interviewer Guidance: Capabilities",
    guidanceLines: [
      "Again, there is **no data** - the candidate is asked to develop hypotheses. A strong response must mention ==lack of local market knowledge== - i.e., unfamiliarity with new competitors, customer needs, buying criteria, product requirements, etc.",
      "Additional factors that may be mentioned include:",
      "  Inadequate dealership network",
      "  Lack of parts / service availability",
      "  Over-engineered product",
      "  Lack of regional scale",
      "**Note:** Candidate may mention concerns around government involvement in market / need to find local JV partner: while these are very valid concerns, they are not the focus of this example.",
    ],
  },
  {
    n: "05",
    label: "Case Development",
    title: "Case Development",
    kind: "qa",
    qText: "We are to advise Stafford and Megatron on whether or not to invest in Ndamukong.",
    guidancePreLabel: "Case Development",
    guidancePreIntro:
      "At this point, the interviewer will direct the candidate to explore in greater depth the issue of “lack of local market knowledge”.",
    guidancePreLines: [
      "The Chinese commercial vehicle market is dominated by domestic firms, which control ==90%== of volume (five major players - top domestic OEM controls ==20%==).",
      "These competitors have adopted a completely different strategy:",
      "  While Megatron trucks are built to last for ==twenty years==, Chinese entries are far less durable - lasting for, at most, ==4 years==.",
      "  Nonetheless, these trucks are far less expensive - priced at ==¼== the amount of Megatron’s.",
      "  This value proposition plays well to Chinese customers, for whom price and payback period are critical considerations.",
      "In attaining market leadership, Megatron is considering introducing a new brand - Ndamukong Inc. - with products specifically built for the Chinese market.",
      "These products would be priced similarly to those of the competition, with equivalent performance / cost trade-offs.",
      "To simplify, the required investment would consist of a ==$500M== facility / supply base / distribution network to produce Ndamukong-branded commercial vehicles.",
    ],
    infoBoxLabel: "Interview Guidance",
    infoSections: [
      {
        label: "Breakeven Calculation",
        lines: [
          "The interviewer should **share** the following information with the candidate **only upon request**.",
          "  Total size of global market: ==500K units==",
          "  Price of Ndamukong vehicle: ==$50K== per unit",
          "  COGS of Ndamukong vehicle: ==75%== of price",
          "  SG&A: ==$10K== per unit",
          "  Stafford and Megatron would require a break-even period of ==4 years==.",
          "  For ease of calculation, the Chinese truck market is not expected to grow over the next five years.",
          "The key calculation is to determine the **market share required to breakeven** on the investment within the four-year time frame.",
        ],
      },
      {
        label: "Breakeven Calculation",
        lines: [
          "Size of Chinese market = 500K x 80% = ==400K units==",
          "Variable margin per vehicle = $50K - (75% * 50K) - 10K = ==$2.5K==",
          "Vehicle sales required to breakeven = $500M / $2.5K = ==200,000 units==",
          "Vehicle sales per year required to breakeven = 200,000 units / 4 years = ==50,000 units==",
          "Market share required = 50,000 / 400,000 = ==12.5%==",
          "Candidates could also perform additional calculations:",
          "  Calculate additional profit potential - each 1% share delivers $10M in variable margin.",
          "  Describe share as percent of domestically-controlled market (14% = 50K / 360K annual units), as this is the most applicable segment for Ndamukong products.",
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      { paragraphs: ["Either go or no go for the investment is acceptable."] },
      {
        label: "Recommendation",
        paragraphs: [
          "Megatron should proceed with its investment in the Chinese commercial vehicles market and strive to achieve at least a breakeven market share of ==12.5%==",
        ],
        lines: [
          "This must be achieved by adapting to local preferences while maintaining a level of differentiation compared to domestic OEMs.  Only then would it be capable of reaching the market share required to be profitable. Ignoring the largest commercial vehicle market would be terribly prohibitive for future growth.",
        ],
      },
      { label: "Risks and Next Steps" },
      {
        label: "Risks Proceeding",
        lines: [
          "Failure to obtain required share due to competitive pressure / inability to distinguish Ndamukong offering in the market",
          "Dilution of Megatron brand / confusion over brand promises (i.e., customers expect Megatron quality from Ndamukong product)",
          "Megatron may lack the capabilities to engineer to “high enough” standards",
        ],
      },
      {
        label: "Next Steps Proceeding",
        lines: [
          "Competitor analysis to assess feasibility of and ways in which to achieve the 12.5% market share",
          "Customer insights study on brand image",
          "Explore partnership with local organizations to enhance local market knowledge and to identify potential 3rd-party manufacturers to help produce vehicle at “high enough” standards",
        ],
      },
      {
        label: "Risks Not Proceeding",
        lines: [
          "Omission from world’s largest commercial vehicle market and cession of global scale to Chinese OEMs",
          "Failure to develop manufacturing / design capabilities with which to serve other emerging markets",
        ],
      },
      {
        label: "Next Steps Not Proceeding",
        lines: [
          "Re-focus efforts on other emerging markets and determine if opportunity exists to enter a smaller market and be biggest player",
          "Create prioritization plan for internal growth of capabilities that best align with customer needs in emerging markets of interest",
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "Strong recommendations will **pick a firm position** and provide back-up using qualitative and quantitative analyses previously conducted as supporting evidence.",
    ],
  },
];
