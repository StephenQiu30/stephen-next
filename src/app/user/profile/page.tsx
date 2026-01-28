"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Descriptions, Avatar, Button, Tag, Space } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ProCard, PageContainer } from "@ant-design/pro-components";

const Profile: React.FC = () => {
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  if (!loginUser?.id) {
    return null;
  }

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "red";
      case "user":
        return "blue";
      default:
        return "default";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageContainer title={false} breadcrumb={undefined}>
      <ProCard title="个人信息" headerBordered>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Avatar
              size={80}
              src={loginUser.userAvatar}
              icon={<UserOutlined />}
            />
            <h2 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 8px" }}>
              {loginUser.userName}
            </h2>
            <p style={{ color: "#8c8c8c" }}>
              {loginUser.userEmail || "未设置邮箱"}
            </p>
            <Tag color={getRoleColor(loginUser.userRole)}>
              {loginUser.userRole === "admin" ? "管理员" : "普通用户"}
            </Tag>
          </div>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push("/user/settings")}
            block
          >
            编辑资料
          </Button>

          <Descriptions column={1} bordered>
            <Descriptions.Item
              label={<span><IdcardOutlined /> 用户 ID</span>}
              labelStyle={{ width: 120 }}
            >
              {loginUser.id}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span><UserOutlined /> 用户名</span>}
              labelStyle={{ width: 120 }}
            >
              {loginUser.userName}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span><MailOutlined /> 邮箱</span>}
              labelStyle={{ width: 120 }}
            >
              {loginUser.userEmail || "未设置"}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span><ClockCircleOutlined /> 创建时间</span>}
              labelStyle={{ width: 120 }}
            >
              {formatDate(loginUser.createTime)}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span><ClockCircleOutlined /> 更新时间</span>}
              labelStyle={{ width: 120 }}
            >
              {formatDate(loginUser.updateTime)}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </ProCard>
    </PageContainer>
  );
};

export default Profile;
