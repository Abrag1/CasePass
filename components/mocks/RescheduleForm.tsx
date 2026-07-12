"use client";

import { useActionState } from "react";
import { rescheduleSession } from "@/lib/actions/sessions";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";

export function RescheduleForm({
  sessionId,
  defaultDate,
  defaultTime,
}: {
  sessionId: string;
  defaultDate: string;
  defaultTime: string;
}) {
  const [state, action, pending] = useActionState(rescheduleSession, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="sessionId" value={sessionId} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>New date</Label>
          <Input type="date" name="date" required defaultValue={defaultDate} />
        </div>
        <div>
          <Label>New time</Label>
          <Input type="time" name="time" required defaultValue={defaultTime} />
        </div>
      </div>
      <FormError message={state?.error} />
      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Propose new time"}
        </Button>
      </div>
    </form>
  );
}
