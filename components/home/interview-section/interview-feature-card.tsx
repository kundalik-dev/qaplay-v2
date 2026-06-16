import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./interview-section.module.css";

type InterviewFeatureCardProps = {
  accent: "primary" | "secondary" | "info" | "success";
  description: string;
  icon: LucideIcon;
  title: string;
  wide?: boolean;
};

function toToken(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function InterviewFeatureCard({
  accent,
  description,
  icon: Icon,
  title,
  wide = false,
}: InterviewFeatureCardProps) {
  const token = toToken(title);

  return (
    <article
      className={cn(
        styles.card,
        styles[`cardAccent-${accent}`],
        wide ? styles.cardWide : undefined,
      )}
      data-testid={`interview-card-${token}`}
      data-card={token}
    >
      <div className={styles.cardIcon} aria-hidden="true">
        <Icon strokeWidth={2} />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </article>
  );
}
