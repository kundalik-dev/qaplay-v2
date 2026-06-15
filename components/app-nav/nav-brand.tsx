import Link from "next/link"

import type { NavBrand } from "@/data/nav-data"

interface NavBrandProps {
  brand: NavBrand
}

export function NavBrand({ brand }: NavBrandProps) {
  return (
    <Link href={brand.href} aria-label={`${brand.name} home`} className="nav-brand">
      <div className="nav-badge" aria-hidden="true">
        {brand.badge}
      </div>
      <span className="nav-name">{brand.name}</span>
    </Link>
  )
}
