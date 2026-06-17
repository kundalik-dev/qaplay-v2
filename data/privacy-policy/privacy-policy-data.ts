import { basicDetails } from "@/data/meta-data/basic-details-data";

/**
 * Content for the Privacy Policy page.
 *
 * The legal copy lives here as structured, rich-text data so the route
 * components stay purely presentational. A paragraph or list item can be a
 * plain string (no inline formatting) or an array of `RichSegment`s when it
 * needs bold text, inline code, or links.
 */

export type RichSegment = {
  text: string;
  bold?: boolean;
  code?: boolean;
  /** When set, the segment renders as a link. */
  href?: string;
  /** External links open in a new tab with safe rel attributes. */
  external?: boolean;
};

/** A run of text that may mix plain strings and formatted segments. */
export type RichText = string | RichSegment[];

export type PrivacyBlock =
  | { type: "paragraph"; content: RichText }
  | { type: "subheading"; text: string }
  | { type: "list"; items: RichText[] };

export type PrivacySection = {
  /** Stable id used for the section anchor, `data-section`, and headings. */
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

export const privacyPolicyHeader = {
  title: "Privacy Policy",
  effectiveDate: "6 June 2026",
  lastUpdated: "6 June 2026",
  intro: [
    { text: "Welcome to " },
    { text: basicDetails.websiteName, bold: true },
    {
      text: " (“we”, “us”, “our”, or “the Platform”), accessible at ",
    },
    {
      text: basicDetails.websiteURL,
      href: basicDetails.websiteURL,
      external: true,
    },
    {
      text: ". This Privacy Policy explains what personal information we collect, how we use it, and your rights regarding that information. By using the Platform, you agree to the practices described in this policy.",
    },
  ] satisfies RichText,
} as const;

export const privacyPolicySections: PrivacySection[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    blocks: [
      { type: "subheading", text: "a. Information You Provide Directly" },
      {
        type: "list",
        items: [
          [
            { text: "Account registration: ", bold: true },
            { text: "Name and email address when you create an account." },
          ],
          [
            { text: "Contact enquiries: ", bold: true },
            {
              text: "Name, email address, and message content when you contact us via the contact form or email.",
            },
          ],
          [
            { text: "Study Tracker & Resources: ", bold: true },
            {
              text: "Learning progress data, syllabus preferences, and saved resources you choose to store in the Platform.",
            },
          ],
        ],
      },
      { type: "subheading", text: "b. Information Collected Automatically" },
      {
        type: "list",
        items: [
          [
            { text: "Log data: ", bold: true },
            {
              text: "IP address, browser type and version, operating system, referring URL, pages visited, and time/date of your visit.",
            },
          ],
          [
            { text: "Device information: ", bold: true },
            {
              text: "Device type, screen resolution, and language preferences.",
            },
          ],
          [
            { text: "Cookies and similar technologies: ", bold: true },
            { text: "As described in detail in Section 3 below." },
          ],
          [
            { text: "Usage data: ", bold: true },
            {
              text: "Interactions with practice elements, features used, and session duration, collected via Google Analytics.",
            },
          ],
        ],
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "2. How We Use Your Information",
    blocks: [
      {
        type: "list",
        items: [
          "To create and manage your account and authenticate your sessions.",
          "To provide, operate, and improve the Platform and its features.",
          "To respond to your enquiries and support requests.",
          "To analyse usage patterns and improve user experience via Google Analytics.",
          "To display relevant advertisements through Google AdSense.",
          "To send you important service-related communications (not marketing, unless you opt in).",
          "To protect our legal rights and comply with applicable laws.",
          "To detect and prevent fraudulent or abusive use of the Platform.",
        ],
      },
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "3. Cookies and Tracking Technologies",
    blocks: [
      {
        type: "paragraph",
        content:
          "We use cookies and similar tracking technologies to enhance your experience, analyse traffic, and serve advertisements. Cookies are small text files stored on your device by your browser.",
      },
      { type: "subheading", text: "Types of Cookies We Use" },
      {
        type: "list",
        items: [
          [
            { text: "Strictly Necessary Cookies: ", bold: true },
            {
              text: "Required for the Platform to function (e.g., session authentication via Better-Auth). These cannot be disabled.",
            },
          ],
          [
            { text: "Functional / Preference Cookies: ", bold: true },
            {
              text: "Store your preferences such as dark/light mode and Study Tracker settings (stored in localStorage).",
            },
          ],
          [
            { text: "Analytics Cookies: ", bold: true },
            {
              text: "Used by Google Analytics (see Section 4) to collect anonymous usage data. These help us understand how visitors use the Platform.",
            },
          ],
          [
            { text: "Advertising Cookies: ", bold: true },
            {
              text: "Used by Google AdSense and its partners (including the DoubleClick cookie) to serve personalised advertisements based on your browsing history on this and other websites (see Section 5).",
            },
          ],
        ],
      },
      { type: "subheading", text: "Managing Cookies" },
      {
        type: "paragraph",
        content: [
          {
            text: "You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of certain parts of the Platform. For more information, visit ",
          },
          {
            text: "www.aboutcookies.org",
            href: "https://www.aboutcookies.org",
            external: true,
          },
          { text: "." },
        ],
      },
    ],
  },
  {
    id: "google-analytics",
    title: "4. Google Analytics",
    blocks: [
      {
        type: "paragraph",
        content: [
          { text: "We use " },
          { text: "Google Analytics", bold: true },
          { text: " (tracking ID: " },
          { text: "G-Z4H9RTYGS4", code: true },
          {
            text: ") to analyse how visitors interact with the Platform. Google Analytics collects data such as pages visited, time spent, and general geographic location. This data is aggregated and anonymised — we cannot identify you personally from it.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Google Analytics uses cookies to collect this information. You can opt out of Google Analytics tracking by installing the ",
          },
          {
            text: "Google Analytics Opt-out Browser Add-on",
            href: "https://tools.google.com/dlpage/gaoptout",
            external: true,
          },
          {
            text: ". To learn how Google uses data from sites that use its services, visit ",
          },
          {
            text: "Google's Privacy & Terms",
            href: "https://policies.google.com/technologies/partner-sites",
            external: true,
          },
          { text: "." },
        ],
      },
    ],
  },
  {
    id: "google-adsense",
    title: "5. Google AdSense and Third-Party Advertising",
    blocks: [
      {
        type: "paragraph",
        content: [
          { text: "We use " },
          { text: "Google AdSense", bold: true },
          {
            text: " to display advertisements on the Platform. Google AdSense is an advertising service provided by Google LLC. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website and other websites across the internet.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Google uses the " },
          { text: "DoubleClick cookie", bold: true },
          {
            text: " and other tracking technologies to serve ads based on your interests. These cookies allow Google and its partners to serve personalised ads to you when you visit our Platform and other websites.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "We do not control the cookies placed by Google or its advertising partners.",
          "Google may share data collected via AdSense with other Google services.",
          [
            {
              text: "To learn more about how Google uses information from sites that use its advertising services, visit ",
            },
            {
              text: "Google's Advertising Privacy Policy",
              href: "https://policies.google.com/technologies/ads",
              external: true,
            },
            { text: "." },
          ],
        ],
      },
      { type: "subheading", text: "Opt Out of Personalised Advertising" },
      {
        type: "paragraph",
        content:
          "You can opt out of personalised advertising served by Google and its partners at any time:",
      },
      {
        type: "list",
        items: [
          [
            { text: "Visit " },
            {
              text: "Google Ad Settings",
              href: "https://www.google.com/settings/ads",
              external: true,
            },
            { text: " to manage your Google advertising preferences." },
          ],
          [
            { text: "Visit " },
            {
              text: "YourAdChoices (aboutads.info)",
              href: "https://www.aboutads.info/choices/",
              external: true,
            },
            {
              text: " to opt out of interest-based advertising from participating companies.",
            },
          ],
          [
            { text: "Visit the " },
            {
              text: "Network Advertising Initiative opt-out page",
              href: "https://www.networkadvertising.org/managing/opt_out.asp",
              external: true,
            },
            { text: "." },
          ],
        ],
      },
      {
        type: "paragraph",
        content:
          "Opting out of personalised ads does not mean you will stop seeing ads — it means the ads you see will be less relevant to your interests.",
      },
    ],
  },
  {
    id: "sharing-your-information",
    title: "6. Sharing Your Information",
    blocks: [
      {
        type: "paragraph",
        content:
          "We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:",
      },
      {
        type: "list",
        items: [
          [
            { text: "Service providers: ", bold: true },
            {
              text: "Third-party vendors that help operate the Platform, such as Vercel (hosting), Neon/Supabase (database hosting), Google Analytics, and Google AdSense. These providers are bound by contractual obligations to keep your information confidential.",
            },
          ],
          [
            { text: "Legal obligations: ", bold: true },
            {
              text: "If required by law, court order, or governmental authority.",
            },
          ],
          [
            { text: "Business transfers: ", bold: true },
            {
              text: "In connection with a merger, acquisition, or sale of all or part of our assets, your information may be transferred as part of that transaction.",
            },
          ],
          [
            { text: "Protection of rights: ", bold: true },
            {
              text: "To enforce our Terms of Service, protect our rights, or prevent fraud or illegal activity.",
            },
          ],
        ],
      },
    ],
  },
  {
    id: "your-rights-and-choices",
    title: "7. Your Rights and Choices",
    blocks: [
      {
        type: "paragraph",
        content:
          "Depending on your location, you may have the following rights regarding your personal data:",
      },
      { type: "subheading", text: "All Users" },
      {
        type: "list",
        items: [
          "Request access to the personal data we hold about you.",
          "Request correction of inaccurate or incomplete data.",
          "Request deletion of your account and associated data.",
          "Opt out of personalised advertising (see Section 5).",
          "Manage cookies through your browser settings.",
        ],
      },
      { type: "subheading", text: "EU / EEA Users (GDPR)" },
      {
        type: "list",
        items: [
          "Right of access (Article 15 GDPR).",
          "Right to rectification (Article 16 GDPR).",
          "Right to erasure / “right to be forgotten” (Article 17 GDPR).",
          "Right to restriction of processing (Article 18 GDPR).",
          "Right to data portability (Article 20 GDPR).",
          "Right to object to processing (Article 21 GDPR).",
          "Right to withdraw consent at any time where processing is based on consent.",
        ],
      },
      { type: "subheading", text: "California Residents (CCPA)" },
      {
        type: "list",
        items: [
          "Right to know what personal information is collected, used, shared, or sold.",
          "Right to delete personal information (with certain exceptions).",
          "Right to opt out of the sale of personal information. (We do not sell personal information.)",
          "Right to non-discrimination for exercising your CCPA rights.",
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "To exercise any of these rights, please contact us at " },
          {
            text: basicDetails.websiteEmail,
            href: `mailto:${basicDetails.websiteEmail}`,
          },
          { text: ". We will respond within 30 days." },
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    blocks: [
      {
        type: "list",
        items: [
          [
            { text: "Account data: ", bold: true },
            {
              text: "Retained for as long as your account is active. You may delete your account at any time by contacting us.",
            },
          ],
          [
            { text: "Session data: ", bold: true },
            {
              text: "Authentication sessions expire after 7 days of inactivity.",
            },
          ],
          [
            { text: "Analytics data: ", bold: true },
            { text: "Google Analytics retains data for 26 months by default." },
          ],
          [
            { text: "Contact enquiries: ", bold: true },
            {
              text: "Retained for up to 12 months to allow us to follow up on your request.",
            },
          ],
          [
            { text: "LocalStorage data: ", bold: true },
            {
              text: "Stored in your browser until you clear your browser data or uninstall the browser.",
            },
          ],
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "9. Data Security",
    blocks: [
      {
        type: "paragraph",
        content:
          "We implement reasonable technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted database connections, secure HTTPS transmission, and session-based authentication via Better-Auth.",
      },
      {
        type: "paragraph",
        content:
          "However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "10. Third-Party Links",
    blocks: [
      {
        type: "paragraph",
        content:
          "The Platform may contain links to external websites (e.g., blog references, tutorial resources, GitHub). We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party site you visit.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "11. Children's Privacy",
    blocks: [
      {
        type: "paragraph",
        content: [
          {
            text: "The Platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal data, please contact us immediately at ",
          },
          {
            text: basicDetails.websiteEmail,
            href: `mailto:${basicDetails.websiteEmail}`,
          },
          {
            text: " so we can take appropriate action, including deleting the information.",
          },
        ],
      },
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "12. Changes to This Policy",
    blocks: [
      {
        type: "paragraph",
        content:
          "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we do, we will update the “Last Updated” date at the top of this page. We encourage you to review this policy periodically. Your continued use of the Platform after any changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export type PrivacyContactMethod = {
  id: string;
  icon: "mail" | "message" | "globe";
  /** Accent colour key resolved to Tailwind classes in the component. */
  tone: "rose" | "sky" | "emerald";
  label: string;
  /** Plain value display (email / url) — omit when using a CTA line. */
  value?: string;
  /** Inline CTA text (with arrow) — used instead of `value`. */
  cta?: string;
  href: string;
  external?: boolean;
};

export const privacyPolicyContact = {
  id: "contact-us",
  eyebrow: "13. Contact Us",
  title: "Questions about your privacy?",
  description:
    "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, choose the best way to reach us below.",
  methods: [
    {
      id: "email",
      icon: "mail",
      tone: "rose",
      label: "Email",
      value: basicDetails.websiteEmail,
      href: `mailto:${basicDetails.websiteEmail}`,
    },
    {
      id: "contact-page",
      icon: "message",
      tone: "sky",
      label: "Contact page",
      cta: "Send a message",
      href: "/contact-us",
    },
    {
      id: "website",
      icon: "globe",
      tone: "emerald",
      label: "Website",
      value: basicDetails.websiteURL,
      href: basicDetails.websiteURL,
      external: true,
    },
  ] satisfies PrivacyContactMethod[],
} as const;
