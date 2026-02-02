import { minutesToHours } from "@/lib/format";

describe("minutesToHours", () => {
  test("formats zero minutes", () => {
    expect(minutesToHours(0)).toBe("0h");
  });

  test("formats whole hours", () => {
    expect(minutesToHours(120)).toBe("2h");
  });

  test("formats fractional hours", () => {
    expect(minutesToHours(90)).toBe("1.5h");
  });
});
