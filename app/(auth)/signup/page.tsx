import Link from "next/link";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { SignupForm } from "@/components/auth/SignupForm";
import { checkInvite } from "@/lib/queries/invites";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const { invite } = await searchParams;
  const check = await checkInvite(invite);

  // A bad invite link gets an explanation above the form; the open @cornell.edu
  // signup stays available either way.
  const badInvite = check.status === "used" || check.status === "expired";
  const gateMessage =
    check.status === "used"
      ? "This invite link has already been used."
      : "This invite link has expired. Ask for a new one.";

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Logo />
          <Wordmark />
        </div>

        {badInvite && (
          <p className="mb-4 text-[13px] bg-(--color-warn-bg) text-[#8a5a17] rounded-lg px-3 py-2">
            {gateMessage} You can still sign up with your @cornell.edu email below.
          </p>
        )}
        {check.status === "ok" ? (
          <SignupForm inviteToken={check.token} email={check.email} />
        ) : (
          <SignupForm />
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
