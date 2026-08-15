"use server";

import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getMyProfile } from "@/lib/dal";
import { createAdminClient } from "@/lib/supabase/admin";

const INVITE_TTL_MS = 2 * 24 * 60 * 60 * 1000; // 2 days

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email");

export type CreateInviteState = { error?: string; link?: string; email?: string } | undefined;

// Admin-only: mint a single-use, email-bound invite link that expires in 2 days.
export async function createInvite(_prev: CreateInviteState, formData: FormData): Promise<CreateInviteState> {
  const profile = await getMyProfile();
  if (!profile.is_admin) return { error: "You're not allowed to create invites." };

  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Enter a valid email" };
  const email = parsed.data;

  const admin = createAdminClient();

  // If they already have an account, an invite is pointless -- they can just log in.
  const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  if (existing) return { error: "That email already has an account — they can just log in." };

  const token = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITE_TTL_MS).toISOString();

  const { error } = await admin.from("invites").insert({
    token,
    email,
    created_by: profile.id,
    expires_at: expiresAt,
  });
  if (error) return { error: error.message };

  // Build the link from the current request's origin so it works in any environment.
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const link = `${proto}://${host}/signup?invite=${token}`;

  revalidatePath("/invite");
  return { link, email };
}

// Admin-only: kill a pending invite before it's used.
export async function revokeInvite(id: string) {
  const profile = await getMyProfile();
  if (!profile.is_admin) return;
  const admin = createAdminClient();
  await admin.from("invites").delete().eq("id", id).is("used_at", null);
  revalidatePath("/invite");
}
