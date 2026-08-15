"use client";

import { useActionState, useState } from "react";
import { addAvailability, deleteAvailability, saveBookingRule } from "@/lib/actions/availability";
import { describeAvailabilityRow, WEEKDAYS, type AvailabilityRow } from "@/lib/scheduling";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea, FormError } from "@/components/ui/Field";
import { Card } from "@/components/ui/Card";

export function AvailabilityManager({ bookingRule, rows }: { bookingRule: string | null; rows: AvailabilityRow[] }) {
  const [ruleState, ruleAction, rulePending] = useActionState(saveBookingRule, undefined);
  const [addState, addAction, addPending] = useActionState(addAvailability, undefined);
  const [kind, setKind] = useState<"one_off" | "recurring">("one_off");

  return (
    <div className="flex flex-col gap-6">
      {/* Booking rule */}
      <Card className="p-5">
        <form action={ruleAction} className="flex flex-col gap-2.5">
          <div>
            <Label>Your booking rule (optional)</Label>
            <p className="text-[12.5px] text-(--color-muted) mb-2 leading-relaxed">
              A requirement people must confirm before they can book you — e.g. “Send me a background email
              first” or “Have a coffee chat with me first.” Leave blank for no requirement.
            </p>
            <Textarea
              name="booking_rule"
              rows={2}
              defaultValue={bookingRule ?? ""}
              placeholder="e.g. Send me a short background email before booking"
            />
          </div>
          <FormError message={ruleState?.error} />
          <div className="flex justify-end">
            <Button type="submit" disabled={rulePending}>
              {rulePending ? "Saving…" : "Save rule"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Add availability */}
      <Card className="p-5">
        <div className="font-semibold text-[15px] mb-3">Add a time</div>
        <form action={addAction} className="flex flex-col gap-3">
          <input type="hidden" name="kind" value={kind} />
          <div className="flex bg-[#f1f2ef] rounded-lg p-[3px] w-fit">
            {(
              [
                ["one_off", "Specific date"],
                ["recurring", "Every week"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold cursor-pointer ${
                  kind === k ? "bg-white text-(--color-fg)" : "text-(--color-muted)"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {kind === "one_off" ? (
              <div>
                <Label>Date</Label>
                <Input type="date" name="date" required />
              </div>
            ) : (
              <div>
                <Label>Weekday</Label>
                <Select name="weekday" defaultValue="2">
                  {WEEKDAYS.map((w, i) => (
                    <option key={w} value={i}>
                      {w}
                    </option>
                  ))}
                </Select>
              </div>
            )}
            <div>
              <Label>Start time (ET)</Label>
              <Input type="time" name="time" required defaultValue="16:00" />
            </div>
            <div>
              <Label>Length</Label>
              <Select name="duration" defaultValue="45">
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </Select>
            </div>
          </div>

          <FormError message={addState?.error} />
          <div className="flex justify-end">
            <Button type="submit" disabled={addPending}>
              {addPending ? "Adding…" : "Add time"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Existing entries */}
      <div>
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-2">
          Your posted times ({rows.length})
        </div>
        {rows.length === 0 ? (
          <p className="text-[13px] text-(--color-muted)">
            No times yet. Add a specific date or a weekly recurring time above.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <Card key={row.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="text-[13.5px]">{describeAvailabilityRow(row)}</div>
                <form action={deleteAvailability.bind(null, row.id)}>
                  <button className="border-none rounded-md px-2.5 py-1.5 text-[12px] font-semibold cursor-pointer bg-[#f7efdd] text-(--color-warn-fg)">
                    Remove
                  </button>
                </form>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
