import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import styles from "./practice-block.module.css";

export type PracticeButtonVariant = "primary" | "secondary" | "danger";

const variantClass: Record<PracticeButtonVariant, string> = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  danger: styles.btnDanger,
};

interface PracticeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PracticeButtonVariant;
}

/**
 * Themed button used across practice scenarios. All native button props
 * (id, data-testid, onClick, onDoubleClick, value, …) pass straight through so
 * scenarios keep their original locators.
 */
export function PracticeButton({
  variant = "primary",
  className,
  type = "button",
  ...rest
}: PracticeButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.btn, variantClass[variant], className)}
      {...rest}
    />
  );
}
