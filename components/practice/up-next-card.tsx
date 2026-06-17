import type { PracticePageMeta } from "@/data/practice-data/types";

type UpNextCardProps = PracticePageMeta["upNext"];

export function UpNextCard({
  icon,
  title,
  description,
  href,
}: UpNextCardProps) {
  return (
    <div>
      <a
        href={href}
        data-testid="up-next-card"
        className="group flex items-center gap-3 rounded-[10px] border border-border bg-card px-4 py-[14px] transition-all hover:border-primary/30 hover:shadow-sm"
        style={{ textDecoration: "none" }}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[6px] bg-muted text-[18px]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-bold text-foreground">{title}</div>
          <div className="text-[11.5px] text-muted-foreground">
            {description}
          </div>
        </div>
        <span className="text-[16px] text-muted-foreground transition-colors group-hover:text-primary">
          ›
        </span>
      </a>
    </div>
  );
}
