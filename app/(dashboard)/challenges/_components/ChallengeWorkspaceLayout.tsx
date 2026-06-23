"use client";

import Link from "next/link";
import styles from "../challenges.module.css";
import { ChallengeMeta } from "@/data/challenges-registry";
import AiValidationBox from "./AiValidationBox";

export default function ChallengeWorkspaceLayout({ challenge, children }: { challenge: ChallengeMeta, children: React.ReactNode }) {
  return (
    <div className={styles.challengePage}>
      {/* Challenge Header */}
      <header className={styles.challengeHeader}>
        <div className={styles.chBreadcrumbs}>
          <Link href="/challenges">Challenges</Link> <span className="sep">/</span> <span className="current" style={{ color: 'var(--text)' }}>{challenge.title}</span>
        </div>
        <div className={styles.chTitleRow}>
          <h1 className="heading-lg" style={{ margin: 0 }}>{challenge.title}</h1>
          <div className={styles.chBadges}>
            <span className={challenge.difficulty === 'Hard' ? 'chip-advanced' : challenge.difficulty === 'Medium' ? 'chip-intermediate' : 'chip-beginner'}>
              {challenge.difficulty}
            </span>
            <span className="badge" style={{ '--c': 'var(--accent2)' } as React.CSSProperties}>+{challenge.xp} XP</span>
          </div>
        </div>
        <p className={styles.chDesc}>{challenge.description}</p>
      </header>

      {/* Main Workspace Split View */}
      <div className={styles.challengeWorkspace}>
        
        {/* LEFT PANEL: Instructions & Submission */}
        <div className={`${styles.chPanel} ${styles.chLeft}`}>
          <div className={styles.panelSection}>
            <h2 className="heading-sm">📝 Instructions</h2>
            <ul className={styles.chTaskList}>
              {challenge.instructions.map((inst, idx) => (
                <li key={idx}>
                  <span className={styles.tick}>{idx + 1}</span> 
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          <AiValidationBox challenge={challenge} />
        </div>

        {/* RIGHT PANEL: The Target UI (Playground) */}
        <div className={`${styles.chPanel} ${styles.chRight}`}>
          <div className={styles.panelHeader}>
            <div className={styles.windowControls}><span></span><span></span><span></span></div>
            <div className={styles.windowTitle}>Target UI Playground</div>
          </div>
          <div className={styles.playgroundArea}>
            <div className={styles.pgInstructions}>
              <p style={{ margin: 0, fontSize: '13px' }}>The target component is rendered below. Do not interact with it manually—use your script!</p>
            </div>
            
            {/* INJECT DYNAMIC PLAYGROUND HERE */}
            {children}

          </div>
        </div>

      </div>
    </div>
  );
}
