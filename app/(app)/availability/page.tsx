import { getMyProfile } from "@/lib/dal";
import { getMyAvailability } from "@/lib/queries/scheduling";
import { AvailabilityCalendar } from "@/components/schedule/AvailabilityCalendar";
import { BookingRuleCard } from "@/components/schedule/BookingRuleCard";

export default async function AvailabilityPage() {
  const profile = await getMyProfile();
  const rows = await getMyAvailability(profile.id);

  return (
    <section className="p-7 max-w-3xl mx-auto">
      <div className="mb-5">
        <h2 className="font-serif text-[22px] font-semibold">My availability</h2>
        <p className="text-[13px] text-(--color-muted) leading-relaxed mt-1">
          Click a time on the calendar to post when you’re free to interview. Blocks confirm bookings
          instantly, so only add times you can commit to. Click a block to edit or remove it.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <AvailabilityCalendar rows={rows} />
        <BookingRuleCard bookingRule={profile.booking_rule} />
      </div>
    </section>
  );
}
