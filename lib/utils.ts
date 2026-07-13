import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Derive initials from a display name, falling back to the email.
 * "John Doe" → "JD", "Alice" → "A", "" → "?"
 */
export function getInitials(name: string, email: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return email.charAt(0).toUpperCase() || "?";
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase();
}
