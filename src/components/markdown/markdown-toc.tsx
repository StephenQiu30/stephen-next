"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createStyles } from "antd-style";
import GithubSlugger from "github-slugger";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  tocContainer: css`
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 120px);
    overflow-y: hidden;
    padding: 0 16px;
    border-left: 1px solid ${token.colorBorderSecondary};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 280px;
    
    &.collapsed {
        border-left: 1px solid transparent;
    }
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-top: 4px;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        .anticon {
            color: ${token.colorPrimary};
        }
    }
  `,
  title: css`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0;
    color: ${token.colorTextSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  toggleBtn: css`
    color: ${token.colorTextTertiary};
    transition: color 0.2s;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  listContainer: css`
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    max-height: 80vh; // Arbitrary max height for transition
    overflow-y: auto;
    
    /* Hide scrollbar for cleaner look */
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${token.colorFillTertiary};
      border-radius: 4px;
    }
    
    &.hidden {
        opacity: 0;
        max-height: 0;
        margin-top: 0;
        overflow: hidden;
    }
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
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
      rootMargin: "-80px 0px -80% 0px",
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
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleToc = () => {
    setIsExpanded(!isExpanded);
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className={cx(styles.tocContainer, !isExpanded && "collapsed", className)}
      aria-label="Table of Contents"
    >
      <div className={styles.header} onClick={toggleToc}>
        <div className={styles.title}>目录</div>
        <Tooltip title={isExpanded ? "收起目录" : "展开目录"} placement="left">
          <div className={styles.toggleBtn}>
            {isExpanded ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
        </Tooltip>
      </div>

      <div className={cx(styles.listContainer, !isExpanded && "hidden")}>
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
                title={item.text}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MarkdownToc;
