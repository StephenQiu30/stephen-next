"use client";

import React from "react";
import Link from "next/link";
import { createStyles } from "antd-style";
import { Typography, Tag, Spin } from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { listPostVoByPage } from "@/api/postController";
import GlassCard from "@/components/glass-card";

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
    margin-bottom: 80px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: ${token.colorPrimary};
      border-radius: 2px;
      opacity: 0.2;
    }
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
    margin: 0 auto;
    font-weight: 400;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;
    
    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  card: css`
    height: 100%;
    cursor: pointer;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background: ${isDarkMode ? "rgba(30, 30, 30, 0.6)" : "rgba(255, 255, 255, 0.6)"};
  `,
  cardHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  `,
  tag: css`
    border-radius: 999px;
    border: none;
    padding: 2px 10px;
    font-weight: 500;
    font-size: 12px;
    background: ${token.colorPrimaryBg};
    color: ${token.colorPrimary};
    margin: 0;
  `,
  date: css`
    font-size: 13px;
    color: ${token.colorTextTertiary};
  `,
  cardTitle: css`
    font-size: 24px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    line-height: 1.3 !important;
    transition: color 0.2s;
    
    ${responsive.mobile} {
       font-size: 20px !important;
    }
  `,
  cardDesc: css`
    color: ${token.colorTextSecondary};
    flex: 1;
    margin-bottom: 24px !important;
    font-size: 15px;
    line-height: 1.6;
    
    // Line clamp
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  cardFooter: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,
  author: css`
    font-size: 13px;
    font-weight: 500;
    color: ${token.colorText};
  `
}));

const BlogIndexPage = () => {
  const { styles } = useStyles();

  // Fetch posts from API
  const { data: postData, loading } = useRequest(async () => {
    return await listPostVoByPage({
      current: 1,
      pageSize: 10,
      sortField: "createTime",
      sortOrder: "descend",
    });
  });

  const posts = postData?.data?.records || [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={1} className={styles.pageTitle}>
          Stories & Insights
        </Title>
        <p className={styles.subtitle}>
          关于设计、开发与技术的深度思考。
        </p>
      </header>

      <Spin spinning={loading} size="large">
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none" }}
            >
              <GlassCard className={styles.card} hoverable>
                <div className={styles.cardHeader}>
                  <Tag className={styles.tag}>
                    {post.tags?.[0] || "Article"}
                  </Tag>
                  <span className={styles.date}>
                    {dayjs(post.createTime).format("MMM DD, YYYY")}
                  </span>
                </div>

                <Title level={3} className={styles.cardTitle}>
                  {post.title}
                </Title>

                <Paragraph className={styles.cardDesc}>
                  {post.content?.replace(/<[^>]+>/g, "").substring(0, 150)}...
                </Paragraph>

                <div className={styles.cardFooter}>
                  <span className={styles.author}>
                    By {post.userVO?.userName || "Admin"}
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default BlogIndexPage;
