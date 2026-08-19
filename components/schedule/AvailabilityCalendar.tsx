"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createAvailabilityBlocks,
  updateAvailabilityBlock,
  deleteAvailability,
} from "@/lib/actions/availability";
import {
  type AvailabilityRow,
  type Ymd,
  campusToday,
  mondayOf,
  addDays,
  weekdayOf,
  ymdString,
  minuteLabel,
  CAMPUS_TZ_LABEL,
} from "@/lib/scheduling";

const DAY_COLS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // column order
const CHIP_LABELS = ["S", "M", "T", "W", "T", "F", "S"]; // model weekday 0=Sun..6=Sat
const START_MIN = 480; // 8:00 AM
const END_MIN = 1200; // 8:00 PM
const ROWH = 44;
const PX_PER_MIN = ROWH / 60;
const GRIDH = ((END_MIN - START_MIN) / 60) * ROWH;

type RepeatMode = "none" | "weekly" | "custom";

interface Editor {
  kind: "create" | "edit";
  id?: string;
  origKind?: "one_off" | "recurring";
  dayCol: number; // 0=Mon..6=Sun
  ymd: Ymd; // date of that column
  anchor: { left: number; top: number };
  startMinute: number;
  endMinute: number;
  repeatMode: RepeatMode;
  customDays: number[]; // model weekdays (0=Sun..6=Sat)
  endsOn: string; // '' or 'YYYY-MM-DD'
  error?: string;
}

const timeOptions: { value: number; label: string }[] = [];
for (let m = START_MIN; m <= END_MIN; m += 15) timeOptions.push({ value: m, label: minuteLabel(m) });

function snap15(min: number) {
  return Math.round(min / 15) * 15;
}

