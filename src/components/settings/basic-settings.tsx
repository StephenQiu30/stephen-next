"use client";

import React from "react";
import { Upload, Avatar, Button, Typography, App } from "antd";
import { UserOutlined, LoadingOutlined, CameraOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { uploadFile } from "@/api/fileController";
import GlassCard from "@/components/glass-card";

const { Title, Text } = Typography;

const useStyles = createStyles(({ token, css }) => ({
    container: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;
    margin: 0 auto;
  `,
    avatarSection: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  `,
    avatarWrapper: css`
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.05);
      .mask {
        opacity: 1;
      }
    }
  `,
    avatarMask: css`
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.2s;
    backdrop-filter: blur(2px);
  `,
    section: css`
    padding: 24px;
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

interface BasicSettingsProps {
    loginUser: any;
    form: any;
    setAvatarUrl: (url: string) => void;
    avatarUrl: string;
}

const BasicSettings: React.FC<BasicSettingsProps> = ({ loginUser, form, setAvatarUrl, avatarUrl }) => {
    const { styles } = useStyles();
    const { message } = App.useApp();
    const [uploading, setUploading] = useState(false);

    const handleAvatarUpload = async (file: File) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            const res: any = await uploadFile({ biz: "user_avatar" }, formData);
            if (res.code === 0 && res.data) {
                setAvatarUrl(res.data);
                form.setFieldValue("userAvatar", res.data);
                message.success("头像更新成功");
            } else {
                message.error(res.message || "上传失败");
            }
        } catch (error) {
            message.error("上传错误");
        } finally {
            setUploading(false);
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <GlassCard className={styles.section}>
                <div className={styles.avatarSection}>
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => { handleAvatarUpload(file); return false; }}
                        disabled={uploading}
                    >
                        <div className={styles.avatarWrapper}>
                            <Avatar
                                size={120}
                                src={avatarUrl}
                                icon={<UserOutlined />}
                                style={{ border: "4px solid white", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                            />
                            <div className={`mask ${styles.avatarMask}`}>
                                {uploading ? <LoadingOutlined /> : <CameraOutlined />}
                            </div>
                        </div>
                    </Upload>
                    <div>
                        <Title level={4} style={{ margin: 0, textAlign: "center" }}>{loginUser?.userName}</Title>
                        <Text type="secondary">点击头像进行更换</Text>
                    </div>
                </div>

                <div className={styles.formItem}>
                    <ProFormText name="userAvatar" hidden />
                    <ProFormText
                        name="userName"
                        label="用户昵称"
                        placeholder="请输入您的昵称"
                        rules={[{ required: true, message: "请输入昵称" }]}
                    />
                </div>
            </GlassCard>
        </div>
    );
};

export default BasicSettings;
