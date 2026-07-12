"use client";

import React from "react";
import {
  Bell,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useBankAppStore, useUserNotifications } from "../store/useBankAppStore";
import { formatRelativeTime } from "../lib/utils";

const TYPE_ICON = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
};
const TYPE_COLORS = {
  info: "text-blue-600 bg-blue-100",
  success: "text-emerald-600 bg-emerald-100",
  warning: "text-amber-600 bg-amber-100",
};

export default function NotificationsPage() {
  const { currentUsername, markNotificationRead, markAllNotificationsRead } =
    useBankAppStore();
  const notifications = useUserNotifications(currentUsername);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div data-testid="notifications-page" data-section="notifications">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-slate-900 dark:text-white"
            data-testid="notifications-page-title"
          >
            Notifications
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {unreadCount > 0 ? (
              <span data-testid="unread-count-text">
                {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
              </span>
            ) : (
              "All caught up"
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllNotificationsRead(currentUsername!)}
            data-testid="mark-all-read-btn"
            className="gap-1.5 text-xs"
          >
            <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center"
          data-testid="no-notifications-state"
        >
          <Bell className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">No notifications yet.</p>
        </div>
      ) : (
        <div
          className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800"
          data-testid="notifications-list"
        >
          {notifications.map((notif, index) => {
            const Icon = TYPE_ICON[notif.type];
            return (
              <React.Fragment key={notif.id}>
                {index > 0 && <Separator />}
                {/*
                 * Medium locator: repeated notification items
                 * data-testid="notification-item" + data-notification-id + data-type
                 * Practice:
                 *   page.getByTestId('notification-item').filter({ hasText: 'Transfer Completed' })
                 *   page.locator('[data-testid="notification-item"][data-notification-id="notif-001"]')
                 *   XPath: //div[@data-notification-id="notif-001"]
                 */}
                <div
                  className={[
                    "flex gap-3 px-4 py-4 transition-colors",
                    !notif.isRead
                      ? "bg-violet-50/40 dark:bg-violet-900/10"
                      : "",
                  ].join(" ")}
                  data-testid="notification-item"
                  data-notification-id={notif.id}
                  data-type={notif.type}
                  data-read={notif.isRead}
                >
                  {/* Type icon — Challenge: no data-testid, use aria-label */}
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TYPE_COLORS[notif.type]}`}
                    aria-label={`${notif.type} notification`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-sm font-semibold text-slate-900 dark:text-white"
                          data-testid="notification-title"
                        >
                          {notif.title}
                        </p>
                        {/*
                         * Hard locator: unread dot — no data-testid
                         * XPath: //div[@data-notification-id="notif-001"]//span[contains(@class,"rounded-full") and contains(@class,"bg-violet")]
                         * Practice: check aria-label="Unread" on the dot
                         */}
                        {!notif.isRead && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-violet-600"
                            aria-label="Unread"
                          />
                        )}
                      </div>

                      {!notif.isRead && (
                        <button
                          type="button"
                          className="shrink-0 text-xs text-violet-600 hover:text-violet-800"
                          onClick={() =>
                            markNotificationRead(currentUsername!, notif.id)
                          }
                          data-testid="mark-read-btn"
                          data-notification-id={notif.id}
                          aria-label={`Mark "${notif.title}" as read`}
                        >
                          Mark read
                        </button>
                      )}
                    </div>

                    <p
                      className="mt-0.5 text-sm text-slate-600 dark:text-slate-400"
                      data-testid="notification-body"
                    >
                      {notif.body}
                    </p>

                    {/*
                     * Hard locator: timestamp — time element, no data-testid
                     * XPath: //div[@data-notification-id="notif-001"]//time
                     */}
                    <time
                      dateTime={notif.timestamp}
                      className="mt-1 block text-xs text-slate-400"
                    >
                      {formatRelativeTime(notif.timestamp)}
                    </time>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
