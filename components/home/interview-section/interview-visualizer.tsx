import type { LucideIcon } from "lucide-react";
import { AudioLines } from "lucide-react";

import styles from "./interview-section.module.css";

type InterviewFooterStat = {
  key: string;
  value: string;
};

type InterviewVisualizerProps = {
  aiIcon: LucideIcon;
  aiLabel: string;
  aiQuestion: string;
  aiRoundLabel: string;
  footerStats: InterviewFooterStat[];
  userIcon: LucideIcon;
  userLabel: string;
};

const aiWaveBars = Array.from({ length: 9 }, (_, index) => index);
const userWaveBars = Array.from({ length: 5 }, (_, index) => index);

export function InterviewVisualizer({
  aiIcon: AiIcon,
  aiLabel,
  aiQuestion,
  aiRoundLabel,
  footerStats,
  userIcon: UserIcon,
  userLabel,
}: InterviewVisualizerProps) {
  return (
    <div
      className={styles.visualizer}
      role="img"
      aria-label="AI interview voice visualizer"
      data-testid="interview-visualizer"
    >
      <div className={styles.visualizerHeader}>
        <div className={styles.liveDot} aria-hidden="true" />
        <span className={styles.visualizerHeaderLabel}>
          {aiLabel} - {aiRoundLabel}
        </span>
        <span className={styles.visualizerHeaderBadge}>
          <AudioLines className={styles.badgeIcon} aria-hidden="true" />
          Live
        </span>
      </div>

      <div className={styles.visualizerBody}>
        <div className={styles.speakerRow}>
          <div className={`${styles.avatar} ${styles.avatarAi}`} aria-hidden="true">
            <AiIcon strokeWidth={2} />
          </div>
          <div className={styles.speakerInfo}>
            <div className={styles.speakerName}>{aiLabel}</div>
            <div className={styles.speakingTag}>● Speaking...</div>
          </div>
          <div className={styles.wave} aria-hidden="true">
            {aiWaveBars.map((bar) => (
              <span key={bar} className={styles.waveBar} />
            ))}
          </div>
        </div>

        <div className={styles.question}>{aiQuestion}</div>

        <div className={styles.divider}>your turn</div>

        <div className={styles.speakerRow}>
          <div className={styles.micWrap} aria-hidden="true">
            <div className={styles.micRing} />
            <div className={styles.micRingSecondary} />
            <div className={styles.micIcon}>
              <UserIcon strokeWidth={2} />
            </div>
          </div>
          <div className={styles.speakerInfo}>
            <div className={styles.speakerName}>{userLabel}</div>
            <div className={styles.listeningTag}>● Listening...</div>
          </div>
          <div className={`${styles.wave} ${styles.userWave}`} aria-hidden="true">
            {userWaveBars.map((bar) => (
              <span key={bar} className={styles.waveBar} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.visualizerFooter} role="group" aria-label="Session stats">
        {footerStats.map((stat) => (
          <div key={stat.key} className={styles.visualizerFooterStat}>
            <div className={styles.visualizerStatValue}>{stat.value}</div>
            <div className={styles.visualizerStatKey}>{stat.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
