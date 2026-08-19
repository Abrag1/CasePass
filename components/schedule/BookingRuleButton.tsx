"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBookingRule } from "@/lib/actions/availability";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";

// The booking rule is optional and rarely changed, so it lives behind a button
// (top of the page) that opens a small modal — not a card taking up permanent space.
export function BookingRuleButton({ bookingRule }: { bookingRule: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(bookingRule ?? "");
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function openModal() {
    setValue(bookingRule ?? "");
    setError(undefined);
    setOpen(true);
  }

  function save() {
    startTransition(async () => {
      const res = await updateBookingRule(value);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={openModal}
        className="shrink-0 text-[13px] font-semibold rounded-lg px-3 py-2 cursor-pointer border whitespace-nowrap"
        style={
          bookingRule
            ? { background: "#e9f1ec", color: "var(--color-green)", borderColor: "#cfe3d7" }
            : { background: "#fff", color: "var(--color-fg)", borderColor: "var(--color-border)" }
        }
      >
        {bookingRule ? "Booking rule ✓" : "+ Booking rule"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,.35)" }}
          onClick={() => setOpen(false)}
        >
          <div className="bg-white rounded-xl p-5 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="font-semibold text-[15px] mb-1">Booking rule</div>
            <p className="text-[12.5px] text-(--color-muted) leading-relaxed mb-3">
              A requirement people must confirm before they can book you — e.g. “Send me a background email
              first” or “Have a coffee chat with me first.” Leave blank for no requirement.
            </p>
            <Textarea
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. Send me a short background email before booking"
            />
            {error && <div className="text-[12px] text-[#8a4a3f] mt-1.5">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="text-[13px] font-semibold text-(--color-muted) rounded-lg px-3 py-2 cursor-pointer bg-transparent border-none"
              >
                Cancel
              </button>
              <Button onClick={save} disabled={pending}>
                {pending ? "Saving…" : "Save rule"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
