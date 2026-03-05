import type { NewsResponse, Topic } from "@/types/news";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function fetchTopicNews(topic: Topic): Promise<NewsResponse> {
  const response = await fetch(`${API_BASE_URL}/news/${topic}?limit=5`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${topic} briefings`);
  }

  return (await response.json()) as NewsResponse;
}
