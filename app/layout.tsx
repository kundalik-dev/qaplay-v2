import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import { AppFooter, AppNavbar } from "@/components/app-nav";
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

export const metadata: Metadata = {
  title: "QA Playground — Master Automation Testing",
  description:
    "Practice Selenium, Playwright & Cypress on real UI elements, rehearse with AI mock interviews, and track every job application. Free for QA engineers.",
};

// Inline script injected before page paint to prevent theme FOUC.
// Reads localStorage qap-theme, falls back to OS preference, defaults dark.
const themeInitScript = `
(function(){
  try{
    var s=localStorage.getItem('qap-theme');
    var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark',d);
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme init — must run before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        {/* Fixed navbar sits above all page content */}
        <AppNavbar />

        {/* Page content — padding-top handled by CSS */}
        <main>{children}</main>

        {/* Footer at the very bottom */}
        <AppFooter />
      </body>
    </html>
  );
}
