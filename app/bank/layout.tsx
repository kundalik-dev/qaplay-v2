"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Send,
  Receipt,
  Bell,
  User,
  LogOut,
  Building2,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useBankAppStore,
  useCurrentUser,
  useUnreadNotificationCount,
} from "./store/useBankAppStore";

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_MAIN = [
  {
    label: "Dashboard",
    href: "/bank/dashboard",
    icon: LayoutDashboard,
    testid: "sidebar-link-dashboard",
    nav: "dashboard",
  },
  {
    label: "Accounts",
    href: "/bank/accounts",
    icon: CreditCard,
    testid: "sidebar-link-accounts",
    nav: "accounts",
  },
  {
    label: "Transfer",
    href: "/bank/transfer",
    icon: ArrowLeftRight,
    testid: "sidebar-link-transfer",
    nav: "transfer",
  },
  {
    label: "Send Money",
    href: "/bank/send-money",
    icon: Send,
    testid: "sidebar-link-send-money",
    nav: "send-money",
  },
  {
    label: "Bill Pay",
    href: "/bank/bill-pay",
    icon: Receipt,
    testid: "sidebar-link-bill-pay",
    nav: "bill-pay",
  },
];

const NAV_ACCOUNT = [
  {
    label: "Notifications",
    href: "/bank/notifications",
    icon: Bell,
    testid: "sidebar-link-notifications",
    nav: "notifications",
  },
  {
    label: "Profile",
    href: "/bank/profile",
    icon: User,
    testid: "sidebar-link-profile",
    nav: "profile",
  },
];

// Pages that render without the bank shell
const SHELL_LESS_PATHS = ["/bank/login", "/bank/forgot-password"];

// ─── Sidebar component ────────────────────────────────────────────────────────

