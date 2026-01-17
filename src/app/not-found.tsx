'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRouter } from 'next/navigation';

/**
 * 404 页面组件
 */
export default function NotFoundPage() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <PageContainer title="页面未找到">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" icon={<HomeOutlined />} onClick={handleBackHome}>
            返回首页
          </Button>
        }
      />
    </PageContainer>
  );
}
