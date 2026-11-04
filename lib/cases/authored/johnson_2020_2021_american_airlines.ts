import type { CasePage } from "../content";

export const CASE_ID = "216a9b8b-625b-4928-ba9c-15a56a6b9ce0";

const PROMPT =
  "Your client is American Airlines. As you may know, competition is fierce among the major airlines, with prices being driven steadily downward. After a year of weaker than average growth, they have hired our firm to devise a set of strategies for growth.";

export const CASE_META = {
  review: "auto",
  case_type: "Growth",
  synopsis:
    "An airline facing fierce price competition and weak growth wants a set of strategies for profitable revenue growth. Generate a wide range of price and volume ideas and use four exhibits to find the revenue-maximising price.",
  full_prompt: PROMPT,
  tags: ["interviewee-led", "growth", "airline", "light-math", "exhibit-heavy"],
};

const BLU = "#4f81bd";
const RED = "#c0504d";

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Candidate prompt",
    title: "Case Prompt",
    kind: "ready",
    body: PROMPT,
    guidancePreLines: [
      "**Objective (if asked to clarify):** Assume management's goal is profitable revenue growth, rather than cost cutting.",
      "**Case Information – only give if requested:**",
      "  Pricing handled by computer system – currently based on class of seat (first, business, economy class) and time to flight – all inclusive in ticket price",
      "  Market highly fragmented overall as there are over ten competitors in the market, each of which holds a relatively small share (no dominant player)",
      "  However, many routes are only served by 1 – 2 companies",
      "  There are two major segments in the air transportation market: vacationers and business travelers.",
      "  Business travelers make up a slight majority of business class seats and a vast majority of first class seats. Essentially all economy class seats are taken by vacationers.",
      "  For Exhibit 4, assume the variable cost with filling a seat is negligible",
    ],
    infoBoxLabel: "Case Overview [Interviewee-led]",
    infoSections: [
      {
        paragraphs: [
          "This is a qualitative version of a growth strategy case. There is only one calculation in the case and fairly limited quantitative data. The goal for the candidate should be to generate a wide range of suggestions rather than look to dig very deeply into one particular suggestion. Only give Exhibit 4 if the candidate notes that for routes served by few competitors, the company could raise prices. In addition, encourage them to make assumptions where necessary. However, they should look to gain insights from the qualitative data presented in the Exhibits, but these are not exhaustive of all possible solutions.",
        ],
      },
      {
        label: "Case Information",
        paragraphs: [
          "Any solution should look at all possible areas of revenue growth: price and volume. Within price, they should likely rule out pure price increases due to the competitiveness of the market. However, one potential solution would be unbundling the ticket price (IE baggage check-in, snacks, etc. are extra, rather than part of the ticket price). In addition, they should note that vacationers are much more price sensitive, thus these strategies will be more effective in economy class and potentially business class.",
          "For volume, they should examine ways to increase the number of customers, both by taking customers away from competitors and inducing new customers to enter the market. Also, they should look at ways to increase the number of flights per customer. One suggestion would be a loyalty program as this would increase the number of flights per customer and make them less likely to defect to a competitor.",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Exhibit 1",
    title: "Exhibit 1",
    kind: "qa",
    axisBarSerif: true,
    axisBarTitle: 'Percentage of Respondants Rating Factor\n"Very Important" When Choosing Airline',
    axisBarSeries: [
      { name: "Business", color: BLU },
      { name: "Vacation", color: RED },
    ],
    axisBarGroups: [
      { label: "Price", values: [20, 90] },
      { label: "Time of\nDeparture", values: [30, 65] },
      { label: "Quality and\nComfort", values: [65, 20] },
      { label: "Attentive\nService", values: [85, 15] },
      { label: "Variety of\nDestinations", values: [20, 10] },
    ],
    axisBarYMax: 100,
    axisBarYStep: 10,
    axisBarYTickSuffix: "%",
    axisBarNoGrid: true,
    guidanceLabel: "Case Information",
    guidanceLines: [
      "From Exhibit 1, the candidate should notice that quality of service is highly important to business travelers and thus this could provide a competitive advantage.",
    ],
  },
  {
    n: "03",
    label: "Exhibit 2",
    title: "Exhibit 2",
    kind: "qa",
    extraCharts: [
      {
        kind: "combo",
        title: "Average Percentage of Seats Sold By\nMonth",
        titleBold: true,
        titleSerif: true,
        titleAlign: "center",
        titleSize: 24,
        serif: true,
        categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        lines: [{ name: "Seats sold", color: "#632523", width: 4, values: [85, 81, 95, 74, 62, 50, 43, 57, 66, 70, 85, 99] }],
        yMin: 0,
        yMax: 100,
        yStep: 20,
        yTickSuffix: "%",
        xLabelRotate: 45,
        legend: "none",
      },
    ],
    guidanceLabel: "Case Information",
    guidanceLines: [
      "From Exhibit 2, the candidate should notice that the airplanes are almost fully booked during the winter season (typical vacationing season) and relatively empty during the summer. Thus a strong suggestion would also include some way to boost summer sales.",
    ],
  },
  {
    n: "04",
    label: "Exhibit 3",
    title: "Exhibit 3",
    kind: "qa",
    extraCharts: [
      {
        kind: "multiPie",
        title: "Price Sensitivity Survey – Percentage of Respondents Agreeing With Following Statements:",
        columns: 2,
        sliceNames: true,
        noRowDivider: true,
        sliceLabelColor: "#111111",
        radius: 84,
        pies: [
          {
            title: "\"I would take a worse departure time if it was cheaper\"",
            slices: [
              { label: "Yes", value: 60, color: BLU },
              { label: "No", value: 40, color: RED },
            ],
          },
          {
            title: "\"I would reduce my amount of baggage if that reduced the price\"",
            slices: [
              { label: "Yes", value: 80, color: BLU },
              { label: "No", value: 20, color: RED },
            ],
          },
          {
            title: "\"I would take a layover overnight to save money\"",
            slices: [
              { label: "Yes", value: 15, color: BLU },
              { label: "No", value: 85, color: RED },
            ],
          },
          {
            title: "\"I use discounting services such as comparison websites when choosing my flight\"",
            slices: [
              { label: "Yes", value: 55, color: BLU },
              { label: "No", value: 45, color: RED },
            ],
          },
        ],
      },
    ],
    guidanceLabel: "Case Information",
    guidanceLines: [
      "Finally, from Exhibit 3, they should notice that unbundling the baggage cost from the ticket price is likely to increase sales (as stated earlier) and that improving the company's listing on comparison websites will make them more likely to reach the proportion of consumers who use these sites.",
    ],
  },
  {
    n: "05",
    label: "Exhibit 4",
    title: "Exhibit 4",
    kind: "qa",
    extraCharts: [
      {
        kind: "combo",
        title: "Price Elasticity - JFK to IAH",
        titleBold: true,
        titleSerif: true,
        titleAlign: "center",
        titleSize: 26,
        serif: true,
        categories: ["50%", "60%", "70%", "80%", "90%", "100%"],
        xPlacement: "on",
        lines: [{ name: "Price/Seat", color: "#4f81bd", width: 4, marker: "diamond", markerColor: "#c00000", markerSize: 9, values: [900, 800, 700, 600, 500, 400] }],
        yMin: 400,
        yMax: 900,
        yStep: 100,
        yLabel: "Price Per Seat",
        xTitle: "Seats Filled",
        axisTitleBold: true,
        legend: "bottom",
        footnote: "*Assume the capacity of American Airlines' domestic flights is 200 seats",
        footnoteBold: true,
      },
    ],
    calcNote: "From Exhibit 4, since variable costs are negligible, the candidate should look to maximize revenue. First, they should find the number of seats occupied and then multiply by price per seat to find :",
    calcTable: {
      headers: ["Occupancy Rate %", "Actual Seats Occupied", "Price Per Seat", "Revenue"],
      rows: [
        ["100%", "200", "400", "$80,000"],
        ["90%", "180", "500", "$90,000"],
        ["80%", "160", "600", "$96,000"],
        ["70%", "140", "700", "==$98,000=="],
        ["60%", "120", "800", "$96,000"],
        ["50%", "100", "900", "$90,000"],
      ],
    },
    answerText:
      "- Thus revenue is maximized at a price of ==$700== and an occupancy rate of ==70%==. If the candidate has seen Exhibit 2, a very strong point to raise is that occupancy is not constant over the course of the year. However, 70% appears close to the average over the year, so they could argue that this result makes sense as an average figure. These suggestions are not exhaustive of possible suggestions, any ideas that make sense in the highly competitive and price-sensitive air travel market are acceptable.",
  },
  {
    n: "06",
    label: "Approach / Analysis",
    title: "Conclusion",
    kind: "qa",
    guidanceLabel: "Conclusion",
    guidanceLines: [
      "1. First, the company could look to lower its listed price by making some of the additional services into an extra charge, thus capturing the price-sensitive vacation market.",
      "2. Next, they should boost the quality of their service for the first-class seats, which will provide sustainable differentiation over the competitors.",
      "3. Finally, we should look into loyalty programs to boost overall sales and discounts or package deals with resorts during the summer months to boost sales in the typically under-booked summer.",
    ],
  },
];
