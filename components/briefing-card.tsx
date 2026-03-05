"use client";

import { useState } from "react";
import { formatArticleDate } from "@/lib/format";
import { proxyAudioUrl } from "@/lib/audio";
import type { NewsItem } from "@/types/news";

interface BriefingCardProps {
  item: NewsItem;
}

export function BriefingCard({ item }: BriefingCardProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <article className="card">
      <p className="eyebrow">{item.topic.toUpperCase()} BRIEFING</p>

      <h2 className="card-title">{item.title}</h2>

      {item.summary ? (
        <p className="card-summary">{item.summary}</p>
      ) : null}

      {item.bottomLine ? (
        <div className="bottom-line-card">
          <p className="bottom-line">{item.bottomLine}</p>
        </div>
      ) : null}

      {item.keyPoints && item.keyPoints.length > 0 ? (
        <div className="field">
          <p className="field-label">Key Points</p>
          <div className="point-list">
            {item.keyPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      ) : null}

      {item.audioUrl ? (
        <div className="field">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls src={proxyAudioUrl(item.audioUrl)} style={{ width: "100%" }} />
        </div>
      ) : null}

      {item.audioScript ? (
        <div className="field">
          <button
            className="transcript-toggle"
            onClick={() => setShowTranscript((v) => !v)}
            type="button"
          >
            {showTranscript ? "Hide transcript" : "Read transcript"}
            <span className="transcript-chevron">
              {showTranscript ? "\u25B2" : "\u25BC"}
            </span>
          </button>
          {showTranscript && (
            <div className="transcript-body">
              <p>{item.audioScript}</p>
            </div>
          )}
        </div>
      ) : null}

      {item.sources && item.sources.length > 0 ? (
        <section className="sources">
          <h3>Sources</h3>
          <div className="source-grid">
            {item.sources.map((source) => (
              <a
                className="source-card"
                href={source.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={`${source.sourceUrl}-${source.articleTitle}`}
              >
                <div className="source-head">
                  <SourceLogo
                    logoUrl={source.logoUrl}
                    sourceTitle={source.sourceTitle}
                  />
                  <span>{source.sourceTitle}</span>
                </div>
                <p className="source-title">{source.articleTitle}</p>
                <p className="source-preview">{source.preview}</p>
                <p className="source-date">
                  {formatArticleDate(source.publishedAt)}
                </p>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

function SourceLogo({
  logoUrl,
  sourceTitle,
}: {
  logoUrl: string;
  sourceTitle: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !logoUrl) {
    return (
      <span className="source-logo-fallback" aria-hidden="true">
        {sourceTitle.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl}
      alt={`${sourceTitle} logo`}
      width={20}
      height={20}
      onError={() => setFailed(true)}
    />
  );
}
