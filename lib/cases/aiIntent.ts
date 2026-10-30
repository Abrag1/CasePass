// Server-side only: turns a typed sentence into a SearchIntent with Claude.
//
// The model only fills in a small JSON form (see IntentSchema); all filtering and
// ranking happens in lib/cases/search.ts against real data. If there's no API key,
// the call fails, or the user is over their hourly limit, we return null and the
// caller uses the keyword parser instead -- search never depends on the AI being up.

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { IntentSchema, sanitizeIntent, type SearchIntent, type Vocab } from "@/lib/cases/search";

// Model is configurable without a code change. The default favours quality; for a
// cheaper/faster search set CASEPASS_AI_MODEL=claude-haiku-5-5 in the environment.
const MODEL = process.env.CASEPASS_AI_MODEL || "claude-opus-5-5";
const HOURLY_LIMIT = 40;

export function aiSearchEnabled(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

// Best-effort, per server instance: enough to stop a runaway loop from running up a bill.
const cache = new Map<string, SearchIntent>();
const usage = new Map<string, { windowStart: number; count: number }>();

function underLimit(userId: string): boolean {
  const now = Date.now();
  const u = usage.get(userId);
  if (!u || now - u.windowStart > 3_600_000) {
    usage.set(userId, { windowStart: now, count: 1 });
    return true;
  }
  u.count += 1;
  return u.count <= HOURLY_LIMIT;
}

function systemPrompt(vocab: Vocab): string {
  return [
    "You convert a consulting-case-library search request into a JSON filter form. Do not answer the request; only fill the form.",
    "",
    "Allowed values (use these exact strings; leave a list empty if the request doesn't clearly imply it):",
    `- types: ${vocab.types.join(" | ")}`,
    `- difficulties: ${vocab.difficulties.join(" | ")}`,
    `- industries: ${vocab.industries.join(" | ")}`,
    `- sources (casebooks): ${vocab.sources.join(" | ")}`,
    "",
    "Rules:",
    '- "topics": short lowercase concepts that should appear in a case\'s name, tags, skills or summary, e.g. "pricing", "elasticity", "supply chain", "unit economics". Add 1-3 close synonyms when useful. Do NOT repeat things already captured by types/industries/difficulties.',
    '- Map "beginner/simple/intro" to difficulty Easy, "intermediate" to Medium, "advanced/tough" to Hard.',
    '- needExhibits: true only if the request asks for charts/exhibits/data interpretation. needMath: true only if it asks for math/quant-heavy cases.',
    "- fullCaseOnly: true only if the request says the case must be runnable/digitized/full.",
    '- preppedOnly: true if the request says prepped, prepared, or ready to run (the user\'s own prepped list).',
    '- doneMode/doneDays describe the user\'s OWN mock history: "exclude" for "haven\'t done / not run / fresh / new to me", "only" for "ones I did / ran / used". doneDays is the window in days ("past week" = 7, "this month" = 30, "ever" or no window = 0). Otherwise doneMode "none" and doneDays null.',
    "- A pronoun like \"they\" refers to another person the user is asking about; treat it exactly like \"I\" when setting doneMode/doneDays (e.g. \"cases they have not done\" -> doneMode exclude, doneDays 0).",
    "- Never invent filters the request doesn't imply.",
  ].join("\n");
}

export async function interpretWithAi(query: string, vocab: Vocab, userId: string): Promise<SearchIntent | null> {
  if (!aiSearchEnabled()) return null;
  const key = query.trim().toLowerCase();
  const hit = cache.get(key);
  if (hit) return hit;
  if (!underLimit(userId)) return null;

  try {
    const client = new Anthropic({ timeout: 20_000, maxRetries: 1 });
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 1500,
      output_config: { effort: "low", format: zodOutputFormat(IntentSchema) },
      system: systemPrompt(vocab),
      messages: [{ role: "user", content: query.trim().slice(0, 400) }],
    });
    if (!response.parsed_output) return null;
    const intent = sanitizeIntent(response.parsed_output, vocab);
    if (cache.size > 300) cache.delete(cache.keys().next().value as string);
    cache.set(key, intent);
    return intent;
  } catch (err) {
    console.error("[casepass] AI search interpretation failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
