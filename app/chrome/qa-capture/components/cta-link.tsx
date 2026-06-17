import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CtaLink({
  href,
  children,
  iconStart,
  iconEnd,
  variant = "primary",
  className,
}: CtaLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        variant === "primary"
          ? "capture-button-primary"
          : "capture-button-secondary",
        "w-fit shrink-0",
        className,
      )}
    >
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </a>
  );
}
