import { overallProgress, nextWeekNumber } from "@/lib/progress";

describe("progress helpers", () => {
  test("overallProgress averages completed and in-progress weeks", () => {
    const progress = overallProgress([
      {
        id: "1",
        user_id: "u1",
        week_number: 1,
        status: "completed",
        progress_percent: 100,
        notes: null,
        time_spent_minutes: 0,
        energy: "steady",
        updated_at: "",
      },
      {
        id: "2",
        user_id: "u1",
        week_number: 2,
        status: "in_progress",
        progress_percent: 50,
        notes: null,
        time_spent_minutes: 0,
        energy: "steady",
        updated_at: "",
      },
    ]);

    expect(progress).toBe(75);
  });

  test("nextWeekNumber returns first incomplete week", () => {
    const next = nextWeekNumber([
      {
        id: "1",
        user_id: "u1",
        week_number: 1,
        status: "completed",
        progress_percent: 100,
        notes: null,
        time_spent_minutes: 0,
        energy: "steady",
        updated_at: "",
      },
      {
        id: "2",
        user_id: "u1",
        week_number: 2,
        status: "not_started",
        progress_percent: 0,
        notes: null,
        time_spent_minutes: 0,
        energy: "steady",
        updated_at: "",
      },
    ]);

    expect(next).toBe(2);
  });
});
