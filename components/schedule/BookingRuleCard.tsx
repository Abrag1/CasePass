"use client";

import { useActionState } from "react";
import { saveBookingRule } from "@/lib/actions/availability";
import { Button } from "@/components/ui/Button";
import { Label, Textarea, FormError } from "@/components/ui/Field";
import { Card } from "@/components/ui/Card";

export function BookingRuleCard({ bookingRule }: { bookingRule: string | null }) {
  const [state, action, pending] = useActionState(saveBookingRule, undefined);
  return (
    <Card className="p-5">
      <form action={action} className="flex flex-col gap-2.5">
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
        <FormError message={state?.error} />
        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save rule"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
