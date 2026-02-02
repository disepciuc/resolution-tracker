import type { WeekProgress } from "./types";

export function overallProgress(weeks: WeekProgress[]): number {
  if (!weeks.length) return 0;
  const total = weeks.reduce((sum, week) => {
    if (week.status === "completed") return sum + 100;
    if (week.status === "in_progress") return sum + week.progress_percent;
    return sum;
  }, 0);
  return Math.round(total / weeks.length);
}

export function nextWeekNumber(weeks: WeekProgress[]): number | null {
  const next = weeks.find((week) => week.status !== "completed");
  return next ? next.week_number : null;
}
