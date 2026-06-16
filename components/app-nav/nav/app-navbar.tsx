"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { navBrand, navLinks, navCta, navAuth } from "@/data/nav-data";
import { buttonVariants } from "@/components/ui/button";
import { ButtonContent } from "@/components/ui/button-components";

import { NavBrand } from "./nav-brand";
import { NavLinks } from "./nav-links";
import { NavThemeToggle } from "./nav-theme-toggle";
import styles from "./nav.module.css";

export function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1050) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={cn(styles.nav, scrolled && styles.scrolled)}
        role="navigation"
        aria-label="Main navigation"
        id="nav"
      >
        <div className={styles.inner}>
          <NavBrand brand={navBrand} />
          <NavLinks links={navLinks} />

          <div className={styles.actions}>
            <NavThemeToggle />

            <Link
              href={navAuth.href}
              className={cn(
                buttonVariants({ variant: "homeSecondary", size: "home-sm" }),
                styles.cta,
              )}
            >
              {navAuth.label}
            </Link>

            <Link
              href={navCta.href}
              className={cn(
                buttonVariants({ variant: "homePrimary", size: "home-sm" }),
                styles.cta,
              )}
            >
              {navCta.label}
            </Link>

            <button
              type="button"
              className={cn(
                styles.menuButton,
                mobileOpen && styles.menuButtonOpen,
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="nav-mobile"
        className={cn(styles.mobilePanel, mobileOpen && styles.mobilePanelOpen)}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        role="dialog"
      >
        <NavLinks links={navLinks} mobile onLinkClick={closeMobile} />

        <div className={styles.mobileActions}>
          <Link
            href={navAuth.href}
            className={cn(
              buttonVariants({ variant: "homeSecondary", size: "home" }),
              styles.mobileCta,
            )}
            onClick={closeMobile}
          >
            {navAuth.label}
          </Link>

          <Link
            href={navCta.href}
            className={cn(
              buttonVariants({ variant: "homePrimary", size: "home" }),
              styles.mobileCta,
            )}
            onClick={closeMobile}
          >
            {navCta.label}
          </Link>

          <div className={styles.mobileThemeRow}>
            <span className={styles.mobileThemeLabel}>Switch theme</span>
            <NavThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
