"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronUp, LogOut, User } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";
import styles from "./dashboard.module.css";

interface UserProfileCardProps {
  isCollapsed: boolean;
}

export function UserProfileCard({ isCollapsed }: UserProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ── Auth state ─────────────────────────────────────────────────────────
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;
  const isSignedIn = !!user;

  // Tracks whether the user's avatar URL (e.g. Google photo) failed to
  // load, so we can fall back to initials instead of a broken image.
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  // Reset the broken-image fallback whenever the avatar URL itself changes
  // (e.g. a fresh Google photo after re-auth).
  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [user?.image]);

  // ── Loading state ──────────────────────────────────────────────────────
  if (isPending) {
    return (
      <div
        className={styles.profileCard}
        style={{ cursor: "default", opacity: 0.5 }}
        data-testid="sidebar-user-loading"
        aria-busy="true"
      >
        <span
          className={styles.profileAvatar}
          aria-hidden="true"
          style={{ background: "var(--muted)" }}
        />
        {!isCollapsed && (
          <span className={styles.profileInfo}>
            <span
              className={styles.profileName}
              style={{ background: "var(--muted)", borderRadius: 4 }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </span>
        )}
      </div>
    );
  }

  // ── Signed-out state ───────────────────────────────────────────────────
  if (!isSignedIn || !user) {
    if (isCollapsed) {
      return (
        <div data-testid="sidebar-user-guest-collapsed">
          <Link
            href="/auth/sign-in"
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
          href="/auth/sign-up"
          className={styles.loginBtn}
          data-testid="sidebar-signup-btn"
        >
          Sign up for free
        </Link>
        <Link
          href="/auth/sign-in"
          className={styles.loginBtnSecondary}
          data-testid="sidebar-login-btn"
        >
          Log in
        </Link>
      </div>
    );
  }

  // ── Signed-in state ────────────────────────────────────────────────────
  const initials = getInitials(user.name ?? "", user.email);
  const showImage = !!user.image && !avatarLoadFailed;

  async function handleSignOut() {
    setIsOpen(false);
    await authClient.signOut();
    router.push("/");
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
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image as string}
              alt=""
              className={styles.profileAvatarImg}
              onError={() => setAvatarLoadFailed(true)}
            />
          ) : (
            initials
          )}
        </span>

        {!isCollapsed && (
          <>
            <span className={styles.profileInfo}>
              <span className={styles.profileName}>
                {user.name ?? user.email}
              </span>
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
