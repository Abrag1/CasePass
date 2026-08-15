import { getMyProfile } from "@/lib/dal";
import { getMyAvailability } from "@/lib/queries/scheduling";
import { AvailabilityManager } from "@/components/schedule/AvailabilityManager";

export default async function AvailabilityPage() {
  const profile = await getMyProfile();
  const rows = await getMyAvailability(profile.id);

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="font-serif text-[22px] font-semibold">My availability</h2>
        <p className="text-[13px] text-(--color-muted) leading-relaxed mt-1">
          Post the times you’re free to interview. People book these directly — booking confirms
          instantly, so only add times you can commit to. All times are Eastern (ET).
        </p>
      </div>
      <AvailabilityManager bookingRule={profile.booking_rule} rows={rows} />
    </section>
  );
}
