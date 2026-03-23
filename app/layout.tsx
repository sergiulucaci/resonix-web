import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resonix - Audio briefings for people in tech",
  description:
    "Resonix takes tech content and turns it into short audio briefings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
