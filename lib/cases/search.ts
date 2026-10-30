// Natural-language case search, split in two so the risky part stays small:
//
//   1. INTERPRET  a sentence -> a structured SearchIntent (types, difficulty,
//      topics, "prepped only", "not run in the last 7 days", ...). Done by Claude
//      when an API key is configured (lib/cases/aiIntent.ts), otherwise by the
//      keyword parser below -- so search always works.
//   2. APPLY      the intent -> filter + rank the catalog. Pure, deterministic
//      code. "Prepped" and "past week" are looked up in the user's real data, never
//      guessed by a model, and every result carries the reasons it matched.
//
// Everything here is framework-free so it can be unit-tested.

import { z } from "zod";

export const IntentSchema = z.object({
  types: z.array(z.string()),
  difficulties: z.array(z.string()),
  industries: z.array(z.string()),
  sources: z.array(z.string()),
  /** Free-text concepts to match against names, tags, skills and synopses (with synonyms). */
  topics: z.array(z.string()),
  needExhibits: z.boolean(),
  needMath: z.boolean(),
  fullCaseOnly: z.boolean(),
  preppedOnly: z.boolean(),
  /** "exclude" = hide cases the user ran/took in the window; "only" = show just those. */
  doneMode: z.enum(["none", "exclude", "only"]),
  /** Window in days; 0 means "ever". Ignored when doneMode is "none". */
  doneDays: z.number().nullable(),
});
export type SearchIntent = z.infer<typeof IntentSchema>;

export interface Vocab {
  types: string[];
  sources: string[];
  industries: string[];
  difficulties: string[];
}

export function emptyIntent(): SearchIntent {
  return {
    types: [],
    difficulties: [],
    industries: [],
    sources: [],
    topics: [],
    needExhibits: false,
    needMath: false,
    fullCaseOnly: false,
    preppedOnly: false,
    doneMode: "none",
    doneDays: null,
  };
}

const lc = (s: string) => s.toLowerCase().trim();
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Keep only values that exist in the real catalog vocabulary (case-insensitive), canonicalised. */
function canon(values: string[], allowed: string[]): { kept: string[]; leftover: string[] } {
  const kept: string[] = [];
  const leftover: string[] = [];
  for (const v of values) {
    const hit = allowed.find((a) => lc(a) === lc(v));
    if (hit) {
      if (!kept.includes(hit)) kept.push(hit);
    } else if (v.trim()) leftover.push(v.trim());
  }
  return { kept, leftover };
}

/** Make any intent (model output included) safe: unknown values become topics, numbers are bounded. */
export function sanitizeIntent(raw: Partial<SearchIntent>, vocab: Vocab): SearchIntent {
  const base = emptyIntent();
  const t = canon(raw.types ?? [], vocab.types);
  const d = canon(raw.difficulties ?? [], vocab.difficulties);
  const i = canon(raw.industries ?? [], vocab.industries);
  const s = canon(raw.sources ?? [], vocab.sources);
  const topics = [...(raw.topics ?? []), ...t.leftover, ...i.leftover, ...s.leftover]
    .map((x) => lc(String(x)))
    .filter((x) => x.length <= 40 && (x.includes(" ") ? x.split(" ").some(usableTopic) : usableTopic(x)));
  const mode = raw.doneMode === "exclude" || raw.doneMode === "only" ? raw.doneMode : "none";
  const days = typeof raw.doneDays === "number" && Number.isFinite(raw.doneDays) ? Math.min(3650, Math.max(0, Math.round(raw.doneDays))) : null;
  return {
    ...base,
    types: t.kept,
    difficulties: d.kept,
    industries: i.kept,
    sources: s.kept,
    topics: [...new Set(topics)].slice(0, 8),
    needExhibits: !!raw.needExhibits,
    needMath: !!raw.needMath,
    fullCaseOnly: !!raw.fullCaseOnly,
    preppedOnly: !!raw.preppedOnly,
    doneMode: mode,
    doneDays: mode === "none" ? null : (days ?? 0),
  };
}

// ---------------------------------------------------------------------------
// Keyword interpreter (fallback when no AI key / the AI call fails)
// ---------------------------------------------------------------------------

