"use client";

import { useState } from "react";
import { AlertCircle, Mail, MessageSquare, Send, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactTopics,
  MAX_MESSAGE_LENGTH,
} from "@/data/contact-us/contact-us-data";

import { ContactSuccess } from "./contact-success";
import styles from "./contact-us.module.css";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", topic: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isLoading = status === "loading";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function selectTopic(value: string) {
    setForm((prev) => ({ ...prev, topic: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.topic) {
      setStatus("error");
      setErrorMsg("Please select a topic before sending.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: form.topic }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setSubmittedEmail(form.email);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Please try again.",
      );
    }
  }

  const charCount = form.message.length;
  const charClass =
    charCount >= MAX_MESSAGE_LENGTH
      ? styles.charCountLimit
      : charCount >= MAX_MESSAGE_LENGTH * 0.85
        ? styles.charCountWarn
        : styles.charCount;

  if (status === "success") {
    return (
      <ContactSuccess email={submittedEmail} onReset={() => setStatus("idle")} />
    );
  }

  return (
    <div className={styles.formCard} data-testid="contact-form-card">
      <p className={styles.formHeading}>Send Us a Message</p>
      <p className={styles.formSubheading}>
        All fields marked <span className={styles.required}>*</span> are
        required.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        data-testid="contact-form"
        className="space-y-5"
      >
        {/* Name + Email ─────────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-name" className={styles.fieldLabelText}>
              Full Name <span className={styles.required}>*</span>
            </Label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} aria-hidden="true" />
              <Input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="name"
                className={styles.inputWithIcon}
                data-testid="contact-input-name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className={styles.fieldLabelText}>
              Email Address <span className={styles.required}>*</span>
            </Label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} aria-hidden="true" />
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
                className={styles.inputWithIcon}
                data-testid="contact-input-email"
              />
            </div>
          </div>
        </div>

        {/* Topic pills ────────────────────────────────────────────────────── */}
        <div className="space-y-2">
          <p className={styles.fieldLabelText}>
            Topic <span className={styles.required}>*</span>
          </p>
          <div
            className={styles.topicGrid}
            role="group"
            aria-label="Select a topic"
            data-testid="contact-topic-group"
          >
            {contactTopics.map(({ value, label, emoji }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={form.topic === value}
                onClick={() => selectTopic(value)}
                disabled={isLoading}
                className={`${styles.topicPill} ${form.topic === value ? styles.topicPillActive : ""}`}
                data-testid={`contact-topic-${value.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className={styles.topicEmoji} aria-hidden="true">
                  {emoji}
                </span>
                <span className="truncate">{label.split("—")[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message ──────────────────────────────────────────────────────────── */}
        <div className="space-y-1.5">
          <div className={styles.fieldLabel}>
            <Label htmlFor="contact-message" className={styles.fieldLabelText}>
              Message <span className={styles.required}>*</span>
            </Label>
            <span className={charClass} aria-live="polite">
              {charCount}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <MessageSquare
              className={styles.textareaIcon}
              aria-hidden="true"
            />
            <Textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="Describe your question, issue, or idea in detail…"
              value={form.message}
              onChange={handleChange}
              disabled={isLoading}
              className={`resize-none ${styles.inputWithIcon}`}
              data-testid="contact-input-message"
            />
          </div>
        </div>

        {/* Error banner ──────────────────────────────────────────────────────── */}
        {status === "error" && (
          <div
            className={styles.errorBanner}
            role="alert"
            data-testid="contact-error-banner"
          >
            <AlertCircle className={styles.errorIcon} aria-hidden="true" />
            <p className={styles.errorText}>{errorMsg}</p>
          </div>
        )}

        {/* Footer ────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={isLoading}
            data-testid="contact-submit-btn"
            data-cta="contact-send"
          >
            {isLoading ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </Button>
          <p className={styles.privacyNote}>
            We&apos;ll only use your email to reply to your message.
          </p>
        </div>
      </form>
    </div>
  );
}
