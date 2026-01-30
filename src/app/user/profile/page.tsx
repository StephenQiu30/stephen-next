"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Avatar, Button, Typography, Space, Tooltip } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { PageContainer } from "@ant-design/pro-components";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const useStyles = createStyles(({ token, css, isDarkMode }) => ({
  pageContainer: css`
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  `,
  ambientBackground: css`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%, 
      ${token.colorPrimary || "rgba(24, 144, 255, 0.15)"} 0%, 
      rgba(255, 255, 255, 0) 50%
    );
    filter: blur(80px);
    z-index: 0;
    pointer-events: none;
    animation: pulse 10s ease-in-out infinite alternate;
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.1); opacity: 0.8; }
    }
  `,
  glassPanel: css`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
    background: ${isDarkMode ? "rgba(28, 28, 30, 0.65)" : "rgba(255, 255, 255, 0.65)"};
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)"};
    border-radius: 32px;
    padding: 48px;
    box-shadow: 
      0 20px 40px -8px rgba(0, 0, 0, 0.12),
      0 12px 24px -6px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255,255,255,0.3);
    
    @media (max-width: 576px) {
      padding: 32px 24px;
      border-radius: 24px;
    }
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 48px;
    @media (max-width: 576px) {
      flex-direction: column;
      text-align: center;
      gap: 24px;
    }
  `,
  avatarWrapper: css`
    position: relative;
    border-radius: 50%;
    padding: 4px;
    background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"};
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  `,
  avatar: css`
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
  `,
  userInfo: css`
    flex: 1;
  `,
  userName: css`
    font-size: 32px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    letter-spacing: -0.02em;
    background: ${isDarkMode
      ? "linear-gradient(135deg, #fff 0%, #aaa 100%)"
      : "linear-gradient(135deg, #333 0%, #666 100%)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
  userRole: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    background: ${token.colorFillTertiary};
    color: ${token.colorTextSecondary};
    font-weight: 600;
    font-size: 13px;
  `,
  editButton: css`
    height: 40px;
    padding: 0 24px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    background: ${token.colorText};
    color: ${token.colorBgContainer};
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      transform: scale(1.05);
      background: ${token.colorText};
      opacity: 0.9;
      color: ${token.colorBgContainer} !important;
    }
  `,
  statsGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  `,
  statCard: css`
    background: ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)"};
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    &:hover {
      background: ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)"};
      border-color: ${token.colorBorderSecondary};
      transform: translateY(-2px);
    }
  `,
  statIcon: css`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  `,
  statLabel: css`
    font-size: 13px;
    color: ${token.colorTextSecondary};
    font-weight: 500;
  `,
  statValue: css`
    font-size: 15px;
    font-weight: 600;
    color: ${token.colorText};
    overflow: hidden;
    text-overflow: ellipsis;
  `
}));

const Profile: React.FC = () => {
  const { styles, theme } = useStyles();
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  if (!loginUser?.id) {
    return null;
  }
  const getRoleInfo = (role?: string) => {
    switch (role) {
      case "admin":
        return {
          label: "管理员",
          icon: <SafetyCertificateOutlined />,
          bg: theme.geekblue,
        };
      case "user":
        return {
          label: "普通用户",
          icon: <UserOutlined />,
          bg: theme.green,
        };
      default:
        return {
          label: "访客",
          icon: <GlobalOutlined />,
          bg: theme.colorTextSecondary,
        };
    }
  };

  const roleInfo = getRoleInfo(loginUser.userRole);

  const stats = [
    {
      label: "电子邮箱",
      value: loginUser.userEmail || "未设置",
      icon: <MailOutlined style={{ color: "#007AFF" }} />,
      bg: "rgba(0, 122, 255, 0.1)",
    },
    {
      label: "用户 ID",
      value: loginUser.id,
      icon: <IdcardOutlined style={{ color: "#5856D6" }} />,
      bg: "rgba(88, 86, 214, 0.1)",
    },
    {
      label: "注册时间",
      value: loginUser.createTime ? new Date(loginUser.createTime).toLocaleDateString() : "未知",
      icon: <CalendarOutlined style={{ color: "#FF9500" }} />,
      bg: "rgba(255, 149, 0, 0.1)",
    }
  ];

  return (
    <PageContainer title={false} ghost>
      <div className={styles.pageContainer}>
        <div className={styles.ambientBackground} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.glassPanel}
        >
          <div className={styles.header}>
            <div className={styles.avatarWrapper}>
              <Avatar
                size={100}
                src={loginUser.userAvatar}
                className={styles.avatar}
                icon={<UserOutlined />}
              />
            </div>
            <div className={styles.userInfo}>
              <Title level={1} className={styles.userName}>{loginUser.userName}</Title>
              <div className={styles.userRole}>
                {roleInfo.icon}
                {roleInfo.label}
              </div>
            </div>
            <div>
              <Button
                className={styles.editButton}
                icon={<EditOutlined />}
                onClick={() => router.push("/user/settings")}
              >
                编辑
              </Button>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={styles.statCard}
              >
                <div className={styles.statIcon} style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <Tooltip title={stat.value}>
                    <div className={styles.statValue}>{stat.value}</div>
                  </Tooltip>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Profile;
