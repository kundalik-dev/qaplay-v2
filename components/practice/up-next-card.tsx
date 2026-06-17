import type { PracticePageMeta } from "@/data/practice-data/types";

interface UpNextCardProps extends PracticePageMeta["upNext"] {}

export function UpNextCard({ icon, title, description, href }: UpNextCardProps) {
  return (
    <div>
      <div className="text-[9.5px] font-bold uppercase tracking-[0.07em] text-muted-foreground mb-2">
        UP NEXT
      </div>
      <a
        href={href}
        data-testid="up-next-card"
        className="flex items-center gap-3 px-4 py-[14px] bg-card border border-border rounded-[10px] text-decoration-none transition-all hover:border-primary/30 hover:shadow-sm group"
        style={{ textDecoration: "none" }}
      >
        <div className="w-9 h-9 bg-muted rounded-[6px] flex items-center justify-center text-[18px] flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-muted-foreground mb-[2px]">
            Next Topic
          </div>
          <div className="text-[13px] font-bold text-foreground">{title}</div>
          <div className="text-[11.5px] text-muted-foreground">{description}</div>
        </div>
        <span className="text-muted-foreground text-[16px] group-hover:text-primary transition-colors">›</span>
      </a>
    </div>
  );
}
