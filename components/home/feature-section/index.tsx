import { cn } from "@/lib/utils";

import { FeatureBentoCard } from "./feature-bento-card";
import styles from "./feature-section.module.css";
import shared from "../shared/home-shared.module.css";
import { featureCards } from "@/data/home/feature-section-data";

export function HomeFeaturePreview() {
  return (
    <section
      id="features"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
        "pt-4",
      )}
      aria-labelledby="features-title"
      data-testid="home-features"
      data-section="features"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={shared.sectionHeader}>
          <div className={shared.sectionTag}>{"// what we offer"}</div>
          <h2 id="features-title" className={shared.sectionTitle}>
            <span className={shared.sectionTitleLine}>
              Everything You Need.
            </span>{" "}
            <span className={shared.sectionTitleLine}>Nothing You Do Not.</span>
          </h2>
          <p className={shared.sectionDescription}>
            Focused tools that cover the full QA journey: practice your skills,
            rehearse interviews with AI, and track every application until you
            sign the offer.
          </p>
        </div>

        <div
          className={styles["feature-bento-grid"]}
          data-testid="feature-bento-grid"
        >
          {featureCards.map((card) => (
            <FeatureBentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
