"use client";

import React, { useState } from "react";
import { Form, Modal, Typography, App } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setLoginUser } from "@/store/modules";
import { userLogin, userRegister } from "@/api/userController";
import { LoginForm, ProFormText } from "@ant-design/pro-components";

const { Link } = Typography;

interface LoginModalProps {
  open: boolean;
  onCancel: () => void;
}

interface LoginFormData {
  userAccount: string;
  userPassword: string;
}

interface RegisterFormData extends LoginFormData {
  checkPassword: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { message } = App.useApp();

  const doLoginSubmit = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const res = await userLogin({
        userAccount: values.userAccount,
        userPassword: values.userPassword,
      });

      if (res.code === 0 && res.data) {
        message.success("登录成功！");
        if (res.data.token) {
          localStorage.setItem("stephen-next-token", res.data.token);
        }
        dispatch(setLoginUser(res.data));
        form.resetFields();
        onCancel();
        // 刷新页面以更新登录状态
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        message.error(res.message || "登录失败，请重试");
      }
    } catch (error: unknown) {
      console.error("登录错误:", error);
      let errorMessage = "登录失败，请重试";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      message.error(`登录失败：${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const doRegisterSubmit = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await userRegister({
        userAccount: values.userAccount,
        userPassword: values.userPassword,
        checkPassword: values.checkPassword,
      });

      if (res.code === 0) {
        message.success("注册成功，请登录");
        // 保存注册的账号，用于自动填充登录表单
        const registeredAccount = values.userAccount;
        setIsLogin(true);
        // 重置表单并自动填充账号
        form.resetFields();
        // 延迟一下，确保表单已经切换
        setTimeout(() => {
          form.setFieldsValue({ userAccount: registeredAccount });
        }, 100);
      } else {
        message.error(res.message || "注册失败，请重试");
      }
    } catch (error: unknown) {
      console.error("注册错误:", error);
      let errorMessage = "注册失败，请重试";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      message.error(`注册失败：${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    form.resetFields();
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
      destroyOnHidden
      getContainer={() => document.body}
      aria-label={isLogin ? "登录对话框" : "注册对话框"}
    >
      {isLogin ? (
        <LoginForm<LoginFormData>
          form={form}
          logo={
            <Image
              src={process.env.NEXT_PUBLIC_LOGO || "/logo.png"}
              alt={process.env.NEXT_PUBLIC_TITLE || "Logo"}
              width={32}
              height={32}
            />
          }
          title={process.env.NEXT_PUBLIC_TITLE || ""}
          subTitle={process.env.NEXT_PUBLIC_SUBTITLE || ""}
          onFinish={doLoginSubmit}
          submitter={{
            searchConfig: {
              submitText: "登录",
            },
            submitButtonProps: {
              loading: loading,
              disabled: loading,
              size: "large",
              block: true,
            },
          }}
        >
          <ProFormText
            name="userAccount"
            label="账号"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
              autoComplete: "username",
            }}
            placeholder="请输入用户账号"
            rules={[
              {
                required: true,
                message: "请输入用户账号",
              },
              {
                min: 4,
                message: "账号长度至少4位",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            label="密码"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
              autoComplete: "current-password",
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              {
                min: 8,
                message: "密码长度至少8位",
              },
            ]}
          />
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <Link onClick={handleSwitchToRegister}>去注册</Link>
          </div>
        </LoginForm>
      ) : (
        <LoginForm<RegisterFormData>
          form={form}
          logo={
            <Image
              src={process.env.NEXT_PUBLIC_LOGO || "/logo.png"}
              alt={process.env.NEXT_PUBLIC_TITLE || "Logo"}
              width={32}
              height={32}
            />
          }
          title={process.env.NEXT_PUBLIC_TITLE}
          subTitle={process.env.NEXT_PUBLIC_SUBTITLE}
          onFinish={doRegisterSubmit}
          submitter={{
            searchConfig: {
              submitText: "注册",
            },
            submitButtonProps: {
              loading: loading,
              disabled: loading,
              size: "large",
              block: true,
            },
          }}
        >
          <ProFormText
            name="userAccount"
            label="账号"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
              autoComplete: "username",
            }}
            placeholder="请输入用户账号"
            rules={[
              {
                required: true,
                message: "请输入用户账号",
              },
              {
                min: 4,
                message: "账号长度至少4位",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            label="密码"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
              autoComplete: "new-password",
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              {
                min: 8,
                message: "密码长度至少8位",
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            label="确认密码"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
              autoComplete: "new-password",
            }}
            placeholder="请再次输入密码"
            dependencies={["userPassword"]}
            rules={[
              {
                required: true,
                message: "请再次输入密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("userPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          />
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <Link onClick={handleSwitchToLogin}>已有账号？去登录</Link>
          </div>
        </LoginForm>
      )}
    </Modal>
  );
};

export default LoginModal;
