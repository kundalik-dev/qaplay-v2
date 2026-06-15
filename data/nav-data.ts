// ─────────────────────────────────────────────────────────────────
// Navbar data — single source of truth for all nav content.
// ─────────────────────────────────────────────────────────────────

export interface NavBrand {
  name: string;
  badge: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export const navBrand: NavBrand = {
  name: "QA Playground",
  badge: "\u26a1",
  href: "/",
};

export const navLinks: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Practice", href: "/#practice" },
  { label: "AI Interview", href: "/#interview" },
  { label: "Jobs", href: "/#jobs" },
  { label: "Career Path", href: "/#career" },
  { label: "Reviews", href: "/#testimonials" },
];

export const navCta: NavCta = {
  label: "Start Practicing \u2192",
  href: "/practice",
};
