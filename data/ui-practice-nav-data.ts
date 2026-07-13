/**
 * UI Practice sidebar navigation — single source of truth.
 *
 * Consumed by app/(demo)/ui-practice/_components/ui-practice-sidebar.tsx.
 * Add a new entry here whenever a new section is scaffolded under
 * app/(demo)/ui-practice/<slug>.
 */

import type { LucideIcon } from "lucide-react";
import {
  Table,
  Frame,
  MessageSquare,
  Highlighter,
  CheckSquare,
  AppWindow,
  ChevronDown,
} from "lucide-react";

export interface UiPracticeNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** data-testid applied to the nav link */
  testId: string;
  /** Short blurb shown on the /ui-practice overview card grid */
  description: string;
}

export const uiPracticeNavItems: UiPracticeNavItem[] = [
  {
    label: "Tables",
    href: "/ui-practice/tables",
    icon: Table,
    testId: "ui-practice-nav-tables",
    description: "Sortable, paginated, and dynamic data tables.",
  },
  {
    label: "Iframes",
    href: "/ui-practice/iframes",
    icon: Frame,
    testId: "ui-practice-nav-iframes",
    description: "Nested documents and cross-frame element access.",
  },
  {
    label: "Dialog",
    href: "/ui-practice/dialog",
    icon: MessageSquare,
    testId: "ui-practice-nav-dialog",
    description: "Modals, alerts, and confirmation dialogs.",
  },
  {
    label: "Annotations",
    href: "/ui-practice/annotations",
    icon: Highlighter,
    testId: "ui-practice-nav-annotations",
    description: "Tooltips, popovers, and inline highlight markers.",
  },
  {
    label: "Checkbox",
    href: "/ui-practice/checkbox",
    icon: CheckSquare,
    testId: "ui-practice-nav-checkbox",
    description: "Single, grouped, and indeterminate checkbox states.",
  },
  {
    label: "Tabs & Windows",
    href: "/ui-practice/tabs-windows",
    icon: AppWindow,
    testId: "ui-practice-nav-tabs-windows",
    description: "Tab switching, new windows, and multi-tab handling.",
  },
  {
    label: "Dropdowns",
    href: "/ui-practice/dropdowns",
    icon: ChevronDown,
    testId: "ui-practice-nav-dropdowns",
    description: "Native selects and custom dropdown menus.",
  },
];
