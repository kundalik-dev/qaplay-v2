import type { ReactNode } from "react";

/**
 * Layout for the contact / legal route group (about-us, contact-us,
 * privacy-policy, site-alerts).
 *
 * The site navbar is fixed (~112px tall, see `section[id]` scroll-margin in
 * globals.css), so the top padding clears it to keep page headings from
 * sliding under the navbar.
 */
export default function ContactGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-0 lg:pt-32">
      {children}
    </div>
  );
}
