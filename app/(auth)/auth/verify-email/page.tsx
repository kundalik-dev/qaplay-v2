import type { Metadata } from "next";
import Link from "next/link";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Verify your email — QA Playground",
};

export default function VerifyEmailPage() {
  return (
    <div className={styles["auth-card"]} data-testid="verify-email-page">
      <Link href="/" className={styles["auth-brand"]}>
        <span className={styles["auth-brand__dot"]} />
        QA Playground
      </Link>

      <div className={styles["auth-info-box"]}>
        <div className={styles["auth-info-icon"]}>✉️</div>
        <h1 className={styles["auth-info-title"]}>Verify your email</h1>
        <p className={styles["auth-info-body"]}>
          A verification link has been sent to your email address. Click it to
          activate your account. The link expires in{" "}
          <strong>24&nbsp;hours</strong>.
        </p>
        <p
          className={styles["auth-info-body"]}
          style={{ fontSize: "0.85rem", marginBottom: "1rem" }}
        >
          Didn&apos;t receive it? Check your spam folder, or{" "}
          <Link href="/auth/sign-up" className={styles["auth-link"]}>
            sign up again
          </Link>{" "}
          to resend.
        </p>
        <Link href="/auth/sign-in" className={styles["auth-link"]}>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
