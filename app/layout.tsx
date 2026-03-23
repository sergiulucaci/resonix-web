import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resonix - Audio briefings for people in tech",
  description:
    "Resonix curates trusted sources and turns them into short audio briefings.",
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