function BankSidebar({
  pathname,
  username,
  unreadCount,
  onLogout,
  onClose,
}: {
  pathname: string;
  username: string;
  unreadCount: number;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <aside
      className="flex h-full w-56 flex-col bg-slate-900 px-3 py-4"
      data-testid="bank-sidebar"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="mb-6 flex items-center gap-2 px-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600"
          aria-hidden="true"
        >
          <Building2 className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold text-white">SecureBank</span>
        {onClose && (
          <button
            type="button"
            className="ml-auto text-slate-400 hover:text-white"
            onClick={onClose}
            aria-label="Close navigation menu"
            data-testid="mobile-menu-close-btn"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main nav */}
      <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        Main
      </p>
      <nav className="flex flex-col gap-0.5" data-testid="sidebar-main-nav">
        {NAV_MAIN.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-violet-600 font-medium text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              ].join(" ")}
              data-testid={item.testid}
              data-nav={item.nav}
              onClick={onClose}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-3 bg-slate-800" />

      {/* Account nav */}
      <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        Account
      </p>
      <nav className="flex flex-col gap-0.5" data-testid="sidebar-account-nav">
        {NAV_ACCOUNT.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          const isNotifications = item.nav === "notifications";
          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-violet-600 font-medium text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              ].join(" ")}
              data-testid={item.testid}
              data-nav={item.nav}
              onClick={onClose}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
              {isNotifications && unreadCount > 0 && (
                <Badge
                  className="ml-auto h-4 min-w-[1rem] rounded-full bg-violet-500 px-1 text-[10px] text-white"
                  data-testid="sidebar-notification-badge"
                  aria-label={`${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
                >
                  {unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto" />

      {/* User + logout */}
      <Separator className="mb-3 bg-slate-800" />
      <div
        className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5"
        data-testid="sidebar-user-info"
      >
        {/*
         * Challenge locator: avatar div — no data-testid, no role
         * XPath: //div[@data-testid="sidebar-user-info"]//div[contains(@class,"rounded-full")]
         */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-700 text-[11px] font-bold text-white"
          aria-hidden="true"
        >
          {username.slice(0, 2).toUpperCase()}
        </div>
        <span className="truncate text-xs text-slate-300">{username}</span>
      </div>

      <button
        type="button"
        className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm text-slate-400 transition-colors hover:bg-red-900/40 hover:text-red-400"
        onClick={onLogout}
        data-testid="sidebar-logout-btn"
        data-nav="logout"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Logout</span>
      </button>
    </aside>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function BankLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUsername, logout, seedIfNeeded } = useBankAppStore();
  const currentUser = useCurrentUser();
  const unreadCount = useUnreadNotificationCount(currentUsername);
  const [isReady, setIsReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Seed data once on mount
  useEffect(() => {
    seedIfNeeded();
    setIsReady(true);
  }, [seedIfNeeded]);

  // Auth guard
  useEffect(() => {
    if (!isReady) return;
    const isShellLess = SHELL_LESS_PATHS.some((p) => pathname.startsWith(p));
    if (!currentUsername && !isShellLess) {
      router.push("/bank/login");
    } else if (currentUsername && isShellLess) {
      router.push("/bank/dashboard");
    }
  }, [isReady, currentUsername, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/bank/login");
  };

  // Loading skeleton
  if (!isReady) {
    return (
      <div
        className="flex min-h-screen animate-pulse flex-col bg-slate-50"
        data-testid="bank-loading-skeleton"
        aria-busy="true"
        aria-label="Loading SecureBank"
      >
        <div className="h-14 w-full bg-slate-200" />
        <div className="flex flex-1">
          <div className="hidden w-56 bg-slate-300 md:block" />
          <div className="flex-1 p-6">
            <div className="mb-4 h-6 w-48 rounded bg-slate-200" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 rounded-xl bg-slate-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shell-less pages (login, forgot-password)
  const isShellLess = SHELL_LESS_PATHS.some((p) => pathname.startsWith(p));
  if (isShellLess) {
    return (
      <div data-testid="bank-auth-shell" data-section="bank-app">
        {children}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950"
      data-testid="bank-app-shell"
      data-section="bank-app"
    >
      {/* ── Top Bar ────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 flex h-14 items-center border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900"
        data-testid="bank-topbar"
      >
        {/* Mobile hamburger */}
        <button
          type="button"
          className="mr-3 text-slate-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          data-testid="mobile-menu-btn"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand */}
        <Link
          href="/bank/dashboard"
          className="flex items-center gap-2"
          data-testid="bank-brand-link"
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600"
            aria-hidden="true"
          >
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-sm font-bold text-slate-900 sm:inline dark:text-white">
            SecureBank
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {/* Notification bell */}
          <Link
            href="/bank/notifications"
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            data-testid="nav-notifications-link"
            aria-label={
              unreadCount > 0
                ? `Notifications — ${unreadCount} unread`
                : "Notifications"
            }
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white"
                data-testid="topbar-notification-badge"
                aria-hidden="true"
              >
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User chip */}
          <Link
            href="/bank/profile"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            data-testid="nav-user-menu"
          >
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white"
              aria-hidden="true"
            >
              {(currentUsername ?? "U").slice(0, 2).toUpperCase()}
            </div>
            <span className="hidden text-xs sm:inline">{currentUsername}</span>
          </Link>

          {/* Topbar logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            data-testid="topbar-logout-btn"
            aria-label="Logout"
            className="hidden text-slate-500 sm:flex"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="ml-1 text-xs">Logout</span>
          </Button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <BankSidebar
            pathname={pathname}
            username={currentUsername ?? ""}
            unreadCount={unreadCount}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 flex"
            data-testid="mobile-menu-overlay"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-50 flex h-full">
              <BankSidebar
                pathname={pathname}
                username={currentUsername ?? ""}
                unreadCount={unreadCount}
                onLogout={handleLogout}
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          className="flex-1 overflow-auto p-4 md:p-6"
          data-testid="bank-main-content"
        >
          {/* Frozen banner */}
          {currentUser?.status === "frozen" && (
            <div
              className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
              role="alert"
              data-testid="frozen-account-banner"
            >
              <span className="font-semibold">Account Frozen:</span>
              <span>
                Money movement actions are disabled while your account is
                frozen. Please contact support.
              </span>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
