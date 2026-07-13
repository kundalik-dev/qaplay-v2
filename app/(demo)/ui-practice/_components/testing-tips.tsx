"use client";

import { useId, useState } from "react";
import { ChevronsDown, ChevronsUp, Info } from "lucide-react";

import styles from "./testing-tips.module.css";

interface TestingTipsProps {
  tips: string[];
  label?: string;
}

/**
 * Collapsible "testing tips" panel, reusable across every
 * /ui-practice/[section] card. Collapsed by default; toggled open via the
 * Chevrons icon to reveal what to assert/validate when automating that
 * section. Drop this into any section component (server or client) —
 * it owns its own "use client" boundary.
 */
export function TestingTips({ tips, label = "" }: TestingTipsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={styles.testingTips} data-testid="testing-tips">
      <button
        type="button"
        className={"flex items-center gap-1 text-sm text-muted-foreground"}
        // className={styles.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-testid="testing-tips-toggle"
      >
        {isOpen ? (
          <ChevronsUp size={15} aria-hidden="true" />
        ) : (
          <ChevronsDown size={15} aria-hidden="true" />
        )}
        {/* {isOpen ? (
          <Info size={15} aria-hidden="true" />
        ) : (
          <Info size={15} aria-hidden="true" />
        )} */}
        <span>
          {isOpen
            ? `Hide ${label.toLowerCase()}`
            : `Show ${label.toLowerCase()}`}
          {/* {isOpen ? ` ${label.toLowerCase()}` : `${label.toLowerCase()}`} */}
        </span>
      </button>

      <div
        id={panelId}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        data-testid="testing-tips-panel"
        data-state={isOpen ? "open" : "closed"}
      >
        <ul className={styles.list}>
          {tips.map((tip, index) => (
            <li
              key={index}
              className={styles.item}
              data-testid={`testing-tips-item-${index}`}
            >
              <Info size={15} className={styles.icon} aria-hidden="true" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
