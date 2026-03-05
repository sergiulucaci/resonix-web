/** Rewrite absolute backend audio URLs to same-origin /audio/ proxy path */
export function proxyAudioUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.pathname.startsWith("/audio/")) {
      return u.pathname;
    }
  } catch {
    // not a valid URL, return as-is
  }
  return url;
}
