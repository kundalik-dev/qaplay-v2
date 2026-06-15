import Link from "next/link";

const ctaPoints = [
  {
    step: "01",
    title: "Live practice targets",
    description:
      "Stable UI elements for Selenium, Playwright, Cypress, and pytest workflows.",
  },
  {
    step: "02",
    title: "Realtime AI interview rounds",
    description:
      "Role-play questions, follow-ups, scoring, and model answers after each response.",
  },
  {
    step: "03",
    title: "Job search momentum",
    description:
      "Track openings, draft applications, and manage follow-ups without losing context.",
  },
];

const ctaMetrics = [
  { value: "22+", label: "Practice flows" },
  { value: "AI x7", label: "Interview agents" },
  { value: "100%", label: "Free to use" },
];

export function CtaSection() {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="home-shell">
        <div className="cta-shell">
          <div className="cta-grid">
            <div className="cta-copy">
              <div className="home-eyebrow cta-eyebrow">
                <span className="home-eyebrow-dot" aria-hidden="true" />
                No signup. No credit card. Just practice.
              </div>

              <h2 id="cta-title" className="cta-title">
                <span className="cta-title-line">Your Next QA Role</span>
                <span className="cta-title-line cta-title-accent">Starts Here.</span>
              </h2>

              <p className="cta-subtitle">
                Join thousands of QA engineers using one focused platform to
                practice real automation scenarios, rehearse interviews with AI,
                and move from preparation to offers with more confidence.
              </p>

              <div className="cta-actions">
                <Link href="/practice" className="home-btn home-btn-primary">
                  Start Practicing Free
                </Link>
                <Link href="/interview" className="home-btn home-btn-secondary">
                  Try a Mock Interview
                </Link>
                <Link href="/jobs" className="home-btn home-btn-ghost">
                  Browse Jobs
                </Link>
              </div>

              <div className="cta-note">
                Always free - No account needed - Built for QA engineers in real workflows
              </div>
            </div>

            <div className="cta-side">
              <div className="cta-side-card">
                <div className="cta-side-label">What you unlock</div>

                <div className="cta-point-list">
                  {ctaPoints.map((point) => (
                    <div key={point.step} className="cta-point">
                      <span className="cta-point-icon" aria-hidden="true">
                        {point.step}
                      </span>
                      <div>
                        <strong>{point.title}</strong>
                        <p>{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cta-metrics">
                {ctaMetrics.map((metric) => (
                  <div key={metric.label} className="cta-metric">
                    <div className="cta-metric-value">{metric.value}</div>
                    <div className="cta-metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
