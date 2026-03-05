export const TOPICS = [
  "tech",
  "ai",
  "cloud-infra",
  "security",
  "markets",
  "health",
  "policy",
] as const;

export type Topic = (typeof TOPICS)[number];

export interface SourceCard {
  sourceTitle: string;
  articleTitle: string;
  sourceUrl: string;
  publishedAt: string;
  preview: string;
  logoUrl: string;
}

export interface NewsItem {
  id: string;
  topic: string;
  title: string;
  summary: string;
  detailedSummary?: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  keyPoints?: string[];
  bottomLine?: string;
  audioScript?: string;
  audioUrl?: string;
  sources?: SourceCard[];
}

export interface NewsResponse {
  items: NewsItem[];
  lastUpdate: string | null;
}
