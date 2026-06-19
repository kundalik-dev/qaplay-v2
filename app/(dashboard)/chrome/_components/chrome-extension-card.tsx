import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ChromeExtension, ChromeTone } from "@/data/chrome/types";

import { chromeIconMap } from "../_shared/chrome-page-helpers";
import styles from "./chrome-extensions.module.css";

/** Maps a brand tone to the module class that sets `--banner-tone`. */
const toneClassMap: Record<ChromeTone, string> = {
  blue: styles.toneBlue,
  emerald: styles.toneEmerald,
  orange: styles.toneOrange,
  red: styles.toneRed,
  slate: styles.toneSlate,
  teal: styles.toneTeal,
  violet: styles.toneViolet,
  yellow: styles.toneYellow,
};

interface ChromeExtensionCardProps {
  extension: ChromeExtension;
}

export function ChromeExtensionCard({ extension }: ChromeExtensionCardProps) {
  const {
    id,
    name,
    tagline,
    description,
    category,
    tags,
    icon,
    tone,
    storeUrl,
    internal,
    developer,
    featured,
  } = extension;

  const Icon = chromeIconMap[icon];
  const ctaLabel = internal ? "View details" : "View on store";

  const content = (
    <>
      {/* ── Banner (image section) ── */}
      <div className={styles.banner} aria-hidden="true">
        <span className={styles.bannerIcon}>
          <Icon />
        </span>

        {featured ? (
          <span className={styles.featuredFlag} data-testid="chrome-featured">
            {/* Star icon */}
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              stroke="none"
              aria-hidden="true"
            >
              <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3 4.2 13.3l.7-4.3-3.1-3 4.3-.6z" />
            </svg>
            Featured
          </span>
        ) : null}
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <span className={styles.categoryTag} data-testid="chrome-category-tag">
          {category}
        </span>

        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.description}>{description}</p>

        <div className={styles.tags} aria-label="Tags">
          {tags.map((tag) => (
            <span key={tag} className={styles.tagPill}>
              #{tag}
            </span>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <span className={styles.developer} title={`By ${developer}`}>
            By {developer}
          </span>

          <span className={styles.installLink} aria-hidden="true">
            {ctaLabel}
            {internal ? (
              /* Internal route — right arrow */
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
            ) : (
              /* External store — open-in-new arrow */
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 3h7v7M13 3L6 10M11 9v3.5a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7" />
              </svg>
            )}
          </span>
        </div>
      </div>
    </>
  );

  const sharedProps = {
    className: cn(styles.card, toneClassMap[tone]),
    "data-testid": `chrome-extension-card-${id}`,
    "data-card": id,
    "data-category": category,
    "data-section": "chrome-extensions-grid",
  } as const;

  // Our own extensions link to internal routes (same tab); third-party ones
  // open the Chrome Web Store in a new tab.
  if (internal) {
    return (
      <Link
        href={storeUrl}
        aria-label={`${name} — view details`}
        {...sharedProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — open on the Chrome Web Store`}
      {...sharedProps}
    >
      {content}
    </a>
  );
}