const TYPE_ALIASES: [RegExp, string][] = [
  [/\b(mergers?|acquisitions?|m&a|m and a)\b/, "M&A"],
  [/\b(private equity|pe)\b/, "Private Equity"],
  [/\b(sizing|estimation|guesstimate)\b/, "Market Sizing"],
  [/\b(profit|profits|profitability)\b/, "Profitability"],
  [/\b(cost cutting|cost reduction|reduce costs?)\b/, "Cost Reduction"],
  [/\b(launch|launching)\b/, "Product Launch"],
  [/\b(entry|entering|enter)\b/, "Market Entry"],
  [/\b(growth)\b/, "Growth Strategy"],
  [/\b(pricing|price)\b/, "Pricing"],
  [/\b(turnaround)\b/, "Turnaround"],
  [/\b(operations?)\b/, "Operations"],
  [/\b(competitor|competition|competitive)\b/, "Competitor Analysis"],
];
const INDUSTRY_ALIASES: [RegExp, string][] = [
  [/\b(health ?care|pharma|medical|hospital|biotech)\b/, "Healthcare & Pharma"],
  [/\b(tech|technology|software|saas)\b/, "Technology"],
  [/\b(bank|banking|finance|financial|fintech)\b/, "Financial Services"],
  [/\b(airline|airlines|logistics|shipping|transport|transportation|freight|delivery)\b/, "Transportation & Logistics"],
  [/\b(hotel|hotels|travel|hospitality|tourism)\b/, "Travel & Hospitality"],
  [/\b(food|beverage|restaurant|restaurants|beer|drink)\b/, "Food & Beverage"],
  [/\b(retail|retailer|store|stores)\b/, "Retail"],
  [/\b(energy|utility|utilities|oil|gas)\b/, "Energy & Utilities"],
  [/\b(telecom|telecommunications)\b/, "Telecom"],
  [/\b(insurance|insurer)\b/, "Insurance"],
  [/\b(real estate|property)\b/, "Real Estate"],
  [/\b(media|entertainment|gaming|sports)\b/, "Entertainment & Media"],
  [/\b(manufacturing|industrial|industrials)\b/, "Industrials & Manufacturing"],
  [/\b(education|school|university)\b/, "Education & Nonprofit"],
  [/\b(government|public sector|nonprofit|non ?profit)\b/, "Public Sector & Nonprofit"],
  [/\b(consumer goods|cpg|consumer)\b/, "Consumer Goods"],
  [/\b(agriculture|farming)\b/, "Agriculture"],
];
const DIFFICULTY_WORDS: [RegExp, string][] = [
  [/\b(easy|beginner|beginners|simple|intro|introductory|warm ?up)\b/, "Easy"],
  [/\b(medium|intermediate|moderate)\b/, "Medium"],
  [/\b(hard|difficult|advanced|challenging|tough)\b/, "Hard"],
];
// Filler that must never become a "topic" chip. Contractions (I've, can't, ...) are dropped
// separately because any word containing an apostrophe is skipped.
const STOPWORDS = new Set(
  (
    // articles, pronouns, auxiliaries, question words
    "a an the and or but nor so yet if then than that this these those there here when where while how why what which who whom whose " +
    "i me my mine myself we us our ours you your yours he him his she her hers it its they them their theirs " +
    "am is are was were be been being do does did doing done have has had having can could would should shall will may might must " +
    "get got give gave given show shown list find tell let make made need want wish like love look looking please thanks thank " +
    "help helps helping know see display fetch pull bring return provide search searching explain describe " +
    // prepositions / quantifiers / fillers
    "a about above after again against all also any around as at before below between both by down during each either even ever " +
    "every few for from further how in into just kind lot lots many more most much neither no not of off on once only other out over " +
    "own same some such than too under until up very with within without yes " +
    // words about cases / history / time that are handled by flags
    "case cases one ones thing things something anything type types sort sorts kinds " +
    "week weeks day days month months year today yesterday tonight past last recent recently ago since previous this " +
    "run ran used use gave took taken practiced practised practise practice presented seen did exclude excluding except " +
    "skip avoid new fresh unused prepped prepared ready full exhibit exhibits chart charts graph graphs " +
    "math maths quant quantitative calculation calculations number numbers heavy include includes including " +
    "easy hard medium difficult simple beginner intermediate advanced"
  ).split(/\s+/),
);
// Short words that are real topics (everything else under 4 letters is dropped).
const SHORT_TOPICS = new Set(["roi", "cpg", "b2b", "b2c", "kpi", "ceo", "cfo", "saas", "ai", "esg"]);

function usableTopic(w: string): boolean {
  if (!w || w.includes("'")) return false;
  if (STOPWORDS.has(w)) return false;
  if (w.length < 4 && !SHORT_TOPICS.has(w)) return false;
  return /[a-z]/.test(w);
}

