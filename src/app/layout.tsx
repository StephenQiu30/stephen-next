"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/basic-layout";
import { ReduxProvider } from "@/libs/providers";

/**
 * 根布局组件
 *
 * 使用 BasicLayout 作为全局布局
 * 包含 Ant Design SSR 支持
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ReduxProvider>
          <AntdRegistry>
            <BasicLayout>{children}</BasicLayout>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
