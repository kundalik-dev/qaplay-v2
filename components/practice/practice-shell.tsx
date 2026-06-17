import { cn } from "@/lib/utils";

interface PracticeShellProps {
  children: React.ReactNode;
  className?: string;
  /** When true: only horizontal padding, no max-width clamp */
  fullBleed?: boolean;
}

/**
 * Max-width centering wrapper for all practice page content.
 * Equivalent to the `.page-wrap` pattern in the HTML reference.
 */
export function PracticeShell({
  children,
  className,
  fullBleed = false,
}: PracticeShellProps) {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        !fullBleed && "max-w-[1200px] mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
