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

// The pill chips shown under a case card. The 2 hand-authored cases have real
// curated tags (e.g. "math-heavy", "exhibit-heavy") -- a judgment call made by
// someone who actually read the case, which we can't make for the 543
// catalog-imported cases. For those, fall back to what the source casebook
// itself states: case format (interviewer/candidate-led) and skills tested.
// Never invents a "math-heavy"-style label without a source for it.
export function displayChips(c: { tags: string[]; case_format: string | null; skills_tested: string[] }): string[] {
  if (c.tags.length > 0) return c.tags;
  const chips: string[] = [];
  if (c.case_format) chips.push(c.case_format);
  chips.push(...c.skills_tested.slice(0, 3));
  return chips;
}
