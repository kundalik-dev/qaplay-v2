const featureCards = [
  {
    title: "Practice live automation targets",
    description:
      "Work with forms, dropdowns, alerts, frames, tables, and dynamic UI patterns that mirror real interview tasks.",
  },
  {
    title: "Rehearse with AI interview rounds",
    description:
      "Simulate recruiter, technical, and automation-specific interviews with feedback that helps you tighten your answers.",
  },
  {
    title: "Track jobs with less chaos",
    description:
      "Keep your applications, follow-ups, and progress in one focused system built around QA career movement.",
  },
];

export function HomeFeaturePreview() {
  return (
    <section id="features" className="home-section" aria-labelledby="features-title">
      <div className="home-shell">
        <div className="home-section-header">
          <div className="home-section-tag">{"// what we offer"}</div>
          <h2 id="features-title" className="home-section-title">
            One focused platform for practice, interviews, and momentum
          </h2>
          <p className="home-section-description">
            The landing layout now follows the visual direction from your
            reference: open full-width background, centered hero, soft glows,
            and compact glass cards instead of a boxed placeholder area.
          </p>
        </div>

        <div className="home-feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="home-feature-card">
              <div className="home-feature-icon" aria-hidden="true">
                +
              </div>
              <h3 className="home-feature-title">{card.title}</h3>
              <p className="home-feature-description">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
