"use client";

import React from "react";
import Link from "next/link";
import { Typography, Tag, Space, Image } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import { EyeOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import GlassCard from "@/components/glass-card";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css, token, isDarkMode }) => ({
  card: css`
    height: 100%;
    cursor: pointer;
    padding: 0; // Reset padding for image to sit flush
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: ${isDarkMode ? "rgba(30,30,30,0.6)" : "rgba(255,255,255,0.7)"};
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.1);
      
      .cover-mask {
        opacity: 0;
      }
      
      .cover-image {
        transform: scale(1.05);
      }
    }
  `,
  coverWrapper: css`
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16:9 aspect ratio
    overflow: hidden;
    background: ${token.colorFillSecondary};
    
    // Override Ant Image wrapper to fit the container
    .ant-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
  `,
  placeholder: css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background: linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorFillTertiary} 100%);
  `,
  placeholderText: css`
    font-size: 24px;
    font-weight: 800;
    line-height: 1.3;
    text-align: center;
    color: ${token.colorPrimaryTextHover}; // A slightly stronger color
    opacity: 0.9;
    
    // Ellipsis for long titles
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  coverImage: css`
    object-fit: cover;
    transition: transform 0.5s ease;
  `,
  coverMask: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
    transition: opacity 0.3s ease;
  `,
  content: css`
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
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
  title: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    line-height: 1.4 !important;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  excerpt: css`
    color: ${token.colorTextSecondary};
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px !important;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  footer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid ${token.colorBorderSecondary};
    color: ${token.colorTextSecondary};
    font-size: 13px;
  `,
  author: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  `,
  stats: css`
    display: flex;
    gap: 12px;
    
    .anticon {
      margin-right: 4px;
    }
  `
}));

interface BlogCardProps {
  post: API.PostVO;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { styles, cx } = useStyles();

  return (
    <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", height: "100%", display: "block" }}>
      <GlassCard className={styles.card} hoverable>
        {/* Cover Image or Placeholder */}
        <div className={styles.coverWrapper}>
          {post.cover ? (
            <>
              <Image
                src={post.cover}
                alt={post.title || "Post Cover"}
                wrapperStyle={{ width: '100%', height: '100%' }}
                style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                className="cover-image" // Apply class for hover effect
                preview={false}
              />
              <div className={cx(styles.coverMask, "cover-mask")} />
            </>
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.placeholderText}>
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <Tag className={styles.tag}>
              {post.tags?.[0] || (post.tags as any as string[])?.[0] || "Article"}
            </Tag>
            <span className={styles.date}>
              {dayjs(post.createTime).format("MMM DD, YYYY")}
            </span>
          </div>

          <Title level={3} className={styles.title}>
            {post.title}
          </Title>

          <Paragraph className={styles.excerpt}>
            {post.content?.replace(/<[^>]+>/g, "").substring(0, 120)}...
          </Paragraph>

          <div className={styles.footer}>
            <div className={styles.author}>
              <span>By {post.userVO?.userName || "Admin"}</span>
            </div>

            <div className={styles.stats}>
              <span><LikeOutlined /> {post.thumbNum || 0}</span>
              <span><StarOutlined /> {post.favourNum || 0}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export default BlogCard;
