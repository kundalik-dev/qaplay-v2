# Sitemap Comparison Analysis

This document provides a detailed comparison between `old-qaplayground.xml` and `new-qaplayground.xml`. It highlights the URLs that are missing from the new sitemap, new URLs that have been added, and provides a mapping for permanent (301) redirects from old URLs to their new equivalents.

## 1. Domain Standardization

- **Old Sitemap Domain:** `https://www.qaplayground.com`
- **New Sitemap Domain:** `https://qaplayground.com`

_All redirects below assume traffic from `www.qaplayground.com` is automatically being directed to the non-www version `qaplayground.com` as a global rule._

## 2. Missing URLs (Present in Old, Missing in New) & Redirect Mapping

The following table lists the URLs that were present in the old sitemap but are no longer in the new one, along with recommended 301 Permanent Redirect targets to preserve SEO and user experience.

| Old URL Path                            | Recommended Redirect Path (New) | Rationale                                                               |
| :-------------------------------------- | :------------------------------ | :---------------------------------------------------------------------- |
| `/bank`                                 | `/demo/bank`                    | The bank practice app has been moved under `/demo`.                     |
| `/bank/dashboard`                       | `/demo/bank`                    | Consolidated into the main bank demo.                                   |
| `/bank/accounts`                        | `/demo/bank`                    | Consolidated into the main bank demo.                                   |
| `/bank/transactions`                    | `/demo/bank`                    | Consolidated into the main bank demo.                                   |
| `/practice/frame`                       | `/practice/iframes`             | Name updated to match the new route.                                    |
| `/practice/elements`                    | `/practice`                     | Broad category, safest to redirect to main practice page.               |
| `/practice/pom`                         | `/practice`                     | Specific practice removed, redirect to main practice page.              |
| `/raise-issue`                          | `/contact-us`                   | Consolidate support requests to the contact page.                       |
| `/qa-tools/json-to-file`                | `/qa-tools`                     | Specific tool removed, redirect to main tools directory.                |
| `/qa-tools/markdown-html-convertor`     | `/qa-tools`                     | Specific tool removed, redirect to main tools directory.                |
| `/study-tracker/interview-practice`     | `/interview-questions`          | Content appears to have moved to the new root interview questions page. |
| `/study-tracker`                        | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/study-tracker/dashboard`              | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/study-tracker/daily-tracker`          | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/study-tracker/ai-syllabus-prompt`     | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/study-tracker/resources`              | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/study-tracker/syllabus`               | `/`                             | Study tracker feature removed, redirect to home.                        |
| `/help/telegram-setup`                  | `/contact-us`                   | Help section removed, redirect to contact or home.                      |
| `/help/telegram-setup/chrome-extension` | `/contact-us`                   | Help section removed, redirect to contact or home.                      |
| `/admin/site-alerts`                    | `/`                             | Admin routes should not be indexed, redirect to home.                   |
| `/site-alerts`                          | `/`                             | General site alerts removed, redirect to home.                          |
| `/signup`                               | `/`                             | Authentication removed from new app, redirect to home.                  |
| `/forgot-password`                      | `/`                             | Authentication removed from new app, redirect to home.                  |
| `/reset-password`                       | `/`                             | Authentication removed from new app, redirect to home.                  |
| `/robots.txt`                           | N/A                             | Standard file, no redirect needed.                                      |
| `/sitemap.xml`                          | N/A                             | Standard file, no redirect needed.                                      |
| `/ads.txt`                              | N/A                             | Standard file, no redirect needed.                                      |

## 3. New URLs (Added in New Sitemap)

These pages are entirely new in the new application and should be monitored for indexing in Google Search Console:

- `/demo`
- `/demo/bank`
- `/demo/shopping`
- `/demo/github-user-search`
- `/chrome`
- `/practice/drag-drop`
- `/practice/iframes`
- `/practice/shadow-dom`
- `/practice/modals`
- `/practice/infinite-scroll`
- `/practice/annotations`
- `/qa-tools/uuid-generator`
- `/interview-questions`
- `/blog/getting-started-with-playwright-locators`
- `/blog/playwright-cli-with-ai-guide`

## 4. Matched URLs (No Action Needed)

These pages exist in both sitemaps and are perfectly mapped. _(Note that the domain was updated to remove `www`)_.

- `/`
- `/practice`
- `/practice/input-fields`
- `/practice/buttons`
- `/practice/forms`
- `/practice/dropdowns`
- `/practice/data-table`
- `/practice/alerts-dialogs`
- `/practice/radio-checkbox`
- `/practice/date-picker`
- `/practice/links`
- `/practice/tabs-windows`
- `/practice/dynamic-waits`
- `/practice/multi-select`
- `/practice/file-upload`
- `/blog`
- `/blog/25-real-world-automation-test-cases-for-qa-engineers`
- `/blog/how-to-write-effective-test-cases-with-real-world-examples`
- `/blog/javascript-syllabus-for-qa-engineers`
- `/blog/lessons-i-learn-while-creating-qaplayground`
- `/blog/logical-programs-list-to-crack-coding-interviews`
- `/blog/security-issues-in-login-signup-pages-qaplayground`
- `/blog/top-10-best-automation-practice-website`
- `/blog/top-10-best-chrome-extension-for-automation-tester`
- `/about-me`
- `/about-us`
- `/contact-us`
- `/privacy-policy`
- `/qa-tools`
- `/chrome/qa-capture`
- `/chrome/qa-clipper`

## 5. Next Steps for Implementation

1. **Apply the Redirects**: Add these redirects in your Next.js configuration (`next.config.js`) using the `redirects` key, or configure them on your hosting provider (like Vercel).
2. **Global Domain Redirect (www to non-www)**: Ensure a global 301 redirect is set up from `https://www.qaplayground.com/*` to `https://qaplayground.com/*` to consolidate your domain authority.
3. **Submit New Sitemap**: Submit the new sitemap to Google Search Console to speed up the crawling of the new URLs and dropping of the old ones.
