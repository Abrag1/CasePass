import Link from "next/link";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { SignupForm } from "@/components/auth/SignupForm";
import { checkInvite } from "@/lib/queries/invites";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const { invite } = await searchParams;
  const check = await checkInvite(invite);

  const gateMessage =
    check.status === "used"
      ? "This invite link has already been used."
      : check.status === "expired"
        ? "This invite link has expired. Ask for a new one."
        : "CasePass is invite-only. You'll need a personal invite link to create an account.";

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Logo />
          <Wordmark />
        </div>

        {check.status === "ok" ? (
          <SignupForm inviteToken={check.token} email={check.email} />
        ) : (
          <div className="rounded-xl border border-(--color-border) bg-white p-5 text-center">
            <div className="text-[15px] font-semibold mb-1.5">Invite only</div>
            <p className="text-[13px] text-(--color-muted) leading-relaxed">{gateMessage}</p>
          </div>
        )}

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
