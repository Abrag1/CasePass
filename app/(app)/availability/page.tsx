import { getMyProfile } from "@/lib/dal";
import { getMyAvailability } from "@/lib/queries/scheduling";
import { AvailabilityCalendar } from "@/components/schedule/AvailabilityCalendar";
import { BookingRuleButton } from "@/components/schedule/BookingRuleButton";

export default async function AvailabilityPage() {
  const profile = await getMyProfile();
  const rows = await getMyAvailability(profile.id);

  return (
    <section className="p-7 max-w-5xl mx-auto">
      <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-serif text-[22px] font-semibold">My availability</h2>
          <p className="text-[13px] text-(--color-muted) leading-relaxed mt-1 max-w-xl">
            Click a time on the calendar to post when you’re free to interview. Blocks confirm bookings
            instantly, so only add times you can commit to. Click a block to edit or remove it.
          </p>
        </div>
        <BookingRuleButton bookingRule={profile.booking_rule} />
      </div>

      <AvailabilityCalendar rows={rows} />
    </section>
  );
}
