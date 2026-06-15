import Link from "next/link";

const heroStats = [
  { value: "10K+", label: "Active Engineers" },
  { value: "22+", label: "Practice Elements" },
  { value: "AI×7", label: "Interview Agents" },
  { value: "100%", label: "Always Free" },
];

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="home-shell">
        <div className="home-hero-copy">
          <div className="home-eyebrow">
            <span className="home-eyebrow-dot" aria-hidden="true" />
            Free for QA Engineers — 10,000+ Practitioners
          </div>

          <h1 id="home-hero-title" className="home-hero-title">
            The Only
            <br />
            <span className="home-hero-title-accent">Playground You</span>
            <br />
            Need to Get Hired
          </h1>

          <p className="home-hero-description">
            Stop reading. Start doing. Practice Selenium, Playwright &amp;
            Cypress on real UI elements, sharpen your answers in AI-powered mock
            interviews, then track every job you apply to — all the way to the
            offer.
          </p>

          <div className="home-hero-actions">
            <Link href="/practice" className="home-btn home-btn-primary">
              <span aria-hidden="true">⚡</span>
              Start Practicing Free
            </Link>
            <Link href="#features" className="home-btn home-btn-secondary">
              See what&apos;s inside ↓
            </Link>
            <Link href="#interview" className="home-btn home-btn-ghost">
              <span aria-hidden="true">🎤</span>
              Mock Interview
            </Link>
          </div>

          <div className="home-stats" aria-label="QA Playground highlights">
            {heroStats.map((stat) => (
              <div key={stat.label} className="home-stat">
                <div className="home-stat-value">{stat.value}</div>
                <div className="home-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
