"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./challenges.module.css";
import { challenges } from "@/data/challenges-registry";

type StatusFilter = "all" | "incomplete" | "completed";
type DifficultyFilter = "all" | "Easy" | "Medium" | "Hard";
type ViewMode = "card" | "table";

const XP_PER_LEVEL = 25;

/* ── Icons ─────────────────────────────────────────────────── */
function IconGrid() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function IconList() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <line x1="1" y1="3.5" x2="14" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd"/>
    </svg>
  );
}

function IconClear() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8"/>
    </svg>
  );
}

/* ── Difficulty chip ────────────────────────────────────────── */
function DiffChip({ diff }: { diff: string }) {
  const cls =
    diff === "Hard"
      ? styles.chipHard
      : diff === "Medium"
      ? styles.chipMedium
      : styles.chipEasy;
  return <span className={cls}>{diff}</span>;
}

/* ── Main page ──────────────────────────────────────────────── */
export default function ChallengesDashboard() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("table");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("qap_completed_challenges") || "[]");
    setCompletedIds(saved);
    const s = parseInt(localStorage.getItem("qap_user_streak") || "0", 10);
    if (s === 0) { localStorage.setItem("qap_user_streak", "4"); setStreak(4); }
    else setStreak(s);
  }, []);

  const totalXP = completedIds.reduce((acc, id) => {
    return acc + (challenges.find((c) => c.id === id)?.xp ?? 0);
  }, 0);

  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpIntoLevel = totalXP % XP_PER_LEVEL;
  const xpProgress = (xpIntoLevel / XP_PER_LEVEL) * 100;

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      const done = completedIds.includes(c.id);
      if (status === "completed" && !done) return false;
      if (status === "incomplete" && done) return false;
      if (difficulty !== "all" && c.difficulty !== difficulty) return false;
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
  }, [completedIds, status, difficulty, search]);

  const isFiltering = status !== "all" || difficulty !== "all" || search !== "";

  function clearFilters() {
    setStatus("all");
    setDifficulty("all");
    setSearch("");
  }

  const dailyChallenge = challenges[0];

  return (
    <div className={styles.dashPage} data-testid="challenges-dashboard">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className={styles.pageHeader} data-testid="challenges-header">
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.pageTitle}>Challenges</h1>
            <p className={styles.pageSubtitle}>
              Complete challenges to earn XP, level up, and sharpen your automation skills.
            </p>
          </div>

          {/* Streak pill */}
          {streak > 0 && (
            <span className={styles.streakPill} data-testid="streak-pill">
              🔥 {streak}-day streak
            </span>
          )}
        </div>

        {/* Inline stats strip */}
        <div className={styles.statsStrip} data-testid="stats-strip">
          <div className={styles.statItem} data-testid="stat-level">
            <span className={styles.statItemIcon}>⚡</span>
            <span className={styles.statItemValue}>Level {level}</span>
            <span className={styles.statItemLabel}>·</span>
            <span className={styles.statItemLabel}>{totalXP} XP</span>
            <div className={styles.miniProgressWrap}>
              <div className={styles.miniProgressBar} style={{ width: `${xpProgress}%` }} />
            </div>
            <span className={styles.statItemMuted}>{xpIntoLevel}/{XP_PER_LEVEL} to Lvl {level + 1}</span>
          </div>
          <span className={styles.statDivider} aria-hidden="true" />
          <div className={styles.statItem} data-testid="stat-done">
            <span className={styles.statItemIcon}>✅</span>
            <span className={styles.statItemValue}>{completedIds.length}/{challenges.length}</span>
            <span className={styles.statItemLabel}>done</span>
          </div>
          <span className={styles.statDivider} aria-hidden="true" />
          <div className={styles.statItem} data-testid="stat-rank">
            <span className={styles.statItemIcon}>🏆</span>
            <span className={styles.statItemValue}>Top 15%</span>
            <span className={styles.statItemLabel}>global</span>
          </div>
        </div>
      </div>

      {/* ── Daily hero card ──────────────────────────────────── */}
      <section className={styles.heroSection} data-testid="daily-challenge-hero">
        <div className={styles.dailyHeroCard}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Daily Recommended
            </p>
            <h2 className={styles.heroTitle}>{dailyChallenge.title}</h2>
            <p className={styles.heroDesc}>{dailyChallenge.description}</p>
            <div className={styles.heroBadges}>
              <DiffChip diff={dailyChallenge.difficulty} />
              <span className={styles.xpBadge}>+{dailyChallenge.xp} XP</span>
              {dailyChallenge.tags.map((t) => (
                <span key={t} className={styles.tagPill}>{t}</span>
              ))}
            </div>
            <Link href={`/challenges/${dailyChallenge.id}`} className={styles.heroCta} data-testid="daily-challenge-cta">
              Start Challenge ⚡
            </Link>
          </div>
          <div className={styles.heroGraphic} aria-hidden="true">
            <div className={styles.mockBrowserWindow}>
              <div className={styles.mockBrowserHeader}><span /><span /><span /></div>
              <div className={styles.mockBrowserBody}>
                <div className={styles.mockNode}>&lt;my-component&gt;</div>
                <div className={`${styles.mockNode} ${styles.mockIndent}`}>#shadow-root (open)</div>
                <div className={`${styles.mockNode} ${styles.mockIndent2} ${styles.mockHighlight}`}>&lt;button&gt;Reveal&lt;/button&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + list ───────────────────────────────────── */}
      <section data-testid="challenges-list-section">

        {/* Filter bar — QA Tools style */}
        <div className={styles.filtersBar} data-testid="challenges-filters">
          {/* Search */}
          <div className={styles.searchWrap}>
            <IconSearch />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search challenges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search challenges"
              data-testid="challenges-search"
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch("")} aria-label="Clear search">
                <IconClear />
              </button>
            )}
          </div>

          {/* Difficulty select */}
          <select
            className={styles.filterSelect}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyFilter)}
            aria-label="Filter by difficulty"
            data-testid="filter-difficulty"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy (+5 XP)</option>
            <option value="Medium">Medium (+10 XP)</option>
            <option value="Hard">Hard (+15 XP)</option>
          </select>

          {/* Status select */}
          <select
            className={styles.filterSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            aria-label="Filter by status"
            data-testid="filter-status"
          >
            <option value="all">All ({challenges.length})</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>

          {/* Count + clear */}
          {isFiltering && (
            <>
              <span className={styles.resultCount} data-testid="result-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
              <button className={styles.clearFiltersBtn} onClick={clearFilters} data-testid="clear-filters">
                Clear
              </button>
            </>
          )}

          {/* View toggle */}
          <div className={styles.viewToggle} role="group" aria-label="View mode" data-testid="view-toggle">
            <button
              className={`${styles.viewBtn} ${view === "card" ? styles.viewBtnActive : ""}`}
              onClick={() => setView("card")}
              aria-label="Card view"
              aria-pressed={view === "card"}
              data-testid="view-card"
            >
              <IconGrid />
            </button>
            <button
              className={`${styles.viewBtn} ${view === "table" ? styles.viewBtnActive : ""}`}
              onClick={() => setView("table")}
              aria-label="Table view"
              aria-pressed={view === "table"}
              data-testid="view-table"
            >
              <IconList />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className={styles.emptyState} data-testid="challenges-empty">
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyText}>No challenges match your filters.</p>
            <button className={styles.emptyReset} onClick={clearFilters}>Clear filters</button>
          </div>
        )}

        {/* ── Card grid view ──────────────────────────────────── */}
        {view === "card" && filtered.length > 0 && (
          <div className={styles.chGrid} data-testid="challenges-grid">
            {filtered.map((ch) => {
              const done = completedIds.includes(ch.id);
              return (
                <Link
                  href={`/challenges/${ch.id}`}
                  key={ch.id}
                  className={`${styles.chCard} ${done ? styles.chCardDone : ""}`}
                  data-testid={`challenge-card-${ch.id}`}
                  data-difficulty={ch.difficulty.toLowerCase()}
                  data-completed={done}
                >
                  <div className={styles.chCardStatus}>
                    <span className={`${styles.statusIcon} ${!done ? styles.statusPending : ""}`}>
                      {done ? "✅" : "⭕"}
                    </span>
                  </div>
                  <div className={styles.chCardBody}>
                    <div className={styles.chCardTags}>
                      <DiffChip diff={ch.difficulty} />
                      {ch.tags.map((t) => (
                        <span key={t} className={styles.tagPill}>{t}</span>
                      ))}
                    </div>
                    <h3 className={styles.chCardTitle}>{ch.title}</h3>
                    <p className={styles.chCardDesc}>{ch.summary}</p>
                    <div className={styles.chCardFooter}>
                      <span className={`${styles.chXp} ${done ? styles.chXpDone : ""}`}>
                        +{ch.xp} XP
                      </span>
                      <span className={`${styles.cardBtn} ${done ? styles.cardBtnSecondary : styles.cardBtnPrimary}`}>
                        {done ? "Review →" : "Start →"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Table view ──────────────────────────────────────── */}
        {view === "table" && filtered.length > 0 && (
          <div className={styles.tableWrap} data-testid="challenges-table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thStatus} scope="col">Status</th>
                  <th className={styles.thTitle} scope="col">Challenge</th>
                  <th className={styles.thDiff} scope="col">Difficulty</th>
                  <th className={styles.thTags} scope="col">Tags</th>
                  <th className={styles.thXp} scope="col">XP</th>
                  <th className={styles.thAction} scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ch) => {
                  const done = completedIds.includes(ch.id);
                  return (
                    <tr
                      key={ch.id}
                      className={`${styles.tableRow} ${done ? styles.tableRowDone : ""}`}
                      data-testid={`challenge-row-${ch.id}`}
                      data-difficulty={ch.difficulty.toLowerCase()}
                      data-completed={done}
                    >
                      <td className={styles.tdStatus}>
                        <span className={`${styles.statusIcon} ${!done ? styles.statusPending : ""}`} title={done ? "Completed" : "Incomplete"}>
                          {done ? "✅" : "⭕"}
                        </span>
                      </td>
                      <td className={styles.tdTitle}>
                        <Link href={`/challenges/${ch.id}`} className={styles.tableLink}>
                          {ch.title}
                        </Link>
                        <p className={styles.tableDesc}>{ch.summary}</p>
                      </td>
                      <td className={styles.tdDiff}>
                        <DiffChip diff={ch.difficulty} />
                      </td>
                      <td className={styles.tdTags}>
                        <div className={styles.tableTags}>
                          {ch.tags.map((t) => (
                            <span key={t} className={styles.tagPill}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className={styles.tdXp}>
                        <span className={`${styles.chXp} ${done ? styles.chXpDone : ""}`}>
                          +{ch.xp} XP
                        </span>
                      </td>
                      <td className={styles.tdAction}>
                        <Link
                          href={`/challenges/${ch.id}`}
                          className={`${styles.cardBtn} ${done ? styles.cardBtnSecondary : styles.cardBtnPrimary}`}
                          data-testid={`challenge-action-${ch.id}`}
                        >
                          {done ? "Review →" : "Start →"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
