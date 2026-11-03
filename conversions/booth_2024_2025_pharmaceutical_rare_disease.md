# booth_2024_2025_pharmaceutical_rare_disease

VERDICT: PASS
MECHANICAL: PASS (orchestrator override)

verify-case reports one addition, the Exhibit 1 header "Attrition (% expected to be approved to reach the market)", which lives only in the image-only exhibit page. The independent verifier confirmed it against the page image; all Exhibit 1 values and maths match.

Verifier's one MAJOR finding (nesting of "$5B portfolio with:" lost on screen) was fixed by the orchestrator: GuidanceBox in components/cases/blocks.tsx now supports two nested levels (each two leading spaces = one level). Re-previewed section 03: the three items now nest under "$5B portfolio with:". Not re-verified by the verifier.

Minor notes (accepted):
- 2x2 matrix drawn as a tree; root "Framework" is the tree title.
- Source typo "$1.145M" (should be $1.145B) and "$1.1B"/"$3.1B" mismatches kept as printed.
- Follow-up questions folded into one qText.
- "Risks and Next Steps" / "Recommendation" labels are structural.