export interface Person {
  id: string;
  name: string;
  isMe: boolean;
}

/**
 * Pull people out of the sentence so their names never become topic chips.
 * Your own name (or "me/my/I") means your history; a partner's name means "this is
 * about someone else", which we report back instead of silently filtering on it.
 * Full names match in any case; a lone first/last name only counts when it's capitalised.
 */
export function extractPeople(query: string, people: Person[]): { text: string; me: boolean; others: Person[] } {
  let text = query;
  let me = false;
  const others: Person[] = [];
  const seen = new Set<string>();
  for (const p of people) {
    if (seen.has(p.id)) continue;
    const words = p.name.trim().split(/\s+/).filter(Boolean);
    if (!words.length) continue;
    const full = new RegExp("(?<![A-Za-z])" + words.map(escapeRe).join("\\s+") + "(?![A-Za-z])", "i");
    let hit = false;
    if (full.test(text)) {
      text = text.replace(full, p.isMe ? " I " : " they ");
      hit = true;
    }
    for (const w of words.filter((x) => x.length >= 3)) {
      const cap = new RegExp("(?<![A-Za-z])" + escapeRe(w[0].toUpperCase() + w.slice(1).toLowerCase()) + "(?![A-Za-z])");
      if (cap.test(text)) {
        text = text.replace(cap, p.isMe ? " I " : " they ");
        hit = true;
      }
    }
    if (hit) {
      seen.add(p.id);
      if (p.isMe) me = true;
      else others.push(p);
    }
  }
  return { text: text.replace(/\s+/g, " ").trim(), me, others };
}

