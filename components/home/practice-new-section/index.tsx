import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { practiceElements } from "@/data/home/practice-section-data";

import { PracticeNewCard } from "./practice-new-card";
import styles from "./practice-new-section.module.css";
import shared from "../shared/home-shared.module.css";

export function PracticeNewSection() {
  return (
    <section
      id="practice"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerPrimary,
        styles.section,
      )}
      aria-labelledby="practice-new-title"
      data-testid="home-practice-new"
      data-section="practice-new"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div
          className={(cn(styles.header), "flext-start flex flex-col pb-6")}
          data-testid="practice-new-header"
        >
          <div className={styles.eyebrow} data-testid="practice-new-eyebrow">
            {"// 22+ practice elements"}
          </div>

          <h2 id="practice-new-title" className={styles.title}>
            <span className={styles.titleLine}>Pick Your Challenge,</span>{" "}
            <span className={styles.titleLine}>
              Level Up Your Automation Testing.
            </span>
          </h2>

          <p className={styles.description}>
            Each element is isolated and clean. Focus on exactly what you want
            to practice without noise. Filter by difficulty level and element
            type.
          </p>
        </div>

        {/* Practice Cards */}
        <div className={styles.grid} data-testid="practice-new-grid">
          {practiceElements.map((item) => (
            <PracticeNewCard key={item.title} {...item} />
          ))}
        </div>

        {/* Practice button CTA */}
        <div className={styles.actions} data-testid="practice-new-actions">
          <Link
            href="/practice"
            className={buttonVariants({ variant: "homePrimary", size: "home" })}
            data-testid="practice-new-view-all"
            data-cta="view-all-practice-elements"
          >
            View All 14+ Elements →
          </Link>
        </div>
      </div>
    </section>
  );
}
