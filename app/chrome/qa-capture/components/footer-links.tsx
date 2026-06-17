import Link from "next/link";

import type { ChromeLinkItem } from "@/data/chrome/types";

export function FooterLinks({ links }: { links: ChromeLinkItem[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      {links.map((link, index) => (
        <div key={link.href} className="contents">
          <Link
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {index === 0 ? `← ${link.label}` : link.label}
          </Link>
          {index < links.length - 1 ? (
            <span className="text-border">|</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
