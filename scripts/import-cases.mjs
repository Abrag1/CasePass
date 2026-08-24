// Imports data/case-catalog.jsonl (543 basic-extraction case records from 25 real
// casebooks) into the `cases` table, alongside the 2 hand-authored seed cases.
// Idempotent: upserts on `catalog_case_id`, so re-running after a catalog update
// is safe and won't duplicate rows.
//
// Usage: node scripts/import-cases.mjs
// Requires DATABASE_URL in .env.local (same as scripts/run-sql.mjs).

import { readFileSync } from "node:fs";
import { Client } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Display-name taxonomy. These are the canonical values the app's filter
// dropdowns (lib/queries/cases.ts) must match exactly.
// ---------------------------------------------------------------------------

const SCHOOL_DISPLAY = {
  "Chicago Booth": "Booth",
  "Columbia CBS": "Columbia",
  "Cornell Johnson": "Cornell",
  "Duke Fuqua": "Fuqua",
  ESADE: "ESADE",
  "Berkeley Haas": "Haas",
  INSEAD: "INSEAD",
  "Kellogg (Northwestern)": "Kellogg",
  "MIT Sloan": "MIT Sloan",
  "NYU Stern": "NYU Stern",
  "Michigan Ross": "Ross",
  "Tuck (Dartmouth)": "Tuck",
  "UVA Darden": "UVA Darden",
  Wharton: "Wharton",
  "Yale SOM (YGCC)": "Yale",
};

const INDUSTRY_DISPLAY = {
  agriculture: "Agriculture",
  consumer_goods: "Consumer Goods",
  education_nonprofit: "Education & Nonprofit",
  energy_utilities: "Energy & Utilities",
  entertainment_media: "Entertainment & Media",
  financial_services: "Financial Services",
  food_beverage: "Food & Beverage",
  healthcare_pharma: "Healthcare & Pharma",
  industrials_manufacturing: "Industrials & Manufacturing",
  insurance: "Insurance",
  other: "Other",
  professional_services: "Professional Services",
  public_sector_nonprofit: "Public Sector & Nonprofit",
  real_estate: "Real Estate",
  retail: "Retail",
  technology: "Technology",
  telecom: "Telecom",
  transportation_logistics: "Transportation & Logistics",
  travel_hospitality: "Travel & Hospitality",
};

const CASE_TYPE_DISPLAY = {
  competitor_analysis: "Competitor Analysis",
  cost_reduction: "Cost Reduction",
  customer_experience: "Customer Experience",
  decision_analysis: "Decision Analysis",
  growth_strategy: "Growth Strategy",
  impact_analysis: "Impact Analysis",
  investment_analysis: "Investment Analysis",
  market_entry: "Market Entry",
  market_sizing: "Market Sizing",
  mergers_acquisitions: "M&A",
  operating_model: "Operating Model",
  operations: "Operations",
  organizational_change: "Organizational Change",
  other: "Other",
  pricing: "Pricing",
  private_equity_investment: "Private Equity",
  product_launch: "Product Launch",
  profitability_improvement: "Profitability",
  revenue_growth: "Revenue Growth",
  sourcing_outsourcing: "Sourcing / Outsourcing",
  strategy_formulation: "Strategy Formulation",
  turnaround: "Turnaround",
};

const CASE_FORMAT_DISPLAY = {
  interviewer_led: "Interviewer-led",
  candidate_led: "Candidate-led",
  hybrid: "Hybrid",
};

// ---------------------------------------------------------------------------
// Difficulty bucketing. Every school's scale is different (and never
// compared to another school's -- see catalog README); this only buckets
// each case's OWN rating into Easy/Medium/Hard/Not rated for the app's
// single filter dropdown. The real, honest, school-specific value goes in
// difficulty_note, shown on the case detail page.
// ---------------------------------------------------------------------------

function bucketDifficulty(rec) {
  const d = rec.skills.difficulty;
  if (d.scale_type === "none_stated") return "Not rated";

  if (d.scale_type === "categorical" && typeof d.raw_value === "string") {
    const v = d.raw_value.toLowerCase();
    if (v.includes("very hard") || v.includes("difficult")) return "Hard";
    if (v.includes("hard") && !v.includes("easy")) return "Hard";
    if (v.includes("easy") && !v.includes("hard")) return "Easy";
    if (v.includes("medium")) return "Medium";
    return "Not rated"; // e.g. Sloan 2020-21's Quantitative/Qualitative/Balanced emphasis tag, not a difficulty word
  }

  if (d.scale_type === "numeric_1_10") {
    const scaleMax = /1-3\b/.test(d.school_specific_classification || "") ? 3
      : /1-5\b/.test(d.school_specific_classification || "") ? 5
      : 10;
    const val = d.raw_value ?? avg(d.math_intensity_raw, d.structure_intensity_raw);
    if (val == null) return "Not rated";
    const pct = val / scaleMax;
    if (pct <= 0.4) return "Easy";
    if (pct <= 0.75) return "Medium";
    return "Hard";
  }

  return "Not rated";
}

