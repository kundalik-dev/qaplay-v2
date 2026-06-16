import Link from "next/link";

import type { FooterBrand } from "@/data/footer-data";

import styles from "./footer.module.css";

interface FooterLogoProps {
  brand: FooterBrand;
}

export function FooterLogo({ brand }: FooterLogoProps) {
  return (
    <Link
      href={brand.href}
      aria-label={`${brand.name} home`}
      className={styles.logo}
    >
      <div className={styles.logoBadge} aria-hidden="true">
        {brand.badge}
      </div>
      <span className={styles.logoName}>{brand.name}</span>
    </Link>
  );
}
