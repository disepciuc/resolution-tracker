"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { WeekProgress, EnergyLevel, WeekStatus } from "@/lib/types";
import { weekDescriptions } from "@/lib/weekContent";

type Props = {
  week: WeekProgress;
};

export default function WeekDetailClient({ week }: Props) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [notes, setNotes] = useState(week.notes ?? "");
  const [timeSpent, setTimeSpent] = useState(week.time_spent_minutes);
  const [progress, setProgress] = useState(week.progress_percent);
  const [energy, setEnergy] = useState<EnergyLevel>(week.energy ?? "steady");
  const [saving, setSaving] = useState(false);
  const isCompleted = week.status === "completed";

  const deriveStatus = (value: number): WeekStatus => {
    if (week.status === "completed") return "completed";
    if (value > 0) return "in_progress";
    return "not_started";
  };

  const save = async () => {
    setSaving(true);
    const status = deriveStatus(progress);
    await supabase
      .from("week_progress")
      .update({
        notes,
        time_spent_minutes: timeSpent,
        progress_percent: progress,
        status,
        energy,
        updated_at: new Date().toISOString(),
      })
      .eq("id", week.id);
    setSaving(false);
    router.push("/");
    router.refresh();
  };

  const markComplete = async () => {
    setProgress(100);
    setSaving(true);
    await supabase
      .from("week_progress")
      .update({
        progress_percent: 100,
        status: "completed",
        energy,
        notes,
        time_spent_minutes: timeSpent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", week.id);
    setSaving(false);
    router.push("/");
    router.refresh();
  };

  const reopenWeek = async () => {
    setSaving(true);
    const nextProgress = 25;
    await supabase
      .from("week_progress")
      .update({
        progress_percent: nextProgress,
        status: "in_progress",
        updated_at: new Date().toISOString(),
      })
      .eq("id", week.id);
    setProgress(nextProgress);
    setSaving(false);
    router.refresh();
  };

  const weekDescription =
    weekDescriptions[week.week_number - 1] ?? "Keep building momentum with focused weekly practice.";

  return (
    <div className="panel p-6 detail-panel">
      <div className="panel app-bar mobile-only mb-4">
        <div className="app-bar-row">
          <Link className="btn-ghost app-bar-back" href="/">
            ← Back
          </Link>
          <div className="text-sm font-semibold text-[var(--muted)]">Week {week.week_number}</div>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Week {week.week_number}
          </p>
          <h1 className="text-3xl font-bold">Build your momentum</h1>
          <p className="text-sm text-[var(--muted)]">{weekDescription}</p>
        </div>
        <div className="flex gap-2 desktop-only">
          {isCompleted ? (
            <button className="btn-warning" onClick={reopenWeek} disabled={saving}>
              Reopen
            </button>
          ) : (
            <button className="btn-success" onClick={markComplete} disabled={saving}>
              Mark complete
            </button>
          )}
          <button className="btn-secondary" onClick={save} disabled={saving || isCompleted}>
            Save update
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label
            className="text-sm font-semibold text-[var(--muted)]"
            htmlFor="week-notes"
          >
            Notes
          </label>
          <textarea
            className="input-field mt-2 w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
            id="week-notes"
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="What went well? What blocked you?"
            disabled={isCompleted}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              className="text-sm font-semibold text-[var(--muted)]"
              htmlFor="week-time-spent"
            >
              Time spent (minutes)
            </label>
            <div className="mt-2 grid gap-2">
              <div className="chip-row">
                {[15, 30, 60, 90].map((minutes) => (
                  <button
                    key={minutes}
                    className={minutes === timeSpent ? "btn-primary" : "btn-ghost"}
                    type="button"
                    onClick={() => setTimeSpent(minutes)}
                    disabled={isCompleted}
                  >
                    {minutes}m
                  </button>
                ))}
              </div>
              <input
                className="input-field w-full rounded-2xl border border-[rgba(138,127,176,0.2)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-inset)]"
                id="week-time-spent"
                type="number"
                min={0}
                step={15}
                value={timeSpent}
                onChange={(event) => setTimeSpent(Number(event.target.value))}
                disabled={isCompleted}
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label
                className="text-sm font-semibold text-[var(--muted)]"
                htmlFor="week-progress"
              >
                Progress
              </label>
              <div className="relative mt-2">
                <input
                  className="range"
                  id="week-progress"
                  type="range"
                  min={0}
                  max={100}
                  step={25}
                  value={progress}
                  onChange={(event) => setProgress(Number(event.target.value))}
                  style={{
                    background: `linear-gradient(90deg, var(--accent-2) ${progress}%, #e7e1f3 ${progress}%)`,
                  }}
                  disabled={isCompleted}
                />
                <div className="absolute -top-7 right-0 text-sm font-bold">{progress}%</div>
              </div>
              <div className="chip-row mt-3">
                {[0, 25, 50, 75, 100].map((value) => (
                  <button
                    key={value}
                    className={value === progress ? "btn-primary" : "btn-ghost"}
                    type="button"
                    onClick={() => setProgress(value)}
                    disabled={isCompleted}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[var(--muted)]">Energy</label>
              <div className="mt-2 segmented">
                {(["low", "steady", "high"] as EnergyLevel[]).map((level) => (
                  <button
                    key={level}
                    className={level === energy ? "btn-primary" : "btn-ghost"}
                    type="button"
                    onClick={() => setEnergy(level)}
                    disabled={isCompleted}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-actions">
        {isCompleted ? (
          <button className="btn-warning" onClick={reopenWeek} disabled={saving}>
            Reopen
          </button>
        ) : (
          <button className="btn-success" onClick={markComplete} disabled={saving}>
            Mark complete
          </button>
        )}
        <button className="btn-secondary" onClick={save} disabled={saving || isCompleted}>
          Save update
        </button>
      </div>
    </div>
  );
}
