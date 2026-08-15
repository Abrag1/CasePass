"use client";

import { useActionState, useState } from "react";
import { createInvite, revokeInvite, type CreateInviteState } from "@/lib/actions/invites";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";
import { Card, Badge } from "@/components/ui/Card";

interface InviteItem {
  id: string;
  token: string;
  email: string;
  status: "pending" | "used" | "expired";
  expires_at: string;
}

function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(link);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked -- the link is still selectable in the field */
        }
      }}
      className="border-none rounded-md px-2.5 py-1.5 text-[12px] font-semibold cursor-pointer bg-[#e9f1ec] text-(--color-green) whitespace-nowrap"
    >
      {copied ? "Copied ✓" : "Copy link"}
    </button>
  );
}

export function InviteAdmin({ invites }: { invites: InviteItem[] }) {
  const [state, action, pending] = useActionState<CreateInviteState, FormData>(createInvite, undefined);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const linkFor = (token: string) => `${origin}/signup?invite=${token}`;

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <form action={action} className="flex flex-col gap-3">
          <div>
            <Label>Their email</Label>
            <Input name="email" type="email" required placeholder="person@school.edu" />
          </div>
          <FormError message={state?.error} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "Generating…" : "Generate invite link"}
            </Button>
          </div>
        </form>

        {state?.link && (
          <div className="mt-4 rounded-lg bg-[#f3f6f4] border border-[#e1ebe5] p-3.5">
            <div className="text-[12px] font-semibold text-(--color-green) mb-2">
              Invite link for {state.email} — copy it and send it to them:
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={state.link}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 min-w-0 text-[12.5px] bg-white border border-(--color-border) rounded-md px-2.5 py-1.5"
              />
              <CopyLinkButton link={state.link} />
            </div>
            <p className="text-[11.5px] text-(--color-muted) mt-2">
              Works once, only for {state.email}, and expires in 2 days.
            </p>
          </div>
        )}
      </Card>

      <div>
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-2">
          Invites ({invites.length})
        </div>
        {invites.length === 0 ? (
          <p className="text-[13px] text-(--color-muted)">No invites yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {invites.map((inv) => (
              <Card key={inv.id} className="px-4 py-3 flex items-center gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-medium truncate">{inv.email}</div>
                  <div className="text-[11.5px] text-(--color-muted)">
                    {inv.status === "pending"
                      ? `Expires ${new Date(inv.expires_at).toLocaleString()}`
                      : inv.status === "used"
                        ? "Signed up ✓"
                        : "Expired"}
                  </div>
                </div>
                <Badge tone={inv.status === "used" ? "green" : inv.status === "pending" ? "navy" : "warn"}>
                  {inv.status === "used" ? "Used" : inv.status === "pending" ? "Pending" : "Expired"}
                </Badge>
                {inv.status === "pending" && (
                  <>
                    <CopyLinkButton link={linkFor(inv.token)} />
                    <form action={revokeInvite.bind(null, inv.id)}>
                      <button className="border-none rounded-md px-2.5 py-1.5 text-[12px] font-semibold cursor-pointer bg-[#f7efdd] text-(--color-warn-fg) whitespace-nowrap">
                        Revoke
                      </button>
                    </form>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
