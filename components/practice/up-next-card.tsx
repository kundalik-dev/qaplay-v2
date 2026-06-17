import Link from "next/link";
import type { PracticePageMeta } from "@/data/practice-data/types";

type UpNextCardProps = PracticePageMeta["upNext"];

/**
 * Block 3 — UpNextCard
 * A small "next element" nudge shown at the bottom of the sticky code panel.
 * Server component.
 */
export function UpNextCard({ icon, title, description, href }: UpNextCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted
                 hover:border-primary/30 transition-colors group"
      data-testid="up-next-card"
    >
      {/* Icon box */}
      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm
                       bg-card border border-border text-base">
        {icon}
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
          Up Next
        </p>
        <p className="text-[12px] font-semibold text-foreground truncate">{title}</p>
        <p className="text-[11px] text-muted-foreground truncate">{description}</p>
      </div>

      {/* Arrow */}
      <span className="text-muted-foreground group-hover:text-primary transition-colors text-sm flex-shrink-0">
        ›
      </span>
    </Link>
  );
}
