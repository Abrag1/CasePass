import type { CasePage } from "../content";

export const CASE_ID = "0f210e14-896e-4b00-b72c-5851a0fff02b";

export const CASE_META = {
  review: "auto", // always "auto" for agent output; only the owner sets "confirmed"
  case_type: "Growth",
  synopsis:
    "A fast-growing generative AI startup has raised a large amount of funding and wants to know which new market and application to invest in. The candidate works through market-size exhibits, a payback calculation and a brainstorm.",
  full_prompt:
    "Robots Inc. is a rapidly growing startup in the artificial intelligence sector specializing in generative AI models for various industries. Recently, with the popularity of AI, the company has attracted a large amount of funding and plans to expand their services. However, since it's a very new market, there are so many opportunities to be explored. For this reason, the CEO approached you with a question: \"Which new market and application should we invest our money in?\"",
  tags: ["interviewer-led", "growth", "exhibit-heavy", "payback-math", "brainstorming"],
};

const ORANGE = "#f47321";
const NAVY = "#0e245c";
const TEAL = "#007a82";
const YELLOW = "#f5b800";
const GREEN = "#76a000";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Prompt",
    kind: "ready",
    body: "Robots Inc. is a rapidly growing startup in the artificial intelligence sector specializing in generative AI models for various industries. Recently, with the popularity of AI, the company has attracted a large amount of funding and plans to expand their services. However, since it's a very new market, there are so many opportunities to be explored. For this reason, the CEO approached you with a question: \"Which new market and application should we invest our money in?\"",
    note: "Behavioral interview question: 1. Describe a time when you had to adapt your approach or strategy due to unexpected circumstances during a project.",
  },
  {
    n: "02",
    label: "Clarifying information",
    title: "Clarifying Information",
    kind: "qa",
    guidancePreLabel: "Clarifying Information",
    guidancePreNote: "Note: Provide this only if corresponding questions are asked.",
    guidancePreLines: [
      "**What is Robot Inc.'s goal?** The company's primary goal is leveraging their expertise in generative AI models so they can expand their services, enter high-growth markets, increase revenue, and secure a strong market position.",
      "**What is the company's business model?** Robots Inc. develops and licenses generative AI models for different industries, providing clients with customized AI solutions to address challenges in their specific sectors. As an example, the company once worked with a fashion retailer to create innovating clothing designs using AI models that analyzed customers data, leading to very positive results.",
      "**Where does the company operate?** North America, but they are considering starting their international expansion.",
      "**What is generative AI?** A type of AI that creates new content, data or solutions by learning from existing patterns and examples, using advanced machine learning techniques as deep learning and neural networks. By doing so, generative AI can result in outputs as text generation, image synthesis, and drug discovery, among many other possibilities.",
    ],
  },
  {
    n: "03",
    label: "Framework guidance",
    title: "Framework Guidance",
    kind: "qa",
    infoBoxLabel: "Framework Guidance",
    infoSections: [
      {
        paragraphs: ["Note: There are many possible alternatives to this framework. These are only provided as possible suggestions."],
      },
      {
        label: "Market",
        groups: [
          { heading: "Market segments in AI industry", items: ["Identifying which market segments there are for the company to enter"] },
          { heading: "Market size and growth according to segments", items: ["Measuring the opportunities in different segments"] },
          { heading: "Competition", items: ["Fragmented?/Concentrated?", "High barriers to entry?"] },
        ],
      },
      {
        label: "Service/product offering",
        groups: [
          { heading: "Customer preferences", items: ["How should the product look like?", "What solution should be offered?"] },
          { heading: "Financials", items: ["Revenues", "Costs", "ROI"] },
          {
            heading: "Pricing and promotion strategy",
            items: ["Creating a need or it already exists?", "Freemium? Another pricing model?"],
          },
        ],
      },
      {
        label: "Capabilities",
        groups: [
          {
            heading: "Capital Availability",
            items: ["Company has money to embark in this endeavor?", "Funding requirements (company is a startup)"],
          },
          {
            heading: "Supply chain capacity",
            items: [
              "Who are our suppliers?",
              "Do we have high bargaining power?",
              "Do we have the operational capabilities needed to enter a new industry?",
            ],
          },
          {
            heading: "Regulatory scenario",
            items: ["How is regulation looking like currently and in the future? Will lobbying be needed?"],
          },
        ],
      },
      {
        label: "How to Move Forward:",
        paragraphs: [
          "A **great** framework will consider the specificity of the case and the candidate will relate the buckets to AI, also considering potential regulatory risks.",
          "In this case, **to move forward**, the candidate should want to analyze market entry opportunities. As such, they should choose to go with analyzing the current market for different opportunities regarding AI, what will unlock Exhibit 1.",
          "If they want data about the company's financials or potential products, make it clear that \"The company wants us to conduct a more general analysis first regarding their potential opportunities. Considering that, where would you like to start?\".",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Question 1 · Exhibit 1",
    title: "Question 1",
    kind: "qa",
    qText: "Which insights can you derive from this Exhibit?",
    axisStackTitle: "Exhibit 1",
    axisStackSubtitle: "Market Size (2023-2026)",
    axisStackFootnote: "*All amounts (y-axis) in billions of dollars.",
    axisStackYMax: 15,
    axisStackYStep: 1,
    axisStackLegend: [
      { name: "Healthcare", color: ORANGE },
      { name: "Manufacturing", color: NAVY },
      { name: "Finance", color: TEAL },
      { name: "Retail", color: YELLOW },
      { name: "Other", color: GREEN },
    ],
    axisStackCols: [
      { label: "2023", segs: [{ value: 0.7, color: GREEN }, { value: 1.0, color: YELLOW }, { value: 1.8, color: TEAL }, { value: 1.5, color: NAVY }, { value: 2.0, color: ORANGE }] },
      { label: "2024", segs: [{ value: 0.8, color: GREEN }, { value: 1.2, color: YELLOW }, { value: 2.2, color: TEAL }, { value: 1.8, color: NAVY }, { value: 2.5, color: ORANGE }] },
      { label: "2025", segs: [{ value: 0.9, color: GREEN }, { value: 1.4, color: YELLOW }, { value: 3.1, color: TEAL }, { value: 2.4, color: NAVY }, { value: 3.6, color: ORANGE }] },
      { label: "2026", segs: [{ value: 1.0, color: GREEN }, { value: 2.0, color: YELLOW }, { value: 3.9, color: TEAL }, { value: 2.6, color: NAVY }, { value: 5.0, color: ORANGE }] },
    ],
    guidanceLabel: "Exhibit or Question Guidance",
    guidanceLines: [
      "The market is growing at approximately ==20%-30% per year==, which is significant;",
      "The Healthcare and the Finance segments are the most promising;",
      "From this exhibit, it looks that the Healthcare segment, specifically, is the most promising;",
      "**To move forward**, the candidate should ask for financial data about potential applications/opportunities in the healthcare market that the company can pursue. If they want to move in another direction, state that \"The company would like to better understand the specific opportunities in the market we advise them to invest. What would you want to know having that in mind?\"",
    ],
  },
  {
    n: "05",
    label: "Question 2 · Exhibit 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "Our team has just gathered this data about potential applications in the Healthcare market that our client could pursue. Which one would you advise them to invest in? Assume that the YoY growth will be the same for all of them.",
    axisStackTitle: "Exhibit 2",
    axisStackSubtitle: "Market Size - Potential Healthcare Applications (2023)",
    axisStackFootnote: "*All amounts in millions of USD.",
    axisStackYMax: 2000,
    axisStackYStep: 500,
    axisStackConnectors: true,
    axisStackCols: [
      { label: "Medical\nImaging", segs: [{ value: 500, base: 0, color: ORANGE }] },
      { label: "Disease\nPrediction", segs: [{ value: 400, base: 500, color: ORANGE }] },
      { label: "Genomic\nAnalysis", segs: [{ value: 350, base: 900, color: ORANGE }] },
      { label: "Drug Discovery", segs: [{ value: 300, base: 1250, color: ORANGE }] },
      { label: "Personalized\nMedicine", segs: [{ value: 250, base: 1550, color: ORANGE }] },
      { label: "Treatment\nOptimization", segs: [{ value: 200, base: 1800, color: ORANGE }] },
      { label: "Total\nHealthcare\nMarket", topLabel: "2,000", segs: [{ value: 2000, base: 0, color: ORANGE }] },
    ],
    guidanceLabel: "Exhibit or Question Guidance",
    guidanceLines: [
      "From this Exhibit, the candidate should advise the company to pursue **Medical Imaging**, since it's currently worth ==$500M==;",
      "**Great candidates** will associate this data with Exhibit 1, ballparking that, considering the ==2.5x== growth in the healthcare industry, investing in **Medical Imaging** can get the company into a market that will be worth around ==$1.25B== by 2026;",
      "**To move forward,** the candidate should ask about potential costs involved in this endeavor, what will take them to the math question.",
    ],
  },
  {
    n: "06",
    label: "Question 3 · Math",
    title: "Question 3",
    kind: "qa",
    qText:
      "The Medical Imaging market is currently worth $500 million and expected to linearly grow to $1.25 billion by 2026. If Robots Inc. invest in it, we know the initial investment to develop the necessary AI models and infrastructure will be of $200 million, to be incurred in 2023, with annual operating costs of $8 million, starting in 2024. Also starting in 2024, the company foresees a 5% penetration rate, which is expected to grow 40% yearly until 2026. For Robots Inc. to make this investment, they have set the goal of payback period of three years (by 2026). Will the company achieve such a goal?",
    guidancePreLabel: "Question 3 (math, to be read after insights from Exhibit 2)",
    guidancePreLines: [
      "The candidate will **need** to ask for the following information to solve the question (wait for them to ask for it):",
      "**a) Discount rate:** 10%;",
      "**b) In which year are we?** We're currently in 2023 (this will influence the NPV calculation);",
      "**c) YoY growth:** linear, with growth applying from 2024 to 2026 (already stated in the question).",
      "**Great candidates** will set themselves apart here by using a structured approach, which will lead them to results faster.",
      "The candidate needs to calculate **i.** market size, **ii.** penetration rates, **iii.** revenues, and **iv.** Payback period",
    ],
    calcLines: [
      {
        q: "i. Market size",
        a: "assuming linear growth, the market will grow [($1.25bi - $500mi)/3] per year, which equals $250mi/year -> market size - 2024: ==$750mi==, 2025: ==$1bi==, 2026: ==1.25bi==;",
        stack: true,
      },
      {
        q: "ii. Penetration rates",
        a: "in 2024, rate = 5%. Accounting the 40% yearly growth, 2025 = 5% * 1.40 = ==7%==, and 2026 = 7% * 1.40 = ==9.8% ≈ 10%==",
        stack: true,
      },
      {
        q: "iii. Revenues",
        a: "in 2024, 5% * $750mi = ==$37.5mi==; in 2025, 7% * $1bi = ==$70mi==; in 2026, 10% * $1.25bi = ==$125mi==",
        stack: true,
      },
      { q: "iv. Payback period", a: "", stack: true },
      { q: "2023 =", a: "Initial investment: -$200 M" },
      { q: "2024 =", a: "Operating costs: -$8 M; Revenue (2024): $37.5 M; Net cash flow (2024): ==$29.5 M==" },
      { q: "2025 =", a: "Operating costs: -$8 M; Revenue (2025): $70 M; Net cash flow (2025): ==$62 M==" },
      { q: "2026 =", a: "Operating costs: -$8 M; Revenue (2026): $125 M; Net cash flow (2026): ==$117 M==" },
    ],
    answerText:
      "**Total Profit in three years** = $29.5 M + $62 M + $117 M = ==$208.5 M > $200 M==, reason why the company will achieve its goal. Once the candidate gets to that, move to the brainstorming question.",
  },
  {
    n: "07",
    label: "Brainstorming",
    title: "Brainstorming",
    kind: "qa",
    qText:
      "The AI industry is going through exponential growth, as we have seen. Considering that, what would be other potential applications the company could explore outside of the healthcare market?",
    infoBoxLabel: "Brainstorming Guidance",
    infoSections: [
      {
        paragraphs: [
          "Note: This is just one possible set of categories and answers. Many more are possible, and interviewers should assess both the volume and relevance of answers.",
        ],
      },
      {
        label: "Entertainment Industry:",
        lines: [
          "Building AI-powered characters for parks (e.g. for meet/greet)",
          "Improving the current state of AI in the gaming industry, as to improve in-game experience of gamers",
          "Collecting data to generate new streaming content",
        ],
      },
      {
        label: "Finance:",
        lines: [
          "AI-powered market analysis",
          "AI-powered bots to make investment decisions according to investor's risk-profile",
          "AI-based fraud detection and prevention systems",
        ],
      },
      {
        label: "Education:",
        lines: [
          "AI-generated adaptive study plans",
          "AI-teaching assistants, tailored to specific students' needs",
          "AI-assisted plagiarism detection",
        ],
      },
      {
        label: "Best candidates display:",
        paragraphs: [
          "Strong structure, so ideas can be presented in a concise and effective way, and high creativity, considering AI displays a huge breadth of opportunities.",
        ],
      },
    ],
  },
  {
    n: "08",
    label: "Conclusion",
    title: "Conclusion",
    kind: "qa",
    qText: "You are on a call with the CEO to provide an update on the topic. What do you say?",
    infoBoxLabel: "Conclusion",
    infoSections: [
      {
        label: "Recommendation:",
        lines: [
          "Robots Inc. should enter the ==Healthcare market==, currently worth ==$2B== and poised to grow around ==2.5x by 2026==, specifically in the ==Medical Imaging== application, since this represents the highest share in such market.",
        ],
      },
      {
        label: "Risks:",
        lines: [
          "The candidate can mention various factors:",
          "  Regulatory and compliance risks",
          "  Competition and IP protection",
          "  Adoption challenges",
        ],
      },
      {
        label: "Next Steps:",
        lines: [
          "Among several factors, the candidate can mention:",
          "  Conducting research about the current and future regulatory scenario, to conclude whether the project is feasible and whether lobbying will be needed",
          "  Develop IP protection strategy to safeguard the company's AI models",
          "  Engage with industry experts/potential customers to better understand their needs and address potential adoption challenges",
        ],
      },
    ],
  },
];
