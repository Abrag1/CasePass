"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkInvite, type InviteCheck } from "@/lib/queries/invites";
import { loginSchema, signupSchema, isOpenSignupEmail, safeNext } from "@/lib/validation/auth";

function inviteErrorMessage(status: Exclude<InviteCheck["status"], "ok">): string {
  switch (status) {
    case "used":
      return "This invite link has already been used.";
    case "expired":
      return "This invite link has expired. Ask for a new one.";
    default:
      return "This signup link isn't valid. Sign up with your @cornell.edu email instead.";
  }
}

export type AuthActionState = { error?: string } | undefined;

export async function login(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: error.message };
  }

  redirect(safeNext(formData.get("next")));
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Access gate: either an open-domain email (e.g. @cornell.edu, no approval
  // needed), or a valid, unused, unexpired invite link whose email matches
  // (that's what makes an invite non-transferable).
  const token = String(formData.get("invite") ?? "");
  const openDomain = isOpenSignupEmail(parsed.data.email);
  if (token) {
    const invite = await checkInvite(token);
    if (invite.status !== "ok") {
      return { error: inviteErrorMessage(invite.status) };
    }
    if (invite.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
      return { error: `This invite is for ${invite.email} — sign up with that email address.` };
    }
  } else if (!openDomain) {
    return { error: "Please use your @cornell.edu email." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName } },
  });
  if (error) {
    return { error: error.message };
  }

  // Consume the invite so the link can't be reused. Conditional on used_at being
  // null guards against a double-submit racing two signups onto one link.
  if (token) {
    const admin = createAdminClient();
    await admin
      .from("invites")
      .update({ used_at: new Date().toISOString(), used_by: data.user?.id ?? null })
      .eq("token", token)
      .is("used_at", null);
  }

  if (!data.session) {
    // Email confirmation is required by the Supabase project's auth settings.
    const next = safeNext(formData.get("next"), "");
    redirect(next ? `/login?confirm=1&next=${encodeURIComponent(next)}` : "/login?confirm=1");
  }

  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
