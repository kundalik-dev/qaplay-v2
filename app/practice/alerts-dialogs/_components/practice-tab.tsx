"use client";

import { useEffect, useState } from "react";
import { ScenarioCard } from "@/components/practice";
import { ProgressWidget, type ProgressItem } from "@/components/practice";
import { FrameworkMethodsPanel } from "@/components/practice";
import { UpNextCard } from "@/components/practice";
import {
  alertsDialogsScenarios,
  frameworkMethods,
  notifications,
} from "@/data/practice-data/alerts-dialogs/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./alerts-dialogs.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

type ActiveDialog = {
  scenarioId: string;
  setResult: (r: string) => void;
  complete: () => void;
  notifId?: string;
  notifTitle?: string;
};

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [activeDialog, setActiveDialog] = useState<ActiveDialog | null>(null);

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  function closeDialog() {
    setActiveDialog(null);
  }

  const progressItems: ProgressItem[] = alertsDialogsScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  useEffect(() => {
    if (activeDialog?.scenarioId !== "S06") return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        activeDialog?.setResult("Dialog closed via Escape key");
        setActiveDialog(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeDialog]);

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>

          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            {/* ── S01 – Close Info Alert (Beginner) ──────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-info-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnInfo}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S01", setResult, complete })
                  }
                >
                  Open Info Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S02 – Confirm Action (Beginner) ────────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-confirm-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnConfirm}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S02", setResult, complete })
                  }
                >
                  Open Confirm Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S03 – Cancel / Stay (Beginner) ─────────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-unsaved-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnWarning}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S03", setResult, complete })
                  }
                >
                  Open Unsaved Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S04 – Destructive Confirm (Medium) ─────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-delete-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnDanger}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S04", setResult, complete })
                  }
                >
                  Open Delete Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S05 – Backdrop Click (Medium) ──────────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-backdrop-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnBackdrop}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S05", setResult, complete })
                  }
                >
                  Open Backdrop Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S06 – Escape Key (Hard) ────────────────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-escape-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnEscape}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S06", setResult, complete })
                  }
                >
                  Open Keyboard Dialog
                </button>
              )}
            </ScenarioCard>

            {/* ── S07 – Assert Content (Hard) ────────────────────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult, complete }) => (
                <button
                  type="button"
                  data-testid="open-notification-dialog"
                  className={`${styles.triggerBtn} ${styles.triggerBtnNeutral}`}
                  onClick={() =>
                    setActiveDialog({ scenarioId: "S07", setResult, complete })
                  }
                >
                  Open Notification
                </button>
              )}
            </ScenarioCard>

            {/* ── S08 – Scoped Repeated Triggers (Challenge) ─────────────── */}
            <ScenarioCard
              {...alertsDialogsScenarios[7]}
              onComplete={() => markDone("s08")}
            >
              {({ setResult, complete }) => (
                <div
                  className={styles.notifList}
                  data-testid="notifications-list"
                  data-section="notifications"
                >
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      data-testid="notif-item"
                      data-notif-id={notif.id}
                      data-severity={notif.severity}
                      className={`${styles.notifItem} ${
                        notif.severity === "info"
                          ? styles.notifItemInfo
                          : notif.severity === "warning"
                            ? styles.notifItemWarning
                            : styles.notifItemDanger
                      }`}
                    >
                      <span className={styles.notifLabel}>
                        {notif.severity === "info"
                          ? "ℹ️"
                          : notif.severity === "warning"
                            ? "⚠️"
                            : "🔒"}{" "}
                        {notif.title}
                      </span>
                      <button
                        type="button"
                        data-testid="notif-dismiss-btn"
                        className={styles.notifDismissBtn}
                        onClick={() =>
                          setActiveDialog({
                            scenarioId: "S08",
                            setResult,
                            complete,
                            notifId: notif.id,
                            notifTitle: notif.title,
                          })
                        }
                      >
                        Dismiss
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ScenarioCard>
          </div>
        </section>

        <aside
          className={styles.practiceSidebar}
          data-testid="practice-sidebar"
        >
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>

      {/* ── Dialog Portal ──────────────────────────────────────────────────── */}

      {/* S01 – Info Alert Dialog */}
      {activeDialog?.scenarioId === "S01" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-dialog-title"
          data-testid="info-alert-dialog"
          data-dialog-type="info"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              <h2 id="info-dialog-title" className={styles.dialogTitle}>
                Session Notice
              </h2>
              <button
                type="button"
                data-testid="info-dialog-close-btn"
                aria-label="Close info dialog"
                className={styles.dialogCloseBtn}
                onClick={() => {
                  activeDialog.setResult("Info dialog dismissed");
                  closeDialog();
                }}
              >
                ×
              </button>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                Your session will expire in 30 minutes. Please save your work
                before the session ends.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <button
                type="button"
                data-testid="info-dialog-ok-btn"
                className={styles.btnConfirm}
                onClick={() => {
                  activeDialog.setResult("Info dialog dismissed");
                  closeDialog();
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* S02 – Confirm Action Dialog */}
      {activeDialog?.scenarioId === "S02" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          data-testid="confirm-action-dialog"
          data-dialog-type="confirm"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              <h2 id="confirm-dialog-title" className={styles.dialogTitle}>
                Confirm Submission
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                Submit this form response? This action cannot be reversed.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <button
                type="button"
                data-testid="confirm-cancel-btn"
                className={styles.btnCancel}
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                data-testid="confirm-ok-btn"
                className={styles.btnConfirm}
                onClick={() => {
                  activeDialog.setResult("Submission confirmed!");
                  closeDialog();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* S03 – Unsaved Changes Dialog */}
      {activeDialog?.scenarioId === "S03" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="unsaved-dialog-title"
          data-testid="unsaved-changes-dialog"
          data-dialog-type="warning"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              <h2 id="unsaved-dialog-title" className={styles.dialogTitle}>
                Unsaved Changes
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                You have unsaved changes. Leave without saving?
              </p>
            </div>
            <div className={styles.dialogActions}>
              {/* Challenge: Leave button has no data-testid — use aria-label or text */}
              <button
                type="button"
                aria-label="Leave page and discard changes"
                className={styles.btnCancel}
                onClick={closeDialog}
              >
                Leave
              </button>
              <button
                type="button"
                data-testid="stay-on-page-btn"
                className={styles.btnConfirm}
                onClick={() => {
                  activeDialog.setResult("Stayed — changes preserved");
                  closeDialog();
                }}
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* S04 – Delete Account Dialog (Destructive) */}
      {activeDialog?.scenarioId === "S04" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          data-testid="delete-account-dialog"
          data-dialog-type="danger"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              <h2 id="delete-dialog-title" className={styles.dialogTitle}>
                Delete Account
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                Permanently delete{" "}
                <strong
                  data-testid="delete-dialog-email"
                  className={styles.dialogHighlight}
                >
                  user@example.com
                </strong>
                ? This cannot be undone.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <button
                type="button"
                data-testid="delete-cancel-btn"
                className={styles.btnCancel}
                onClick={closeDialog}
              >
                Cancel
              </button>
              {/* Challenge: danger button has no data-testid — use aria-label */}
              <button
                type="button"
                aria-label="Confirm account deletion"
                className={styles.btnDanger}
                onClick={() => {
                  activeDialog.setResult("Account deleted!");
                  closeDialog();
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* S05 – Backdrop Dismiss Dialog */}
      {activeDialog?.scenarioId === "S05" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="backdrop-dialog-title"
          data-testid="backdrop-dismiss-dialog"
          data-dialog-type="backdrop"
          className={styles.dialogBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              activeDialog.setResult("Dialog closed via backdrop");
              closeDialog();
            }
          }}
        >
          <div
            className={styles.dialogBox}
            data-testid="backdrop-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <h2 id="backdrop-dialog-title" className={styles.dialogTitle}>
                Dismiss by Clicking Outside
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                Click the dark backdrop around this dialog box to close it.
                There is no close button — only the overlay area dismisses it.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <span className={styles.keyboardNotice}>
                Click outside the white box to dismiss
              </span>
            </div>
          </div>
        </div>
      )}

      {/* S06 – Escape Key Dialog */}
      {activeDialog?.scenarioId === "S06" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="escape-dialog-title"
          data-testid="escape-dismiss-dialog"
          data-dialog-type="keyboard"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              <h2 id="escape-dialog-title" className={styles.dialogTitle}>
                Press Escape to Close
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                This dialog has no close button. Use the{" "}
                <kbd className={styles.kbdKey}>Escape</kbd> key on your keyboard
                to dismiss it.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <div className={styles.keyboardNotice}>
                <kbd className={styles.kbdKey}>Esc</kbd>
                <span>Press Escape to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S07 – System Notification Dialog (content assertion) */}
      {activeDialog?.scenarioId === "S07" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notif-dialog-title"
          data-testid="system-notification-dialog"
          data-dialog-type="notification"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              {/* No data-testid on h2 — practice: getByRole('heading') */}
              <h2 id="notif-dialog-title" className={styles.dialogTitle}>
                Maintenance Window
              </h2>
            </div>
            <div className={styles.dialogBody}>
              {/* No data-testid on badge or paragraph — practice text assertions */}
              <span
                className={`${styles.dialogBadge} ${styles.dialogBadgeScheduled}`}
              >
                Scheduled
              </span>
              <p className={styles.dialogBodyText}>
                Service will be offline from Sunday 3:00–5:00 AM UTC. Please
                plan accordingly and save any active work before the window
                begins.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <button
                type="button"
                data-testid="notif-ack-btn"
                className={styles.btnConfirm}
                onClick={() => {
                  activeDialog.setResult("Notification acknowledged");
                  closeDialog();
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* S08 – Dismiss Confirm Dialog (scoped by data-notif-id) */}
      {activeDialog?.scenarioId === "S08" && activeDialog.notifId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dismiss-dialog-title"
          data-testid="dismiss-confirm-dialog"
          data-notif-id={activeDialog.notifId}
          data-dialog-type="dismiss-confirm"
          className={styles.dialogBackdrop}
        >
          <div className={styles.dialogBox}>
            <div className={styles.dialogHeader}>
              {/* No data-testid on h2 — dynamic title */}
              <h2 id="dismiss-dialog-title" className={styles.dialogTitle}>
                Dismiss {activeDialog.notifTitle}?
              </h2>
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.dialogBodyText}>
                This notification will be removed from your list.
              </p>
            </div>
            <div className={styles.dialogActions}>
              <button
                type="button"
                data-testid="dismiss-cancel-btn"
                className={styles.btnCancel}
                onClick={closeDialog}
              >
                Cancel
              </button>
              {/* Challenge: confirm button uses aria-label, no data-testid */}
              <button
                type="button"
                aria-label={`Confirm dismiss ${activeDialog.notifTitle}`}
                className={styles.btnSmallDanger}
                onClick={() => {
                  activeDialog.setResult(
                    `${activeDialog.notifTitle} — notification dismissed`,
                  );
                  closeDialog();
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
