import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BriefingCard } from "@/components/briefing-card";

describe("BriefingCard", () => {
  it("renders summary, bottom line, and source cards", () => {
    render(
      <BriefingCard
        item={{
          id: "1",
          topic: "tech",
          title: "Fed holds rates steady as inflation persists",
          summary: "Tech summary with more context about the briefing.",
          sourceUrl: "resonix://brief/tech/1",
          sourceName: "Resonix Brief",
          publishedAt: "2026-02-17T00:00:00.000Z",
          createdAt: "2026-02-17T00:00:00.000Z",
          updatedAt: "2026-02-17T00:00:00.000Z",
          keyPoints: ["One", "Two"],
          bottomLine: "Keep watching this",
          sources: [
            {
              sourceTitle: "TechCrunch",
              articleTitle: "A story",
              sourceUrl: "https://techcrunch.com/a-story",
              publishedAt: "2026-02-17T00:00:00.000Z",
              preview: "A short preview",
              logoUrl: "https://techcrunch.com/favicon.ico",
            },
          ],
        }}
      />
    );

    expect(screen.getByText("Fed holds rates steady as inflation persists")).toBeInTheDocument();
    expect(screen.getByText("Tech summary with more context about the briefing.")).toBeInTheDocument();
    expect(screen.getByText("Bottom line:")).toBeInTheDocument();
    expect(screen.getByText("Keep watching this")).toBeInTheDocument();
    expect(screen.getByText("TechCrunch")).toBeInTheDocument();
    expect(screen.getByText("A story")).toBeInTheDocument();
  });
});
