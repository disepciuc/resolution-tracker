"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { WeekProgress } from "@/lib/types";

type Props = {
  week: WeekProgress;
};

export default function DashboardActions({ week }: Props) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const markComplete = async () => {
    setLoading(true);
    await supabase
      .from("week_progress")
      .update({
        status: "completed",
        progress_percent: 100,
        updated_at: new Date().toISOString(),
      })
      .eq("id", week.id);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {week.status === "not_started" && (
        <Link className="btn-primary" href={`/week/${week.week_number}`}>
          Start
        </Link>
      )}
      {week.status !== "not_started" && (
        <Link className="btn-ghost" href={`/week/${week.week_number}`}>
          Edit
        </Link>
      )}
      {week.status === "in_progress" && (
        <button className="btn-primary" type="button" onClick={markComplete} disabled={loading}>
          Mark Complete
        </button>
      )}
    </div>
  );
}
