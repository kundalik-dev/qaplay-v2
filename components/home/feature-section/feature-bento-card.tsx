import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./feature-section.module.css";

type FeatureBentoCardProps = {
  badge?: string;
  className?: string;
  description: string;
  icon: LucideIcon;
  href: string;
  linkLabel: string;
  title: string;
};

export function FeatureBentoCard({
  badge,
  className,
  description,
  icon: Icon,
  href,
  linkLabel,
  title,
}: FeatureBentoCardProps) {
  return (
    <article
      className={cn(
        styles["feature-bento-card"],
        className ? styles[className] : undefined,
      )}
    >
      {badge ? (
        <span className={styles["feature-bento-badge"]}>{badge}</span>
      ) : null}
      <div className={styles["feature-bento-icon"]} aria-hidden="true">
        <Icon strokeWidth={2} />
      </div>
      <div className={styles["feature-bento-content"]}>
        <h3 className={styles["feature-bento-title"]}>{title}</h3>
        <p className={styles["feature-bento-description"]}>{description}</p>
        <Link href={href} className={styles["feature-bento-link"]}>
          {linkLabel}
        </Link>
      </div>
    </article>
  );
}
