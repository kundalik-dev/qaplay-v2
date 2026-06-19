import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ChromeExtension, ChromeTone } from "@/data/chrome/types";

import { chromeIconMap } from "../_shared/chrome-page-helpers";
import styles from "./chrome-extensions.module.css";

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
  const { id, name, description, category, tags, icon, tone, storeUrl, internal, featured, downloads } = extension;

  const Icon = chromeIconMap[icon];
  const visibleTags = tags.slice(0, 3);
  const hiddenCount = tags.length - 3;

  const sharedProps = {
    "data-testid": `chrome-card-link-${id}`,
    className: styles.cardLink,
  } as const;

  const inner = (
    <article
      className={cn(styles.card, toneClassMap[tone])}
      data-testid={`chrome-extension-card-${id}`}
      data-card={id}
      data-category={category}
      data-section="chrome-extensions-grid"
    >
      {/* Feature image banner */}
      <div className={styles.cardImage} aria-hidden="true">
        <div className={styles.bannerInner}>
          <span className={styles.bannerIcon}>
            <Icon />
          </span>
          {featured && (
            <span className={styles.featuredFlag} data-testid="chrome-featured">
              <svg viewBox="0 0 16 16" fill="currentColor" stroke="none" aria-hidden="true" width={9} height={9}>
                <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3 4.2 13.3l.7-4.3-3.1-3 4.3-.6z" />
              </svg>
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.categoryBadge} data-testid="chrome-category-tag">
            {category}
          </span>
        </div>

        <h2 className={styles.cardTitle}>{name}</h2>

        <p className={styles.cardDesc}>{description}</p>

        {visibleTags.length > 0 && (
          <div className={styles.cardTags} aria-label="Tags">
            {visibleTags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            {hiddenCount > 0 && (
              <span className={styles.tagMore}>+{hiddenCount}</span>
            )}
          </div>
        )}

        {/* Footer: downloads + view link */}
        <div className={styles.cardFooter}>
          {downloads ? (
            <span className={styles.downloads} data-testid={`chrome-downloads-${id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloads}
            </span>
          ) : (
            <span />
          )}
          <span className={styles.viewLink} aria-hidden="true">
            {internal ? "View details" : "View extension"}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={13} height={13}>
              {internal ? (
                <path d="M3 8h10M9 4l4 4-4 4" />
              ) : (
                <path d="M6 3h7v7M13 3L6 10M11 9v3.5a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7" />
              )}
            </svg>
          </span>
        </div>
      </div>
    </article>
  );

  if (internal) {
    return (
      <Link href={storeUrl} aria-label={`${name} — view details`} {...sharedProps}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={storeUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} — open on the Chrome Web Store`} {...sharedProps}>
      {inner}
    </a>
  );
}
