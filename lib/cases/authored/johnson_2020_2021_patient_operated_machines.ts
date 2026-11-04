import type { CasePage } from "../content";

export const CASE_ID = "3e7b4f91-cc01-41f0-b8a0-2f1538cd5f88";

const PROMPT =
  "Our client is a medical company that makes machines to test blood samples in hospital labs. These are large, complex machines that cost thousands of dollars, and are operated by professional lab personnel. They also make consumables for these machines, essentially a full range of re-agents – chemicals needed to run the blood samples. Currently, our client markets and distributes its products in the US only. Growth and profitability in the hospital business has been slowing and our client has started to look for new growth opportunities. One area they have been exploring is the idea to market patient-operated machines at homes for people who suffer from conditions that need frequent testing (e.g. diabetes). Our client has asked us to help them decide whether to enter this new market with a patient-operated machine. This machine is a home glucose-monitoring device for people affected by diabetes. They cost under $200 and are typically bought and used by the patients themselves.";

export const CASE_META = {
  review: "auto",
  case_type: "Profitability/ Market Entry",
  synopsis:
    "A medical company that makes hospital blood-testing machines is considering a patient-operated home glucose-monitoring device. Size the market, test the growth forecast, find the breakeven volume and explore ways to save the launch.",
  full_prompt: PROMPT,
  tags: ["interviewer-led", "market-entry", "profitability", "healthcare", "market-sizing"],
};

