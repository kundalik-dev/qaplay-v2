import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./practice-new-section.module.css";

type PracticeNewCardProps = {
  href: string;
  iconSrc: string;
  iconAlt: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
};

function toTestIdValue(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PracticeNewCard({
  href,
  iconSrc,
  iconAlt,
  level,
  title,
}: PracticeNewCardProps) {
  const levelClassName = level.toLowerCase();

  return (
    <Link
      href={href}
      className={styles.card}
      data-testid={`practice-card-${toTestIdValue(title)}`}
      data-card={toTestIdValue(title)}
      data-level={level.toLowerCase()}
      data-supported-frameworks="playwright selenium cypress"
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon}>
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={18}
            height={18}
            className="object-contain"
          />
        </span>
      </span>

      <div className={styles.copy}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={cn(styles.level, styles[`level-${levelClassName}`])}>
          {level}
        </span>
      </div>
    </Link>
  );
}
