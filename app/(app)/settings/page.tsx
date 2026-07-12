import { getMyProfile } from "@/lib/dal";
import { getMyPrivacySettings } from "@/lib/queries/profile";
import { togglePrivacySetting, type PrivacyKey } from "@/lib/actions/privacy";
import { Card } from "@/components/ui/Card";

export default async function SettingsPage() {
  const profile = await getMyProfile();
  const privacy = await getMyPrivacySettings(profile.id);

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <h2 className="font-serif text-[23px] font-semibold mb-1">Settings</h2>
      <p className="text-[13px] text-(--color-muted) mb-6">
        Control what your practice partners can see about you.
      </p>

      {privacy && (
        <Card className="p-5">
          <div className="font-semibold text-[15px]">Privacy controls</div>
          <p className="text-[12.5px] text-(--color-muted) my-1 mb-3.5">
            These apply whenever an interviewer views your profile before a mock. You can also share
            a note for a specific mock from that mock&apos;s preview page — that&apos;s always your call,
            one session at a time.
          </p>
          <PrivacyRow k="share_full_history" label="Share full case history" desc="Cases completed, types, and source books" on={privacy.share_full_history} />
          <PrivacyRow k="share_past_feedback" label="Share past feedback" desc="Previous interviewers' written feedback" on={privacy.share_past_feedback} />
          <PrivacyRow k="share_weak_areas" label="Share weak areas" desc="Skill ratings flagged as needing work" on={privacy.share_weak_areas} />
          <PrivacyRow k="allow_interviewer_notes_back" label="Allow interviewer notes back" desc="Let an interviewer leave notes on your profile" on={privacy.allow_interviewer_notes_back} />
        </Card>
      )}
    </section>
  );
}

function PrivacyRow({ k, label, desc, on }: { k: PrivacyKey; label: string; desc: string; on: boolean }) {
  return (
    <form
      action={async () => {
        "use server";
        await togglePrivacySetting(k);
      }}
      className="flex items-center justify-between gap-4 py-2.5 border-t border-(--color-border-soft) first:border-t-0"
    >
      <div>
        <div className="text-[14px] font-medium">{label}</div>
        <div className="text-[12px] text-(--color-muted) mt-0.5">{desc}</div>
      </div>
      <button
        type="submit"
        className="w-11 h-[25px] rounded-full border-none cursor-pointer relative shrink-0"
        style={{ background: on ? "#2d6a4f" : "#cfd2cc" }}
      >
        <span
          className="absolute top-[3px] w-[19px] h-[19px] rounded-full bg-white shadow"
          style={{ left: on ? "22px" : "3px" }}
        />
      </button>
    </form>
  );
}
