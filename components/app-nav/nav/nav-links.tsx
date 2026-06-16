"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/data/nav-data";

import styles from "./nav.module.css";

interface NavLinksProps {
  links: NavLink[];
  mobile?: boolean;
  onLinkClick?: () => void;
}

export function NavLinks({
  links,
  mobile = false,
  onLinkClick,
}: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace("/#", "/"));
  };

  return (
    <ul className={mobile ? styles.mobileLinks : styles.links} role="list">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              styles.link,
              mobile && styles.mobileLink,
              isActive(link.href) && styles.linkActive,
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
