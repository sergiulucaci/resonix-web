import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopicPicker } from "@/components/topic-picker";

describe("TopicPicker", () => {
  it("renders topics and triggers selection", () => {
    const onSelect = vi.fn();
    render(<TopicPicker selectedTopic="tech" onSelect={onSelect} />);

    const aiButton = screen.getByRole("button", { name: "ai" });
    fireEvent.click(aiButton);

    expect(onSelect).toHaveBeenCalledWith("ai");
    expect(screen.getByRole("button", { name: "tech" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
