import type { CasePage } from "../content";

export const CASE_ID = "816d9ec7-eeb2-468b-8d93-fef3f3cf91ab";

export const CASE_META = {
  review: "auto",
  case_type: "Brainteaser",
  synopsis:
    "A quick logic problem about a rope tied around the Moon's equator. The candidate must pick a starting formula and make simplifying assumptions to estimate a height.",
  full_prompt:
    "A rope is tied around the equator of the Moon drawing a circle centered at the center of the Moon. If you add 200 meters to the length of the rope, you get another circle, still centered at the center of the Moon but with an expanded radius. How high above the ground would the new rope sit?",
  tags: ["brainteaser", "light-math", "interviewer-led", "easy"],
};

export const PAGES: CasePage[] = [
  {
    n: "01",
    label: "Presentation",
    title: "Presentation",
    kind: "ready",
    body: "A rope is tied around the equator of the Moon drawing a circle centered at the center of the Moon. If you add 200 meters to the length of the rope, you get another circle, still centered at the center of the Moon but with an expanded radius. How high above the ground would the new rope sit?",
    infoBoxLabel: "Type of Case and Expectations",
    infoSections: [
      {
        lines: [
          "Logic problem, often used as ice breaker on the moon or on the earth...",
          "Find a relevant starting point (here the formula for the perimeter of a circle), and make simplifying assumptions (pi = 3, moon is spherical, etc)",
        ],
      },
    ],
  },
  {
    n: "02",
    label: "Suggested Framework",
    title: "Suggested Framework",
    kind: "qa",
    guidancePreLabel: "Data",
    guidancePreIntro: "Perimeter of a circle (to give only if interviewee is lost):",
    guidancePreLines: ["2*pi*r with r the radius of the circle"],
    infoBoxLabel: "Suggested Framework",
    infoSections: [
      {
        lines: ["Assume the moon is perfectly spherical", "Circumference = 2*pi*r"],
      },
    ],
    guidanceLabel: "Recommended Strategy for Interviewee (Q: Question, M: Math, C: Creativity)",
    guidanceLines: [
      "M: Length of the equator = circumference = 2*pi*r, r = radius of the moon",
      "C: Approximate pi to be equal to 3",
      "M: If we increase the length by 200 meters, the new length will be C=2*pi*r+200",
      "M: C = 2*pi*R, R is the new radius, R-r is the height above the ground where the rope sits",
      "M: Solve 2*pi*R = 2*pi*r+200 for R => R = r+200/(2*pi)",
      "M: R-r is what we are looking for => R-r = 200/(2*pi)=100/pi",
      "**Reasoning:**",
      "  Start with a circle of radius r. By adding 200 meters to the length of the rope, we get a new circle (with the same center) but with a new radius R. The difference R-r gives the height above the equator where the extended rope will sit.",
    ],
  },
  {
    n: "03",
    label: "Proposed Conclusion",
    title: "Proposed Conclusion",
    kind: "qa",
    guidanceLabel: "Proposed Conclusion",
    guidanceLines: [
      "It is not necessary to know the initial radius of the moon to solve this problem.",
      "By using the formula for the radius of a circle and the amount of rope added to what we had initially, we are able to compute R-r, i.e. the height above the ground where the extended rope sits.",
      "The height above the ground is R-r = ==100/pi ~ 100/3 ~ 35 meters==.",
    ],
  },
];
