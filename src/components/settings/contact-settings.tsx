"use client";

import React from "react";
import { createStyles } from "antd-style";
import { ProFormText } from "@ant-design/pro-components";
import { Typography } from "antd";
import GlassCard from "@/components/glass-card";

const { Title, Text } = Typography;

const useStyles = createStyles(({ token, css }) => ({
    container: css`
    max-width: 600px;
    margin: 0 auto;
  `,
    section: css`
    padding: 24px;
  `,
    header: css`
    margin-bottom: 24px;
  `,
    formItem: css`
    .ant-form-item-label {
        font-weight: 500;
        color: ${token.colorTextSecondary};
    }
    .ant-input {
      font-size: 16px;
      padding: 8px 0;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid ${token.colorBorderSecondary} !important;
      border-radius: 0;
      box-shadow: none !important;
      
      &:focus {
        border-color: ${token.colorPrimary} !important;
      }
    }
  `
}));

const ContactSettings: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <GlassCard className={styles.section}>
                <div className={styles.header}>
                    <Title level={4}>联系方式</Title>
                    <Text type="secondary">绑定您的联系方式，方便我们与您取得联系</Text>
                </div>

                <div className={styles.formItem}>
                    <ProFormText
                        name="userEmail"
                        label="电子邮箱"
                        placeholder="请输入电子邮箱"
                        rules={[{ type: 'email', message: "邮箱格式错误" }]}
                    />
                    <ProFormText
                        name="userPhone"
                        label="手机号码"
                        placeholder="请输入手机号码"
                    />
                </div>
            </GlassCard>
        </div>
    );
};

export default ContactSettings;
