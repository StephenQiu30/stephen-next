"use client";

import React from "react";
import { useParams } from "next/navigation";
import { createStyles } from "antd-style";
import { Spin, Result, Button } from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { getPostVoById } from "@/api/postController";
import MarkdownRender from "@/components/markdown/markdown-render";
import MarkdownToc from "@/components/markdown/markdown-toc";

const useStyles = createStyles(({ css, token, responsive }) => ({
  pageContainer: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    position: relative;
  `,
  layout: css`
    display: flex;
    gap: 48px;
    // align-items: flex-start; // Removed to allow sidebar to stretch for sticky TOC

    ${responsive.mobile} {
      flex-direction: column;
      gap: 24px;
    }
  `,
  mainContent: css`
    flex: 1;
    min-width: 0; /* Prevent overflow */
    width: 100%;
  `,
  sidebar: css`
    width: 280px;
    flex-shrink: 0;

    ${responsive.mobile} {
      display: none;
    }
  `,
  header: css`
    margin-bottom: 40px;
    text-align: center;
  `,
  title: css`
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    background: linear-gradient(
      135deg,
      ${token.colorText} 0%,
      ${token.colorTextSecondary} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    ${responsive.mobile} {
      font-size: 32px;
    }
  `,
  meta: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
  `,
  tag: css`
    background: ${token.colorFillSecondary};
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  `,
}));

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { styles } = useStyles();

  // Fetch post details
  const { data: postData, loading } = useRequest(async () => {
    if (!id) return null;
    return await getPostVoById({ id: id as unknown as number });
  });

  const post = postData?.data;

  return (
    <div className={styles.pageContainer}>
      <Spin spinning={loading} size="large">
        {!loading && post ? (
          <>
            <header className={styles.header}>
              <div className={styles.meta}>
                {post.tags?.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
                <span>{dayjs(post.createTime).format("YYYY年MM月DD日")}</span>
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.meta}>
                作者：{post.userVO?.userName || "Admin"}
              </div>
            </header>

            <div className={styles.layout}>
              <main className={styles.mainContent}>
                <MarkdownRender>{post.content || ""}</MarkdownRender>
              </main>

              <aside className={styles.sidebar}>
                <MarkdownToc markdown={post.content || ""} />
              </aside>
            </div>
          </>
        ) : (
          !loading && (
            <Result
              status="404"
              title="404"
              subTitle="抱歉，您访问的文章不存在。"
              extra={
                <Button type="primary" onClick={() => router.push("/blog")}>
                  返回博客列表
                </Button>
              }
            />
          )
        )}
      </Spin>
    </div>
  );
};

export default BlogPostPage;
