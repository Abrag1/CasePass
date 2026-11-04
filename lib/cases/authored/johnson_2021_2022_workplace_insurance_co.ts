import type { CasePage } from "../content";

export const CASE_ID = "54bfdad5-8376-457e-a165-5b21e998635e";

const PROMPT =
  "Our client is a large US insurance company that is thinking about launching a new type of insurance product that deals with injuries at a workplace – a form of workmen’s compensation for blue-collar workers. They have hired us to determine the potential market size and revenue potential for this new product (if they were to go ahead with the launch).";

export const CASE_META = {
  review: "auto",
  case_type: "Market Sizing",
  synopsis:
    "A large US insurer is considering a new workplace injury insurance product for blue-collar workers. Estimate the market size and revenue potential through a chain of sensible assumptions.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "market-sizing", "light-math", "insurance"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewee-led]",
    infoSections: [
      {
        paragraphs: [
          "This is a straightforward market sizing case with a lot of assumptions. The interviewee can go many directions, but must come up with sensible assumptions around market size and potential revenue. The more detailed the candidate gets with their assumptions while keeping math simple, the better.",
        ],
      },
      {
        label: "Approach / Analysis",
      },
      {
        label: "Potential structure for answering this case could include:",
        paragraphs: [
          "US population is 300m, workforce participation is mostly among people aged between 20-60, unemployment is approx. 3%; make an assumption about how many workers are blue-collar. Once candidate makes an assumption here, probe on what basis. One example could be GDP split (e.g. 40% of US GDP comes from companies or industries that involve blue-collar work, e.g. oil and gas, manufacturing, etc.).",
          "Once the candidate computes an estimate for the number of employed blue-collar workers, they should make assumptions around the following:",
        ],
        lines: [
          "Number of injuries;",
          "Frequency of injuries per year;",
          "% of injuries claimed by companies;",
          "Average duration a worker is affected (i.e. unable to work as a result of the injury);",
          "Average wage of blue-collar workers;",
          "Average compensation to be paid to injured workers;",
          "Market share client expects to reasonably capture with this new product (assuming similar products are being offered by competitors)",
        ],
      },
      {
        paragraphs: [
          "The more detailed the candidate gets with their assumptions while keeping math simple, the better.",
        ],
      },
    ],
  },
];
