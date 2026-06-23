"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, KeyRound, Loader2, Trash2, X } from "lucide-react";

import styles from "./resources.module.css";
import panelStyles from "./panels.module.css";

// ── Types ────────────────────────────────────────────────────────────────────

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
}

interface NewKeyResult extends ApiKey {
  key: string; // raw key — shown once
}

interface ApiKeysDialogProps {
  open: boolean;
  onClose: () => void;
  showToast: (msg: string, isError?: boolean) => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export function ApiKeysDialog({
  open,
  onClose,
  showToast,
}: ApiKeysDialogProps) {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<NewKeyResult | null>(null); // revealed once after generation
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmRevokeId, setConfirmRevokeId] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/api-keys");
      if (res.ok) setKeys(await res.json());
    } catch {
      showToast("Failed to load API keys", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setNewKey(null);
      setConfirmRevokeId(null);
      setNewKeyName("");
      void fetchKeys();
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleGenerate = async () => {
    const name = newKeyName.trim();
    if (!name) {
      inputRef.current?.focus();
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        showToast(
          (err as { error?: string }).error ?? "Failed to generate key",
          true,
        );
        return;
      }
      const created: NewKeyResult = await res.json();
      setNewKey(created);
      setNewKeyName("");
      setKeys((prev) => [created, ...prev]);
      showToast("API key generated!");
    } catch {
      showToast("Failed to generate key", true);
    } finally {
      setGenerating(false);
    }
  };

  const copyKey = (key: string, id: string) => {
    void navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = async (id: string) => {
    setRevoking(true);
    try {
      const res = await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setKeys((prev) => prev.filter((k) => k.id !== id));
      if (newKey?.id === id) setNewKey(null);
      showToast("Key revoked");
    } catch {
      showToast("Failed to revoke key", true);
    } finally {
      setRevoking(false);
      setConfirmRevokeId(null);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label="API Keys"
        data-testid="api-keys-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className={[styles.dialog, panelStyles.wideDialog].join(" ")}>
          {/* Header */}
          <div className={styles.dialogHeader}>
            <h2 className={styles.dialogTitle}>
              <KeyRound
                size={15}
                style={{ verticalAlign: "middle", marginRight: 6 }}
              />
              API Keys
            </h2>
            <button
              className={styles.dialogCloseBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className={styles.dialogBody}>
            <p className={panelStyles.panelDesc}>
              Use these keys in the <strong>QA Playground Clipper</strong>{" "}
              Chrome extension to save resources directly from any webpage.
            </p>

            {/* New key revealed callout */}
            {newKey && (
              <div
                className={panelStyles.newKeyCallout}
                data-testid="new-key-callout"
              >
                <p className={panelStyles.newKeyHeading}>
                  ✅ Key generated — copy it now, it won&apos;t be shown again
                </p>
                <div className={panelStyles.keyRow}>
                  <code
                    className={panelStyles.keyCode}
                    data-testid="new-key-value"
                  >
                    {newKey.key}
                  </code>
                  <button
                    className={panelStyles.iconBtn}
                    onClick={() => copyKey(newKey.key, newKey.id)}
                    title="Copy key"
                    data-testid="copy-new-key-btn"
                  >
                    {copiedId === newKey.id ? (
                      <Check size={13} className={panelStyles.iconGreen} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Generate form */}
            <div className={panelStyles.generateRow}>
              <input
                ref={inputRef}
                className={[styles.input, panelStyles.generateInput].join(" ")}
                placeholder="Key name (e.g. My Extension)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleGenerate();
                }}
                disabled={generating}
                id="new-key-name"
                data-testid="new-key-name-input"
              />
              <button
                className={styles.btnPrimary}
                onClick={() => void handleGenerate()}
                disabled={generating || !newKeyName.trim()}
                id="generate-key-btn"
                data-testid="generate-key-btn"
              >
                {generating ? (
                  <Loader2 size={13} className={panelStyles.spin} />
                ) : (
                  "Generate"
                )}
              </button>
            </div>

            {/* Keys list */}
            {loading ? (
              <div className={panelStyles.centered}>
                <Loader2 size={18} className={panelStyles.spin} />
              </div>
            ) : keys.length === 0 ? (
              <p className={panelStyles.emptyMsg} data-testid="no-api-keys">
                No API keys yet.
              </p>
            ) : (
              <div className={panelStyles.keysList} data-testid="api-keys-list">
                {keys.map((k) => (
                  <div
                    key={k.id}
                    className={panelStyles.keyItem}
                    data-testid={`api-key-row-${k.id}`}
                  >
                    <div className={panelStyles.keyMeta}>
                      <span className={panelStyles.keyName}>{k.name}</span>
                      <span className={panelStyles.keyPrefix}>
                        {k.prefix}••••••••
                      </span>
                      <span className={panelStyles.keyDates}>
                        Created {new Date(k.createdAt).toLocaleDateString()}
                        {k.lastUsedAt && (
                          <>
                            {" "}
                            · Last used{" "}
                            {new Date(k.lastUsedAt).toLocaleDateString()}
                          </>
                        )}
                        {k.expiresAt && (
                          <>
                            {" "}
                            · Expires{" "}
                            {new Date(k.expiresAt).toLocaleDateString()}
                          </>
                        )}
                      </span>
                    </div>
                    <div className={panelStyles.keyActions}>
                      <button
                        className={panelStyles.iconBtn}
                        title="Revoke"
                        onClick={() => setConfirmRevokeId(k.id)}
                        data-testid={`revoke-key-${k.id}`}
                      >
                        <Trash2 size={13} className={panelStyles.iconDanger} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.dialogFooter}>
            <button className={styles.btnOutline} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Confirm revoke */}
      {confirmRevokeId && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmDialog}>
            <h2 className={styles.confirmTitle}>Revoke key?</h2>
            <p className={styles.confirmDesc}>
              Any extension using &ldquo;
              {keys.find((k) => k.id === confirmRevokeId)?.name}
              &rdquo; will stop working.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.btnOutline}
                onClick={() => setConfirmRevokeId(null)}
                disabled={revoking}
              >
                Cancel
              </button>
              <button
                className={styles.btnDanger}
                onClick={() => void handleRevoke(confirmRevokeId)}
                disabled={revoking}
                data-testid="confirm-revoke-btn"
              >
                {revoking ? "Revoking…" : "Revoke"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
