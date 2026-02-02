export type WeekStatus = "not_started" | "in_progress" | "completed";
export type EnergyLevel = "low" | "steady" | "high";

export interface WeekProgress {
  id: string;
  user_id: string;
  week_number: number;
  status: WeekStatus;
  progress_percent: number;
  notes: string | null;
  time_spent_minutes: number;
  energy: EnergyLevel;
  updated_at: string;
}

export const statusLabel: Record<WeekStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};
