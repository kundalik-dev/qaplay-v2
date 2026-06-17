import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

// Moved to /admin/site-alerts — only accessible to ADMIN users via Better-Auth.
export default function OldSiteAlertsPage() {
  redirect("/admin/site-alerts");
}
