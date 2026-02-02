import { render, screen } from "@testing-library/react";
import DashboardActions from "@/components/DashboardActions";
import type { WeekProgress } from "@/lib/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createSupabaseBrowserClient: () => ({
    from: () => ({
      update: () => ({
        eq: vi.fn().mockResolvedValue({}),
      }),
    }),
  }),
}));

vi.mock("next/link", async () => {
  const mod = await import("@/test/mocks/next");
  return { default: mod.LinkMock };
});

describe("DashboardActions", () => {
  test("shows Start button for not started week", () => {
    const week: WeekProgress = {
      id: "1",
      user_id: "u1",
      week_number: 1,
      status: "not_started",
      progress_percent: 0,
      notes: null,
      time_spent_minutes: 0,
      energy: "steady",
      updated_at: "",
    };

    render(<DashboardActions week={week} />);
    expect(screen.getByRole("link", { name: /start/i })).toBeInTheDocument();
  });
});
