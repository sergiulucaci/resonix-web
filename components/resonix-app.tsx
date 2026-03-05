"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchTopicNews } from "@/lib/api";
import { formatRelativeTime } from "@/lib/format";
import { BriefingCard } from "@/components/briefing-card";
import { TopicPicker } from "@/components/topic-picker";
import type { NewsItem, Topic } from "@/types/news";

const STORAGE_KEY = "resonix:last-topic";

export function ResonixApp() {
  const [topic, setTopic] = useState<Topic>(() => {
    if (typeof window === "undefined") return "tech";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Topic | null;
    return stored ?? "tech";
  });
  const [items, setItems] = useState<NewsItem[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, topic);
    let cancelled = false;

    fetchTopicNews(topic)
      .then((result) => {
        if (cancelled) return;
        setItems(result.items);
        setLastUpdate(result.lastUpdate);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setItems([]);
        setLastUpdate(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [topic]);

  const handleTopicSelect = (nextTopic: Topic) => {
    if (nextTopic === topic) return;
    setLoading(true);
    setError(null);
    setTopic(nextTopic);
  };

  const activeItem = useMemo(() => items[0], [items]);

  return (
    <main className="shell">
      <header className="hero">
        <p className="kicker">Resonix</p>
        <h1>Trusted briefings for people who move fast.</h1>
        <p className="hero-copy">
          Resonix turns curated industry sources into concise topic briefings
          with clear takeaways and source transparency.
        </p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Topics</h2>
          <span className="status">{formatRelativeTime(lastUpdate)}</span>
        </div>
        <TopicPicker selectedTopic={topic} onSelect={handleTopicSelect} />
      </section>

      <section className="panel">
        {loading ? <p className="muted">Loading latest {topic} briefing...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        {!loading && !error && !activeItem ? (
          <p className="muted">
            No briefing available for {topic} yet. Trigger a scrape in backend and
            refresh.
          </p>
        ) : null}
        {!loading && !error && activeItem ? <BriefingCard item={activeItem} /> : null}
      </section>
    </main>
  );
}
