"use client";

import React, { useState, useRef } from "react";
import { Input, Segmented, Tooltip, theme } from "antd";
import { createStyles } from "antd-style";
import {
  EditOutlined,
  EyeOutlined,
  ColumnWidthOutlined,
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  CodeOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import MarkdownRender from "@/components/markdown/markdown-render";

const { TextArea } = Input;
const { useToken } = theme;

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 12px;
    background: ${token.colorBgContainer};
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    transition: all 0.2s ease-in-out;
    
    &:focus-within {
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      border-color: ${token.colorPrimary};
    }
  `,
  toolbar: css`
    padding: 12px 16px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgLayout};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    backdrop-filter: blur(8px);

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
  `,
  toolGroup: css`
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  `,
  toolButton: css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: ${token.colorTextSecondary};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${token.colorFillTertiary};
      color: ${token.colorText};
    }
    
    &:active {
      background: ${token.colorFillSecondary};
    }
  `,
  mainArea: css`
    flex: 1;
    display: flex;
    overflow: hidden;
    position: relative;
    min-height: 500px;
  `,
  editorPane: css`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${token.colorBorderSecondary};

    textarea {
      border: none !important;
      box-shadow: none !important;
      resize: none !important;
      padding: 24px !important;
      font-family: "SF Mono", "Menlo", monospace;
      font-size: 15px;
      line-height: 1.6;
      background: transparent;
      height: 100%;

      &:focus {
        box-shadow: none !important;
      }
    }
  `,
  previewPane: css`
    flex: 1;
    height: 100%;
    overflow-y: auto;
    padding: 24px;
    background: ${token.colorBgContainer};
  `,
  divider: css`
    width: 1px;
    background: ${token.colorBorderSecondary};
    height: 100%;
  `,
}));

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number | string;
}

type ViewMode = "edit" | "preview" | "split";

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  height = 600,
}) => {
  const { styles } = useStyles();
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const { token } = useToken();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert text at cursor position
  const handleInsert = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = value;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newValue = `${before}${prefix}${selected}${suffix}${after}`;
    onChange(newValue);

    // Restore cursor position and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.toolbar}>
        <div className={styles.toolGroup}>
          <Tooltip title="Bold">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("**", "**")}
            >
              <BoldOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Italic">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("*", "*")}
            >
              <ItalicOutlined />
            </div>
          </Tooltip>
          <Tooltip title="List">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("\n- ")}
            >
              <UnorderedListOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Ordered List">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("\n1. ")}
            >
              <OrderedListOutlined />
            </div>
          </Tooltip>
          <div
            style={{
              width: 1,
              height: 16,
              background: token.colorBorderSecondary,
              margin: "0 8px",
            }}
          />
          <Tooltip title="Link">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("[", "](url)")}
            >
              <LinkOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Image">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("![", "](url)")}
            >
              <PictureOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Code Block">
            <div
              className={styles.toolButton}
              onClick={() => handleInsert("\n```\n", "\n```")}
            >
              <CodeOutlined />
            </div>
          </Tooltip>
        </div>

        <Segmented<ViewMode>
          options={[
            { value: "edit", icon: <EditOutlined />, label: "Edit" },
            { value: "split", icon: <ColumnWidthOutlined />, label: "Split" },
            { value: "preview", icon: <EyeOutlined />, label: "Preview" },
          ]}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      <div className={styles.mainArea}>
        {(viewMode === "edit" || viewMode === "split") && (
          <div
            className={styles.editorPane}
            style={{ maxWidth: viewMode === "split" ? "50%" : "100%" }}
          >
            <TextArea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Start writing your amazing story..."
            />
          </div>
        )}

        {viewMode === "split" && <div className={styles.divider} />}

        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className={styles.previewPane}
            style={{ maxWidth: viewMode === "split" ? "50%" : "100%" }}
          >
            <MarkdownRender>{value}</MarkdownRender>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
