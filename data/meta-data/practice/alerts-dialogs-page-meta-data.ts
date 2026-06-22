import { createPageMetadata } from "../create-page-metadata";

/**
 * Metadata for the /practice/alerts-dialogs page.
 *
 * Title, description, and keywords mirror the live site's SEO so re-deploys
 * stay consistent with existing search rankings.
 */
export const alertsDialogsPageMetadata = createPageMetadata({
  title: "How to Handle Alerts and Dialogs in Selenium and Playwright",
  description:
    "Practice dialog automation — open, close, confirm, cancel, backdrop dismiss, Escape key, and scoped dialog locators in Selenium, Playwright, and Cypress.",
  path: "/practice/alerts-dialogs",
  ogType: "article",
  keywords: [
    "alert dialog selenium",
    "modal dialog playwright",
    "dialog automation",
    "close modal playwright",
    "escape key dialog",
    "backdrop click selenium",
    "dialog automation practice",
    "cypress dialog",
    "getByRole dialog",
    "aria-label button automation",
    "confirm dialog automation",
    "dismiss dialog selenium",
  ],
});
