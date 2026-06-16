import Link from "next/link";

import type { FooterNavColumn as FooterNavColumnType } from "@/data/footer-data";

import styles from "./footer.module.css";

interface FooterNavColumnProps {
  column: FooterNavColumnType;
}

export function FooterNavColumn({ column }: FooterNavColumnProps) {
  return (
    <div>
      <span className={styles.colTitle}>{column.title}</span>

      <ul className={styles.linkList}>
        {column.links.map((link) => {
          const externalProps = link.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink} {...externalProps}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
