import { z } from "zod";

// Loosely UUID-shaped rather than z.uuid()'s strict RFC4122 check -- our seed data
// uses friendly, human-readable ids like 00000000-0000-0000-0000-000000000001, which
// don't have a valid version nibble and would otherwise fail strict validation.
const uuidLike = (msg?: string) => z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, msg);

export const scheduleSessionSchema = z
  .object({
    myRole: z.enum(["interviewer", "interviewee"]),
    partnerId: uuidLike("Pick a partner"),
    format: z.enum(["45_full", "30_short", "60_case_feedback"]),
    date: z.string().min(1, "Pick a date"),
    time: z.string().min(1, "Pick a time"),
    notes: z.string().optional(),
    meetingKind: z.enum(["builtin", "custom"]).default("builtin"),
    meetingLink: z.string().trim().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.meetingKind === "custom") {
      if (!val.meetingLink || !/^https:\/\/.+\..+/.test(val.meetingLink)) {
        ctx.addIssue({
          code: "custom",
          path: ["meetingLink"],
          message: "Paste a valid https:// meeting link (Zoom, Meet, Teams…)",
        });
      }
    }
  });

export const assignCaseSchema = z.object({
  sessionId: uuidLike(),
  caseId: uuidLike(),
  synopsis: z.string().min(1, "Write a short synopsis to share"),
});
