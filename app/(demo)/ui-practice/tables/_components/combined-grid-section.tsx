"use client";

import { useMemo, useState } from "react";

import {
  employees,
  type Department,
} from "@/data/ui-practice-data/tables-data";
import { PaginationControls } from "./pagination-controls";
import { StatusBadge } from "./status-badge";
import {
  ariaSortFor,
  formatSalary,
  sortEmployees,
  type SortDirection,
  type SortableEmployeeColumn,
} from "./table-utils";

const PER_PAGE = 5;
const DEPARTMENTS: Department[] = ["Engineering", "Marketing", "HR", "Sales"];

const COLUMNS: {
  col: SortableEmployeeColumn;
  label: string;
  testId: string;
}[] = [
  { col: "name", label: "Name", testId: "grid-th-name" },
  { col: "dept", label: "Department", testId: "grid-th-dept" },
  { col: "salary", label: "Salary", testId: "grid-th-salary" },
  { col: "joined", label: "Date Joined", testId: "grid-th-joined" },
];

/**
 * Section 6 — combined data grid: search + sort + pagination (Advanced).
 * Filtering or sorting resets to page 1, matching the original `state`
 * object + `render()` behavior.
 */
export function CombinedGridSection() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [sortCol, setSortCol] = useState<SortableEmployeeColumn | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);
  const [page, setPage] = useState(1);

  const filteredSorted = useMemo(() => {
    const q = query.toLowerCase().trim();
    let rows = employees.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q)) && (!dept || e.dept === dept),
    );
    if (sortCol && sortDir) rows = sortEmployees(rows, sortCol, sortDir);
    return rows;
  }, [query, dept, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE));
  const currentPage = page > totalPages ? 1 : page;
  const start = (currentPage - 1) * PER_PAGE;
  const rows = filteredSorted.slice(start, start + PER_PAGE);

  function handleSort(col: SortableEmployeeColumn) {
    if (sortCol === col) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortCol(null);
        setSortDir(null);
      }
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
    setPage(1);
  }

  function handleClearAll() {
    setQuery("");
    setDept("");
    setSortCol(null);
    setSortDir(null);
    setPage(1);
  }

  const infoText = filteredSorted.length
    ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, filteredSorted.length)} of ${filteredSorted.length}`
    : "No results";

  return (
    <section className="section" id="sec-grid">
      <h2>
        6. Combined data grid: sort + search + pagination{" "}
        <span className="badge badge-red">Advanced</span>
      </h2>
      <p className="hint">
        Real-world data grid: all three features work together. Filtering or
        sorting resets to page 1 automatically. Practice: chaining interactions
        across search → sort → page navigation, asserting combined state.
      </p>
      <div className="controls">
        <div className="ctrl-field">
          <label htmlFor="grid-search">Search by name</label>
          <input
            type="search"
            id="grid-search"
            data-testid="grid-search"
            aria-label="Grid search by name"
            placeholder="Name..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="ctrl-field">
          <label htmlFor="grid-dept">Department</label>
          <select
            id="grid-dept"
            data-testid="grid-dept"
            aria-label="Grid filter by department"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm clear-btn-align"
          id="grid-clear-btn"
          data-testid="grid-clear-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      <div className="result-info" data-testid="grid-result-count">
        {`${filteredSorted.length} of ${employees.length} employees`}
      </div>
      <table data-testid="grid-table" aria-label="Combined data grid">
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th
                key={c.col}
                className="sortable"
                data-col={c.col}
                aria-sort={ariaSortFor(c.col, sortCol, sortDir)}
                data-testid={c.testId}
                scope="col"
                onClick={() => handleSort(c.col)}
              >
                {c.label} <span className="sort-icon" aria-hidden="true" />
              </th>
            ))}
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody data-testid="grid-tbody">
          {rows.length ? (
            rows.map((e) => (
              <tr key={e.id} data-testid={`grid-row-${e.id}`}>
                <td data-testid={`grid-name-${e.id}`}>{e.name}</td>
                <td>{e.dept}</td>
                <td data-testid={`grid-salary-${e.id}`}>
                  {formatSalary(e.salary)}
                </td>
                <td>{e.joined}</td>
                <td>
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-msg">
              <td colSpan={5}>No results match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        infoText={infoText}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
        onSelectPage={setPage}
        testIdPrefix="grid"
        navAriaLabel="Grid pagination"
      />
    </section>
  );
}
