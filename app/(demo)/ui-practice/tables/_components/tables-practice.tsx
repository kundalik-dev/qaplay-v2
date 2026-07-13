import "./tables.css";

import { StaticTableSection } from "./static-table-section";
import { SortableTableSection } from "./sortable-table-section";
import { SearchFilterTableSection } from "./search-filter-table-section";
import { PaginatedTableSection } from "./paginated-table-section";
import { RowActionsTableSection } from "./row-actions-table-section";
import { CombinedGridSection } from "./combined-grid-section";

/**
 * Orchestrator for /ui-practice/tables. Stays a Server Component — it
 * only composes the six section components (each independently opts
 * into "use client" only where it actually needs state).
 *
 * Styling is a plain (non CSS-Module) stylesheet imported once here, so
 * the rendered class names match the original HTML prototype literally
 * (e.g. "section", "badge-green") instead of being hashed. Every rule in
 * tables.css is scoped under the highly-specific `.ui-practice-tables-page`
 * wrapper below, so nothing leaks globally even though the stylesheet
 * itself loads app-wide once this route is visited.
 */
export function TablesPractice() {
  return (
    <div className="ui-practice-tables-page" data-testid="ui-practice-tables-page">
      <div className="container">
        <h1>Tables Practice</h1>
        <p className="intro">
          Static, sortable, searchable, paginated, row-action, and combined-grid tables — for
          practicing Playwright table locators and real-world interaction patterns.
        </p>

        <StaticTableSection />
        <SortableTableSection />
        <SearchFilterTableSection />
        <PaginatedTableSection />
        <RowActionsTableSection />
        <CombinedGridSection />
      </div>
    </div>
  );
}
