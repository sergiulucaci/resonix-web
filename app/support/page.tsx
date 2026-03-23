import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Resonix",
};

export default function Support() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif", lineHeight: 1.7, color: "#1a1a1a" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Support</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>We&apos;re here to help.</p>

      <p>
        If you have any questions, issues, or feedback about Resonix, please reach out to us at{" "}
        <a href="mailto:sergius.lucaci@gmail.com" style={{ color: "#000", textDecoration: "underline" }}>
          sergius.lucaci@gmail.com
        </a>.
      </p>

      <p style={{ marginTop: 24 }}>We typically respond within 24 hours.</p>
    </main>
  );
}
