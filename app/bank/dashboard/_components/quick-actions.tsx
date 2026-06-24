import Link from "next/link";
import { ArrowLeftRight, Send, Receipt } from "lucide-react";


interface QuickActionsProps {
  isFrozen: boolean;
}

const ACTIONS = [
  {
    label: "Transfer Money",
    href: "/bank/transfer",
    icon: ArrowLeftRight,
    testid: "quick-action-transfer",
    description: "Move funds between your accounts",
  },
  {
    label: "Send Money",
    href: "/bank/send-money",
    icon: Send,
    testid: "quick-action-send-money",
    description: "Pay someone externally",
  },
  {
    label: "Pay a Bill",
    href: "/bank/bill-pay",
    icon: Receipt,
    testid: "quick-action-bill-pay",
    description: "Pay utilities and services",
  },
];

export function QuickActions({ isFrozen }: QuickActionsProps) {
  return (
    <section data-testid="quick-actions-section" aria-label="Quick actions">
      <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
        Quick Actions
      </h2>

      {isFrozen && (
        /*
         * Medium locator: frozen warning inside section
         * Practice: page.getByTestId('quick-actions-section').getByRole('alert')
         */
        <div
          className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          role="alert"
          data-testid="quick-actions-frozen-notice"
        >
          Actions disabled — your account is frozen. Contact support to
          unfreeze.
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          if (isFrozen) {
            /*
             * Challenge locator: disabled buttons — no href, tooltip via aria-describedby
             * Practice:
             *   page.getByTestId('quick-action-transfer').getAttribute('aria-disabled')
             *   //button[@data-testid="quick-action-transfer" and @aria-disabled="true"]
             */
            return (
              <button
                key={action.label}
                type="button"
                disabled
                aria-disabled="true"
                aria-describedby="quick-actions-frozen-notice"
                data-testid={action.testid}
                className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-50 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </button>
            );
          }

          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/20"
              data-testid={action.testid}
              data-action={action.label.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {action.label}
                </p>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
