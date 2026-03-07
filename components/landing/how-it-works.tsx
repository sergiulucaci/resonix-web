const STEPS = [
  {
    num: "01",
    title: "Curate",
    description:
      "We pull from trusted sources — newsletters, feeds, and publications trusted by engineers and founders.",
  },
  {
    num: "02",
    title: "Distill",
    description:
      "Each topic gets a concise briefing with key points, bottom line, and full source attribution.",
  },
  {
    num: "03",
    title: "Listen",
    description:
      "Get a short audio briefing you can play on your commute, at the gym, or while cooking.",
  },
];

export function HowItWorks() {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section-title">How it works</h2>
        <div className="steps-grid">
          {STEPS.map((step) => (
            <div className="step-card" key={step.num}>
              <span className="step-num">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
