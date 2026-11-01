// Registry of cases written by the conversion agents (see .claude/skills/convert-case).
// One file per case lives in this folder; each exports CASE_ID, CASE_META and PAGES.
// To register a case, add one import under REGISTER-IMPORTS and one entry under
// REGISTER-ENTRIES (keep both lists alphabetical by file name).
import type { CasePage } from "../content";
// REGISTER-IMPORTS
import * as boothBreastCancerSurgery from "./booth_2024_2025_breast_cancer_surgery";

export const AUTHORED_CASES: Record<string, CasePage[]> = {
  // REGISTER-ENTRIES
  [boothBreastCancerSurgery.CASE_ID]: boothBreastCancerSurgery.PAGES,
};
