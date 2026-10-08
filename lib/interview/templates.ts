// Reusable one-click comments for the notes box. Defaults ship with the app; each
// interviewer can add their own (kept on this device in localStorage).

export type TemplateCategory =
  | "clarifying"
  | "structure"
  | "exhibit"
  | "math"
  | "brainstorm"
  | "recommendation"
  | "communication";

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  clarifying: "Clarifying questions",
  structure: "Structure",
  exhibit: "Exhibit review",
  math: "Math",
  brainstorm: "Brainstorming",
  recommendation: "Recommendation",
  communication: "Communication",
};

export interface FeedbackTemplate {
  id: string;
  category: TemplateCategory;
  tone: "+" | "-";
  text: string;
  custom?: boolean;
}

const d = (category: TemplateCategory, tone: "+" | "-", text: string, n: number): FeedbackTemplate => ({
  id: `${category}-${n}`,
  category,
  tone,
  text,
});

export const DEFAULT_TEMPLATES: FeedbackTemplate[] = [
  d("clarifying", "+", "Asked sharp clarifying questions that narrowed the problem", 1),
  d("clarifying", "+", "Confirmed the objective and success metric before diving in", 2),
  d("clarifying", "-", "Jumped into a framework without clarifying the objective", 3),
  d("clarifying", "-", "Clarifying questions were generic — tie them to the case", 4),

  d("structure", "+", "Clear, MECE structure with prioritized buckets", 1),
  d("structure", "+", "Tailored the framework to this case rather than reciting a template", 2),
  d("structure", "+", "Stated a hypothesis up front and structured around testing it", 3),
  d("structure", "-", "Structure was not MECE — buckets overlap", 4),
  d("structure", "-", "Used a generic framework; customize it to the specific question", 5),
  d("structure", "-", "Took too long to set up the structure — aim for ~2 minutes", 6),
  d("structure", "-", "Did not signpost or walk through the structure before starting", 7),

  d("exhibit", "+", "Read the exhibit title, axes and units before interpreting", 1),
  d("exhibit", "+", "Led with the so-what, then backed it up with data", 2),
  d("exhibit", "+", "Spotted the key trend and connected it to the case question", 3),
  d("exhibit", "-", "Described the numbers without saying what they mean", 4),
  d("exhibit", "-", "Missed the key insight on the exhibit", 5),
  d("exhibit", "-", "Didn't take a moment to orient on the exhibit before speaking", 6),

  d("math", "+", "Structured the calculation out loud and kept it organized", 1),
  d("math", "+", "Sense-checked the result against a benchmark", 2),
  d("math", "+", "Rounded smartly to keep the math fast and accurate", 3),
  d("math", "-", "Arithmetic slip — slow down and double-check units", 4),
  d("math", "-", "Dove into the math without laying out the approach first", 5),
  d("math", "-", "Did not interpret the answer after calculating it", 6),

  d("brainstorm", "+", "Generated a wide range of ideas in clear buckets", 1),
  d("brainstorm", "+", "Prioritized the best ideas and explained why", 2),
  d("brainstorm", "-", "Ideas came out as an unstructured list — group them first", 3),
  d("brainstorm", "-", "Stopped at the obvious ideas; push for more creative angles", 4),

  d("recommendation", "+", "Gave a clear answer first, then reasons, risks and next steps", 1),
  d("recommendation", "+", "Recommendation tied back to the original objective", 2),
  d("recommendation", "-", "Recommendation was hedged — commit to a clear answer", 3),
  d("recommendation", "-", "Left out risks and next steps", 4),

  d("communication", "+", "Confident, concise and easy to follow", 1),
  d("communication", "+", "Good pace and signposting throughout", 2),
  d("communication", "-", "Talked through thoughts without a clear point — lead with the answer", 3),
  d("communication", "-", "Rushed — pause and think before answering", 4),
];

/** Best-guess category for a case section, from its label/title. */
export function categoryForSection(label: string, title: string): TemplateCategory {
  const t = `${label} ${title}`.toLowerCase();
  if (/brainstorm/.test(t)) return "brainstorm";
  if (/recommend|conclusion|wrap-?up|approach/.test(t)) return "recommendation";
  if (/exhibit|chart|survey|elasticity|occupancy/.test(t)) return "exhibit";
  if (/framework|structure/.test(t)) return "structure";
  if (/revenue|profit|roi|sizing|calculat|math|economics|prize|return/.test(t)) return "math";
  if (/clarif/.test(t)) return "clarifying";
  if (/prompt|overview/.test(t)) return "structure";
  return "communication";
}

const STORAGE_KEY = "casepass.feedbackTemplates.v1";

export function loadCustomTemplates(): FeedbackTemplate[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.text === "string" && t.category in CATEGORY_LABELS)
      .map((t) => ({ id: String(t.id), category: t.category, tone: t.tone === "-" ? "-" : "+", text: t.text, custom: true }));
  } catch {
    return [];
  }
}

export function saveCustomTemplates(list: FeedbackTemplate[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.map(({ id, category, tone, text }) => ({ id, category, tone, text }))));
  } catch {
    // storage unavailable (private mode) — templates just won't persist
  }
}
