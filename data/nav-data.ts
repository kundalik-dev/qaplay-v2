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
  { label: "Practice", href: "/practice" },
  { label: "Demo Apps", href: "/demo" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Interview", href: "/interview" },
  { label: "Jobs", href: "/#jobs" },
  { label: "Blogs", href: "/blog" },
];

export const navCta: NavCta = {
  label: "Start Practicing \u2192",
  href: "/practice",
};

export const navAuth: NavCta = {
  label: "Log in / Sign up",
  href: "/auth",
};
