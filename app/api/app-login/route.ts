import { NextRequest, NextResponse } from "next/server";

const APP_PASSWORD = process.env.APP_PASSWORD ?? "";
const COOKIE_NAME = "app-auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!APP_PASSWORD || body.password !== APP_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, APP_PASSWORD, {
    httpOnly: true,
    sameSite: "lax",
    path: "/app",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
