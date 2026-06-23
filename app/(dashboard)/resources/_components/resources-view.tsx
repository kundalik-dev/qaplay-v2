"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ExternalLink,
  KeyRound,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { ApiKeysDialog } from "./api-keys-dialog";
import { ResourceCard } from "./resource-card";
import {
  EMPTY_FORM,
  RESOURCE_TYPES,
  TYPE_COLORS,
  TYPE_LABELS,
  type Resource,
  type ResourceType,
} from "./resource-constants";
import { TelegramBotPanel } from "./telegram-bot-panel";
import styles from "./resources.module.css";

// -- ResourceTableRow ---------------------------------------------------------
// Extracted to avoid block-body arrow function inside JSX contentBlock, which
// triggers TS17008 parse errors in TypeScript 5.9 when used in variable assignments.

interface ResourceTableRowProps {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDeleteRequest: (r: Resource) => void;
  onFilterByTag: (tag: string) => void;
}

function ResourceTableRow({
  resource: r,
  onEdit,
  onDeleteRequest,
  onFilterByTag,
}: ResourceTableRowProps) {
  const typeColor = TYPE_COLORS[r.resourceType];
  return (
    <tr key={r.id} data-testid={`resource-row-${r.id}`}>
      <td>
        <span
          className={styles.typeBadge}
          style={{ background: typeColor.background, color: typeColor.color }}
        >
          {TYPE_LABELS[r.resourceType]}
        </span>
      </td>
      <td style={{ maxWidth: 300 }}>
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tableTitle}
          data-testid={`resource-title-${r.id}`}
        >
          {r.title}
          <ExternalLink size={11} style={{ opacity: 0.5 }} />
        </a>
        {r.description && <p className={styles.tableDesc}>{r.description}</p>}
      </td>
      <td>
        <div className={styles.tableTags}>
          {r.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              className={styles.tag}
              onClick={() => onFilterByTag(tag)}
            >
              {tag}
            </button>
          ))}
          {r.tags.length > 3 && (
            <span className={styles.tagMore}>+{r.tags.length - 3}</span>
          )}
        </div>
      </td>
      <td className={styles.tableDate}>
        {new Date(r.createdAt).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td>
        <div className={styles.tableActions}>
          <button
            className={styles.iconBtn}
            onClick={() => onEdit(r)}
            title="Edit"
            data-testid={`edit-resource-${r.id}`}
          >
            <Pencil size={12} />
          </button>
          <button
            className={[styles.iconBtn, styles.iconBtnDanger].join(" ")}
            onClick={() => onDeleteRequest(r)}
            title="Delete"
            data-testid={`delete-resource-${r.id}`}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// -- Content-shard components --------------------------------------------------
// Each "state" of the resources panel is a standalone component so that
// renderContent() can return trivial single-line JSX.  TypeScript 5.9's JSX
// parser chokes on multi-line JSX returned from inline functions or assigned to
// variables, but handles normal function component returns without issue.

function ResourcesLoadingContent() {
  return (
    <div className={styles.loadingState} data-testid="resources-loading">
      <div className={styles.loadingSpinner} aria-hidden="true" />
      <p>Loading resources</p>
    </div>
  );
}

interface ResourcesErrorContentProps {
  error: string;
  onRetry: () => void;
}
function ResourcesErrorContent({ error, onRetry }: ResourcesErrorContentProps) {
  return (
    <div className={styles.errorState} data-testid="resources-error">
      <p className={styles.errorTitle}>Failed to load resources</p>
      <p className={styles.errorDesc}>{error}</p>
      <button className={styles.btnPrimary} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

interface ResourcesEmptyContentProps {
  hasNoneOwned: boolean;
  onAdd: () => void;
}
function ResourcesEmptyContent({
  hasNoneOwned,
  onAdd,
}: ResourcesEmptyContentProps) {
  return (
    <div className={styles.emptyState} data-testid="resources-empty">
      <div className={styles.emptyEmoji}>{hasNoneOwned ? "📚" : "🔍"}</div>
      <p className={styles.emptyTitle}>
        {hasNoneOwned ? "No resources yet" : "No resources found"}
      </p>
      <p className={styles.emptyDesc}>
        {hasNoneOwned
          ? "Add your first resource to get started."
          : "No resources match your current filters."}
      </p>
      {hasNoneOwned && (
        <button
          className={styles.btnPrimary}
          onClick={onAdd}
          data-testid="empty-add-resource-btn"
        >
          Add your first resource
        </button>
      )}
    </div>
  );
}

interface ResourcesListContentProps {
  resources: Resource[];
  viewMode: "card" | "table";
  onEdit: (r: Resource) => void;
  onDeleteRequest: (r: Resource) => void;
  onFilterByTag: (tag: string) => void;
}
function ResourcesListContent({
  resources,
  viewMode,
  onEdit,
  onDeleteRequest,
  onFilterByTag,
}: ResourcesListContentProps) {
  if (viewMode === "card") {
    return (
      <div
        className={styles.cardGrid}
        id="resources-card-grid"
        data-testid="resources-card-grid"
      >
        {resources.map((r) => (
          <ResourceCard
            key={r.id}
            resource={r}
            onEdit={onEdit}
            onDeleteRequest={onDeleteRequest}
            onFilterByTag={onFilterByTag}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={styles.tableWrap}>
      <table
        className={styles.table}
        id="resources-table"
        data-testid="resources-table"
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Tags</th>
            <th>Added</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <ResourceTableRow
              key={r.id}
              resource={r}
              onEdit={onEdit}
              onDeleteRequest={onDeleteRequest}
              onFilterByTag={onFilterByTag}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -- API helpers --------------------------------------------------------------

async function apiFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

// -- Sub-components ------------------------------------------------------------

interface ConfirmDeleteProps {
  resource: Resource;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDelete({
  resource,
  deleting,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
      <div className={styles.confirmDialog}>
        <h2 className={styles.confirmTitle}>Delete resource?</h2>
        <p className={styles.confirmDesc}>
          &ldquo;{resource.title}&rdquo; will be permanently deleted.
        </p>
        <div className={styles.confirmActions}>
          <button
            className={styles.btnOutline}
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            className={styles.btnDanger}
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -- Resource dialog (add / edit) ----------------------------------------------

interface ResourceDialogProps {
  editingResource: Resource | null;
  allTags: string[];
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (data: typeof EMPTY_FORM, editingId: string | null) => void;
}

function ResourceDialog({
  editingResource,
  allTags,
  saving,
  error,
  onClose,
  onSave,
}: ResourceDialogProps) {
  const [form, setForm] = useState(
    editingResource
      ? {
          resourceType: editingResource.resourceType as ResourceType | "",
          title: editingResource.title,
          url: editingResource.url,
          description: editingResource.description ?? "",
          tags: editingResource.tags,
          image: editingResource.image ?? "",
        }
      : { ...EMPTY_FORM },
  );
  const [tagInput, setTagInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase();
    if (!tag || form.tags.includes(tag)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

  const suggestions = allTags
    .filter(
      (t) =>
        !form.tags.includes(t) &&
        (!tagInput || t.includes(tagInput.toLowerCase())),
    )
    .slice(0, 6);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.dialog} data-testid="resource-dialog">
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>
            {editingResource ? "Edit Resource" : "Add Resource"}
          </h2>
          <button
            className={styles.dialogCloseBtn}
            onClick={onClose}
            aria-label="Close dialog"
            disabled={saving}
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.dialogBody}>
          {error && (
            <p
              className={styles.formError}
              role="alert"
              data-testid="form-error"
            >
              {error}
            </p>
          )}

          {/* Type */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-type">
              Type *
            </label>
            <select
              id="res-type"
              className={styles.select}
              value={form.resourceType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  resourceType: e.target.value as ResourceType,
                }))
              }
              data-testid="res-type-select"
              disabled={saving}
            >
              <option value="">Select type…</option>
              {RESOURCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-title">
              Title *
            </label>
            <input
              id="res-title"
              className={styles.input}
              placeholder="Resource title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              data-testid="res-title-input"
              disabled={saving}
            />
          </div>

          {/* URL */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-url">
              URL *
            </label>
            <input
              id="res-url"
              className={styles.input}
              type="url"
              placeholder="https://…"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              data-testid="res-url-input"
              disabled={saving}
            />
          </div>

          {/* Description */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-desc">
              Description
            </label>
            <textarea
              id="res-desc"
              className={styles.textarea}
              placeholder="Brief description…"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              data-testid="res-desc-input"
              disabled={saving}
            />
          </div>

          {/* Tags */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-tags">
              Tags
            </label>
            {form.tags.length > 0 && (
              <div className={styles.tagsChips}>
                {form.tags.map((tag) => (
                  <span key={tag} className={styles.tagChip}>
                    {tag}
                    <button
                      type="button"
                      className={styles.tagChipRemove}
                      onClick={() => removeTag(tag)}
                      aria-label={`Remove tag ${tag}`}
                      data-testid={`remove-tag-${tag}`}
                      disabled={saving}
                    >
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className={styles.tagInputRow}>
              <input
                id="res-tags"
                className={styles.input}
                placeholder="Type a tag and press Enter…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                autoComplete="off"
                data-testid="res-tags-input"
                disabled={saving}
              />
              <button
                type="button"
                className={styles.btnSm}
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim() || saving}
                data-testid="add-tag-btn"
              >
                Add
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className={styles.cardTags} style={{ marginTop: 4 }}>
                <span
                  style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                >
                  Suggestions:
                </span>
                {suggestions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={styles.tag}
                    onClick={() => addTag(t)}
                    data-testid={`suggest-tag-${t}`}
                    disabled={saving}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="res-image">
              Image URL (optional)
            </label>
            <input
              id="res-image"
              className={styles.input}
              type="url"
              placeholder="https://…"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              data-testid="res-image-input"
              disabled={saving}
            />
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <button
            className={styles.btnOutline}
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => onSave(form, editingResource?.id ?? null)}
            disabled={saving}
            data-testid="save-resource-btn"
          >
            {saving
              ? editingResource
                ? "Updating…"
                : "Adding…"
              : editingResource
                ? "Update"
                : "Add Resource"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -- Toast --------------------------------------------------------------------

interface ToastItem {
  id: number;
  message: string;
  isError: boolean;
}

function ToastList({
  toasts,
  toastCls,
  toastErrCls,
}: {
  toasts: ToastItem[];
  toastCls: string;
  toastErrCls: string;
}) {
  if (toasts.length === 0) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={t.isError ? toastErrCls : toastCls}
          role="status"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const show = useCallback((message: string, isError = false) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, isError }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return { toasts, show };
}

// -- Main view ----------------------------------------------------------------

export function ResourcesView() {
  const [resources, setResources] = useState<Resource[]>([]);
  // totalOwned = unfiltered count of resources belonging to this user.
  // Used to distinguish "no resources yet" from "filters matched nothing".
  const [totalOwned, setTotalOwned] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterTag, setFilterTag] = useState("");

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [dialogSaving, setDialogSaving] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  // Confirm delete
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Panels
  const [keysOpen, setKeysOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);

  const { toasts, show: showToast } = useToast();

  // -- Load resources ------------------------------------------------------

  const loadResources = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await apiFetch<{
        data: Resource[];
        total: number;
        filtered: boolean;
      }>("/api/resources");
      setResources(res.data);
      // When not filtered, total === data.length (the server skips the count query).
      // Either way, this is the user's unfiltered owned count.
      setTotalOwned(res.total);
    } catch (err) {
      setFetchError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadResources();
  }, [loadResources]);

  // -- Derived state ------------------------------------------------------

  const allTags = useMemo(
    () =>
      [
        ...new Set(
          resources.flatMap((r) => r.tags.map((t) => t.toLowerCase())),
        ),
      ].sort(),
    [resources],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return resources.filter((r) => {
      if (filterType !== "ALL" && r.resourceType !== filterType) return false;
      if (filterTag && !r.tags.includes(filterTag)) return false;
      if (
        q &&
        !r.title.toLowerCase().includes(q) &&
        !(r.description ?? "").toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [resources, search, filterType, filterTag]);

  // -- Dialog handlers ----------------------------------------------------

  const openAdd = () => {
    setEditingResource(null);
    setDialogError(null);
    setDialogOpen(true);
  };

  const openEdit = useCallback((r: Resource) => {
    setEditingResource(r);
    setDialogError(null);
    setDialogOpen(true);
  }, []);

  const closeDialog = () => {
    if (dialogSaving) return;
    setDialogOpen(false);
    setEditingResource(null);
    setDialogError(null);
  };

  const handleSave = async (
    data: typeof EMPTY_FORM,
    editingId: string | null,
  ) => {
    if (!data.resourceType || !data.title.trim() || !data.url.trim()) {
      setDialogError("Type, title, and URL are required.");
      return;
    }

    setDialogSaving(true);
    setDialogError(null);

    try {
      const payload = {
        resourceType: data.resourceType,
        title: data.title.trim(),
        url: data.url.trim(),
        description: data.description.trim() || null,
        tags: data.tags,
        image: data.image.trim() || null,
      };

      if (editingId) {
        const updated = await apiFetch<Resource>(
          `/api/resources/${editingId}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          },
        );
        setResources((prev) =>
          prev.map((r) => (r.id === editingId ? updated : r)),
        );
        showToast("Resource updated");
      } else {
        const created = await apiFetch<Resource>("/api/resources", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setResources((prev) => [created, ...prev]);
        setTotalOwned((n) => (n ?? 0) + 1);
        showToast("Resource added");
      }

      setDialogOpen(false);
      setEditingResource(null);
    } catch (err) {
      setDialogError((err as Error).message);
    } finally {
      setDialogSaving(false);
    }
  };

  // -- Delete handlers ----------------------------------------------------

  const handleDeleteRequest = useCallback((r: Resource) => {
    setDeleteTarget(r);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/resources/${deleteTarget.id}`, { method: "DELETE" });
      setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setTotalOwned((n) => Math.max(0, (n ?? 1) - 1));
      showToast("Resource deleted");
    } catch (err) {
      showToast((err as Error).message, true);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // -- Content renderer -------------------------------------------------------

  const hasNoneOwned = (totalOwned ?? 0) === 0;

  const renderContent = (): ReactNode => {
    if (loading) return <ResourcesLoadingContent />;
    if (fetchError)
      return (
        <ResourcesErrorContent error={fetchError} onRetry={loadResources} />
      );
    if (filtered.length === 0)
      return (
        <ResourcesEmptyContent hasNoneOwned={hasNoneOwned} onAdd={openAdd} />
      );
    return (
      <ResourcesListContent
        resources={filtered}
        viewMode={viewMode}
        onEdit={openEdit}
        onDeleteRequest={handleDeleteRequest}
        onFilterByTag={setFilterTag}
      />
    );
  };

  // -- Render ------
  return (
    <div
      className={styles.page}
      data-testid="resources-page"
      data-section="resources"
    >
      {/* -- Top bar -- */}
      <div className={styles.topBar}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Resources</h1>
          {!loading && totalOwned !== null && (
            <span className={styles.countBadge} data-testid="resources-count">
              {totalOwned} saved
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.btnOutline}
            onClick={() => setTelegramOpen(true)}
            id="telegram-bot-btn"
            data-testid="telegram-bot-btn"
          >
            <Send size={13} />
            Telegram Bot
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => setKeysOpen(true)}
            id="api-keys-btn"
            data-testid="api-keys-btn"
          >
            <KeyRound size={13} />
            API Keys
          </button>
          <button
            className={styles.btnPrimary}
            onClick={openAdd}
            id="add-resource-btn"
            data-testid="add-resource-btn"
            disabled={loading}
          >
            <Plus size={13} />
            Add Resource
          </button>
        </div>
      </div>

      {/* -- Filters bar -- */}
      <div className={styles.filtersBar} data-testid="resources-filters">
        <div className={styles.searchWrap}>
          <Search size={13} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="resource-search"
            data-testid="resource-search"
          />
          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={11} />
            </button>
          )}
        </div>

        <select
          className={styles.filterSelect}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          id="resource-type-filter"
          data-testid="resource-type-filter"
        >
          <option value="ALL">All Types</option>
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          id="resource-tag-filter"
          data-testid="resource-tag-filter"
        >
          <option value="">All Tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className={styles.viewToggle} role="group" aria-label="View mode">
          <button
            className={`${styles.viewBtn} ${viewMode === "table" ? styles.viewBtnActive : ""}`}
            onClick={() => setViewMode("table")}
            title="Table view"
            id="view-table-btn"
            data-testid="view-table-btn"
            aria-pressed={viewMode === "table"}
          >
            <List size={14} />
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === "card" ? styles.viewBtnActive : ""}`}
            onClick={() => setViewMode("card")}
            title="Card view"
            id="view-card-btn"
            data-testid="view-card-btn"
            aria-pressed={viewMode === "card"}
          >
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      {/* -- Content -- */}
      {renderContent()}

      {/* -- Add / Edit dialog -- */}
      {dialogOpen && (
        <ResourceDialog
          editingResource={editingResource}
          allTags={allTags}
          saving={dialogSaving}
          error={dialogError}
          onClose={closeDialog}
          onSave={handleSave}
        />
      )}

      {/* -- Confirm delete -- */}
      {deleteTarget && (
        <ConfirmDelete
          resource={deleteTarget}
          deleting={deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* -- API Keys dialog -- */}
      <ApiKeysDialog
        open={keysOpen}
        onClose={() => setKeysOpen(false)}
        showToast={showToast}
      />

      {/* -- Telegram Bot panel -- */}
      <TelegramBotPanel
        open={telegramOpen}
        onClose={() => setTelegramOpen(false)}
        showToast={showToast}
      />

      {/* -- Toasts -- */}
      <ToastList
        toasts={toasts}
        toastCls={styles.toast}
        toastErrCls={styles.toastError}
      />
    </div>
  );
}
