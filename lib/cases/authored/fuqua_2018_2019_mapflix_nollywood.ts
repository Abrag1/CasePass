import type { CasePage } from "../content";

export const CASE_ID = "45634d54-ebff-47be-b64e-bd6bddf16f06";

const PROMPT =
  "Our client is Mapflix, a US-based video streaming company that streams movies/shows over the internet. Mapflix has established market leadership for online content/video streaming in the US/Europe, and has successfully entered emerging/growth markets such as Mexico, Brazil, and India. Mapflix CEO, Chris Bosh, is interested in expanding into Africa, and believes Nigeria would be a great market to enter. Before doing so, Chris Bosh has hired our team to provide a go/no-go recommendation on this opportunity. What are the factors Mapflix should consider when deciding to enter Nigeria?";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A US video streaming company is considering expanding into Nigeria. Structure the decision, size the market, compare entry strategies and test a partnership for NPV.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "market-sizing", "valuation", "light-math"],
};

const PURPLE = "#ab98ee";
const GREY = "#808080";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Prompt #1",
    title: "Prompt #1",
    kind: "ready",
    body: PROMPT,
    note: "Behavioral Questions. Question 1: Tell me about a time when you had to change somebody’s opinion. Question 2: Tell me about a time when you disagreed with a colleague.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        lines: ["This is an interviewer-led case, and requires the interviewer to direct the interviewee through a series of questions/analyses"],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Prompt #1: Framework",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "Information to provide if asked:",
    guidancePreLines: [
      "Mapflix goal is to achieve positive NPV",
      "Competitors: No other major competitors have entered Nigeria, though there is a relatively small local provider",
      "Content: Mapflix desires to stream its current content library and acquire the rights to stream local content, as the Nigerian film industry (‘Nollywood’) is the 3rd largest in the world",
      "Economic conditions: Nigeria’s GDP, wage growth, streaming services market penetration are growing annually by double digits",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        label: "Good structure will consider:",
        lines: [
          "Market/Customer factors: Size/Growth of Nigeria streaming (or cable TV) market, Customer content needs (local vs. US/EU content?), price sensitivity/WTP",
          "Political/Economic factors: GDP/Wage growth, internet/technical infrastructure, data security/IP protections laws",
          "Competitor capabilities: exclusivity w/ local content, marketing/distribution (partnerships w/ internet service providers, brand recognition), prices/bundles",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Prompt #2",
    title: "Prompt #2",
    kind: "qa",
    qText:
      "Nigeria’s video streaming industry is still nascent, as only one local competitor is in operation. Mapflix feels that the demand for video streaming services is largely untapped. How would you size Mapflix Nigerian market potential (in USD) for video streaming services? (tell candidate to ignore F/X translation)",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "For penetration rates & market share: **ask** the candidate which data points he/she could use to estimate/benchmark penetration rates and market share potential **before providing values below.**",
      "**Provide information when requested:**",
      "  Nigerian HHs (50M)",
      "  Nigerian HHs w/ internet access (50%)",
      "  Monthly Fee ($8)",
      "  Video Streaming Penetration Rate (reflecting Mexican rates): 20%",
      "  Mapflix Market Share Potential (reflecting Mexican rates): 75%",
    ],
    answerText:
      "- **Market Size Answers:**\n  Nigerian HHs (50M) x Nigerian HHs w/ internet access (50%) x Monthly Fee ($8) x 12 months x VS Penetration Rate (20%) x Market Share (75%) = ==$360M==",
  },
  {
    n: "04",
    label: "Prompt #3",
    title: "Prompt #3",
    kind: "qa",
    qText:
      "Mapflix believes this is a substantial market opportunity, and is interested in exploring market entry strategies. What are Mapflix strategic options for market entry? What are the benefits / risks for each of those strategies?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "Candidate should leverage a **build, buy, partner** framework",
      "When the candidate provides partner option, **mention** that Mapflix is interested in partnering with a local internet service provider (ISP), and to **consider benefits / risks** of this option.",
    ],
    calcTable: {
      title: "",
      plain: true,
      cols: "0.9fr 2.2fr 2.2fr",
      headers: ["Description", "Benefits/rationale", "Risks/drawbacks"],
      rowBg: [],
      rulesAbove: [1, 2],
      rows: [
        [
          "Build infrastructure (data centers/ servers)",
          "- Build greenfield w/ best-in-class MPFLX technology/expertise\n- Most control over data streaming/content process",
          "- Highest risk exposure– economic uncertainty (wages, consumer spending), regulatory, tech infrastructure (data speed/capacity)\n- High up-front  technology development & integration costs\n- Slowest time-to-market\n- Strategic tech misalignment – developed markets moving to cloud-based infrastructure",
        ],
        [
          "Acquire local competitor",
          "- Local content access - if they have access to ‘Nollywood’ contacts\n- Quickest ramp-up – access to local client base and distribution\n- Brand recognition w/ current video streaming customers",
          "- Largely unproven execution/scalability of competitor\n- High acquisition cost\n- Operations/integration challenges",
        ],
        [
          "Partner w/ local internet service providers",
          "- Smallest investment cost - incremental technology costs (data center servers) split w/ partner\n- Low-cost distribution\n- Lowest data speed/capacity risk - selling data/internet alongside VSS\n- Lowest economic/regulatory risk exposure",
          "- Lower CF potential due to profit/revenue sharing model\n- Need to alter technology/streaming processes to address partner-specific configuration needs\n- Lack of control; Dependence on alignment with 3rd party",
        ],
      ],
    },
  },
  {
    n: "05",
    label: "Prompt #4",
    title: "Prompt #4",
    kind: "qa",
    qText:
      "The client believes partnering with a local internet service provider, and sharing 50% of post-tax profits, is its best option. The client is only interested in pursing this option so long as it is NPV positive. For the purposes of conducting a valuation, what inputs would you need? Should Mapflix pursue this option?",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: ["(Please **provide** candidate blue-highlighted inputs below **upon request**)"],
    dataTableCols: "2.2fr 0.8fr 3fr",
    dataTableHeaders: [
      { v: "Inputs", align: "left", fg: "#000000", borders: "trbl", borderColor: GREY },
      { v: "Values", align: "right", fg: "#000000", borders: "trbl", borderColor: GREY },
      { v: "Formulas", align: "left", fg: "#000000", borders: "trbl", borderColor: GREY },
    ],
    dataTableRows: [
        { cells: [ { v: "Rev, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "360", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "Margin, %", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "10%", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "Profit, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "36", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "Rev x Margin%", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "Tax, %", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "25%", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "Post-tax profit, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "27", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "Profit x (1 - Tax%)", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "MPFLX Profit Share, %", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "50%", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "MPFLX PT Profit, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "13.5", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "PT profit x MPFLX Profit Share%", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "WACC, %", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "15.0%", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "Growth, %", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "5.0%", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "Terminal Value, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "135", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "Post-tax profit / (WACC - Growth)", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
        { cells: [ { v: "MPFLX Investment Cost, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "90", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE }, { v: "", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY, bg: PURPLE } ] },
        { cells: [ { v: "NPV, $M", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "45", align: "right", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY }, { v: "TV - Investment", align: "left", w: 400, fg: "#000000", borders: "trbl", borderColor: GREY } ] },
    ],
  },
  {
    n: "06",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText:
      "Chris Bosh is about to walk into the room and wants to hear our findings and thoughts on whether Mapfix should enter Nigeria. What do you recommend?",
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Good candidates** will take a moment to gather thoughts and state the following:",
      "  Mapflix should enter the Nigerian market by partnering with local ISPs given: (1) Size of market / opportunity (2) Growth opportunity (3) Positive NPV valuation",
      "  **Risks:** (1) Nigerian internet / data infrastructure (2) Pricing / Customer WTP – wage growth, global pricing model (3) Access to local content / customer preference changes (4) Local ISP capabilities (5) FX volatility",
      "  **Next-steps:** (1) Vetting local ISPs – distribution, technology fit, etc. (2) Develop GTM strategy and integration plan",
    ],
  },
];
