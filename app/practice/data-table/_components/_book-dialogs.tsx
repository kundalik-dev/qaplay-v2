"use client";

import { useState } from "react";
import {
  genres,
  type BookRow,
} from "@/data/practice-data/data-table/scenarios";
import styles from "./data-table.module.css";

// ── Edit dialog ───────────────────────────────────────────────────────────────

export interface EditDialogProps {
  book: BookRow;
  onSave: (updated: BookRow) => void;
  onClose: () => void;
}

export function EditDialog({ book, onSave, onClose }: EditDialogProps) {
  const [bookName, setBookName] = useState(book.bookName);
  const [bookAuthor, setBookAuthor] = useState(book.bookAuthor);
  const [bookIsbn, setBookIsbn] = useState(book.bookIsbn);
  const [bookGenre, setBookGenre] = useState(book.bookGenre);
  const [bookPublished, setBookPublished] = useState(book.bookPublished);

  function handleSave() {
    onSave({
      ...book,
      bookName: bookName.trim() || book.bookName,
      bookAuthor: bookAuthor.trim() || book.bookAuthor,
      bookIsbn: bookIsbn.trim() || book.bookIsbn,
      bookGenre,
      bookPublished: bookPublished.trim() || book.bookPublished,
    });
  }

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
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
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
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            data-testid="edit-input-book-author"
            className={styles.fieldInput}
          />

          {/* Hard: span label + dynamic name attr — no data-testid */}
          <div className={styles.fieldRow}>
            <span className={styles.fieldSpanLabel}>ISBN</span>
            <input
              name={"isbn_field_" + book.id}
              type="text"
              value={bookIsbn}
              onChange={(e) => setBookIsbn(e.target.value)}
              className={styles.fieldInput}
            />
          </div>

          {/* Medium: native select + label */}
          <label htmlFor="edit-book-genre" className={styles.fieldLabel}>
            Genre
          </label>
          <select
            id="edit-book-genre"
            name="bookGenre"
            value={bookGenre}
            onChange={(e) => setBookGenre(e.target.value)}
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

          {/* Published date */}
          <label htmlFor="edit-book-published" className={styles.fieldLabel}>
            Published
          </label>
          <input
            id="edit-book-published"
            name="bookPublished"
            type="text"
            placeholder="YYYY-MM-DD"
            value={bookPublished}
            onChange={(e) => setBookPublished(e.target.value)}
            data-testid="edit-input-book-published"
            className={styles.fieldInput}
          />
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
          {/* Challenge: aria-label only — no data-testid on save */}
          <button
            type="button"
            aria-label={"Save changes for " + book.bookName}
            data-testid="edit-dialog-save"
            onClick={handleSave}
            className={styles.btnPrimary}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add book dialog ───────────────────────────────────────────────────────────

export interface AddDialogProps {
  nextSrNo: number;
  onSave: (book: BookRow) => void;
  onClose: () => void;
}

export function AddDialog({ nextSrNo, onSave, onClose }: AddDialogProps) {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookGenre, setBookGenre] = useState("Fiction");
  const [bookPublished, setBookPublished] = useState("");
  const [nameError, setNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  function handleSave() {
    const nameOk = bookName.trim().length > 0;
    const authorOk = bookAuthor.trim().length > 0;
    setNameError(!nameOk);
    setAuthorError(!authorOk);
    if (!nameOk || !authorOk) return;

    const id = "book-" + Date.now().toString().slice(-8);
    onSave({
      id,
      srNo: nextSrNo,
      bookName: bookName.trim(),
      bookAuthor: bookAuthor.trim(),
      bookIsbn: bookIsbn.trim()
        ? "ISBN-" + bookIsbn.trim().replace(/^ISBN-/i, "")
        : "ISBN-N/A",
      bookGenre,
      bookPublished: bookPublished.trim() || "N/A",
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-dialog-title"
      data-testid="add-book-dialog"
      className={styles.dialogBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialogBox}>
        <h2 id="add-dialog-title" className={styles.dialogTitle}>
          Add New Book
        </h2>
        <p className={styles.dialogSubtitle}>
          Entry will be saved and persist across page reloads.
        </p>

        <div className={styles.dialogFields}>
          <label htmlFor="add-book-name" className={styles.fieldLabel}>
            Book Name{" "}
            <span aria-hidden="true" className={styles.fieldRequired}>
              *
            </span>
          </label>
          <input
            id="add-book-name"
            name="bookName"
            type="text"
            placeholder="Enter book title"
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
              setNameError(false);
            }}
            data-testid="add-input-book-name"
            aria-required="true"
            aria-invalid={nameError}
            className={
              styles.fieldInput +
              (nameError ? " " + styles.fieldInputError : "")
            }
          />
          {nameError && (
            <span className={styles.fieldError} data-testid="add-name-error">
              Book name is required
            </span>
          )}

          <label htmlFor="add-book-author" className={styles.fieldLabel}>
            Author{" "}
            <span aria-hidden="true" className={styles.fieldRequired}>
              *
            </span>
          </label>
          <input
            id="add-book-author"
            name="bookAuthor"
            type="text"
            placeholder="Author name"
            value={bookAuthor}
            onChange={(e) => {
              setBookAuthor(e.target.value);
              setAuthorError(false);
            }}
            data-testid="add-input-book-author"
            aria-required="true"
            aria-invalid={authorError}
            className={
              styles.fieldInput +
              (authorError ? " " + styles.fieldInputError : "")
            }
          />
          {authorError && (
            <span className={styles.fieldError} data-testid="add-author-error">
              Author is required
            </span>
          )}

          <label htmlFor="add-book-genre" className={styles.fieldLabel}>
            Genre
          </label>
          <select
            id="add-book-genre"
            name="bookGenre"
            value={bookGenre}
            onChange={(e) => setBookGenre(e.target.value)}
            data-testid="add-select-genre"
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

          <div className={styles.fieldRow}>
            <span className={styles.fieldSpanLabel}>ISBN</span>
            <input
              name="isbn_field_new"
              type="text"
              placeholder="9780000000000"
              value={bookIsbn}
              onChange={(e) => setBookIsbn(e.target.value)}
              className={styles.fieldInput}
            />
          </div>

          <label htmlFor="add-book-published" className={styles.fieldLabel}>
            Published
          </label>
          <input
            id="add-book-published"
            name="bookPublished"
            type="text"
            placeholder="YYYY-MM-DD"
            value={bookPublished}
            onChange={(e) => setBookPublished(e.target.value)}
            data-testid="add-input-book-published"
            className={styles.fieldInput}
          />
        </div>

        <div className={styles.dialogActions}>
          <button
            type="button"
            data-testid="add-dialog-cancel"
            onClick={onClose}
            className={styles.btnOutline}
          >
            Cancel
          </button>
          <button
            type="button"
            data-testid="add-dialog-save"
            aria-label="Save new book"
            onClick={handleSave}
            className={styles.btnPrimary}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirm dialog ─────────────────────────────────────────────────────

export interface DeleteDialogProps {
  book: BookRow;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteDialog({ book, onConfirm, onClose }: DeleteDialogProps) {
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
          <button
            type="button"
            data-testid="delete-dialog-cancel"
            onClick={onClose}
            className={styles.btnOutline}
          >
            Cancel
          </button>
          <button
            type="button"
            aria-label={"Confirm delete " + book.bookName}
            onClick={onConfirm}
            className={styles.btnDanger}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
