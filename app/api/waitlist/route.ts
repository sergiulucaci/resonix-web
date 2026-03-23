import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WAITLIST_PATH = join(process.cwd(), "waitlist.json");
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// In-memory rate limiter (resets on restart - fine for waitlist)
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

async function loadWaitlist(): Promise<
  { email: string; joinedAt: string }[]
> {
  try {
    const raw = await readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveWaitlist(
  entries: { email: string; joinedAt: string }[],
) {
  await writeFile(WAITLIST_PATH, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot - bots fill this hidden field. Reject silently.
  if (body.company) {
    return NextResponse.json({
      message: "Signal received. We'll ping you when it's live.",
    });
  }

  const email = (body.email ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const entries = await loadWaitlist();

  if (!entries.some((e) => e.email === email)) {
    entries.push({ email, joinedAt: new Date().toISOString() });
    await saveWaitlist(entries);
  }

  return NextResponse.json({
    message: "Signal received. We'll ping you when it's live.",
  });
}
