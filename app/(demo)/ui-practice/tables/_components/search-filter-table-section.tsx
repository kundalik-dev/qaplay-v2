"use client";

import { useMemo, useState } from "react";

import {
  employees,
  type Department,
} from "@/data/ui-practice-data/tables-data";
import { StatusBadge } from "./status-badge";
import { formatSalary } from "./table-utils";

const SEARCH_DATA = employees.slice(0, 10);
const DEPARTMENTS: Department[] = ["Engineering", "Marketing", "HR", "Sales"];

/**
 * Section 3 — search + department filter table (Intermediate).
 * Text search and the department dropdown combine (AND), matching the
 * original `filtered()` helper.
 */
export function SearchFilterTableSection() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");

  const rows = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SEARCH_DATA.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q)) && (!dept || e.dept === dept),
    );
  }, [query, dept]);

  function handleClear() {
    setQuery("");
    setDept("");
  }

  return (
    <section className="section" id="sec-search">
      <h2>
        3. Search &amp; filter table{" "}
        <span className="badge badge-blue">Intermediate</span>
      </h2>
      <p className="hint">
        Text search (by name) + department dropdown filter — both work together.
        Assert <code>search-result-count</code> text and visible row count after
        each filter change. Search for a non-existent name to trigger the empty
        state.
      </p>
      <div className="controls">
        <div className="ctrl-field">
          <label htmlFor="search-input">Search by name</label>
          <input
            type="search"
            id="search-input"
            data-testid="search-input"
            aria-label="Search employees by name"
            placeholder="e.g. Priya"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="ctrl-field">
          <label htmlFor="dept-filter">Department</label>
          <select
            id="dept-filter"
            data-testid="dept-filter"
            aria-label="Filter by department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">All departments</option>
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
          id="search-clear-btn"
          data-testid="search-clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="result-info" data-testid="search-result-count">
        {`Showing ${rows.length} of ${SEARCH_DATA.length} employees`}
      </div>
      <table data-testid="search-table" aria-label="Filtered employee table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Date Joined</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody data-testid="search-tbody">
          {rows.length ? (
            rows.map((e) => (
              <tr key={e.id} data-testid={`search-row-${e.id}`}>
                <td data-testid={`search-name-${e.id}`}>{e.name}</td>
                <td>{e.dept}</td>
                <td>{formatSalary(e.salary)}</td>
                <td>{e.joined}</td>
                <td>
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-msg">
              <td colSpan={5}>No employees match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
