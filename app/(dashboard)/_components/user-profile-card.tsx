"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronUp, LogOut, User } from "lucide-react";

import styles from "./dashboard.module.css";

interface UserInfo {
  name: string;
  email: string;
  /** Two-letter initials derived from name, or falls back to first char of email */
  initials: string;
}

interface UserProfileCardProps {
  isCollapsed: boolean;
}

/**
 * Derive initials from a display name.
 * "John Doe" → "JD", "Alice" → "A", "" → "?"
 */
function getInitials(name: string, email: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return email.charAt(0).toUpperCase() || "?";
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase();
}

export function UserProfileCard({ isCollapsed }: UserProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Auth state ─────────────────────────────────────────────────────────
  // Replace this block with your real session hook once better-auth is wired:
  //
  //   import { authClient } from "@/lib/auth-client"
  //   const { data: session, isPending } = authClient.useSession()
  //   const user = session?.user
  //   const isSignedIn = !!user
  //
  // For now we use a placeholder so the UI works before auth is configured.
  const isSignedIn = false; // TODO: wire authClient.useSession()
  const user: UserInfo | null = isSignedIn
    ? {
        name: "Kundalik J.",
        email: "kundalikjadhav5545@gmail.com",
        initials: "KJ",
      }
    : null;

  // ── Signed-out state ───────────────────────────────────────────────────
  if (!isSignedIn || !user) {
    if (isCollapsed) {
      return (
        <div data-testid="sidebar-user-guest-collapsed">
          <Link
            href="/login"
            className={styles.loginBtnIcon}
            title="Sign in"
            aria-label="Sign in"
          >
            <User size={16} />
          </Link>
        </div>
      );
    }

    return (
      <div className={styles.loginBanner} data-testid="sidebar-user-guest">
        <p className={styles.loginBannerText}>
          Sign in to track your progress and save your work.
        </p>
        <Link
          href="/login"
          className={styles.loginBtn}
          data-testid="sidebar-login-btn"
        >
          Log in / Sign up
        </Link>
      </div>
    );
  }

  // ── Signed-in state ────────────────────────────────────────────────────
  const initials = getInitials(user.name, user.email);

  async function handleSignOut() {
    setIsOpen(false);
    // TODO: wire real sign-out:
    // await authClient.signOut()
    // router.push("/")
    console.log("Sign out triggered — wire authClient.signOut() here");
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      data-testid="sidebar-user-card"
    >
      {/* Dropdown popover — rendered above the trigger */}
      {isOpen && (
        <div
          className={styles.profileDropdown}
          role="menu"
          data-testid="sidebar-user-dropdown"
        >
          <button
            className={`${styles.dropdownItem} ${styles.dropdownItemDestructive}`}
            onClick={handleSignOut}
            role="menuitem"
            data-testid="sidebar-logout-btn"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      )}

      <button
        className={styles.profileCard}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        data-testid="sidebar-profile-trigger"
      >
        <span
          className={styles.profileAvatar}
          aria-hidden="true"
          data-testid="sidebar-avatar"
        >
          {initials}
        </span>

        {!isCollapsed && (
          <>
            <span className={styles.profileInfo}>
              <span className={styles.profileName}>{user.name}</span>
              <span className={styles.profileEmail}>{user.email}</span>
            </span>
            <ChevronUp
              size={14}
              className={`${styles.profileChevron} ${isOpen ? styles.profileChevronOpen : ""}`}
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </div>
  );
}
