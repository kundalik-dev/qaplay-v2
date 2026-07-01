"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "../../_components/css-modules/playground.module.css";
import { ALERT_CARDS_DATA } from "./data/alert-cards-data";
import { ALERT_CARDS } from "./cards/alert-cards";

export function AlertPracticePlayground() {
  const [currentCard, setCurrentCard] = useState(0);
  const total = ALERT_CARDS_DATA.length;
  const meta = ALERT_CARDS_DATA[currentCard];

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < total) setCurrentCard(idx);
  };

  const ActiveCard = ALERT_CARDS[currentCard];

  return (
    <div className={styles.playground} data-testid="alert-practice-playground">
      {/* ── Active card ────────────────────────────────────────────────────── */}
      <div data-testid={`practice-card-${currentCard + 1}`}>
        <ActiveCard index={currentCard + 1} />
      </div>

      {/* ── Pagination (below card) ────────────────────────────────────────── */}
      <div className={styles.paginationHeader}>
        <div className={styles.paginationMeta}>
          <span className={styles.groupLabel}>{meta.group}</span>
          <span className={styles.cardCounter}>
            {currentCard + 1} / {total}
          </span>
        </div>

        {/* Prev / Next */}
        <div className={styles.paginationControls}>
          <button
            className={styles.navBtn}
            onClick={() => goTo(currentCard - 1)}
            disabled={currentCard === 0}
            data-testid="practice-prev"
            aria-label="Previous scenario"
          >
            <ChevronLeft size={15} />
            <span>Prev</span>
          </button>

          {/* Number badges */}
          <div className={styles.badges} aria-label="Scenario navigation">
            {ALERT_CARDS.map((_, i) => (
              <button
                key={i}
                className={`${styles.badge} ${i === currentCard ? styles.badgeActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to scenario ${i + 1}`}
                aria-current={i === currentCard ? "step" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => goTo(currentCard + 1)}
            disabled={currentCard === total - 1}
            data-testid="practice-next"
            aria-label="Next scenario"
          >
            <span>Next</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
