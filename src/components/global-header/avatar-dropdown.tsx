import React, { useState } from "react";
import { Avatar, Dropdown, Button, Space, App } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { clearLoginUser } from "@/store/modules";
import { useRouter } from "next/navigation";
import { userLogout } from "@/api/userController";
import LoginModal from "@/components/login/login-modal";

export type AvatarDropdownProps = {
  currentUser?: API.LoginUserVO;
};

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ currentUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { message } = App.useApp();

  const loginOut = async () => {
    try {
      const res: any = await userLogout();
      dispatch(clearLoginUser());
      localStorage.removeItem("stephen-next-token");

      if (res.code === 0) {
        message.success("退出登录成功");
      } else {
        console.warn("退出登录API返回错误，但已清除本地状态:", res.message);
        message.warning("已退出登录（服务器响应异常）");
      }
    } catch (error) {
      console.error("退出登录API调用失败，但已清除本地状态:", error);
      dispatch(clearLoginUser());
      localStorage.removeItem("stephen-next-token");
      message.warning("已退出登录（网络异常）");
    } finally {
      router.replace("/");
    }
  };

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人中心",
      onClick: () => router.push("/user/profile"),
    },
    {
      key: "settings",
      icon: <EditOutlined />,
      label: "账号设置",
      onClick: () => router.push("/user/settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: loginOut,
      danger: true,
    },
  ];

  return (
    <>
      {currentUser?.id ? (
        <Dropdown
          menu={{
            items: menuItems,
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer", marginLeft: 8 }}>
            <Avatar
              size="default"
              src={currentUser?.userAvatar}
              icon={<UserOutlined style={{ fontSize: 16 }} />}
              style={{ flexShrink: 0 }}
            />
          </Space>
        </Dropdown>
      ) : (
        <Button
          type="primary"
          size="middle"
          icon={<UserOutlined />}
          onClick={(e) => {
            e?.stopPropagation?.();
            setVisible(true);
          }}
        >
          登录
        </Button>
      )}
      <LoginModal open={visible} onCancel={() => setVisible(false)} />
    </>
  );
};

export default AvatarDropdown;
