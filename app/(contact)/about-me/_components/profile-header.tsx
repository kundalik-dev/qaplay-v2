import Link from "next/link";

import { profile, socialLinks } from "./about-me-data";

export function ProfileHeader() {
  return (
    <header
      data-testid="about-me-header"
      data-section="profile-header"
      className="text-center"
    >
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <nav
        aria-label="Social links"
        data-testid="about-me-social-links"
        className="mt-4 flex justify-center gap-4"
      >
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`about-me-social-${label.toLowerCase()}`}
            className="flex h-10 w-10 transform items-center justify-center transition-transform duration-300 hover:scale-110 hover:text-primary"
            title={label}
          >
            <Icon aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
