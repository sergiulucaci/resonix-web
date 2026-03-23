import { WaitlistForm } from "./waitlist-form";

export function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-container">
        <p className="landing-kicker">Audio news briefings</p>
        <h1 className="landing-headline">
          The right frequencies
          <br />
          for people in tech
        </h1>
        <p className="landing-subline">
          Too many great newsletters, too little time. Resonix curates
          trusted sources and turns them into short audio briefings - so you
          stay sharp without the reading backlog.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
