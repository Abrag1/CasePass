"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { bookSlot } from "@/lib/actions/scheduling";
import { groupSlotsByDay, slotTimeLabel, formatSlot, type Slot } from "@/lib/scheduling";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, FormError } from "@/components/ui/Field";
import { Card } from "@/components/ui/Card";

interface Interviewer {
  id: string;
  full_name: string;
  year_tag: string | null;
  booking_rule: string | null;
  slots: Slot[];
}

export function BookMock({ interviewers }: { interviewers: Interviewer[] }) {
  const [state, action, pending] = useActionState(bookSlot, undefined);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [startISO, setStartISO] = useState<string | null>(null);
  const [locationKind, setLocationKind] = useState<"online" | "in_person">("online");
  const [ruleChecked, setRuleChecked] = useState(false);

  if (interviewers.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="text-[15px] font-semibold mb-1.5">No open times right now</div>
        <p className="text-[13px] text-(--color-muted) leading-relaxed">
          Nobody has posted availability yet. Check back soon — or{" "}
          <Link href="/availability" className="text-(--color-green) font-semibold">
            post your own times
          </Link>{" "}
          so others can book you.
        </p>
      </Card>
    );
  }

  const selected = interviewers.find((i) => i.id === selectedId) ?? null;
  const selectedSlot = selected?.slots.find((s) => s.startISO === startISO) ?? null;

  return (
    <div className="flex flex-col gap-5">
      {/* Step 1 — choose an interviewer */}
      <div className="flex flex-col gap-2">
        {interviewers.map((iv) => {
          const active = iv.id === selectedId;
          return (
            <button
              key={iv.id}
              type="button"
              onClick={() => {
                setSelectedId(iv.id);
                setStartISO(null);
                setRuleChecked(false);
              }}
              className={`text-left rounded-xl border px-4 py-3 cursor-pointer ${
                active ? "border-(--color-green) bg-[#e9f1ec]" : "border-(--color-border) bg-white hover:bg-[#f7f7f4]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-[14px]">
                  {iv.full_name}
                  {iv.year_tag ? <span className="text-(--color-muted) font-normal"> · {iv.year_tag}</span> : null}
                </div>
                <div className="text-[12px] text-(--color-muted)">{iv.slots.length} open</div>
              </div>
              {iv.booking_rule && (
                <div className="mt-1.5 text-[12px] text-[#8a5a17] bg-(--color-warn-bg) rounded-md px-2 py-1 inline-block">
                  Requires: {iv.booking_rule}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Step 2 — pick a slot */}
      {selected && (
        <Card className="p-5">
          <div className="font-semibold text-[15px] mb-3">Pick a time with {selected.full_name}</div>
          <div className="flex flex-col gap-3">
            {groupSlotsByDay(selected.slots).map((day) => (
              <div key={day.dayKey}>
                <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5">
                  {day.dayLabel}
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.slots.map((s) => {
                    const active = s.startISO === startISO;
                    return (
                      <button
                        key={s.startISO}
                        type="button"
                        onClick={() => {
                          setStartISO(s.startISO);
                          setRuleChecked(false);
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold cursor-pointer ${
                          active
                            ? "border-(--color-green) bg-(--color-green) text-white"
                            : "border-(--color-border) bg-white text-(--color-fg) hover:border-(--color-green)"
                        }`}
                      >
                        {slotTimeLabel(s.startMs)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Step 3 — confirm */}
      {selected && selectedSlot && (
        <Card className="p-5">
          <form action={action} className="flex flex-col gap-4">
            <input type="hidden" name="interviewerId" value={selected.id} />
            <input type="hidden" name="startISO" value={selectedSlot.startISO} />
            <input type="hidden" name="locationKind" value={locationKind} />

            <div className="text-[14px]">
              Booking <span className="font-semibold">{selected.full_name}</span> — {formatSlot(selectedSlot.startMs)}
            </div>

            <div>
              <Label>Session length</Label>
              <Select name="format" defaultValue="45_full">
                <option value="45_full">45 min · full case</option>
                <option value="30_short">30 min · short case</option>
                <option value="60_case_feedback">60 min · case + feedback</option>
              </Select>
            </div>

            <div>
              <Label>Where</Label>
              <div className="flex bg-[#f1f2ef] rounded-lg p-[3px] w-fit mb-2">
                {(
                  [
                    ["online", "Online (built-in video)"],
                    ["in_person", "In person"],
                  ] as const
                ).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setLocationKind(k)}
                    className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold cursor-pointer ${
                      locationKind === k ? "bg-white text-(--color-fg)" : "text-(--color-muted)"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {locationKind === "in_person" && (
                <Input name="locationNote" placeholder="Where? e.g. Library room 2C, or “we’ll message to decide”" />
              )}
            </div>

            {selected.booking_rule && (
              <label className="flex items-start gap-2.5 bg-(--color-warn-bg) border border-[#e7dcc0] rounded-lg px-3 py-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="ruleAck"
                  checked={ruleChecked}
                  onChange={(e) => setRuleChecked(e.target.checked)}
                  className="mt-0.5"
                />
                <span className="text-[13px] text-[#5c4413] leading-relaxed">
                  <span className="font-semibold">{selected.full_name} requires:</span> {selected.booking_rule}
                  <span className="block mt-0.5">I confirm I’ve done this.</span>
                </span>
              </label>
            )}

            <FormError message={state?.error} />

            <div className="flex justify-end">
              <Button type="submit" disabled={pending || (!!selected.booking_rule && !ruleChecked)}>
                {pending ? "Booking…" : "Confirm booking"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
