import Image from "next/image";
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
      <Image
        src="/logo/logo.svg"
        alt={`${brand.name} logo`}
        width={32}
        height={32}
        className={styles.logoImage}
        aria-hidden="true"
      />
      <span className={styles.logoName}>{brand.name}</span>
    </Link>
  );
}
