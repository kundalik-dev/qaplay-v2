import Link from "next/link";

import { cn } from "@/lib/utils";
import { ButtonGroup } from "@/components/ui/button-group";
import { buttonVariants } from "@/components/ui/button";

import { PracticeDifficultyCard } from "./practice-difficulty-card";
import { PracticePill } from "./practice-pill";
import styles from "./practice-section.module.css";
import shared from "../shared/home-shared.module.css";

const difficultyCards = [
  {
    title: "Beginner",
    count: "3 Elements",
    description: "Forms & Inputs - Dropdowns - Modal Windows",
    tone: "beginner" as const,
  },
  {
    title: "Intermediate",
    count: "5 Elements",
    description: "Alerts - iFrames - Data Tables - Date Pickers - Multi-Tab",
    tone: "intermediate" as const,
  },
  {
    title: "Advanced",
    count: "4 Elements",
    description: "Shadow DOM - Drag & Drop - Dynamic Waits - Infinite Scroll",
    tone: "advanced" as const,
  },
];

const practicePills = [
  { href: "/practice/input", label: "Forms & Inputs", level: "Beginner" as const, icon: "IN" },
  { href: "/practice/alert", label: "Alerts & Dialogs", level: "Intermediate" as const, icon: "AL" },
  { href: "/practice", label: "Drag & Drop", level: "Advanced" as const, icon: "DD" },
  { href: "/practice", label: "iFrames", level: "Intermediate" as const, icon: "IF" },
  { href: "/practice", label: "Shadow DOM", level: "Advanced" as const, icon: "SD" },
  { href: "/practice", label: "Dynamic Waits", level: "Advanced" as const, icon: "DW" },
  { href: "/practice/simple-table", label: "Data Tables", level: "Intermediate" as const, icon: "DT" },
  { href: "/practice", label: "Dropdowns", level: "Beginner" as const, icon: "DR" },
  { href: "/practice", label: "Date Pickers", level: "Intermediate" as const, icon: "DP" },
  { href: "/practice", label: "Modal Windows", level: "Beginner" as const, icon: "MW" },
  { href: "/practice", label: "Infinite Scroll", level: "Advanced" as const, icon: "IS" },
  { href: "/practice", label: "Multi-Tab Windows", level: "Intermediate" as const, icon: "MT" },
] as const;

export function PracticeSection() {
  return (
    <section
      id="practice"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerPrimary,
      )}
      aria-labelledby="practice-title"
    >
      <div className="home-shell">
        <div className={styles.header}>
          <div className={shared.sectionTag}>{"// 22+ practice elements"}</div>
          <h2 id="practice-title" className={styles.title}>
            <span className={styles.titleLine}>Pick Your Challenge,</span>
            <span className={styles.titleLine}>Level Up Your Skills</span>
          </h2>
          <p className={styles.description}>
            Practice SEO-friendly, crawlable QA learning content with real UI
            patterns you will meet in interviews and on the job. No noise, no
            boilerplate, just focused practice.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <div className={styles.difficultyGrid}>
              {difficultyCards.map((card) => (
                <PracticeDifficultyCard key={card.title} {...card} />
              ))}
            </div>

            <p className={styles.note}>
              <span className={styles.noteBadge} aria-hidden="true">
                QA
              </span>
              Framework-agnostic - stable IDs &amp; selectors work with
              Selenium, Playwright, Cypress, and pytest.
            </p>

            <ButtonGroup variant="home" className={styles.actions}>
              <Link
                href="/practice"
                className={buttonVariants({
                  variant: "homePrimary",
                  size: "home-sm",
                })}
              >
                View All 22+ Elements
              </Link>
              <Link
                href="/practice#challenges"
                className={buttonVariants({
                  variant: "homeSecondary",
                  size: "home-sm",
                })}
              >
                Browse by Level
              </Link>
            </ButtonGroup>
          </div>

          <div className={styles.gridShell}>
            <div className={styles.grid}>
              {practicePills.map((pill) => (
                <PracticePill key={`${pill.label}-${pill.level}`} {...pill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
