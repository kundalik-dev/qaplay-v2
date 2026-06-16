import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./practice-section.module.css";

type PracticePillProps = {
  href: string;
  icon: string;
  label: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export function PracticePill({ href, icon, label, level }: PracticePillProps) {
  const levelClassName = level.toLowerCase();

  return (
    <Link href={href} className={styles["practice-pill"]}>
      <span className={styles["practice-pill-marker"]} aria-hidden="true">
        {icon}
      </span>

      <div className={styles["practice-pill-copy"]}>
        <div className={styles["practice-pill-name"]}>{label}</div>
        <div
          className={cn(
            styles["practice-pill-level"],
            styles[`practice-pill-level-${levelClassName}`],
          )}
        >
          {level}
        </div>
      </div>
    </Link>
  );
}
