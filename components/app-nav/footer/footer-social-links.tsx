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
    <ul aria-label="Social links" className={styles.socialRow}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
          >
            <SocialIcon icon={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
