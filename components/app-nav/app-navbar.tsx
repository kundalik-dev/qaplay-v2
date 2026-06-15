"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { navBrand, navLinks, navCta } from "@/data/nav-data"

import { NavBrand } from "./nav-brand"
import { NavLinks } from "./nav-links"
import { NavThemeToggle } from "./nav-theme-toggle"

export function AppNavbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMobileOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* ── Fixed navbar ── */}
      <nav
        className={`nav-bar${scrolled ? " nav-bar--scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
        id="nav"
      >
        <div className="nav-pill">

          {/* Brand */}
          <NavBrand brand={navBrand} />

          {/* Desktop links */}
          <NavLinks links={navLinks} />

          {/* Actions */}
          <div className="nav-actions">
            <NavThemeToggle />

            <Link href={navCta.href} className="nav-cta">
              {navCta.label}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className={`nav-hamburger${mobileOpen ? " nav-hamburger--open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        id="nav-mobile"
        className={`nav-mobile${mobileOpen ? " nav-mobile--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        role="dialog"
      >
        <NavLinks links={navLinks} mobile onLinkClick={closeMobile} />

        <div className="nav-mobile-cta">
          <Link href={navCta.href} className="nav-cta" onClick={closeMobile}>
            \u26a1 {navCta.label}
          </Link>
        </div>
      </div>
    </>
  )
}
