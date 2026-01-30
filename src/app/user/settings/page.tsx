"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { ProForm, ProFormText, PageContainer } from "@ant-design/pro-components";
import { Button, Upload, Avatar, App, Tabs, Typography } from "antd";
import {
  SaveOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
  SafetyOutlined,
  IdcardOutlined,
  LoadingOutlined,
  RightOutlined
} from "@ant-design/icons";
import { updateMyUser, getLoginUser } from "@/api/userController";
import { uploadFile } from "@/api/fileController";
import { setLoginUser } from "@/store/modules";
import { createStyles } from "antd-style";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Text } = Typography;

const useStyles = createStyles(({ token, css, isDarkMode }) => ({
  pageContainer: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    @media (max-width: 768px) {
      padding: 16px;
    }
  `,
  glassLayout: css`
    display: flex;
    background: ${isDarkMode ? "rgba(28, 28, 30, 0.6)" : "rgba(255, 255, 255, 0.6)"};
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    box-shadow: 0 20px 40px -8px rgba(0,0,0,0.08);
    min-height: 600px;
    position: relative;
    @media (max-width: 768px) {
      flex-direction: column;
      min-height: auto;
    }
  `,
  sidebar: css`
    width: 260px;
    background: ${isDarkMode ? "rgba(0,0,0,0.1)" : "rgba(245, 245, 247, 0.5)"};
    border-right: 1px solid ${token.colorBorderSecondary};
    padding: 32px 16px;
    @media (max-width: 768px) {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      padding: 16px;
      display: flex;
      overflow-x: auto;
      gap: 8px;
    }
  `,
  navTitle: css`
    padding: 0 16px;
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 700;
    color: ${token.colorTextHeading};
    @media (max-width: 768px) {
       display: none;
    }
  `,
  navItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin-bottom: 4px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    color: ${token.colorText};
    font-size: 15px;
    &:hover {
      background: ${token.colorFillTertiary};
    }
    &.active {
      background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "#FFFFFF"};
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      color: ${token.colorPrimary};
      font-weight: 600;
    }
    @media (max-width: 768px) {
       margin-bottom: 0;
       white-space: nowrap;
       flex-shrink: 0;
    }
  `,
  contentArea: css`
    flex: 1;
    padding: 40px 60px;
    position: relative;
    @media (max-width: 768px) {
      padding: 24px;
    }
  `,
  formGroup: css`
    background: ${isDarkMode ? "rgba(44, 44, 46, 0.4)" : "#FFFFFF"};
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    margin-bottom: 24px;
  `,
  formItem: css`
    position: relative;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    &:last-child {
      border-bottom: none;
    }
    .ant-form-item {
      margin-bottom: 0;
      flex: 1;
    }
    .ant-form-item-control-input {
      min-height: auto;
    }
    .ant-input, .ant-input-password {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0;
      font-size: 16px;
      text-align: right;
      &:focus {
         box-shadow: none !important;
      }
    }
    .ant-input-affix-wrapper {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        padding: 0;
        &:focus, &-focused {
            box-shadow: none !important;
        }
    }
  `,
  itemLabel: css`
    width: 100px;
    flex-shrink: 0;
    font-size: 15px;
    font-weight: 500;
    color: ${token.colorText};
  `,
  avatarUpload: css`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  `,
  avatarWrapper: css`
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.05);
      .mask {
        opacity: 1;
      }
    }
  `,
  avatarMask: css`
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.2s;
    backdrop-filter: blur(2px);
  `,
  saveButton: css`
    position: absolute;
    bottom: 40px;
    right: 60px;
    height: 44px;
    padding: 0 32px;
    border-radius: 999px;
    box-shadow: 0 4px 14px ${token.colorPrimary}40;
    font-weight: 600;
    @media (max-width: 768px) {
        position: static;
        width: 100%;
        margin-top: 24px;
    }
  `
}));

const Settings: React.FC = () => {
  const { styles, theme } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleAvatarUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res: any = await uploadFile({ biz: "user_avatar" }, formData);
      if (res.code === 0 && res.data) {
        setAvatarUrl(res.data);
        form.setFieldValue("userAvatar", res.data);
        message.success("头像更新成功");
      } else {
        message.error(res.message || "上传失败");
      }
    } catch (error) {
      message.error("上传错误");
    } finally {
      setUploading(false);
    }
    return null;
  };

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

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "basic" && (
            <>
              <div className={styles.avatarUpload}>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => { handleAvatarUpload(file); return false; }}
                  disabled={uploading}
                >
                  <div className={styles.avatarWrapper}>
                    <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />
                    <div className={`mask ${styles.avatarMask}`}>
                      {uploading ? <LoadingOutlined /> : <CameraOutlined />}
                    </div>
                  </div>
                </Upload>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.formItem}>
                  <span className={styles.itemLabel}>用户昵称</span>
                  <ProFormText name="userAvatar" hidden />
                  <ProFormText
                    name="userName"
                    placeholder="输入昵称"
                    fieldProps={{
                      style: { textAlign: 'right' }
                    }}
                    rules={[{ required: true, message: "请输入昵称" }]}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <div className={styles.formGroup}>
              <div className={styles.formItem}>
                <span className={styles.itemLabel}>新密码</span>
                <ProFormText.Password
                  name="userPassword"
                  placeholder="未更改"
                  fieldProps={{
                    style: { textAlign: 'right' }
                  }}
                />
              </div>
              <div className={styles.formItem}>
                <span className={styles.itemLabel}>确认密码</span>
                <ProFormText.Password
                  name="checkPassword"
                  placeholder="再次输入"
                  dependencies={["userPassword"]}
                  fieldProps={{
                    style: { textAlign: 'right' }
                  }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value && getFieldValue("userPassword")) {
                          return Promise.reject(new Error("请确认密码"));
                        }
                        if (value && value !== getFieldValue("userPassword")) {
                          return Promise.reject(new Error("密码不一致"));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className={styles.formGroup}>
              <div className={styles.formItem}>
                <span className={styles.itemLabel}>邮箱</span>
                <ProFormText
                  name="userEmail"
                  placeholder="example@mail.com"
                  fieldProps={{
                    style: { textAlign: 'right' }
                  }}
                  rules={[{ type: 'email', message: "邮箱格式错误" }]}
                />
              </div>
              <div className={styles.formItem}>
                <span className={styles.itemLabel}>手机</span>
                <ProFormText
                  name="userPhone"
                  placeholder="13800000000"
                  fieldProps={{
                    style: { textAlign: 'right' }
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <PageContainer title={false} ghost>
      <div className={styles.pageContainer}>
        <div className={styles.glassLayout}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.navTitle}>设置</div>
            {menuItems.map(item => (
              <div
                key={item.key}
                className={`${styles.navItem} ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon}
                {item.label}
                {activeTab === item.key && <RightOutlined style={{ marginLeft: "auto", fontSize: 12, opacity: 0.5 }} />}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className={styles.contentArea}>
            <ProForm
              form={form}
              onFinish={handleSubmit}
              submitter={{ render: () => null }}
              layout="horizontal"
            >
              {renderContent()}

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.saveButton}
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
