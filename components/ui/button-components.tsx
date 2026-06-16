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
        "inline-flex shrink-0 items-center justify-center leading-none text-current",
        iconClassName,
      )}
    >
      {icon}
    </span>
  ) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 leading-none whitespace-nowrap",
        className,
      )}
    >
      {iconPosition === "start" ? iconMarkup : null}
      <span className="inline-flex items-center leading-none">{children}</span>
      {iconPosition === "end" ? iconMarkup : null}
    </span>
  );
}

export { ButtonContent };