function avg(...nums) {
  const vals = nums.filter((n) => typeof n === "number");
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function difficultyNote(rec) {
  const d = rec.skills.difficulty;
  if (d.scale_type === "none_stated") return null;
  const bits = [];
  if (d.raw_value != null) bits.push(`Rated "${d.raw_value}"`);
  if (d.math_intensity_raw != null) bits.push(`Quant/Math: ${d.math_intensity_raw}`);
  if (d.structure_intensity_raw != null) bits.push(`Structure: ${d.structure_intensity_raw}`);
  if (bits.length === 0) return d.school_specific_classification || null;
  return `${bits.join(" · ")} — ${d.school_specific_classification || "school-specific scale"}`;
}

// ---------------------------------------------------------------------------

function primaryDisplay(normalizedArr, displayMap) {
  const usable = (normalizedArr || []).filter((v) => v && v !== "not_available");
  const first = usable.find((v) => v !== "other") ?? usable[0];
  return first ? displayMap[first] ?? null : null;
}

function toRow(rec) {
  const school = SCHOOL_DISPLAY[rec.source.school] ?? rec.source.school;
  const caseType = primaryDisplay(rec.content.case_type_normalized, CASE_TYPE_DISPLAY) ?? "Other";
  const industry = primaryDisplay(rec.content.industry_normalized, INDUSTRY_DISPLAY)
    ?? rec.content.industry_raw?.[0]
    ?? null;

  return {
    catalog_case_id: rec.case_id,
    name: rec.title,
    case_type: caseType,
    difficulty: bucketDifficulty(rec),
    difficulty_note: difficultyNote(rec),
    source_book: school,
    industry,
    tags: [],
    synopsis: null,
    full_prompt: null,
    case_steps: JSON.stringify([]),
    casebook: rec.source.casebook,
    casebook_year: rec.source.casebook_year,
    source_page: rec.source.source_page,
    extraction_status: rec.extraction_status,
    skills_tested: rec.skills.skills_tested_raw ?? [],
    case_format: CASE_FORMAT_DISPLAY[rec.skills.case_format] ?? null,
    firm_style: JSON.stringify(rec.skills.firm_style ?? []),
    adapted_from: rec.source.adapted_from,
    notes: rec.notes,
    is_seed: false,
  };
}

const UPSERT_SQL = `
insert into public.cases (
  catalog_case_id, name, case_type, difficulty, difficulty_note, source_book, industry, tags,
  synopsis, full_prompt, case_steps, casebook, casebook_year, source_page, extraction_status,
  skills_tested, case_format, firm_style, adapted_from, notes, is_seed
) values (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13, $14, $15, $16, $17, $18::jsonb, $19, $20, $21
)
on conflict (catalog_case_id) do update set
  name = excluded.name,
  case_type = excluded.case_type,
  difficulty = excluded.difficulty,
  difficulty_note = excluded.difficulty_note,
  source_book = excluded.source_book,
  industry = excluded.industry,
  casebook = excluded.casebook,
  casebook_year = excluded.casebook_year,
  source_page = excluded.source_page,
  extraction_status = excluded.extraction_status,
  skills_tested = excluded.skills_tested,
  case_format = excluded.case_format,
  firm_style = excluded.firm_style,
  adapted_from = excluded.adapted_from,
  notes = excluded.notes;
`;

async function main() {
  const lines = readFileSync(new URL("../data/case-catalog.jsonl", import.meta.url), "utf8")
    .trim()
    .split("\n");
  const records = lines.map((l) => JSON.parse(l));
  console.log(`Read ${records.length} catalog records.`);

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  let ok = 0;
  try {
    for (const rec of records) {
      const row = toRow(rec);
      await client.query(UPSERT_SQL, [
        row.catalog_case_id, row.name, row.case_type, row.difficulty, row.difficulty_note,
        row.source_book, row.industry, row.tags, row.synopsis, row.full_prompt, row.case_steps,
        row.casebook, row.casebook_year, row.source_page, row.extraction_status, row.skills_tested,
        row.case_format, row.firm_style, row.adapted_from, row.notes, row.is_seed,
      ]);
      ok++;
    }
    console.log(`Upserted ${ok}/${records.length} cases.`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exitCode = 1;
});
