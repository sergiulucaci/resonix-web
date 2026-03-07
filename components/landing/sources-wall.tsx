const SOURCES = [
  "Hacker News",
  "The Verge",
  "Ars Technica",
  "TLDR",
  "InfoQ",
  "Changelog",
  "VentureBeat",
  "The New Stack",
  "The Register",
  "Lobsters",
  "Reddit",
  "arXiv",
  "Hugging Face",
  "Import AI",
  "The Batch",
  "OpenAI",
  "Anthropic",
  "Google DeepMind",
  "Meta AI",
  "Kubernetes Blog",
  "Last Week in AWS",
  "SRE Weekly",
  "Krebs on Security",
  "Schneier on Security",
  "BleepingComputer",
  "The Hacker News",
  "CISA",
  "EFF",
  "IAPP",
  "tl;dr sec",
  "Bloomberg",
  "Financial Times",
  "The Economist",
  "Reuters",
  "Yahoo Finance",
  "STAT News",
  "KFF Health News",
  "MedCity News",
  "Nature",
  "WHO",
  "Politico",
];

export function SourcesWall() {
  return (
    <section className="landing-section sources-wall-section">
      <div className="landing-container">
        <h2 className="landing-section-title">
          Trusted sources. One briefing.
        </h2>
        <div className="sources-wall">
          {SOURCES.map((name) => (
            <span className="source-tag" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
