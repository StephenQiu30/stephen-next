import React, { useState } from "react";
import { Avatar, Dropdown, Button, Space, message, Menu } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setLoginUser } from "@/store/modules";
import { useRouter } from "next/navigation";
import { userLogout } from "@/api/userController";
import LoginRegisterModal from "@/components/login/login-modal";

export type AvatarDropdownProps = {
  currentUser?: API.LoginUserVO;
};

/**
 * 头像下拉框
 */
const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ currentUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const loginOut = async () => {
    try {
      const res: any = await userLogout();
      if (res.code === 0) {
        localStorage.removeItem("stephen-next-token");
        dispatch(setLoginUser(undefined));
        message.success("退出登录成功");
        router.replace("/");
      } else {
        message.error(res.message || "退出登录失败，请重试");
      }
    } catch (error) {
      console.error("退出登录失败:", error);
      message.error("退出登录失败，请重试");
      localStorage.removeItem("stephen-next-token");
      dispatch(setLoginUser(undefined));
      router.replace("/");
    }
  };

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人中心",
      onClick: () => router.push("/profile"),
    },
    {
      key: "settings",
      icon: <EditOutlined />,
      label: "账号设置",
      onClick: () => router.push("/settings"),
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
          type="text"
          size="large"
          onClick={() => setVisible(true)}
          icon={<UserOutlined />}
        />
      )}
      <LoginRegisterModal open={visible} onCancel={() => setVisible(false)} />
    </>
  );
};

export default AvatarDropdown;
