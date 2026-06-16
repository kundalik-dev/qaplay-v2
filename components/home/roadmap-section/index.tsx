import { cn } from "@/lib/utils";
import { roadmapSectionContent } from "@/data/home/roadmap-section-data";

import { RoadmapStep } from "./roadmap-step";
import styles from "./roadmap-section.module.css";
import shared from "../shared/home-shared.module.css";

export function RoadmapSection() {
  const { description, sectionTag, steps, titleLines } = roadmapSectionContent;

  return (
    <section
      id="career"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
        styles.section,
      )}
      aria-labelledby="career-title"
      data-testid="home-roadmap"
      data-section="career"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={cn(shared.sectionHeader, styles.header)}>
          <div className={shared.sectionTag}>{sectionTag}</div>
          <h2 id="career-title" className={shared.sectionTitle}>
            <span className={shared.sectionTitleLine}>{titleLines[0]}</span>
            <span className={cn(shared.sectionTitleLine, styles.titleAccent)}>
              {titleLines[1]}
            </span>
          </h2>
          <p className={shared.sectionDescription}>{description}</p>
        </div>

        <div
          className={cn(styles.timeline)}
          role="list"
          aria-label="QA roadmap timeline"
          data-testid="roadmap-timeline"
        >
          {steps.map((step, index) => (
            <RoadmapStep key={step.id} index={index} step={step} />
          ))}
        </div>

        {/* <div className={styles.cta} data-testid="roadmap-cta">
          <p className={styles.ctaText}>{ctaText}</p>
          <Link
            href={ctaHref}
            className={buttonVariants({ variant: "homePrimary", size: "home-sm" })}
            data-testid="roadmap-start"
            data-cta="roadmap-start"
          >
            {ctaLabel}
          </Link>
        </div> */}
      </div>
    </section>
  );
}