/** Deterministic parser for the sentence -- good enough to be useful with no API key. */
export function heuristicIntent(query: string, vocab: Vocab): SearchIntent {
  // Hyphens become spaces so "market-entry" reads as "market entry".
  let text = " " + lc(query).replace(/[“”"]/g, " ").replace(/-/g, " ").replace(/\s+/g, " ") + " ";
  const intent = emptyIntent();

  const take = (re: RegExp): RegExpMatchArray | null => {
    const m = text.match(re);
    if (m) text = text.replace(re, " ");
    return m;
  };

  // Vocabulary names appearing verbatim (longest first so "market entry" beats "market").
  const verbatim = (list: string[], into: string[]) => {
    for (const name of [...list].sort((a, b) => b.length - a.length)) {
      if (name === "Other" || name === "Not rated") continue;
      const re = new RegExp(`(?<![a-z0-9])${escapeRe(lc(name))}(?![a-z0-9])`);
      if (re.test(text)) {
        into.push(name);
        text = text.replace(re, " ");
      }
    }
  };
  verbatim(vocab.types, intent.types);
  verbatim(vocab.industries, intent.industries);
  verbatim(vocab.sources, intent.sources);
  // "darden" / "uva" style short forms of the casebooks.
  for (const name of vocab.sources) {
    const short = lc(name).replace(/^(uva|nyu|mit)\s+/, "");
    if (short !== lc(name) && new RegExp(`(?<![a-z0-9])${escapeRe(short)}(?![a-z0-9])`).test(text)) {
      if (!intent.sources.includes(name)) intent.sources.push(name);
      text = text.replace(new RegExp(`(?<![a-z0-9])${escapeRe(short)}(?![a-z0-9])`), " ");
    }
  }
  for (const [re, name] of TYPE_ALIASES) if (take(re) && vocab.types.includes(name) && !intent.types.includes(name)) intent.types.push(name);
  for (const [re, name] of INDUSTRY_ALIASES) if (take(re) && vocab.industries.includes(name) && !intent.industries.includes(name)) intent.industries.push(name);
  for (const [re, name] of DIFFICULTY_WORDS) if (take(re) && vocab.difficulties.includes(name) && !intent.difficulties.includes(name)) intent.difficulties.push(name);

  // Flags.
  if (take(/\b(prepped|prepared|ready to run|ready-to-run)\b/)) intent.preppedOnly = true;
  if (take(/\b(full cases?|digitized|runnable|run live)\b/)) intent.fullCaseOnly = true;
  if (take(/\b(exhibits?|charts?|graphs?|data tables?)\b/)) intent.needExhibits = true;
  if (take(/\b(math|maths|quant|quantitative|calculations?|number crunching|math heavy)\b/)) intent.needMath = true;

  // Time window: "this week", "past 10 days", "last month", "today".
  let days: number | null = null;
  let m: RegExpMatchArray | null;
  if ((m = take(/\b(?:past|last|previous|in the last|within the last)\s+(\d+)\s+days?\b/))) days = Number(m[1]);
  else if (take(/\b(?:this|past|last|previous)\s+week\b/)) days = 7;
  else if (take(/\b(?:this|past|last|previous)\s+month\b/)) days = 30;
  else if (take(/\b(today|yesterday)\b/)) days = 2;

  // "haven't done / not run / exclude ones I used" vs "that I did / cases I ran".
  const negative = /\b(haven'?t|have not|hasn'?t|not|never|exclude|excluding|except|without|skip|avoid|fresh|unused|new)\b/.test(text + " " + lc(query));
  const mentionsDone = /\b(done|did|run|ran|used|gave|given|took|taken|practiced|practised|presented|seen|use)\b/.test(lc(query));
  if (mentionsDone || days !== null) {
    if (negative && mentionsDone) {
      intent.doneMode = "exclude";
      intent.doneDays = days ?? 0;
    } else if (mentionsDone) {
      intent.doneMode = "only";
      intent.doneDays = days ?? 0;
    }
  }

  intent.topics = text
    .replace(/[’]/g, "'")
    .split(/[^a-z0-9&']+/)
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter(usableTopic);
  return sanitizeIntent(intent, vocab);
}

// ---------------------------------------------------------------------------
// Chips (so the user can see and undo what was understood)
// ---------------------------------------------------------------------------

export interface Chip {
  id: string;
  label: string;
}

export function intentChips(i: SearchIntent, who = "me"): Chip[] {
  const chips: Chip[] = [];
  for (const v of i.types) chips.push({ id: `type:${v}`, label: `Type: ${v}` });
  for (const v of i.difficulties) chips.push({ id: `diff:${v}`, label: `Difficulty: ${v}` });
  for (const v of i.industries) chips.push({ id: `ind:${v}`, label: `Industry: ${v}` });
  for (const v of i.sources) chips.push({ id: `src:${v}`, label: `Casebook: ${v}` });
  for (const v of i.topics) chips.push({ id: `topic:${v}`, label: `Mentions: ${v}` });
  if (i.preppedOnly) chips.push({ id: "prepped", label: "Prepped by me" });
  if (i.fullCaseOnly) chips.push({ id: "full", label: "Full cases only" });
  if (i.needExhibits) chips.push({ id: "exhibits", label: "Has exhibits" });
  if (i.needMath) chips.push({ id: "math", label: "Math-heavy" });
  if (i.doneMode !== "none") {
    const when = !i.doneDays ? "ever" : i.doneDays === 7 ? "in the past week" : `in the past ${i.doneDays} days`;
    chips.push({ id: "done", label: i.doneMode === "exclude" ? `Not run by ${who} ${when}` : `Run by ${who} ${when}` });
  }
  return chips;
}

/** Remove the facets named by dropped chip ids. */
export function dropChips(i: SearchIntent, ids: string[]): SearchIntent {
  const out: SearchIntent = { ...i, types: [...i.types], difficulties: [...i.difficulties], industries: [...i.industries], sources: [...i.sources], topics: [...i.topics] };
  for (const id of ids) {
    const [kind, ...rest] = id.split(":");
    const val = rest.join(":");
    if (kind === "type") out.types = out.types.filter((x) => x !== val);
    else if (kind === "diff") out.difficulties = out.difficulties.filter((x) => x !== val);
    else if (kind === "ind") out.industries = out.industries.filter((x) => x !== val);
    else if (kind === "src") out.sources = out.sources.filter((x) => x !== val);
    else if (kind === "topic") out.topics = out.topics.filter((x) => x !== val);
    else if (id === "prepped") out.preppedOnly = false;
    else if (id === "full") out.fullCaseOnly = false;
    else if (id === "exhibits") out.needExhibits = false;
    else if (id === "math") out.needMath = false;
    else if (id === "done") {
      out.doneMode = "none";
      out.doneDays = null;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Apply the intent to the catalog
// ---------------------------------------------------------------------------

export interface SearchableCase {
  id: string;
  name: string;
  case_type: string;
  difficulty: string;
  industry: string | null;
  source_book: string;
  casebook: string | null;
  tags: string[];
  synopsis: string | null;
  skills_tested: string[];
  case_format: string | null;
  extraction_status: string;
  /** null = unknown (catalog entries without digitized pages). */
  hasExhibits: boolean | null;
}

export interface SearchContext {
  preppedIds: Set<string>;
  /** case id -> ISO date of the most recent mock the user ran or took with it. */
  lastDone: Map<string, string>;
  /** Whose history `lastDone` is: "You" (default) or a partner's first name. */
  who?: string;
  now?: number;
}

export interface SearchHit<T extends SearchableCase> {
  item: T;
  score: number;
  reasons: string[];
}

const DAY = 86_400_000;
const MATH_RE = /math|quant|calculat|estimat|sizing|break-?even|margin|roi|numeric/;

function stem(w: string) {
  return w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w;
}

function topicScore(c: SearchableCase, topic: string): number {
  const t = stem(lc(topic));
  if (!t) return 0;
  // Match at the start of a word, so "pric" finds "pricing" but "can" no longer finds "American".
  const re = new RegExp(`(?<![a-z0-9])${escapeRe(t)}`);
  const has = (text: string | null | undefined) => re.test(lc(text ?? ""));
  let s = 0;
  if (has(c.name)) s += 4;
  if (c.tags.some(has) || c.skills_tested.some(has)) s += 3;
  if (has(c.case_type) || has(c.industry) || has(c.case_format) || has(c.casebook)) s += 2;
  if (has(c.synopsis)) s += 1;
  return s;
}

export function searchCases<T extends SearchableCase>(
  cases: T[],
  intent: SearchIntent,
  ctx: SearchContext,
): { hits: SearchHit<T>[]; relaxed: boolean } {
  const now = ctx.now ?? Date.now();
  const who = ctx.who ?? "You";

  const passesHard = (c: T): boolean => {
    if (intent.types.length && !intent.types.includes(c.case_type)) return false;
    if (intent.difficulties.length && !intent.difficulties.includes(c.difficulty)) return false;
    if (intent.industries.length && !(c.industry && intent.industries.includes(c.industry))) return false;
    if (intent.sources.length && !intent.sources.includes(c.source_book)) return false;
    if (intent.fullCaseOnly && c.extraction_status === "basic") return false;
    if (intent.needExhibits && c.hasExhibits !== true) return false;
    if (intent.preppedOnly && !ctx.preppedIds.has(c.id)) return false;
    if (intent.needMath) {
      const hay = `${c.tags.join(" ")} ${c.skills_tested.join(" ")} ${c.synopsis ?? ""}`.toLowerCase();
      if (!MATH_RE.test(hay)) return false;
    }
    if (intent.doneMode !== "none") {
      const last = ctx.lastDone.get(c.id);
      const within = last
        ? !intent.doneDays || now - new Date(last).getTime() <= intent.doneDays * DAY
        : false;
      if (intent.doneMode === "exclude" && within) return false;
      if (intent.doneMode === "only" && !within) return false;
    }
    return true;
  };

  const pool = cases.filter(passesHard);

  const scored: SearchHit<T>[] = pool.map((c) => {
    const reasons: string[] = [];
    let score = 0;
    const matched: string[] = [];
    for (const topic of intent.topics) {
      const s = topicScore(c, topic);
      if (s > 0) {
        score += s;
        matched.push(topic);
      }
    }
    if (matched.length) reasons.push(`Matches ${matched.map((m) => `“${m}”`).join(", ")}`);
    if (intent.types.length) reasons.push(c.case_type);
    if (intent.difficulties.length) reasons.push(c.difficulty);
    if (intent.industries.length && c.industry) reasons.push(c.industry);
    if (ctx.preppedIds.has(c.id)) {
      reasons.push("Prepped");
      score += 1;
    }
    if (c.hasExhibits) reasons.push("Has exhibits");
    const last = ctx.lastDone.get(c.id);
    if (intent.doneMode === "only" && last) reasons.push(`${who} ran it ${new Date(last).toLocaleDateString([], { month: "short", day: "numeric" })}`);
    if (intent.doneMode === "exclude") reasons.push(last ? `Last run ${new Date(last).toLocaleDateString([], { month: "short", day: "numeric" })}` : who === "You" ? "Not run before" : `${who} hasn’t done it`);
    if (c.extraction_status !== "basic") score += 0.5; // digitized cases are ready to run live
    return { item: c, score, reasons };
  });

  const withTopics = intent.topics.length ? scored.filter((h) => h.score >= 1 && h.reasons.some((r) => r.startsWith("Matches"))) : scored;
  // If the topic words matched nothing, fall back to everything the other filters allow.
  const relaxed = intent.topics.length > 0 && withTopics.length === 0 && scored.length > 0;
  const hits = (relaxed ? scored : withTopics).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  return { hits, relaxed };
}
