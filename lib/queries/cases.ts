import { createClient } from "@/lib/supabase/server";
import type { CaseType, Difficulty, SourceBook, CaseStep, ExtractionStatus, FirmStyle } from "@/lib/supabase/types";

export { caseMetaLine } from "@/lib/cases/meta";

export interface CaseListItem {
  id: string;
  name: string;
  case_type: CaseType;
  difficulty: Difficulty;
  difficulty_note: string | null;
  source_book: SourceBook;
  casebook: string | null;
  casebook_year: string | null;
  industry: string | null;
  tags: string[];
  synopsis: string | null;
  is_seed: boolean;
  extraction_status: ExtractionStatus;
  case_format: string | null;
  skills_tested: string[];
}

// Canonical filter option lists -- must match the display labels the import
// script (scripts/import-cases.mjs) writes into case_type / source_book / industry.
export const CASE_TYPES: CaseType[] = [
  "Competitor Analysis", "Cost Reduction", "Customer Experience", "Decision Analysis", "Growth Strategy",
  "Impact Analysis", "Investment Analysis", "M&A", "Market Entry", "Market Sizing", "Operating Model",
  "Operations", "Organizational Change", "Pricing", "Private Equity", "Product Launch", "Profitability",
  "Revenue Growth", "Sourcing / Outsourcing", "Strategy Formulation", "Turnaround", "Other",
];
export const SOURCE_BOOKS: SourceBook[] = [
  "Booth", "Columbia", "Cornell", "ESADE", "Fuqua", "Haas", "INSEAD", "Kellogg", "MIT Sloan",
  "NYU Stern", "Ross", "Tuck", "UVA Darden", "Wharton", "Yale",
];
export const INDUSTRIES: string[] = [
  "Agriculture", "Consumer Goods", "Education & Nonprofit", "Energy & Utilities", "Entertainment & Media",
  "Financial Services", "Food & Beverage", "Healthcare & Pharma", "Industrials & Manufacturing", "Insurance",
  "Professional Services", "Public Sector & Nonprofit", "Real Estate", "Retail", "Technology", "Telecom",
  "Transportation & Logistics", "Travel & Hospitality", "Other",
];
export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Not rated"];

export async function listCases(filters: {
  type?: string;
  source?: string;
  industry?: string;
  difficulty?: string;
  q?: string;
}) {
  const supabase = await createClient();
  let req = supabase
    .from("cases_public")
    .select(
      "id, name, case_type, difficulty, difficulty_note, source_book, casebook, casebook_year, industry, tags, synopsis, is_seed, extraction_status, case_format, skills_tested"
    )
    .order("extraction_status", { ascending: false }) // enriched cases surface first
    .order("name");

  if (filters.type && filters.type !== "All") req = req.eq("case_type", filters.type);
  if (filters.source && filters.source !== "All") req = req.eq("source_book", filters.source);
  if (filters.industry && filters.industry !== "All") req = req.eq("industry", filters.industry);
  if (filters.difficulty && filters.difficulty !== "All") req = req.eq("difficulty", filters.difficulty);
  if (filters.q?.trim()) {
    const q = filters.q.trim();
    req = req.or(`name.ilike.%${q}%,industry.ilike.%${q}%,casebook.ilike.%${q}%`);
  }

  const { data } = await req;
  return (data ?? []) as CaseListItem[];
}

export interface CaseDetail extends CaseListItem {
  full_prompt: string | null;
  case_steps: CaseStep[];
  doc_candidate_prompt: string | null;
  doc_background: string | null;
  doc_framework_guidance: string | null;
  doc_math_walkthrough: string | null;
  doc_sample_recommendation: string | null;
  source_page: number | null;
  skills_tested: string[];
  firm_style: FirmStyle[];
  adapted_from: string | null;
  notes: string | null;
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
