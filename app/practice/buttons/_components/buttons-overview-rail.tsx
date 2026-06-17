"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, GraduationCap, Video } from "lucide-react";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./buttons-overview-rail.module.css";

type FrameworkKey = "selenium" | "playwright";

const frameworkOptions: Array<{
  key: FrameworkKey;
  tabTitle: string;
  tabMeta?: string;
  label: string;
  methods: Array<{ label: string; dotClass: string }>;
}> = [
  {
    key: "selenium",
    tabTitle: "Selenium",
    tabMeta: "Java",
    label: "Selenium (Java)",
    methods: [
      { label: "click()", dotClass: styles.dotPurple },
      { label: "doubleClick()", dotClass: styles.dotBlue },
      { label: "contextClick()", dotClass: styles.dotOrange },
      { label: "isEnabled()", dotClass: styles.dotGreen },
      { label: "getLocation()", dotClass: styles.dotSlate },
    ],
  },
  {
    key: "playwright",
    tabTitle: "Playwright",
    tabMeta: "JS / PY",
    label: "Playwright (JS/PY)",
    methods: [
      { label: "click()", dotClass: styles.dotPurple },
      { label: "dblclick()", dotClass: styles.dotBlue },
      { label: "click({ button: 'right' })", dotClass: styles.dotOrange },
      { label: "isEnabled()", dotClass: styles.dotGreen },
      { label: "boundingBox()", dotClass: styles.dotSlate },
    ],
  },
];

interface ButtonsOverviewRailProps {
  upNext: PracticePageMeta["upNext"];
}

export function ButtonsOverviewRail({ upNext }: ButtonsOverviewRailProps) {
  const [activeFramework, setActiveFramework] = useState<FrameworkKey>("selenium");

  const framework =
    frameworkOptions.find(({ key }) => key === activeFramework) ?? frameworkOptions[0];

  return (
    <aside className={styles.rail} data-testid="buttons-overview-rail">
      <section className={styles.learnCard} aria-labelledby="buttons-overview-title">
        <header className={styles.cardHeader}>
          <h2 id="buttons-overview-title" className={styles.cardTitle}>
            What You&apos;ll Learn
          </h2>
          <span className={styles.titleIcon} aria-hidden="true">
            <GraduationCap size={18} strokeWidth={2} />
          </span>
        </header>

        <div className={styles.cardBody}>
          <div className={styles.tabs} role="tablist" aria-label="Framework lessons">
            {frameworkOptions.map((option) => {
              const isActive = option.key === activeFramework;

              return (
                <button
                  key={option.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveFramework(option.key)}
                >
                  <span className={styles.tabText}>
                    <span className={styles.tabTitle}>{option.tabTitle}</span>
                    {option.tabMeta ? (
                      <span className={styles.tabMeta}>{option.tabMeta}</span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <p className={styles.frameworkLabel}>{framework.label}</p>

          <ul className={styles.methodList}>
            {framework.methods.map((method) => (
              <li key={method.label} className={styles.methodItem}>
                <span className={`${styles.methodDot} ${method.dotClass}`} aria-hidden="true" />
                <span>{method.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.cardFooter}>
          <Video size={14} strokeWidth={2} aria-hidden="true" />
          <span>Tutorial video coming soon</span>
        </footer>
      </section>

      <p className={styles.sectionLabel}>Up Next</p>

      <Link href={upNext.href} className={styles.nextCard} data-testid="buttons-up-next-card">
        <span className={styles.nextIcon} aria-hidden="true">
          <FileText size={18} strokeWidth={2} />
        </span>

        <span className={styles.nextText}>
          <span className={styles.nextTitle}>{upNext.title}</span>
          <span className={styles.nextDescription}>{upNext.description}</span>
        </span>

        <span className={styles.nextArrow} aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2} />
        </span>
      </Link>
    </aside>
  );
}
