"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import styles from "../challenges.module.css";
import type { ChallengeMeta } from "@/data/challenges-registry";
import AiValidationBox from "./AiValidationBox";
import { ChallengeProblemStatement } from "./challenge-problem-statement";
import { ChallengeInstructions } from "./challenge-instructions";
import { ChallengeHints } from "./challenge-hints";

interface Props {
  challenge: ChallengeMeta;
  children: ReactNode;
}

function DifficultyChip({
  difficulty,
}: {
  difficulty: ChallengeMeta["difficulty"];
}) {
  const cls =
    difficulty === "Hard"
      ? styles.chipAdvanced
      : difficulty === "Medium"
        ? styles.chipIntermediate
        : styles.chipBeginner;
  return <span className={cls}>{difficulty}</span>;
}

export default function ChallengeWorkspaceLayout({
  challenge,
  children,
}: Props) {
  const [activeDrawer, setActiveDrawer] = useState<
    "instructions" | "hints" | "solution" | null
  >(null);

  const showSubmitButton = false; // TODO: Implement logic to determine if the submit button should be shown
  return (
    <div
      className={styles.challengePage}
      data-testid="challenge-workspace"
      data-page="challenges"
    >
      {/* ── Challenge Header ── */}
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

      {/* ── Split-screen workspace ── */}
      <div
        className={styles.challengeWorkspace}
        data-testid="challenge-split-view"
      >
        {/* LEFT — Problem → Instructions → Hints → AI Validation */}
        <div className={styles.leftColumn}>
          {/* 1. Problem statement + expected behavior (Card 1) */}
          <div
            className={`${styles.chPanel} ${styles.chLeft}`}
            data-testid="challenge-problem-panel"
            style={{ marginBottom: "24px" }}
          >
            <ChallengeProblemStatement challenge={challenge} />
          </div>

          {/* Drawer Toggle Buttons Row (Outside Card) */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <button
              type="button"
              className={`${styles.hintTriggerBtn} ${activeDrawer === "instructions" ? styles.hintTriggerBtnOpen : ""}`}
              onClick={() =>
                setActiveDrawer((v) =>
                  v === "instructions" ? null : "instructions",
                )
              }
            >
              <span aria-hidden="true">📋</span>
              Instructions
              <span className={styles.hintCountBadge}>
                {challenge.instructions.length}
              </span>
            </button>

            {challenge.hints && challenge.hints.length > 0 && (
              <button
                type="button"
                className={`${styles.hintTriggerBtn} ${activeDrawer === "hints" ? styles.hintTriggerBtnOpen : ""}`}
                onClick={() =>
                  setActiveDrawer((v) => (v === "hints" ? null : "hints"))
                }
              >
                <span aria-hidden="true">💡</span>
                Show Hints
                <span className={styles.hintCountBadge}>
                  {challenge.hints.length}
                </span>
              </button>
            )}

            {showSubmitButton && (
              <button
                type="button"
                className={`${styles.hintTriggerBtn} ${activeDrawer === "solution" ? styles.hintTriggerBtnOpen : ""}`}
                onClick={() =>
                  setActiveDrawer((v) => (v === "solution" ? null : "solution"))
                }
              >
                <span aria-hidden="true">🤖</span>
                Submit Solution
              </button>
            )}
          </div>

          {/* Drawer Bodies (Card 2) */}
          {activeDrawer && (
            <div
              className={`${styles.chPanel} ${styles.chLeft}`}
              data-testid="challenge-drawer-panel"
            >
              {/* 2. Instructions accordion body */}
              {activeDrawer === "instructions" && (
                <ChallengeInstructions instructions={challenge.instructions} />
              )}

              {/* 3. Hints body */}
              {activeDrawer === "hints" &&
                challenge.hints &&
                challenge.hints.length > 0 && (
                  <div className={styles.hintsWrapper}>
                    <ChallengeHints
                      hints={challenge.hints}
                      challengeId={challenge.id}
                    />
                  </div>
                )}

              {/* 4. AI submission + validation body */}
              {activeDrawer === "solution" && (
                <AiValidationBox challenge={challenge} />
              )}
            </div>
          )}
        </div>

        {/* RIGHT — Target UI playground */}
        <div
          className={`${styles.chPanel} ${styles.chRight}`}
          data-testid="challenge-right-panel"
        >
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
