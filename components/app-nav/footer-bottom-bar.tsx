import type { FooterBottomBar } from "@/data/footer-data";

interface FooterBottomBarProps {
  data: FooterBottomBar;
}

export function FooterBottomBar({ data }: FooterBottomBarProps) {
  return (
    <div className="footer-bottom">
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
