"use client"

import { useEffect, useState } from "react"

function SunIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function NavThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null)

  // Read initial theme from html class after mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const html = document.documentElement
    const next = !html.classList.contains("dark")
    html.classList.toggle("dark", next)
    try { localStorage.setItem("qap-theme", next ? "dark" : "light") } catch {}
    setIsDark(next)
  }

  // Avoid mismatch on first render
  if (isDark === null) {
    return <div className="nav-theme-toggle" aria-hidden="true" />
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="nav-theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
