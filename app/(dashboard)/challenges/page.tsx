"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./challenges.module.css";
import { challenges } from "@/data/challenges-registry";

export default function ChallengesDashboard() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [filter, setFilter] = useState<"All" | "Incomplete" | "Completed">("All");

  useEffect(() => {
    Promise.resolve().then(() => {
      const savedCompleted = JSON.parse(localStorage.getItem("qap_completed_challenges") || "[]");
      setCompletedIds(savedCompleted);
      
      // Mock streak for now
      const savedStreak = parseInt(localStorage.getItem("qap_user_streak") || "0", 10);
      if (savedStreak === 0) {
        localStorage.setItem("qap_user_streak", "4");
        setStreak(4);
      } else {
        setStreak(savedStreak);
      }
    });
  }, []);

  const totalXP = completedIds.reduce((acc, id) => {
    const challenge = challenges.find(c => c.id === id);
    return acc + (challenge?.xp || 0);
  }, 0);

  const filteredChallenges = challenges.filter(c => {
    const isCompleted = completedIds.includes(c.id);
    if (filter === "Completed") return isCompleted;
    if (filter === "Incomplete") return !isCompleted;
    return true;
  });

  return (
    <div className={styles.dashPage}>
      {/* Welcome Widget / Top Bar */}
      <header className={styles.dashHeader}>
        <div className={styles.dashWelcome}>
          <h1 className="heading-lg" style={{ marginBottom: '8px' }}>Welcome back, Tester!</h1>
          <p className="body-lg" style={{ color: 'var(--text-muted)' }}>
            You are on a {streak}-day streak. Complete a challenge today to keep it alive!
          </p>
        </div>
        <div className={styles.dashStatsGrid}>
          <div className={styles.dashStatCard}>
            <div className={styles.statValue}>Level {Math.floor(totalXP / 100) + 1}</div>
            <div className={styles.statLabel}>Total XP: {totalXP}</div>
            <div className={styles.statProgress}>
              <div className={styles.statProgressBar} style={{ width: `${(totalXP % 100)}%` }}></div>
            </div>
          </div>
          <div className={styles.dashStatCard}>
            <div className={styles.statValue}>{completedIds.length} / {challenges.length}</div>
            <div className={styles.statLabel}>Challenges Completed</div>
          </div>
          <div className={styles.dashStatCard}>
            <div className={styles.statValue}>Top 15%</div>
            <div className={styles.statLabel}>Global Rank</div>
          </div>
        </div>
      </header>

      {/* Next Challenge / Daily Challenge Hero */}
      <section style={{ paddingTop: '24px', paddingBottom: '32px' }}>
        <div className={styles.dailyHeroCard}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
              Daily Recommended Challenge
            </div>
            <h2 className="heading-lg" style={{ marginBottom: '12px', fontSize: '28px' }}>The Ghost Element</h2>
            <p className="body-base" style={{ marginBottom: '24px', maxWidth: '500px', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Dive into Web Components. Traverse the shadow DOM to find and interact with an encapsulated button. A must-know skill for modern web automation.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
              <span className="chip-advanced">Advanced</span>
              <span className="badge" style={{ '--c': 'var(--accent2)' } as React.CSSProperties}>+100 XP</span>
              <span className="badge" style={{ '--c': 'var(--info)' } as React.CSSProperties}>Shadow DOM</span>
            </div>
            <Link href="/challenges/ghost-element" className="btn btn-primary btn-lg" style={{ display: 'inline-flex' }}>
              Start Challenge ⚡
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.mockBrowserWindow} style={{ width: '100%', maxWidth: '350px' }}>
              <div className={styles.mockBrowserHeader}><span></span><span></span><span></span></div>
              <div className={styles.mockBrowserBody}>
                <div style={{ paddingLeft: '0' }}>&lt;my-component&gt;</div>
                <div style={{ paddingLeft: '20px' }}>#shadow-root (open)</div>
                <div style={{ paddingLeft: '40px', color: 'var(--accent)', fontWeight: 700 }}>&lt;button&gt;Reveal&lt;/button&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section>
        <div className={styles.dashFiltersBar}>
          <div className={styles.filterGroup}>
            <button className={`${styles.filterPill} ${filter === 'All' ? styles.filterPillActive : ''}`} onClick={() => setFilter('All')}>All</button>
            <button className={`${styles.filterPill} ${filter === 'Incomplete' ? styles.filterPillActive : ''}`} onClick={() => setFilter('Incomplete')}>Incomplete</button>
            <button className={`${styles.filterPill} ${filter === 'Completed' ? styles.filterPillActive : ''}`} onClick={() => setFilter('Completed')}>Completed</button>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className={styles.chGrid}>
          {filteredChallenges.map(challenge => {
            const isCompleted = completedIds.includes(challenge.id);
            return (
              <Link href={`/challenges/${challenge.id}`} key={challenge.id} className={`${styles.chCard} ${isCompleted ? styles.completed : ''}`}>
                <div className={styles.chCardStatus}>
                  <span className={`${styles.statusIcon} ${!isCompleted ? styles.pending : ''}`} title={isCompleted ? "Completed" : "Incomplete"}>
                    {isCompleted ? "✅" : "⭕"}
                  </span>
                </div>
                <div className={styles.chCardBody}>
                  <div className={styles.chCardTags}>
                    <span className={challenge.difficulty === 'Hard' ? 'chip-advanced' : challenge.difficulty === 'Medium' ? 'chip-intermediate' : 'chip-beginner'}>
                      {challenge.difficulty}
                    </span>
                    {challenge.tags.map(tag => (
                      <span key={tag} className="pill-muted" style={{ fontSize: '9px', padding: '2px 6px' }}>{tag}</span>
                    ))}
                  </div>
                  <h3 className={styles.chCardTitle}>{challenge.title}</h3>
                  <p className={styles.chCardDesc}>{challenge.summary}</p>
                  <div className={styles.chCardFooter}>
                    <span className={styles.chXp} style={{ color: isCompleted ? 'var(--text-muted)' : 'var(--accent2)' }}>+{challenge.xp} XP</span>
                    <span className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm`}>
                      {isCompleted ? 'Review Code' : 'Start'}
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
