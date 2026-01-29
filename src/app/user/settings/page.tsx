"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { ProForm, ProFormText, PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Upload, Avatar, App, Tabs, Space, Tooltip } from "antd";
import {
  SaveOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
  SafetyOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { updateMyUser, getLoginUser } from "@/api/userController";
import { uploadFile } from "@/api/fileController";
import { setLoginUser } from "@/store/modules";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    max-width: 800px;
    margin: 0 auto;
  `,
  settingsCard: css`
    border-radius: ${token.borderRadiusLG}px;
    border: none;
    box-shadow: ${token.boxShadowTertiary};
    background: ${token.colorBgContainer};
  `,
  avatarSection: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
    padding: 24px;
    background: ${token.colorFillAlter};
    border-radius: ${token.borderRadiusLG}px;
  `,
  avatarWrapper: css`
    position: relative;
    cursor: pointer;
    transition: all ${token.motionDurationMid};
    &:hover .avatar-mask {
      opacity: 1;
    }
  `,
  avatarMask: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${token.colorBgMask};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0;
    transition: opacity ${token.motionDurationMid};
    font-size: 24px;
  `,
  tabLabel: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  `,
  submitButton: css`
    height: 44px;
    border-radius: 22px;
    font-weight: 600;
    margin-top: 16px;
    border: none;
    background: linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryActive} 100%);
    box-shadow: 0 4px 12px ${token.colorPrimaryHover}40;
    &:hover {
      box-shadow: 0 6px 16px ${token.colorPrimaryHover}60;
      transform: translateY(-1px);
    }
  `,
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

  if (!loginUser?.id) {
    return null;
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res: any = await uploadFile({ biz: "user_avatar" }, formData);

      if (res.code === 0 && res.data) {
        setAvatarUrl(res.data);
        form.setFieldValue("userAvatar", res.data);
        message.success("头像上传成功");
        return res.data;
      } else {
        message.error(res.message || "头像上传失败");
      }
    } catch (error) {
      console.error("头像上传失败:", error);
      message.error("头像上传失败");
    } finally {
      setUploading(false);
    }
    return null;
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { checkPassword, ...submitValues } = values;

      if (!submitValues.userPassword) {
        delete submitValues.userPassword;
      }

      const res: any = await updateMyUser(submitValues);

      if (res.code === 0) {
        message.success("个人信息更新成功");

        const userRes: any = await getLoginUser();
        if (userRes.code === 0 && userRes.data) {
          dispatch(setLoginUser(userRes.data));
        }

        form.setFieldsValue({
          userPassword: "",
          checkPassword: "",
        });
      } else {
        message.error(res.message || "更新失败，请重试");
      }
    } catch (error) {
      console.error("更新失败:", error);
      message.error("更新失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: "basic",
      label: (
        <span className={styles.tabLabel}>
          <IdcardOutlined /> 基本信息
        </span>
      ),
      children: (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.avatarSection}>
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                handleAvatarUpload(file);
                return false;
              }}
              disabled={uploading}
            >
              <Tooltip title="点击更换头像">
                <div className={styles.avatarWrapper}>
                  <Avatar
                    size={100}
                    src={avatarUrl}
                    icon={<UserOutlined />}
                    style={{ border: `4px solid ${theme.colorBgContainer}`, boxShadow: theme.boxShadowTertiary }}
                  />
                  <div className={`avatar-mask ${styles.avatarMask}`}>
                    <CameraOutlined />
                  </div>
                </div>
              </Tooltip>
            </Upload>
            <div style={{ marginTop: 12, color: theme.colorTextDescription, fontSize: 12 }}>
              支持 JPG、PNG 格式，大小不超过 2MB
            </div>
          </div>

          <ProFormText name="userAvatar" hidden />

          <ProFormText
            name="userName"
            label="用户昵称"
            placeholder="设置您的个性化昵称"
            fieldProps={{
              prefix: <UserOutlined style={{ color: theme.colorPrimary }} />,
              size: "large",
            }}
            rules={[
              { required: true, message: "请输入用户昵称" },
              { min: 2, max: 20, message: "昵称长度为 2-20 个字符" },
            ]}
          />
        </motion.div>
      ),
    },
    {
      key: "security",
      label: (
        <span className={styles.tabLabel}>
          <SafetyOutlined /> 安全设置
        </span>
      ),
      children: (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProFormText.Password
            name="userPassword"
            label="重置密码"
            placeholder="若不修改密码请留空"
            fieldProps={{
              prefix: <LockOutlined style={{ color: theme.colorPrimary }} />,
              size: "large",
            }}
            rules={[{ min: 6, message: "密码长度至少 6 个字符" }]}
          />

          <ProFormText.Password
            name="checkPassword"
            label="确认新密码"
            placeholder="请再次输入新密码"
            dependencies={["userPassword"]}
            fieldProps={{
              prefix: <LockOutlined style={{ color: theme.colorPrimary }} />,
              size: "large",
            }}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue("userPassword");
                  if (!password) return Promise.resolve();
                  if (!value) return Promise.reject(new Error("请确认您的密码"));
                  if (password !== value) return Promise.reject(new Error("两次输入的密码不一致"));
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </motion.div>
      ),
    },
    {
      key: "contact",
      label: (
        <span className={styles.tabLabel}>
          <MailOutlined /> 联系方式
        </span>
      ),
      children: (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProFormText
            name="userEmail"
            label="电子邮箱"
            placeholder="example@stephen.com"
            fieldProps={{
              prefix: <MailOutlined style={{ color: theme.colorPrimary }} />,
              size: "large",
            }}
            rules={[{ type: "email", message: "请输入格式正确的邮箱地址" }]}
          />

          <ProFormText
            name="userPhone"
            label="手机号码"
            placeholder="请输入您的手机号"
            fieldProps={{
              prefix: <PhoneOutlined style={{ color: theme.colorPrimary }} />,
              size: "large",
            }}
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入有效的 11 位手机号码",
              },
            ]}
          />
        </motion.div>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProCard className={styles.settingsCard}>
            <ProForm
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              submitter={{
                render: (_, dom) => (
                  <div style={{ marginTop: 24 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      className={styles.submitButton}
                      icon={<SaveOutlined />}
                    >
                      同步更新所有设置
                    </Button>
                  </div>
                ),
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: theme.colorTextHeading }}>
                个人设置
              </h2>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={items}
                size="large"
                tabBarStyle={{ marginBottom: 32 }}
              />
            </ProForm>
          </ProCard>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Settings;
