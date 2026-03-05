import { WaitlistForm } from "./waitlist-form";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <h2 className="landing-section-title">Stay in the loop</h2>
        <p className="landing-section-sub">
          We&apos;re launching soon. Join the waitlist to get early access.
        </p>
        <WaitlistForm />
        <div className="footer-links">
          <span className="footer-brand">Resonix</span>
        </div>
      </div>
    </footer>
  );
}
