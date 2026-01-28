"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import "./globals.css";
import BasicLayout from "@/layouts/basic-layout";
import store from "@/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Provider store={store}>
          <AntdRegistry>
            <App>
              <BasicLayout>{children}</BasicLayout>
            </App>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
