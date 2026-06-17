import { cn } from "@/lib/utils";

interface PracticeShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PracticeShell({ children, className }: PracticeShellProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1280px] mx-auto px-7",
        className
      )}
    >
      {children}
    </div>
  );
}
