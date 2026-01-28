"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProCard, ProForm, ProFormText, PageContainer, ProFormGroup } from "@ant-design/pro-components";
import { Button, Upload, Avatar, App } from "antd";
import {
  SaveOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { updateMyUser, getLoginUser } from "@/api/userController";
import { uploadFile } from "@/api/fileController";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setLoginUser } from "@/store/modules";

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(loginUser?.userAvatar || "");
  const [form] = ProForm.useForm();
  const { message } = App.useApp();

  useEffect(() => {
    if (loginUser?.id) {
      form.setFieldsValue({
        userName: loginUser.userName,
        userAvatar: loginUser.userAvatar,
        userEmail: loginUser.userEmail,
        userPhone: loginUser.userPhone,
      });
      setAvatarUrl(loginUser.userAvatar || "");
    }
  }, [loginUser, form]);

  if (!loginUser?.id) {
    return null;
  }

  const handleAvatarUpload = async (info: any) => {
    const { fileList } = info;
    if (fileList && fileList.length > 0) {
      const file = fileList[0].originFileObj as File;
      if (file) {
        try {
          setUploading(true);
          const formData = new FormData();
          formData.append("file", file);

          const res: any = await uploadFile(
            { biz: "user_avatar" },
            formData
          );

          if (res.code === 0 && res.data) {
            setAvatarUrl(res.data);
            form.setFieldValue("userAvatar", res.data);
            message.success("头像上传成功");
          } else {
            message.error(res.message || "头像上传失败");
          }
        } catch (error) {
          console.error("头像上传失败:", error);
          message.error("头像上传失败");
        } finally {
          setUploading(false);
        }
      }
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { checkPassword, ...submitValues } = values;

      const res: any = await updateMyUser(submitValues);

      if (res.code === 0) {
        message.success("更新成功");

        const userRes: any = await getLoginUser();
        if (userRes.code === 0 && userRes.data) {
          dispatch(setLoginUser(userRes.data));
        }

        form.setFieldsValue({
          userPassword: "",
          checkPassword: "",
        });
      } else {
        message.error(res.message || "更新失败，请重试");
      }
    } catch (error) {
      console.error("更新失败:", error);
      message.error("更新失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={false} breadcrumb={undefined}>
      <ProCard title="个人设置" headerBordered>
        <ProForm
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            userName: loginUser.userName,
            userAvatar: loginUser.userAvatar,
            userEmail: loginUser.userEmail,
          }}
          submitter={{
            searchConfig: {
              submitText: "保存修改",
            },
            resetButtonProps: {
              style: { display: "none" },
            },
            submitButtonProps: {
              loading,
              size: "large",
              icon: <SaveOutlined />,
              block: true,
            },
          }}
        >
          <ProFormGroup
            title="基本信息"
            tooltip="修改您的个人基本信息"
            collapsible
            defaultCollapsed={false}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
              <Avatar size={80} src={avatarUrl} icon={<UserOutlined />} />
              <div style={{ marginLeft: 24, flex: 1 }}>
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} loading={uploading}>
                    更换头像
                  </Button>
                </Upload>
              </div>
            </div>

            <ProFormText
              name="userName"
              label="用户名"
              placeholder="请输入用户名"
              fieldProps={{
                prefix: <UserOutlined />,
                size: "large",
              }}
              rules={[
                { required: true, message: "请输入用户名" },
                { min: 2, max: 20, message: "用户名长度为 2-20 个字符" },
              ]}
            />
          </ProFormGroup>

          <ProFormGroup
            title="安全设置"
            tooltip="修改您的密码"
            collapsible
            defaultCollapsed={false}
          >
            <ProFormText.Password
              name="userPassword"
              label="新密码"
              placeholder="不修改请留空"
              fieldProps={{
                prefix: <LockOutlined />,
                size: "large",
              }}
              rules={[
                {
                  min: 6,
                  message: "密码长度至少 6 个字符",
                },
              ]}
            />

            <ProFormText.Password
              name="checkPassword"
              label="确认密码"
              placeholder="请再次输入新密码"
              dependencies={["userPassword"]}
              fieldProps={{
                prefix: <LockOutlined />,
                size: "large",
              }}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const password = getFieldValue("userPassword");
                    if (!password) {
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.reject(new Error("请再次输入密码"));
                    }
                    if (password !== value) {
                      return Promise.reject(new Error("两次输入的密码不一致"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </ProFormGroup>

          <ProFormGroup
            title="联系方式"
            tooltip="更新您的联系信息"
            collapsible
            defaultCollapsed={false}
          >
            <ProFormText
              name="userEmail"
              label="邮箱"
              placeholder="请输入邮箱"
              fieldProps={{
                prefix: <MailOutlined />,
                size: "large",
              }}
              rules={[
                {
                  type: "email",
                  message: "请输入有效的邮箱地址",
                },
              ]}
            />

            <ProFormText
              name="userPhone"
              label="电话"
              placeholder="请输入电话号码"
              fieldProps={{
                prefix: <PhoneOutlined />,
                size: "large",
              }}
              rules={[
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "请输入有效的手机号码",
                },
              ]}
            />
          </ProFormGroup>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Settings;
