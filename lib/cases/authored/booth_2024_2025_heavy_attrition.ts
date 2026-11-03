import type { CasePage } from "../content";

export const CASE_ID = "1783388b-ef79-44fd-b8ae-4dd50848b7f8";

const PROMPT =
  "Our client has asked us to look into why there is such heavy attrition amongst the junior salespeople in the organization. Where do you think we should start?";

export const CASE_META = {
  review: "auto",
  case_type: "Organizational Change",
  synopsis:
    "A medical device company is losing its junior salespeople far faster than its experienced ones. Work out why and what the client should do about it.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "organizational-change", "attrition", "brainstorming", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Describe your leadership style and give me an example of a time when you demonstrated it. 2. Tell me why you are specifically interested in our Firm and the city / office for which you are applying.",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This is an **open-ended case** that focuses on **brainstorming** and forming a hypothesis. It is indicative of the type of case typically provided by partners and could even be performed without pen and paper if asked to do so.",
          "An excellent candidate should be able to quickly distinguish what factors are key to focus on (i.e., those in the framework) based on the background information provided, and should also be able to provide a clear structure to an otherwise ambiguous case.",
          "**Let the candidate drive the case.** The candidate should ask clarifying questions around the qualitative \"heavy attrition\" verbiage.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework" },
          { n: "2", text: "Discussion/ Q&A" },
          { n: "3", text: "Recommendation" },
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
    guidancePreIntro: "**When asked**, reveal the following:",
    guidancePreLines: [
      "The average time a newly hired salesperson stays in the organization is ==less than one year==. This is worrisome because it takes about ==6 months== for a new salesperson to learn how to do their job well and get up to speed.",
      "On the other hand, experienced salespersons (people who have been with the organization greater than 3 years) have ==almost no attrition==.",
      "The organization is a fairly new medical devices company that has been operating for ==10 years==.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Working hypothesis:** The heavy attrition is due to the incentive structure of the client. I would like to begin by examining differences in the incentive structure for junior and senior employees.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Increase retention through an improved incentive scheme",
      children: [
        {
          label: "Attrition not caused by poor performance",
          children: [
            { label: "% of company driven leaves (layoffs)" },
            { label: "Satisfaction with work environment among employees" },
            { label: "Is avg. attrition in the market lower?" },
            { label: "Any competitor or new market player hiring sales people?" },
            { label: "Industry exams needed after 1y?" },
          ],
        },
        {
          label: "Work conditions similar across all employees",
          children: [
            { label: "Working conditions of people working less than and over 3 years" },
            { label: "Working hours" },
            { label: "Type of work" },
            { label: "Location" },
            { label: "Insurance" },
            { label: "Maternity / paternity leaves, additional benefits" },
            { label: "Expense coverage" },
          ],
        },
        {
          label: "Are there differences in incentive schemes?",
          children: [
            {
              label: "Base and variable salary differences (sales people)",
              children: [{ label: "Commission by sales volume; distance traveled" }],
            },
            { label: "How does split compare to competition?" },
            { label: "Financial vs non-financial incentives" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The ideal candidate should be quick to hypothesize that there seems to be an incentive problem. As a result, while the framework may have a bucket addressing additional factors (i.e. industry regulations or exams, barriers from pre-existing relationships, etc.) it should primarily examine different types of incentives and how these compare between new and experienced sales representatives.",
      "Incentives could include the type of work, compensation, perks, etc.; however, since the primary work of sales people is to sell, we can assume that the nature of work is similar between both types of salespeople. Thus, we focus on the monetary aspects of the incentive structure.",
      "Sales people are typically paid a small fixed salary and a commission which is based off the sales they accomplish. Thus, commission for a sales person is a function of:",
      "  Volume sold (type of clients, type of product sold)",
      "  Distance traveled for each sale",
      "For the remainder of the case, the candidate should look to investigate how and why the commission varies between the junior and senior sales people with regards to each of the above factors.",
    ],
  },
  {
    n: "03",
    label: "Brainstorm",
    title: "Brainstorm",
    kind: "qa",
    qText:
      "**Ask the candidate:** \"Assuming there are no significant differences between the tasks of junior and senior sales people, what do you believe would be the main factors determining incentives obtained?\" A good candidate should present at least **3 headlines (buckets)** to create an efficient incentive scheme. The following three headlines are examples. Sub-topics should be discussed in detail. If the candidate does not do this, follow-up by asking what the most important issues to analyze first are - a good candidate will do this without additional questions needed.",
    infoBoxLabel: "Brainstorm",
    infoSections: [
      {
        groups: [
          {
            heading: "Type of product sold",
            items: ["Margins of each product?", "Effort to sell?", "Can junior sales people sell every product?"],
          },
          {
            heading: "Type of client in the territory",
            items: [
              "Incentive adjustment according to territory potential?",
              "How territories are assigned?",
              "Best clients / territories assigned to senior people?",
            ],
          },
          {
            heading: "Distance to customer location",
            items: [
              "Incentives adjusted to distance to customer?",
              "What is the average distance for each client on customer portfolios?",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "**Type of product sold**",
      "  The candidate should show an understanding that it is important if the company sells multiple products of differing commissions and price ranges and if the junior salespeople do not have access to the entire range of products.",
      "    For example: Apple iPods priced in the $100-300 range practically sell themselves, i.e. they require little effort on the part of the salesperson. iMacs, on the other hand, are priced in the $2000-3000 range and require a greater effort to sell.",
      "  The candidate should investigate whether the incentives are aligned with the effort required to make a sale, such as having a higher commission for an iMac than an iPod in the example above.",
      "  If the commissions are structured as above, the candidate should investigate whether junior salespeople are allowed to sell higher margin, higher commission products or whether they are forced to sell only the lower-priced end of the product line. Improper incentives could lead to lower morale among junior sales people and motivate them to leave quickly.",
      "**Type of client in the territory**",
      "  Typically sales people are assigned territories so they don't have to compete with one another for the same customers.",
      "  The candidate should want to know how territories are assigned. If it is based on geography, there could be a problem if junior salespeople are provided lower income neighborhoods, while senior salespeople command coveted higher-income neighborhoods (potentially skewed compensation).",
      "  On the other hand, territories could be based on industries of customers. For example, a few sales people sell to higher education, a few sell to businesses, a few to retail, etc. If the junior sales people are assigned to a client-group where they have to acquire new customers or where customers aren't familiar with the product, it could negatively impact their compensation.",
      "  Another issue could be that typically high volume customers for the firm are earmarked to be serviced by the senior sales team. This setup would inflate commission of the senior sales team to the detriment of junior members who are not able to experience the benefits of bigger clients or to build relationships with them.",
      "**Distance to customer location**",
      "  A salesperson's commissions could be heavily impacted if their customers are geographically separated by large distances and they are forced to spend relatively more time on the road traveling than with customers.",
      "  This problem could be compounded if the junior salespersons are getting new potential customers who are far from each other.",
    ],
  },
  {
    n: "04",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: ["As a final question to the candidate, **ask them for their recommendation**."],
        lines: [
          "The interviewee should prioritize one of the factors discussed previously and provide their rationale for doing so (the rationale matters more than which factor is selected).",
          "They should also include some suggestions like the ones listed in the sample recommendation, and should be rewarded for creative ideas.",
        ],
      },
      {
        label: "Recommendation",
        paragraphs: ["The client should review the incentive scheme for junior employees, namely by:"],
        lines: [
          "Analyzing the type of products sold by different sales levels, as this is likely to have the greatest impact on sales commission",
          "Reviewing any adjustments required to even out sales effort among territories",
          "Compensating for differences in average distances to clients",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Increases in attrition among senior employees",
              "Other factors might be creating the attrition problem",
              "Fairer incentives not enough to compete on the labor market",
            ],
          },
          {
            heading: "Next steps",
            items: [
              "Include senior employees in the decision making process / committee",
              "Investigate the main attrition caused through a survey to junior sales people",
              "Analyze competition and market best practices regarding compensation",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "As mentioned before, this case focuses on the candidate's ability to brainstorm. A good candidate will provide thoughtful reasoning about buckets and sub-bullets, making sure to have a MECE approach.",
      "It is also important to drive the case and prioritize topics in order of importance after each brainstorming question. Additionally, the candidate should keep using the same ideas across questions to show confidence in the reasoning presented before.",
    ],
  },
];
