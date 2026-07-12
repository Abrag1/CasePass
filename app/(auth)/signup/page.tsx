"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Logo />
          <Wordmark />
        </div>

        <form action={action} className="flex flex-col gap-4">
          <div>
            <Label>Full name</Label>
            <Input name="fullName" required placeholder="Jordan Liu" />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required placeholder="you@example.com" />
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

        <p className="text-sm text-(--color-muted) text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-(--color-green) font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
