"use client";

import Link from "next/link";
import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/lib/actions/auth";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label, FormError } from "@/components/ui/Field";
import { safeNext } from "@/lib/validation/auth";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const params = useSearchParams();
  const justSignedUp = params.get("confirm") === "1";
  const next = safeNext(params.get("next"), "");
  const nextQuery = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Logo />
          <Wordmark />
        </div>

        {justSignedUp && (
          <p className="mb-4 text-sm bg-[#f3f6f4] border border-[#e1ebe5] text-[#2d6a4f] rounded-lg px-3 py-2">
            Account created — check your email to confirm it, then log in below.
          </p>
        )}

        <form action={action} className="flex flex-col gap-4">
          {next && <input type="hidden" name="next" value={next} />}
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required autoFocus autoComplete="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
          </div>
          <FormError message={state?.error} />
          <Button type="submit" disabled={pending} className="w-full mt-1">
            {pending ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="text-sm text-(--color-muted) text-center mt-6">
          New to CasePass?{" "}
          <Link href={`/signup${nextQuery}`} className="text-(--color-green) font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
