import type { CasePage } from "../content";

export const CASE_ID = "b6dd0688-da54-4fc5-bf80-fbebcc51bc58";

const PROMPT =
  "Our client is a large pharmaceutical corporation, and they have developed a new vaccine that prevents low birth weight infants from contracting staph infections. They have approached us to determine the potential for this vaccine.";

export const CASE_META = {
  review: "auto",
  case_type: "Market Entry",
  synopsis:
    "A large pharmaceutical company has developed a vaccine that prevents staph infections in low birth weight infants. Size the revenue potential and weigh the cost of vaccinating against the cost of treating with antibiotics.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "market-entry", "pricing", "healthcare", "light-math"],
};

const L = (v: string, w = 600) => ({ v, align: "left" as const, w, fg: "#1f2421" });
const C = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: "#1f2421" });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you received feedback that you did not agree with. How did you respond? 2. Tell me about a time you needed to establish credibility with a team / manager. How did you accomplish this?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is a quantitative case that requires the candidate to synthesize facts presented in the discussion component with the data provided directly to them through the exhibit. Excellent candidates will be comfortable going beyond the calculations directly asked of them to generate more meaningful comparisons between different aspects of the data.",
        ],
      },
      {
        label: "Additional detail that can be provided in response to candidate follow-up questions:",
        lines: [
          "When the candidate asks what is meant by the ‘potential for this vaccine,’ explain that our client is looking for clarity around revenue potential and a cost-benefit analysis of administering the vaccine.",
          "Our client is looking to launch this product in the United States, and is not currently concerned about international potential.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Q&A/ Discussion" },
          { n: "3", text: "Quantitative Analysis" },
          { n: "4", text: "Recommendation" },
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro:
      "This is the back-and-forth section after the framework is presented. Below are several data points the interviewer should provide out loud if asked. The candidate may elect to complete market sizing first and come back to remaining questions later during the analysis.",
    guidancePreLines: [
      "**Basic Population / Demand Information**",
      "  Babies born each year in the U.S. – ==5 million==",
      "  Low birth weight babies born each year – ==10%== of all babies",
      "**Basic Product Information:**",
      "  Cost of Administration – ==$1,000== per dose of vaccine",
      "  Dosage – ==6 doses== (shots) needed per child",
      "  FDA Approval – Product has been fully approved",
      "  R&D Considerations – No - not for this case",
      "  Success Rate – Assume 100% for this case",
      "**Basic Competitor Information:**",
      "  Other comparable vaccines on market – None",
      "  Alternative products – Yes – if a low birth weight baby contracts staph, the infection can be treated with antibiotics (assume these are always successful). Note: more detail in Exhibit 1.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** To determine revenue potential, I would like to analyze the market demand by looking at the % of new births that will be targeted by this vaccine. Then, I would like to look at the cost of administering each vaccination to determine pricing potential. Do we have any such data?",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Market Size",
          children: [
            {
              label: "Population / demand",
              children: [{ label: "# of low birth weight infants / yr." }, { label: "Rates of staph infections" }],
            },
            { label: "Other vaccines (competition); substitute products (antibiotics)" },
          ],
        },
        {
          label: "Revenue Potential",
          children: [
            {
              label: "Price point per dose of vaccine",
              children: [
                {
                  label:
                    "Costs to administer vaccine; cost of other treatments if population is infected with staph (antibiotics)",
                },
              ],
            },
            { label: "Distribution channels: hospitals, clinics, drug stores / pharmacies" },
            {
              label: "Product mix:",
              children: [
                { label: "Can vaccine be administered with other vaccines needed by (this segment of) babies?" },
                { label: "Does our client make additional vaccinations for (this segment of) babies?" },
              ],
            },
            { label: "Product details: frequency of administration, efficacy, etc." },
          ],
        },
        {
          label: "Risks",
          children: [
            { label: "Stage of drug development: Ready for market? In clinical trials?" },
            { label: "FDA approval" },
            {
              label:
                "Changes to target population birth weights (i.e. # of babies born with such low birth weights in the U.S. may change with further advances in nutrition and healthcare)",
            },
          ],
        },
      ],
    },
  },
  {
    n: "03",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    qText: "**Show candidate Exhibit 1.** Ask:",
    guidancePreLabel: "Interviewer Guidance",
    guidancePreLines: [
      "1). What do you think you should price the vaccine at?",
      "  A: At or above the cost of administration or >= to $1000 / dose (==$6K== total).",
      "2). What is the potential revenue for the client at this price point?",
      "  A: At this point, the interviewee should be able to calculate the revenue potential of this vaccine given the current size of the target population:",
      "    (5M * 10% low birth weight babies) * (6 * $1,000/dose of vaccine)",
      "    = (500K low birth weight babies) * ($6,000/full vaccine administration)",
      "    = ==$3B== in revenue potential",
      "3). If the candidate tries to end the case here, push them by saying, “wow, that’s a huge number, can we go tell our client they will get $3B per year in revenue for this vaccine?  Do you think that’s realistic?”",
      "  A strong candidate would take this into consideration automatically.",
      "4). Encourage the candidate to consider alternative treatments / substitutes (competitor information on prev. page).",
      "  After discussing that the antibiotics are a substitute product, candidate should ask if there is any additional information regarding this type of treatment.",
      "  At this point the interviewer may state and ask the following:",
      "    The frequency of staph infections and the cost to treat them with antibiotics vary depending on the size of the baby. The client is interested in understanding the cost to vaccinate the total population of babies compared to the cost to treat the population of low birth weight babies with antibiotics.",
      "    First what is the cost to vaccinate the population of low birth weight babies by segment?",
    ],
    dataTableTitle: "Staph Infection Treatment by Baby Size",
    dataTableCols: "1.6fr 1fr 1fr 1fr",
    dataTableHeaders: [
      { v: "Segment of low birth weight babies", align: "left" },
      { v: "<1,000 grams", align: "center" },
      { v: "1,000- 1,500 grams", align: "center" },
      { v: "1,500- 2,500 grams", align: "center" },
    ],
    dataTableRows: [
      { cells: [L("% of low birth weight babies by segment"), C("10%"), C("10%"), C("80%")] },
      { cells: [L("Frequency of staph by segment"), C("40%"), C("10%"), C("2%")] },
      { cells: [L("Cost per child for antibiotics"), C("$35K/child"), C("$25K/child"), C("$10K/child")] },
    ],
    calcTable: {
      title: "The candidate should be able to fill out the below table based on the information provided in Exhibit 1 (next page)",
      headers: ["Segment of low birth weight babies", "<1,000 grams", "1,000-1,500 grams", "1,500-2,500 grams"],
      rows: [
        ["% of low birth weight babies by segment", "10%", "10%", "80%"],
        ["Frequency of staph by segment", "40%", "10%", "2%"],
        ["Cost per child for antibiotics", "$35K/child", "$25K/child", "$10K/child"],
        ["Size of segment", "50K babies (500K * 10%)", "50K babies (500K * 10%)", "400K babies (500K * 80%)"],
        ["Cost to vaccinate entire segment", "==$300M== (50K * $6K)", "==$300M== (50K * $6K)", "==$2.4B== (400K * $6K)"],
      ],
    },
  },
  {
    n: "04",
    label: "Case Development",
    title: "Case Development",
    kind: "qa",
    infoBoxLabel: "Case Development",
    infoSections: [
      {
        paragraphs: [
          "At this point the case should turn into a cost / benefit analysis. The person doing the case may ask a lot of questions about who’s paying, etc. For this case, that is not important. Inform the candidate that whichever treatment is the most cost effective will be the treatment most likely administered for each segment of the low birth weight baby population.",
        ],
        lines: ["The candidate should come up with the following comparison that they can use in their final recommendation."],
      },
    ],
    calcTable: {
      headers: ["Segment", "Cost to vaccinate", "Cost to treat with antibiotics", "Conclusion"],
      rows: [
        [
          "<1,000 grams",
          "$300M",
          "==$700M== (0.4*50K*35K)",
          "It is reasonable to expect that our client will attain $300M in revenue to cover the costs from vaccinating this segment, so vaccination would be the preferred treatment method for this segment of low birth weight babies.",
        ],
        [
          "1,000 - 1,500 grams",
          "$300M",
          "==$125M== (0.1*50K*25K)",
          "Our client could potentially capture $300M in revenue to cover the costs associated with treating this population segment with the vaccine.  However, it is not guaranteed and the antibiotic treatment may be the best treatment method for this segment of low birth weight babies.",
        ],
        [
          "1,500 - 2,500 grams",
          "$2.4B",
          "==$80M== (0.02*400K*10K)",
          "It is unlikely that our client will attain $2.4B in revenue to cover the costs associated with treating this segment of low birth weight babies with the vaccine. Unless there is some sort of government mandate that vaccine be given to all low birth weight babies, it is best to treat this segment of the population with antibiotics.",
        ],
      ],
    },
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
          "The company should consider a potential revenue range of ==$300M - $600M==",
          "  This depends on their ability to successfully capture the 1,000 - 1,500 grams segment for which the vaccine is not quite as cost effective",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Inability to capture segments for which the vaccine is less cost effective",
              "Risk of more harm to babies if they are allowed to contract staph first and are treated with antibiotics vs. vaccination",
              "  Public opinion against vaccinations",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Develop a product marketing strategy based on different levels of revenue potential explaining the benefits of preventing staph infections for low birth weight babies by vaccination",
              "Analyze potential short-term and long-term health effects of a staph infection on low birth weight babies to share with doctors / parents about why vaccination has a potentially higher overall benefit vs. antibiotics",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "Someone who “cracks the case” will instinctively realize that it’s cheaper to vaccinate the smallest group, and that it may be more cost effective to treat the other groups with antibiotics.",
      "The interviewee should present / discuss the risks associated with capturing the market for each segment of low birth weight babies. But, for the final recommendation, the candidate should synthesize their thoughts into one final analysis on the revenue potential of the vaccine for the client.",
    ],
  },
];
