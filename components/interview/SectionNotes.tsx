"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { InterviewApi } from "@/components/interview/useInterviewState";
import { formatDuration, type SectionInfo } from "@/lib/interview/model";
import {
  CATEGORY_LABELS,
  DEFAULT_TEMPLATES,
  categoryForSection,
  loadCustomTemplates,
  saveCustomTemplates,
  type FeedbackTemplate,
  type TemplateCategory,
} from "@/lib/interview/templates";

function timeLabel(at: number | undefined) {
  if (!at) return "";
  return new Date(at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/**
 * Stopwatch for one section. The first Start begins the interview clock; after
 * that, moving between sections records and restarts it for you. Pause only
 * freezes the current section (a break).
 */
export function SectionTimer({
  section,
  api,
  size = "md",
  display = "controls",
}: {
  section: SectionInfo;
  api: InterviewApi;
  size?: "sm" | "md";
  /** "time" shows just the recorded time (used where editing timers makes no sense). */
  display?: "controls" | "time";
}) {
  const secs = api.secondsFor(section.key);
  const running = api.runningKey === section.key;
  const big = size === "md";
  const idle = api.clock === "idle";
  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`font-serif font-semibold tabular-nums ${big ? "text-[18px]" : "text-[14px]"}`}
        style={{ color: running ? "#2d6a4f" : "#1f2421" }}
        aria-label={`Time on ${section.label}`}
      >
        {formatDuration(secs)}
      </span>
      {display === "controls" &&
        (running ? (
          <button
            type="button"
            onClick={() => api.stopTimer(section.key)}
            className="border-none rounded-md px-2.5 py-1 text-[12px] font-semibold cursor-pointer"
            style={{ background: "#f6e3df", color: "#8a3a2f" }}
            title="Pause (e.g. for a break). Moving to the next section still records this one and starts the next."
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => api.startTimer(section.key)}
            className="border-none rounded-md px-2.5 py-1 text-[12px] font-semibold cursor-pointer"
            style={{ background: "#e9f1ec", color: "#2d6a4f" }}
          >
            ▶ {idle ? "Start interview" : api.clock === "paused" || secs > 0 ? "Resume" : "Start"}
          </button>
        ))}
      {display === "controls" && !running && secs > 0 && (
        <button
          type="button"
          onClick={() => api.resetTimer(section.key)}
          className="border-none bg-transparent text-[11.5px] text-(--color-muted) cursor-pointer hover:text-(--color-fg)"
          title="Reset this section's timer to 00:00"
        >
          Reset
        </button>
      )}
    </div>
  );
}

function SaveBadge({ api, sectionKey, persistLabel }: { api: InterviewApi; sectionKey: string; persistLabel: string | null }) {
  if (persistLabel === null) return null;
  const isDirty = !!api.dirty[sectionKey];
  const at = api.savedAt[sectionKey];
  if (api.status === "error" && isDirty) {
    return (
      <span className="text-[11.5px] font-semibold" style={{ color: "#8a3a2f" }}>
        ⚠ Couldn’t save — retrying on next edit
      </span>
    );
  }
  if (isDirty) return <span className="text-[11.5px] text-(--color-muted)">Saving…</span>;
  if (at) {
    return (
      <span className="text-[11.5px] font-semibold" style={{ color: "#2d6a4f" }}>
        ✓ Saved {persistLabel} · {timeLabel(at)}
      </span>
    );
  }
  return <span className="text-[11.5px] text-(--color-muted)">Notes save automatically</span>;
}

/**
 * Per-section notes: a clean box for this section only, a "common comments"
 * dropdown, and a visible saved indicator. Give it `key={section.key}` at the call
 * site so switching section always opens a fresh box.
 */
export function SectionNotes({
  section,
  api,
  persistLabel,
  rows = 5,
}: {
  section: SectionInfo;
  api: InterviewApi;
  /** Where saves land, for the badge: "to this device" / "to your account". null hides the badge. */
  persistLabel: string | null;
  rows?: number;
}) {
  const notes = api.state.sections[section.key]?.notes ?? "";
  const hasNotes = notes.trim().length > 0;

  return (
    <div
      className="rounded-[10px] border border-[#dfe6e1] bg-white"
      style={{ borderLeft: "3px solid #2d6a4f" }}
      data-section-notes={section.key}
    >
      <div className="flex items-center justify-between gap-2 px-3.5 pt-3 pb-1.5 flex-wrap">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-green)">
            Feedback notes · {section.label}
          </div>        </div>
        <SaveBadge api={api} sectionKey={section.key} persistLabel={persistLabel} />
      </div>
      <div className="px-3.5 pb-3">
        <textarea
          rows={rows}
          value={notes}
          onChange={(e) => api.setNotes(section.key, e.target.value)}
          placeholder={`Notes on ${section.label.toLowerCase()}…`}
          aria-label={`Feedback notes for ${section.label}`}
          className="w-full rounded-lg border border-(--color-border) bg-white px-3 py-2.5 text-sm text-(--color-fg) placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-(--color-green)/30 focus:border-(--color-green) resize-y"
        />
        <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
          <TemplatePicker section={section} onPick={(text) => api.appendNote(section.key, text)} />
          {hasNotes && <span className="text-[11.5px] text-(--color-muted)">{notes.trim().split(/\n/).filter(Boolean).length} line(s) recorded</span>}
        </div>
      </div>
    </div>
  );
}

