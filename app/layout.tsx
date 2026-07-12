import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import Script from "next/script";

import {
  ConditionalSiteChrome,
  ConditionalSiteFooter,
} from "@/components/app-nav/conditional-site-chrome";
import { JsonLd } from "@/components/seo";
import { basicDetails } from "@/data/meta-data/basic-details-data";
import {
  siteOrganizationJsonLd,
  siteWebSiteJsonLd,
} from "@/data/meta-data/site-structured-jsonld-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

// Site-wide defaults. The title template applies to child pages that supply a
// plain string title (e.g. "Practice" -> "Practice | QA Playground"); the home
// page overrides it with an absolute title. Page-specific values come from
// `createPageMetadata` (see data/meta-data).
export const metadata: Metadata = {
  metadataBase: new URL(basicDetails.websiteURL),
  title: {
    default: `${basicDetails.websiteName} - ${basicDetails.tagline}`,
    template: `%s | ${basicDetails.websiteName}`,
  },
  description: basicDetails.websiteDescription,
};

// Inline script injected before page paint to prevent theme FOUC.
// Reads localStorage qap-theme; defaults to light when no preference is stored.
const themeInitScript = `
(function(){
  try{
    var settings = JSON.parse(localStorage.getItem('qap_settings') || '{}');
    var s = settings.theme;
    var d = s === 'dark';
    document.documentElement.classList.toggle('dark', d);

    var f = settings.font;
    if(f) document.documentElement.setAttribute('data-font', f);

    var fz = settings.fontSize;
    if(fz) document.documentElement.style.fontSize = fz + 'px';
  }catch(e){}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://cloud.umami.is"
          crossOrigin="anonymous"
        />
        {/* Theme init must run before first paint to avoid flash. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <JsonLd data={siteOrganizationJsonLd} />
        <JsonLd data={siteWebSiteJsonLd} />
      </head>
      <body suppressHydrationWarning>
        {/* Skip to main content for keyboard and screen reader users. */}
        <a
          href="#main-content"
          data-testid="skip-to-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
        >
          Skip to content
        </a>

        {/* Navbar — hidden on dashboard routes. */}
        <ConditionalSiteChrome />

        {/* Page content; top spacing is handled in global styles. */}
        <main id="main-content">{children}</main>

        {/* Footer — hidden on dashboard routes. */}
        <ConditionalSiteFooter />

        {/* Umami Analytics */}
        <Script
          id="umami-analytics"
          src="https://cloud.umami.is/script.js"
          data-website-id="b5f3d51f-b071-48a6-a70b-2346af1f7625"
          strategy="afterInteractive"
        />

        {/* Google Analytics (GA4) */}
        <Script
          id="google-analytics-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-Z4H9RTYGS4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Z4H9RTYGS4');`}
        </Script>
      </body>
    </html>
  );
}
