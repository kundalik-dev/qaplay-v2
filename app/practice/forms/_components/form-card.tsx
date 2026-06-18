"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./forms.module.css";

type FormLevel = "Beginner" | "Medium" | "Hard" | "Challenge";

interface FormCardProps {
  id: string;
  title: string;
  level: FormLevel;
  hint: string;
  testId: string;
  children: React.ReactNode;
}

const levelClass: Record<FormLevel, string> = {
  Beginner: styles.levelBeginner,
  Medium: styles.levelMedium,
  Hard: styles.levelHard,
  Challenge: styles.levelChallenge,
};

export function FormCard({
  id,
  title,
  level,
  hint,
  testId,
  children,
}: FormCardProps) {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <div className={styles.formCard} data-testid={testId} data-form-id={id}>
      {/* Header */}
      <div className={styles.formCardHeader}>
        <span className={styles.formCardId}>{id}</span>
        <span className={styles.formCardTitle}>{title}</span>
        <span className={cn(styles.formCardLevel, levelClass[level])}>
          {level}
        </span>
      </div>

      {/* Form content */}
      <div className={styles.formCardBody}>{children}</div>

      {/* Hint toggle */}
      <div className={styles.formCardHintRow}>
        <button
          type="button"
          className={cn(styles.hintBtn, hintOpen ? styles.hintBtnOpen : "")}
          onClick={() => setHintOpen((o) => !o)}
        >
          💡 {hintOpen ? "Hide Hint" : "Show Hint"}
        </button>
      </div>

      {hintOpen && (
        <div className={styles.hintBody} data-testid={`${testId}-hint`}>
          <span aria-hidden="true">💡</span>
          <span dangerouslySetInnerHTML={{ __html: hint }} />
        </div>
      )}
    </div>
  );
}
