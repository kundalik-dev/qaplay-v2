import Link from "next/link";

import { cn } from "@/lib/utils";
import { ButtonGroup } from "@/components/ui/button-group";
import { buttonVariants } from "@/components/ui/button";

import styles from "./cta-section.module.css";
import shared from "../shared/home-shared.module.css";

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
    <section
      id="cta"
      className={cn(
        shared.section,
        shared.sectionCtaPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
      )}
      aria-labelledby="cta-title"
      data-testid="home-cta"
      data-section="cta"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={styles.shell}>
          <div className={styles.grid}>
            <div className={styles.copy}>
              <div className={cn(shared.eyebrow, styles.eyebrow)}>
                <span className={shared.eyebrowDot} aria-hidden="true" />
                Free to start — sign up to track your progress
              </div>

              <h2 id="cta-title" className={styles.title}>
                <span className={styles.titleLine}>Your Next QA Role</span>{" "}
                <span className={cn(styles.titleLine, styles.titleAccent)}>
                  Starts Here.
                </span>
              </h2>

              <p className={styles.subtitle}>
                Join thousands of QA engineers using one focused platform to
                practice real automation scenarios, rehearse interviews with AI,
                and move from preparation to offers with more confidence.
              </p>

              <ButtonGroup
                variant="home"
                className={cn(styles.actions)}
                data-testid="cta-actions"
              >
                <Link
                  href="/practice"
                  className={buttonVariants({
                    variant: "homePrimary",
                    size: "home",
                  })}
                  data-testid="cta-start-practicing"
                  data-cta="start-practicing"
                >
                  Start Practicing Free
                </Link>
                <Link
                  href="/interview-practice"
                  className={buttonVariants({
                    variant: "homeSecondary",
                    size: "home",
                  })}
                  data-testid="cta-mock-interview"
                  data-cta="mock-interview"
                >
                  Try a Mock Interview
                </Link>
                <Link
                  href="/job-crm"
                  className={buttonVariants({
                    variant: "homeGhost",
                    size: "home",
                  })}
                  data-testid="cta-browse-jobs"
                  data-cta="browse-jobs"
                >
                  Browse Jobs
                </Link>
              </ButtonGroup>

              <div className={styles.note}>
                Always free · Sign up to save scores, track progress &amp;
                unlock more
              </div>
            </div>

            <div className={styles.side}>
              <div className={styles.sideCard}>
                <div className={styles.sideLabel}>What you unlock</div>

                <div className={styles.pointList}>
                  {ctaPoints.map((point) => (
                    <div key={point.step} className={styles.point}>
                      <span className={styles.pointIcon} aria-hidden="true">
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

              <div className={styles.metrics}>
                {ctaMetrics.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <div className={styles.metricValue}>{metric.value}</div>
                    <div className={styles.metricLabel}>{metric.label}</div>
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
