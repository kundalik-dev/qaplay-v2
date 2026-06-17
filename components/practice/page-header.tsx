import { cn } from "@/lib/utils";
import { PracticeShell } from "./practice-shell";
import type { PracticePageMeta } from "@/data/practice-data/types";

const levelConfig: Record<string, { emoji: string; bg: string; text: string; border: string }> = {
  Beginner:     { emoji: "🌱", bg: "var(--success)", text: "var(--success)", border: "var(--success)" },
  Intermediate: { emoji: "⚡", bg: "var(--warning)", text: "var(--warning)", border: "var(--warning)" },
  Advanced:     { emoji: "🔥", bg: "var(--destructive)", text: "var(--destructive)", border: "var(--destructive)" },
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

  const pillBase = "inline-flex items-center gap-[5px] rounded-[20px] border px-[10px] py-1 text-[11.5px] font-semibold";

  return (
    <header data-testid="page-header">
      <PracticeShell>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-[18px] pb-[14px]">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <a href={crumb.href} className="text-[12.5px] text-muted-foreground/70 transition-colors hover:text-foreground">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-[12.5px] font-medium text-muted-foreground">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-[12.5px] text-border">›</span>
              )}
            </span>
          ))}
        </nav>

        <div className="pb-5">
          <h1
            className="mb-2 font-extrabold leading-[1.25] tracking-[-0.5px] text-foreground font-[family-name:var(--font-space-grotesk)]"
            style={{ fontSize: "28px" }}
          >
            {title}
          </h1>
          <p className="mb-[14px] max-w-[600px] text-[14px] leading-[1.6] text-muted-foreground">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(pillBase, "font-bold")}
              style={{
                background: `color-mix(in srgb, ${lv.bg} 10%, transparent)`,
                color: lv.text,
                borderColor: `color-mix(in srgb, ${lv.border} 30%, transparent)`,
              }}
            >
              {lv.emoji} {level}
            </span>

            <span className={cn(pillBase, "bg-muted text-muted-foreground border-border")}>
              ⏱ {durationMin} min
            </span>

            <span
              className={cn(pillBase, "text-[var(--info)]")}
              style={{
                background: "color-mix(in srgb, var(--info) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--info) 30%, transparent)",
              }}
            >
              🎮 {scenarioCount} scenarios
            </span>

            <span
              className={cn(pillBase, "text-secondary")}
              style={{
                background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--secondary) 30%, transparent)",
              }}
            >
              🧪 {testCaseCount} test cases
            </span>
          </div>
        </div>
      </PracticeShell>
    </header>
  );
}
