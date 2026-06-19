/**
 * Auth route group layout.
 * Full-screen centred card below the site navbar.
 * The navbar is fixed, so we offset with padding-top.
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
