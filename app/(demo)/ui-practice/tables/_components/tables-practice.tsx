import "./tables.css";

import { ShoppingProductsTableSection } from "./shopping-products-table-section";
import { DepartmentsTableSection } from "./departments-table-section";

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
 * The six original single-feature sections (static, sortable, search &
 * filter, paginated, row actions, combined grid) were replaced by these
 * two "all-in-one" merged tables — each combines sorting, search/filter,
 * pagination, and inline Edit/Delete for its data set (shopping products,
 * departments). The old section components/files have been removed.
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
          Two all-in-one tables — shopping products and departments — each
          with sortable columns, search &amp; filter, pagination, and inline
          Edit/Delete, for practicing Playwright table locators and
          real-world interaction patterns.
        </p>

        <ShoppingProductsTableSection />
        <DepartmentsTableSection />
      </div>
    </div>
  );
}
