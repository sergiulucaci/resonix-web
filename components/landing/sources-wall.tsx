const SOURCES = [
  "Hacker News",
  "TechCrunch",
  "The Verge",
  "Ars Technica",
  "MIT Tech Review",
  "TLDR",
  "Morning Brew",
  "Benedict Evans",
  "Stratechery",
  "The Information",
  "Platformer",
  "The Pragmatic Engineer",
  "ByteByteGo",
  "InfoQ",
  "Changelog",
  "KrebsOnSecurity",
  "Schneier on Security",
  "The Record",
  "Dark Reading",
  "Risky Business",
  "AWS Blog",
  "Google Cloud Blog",
  "Azure Blog",
  "CloudFlare Blog",
  "Bloomberg",
  "FT",
  "Reuters",
  "WSJ",
  "STAT News",
  "Fierce Healthcare",
  "Politico",
  "The Hill",
  "Rest of World",
  "Wired",
  "IEEE Spectrum",
  "ACM Queue",
  "a]6Z",
  "Daring Fireball",
  "Semafor",
  "Axios",
];

export function SourcesWall() {
  return (
    <section className="landing-section sources-wall-section">
      <div className="landing-container">
        <h2 className="landing-section-title">
          40+ sources. One briefing.
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
