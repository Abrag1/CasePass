import type { CasePage } from "../content";

export const CASE_ID = "87b32a25-5bc1-49be-bcc3-a1c85134669c";

const PROMPT =
  "At the height of his criminal activity in the 1980s, Pablo Escobar imported a menagerie of exotic animals to Colombia to show off at his personal zoo. Since then, many of the animals have escaped and are wreaking havoc on the countryside.\n\nNotably, Escobar’s hippos present the highest concern as they are known to attack humans, damage local ecosystems, and have no natural predators to keep their population in check. Experts estimate that the population of 50 escaped hippos will grow to 250 if left unchecked.\n\nYour client is the new president of Colombia, who ran a strong-on-hippo campaign and must now deliver results. Her administration has hired your firm to understand the key considerations of the problem and present potential solutions.";

export const CASE_META = {
  review: "auto",
  case_type: "Decision Analysis",
  synopsis:
    "Escobar’s escaped hippos are wreaking havoc in Colombia and the new president wants solutions. Structure the problem, then weigh two relocation options over five years and recommend one.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "decision-analysis", "non-profit", "light-math", "exhibit"],
};

const BLUE = "#2f50a3";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Case Overview",
    title: "Prompt",
    kind: "ready",
    body: PROMPT,
    note: "(This is interviewer-led, so the framework will not follow through the rest of the case. Each section is standalone.)",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        label: "Case Steps",
        lines: ["Exhibit: Hippo options", "Recommendations and next steps"],
      },
      {
        label: "Clarifying Information (If Prompted)",
        lines: [
          "A **strong candidate** will want to assess the scope of the damage, the stakeholders affected, and potential solutions/risks.",
          "The government has a deep budget to address the hippo problem. However, the client would still be interested in solutions that are cost-neutral / revenue-generating.",
          "Hippos are dangerous animals who have been known to attack humans. An average hippo eats 88 pounds of vegetation per day and will eat both wild plants and human-grown crops.",
          "Only hippos are in-scope for this case. Disregard other animals.",
          "The rate of hippo population growth is not an important assumption and will not factor into the case.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Sample Framework",
    title: "Sample Framework",
    kind: "qa",
    infoBoxLabel: "Sample Framework",
    infoSections: [
      {
        label: "Impact of Hippos",
        groups: [
          { heading: "Environmental", items: ["Destroys habitat", "Eats other animals’ food", "Hippo waste"] },
          { heading: "Social", items: ["Dangerous to humans", "Eats farmer crops"] },
          { heading: "Financial", items: ["Cost of hippo damage"] },
          { heading: "Trends", items: ["Impact will increase geometrically if hippos reproduce", "May expand outside of current habitat and terrorize neighboring zones"] },
        ],
      },
      {
        label: "Logistics",
        spaceBefore: 14,
        groups: [
          { heading: "Hippo capture", items: ["Safety of animals", "Employee safety"] },
          { heading: "Transportation / storage", items: ["Sourcing heavy-duty vehicles to move hippos", "Finding suitable habitat for hippos"] },
          { heading: "Hippo care", items: ["Veterinary checkup and sterilization", "Sourcing hippo food"] },
          { heading: "Hippo value", items: ["Is there a way we can extract value from the hippos?"] },
        ],
      },
      {
        label: "External Considerations",
        spaceBefore: 14,
        groups: [
          { heading: "Political backlash", items: ["Community groups", "Animal welfare activists", "International nonprofits"] },
          { heading: "Financial", items: ["Cost of capturing and containing hippos", "Potential cost of inaction"] },
          { heading: "Human resources", items: ["Sourcing expertise: animal experts, conservationists, etc."] },
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Exhibit - Hippo relocation options",
    title: "Hippo relocation options",
    kind: "qa",
    guidancePreLabel: "Hippo relocation options",
    guidancePreLines: [
      "The client has an opportunity to relocate the hippos to a local sanctuary, using them as a tourist attraction in Colombia",
      "Duke University offered to house some hippos, converting part of the Duke Lemur Center into a hippo research facility",
      "Which opportunity should the client pursue? Calculate for a five-year period. For the purposes of this case, the options are mutually exclusive – the client can only pursue one. **(Do not show the candidate the below exhibit, read aloud)**",
    ],
    calcTable: {
      title: "Exhibit - Hippo relocation options",
      plain: true,
      headers: ["Option 1: Colombian Hippo Campus", "Option 2: Duke Lemur & Hippo Center"],
      headerBg: BLUE,
      center: true,
      leftCols: [0, 1],
      cols: "1fr 1fr",
      rows: [
        [
          "- **Capacity:** 50 hippos\n- Colombian government would open a hippo sanctuary and sell tickets to tourists. Govt would keep all profit\n- It costs $15,000 to capture and tag each hippo\n- Annual maintenance cost is $5,000 for each hippo\n- Construction costs expected to be $2 million. Overhead for sanctuary will be $100,000 yearly\n- Expect 50k – 60k tourists visit per year, at ticket price of $20",
          "- **Capacity:** 30 hippos\n- The DLHC would provide a research grant of $1 million upfront plus $10,000 per hippo per year\n- Transportation costs from Colombia to North Carolina would be $15,000 per hippo\n- DLHC would cover hippo maintenance costs and keep hippos permanently after 5-year lease period",
        ],
      ],
    },
    calcTables: [
      {
        title: "Exhibit - Interviewer guidance",
        plain: true,
        headers: ["Option 1: Colombian Hippo Campus", "Option 2: Duke Lemur & Hippo Center"],
        headerBg: BLUE,
        center: true,
        leftCols: [0, 1],
        cols: "1fr 1fr",
        spans: [
          { row: 4, col: 0, span: 1, underline: true, bold: true },
          { row: 4, col: 1, span: 1, underline: true, bold: true },
        ],
        rows: [
          [
            "**One-time costs:**\n- Sanctuary Construction: $2 million\n- Hippo Acquisition ($15k/capture * 50 hippos): $750k",
            "**One-time revenue:**\n- Research grant: $1 million",
          ],
          [
            "**Recurring Revenue:**\n- Ticket Sales low (50k tourists * $20/ticket * 5 years): $5 million\n- Ticket Sales high (60k tourists * $20/ticket * 5 years): $6 million",
            "**One-time costs:**\n- Hippo Acquisition ($15 k/capture + $15 k/transport * 30 hippos): $900k",
          ],
          [
            "**Recurring Costs:**\n- Hippo maintenance ($5k/yr x 50 hippos * 5 years)\n- Overhead ($100k/yr * 5 years)",
            "**Recurring Revenue:**\n- Hippo lease ($10 k/hippo * 30 hippos * 5 years): $1.5 million",
          ],
          ["", ""],
          ["- Net Profit: $500k – $1.5 million", "- Net Profit: $1.6 million"],
        ],
      },
    ],
    guidanceLabel: "Exhibit Notes",
    guidanceLines: [
      "**Candidate should notice** that hippos would also need to be captured in DLHC scenario and factor cost in their calculations",
      "A **strong candidate** will notice that DLC can only accommodate 30 hippos – what will our client do with the other 20? There may be additional costs that are not captured in our analysis",
      "A **strong candidate** will calculate the low and high ranges of the Sanctuary scenario and make an assumption about which figure to use",
      "There is no definitively correct answer to the exhibit. This exercise will challenge the candidate to think creatively about the problem.",
      "  E.g., What are the non-financial benefits of keeping the hippos in Colombia? Consider the potential benefits of creating a cultural attraction, the economic benefit to the surrounding region, opportunity to create local jobs, developing academic & research assets. Can we increase price of tickets? Will attendance change over time?",
      "  What are the sensitivities in the analysis? Will the recommendation change depending on whether ticket sales are on the low/high end of the range provided? The client is a government so choosing a sub-optimal financial option may still be a good approach since profitability is not the main concern.",
      "**Ask the candidate to recommend one option and present risks & benefits of their proposed solution**",
    ],
  },
];
