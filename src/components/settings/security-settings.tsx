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
    .ant-input, .ant-input-password {
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
    .ant-input-affix-wrapper {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid ${token.colorBorderSecondary} !important;
        border-radius: 0;
        padding: 8px 0;
        box-shadow: none !important;
    }
  `
}));

const SecuritySettings: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.container}>
            <GlassCard className={styles.section}>
                <div className={styles.header}>
                    <Title level={4}>修改密码</Title>
                    <Text type="secondary">定期修改密码可以提高账号安全性</Text>
                </div>

                <div className={styles.formItem}>
                    <ProFormText.Password
                        name="userPassword"
                        label="新密码"
                        placeholder="请输入新密码"
                    />
                    <ProFormText.Password
                        name="checkPassword"
                        label="确认密码"
                        placeholder="请再次输入新密码"
                        dependencies={["userPassword"]}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value && getFieldValue("userPassword")) {
                                        return Promise.reject(new Error("请确认密码"));
                                    }
                                    if (value && value !== getFieldValue("userPassword")) {
                                        return Promise.reject(new Error("密码不一致"));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    />
                </div>
            </GlassCard>
        </div>
    );
};

export default SecuritySettings;
