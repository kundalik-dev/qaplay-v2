import Link from "next/link";
import { cn } from "@/lib/utils";
import { PracticeShell } from "./practice-shell";
import type { PracticePageMeta } from "@/data/practice-data/types";

const levelStyles: Record<string, string> = {
  Beginner:     "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  Intermediate: "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
  Advanced:     "border-[var(--danger)]/30  bg-[var(--danger)]/10  text-[var(--danger)]",
};

const levelIcons: Record<string, string> = {
  Beginner:     "🌱",
  Intermediate: "⚡",
  Advanced:     "🔥",
};

type PageHeaderProps = Pick<
  PracticePageMeta,
  "title" | "description" | "level" | "durationMin" | "scenarioCount" | "breadcrumb"
>;

/**
 * Block 1 — PageHeader
 * Renders: breadcrumb → H1 → description → pills (level, time, count).
 * Server component — no interactivity needed.
 */
export function PageHeader({
  title,
  description,
  level,
  durationMin,
  scenarioCount,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <header
      className="w-full border-b border-border bg-background/80 backdrop-blur-sm"
      data-testid="page-header"
    >
      <PracticeShell className="py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4 flex-wrap">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground text-sm font-medium">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-muted-foreground/40 text-sm select-none">›</span>
              )}
            </span>
          ))}
        </nav>

        {/* H1 */}
        <h1
          className="font-display font-bold tracking-tight text-foreground mb-3"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
        >
          {title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-7 mb-5 max-w-2xl text-pretty">
          {description}
        </p>

        {/* Pills row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Level pill */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border",
              "font-mono text-[10px] font-bold uppercase tracking-wider",
              levelStyles[level],
            )}
          >
            {levelIcons[level]} {level}
          </span>

          {/* Duration pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-border bg-muted font-mono text-[10px] text-muted-foreground">
            ⏱ {durationMin} min
          </span>

          {/* Scenario count pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-border bg-muted font-mono text-[10px] text-muted-foreground">
            ⚡ {scenarioCount} scenarios
          </span>
        </div>
      </PracticeShell>
    </header>
  );
}
