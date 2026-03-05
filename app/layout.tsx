import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resonix — Audio briefings for people in tech",
  description:
    "Resonix curates 40+ trusted sources and turns them into short audio briefings — so you stay sharp without the reading backlog.",
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
