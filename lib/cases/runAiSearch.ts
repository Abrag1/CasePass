// Server-side: the whole "describe what you want" pipeline in one place, shared by the
// case library and the assign-a-case screen so both always search the same way.
//
//   sentence -> (people removed) -> intent (Claude, or keyword parser) -> chips dropped
//   -> filter + rank the catalog with the user's own prepped list and mock history.

import { interpretWithAi } from "@/lib/cases/aiIntent";
import { getCasePages, pageHasExhibit } from "@/lib/cases/content";
import { CASE_TYPES, INDUSTRIES, SOURCE_BOOKS, type CaseListItem } from "@/lib/queries/cases";
import { getPartnerProfile } from "@/lib/queries/profile";
import {
  dropChips,
  extractPeople,
  heuristicIntent,
  intentChips,
  searchCases,
  type Chip,
  type SearchHit,
} from "@/lib/cases/search";

export type PersonStatus = { id: string; name: string; status: "used" | "private" | "unused" };

export interface AiSearchResult {
  hits: SearchHit<CaseListItem & { hasExhibits: boolean | null }>[];
  relaxed: boolean;
  usedAi: boolean;
  chips: Chip[];
  others: PersonStatus[];
}

export async function runAiSearch({
  query,
  dropped,
  allCases,
  me,
  partners,
  preppedIds,
  exposure,
}: {
  query: string;
  dropped: string[];
  allCases: CaseListItem[];
  me: { id: string; name: string };
  partners: { id: string; name: string }[];
  preppedIds: Set<string>;
  /** case id -> ISO date of the most recent mock the user ran or took with it. */
  exposure: Map<string, string>;
}): Promise<AiSearchResult> {
  const vocab = { types: CASE_TYPES, sources: SOURCE_BOOKS, industries: INDUSTRIES, difficulties: ["Easy", "Medium", "Hard"] };
  // Names in the sentence are people, not topics: your own name means "my history"; a partner's name
  // means the question is about them, which we say plainly instead of filtering on it.
  const { text: cleaned, others } = extractPeople(query, [
    { id: me.id, name: me.name, isMe: true },
    ...partners.filter((p) => p.id !== me.id).map((p) => ({ ...p, isMe: false })),
  ]);
  const aiIntent = await interpretWithAi(cleaned || query, vocab, me.id);
  const base = aiIntent ?? heuristicIntent(cleaned || query, vocab);

  // "Cases Emily hasn't done": use her history if she has shared it (only possible one person at a time);
  // otherwise her history can't be used, and the notice says so.
  let lastDone = exposure;
  let who = "You";
  let subject: PersonStatus[] = others.map((p) => ({ ...p, status: "unused" as const }));
  if (others.length) {
    if (base.doneMode !== "none" && others.length === 1) {
      const taken = (await getPartnerProfile(others[0].id))?.taken_history;
      if (taken) {
        const byName = new Map(allCases.map((c) => [c.name.trim().toLowerCase(), c.id]));
        lastDone = new Map();
        for (const t of taken) {
          const id = byName.get(t.case_name.trim().toLowerCase());
          if (id && (!lastDone.get(id) || t.date > lastDone.get(id)!)) lastDone.set(id, t.date);
        }
        who = others[0].name.split(" ")[0];
        subject = [{ ...others[0], status: "used" }];
      } else {
        subject = [{ ...others[0], status: "private" }];
      }
    }
    if (who === "You") {
      base.doneMode = "none"; // no usable history for them, and "mine" would be the wrong person
      base.doneDays = null;
    }
  }

  const intent = dropChips(base, dropped);
  const searchable = allCases.map((c) => ({
    ...c,
    // Only digitized cases tell us whether they contain exhibits; outline entries stay "unknown".
    hasExhibits: c.extraction_status !== "basic" ? (getCasePages(c.id)?.some(pageHasExhibit) ?? null) : null,
  }));
  const res = searchCases(searchable, intent, { preppedIds, lastDone, who });
  return { ...res, usedAi: !!aiIntent, chips: intentChips(intent, who === "You" ? "me" : who), others: subject };
}
