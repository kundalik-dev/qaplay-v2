import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type {
  PracticeCard,
  PracticeLevel,
} from "@/data/practice-data/practice-elements-data";

import styles from "./practice-page.module.css";

const levelStyleMap: Record<PracticeLevel, string> = {
  Beginner: styles.levelBeginner,
  Intermediate: styles.levelIntermediate,
  Advanced: styles.levelAdvanced,
};

interface PracticeCardProps {
  card: PracticeCard;
}

export function PracticeElementCard({ card }: PracticeCardProps) {
  const {
    href,
    iconSrc,
    iconAlt,
    title,
    description,
    level,
    tag,
    isExternal,
    testId,
  } = card;

  const testIdValue =
    testId ??
    title
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={styles.card}
      data-testid={`practice-card-${testIdValue}`}
      data-card={testIdValue}
      data-level={level.toLowerCase()}
      data-section="practice-grid"
      data-supported-frameworks="playwright selenium cypress"
      {...externalProps}
    >
      {/* ── Card Header: title + level badge + icon ── */}
      <div className={styles.cardHeader}>
        <div className={styles.cardMeta}>
          <h3 className={styles.cardTitle}>{title}</h3>

          <span
            className={cn(styles.levelBadge, levelStyleMap[level])}
            data-level={level.toLowerCase()}
          >
            <span className={styles.levelDot} aria-hidden="true" />
            {level}
          </span>
        </div>

        <div className={styles.iconBox} aria-hidden="true">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={26}
            height={26}
            className="object-contain"
          />
        </div>
      </div>

      {/* ── Description ── */}
      <p className={styles.cardDescription}>{description}</p>

      {/* ── Footer: Practice now link + tag pill ── */}
      <div className={styles.cardFooter}>
        <span className={styles.practiceLink} aria-label={`Practice ${title}`}>
          Practice now
          {/* Arrow icon */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>

        <span className={styles.tagPill} aria-label={`Category: ${tag}`}>
          {tag}
        </span>
      </div>
    </Link>
  );
}
