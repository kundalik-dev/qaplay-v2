"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageSquareText,
  Send,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import styles from "./feedback-widget.module.css";

type FeedbackKind = "FEEDBACK" | "ISSUE";
type SubmitStatus = "idle" | "loading" | "success" | "error";

const MAX_MESSAGE_LENGTH = 2000;

/**
 * Site-wide floating feedback button, mounted once in app/layout.tsx.
 *
 * Signed-in visitors are posted automatically under their account — name,
 * email, and userId all come from the Better Auth session server-side, so
 * the form never asks for them. Signed-out visitors are stored as a guest
 * entry (userId stays null, name defaults to "Guest User") with no extra
 * fields to fill in either.
 */
export function FeedbackWidget() {
  // Portal target (document.body) only exists on the client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user);

  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<FeedbackKind>("FEEDBACK");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function resetForm() {
    setKind("FEEDBACK");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Wait out the close animation before wiping the form.
      setTimeout(resetForm, 200);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      setStatus("error");
      setErrorMsg("Please describe your feedback or issue.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: kind,
          message,
          // Name/email are never sent from the client: signed-in submissions
          // are stamped with the session's name/email server-side, and
          // signed-out submissions are stored as "Guest User" automatically.
          pageUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
    }
  }

  if (!mounted) return null;

  const charCount = message.length;
  const isLoading = status === "loading";
  const noun = kind === "ISSUE" ? "issue" : "feedback";

  return createPortal(
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className={styles.button}
        aria-label="Send feedback or report an issue"
        title="Feedback"
        data-testid="feedback-widget-button"
        data-cta="open-feedback-widget"
      >
        <MessageSquareText className={styles.icon} aria-hidden="true" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className={styles.dialogContent}
          data-testid="feedback-dialog"
          aria-label="Send feedback or report an issue"
        >
          {status === "success" ? (
            <div className={styles.successState} data-testid="feedback-success">
              <CheckCircle2 className={styles.successIcon} aria-hidden="true" />
              <p className={styles.successTitle}>Thanks for the {noun}!</p>
              <p className={styles.successBody}>
                We read every submission — this helps make QA Playground better.
              </p>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                data-testid="feedback-close-btn"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle data-testid="feedback-dialog-title">
                  Send feedback or report an issue
                </DialogTitle>
                <DialogDescription data-testid="feedback-dialog-description">
                  {isLoggedIn
                    ? `Posting as ${session?.user?.name ?? "you"}.`
                    : "Sending as a guest."}
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                noValidate
                className={styles.form}
                data-testid="feedback-form"
              >
                <div
                  className={styles.typeToggle}
                  role="group"
                  aria-label="Feedback type"
                  data-testid="feedback-type-toggle"
                >
                  <button
                    type="button"
                    onClick={() => setKind("FEEDBACK")}
                    aria-pressed={kind === "FEEDBACK"}
                    disabled={isLoading}
                    className={cn(
                      styles.typeOption,
                      kind === "FEEDBACK" && styles.typeOptionActive,
                    )}
                    data-testid="feedback-type-feedback"
                  >
                    <MessageSquareText aria-hidden="true" />
                    Feedback
                  </button>
                  <button
                    type="button"
                    onClick={() => setKind("ISSUE")}
                    aria-pressed={kind === "ISSUE"}
                    disabled={isLoading}
                    className={cn(
                      styles.typeOption,
                      kind === "ISSUE" && styles.typeOptionActive,
                    )}
                    data-testid="feedback-type-issue"
                  >
                    <AlertTriangle aria-hidden="true" />
                    Report an issue
                  </button>
                </div>

                <div className={styles.field}>
                  <div className={styles.messageLabelRow}>
                    <Label htmlFor="feedback-message">
                      {kind === "ISSUE" ? "What went wrong?" : "Your feedback"}
                    </Label>
                    <span className={styles.charCount}>
                      {charCount}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                  <Textarea
                    id="feedback-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder={
                      kind === "ISSUE"
                        ? "Describe the issue and steps to reproduce it…"
                        : "Tell us what you think, or what we could improve…"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                    className="resize-none"
                    data-testid="feedback-message-input"
                  />
                </div>

                {status === "error" && (
                  <div
                    className={styles.errorBanner}
                    role="alert"
                    data-testid="feedback-error-banner"
                  >
                    <AlertCircle
                      className={styles.errorIcon}
                      aria-hidden="true"
                    />
                    <p>{errorMsg}</p>
                  </div>
                )}

                <div className={styles.footer}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    data-testid="feedback-submit-btn"
                    data-cta="feedback-send"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send aria-hidden="true" />
                        Send {noun}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>,
    document.body,
  );
}
