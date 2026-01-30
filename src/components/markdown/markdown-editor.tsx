"use client";

import React, { useState } from "react";
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
import MarkdownRender from "./markdown-render";

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
  `,
  toolbar: css`
    padding: 12px 16px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgLayout}; // Slightly distinctive background
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
  `,
  mainArea: css`
    flex: 1;
    display: flex;
    overflow: hidden;
    position: relative;
    min-height: 500px; // Default height if not constrained by parent
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
  const { styles, cx } = useStyles();
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const { token } = useToken();

  const handleInsert = (marker: string, suffix: string = "") => {
    // Ideally this would use a ref to the textarea to insert at cursor position
    // For now, simpler implementation - append to end (or user can build specific ref logic)
    // To keep it simple and robust without heavy dependencies, we'll just focus on layout for now
    // If complex editing logic is needed, we would need a more robust editor core (like monaco or codemirror)
    // Here we append for demonstration, or could just notify user "Cursor insertion requires ref implementation"
    onChange(value + `${marker}Text${suffix}`);
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
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Start writing..."
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
