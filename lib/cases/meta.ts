// Pure, framework-agnostic case-display helpers -- safe to import from both
// server components and client components (unlike lib/queries/cases.ts, which
// pulls in the server-only Supabase client via next/headers).

export interface CaseMetaFields {
  case_type: string;
  difficulty: string;
  source_book: string;
  casebook_year: string | null;
  industry: string | null;
}

// Single-line summary shown on every case card, list row, and assign-form row.
export function caseMetaLine(c: CaseMetaFields): string {
  const school = c.casebook_year ? `${c.source_book} ${c.casebook_year}` : c.source_book;
  return [c.case_type, c.difficulty, school, c.industry].filter(Boolean).join(" · ");
}
