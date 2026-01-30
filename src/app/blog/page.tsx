"use client";

import React from "react";
import Link from "next/link";
import { createStyles } from "antd-style";
import { Card, Typography, Tag, Space, Spin } from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { listPostVoByPage } from "@/api/postController";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css, token, responsive }) => ({
    container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;

    ${responsive.mobile} {
      padding: 24px 16px;
    }
  `,
    header: css`
    text-align: center;
    margin-bottom: 60px;
  `,
    pageTitle: css`
    font-size: 48px !important;
    font-weight: 800 !important;
    margin-bottom: 16px !important;
    background: linear-gradient(
      135deg,
      ${token.colorText} 0%,
      ${token.colorTextSecondary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    ${responsive.mobile} {
      font-size: 32px !important;
    }
  `,
    subtitle: css`
    font-size: 18px;
    color: ${token.colorTextSecondary};
    max-width: 600px;
    margin: 0 auto;
  `,
    grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 32px;

    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,
    card: css`
    height: 100%;
    border-radius: 16px;
    border: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px
        ${token.isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"};
      border-color: ${token.colorPrimaryBorder};
    }

    .ant-card-body {
      padding: 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,
    cardTitle: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    line-height: 1.4 !important;
  `,
    cardDesc: css`
    color: ${token.colorTextSecondary};
    flex: 1;
    margin-bottom: 20px !important;

    // Line clamp for consistent height
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
    cardMeta: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${token.colorTextTertiary};
    font-size: 13px;
    margin-top: auto;
  `,
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
                    博客
                </Title>
                <p className={styles.subtitle}>关于设计与开发的思考、教程与见解。</p>
            </header>

            <Spin spinning={loading} size="large">
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <Link
                            href={`/blog/${post.id}`}
                            key={post.id}
                            style={{ textDecoration: "none" }}
                        >
                            <Card className={styles.card} hoverable bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Tag
                                        color="blue"
                                        style={{ borderRadius: 12, border: "none" }}
                                    >
                                        {post.tags?.[0] || "文章"}
                                    </Tag>
                                </div>
                                <Title level={3} className={styles.cardTitle}>
                                    {post.title}
                                </Title>
                                <Paragraph className={styles.cardDesc}>
                                    {post.content?.substring(0, 150)}...
                                </Paragraph>
                                <div className={styles.cardMeta}>
                                    <span>{post.userVO?.userName || "Admin"}</span>
                                    <span>{dayjs(post.createTime).format("YYYY年MM月DD日")}</span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Spin>
        </div>
    );
};

export default BlogIndexPage;
