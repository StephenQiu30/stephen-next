"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { ProForm, PageContainer } from "@ant-design/pro-components";
import { Button, App, Typography } from "antd";
import {
  IdcardOutlined,
  SafetyOutlined,
  PhoneOutlined,
  RightOutlined
} from "@ant-design/icons";
import { updateMyUser, getLoginUser } from "@/api/userController";
import { setLoginUser } from "@/store/modules";
import { createStyles } from "antd-style";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/glass-card";
import BasicSettings from "@/components/settings/basic-settings";
import SecuritySettings from "@/components/settings/security-settings";
import ContactSettings from "@/components/settings/contact-settings";

const { Title } = Typography;

const useStyles = createStyles(({ token, css, responsive }) => ({
  pageContainer: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    
    ${responsive.mobile} {
      padding: 16px;
    }
  `,
  layout: css`
    display: flex;
    gap: 40px;
    align-items: flex-start;
    
    ${responsive.mobile} {
      flex-direction: column;
      gap: 24px;
    }
  `,
  sidebar: css`
    width: 280px;
    position: sticky;
    top: 24px;
    flex-shrink: 0;

    ${responsive.mobile} {
      width: 100%;
      position: static;
      display: flex;
      overflow-x: auto;
      gap: 12px;
      padding-bottom: 4px;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
  `,
  navItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    margin-bottom: 8px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    color: ${token.colorTextSecondary};
    font-size: 15px;
    
    &:hover {
      background: ${token.colorFillTertiary};
      color: ${token.colorText};
    }
    
    &.active {
      background: ${token.colorFillSecondary};
      color: ${token.colorPrimary};
      font-weight: 600;
    }
    
    ${responsive.mobile} {
      margin-bottom: 0;
      white-space: nowrap;
      padding: 10px 16px;
      background: ${token.colorFillQuaternary};
      border: 1px solid ${token.colorBorderSecondary};
      
      &.active {
        background: ${token.colorPrimaryBg};
        border-color: ${token.colorPrimaryBorder};
      }
    }
  `,
  contentArea: css`
    flex: 1;
    width: 100%;
    min-width: 0; // Prevent flex item overflow
  `,
  headerTitle: css`
    margin-bottom: 24px;
    padding: 0 12px;
    
    ${responsive.mobile} {
       display: none;
    }
  `,
  saveButton: css`
    position: fixed;
    bottom: 40px;
    right: 40px;
    height: 50px;
    padding: 0 32px;
    border-radius: 999px;
    box-shadow: 0 8px 20px ${token.colorPrimary}40;
    font-weight: 600;
    font-size: 16px;
    z-index: 100;
    
    ${responsive.mobile} {
        position: static;
        width: 100%;
        margin-top: 32px;
        box-shadow: 0 4px 12px ${token.colorPrimary}30;
    }
  `
}));

const Settings: React.FC = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(loginUser?.userAvatar || "");
  const [activeTab, setActiveTab] = useState("basic");
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useEffect(() => {
    if (loginUser?.id) {
      form.setFieldsValue({
        userName: loginUser.userName,
        userAvatar: loginUser.userAvatar,
        userEmail: loginUser.userEmail,
        userPhone: loginUser.userPhone,

      });
      setAvatarUrl(loginUser.userAvatar || "");
    }
  }, [loginUser, form]);

  if (!loginUser?.id) return null;

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { checkPassword, ...submitValues } = values;
      if (!submitValues.userPassword) delete submitValues.userPassword;

      const res: any = await updateMyUser(submitValues);
      if (res.code === 0) {
        message.success("设置已保存");
        const userRes: any = await getLoginUser();
        if (userRes.code === 0 && userRes.data) {
          dispatch(setLoginUser(userRes.data));
        }
        form.setFieldValue("userPassword", "");
        form.setFieldValue("checkPassword", "");
      } else {
        message.error(res.message || "保存失败");
      }
    } catch {
      message.error("保存失败");
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { key: "basic", label: "基本信息", icon: <IdcardOutlined /> },
    { key: "security", label: "安全设置", icon: <SafetyOutlined /> },
    { key: "contact", label: "联系方式", icon: <PhoneOutlined /> },
  ];

  return (
    <PageContainer title={false} ghost>
      <div className={styles.pageContainer}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.headerTitle}>
              <Title level={3} style={{ margin: 0 }}>账户设置</Title>
            </div>
            <GlassCard style={{ padding: 8 }}>
              {menuItems.map(item => (
                <div
                  key={item.key}
                  className={`${styles.navItem} ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {activeTab === item.key && <RightOutlined style={{ marginLeft: "auto", fontSize: 12, opacity: 0.5 }} />}
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className={styles.contentArea}>
            <ProForm
              form={form}
              onFinish={handleSubmit}
              submitter={{ render: () => null }}
              layout="vertical"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "basic" && (
                    <BasicSettings
                      loginUser={loginUser}
                      form={form}
                      setAvatarUrl={setAvatarUrl}
                      avatarUrl={avatarUrl}
                    />
                  )}
                  {activeTab === "security" && <SecuritySettings />}
                  {activeTab === "contact" && <ContactSettings />}
                </motion.div>
              </AnimatePresence>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.saveButton}
                size="large"
              >
                保存更改
              </Button>
            </ProForm>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
