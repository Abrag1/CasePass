import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/dal";
import { listInvites } from "@/lib/queries/invites";
import { InviteAdmin } from "@/components/invite/InviteAdmin";

export default async function InvitePage() {
  const profile = await getMyProfile();
  if (!profile.is_admin) redirect("/home");

  const invites = await listInvites();

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="font-serif text-[22px] font-semibold">Invite people</h2>
        <p className="text-[13px] text-(--color-muted) leading-relaxed mt-1">
          Generate a personal link for someone. It only works for the email you enter, can be used
          once, and expires in 2 days. Copy it and send it to them yourself.
        </p>
      </div>
      <InviteAdmin
        invites={invites.map((i) => ({
          id: i.id,
          token: i.token,
          email: i.email,
          status: i.computed_status,
          expires_at: i.expires_at,
        }))}
      />
    </section>
  );
}
