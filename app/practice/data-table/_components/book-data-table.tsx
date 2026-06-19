"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  bookRows,
  tableColumnHeaders,
  genres,
  type BookRow,
} from "@/data/practice-data/data-table/scenarios";
import { EditDialog, DeleteDialog, AddDialog } from "./_book-dialogs";
import styles from "./data-table.module.css";

// ── localStorage helpers ──────────────────────────────────────────────────────

const LS_KEY = "qaplayground-data-table-books";

function loadFromStorage(): BookRow[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return bookRows;
    const parsed: BookRow[] = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0].id === "string"
    ) {
      return parsed;
    }
  } catch {
    // corrupt — fall through
  }
  return bookRows;
}

function saveToStorage(rows: BookRow[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
  } catch {
    // storage unavailable — ignore
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SortKey = keyof Omit<BookRow, "id">;
type SortDir = "asc" | "desc" | null;
interface SortState {
  key: SortKey | null;
  dir: SortDir;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BookDataTable() {
  const [rows, setRows] = useState<BookRow[]>(bookRows);
  const [hydrated, setHydrated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sort, setSort] = useState<SortState>({ key: null, dir: null });
  const [editBook, setEditBook] = useState<BookRow | null>(null);
  const [deleteBook, setDeleteBook] = useState<BookRow | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const PAGE_SIZE = 5;

  // Hydrate from localStorage once on mount (avoids SSR mismatch). Initialising
  // client-only persisted state is a legitimate one-time effect, so the
  // synchronous setState is intentional here.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setRows(loadFromStorage());
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ── Mutations ────────────────────────────────────────────────────────────

  const updateRow = useCallback((updated: BookRow) => {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === updated.id ? updated : r));
      saveToStorage(next);
      return next;
    });
    setEditBook(null);
  }, []);

  const deleteRow = useCallback((id: string) => {
    setRows((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveToStorage(next);
      return next;
    });
    setDeleteBook(null);
  }, []);

  const addRow = useCallback((book: BookRow) => {
    setRows((prev) => {
      const next = [...prev, book];
      saveToStorage(next);
      return next;
    });
    setAddOpen(false);
  }, []);

  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(LS_KEY);
    } catch {
      /* ignore */
    }
    setRows(bookRows);
    setSearchTerm("");
    setGenreFilter("All");
    setSort({ key: null, dir: null });
    setCurrentPage(1);
  }, []);

  // ── Sort ─────────────────────────────────────────────────────────────────

  const handleSort = useCallback((key: SortKey) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return { key: null, dir: null };
    });
  }, []);

  // ── Filtered + sorted rows ────────────────────────────────────────────────

  const filteredRows = useMemo(() => {
    let result = rows;
    if (genreFilter !== "All")
      result = result.filter((r) => r.bookGenre === genreFilter);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.bookName.toLowerCase().includes(q) ||
          r.bookAuthor.toLowerCase().includes(q) ||
          r.bookGenre.toLowerCase().includes(q) ||
          r.bookIsbn.toLowerCase().includes(q),
      );
    }
    if (sort.key && sort.dir) {
      const sk = sort.key;
      const sd = sort.dir;
      result = [...result].sort((a, b) => {
        const cmp = String(a[sk]).localeCompare(String(b[sk]), undefined, {
          numeric: true,
        });
        return sd === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [rows, searchTerm, genreFilter, sort]);

  // Reset to page 1 whenever the filtered set changes. Adjusting state during
  // render (instead of in an effect) avoids the extra cascading render.
  const filterSignature = `${searchTerm}|${genreFilter}|${sort.key}|${sort.dir}`;
  const [lastFilterSignature, setLastFilterSignature] =
    useState(filterSignature);
  if (filterSignature !== lastFilterSignature) {
    setLastFilterSignature(filterSignature);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedRows = filteredRows.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  // Show Reset only after hydration and when rows have been deleted
  const showReset = hydrated && rows.length < bookRows.length;

  // ── Sortable column definitions ───────────────────────────────────────────

  const sortableCols: Array<{
    header: (typeof tableColumnHeaders)[number];
    key: SortKey;
  }> = [
    { header: tableColumnHeaders[1], key: "bookName" },
    { header: tableColumnHeaders[2], key: "bookGenre" },
    { header: tableColumnHeaders[3], key: "bookAuthor" },
    { header: tableColumnHeaders[4], key: "bookIsbn" },
    { header: tableColumnHeaders[5], key: "bookPublished" },
  ];

  function sortIcon(key: SortKey) {
    if (sort.key !== key)
      return (
        <span aria-hidden="true" className={styles.sortNeutral}>
          {"⇅"}
        </span>
      );
    return (
      <span aria-hidden="true" className={styles.sortActive}>
        {sort.dir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={styles.tableWrapper}
      data-testid="data-table-wrapper"
      data-section="data-table"
    >
      {/* Controls */}
      <div className={styles.tableControls} data-testid="table-controls">
        <label htmlFor="table-search-input" className="sr-only">
          Search books
        </label>
        <input
          id="table-search-input"
          type="search"
          placeholder="Search books…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="table-search"
          aria-label="Search books"
          className={styles.searchInput}
        />

        <label htmlFor="genre-filter-select" className="sr-only">
          Filter by genre
        </label>
        <select
          id="genre-filter-select"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          data-testid="genre-filter"
          aria-label="Filter by genre"
          className={styles.filterSelect}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === "All" ? "All Genres" : g}
            </option>
          ))}
        </select>

        <button
          type="button"
          data-testid="btn-add-book"
          aria-label="Add new book"
          onClick={() => setAddOpen(true)}
          className={styles.btnAdd}
        >
          + Add Book
        </button>

        {showReset && (
          <button
            type="button"
            data-testid="btn-reset-table"
            onClick={resetToDefaults}
            className={styles.btnReset}
            title="Restore original 25 books"
          >
            Reset
          </button>
        )}
      </div>

      {/* Table */}
      <div className={styles.tableScroll}>
        <table
          id="dataTable"
          data-testid="data-table"
          data-section="book-table"
          className={styles.table}
          aria-label="Books data table"
        >
          <thead data-testid="table-head">
            <tr>
              <th
                scope="col"
                data-testid={tableColumnHeaders[0].testId}
                data-col={tableColumnHeaders[0].dataCol}
                className={styles.th}
              >
                {tableColumnHeaders[0].label}
              </th>

              {sortableCols.map(({ header, key }) => (
                <th
                  key={key}
                  scope="col"
                  data-testid={header.testId}
                  data-col={header.dataCol}
                  data-sort={key}
                  aria-sort={
                    sort.key === key
                      ? sort.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={styles.th + " " + styles.thSortable}
                  onClick={() => handleSort(key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort(key);
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                >
                  <span className={styles.thContent}>
                    {header.label}
                    {sortIcon(key)}
                  </span>
                </th>
              ))}

              <th
                scope="col"
                data-testid={tableColumnHeaders[6].testId}
                data-col={tableColumnHeaders[6].dataCol}
                className={styles.th}
              >
                {tableColumnHeaders[6].label}
              </th>
            </tr>
          </thead>

          <tbody data-testid="table-body">
            {filteredRows.length === 0 ? (
              <tr data-testid="empty-table-row">
                <td
                  colSpan={7}
                  className={styles.emptyCell}
                  id="emptyTableMsg"
                  data-testid="empty-table-msg"
                >
                  No books match your search
                </td>
              </tr>
            ) : (
              pagedRows.map((book) => {
                const slug = book.bookGenre.toLowerCase().replace(/ /g, "-");
                const badgeClass =
                  styles.genreBadge + " " + (styles["genre-" + slug] ?? "");
                return (
                  <tr
                    key={book.id}
                    data-testid="book-row"
                    data-book-id={book.id}
                    data-genre={slug}
                    className={styles.tr}
                  >
                    <td
                      data-col="sr-no"
                      data-testid="cell-sr-no"
                      className={styles.td}
                    >
                      {book.srNo}
                    </td>
                    {/* Book Name — medium: filter by text */}
                    <td data-col="book-name" className={styles.td}>
                      {book.bookName}
                    </td>
                    {/* Genre — medium: data-genre-value attribute */}
                    <td
                      data-col="book-genre"
                      data-genre-value={book.bookGenre}
                      className={styles.td}
                    >
                      <span className={badgeClass} data-testid="genre-badge">
                        {book.bookGenre}
                      </span>
                    </td>
                    {/* Author — hard: no data-testid, locate by text/sibling */}
                    <td data-col="book-author" className={styles.td}>
                      {book.bookAuthor}
                    </td>
                    {/* ISBN — hard: locate by data-col attribute */}
                    <td
                      data-col="book-isbn"
                      className={styles.td + " " + styles.isbnCell}
                    >
                      {book.bookIsbn}
                    </td>
                    {/* Published — hard: locate by data-col */}
                    <td data-col="book-published" className={styles.td}>
                      {book.bookPublished}
                    </td>
                    {/* Actions — Edit has testid; Delete has only aria-label (challenge) */}
                    <td
                      data-col="actions"
                      data-testid="cell-actions"
                      className={styles.td + " " + styles.actionsCell}
                    >
                      <button
                        type="button"
                        data-testid="btn-edit-book"
                        aria-label={"Edit " + book.bookName}
                        data-book-id={book.id}
                        onClick={() => setEditBook(book)}
                        className={styles.btnEdit}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        aria-label={"Delete " + book.bookName}
                        data-book-id={book.id}
                        onClick={() => setDeleteBook(book)}
                        className={styles.btnDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className={styles.pagination}
          data-testid="pagination"
          aria-label="Table pagination"
        >
          <button
            type="button"
            className={styles.pgBtn}
            data-testid="pagination-prev"
            aria-label="Previous page"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={
                styles.pgBtn +
                (page === safeCurrentPage ? " " + styles.pgBtnActive : "")
              }
              data-testid={"pagination-page-" + page}
              aria-label={"Page " + page}
              aria-current={page === safeCurrentPage ? "page" : undefined}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={styles.pgBtn}
            data-testid="pagination-next"
            aria-label="Next page"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            ›
          </button>

          <span
            className={styles.pgRowCount}
            data-testid="row-count"
            aria-live="polite"
          >
            {filteredRows.length} {filteredRows.length === 1 ? "book" : "books"}
            {totalPages > 1 &&
              " — page " + safeCurrentPage + " of " + totalPages}
          </span>
        </div>
      )}

      {/* Row count when no pagination */}
      {totalPages <= 1 && (
        <div className={styles.pagination}>
          <span
            className={styles.pgRowCount}
            data-testid="row-count"
            aria-live="polite"
          >
            {filteredRows.length} {filteredRows.length === 1 ? "book" : "books"}
          </span>
        </div>
      )}

      {/* Locator hint footer */}
      <div className={styles.locatorHints} data-testid="locator-hints">
        <button
          type="button"
          className={styles.hintToggleBtn}
          data-testid="show-hint-btn"
          aria-expanded={showHints}
          onClick={() => setShowHints((v) => !v)}
        >
          <span className={styles.hintBulb}>💡</span>
          {showHints ? "Hide Hint" : "Show Hint"}
        </button>

        {showHints && (
          <ul className={styles.hintList} data-testid="hint-list">
            <li>
              <code>#dataTable</code> — stable id for all frameworks
            </li>
            <li>
              <code>{'[data-testid="book-row"][data-book-id="book-004"]'}</code>{" "}
              — row by id
            </li>
            <li>
              <code>{'td[data-col="book-isbn"]'}</code> — column cells by
              attribute
            </li>
            <li>
              <code>Delete</code> buttons have <strong>no data-testid</strong> —
              use <code>aria-label</code> or XPath
            </li>
          </ul>
        )}
      </div>

      {/* Dialogs */}
      {addOpen && (
        <AddDialog
          nextSrNo={rows.length + 1}
          onSave={addRow}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editBook && (
        <EditDialog
          book={editBook}
          onSave={updateRow}
          onClose={() => setEditBook(null)}
        />
      )}
      {deleteBook && (
        <DeleteDialog
          book={deleteBook}
          onConfirm={() => deleteRow(deleteBook.id)}
          onClose={() => setDeleteBook(null)}
        />
      )}
    </div>
  );
}
