const TOPICS = [
  { label: "Tech", icon: "⚡" },
  { label: "AI", icon: "◈" },
  { label: "Cloud & Infra", icon: "☁" },
  { label: "Security", icon: "🔒" },
  { label: "Markets", icon: "📈" },
  { label: "Health", icon: "♥" },
  { label: "Policy", icon: "⚖" },
];

export function TopicsGrid() {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section-title">Topics</h2>
        <p className="landing-section-sub">
          Pick the topics you care about. Each gets its own briefing.
        </p>
        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <div className="topic-card" key={topic.label}>
              <span className="topic-card-icon">{topic.icon}</span>
              <span className="topic-card-label">{topic.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
