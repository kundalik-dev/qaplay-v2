import Image from "next/image";
import Link from "next/link";

import type { NavBrand as NavBrandType } from "@/data/nav-data";

import styles from "./nav.module.css";

interface NavBrandProps {
  brand: NavBrandType;
}

export function NavBrand({ brand }: NavBrandProps) {
  return (
    <Link
      href={brand.href}
      aria-label={`${brand.name} home`}
      className={styles.brand}
    >
      <Image
        src="/logo/logo.svg"
        alt={`${brand.name} logo`}
        width={32}
        height={32}
        className={styles.brandLogo}
        aria-hidden="true"
      />
      <span className={styles.name}>{brand.name}</span>
    </Link>
  );
}
