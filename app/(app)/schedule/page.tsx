import Link from "next/link";
import { getMyProfile } from "@/lib/dal";
import { getBookableInterviewers } from "@/lib/queries/scheduling";
import { BookMock } from "@/components/schedule/BookMock";

export default async function SchedulePage() {
  const me = await getMyProfile();
  const interviewers = await getBookableInterviewers(me.id);

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-serif text-[22px] font-semibold">Book a mock</h2>
          <p className="text-[13px] text-(--color-muted) leading-relaxed mt-1 max-w-md">
            Pick someone who’s posted times and grab a slot. They’ll interview you, and it confirms
            right away. Want to give mocks instead? Post your own times.
          </p>
        </div>
        <Link
          href="/availability"
          className="shrink-0 text-[13px] font-semibold text-(--color-green) bg-[#e9f1ec] rounded-lg px-3 py-2 whitespace-nowrap"
        >
          Set my availability →
        </Link>
      </div>
      <BookMock interviewers={interviewers} />
    </section>
  );
}
