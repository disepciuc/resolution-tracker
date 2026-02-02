import { render, screen, fireEvent } from "@testing-library/react";
import WeekDetailClient from "@/components/WeekDetailClient";
import type { WeekProgress } from "@/lib/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
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

describe("WeekDetailClient", () => {
  const baseWeek: WeekProgress = {
    id: "1",
    user_id: "u1",
    week_number: 1,
    status: "in_progress",
    progress_percent: 50,
    notes: "Initial note",
    time_spent_minutes: 30,
    energy: "steady",
    updated_at: "",
  };

  test("does not auto-complete when progress hits 100%", () => {
    render(<WeekDetailClient week={baseWeek} />);

    const slider = screen.getByLabelText("Progress") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "100" } });

    expect(slider.value).toBe("100");
    expect(screen.getByRole("button", { name: /mark complete/i })).toBeInTheDocument();
    const saveButton = screen.getByRole("button", { name: /save update/i });
    expect(saveButton).not.toBeDisabled();
  });
});
