import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import shared from "../shared/home-shared.module.css";
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
    <Link
      href={href}
      className={cn(
        styles["feature-bento-card"],
        className ? styles[className] : undefined,
      )}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {badge ? (
        <span className={cn(shared.homeBadge, styles["feature-bento-badge"])}>
          {badge}
        </span>
      ) : null}
      <div
        className={cn(shared.homeIconBox, styles["feature-bento-icon"])}
        aria-hidden="true"
      >
        <Icon strokeWidth={2} />
      </div>
      <div className={styles["feature-bento-content"]}>
        <h3 className={styles["feature-bento-title"]}>{title}</h3>
        <p className={styles["feature-bento-description"]}>{description}</p>
        <span className={styles["feature-bento-link"]}>{linkLabel}</span>
      </div>
    </Link>
  );
}
