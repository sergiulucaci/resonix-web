import { describe, expect, it, vi } from "vitest";
import { formatArticleDate, formatRelativeTime } from "@/lib/format";

describe("formatRelativeTime", () => {
  it("formats missing timestamp", () => {
    expect(formatRelativeTime(null)).toBe("No updates yet");
  });

  it("formats minutes and hours", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-17T12:00:00Z"));
    expect(formatRelativeTime("2026-02-17T11:45:00Z")).toBe("Updated 15m ago");
    expect(formatRelativeTime("2026-02-17T08:00:00Z")).toBe("Updated 4h ago");
    vi.useRealTimers();
  });
});

describe("formatArticleDate", () => {
  it("formats iso date", () => {
    expect(formatArticleDate("2026-02-17T00:00:00.000Z")).toMatch(/Feb/);
  });
});
