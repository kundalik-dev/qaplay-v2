import { cn } from "@/lib/utils";

interface DocSectionProps {
  /** Anchor id — must match the TocItem id for scroll-spy to work */
  id: string;
  heading: string;
  /** Section number chip: "1", "2", "→" (overview) */
  sectionNum?: string | number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Block 10 — DocSection
 * Named, anchor-linked section in the Learn tab.
 * Wraps a heading, prose, and optional inner blocks.
 * Server component.
 */
export function DocSection({
  id,
  heading,
  sectionNum,
  children,
  className,
}: DocSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-[160px] mb-12", className)}
    >
      <h2
        id={`${id}-heading`}
        className="font-display font-bold tracking-tight text-foreground text-xl
                   flex items-center gap-2.5 mb-5"
      >
        {sectionNum !== undefined && (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-sm
                       bg-primary/10 text-primary font-mono text-[11px] font-bold
                       flex-shrink-0"
          >
            {sectionNum}
          </span>
        )}
        {heading}
      </h2>

      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

/** Prose paragraph with standard learn-tab styling */
export function LearnProse({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-[0.95rem] leading-7 text-pretty",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Inline <code> styled for the learn tab */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-primary font-mono text-[0.875em] px-1 py-0.5 rounded-sm">
      {children}
    </code>
  );
}
