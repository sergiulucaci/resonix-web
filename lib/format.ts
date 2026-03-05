export function formatRelativeTime(isoTime: string | null): string {
  if (!isoTime) {
    return "No updates yet";
  }

  const then = new Date(isoTime).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(0, Math.round((now - then) / (1000 * 60)));

  if (diffMinutes < 1) return "Updated just now";
  if (diffMinutes < 60) return `Updated ${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Updated ${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `Updated ${diffDays}d ago`;
}

export function formatArticleDate(isoTime: string): string {
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return isoTime;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
