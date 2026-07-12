import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase } from "@/lib/queries/cases";
import { getCasePages } from "@/lib/cases/content";
import { Card, Badge } from "@/components/ui/Card";
import { ExhibitCard } from "@/components/ui/Exhibit";
import { PageBody } from "@/components/cases/blocks";

export default async function CaseDocPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const c = await getCase(caseId);
  if (!c) notFound();

  const pages = getCasePages(caseId);

  return (
    <section className="p-7 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <Link href="/cases" className="text-[13px] text-(--color-muted) hover:text-(--color-fg)">
          ← Back to case library
        </Link>
        {c.is_seed && <Badge tone="warn">Full casebook · preview build</Badge>}
      </div>

      <Card className="overflow-hidden shadow-sm">
        <div className="bg-(--color-navy) text-white px-8 py-8">
          <div className="text-[11px] tracking-widest uppercase text-[#9fb2cf] font-semibold mb-2.5">Case study</div>
          <div className="font-serif text-[27px] font-semibold leading-tight">{c.name}</div>
          <div className="text-[13px] text-[#c3cee0] mt-2">
            {c.case_type} · {c.difficulty} · {c.source_book} casebook · {c.industry}
          </div>
          <div className="flex gap-1.5 mt-3.5 flex-wrap">
            {c.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2.5 py-1 rounded"
                style={{ background: "rgba(127,209,163,.18)", color: "#9fe0bd" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {pages ? (
          pages.map((p) => (
            <div key={p.n} className="px-8 py-6 border-b border-(--color-border-soft) last:border-b-0">
              <div className="flex items-center gap-3 mb-3.5">
                <span className="font-serif text-[15px] font-semibold text-[#b9bdb6]">{p.n}</span>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">{p.label}</div>
                  <div className="font-serif text-[18px] font-semibold mt-0.5">{p.title}</div>
                </div>
                <Badge tone="green">Ready</Badge>
              </div>
              <PageBody page={p} />
            </div>
          ))
        ) : (
          <FallbackDoc c={c} />
        )}
      </Card>
    </section>
  );
}

// Cases without authored page content (should be none after the reseed) fall back
// to the flat doc_* fields so the library never shows a broken page.
function FallbackDoc({ c }: { c: Awaited<ReturnType<typeof getCase>> }) {
  if (!c) return null;
  const sections: { label: string; title: string; body: string | null }[] = [
    { label: "Candidate prompt", title: "The prompt", body: c.doc_candidate_prompt },
    { label: "Background & clarifying info", title: "Context the interviewer can reveal", body: c.doc_background },
    { label: "Framework guidance", title: "A strong structure for this case", body: c.doc_framework_guidance },
    { label: "Math & analysis walkthrough", title: "Worked calculations and the key insight", body: c.doc_math_walkthrough },
    { label: "Sample recommendation & insights", title: "A model answer with risks and next steps", body: c.doc_sample_recommendation },
  ];
  return (
    <>
      {sections.map((p, i) => (
        <div key={p.label} className="px-8 py-6 border-b border-(--color-border-soft)">
          <div className="flex items-center gap-3 mb-3.5">
            <span className="font-serif text-[15px] font-semibold text-[#b9bdb6]">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">{p.label}</div>
              <div className="font-serif text-[18px] font-semibold mt-0.5">{p.title}</div>
            </div>
            {p.body ? <Badge tone="green">Ready</Badge> : <Badge tone="warn">Coming soon</Badge>}
          </div>
          {p.body ? (
            <div className="text-[14.5px] leading-relaxed text-[#2a2f2b] bg-(--color-bg) rounded-lg p-4">{p.body}</div>
          ) : (
            <p className="text-[12.5px] text-(--color-muted) italic">Full write-up coming soon.</p>
          )}
        </div>
      ))}
      <div className="px-8 py-6">
        <div className="flex items-center gap-3 mb-3.5">
          <span className="font-serif text-[15px] font-semibold text-[#b9bdb6]">{String(sections.length + 1).padStart(2, "0")}</span>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">Exhibits</div>
            <div className="font-serif text-[18px] font-semibold mt-0.5">Supporting data</div>
          </div>
        </div>
        {c.exhibits.length === 0 ? (
          <p className="text-[12.5px] text-(--color-muted) italic">No exhibits published for this case yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {c.exhibits.map((ex) => (
              <ExhibitCard key={ex.id} title={ex.title} kind={ex.kind} data={ex.data} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
