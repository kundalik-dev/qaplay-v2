"use client";

import { useCallback, useMemo, useState } from "react";
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

import { ResourceCard } from "./resource-card";
import {
  DUMMY_RESOURCES,
  EMPTY_FORM,
  RESOURCE_TYPES,
  TYPE_COLORS,
  TYPE_LABELS,
  type Resource,
  type ResourceType,
} from "./resource-constants";
import styles from "./resources.module.css";

// ── Helpers ───────────────────────────────────────────────────────────────────

let nextId = DUMMY_RESOURCES.length + 1;
function genId() {
  return `r-new-${nextId++}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  resource: Resource;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDelete({ resource, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
      <div className={styles.confirmDialog}>
        <h2 className={styles.confirmTitle}>Delete resource?</h2>
        <p className={styles.confirmDesc}>
          &ldquo;{resource.title}&rdquo; will be permanently deleted.
        </p>
        <div className={styles.confirmActions}>
          <button className={styles.btnOutline} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.btnDanger} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Resource dialog (add / edit) ──────────────────────────────────────────────

interface ResourceDialogProps {
  editingResource: Resource | null;
  allTags: string[];
  onClose: () => void;
  onSave: (data: typeof EMPTY_FORM, editingId: string | null) => void;
}

function ResourceDialog({
  editingResource,
  allTags,
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
        !form.tags.includes(t) && (!tagInput || t.includes(tagInput.toLowerCase())),
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
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.dialogBody}>
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
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              data-testid="res-title-input"
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
              />
              <button
                type="button"
                className={styles.btnSm}
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim()}
                data-testid="add-tag-btn"
              >
                Add
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className={styles.cardTags} style={{ marginTop: 4 }}>
                <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                  Suggestions:
                </span>
                {suggestions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={styles.tag}
                    onClick={() => addTag(t)}
                    data-testid={`suggest-tag-${t}`}
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
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              data-testid="res-image-input"
            />
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <button className={styles.btnOutline} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => onSave(form, editingResource?.id ?? null)}
            data-testid="save-resource-btn"
          >
            {editingResource ? "Update" : "Add Resource"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────

export function ResourcesView() {
  const [resources, setResources] = useState<Resource[]>(DUMMY_RESOURCES);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterTag, setFilterTag] = useState("");

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Confirm delete
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);

  // All unique tags
  const allTags = useMemo(
    () =>
      [
        ...new Set(
          resources.flatMap((r) => r.tags.map((t) => t.toLowerCase())),
        ),
      ].sort(),
    [resources],
  );

  // Filtered list
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

  const openAdd = () => {
    setEditingResource(null);
    setDialogOpen(true);
  };

  const openEdit = useCallback((r: Resource) => {
    setEditingResource(r);
    setDialogOpen(true);
  }, []);

  const handleDeleteRequest = useCallback((r: Resource) => {
    setDeleteTarget(r);
  }, []);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSave = (
    data: typeof EMPTY_FORM,
    editingId: string | null,
  ) => {
    if (!data.resourceType || !data.title || !data.url) return;

    const now = new Date().toISOString().split("T")[0];

    if (editingId) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                resourceType: data.resourceType as ResourceType,
                title: data.title.trim(),
                url: data.url.trim(),
                description: data.description.trim() || undefined,
                tags: data.tags,
                image: data.image.trim() || undefined,
              }
            : r,
        ),
      );
    } else {
      const newResource: Resource = {
        id: genId(),
        resourceType: data.resourceType as ResourceType,
        title: data.title.trim(),
        url: data.url.trim(),
        description: data.description.trim() || undefined,
        tags: data.tags,
        image: data.image.trim() || undefined,
        createdAt: now,
      };
      setResources((prev) => [newResource, ...prev]);
    }
    setDialogOpen(false);
    setEditingResource(null);
  };

  return (
    <div className={styles.page} data-testid="resources-page" data-section="resources">
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Resources</h1>
          <span className={styles.countBadge} data-testid="resources-count">
            {resources.length} saved
          </span>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.btnOutline}
            id="telegram-bot-btn"
            data-testid="telegram-bot-btn"
          >
            <Send size={13} />
            Telegram Bot
          </button>
          <button
            className={styles.btnOutline}
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
          >
            <Plus size={13} />
            Add Resource
          </button>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div className={styles.filtersBar} data-testid="resources-filters">
        {/* Search */}
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

        {/* Type filter */}
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

        {/* Tag filter */}
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

        {/* View toggle */}
        <div
          className={styles.viewToggle}
          role="group"
          aria-label="View mode"
        >
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

      {/* ── Content ── */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState} data-testid="resources-empty">
          <div className={styles.emptyEmoji}>📚</div>
          <p className={styles.emptyTitle}>No resources found</p>
          <p className={styles.emptyDesc}>
            {resources.length === 0
              ? "Add your first resource to get started."
              : "Try adjusting your filters or search query."}
          </p>
        </div>
      ) : viewMode === "card" ? (
        <div
          className={styles.cardGrid}
          id="resources-card-grid"
          data-testid="resources-card-grid"
        >
          {filtered.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              onEdit={openEdit}
              onDeleteRequest={handleDeleteRequest}
              onFilterByTag={setFilterTag}
            />
          ))}
        </div>
      ) : (
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
              {filtered.map((r) => {
                const typeColor = TYPE_COLORS[r.resourceType];
                return (
                  <tr key={r.id} data-testid={`resource-row-${r.id}`}>
                    <td>
                      <span
                        className={styles.typeBadge}
                        style={{
                          background: typeColor.background,
                          color: typeColor.color,
                        }}
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
                      {r.description && (
                        <p className={styles.tableDesc}>{r.description}</p>
                      )}
                    </td>
                    <td>
                      <div className={styles.tableTags}>
                        {r.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            className={styles.tag}
                            onClick={() => setFilterTag(tag)}
                            title={`Filter by "${tag}"`}
                          >
                            {tag}
                          </button>
                        ))}
                        {r.tags.length > 3 && (
                          <span className={styles.tagMore}>
                            +{r.tags.length - 3}
                          </span>
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
                          onClick={() => openEdit(r)}
                          title="Edit"
                          data-testid={`edit-resource-${r.id}`}
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          onClick={() => handleDeleteRequest(r)}
                          title="Delete"
                          data-testid={`delete-resource-${r.id}`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit dialog ── */}
      {dialogOpen && (
        <ResourceDialog
          editingResource={editingResource}
          allTags={allTags}
          onClose={() => {
            setDialogOpen(false);
            setEditingResource(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* ── Confirm delete ── */}
      {deleteTarget && (
        <ConfirmDelete
          resource={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
