import { CheckCircle2, RotateCcw } from "lucide-react";

import styles from "./contact-us.module.css";

interface ContactSuccessProps {
  email: string;
  onReset: () => void;
}

export function ContactSuccess({ email, onReset }: ContactSuccessProps) {
  return (
    <div
      className={styles.successState}
      data-testid="contact-success"
      role="alert"
      aria-live="polite"
    >
      <div className={styles.successIcon} aria-hidden="true">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h3 className={styles.successTitle}>Message Sent!</h3>

      <p className={styles.successBody}>
        Thanks for reaching out. We&apos;ll reply within 2 business days at{" "}
        <span className={styles.successEmail}>{email}</span>.
      </p>

      <button
        type="button"
        onClick={onReset}
        className={styles.successReset}
        data-testid="contact-success-reset"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Send another message
      </button>
    </div>
  );
}
