import Link from "next/link";

type PracticePillProps = {
  href: string;
  icon: string;
  label: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export function PracticePill({ href, icon, label, level }: PracticePillProps) {
  const levelClassName = level.toLowerCase();

  return (
    <Link href={href} className="practice-pill">
      <span className="practice-pill-marker" aria-hidden="true">
        {icon}
      </span>

      <div className="practice-pill-copy">
        <div className="practice-pill-name">{label}</div>
        <div
          className={`practice-pill-level practice-pill-level-${levelClassName}`}
        >
          {level}
        </div>
      </div>
    </Link>
  );
}
