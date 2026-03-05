"use client";

import type { Topic } from "@/types/news";
import { TOPICS } from "@/types/news";

interface TopicPickerProps {
  selectedTopic: Topic;
  onSelect: (topic: Topic) => void;
}

export function TopicPicker({ selectedTopic, onSelect }: TopicPickerProps) {
  return (
    <div className="topic-grid" aria-label="Topics">
      {TOPICS.map((topic) => {
        const isSelected = topic === selectedTopic;
        return (
          <button
            key={topic}
            type="button"
            className={`topic-pill ${isSelected ? "topic-pill--active" : ""}`}
            onClick={() => onSelect(topic)}
            aria-pressed={isSelected}
          >
            {topic}
          </button>
        );
      })}
    </div>
  );
}
