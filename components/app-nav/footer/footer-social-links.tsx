import type { FooterSocialLink } from "@/data/footer-data";

import {
  GithubIcon,
  TelegramIcon,
  XTwitterIcon,
  YoutubeIcon,
} from "./footer-social-icon";
import styles from "./footer.module.css";

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
    <div role="list" aria-label="Social links" className={styles.socialRow}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          title={link.label}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          className={styles.socialBtn}
        >
          <SocialIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
}
