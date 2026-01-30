"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  markdownContainer: css`
    color: ${token.colorText};
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.7;
    letter-spacing: -0.01em;
    font-weight: 400;
    width: 100%;

    /* Global styles for the markdown content */
    & > *:first-child {
      margin-top: 0;
    }

    & > *:last-child {
      margin-bottom: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${token.colorTextHeading};
      font-weight: 700;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      letter-spacing: -0.015em;
    }

    h1 {
      font-size: 30px;
      line-height: 1.2;
      font-weight: 800;
    }

    h2 {
      font-size: 24px;
      line-height: 1.3;
      font-weight: 700;
      padding-bottom: 0.3em;
      border-bottom: 1px solid ${token.colorBorderSecondary};
    }

    h3 {
      font-size: 20px;
      line-height: 1.4;
      font-weight: 600;
    }

    h4 {
      font-size: 18px;
      line-height: 1.5;
      font-weight: 600;
    }

    p {
      margin-bottom: 1.2em;
    }

    a {
      color: ${token.colorPrimary};
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;

      &:hover {
        color: ${token.colorPrimaryHover};
        border-bottom-color: ${token.colorPrimaryHover};
      }
    }

    ul,
    ol {
      padding-left: 1.6em;
      margin-bottom: 1.2em;
    }

    li {
      margin-bottom: 0.4em;
    }

    blockquote {
      margin: 1.6em 0;
      padding: 0.8em 1.2em;
      border-left: 4px solid ${token.colorPrimary};
      background: ${isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"};
      border-radius: 0 8px 8px 0;
      color: ${token.colorTextSecondary};
      font-style: italic;

      p {
        margin-bottom: 0;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px
        ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.06)"};
      margin: 1.2em 0;
      display: block;
    }

    /* Code blocks */
    pre {
      margin: 1.5em 0;
      padding: 0; // padding handled by code block
      border-radius: 12px;
      overflow: hidden;
      background: ${isDarkMode ? "#1e1e1e" : "#f5f5f7"};
      border: 1px solid ${token.colorBorderSecondary};

      div.mac-window-header {
        padding: 8px 14px;
        background: ${isDarkMode ? "rgba(255,255,255,0.06)" : "#eaeaea"};
        display: flex;
        gap: 6px;
        align-items: center;
        border-bottom: 1px solid ${token.colorBorderSecondary};

        span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .red {
          background: #ff5f56;
        }
        .yellow {
          background: #ffbd2e;
        }
        .green {
          background: #27c93f;
        }
      }

      code {
        display: block;
        padding: 16px;
        overflow-x: auto;
        font-family: "SF Mono", "Menlo", "Monaco", "Courier New", monospace;
        font-size: 13.5px;
        line-height: 1.6;
        background: transparent;
        color: ${isDarkMode ? "#e4e4e4" : "#24292e"};
      }
    }

    /* Inline code */
    :not(pre) > code {
      font-family: "SF Mono", "Menlo", "Monaco", "Courier New", monospace;
      font-size: 0.9em;
      padding: 0.2em 0.4em;
      border-radius: 6px;
      background: ${isDarkMode
        ? "rgba(255,255,255,0.12)"
        : "rgba(27,31,35,0.05)"};
      color: ${isDarkMode ? "#ff9f9f" : "#d12f2f"};
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 1.5em 0;
      font-size: 0.95em;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: 8px;
      overflow: hidden;

      th,
      td {
        padding: 0.75em 1em;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        text-align: left;
      }

      th {
        background: ${isDarkMode ? "rgba(255,255,255,0.04)" : "#fafafa"};
        font-weight: 600;
        border-right: 1px solid ${token.colorBorderSecondary};
        &:last-child {
          border-right: none;
        }
      }

      td {
        border-right: 1px solid ${token.colorBorderSecondary};
        &:last-child {
          border-right: none;
        }
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    hr {
      margin: 2em 0;
      border: 0;
      height: 1px;
      background: ${token.colorBorderSecondary};
    }
  `,
}));

interface MarkdownRenderProps {
  children: string;
  className?: string;
}

const MarkdownRender: React.FC<MarkdownRenderProps> = memo(
  ({ children, className }) => {
    const { styles, cx } = useStyles();

    return (
      <div className={cx(styles.markdownContainer, className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSlug]}
          components={{
            pre: ({ children, ...props }) => (
              <pre {...props}>
                <div className="mac-window-header">
                  <span className="red" />
                  <span className="yellow" />
                  <span className="green" />
                </div>
                {children}
              </pre>
            ),
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
    );
  },
);

export default MarkdownRender;
