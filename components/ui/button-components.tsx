import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonContentProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  iconPosition?: "start" | "end";
};

function ButtonContent({
  children,
  className,
  icon,
  iconClassName,
  iconPosition = "start",
}: ButtonContentProps) {
  const iconMarkup = icon ? (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center text-current",
        iconClassName,
      )}
    >
      {icon}
    </span>
  ) : null;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {iconPosition === "start" ? iconMarkup : null}
      <span>{children}</span>
      {iconPosition === "end" ? iconMarkup : null}
    </span>
  );
}

export { ButtonContent };
