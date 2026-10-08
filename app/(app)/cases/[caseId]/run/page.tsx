import { notFound, redirect } from "next/navigation";
import { getCase } from "@/lib/queries/cases";
import { getCasePages, livePages } from "@/lib/cases/content";
import { RunCase } from "@/components/interview/RunCase";

// In-person interviewing: runs a case with Present, per-section timers and notes —
// no mock session and no interviewee account required.
export default async function RunCasePage({ params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const c = await getCase(caseId);
  if (!c) notFound();

  const pages = getCasePages(caseId);
  if (!pages) redirect(`/cases/${caseId}`);

  return <RunCase caseId={caseId} caseName={c.name} caseMeta={`${c.case_type} · ${c.difficulty}`} pages={livePages(pages)} />;
}
