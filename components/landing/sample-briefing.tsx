"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/types/news";
import { proxyAudioUrl } from "@/lib/audio";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export function SampleBriefing() {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/news/tech?limit=1`);
        const data = await res.json();
        if (!cancelled && data.items?.[0]) {
          setItem(data.items[0]);
        }
      } catch {
        // silently fail — section just won't render
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="landing-section">
        <div className="landing-container">
          <h2 className="landing-section-title">Latest briefing</h2>
          <p className="landing-section-sub">
            Live from the API — this is what you get.
          </p>
          <div className="briefing-preview briefing-skeleton">
            {/* Topic */}
            <div className="skel skel-tag" />
            {/* Bottom line */}
            <div className="skel skel-headline" />
            <div className="skel skel-headline-2" />
            {/* Player row + progress */}
            <div className="skel skel-circle" />
            <div className="skel skel-row" />
            <div className="skel skel-bar" />
            {/* Key points */}
            <div className="skel skel-line" />
            <div className="skel skel-line" />
            <div className="skel skel-line" />
            <div className="skel skel-line skel-line--short" />
            {/* Transcript toggle */}
            <div className="skel skel-row" />
            {/* Sources */}
            <div className="skel skel-row" />
          </div>
        </div>
      </section>
    );
  }

  if (!item) return null;

  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section-title">Latest briefing</h2>
        <p className="landing-section-sub">
          Live from the API — this is what you get.
        </p>
        <BriefingPreview item={item} />
      </div>
    </section>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins < 1) return `${secs} sec`;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}

function formatBriefingDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function BriefingPreview({ item }: { item: NewsItem }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.play();
    }
  }, [isPlaying]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = audioRef.current;
      const bar = progressRef.current;
      if (!el || !bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      el.currentTime = ratio * duration;
    },
    [duration],
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onMeta = () => {
      if (el.duration && isFinite(el.duration)) {
        setDuration(el.duration);
      }
    };
    const onTime = () => setCurrentTime(el.currentTime);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <article className="briefing-preview">
      {/* Topic tag */}
      <span className="briefing-topic">{item.topic}</span>

      {/* Bottom Line */}
      {item.bottomLine && (
        <p className="briefing-bottom-line">{item.bottomLine}</p>
      )}

      {/* Audio player */}
      {item.audioUrl && (
        <div className="briefing-audio-group">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio ref={audioRef} src={proxyAudioUrl(item.audioUrl)} preload="metadata" />

          <div className="briefing-meta-row">
            <button
              className={`player-btn ${isPlaying ? "player-btn--playing" : ""}`}
              onClick={togglePlay}
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <span className={`player-icon ${isPlaying ? "player-icon--pause" : "player-icon--play"}`} />
            </button>
            <div className="briefing-meta">
              <span>{formatBriefingDate(item.publishedAt)}</span>
              {duration !== null && (
                <>
                  <span className="briefing-meta-sep">·</span>
                  <span>{formatDuration(duration)}</span>
                </>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {duration !== null && (
            <div className="player-progress-row">
              <span className="player-time">{formatTime(currentTime)}</span>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className="player-progress-track"
                ref={progressRef}
                onClick={handleSeek}
              >
                <div
                  className="player-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="player-time">{formatTime(duration)}</span>
            </div>
          )}

        </div>
      )}

      {/* Key Points */}
      {item.keyPoints && item.keyPoints.length > 0 && (
        <div className="briefing-keypoints">
          <h3 className="briefing-section-label">Key Points</h3>
          <ul className="briefing-points">
            {item.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Transcript */}
      {item.audioScript && (
        <div className="briefing-transcript">
          <button
            className="transcript-btn"
            onClick={() => setShowTranscript((v) => !v)}
            type="button"
          >
            <span className="transcript-btn-icon">
              {showTranscript ? "▾" : "▸"}
            </span>
            {showTranscript ? "Hide transcript" : "Read transcript"}
          </button>
          {showTranscript && (
            <div className="transcript-content">
              <p>{item.audioScript}</p>
            </div>
          )}
        </div>
      )}

      {/* Sources */}
      {item.sources && item.sources.length > 0 && (
        <div className="briefing-sources">
          <h3 className="briefing-section-label">Sources</h3>
          <div className="briefing-source-inline">
            {item.sources.map((source) => (
              <a
                className="briefing-source-chip"
                href={source.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={`${source.sourceUrl}-${source.articleTitle}`}
                title={source.articleTitle}
              >
                {source.sourceTitle}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