function TemplatePicker({ section, onPick }: { section: SectionInfo; onPick: (text: string) => void }) {
  const [custom, setCustom] = useState<FeedbackTemplate[]>([]);
  const [managing, setManaging] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [draftCat, setDraftCat] = useState<TemplateCategory>(() => categoryForSection(section.label, section.title));
  const [draftTone, setDraftTone] = useState<"+" | "-">("-");

  useEffect(() => {
    // localStorage only exists in the browser, so load after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustom(loadCustomTemplates());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const primary = categoryForSection(section.label, section.title);
  const all = useMemo(() => [...custom, ...DEFAULT_TEMPLATES], [custom]);
  const order = useMemo(
    () => [primary, ...(Object.keys(CATEGORY_LABELS) as TemplateCategory[]).filter((c) => c !== primary)],
    [primary],
  );

  function add() {
    const text = draft.trim();
    if (!text) return;
    const next = [...custom, { id: `c-${Date.now()}`, category: draftCat, tone: draftTone, text, custom: true }];
    setCustom(next);
    saveCustomTemplates(next);
    setDraft("");
  }
  function remove(id: string) {
    const next = custom.filter((t) => t.id !== id);
    setCustom(next);
    saveCustomTemplates(next);
  }

  // Suggested category first (your own comments at the top of it); others fold away.
  const groups = order
    .map((cat) => ({
      cat,
      items: [...all.filter((t) => t.custom && t.category === cat), ...all.filter((t) => !t.custom && t.category === cat)],
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-2 min-w-0 flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="rounded-lg border border-(--color-border) bg-white px-2.5 py-1.5 text-[12.5px] text-(--color-fg) cursor-pointer inline-flex items-center gap-1.5 hover:bg-neutral-50"
          >
            ＋ Add a common comment <span className="text-(--color-muted)">▴</span>
          </button>
          {open && (
            <div
              role="listbox"
              className="absolute left-0 bottom-full mb-1 z-30 w-[300px] max-w-[calc(100vw-3rem)] max-h-[230px] overflow-y-auto rounded-lg border border-(--color-border) bg-white shadow-lg py-1"
            >
              {groups.map((g) => {
                const expanded = g.cat === primary || openCats[g.cat];
                return (
                  <div key={g.cat}>
                    <button
                      type="button"
                      onClick={() => g.cat !== primary && setOpenCats((o) => ({ ...o, [g.cat]: !o[g.cat] }))}
                      className="w-full text-left px-2.5 py-1 text-[10.5px] uppercase tracking-wide font-semibold text-(--color-muted) bg-[#fafbf9] border-none flex justify-between"
                      style={{ cursor: g.cat === primary ? "default" : "pointer" }}
                    >
                      <span>{g.cat === primary ? `${CATEGORY_LABELS[g.cat]} · suggested` : CATEGORY_LABELS[g.cat]}</span>
                      {g.cat !== primary && <span>{expanded ? "−" : "+"}</span>}
                    </button>
                    {expanded &&
                      g.items.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          role="option"
                          aria-selected={false}
                          onClick={() => {
                            onPick(t.text);
                            setOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[12px] leading-snug text-(--color-fg) bg-white border-none cursor-pointer hover:bg-[#e9f1ec] flex gap-1.5"
                        >
                          <span style={{ color: t.tone === "+" ? "#2d6a4f" : "#b07a1f" }}>{t.tone === "+" ? "✓" : "△"}</span>
                          <span>{t.text}</span>
                        </button>
                      ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setManaging((m) => !m)}
          className="border-none bg-transparent text-[12px] font-semibold text-(--color-green) cursor-pointer"
        >
          {managing ? "Done" : "My comments…"}
        </button>
      </div>

      {managing && (
        <div className="rounded-lg border border-dashed border-(--color-border) bg-[#fafbf9] p-3 flex flex-col gap-2">
          <div className="text-[11.5px] text-(--color-muted)">
            Save phrases you repeat. They appear at the top of this dropdown (stored on this device).
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
              placeholder="e.g. Great energy, but slow down on the math"
              className="flex-1 min-w-[180px] rounded-lg border border-(--color-border) bg-white px-2.5 py-1.5 text-[12.5px]"
            />
            <select value={draftCat} onChange={(e) => setDraftCat(e.target.value as TemplateCategory)} className="rounded-lg border border-(--color-border) bg-white px-2 py-1.5 text-[12.5px]">
              {(Object.keys(CATEGORY_LABELS) as TemplateCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
            <select value={draftTone} onChange={(e) => setDraftTone(e.target.value as "+" | "-")} className="rounded-lg border border-(--color-border) bg-white px-2 py-1.5 text-[12.5px]">
              <option value="+">✓ Strength</option>
              <option value="-">△ To improve</option>
            </select>
            <button type="button" onClick={add} className="border-none rounded-lg bg-(--color-green) text-white px-3 py-1.5 text-[12.5px] font-semibold cursor-pointer">
              Add
            </button>
          </div>
          {custom.length > 0 && (
            <ul className="flex flex-col gap-1">
              {custom.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2 text-[12.5px]">
                  <span className="min-w-0">
                    <span className="text-(--color-muted)">{CATEGORY_LABELS[t.category]} · </span>
                    {t.tone === "+" ? "✓ " : "△ "}
                    {t.text}
                  </span>
                  <button type="button" onClick={() => remove(t.id)} className="border-none bg-transparent text-[#8a3a2f] text-[12px] cursor-pointer shrink-0">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
