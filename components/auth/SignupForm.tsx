"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";

// Two modes. With an invite, the email is fixed to the address the invite was issued
// to (read-only, and the server re-checks it). Without one, it's open signup for
// @cornell.edu addresses -- the server enforces the domain.
export function SignupForm({ inviteToken, email }: { inviteToken?: string; email?: string }) {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {inviteToken && <input type="hidden" name="invite" value={inviteToken} />}
      <div>
        <Label>Full name</Label>
        <Input name="fullName" required placeholder="Emily Carter" />
      </div>
      <div>
        <Label>{inviteToken ? "Email" : "Cornell email"}</Label>
        <Input
          name="email"
          type="email"
          defaultValue={email}
          readOnly={!!inviteToken}
          required
          placeholder="emily.carter@example.com"
        />
        <p className="text-[12px] text-(--color-muted) mt-1">
          {inviteToken ? `This invite is for ${email}.` : "Use your @cornell.edu address — no approval needed."}
        </p>
      </div>
      <div>
        <Label>Password</Label>
        <Input name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
      </div>
      <FormError message={state?.error} />
      <Button type="submit" disabled={pending} className="w-full mt-1">
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
