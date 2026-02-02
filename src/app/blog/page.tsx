"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createStyles } from "antd-style";
import { Typography, Tag, Spin, Input, Empty } from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { searchPostVoByPage } from "@/api/searchController";

import BlogCard from "@/components/blog/blog-card";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css, token, responsive, isDarkMode }) => ({
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 24px;
    
    ${responsive.mobile} {
      padding: 32px 16px;
    }
  `,
  header: css`
    text-align: center;
    margin-bottom: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  pageTitle: css`
    font-size: 56px !important;
    font-weight: 800 !important;
    margin-bottom: 24px !important;
    letter-spacing: -0.02em;
    background: linear-gradient(
      135deg,
      ${token.colorText} 0%,
      ${token.colorTextSecondary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    ${responsive.mobile} {
      font-size: 36px !important;
    }
  `,
  subtitle: css`
    font-size: 20px;
    color: ${token.colorTextSecondary};
    max-width: 600px;
    margin: 0 auto 40px;
    font-weight: 400;
  `,
  searchBar: css`
    width: 100%;
    max-width: 500px;
    margin-bottom: 40px;
    
    .ant-input-affix-wrapper {
        border-radius: 999px;
        padding: 12px 24px;
        background: ${isDarkMode ? "rgba(40,40,40,0.6)" : "rgba(255,255,255,0.6)"};
        backdrop-filter: blur(10px);
        border: 1px solid ${token.colorBorderSecondary};
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &:hover, &:focus-within {
            background: ${isDarkMode ? "rgba(50,50,50,0.8)" : "rgba(255,255,255,0.9)"};
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        input {
            background: transparent !important;
            font-size: 16px;
        }
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;
    
    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,
}));

const BlogIndexPage = () => {
  const { styles } = useStyles();
  const [searchText, setSearchText] = useState<string>("");

  // Fetch posts from ES API
  const { data: postData, loading, run } = useRequest(async (text = "") => {
    return await searchPostVoByPage({
      current: 1,
      pageSize: 20,
      searchText: text,
      sortField: "createTime",
      sortOrder: "descend",
    });
  }, {
    debounceWait: 500,
  });

  const posts = postData?.data?.records || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    run(e.target.value);
  };

  // Helper to highlight search text
  const highlightText = (text: string | undefined) => {
    if (!text) return "";
    if (!searchText) return text.length > 150 ? text.substring(0, 150) + "..." : text;

    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.split(regex);

    // Simple truncation for performance if text is long
    const shortText = text.length > 200 ? text.substring(0, 200) + "..." : text;
    // Note: Implementing minimal highlighting for title/desc. 
    // For full rich text highlighting, we'd need dangerouslySetInnerHTML or complex mapping
    return shortText; // Fallback to simple text for now to avoid React key issues in this simple view
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={1} className={styles.pageTitle}>
          Stories & Insights
        </Title>
        <p className={styles.subtitle}>
          关于设计、开发与技术的深度思考。
        </p>

        <div className={styles.searchBar}>
          <Input
            placeholder="Search articles..."
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
            onChange={handleSearch}
            value={searchText}
            allowClear
          />
        </div>
      </header>

      <Spin spinning={loading} size="large">
        {posts.length === 0 && !loading ? (
          <Empty description="No posts found" style={{ marginTop: 60 }} />
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BlogIndexPage;
