import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type OutputTone = "default" | "danger" | "success";

const toneClass: Record<OutputTone, string> = {
  default: "",
  danger: "tone-danger",
  success: "tone-success",
};

interface OutputBoxProps {
  /** DOM id — keep the scenario's original id for locators. */
  id?: string;
  /** data-testid — keep the scenario's original testid for locators. */
  testId?: string;
  tone?: OutputTone;
  children: ReactNode;
}

/**
 * The result/output panel used by scenarios to surface side effects in the DOM
 * (so tests can assert without reading native dialogs).
 */
export function OutputBox({
  id,
  testId,
  tone = "default",
  children,
}: OutputBoxProps) {
  return (
    <div
      id={id}
      data-testid={testId}
      className={cn("output-box", toneClass[tone])}
    >
      {children}
    </div>
  );
}
