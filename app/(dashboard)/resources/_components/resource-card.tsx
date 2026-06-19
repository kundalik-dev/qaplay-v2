"use client";

import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import type { Resource } from "./resource-constants";
import { TYPE_COLORS, TYPE_LABELS } from "./resource-constants";
import styles from "./resources.module.css";

interface ResourceCardProps {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDeleteRequest: (r: Resource) => void;
  onFilterByTag: (tag: string) => void;
}

export function ResourceCard({
  resource: r,
  onEdit,
  onDeleteRequest,
  onFilterByTag,
}: ResourceCardProps) {
  const typeColor = TYPE_COLORS[r.resourceType];
  const visibleTags = r.tags.slice(0, 3);
  const hiddenCount = r.tags.length - 3;

  return (
    <article
      className={styles.card}
      data-testid={`resource-card-${r.id}`}
      data-card="resource"
    >
      {/* Image */}
      <div
        className={styles.cardImage}
        style={!r.image ? { background: typeColor.background } : undefined}
      >
        {r.image ? (
          <Image
            src={r.image}
            alt={r.title}
            className={styles.cardImageImg}
            fill
            sizes="(max-width: 600px) 100vw, 220px"
            unoptimized
          />
        ) : (
          <div className={styles.cardImagePlaceholder}>
            <span
              className={styles.cardImageLabel}
              style={{ color: typeColor.color }}
            >
              {TYPE_LABELS[r.resourceType]}
            </span>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Type badge + edit/delete */}
        <div className={styles.cardMeta}>
          <span
            className={styles.typeBadge}
            style={{
              background: typeColor.background,
              color: typeColor.color,
            }}
            data-testid={`resource-type-badge-${r.id}`}
          >
            {TYPE_LABELS[r.resourceType]}
          </span>
          <div className={styles.cardButtons}>
            <button
              className={styles.iconBtn}
              onClick={() => onEdit(r)}
              title="Edit resource"
              data-testid={`edit-resource-${r.id}`}
              aria-label="Edit resource"
            >
              <Pencil size={12} />
            </button>
            <button
              className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
              onClick={() => onDeleteRequest(r)}
              title="Delete resource"
              data-testid={`delete-resource-${r.id}`}
              aria-label="Delete resource"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Title */}
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardTitle}
          data-testid={`resource-title-${r.id}`}
        >
          <span className={styles.cardTitleText}>{r.title}</span>
          <ExternalLink size={10} className={styles.cardTitleIcon} />
        </a>

        {/* Description */}
        {r.description && <p className={styles.cardDesc}>{r.description}</p>}

        {/* Tags */}
        {r.tags.length > 0 && (
          <div className={styles.cardTags}>
            {visibleTags.map((tag) => (
              <button
                key={tag}
                className={styles.tag}
                onClick={() => onFilterByTag(tag)}
                title={`Filter by "${tag}"`}
                data-testid={`resource-tag-${r.id}-${tag}`}
              >
                {tag}
              </button>
            ))}
            {hiddenCount > 0 && (
              <span className={styles.tagMore}>+{hiddenCount}</span>
            )}
          </div>
        )}

        {/* Date */}
        <p className={styles.cardDate}>
          {new Date(r.createdAt).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
