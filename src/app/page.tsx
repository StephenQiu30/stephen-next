"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Row, Badge, Statistic, Timeline, Card } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  UserOutlined,
  RiseOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    background: ${token.colorBgLayout};
    min-height: 100vh;
  `,
  heroSection: css`
    padding: 100px 24px;
    background: linear-gradient(135deg, ${token.colorBgContainer} 0%, ${token.colorBgElevated} 100%);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      right: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, ${token.colorPrimary}10 0%, transparent 70%);
      border-radius: 50%;
      animation: float 20s ease-in-out infinite;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -30%;
      left: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, ${token.colorPrimary}08 0%, transparent 70%);
      border-radius: 50%;
      animation: float 15s ease-in-out infinite reverse;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, 30px); }
    }
  `,

  badge: css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorPrimary}20 100%);
    border: 1px solid ${token.colorPrimaryBorder};
    border-radius: 24px;
    color: ${token.colorPrimary};
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
    box-shadow: 0 2px 8px ${token.colorPrimary}15;
  `,

  title: css`
    font-size: 72px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(135deg, ${token.colorTextHeading} 0%, ${token.colorPrimary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 48px;
    }
  `,

  subtitle: css`
    font-size: 20px;
    color: ${token.colorTextSecondary};
    line-height: 1.6;
    margin-bottom: 48px;
    max-width: 600px;
  `,

  buttonGroup: css`
    display: flex;
    gap: 16px;
    margin-bottom: 60px;

    @media (max-width: 576px) {
      flex-direction: column;
      width: 100%;

      button {
        width: 100%;
      }
    }
  `,

  chatPreview: css`
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  `,

  chatContainer: css`
    background: ${token.colorBgContainer};
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 20px 60px ${token.colorBgSpotlight};
    border: 1px solid ${token.colorBorder};
  `,

  chatMessage: css`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    opacity: 0;
    animation: slideIn 0.5s ease forwards;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &.user {
      flex-direction: row-reverse;

      .message-bubble {
        background: linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimary}cc 100%);
        color: #fff;
      }
    }

    &.assistant .message-bubble {
      background: ${token.colorBgElevated};
      border: 1px solid ${token.colorBorder};
    }

    .message-bubble {
      padding: 16px 24px;
      border-radius: 20px;
      max-width: 70%;
      line-height: 1.6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorPrimary}20 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 18px;
      color: ${token.colorPrimary};
    }
  `,

  section: css`
    padding: 100px 24px;
    background: ${token.colorBgContainer};
  `,

  sectionHeader: css`
    text-align: center;
    margin-bottom: 64px;
  `,

  sectionTag: css`
    display: inline-block;
    padding: 6px 16px;
    background: ${token.colorPrimaryBg};
    color: ${token.colorPrimary};
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 16px;
  `,

  sectionTitle: css`
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${token.colorTextHeading};

    @media (max-width: 768px) {
      font-size: 36px;
    }
  `,

  sectionDesc: css`
    font-size: 18px;
    color: ${token.colorTextSecondary};
    max-width: 600px;
    margin: 0 auto;
  `,

  featureCard: css`
    height: 100%;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px ${token.colorPrimaryBg};
    }
  `,

  featureIconWrapper: css`
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorPrimary}20 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 32px;
    color: ${token.colorPrimary};
  `,

  featureTitle: css`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    color: ${token.colorTextHeading};
  `,

  featureDesc: css`
    font-size: 15px;
    color: ${token.colorTextSecondary};
    line-height: 1.7;
  `,

  statsSection: css`
    background: linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimary}cc 100%);
    padding: 80px 24px;
    color: #fff;
  `,

  statCard: css`
    text-align: center;
    padding: 32px;

    .ant-statistic-title {
      color: rgba(255, 255, 255, 0.85);
      font-size: 16px;
      font-weight: 500;
    }

    .ant-statistic-content {
      color: #fff;
      font-size: 48px;
      font-weight: 700;
    }
  `,

  ctaSection: css`
    padding: 100px 24px;
    text-align: center;
    background: ${token.colorBgLayout};
  `,

  ctaCard: css`
    background: linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimary}cc 100%);
    border-radius: 32px;
    padding: 80px 48px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 60px ${token.colorPrimary}30;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      right: -10%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      border-radius: 50%;
    }

    @media (max-width: 768px) {
      padding: 48px 24px;
    }
  `,

  ctaTitle: css`
    font-size: 42px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  `,

  ctaDesc: css`
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  `,
}));

