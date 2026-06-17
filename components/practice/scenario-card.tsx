"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import styles from "./scenario-card.module.css";

interface ScenarioCardProps {
  /** "S01", "S02" … */
  id: string;
  title: string;
  /** data-testid for the card root */
  testId: string;
  /** The interactive element(s) rendered inside the card */
  children?: React.ReactNode;
  /** id for the result <span> */
  resultId: string;
  initialResult: string;
  /** Optional status badge: "DISABLED" | "READ-ONLY" | custom */
  badge?: string;
}

const badgeStyles: Record<string, string> = {
  DISABLED:    "border-warning/30 bg-warning/10 text-warning",
  "READ-ONLY": "border-info/30 bg-info/10 text-info",
};

/**
 * Block 5 — ScenarioCard
 * Single interactive scenario card.
 * Client component — may contain click handlers in children.
 */
export function ScenarioCard({
  id,
  title,
  testId,
  children,
  resultId,
  initialResult,
  badge,
}: ScenarioCardProps) {
  const badgeClass = badge
    ? (badgeStyles[badge] ?? "border-border bg-muted text-muted-foreground")
    : "";

  return (
    <Card
      data-testid={testId}
      data-section={`scenario-${id.toLowerCase()}`}
      data-card="scenario"
      className={cn("rounded-lg", styles.card)}
    >
      {/* Header: id badge + title + optional status badge */}
      <CardHeader className={cn("flex flex-row items-center justify-between py-3 px-4 space-y-0", styles.header)}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn("flex-shrink-0", styles.idBadge)}>
            {id}
          </span>
          <span className="text-sm font-medium text-foreground truncate">{title}</span>
        </div>

        {badge && (
          <span
            className={cn(
              "flex-shrink-0 font-mono text-[9px] uppercase tracking-wider",
              "px-2 py-0.5 rounded border",
              badgeClass,
            )}
          >
            {badge}
          </span>
        )}
      </CardHeader>

      {/* Body: practice element + result span */}
      <CardContent className="flex items-center gap-4 py-4 px-4 flex-wrap">
        {children}
        <span
          id={resultId}
          data-testid={`result-${id.toLowerCase()}`}
          className="text-sm text-muted-foreground transition-colors font-mono"
        >
          {initialResult}
        </span>
      </CardContent>
    </Card>
  );
}
