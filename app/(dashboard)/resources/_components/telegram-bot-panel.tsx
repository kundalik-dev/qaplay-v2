"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  Link2Off,
  Loader2,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

import styles from "./resources.module.css";
import panelStyles from "./panels.module.css";

// ── Types ────────────────────────────────────────────────────────────────────

type TelegramStatus =
  | { linked: true; username: string | null; createdAt: string }
  | { linked: false; token: string; expiresAt: string; createdAt?: string };

interface TelegramBotPanelProps {
  open: boolean;
  onClose: () => void;
  showToast: (msg: string, isError?: boolean) => void;
}

const BOT_URL = "https://t.me/qaplayground_bot";

// ── Component ────────────────────────────────────────────────────────────────

export function TelegramBotPanel({
  open,
  onClose,
  showToast,
}: TelegramBotPanelProps) {
  const [status, setStatus] = useState<TelegramStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/telegram/connect-token");
      if (res.ok) setStatus(await res.json());
    } catch {
      showToast("Failed to load Telegram status", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setConfirmDisconnect(false);
      setCopied(false);
      /* eslint-enable react-hooks/set-state-in-effect */
      void fetchStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const generateToken = async () => {
    setGenerating(true);
    setCopied(false);
    try {
      const res = await fetch("/api/telegram/connect-token");
      if (res.ok) setStatus(await res.json());
      else showToast("Failed to generate token", true);
    } catch {
      showToast("Failed to generate token", true);
    } finally {
      setGenerating(false);
    }
  };

  const disconnect = async () => {
    setDisconnecting(true);
    try {
      const res = await fetch("/api/telegram/connect-token", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setStatus(null);
      setConfirmDisconnect(false);
      showToast("Telegram disconnected");
    } catch {
      showToast("Failed to disconnect Telegram", true);
    } finally {
      setDisconnecting(false);
    }
  };

  const copyToken = (token: string) => {
    void navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <>
      <div
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Telegram Bot"
        data-testid="telegram-bot-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className={[styles.dialog, panelStyles.wideDialog].join(" ")}>
          {/* Header */}
          <div className={styles.dialogHeader}>
            <h2 className={styles.dialogTitle}>
              <span className={panelStyles.dialogTitleInner}>
                <Send size={15} />
                Telegram Bot
              </span>
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
            {loading ? (
              <div className={panelStyles.centered}>
                <Loader2 size={18} className={panelStyles.spin} />
              </div>
            ) : status?.linked ? (
              /* ── Already linked ────────────────────────────────────── */
              <div
                className={panelStyles.linkedState}
                data-testid="telegram-linked"
              >
                <div className={panelStyles.linkedBadge}>
                  <div className={panelStyles.linkedIcon}>
                    <Link2 size={14} />
                  </div>
                  <div>
                    <p className={panelStyles.linkedTitle}>Telegram linked</p>
                    {status.username && (
                      <p className={panelStyles.linkedSub}>
                        @{status.username}
                      </p>
                    )}
                    <p className={panelStyles.linkedSub}>
                      Connected{" "}
                      {new Date(status.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className={panelStyles.quickRef}>
                  <p className={panelStyles.quickRefHeading}>Quick reference</p>
                  <code className={panelStyles.quickRefCode}>
                    #todo Buy groceries @30min
                  </code>
                  <code className={panelStyles.quickRefCode}>
                    https://example.com #js #tutorial
                  </code>
                  <code className={panelStyles.quickRefCode}>
                    #note Your note content #tag
                  </code>
                </div>

                <div className={panelStyles.linkedActions}>
                  <a
                    href={BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={panelStyles.btnTelegram}
                    data-testid="open-telegram-bot-btn"
                  >
                    <Send size={13} />
                    Open Telegram
                    <ExternalLink size={11} style={{ opacity: 0.7 }} />
                  </a>
                  <button
                    className={[
                      styles.btnOutline,
                      panelStyles.btnDisconnect,
                    ].join(" ")}
                    onClick={() => setConfirmDisconnect(true)}
                    disabled={disconnecting}
                    id="disconnect-telegram-btn"
                    data-testid="disconnect-telegram-btn"
                  >
                    <Link2Off size={13} />
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              /* ── Not linked ─────────────────────────────────────────── */
              <div data-testid="telegram-unlinked">
                <p className={panelStyles.panelDesc}>
                  Link your Telegram account to save todos, resources, and notes
                  by messaging the bot.
                </p>

                <ol className={panelStyles.stepList}>
                  <li className={panelStyles.stepItem}>
                    <span className={panelStyles.stepNum}>1</span>
                    <span className={panelStyles.stepText}>
                      Generate a connect token below
                    </span>
                  </li>
                  <li className={panelStyles.stepItem}>
                    <span className={panelStyles.stepNum}>2</span>
                    <span className={panelStyles.stepText}>
                      Open the bot and send:
                      <code className={panelStyles.inlineCode}>
                        /connect &lt;your-token&gt;
                      </code>
                    </span>
                  </li>
                  <li className={panelStyles.stepItem}>
                    <span className={panelStyles.stepNum}>3</span>
                    <span className={panelStyles.stepText}>
                      Bot confirms — you&apos;re linked!
                    </span>
                  </li>
                </ol>

                {/* Setup guide link — inline, below steps */}
                <a
                  href="/help/telegram-setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={panelStyles.helpAnchor}
                  style={{ marginBottom: 14, display: "inline-flex" }}
                >
                  <ExternalLink size={11} />
                  Setup guide &amp; command reference
                </a>

                {/* Token display */}
                {status?.token && (
                  <div className={panelStyles.tokenSection}>
                    <div className={panelStyles.tokenMeta}>
                      <span className={panelStyles.tokenLabel}>
                        Your connect token
                      </span>
                      {status.expiresAt && (
                        <span className={panelStyles.tokenExpiry}>
                          Expires{" "}
                          {new Date(status.expiresAt).toLocaleTimeString(
                            undefined,
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      )}
                    </div>
                    <div className={panelStyles.keyRow}>
                      <code
                        className={panelStyles.keyCode}
                        data-testid="telegram-token-display"
                      >
                        {status.token}
                      </code>
                      <button
                        className={panelStyles.iconBtn}
                        onClick={() => copyToken(status.token)}
                        title="Copy token"
                        data-testid="copy-telegram-token-btn"
                      >
                        {copied ? (
                          <Check size={13} className={panelStyles.iconGreen} />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer — three action buttons */}
          <div className={[styles.dialogFooter, panelStyles.telegramFooter].join(" ")}>
            {!status?.linked && (
              <>
                <button
                  className={panelStyles.btnBlue}
                  onClick={() => void generateToken()}
                  disabled={generating}
                  id={status?.token ? "refresh-telegram-token-btn" : "generate-telegram-token-btn"}
                  data-testid={status?.token ? "refresh-telegram-token-btn" : "generate-telegram-token-btn"}
                >
                  {generating ? (
                    <Loader2 size={13} className={panelStyles.spin} />
                  ) : (
                    <RefreshCw size={13} />
                  )}
                  {status?.token ? "Regenerate token" : "Generate token"}
                </button>
                <a
                  href={BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={panelStyles.btnOpenTelegram}
                  data-testid="open-telegram-bot-btn"
                >
                  <Send size={13} />
                  Open Telegram
                  <ExternalLink size={11} style={{ opacity: 0.7 }} />
                </a>
              </>
            )}
            <button className={styles.btnOutline} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Confirm disconnect */}
      {confirmDisconnect && (
        <div className={styles.confirmOverlay} role="dialog" aria-modal="true">
          <div className={styles.confirmDialog}>
            <h2 className={styles.confirmTitle}>Disconnect Telegram?</h2>
            <p className={styles.confirmDesc}>
              Bot messages will stop saving. You can reconnect anytime.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.btnOutline}
                onClick={() => setConfirmDisconnect(false)}
                disabled={disconnecting}
              >
                Cancel
              </button>
              <button
                className={styles.btnDanger}
                onClick={() => void disconnect()}
                disabled={disconnecting}
                data-testid="confirm-disconnect-telegram-btn"
              >
                {disconnecting ? "Disconnecting…" : "Disconnect"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
