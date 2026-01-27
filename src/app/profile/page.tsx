"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProCard, ProDescriptions } from "@ant-design/pro-components";
import { Button, Col, Row, Tag, Space, Avatar, Descriptions } from "antd";
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.loginUser);

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

  const getRoleText = (role?: string) => {
    switch (role) {
      case "admin":
        return "管理员";
      case "user":
        return "普通用户";
      default:
        return role || "普通用户";
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* 用户信息卡片 */}
        <Col xs={24} lg={8}>
          <ProCard>
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <Avatar
                size={80}
                src={loginUser.userAvatar}
                icon={<UserOutlined />}
                style={{ marginBottom: 16 }}
              />
              <h2 style={{ marginBottom: 8, fontSize: 20, fontWeight: 600 }}>
                {loginUser.userName}
              </h2>
              <p style={{ color: "#8c8c8c", marginBottom: 16 }}>
                {loginUser.userEmail || "未设置邮箱"}
              </p>
              <Tag color={getRoleColor(loginUser.userRole)}>
                {getRoleText(loginUser.userRole)}
              </Tag>
              <div style={{ marginTop: 24 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => router.push("/settings")}
                  >
                    编辑资料
                  </Button>
                </Space>
              </div>
            </div>
          </ProCard>
        </Col>

        {/* 详细信息 */}
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <ProCard title="基本信息" headerBordered>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="用户 ID">
                    {loginUser.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="用户名">
                    {loginUser.userName}
                  </Descriptions.Item>
                  <Descriptions.Item label="用户角色">
                    <Tag color={getRoleColor(loginUser.userRole)}>
                      {getRoleText(loginUser.userRole)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {loginUser.userEmail || "未设置"}
                  </Descriptions.Item>
                </Descriptions>
              </ProCard>
            </Col>

            <Col xs={24}>
              <ProCard title="时间信息" headerBordered>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="创建时间">
                    {loginUser.createTime
                      ? new Date(loginUser.createTime).toLocaleString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="更新时间">
                    {loginUser.updateTime
                      ? new Date(loginUser.updateTime).toLocaleString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </Descriptions.Item>
                </Descriptions>
              </ProCard>
            </Col>

            {loginUser.userAvatar && (
              <Col xs={24}>
                <ProCard title="头像信息" headerBordered>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="头像 URL">
                      {loginUser.userAvatar}
                    </Descriptions.Item>
                  </Descriptions>
                </ProCard>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;