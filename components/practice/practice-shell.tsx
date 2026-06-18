import { cn } from "@/lib/utils";

interface PracticeShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PracticeShell({ children, className }: PracticeShellProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-7", className)}
    >
      {children}
    </div>
  );
}
