"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBankStore } from "./store/useBankStore";
import "./styles/bank.css";

/* ── Icons (inline SVG to avoid shadcn) ────────────────────────── */
function IconDashboard() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconAccounts() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function IconTransfer() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function IconTransactions() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconCards() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function IconProfile() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconBank() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="topbarIconGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect x="10" y="28" width="10" height="28" rx="2" fill="white" />
      <rect x="31" y="28" width="10" height="28" rx="2" fill="white" />
      <rect x="52" y="28" width="10" height="28" rx="2" fill="white" />
      <path d="M4 28 L36 8 L68 28 Z" fill="white" opacity="0.9" />
      <rect x="4" y="56" width="64" height="8" rx="3" fill="white" />
    </svg>
  );
}

/* ── Nav items config ───────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/demo/bank/dashboard",
    icon: <IconDashboard />,
    testid: "sidebar-link-dashboard",
  },
  {
    label: "Accounts",
    href: "/demo/bank/accounts",
    icon: <IconAccounts />,
    testid: "sidebar-link-accounts",
  },
  {
    label: "Transfer",
    href: "/demo/bank/dashboard",
    icon: <IconTransfer />,
    testid: "sidebar-link-transfer",
  },
  {
    label: "Transactions",
    href: "/demo/bank/dashboard",
    icon: <IconTransactions />,
    testid: "sidebar-link-transactions",
  },
  {
    label: "Cards",
    href: "/demo/bank/dashboard",
    icon: <IconCards />,
    testid: "sidebar-link-cards",
  },
];

const SECONDARY_NAV = [
  {
    label: "Profile",
    href: "/demo/bank/dashboard",
    icon: <IconProfile />,
    testid: "sidebar-link-profile",
  },
  {
    label: "Settings",
    href: "/demo/bank/dashboard",
    icon: <IconSettings />,
    testid: "sidebar-link-settings",
  },
];

/* ── Layout ─────────────────────────────────────────────────────── */
export default function BankDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { version, setVersionAndData, isLoggedIn, logout, user } =
    useBankStore();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  /* Data sync */
  useEffect(() => {
    async function syncData() {
      try {
        const { version: serverVersion } = await fetch(
          "/api/bank-version",
        ).then((r) => r.json());
        if (serverVersion !== version) {
          const data = await fetch("/api/bank-data").then((r) => r.json());
          setVersionAndData(serverVersion, data.balance, data.transactions);
        }
      } catch (err) {
        console.error("Failed to sync bank data:", err);
      } finally {
        setIsReady(true);
      }
    }
    syncData();
  }, [version, setVersionAndData]);

  /* Route guard */
  useEffect(() => {
    if (isReady) {
      if (!isLoggedIn && pathname !== "/demo/bank/login") {
        router.push("/demo/bank/login");
      } else if (
        isLoggedIn &&
        (pathname === "/demo/bank/login" || pathname === "/demo/bank")
      ) {
        router.push("/demo/bank/dashboard");
      }
    }
  }, [isReady, isLoggedIn, pathname, router]);

  /* Loading */
  if (!isReady) {
    return (
      <div
        className="bank-loading"
        data-testid="demo-bank-layout"
        data-section="demo-bank"
      >
        Loading secure banking portal…
      </div>
    );
  }

  /* Login page — no shell */
  if (pathname === "/demo/bank/login") {
    return (
      <div data-testid="demo-bank-layout" data-section="demo-bank">
        {children}
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/demo/bank/login");
  };

  /* Avatar initials from username */
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div
      className="bank-page"
      data-testid="demo-bank-layout"
      data-section="demo-bank"
    >
      {/* ── Top Bar ───────────────────────────────────────────── */}
      <header className="bank-topbar" data-testid="bank-topbar">
        <a
          href="/demo/bank/dashboard"
          className="bank-topbar-brand"
          data-testid="bank-brand-link"
        >
          <div className="bank-topbar-brand-icon" aria-hidden="true">
            <IconBank />
          </div>
          <span className="bank-topbar-brand-name">SecureBank</span>
        </a>

        <div className="bank-topbar-right">
          <div className="bank-topbar-user" data-testid="bank-topbar-user">
            <div className="bank-topbar-avatar" aria-hidden="true">
              {initials}
            </div>
            <span>{user?.username ?? "User"}</span>
          </div>
          <button
            type="button"
            className="bank-topbar-logout"
            onClick={handleLogout}
            data-testid="header-logout-btn"
            aria-label="Logout"
          >
            <IconLogout />
            Logout
          </button>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="bank-body">
        {/* Left Sidebar */}
        <aside
          className="bank-sidebar"
          data-testid="bank-sidebar"
          role="navigation"
          aria-label="Main navigation"
        >
          <span className="bank-sidebar-section-label">Main</span>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={["bank-nav-item", pathname === item.href && item.href !== "/demo/bank/dashboard" ? "active" : pathname === "/demo/bank/dashboard" && item.label === "Dashboard" ? "active" : ""].filter(Boolean).join(" ")}
              data-testid={item.testid}
              data-nav={item.label.toLowerCase()}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <span className="bank-sidebar-section-label">Account</span>

          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bank-nav-item"
              data-testid={item.testid}
              data-nav={item.label.toLowerCase()}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="bank-sidebar-spacer" />

          <button
            type="button"
            className="bank-nav-item bank-nav-item-danger"
            onClick={handleLogout}
            data-testid="sidebar-logout-btn"
            data-nav="logout"
          >
            <IconLogout />
            <span>Logout</span>
          </button>
        </aside>

        {/* Main content */}
        <main className="bank-main" data-testid="bank-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
