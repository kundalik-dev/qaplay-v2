"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { products as allProducts, type Product } from "@/data/ui-practice-data/tables-data";
import { PaginationControls } from "./pagination-controls";
import {
  ariaSortFor,
  sortProducts,
  type SortDirection,
  type SortableProductColumn,
} from "./table-utils";

const PER_PAGE = 4;

/** Unique categories derived from the data set, in first-seen order. */
const CATEGORIES = Array.from(new Set(allProducts.map((p) => p.category)));

const COLUMNS: {
  col: SortableProductColumn;
  label: string;
  testId: string;
}[] = [
  { col: "product", label: "Product", testId: "products-th-product" },
  { col: "category", label: "Category", testId: "products-th-category" },
  { col: "price", label: "Price", testId: "products-th-price" },
  { col: "rating", label: "Rating", testId: "products-th-rating" },
];

interface Draft {
  product: string;
  category: string;
  price: string;
  rating: string;
}

const INITIAL_ROWS = allProducts.map((p) => ({ ...p }));

/**
 * All-in-one shopping products table — merges everything sections 1–5
 * demonstrate for the product data set into a single table: sortable
 * headers, name/category search+filter, pagination, and inline
 * Edit/Delete row actions. Rendered at the top of /ui-practice/tables
 * ahead of the individual single-feature sections below (which stay in
 * place until removal is approved).
 */
export function ShoppingProductsTableSection() {
  const [rows, setRows] = useState<Product[]>(INITIAL_ROWS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortCol, setSortCol] = useState<SortableProductColumn | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>({
    product: "",
    category: "",
    price: "",
    rating: "",
  });

  const filteredSorted = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = rows.filter(
      (p) =>
        (!q || p.product.toLowerCase().includes(q)) &&
        (!category || p.category === category),
    );
    if (sortCol && sortDir) result = sortProducts(result, sortCol, sortDir);
    return result;
  }, [rows, query, category, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE));
  const currentPage = page > totalPages ? 1 : page;
  const start = (currentPage - 1) * PER_PAGE;
  const pageRows = filteredSorted.slice(start, start + PER_PAGE);

  const infoText = filteredSorted.length
    ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, filteredSorted.length)} of ${filteredSorted.length}`
    : "No results";

  function handleSort(col: SortableProductColumn) {
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
    setCategory("");
    setSortCol(null);
    setSortDir(null);
    setPage(1);
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setDraft({
      product: p.product,
      category: p.category,
      price: p.price,
      rating: p.rating,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit(id: number) {
    setRows((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              product: draft.product,
              category: draft.category,
              price: draft.price,
              rating: draft.rating,
            }
          : p,
      ),
    );
    setEditingId(null);
  }

  function deleteRow(id: number) {
    setRows((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function updateDraft(field: keyof Draft) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <section
      className="section"
      id="sec-shopping-products"
      data-testid="section-shopping-products"
      data-section="shopping-products-table"
    >
      <h2>
        Shopping Products{" "}
        <span className="badge badge-red">All-in-one</span>
      </h2>
      <p className="hint">
        Merges everything below into one table for the product data: click a
        column header to sort (<code>product</code>, <code>category</code>,{" "}
        <code>price</code>, <code>rating</code>), search by name, filter by
        category, page through results, and Edit/Delete a row inline.
      </p>
      <div className="controls">
        <div className="ctrl-field">
          <label htmlFor="products-search">Search by name</label>
          <input
            type="search"
            id="products-search"
            data-testid="products-search"
            aria-label="Search products by name"
            placeholder="e.g. MacBook"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="ctrl-field">
          <label htmlFor="products-category-filter">Category</label>
          <select
            id="products-category-filter"
            data-testid="products-category-filter"
            aria-label="Filter by category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm clear-btn-align"
          id="products-clear-btn"
          data-testid="products-clear-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      <div className="result-info" data-testid="products-row-count">
        {`${rows.length} product${rows.length !== 1 ? "s" : ""} in table`}
      </div>
      <div className="result-info" data-testid="products-result-count">
        {`Showing ${filteredSorted.length} of ${rows.length} products`}
      </div>
      <table data-testid="products-table" aria-label="Shopping products — all-in-one">
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
            <th scope="col" data-testid="products-th-stock">
              Stock
            </th>
            <th scope="col" data-testid="products-th-actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody data-testid="products-tbody">
          {pageRows.length === 0 ? (
            <tr className="empty-msg">
              <td colSpan={6}>No products match your filters.</td>
            </tr>
          ) : (
            pageRows.map((p) =>
              editingId === p.id ? (
                <tr
                  key={p.id}
                  data-testid={`products-row-${p.id}`}
                  data-id={p.id}
                >
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`products-edit-name-${p.id}`}
                      value={draft.product}
                      onChange={updateDraft("product")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`products-edit-category-${p.id}`}
                      value={draft.category}
                      onChange={updateDraft("category")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`products-edit-price-${p.id}`}
                      value={draft.price}
                      onChange={updateDraft("price")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`products-edit-rating-${p.id}`}
                      value={draft.rating}
                      onChange={updateDraft("rating")}
                    />
                  </td>
                  <td>
                    <span
                      className={p.inStock ? "stock-in" : "stock-out"}
                      data-testid={`products-stock-${p.id}`}
                    >
                      {p.stockLabel}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`products-save-btn-${p.id}`}
                      onClick={() => saveEdit(p.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-testid={`products-cancel-btn-${p.id}`}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={p.id}
                  data-testid={`products-row-${p.id}`}
                  data-id={p.id}
                >
                  <td data-testid={`products-name-${p.id}`}>{p.product}</td>
                  <td data-testid={`products-category-${p.id}`}>
                    {p.category}
                  </td>
                  <td data-testid={`products-price-${p.id}`}>{p.price}</td>
                  <td data-testid={`products-rating-${p.id}`}>{p.rating}</td>
                  <td>
                    <span
                      className={p.inStock ? "stock-in" : "stock-out"}
                      data-testid={`products-stock-${p.id}`}
                    >
                      {p.stockLabel}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`products-edit-btn-${p.id}`}
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-testid={`products-delete-btn-${p.id}`}
                      onClick={() => deleteRow(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
            )
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
        testIdPrefix="products"
        navAriaLabel="Shopping products pagination"
      />
    </section>
  );
}
