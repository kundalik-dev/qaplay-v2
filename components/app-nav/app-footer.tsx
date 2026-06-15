import {
  footerBrand,
  footerSocialLinks,
  footerNavColumns,
  footerBottomBar,
} from "@/data/footer-data";

import { FooterLogo } from "./footer-logo";
import { FooterSocialLinks } from "./footer-social-links";
import { FooterNavColumn } from "./footer-nav-column";
import { FooterBottomBar } from "./footer-bottom-bar";

export function AppFooter() {
  return (
    <footer role="contentinfo" className="footer-shell">
      <div className="footer-inner">
        {/* ── Top grid: 2fr brand + 3 × 1fr nav columns ── */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand-col">
            <FooterLogo brand={footerBrand} />
            <p className="footer-brand-desc">{footerBrand.description}</p>
            <FooterSocialLinks links={footerSocialLinks} />
          </div>

          {/* Nav columns — Platform, Learn, Company */}
          {footerNavColumns.map((column) => (
            <FooterNavColumn key={column.title} column={column} />
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <FooterBottomBar data={footerBottomBar} />
      </div>
    </footer>
  );
}
