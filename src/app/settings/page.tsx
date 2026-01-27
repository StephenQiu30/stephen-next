"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, message, Space, Avatar, Descriptions } from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { updateMyUser } from "@/api/userController";

const Settings: React.FC = () => {
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [loading, setLoading] = useState(false);

  if (!loginUser?.id) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <p>请先登录</p>
      </div>
    );
  }

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await updateMyUser({
        ...values,
      });

      if (res.code === 0) {
        message.success("更新成功");
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

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* 头部 */}
        <div style={{ marginBottom: 24 }}>
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
            >
              返回
            </Button>
          </Space>
        </div>

        {/* 用户信息预览 */}
        <ProCard style={{ marginBottom: 24 }}>
          <Space size="large" align="center">
            <Avatar
              size={64}
              src={loginUser.userAvatar}
              icon={<UserOutlined />}
            />
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                {loginUser.userName}
              </div>
              <div style={{ color: "#8c8c8c" }}>
                {loginUser.userEmail || "未设置邮箱"}
              </div>
            </div>
          </Space>
        </ProCard>

        {/* 编辑表单 */}
        <ProCard title="编辑个人信息">
          <ProForm
            onFinish={handleSubmit}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              userName: loginUser.userName,
              userAvatar: loginUser.userAvatar,
            }}
            submitter={{
              render: (_, dom) => (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                >
                  保存修改
                </Button>
              ),
            }}
          >
            <ProFormText
              name="userName"
              label="用户名"
              placeholder="请输入用户名"
              fieldProps={{
                prefix: <UserOutlined />,
              }}
              rules={[
                { required: true, message: "请输入用户名" },
                {
                  min: 2,
                  max: 20,
                  message: "用户名长度为 2-20 个字符",
                },
              ]}
              extra="用户名将显示在您的个人资料中"
            />
            <ProFormText
              name="userAvatar"
              label="头像"
              placeholder="请输入头像URL"
              fieldProps={{
                prefix: <MailOutlined />,
              }}
              extra="请输入有效的图片链接，建议使用正方形图片"
            />
          </ProForm>
        </ProCard>

        {/* 账号信息 */}
        <ProCard title="账号信息" style={{ marginTop: 24 }}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="用户邮箱">
              {loginUser.userEmail || "未设置"}
            </Descriptions.Item>
            <Descriptions.Item label="用户角色">
              {loginUser.userRole === "admin" ? "管理员" : "普通用户"}
            </Descriptions.Item>
          </Descriptions>
        </ProCard>
      </div>
    </div>
  );
};

export default Settings;