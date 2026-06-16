import type { FooterBottomBar as FooterBottomBarType } from "@/data/footer-data";

import styles from "./footer.module.css";

interface FooterBottomBarProps {
  data: FooterBottomBarType;
}

export function FooterBottomBar({ data }: FooterBottomBarProps) {
  return (
    <div className={styles.bottom}>
      <span>
        &copy; {data.year} QA Playground. Built by{" "}
        <a href={data.authorHref} target="_blank" rel="noopener noreferrer">
          {data.authorName}
        </a>{" "}
        - {data.location}
      </span>
      <span>{data.rights}</span>
    </div>
  );
}
