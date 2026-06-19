/**
 * Auth route group layout.
 * Renders a centered card — no app nav or sidebar.
 */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import styles from "./auth.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles["auth-layout"]}>
      <main className={styles["auth-layout__main"]}>{children}</main>
    </div>
  );
}
