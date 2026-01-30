"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createStyles } from "antd-style";
import GithubSlugger from "github-slugger";

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  tocContainer: css`
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 16px;
    border-left: 1px solid ${token.colorBorderSecondary};

    /* Hide scrollbar for cleaner look */
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${token.colorFillTertiary};
      border-radius: 4px;
    }
  `,
  title: css`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    color: ${token.colorTextSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  list: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  listItem: css`
    margin-bottom: 8px;

    a {
      display: block;
      color: ${token.colorTextSecondary};
      text-decoration: none;
      font-size: 14px;
      line-height: 1.5;
      transition: all 0.2s;
      position: relative;
      padding-left: 12px;

      &:hover {
        color: ${token.colorPrimary};
      }

      &.active {
        color: ${token.colorPrimary};
        font-weight: 500;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background-color: ${token.colorPrimary};
          border-radius: 2px;
        }
      }
    }
  `,
  indent1: css`
    padding-left: 12px;
  `,
  indent2: css`
    padding-left: 24px;
  `,
  indent3: css`
    padding-left: 36px;
  `,
  indent4: css`
    padding-left: 48px;
  `,
  indent5: css`
    padding-left: 60px;
  `,
}));

interface TocItem {
  text: string;
  depth: number;
  id: string;
}

interface TableOfContentsProps {
  markdown: string;
  className?: string;
}

const MarkdownToc: React.FC<TableOfContentsProps> = ({
  markdown,
  className,
}) => {
  const { styles, cx } = useStyles();
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings and generate IDs
  const headings = useMemo(() => {
    const slugger = new GithubSlugger();
    const regex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];

    let match;
    while ((match = regex.exec(markdown)) !== null) {
      const depth = match[1].length;
      const text = match[2].trim();
      const id = slugger.slug(text);
      items.push({ text, depth, id });
    }

    return items;
  }, [markdown]);

  // Scroll spy
  useEffect(() => {
    if (headings.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px", // Highlight when near top
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className={cx(styles.tocContainer, className)}
      aria-label="Table of Contents"
    >
      <div className={styles.title}>目录</div>
      <ul className={styles.list}>
        {headings.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className={styles.listItem}
            style={{ paddingLeft: (item.depth - 1) * 12 }}
          >
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
              onClick={(e) => handleLinkClick(e, item.id)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MarkdownToc;
