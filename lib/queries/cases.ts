import { createClient } from "@/lib/supabase/server";
import type { CaseType, Difficulty, SourceBook, CaseStep } from "@/lib/supabase/types";

export interface CaseListItem {
  id: string;
  name: string;
  case_type: CaseType;
  difficulty: Difficulty;
  source_book: SourceBook;
  industry: string | null;
  tags: string[];
  synopsis: string;
  is_seed: boolean;
}

export const CASE_TYPES: CaseType[] = ["Profitability", "Market entry", "Pricing", "Operations", "Growth", "M&A"];
export const SOURCE_BOOKS: SourceBook[] = ["Kellogg", "Cornell", "UVA Darden", "Ross", "Wharton", "Booth", "Tuck"];
export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

export async function listCases(filters: { type?: string; source?: string; difficulty?: string; q?: string }) {
  const supabase = await createClient();
  let req = supabase
    .from("cases_public")
    .select("id, name, case_type, difficulty, source_book, industry, tags, synopsis, is_seed")
    .order("name");

  if (filters.type && filters.type !== "All") req = req.eq("case_type", filters.type);
  if (filters.source && filters.source !== "All") req = req.eq("source_book", filters.source);
  if (filters.difficulty && filters.difficulty !== "All") req = req.eq("difficulty", filters.difficulty);
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    req = req.or(`name.ilike.%${q}%,industry.ilike.%${q}%`);
  }

  const { data } = await req;
  return (data ?? []) as CaseListItem[];
}

export interface CaseDetail extends CaseListItem {
  full_prompt: string;
  case_steps: CaseStep[];
  doc_candidate_prompt: string | null;
  doc_background: string | null;
  doc_framework_guidance: string | null;
  doc_math_walkthrough: string | null;
  doc_sample_recommendation: string | null;
  exhibits: { id: string; position: number; title: string; kind: "bar_list" | "table"; data: unknown }[];
}

export async function getMyPreppedCaseIds(userId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("prepped_cases")
    .select("case_id")
    .eq("user_id", userId)
    .eq("prepped", true);
  return new Set((data ?? []).map((r) => r.case_id));
}

export async function getCase(caseId: string): Promise<CaseDetail | null> {
  const supabase = await createClient();
  const { data: caseRow } = await supabase.from("cases_public").select("*").eq("id", caseId).maybeSingle();
  if (!caseRow) return null;

  const { data: exhibits } = await supabase
    .from("case_exhibits")
    .select("id, position, title, kind, data")
    .eq("case_id", caseId)
    .order("position");

  return { ...caseRow, exhibits: exhibits ?? [] } as CaseDetail;
}
