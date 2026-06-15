"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavLink } from "@/data/nav-data"

interface NavLinksProps {
  links: NavLink[]
  mobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ links, mobile = false, onLinkClick }: NavLinksProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href.replace("/#", "/"))
  }

  return (
    <ul className={mobile ? undefined : "nav-links"} role="list">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onLinkClick}
            className={`nav-link${isActive(link.href) ? " nav-link--active" : ""}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
