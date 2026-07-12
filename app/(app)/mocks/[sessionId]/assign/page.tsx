import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { listCases } from "@/lib/queries/cases";
import { AssignCaseForm } from "@/components/mocks/AssignCaseForm";
import { Button } from "@/components/ui/Button";

export default async function AssignCasePage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ shared?: string }>;
}) {
  const { sessionId } = await params;
  const { shared } = await searchParams;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (session.interviewer_id !== user.id) redirect("/home");

  const cases = await listCases({});
  const firstName = session.interviewee.full_name.split(" ")[0];

  return (
    <section className="p-7 max-w-4xl mx-auto">
      <a href="/home" className="text-[13px] text-(--color-muted) hover:text-(--color-fg) mb-3.5 inline-block">
        ← Back to home
      </a>

      {shared === "1" && session.assigned_case && (
        <div className="flex items-center gap-3 bg-[#e9f1ec] border border-[#cfe3d7] rounded-xl px-4 py-3.5 mb-5 flex-wrap">
          <div className="w-[30px] h-[30px] shrink-0 rounded-full bg-(--color-green) text-white flex items-center justify-center text-[15px]">
            ✓
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="font-semibold text-[14px] text-[#1f3a2b]">
              Synopsis shared — {firstName} has been notified
            </div>
            <div className="text-[12.5px] text-[#3a5a4a] mt-0.5">
              {session.assigned_case.name} is locked in for this mock. {firstName} sees only the synopsis
              until you present live.
            </div>
          </div>
          <Link href="/home">
            <Button>Back to home</Button>
          </Link>
        </div>
      )}

      <h2 className="font-serif text-[22px] font-semibold mb-1">
        Select a case for {session.interviewee.full_name}
      </h2>
      <p className="text-[13px] text-(--color-muted) mb-6">
        Pick a case, then share a short synopsis. The full prompt, exhibits, and answers stay hidden from{" "}
        {session.interviewee.full_name} until you present them live.
      </p>

      {session.interviewee_note && (
        <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-lg px-4 py-3 mb-5">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-green) mb-1">
            Note from {session.interviewee.full_name}
          </div>
          <p className="text-[13.5px] text-[#2a3f33] leading-relaxed">{session.interviewee_note}</p>
        </div>
      )}

      <AssignCaseForm
        sessionId={session.id}
        cases={cases}
        currentCaseId={session.assigned_case_id}
        currentSynopsis={session.synopsis_shared_to_interviewee}
      />
    </section>
  );
}
