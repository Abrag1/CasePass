import { describe, expect, it } from "vitest";
import {
  dropChips,
  extractPeople,
  heuristicIntent,
  intentChips,
  sanitizeIntent,
  searchCases,
  type SearchableCase,
  type Vocab,
} from "@/lib/cases/search";

const vocab: Vocab = {
  types: ["Market Entry", "Pricing", "Profitability", "M&A", "Market Sizing", "Other"],
  sources: ["Kellogg", "UVA Darden", "Wharton"],
  industries: ["Healthcare & Pharma", "Technology", "Transportation & Logistics", "Other"],
  difficulties: ["Easy", "Medium", "Hard"],
};

const mk = (id: string, over: Partial<SearchableCase>): SearchableCase => ({
  id,
  name: id,
  case_type: "Market Entry",
  difficulty: "Medium",
  industry: "Technology",
  source_book: "Kellogg",
  casebook: null,
  tags: [],
  synopsis: null,
  skills_tested: [],
  case_format: null,
  extraction_status: "basic",
  hasExhibits: null,
  ...over,
});

const NOW = Date.parse("2026-10-29T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW - n * 86_400_000).toISOString();

describe("heuristicIntent", () => {
  it("reads types, difficulty, prepped, exhibits and a recent-history exclusion", () => {
    const i = heuristicIntent("Prepped beginner market entry cases with exhibits that I haven't run this week", vocab);
    expect(i.types).toEqual(["Market Entry"]);
    expect(i.difficulties).toEqual(["Easy"]);
    expect(i.preppedOnly).toBe(true);
    expect(i.needExhibits).toBe(true);
    expect(i.doneMode).toBe("exclude");
    expect(i.doneDays).toBe(7);
  });
  it("reads 'ones I did in the past 10 days' as an inclusion", () => {
    const i = heuristicIntent("cases I ran in the past 10 days", vocab);
    expect(i.doneMode).toBe("only");
    expect(i.doneDays).toBe(10);
  });
  it("keeps leftover words as topics and maps industry aliases", () => {
    const i = heuristicIntent("airline pricing elasticity", vocab);
    expect(i.industries).toEqual(["Transportation & Logistics"]);
    expect(i.types).toEqual(["Pricing"]);
    expect(i.topics).toContain("elasticity");
  });
});

describe("sanitizeIntent", () => {
  it("drops values that aren't in the catalog and turns them into topics", () => {
    const i = sanitizeIntent({ types: ["market entry", "Space Travel"], difficulties: ["Impossible"], doneMode: "exclude", doneDays: -5 }, vocab);
    expect(i.types).toEqual(["Market Entry"]);
    expect(i.difficulties).toEqual([]);
    expect(i.topics).toContain("space travel");
    expect(i.doneDays).toBe(0);
  });
});

describe("searchCases", () => {
  const cases = [
    mk("a", { case_type: "Pricing", difficulty: "Easy", tags: ["elasticity"], extraction_status: "enriched", hasExhibits: true }),
    mk("b", { case_type: "Pricing", difficulty: "Hard" }),
    mk("c", { case_type: "Market Entry", difficulty: "Easy" }),
  ];
  const ctx = { preppedIds: new Set(["a", "c"]), lastDone: new Map([["a", daysAgo(3)], ["c", daysAgo(40)]]), now: NOW };

  it("applies prepped + difficulty + type exactly", () => {
    const i = sanitizeIntent({ types: ["Pricing"], difficulties: ["Easy"], preppedOnly: true }, vocab);
    expect(searchCases(cases, i, ctx).hits.map((h) => h.item.id)).toEqual(["a"]);
  });
  it("excludes cases run inside the window but not older ones", () => {
    const i = sanitizeIntent({ doneMode: "exclude", doneDays: 7 }, vocab);
    expect(searchCases(cases, i, ctx).hits.map((h) => h.item.id).sort()).toEqual(["b", "c"]);
  });
  it("'only' keeps just the cases run in the window", () => {
    const i = sanitizeIntent({ doneMode: "only", doneDays: 7 }, vocab);
    expect(searchCases(cases, i, ctx).hits.map((h) => h.item.id)).toEqual(["a"]);
  });
  it("needExhibits only passes cases known to have them", () => {
    const i = sanitizeIntent({ needExhibits: true }, vocab);
    expect(searchCases(cases, i, ctx).hits.map((h) => h.item.id)).toEqual(["a"]);
  });
  it("ranks topic matches and explains why", () => {
    const i = sanitizeIntent({ topics: ["elasticity"] }, vocab);
    const { hits } = searchCases(cases, i, ctx);
    expect(hits[0].item.id).toBe("a");
    expect(hits[0].reasons.join(" ")).toContain("elasticity");
  });
  it("relaxes topics when nothing matches them", () => {
    const i = sanitizeIntent({ types: ["Pricing"], topics: ["zzzz"] }, vocab);
    const r = searchCases(cases, i, ctx);
    expect(r.relaxed).toBe(true);
    expect(r.hits).toHaveLength(2);
  });
});

describe("chips", () => {
  it("can drop a single facet", () => {
    const i = sanitizeIntent({ types: ["Pricing"], preppedOnly: true, doneMode: "exclude", doneDays: 7 }, vocab);
    expect(intentChips(i).map((c) => c.id)).toEqual(["type:Pricing", "prepped", "done"]);
    const j = dropChips(i, ["prepped", "done"]);
    expect(j.preppedOnly).toBe(false);
    expect(j.doneMode).toBe("none");
    expect(j.types).toEqual(["Pricing"]);
  });
});

describe("hyphenated phrasing", () => {
  it("reads 'market-entry' as the type, with no stray 'market' topic", () => {
    const i = heuristicIntent("Market-entry cases with exhibits that I haven't run this week", vocab);
    expect(i.types).toEqual(["Market Entry"]);
    expect(i.topics).toEqual([]);
    expect(i.needExhibits).toBe(true);
    expect(i.doneMode).toBe("exclude");
    expect(i.doneDays).toBe(7);
  });
});

describe("lean topics", () => {
  it("drops filler like 'can you give me the cases that I've done?' and keeps only the history filter", () => {
    const i = heuristicIntent("can you give me the cases that I've done?", vocab);
    expect(i.topics).toEqual([]);
    expect(i.doneMode).toBe("only");
    expect(intentChips(i).map((c) => c.id)).toEqual(["done"]);
  });
  it("keeps real subject words and ignores short filler", () => {
    const i = heuristicIntent("show me something on supply chain and ROI for a retailer", vocab);
    expect(i.topics).toEqual(expect.arrayContaining(["supply", "chain", "roi"]));
    expect(i.topics).not.toContain("show");
    expect(i.topics).not.toContain("for");
  });
  it("only matches topics at the start of a word", () => {
    const c = [mk("x", { synopsis: "American Airlines has had weaker growth", name: "x" })];
    const i = sanitizeIntent({ topics: ["can"] }, vocab);
    expect(i.topics).toEqual([]);
    const j = sanitizeIntent({ topics: ["pric"] }, vocab);
    expect(searchCases(c, j, { preppedIds: new Set(), lastDone: new Map() }).relaxed).toBe(true);
  });
});

describe("people in the sentence", () => {
  const people = [
    { id: "me", name: "John Fassbender", isMe: true },
    { id: "em", name: "Emily Carter", isMe: false },
  ];
  it("treats your own name as 'I' and keeps names out of the topics", () => {
    const { text, me, others } = extractPeople("help me what are the list of cases that John Fassbender done", people);
    expect(me).toBe(true);
    expect(others).toEqual([]);
    const i = heuristicIntent(text, vocab);
    expect(i.topics).toEqual([]);
    expect(i.doneMode).toBe("only");
  });
  it("flags a partner's name instead of treating it as a topic", () => {
    const { text, me, others } = extractPeople("cases Emily has done", people);
    expect(me).toBe(false);
    expect(others.map((p) => p.id)).toEqual(["em"]);
    expect(heuristicIntent(text, vocab).topics).toEqual([]);
  });
  it("ignores a lowercase first name that is really a word", () => {
    const { others } = extractPeople("emily rose pricing cases", people);
    expect(others).toEqual([]);
  });
});
