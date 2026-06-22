"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  demoAppCards,
  demoAppFilters,
  type DemoAppFilter,
} from "@/data/demo/demo-apps-data";
import { cn } from "@/lib/utils";

import styles from "./demo-app-catalog.module.css";

export function DemoAppCatalog() {
  const [activeFilter, setActiveFilter] = useState<DemoAppFilter>("all");

  const filteredApps = demoAppCards.filter((card) =>
    card.filters.includes(activeFilter),
  );

  return (
    <section className={styles.section} aria-labelledby="demo-apps-title">
      <div className={cn("home-shell", styles.inner)}>
        <div className={styles.header}>
          <h1 id="demo-apps-title" className={styles.title}>
            QA <span className={styles.accent}>Demo Apps</span>
          </h1>

          <p className={styles.description}>
            Pick a practice app, filter by category, and jump straight into UI
            or end-to-end automation flows.
          </p>

          <div className={styles.filterRow} aria-label="Filter demo apps">
            {demoAppFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                className={cn(
                  styles.filterPill,
                  styles[
                    `filterPill${filter.tone[0].toUpperCase()}${filter.tone.slice(1)}`
                  ],
                  activeFilter === filter.value && styles.filterPillActive,
                )}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredApps.length > 0 ? (
          <div className={styles.grid}>
            {filteredApps.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                target={card.title.includes("Bank") ? "_blank" : undefined}
                rel={card.title.includes("Bank") ? "noopener noreferrer" : undefined}
                className={cn(
                  styles.card,
                  card.title.includes("Bank")
                    ? styles.cardBank
                    : styles.cardShopping,
                )}
              >
                <div className={styles.media}>
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={520}
                    height={280}
                    className={styles.mediaImage}
                  />
                </div>

                <div className={styles.cardTop}>
                  <div className={styles.cardEyebrow}>{card.eyebrow}</div>
                  <div className={styles.cardBadge}>{card.badge}</div>
                </div>

                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDescription}>{card.description}</p>

                <div className={styles.highlightList}>
                  {card.highlights.slice(0, 2).map((highlight) => (
                    <div key={highlight} className={styles.highlightItem}>
                      <span
                        className={styles.highlightDot}
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                    {card.filters
                      .filter((filter) => filter !== "all")
                      .map((filter) => filter.toUpperCase())
                      .join(" / ")}
                  </div>

                  <span className={styles.cardLink}>Open demo app</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            API demo projects are coming next. For now, use the UI and E2E demo
            apps to practice realistic automation journeys.
          </div>
        )}
      </div>
    </section>
  );
}
