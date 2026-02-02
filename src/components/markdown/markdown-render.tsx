"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { createStyles } from "antd-style";
import { App } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  markdownContainer: css`
    color: ${token.colorText};
    font-family:
      -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial,
      sans-serif;
    font-size: 16px;
    line-height: 1.8;
    letter-spacing: -0.01em;
    font-weight: 400;
    width: 100%;

    /* Typography Improvements */
    h1, h2, h3, h4, h5, h6 {
      color: ${token.colorTextHeading};
      font-weight: 700;
      margin-top: 2em;
      margin-bottom: 0.8em;
      letter-spacing: -0.02em;
    }

    h1 { font-size: 32px; line-height: 1.2; font-weight: 800; margin-top: 1em; }
    h2 { font-size: 24px; line-height: 1.3; border-bottom: 1px solid ${token.colorBorderSecondary}; padding-bottom: 0.3em; }
    h3 { font-size: 20px; font-weight: 600; }
    h4 { font-size: 18px; font-weight: 600; }

    p { margin-bottom: 1.5em; }

    a {
      color: ${token.colorPrimary};
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;
      &:hover {
        border-bottom-color: ${token.colorPrimary};
        opacity: 0.8;
      }
    }

    ul, ol {
      padding-left: 1.5em;
      margin-bottom: 1.5em;
    }
    
    li {
      margin-bottom: 0.5em;
      &::marker {
        color: ${token.colorTextTertiary};
      }
    }

    blockquote {
      margin: 2em 0;
      padding: 1em 1.5em;
      border-left: 4px solid ${token.colorPrimary};
      background: ${isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"};
      border-radius: 4px 12px 12px 4px;
      color: ${token.colorTextSecondary};
      font-style: italic;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 8px 20px ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"};
      margin: 2em auto;
      display: block;
      transition: transform 0.3s;
      
      &:hover {
        transform: scale(1.01);
      }
    }

    /* Code Blocks */
    pre {
      margin: 2em 0;
      padding: 0;
      border-radius: 12px;
      overflow: hidden;
      background: ${isDarkMode ? "#1e1e1e" : "#f5f5f7"};
      border: 1px solid ${token.colorBorderSecondary};
      position: relative;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);

      &:hover .copy-btn {
        opacity: 1;
      }
    }

    .mac-window-header {
      padding: 10px 16px;
      background: ${isDarkMode ? "rgba(255,255,255,0.06)" : "#eaeaea"};
      display: flex;
      gap: 8px;
      align-items: center;
      border-bottom: 1px solid ${token.colorBorderSecondary};

      span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
      }

      .red { background: #ff5f56; }
      .yellow { background: #ffbd2e; }
      .green { background: #27c93f; }
    }

    code {
      font-family: "SF Mono", "Menlo", "Monaco", "Courier New", monospace;
      font-size: 14px;
    }

    pre code {
      display: block;
      padding: 20px;
      overflow-x: auto;
      line-height: 1.6;
      background: transparent;
      color: ${isDarkMode ? "#e4e4e4" : "#24292e"};
    }

    /* Inline Code */
    :not(pre) > code {
      font-size: 0.9em;
      padding: 0.25em 0.5em;
      border-radius: 6px;
      background: ${isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(27,31,35,0.05)"};
      color: ${token.colorPrimary};
      white-space: pre-wrap;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 2em 0;
      font-size: 0.95em;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: 12px;
      overflow: hidden;

      th, td {
        padding: 1em;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        text-align: left;
      }

      th {
        background: ${isDarkMode ? "rgba(255,255,255,0.04)" : "#fafafa"};
        font-weight: 600;
        color: ${token.colorTextHeading};
      }
      
      tr:last-child td {
        border-bottom: none;
      }
    }
    
    .copy-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      opacity: 0;
      transition: opacity 0.2s;
      background: ${token.colorFillTertiary};
      border: none;
      border-radius: 6px;
      padding: 4px 8px;
      cursor: pointer;
      color: ${token.colorTextSecondary};
      
      &:hover {
        background: ${token.colorFillSecondary};
        color: ${token.colorText};
      }
    }
    /* Syntax Highlighting */
    .hljs-comment,
    .hljs-quote {
      color: ${isDarkMode ? "#8b9eb5" : "#6a737d"};
      font-style: italic;
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-formula {
      color: ${isDarkMode ? "#ff7b72" : "#d73a49"};
    }

    .hljs-section,
    .hljs-name,
    .hljs-selector-tag,
    .hljs-deletion,
    .hljs-subst {
      color: ${isDarkMode ? "#79c0ff" : "#22863a"};
    }

    .hljs-literal {
      color: ${isDarkMode ? "#79c0ff" : "#005cc5"};
    }

    .hljs-string,
    .hljs-regexp,
    .hljs-addition,
    .hljs-attribute,
    .hljs-meta-string {
      color: ${isDarkMode ? "#a5d6ff" : "#032f62"};
    }

    .hljs-built_in,
    .hljs-class .hljs-title {
      color: ${isDarkMode ? "#d2a8ff" : "#6f42c1"};
    }

    .hljs-attr,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-type,
    .hljs-selector-class,
    .hljs-selector-attr,
    .hljs-selector-pseudo,
    .hljs-number {
      color: ${isDarkMode ? "#79c0ff" : "#005cc5"};
    }

    .hljs-symbol,
    .hljs-bullet,
    .hljs-link,
    .hljs-meta,
    .hljs-selector-id,
    .hljs-title {
      color: ${isDarkMode ? "#d2a8ff" : "#6f42c1"};
    }
  `,
}));

interface MarkdownRenderProps {
  children: string;
  className?: string;
}

const PreBlock = ({ children, ...props }: any) => {
  const { message } = App.useApp();
  const [copied, setCopied] = React.useState(false);

  // Extract text content from children
  const getTextContent = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (node.props && node.props.children) return getTextContent(node.props.children);
    return '';
  };

  const code = getTextContent(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    message.success("代码已复制");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre {...props}>
      <div className="mac-window-header">
        <span className="red" />
        <span className="yellow" />
        <span className="green" />
      </div>
      <button className="copy-btn" onClick={handleCopy} title="复制代码">
        {copied ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
      </button>
      {children}
    </pre>
  );
};

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ children, className }) => {
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles.markdownContainer, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSlug]}
        components={{
          pre: PreBlock,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
