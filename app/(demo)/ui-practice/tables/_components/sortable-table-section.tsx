"use client";

import { useState } from "react";

import { employees } from "@/data/ui-practice-data/tables-data";
import { StatusBadge } from "./status-badge";
import {
  ariaSortFor,
  formatSalary,
  sortEmployees,
  type SortDirection,
  type SortableEmployeeColumn,
} from "./table-utils";

const SORT_DATA = employees.slice(0, 10);

const COLUMNS: { col: SortableEmployeeColumn; label: string; testId: string }[] = [
  { col: "name", label: "Name", testId: "sort-th-name" },
  { col: "dept", label: "Department", testId: "sort-th-dept" },
  { col: "salary", label: "Salary", testId: "sort-th-salary" },
  { col: "joined", label: "Date Joined", testId: "sort-th-joined" },
];

/**
 * Section 2 — sortable table (Intermediate).
 * Click a header: unsorted -> asc -> desc -> unsorted, mirroring the
 * original vanilla JS 3-click cycle.
 */
export function SortableTableSection() {
  const [sortCol, setSortCol] = useState<SortableEmployeeColumn | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);

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
  }

  const rows = sortCol && sortDir ? sortEmployees(SORT_DATA, sortCol, sortDir) : SORT_DATA;

  return (
    <section className="section" id="sec-sort">
      <h2>
        2. Sortable table <span className="badge badge-blue">Intermediate</span>
      </h2>
      <p className="hint">
        Click a column header → sort ascending; click again → descending; third click → unsorted.
        Assert <code>aria-sort</code> attribute (<code>&quot;ascending&quot;</code> /{" "}
        <code>&quot;descending&quot;</code> / <code>&quot;none&quot;</code>) and first-row cell
        text after each click. Sort by text, number, and date columns.
      </p>
      <table data-testid="sort-table" aria-label="Sortable employee table">
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
        <tbody data-testid="sort-tbody">
          {rows.map((e) => (
            <tr key={e.id} data-testid={`sort-row-${e.id}`}>
              <td data-testid={`sort-name-${e.id}`}>{e.name}</td>
              <td>{e.dept}</td>
              <td data-testid={`sort-salary-${e.id}`}>{formatSalary(e.salary)}</td>
              <td>{e.joined}</td>
              <td>
                <StatusBadge status={e.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