const features = [
  {
    icon: <RobotOutlined />,
    title: "智能对话",
    description: "基于最先进的 GPT 模型，理解自然语言，提供流畅的对话体验",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "极速响应",
    description: "毫秒级响应速度，实时互动，让沟通更加高效便捷",
  },
  {
    icon: <SafetyOutlined />,
    title: "安全可靠",
    description: "企业级数据加密，多重安全防护，保护用户隐私数据",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "24/7 服务",
    description: "全天候在线支持，随时为您解答问题，提供贴心服务",
  },
  {
    icon: <TeamOutlined />,
    title: "团队协作",
    description: "支持多人协作管理，轻松分配任务，提升团队效率",
  },
  {
    icon: <RocketOutlined />,
    title: "快速部署",
    description: "即插即用，快速集成到您的系统，无需复杂配置",
  },
];

const Home: React.FC = () => {
  const { styles } = useStyles();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const chatMessages = [
    { role: "user", content: "你好，请问能帮我什么？" },
    { role: "assistant", content: "您好！我是智能 AI 助手，我可以帮您解答问题、提供建议、协助完成各种任务。请问有什么可以帮助您的吗？" },
    { role: "user", content: "帮我写一个产品介绍" },
    { role: "assistant", content: "当然！我可以为您介绍我们的产品。我们的 AI ChatBot 是一款智能对话助手，具有快速响应、多场景支持等特点。您想了解哪方面的信息呢？" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        const next = prev + 1;
        return next < chatMessages.length ? next : prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={itemVariants}>
            <Badge className={styles.badge}>
              <RocketOutlined />
              AI 驱动的智能对话平台
            </Badge>
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            下一代 AI 智能助手
            <br />
            让对话更智能、更高效
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            基于最新 AI 技术打造的智能对话机器人，为您的业务提供 24/7 全天候服务，
            显著提升用户体验，大幅降低运营成本
          </motion.p>

          <motion.div className={styles.buttonGroup} variants={itemVariants}>
            <Button
              type="primary"
              size="large"
              icon={<RobotOutlined />}
              style={{ height: 48, padding: "0 32px", fontSize: 16 }}
            >
              免费开始使用
            </Button>
            <Button
              size="large"
              icon={<ArrowRightOutlined />}
              style={{ height: 48, padding: "0 32px", fontSize: 16 }}
            >
              查看演示
            </Button>
          </motion.div>

          <motion.div className={styles.chatPreview} variants={itemVariants}>
            <div className={styles.chatContainer}>
              {chatMessages.slice(0, currentMessageIndex + 1).map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.chatMessage} ${msg.role}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="avatar">
                    {msg.role === "user" ? <UserOutlined /> : <RobotOutlined />}
                  </div>
                  <div className="message-bubble">{msg.content}</div>
                </div>
              ))}
              {currentMessageIndex < chatMessages.length - 1 && (
                <div className={`${styles.chatMessage} assistant`}>
                  <div className="avatar">
                    <RobotOutlined />
                  </div>
                  <div className="message-bubble">
                    <span style={{ opacity: 0.6 }}>
                      <MessageOutlined /> 正在输入...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Badge className={styles.sectionTag}>核心功能</Badge>
          <h2 className={styles.sectionTitle}>为什么选择我们？</h2>
          <p className={styles.sectionDesc}>强大的功能支持，满足您的各种业务场景需求</p>
        </div>

        <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: "0 auto" }}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProCard
                  className={styles.featureCard}
                  bordered
                  hoverable
                  headerBordered={false}
                >
                  <div className={styles.featureIconWrapper}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </ProCard>
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.statCard}
            >
              <Statistic
                title="活跃用户"
                value={10000}
                suffix="+"
                prefix={<UserOutlined />}
              />
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.statCard}
            >
              <Statistic
                title="日均对话"
                value={100000}
                suffix="+"
                prefix={<MessageOutlined />}
              />
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.statCard}
            >
              <Statistic
                title="响应时间"
                value={0.1}
                suffix="s"
                prefix={<ThunderboltOutlined />}
                precision={1}
              />
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.statCard}
            >
              <Statistic
                title="客户满意度"
                value={98}
                suffix="%"
                prefix={<RiseOutlined />}
              />
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.ctaTitle}>准备好开始了吗？</h2>
          <p className={styles.ctaDesc}>
            立即体验 AI ChatBot，为您的业务带来全新的智能对话体验
          </p>
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            style={{
              height: 56,
              padding: "0 48px",
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 28,
              background: "#fff",
              border: "none",
              color: "var(--ant-colorPrimary)",
              position: "relative",
              zIndex: 1,
            }}
          >
            立即开始使用
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
