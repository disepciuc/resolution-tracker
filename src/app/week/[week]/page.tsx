import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import WeekDetailClient from "@/components/WeekDetailClient";
import type { WeekProgress } from "@/lib/types";

type Params = {
  params: Promise<{ week: string }>;
};

export default async function WeekDetailPage({ params }: Params) {
  const resolved = await params;
  const weekNumber = Number(resolved.week);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: week, error } = await supabase
    .from("week_progress")
    .select("*")
    .eq("week_number", weekNumber)
    .eq("user_id", user.id)
    .single();

  if (!week || error) {
    const service = createSupabaseServiceClient();
    const { data: existing } = await service
      .from("week_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("week_number", weekNumber)
      .single();

    if (!existing) {
      await service.from("week_progress").insert({
        user_id: user.id,
        week_number: weekNumber,
        status: "not_started",
        progress_percent: 0,
        notes: "",
        time_spent_minutes: 0,
        energy: "steady",
      });
    }

    const { data: created } = await service
      .from("week_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("week_number", weekNumber)
      .single();

    if (!created) {
      return (
        <div className="shell">
          <div className="panel p-8">
            <h1 className="text-2xl font-bold">We couldn’t load Week {weekNumber}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              The data row for this week was not created. Please refresh or try again.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="shell">
        <WeekDetailClient week={created as WeekProgress} />
      </div>
    );
  }

  return (
    <div className="shell">
      <WeekDetailClient week={week as WeekProgress} />
    </div>
  );
}
