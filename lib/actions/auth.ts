"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkInvite, type InviteCheck } from "@/lib/queries/invites";
import { loginSchema, signupSchema } from "@/lib/validation/auth";

function inviteErrorMessage(status: Exclude<InviteCheck["status"], "ok">): string {
  switch (status) {
    case "used":
      return "This invite link has already been used.";
    case "expired":
      return "This invite link has expired. Ask for a new one.";
    default:
      return "This signup link isn't valid. CasePass is invite-only.";
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

  redirect("/home");
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

  // Invite gate: signup requires a valid, unused, unexpired link, and the email
  // must match the one the invite was issued to (that's what makes it non-transferable).
  const token = String(formData.get("invite") ?? "");
  const invite = await checkInvite(token);
  if (invite.status !== "ok") {
    return { error: inviteErrorMessage(invite.status) };
  }
  if (invite.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
    return { error: `This invite is for ${invite.email} — sign up with that email address.` };
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
  const admin = createAdminClient();
  await admin
    .from("invites")
    .update({ used_at: new Date().toISOString(), used_by: data.user?.id ?? null })
    .eq("token", token)
    .is("used_at", null);

  if (!data.session) {
    // Email confirmation is required by the Supabase project's auth settings.
    redirect("/login?confirm=1");
  }

  redirect("/home");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
