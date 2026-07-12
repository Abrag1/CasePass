import { getMyProfile } from "@/lib/dal";
import { searchPartners } from "@/lib/queries/sessions";
import { ScheduleForm } from "@/components/schedule/ScheduleForm";
import { Card } from "@/components/ui/Card";

export default async function SchedulePage() {
  const profile = await getMyProfile();
  const partners = await searchPartners("", profile.id);

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <Card className="p-7">
        <ScheduleForm partners={partners} />
      </Card>
    </section>
  );
}
