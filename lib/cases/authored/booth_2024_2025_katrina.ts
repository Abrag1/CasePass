import type { CasePage } from "../content";

export const CASE_ID = "38d0754d-c0b5-4425-9a02-e31c397f2123";

const PROMPT =
  "Our client is a school district in New Orleans that has been completely devastated by Hurricane Katrina. After the hurricane, they saw most of their students leave and relocate to nearby states. Two years into the disaster, students are slowly returning. The school district has hired us to advise them on two things:\n\n1) How many schools do they need to reopen within the next couple of months?\n2) What can be done to improve the quality of education?";

export const CASE_META = {
  review: "auto",
  case_type: "Non-traditional Problem",
  synopsis:
    "A New Orleans school district devastated by Hurricane Katrina is seeing students slowly return. Advise on how many schools to reopen and how to improve the quality of education.",
  full_prompt: PROMPT,
  tags: ["candidate-led", "non-traditional", "brainstorming", "light-math", "non-profit"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time when you did not meet a goal. How how did you overcome / respond to this? 2. What are three adjectives your coworkers would use to describe you?",
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case provides a good balance between quantitative and qualitative reasoning skills, and also introduces a new perspective and set of client goals for the candidate to consider that differ from the typical business profitability model.",
          "The objective of this case is to see if the candidate can break down a problem statement to analyze the different causes that might be contributing to the issue at hand.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework/ Q&A" },
          { n: "2", text: "Quantitative discussion" },
          { n: "3", text: "Qualitative discussion" },
          { n: "4", text: "Final recommendation" },
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
    guidancePreIntro: "Additional information (to be provided if candidate asks):",
    guidancePreLines: [
      "Before Hurricane Katrina, New Orleans Public Schools ranked as one of the lowest performing school districts in the country. The district faced significant financial problems and was on the verge of bankruptcy.",
      "There were 64,000 students displaced due to the hurricane, and 64 schools before the hurricane struck. Since then, 18 have been reopened.",
      "Approximately 24,000 students have already returned to the state and about 1,600 students are returning every month.",
      "Before the hurricane, the school district statistics were the following:",
      "  For every 10 students who enrolled in schools, fewer than 6 made it to graduation.",
      "  Of those graduating, only 2 enroll in college.",
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Improve New Orleans school system",
      children: [
        {
          label: "Number of schools needed in 2 months",
          children: [
            {
              label: "Number of students",
              children: [
                { label: "Students who did not leave during Katrina" },
                { label: "Current number of returned students" },
                {
                  label: "Additional students over the next 2 months",
                  children: [
                    { label: "Return rate of students to New Orleans" },
                    { label: "Increases in students from other states due to natural disasters nearby (TX, FL)" },
                  ],
                },
              ],
            },
            {
              label: "Capacity per school",
              children: [{ label: "Goal: Pre-Katrina level? (1000 students per school) Higher?" }],
            },
          ],
        },
        {
          label: "Improve quality of education",
          children: [
            {
              label: "Quality of teachers",
              children: [
                { label: "Incentives to teach in New Orleans (pay, non-financial benefits)" },
                { label: "Hiring criteria, national recruitment program" },
                { label: "Coaching & leadership development programs" },
                { label: "Curriculum development, learning standards (district, state, national)" },
              ],
            },
            {
              label: "School environment",
              children: [
                { label: "Leadership and administration" },
                { label: "Safety, building quality & welcoming atmosphere" },
              ],
            },
            { label: "Current socioeconomic needs of students: health & emotional supports" },
          ],
        },
      ],
    },
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "**Transition statement:** I would like to begin by analyzing the expected change in student population over the next two months. Then, assess the highest lever areas to improve the quality of education.",
        ],
      },
    ],
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "The candidate should build a **high-level framework** that addresses both questions: 1) number of schools to open and 2) how to improve the quality of education.",
      "If the candidate does not address the quality issue, ask a specific question (Q2) after solving for the math for schools needed.",
      "A good candidate will present a **hypothesis** and / or potential solutions while walking the interviewer through the framework.",
    ],
  },
  {
    n: "03",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "How many schools does the district need to reopen by the end of next month?",
    guidancePreLines: [
      "From their framework, the candidate should suggest that identifying the change in student population to determine the number of schools to open is the starting point for this case. The candidate and interviewer should go through the math below to answer question one.",
      "Note: The information required to answer this question is given on slide 1. If this was not already given to the candidate, it should be told to the candidate now.",
    ],
    answerText:
      "Calculations:\n- Formerly, 64 schools with 64,000 students, so ==1,000== students per school.\n- 18 schools have reopened already.\n  - 18 * 1,000 = ==18,000== students can currently be accommodated.\n- Number of students who have returned to New Orleans = 24,000.\n  - Shortfall in capacity: 24,000 – 18,000 = ==6,000== students.\n- Every month, 1,600 students return.\n  - By next month, there will be a shortfall of 6,000 + 2*1,600 (current month + next month) = ==9,200== students.\n- Thus, by end of next month, the school district should target to reopen ==10 new schools== with a capacity of 1,000 students each to accommodate 9,200 students.\n  - Beyond that, the school district would need to open ~==2 schools per month== to accommodate the 1,600 students returning every month.",
  },
  {
    n: "04",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText: "What can be done to improve the quality of education?",
    infoBoxLabel: "Interviewer guidance",
    infoSections: [
      {
        paragraphs: [
          "The below answers are just ideas. The objective of this exercise is to see if the candidate can break down a problem statement to analyze the different causes that might be creating the problem. This should be a **structured brainstorm**.",
        ],
      },
      {
        label: "Teachers & Curriculum",
        lines: [
          "Attract, develop and retain quality teachers.",
          "Provide incentive structures (teacher pay, non-financial incentives)",
          "Additional support in curriculum development; coaching and leadership development programs",
          "Engage students better by catering to subjects that are more pertinent to today’s world. For example, courses like computer education could give students an edge getting jobs in high-paying sectors. Also, offering education in practical areas like carpentry, masonry, nursing etc. could translate directly into local jobs.",
          "Benchmark best practices with other school districts and state and national standards.",
        ],
      },
      {
        label: "School Environment",
        lines: [
          "Attract, develop and retain quality principals and administrators.",
          "Improve the student teacher ratio to allow for more individual attention while ensuring adequate capacity in the schools.",
          "Experiment with new school models by setting up a charter system allowing involvement of private groups and corporations.",
          "Grant some amount of autonomy to the schools in exchange for increased accountability, encouraging sharper focus on student achievement. This could also provide an incentive for schools to find creative ways to decrease spending in administration and instead invest the money in instruction.",
        ],
      },
      {
        label: "Community",
        lines: [
          "Get the community involved, including parental involvement in school activities, which would be particularly helpful during the rebuilding period.",
          "Advertise changes currently being implemented to facilitate community understanding and buy-in.",
          "Get local and national non-profit and/or corporate involvement. This will allow for additional funding to achieve goals.",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Recommendation",
    title: "Recommendation",
    kind: "qa",
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        paragraphs: ["The school district should:"],
        lines: [
          "Immediately open ==10 more schools==, and ==2 more each month== going forward",
          "Utilize earlier brainstorming ideas to ensure improvement of school quality during re-openings",
        ],
      },
      {
        paragraphs: ["Supporting factors:"],
        lines: [
          "Schools are currently over capacity (>1,000 students on average)",
          "More incoming students every month (1,600)",
          "Need to increase teaching quality",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "Fewer incoming students than expected and negative press related to quality of school openings",
              "Lack of funding to carry out goals",
              "Further decline in quality due to hurried pace of school re-openings",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Develop marketing campaign (e.g. with local media) to show school opening and quality to attract students",
              "Use additional exposure as a venue to request more funding (ex. from endowments, foundations, charities and donors)",
              "Focus on attracting / retaining better teachers, using industry best practices when developing schools models and setting student-teacher ratios",
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Evaluation",
    guidanceLines: [
      "**A basic answer will demonstrate an understanding of:**",
      "  Numeric calculations required to achieve capacity requirements.",
      "  Importance of focusing on the quality of the schools instead of just the number being opened.",
      "    Specific ways to increase quality should be mentioned, such as developing more practical curriculum or focusing on attracting and retaining higher-quality teachers.",
      "**Excellent candidates will also:**",
      "  Demonstrate an understanding of the risks associated with these goals and suggest ways to mitigate them.",
      "    **For example:**",
      "    Media portrayal is a risk because they might focus on the negatives, especially if the schools cannot provide adequate capacity quickly enough for the returning student body. In that case, students may be dissuaded from returning, causing even more harm to the school district. Forging relationships with the media to cover advancements and achievements of the schools would be a way to mitigate the risk, and could even be turned into a plus by providing a venue to ask for additional funding.",
      "    For a community rebuilding itself, costs can be a constraint. However, it can be also viewed as an opportunity to get endowments to fund new plans, especially while public awareness and support for the disaster relief is high.",
    ],
  },
];
