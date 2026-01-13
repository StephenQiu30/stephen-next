import React, { useState } from "react";
import { Form, message, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setLoginUser } from "@/store/modules";
import { LOGO, SUBTITLE, TITLE } from "@/constants";
import { userLogin, userRegister } from "@/api/userController";
import { LoginForm, ProFormText } from "@ant-design/pro-components";

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

/**
 * 用户登录和注册弹框
 */
const LoginModal: React.FC<LoginModalProps> = ({ open, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const doLoginSubmit = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const res: any = await userLogin(values);
      if (res.code === 0 && res.data) {
        message.success("登录成功！");
        localStorage.setItem("stephen-next-token", res.data.token);
        dispatch(setLoginUser(res.data));
        form.resetFields();
        onCancel();
      } else {
        message.error("登录失败，" + res.message);
      }
    } catch (e: any) {
      message.error("登录失败，" + e.message);
    } finally {
      setLoading(false);
    }
  };

  const doRegisterSubmit = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await userRegister(values);
      if (res.data) {
        message.success("注册成功，请登录");
        setIsLogin(true);
        form.resetFields();
      }
    } catch (error: any) {
      message.error("注册失败，" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className="rounded-xl shadow-lg"
    >
      {isLogin ? (
        <div className="space-y-6 p-8">
          <LoginForm
            form={form}
            logo={<Image src={LOGO} alt={TITLE} width={44} height={44} />}
            title={TITLE}
            subTitle={SUBTITLE}
            onFinish={doLoginSubmit}
            submitter={{
              searchConfig: {
                submitText: "登录",
              },
              submitButtonProps: {
                loading: loading,
              },
            }}
          >
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
                className: "rounded-lg border-gray-300",
              }}
              placeholder={"请输入用户账号"}
              rules={[
                {
                  required: true,
                  message: "请输入用户账号！",
                },
                {
                  min: 4,
                  message: "账号长度至少4位",
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
                className: "rounded-lg border-gray-300",
              }}
              placeholder={"请输入密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
                {
                  min: 8,
                  message: "密码长度至少8位",
                },
              ]}
            />
            <div className="text-right">
              <span
                className="cursor-pointer text-sm text-blue-600"
                onClick={() => setIsLogin(false)}
              >
                去注册
              </span>
            </div>
          </LoginForm>
        </div>
      ) : (
        <div className="space-y-6 p-8">
          <LoginForm
            form={form}
            logo={<Image src={LOGO} alt={TITLE} width={44} height={44} />}
            title={TITLE}
            subTitle={SUBTITLE}
            onFinish={doRegisterSubmit}
            submitter={{
              searchConfig: {
                submitText: "注册",
              },
              submitButtonProps: {
                loading: loading,
              },
            }}
          >
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
                className: "rounded-lg border-gray-300",
              }}
              placeholder={"请输入用户账号"}
              rules={[
                {
                  required: true,
                  message: "请输入用户账号！",
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
                className: "rounded-lg border-gray-300",
              }}
              placeholder={"请输入密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
                className: "rounded-lg border-gray-300",
              }}
              placeholder={"确认密码"}
              dependencies={["userPassword"]}
              rules={[
                {
                  required: true,
                  message: "请再次输入密码！",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("userPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致！"));
                  },
                }),
              ]}
            />
            <div className="text-right">
              <span
                className="cursor-pointer text-sm text-blue-600"
                onClick={() => setIsLogin(true)}
              >
                已有账号？去登录
              </span>
            </div>
          </LoginForm>
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
