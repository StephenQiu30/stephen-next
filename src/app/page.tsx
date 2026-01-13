'use client';

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';

/**
 * Dashboard 首页
 */
export default function DashboardPage() {
  return (
    <PageContainer title="工作台" content="欢迎使用 Pro Admin 中后台管理系统">
      <Row gutter={[16, 16]}>
        {/* 统计卡片 */}
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="总订单数"
              value={9320}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="总收入"
              value={112800}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#faad14' }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="活跃应用"
              value={86}
              suffix="/ 100"
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </ProCard>
        </Col>

        {/* 欢迎卡片 */}
        <Col xs={24}>
          <ProCard title="欢迎使用 Pro Admin" headerBordered>
            <p>
              这是一个基于 Next.js 16 + React 19 + Ant Design 5.x + ProComponents
              构建的现代化中后台管理系统。
            </p>
            <p>主要特性：</p>
            <ul>
              <li>✨ Next.js 16 App Router + Turbopack</li>
              <li>⚛️ React 19 + React Compiler</li>
              <li>🎨 Ant Design 5.x + ProComponents</li>
              <li>🎭 支持明暗主题切换</li>
              <li>🌍 国际化支持（中文/英文）</li>
              <li>📱 响应式布局</li>
              <li>🔐 权限管理（待实现）</li>
            </ul>
          </ProCard>
        </Col>

        {/* 快捷操作 */}
        <Col xs={24} lg={12}>
          <Card title="快捷操作" bordered={false}>
            <p>• 查看用户管理</p>
            <p>• 新增表单</p>
            <p>• 系统设置</p>
          </Card>
        </Col>

        {/* 最近活动 */}
        <Col xs={24} lg={12}>
          <Card title="最近活动" bordered={false}>
            <p>• 用户 Admin 登录系统 - 2分钟前</p>
            <p>• 更新了系统配置 - 5分钟前</p>
            <p>• 新增了 3 个用户 - 10分钟前</p>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}