import { WaitlistForm } from "./waitlist-form";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <h2 className="landing-section-title">Stay in the loop</h2>
        <p className="landing-section-sub">
          Join the waitlist to get notified when we launch and receive updates along the way.
        </p>
        <WaitlistForm />
        <div className="footer-links">
          <span className="footer-brand">Resonix</span>
        </div>
      </div>
    </footer>
  );
}
