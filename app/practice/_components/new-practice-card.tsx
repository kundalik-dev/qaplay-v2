import Link from "next/link";

import { cn } from "@/lib/utils";
import type { PracticeCard } from "@/data/practice-data/practice-elements-data";

import styles from "./new-practice-page.module.css";

interface NewPracticeCardProps {
  card: PracticeCard;
}

export function NewPracticeCard({ card }: NewPracticeCardProps) {
  const { href, iconSrc, iconAlt, title, level, isExternal, testId } = card;

  const testIdValue =
    testId ??
    title
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const levelClassName = level.toLowerCase();
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={styles.card}
      data-testid={`new-practice-card-${testIdValue}`}
      data-card={testIdValue}
      data-level={levelClassName}
      data-section="new-practice-grid"
      data-supported-frameworks="playwright selenium cypress"
      {...externalProps}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon}>
          {/* Static local SVG served from /public — plain <img> avoids an
              extra /_next/image hop for these small icons. */}
          <img
            src={iconSrc}
            alt={iconAlt}
            width={18}
            height={18}
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>

      <div className={styles.copy}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={cn(styles.level, styles[`level-${levelClassName}`])}>
          {level}
        </span>
      </div>
    </Link>
  );
}
