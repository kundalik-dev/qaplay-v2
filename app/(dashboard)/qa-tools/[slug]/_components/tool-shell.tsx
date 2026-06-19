import type { ReactNode } from "react";
import Link from "next/link";

import { TOOL_CATEGORY_LABELS } from "@/data/qa-tools/categories";
import type { QaTool } from "@/data/qa-tools/types";

import styles from "./tool-shell.module.css";

interface ToolShellProps {
  tool: QaTool;
  children: ReactNode;
}

/**
 * Shared wrapper rendered around every tool page.
 * Provides a back link, breadcrumb, title, description, and category badge.
 */
export function ToolShell({ tool, children }: ToolShellProps) {
  const { slug, name, description, category } = tool;

  return (
    <div
      className={styles.shell}
      data-testid="tool-shell"
      data-tool={slug}
      data-section="tool-page"
    >
      {/* Header */}
      <header className={styles.header} data-testid={`tool-header-${slug}`}>
        <Link
          href="/qa-tools"
          className={styles.backLink}
          aria-label="Back to QA Tools"
          data-testid="tool-back-link"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width={13}
            height={13}
          >
            <path d="M10 4L6 8l4 4" />
          </svg>
          All Tools
        </Link>

        <div className={styles.headerMeta}>
          <div className={styles.breadcrumb} aria-label="Breadcrumb">
            <span>QA Tools</span>
            <span className={styles.breadcrumbSep} aria-hidden="true">
              /
            </span>
            <span aria-current="page">{name}</span>
          </div>

          <h1 className={styles.headerTitle} data-testid={`tool-title-${slug}`}>
            {name}
          </h1>

          <p className={styles.headerDesc} data-testid={`tool-desc-${slug}`}>
            {description}
          </p>

          <span
            className={styles.categoryBadge}
            data-testid={`tool-category-badge-${slug}`}
          >
            {TOOL_CATEGORY_LABELS[category]}
          </span>
        </div>
      </header>

      {/* Tool UI */}
      <div className={styles.content} data-testid={`tool-content-${slug}`}>
        {children}
      </div>
    </div>
  );
}
