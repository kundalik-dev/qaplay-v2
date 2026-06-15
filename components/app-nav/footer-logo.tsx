import Link from "next/link";

import type { FooterBrand } from "@/data/footer-data";

interface FooterLogoProps {
  brand: FooterBrand;
}

export function FooterLogo({ brand }: FooterLogoProps) {
  return (
    <Link
      href={brand.href}
      aria-label={`${brand.name} home`}
      className="footer-logo"
    >
      <div className="footer-logo-badge" aria-hidden="true">
        {brand.badge}
      </div>
      <span className="footer-logo-name">{brand.name}</span>
    </Link>
  );
}
