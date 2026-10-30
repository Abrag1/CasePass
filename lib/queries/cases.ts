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

/** People this user has a mock with (either role), for recognising names in a search sentence. */
export async function getMyPartners(userId: string): Promise<{ id: string; name: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mock_sessions")
    .select(
      "interviewer_id, interviewee_id, " +
        "interviewer:profiles!mock_sessions_interviewer_id_fkey(id, full_name), " +
        "interviewee:profiles!mock_sessions_interviewee_id_fkey(id, full_name)",
    )
    .or(`interviewer_id.eq.${userId},interviewee_id.eq.${userId}`);
  type P = { id: string; full_name: string };
  const one = (v: P | P[] | null | undefined): P | undefined => (Array.isArray(v) ? v[0] : (v ?? undefined));
  const out = new Map<string, string>();
  for (const row of (data ?? []) as unknown as { interviewer: P | P[] | null; interviewee: P | P[] | null }[]) {
    for (const p of [one(row.interviewer), one(row.interviewee)]) {
      if (p && p.id !== userId && p.full_name) out.set(p.id, p.full_name);
    }
  }
  return [...out].map(([id, name]) => ({ id, name }));
}

/** The interviewee of this user's soonest upcoming mock where they are the interviewer. */
export async function getNextInterviewee(userId: string): Promise<{ id: string; name: string } | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mock_sessions")
    .select("scheduled_at, interviewee:profiles!mock_sessions_interviewee_id_fkey(id, full_name)")
    .eq("interviewer_id", userId)
    .neq("status", "declined")
    .gt("scheduled_at", new Date().toISOString())
    .order("scheduled_at")
    .limit(1);
  const row = (data ?? [])[0] as unknown as { interviewee: { id: string; full_name: string } | { id: string; full_name: string }[] | null } | undefined;
  const p = Array.isArray(row?.interviewee) ? row?.interviewee[0] : row?.interviewee;
  return p?.full_name ? { id: p.id, name: p.full_name } : null;
}

/**
 * Cases this user has run or taken in a mock (any role), most recent date per case.
 * "Done" means the mock is booked and its time has passed, or it was completed.
 */
export async function getMyCaseExposure(userId: string): Promise<Map<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mock_sessions")
    .select("assigned_case_id, scheduled_at, status")
    .or(`interviewer_id.eq.${userId},interviewee_id.eq.${userId}`)
    .not("assigned_case_id", "is", null)
    .neq("status", "declined");
  const now = Date.now();
  const last = new Map<string, string>();
  for (const s of data ?? []) {
    if (!s.assigned_case_id || !s.scheduled_at) continue;
    if (s.status !== "completed" && new Date(s.scheduled_at).getTime() > now) continue;
    const prev = last.get(s.assigned_case_id);
    if (!prev || s.scheduled_at > prev) last.set(s.assigned_case_id, s.scheduled_at);
  }
  return last;
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
