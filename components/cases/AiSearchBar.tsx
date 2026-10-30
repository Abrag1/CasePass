// Describe-what-you-want search for the case library. A plain GET form (no client
// JS), so results are shareable/bookmarkable. Under the bar, the sentence is shown
// back as removable chips -- one click drops a chip and re-runs -- so it's always
// clear what was understood and easy to correct.

import Link from "next/link";
import type { Chip } from "@/lib/cases/search";

const MY_HISTORY_EXAMPLE = "List the cases I've done in the past";

export function AiSearchBar({
  q,
  view,
  chips,
  dropped,
  usedAi,
  relaxed,
  others,
  nextInterviewee,
  count,
  total,
}: {
  q: string;
  view: string;
  chips: Chip[];
  dropped: string[];
  /** true = interpreted by Claude, false = keyword parser. */
  usedAi: boolean;
  relaxed: boolean;
  /** People named in the sentence (other than you): their history isn't part of your filters. */
  others: { id: string; name: string; status: "used" | "private" | "unused" }[];
  /** Interviewee of the user's next mock as interviewer, used to make the second example concrete. */
  nextInterviewee: { id: string; name: string } | null;
  count: number;
  total: number;
}) {
  const href = (query: string, drop: string[]) => {
    const p = new URLSearchParams({ tab: "browse", ai: query });
    if (drop.length) p.set("drop", drop.join(","));
    if (view === "grid") p.set("view", "grid");
    return `/cases?${p.toString()}`;
  };

  return (
    <div
      className="mb-5 rounded-2xl p-5 border"
      style={{
        background: "linear-gradient(135deg, #e6f2ea 0%, #f3f8f5 60%, #ffffff 100%)",
        borderColor: "#b9d8c6",
        boxShadow: "0 6px 22px rgba(45,106,79,.10)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span
          aria-hidden="true"
          className="w-7 h-7 rounded-lg bg-(--color-green) text-white flex items-center justify-center text-[14px]"
        >
          ✦
        </span>
        <h3 className="font-serif text-[18px] font-semibold text-[#1f3a2b]">Find cases with AI</h3>
        <span className="text-[10.5px] font-bold uppercase tracking-wider rounded-full bg-(--color-green) text-white px-2 py-0.5">
          New
        </span>
      </div>
      <p className="text-[13px] text-[#3a5a4a] mb-3.5 ml-[38px]">
        Just describe what you&apos;re looking for in your own words — it uses your prepped list and the mocks you&apos;ve run.
      </p>
      <form method="get" className="flex gap-2 items-stretch">
        <input type="hidden" name="tab" value="browse" />
        {view === "grid" && <input type="hidden" name="view" value="grid" />}
        <div className="relative flex-1">
          <input
            name="ai"
            defaultValue={q}
            placeholder="Describe the cases you want — e.g. prepped market-entry cases with exhibits I haven’t run this week"
            aria-label="Describe the cases you want"
            className="w-full rounded-xl border-2 border-[#9cc7ae] bg-white px-4 py-3.5 text-[15px] text-(--color-fg) placeholder:text-neutral-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-(--color-green)/20 focus:border-(--color-green)"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-(--color-green) hover:bg-(--color-green-dark) text-white px-6 text-[14.5px] font-semibold cursor-pointer whitespace-nowrap shadow-sm"
        >
          Find cases
        </button>
        {q && (
          <Link
            href={view === "grid" ? "/cases?view=grid" : "/cases"}
            className="rounded-xl border border-(--color-border) bg-white px-4 flex items-center text-[13px] font-semibold text-(--color-muted) hover:text-(--color-fg) whitespace-nowrap"
          >
            Clear
          </Link>
        )}
      </form>

      {!q && (
        <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[12px] text-(--color-muted)">
          <span>Try:</span>
          <Link
            href={href(MY_HISTORY_EXAMPLE, [])}
            className="rounded-full border border-(--color-border) bg-white px-3 py-1 hover:border-(--color-green)/50 hover:text-(--color-fg)"
          >
            {MY_HISTORY_EXAMPLE} <span className="text-(--color-muted)">· uses your mock history</span>
          </Link>
          {nextInterviewee ? (
            <Link
              href={href(`Give me the cases ${nextInterviewee.name} has not done, with heavy math`, [])}
              className="rounded-full border border-(--color-border) bg-white px-3 py-1 hover:border-(--color-green)/50 hover:text-(--color-fg)"
            >
              Give me the cases {nextInterviewee.name} has not done, with heavy math{" "}
              <span className="text-(--color-muted)">· your next interviewee</span>
            </Link>
          ) : (
            <span
              title="Works once someone has booked a mock with you as interviewer and shared their case tracker"
              className="rounded-full border border-dashed border-(--color-border) px-3 py-1 cursor-help"
            >
              Give me the cases [your next interviewee] has not done, with heavy math
            </span>
          )}
        </div>
      )}

      {q && (
        <div className="mt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">
              {usedAi ? "Understood as" : "Matched on"}
            </span>
            {chips.length === 0 && <span className="text-[12.5px] text-(--color-muted)">no specific filters — showing everything</span>}
            {chips.map((c) => (
              <Link
                key={c.id}
                href={href(q, [...dropped, c.id])}
                title="Remove this filter"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f1ec] text-[#2d6a4f] px-3 py-1 text-[12px] font-semibold hover:bg-[#dcebe2]"
              >
                {c.label} <span aria-hidden="true">✕</span>
              </Link>
            ))}
            {dropped.length > 0 && (
              <Link href={href(q, [])} className="text-[12px] font-semibold text-(--color-muted) hover:text-(--color-fg) underline">
                Restore filters
              </Link>
            )}
          </div>
          {others.map((p) => (
            <p key={p.id} className="text-[12.5px] mt-2 rounded-lg bg-[#fff6e0] border border-[#f0d9a0] text-[#7a5a10] px-3 py-2">
              {p.status === "used" ? (
                <>
                  Using <b>{p.name.split(" ")[0]}&apos;s</b> shared case history (cases they&apos;ve taken in mocks on CasePass).{" "}
                </>
              ) : p.status === "private" ? (
                <>
                  {p.name} hasn&apos;t shared their case history with you, so it can&apos;t be used here.{" "}
                </>
              ) : (
                <>
                  Only <b>your</b> history can be used here, and {p.name}&apos;s past cases are theirs to share.{" "}
                </>
              )}
              <Link href={`/profile/${p.id}`} className="font-semibold underline">
                Open {p.name.split(" ")[0]}&apos;s case tracker →
              </Link>
            </p>
          ))}
          <p className="text-[12.5px] text-(--color-muted) mt-2">
            {relaxed
              ? `Nothing matched those keywords exactly, so this shows ${count} cases that fit your other filters.`
              : `${count} of ${total} cases match.`}
            {!usedAi && " (Keyword search — AI understanding isn’t switched on.)"}
          </p>
        </div>
      )}
    </div>
  );
}
