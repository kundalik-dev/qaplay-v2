import { cn } from "@/lib/utils";
import { PracticeShell } from "./practice-shell";
import type { PracticePageMeta } from "@/data/practice-data/types";

const levelConfig: Record<string, { emoji: string; className: string }> = {
  Beginner:     { emoji: "🌱", className: "bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]" },
  Intermediate: { emoji: "⚡", className: "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]" },
  Advanced:     { emoji: "🔥", className: "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)] text-[var(--destructive)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]" },
};

interface PageHeaderProps
  extends Pick<
    PracticePageMeta,
    "title" | "description" | "level" | "durationMin" | "scenarioCount" | "testCaseCount" | "breadcrumb"
  > {}

export function PageHeader({
  title,
  description,
  level,
  durationMin,
  scenarioCount,
  testCaseCount,
  breadcrumb,
}: PageHeaderProps) {
  const lv = levelConfig[level] ?? levelConfig.Beginner;

  return (
    <header data-testid="page-header">
      <PracticeShell>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-[18px] pb-[14px]"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-[12.5px] text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-[12.5px] text-muted-foreground font-medium">
                  {crumb.label}
                </span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-border text-[12.5px]">›</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title row */}
        <div className="pb-5">
          <h1
            className="font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.5px] text-foreground leading-[1.25] mb-2"
            style={{ fontSize: "28px" }}
          >
            {title}
          </h1>
          <p className="text-[14px] text-muted-foreground leading-[1.6] max-w-[600px] mb-[14px]">
            {description}
          </p>

          {/* Pill row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-[5px] px-[10px] py-1 rounded-[20px] text-[11.5px] font-bold border",
                lv.className
              )}
            >
              {lv.emoji} {level}
            </span>
            <span className="inline-flex items-center gap-[5px] px-[10px] py-1 rounded-[20px] text-[11.5px] font-semibold bg-muted text-muted-foreground border border-border">
              ⏱ {durationMin} min
            </span>
            <span className="inline-flex items-center gap-[5px] px-[10px] py-1 rounded-[20px] text-[11.5px] font-semibold bg-[color-mix(in_srgb,var(--info)_10%,transparent)] text-[var(--info)] border border-[color-mix(in_srgb,var(--info)_30%,transparent)]">
          