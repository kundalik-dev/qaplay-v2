import type { FooterSocialLink } from "@/data/footer-data";

import {
  YoutubeIcon,
  GithubIcon,
  XTwitterIcon,
  TelegramIcon,
} from "./footer-social-icon";

interface FooterSocialLinksProps {
  links: FooterSocialLink[];
}

function SocialIcon({ icon }: { icon: FooterSocialLink["icon"] }) {
  switch (icon) {
    case "youtube":
      return <YoutubeIcon />;
    case "github":
      return <GithubIcon />;
    case "x-twitter":
      return <XTwitterIcon />;
    case "telegram":
      return <TelegramIcon />;
  }
}

export function FooterSocialLinks({ links }: FooterSocialLinksProps) {
  return (
    <div role="list" aria-label="Social links" className="footer-social-row">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          title={link.label}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          className="footer-social-btn"
        >
          <SocialIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
}
