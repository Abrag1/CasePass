import { describe, expect, it } from "vitest";
import { CASE_CONTENT, livePages, pageHasExhibit, pageIsPresentable, redactPagesForCandidate } from "@/lib/cases/content";
import { safeNext } from "@/lib/validation/auth";
import { sectionFeedbackSchema } from "@/lib/validation/feedback";
import { categoryForSection } from "@/lib/interview/templates";

describe("what the interviewee's browser receives", () => {
  const forbidden = [
    "qText", "guidancePreLines", "guidanceLines", "calcLines", "answerText", "insightText",
    "answerBonusLines", "infoSections", "note", "cheatRows", "nextStepText",
  ];
  it("never contains interviewer-only fields, for every case", () => {
    for (const pages of Object.values(CASE_CONTENT)) {
      for (const p of redactPagesForCandidate(pages)) {
        for (const f of forbidden) expect((p as unknown as Record<string, unknown>)[f], `${p.n}.${f}`).toBeUndefined();
      }
    }
  });
  it("keeps page indexes aligned with the interviewer's list (Share relies on this)", () => {
    for (const pages of Object.values(CASE_CONTENT)) {
      const mine = livePages(pages).map((p) => p.n);
      const theirs = redactPagesForCandidate(pages).map((p) => p.n);
      expect(theirs).toEqual(mine);
    }
  });
});

describe("Present / Share eligibility", () => {
  it("every exhibit page in every authored case can be presented and shared", () => {
    for (const pages of Object.values(CASE_CONTENT)) {
      for (const p of livePages(pages)) {
        if (pageHasExhibit(p) && p.shareable !== false) expect(pageIsPresentable(p), p.n).toBe(true);
      }
    }
  });
  it("the interviewer-only quick-reference table is never shareable", () => {
    const all = Object.values(CASE_CONTENT).flat();
    const quick = all.find((p) => p.dataTableTitle?.startsWith("Quick reference"));
    expect(quick).toBeDefined();
    expect(pageIsPresentable(quick!)).toBe(false);
  });
});

describe("login redirect safety", () => {
  it("allows normal in-app paths", () => {
    expect(safeNext("/mocks/abc/live?x=1")).toBe("/mocks/abc/live?x=1");
  });
  it("blocks off-site and loop targets", () => {
    for (const bad of ["https://evil.example", "//evil.example", "/\\evil.example", "/login", "/signup?x=1", "", null, undefined, 5]) {
      expect(safeNext(bad as unknown)).toBe("/home");
    }
  });
});

describe("section feedback validation", () => {
  it("accepts a well-formed payload and rejects junk", () => {
    const ok = { sections: [{ key: "01", label: "a", title: "b", seconds: 10, notes: "n" }], general: "" };
    expect(sectionFeedbackSchema.safeParse(ok).success).toBe(true);
    expect(sectionFeedbackSchema.safeParse({ ...ok, sections: [{ ...ok.sections[0], seconds: -1 }] }).success).toBe(false);
    expect(sectionFeedbackSchema.safeParse({ ...ok, general: "x".repeat(9000) }).success).toBe(false);
  });
});

describe("comment suggestions", () => {
  it("picks a sensible category from the section name", () => {
    expect(categoryForSection("Brainstorming", "Beyond police equipment")).toBe("brainstorm");
    expect(categoryForSection("Exhibit 2", "Seasonal occupancy")).toBe("exhibit");
    expect(categoryForSection("Framework guidance", "A strong structure")).toBe("structure");
    expect(categoryForSection("Conclusion · Recommendation", "x")).toBe("recommendation");
  });
});
