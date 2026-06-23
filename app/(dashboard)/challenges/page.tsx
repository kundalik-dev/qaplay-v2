"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./challenges.module.css";
import { challenges } from "@/data/challenges-registry";

type StatusFilter = "All" | "Incomplete" | "Completed";
type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";

const XP_PER_LEVEL = 25;

export default function ChallengesDashboard() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedCompleted = JSON.parse(
      localStorage.getItem("qap_completed_challenges") || "[]"
    );
    setCompletedIds(savedCompleted);

    const savedStreak = parseInt(
      localStorage.getItem("qap_user_streak") || "0",
      10
    );
    if (savedStreak === 0) {
      localStorage.setItem("qap_user_streak", "4");
      setStreak(4);
    } else {
      setStreak(savedStreak);
    }
  }, []);

  const totalXP = completedIds.reduce((acc, id) => {
    const challenge = challenges.find((c) => c.id === id);
    return acc + (challenge?.xp || 0);
  }, 0);

  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpIntoLevel = totalXP % XP_PER_LEVEL;
  const xpProgress = (xpIntoLevel / XP_PER_LEVEL) * 100;

  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      const isCompleted = completedIds.includes(c.id);
      if (statusFilter === "Completed" && !isCompleted) return false;
      if (statusFilter === "Incomplete" && isCompleted) return false;
      if (difficultyFilter !== "All" && c.difficulty !== difficultyFilter)
        return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [completedIds, statusFilter, difficultyFilter, search]);

  const dailyChallenge = challenges[0];

  function toggleDifficulty(d: DifficultyFilter) {
    setDifficultyFilter((prev) => (prev === d ? "All" : d));
  }

  return (
    <div className={styles.dashPage} data-testid="challenges-dashboard">

      {/* ── Stats Header ─────────────────────────────── */}
      <header className={styles.dashHeader} data-testid="challenges-stats-header">
        <div className={styles.dashWelcome}>
          <p className={styles.eyebrow} data-testid="streak-label">
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {streak > 0 ? `🔥 ${streak}-day streak — keep it going!` : "Start your streak today"}
          </p>
          <h1 className={styles.dashTitle}>Challenges</h1>
          <p className={styles.dashSubtitle}>
            Sharpen your automation skills. Complete challenges to earn XP and level up.
          </p>
        </div>

        <div className={styles.dashStatsGrid} data-testid="challenges-stats-grid">
          <div className={styles.dashStatCard} data-testid="stat-level">
            <div className={styles.statIconRow}>
              <span className={styles.statEmoji} aria-hidden="true">⚡</span>
              <span className={styles.statBadge}>Level {level}</span>
            </div>
            <div className={styles.statValue}>{totalXP} XP</div>
            <div className={styles.statLabel}>Total earned</div>
            <div className={styles.statProgress} role="progressbar" aria-valuenow={xpProgress} aria-valuemin={0} aria-valuemax={100}>
              <div className={styles.statProgressBar} style={{ width: `${xpProgress}%` }} />
            </div>
            <div className={styles.statProgressLabel}>
              {xpIntoLevel} / {XP_PER_LEVEL} XP to Level {level + 1}
            </div>
          </div>

          <div className={styles.dashStatCard} data-testid="stat-completed">
            <div className={styles.statIconRow}>
              <span className={styles.statEmoji} aria-hidden="true">✅</span>
            </div>
            <div className={styles.statValue}>
              {completedIds.length}
              <span className={styles.statDim}> / {challenges.length}</span>
            </div>
            <div className={styles.statLabel}>Challenges done</div>
          </div>

          <div className={styles.dashStatCard} data-testid="stat-rank">
            <div className={styles.statIconRow}>
              <span className={styles.statEmoji} aria-hidden="true">🏆</span>
            </div>
            <div className={styles.statValue}>Top 15%</div>
            <div className={styles.statLabel}>Global rank</div>
          </div>
        </div>
      </header>

      {/* ── Daily Hero Card ───────────────────────────── */}
      <section className={styles.heroSection} data-testid="daily-challenge-hero">
        <div className={styles.dailyHeroCard}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Daily Recommended Challenge
            </p>
            <h2 className={styles.heroTitle}>{dailyChallenge.title}</h2>
            <p className={styles.heroDesc}>{dailyChallenge.description}</p>
            <div className={styles.heroBadges}>
              <span className={styles.chipAdvanced}>{dailyChallenge.difficulty}</span>
              <span className={styles.xpBadge}>+{dailyChallenge.xp} XP</span>
              {dailyChallenge.tags.map((tag) => (
                <span key={tag} className={styles.tagBadge}>{tag}</span>
              ))}
            </div>
            <Link
              href={`/challenges/${dailyChallenge.id}`}
              className={styles.heroCta}
              data-testid="daily-challenge-cta"
              data-cta="start-daily-challenge"
            >
              Start Challenge ⚡
            </Link>
          </div>

          <div className={styles.heroGraphic} aria-hidden="true">
            <div className={styles.mockBrowserWindow}>
              <div className={styles.mockBrowserHeader}>
                <span /><span /><span />
              </div>
              <div className={styles.mockBrowserBody}>
                <div className={styles.mockNode}>&lt;my-component&gt;</div>
                <div className={`${styles.mockNode} ${styles.mockIndent}`}>
                  #shadow-root (open)
                </div>
                <div className={`${styles.mockNode} ${styles.mockIndent2} ${styles.mockHighlight}`}>
                  &lt;button&gt;Reveal&lt;/button&gt;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────── */}
      <section data-testid="challenges-list-section">
        <div className={styles.dashFiltersBar} data-testid="challenges-filters">
          {/* Status filters */}
          <div className={styles.filterGroup} data-testid="status-filters">
            {(["All", "Incomplete", "Completed"] as StatusFilter[]).map((f) => (
              <button
                key={f}
                className={`${styles.filterPill} ${statusFilter === f ? styles.filterPillActive : ""}`}
                onClick={() => setStatusFilter(f)}
                data-testid={`filter-status-${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.filterDivider} aria-hidden="true" />

          {/* Difficulty filters */}
          <div className={styles.filterGroup} data-testid="difficulty-filters">
            <button
              className={`${styles.filterPill} ${styles.filterPillEasy} ${difficultyFilter === "Easy" ? styles.filterPillActive : ""}`}
              onClick={() => toggleDifficulty("Easy")}
              data-testid="filter-difficulty-easy"
            >
              Easy
            </button>
            <button
              className={`${styles.filterPill} ${styles.filterPillMedium} ${difficultyFilter === "Medium" ? styles.filterPillActive : ""}`}
              onClick={() => toggleDifficulty("Medium")}
              data-testid="filter-difficulty-medium"
            >
              Medium
            </button>
            <button
              className={`${styles.filterPill} ${styles.filterPillHard} ${difficultyFilter === "Hard" ? styles.filterPillActive : ""}`}
              onClick={() => toggleDifficulty("Hard")}
              data-testid="filter-difficulty-hard"
            >
              Hard
            </button>
          </div>

          {/* Search */}
          <div className={styles.filterSearchWrap}>
            <input
              type="search"
              className={styles.filterSearch}
              placeholder="Search challenges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="challenges-search"
              aria-label="Search challenges"
            />
          </div>
        </div>

        {/* Challenge Grid */}
        <div className={styles.chGrid} data-testid="challenges-grid">
          {filteredChallenges.length === 0 && (
            <div className={styles.emptyState} data-testid="challenges-empty">
              <span className={styles.emptyIcon} aria-hidden="true">🔍</span>
              <p className={styles.emptyText}>No challenges match your filters.</p>
              <button
                className={styles.emptyReset}
                onClick={() => { setStatusFilter("All"); setDifficultyFilter("All"); setSearch(""); }}
              >
                Clear filters
              </button>
            </div>
          )}

          {filteredChallenges.map((challenge) => {
            const isCompleted = completedIds.includes(challenge.id);
            return (
              <Link
                href={`/challenges/${challenge.id}`}
                key={challenge.id}
                className={`${styles.chCard} ${isCompleted ? styles.chCardCompleted : ""}`}
                data-testid={`challenge-card-${challenge.id}`}
                data-difficulty={challenge.difficulty.toLowerCase()}
                data-completed={isCompleted}
                data-card="challenge"
              >
                <div className={styles.chCardStatus}>
                  <span
                    className={`${styles.statusIcon} ${!isCompleted ? styles.statusPending : ""}`}
                    title={isCompleted ? "Completed" : "Incomplete"}
                    aria-label={isCompleted ? "Completed" : "Incomplete"}
                  >
                    {isCompleted ? "✅" : "⭕"}
                  </span>
                </div>

                <div className={styles.chCardBody}>
                  <div className={styles.chCardTags}>
                    <span
                      className={
                        challenge.difficulty === "Hard"
                          ? styles.chipAdvanced
                          : challenge.difficulty === "Medium"
                          ? styles.chipIntermediate
                          : styles.chipBeginner
                      }
                      data-level={challenge.difficulty.toLowerCase()}
                    >
                      {challenge.difficulty}
                    </span>
                    {challenge.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>{tag}</span>
                    ))}
                  </div>

                  <h3 className={styles.chCardTitle}>{challenge.title}</h3>
                  <p className={styles.chCardDesc}>{challenge.summary}</p>

                  <div className={styles.chCardFooter}>
                    <span className={`${styles.chXp} ${isCompleted ? styles.chXpDone : ""}`}>
                      +{challenge.xp} XP
                    </span>
                    <span className={`${styles.cardBtn} ${isCompleted ? styles.cardBtnSecondary : styles.cardBtnPrimary}`}>
                      {isCompleted ? "Review →" : "Start →"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
