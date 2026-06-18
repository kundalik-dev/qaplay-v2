"use client";

import { useState, useMemo, useCallback } from "react";
import {
  bookRows,
  tableColumnHeaders,
  genres,
  type BookRow,
} from "@/data/practice-data/data-table/scenarios";
import styles from "./data-table.module.css";

type SortKey = keyof Omit<BookRow, "id">;
type SortDir = "asc" | "desc" | null;

interface SortState {
  key: SortKey | null;
  dir: SortDir;
}

// ── Edit dialog ───────────────────────────────────────────────────────────────

interface EditDialogProps {
  book: BookRow;
  onClose: () => void;
}

function EditDialog({ book, onClose }: EditDialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-dialog-title"
      data-testid="edit-book-dialog"
      className={styles.dialogBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialogBox} data-book-id={book.id}>
        <h2 id="edit-dialog-title" className={styles.dialogTitle}>
          Edit Book
        </h2>
        <p className={styles.dialogSubtitle}>
          Editing:{" "}
          <strong data-testid="edit-dialog-book-name">{book.bookName}</strong>
        </p>

        <div className={styles.dialogFields}>
          {/* Beginner: label + testid */}
          <label htmlFor="edit-book-name" className={styles.fieldLabel}>
            Book Name
          </label>
          <input
            id="edit-book-name"
            name="bookName"
            type="text"
            defaultValue={book.bookName}
            data-testid="edit-input-book-name"
            className={styles.fieldInput}
          />

          {/* Beginner: label + testid */}
          <label htmlFor="edit-book-author" className={styles.fieldLabel}>
            Author
          </label>
          <input
            id="edit-book-author"
            name="bookAuthor"
            type="text"
            defaultValue={book.bookAuthor}
            data-testid="edit-input-book-author"
            className={styles.fieldInput}
          />

          {/* Hard: nearby span instead of label, dynamic name attr */}
          <div className={styles.fieldRow}>
            <span className={styles.fieldSpanLabel}>ISBN</span>
            <div>
              <input
                name={`isbn_field_${book.id}`}
                type="text"
                defaultValue={book.bookIsbn}
                className={styles.fieldInput}
              />
            </div>
          </div>

          {/* Medium: native select with label */}
          <label htmlFor="edit-book-genre" className={styles.fieldLabel}>
            Genre
          </label>
          <select
            id="edit-book-genre"
            name="bookGenre"
            defaultValue={book.bookGenre}
            data-testid="edit-select-genre"
            className={styles.fieldInput}
          >
            {genres
              .filter((g) => g !== "All")
              .map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.dialogActions}>
          <button
            type="button"
            data-testid="edit-dialog-cancel"
            onClick={onClose}
            className={styles.btnOutline}
          >
            Cancel
          </button>
          {/* Challenge: confirm button uses aria-label with book name */}
          <button
            type="button"
            aria-label={`Save changes for ${book.bookName}`}
            data-testid="edit-dialog-save"
            onClick={onClose}
            className={styles.btnPrimary}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirm dialog ─────────────────────────────────────────────────────

interface DeleteDialogProps {
  book: BookRow;
  onClose: () => void;
}

function DeleteDialog({ book, onClose }: DeleteDialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      data-testid="delete-book-dialog"
      className={styles.dialogBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialogBox} data-book-id={book.id}>
        <h2 id="delete-dialog-title" className={styles.dialogTitle}>
          Delete Book
        </h2>
        <p className={styles.dialogBody}>
          <span data-testid="delete-dialog-book-name">{book.bookName}</span>{" "}
          will be permanently removed.
        </p>
        <div className={styles.dialogActions}>
          {/* Beginner: testid on cancel */}
          <button
            type="button"
            data-testid="delete-dialog-cancel"
            onClick={onClose}
            className={styles.btnOutline}
          >
            Cancel
          </button>
          {/* Challenge: confirm uses aria-label — no testid */}
          <button
            type="button"
            aria-label={`Confirm delete ${book.bookName}`}
            onClick={onClose}
            className={styles.btnDanger}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main table ────────────────────────────────────────────────────────────────

export function BookDataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sort, setSort] = useState<SortState>({ key: null, dir: null });
  const [editBook, setEditBook] = useState<BookRow | null>(null);
  const [deleteBook, setDeleteBook] = useState<BookRow | null>(null);

  const handleSort = useCallback((key: SortKey) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return { key: null, dir: null };
    });
  }, []);

  const filteredRows = useMemo(() => {
    let rows = bookRows;

    if (genreFilter !== "All") {
      rows = rows.filter((r) => r.bookGenre === genreFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.bookName.toLowerCase().includes(q) ||
          r.bookAuthor.toLowerCase().includes(q) ||
          r.bookGenre.toLowerCase().includes(q) ||
          r.bookIsbn.toLowerCase().includes(q)
      );
    }

    if (sort.key && sort.dir) {
      rows = [...rows].sort((a, b) => {
        const av = String(a[sort.key!]);
        const bv = String(b[sort.key!]);
        const cmp = av.localeCompare(bv, undefined, { numeric: true });
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [searchTerm, genreFilter, sort]);

  function sortIcon(key: SortKey) {
    if (sort.key !== key) return <span aria-hidden="true" className={styles.sortNeutral}>⇅</span>;
    return (
      <span aria-hidden="true" className={styles.sortActive}>
        {sort.dir === "asc" ? "↑" : "↓"}
      </span>
    );
  }

  return (
    <div
      className={styles.tableWrapper}
      data-testid="data-table-wrapper"
      data-section="data-table"
    >
      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <div className={styles.tableControls} data-testid="table-controls">
        {/* Beginner: clear label + testid on search */}
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

        {/* Medium: native select with label + testid */}
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

        {/* Hard: no testid on row count span — locate via text or parent */}
        <span className={styles.rowCount} data-testid="row-count" aria-live="polite">
          {filteredRows.length} {filteredRows.length === 1 ? "book" : "books"}
        </span>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
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
              {/* Sr No — no sort */}
              <th
                scope="col"
                data-testid={tableColumnHeaders[0].testId}
                data-col={tableColumnHeaders[0].dataCol}
                className={styles.th}
              >
                {tableColumnHeaders[0].label}
              </th>

              {/* Sortable columns: Book Name, Genre, Author, ISBN, Published */}
              {(
                [
                  { header: tableColumnHeaders[1], key: "bookName" as SortKey },
                  { header: tableColumnHeaders[2], key: "bookGenre" as SortKey },
                  { header: tableColumnHeaders[3], key: "bookAuthor" as SortKey },
                  { header: tableColumnHeaders[4], key: "bookIsbn" as SortKey },
                  { header: tableColumnHeaders[5], key: "bookPublished" as SortKey },
                ]
              ).map(({ header, key }) => (
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
                  className={`${styles.th} ${styles.thSortable}`}
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

              {/* Actions — no sort */}
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
              filteredRows.map((book) => (
                <tr
                  key={book.id}
                  data-testid="book-row"
                  data-book-id={book.id}
                  data-genre={book.bookGenre.toLowerCase().replace(/ /g, "-")}
                  className={styles.tr}
                >
                  {/* Sr No */}
                  <td
                    data-col="sr-no"
                    data-testid="cell-sr-no"
                    className={styles.td}
                  >
                    {book.srNo}
                  </td>

                  {/* Book Name — medium: find by partial text */}
                  <td
                    data-col="book-name"
                    className={styles.td}
                  >
                    {book.bookName}
                  </td>

                  {/* Genre — medium: filter by value */}
                  <td
                    data-col="book-genre"
                    data-genre-value={book.bookGenre}
                    className={styles.td}
                  >
                    <span
                      className={`${styles.genreBadge} ${styles[`genre-${book.bookGenre.toLowerCase().replace(/ /g, "-")}`] ?? ""}`}
                      data-testid="genre-badge"
                    >
                      {book.bookGenre}
                    </span>
                  </td>

                  {/* Author — hard: no testid, locate via text relationship */}
                  <td
                    data-col="book-author"
                    className={styles.td}
                  >
                    {book.bookAuthor}
                  </td>

                  {/* ISBN — hard: no testid, locate by data-col attribute */}
                  <td
                    data-col="book-isbn"
                    className={`${styles.td} ${styles.isbnCell}`}
                  >
                    {book.bookIsbn}
                  </td>

                  {/* Published — hard: no testid, parse or locate by col */}
                  <td
                    data-col="book-published"
                    className={styles.td}
                  >
                    {book.bookPublished}
                  </td>

                  {/* Actions */}
                  <td
                    data-col="actions"
                    data-testid="cell-actions"
                    className={`${styles.td} ${styles.actionsCell}`}
                  >
                    {/*
                     * Beginner: Edit has data-testid + aria-label
                     * Challenge: Delete has ONLY aria-label — no data-testid
                     *   → forces XPath / getByRole({ name: /Delete .../ }) practice
                     */}
                    <button
                      type="button"
                      data-testid="btn-edit-book"
                      aria-label={`Edit ${book.bookName}`}
                      data-book-id={book.id}
                      onClick={() => setEditBook(book)}
                      className={styles.btnEdit}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${book.bookName}`}
                      data-book-id={book.id}
                      onClick={() => setDeleteBook(book)}
                      className={styles.btnDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Locator hint footer ───────────────────────────────────────────── */}
      <div className={styles.locatorHints} data-testid="locator-hints">
        <p className={styles.hintLabel}>Locator Practice Notes</p>
        <ul className={styles.hintList}>
          <li>
            <code>#dataTable</code> — stable id for all frameworks
          </li>
          <li>
            <code>[data-testid=&quot;book-row&quot;][data-book-id=&quot;book-004&quot;]</code> — row by id
          </li>
          <li>
            <code>td[data-col=&quot;book-isbn&quot;]</code> — column cells by attribute
          </li>
          <li>
            <code>Delete</code> buttons have <strong>no data-testid</strong> — use{" "}
            <code>aria-label</code> or XPath
          </li>
        </ul>
      </div>

      {/* ── Dialogs ───────────────────────────────────────────────────────── */}
      {editBook && (
        <EditDialog book={editBook} onClose={() => setEditBook(null)} />
      )}
      {deleteBook && (
        <DeleteDialog book={deleteBook} onClose={() => setDeleteBook(null)} />
      )}
    </div>
  );
}