const BLACK = "#111111";
const HC = (v: string, align: "left" | "center" | "right" = "center") => ({ v, align, fg: BLACK, borders: "tblr", borderColor: BLACK });
const DC = (v: string, w = 400) => ({ v, align: "center" as const, w, fg: BLACK, borders: "tblr", borderColor: BLACK });
const row = (name: string, vals: string[]) => ({ cells: [DC(name), ...vals.map((x) => DC(x))] });

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    infoBoxLabel: "Case Overview [Interviewer-led]",
    infoSections: [
      {
        paragraphs: [
          "After a good discussion through the structure, there are six questions that the interviewee should answer before making a recommendation to the client CEO.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Question 1",
    title: "Question 1",
    kind: "qa",
    qText: "**Question 1: What are important areas which you would need to investigate to help the client decide whether to launch the patient-operated device?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 1 could be similar to this:",
        paragraphs: [
          "Typical structure should include: understanding market size, growth, profitability, and competition; customer preferences for this new device (and the pros and cons of this device vs. traditional lab testing) and their price sensitivity; profitability analysis (revenue vs. cost); and how the client can market, promote, and distribute this device.",
        ],
      },
    ],
  },
  {
    n: "03",
    label: "Question 2",
    title: "Question 2",
    kind: "qa",
    qText:
      "**Question 2: The client has asked us to estimate what revenues they can expect from home testing machines only (disregarding revenues from consumable strips). Here is some information that the team used for a first estimate of potential revenues in the US:**\n\nUS population is 300m people, 20% of whom are over 65\nPrevalence of diabetes is 5% in those over 65 and 1% in those under 65\nEach year, 10% of the diabetic population buy a new kit",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 2 could be similar to this:",
        paragraphs: ["Answer:"],
        lines: [
          "20% x 300m = 60m people over 65",
          "80% x 300m = 240m people under 65",
          "60m x 5% = 3m diabetics over 65",
          "240m x 1% = 2.4m diabetics under 65",
          "3m + 2.4m = 5.4m total number of diabetics in US",
          "5.4m x 10% = ==540,000 machines could be sold per year==",
        ],
      },
    ],
  },
  {
    n: "04",
    label: "Question 3",
    title: "Question 3",
    kind: "qa",
    qText:
      "**Question 3: The average price of a machine currently is $180. In 2 years (the earliest date our client’s product could be on the market), the average price is expected to have declined by one-third, and by a further 25% in 4 years. The marketing department tells you they expect to capture 25% market share, and that the total market will grow by one-third over the entire 4 year period. If this is correct, what revenue per year can our client expect from devices sold in the US in 4 years time?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 3 could be similar to this:",
        paragraphs: ["Answer:"],
        lines: [
          "$180 x 2/3 = $120 average price in 2 years",
          "$120 x 75% = $90 average price in 4 years",
          "Market growing by one-third in 4 years: expect 540,000 x 4/3 = 720,000 kits sold in 4 years",
          "Expect 25% of this = 25% x 720,000 = 180,000 kits sold in 4 years",
          "Expected revenues in 4 years p.a.: 180,000 x $90 = ==$16.2m==",
        ],
      },
    ],
  },
  {
    n: "05",
    label: "Question 4",
    title: "Question 4",
    kind: "qa",
    qText:
      "**Question 4: The team also started to investigate the competitive situation for home testing kits in the US. Here is what our researchers found out:**\n\n**What does this data tell you? Remember, our client told us that they estimate that the market will grow by 1/3 in the next 4 years.**",
    dataTableTitle: "US Sales Volumes in Home-Diabetes Testing Machines",
    dataTableSerif: true,
    dataTableTitleBig: true,
    dataTableCols: "1fr 1fr 1fr 1fr 1fr 1fr",
    dataTableHeaders: [HC("Machine", "left"), HC("4 yrs ago"), HC("3 yrs ago"), HC("2 yrs ago"), HC("1 yr ago"), HC("This year")],
    dataTableRows: [
      row("A", ["45,000", "90,000", "130,000", "150,000", "155,000"]),
      row("B", ["50,000", "95,000", "125,000", "150,000", "150,000"]),
      row("C", ["25,000", "35,000", "60,000", "75,000", "80,000"]),
      row("D", ["50,000", "55,000", "60,000", "65,000", "65,000"]),
      row("Others", ["75,000", "80,000", "90,000", "90,000", "90,000"]),
      row("Total", ["245,000", "355,000", "465,000", "530,000", "540,000"]),
    ],
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 4 could be similar to this:",
        steps: [
          { n: "1", text: "A and B are market leaders by volume." },
          { n: "2", text: "Volumes of all current top players (except C) grew strongly until 2 years ago." },
          { n: "3", text: "Volume growth of all current top players has slowed in the last 2 years." },
          { n: "4", text: "To expect total market growth of one-third over the next 4 years may well be over-optimistic." },
          { n: "5", text: "Based on estimation of 540,000 boxes sold, market is highly concentrated across these 4 players (total sales 450,000 this year)." },
          { n: "6", text: "Growth has slowed down in the last 2 years, indicating that the market is saturated. Overall volume sold in this year fits well with our estimate of 540,000 kits per year." },
          { n: "7", text: "Our client’s market growth estimates seem unrealistically high." },
          { n: "8", text: "Our client would have to capture market share mainly from competitors if it entered the market, as the market will grow only slowly. Only with a significantly value added proposition to patients can our client be able to achieve that." },
        ],
      },
    ],
  },
  {
    n: "06",
    label: "Question 5",
    title: "Question 5",
    kind: "qa",
    qText:
      "**Question 5: The team also wanted to gain an understanding of the cost of launching the home-based device. Interviews with the R&D, manufacturing and marketing departments determine that the actual maximum price per unit in 2 years is $120, and that the model will have a viable life of 5 years. The up-front fixed costs to develop the product (R&D, manufacturing, sales and marketing) are $60m, and variable costs (labor, components) will be $40 per machine. How many kits must our client sell over 5 years to cover the up-front fixed costs?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 5 could be similar to this:",
        paragraphs: ["Answer:"],
        lines: [
          "Breakeven quantity = Fixed cost / (Price – Production Cost)",
          "Breakeven quantity = $60m / ($120 - $40) = ==750,000==",
          "This means that to breakeven, the client would need to sell ==150,000 units per year==.",
          "This means that even if the US market grows from 540,000 this year to 600,000 in 2 years, we would need a 25% market share to breakeven, which would be very difficult and highly improbable.",
        ],
      },
    ],
  },
  {
    n: "07",
    label: "Question 6",
    title: "Question 6",
    kind: "qa",
    qText:
      "**Question 6: It appears that it will be difficult for our client to achieve the required volume to be profitable within the required time window. However, the situation in their hospital business is worsening, and analysts report that patient testing is “the future”. What options should be explored that might save our client’s new home-testing device from being shelved?**",
    infoBoxLabel: "Approach / Analysis",
    infoSections: [
      {
        label: "A typical answer for question 6 could be similar to this:",
        steps: [
          { n: "1", text: "Find ways to reduce production costs (not discussed in case so far);" },
          { n: "2", text: "Find ways to reduce marketing and sales costs;" },
          { n: "3", text: "Broaden geographic focus beyond US;" },
          { n: "4", text: "Optimize pricing – consider effect on overall economics of raising unit price (leading to fall in volume) or price cut (leading to higher volumes, but potential competitor retaliation);" },
          { n: "5", text: "Market different products (with different attributes) to different diabetic patient segments; or" },
          { n: "6", text: "Find a partner – leverage our client’s brand in hospital testing by partnering with existing small player." },
        ],
      },
    ],
  },
];
