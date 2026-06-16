import {
  footerBottomBar,
  footerBrand,
  footerNavColumns,
  footerSocialLinks,
} from "@/data/footer-data";

import { FooterBottomBar } from "./footer-bottom-bar";
import { FooterLogo } from "./footer-logo";
import { FooterNavColumn } from "./footer-nav-column";
import { FooterSocialLinks } from "./footer-social-links";
import styles from "./footer.module.css";

export function AppFooter() {
  return (
    <footer role="contentinfo" className={styles.shell}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <FooterLogo brand={footerBrand} />
            <p className={styles.brandDesc}>{footerBrand.description}</p>
            <FooterSocialLinks links={footerSocialLinks} />
          </div>

          {footerNavColumns.map((column) => (
            <FooterNavColumn key={column.title} column={column} />
          ))}
        </div>

        <FooterBottomBar data={footerBottomBar} />
      </div>
    </footer>
  );
}
