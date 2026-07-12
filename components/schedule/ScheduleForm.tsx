"use client";

import { useActionState, useState } from "react";
import { scheduleSession } from "@/lib/actions/sessions";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea, FormError } from "@/components/ui/Field";

interface Partner {
  id: string;
  full_name: string;
  email: string;
}

export function ScheduleForm({ partners }: { partners: Partner[] }) {
  const [state, action, pending] = useActionState(scheduleSession, undefined);
  const [myRole, setMyRole] = useState<"interviewer" | "interviewee">("interviewer");
  const [meetingKind, setMeetingKind] = useState<"builtin" | "custom">("builtin");

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-[22px] font-semibold mb-1.5">Schedule a mock</h2>
        <p className="text-[13px] text-(--color-muted) leading-relaxed">
          Pick who you&apos;re practicing with, your role for this mock, and a time.
        </p>
      </div>

      <div>
        <Label>Your role for this mock</Label>
        <div className="flex bg-[#f1f2ef] rounded-lg p-[3px] w-fit">
          {(["interviewer", "interviewee"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMyRole(r)}
              className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold cursor-pointer ${
                myRole === r ? "bg-white text-(--color-fg)" : "text-(--color-muted)"
              }`}
            >
              {r === "interviewer" ? "Interviewer" : "Interviewee"}
            </button>
          ))}
        </div>
        <input type="hidden" name="myRole" value={myRole} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label>{myRole === "interviewer" ? "Interviewee" : "Interviewer"}</Label>
          {partners.length === 0 ? (
            <p className="text-sm text-(--color-muted)">
              No other CasePass accounts yet — invite a partner to sign up first.
            </p>
          ) : (
            <Select name="partnerId" required defaultValue="">
              <option value="" disabled>
                Choose a partner
              </option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name} ({p.email})
                </option>
              ))}
            </Select>
          )}
        </div>
        <div>
          <Label>Format</Label>
          <Select name="format" defaultValue="45_full">
            <option value="45_full">45 min · full case</option>
            <option value="30_short">30 min · short case</option>
            <option value="60_case_feedback">60 min · case + feedback</option>
          </Select>
        </div>
        <div />
        <div>
          <Label>Date</Label>
          <Input type="date" name="date" required />
        </div>
        <div>
          <Label>Time</Label>
          <Input type="time" name="time" required />
        </div>
      </div>

      <div>
        <Label>Where you&apos;ll meet</Label>
        <div className="flex bg-[#f1f2ef] rounded-lg p-[3px] w-fit mb-2">
          {(
            [
              ["builtin", "CasePass video (built-in)"],
              ["custom", "My own link (Zoom, Meet…)"],
            ] as const
          ).map(([kind, label]) => (
            <button
              key={kind}
              type="button"
              onClick={() => setMeetingKind(kind)}
              className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold cursor-pointer ${
                meetingKind === kind ? "bg-white text-(--color-fg)" : "text-(--color-muted)"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" name="meetingKind" value={meetingKind} />
        {meetingKind === "builtin" ? (
          <p className="text-[12.5px] text-(--color-muted) leading-relaxed">
            A private video room is created automatically and embedded right in the live mock —
            nothing to install or set up.
          </p>
        ) : (
          <Input name="meetingLink" type="url" placeholder="https://zoom.us/j/… or https://meet.google.com/…" required />
        )}
      </div>

      <div>
        <Label>Notes (optional)</Label>
        <Textarea name="notes" rows={3} placeholder="e.g. would like an operations case, exhibit-heavy" />
      </div>

      <FormError message={state?.error} />

      <div className="flex justify-end">
        <Button type="submit" disabled={pending || partners.length === 0}>
          {pending ? "Scheduling…" : "Send request"}
        </Button>
      </div>
    </form>
  );
}
