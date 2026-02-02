"use client";

import React from "react";
import { Button, Typography, Row, Col, Space, ConfigProvider, Card } from "antd";
import { GithubOutlined, ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import { createStyles, keyframes } from "antd-style";
import Image from "next/image";
import Link from "next/link";
import { useRequest } from "ahooks";
import { listPostVoByPage } from "@/api/postController";

import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const softGlow = keyframes`
  0% { opacity: 0.5; filter: blur(60px); }
  50% { opacity: 0.8; filter: blur(80px); }
  100% { opacity: 0.5; filter: blur(60px); }
`;

const useStyles = createStyles(({ css, token, responsive, isDarkMode }) => ({
  page: css`
    min-height: 100vh;
    background: ${token.colorBgLayout};
    position: relative;
    overflow-x: hidden;
  `,
  bgGradient: css`
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 100vh;
    background: radial-gradient(circle at 50% 50%, 
      ${isDarkMode ? "rgba(29, 29, 31, 1)" : "rgba(255, 255, 255, 1)"} 0%, 
      ${isDarkMode ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)"} 70%);
    z-index: 0;
    pointer-events: none;
  `,
  glowOrb: css`
    position: absolute;
    width: 600px;
    height: 600px;
    background: ${token.colorPrimary};
    border-radius: 50%;
    opacity: 0.15;
    filter: blur(80px);
    animation: ${softGlow} 8s infinite ease-in-out;
    top: -100px;
    right: -100px;
    z-index: 0;
  `,
  glowOrb2: css`
    position: absolute;
    width: 500px;
    height: 500px;
    background: ${token.colorInfo};
    border-radius: 50%;
    opacity: 0.1;
    filter: blur(90px);
    animation: ${softGlow} 10s infinite ease-in-out reverse;
    bottom: 0;
    left: -100px;
    z-index: 0;
  `,
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 24px 80px;
    position: relative;
    z-index: 1;

    ${responsive.mobile} {
      padding: 80px 16px 40px;
    }
  `,
  heroSection: css`
    margin-bottom: 120px;
    ${responsive.mobile} {
      margin-bottom: 60px;
    }
  `,
  eyebrow: css`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${token.colorPrimary};
    margin-bottom: 16px;
    display: inline-block;
  `,
  title: css`
    font-size: 72px !important;
    line-height: 1.05 !important;
    font-weight: 800 !important;
    letter-spacing: -0.02em !important;
    margin-bottom: 24px !important;
    background: linear-gradient(135deg, ${token.colorText} 0%, ${token.colorTextSecondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    ${responsive.mobile} {
      font-size: 42px !important;
    }
  `,
  subtitle: css`
    font-size: 20px;
    line-height: 1.6;
    color: ${token.colorTextSecondary};
    max-width: 600px;
    margin-bottom: 40px;
    font-weight: 400;

    ${responsive.mobile} {
      font-size: 18px;
    }
  `,
  heroImageWrapper: css`
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    animation: ${float} 6s ease-in-out infinite;
    z-index: 10;
    
    /* First Color Glow (Top-Left) */
    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: -10%;
      width: 70%;
      height: 70%;
      background: radial-gradient(circle, ${token.colorPrimary} 0%, transparent 70%);
      opacity: 0.25;
      filter: blur(60px);
      z-index: -1;
      border-radius: 50%;
    }

    /* Second Color Glow (Bottom-Right) */
    &::after {
      content: '';
      position: absolute;
      bottom: -10%;
      right: -10%;
      width: 70%;
      height: 70%;
      background: radial-gradient(circle, #722ED1 0%, transparent 70%); /* Purple accent */
      opacity: 0.25;
      filter: blur(60px);
      z-index: -1;
      border-radius: 50%;
    }
  `,
  heroImage: css`
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.12);
    border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"};
    background: ${isDarkMode ? "#000" : "#fff"};
    overflow: hidden;
  `,
  sectionHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 32px;
  `,
  sectionTitle: css`
    font-size: 32px !important;
    font-weight: 700 !important;
    margin-bottom: 40px !important;
    letter-spacing: -0.01em;
    text-align: center;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 32px;
    
    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  featureCard: css`
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    background: ${isDarkMode ? "rgba(30, 30, 30, 0.4)" : "rgba(255, 255, 255, 0.4)"} !important;
    
    &:hover {
      transform: translateY(-8px);
    }
  `,
  featureImg: css`
    width: 100%;
    height: 200px;
    background: ${token.colorFillSecondary};
    position: relative;
    overflow: hidden;
  `,
  featureContent: css`
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  featureDate: css`
    font-size: 13px;
    color: ${token.colorTextTertiary};
    margin-bottom: 8px;
    font-weight: 500;
  `,
  featureTitle: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    line-height: 1.4 !important;
    
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `,
  featureDesc: css`
    font-size: 15px;
    color: ${token.colorTextSecondary};
    margin-bottom: 24px;
    line-height: 1.6;
    flex: 1;
    
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `,
  readMore: css`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    color: ${token.colorPrimary};
    transition: gap 0.2s;
    
    &:hover {
      gap: 8px;
    }
  `,
  ctaButton: css`
    height: 52px;
    padding: 0 32px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 8px 16px ${token.colorPrimary}40;
    border: none;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 24px ${token.colorPrimary}50;
    }
  `,
  secondaryButton: css`
    height: 52px;
    padding: 0 32px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 600;
    background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
    border: none;
    color: ${token.colorText};
    backdrop-filter: blur(10px);
    
    &:hover {
      background: ${isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)"};
    }
  `
}));

export default function Home() {
  const { styles, cx } = useStyles();

  // Fetch recent posts
  const { data: postData } = useRequest(async () => {
    return await listPostVoByPage({
      current: 1,
      pageSize: 3,
      sortField: "createTime",
      sortOrder: "descend",
    });
  });

  const posts = postData?.data?.records || [];

  return (
    <div className={styles.page}>
      <div className={styles.bgGradient} />
      <div className={styles.glowOrb} />
      <div className={styles.glowOrb2} />

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <Row gutter={[48, 60]} align="middle">
            <Col xs={24} lg={12}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className={styles.eyebrow}>Welcome to my space</span>
                <Title className={styles.title}>
                  Designing for <br />
                  <span style={{ color: '#1890ff' }}>The Future</span>
                </Title>
                <div className={styles.subtitle}>
                  探索技术与设计的边界，记录思考与成长的足迹。这就是我的数字花园。
                </div>
                <Space size={16}>
                  <Link href="/blog">
                    <Button type="primary" className={styles.ctaButton}>
                      阅读文章
                    </Button>
                  </Link>
                  <Button
                    className={styles.secondaryButton}
                    icon={<GithubOutlined />}
                    onClick={() => window.open(process.env.NEXT_PUBLIC_GITHUB, "_blank")}
                  >
                    GitHub
                  </Button>
                </Space>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.heroImageWrapper}>
                {/* Placeholder for hero image - using a glass card as placeholder representation */}
                <Card className={styles.heroImage} style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", opacity: 0.5 }}>
                    <div style={{ fontSize: "80px", marginBottom: "16px" }}>🎨</div>
                    <div style={{ fontSize: "24px", fontWeight: "600" }}>Creative Space</div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>

        {/* Featured Posts Section */}
        {posts.length > 0 && (
          <div>
            <div className={styles.sectionHeader}>
              <Title level={2} className={styles.sectionTitle} style={{ marginBottom: 0, textAlign: 'left' }}>
                Latest Insights
              </Title>
              <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                View all <RightOutlined style={{ fontSize: 12 }} />
              </Link>
            </div>

            <div className={styles.grid}>
              {posts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} style={{ textDecoration: "none" }}>
                  <Card className={styles.featureCard} hoverable>
                    <div className={styles.featureContent}>
                      <div className={styles.featureDate}>
                        {dayjs(post.createTime).format("MMM DD, YYYY")}
                      </div>
                      <Title level={3} className={styles.featureTitle}>
                        {post.title}
                      </Title>
                      <Paragraph className={styles.featureDesc}>
                        {post.content?.replace(/<[^>]+>/g, "").substring(0, 100)}...
                      </Paragraph>
                      <div className={styles.readMore}>
                        Read Article <ArrowRightOutlined />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
