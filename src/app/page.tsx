"use client";

import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { CodeOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import Image from "next/image";

const { Text } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  page: css`
    min-height: 100vh;
    background:
      radial-gradient(
        1200px 600px at 15% 30%,
        ${token.colorPrimaryBg} 0%,
        transparent 60%
      ),
      radial-gradient(
        900px 500px at 85% 20%,
        ${token.colorInfoBg} 0%,
        transparent 55%
      ),
      ${token.colorBgLayout};
  `,
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 96px 24px 80px;
    position: relative;

    @media (max-width: 768px) {
      padding: 64px 16px 56px;
    }
  `,
  watermark: css`
    position: absolute;
    left: 0;
    top: 44%;
    transform: translateY(-50%);
    font-size: 140px;
    font-weight: 800;
    letter-spacing: 10px;
    color: ${token.colorText};
    opacity: 0.035;
    user-select: none;
    pointer-events: none;

    @media (max-width: 768px) {
      font-size: 96px;
      top: 52%;
    }
  `,
  meta: css`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: ${token.colorTextSecondary};
    font-size: 12px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `,
  title: css`
    font-family: ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif;
    font-size: 64px;
    line-height: 1.06;
    font-weight: 700;
    color: ${token.colorTextHeading};
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 44px;
    }
  `,
  titleEm: css`
    font-style: italic;
    font-weight: 500;
    color: ${token.colorTextHeading};
    opacity: 0.9;
  `,
  subtitle: css`
    color: ${token.colorTextSecondary};
    font-size: 14px;
    line-height: 1.8;
    margin: 8px 0 18px;
  `,
  iconRow: css`
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 18px 0 26px;
  `,
  iconBtn: css`
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(10px);
  `,
  bullet: css`
    margin-top: 28px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: ${token.colorTextSecondary};
    font-size: 13px;
    line-height: 1.8;
  `,
  bulletDot: css`
    width: 6px;
    height: 6px;
    margin-top: 9px;
    border-radius: 999px;
    background: ${token.colorPrimary};
    box-shadow: 0 0 0 4px ${token.colorPrimaryBg};
    flex: none;
  `,
  cardWrap: css`
    display: flex;
    justify-content: flex-end;

    @media (max-width: 992px) {
      justify-content: flex-start;
    }
  `,
  card: css`
    width: 320px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid ${token.colorBorderSecondary};
    box-shadow: 0 20px 55px rgba(15, 23, 42, 0.12);
    overflow: hidden;
    position: relative;
  `,
  cardInner: css`
    padding: 14px;
  `,
  cardRing: css`
    position: absolute;
    right: -18px;
    top: -18px;
    width: 110px;
    height: 110px;
    border-radius: 999px;
    border: 1px dashed ${token.colorBorder};
    opacity: 0.7;
  `,
  avatarFrame: css`
    border-radius: 14px;
    overflow: hidden;
    background: ${token.colorBgContainer};
  `,
  handle: css`
    position: absolute;
    left: 18px;
    bottom: 18px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.55);
    color: rgba(255, 255, 255, 0.92);
    font-size: 12px;
    letter-spacing: 0.4px;
  `,
}));

export default function Home() {
  const { styles } = useStyles();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.watermark}>GPTS</div>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={14}>
            <div className={styles.meta}>
              <Text type="secondary">{"// FULL-STACK DEVELOPER"}</Text>
            </div>

            <h1 className={styles.title}>
              Building For <span className={styles.titleEm}>Enthusiasm</span>
            </h1>

            <div className={styles.subtitle}>总之岁月漫长，然而值得等待。</div>

            <div className={styles.iconRow} aria-label="Quick links">
              <Button
                shape="circle"
                icon={<GithubOutlined />}
                className={styles.iconBtn}
                aria-label="GitHub"
              />
              <Button
                shape="circle"
                icon={<CodeOutlined />}
                className={styles.iconBtn}
                aria-label="Code"
              />
              <Button
                shape="circle"
                icon={<MailOutlined />}
                className={styles.iconBtn}
                aria-label="Mail"
              />
            </div>

            <div className={styles.bullet}>
              <span className={styles.bulletDot} />
              <span>
                指尖跃然长夜，字句生长成黎明，言火映写星霜间隙，愿所造向内敛诗。
              </span>
            </div>
          </Col>

          <Col xs={24} lg={10}>
            <div className={styles.cardWrap}>
              <div className={styles.card} aria-label="Profile card">
                <div className={styles.cardRing} aria-hidden="true" />
                <div className={styles.cardInner}>
                  <div className={styles.avatarFrame}>
                    <Image
                      src="/home-hero.png"
                      alt="Hero card image"
                      width={320}
                      height={360}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                      priority
                    />
                  </div>
                </div>
                <div className={styles.handle}>gptsiumy43</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
