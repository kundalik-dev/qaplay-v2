import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Authentication error — QA Playground",
};

export default function AuthErrorPage() {
  return (
    <div className={styles["auth-card"]} data-testid="auth-error-page">
      <Link href="/" className={styles["auth-brand"]}>
        <span className={styles["auth-brand__dot"]} />
        QA Playground
      </Link>

      <div className={styles["auth-info-box"]}>
        <div className={styles["auth-info-icon"]}>🔒</div>
        <h1 className={styles["auth-info-title"]}>Authentication failed</h1>
        <p className={styles["auth-info-body"]}>
          Something went wrong during sign-in. This can happen if you denied
          access, or if the session link is invalid or expired.
        </p>
        <Link href="/auth/sign-in" className={styles["auth-link"]}>
          Try again
        </Link>
      </div>
    </div>
  );
}
