"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Avatar, Button, Tag, Space, Card, Divider } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { PageContainer, ProDescriptions, ProCard } from "@ant-design/pro-components";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    max-width: 900px;
    margin: 0 auto;
  `,
  profileCard: css`
    overflow: hidden;
    border-radius: ${token.borderRadiusLG}px;
    border: none;
    box-shadow: ${token.boxShadowTertiary};
    background: ${token.colorBgContainer};
  `,
  banner: css`
    height: 180px;
    background: linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryActive} 100%);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  avatarWrapper: css`
    position: absolute;
    bottom: -50px;
    padding: 6px;
    background: ${token.colorBgContainer};
    border-radius: 50%;
    box-shadow: ${token.boxShadowSecondary};
  `,
  content: css`
    padding-top: 60px;
    padding-bottom: 32px;
    text-align: center;
  `,
  userName: css`
    font-size: 28px;
    font-weight: 700;
    color: ${token.colorTextHeading};
    margin: 8px 0 4px;
  `,
  userEmail: css`
    color: ${token.colorTextDescription};
    font-size: 15px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `,
  infoSection: css`
    margin-top: 32px;
    padding: 0 40px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
  `,
  editButton: css`
    border-radius: 20px;
    height: 40px;
    padding: 0 24px;
    font-weight: 600;
    margin-top: 16px;
    border: none;
    box-shadow: 0 2px 8px ${token.colorPrimaryHover}40;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${token.colorPrimaryHover}60;
    }
  `,
  tag: css`
    margin-top: 8px;
    padding: 2px 12px;
    border-radius: 12px;
    font-weight: 500;
  `,
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
        return { label: "管理员", color: "gold", icon: <SafetyCertificateOutlined /> };
      case "user":
        return { label: "普通用户", color: "blue", icon: <UserOutlined /> };
      default:
        return { label: "未知角色", color: "default", icon: <GlobalOutlined /> };
    }
  };

  const roleInfo = getRoleInfo(loginUser.userRole);

  return (
    <PageContainer title={false}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProCard className={styles.profileCard} bodyStyle={{ padding: 0 }}>
            <div className={styles.banner}>
              <div className={styles.avatarWrapper}>
                <Avatar
                  size={100}
                  src={loginUser.userAvatar}
                  icon={<UserOutlined />}
                  style={{ border: `4px solid ${theme.colorBgContainer}` }}
                />
              </div>
            </div>

            <div className={styles.content}>
              <h2 className={styles.userName}>{loginUser.userName}</h2>
              <div className={styles.userEmail}>
                <MailOutlined style={{ color: theme.colorPrimary }} />
                {loginUser.userEmail || "未设置邮箱"}
              </div>
              <Tag color={roleInfo.color} className={styles.tag} icon={roleInfo.icon}>
                {roleInfo.label}
              </Tag>

              <div>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => router.push("/user/settings")}
                  className={styles.editButton}
                >
                  编辑个人资料
                </Button>
              </div>

              <div className={styles.infoSection}>
                <Divider orientation="left" style={{ borderColor: theme.colorBorderSecondary }}>
                  账户详细信息
                </Divider>
                <ProDescriptions
                  column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                  dataSource={loginUser}
                  columns={[
                    {
                      title: "用户 ID",
                      dataIndex: "id",
                      render: (text) => (
                        <code style={{
                          background: theme.colorFillAlter,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          color: theme.colorTextSecondary
                        }}>
                          {text}
                        </code>
                      ),
                    },
                    {
                      title: "账户状态",
                      render: () => <Tag color="success">正常</Tag>,
                    },
                    {
                      title: "加入时间",
                      dataIndex: "createTime",
                      valueType: "dateTime",
                    },
                    {
                      title: "上次更新",
                      dataIndex: "updateTime",
                      valueType: "dateTime",
                    },
                  ]}
                />
              </div>
            </div>
          </ProCard>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Profile;
