import type { CasePage } from "../content";

export const CASE_ID = "884539da-fa8b-4377-a5a2-f5728674b548";

const PROMPT =
  "Your client is a bank that is considering changing their loan issuing operation to a new system. They would like you to evaluate the pros and cons of each system, and advise them on how to proceed.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability",
  synopsis:
    "A bank is considering replacing its two-stage background check with a single, more thorough central check. Compare the profitability of the original and proposed loan systems and advise on how to proceed.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "profitability", "mental-math", "financial-services"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Behavioral Case Question** — Spend 15 Minutes on: Tell me about a time when you had to manage conflict within a team",
    infoBoxLabel: "Case Overview [Interviewee-led]",
    infoSections: [
      {
        paragraphs: [
          "This is an interviewee-led case that tests profitability concepts and mental math. The interviewee must pay close attention to their math structure, or they can very easily get lost in the numbers.",
        ],
      },
      {
        label: "Case Information",
        paragraphs: ["The bank’s original loan process has the following steps:"],
        lines: [
          "A loan application is generated at a bank branch",
          "The branch completes a first background check",
          "If the applicant clears the first background check, it is sent to a central office for a second background check",
          "The central office either approves or denies the loan",
        ],
      },
      {
        paragraphs: [
          "The bank is considering eliminating the first background check and relying only on the check at the central office. Because more scrutiny would be needed at the central office, the total background check cost for each application would increase from $100 to $110 per application.",
          "For the original system, about 50% of all applicants make it through the first background check, and then 90% of those make it through the second background check.",
          "For any “good loans” where the bank is re-paid, the bank makes $0.20 per dollar loaned.\nFor any “bad loans” that are not re-paid, the bank loses $0.50 per dollar loaned.",
          "Should the bank proceed with the new system?",
        ],
      },
      {
        label: "Case Flow Guide",
        lines: [
          "**Part I: Ask the interviewee to come up with a framework**",
          "**Part II: Provide the interviewee with specifications and guide them to come up with a profitability analysis**",
          "**Part III: Ask for recommendation**",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    qText: "**Part I:** Ask the interviewee to come up with a framework",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro: "Note: only provide the following information if the interviewee asks for it.",
    guidancePreLines: [
      "The bank receives about 1,000 loan applications per year",
      "The average value of a loan is $10,000",
      "The proposed program has a 40% acceptance rate.",
      "The original program resulted in about 10% bad loans.",
      "The proposed program would result in only 5% bad loans (due to higher scrutiny at the central office).",
    ],
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "The interviewee should look to evaluate the profitability of each proposed system.",
      "  A good structure will show: strong profitability calculations and mental math.",
      "  A better structure will show: a distinct layout of “original system vs. new system”, along with some of the non-financial implications",
    ],
  },
  {
    n: "03",
    label: "Profitability analysis",
    title: "Approach / Analysis",
    kind: "qa",
    qText:
      "**Part II:** Provide the interviewee with specifications and guide them to come up with a profitability analysis",
    calcLines: [
      { q: "Original System:", a: "" },
      { q: "Formula", a: "(# applications) * (# approved) * ($ value of loans) * (amount earned per $ loaned)" },
      {
        q: "Expected revenue",
        a: "(1000 applications) * (50% first round loans approved) * (90% second round loans approved) * ($10,000 per loan) * [(90% good loans * $0.20 per dollar good loan) – (10% bad loans * $0.50)] = ==$585,000 expected revenue==",
      },
      {
        q: "Expected profit",
        a: "($585,000 expected revenue) – [($100 cost per loan) * (1000 loans)] = ==$485,000 expected profit==",
      },
      { q: "Proposed New System:", a: "" },
      { q: "Formula", a: "(# applications) * (# approved) * ($ value of loans) * (amount earned per $ loaned)" },
      {
        q: "Expected revenue",
        a: "(1000 applications) * (40% loans approved) * ($10,000 per loan) * [(95% good loans * $0.20 per dollar good loan) – (5% bad loans * $0.50)] = ==$660,000 expected revenue==",
      },
      {
        q: "Expected profit",
        a: "($660,000 expected revenue) – [($110 cost per loan) * (1000 loans)] = ==$550,000 expected profit==",
      },
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    qText: "**Part III:** Ask for recommendation",
    guidanceLabel: "Approach / Analysis",
    guidanceLines: [
      "**Recommendation:** A proper recommendation would indicate that the bank should move forward with the new loan system. An excellent solution/recommendation consist of correct math and structure, with additional considerations discussed such as legal regulations that may require multiple checks, or possible increased training costs for employees at the central office to handle the background checks in their entirety.",
    ],
  },
];
