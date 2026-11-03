import type { CasePage } from "../content";

export const CASE_ID = "c150bb04-ff43-44e7-be2a-6a5370c0d5b1";

const PROMPT =
  "Our client is the superintendent of a system of schools in Quahog, Rhode Island. He is concerned because the performance of students from these schools in standardized tests has been repeatedly subpar. He has asked us to help him figure out what to do about it.";

export const CASE_META = {
  review: "auto",
  case_type: "Non-traditional Problem",
  synopsis:
    "A school superintendent wants to know what to do about repeatedly subpar standardized test results. Structure the problem, brainstorm ways to close a textbook shortage and size the impact of two initiatives.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "non-profit", "brainstorming", "light-math"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    note: "**Fit Questions** — 1. Tell me about a time you worked on a project with a team and had to convince your team member(s) to go along with your idea. 2. Tell me about a time you disagreed with one of your work colleagues and how you handled the situation.",
    guidancePreLabel: "Additional clarifying information (provide only if asked)",
    guidancePreLines: [
      "Q: What is a “system of schools”? A: **For example, Chicago Public Schools**",
      "Q: What are standardized tests? A: **Exams that occur at a certain point of the school year for a particular grade level and that are developed and organized by a school district, state, or other large education agency (ex. end of course exams, SAT).**",
      "Q: What is subpar performance? A: **On average, a student from Quahog Schools performs below exam mean as compared to national student scores on the same assessment.**",
    ],
    infoBoxLabel: "Interviewer Guidance",
    infoSections: [
      {
        paragraphs: [
          "This case is a **non-profit case**, which pushes candidates to think outside of the box. It is meant to assess their creativity and ability to adapt their thinking to new problems or contexts. The case calls for a lot of **brainstorming** from the candidate, but is ultimately driven by the interviewer asking a series of questions to get to the final recommendation.",
        ],
      },
      {
        label: "Case Development",
        steps: [
          { n: "1", text: "Framework & Exhibit 1" },
          { n: "2", text: "Specific Issue Brainstorming" },
          { n: "3", text: "Quantitative Problem-solving" },
          { n: "4", text: "Final Recommendation" },
        ],
      },
    ],
    nextStepText: "**Show Exhibit 1.** Candidate should then develop their framework.",
  },
  {
    // Exhibit 1 is a bell-curve exhibit measured from page 268: both curves have sd = 60 px = 1 unit (half-width at 60.7% of the
    // peak, measured on the 1288 px render, +/-2 px), means 4.86 units (291 px) apart; tails are cut where the picture ends them.
    n: "02",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    extraCharts: [
      {
        kind: "bellCurve",
        title: "Quahog Student Performance Relative to National Performance",
        titleStyle: "centered-underlined",
        curves: [
          { name: "Quahog Students’ Performance", mean: 0, sd: 1, color: "#000000", from: -2.88, to: 2.83 },
          { name: "National Performance", mean: 4.86, sd: 1, color: "#000000", from: 1.98, to: 7.57 },
        ],
        xMin: -3.2667,
        xMax: 8.0667,
        axisFrom: -3.233,
        axisTo: 7.9,
        axisEndLabel: "x",
        markers: [
          { at: 0, label: "μ_1", dashed: true },
          { at: 4.86, label: "μ_2", dashed: true },
        ],
        curveLabels: [
          { text: "σ_1", x: 1.4, y: 0.552 },
          { text: "σ_2", x: 6.317, y: 0.552 },
        ],
        callouts: [
          {
            text: "Quahog Students’\nPerformance",
            x: 0.0116,
            y: 0.027,
            w: 0.2267,
            h: 0.3208,
            pointer: [
              [0.2581, 0.0896],
              [0.2756, 0.0896],
              [0.3081, 0.35],
            ],
          },
          {
            text: "National\nPerformance",
            x: 0.757,
            y: 0.027,
            w: 0.2256,
            h: 0.3208,
            pointer: [
              [0.7384, 0.0896],
              [0.7209, 0.0896],
              [0.6535, 0.3896],
            ],
          },
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Framework",
    title: "Framework",
    kind: "qa",
    guidancePreLabel: "Provide when asked",
    guidancePreIntro:
      "Allow the candidate to discuss their framework. Then, provide the following information **when asked**:",
    guidancePreLines: [
      "In response to the candidate’s questions about teachers or the teaching environment, inform them that it is **on par with other schools**.",
      "If the candidate asks about student demographics, inform them that students are from **low to middle household income categories**.",
      "If the candidate has not brought out the issue of ‘books’, inform them that the schools **provide books** to the students.",
    ],
    infoBoxLabel: "Framework",
    infoSections: [
      {
        paragraphs: [
          "A good framework would consider three or four dimensions, such as those listed on the left.",
          "**Transition Statement:** Since the school district is looking to improve standardized test scores, I would like to first determine whether all teachers and students have the necessary resources. It would be great if we had information on current resource distribution by school or grade level.",
        ],
      },
    ],
    treeTitle: "Framework",
    treeRoot: {
      label: "Framework",
      children: [
        {
          label: "Students",
          children: [
            { label: "Attendance rates (e.g., unsafe neighborhoods → low attendance or support → poor results)" },
            {
              label:
                "Demographics (e.g., students from low socioeconomic background → work or take care of family after school → low attention to studies; race / ethnicity; high need populations such as Special Education or English Language Learners)",
            },
          ],
        },
        {
          label: "Teachers",
          children: [
            { label: "Recruitment standards (i.e., do we hire untrained teachers?)" },
            { label: "Training programs (i.e., do we keep our teachers current in pedagogical skills?)" },
            { label: "Retention rates, especially of high quality teachers" },
          ],
        },
        {
          label: "Resources",
          children: [
            { label: "Syllabus or curriculum (i.e., are we teaching appropriate material at the right level of rigor?)" },
            {
              label:
                "Access to facilities / resources (e.g. library, technology, science laboratories, art, music, gym, school nurse)",
            },
            { label: "Book, teaching material, and supplemental supply availability" },
          ],
        },
        {
          label: "Teaching and learning environment",
          children: [
            { label: "School safety" },
            { label: "Administrative support" },
            { label: "Aesthetically supportive learning environment (clean, welcoming, windows, air conditioning)" },
          ],
        },
      ],
    },
    guidanceLabel: "Interviewer Guidance",
    guidanceLines: [
      "After the discussion, guide the candidate toward ‘books’ as a major issue. Tell the candidate:",
      "  Early findings suggest the shortage of books has been a major factor affecting student performance at Quahog. How do you think we can address this?",
      "**Encourage** the candidate to brainstorm and think from multiple perspectives. This is a classic “what else?” situation where you should **probe** for more and more ideas. A good candidate will bucket his/her thinking into three or so groups. See the following page for a potential answer.",
    ],
  },
  {
    n: "04",
    label: "Brainstorm Response",
    title: "Brainstorm Response",
    kind: "qa",
    infoBoxLabel: "Brainstorm Response",
    infoSections: [
      {
        lines: [
          "Raise money to buy books",
          "  Fundraising (grants / donations)",
          "  Price discrimination to students (students who can pay, buy books through school)",
          "Arrange for new books without additional money",
          "  Gifts (in-kind donations)",
          "  Borrow from other school systems",
          "  Partner with Amazon / retailers for used books as a philanthropy measure on their part",
          "Manage with current number of books in system",
          "  Coordinated book sharing system",
          "  Scan / copy books",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Follow-Up Question",
    title: "Follow-Up Question",
    kind: "qa",
    qText:
      "After the brainstorm discussion, state and ask the following:\n\nAn immediate area of concern is Grade 6 math and science books. We’ve identified a shortage of 8,000 such books. Sixty percent of these books are math books and the rest are science books. The math books are available on Amazon, but the science ones are not. By partnering with Amazon, we can reduce the shortage of math books by 70%. Independently, by coordinated book sharing, we can reduce the shortage of science books by 20%.\n\nWhat is the total impact of these plans?",
    calcNote: "This is how the candidate could solve the follow-up question:",
    calcTable: {
      title: "Shortage:",
      headers: [],
      rows: [
        ["Total shortage", "8,000 books"],
        ["Math shortage", "60% * 8,000 = 4,800"],
        ["Science shortage", "40%*8,000 = 3,200"],
      ],
    },
    calcTables: [
      {
        title: "Benefit:",
        headers: [],
        rows: [
          ["Amazon partnership", "70%*4,800 = 3,360"],
          ["Coordinated sharing", "20%*3,200 = 640"],
          ["Total benefit", "==4,000 books=="],
        ],
        totalLast: true,
      },
    ],
    guidanceLabel: "Note: a strong candidate will do the following",
    guidanceLines: [
      "Spot the pattern in percentages:",
      "  Total benefit = 70%*60% + 20%*40% = 42% + 8% = ==50%== = ==4,000 books==",
      "Focus on the “so what?” of the 50% benefit by discussing why this is important to the overall case question.",
    ],
  },
  {
    n: "06",
    label: "Final Question",
    title: "Final Question",
    kind: "qa",
    qText:
      "After the candidate has finished presenting their calculations, ask this final question:\n\nYou meet the superintendent in the hallway and they ask you what you have found so far. What will your response be?",
    guidancePreLabel: "Note",
    guidancePreLines: [
      "Strong candidates will spot that this is the ‘**recommendation**’ question, and will be comfortable verbalizing their recommendation in a structured way.",
    ],
    infoBoxLabel: "Recommendation",
    infoSections: [
      {
        label: "Recommendation",
        paragraphs: [
          "Preliminary analysis has shown that shortage of books is the leading indicator of subpar student performance in Quahog Schools.",
        ],
        lines: [
          "We have identified several ways to reduce effective shortage, in three categories: fundraising, arranging books without additional cash, and managing with same number of books.",
          "Our estimates indicate that we can reduce the grade 6 book shortage by ==50%== with two of these initiatives: partnership with Amazon and a coordinated book sharing arrangement.",
        ],
      },
      {
        label: "Risks and Next Steps",
        groups: [
          {
            heading: "Risks",
            items: [
              "The other 50% (remaining shortage of 4000 books) will not be easily addressed",
              "Student performance may not rise sufficiently by reducing book shortage",
              "There may be other causes of poor performance which are impactful and need to be explored",
            ],
          },
          {
            heading: "Next Steps",
            items: [
              "Create plan to reduce remaining book shortage",
              "Quantitatively estimate impact of reduced book shortage on student performance",
              "Explore other drivers of subpar student performance (teacher training and retention, curriculum rigor, school learning environment, etc.)",
            ],
          },
        ],
      },
    ],
  },
];
