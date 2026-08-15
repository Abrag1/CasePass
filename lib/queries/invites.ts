import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/types";

type InviteRow = Database["public"]["Tables"]["invites"]["Row"];

export type InviteCheck =
  | { status: "ok"; email: string; token: string }
  | { status: "invalid" }
  | { status: "used" }
  | { status: "expired" };

// Validate a signup token. Runs pre-auth, so it uses the service-role client
// (the invites table is otherwise unreadable). Never trust the token beyond what
// this returns.
export async function checkInvite(token: string | undefined | null): Promise<InviteCheck> {
  if (!token) return { status: "invalid" };
  const admin = createAdminClient();
  const { data } = await admin.from("invites").select("*").eq("token", token).maybeSingle();
  if (!data) return { status: "invalid" };
  if (data.used_at) return { status: "used" };
  if (new Date(data.expires_at).getTime() < Date.now()) return { status: "expired" };
  return { status: "ok", email: data.email, token: data.token };
}

export type InviteWithStatus = InviteRow & { computed_status: "pending" | "used" | "expired" };

export async function listInvites(): Promise<InviteWithStatus[]> {
  const admin = createAdminClient();
  const { data } = await admin.from("invites").select("*").order("created_at", { ascending: false });
  const now = Date.now();
  return (data ?? []).map((inv) => ({
    ...inv,
    computed_status: inv.used_at
      ? "used"
      : new Date(inv.expires_at).getTime() < now
        ? "expired"
        : "pending",
  }));
}
