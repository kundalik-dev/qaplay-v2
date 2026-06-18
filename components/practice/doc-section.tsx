import { cn } from "@/lib/utils";

interface DocSectionProps {
  id: string;
  heading: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DocSection({
  id,
  heading,
  desc,
  children,
  className,
}: DocSectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-[160px] overflow-hidden rounded-[14px] border border-border bg-card",
        className,
      )}
    >
      <div className="border-b border-border/50 px-4 pt-[16px] pb-4 sm:px-5 sm:pt-[18px]">
        <div className="mb-1 font-[family-name:var(--font-space-grotesk)] text-[16px] font-bold text-foreground">
          {heading}
        </div>
        {desc && (
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            {desc}
          </p>
        )}
      </div>
      {children && <div className="p-4 sm:p-5">{children}</div>}
    </div>
  );
}
