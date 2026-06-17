import { createPageMetadata } from "../create-page-metadata";

/**
 * Metadata for the /practice/buttons page.
 *
 * Title, description, and keywords mirror the live site's SEO so re-deploys
 * stay consistent with existing search rankings.
 */
export const buttonsPageMetadata = createPageMetadata({
  title: "How to Handle Button Clicks in Selenium and Playwright",
  description:
    "Practice button automation — single click, double-click, right-click, disabled state, click-and-hold, coordinates, and computed styles in Selenium, Playwright, and Cypress.",
  path: "/practice/buttons",
  ogType: "article",
  keywords: [
    "button click selenium",
    "double click selenium",
    "right click selenium",
    "click button playwright",
    "playwright dblclick",
    "cypress click button",
    "disabled button automation",
    "click and hold automation",
    "context click selenium actions",
    "button automation practice",
  ],
});
