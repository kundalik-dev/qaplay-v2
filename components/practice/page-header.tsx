import { cn } from "@/lib/utils";
import { PracticeShell } from "./practice-shell";
import type { PracticePageMeta } from "@/data/practice-data/types";

const levelConfig: Record<
  string,
  { marker: string; bg: string; text: string; border: string }
> = {
  Beginner: {
    marker: "01",
    bg: "var(--success)",
    text: "var(--success-readable)",
    border: "var(--success)",
  },
  Intermediate: {
    marker: "02",
    bg: "var(--warning)",
    text: "var(--warning-readable)",
    border: "var(--warning)",
  },
  Advanced: {
    marker: "03",
    bg: "var(--destructive)",
    text: "var(--destructive-readable)",
    border: "var(--destructive)",
  },
};

type PageHeaderProps = Pick<
  PracticePageMeta,
  | "title"
  | "description"
  | "level"
  | "durationMin"
  | "scenarioCount"
  | "testCaseCount"
  | "breadcrumb"
>;

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

  const pillBase =
    "inline-flex items-center gap-[5px] rounded-[20px] border px-[10px] py-1 text-[11.5px] font-semibold";

  return (
    <header data-testid="page-header">
      <PracticeShell>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-[18px] pb-[14px]"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-[12.5px] text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-[12.5px] font-medium text-muted-foreground">
                  {crumb.label}
                </span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-[12.5px] text-border">/</span>
              )}
            </span>
          ))}
        </nav>

        <div className="pb-5">
          <h1
            className="mb-2 font-[family-name:var(--font-space-grotesk)] leading-[1.25] font-extrabold tracking-[-0.5px] text-foreground"
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
              <span aria-hidden="true">{lv.marker}</span>
              {level}
            </span>

            <span
              className={cn(
                pillBase,
                "border-border bg-muted text-muted-foreground",
              )}
            >
              {durationMin} min
            </span>

            <span
              className={cn(pillBase, "text-[var(--info-readable)]")}
              style={{
                background: "color-mix(in srgb, var(--info) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--info) 30%, transparent)",
              }}
            >
              {scenarioCount} scenarios
            </span>

            <span
              className={cn(pillBase, "text-secondary")}
              style={{
                background:
                  "color-mix(in srgb, var(--secondary) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--secondary) 30%, transparent)",
              }}
            >
              {testCaseCount} test cases
            </span>
          </div>
        </div>
      </PracticeShell>
    </header>
  );
}
