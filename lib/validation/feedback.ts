import { z } from "zod";

export const SKILL_FIELDS = [
  { key: "clarifying_questions", label: "Clarifying questions" },
  { key: "structure", label: "Structure" },
  { key: "math", label: "Math" },
  { key: "exhibit_interpretation", label: "Exhibit interpretation" },
  { key: "business_judgment", label: "Business judgment" },
  { key: "communication", label: "Communication" },
  { key: "recommendation", label: "Recommendation" },
] as const;

export const RATING_SCALE = ["1", "2", "3", "4", "5"] as const;

// The per-section notes + timings the interviewer reviews on the feedback form.
// Parsed from a hidden JSON field and bounded, since it comes from the client.
export const sectionFeedbackSchema = z.object({
  sections: z
    .array(
      z.object({
        key: z.string().max(16),
        label: z.string().max(120),
        title: z.string().max(200),
        seconds: z.number().int().min(0).max(24 * 3600),
        notes: z.string().max(8000),
      }),
    )
    .max(40),
  general: z.string().max(8000),
});
