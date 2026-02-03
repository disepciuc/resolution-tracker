import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { overallProgress, nextWeekNumber } from "@/lib/progress";
import { minutesToHours } from "@/lib/format";
import type { WeekProgress } from "@/lib/types";
import DashboardActions from "@/components/DashboardActions";
import LogoutButton from "@/components/LogoutButton";

const weekTitles = [
  "Resolution Tracker",
  "Model Mapping",
  "Deep Research",
  "Data Analyst",
  "Visual Reasoning",
  "Information Pipelines",
  "Automation: Distribution",
  "Automation: Productivity",
  "Context Engineering",
  "Build an AI App",
];

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const previewWeeks: WeekProgress[] = Array.from({ length: 10 }, (_, index) => ({
      id: `${index + 1}`,
      user_id: "preview",
      week_number: index + 1,
      status: "not_started",
      progress_percent: 0,
      notes: "",
      time_spent_minutes: 0,
      energy: "steady",
      updated_at: new Date().toISOString(),
    }));

    return (
      <div className="shell">
        <header>
          <div className="panel app-bar mobile-only">
            <div className="app-bar-row">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] font-bold text-white">
                  RT
                </div>
                <div>
                  <div className="text-base font-bold">Resolution Tracker</div>
                  <div className="text-xs text-[var(--muted)]">10-week momentum, one glance</div>
                </div>
              </div>
              <Link className="btn-primary app-bar-cta" href="/login">
                Sign in
              </Link>
            </div>
          </div>
          <div className="panel header-panel desktop-only flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] font-bold text-white">
                RT
              </div>
              <div>
                <div className="text-lg font-bold">Resolution Tracker</div>
                <div className="text-xs text-[var(--muted)]">10-week momentum, one glance</div>
              </div>
            </div>
            <Link className="btn-primary" href="/login">
              Sign in
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-6">
          <div className="panel p-6">
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Progress</div>
            <div className="progress-line mt-3">
              <div className="progress-fill" style={{ width: "0%" }} />
            </div>
            <div className="mt-2 text-sm text-[var(--muted)]">
              Sign in to reveal your real progress and saved updates.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 stat-grid">
            <div className="panel p-5 stat-card">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Energy
              </div>
              <div className="speedometer mt-2 grid place-items-center">
                <svg viewBox="0 0 200 120" aria-hidden="true">
                  <path className="arc red" d="M20,100 A80,80 0 0 1 80,28" />
                  <path className="arc orange" d="M80,28 A80,80 0 0 1 120,28" />
                  <path className="arc green" d="M120,28 A80,80 0 0 1 180,100" />
                  <line className="needle" x1="100" y1="100" x2="100" y2="40" />
                  <circle className="needle-cap" cx="100" cy="100" r="6" />
                </svg>
                <div className="mt-1 text-center text-lg font-bold">Steady</div>
              </div>
            </div>
            <div className="panel p-5 stat-card">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Completion
              </div>
              <div className="mt-3 text-3xl font-bold">10 weeks</div>
              <div className="text-sm text-[var(--muted)]">Your journey starts on sign in.</div>
            </div>
            <div className="panel p-5 stat-card">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Next week
              </div>
              <div className="mt-3 text-3xl font-bold">Week 1</div>
              <div className="text-sm text-[var(--muted)]">Start your first weekend.</div>
            </div>
          </div>

          <section className="panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Your 10-week track</h2>
                <p className="text-sm text-[var(--muted)]">Preview your journey. Sign in to track.</p>
              </div>
              <Link className="btn-primary" href="/login">
                Sign in to start
              </Link>
            </div>

            <div className="mt-6 grid gap-4">
              {previewWeeks.map((week) => (
                <div
                  key={week.id}
                  className="panel grid gap-3 border-l-4 border-l-[var(--accent-2)] p-5 opacity-80"
                >
                  <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                    <span className="font-semibold">Week {week.week_number}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Preview
                    </span>
                  </div>
                  <div className="text-lg font-semibold">
                    {weekTitles[week.week_number - 1] ?? `Week ${week.week_number} focus`}
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    Sign in to add your notes, progress, and time.
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    );
  }

  let { data: weeks, error } = await supabase
    .from("week_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("week_number");

  if (!error && (!weeks || weeks.length === 0)) {
    const seed: Partial<WeekProgress>[] = Array.from({ length: 10 }, (_, index) => ({
      user_id: user.id,
      week_number: index + 1,
      status: "not_started",
      progress_percent: 0,
      notes: "",
      time_spent_minutes: 0,
      energy: "steady",
    }));
    const service = createSupabaseServiceClient();
    await service.from("week_progress").insert(seed);
    const refreshed = await service
      .from("week_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("week_number");
    weeks = refreshed.data ?? [];
  }

  const safeWeeks = (weeks ?? []) as WeekProgress[];
  const progress = overallProgress(safeWeeks);
  const nextWeek = nextWeekNumber(safeWeeks) ?? 1;
  const completedCount = safeWeeks.filter((week) => week.status === "completed").length;
  const inProgressCount = safeWeeks.filter((week) => week.status === "in_progress").length;
  const energyValue =
    safeWeeks.find((week) => week.status !== "not_started")?.energy ?? "steady";
  const energyLabel = energyValue === "low" ? "Low" : energyValue === "high" ? "High" : "Steady";
  const needleRotation =
    energyValue === "low" ? "-35" : energyValue === "high" ? "35" : "0";
  const displayName =
    (user.user_metadata?.first_name && user.user_metadata?.last_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user.user_metadata?.full_name) ||
    user.email;

  return (
    <div className="shell">
      <header>
        <div className="panel app-bar mobile-only">
          <div className="app-bar-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] font-bold text-white">
                RT
              </div>
              <div>
                <div className="text-base font-bold">Resolution Tracker</div>
                <div className="text-xs text-[var(--muted)]">10-week momentum, one glance</div>
              </div>
            </div>
            <details className="menu">
              <summary className="menu-trigger">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] text-xs font-bold text-white">
                  {user.email?.[0]?.toUpperCase() ?? "U"}
                </div>
              </summary>
              <div className="menu-panel">
                <div className="text-sm font-bold">{displayName}</div>
                <div className="text-xs text-[var(--muted)]">Signed in</div>
                <div className="mt-3">
                  <LogoutButton />
                </div>
              </div>
            </details>
          </div>
        </div>
        <div className="panel header-panel desktop-only flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] font-bold text-white">
              RT
            </div>
            <div>
              <div className="text-lg font-bold">Resolution Tracker</div>
              <div className="text-xs text-[var(--muted)]">10-week momentum, one glance</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(138,127,176,0.15)] bg-[var(--card)] px-3 py-2 shadow-[var(--shadow)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#b1a7ff] text-xs font-bold text-white">
              {user.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <div className="text-sm font-bold">{displayName}</div>
              <div className="text-xs text-[var(--muted)]">Signed in</div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-6">
        <div className="panel p-6">
          <div className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Progress</div>
          <div className="progress-line mt-3">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-sm text-[var(--muted)]">
            {progress}% complete • {Math.max(0, 10 - completedCount)} to go
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 stat-grid">
            <div className="panel p-5 stat-card">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Energy
              </div>
              <div className="speedometer mt-2 grid place-items-center">
                <svg viewBox="0 0 200 120" aria-hidden="true">
                  <path className="arc red" d="M20,100 A80,80 0 0 1 80,28" />
                  <path className="arc orange" d="M80,28 A80,80 0 0 1 120,28" />
                  <path className="arc green" d="M120,28 A80,80 0 0 1 180,100" />
                  <line
                    className="needle"
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="40"
                    transform={`rotate(${needleRotation} 100 100)`}
                  />
                  <circle className="needle-cap" cx="100" cy="100" r="6" />
                </svg>
                <div className="mt-1 text-center text-lg font-bold">{energyLabel}</div>
              </div>
            </div>
          <div className="panel p-5 stat-card">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Completion
            </div>
            <div className="mt-3 text-3xl font-bold">
              {completedCount} / 10
            </div>
            <div className="text-sm text-[var(--muted)]">{inProgressCount} in progress</div>
          </div>
          <div className="panel p-5 stat-card">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Next week
            </div>
            <div className="mt-3 text-3xl font-bold">Week {nextWeek ?? 10}</div>
            <div className="text-sm text-[var(--muted)]">Suggested focus</div>
          </div>
        </div>
      </section>

      <section className="panel mt-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your 10-week track</h2>
            <p className="text-sm text-[var(--muted)]">Tap a week to update notes and progress.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {safeWeeks.map((week) => {
            const statusClass =
              week.status === "completed"
                ? "status-complete"
                : week.status === "in_progress"
                ? "status-progress"
                : "status-next";
            return (
              <div
                key={week.id}
                className="panel grid gap-3 border-l-4 border-l-[var(--accent-2)] p-5"
                style={{
                  borderLeftColor:
                    week.status === "completed"
                      ? "#7cc9a6"
                      : week.status === "in_progress"
                      ? "#ffcc4d"
                      : "#8c7bff",
                }}
              >
                <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                  <span className="font-semibold">Week {week.week_number}</span>
                  <span className={`status-pill ${statusClass}`}>
                    {week.status.replace("_", " ")}
                  </span>
                </div>
                <div className="text-lg font-semibold">
                  {weekTitles[week.week_number - 1] ?? `Week ${week.week_number} focus`}
                </div>
                {week.status !== "not_started" && (
                  <div className="flex flex-wrap items-center justify-between text-sm text-[var(--muted)]">
                    <span>{minutesToHours(week.time_spent_minutes)} logged</span>
                  </div>
                )}
                {week.status === "in_progress" && (
                  <div className="flex items-center gap-3">
                    <div className="progress-line flex-1">
                      <div className="progress-fill" style={{ width: `${week.progress_percent}%` }} />
                    </div>
                    <div className="text-sm font-bold">{week.progress_percent}%</div>
                  </div>
                )}
                <DashboardActions week={week} />
                {week.status !== "not_started" && week.notes && (
                  <details className="week-notes">
                    <summary>
                      <span className="triangle">▶</span>
                      View notes
                    </summary>
                    <p>{week.notes}</p>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
