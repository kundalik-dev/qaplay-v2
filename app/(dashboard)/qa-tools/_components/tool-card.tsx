import Link from "next/link";

import { TOOL_CATEGORY_LABELS } from "@/data/qa-tools/categories";
import type { QaTool, QaToolTone } from "@/data/qa-tools/types";

import { ToolBannerIcon } from "./tool-banner-icon";
import styles from "./qa-tools.module.css";

const toneClassMap: Record<QaToolTone, string> = {
  blue: styles.toneBlue,
  emerald: styles.toneEmerald,
  orange: styles.toneOrange,
  violet: styles.toneViolet,
  teal: styles.toneTeal,
  slate: styles.toneSlate,
  red: styles.toneRed,
  yellow: styles.toneYellow,
};

interface ToolCardProps {
  tool: QaTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const {
    slug,
    name,
    tagline,
    description,
    category,
    tags,
    tone,
    status,
    featured,
  } = tool;

  const isReady = status === "ready";
  const visibleTags = tags.slice(0, 3);
  const hiddenCount = tags.length - 3;

  const inner = (
    <article
      className={`${styles.card} ${toneClassMap[tone]}`}
      data-testid={`tool-card-${slug}`}
      data-card={slug}
      data-category={category}
      data-status={status}
      data-section="qa-tools-grid"
    >
      {/* Banner */}
      <div className={styles.cardBanner} aria-hidden="true">
        <div className={styles.bannerInner}>
          <span className={styles.bannerIcon}>
            <ToolBannerIcon slug={slug} />
          </span>
          {featured && isReady && (
            <span
              className={styles.featuredFlag}
              data-testid={`tool-featured-${slug}`}
            >
              ★ Featured
            </span>
          )}
          {!isReady && (
            <span
              className={styles.comingSoonFlag}
              data-testid={`tool-coming-soon-${slug}`}
            >
              Coming soon
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span
            className={styles.categoryBadge}
            data-testid={`tool-category-${slug}`}
          >
            {TOOL_CATEGORY_LABELS[category]}
          </span>
        </div>

        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardDesc}>{description}</p>

        {visibleTags.length > 0 && (
          <div className={styles.cardTags} aria-label="Tags">
            {visibleTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className={styles.tagMore}>+{hiddenCount}</span>
            )}
          </div>
        )}

        <div className={styles.cardFooter}>
          {isReady ? (
            <span className={styles.viewLink} aria-hidden="true">
              Open tool
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width={13}
                height={13}
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          ) : (
            <span
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
                fontStyle: "italic",
              }}
            >
              {tagline}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!isReady) {
    return (
      <div
        className={`${styles.cardLink} ${styles.cardDisabled}`}
        role="article"
        aria-label={`${name} — coming soon`}
        data-testid={`tool-card-link-${slug}`}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/qa-tools/${slug}`}
      className={styles.cardLink}
      aria-label={`${name} — open tool`}
      data-testid={`tool-card-link-${slug}`}
    >
      {inner}
    </Link>
  );
}
