"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/types/news";
import { proxyAudioUrl } from "@/lib/audio";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

const FALLBACK_ITEM: NewsItem = {
  id: "cmmdx6n5z0000s81vzj0wk2m2",
  topic: "tech",
  title: "Tech",
  summary:
    "The Pentagon flags Anthropic as a supply-chain risk, Trump pushes data center companies on power generation pledges, and a GPL licensing mechanism gets fresh scrutiny.",
  detailedSummary: "",
  sourceUrl: "resonix://brief/tech/1772742619077",
  sourceName: "Resonix Brief",
  publishedAt: "2026-03-05T18:55:13.000Z",
  audioUrl: "https://api.resonix.audio/audio/tech-1772742594405.mp3",
  createdAt: "2026-03-05T20:30:19.079Z",
  updatedAt: "2026-03-05T20:30:19.079Z",
  keyPoints: [
    "The Pentagon has formally designated Anthropic as a supply-chain risk, raising serious questions about how deeply AI companies are embedded in defense infrastructure and whether alternatives will be fast-tracked.",
    "The White House secured pledges from data center operators to fund their own power generation, but without enforcement mechanisms or clear economics, the commitments may amount to little more than theater.",
    "A deep look at GPL section fourteen proxy delegation highlights how open-source license upgrade mechanisms could reshape software governance as AI-generated code muddies authorship and licensing chains.",
  ],
  bottomLine:
    "Washington is tightening its grip on AI supply chains while struggling to solve the energy demands those same AI systems create.",
  audioScript:
    "The Pentagon has formally labeled Anthropic a supply-chain risk. That's a significant escalation. It signals the Department of Defense views its dependency on certain AI providers — even American ones — as a strategic vulnerability. The designation could trigger procurement restrictions, push agencies toward alternative vendors, and reshape how defense contracts flow through the AI industry. For Anthropic, a company that has positioned itself as the safety-conscious choice in frontier AI, being flagged by the very institution that values reliability above all else is a credibility problem. Watch for whether this triggers a broader review of AI vendors across the federal government. Meanwhile, the White House announced that major data center companies have pledged to pay for their own power generation. On the surface, it looks like progress on the growing energy crisis driven by AI compute. But dig in, and there's less here than meets the eye. There's no enforcement mechanism. The economics are questionable at best. Building dedicated power infrastructure takes years and billions of dollars, and these pledges are voluntary. Without teeth, this may function more as political cover than energy policy. The fundamental tension remains: AI demand for electricity is surging, and the grid isn't keeping up. On a quieter but technically important front, GPL section fourteen proxy delegation is getting renewed attention in open-source legal circles. This mechanism allows projects to delegate the decision of upgrading to a newer version of the General Public License to a trusted proxy. It sounds procedural, but it matters. As AI-generated code proliferates and authorship becomes harder to trace, the question of who controls license upgrades becomes genuinely consequential for software governance. The thread connecting these stories is control. Who controls the AI supply chain for national security. Who controls the energy those systems consume. Who controls the legal frameworks governing the code underneath it all. The answers are still forming, and this week made clear — Washington intends to have a louder voice in each of them.",
  sources: [
    {
      sourceTitle: "Hacker News",
      articleTitle: "Pentagon Formally Labels Anthropic Supply-Chain Risk",
      sourceUrl:
        "https://www.wsj.com/politics/national-security/pentagon-formally-labels-anthropic-supply-chain-risk-escalating-conflict-ebdf0523",
      publishedAt: "2026-03-05T19:24:35.000Z",
      preview: "Pentagon Formally Labels Anthropic Supply-Chain Risk",
      logoUrl: "https://www.google.com/s2/favicons?domain=www.wsj.com&sz=64",
    },
    {
      sourceTitle: "Ars Technica",
      articleTitle:
        "Trump gets data center companies to pledge to pay for power generation",
      sourceUrl:
        "https://arstechnica.com/tech-policy/2026/03/leading-ai-datacenter-companies-sign-pledge-to-buy-their-own-power/",
      publishedAt: "2026-03-05T18:41:28.000Z",
      preview:
        "With no enforcement and questionable economics, it may not make a difference.",
      logoUrl:
        "https://www.google.com/s2/favicons?domain=arstechnica.com&sz=64",
    },
    {
      sourceTitle: "Lobsters",
      articleTitle: "GPL upgrades via section 14 proxy delegation",
      sourceUrl: "https://runxiyu.org/comp/gplproxy/",
      publishedAt: "2026-03-05T13:25:12.000Z",
      preview: "GPL upgrades via section 14 proxy delegation",
      logoUrl: "https://www.google.com/s2/favicons?domain=runxiyu.org&sz=64",
    },
  ],
};

function isComplete(item: NewsItem): boolean {
  return !!(
    item.summary &&
    item.keyPoints &&
    item.keyPoints.length > 0 &&
    item.audioScript &&
    item.audioUrl
  );
}

export function SampleBriefing() {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/news/tech?limit=1`);
        const data = await res.json();
        if (!cancelled) {
          const fetched: NewsItem | undefined = data.items?.[0];
          setItem(fetched && isComplete(fetched) ? fetched : FALLBACK_ITEM);
        }
      } catch {
        if (!cancelled) setItem(FALLBACK_ITEM);
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
