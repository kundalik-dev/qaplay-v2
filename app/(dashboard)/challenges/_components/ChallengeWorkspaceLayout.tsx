"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "../challenges.module.css";
import type { ChallengeMeta } from "@/data/challenges-registry";
import AiValidationBox from "./AiValidationBox";

interface Props {
  challenge: ChallengeMeta;
  children: ReactNode;
}

function DifficultyChip({ difficulty }: { difficulty: ChallengeMeta["difficulty"] }) {
  const cls =
    difficulty === "Hard"
      ? styles.chipAdvanced
      : difficulty === "Medium"
      ? styles.chipIntermediate
      : styles.chipBeginner;
  return <span className={cls}>{difficulty}</span>;
}

export default function ChallengeWorkspaceLayout({ challenge, children }: Props) {
  return (
    <div className={styles.challengePage} data-testid="challenge-workspace">

      {/* Challenge Header */}
      <header className={styles.challengeHeader} data-testid="challenge-header">
        <nav className={styles.chBreadcrumbs} aria-label="Breadcrumb">
          <Link href="/challenges">Challenges</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{challenge.title}</span>
        </nav>

        <div className={styles.chTitleRow}>
          <h1 className={styles.headingLg}>{challenge.title}</h1>
          <div className={styles.chBadges}>
            <DifficultyChip difficulty={challenge.difficulty} />
            <span className={styles.xpBadge} data-testid="challenge-xp-badge">
              +{challenge.xp} XP
            </span>
          </div>
        </div>

        <p className={styles.chDesc} data-testid="challenge-description">
          {challenge.description}
        </p>
      </header>

      {/* Split-screen workspace */}
      <div className={styles.challengeWorkspace} data-testid="challenge-split-view">

        {/* LEFT — Instructions + AI validation */}
        <div className={`${styles.chPanel} ${styles.chLeft}`} data-testid="challenge-left-panel">
          <div className={styles.panelSection} data-testid="challenge-instructions">
            <h2 className={styles.headingSm}>📝 Instructions</h2>
            <ol className={styles.chTaskList}>
              {challenge.instructions.map((step, idx) => (
                <li key={idx}>
                  <span className={styles.tick} aria-hidden="true">{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <AiValidationBox challenge={challenge} />
        </div>

        {/* RIGHT — Target UI playground */}
        <div className={`${styles.chPanel} ${styles.chRight}`} data-testid="challenge-right-panel">
          <div className={styles.panelHeader} aria-hidden="true">
            <div className={styles.windowControls}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.windowTitle}>Target UI Playground</div>
          </div>

          <div className={styles.playgroundArea} data-testid="playground-area">
            <div className={styles.pgInstructions} role="note">
              The target component is rendered below. Do not interact with it
              manually — use your automation script!
            </div>

            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