export function AvailabilityCalendar({ rows }: { rows: AvailabilityRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [viewMonday, setViewMonday] = useState<Ymd>(() => mondayOf(campusToday()));
  const [editor, setEditor] = useState<Editor | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(viewMonday, i));
  const rangeLabel = formatRange(weekDates[0], weekDates[6]);
  const today = campusToday();
  const isToday = (d: Ymd) => d.y === today.y && d.mo === today.mo && d.d === today.d;

  function openCreate(dayCol: number, ymd: Ymd, clientY: number, colEl: HTMLElement, clientX: number) {
    const rect = colEl.getBoundingClientRect();
    const gridRect = gridRef.current!.getBoundingClientRect();
    const rawMin = START_MIN + ((clientY - rect.top) / GRIDH) * (END_MIN - START_MIN);
    const startMinute = Math.min(Math.max(snap15(rawMin), START_MIN), END_MIN - 15);
    const endMinute = Math.min(startMinute + 45, END_MIN);
    setEditor({
      kind: "create",
      dayCol,
      ymd,
      anchor: clampAnchor(clientX - gridRect.left, clientY - gridRect.top, gridRect.width),
      startMinute,
      endMinute,
      repeatMode: "none",
      customDays: [weekdayOf(ymd)],
      endsOn: "",
    });
  }

  function openEdit(row: AvailabilityRow, dayCol: number, ymd: Ymd, clientX: number, clientY: number) {
    const gridRect = gridRef.current!.getBoundingClientRect();
    setEditor({
      kind: "edit",
      id: row.id,
      origKind: row.kind,
      dayCol,
      ymd,
      anchor: clampAnchor(clientX - gridRect.left, clientY - gridRect.top, gridRect.width),
      startMinute: row.start_minute,
      endMinute: Math.min(row.start_minute + row.duration_min, END_MIN),
      repeatMode: row.kind === "recurring" ? "weekly" : "none",
      customDays: [weekdayOf(ymd)],
      endsOn: row.recur_until ?? "",
    });
  }

  function save() {
    if (!editor) return;
    const { startMinute, endMinute } = editor;
    if (endMinute <= startMinute) {
      setEditor({ ...editor, error: "End time must be after start." });
      return;
    }
    const durationMin = endMinute - startMinute;
    const endsOn = editor.endsOn || null;

    startTransition(async () => {
      let res;
      if (editor.kind === "edit" && editor.id) {
        res = await updateAvailabilityBlock(editor.id, { startMinute, durationMin, recurUntil: endsOn });
      } else if (editor.repeatMode === "none") {
        res = await createAvailabilityBlocks({ startMinute, durationMin, mode: "one_off", date: ymdString(editor.ymd) });
      } else if (editor.repeatMode === "weekly") {
        res = await createAvailabilityBlocks({ startMinute, durationMin, mode: "weekly", weekdays: [weekdayOf(editor.ymd)], recurUntil: endsOn });
      } else {
        res = await createAvailabilityBlocks({ startMinute, durationMin, mode: "custom", weekdays: editor.customDays, recurUntil: endsOn });
      }
      if (res?.error) {
        setEditor((e) => (e ? { ...e, error: res!.error } : e));
        return;
      }
      setEditor(null);
      router.refresh();
    });
  }

  function remove() {
    if (!editor?.id) return;
    startTransition(async () => {
      await deleteAvailability(editor.id!);
      setEditor(null);
      router.refresh();
    });
  }

  return (
    <div className="bg-white border border-(--color-border) rounded-xl p-3.5" ref={gridRef} style={{ position: "relative" }}>
      {/* Week nav */}
      <div className="flex items-center gap-2.5 mb-3">
        <button onClick={() => setViewMonday((m) => addDays(m, -7))} className="w-8 h-8 rounded-lg border border-(--color-border) bg-white cursor-pointer text-(--color-muted)">
          ‹
        </button>
        <button onClick={() => setViewMonday(mondayOf(campusToday()))} className="px-3 h-8 rounded-lg border border-(--color-border) bg-white cursor-pointer text-[12.5px] font-semibold text-(--color-fg)">
          Today
        </button>
        <button onClick={() => setViewMonday((m) => addDays(m, 7))} className="w-8 h-8 rounded-lg border border-(--color-border) bg-white cursor-pointer text-(--color-muted)">
          ›
        </button>
        <div className="font-semibold text-[14px] ml-1">{rangeLabel}</div>
        <div className="ml-auto text-[11.5px] text-(--color-muted)">Times in {CAMPUS_TZ_LABEL} · click a slot to add</div>
      </div>

      {/* Day headers */}
      <div className="flex">
        <div className="w-[46px] shrink-0" />
        <div className="flex-1 grid grid-cols-7">
          {weekDates.map((d, i) => (
            <div key={i} className="text-center text-[11px] text-(--color-muted) pb-1">
              {DAY_COLS[i]}{" "}
              {isToday(d) ? (
                <span className="inline-flex items-center justify-center w-[19px] h-[19px] rounded-full bg-(--color-green) text-white font-semibold text-[11px] align-middle">
                  {d.d}
                </span>
              ) : (
                <span className="font-semibold text-(--color-fg)">{d.d}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex">
        <div className="w-[46px] shrink-0">
          {Array.from({ length: (END_MIN - START_MIN) / 60 }, (_, i) => (
            <div key={i} style={{ height: ROWH }} className="text-[10px] text-(--color-muted) text-right pr-1.5 -translate-y-1.5">
              {minuteLabel(START_MIN + i * 60)}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7">
          {weekDates.map((ymd, col) => {
            const wd = weekdayOf(ymd);
            const dateStr = ymdString(ymd);
            const dayBlocks = rows.filter((r) => {
              if (r.id === editor?.id) return false; // hidden while editing (highlight shown instead)
              if (r.kind === "one_off") return r.slot_date === dateStr;
              return r.weekday === wd && (!r.recur_until || dateStr <= r.recur_until);
            });
            return (
              <div
                key={col}
                onClick={(e) => {
                  if (e.target !== e.currentTarget) return; // ignore clicks on blocks
                  openCreate(col, ymd, e.clientY, e.currentTarget, e.clientX);
                }}
                style={{
                  position: "relative",
                  height: GRIDH,
                  cursor: "pointer",
                  borderLeft: "0.5px solid var(--color-border-soft)",
                  borderRight: col === 6 ? "0.5px solid var(--color-border-soft)" : undefined,
                  background: `repeating-linear-gradient(#fff, #fff ${ROWH - 1}px, var(--color-border-soft) ${ROWH - 1}px, var(--color-border-soft) ${ROWH}px)`,
                }}
              >
                {dayBlocks.map((r) => (
                  <BlockBox
                    key={r.id}
                    top={(r.start_minute - START_MIN) * PX_PER_MIN}
                    height={r.duration_min * PX_PER_MIN}
                    label={minuteLabel(r.start_minute)}
                    recurring={r.kind === "recurring"}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(r, col, ymd, e.clientX, e.clientY);
                    }}
                  />
                ))}
                {editor && editor.dayCol === col && (
                  <BlockBox
                    top={(editor.startMinute - START_MIN) * PX_PER_MIN}
                    height={(editor.endMinute - editor.startMinute) * PX_PER_MIN}
                    label={minuteLabel(editor.startMinute)}
                    draft
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {editor && (
        <EditorPopover
          editor={editor}
          setEditor={setEditor}
          onSave={save}
          onDelete={remove}
          onCancel={() => setEditor(null)}
          pending={pending}
        />
      )}
    </div>
  );
}

function BlockBox({
  top,
  height,
  label,
  recurring,
  draft,
  onClick,
}: {
  top: number;
  height: number;
  label: string;
  recurring?: boolean;
  draft?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: 3,
        right: 3,
        top,
        height: Math.max(height - 2, 12),
        borderRadius: 6,
        padding: "2px 5px",
        fontSize: 10,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        background: draft ? "rgba(45,106,79,0.16)" : "#e9f1ec",
        border: draft ? "1px dashed var(--color-green)" : "0.5px solid #cfe3d7",
        color: "#2d6a4f",
        pointerEvents: draft ? "none" : "auto",
      }}
    >
      {recurring ? "↻ " : ""}
      {label}
    </div>
  );
}

function EditorPopover({
  editor,
  setEditor,
  onSave,
  onDelete,
  onCancel,
  pending,
}: {
  editor: Editor;
  setEditor: (e: Editor) => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  pending: boolean;
}) {
  const dayName = DAY_COLS[editor.dayCol];
  const showRecurControls = editor.kind === "create" ? editor.repeatMode !== "none" : editor.origKind === "recurring";

  return (
    <div
      style={{ position: "absolute", left: editor.anchor.left, top: editor.anchor.top, width: 256, zIndex: 20 }}
      className="bg-white border border-(--color-border) rounded-xl p-3 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <select
          value={editor.startMinute}
          onChange={(e) => {
            const startMinute = Number(e.target.value);
            const endMinute = Math.max(editor.endMinute, startMinute + 15);
            setEditor({ ...editor, startMinute, endMinute, error: undefined });
          }}
          className="text-[12px] rounded-md border border-(--color-border) px-1.5 py-1 bg-white"
        >
          {timeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="text-[12px] text-(--color-muted)">to</span>
        <select
          value={editor.endMinute}
          onChange={(e) => setEditor({ ...editor, endMinute: Number(e.target.value), error: undefined })}
          className="text-[12px] rounded-md border border-(--color-border) px-1.5 py-1 bg-white"
        >
          {timeOptions.filter((o) => o.value > editor.startMinute).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {editor.kind === "create" ? (
        <select
          value={editor.repeatMode}
          onChange={(e) => setEditor({ ...editor, repeatMode: e.target.value as RepeatMode })}
          className="w-full text-[12px] rounded-md border border-(--color-border) px-2 py-1.5 bg-white mb-2.5"
        >
          <option value="none">Does not repeat</option>
          <option value="weekly">Weekly on {dayName}</option>
          <option value="custom">Custom…</option>
        </select>
      ) : (
        <div className="text-[12px] text-(--color-muted) mb-2.5">
          {editor.origKind === "recurring" ? `Repeats weekly on ${dayName}` : "One-off"}
        </div>
      )}

      {editor.kind === "create" && editor.repeatMode === "custom" && (
        <div className="mb-2.5">
          <div className="text-[11px] text-(--color-muted) mb-1.5">Repeat on</div>
          <div className="flex gap-1.5">
            {CHIP_LABELS.map((lbl, wd) => {
              const on = editor.customDays.includes(wd);
              return (
                <button
                  key={wd}
                  type="button"
                  onClick={() =>
                    setEditor({
                      ...editor,
                      customDays: on ? editor.customDays.filter((d) => d !== wd) : [...editor.customDays, wd],
                    })
                  }
                  className="w-7 h-7 rounded-full text-[11px] font-semibold cursor-pointer"
                  style={{
                    background: on ? "var(--color-green)" : "#fff",
                    color: on ? "#fff" : "var(--color-muted)",
                    border: `0.5px solid ${on ? "var(--color-green)" : "var(--color-border)"}`,
                  }}
                >
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showRecurControls && (
        <label className="flex items-center gap-2 text-[12px] mb-2.5 flex-wrap">
          <input
            type="checkbox"
            checked={!!editor.endsOn}
            onChange={(e) => setEditor({ ...editor, endsOn: e.target.checked ? nextMonthDate() : "" })}
          />
          Ends on
          {editor.endsOn && (
            <input
              type="date"
              value={editor.endsOn}
              onChange={(e) => setEditor({ ...editor, endsOn: e.target.value })}
              className="text-[12px] rounded-md border border-(--color-border) px-1.5 py-1 bg-white"
            />
          )}
        </label>
      )}

      {editor.error && <div className="text-[11.5px] text-[#8a4a3f] mb-2">{editor.error}</div>}

      <div className="flex items-center gap-2">
        {editor.kind === "edit" && (
          <button onClick={onDelete} disabled={pending} className="text-[12px] font-semibold text-(--color-warn-fg) bg-(--color-warn-bg) rounded-md px-2.5 py-1.5 cursor-pointer border-none mr-auto">
            Delete
          </button>
        )}
        <button onClick={onCancel} disabled={pending} className="text-[12px] font-semibold text-(--color-muted) rounded-md px-2.5 py-1.5 cursor-pointer border-none bg-transparent ml-auto">
          Cancel
        </button>
        <button onClick={onSave} disabled={pending} className="text-[12px] font-semibold text-white bg-(--color-green) rounded-md px-3 py-1.5 cursor-pointer border-none">
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

function clampAnchor(left: number, top: number, width: number) {
  return { left: Math.max(4, Math.min(left, width - 264)), top: Math.max(4, top) };
}

function formatRange(a: Ymd, b: Ymd): string {
  const fmt = (y: number, mo: number, d: number, withMonth: boolean) =>
    new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: withMonth ? "short" : undefined, day: "numeric" }).format(
      new Date(Date.UTC(y, mo - 1, d))
    );
  const start = fmt(a.y, a.mo, a.d, true);
  const end = fmt(b.y, b.mo, b.d, a.mo !== b.mo);
  return `${start} – ${end}`;
}

function nextMonthDate(): string {
  const t = campusToday();
  const d = new Date(Date.UTC(t.y, t.mo - 1 + 1, t.d));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
