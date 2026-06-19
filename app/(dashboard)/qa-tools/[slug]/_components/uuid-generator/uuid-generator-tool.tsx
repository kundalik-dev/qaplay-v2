"use client";

import { useCallback, useState } from "react";

import styles from "./uuid-generator.module.css";

// ── Helpers ────────────────────────────────────────────────────────────────────

function generateUuidV4(): string {
  // Use the Web Crypto API for cryptographically strong random values
  return crypto.randomUUID();
}

function formatUuid(uuid: string, uppercase: boolean, hyphens: boolean) {
  let result = uuid;
  if (!hyphens) result = result.replaceAll("-", "");
  if (uppercase) result = result.toUpperCase();
  return result;
}

// ── Copy hook ──────────────────────────────────────────────────────────────────

function useCopyState() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard API unavailable — silently fail
    }
  }, []);

  return { copied, copy };
}

// ── UUID Generator Tool ────────────────────────────────────────────────────────

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const { copied, copy } = useCopyState();

  const generate = () => {
    const clamped = Math.max(1, Math.min(count, 100));
    const generated = Array.from({ length: clamped }, () =>
      formatUuid(generateUuidV4(), uppercase, includeHyphens),
    );
    setUuids(generated);
  };

  const copyAll = () => {
    const text = uuids.join("\n");
    copy(text, "all");
  };

  const copyOne = (uuid: string, index: number) => {
    copy(uuid, `item-${index}`);
  };

  return (
    <div
      className={styles.tool}
      data-testid="uuid-generator-tool"
      data-section="uuid-generator"
    >
      {/* ── Controls ── */}
      <div className={styles.controls} data-testid="uuid-controls">
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="uuid-count">
            Count
          </label>
          <input
            id="uuid-count"
            type="number"
            className={styles.input}
            value={count}
            min={1}
            max={100}
            onChange={(e) => setCount(Number(e.target.value))}
            data-testid="uuid-count-input"
            aria-label="Number of UUIDs to generate"
          />
        </div>

        <button
          className={styles.generateBtn}
          onClick={generate}
          id="uuid-generate-btn"
          data-testid="uuid-generate-btn"
          data-cta="generate"
          aria-label="Generate UUIDs"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width={14}
            height={14}
          >
            <path d="M13.5 6A6 6 0 1 0 14 9" />
            <path d="M14 4v3h-3" />
          </svg>
          Generate
        </button>
      </div>

      {/* ── Options ── */}
      <div className={styles.options} data-testid="uuid-options">
        <label className={styles.checkboxLabel} htmlFor="uuid-uppercase">
          <input
            id="uuid-uppercase"
            type="checkbox"
            className={styles.checkbox}
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            data-testid="uuid-uppercase-checkbox"
          />
          Uppercase
        </label>

        <label className={styles.checkboxLabel} htmlFor="uuid-hyphens">
          <input
            id="uuid-hyphens"
            type="checkbox"
            className={styles.checkbox}
            checked={includeHyphens}
            onChange={(e) => setIncludeHyphens(e.target.checked)}
            data-testid="uuid-hyphens-checkbox"
          />
          Include hyphens
        </label>
      </div>

      {/* ── Output card ── */}
      <div className={styles.outputCard} data-testid="uuid-output-card">
        <div className={styles.outputHeader}>
          <span className={styles.outputLabel}>
            {uuids.length > 0
              ? `${uuids.length} UUID${uuids.length > 1 ? "s" : ""} generated`
              : "Output"}
          </span>

          {uuids.length > 0 && (
            <div className={styles.outputActions}>
              <button
                className={`${styles.copyBtn} ${copied === "all" ? styles.copyBtnCopied : ""}`}
                onClick={copyAll}
                data-testid="uuid-copy-all-btn"
                aria-label="Copy all UUIDs to clipboard"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  width={12}
                  height={12}
                >
                  {copied === "all" ? (
                    <path d="M3 8l3 3 7-7" />
                  ) : (
                    <>
                      <rect x="5" y="5" width="8" height="8" rx="1.5" />
                      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
                    </>
                  )}
                </svg>
                {copied === "all" ? "Copied!" : "Copy all"}
              </button>

              <button
                className={styles.clearBtn}
                onClick={() => setUuids([])}
                data-testid="uuid-clear-btn"
                aria-label="Clear output"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className={styles.outputBody} data-testid="uuid-output-body">
          {uuids.length === 0 ? (
            <div
              className={styles.emptyPlaceholder}
              data-testid="uuid-empty-state"
            >
              <svg
                className={styles.emptyPlaceholderIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width={40}
                height={40}
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <p className={styles.emptyPlaceholderText}>
                Click <strong>Generate</strong> to create UUIDs
              </p>
            </div>
          ) : (
            <ol
              className={styles.uuidList}
              data-testid="uuid-list"
              aria-label="Generated UUIDs"
            >
              {uuids.map((uuid, i) => (
                <li
                  key={`${uuid}-${i}`}
                  className={styles.uuidItem}
                  data-testid={`uuid-item-${i}`}
                >
                  <span
                    className={styles.uuidValue}
                    data-testid={`uuid-value-${i}`}
                  >
                    {uuid}
                  </span>
                  <button
                    className={`${styles.copyItemBtn} ${copied === `item-${i}` ? styles.copyItemBtnDone : ""}`}
                    onClick={() => copyOne(uuid, i)}
                    aria-label={`Copy UUID ${uuid}`}
                    data-testid={`uuid-copy-item-${i}`}
                    title="Copy to clipboard"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      width={13}
                      height={13}
                    >
                      {copied === `item-${i}` ? (
                        <path d="M3 8l3 3 7-7" />
                      ) : (
                        <>
                          <rect x="5" y="5" width="8" height="8" rx="1.5" />
                          <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
                        </>
                      )}
                    </svg>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* ── Stats ── */}
      {uuids.length > 0 && (
        <div className={styles.stats} data-testid="uuid-stats">
          <div className={styles.stat} data-testid="uuid-stat-count">
            <span className={styles.statValue}>{uuids.length}</span>
            <span>UUID{uuids.length > 1 ? "s" : ""} generated</span>
          </div>
          <div className={styles.stat} data-testid="uuid-stat-format">
            <span>Format:</span>
            <span className={styles.statValue}>
              {uppercase ? "UPPERCASE" : "lowercase"}
              {includeHyphens ? " with hyphens" : " no hyphens"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
