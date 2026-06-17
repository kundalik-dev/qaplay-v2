import { cn } from "@/lib/utils";

interface DocSectionProps {
  id: string;
  heading: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DocSection({ id, heading, desc, children, className }: DocSectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "bg-card border border-border rounded-[14px] overflow-hidden scroll-mt-[160px]",
        className
      )}
    >
      <div className="px-5 pt-[18px] pb-4 border-b border-border/50">
        <div className="text-[16px] font-bold text-foreground font-[family-name:var(--font-space-grotesk)] mb-1">
          {heading}
        </div>
        {desc && (
          <p className="text-[13px] text-muted-foreground leading-[1.6]">{desc}</p>
        )}
      </div>
      {children && (
        <div className="p-5">{children}</div>
      )}
    </div>
  );
}
