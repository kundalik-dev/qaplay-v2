import "./tables.css";

import { ShoppingProductsTableSection } from "./shopping-products-table-section";
import { DepartmentsTableSection } from "./departments-table-section";
import { StaticTableSection } from "./static-table-section";
import { SortableTableSection } from "./sortable-table-section";
import { SearchFilterTableSection } from "./search-filter-table-section";
import { PaginatedTableSection } from "./paginated-table-section";
import { RowActionsTableSection } from "./row-actions-table-section";
import { CombinedGridSection } from "./combined-grid-section";

/**
 * Orchestrator for /ui-practice/tables. Stays a Server Component — it
 * only composes the section components (each independently opts into
 * "use client" only where it actually needs state).
 *
 * Styling is a plain (non CSS-Module) stylesheet imported once here, so
 * the rendered class names match the original HTML prototype literally
 * (e.g. "section", "badge-green") instead of being hashed. Every rule in
 * tables.css is scoped under the highly-specific `.ui-practice-tables-page`
 * wrapper below, so nothing leaks globally even though the stylesheet
 * itself loads app-wide once this route is visited.
 *
 * ShoppingProductsTableSection and DepartmentsTableSection are the new
 * "all-in-one" merged tables (sort + search/filter + pagination +
 * inline edit/delete) requested to replace the six single-feature
 * sections below. They're rendered first, on top, while the original
 * six stay in place until removal is explicitly approved — remove the
 * six imports/usages below this comment once that's confirmed.
 */
export function TablesPractice() {
  return (
    <div
      className="ui-practice-tables-page"
      data-testid="ui-practice-tables-page"
    >
      <div className="container">
        <h1>Tables Practice</h1>
        <p className="intro">
          Static, sortable, searchable, paginated, row-action, and combined-grid
          tables — for practicing Playwright table locators and real-world
          interaction patterns.
        </p>

        <ShoppingProductsTableSection />
        <DepartmentsTableSection />

        {/* ── Original single-feature sections — kept until removal is approved ── */}
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
