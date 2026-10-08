import { describe, expect, it } from "vitest";
import {
  buildFeedbackPayload,
  formatDuration,
  formatDurationLong,
  parseState,
  sectionSeconds,
  sectionsFromPages,
  serializeState,
  summaryToText,
} from "@/lib/interview/model";
import { CASE_CONTENT } from "@/lib/cases/content";

describe("timer maths", () => {
  it("counts banked + running seconds", () => {
    expect(sectionSeconds({ notes: "", seconds: 30, runningSince: 1_000 }, 11_000)).toBe(40);
    expect(sectionSeconds({ notes: "", seconds: 30, runningSince: null }, 99_000)).toBe(30);
    expect(sectionSeconds(undefined, 5)).toBe(0);
  });
  it("formats durations", () => {
    expect(formatDuration(125)).toBe("02:05");
    expect(formatDurationLong(0)).toBe("—");
    expect(formatDurationLong(45)).toBe("45 s");
    expect(formatDurationLong(120)).toBe("2 min");
    expect(formatDurationLong(252)).toBe("4 min 12 s");
  });
});

describe("stored notes", () => {
  it("round-trips", () => {
    const state = parseState(null);
    state.sections["01"] = { notes: "hi", seconds: 12, runningSince: null };
    const back = parseState(serializeState(state));
    expect(back.sections["01"].notes).toBe("hi");
    expect(back.sections["01"].seconds).toBe(12);
  });
  it("keeps a legacy plain-text note as the overall note", () => {
    const s = parseState("old note from before sections existed");
    expect(s.general).toBe("old note from before sections existed");
    expect(s.clock).toBe("idle");
  });
  it("survives corrupt JSON and negative seconds", () => {
    expect(parseState("{not json").general).toBe("{not json");
    const s = parseState(JSON.stringify({ v: 2, sections: { a: { notes: 3, seconds: -5 } }, general: 1 }));
    expect(s.sections.a).toEqual({ notes: "", seconds: 0, runningSince: null });
    expect(s.general).toBe("");
  });
  it("derives the clock for older saves", () => {
    const running = parseState(JSON.stringify({ v: 2, sections: { a: { notes: "", seconds: 0, runningSince: 5 } }, general: "" }));
    expect(running.clock).toBe("running");
    const paused = parseState(JSON.stringify({ v: 2, sections: { a: { notes: "", seconds: 9, runningSince: null } }, general: "" }));
    expect(paused.clock).toBe("paused");
  });
});

describe("feedback payload", () => {
  const sections = [
    { key: "01", label: "Structure", title: "Structure" },
    { key: "02", label: "Exhibit 1", title: "Exhibit 1" },
  ];
  it("keeps each section's notes separate and includes timings", () => {
    const state = parseState(null);
    state.sections["01"] = { notes: "  structure only  ", seconds: 100, runningSince: null };
    state.sections["02"] = { notes: "exhibit only", seconds: 0, runningSince: 1_000 };
    const p = buildFeedbackPayload(state, sections, 31_000);
    expect(p.sections[0]).toMatchObject({ key: "01", notes: "structure only", seconds: 100 });
    expect(p.sections[1]).toMatchObject({ key: "02", notes: "exhibit only", seconds: 30 });
    expect(p.sections[0].notes).not.toContain("exhibit");
  });
  it("writes a by-section text summary and skips empty sections", () => {
    const state = parseState(null);
    state.sections["01"] = { notes: "good", seconds: 60, runningSince: null };
    const text = summaryToText("Aces", buildFeedbackPayload(state, sections, 0));
    expect(text).toContain("Structure · Structure (1 min)");
    expect(text).toContain("good");
    expect(text).not.toContain("Exhibit 1");
  });
  it("makes a section for every non-cheat page of every authored case", () => {
    for (const pages of Object.values(CASE_CONTENT)) {
      const secs = sectionsFromPages(pages);
      expect(secs.length).toBe(pages.filter((p) => p.kind !== "cheat").length);
      expect(new Set(secs.map((s) => s.key)).size).toBe(secs.length); // keys unique -> notes never collide
    }
  });
});
