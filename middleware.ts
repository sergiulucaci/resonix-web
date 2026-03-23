import { NextRequest, NextResponse } from "next/server";

const APP_PASSWORD = process.env.APP_PASSWORD ?? "";
const COOKIE_NAME = "app-auth";

export function middleware(req: NextRequest) {
  // Only protect /app routes
  if (!req.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  // No password set - allow through (dev convenience)
  if (!APP_PASSWORD) {
    return NextResponse.next();
  }

  // Check auth cookie
  if (req.cookies.get(COOKIE_NAME)?.value === APP_PASSWORD) {
    return NextResponse.next();
  }

  // Allow login page through
  if (req.nextUrl.pathname === "/app/login") {
    return NextResponse.next();
  }

  // Rewrite to login
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/app/login";
  return NextResponse.rewrite(loginUrl);
}

export const config = {
  matcher: "/app/:path*",
};
