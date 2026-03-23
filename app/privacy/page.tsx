import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Resonix",
};

export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif", lineHeight: 1.7, color: "#1a1a1a" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Last updated: March 23, 2026</p>

      <p>
        Resonix Audio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Resonix mobile application.
        This page informs you of our policies regarding the collection, use, and disclosure of personal information
        when you use our app.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Information We Collect</h2>
      <p>We collect minimal information to provide and improve our service:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Feedback messages</strong> - When you voluntarily submit feedback through the app, we store the message content, your device platform (iOS/Android), and your IP address for rate limiting purposes.</li>
        <li><strong>Topic preferences</strong> - Your selected topic is stored locally on your device and is not transmitted to our servers.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>How We Use Your Information</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>To provide and maintain our service</li>
        <li>To improve user experience based on feedback</li>
        <li>To prevent abuse through rate limiting</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Data Storage</h2>
      <p>
        Feedback data is stored on our servers. We do not sell, trade, or transfer your information to third parties.
        We do not use analytics or tracking services.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Third-Party Services</h2>
      <p>
        Our app uses third-party services for content delivery and audio generation. These services may process
        data in accordance with their own privacy policies. We do not share personal user data with these services.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Data Retention</h2>
      <p>
        Feedback messages are retained for as long as necessary to improve our service. You may request deletion
        of your feedback by contacting us.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Children&apos;s Privacy</h2>
      <p>
        Our service is not directed to anyone under the age of 13. We do not knowingly collect personal
        information from children.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of any changes by posting the
        new policy on this page and updating the date above.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at{" "}
        <a href="mailto:sergius.lucaci@gmail.com" style={{ color: "#000", textDecoration: "underline" }}>
          sergius.lucaci@gmail.com
        </a>.
      </p>
    </main>
  );
}
