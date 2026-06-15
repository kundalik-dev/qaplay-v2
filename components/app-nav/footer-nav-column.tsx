import Link from "next/link";

import type { FooterNavColumn } from "@/data/footer-data";

interface FooterNavColumnProps {
  column: FooterNavColumn;
}

export function FooterNavColumn({ column }: FooterNavColumnProps) {
  return (
    <div>
      <span className="footer-col-title">{column.title}</span>

      <ul className="footer-link-list">
        {column.links.map((link) => {
          const externalProps = link.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="footer-nav-link"
                {...externalProps}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
