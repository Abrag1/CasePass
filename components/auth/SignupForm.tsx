"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";

// Rendered only when a valid invite is present. The email is fixed to the address
// the invite was issued to -- it's shown read-only so the person knows which account
// they're creating, and the server re-checks it regardless.
export function SignupForm({ inviteToken, email }: { inviteToken: string; email: string }) {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="invite" value={inviteToken} />
      <div>
        <Label>Full name</Label>
        <Input name="fullName" required placeholder="Jordan Liu" />
      </div>
      <div>
        <Label>Email</Label>
        <Input name="email" type="email" defaultValue={email} readOnly required />
        <p className="text-[12px] text-(--color-muted) mt-1">This invite is for {email}.</p>
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
