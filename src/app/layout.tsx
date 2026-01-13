"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pro Admin - 中后台管理系统</title>
      </head>
      <body>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
